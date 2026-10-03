#!/usr/bin/env python3
"""Verify the generated policy PDFs (RACGP 6th edition suite).

Checks every PDF in downloads/templates/ for:
  - suite-wide invariants: cites the 6th edition, has a Version Control block,
    no leaked markup, no literal "bullet", no em-dashes, no "5th edition"
    leftovers, no draft language;
  - per-policy sentinels: every v2.2 content patch (criterion gap fixes) must
    be present in the extracted text;
  - pagination: no numbered section heading stranded as the last line of a page.

Usage:
    /tmp/pdfenv/bin/python scripts/check_policies.py     # any python with pypdf

Exits non-zero on any failure.
"""

from __future__ import annotations

import os
import sys

from pypdf import PdfReader

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(os.path.dirname(HERE), "downloads", "templates")

# Suite-wide invariants: (label, predicate on full text) — predicate False = fail.
INVARIANTS = [
    ("cites 6th edition", lambda t: "6th edition" in t),
    ("version block", lambda t: "Version Control" in t),
    ("no leaked markup", lambda t: "<b>" not in t and "<i>" not in t),
    ("no literal 'bullet'", lambda t: "\nbullet\n" not in t and not t.startswith("bullet\n")),
    ("no em-dashes", lambda t: "\u2014" not in t),
    ("no 5th ed leftover", lambda t: "5th edition" not in t),
    ("no draft language", lambda t: not any(
        p in t for p in (
            "draft for consultation", "in development", "anticipated under",
            "Standard 1 \u2013", "Standard 2 \u2013", "draft 6th",
        ))),
    ("template placeholder present", lambda t: "[Practice Name]" in t),  # placeholder is INTENTIONAL
]

# Per-policy sentinels: substrings that must appear (v2.2 criterion-gap fixes).
SENTINELS = {
    "AI_Governance_Policy": [
        "discusses the implementation and use of each AI tool",
        "criterion F11.A",
    ],
    "After_Hours_Care_Arrangements_Policy": [],
    "Appointment_Management_System_Policy": [
        "Triage System (Criterion PP9.A)",
        "when the practice is fully booked",
        "privacy-aware communication",
        "primary responsibility for training the practice team in triage",
        "cannot attend in person",
    ],
    "Chronic_Disease_Management_Plans_Policy": [
        "Continuity, Handover, and Follow-up",
        "planned or unexpected leave",
        "outside normal opening hours",
        "CG6.B",
    ],
    "Clear_Roles_and_Responsibilities_Policy": [
        "Sustainability Lead, Emergency Response Coordinator, Triage Training Lead",
        "primary responsibility for induction",
    ],
    "Clinical_Quality_Improvement_PIP_QI_Policy": [],
    "Clinical_Risk_Management_Systems_Policy": [
        "criterion CG6",
        "outside normal opening hours",
        "contact details of the practitioner responsible for results outside opening hours",
        "CG6.B",
    ],
    "Cold_Chain_Management_Policy": [
        "trained delegate",
        "Communication with Patients",
        "informed that vaccines are stored and managed",
    ],
    "Complaints_Management_System_Policy": [],
    "Digital_Health_Records_Policy": [
        "included in referral letters",
        "no known allergies in a codable field",
    ],
    "Emergency_Response_Plan_and_Equipment_Policy": [
        "primary responsibility for the practice's response and emergency processes",
        "doctor's bag",
        "height-adjustable bed",
    ],
    "Environmental_Sustainability_Policy": [
        "Climate Risk and Resilience (Criterion F3.A)",
        "climate-related risks",
        "climate resilience",
        "criterion CQI1.B",
    ],
    "Equipment_Maintenance_and_Calibration_Records_Policy": [
        "calibrated at least annually, or more frequently if required by the manufacturer",
        "doctor's bag",
    ],
    "Incident_Reporting_and_Review_Procedures_Policy": [],
    "Infection_Control_Policy": [
        "Communicating the IPC policy to patients",
        "Patient Precautions and Information (Criterion CG9.D)",
        "hand sanitiser and tissues are available to patients",
        "access to soap and water after using the toilet",
    ],
    "IT_Security_Policies_and_Procedures": [
        "Social media is used in a way that protects the privacy",
        "primary responsibility for digital governance",
        "Patients affected by a data breach are informed",
    ],
    "Medication_Management_and_Reconciliation_Policy": [
        "Antimicrobial Stewardship (Criterion CG4.D)",
        "reduce inappropriate antibiotic prescribing",
        "Patients have access to information and resources on appropriate antibiotic use",
    ],
    "Patient_Demographics_and_Identity_Policy": [
        "Patient Identification (Criterion CG2)",
        "minimum of three approved patient identifiers",
        "date of birth, address, Medicare/DVA number",
    ],
    "Preventive_Health_and_Screening_Programs_Policy": [
        "environmental issues relevant to health",
        "criterion PP6.B",
    ],
    "Privacy_and_Confidentiality_Policy": [
        "prescription forms, administrative records, templates, and letterhead",
        "informed of the practice's data breach protocols",
    ],
    "Safe_and_Quality_Use_of_Medicines_Policy": [
        "Antimicrobial Stewardship and Sustainable Practice",
        "carbon footprint of inhalers",
        "reduce inappropriate antibiotic use",
    ],
    "Staff_Induction_and_Performance_Review_Policy": [
        "Recognising and Responding to Abuse and Violence (Criterion F4.C)",
        "family, domestic, and sexual violence",
        "Medicare billing education",
        "person-centred care",
        "independent doctors",
    ],
    "Staff_Training_in_Emergency_Procedures_Policy": [],
    "Staff_Training_on_Equipment_Use_Policy": [],
}

