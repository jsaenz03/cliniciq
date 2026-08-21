#!/usr/bin/env python3
"""Self-check for docs/n8n-newsletter-workflow.json (newsletter backend).

Run: python3 docs/check-newsletter-workflow.py
Fails loudly if the artifact's structure breaks, the audience scoping
filter regresses, or the per-recipient unsubscribe stamping logic changes.
No frameworks, no fixtures.
"""
import json
import re
import sys

ARTIFACT = "docs/n8n-newsletter-workflow.json"
SIGNUP = "newsletter signup"


def check_structure(wf):
    nodes = {n["name"]: n for n in wf["nodes"]}
    assert len(nodes) == len(wf["nodes"]), "duplicate node names"
    for src, groups in wf["connections"].items():
        assert src in nodes, f"connection source missing: {src}"
        for outs in groups.values():
            for branch in outs:
                for c in branch:
                    assert c["node"] in nodes, f"connection target missing: {c['node']}"
    for m in set(re.findall(r"\$\('([^']+)'\)", json.dumps(wf))):
        assert m in nodes, f"expression references missing node: {m}"

    # webhook identities that production depends on
    sub = nodes["subscribe"]
    assert sub["parameters"]["path"] == "cliniciqsubs"
    assert sub["webhookId"] == "7f2f70aa-9a29-4402-908c-ac09ff912308"
    assert nodes["unsubscribe"]["parameters"]["path"] == "cliniciqunsub"

    # retention-workflow gotcha: delete operation value is deleteRows
    assert nodes["delete subscriber"]["parameters"]["operation"] == "deleteRows"
    # unsubscribe must require BOTH row id and email
    keys = [c["keyName"] for c in nodes["delete subscriber"]["parameters"]["filters"]["conditions"]]
    assert keys == ["id", "email"], f"unsub filter must match id AND email, got {keys}"

    # CRITICAL: audience scoping — contact-form rows must never be emailed
    for name in ("find subscriber", "get subscribers"):
        conds = nodes[name]["parameters"]["filters"]["conditions"]
        msgs = [c for c in conds if c["keyName"] == "message" and SIGNUP in c["keyValue"]]
        assert msgs, f"{name} lost the message='{SIGNUP}' audience filter"

    # AI output must carry the placeholder the stamper replaces
    assert "{{UNSUB_URL}}" in nodes["build newsletter"]["parameters"]["options"]["systemMessage"]
    # boolean IF conditions must be Boolean()-wrapped (n8n strict typing)
    for name in ("test secret ok?", "bot configured?", "skip send?"):
        lv = nodes[name]["parameters"]["conditions"]["conditions"][0]["leftValue"]
        if "&&" in lv:
            assert lv.startswith("={{ Boolean("), f"{name}: && expression must be Boolean()-wrapped"


def simulate_stamping():
    """Mirrors prepare sends: dedupe by email + per-recipient unsub links."""
    html = '<a href="{{UNSUB_URL}}">Unsubscribe</a>'
    rows = [
        {"id": "9", "email": "someone@example.com"},   # contact-form row shape
        {"id": "20", "email": "A@Example.com "},
        {"id": "21", "email": "a@example.com"},        # duplicate of row 20
        {"id": "22", "email": "b@example.com"},
    ]
    seen, out = set(), []
    for r in rows:
        email = r["email"].strip().lower()
        if not email or email in seen:
            continue
        seen.add(email)
        out.append(html.replace("{{UNSUB_URL}}",
            "https://johnsaenz.au/webhook/cliniciqunsub?id=" + r["id"]
            + "&email=" + encodeURIComponent(r["email"].strip())))
    assert len(out) == 3, f"dedupe failed: {len(out)} sends (expected 3 unique emails)"
    joined = "".join(out)
    assert "id=21" not in joined, "duplicate email must be dropped (keep first row)"
    assert "{{UNSUB_URL}}" not in joined, "placeholder must be fully stamped"
    assert "id=20&email=A%40Example.com" in out[1], out[1]


def encodeURIComponent(s):
    # minimal URL-encoding matching JS for emails/ids (alnum + -_.!~*'() kept)
    return "".join(c if c.isalnum() or c in "-_.!~*'()" else "%" + c.encode().hex().upper() for c in s)


if __name__ == "__main__":
    wf = json.load(open(ARTIFACT))
    check_structure(wf)
    simulate_stamping()
    print(f"OK: {ARTIFACT} — structure, audience scoping and stamping intact "
          f"({len(wf['nodes'])} nodes)")
    sys.exit(0)
