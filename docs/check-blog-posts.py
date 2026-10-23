#!/usr/bin/env python3
"""Consistency checks for cliniciq.com.au blog posts, blog.html and sitemap.xml.

Run: python3 docs/check-blog-posts.py
Exits non-zero on the first category of failure; prints a summary verdict.
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
BLOG = ROOT / "blog"
NEW_POSTS = {
    "gp-clinic-stock-take-checklist.html",
    "clinic-task-run-sheet-gp-practice.html",
    "gpccmp-documentation-workflow.html",
    "pip-qi-data-checklist.html",
    "clinical-photo-consent-workflow.html",
}
PUB_DATE = "2026-10-23"
FORBIDDEN_HOSTS = re.compile(r"nursepod(?!3)\.jsaenz\.au|docuwhisper\.jsaenz\.au")

errors: list[str] = []


def err(msg: str) -> None:
    errors.append(msg)
    print(f"  FAIL {msg}")


def json_ld_blocks(html: str):
    blocks = []
    for m in re.finditer(
        r'<script type="application/ld\+json">(.*?)</script>', html, re.S
    ):
        try:
            blocks.append(json.loads(m.group(1)))
        except json.JSONDecodeError as e:
            err(f"invalid JSON-LD: {e}")
    return blocks


def resolve_local(base_dir: Path, href: str) -> Path | None:
    """Return the file a same-site relative href points at, else None."""
    path = urlparse(href).path
    if not path:
        return None
    target = (base_dir / path).resolve()
    return target if target.exists() else None


def check_post(path: Path) -> None:
    html = path.read_text(encoding="utf-8")
    slug = path.name

    if 'lang="en-AU"' not in html:
        err(f"{slug}: missing lang=en-AU")
    if FORBIDDEN_HOSTS.search(html):
        err(f"{slug}: links a forbidden legacy host")

    canonical = re.search(r'rel="canonical" href="([^"]+)"', html)
    if not canonical or not canonical.group(1).endswith(f"/blog/{slug}"):
        err(f"{slug}: canonical missing or mismatched")

    title = re.search(r"<title>(.*?)</title>", html)
    if title and len(title.group(1)) > 65:
        err(f"{slug}: title {len(title.group(1))} chars (>65)")
    desc = re.search(r'name="description" content="([^"]+)"', html)
    if desc and len(desc.group(1)) > 165:
        err(f"{slug}: meta description {len(desc.group(1))} chars (>165)")

    types = set()
    posting = None
    faq_page = None
    for block in json_ld_blocks(html):
        t = block.get("@type")
        if isinstance(t, list):
            types.update(t)
        else:
            types.add(t)
        if t == "BlogPosting":
            posting = block
        elif t == "FAQPage":
            faq_page = block
    required = {"Organization", "BreadcrumbList", "BlogPosting"}
    if slug in NEW_POSTS:
        required.add("FAQPage")
    for required_type in required:
        if required_type not in types:
            err(f"{slug}: JSON-LD missing {required_type}")

    if posting:
        date = posting.get("datePublished")
        if slug in NEW_POSTS and date != PUB_DATE:
            err(f"{slug}: datePublished {date}, expected {PUB_DATE}")
        headline = posting.get("headline", "")
        h1 = re.search(r'<h1 class="article-title">(.*?)</h1>', html, re.S)
        if slug in NEW_POSTS and h1 and headline != h1.group(1).strip():
            err(f"{slug}: BlogPosting headline != H1")
    elif slug in NEW_POSTS:
        err(f"{slug}: no BlogPosting block")

    # Visible FAQ should mirror the FAQPage schema (checked for new posts only;
    # older posts predate this rule).
    if slug in NEW_POSTS and faq_page:
        schema_q = {q.get("name") for q in faq_page.get("mainEntity", [])}
        h3s = re.findall(r'<h3 style="margin-bottom:0\.5rem;">(.*?)</h3>', html)
        if {re.sub(r"\s+", " ", h).strip() for h in h3s} != schema_q:
            err(f"{slug}: visible FAQ headings != FAQPage questions")

    # Every same-site relative link resolves (query strings and fragments stripped).
    for m in re.finditer(r'(?:href|src)="\.\./([^"]*)"', html):
        clean = m.group(1).split("#")[0].split("?")[0]
        if clean and not (ROOT / clean).exists():
            err(f"{slug}: broken relative link ../{m.group(1)}")


def check_blog_index() -> None:
    html = (ROOT / "blog.html").read_text(encoding="utf-8")
    card_links = set(re.findall(r'href="(blog/[^"]+)"', html))
    for link in sorted(card_links):
        if not (ROOT / link).exists():
            err(f"blog.html: card link to missing file {link}")
    posts = {f.name for f in BLOG.glob("*.html")}
    missing_cards = posts - {l.split("/", 1)[1] for l in card_links}
    if missing_cards:
        err(f"blog.html: no card for {sorted(missing_cards)}")

    listed = []
    for block in json_ld_blocks(html):
        if block.get("@type") == "Blog":
            listed = block.get("blogPost", [])
    urls = {e.get("url", "") for e in listed}
    if len(listed) != len(posts):
        err(f"blog.html: Blog schema lists {len(listed)} posts, {len(posts)} exist")
    for u in urls:
        name = u.rsplit("/", 1)[-1]
        if not (BLOG / name).exists():
            err(f"blog.html: Blog schema lists missing post {name}")
    missing_schema = posts - {u.rsplit("/", 1)[-1] for u in urls}
    if missing_schema:
        err(f"blog.html: Blog schema missing {sorted(missing_schema)}")


def check_sitemap() -> None:
    tree = ET.parse(ROOT / "sitemap.xml")
    ns = {"s": tree.getroot().tag.split("}")[0].strip("{")}
    entries = {
        loc.text: (e.findtext("s:lastmod", namespaces=ns) or "")
        for e in tree.getroot().findall("s:url", ns)
        for loc in e.findall("s:loc", ns)
    }
    posts = {f"https://cliniciq.com.au/blog/{f.name}" for f in BLOG.glob("*.html")}
    missing = posts - set(entries)
    if missing:
        err(f"sitemap.xml: missing {sorted(missing)}")
    for slug in NEW_POSTS:
        url = f"https://cliniciq.com.au/blog/{slug}"
        if entries.get(url) != PUB_DATE:
            err(f"sitemap.xml: {slug} lastmod={entries.get(url)!r}, expected {PUB_DATE}")


def main() -> int:
    print(f"Checking {len(list(BLOG.glob('*.html')))} blog posts ...")
    for path in sorted(BLOG.glob("*.html")):
        check_post(path)
    print("Checking blog.html index ...")
    check_blog_index()
    print("Checking sitemap.xml ...")
    check_sitemap()

    if errors:
        print(f"\nVERDICT: FAIL ({len(errors)} problem(s))")
        return 1
    print("\nVERDICT: PASS — posts, blog.html and sitemap.xml are consistent")
    return 0


if __name__ == "__main__":
    sys.exit(main())
