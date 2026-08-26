"""Preventive Health and Screening Programs Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Preventive Health and Screening Programs Policy"
FILENAME = "Preventive_Health_and_Screening_Programs_Policy"
OWNER = "Lead GP"

SECTIONS = [
    ("1. Policy Title", [("p", "Preventive Health and Screening Programs Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] promotes early detection and prevention "
        "of disease through structured preventive activities and participation in national "
        "screening programs. It aligns with criterion PP6 – Health promotion and preventive care of the RACGP "
        "Standards for general practices (6th edition), and the Guidelines for preventive "
        "activities in general practice (Red Book)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all clinical and administrative staff involved in delivering, "
        "recording, recalling, and reporting preventive health activities."
    )]),

    ("4. Definitions", [("bullets", [
        "Preventive health: Activities that prevent disease, detect it early, or reduce its impact.",
        "Screening: The systematic testing of asymptomatic individuals to identify risk or early disease.",
        "Recall: A proactive contact to bring a patient back to the practice for clinical care (e.g., abnormal result follow-up).",
        "Reminder: A prompt to a patient or clinician about a due preventive activity.",
    ])]),

    ("5. Principles", [("bullets", [
        "Evidence-based preventive care consistent with the RACGP Red Book and national program guidelines.",
        "Equity of access to preventive activities across the practice population.",
        "Active use of data to identify and follow up patients overdue for preventive care.",
        "Patient involvement in preventive health decisions.",
        "Quality improvement through audit of participation rates.",
    ])]),

    ("6. National Screening Programs", [("p",
        "The practice participates in and supports national screening programs:"
    ), ("bullets", [
        "National Bowel Cancer Screening Program.",
        "National Cervical Screening Program (including self-collection where appropriate).",
        "BreastScreen Australia.",
        "National Diabetes Services Scheme (NDSS) risk assessment and referral.",
        "National Immunisation Program across the lifespan.",
    ])]),

    ("7. Preventive Activities", [("bullets", [
        "Cardiovascular risk assessment (using an Australian Absolute Cardiovascular Risk calculator) for eligible adults.",
        "Type 2 diabetes risk assessment for high-risk groups.",
        "Cervical, bowel, and breast screening per current program intervals.",
        "Immunisation across the lifespan, including annual influenza and COVID-19 vaccination.",
        "Mental health and wellbeing checks.",
        "Lifestyle risk assessment (smoking, alcohol, nutrition, physical activity) with brief intervention as indicated.",
    ])]),

    ("8. Recall and Reminder Systems", [("bullets", [
        "An electronic recall and reminder system is used to identify patients due or overdue for preventive activities.",
        "Recalls are tracked from initiation to resolution; non-response is followed up in line with clinical risk.",
        "Recalls and reminders are documented in the patient's electronic health record.",
        "Abnormal screening results are actioned under the practice's results management process (see Clinical Risk Management policy).",
    ])]),

    ("9. Roles and Responsibilities", [("p", "<b>GPs:</b>"), ("bullets", [
        "Provide preventive care and screening opportunistically and proactively.",
        "Action abnormal results and arrange follow-up.",
    ]), ("p", "<b>Practice nurses:</b>"), ("bullets", [
        "Conduct risk assessments, immunisation, and cervical screening within scope of practice.",
        "Manage recall and reminder workflows.",
    ]), ("p", "<b>Administrative staff:</b>"), ("bullets", [
        "Generate recall and reminder lists and support patient contact.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly audit of participation rates for key preventive activities against benchmarks.",
        "PIP-QI data reviewed at team meetings to identify improvement opportunities.",
        "Annual review of this policy.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Preventive activity records (coded with SNOMED CT-AU where available) in each patient's electronic health record.",
        "Records of recalls, reminders, and their outcomes.",
        "Immunisation records reported to the Australian Immunisation Register (AIR).",
        "Screening results and follow-up actions.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "RACGP. Guidelines for preventive activities in general practice (Red Book). Available at: https://www.racgp.org.au/clinical-resources/clinical-guidelines/key-racgp-guidelines/view-all-racgp-guidelines/red-book",
        "Australian Government Department of Health and Aged Care. Population-based screening. Available at: https://www.health.gov.au/topics/population-based-screening",
    ])]),
]
