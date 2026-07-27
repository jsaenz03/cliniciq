Rewrite `scripts/policies/renderer.py` to render HTML → A4 PDF via Playwright headless Chrome (already installed and verified working on this machine).

## What changes
**One file:** `scripts/policies/renderer.py` — same public API (`render_policy`, `build_section_list`, `RACGP_6TH_REF`, `EFFECTIVE_DATE`, etc.) so:
- All 24 policy content modules (`p_*.py`) stay **unchanged**.
- `scripts/generate_policies.py` stays **unchanged**.

## What it fixes
1. **Bullets render as `•`** — currently the literal word "bullet" prints (the bug you reported). HTML `<ul>` gives a real bullet symbol.
2. **No orphan headings** — CSS `page-break-after: avoid` on `<h2>` keeps a section title with its first block (fixes the page-3 cutoff in AI Governance where "12. Education and Training" was stranded).
3. **No split list items** — `page-break-inside: avoid` on `<li>`.
4. Cleaner typography overall (proper line-height, orphans/widows control).

## How
- Build an HTML string from the existing `(heading, blocks)` data, with CSS matching the original look (Helvetica, A4, 24pt title / 18pt headings / 12pt body, #333 heading colour).
- One shared Playwright browser session renders all 24 PDFs (added as a `batch()` context manager; `generate_policies.py` will be updated to wrap the render loop in it — a 2-line change there).
- Margins set via Playwright's `pdf(margin=...)` (25mm sides, 22mm top/bottom — matches originals).

## Verification (same audit as before)
- All 24 PDFs still exist with exact filenames.
- All cite 6th edition, dated 26 July 2026, with Version Control block.
- New check: text extraction confirms bullets are `•` (or the list text without the word "bullet"), and no `<h2>` heading is the last block on any page.
- Spot-render one page to PNG and visually confirm clean formatting.

No other files touched. No new dependencies (Playwright already installed).