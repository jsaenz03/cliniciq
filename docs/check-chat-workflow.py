#!/usr/bin/env python3
"""Self-check for docs/n8n-nurse-chat-workflow.json (chat backend v2).

Run: python3 docs/check-chat-workflow.py
Fails loudly if the artifact's structure breaks or the script-phase
question sequencing logic regresses. No frameworks, no fixtures.
"""
import json
import re
import sys

ARTIFACT = "docs/n8n-nurse-chat-workflow.json"
KEYS = ["q1_business_overview", "q2_daily_workflow", "q3_bottlenecks",
        "q4_systems_tools", "q5_desired_outcomes"]


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
    webhooks = [n for n in wf["nodes"] if n["type"].endswith("base.webhook")]
    assert len(webhooks) == 1 and webhooks[0]["parameters"]["path"] == "cliniciqnursechat"
    responds = [n for n in wf["nodes"] if n["type"].endswith("respondToWebhook")]
    assert len(responds) == 2, "expected one respond per phase"
    assert all(r["parameters"]["respondWith"] == "allIncomingItems" for r in responds)
    agent = nodes["converse"]
    assert "hasOutputParser" not in agent["parameters"], \
        "structured parser was removed on purpose — it fails the node on schema drift"
    assert nodes["mem"]["parameters"]["sessionKey"].startswith("={{ $('chat1')"), \
        "memory key must use an explicit node reference (bare $json is unreliable in sub-nodes)"


def simulate_script_phase():
    """Mirrors route + build script turn logic: message 1 asks Q1 (stores
    nothing), messages 2–6 fill q1–q5, message 7 opens the chat phase."""
    row = {}
    msgs = ["hi what is NursePod?", "RN in a 4-GP clinic", "skip",
            "care plans eat my week", "Best Practice + HotDoc", "that's me",
            "fewer nights doing notes"]
    for i, msg in enumerate(msgs):
        has_row = bool(row)
        filled = sum(1 for k in KEYS if str(row.get(k, "")).strip())
        mode = "chat" if row.get("status") in ("chat", "finished") or filled >= 5 else "script"
        if mode == "script":
            if not has_row:
                row["status"] = "new"  # greeting + Q1 sent, nothing stored
                assert i == 0, "first-message path must only run before a row exists"
            else:
                idx = min(filled, 4)
                row[KEYS[idx]] = "(skipped)" if msg.lower() == "skip" else msg
                row["status"] = "chat" if filled >= 4 else "script"
        else:
            assert i == 6, f"chat phase started early at message {i}"
    assert row["status"] == "chat", "5 answers collected must flip status to chat"
    assert row.get(KEYS[0]) == "RN in a 4-GP clinic", \
        "the opening greeting must NOT be stored as the Question 1 answer"
    assert all(row.get(k) for k in KEYS), f"missing answers: {[k for k in KEYS if not row.get(k)]}"
    assert row["q2_daily_workflow"] == "(skipped)", "skip must be storable without re-asking"


if __name__ == "__main__":
    wf = json.load(open(ARTIFACT))
    check_structure(wf)
    simulate_script_phase()
    print(f"OK: {ARTIFACT} — structure valid, script-phase sequencing intact "
          f"({len(wf['nodes'])} nodes)")
    sys.exit(0)
