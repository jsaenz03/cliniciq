"""Incident Reporting and Review Procedures Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Incident Reporting and Review Procedures Policy"
FILENAME = "Incident_Reporting_and_Review_Procedures_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Incident Reporting and Review Procedures Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] reports, investigates, and learns from "
        "clinical and non-clinical incidents and near misses. It aligns with criterion CG7 – Managing clinical risks and incidents of the RACGP "
        "Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff and to all events that did, or could have, "
        "resulted in unintended or excessive harm to patients, staff, visitors, or the "
        "practice."
    )]),

    ("4. Definitions", [("bullets", [
        "Incident: An event or circumstance that resulted in, or could have resulted in, unintended harm.",
        "Near miss: An incident that did not reach the patient or cause harm.",
        "Adverse event: An incident that resulted in harm.",
        "Serious adverse event: An incident resulting in serious harm or death, requiring mandatory notification.",
        "Open disclosure: The open discussion of an incident with the affected patient and/or their support person.",
    ])]),

    ("5. Principles", [("bullets", [
        "A just-culture approach that distinguishes human error, at-risk behaviour, and reckless behaviour.",
        "Reporting is encouraged and supported; staff are not punished for honest error.",
        "Investigation is proportionate to the severity and actual or potential harm.",
        "Learning is shared with the team and translated into system changes.",
        "Open disclosure occurs promptly when harm has occurred.",
    ])]),

    ("6. Reporting", [("bullets", [
        "All incidents and near misses must be reported via the practice's incident form on the day they occur or are identified.",
        "The reporter records the facts (what, where, when, who) without speculation about cause or blame.",
        "Serious adverse events are escalated to the Practice Manager and Practice Principal immediately.",
    ])]),

    ("7. Notification Obligations", [("bullets", [
        "Notifiable clinical incidents are reported to the relevant regulator (e.g., state/territory health department) within required timeframes.",
        "Equipment-related incidents involving medical devices are reported to the Therapeutic Goods Administration (TGA).",
        "Privacy/data incidents are managed under the IT Security and Privacy policies and, where required, notified to the OAIC.",
        "Work health and safety incidents are reported to the regulator per the relevant WHS Act.",
    ])]),

    ("8. Investigation and Review", [("numbers", [
        "Triage the incident to determine severity and investigation depth.",
        "Assign an investigator independent of the event where appropriate.",
        "Gather facts (timeline, staff involved, contributing factors) using a structured method such as root cause analysis.",
        "Identify contributing system factors and corrective actions.",
        "Share findings and the action plan with the team.",
        "Track actions to completion and verify effectiveness.",
    ])]),

    ("9. Open Disclosure", [("bullets", [
        "Offer an open disclosure discussion to the affected patient as soon as practicable after harm is identified.",
        "Discuss what happened, the known facts, an expression of regret, and the steps being taken.",
        "Document the discussion and follow up with the patient as agreed.",
    ])]),

    ("10. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the incident register and coordinates investigation.",
        "Reports to regulators where required.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Report incidents and near misses promptly.",
        "Participate in investigation and implement changes.",
    ])]),

    ("11. Monitoring, Audit, and Review", [("bullets", [
        "Monthly review of new incidents and open actions.",
        "Quarterly thematic analysis of incidents and near misses.",
        "Annual review of this policy.",
    ])]),

    ("12. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "An incident register.",
        "Investigation reports and action plans.",
        "Open disclosure records.",
        "Regulator notifications and acknowledgements.",
    ])]),

    ("13. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Commission on Safety and Quality in Health Care. Australian Open Disclosure Framework. Available at: https://www.safetyandquality.gov.au/our-work/communicating-safety/open-disclosure",
        "Therapeutic Goods Administration. Reporting problems. Available at: https://www.tga.gov.au",
    ])]),
]
