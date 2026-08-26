"""Clinical Risk Management Systems Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Clinical Risk Management Systems Policy"
FILENAME = "Clinical_Risk_Management_Systems_Policy"
OWNER = "Lead GP / Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Clinical Risk Management Systems Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy establishes the framework [Practice Name] uses to identify, assess, "
        "mitigate, and monitor clinical risks. It aligns with criterion CG7 – Managing clinical risks and "
        "incidents of the Clinical governance standard, RACGP Standards for general "
        "practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff and covers all clinical and related administrative "
        "processes that may pose a risk to patients, staff, or visitors."
    )]),

    ("4. Definitions", [("bullets", [
        "Clinical risk: The chance of harm resulting from a clinical activity or the systems supporting it.",
        "Risk register: A central record of identified risks, their rating, controls, owners, and review dates.",
        "Incident: An event or circumstance that did, or could have, resulted in unintended harm.",
        "Near miss: An incident that did not reach the patient or cause harm.",
        "Open disclosure: The open discussion of an incident that resulted in harm with the patient and/or their support person.",
    ])]),

    ("5. Principles", [("bullets", [
        "A proactive, just-culture approach to risk identification and management.",
        "Integration of risk management with continuous quality improvement.",
        "Transparency with patients through open disclosure when harm occurs.",
        "Learning from incidents and near misses rather than assigning blame.",
        "Use of digital health data to detect and respond to emerging risks.",
    ])]),

    ("6. Risk Identification and Assessment", [("bullets", [
        "Maintain a clinical risk register reviewed at least quarterly by the practice team.",
        "Assess each risk for likelihood and consequence; assign a risk owner and target review date.",
        "Use practice data (incidents, complaints, audit findings, coronial recommendations, results follow-up) to identify emerging risks.",
        "Conduct a documented risk assessment when introducing new clinical activities, equipment, or technologies (including AI tools — see AI Governance Policy).",
    ])]),

    ("7. Risk Mitigation and Control", [("bullets", [
        "Implement controls proportionate to risk (eliminate, substitute, engineer, administrative, PPE).",
        "Standard operating procedures for high-risk clinical processes (e.g., results management, referrals, medicines, allergies).",
        "Clinical decision support enabled in the clinical software to reduce error.",
        "Verify and reconcile patient identity at every clinical encounter.",
    ])]),

    ("8. Results Management, Referrals, and Follow-up", [("bullets", [
        "All pathology and imaging results are tracked from ordering to receipt to action.",
        "Abnormal results are flagged, actioned by a clinician, and the action documented.",
        "Referrals and recalls are tracked to resolution; non-attendance at specialist appointments is followed up.",
    ])]),

    ("9. Open Disclosure", [("bullets", [
        "When a patient is harmed, an open disclosure discussion is offered promptly.",
        "The discussion includes an expression of regret, the facts known, what happened, and the steps taken to prevent recurrence.",
        "Discussions and outcomes are documented in the patient's record.",
    ])]),

    ("10. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the risk register and coordinates incident review.",
        "Reports to the team and ensures action plans are progressed.",
    ]), ("p", "<b>All clinical staff:</b>"), ("bullets", [
        "Identify and report risks, incidents, and near misses.",
        "Participate in reviews and implement changes.",
    ])]),

    ("11. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly review of the risk register and open action items.",
        "Monthly review of incidents and near misses for trends.",
        "Annual review of this policy.",
    ])]),

    ("12. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "A clinical risk register.",
        "Incident and near-miss reports with investigation outcomes.",
        "Open disclosure records.",
        "Results management and referral tracking records.",
    ])]),

    ("13. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Commission on Safety and Quality in Health Care. Australian Open Disclosure Framework. Available at: https://www.safetyandquality.gov.au/our-work/communicating-safety/open-disclosure",
        "ISO 31000:2018 Risk management — Guidelines.",
    ])]),
]
