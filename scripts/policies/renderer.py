"""HTML + Playwright (system Chrome) renderer for ClinicIQ policy PDFs.

Builds a styled A4 HTML document from the (heading, blocks) section structure and
prints it to PDF via Chromium. Visual language matches the cliniciq.com.au brand:
deep green (#2C4A3C) primary, gold (#C4A661) accent, cream (#F5F1E6) panels.
Lexend for headings, Source Sans 3 for body (self-hosted woff2, file:// URLs).

Print rules follow the validated pdf-deliverable pipeline:
  - natural-flow pagination via @page (never fixed-height .page divs);
  - no position:fixed headers/footers (page identity lives in the page-1
    masthead and the closing contact block);
  - each heading is grouped with its first content block (break-inside:avoid)
    so a heading is never stranded at the bottom of a page;
  - list items never split across pages;
  - print-color-adjust:exact so the brand bands and panels print correctly.

A policy is a list of Section tuples. Each Section is (heading, blocks) where
blocks is a list of:
  - ("p", "text")           paragraph
  - ("bullets", [items])    bullet list
  - ("numbers", [items])    numbered list
Inline <b>/<i> markup in item text is preserved; all other XML-special chars
are escaped so the HTML is valid.
"""

from __future__ import annotations

import os
import tempfile
from contextlib import contextmanager

from playwright.sync_api import sync_playwright

# --- Brand tokens (cliniciq.com.au palette) --------------------------------
GREEN = "#2C4A3C"
GREEN_DEEP = "#22392E"
GOLD = "#C4A661"
GOLD_DARK = "#8A6F38"
CREAM = "#F5F1E6"
INK = "#242B26"
MUTED = "#5D6660"
BORDER = "#E4DDC9"

# ponytail: fonts and Chrome come from fixed absolute paths on this machine
# (fonts shared with the acred-agent project; macOS Chrome). Regeneration
# silently falls back to Arial elsewhere — upgrade path: vendor the woff2 into
# this repo and read the Chrome path from env/PATH.
FONT_DIR = "/Users/cliniciq/acred-agent/gp-accreditation-guide/assets/fonts"

# Version Control defaults (policies patched for v2.2 override per module).
EFFECTIVE_DATE = "27 August 2026"
NEXT_REVIEW = "27 August 2027"
VERSION = "2.1"  # published 6th edition (26 Aug 2026) – criteria F/CG/PP/CQI codes added; v2.0 was the draft-for-consultation revision

STANDARDS_LINE = (
    "Aligned to the RACGP Standards for general practices "
    "(6th edition, published August 2026)"
)

# Shared citation for the 6th-edition Standards, used in every References section.
# The 6th edition was published by the RACGP on 26 August 2026.
RACGP_6TH_REF = (
    "The Royal Australian College of General Practitioners. "
    "Standards for general practices (6th edition). "
    "East Melbourne, Vic: RACGP; published 26 August 2026. "
    "Available at: https://www.racgp.org.au/running-a-practice/practice-standards/standards-6th-edition"
)

# Page geometry — margins in mm (Playwright pdf() honours these over @page).
MARGIN_MM = {"top": "16mm", "bottom": "17mm", "left": "15mm", "right": "15mm"}

# Allow a tiny subset of inline markup for emphasis; everything else is escaped.
_ALLOWED_TAGS = ("<b>", "</b>", "<i>", "</i>")


def _escape(text: str) -> str:
    """Escape XML-special chars for valid HTML, preserving <b>/<i> inline tags."""
    placeholders = {}
    for idx, tag in enumerate(_ALLOWED_TAGS):
        ph = f"\x00{idx}\x00"
        placeholders[ph] = tag
        text = text.replace(tag, ph)
    text = (
        text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
    )
    for ph, tag in placeholders.items():
        text = text.replace(ph, tag)
    return text


