#!/usr/bin/env python3
"""Generate the five product-pairing blog card images via MuAPI (flux-schnell).

Reads MUAPI_API from the environment or ~/.zshenv — the key is never printed.
Downloads PNGs to /tmp/muapi-blog/, then converts to WebP at the card size
used by blog.html (1376x768) with cwebp.

Run: python3 scripts/generate-blog-images.py
"""
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = Path("/tmp/muapi-blog")
WEBP_DIR = ROOT / "assets/photos/blog"
MODEL = "flux-schnell-image"
WIDTH, HEIGHT = 1408, 768  # muapi requires multiples of 64
CARD_W, CARD_H = 1376, 768  # card size used by blog.html; cwebp resizes down
QUALITY = 80

JOBS = [
    ("stock-take", "GP Clinic Stock Take",
     "Bright modern Australian GP clinic storeroom, neatly organised medical supply "
     "shelves with plain unmarked boxes, a nurse's hand holding a tablet checking "
     "stock, vaccine refrigerator with glass door in the background, soft natural "
     "light, clean minimal healthcare interior, professional photograph, no text, "
     "no logos"),
    ("run-sheet", "Clinic Task Run-Sheet",
     "Two healthcare workers in a bright GP practice having a morning huddle beside "
     "the nurses' station, seen from behind, one holding a tablet with a checklist, "
     "warm natural light, modern clinic interior with plants, professional "
     "photograph, no text, no logos"),
    ("gpccmp", "GPCCMP Documentation Workflow",
     "Over-the-shoulder view of a doctor at a tidy desk reviewing a structured "
     "medical care plan on a laptop screen, stethoscope on the desk, bright modern "
     "consulting room, soft daylight, professional photograph, screen content "
     "blurred, no readable text, no logos"),
    ("pipqi", "PIP QI Data Checklist",
     "Computer monitor on a clinic office desk displaying a clean healthcare "
     "analytics dashboard with simple bar charts and an upward trend line, green "
     "and cream colour palette, blurred clinic background, shallow depth of field, "
     "professional photograph, no readable text, no logos"),
    ("camog", "Clinical Photo Consent",
     "Clinical photography corner of a medical consulting room: a digital camera on "
     "a small tripod beside an examination couch and a desktop workstation, bright "
     "clean room with soft daylight, no people, professional photograph, no text, "
     "no logos"),
]


def api_key() -> str:
    key = os.environ.get("MUAPI_API")
    if key:
        return key.strip()
    zshenv = Path.home() / ".zshenv"
    m = re.search(r'^\s*(?:export\s+)?MUAPI_API="?([^"\n]+)"?\s*$',
                  zshenv.read_text(), re.M)
    if not m:
        sys.exit("MUAPI_API not found in environment or ~/.zshenv")
    return m.group(1).strip()


def request(url: str, key: str, payload=None):
    req = urllib.request.Request(url, method="POST" if payload else "GET")
    req.add_header("x-api-key", key)
    data = None
    if payload:
        req.add_header("Content-Type", "application/json")
        data = json.dumps(payload).encode()
    try:
        with urllib.request.urlopen(req, data=data, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:500]
        sys.exit(f"HTTP {e.code} from {url.split('/api/')[0]}...: {body}")


def find_image_url(obj):
    if isinstance(obj, str) and obj.startswith("http") and "api.muapi.ai" not in obj:
        return obj
    if isinstance(obj, dict):
        for v in obj.values():
            found = find_image_url(v)
            if found:
                return found
    if isinstance(obj, list):
        for v in obj:
            found = find_image_url(v)
            if found:
                return found
    return None


def generate(slug: str, key: str) -> Path:
    out_png = OUT_DIR / f"{slug}.png"
    if out_png.exists() and out_png.stat().st_size > 10_000:
        print(f"  {slug}: reusing cached {out_png}")
        return out_png
    print(f"  {slug}: submitting ...")
    resp = request(f"https://api.muapi.ai/api/v1/{MODEL}", key,
                   {"prompt": next(p for s, _, p in JOBS if s == slug),
                    "width": WIDTH, "height": HEIGHT, "num_images": 1})
    request_id = resp.get("request_id") or resp.get("id")
    if not request_id:
        sys.exit(f"  {slug}: no request_id in submit response: {str(resp)[:300]}")
    print(f"  {slug}: request {request_id}")
    url = find_image_url(resp)
    deadline = time.time() + 240
    while not url and time.time() < deadline:
        time.sleep(4)
        poll = request(f"https://api.muapi.ai/api/v1/predictions/{request_id}/result",
                       key)
        status = poll.get("status")
        url = find_image_url(poll.get("outputs"))
        print(f"    status={status}")
        if status == "failed":
            sys.exit(f"  {slug}: generation failed: {poll}")
    if not url:
        sys.exit(f"  {slug}: timed out waiting for result")
    urllib.request.urlretrieve(url, out_png)
    print(f"  {slug}: downloaded {out_png.stat().st_size // 1024} KB")
    return out_png


def main() -> int:
    key = api_key()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, name, _prompt in JOBS:
        png = generate(slug, key)
        webp = WEBP_DIR / f"{name}.webp"
        subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY),
                        "-resize", str(CARD_W), str(CARD_H), str(png),
                        "-o", str(webp)], check=True)
        print(f"  {slug}: wrote {webp} ({webp.stat().st_size // 1024} KB)")
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
