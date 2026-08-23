#!/usr/bin/env python3
"""Delete CSS rules whose class selectors are referenced nowhere.

A rule is deleted only when EVERY comma-separated selector is a pure class
selector (no #id, no [attr], no bare elements) and NONE of its classes
appear in the live set. The live set over-approximates on purpose:
  - every class="..." token in every tracked HTML file (incl. inline scripts)
  - every word token inside every string literal in every tracked JS file
    (covers HTML fragments built in JS, dotted selector strings, and
    classList arguments; UI copy words keeping a few dead rules alive is
    the accepted cost of that safety)
  - a hand-maintained PROTECTED list for dynamically constructed class names
Usage: python3 scripts/css-dead-rules.py           # report only
       python3 scripts/css-dead-rules.py --apply   # rewrite styles.css
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSS = ROOT / 'styles.css'

# Classes assembled at runtime — grep for `${` near class/className before
# touching this list.
PROTECTED = {
    'chat-message', 'user-message', 'bot-message',      # chatbot.js: `chat-message ${sender}-message`
    'form-message', 'success', 'error',                 # script.js: `form-message ${s}`
}


def live_classes():
    live = set(PROTECTED)
    html = [f for f in subprocess.check_output(
        ['git', 'ls-files', '*.html'], cwd=ROOT, text=True).split() if 'debug' not in f]
    js = [f for f in subprocess.check_output(
        ['git', 'ls-files', '*.js'], cwd=ROOT, text=True).split() if 'debug' not in f]

    def add_js(text):
        for lit in re.findall(r'"([^"\n]*)"|\'([^\'\n]*)\'|`([^`]*)`', text):
            for part in lit:
                live.update(re.findall(r'[A-Za-z_][A-Za-z0-9_-]*', part))

    for f in html:
        s = (ROOT / f).read_text()
        for attrs in re.findall(r'class=["\']([^"\']*)["\']', s):
            live.update(attrs.split())
        for script in re.findall(r'<script[^>]*>(.*?)</script>', s, re.S):
            add_js(script)
    for f in js:
        add_js((ROOT / f).read_text())
    return live


def parse_rules(text):
    """Walk the stylesheet, skipping comments and quoted spans. Returns
    (rules, containers) with char ranges; containers are @media/@supports/
    @keyframes blocks that hold nested rules."""
    rules, containers = [], []
    stack = []  # (sel_start, sel_text, is_container)
    i, n = 0, len(text)
    while i < n:
        c = text[i]
        if c == '/' and text[i:i + 2] == '/*':
            i = text.find('*/', i) + 2
            continue
        if c in '"\'':
            j = i + 1
            while j < n and text[j] != c:
                j += 2 if text[j] == '\\' else 1
            i = j + 1
            continue
        if c == '{':
            # selector text = everything since the last block boundary
            bound = max(text.rfind('{', 0, i), text.rfind(';', 0, i), text.rfind('}', 0, i))
            sel = text[bound + 1:i].strip()
            is_container = any(k in sel for k in ('@media', '@supports', '@keyframes'))
            stack.append((bound + 1, sel, is_container))
            i += 1
            continue
        if c == '}':
            if stack:
                sel_start, sel, is_container = stack.pop()
                rec = {'sel': sel, 'start': sel_start, 'end': i + 1}
                (containers if is_container else rules).append(rec)
            i += 1
            continue
        i += 1
    if stack:
        raise SyntaxError(f'unbalanced braces: {len(stack)} unclosed blocks')
    return rules, containers


def selector_dead(sel, live):
    sel = sel.strip()
    if not sel or '#' in sel or '[' in sel or sel.startswith('@'):
        return False
    classes = re.findall(r'\.([A-Za-z_][\w-]*)', sel)
    if not classes:
        return False  # element/pseudo-only selector — keep
    return all(c not in live for c in classes)


def main():
    apply = '--apply' in sys.argv
    live = live_classes()
    text = CSS.read_text()
    rules, containers = parse_rules(text)

    dead = [r for r in rules if all(selector_dead(s, live) for s in re.split(r',(?![^(]*\))', r['sel']))]
    # guard: never delete a rule that mentions a live class anywhere
    for r in dead:
        assert not any(c in live for c in re.findall(r'\.([A-Za-z_][\w-]*)', r['sel'])), r['sel']

    print(f'{len(rules)} rules parsed, {len(dead)} dead '
          f'({sum(r["end"] - r["start"] for r in dead)} chars)')
    for r in dead:
        first = re.sub(r'\s+', ' ', r['sel'].split(',')[0])[:70]
        print(f'  DEL {first}')

    if not apply:
        print('dry run — pass --apply to rewrite styles.css')
        return

    keep = [(r['start'], r['end']) for r in sorted(rules, key=lambda r: r['start']) if r not in dead]
    for (s1, e1), (s2, _e2) in zip(keep, keep[1:]):
        assert s2 >= e1, f'overlapping keep ranges at {s1}/{s2}'
    dead_set = {(r['start'], r['end']) for r in dead}
    out, pos = [], 0
    for r in sorted(rules, key=lambda r: r['start']):
        out.append(text[pos:r['start']])  # whitespace/comments before the rule
        if (r['start'], r['end']) not in dead_set:
            out.append(text[r['start']:r['end']])
        pos = r['end']
    out.append(text[pos:])
    new = ''.join(out)

    # prune containers left with no rules inside (only whitespace/comments)
    changed = True
    while changed:
        changed = False
        _, containers2 = parse_rules(new)
        for c in sorted(containers2, key=lambda c: c['start']):
            inner = re.sub(r'/\*.*?\*/', '', new[c['start']:c['end']], flags=re.S)
            if inner.count('{') <= 1:  # only its own block -> empty
                new = new[:c['start']] + new[c['end']:]
                changed = True
                break

    new = re.sub(r'\n{3,}', '\n\n', new)
    assert new.count('{') == new.count('}'), 'brace imbalance after rewrite'
    # live coverage: every previously-present live class still appears
    before = set(re.findall(r'\.([A-Za-z_][\w-]*)', text))
    after_sel = set(re.findall(r'\.([A-Za-z_][\w-]*)', new))
    lost_live = (before & live) - after_sel
    assert not lost_live, f'live classes lost: {lost_live}'
    # every animation still referenced by a surviving rule must stay defined
    used = {n for n in re.findall(r'animation(?:-name)?:\s*([\w-]+)', new) if n != 'none'}
    defined = set(re.findall(r'@keyframes\s+([\w-]+)', new))
    undef = used - defined
    assert not undef, f'animations referenced but no longer defined: {undef}'
    CSS.write_text(new)
    print(f'styles.css: {len(text)} -> {len(new)} bytes '
          f'({len(text) - len(new)} removed, {len(dead)} rules)')


if __name__ == '__main__':
    main()
