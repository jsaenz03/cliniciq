"""HTML + Playwright (headless Chrome) renderer for ClinicIQ policy PDFs.

Builds a clean HTML document from the (heading, blocks) section structure and
prints it to an A4 PDF via Chromium. This replaces the earlier reportlab
renderer, fixing:
  - bullet points now render as a real "•" symbol (reportlab was printing the
    literal word "bullet");
  - section headings never orphan at the bottom of a page (CSS
    page-break-after: avoid);
  - a single list item never splits across pages (page-break-inside: avoid).

Visual style matches the original WeasyPrint output: Helvetica, A4, 24pt bold
title (#333), 18pt bold headings (#333), 12pt body.

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
from contextlib import contextmanager

from playwright.sync_api import sync_playwright

# --- Visual constants (match the original WeasyPrint output) -------------
TITLE_SIZE_PT = 24
HEADING_SIZE_PT = 18
BODY_SIZE_PT = 12
TEXT_COLOR = "#333333"
BODY_COLOR = "#000000"

EFFECTIVE_DATE = "27 August 2026"
NEXT_REVIEW = "27 August 2027"
VERSION = "2.1"  # published 6th edition (26 Aug 2026) — criteria F/CG/PP/CQI codes added; v2.0 was the draft-for-consultation revision

# Shared citation for the 6th-edition Standards, used in every References section.
# The 6th edition was published by the RACGP on 26 August 2026.
RACGP_6TH_REF = (
    "The Royal Australian College of General Practitioners. "
    "Standards for general practices (6th edition). "
    "East Melbourne, Vic: RACGP; published 26 August 2026. "
    "Available at: https://www.racgp.org.au/running-a-practice/practice-standards/standards-6th-edition"
)

# Page geometry — margins in mm (Playwright pdf() honours these over @page).
MARGIN_MM = {"top": "22mm", "bottom": "22mm", "left": "25mm", "right": "25mm"}

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
@page {{
    size: A4;
    margin: {MARGIN_MM['top']} {MARGIN_MM['right']} {MARGIN_MM['bottom']} {MARGIN_MM['left']};
}}
* {{ box-sizing: border-box; }}
body {{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: {BODY_SIZE_PT}pt;
    line-height: 1.45;
    color: {BODY_COLOR};
    margin: 0;
}}
h1 {{
    font-size: {TITLE_SIZE_PT}pt;
    font-weight: 700;
    color: {TEXT_COLOR};
    line-height: 1.2;
    margin: 0 0 8mm 0;
}}
h2 {{
    font-size: {HEADING_SIZE_PT}pt;
    font-weight: 700;
    color: {TEXT_COLOR};
    line-height: 1.25;
    margin: 7mm 0 3mm 0;
    /* Never leave a heading stranded at the bottom of a page. */
    page-break-after: avoid;
    break-after: avoid;
}}
p {{
    margin: 0 0 2.5mm 0;
    orphans: 2;
    widows: 2;
}}
ul, ol {{
    margin: 0 0 3mm 0;
    padding-left: 6mm;
}}
ul > li, ol > li {{
    margin-bottom: 1.5mm;
    line-height: 1.45;
    /* A single bullet/number never splits across pages. */
    page-break-inside: avoid;
    break-inside: avoid;
}}
/* Keep the heading attached to the block that immediately follows it. */
h2 + p, h2 + ul, h2 + ol {{
    page-break-before: avoid;
    break-before: avoid;
}}
/* The Version Control block stays together on one page where possible. */
.version-block {{
    margin-top: 8mm;
    padding-top: 4mm;
    border-top: 0.5pt solid #cccccc;
    page-break-inside: avoid;
    break-inside: avoid;
}}
.version-block ul {{
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
}}
.version-block li {{
    margin-bottom: 1mm;
}}
"""


def _build_html(title: str, owner: str, sections) -> str:
    """Assemble the full HTML document for one policy."""
    body_parts = [f"<h1>{_escape(title)}</h1>"]

    for heading, blocks in sections:
        body_parts.append(f"<h2>{_escape(heading)}</h2>")
        for kind, payload in blocks:
            if kind == "p":
                body_parts.append(f"<p>{_escape(payload)}</p>")
            elif kind == "bullets":
                items = "".join(f"<li>{_escape(it)}</li>" for it in payload)
                body_parts.append(f"<ul>{items}</ul>")
            elif kind == "numbers":
                items = "".join(f"<li>{_escape(it)}</li>" for it in payload)
                body_parts.append(f"<ol>{items}</ol>")
            else:
                raise ValueError(f"unknown block kind: {kind}")

    # Version control block (6th-edition requirement: dated, attributed, reviewed).
    vc = [
        f"<strong>Policy title:</strong> {_escape(title)}",
        f"<strong>Version:</strong> {VERSION}",
        f"<strong>Effective date:</strong> {EFFECTIVE_DATE}",
        f"<strong>Next review date:</strong> {NEXT_REVIEW}",
        f"<strong>Policy owner:</strong> {_escape(owner)}",
        "<strong>Aligned to:</strong> RACGP Standards for general practices (6th edition, published August 2026)",
    ]
    vc_items = "".join(f"<li>{item}</li>" for item in vc)
    body_parts.append(
        f'<div class="version-block"><h2>Version Control</h2><ul>{vc_items}</ul></div>'
    )

    return (
        "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\">"
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
        browser = pw.chromium.launch()
        page = browser.new_page()
        try:
            yield page
        finally:
            browser.close()


def render_policy(title: str, filename: str, out_dir: str, *,
                  owner: str = "Practice Manager", page=None) -> str:
    """Render one policy PDF. Returns the absolute output path.

    title:    full human title (e.g. "Infection Control Policy")
    filename: stem without extension (e.g. "Infection_Control_Policy")
    out_dir:  directory to write <filename>.pdf
    owner:    policy owner name (for the Version Control block)
    page:     an existing Playwright page (use inside `with batch() as page:`).
              If None, a throwaway browser is launched for this call.
    """
    sections = _SECTIONS  # injected by caller via build_section_list()
    html = _build_html(title, owner, sections)

    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{filename}.pdf")

    own_browser = page is None
    if own_browser:
        pw = sync_playwright().start()
        browser = pw.chromium.launch()
        page = browser.new_page()
    try:
        page.set_content(html, wait_until="domcontentloaded")
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