# Documents that must show version 2.2 (all patched in the v2.2 pass).
V2_2 = set(k for k, v in SENTINELS.items() if v)


def page_last_line_is_heading(text: str) -> bool:
    """True if the page's last non-empty line looks like a section heading.

    Heuristic: '12. Education and Training' style (number, dot, title-case
    words, no terminal punctuation, reasonably short).
    """
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    if not lines:
        return False
    last = lines[-1]
    parts = last.split(" ", 2)
    if len(parts) < 2 or "." not in parts[0]:
        return False
    if not parts[0][:-1].isdigit():
        return False
    rest = last[len(parts[0]):].strip()
    return 3 <= len(rest) <= 60 and rest[0].isupper() and not rest.endswith((".", ",", ";", ":"))


def main() -> int:
    expected = set(SENTINELS)
    existing = {f[:-4] for f in os.listdir(OUT_DIR) if f.endswith(".pdf")}
    problems = []
    if expected - existing:
        problems.append(f"missing PDFs: {sorted(expected - existing)}")
    if existing - expected:
        problems.append(f"extra PDFs: {sorted(existing - expected)}")

    checked = 0
    for name in sorted(expected & existing):
        reader = PdfReader(os.path.join(OUT_DIR, f"{name}.pdf"))
        pages = [page.extract_text() or "" for page in reader.pages]
        text = "\n".join(pages)
        # Sentinels span rendered line breaks, so match on collapsed whitespace.
        norm = " ".join(text.split())
        fails = [label for label, pred in INVARIANTS if not pred(text)]
        fails += [f"sentinel missing: {s[:60]!r}" for s in SENTINELS[name] if s not in norm]
        if name in V2_2 and "2.2" not in norm:
            fails.append("expected version 2.2 in Version Control")
        if "3 October 2026" not in norm and name in V2_2:
            fails.append("expected v2.2 effective date (3 October 2026)")
        for i, ptext in enumerate(pages, 1):
            if page_last_line_is_heading(ptext):
                fails.append(f"orphan heading at bottom of page {i}")
        if fails:
            problems.append(f"{name}: {fails}")
        checked += 1

    print(f"Checked {checked} PDFs in {OUT_DIR}")
    if problems:
        print("FAILURES:")
        for p in problems:
            print("  -", p)
        return 1
    print(f"All {checked} PDFs pass: invariants, per-policy sentinels, versions, pagination.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
