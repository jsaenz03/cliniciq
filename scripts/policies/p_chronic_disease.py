"""Chronic Disease Management Plans Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Chronic Disease Management Plans Policy"
FILENAME = "Chronic_Disease_Management_Plans_Policy"
OWNER = "Lead GP"

SECTIONS = [
    ("1. Policy Title", [("p", "Chronic Disease Management Plans Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] provides comprehensive, coordinated "
        "care for patients with chronic diseases through structured Chronic Disease "
        "Management (CDM) plans. It aligns with criteria CG5 – Transitions of care and CG6 – Follow-up systems of the "
        "RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all clinical staff involved in the care of patients with "
        "chronic diseases, including general practitioners, practice nurses, and allied "
        "health professionals. It covers the identification, assessment, planning, "
        "implementation, and review of General Practice Management Plans (GPMPs) and "
        "Team Care Arrangements (TCAs)."
    )]),

    ("4. Definitions", [("bullets", [
        "Chronic disease: A long-lasting condition that can be controlled but not cured (e.g., diabetes, asthma, cardiovascular disease, chronic kidney disease).",
        "General Practice Management Plan (GPMP): A plan developed by a GP for a patient with a chronic or terminal condition, documenting their healthcare needs, problems, and goals.",
        "Team Care Arrangement (TCA): A plan developed by a GP for a patient with a chronic or terminal condition who requires ongoing care from a multidisciplinary team of at least three providers.",
        "Multidisciplinary team: Healthcare professionals from different disciplines working together to provide comprehensive care.",
        "Patient self-management: The active participation of patients in managing their own health conditions.",
    ])]),

    ("5. Principles", [("bullets", [
        "Patient-centred care tailored to individual needs, preferences, and goals.",
        "Comprehensive, holistic assessment of physical, psychological, social, and cultural needs.",
        "Goal-oriented planning using SMART goals agreed with the patient.",
        "Multidisciplinary collaboration and clear communication among providers.",
        "Continuity of care with regular, scheduled reviews.",
        "Evidence-based practice consistent with current guidelines.",
        "Quality improvement through ongoing monitoring of outcomes.",
    ])]),

    ("6. Plan Development (GPMP and TCA)", [("p",
        "CDM plans are developed in collaboration with the patient (and where appropriate, their family or carer):"
    ), ("bullets", [
        "Patient identification: identifying eligible patients who would benefit from a CDM plan.",
        "Comprehensive assessment: medical history, current health status, medicines, lifestyle, social circumstances, and existing supports.",
        "Goal setting: collaboratively setting SMART goals with the patient.",
        "Care planning: a written plan documenting the patient's needs, agreed goals, actions, services to be provided by the GP/nurse/allied health team, referrals, and review dates.",
        "Team Care Arrangement specifics: at least two other providers (in addition to the GP) involved in the patient's care, with their agreement documented.",
        "Patient understanding and consent: ensuring the patient understands the plan and consents to its development and sharing.",
    ])]),

    ("7. Implementation of Plans", [("bullets", [
        "Facilitating timely referrals to allied health and specialist providers as outlined in the plan.",
        "Providing patient education, resources, and self-management support.",
        "The practice nurse or GP coordinates care and communication among providers.",
        "Regular communication with the patient and the multidisciplinary team to monitor progress.",
    ])]),

    ("8. Review of Plans", [("p", "Reviews occur at:"
    ), ("bullets", [
        "Scheduled reviews: typically every three to six months, determined by patient need and complexity.",
        "Ad hoc reviews: when there is a significant change in the patient's health or circumstances.",
        "Purpose: to evaluate effectiveness, reassess goals, update treatments, and ensure ongoing relevance.",
    ])]),

    ("9. Documentation and Record Keeping", [("bullets", [
        "All CDM plans, assessments, reviews, and related correspondence are recorded in the patient's electronic health record using SNOMED CT-AU coded entries where available.",
        "Consent for development and sharing of CDM plans is documented.",
        "Copies of all referrals and significant communications are retained.",
        "The recall and reminder system prompts patients for scheduled reviews.",
    ])]),

    ("10. Roles and Responsibilities", [("p", "<b>GPs:</b>"), ("bullets", [
        "Lead the development and review of GPMPs and TCAs.",
        "Approve referrals and coordinate specialist input.",
    ]), ("p", "<b>Practice nurses:</b>"), ("bullets", [
        "Conduct assessments, provide education, and support self-management.",
        "Coordinate recalls, reminders, and reviews.",
    ])]),

    ("11. Monitoring, Audit, and Review", [("bullets", [
        "Regular audits of a sample of CDM plans for completeness and currency.",
        "Use of practice data to identify prevalence, outcomes, and improvement opportunities.",
        "Active patient feedback sought on the CDM experience.",
        "Annual review of this policy.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "Department of Health and Aged Care. Chronic Disease Management (CDM) Medicare Benefits Schedule items. Available at: https://www.health.gov.au/topics/chronic-conditions/chronic-disease-management-medicare-benefits-schedule-mbs-items",
        "Australian Institute of Health and Welfare. Chronic disease. Available at: https://www.aihw.gov.au/reports/australias-health/chronic-disease",
    ])]),
]