_CSS = f"""
@font-face {{
    font-family: "Lexend";
    src: url("file://{FONT_DIR}/Lexend-Variable-latin.woff2") format("woff2");
    font-weight: 100 900;
    font-style: normal;
}}
@font-face {{
    font-family: "Source Sans 3";
    src: url("file://{FONT_DIR}/SourceSans3-Variable-latin.woff2") format("woff2");
    font-weight: 100 900;
    font-style: normal;
}}
@font-face {{
    font-family: "Source Sans 3";
    src: url("file://{FONT_DIR}/SourceSans3-Italic-Variable-latin.woff2") format("woff2");
    font-weight: 100 900;
    font-style: italic;
}}
@page {{
    size: A4;
    margin: {MARGIN_MM['top']} {MARGIN_MM['right']} {MARGIN_MM['bottom']} {MARGIN_MM['left']};
}}
* {{ box-sizing: border-box; }}
body {{
    font-family: "Source Sans 3", "Segoe UI", Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    color: {INK};
    margin: 0;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
}}
/* Page-1 masthead (in-flow; never position:fixed). */
.masthead {{
    background: linear-gradient(135deg, {GREEN_DEEP} 0%, {GREEN} 70%);
    border-radius: 6px;
    padding: 9mm 8mm 8mm 8mm;
    margin-bottom: 3mm;
}}
.masthead .brand {{
    font-family: "Lexend";
    font-size: 7.5pt;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: {GOLD};
    margin: 0 0 3.5mm 0;
}}
.masthead h1 {{
    font-family: "Lexend";
    font-size: 18.5pt;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 1.2;
    margin: 0 0 3mm 0;
}}
.masthead .sub {{
    font-size: 9pt;
    line-height: 1.45;
    color: #E9E3D1;
    margin: 0;
}}
.goldrule {{
    width: 24mm;
    height: 1.1mm;
    background: {GOLD};
    border-radius: 1mm;
    margin: 0 0 6.5mm 0;
}}
/* Section headings: green Lexend with a gold bar. */
h2 {{
    font-family: "Lexend";
    font-size: 12pt;
    font-weight: 600;
    color: {GREEN};
    line-height: 1.3;
    margin: 6.5mm 0 2.4mm 0;
    padding-left: 3mm;
    border-left: 1.1mm solid {GOLD};
    break-after: avoid;
    page-break-after: avoid;
}}
p {{
    margin: 0 0 2.2mm 0;
    orphans: 3;
    widows: 3;
}}
ul, ol {{
    margin: 0 0 2.8mm 0;
    padding-left: 5.5mm;
}}
ul > li, ol > li {{
    margin-bottom: 1.1mm;
    /* A single bullet/number never splits across pages. */
    break-inside: avoid;
    page-break-inside: avoid;
}}
ul > li::marker {{ color: {GOLD_DARK}; }}
ol > li::marker {{
    color: {GREEN};
    font-weight: 600;
}}
b, strong {{ font-weight: 600; }}
i, em {{ font-style: italic; }}
/* Keep a heading attached to its first content block (validated approach;
   Chrome ignores break-after:avoid chains, so we group instead). */
.keep {{
    break-inside: avoid;
    page-break-inside: avoid;
}}
/* Version Control panel. */
.version-block {{
    margin-top: 7mm;
    background: {CREAM};
    border: 0.6pt solid {BORDER};
    border-left: 1.2mm solid {GREEN};
    border-radius: 4px;
    padding: 4.5mm 5.5mm 3.5mm 5.5mm;
    break-inside: avoid;
    page-break-inside: avoid;
}}
.version-block h2 {{
    border-left: none;
    padding-left: 0;
    margin: 0 0 2.8mm 0;
}}
.vc-grid {{
    display: grid;
    grid-template-columns: 36mm 1fr;
    row-gap: 1.3mm;
    margin: 0;
}}
.vc-grid dt {{
    font-weight: 600;
    color: {GREEN};
}}
.vc-grid dd {{
    margin: 0;
}}
/* Closing contact block (page identity without fixed footers). */
.closing {{
    margin-top: 4mm;
    padding-top: 2.5mm;
    border-top: 0.5pt solid {BORDER};
    font-size: 8.5pt;
    color: {MUTED};
    display: flex;
    justify-content: space-between;
}}
.closing .right {{ color: {GREEN}; font-weight: 600; }}
/* The Version Control panel and the closing line belong together: they are
   never separated by a page break (avoids an orphaned near-blank last page). */
.endmatter {{
    break-inside: avoid;
    page-break-inside: avoid;
}}
"""


def _blocks_html(blocks):
    parts = []
    for kind, payload in blocks:
        if kind == "p":
            parts.append(f"<p>{_escape(payload)}</p>")
        elif kind == "bullets":
            items = "".join(f"<li>{_escape(it)}</li>" for it in payload)
            parts.append(f"<ul>{items}</ul>")
        elif kind == "numbers":
            items = "".join(f"<li>{_escape(it)}</li>" for it in payload)
            parts.append(f"<ol>{items}</ol>")
        else:
            raise ValueError(f"unknown block kind: {kind}")
    return parts


def _units(blocks):
    """Group blocks into keep-together units.

    A lead-in paragraph immediately followed by a list is one unit (bold role
    labels like "Practice Manager:" must never strand at a page bottom with
    their list on the next page). Any other block is its own unit.
    """
    units = []
    i = 0
    while i < len(blocks):
        kind, payload = blocks[i]
        if kind == "p" and i + 1 < len(blocks) and blocks[i + 1][0] in ("bullets", "numbers"):
            units.append([(kind, payload), blocks[i + 1]])
            i += 2
        else:
            units.append([(kind, payload)])
            i += 1
    return units


