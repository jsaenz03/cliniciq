#!/usr/bin/env python3
"""Runnable check for the reposition-nurse-first change.

Verifies the nurse-first repositioning: JSON-LD parses, nurse-first strings are
present, old practice-buyer strings are gone, and the n8n workflow artifact is
nurse-targeted. Exits non-zero on the first category of failure.

Run:  python3 openspec/changes/reposition-nurse-first/check.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DEEP_PAGES = ["index.html", "automations.html", "contact.html", "faq.html"]
failures = []


def check(label, ok):
    print(("PASS" if ok else "FAIL"), label)
    if not ok:
        failures.append(label)


# 1. JSON-LD in the deep-rewrite pages parses
for page in DEEP_PAGES:
    html = (ROOT / page).read_text()
    blocks = re.findall(
        r'<script type="application/ld\+json">\s*(\{.*?\})\s*</script>', html, re.S
    )
    ok = bool(blocks)
    for b in blocks:
        try:
            json.loads(b)
        except json.JSONDecodeError as e:
            ok = False
            print(f"  {page}: bad JSON-LD: {e}")
    check(f"{page}: {len(blocks)} JSON-LD blocks parse", ok)

# 2. Nurse-first strings present
present = {
    "index.html": [
        "AI overlays for Australian practice nurses",
        "Built for Australian practice nurses",
        "start with the work that eats your shift",
        "Built by a Registered Nurse who's done these workflows",
        "Built for Australian Practice Nursing",
    ],
    "automations.html": [
        "no practice sign-off",
        "Practice nurses juggling recalls",
        "Nurses who run the treatment room",
        "Ready to Take Back Your Shift",
    ],
    "contact.html": [
        "Curious what AI can take off your shift",
        "Clinic / workplace",
        "What's eating your shift",
    ],
    "faq.html": [
        "Do I need my practice manager's approval to start?",
        "Are the clinical tools safe to use for documentation?",
        "Can I use my own account and expense Pro later?",
    ],
}
for page, needles in present.items():
    text = (ROOT / page).read_text()
    for n in needles:
        check(f"{page}: contains {n[:48]!r}", n in text)

# 3. Old practice-buyer strings gone from the primary pages
absent = {
    "index.html": [
        "Built for Australian healthcare professionals",
        "Overlay solutions that transform your existing workflows",
        "Let's discuss your business needs",
    ],
    "automations.html": [
        "Boost clinic efficiency with NursePod",
        "practices looking to empower their nursing staff",
        "Get Free Audit",
    ],
    "contact.html": ["Ready to transform your GP clinic"],
    "faq.html": ["Pricing is tailored to practice size", "Will my staff need extensive training"],
}
for page, needles in absent.items():
    text = (ROOT / page).read_text()
    for n in needles:
        check(f"{page}: no longer contains {n[:48]!r}", n not in text)

# 4. Titles are nurse-first on all non-legal pages
for page in ROOT.glob("*.html"):
    if page.name in {
        "privacy-policy.html", "terms-of-service.html", "sources-methodology.html",
        "websites.html", "debug-mobile-simple.html",
    }:
        continue
    m = re.search(r"<title>(.*?)</title>", page.read_text())
    title = m.group(1) if m else ""
    ok = bool(m) and (
        re.search(r"practice nurses?", title, re.I) is not None
        or "Registered Nurse" in title
    )
    check(f"{page.name}: title is nurse-first ({title[:60] or 'NO TITLE'})", ok)

# 5. Footer tagline + chatbot greeting updated everywhere they appear
for page in list(ROOT.glob("*.html")) + list((ROOT / "blog").glob("*.html")) + list((ROOT / "downloads").glob("*.html")):
    text = page.read_text()
    rel = page.relative_to(ROOT)
    check(f"{rel}: no old footer tagline", "Automation tools, calculators and templates for Australian GP clinics" not in text)
    check(f"{rel}: no old chatbot greeting", "Happy to help with our GP clinic tools" not in text)

js = (ROOT / "chatbot.js").read_text()
check("chatbot.js: nurse greeting", "tools for practice nurses" in js)

# 6. n8n workflow artifact is nurse-targeted
wf = json.loads((ROOT / "openspec/changes/reposition-nurse-first/n8n-nurse-chat-workflow.json").read_text())
blob = json.dumps(wf, ensure_ascii=False)
check("n8n artifact: nurse discovery prompt", "Australian practice nurses" in blob)
check("n8n artifact: no old business discovery", "Helping small businesses" not in blob)
check("n8n artifact: webhook path", "cliniciqnursechat" in blob)

print()
if failures:
    print(f"{len(failures)} FAILURES")
    sys.exit(1)
print("ALL CHECKS PASSED")
