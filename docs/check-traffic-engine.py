#!/usr/bin/env python3
"""Self-check for the traffic engine: n8n artifact, IndexNow key file, and the
nurse-first blog articles it pings.

Run: python3 docs/check-traffic-engine.py
Fails loudly if the artifact structure breaks, the key file drifts from the
artifact, or the articles/sitemap/redirects/blog-index wiring comes apart.
No frameworks, no fixtures.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTIFACT = ROOT / "docs" / "n8n-traffic-engine.json"
SITEMAP = ROOT / "sitemap.xml"
REDIRECTS = ROOT / "_redirects"
BLOG_INDEX = ROOT / "blog.html"

ARTICLES = [
    "cdm-mbs-items-practice-nurses",
    "vaccine-cold-chain-checklist",
    "flu-clinic-run-sheet-practice-nurses",
]


def check_artifact():
    wf = json.loads(ARTIFACT.read_text())
    assert set(wf) == {"name", "nodes", "connections", "settings"}, \
        "artifact must not carry read-only fields like `active` (n8n API rejects them)"
    nodes = {n["name"]: n for n in wf["nodes"]}
    assert len(nodes) == len(wf["nodes"]), "duplicate node names"

    hook = nodes["deploy ping"]
    assert hook["parameters"]["path"] == "cliniciqtrafficking", "webhook path drifted"
    assert hook["parameters"]["httpMethod"] == "POST"
    assert hook["parameters"]["responseMode"] == "onReceived", "deploy pings must answer instantly"
    assert hook.get("webhookId"), "webhookId required for production registration"

    cond = nodes["secret ok?"]["parameters"]["conditions"]["conditions"][0]
    assert "PLACEHOLDER" in cond["rightValue"], \
        "artifact is in a public repo — the real secret lives only in the live workflow"
    assert cond["operator"] == {"type": "string", "operation": "equals"}

    code = nodes["diff + state"]["parameters"]["jsCode"]
    assert "$getWorkflowStaticData('global')" in code, "state must persist via staticData"
    assert "lastmod" in code, "diff must key on lastmod, not URL list equality"

    # deploy_created fires when the build STARTS, so the webhook branch must wait
    # before pinging; the weekly cron branch must NOT go through the wait.
    wait = nodes["wait for deploy"]["parameters"]
    assert wait.get("amount") == 4 and wait.get("unit") == "minutes", "deploy branch must wait 4 min"
    conns = wf["connections"]
    assert conns["secret ok?"]["main"][0][0]["node"] == "wait for deploy"
    assert conns["wait for deploy"]["main"][0][0]["node"] == "get sitemap"
    assert conns["secret ok?"]["main"][1][0]["node"] == "reject spam"
    assert conns["schedule weekly"]["main"][0][0]["node"] == "get sitemap", "cron must not wait"

    ping = nodes["ping indexnow"]["parameters"]
    assert "api.indexnow.org/indexnow" in ping["url"]
    key = re.search(r"key: '([0-9a-f]{32})'", ping["jsonBody"]).group(1)
    assert f"keyLocation: 'https://cliniciq.com.au/{key}.txt'" in ping["jsonBody"], \
        "keyLocation must point at the key file hosted at the site root"

    mail = nodes["email report"]
    assert mail["credentials"]["smtp"]["id"] == "2bR4YfEN9l5t68CI", "reuse the shared SMTP credential"
    assert "johnsaenzau@gmail.com" in mail["parameters"]["toEmail"]
    assert "diff + state" in mail["parameters"]["subject"], "report must reference the diff node"

    assert wf["settings"]["timezone"] == "Australia/Sydney"
    cron = wf["nodes"][0]["parameters"]["rule"]["interval"][0]["expression"]
    assert cron == "0 8 * * 1", "weekly ping must stay Monday 08:00 Sydney"

    for src, groups in wf["connections"].items():
        assert src in nodes, f"connection source missing: {src}"
        for branches in groups.values():
            for branch in branches:
                for c in branch:
                    assert c["node"] in nodes, f"connection target missing: {c['node']}"
    return key


def check_key_file(key):
    key_file = ROOT / f"{key}.txt"
    assert key_file.exists(), f"IndexNow key file missing at repo root: {key}.txt"
    assert key_file.read_text().strip() == key, "key file content must be exactly the key"


def check_articles():
    for slug in ARTICLES:
        p = ROOT / "blog" / f"{slug}.html"
        assert p.exists(), f"missing article: {p}"
        t = p.read_text()

        canonical = re.search(r'<link rel="canonical" href="([^"]+)"', t)
        assert canonical and canonical.group(1) == f"https://cliniciq.com.au/blog/{slug}.html", \
            f"{slug}: canonical wrong"

        blocks = re.findall(r'<script type="application/ld\+json">\s*(\{.*?\})\s*</script>', t, re.S)
        types = {json.loads(b)["@type"] for b in blocks}
        assert {"BlogPosting", "FAQPage", "BreadcrumbList"} <= types, f"{slug}: schema blocks {types}"

        assert "Frequently asked questions" in t, f"{slug}: FAQ must be visible (not just schema)"
        assert "practice nurse" in t.lower(), f"{slug}: nurse-first copy regression"

        # every article must link at least one commercial page and the blog index
        assert re.search(r'href="\.\./(automations|booking)\.html"', t), f"{slug}: no internal CTA link"


def check_wiring():
    sitemap = SITEMAP.read_text()
    for slug in ARTICLES:
        assert f"https://cliniciq.com.au/blog/{slug}.html</loc>" in sitemap, f"{slug} missing from sitemap"
        assert f"/blog/{slug} " in REDIRECTS.read_text(), f"{slug} missing from _redirects"
        assert f'href="blog/{slug}.html"' in BLOG_INDEX.read_text(), f"{slug} not linked from blog.html"


def main():
    key = check_artifact()
    check_key_file(key)
    check_articles()
    check_wiring()
    print(f"traffic engine OK — IndexNow key {key[:8]}…, {len(ARTICLES)} articles wired")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as e:
        print(f"FAIL: {e}", file=sys.stderr)
        sys.exit(1)