def _build_html(title: str, owner: str, sections, *, version: str, effective_date: str,
                next_review: str) -> str:
    """Assemble the full HTML document for one policy."""
    body_parts = [
        '<div class="masthead">'
        '<p class="brand">ClinicIQ Solutions &#183; Policy Template</p>'
        f"<h1>{_escape(title)}</h1>"
        f'<p class="sub">{_escape(STANDARDS_LINE)}</p>'
        "</div>"
        '<div class="goldrule"></div>',
    ]

    for heading, blocks in sections:
        units = _units(blocks)
        # Group the heading with its first unit so the heading never strands
        # at the bottom of a page.
        head = f"<h2>{_escape(heading)}</h2>"
        if units:
            first = "".join(_blocks_html(units[0]))
            body_parts.append(f'<div class="keep">{head}{first}</div>')
            for unit in units[1:]:
                unit_html = "".join(_blocks_html(unit))
                if len(unit) > 1:
                    body_parts.append(f'<div class="keep">{unit_html}</div>')
                else:
                    body_parts.append(unit_html)
        else:
            body_parts.append(head)

    # Version control block (6th-edition requirement: dated, attributed, reviewed)
    # plus the closing line, kept together as one end-matter unit.
    vc_pairs = [
        ("Policy title", _escape(title)),
        ("Version", _escape(version)),
        ("Effective date", _escape(effective_date)),
        ("Next review date", _escape(next_review)),
        ("Policy owner", _escape(owner)),
        ("Aligned to", "RACGP Standards for general practices (6th edition, published August 2026)"),
    ]
    cells = "".join(f"<dt>{k}</dt><dd>{v}</dd>" for k, v in vc_pairs)
    body_parts.append(
        '<div class="endmatter">'
        '<div class="version-block"><h2>Version Control</h2>'
        f'<dl class="vc-grid">{cells}</dl></div>'
        '<div class="closing"><span>ClinicIQ Solutions</span>'
        '<span class="right">cliniciq.com.au</span></div>'
        "</div>"
    )

    return (
        '<!DOCTYPE html><html lang="en-AU"><head><meta charset="utf-8">'
        f"<title>{_escape(title)}</title><style>{_CSS}</style></head>"
        f"<body>{''.join(body_parts)}</body></html>"
    )


@contextmanager
def batch():
    """Context manager yielding a single Playwright page reused across renders.

    Use this to avoid launching a browser per PDF. Falls back to per-call
    browsers if render_policy() is used standalone (page=None).
    """
    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        )
        page = browser.new_page()
        try:
            yield page
        finally:
            browser.close()


def render_policy(title: str, filename: str, out_dir: str, *,
                  owner: str = "Practice Manager",
                  version: str = VERSION,
                  effective_date: str = EFFECTIVE_DATE,
                  next_review: str = NEXT_REVIEW,
                  page=None) -> str:
    """Render one policy PDF. Returns the absolute output path.

    title:         full human title (e.g. "Infection Control Policy")
    filename:      stem without extension (e.g. "Infection_Control_Policy")
    out_dir:       directory to write <filename>.pdf
    owner:         policy owner name (for the Version Control block)
    version:       policy version string (Version Control block)
    effective_date / next_review: dates for the Version Control block
    page:          an existing Playwright page (use inside `with batch() as page:`).
                   If None, a throwaway browser is launched for this call.
    """
    sections = _SECTIONS  # injected by caller via build_section_list()
    html = _build_html(title, owner, sections, version=version,
                       effective_date=effective_date, next_review=next_review)

    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{filename}.pdf")

    # Fonts load via file:// URLs, so the document must be navigated from a
    # file:// base rather than set_content (about:blank blocks file fonts).
    tmp_html = os.path.join(tempfile.gettempdir(), f"policy_{filename}.html")
    with open(tmp_html, "w", encoding="utf-8") as fh:
        fh.write(html)

    own_browser = page is None
    if own_browser:
        pw = sync_playwright().start()
        browser = pw.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        )
        page = browser.new_page()
    try:
        page.goto(f"file://{tmp_html}", wait_until="networkidle")
        page.pdf(
            path=out_path,
            format="A4",
            print_background=True,
            margin=MARGIN_MM,
        )
    finally:
        if own_browser:
            browser.close()
            pw.stop()
    return out_path


def build_section_list(sections):
    """Inject the section list for render_policy(). Returns sections unchanged."""
    global _SECTIONS
    _SECTIONS = sections
    return sections
