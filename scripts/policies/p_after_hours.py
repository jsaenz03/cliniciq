"""After Hours Care Arrangements Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "After Hours Care Arrangements Policy"
FILENAME = "After_Hours_Care_Arrangements_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "After Hours Care Arrangements Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes the arrangements [Practice Name] has in place to support "
        "patients who need medical care outside standard opening hours. It aligns with criterion "
        "PP10 – Care when the practice is not open of the RACGP Standards for general "
        "practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff and covers the communication of after-hours "
        "arrangements, the providers used, and the clinical follow-up of patients who use "
        "after-hours services."
    )]),

    ("4. Definitions", [("bullets", [
        "Standard hours: The practice's published opening hours.",
        "After hours: The periods before and after standard hours, weekends, and public holidays.",
        "After-hours care provider: An accredited service or individual providing care on behalf of, or in support of, the practice (e.g., a deputising service, primary care clinic, healthdirect, or 000).",
    ])]),

    ("5. Principles", [("bullets", [
        "Patients can access safe, appropriate care at all times.",
        "After-hours arrangements are clearly communicated to patients.",
        "Continuity of care is maintained through prompt follow-up of after-hours contacts.",
        "After-hours care is delivered by suitably qualified clinicians with appropriate clinical information.",
    ])]),

    ("6. Arrangements", [("bullets", [
        "The practice uses an accredited after-hours medical deputising service to provide home visits and clinic-based care during after-hours periods (named provider: [After-Hours Provider]).",
        "For emergencies, patients are advised to call 000.",
        "For non-emergency advice, patients are directed to healthdirect (1800 022 222) where available.",
        "Where the practice does not provide its own after-hours service, the chosen arrangement and rationale are documented and reviewed at least annually.",
    ])]),

    ("7. Communication to Patients", [("bullets", [
        "After-hours arrangements are clearly communicated via the practice's telephone message, website, voicemail, and signage.",
        "Patients are advised of their options for emergencies (000), advice (healthdirect), and routine after-hours medical care.",
    ])]),

    ("8. Clinical Information and Follow-up", [("bullets", [
        "The after-hours provider is given access to relevant clinical information (with appropriate patient consent and via a secure channel) for the patients they see.",
        "Reports from after-hours attendances are received, reviewed, and filed in the patient's electronic health record by the next business day.",
        "Significant findings or actions are escalated to the patient's usual GP for follow-up.",
    ])]),

    ("9. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the contract/arrangement with the after-hours provider.",
        "Ensures patient communications and signage are accurate.",
    ]), ("p", "<b>GPs:</b>"), ("bullets", [
        "Review and act on after-hours reports for their patients.",
    ]), ("p", "<b>Reception staff:</b>"), ("bullets", [
        "Communicate after-hours arrangements to patients.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly review of the volume and timeliness of after-hours reports received and filed.",
        "Annual review of the after-hours arrangement and this policy.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Documentation of the after-hours arrangement and any service agreements.",
        "Records of after-hours attendances and follow-up actions in each patient's record.",
        "Records of patient complaints relating to after-hours care.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "healthdirect Australia. Available at: https://www.healthdirect.gov.au",
        "Department of Health and Aged Care. After-hours primary care. Available at: https://www.health.gov.au",
    ])]),
]
