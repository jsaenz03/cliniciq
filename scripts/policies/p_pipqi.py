"""Clinical Quality Improvement (PIP QI) Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Clinical Quality Improvement (PIP-QI) Policy"
FILENAME = "Clinical_Quality_Improvement_PIP_QI_Policy"
OWNER = "Lead GP / Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Clinical Quality Improvement (PIP-QI) Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes [Practice Name]'s commitment to continuous clinical quality "
        "improvement (CQI), with a particular focus on the Practice Incentives Program "
        "Quality Improvement (PIP-QI) incentive. It aligns with criterion CQI1 – Continuous quality improvement activities of the "
        "RACGP Standards for general practices (6th edition), which makes CQI a standalone "
        "standard."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all clinical and administrative staff involved in collecting, "
        "analysing, and acting on practice data to improve care."
    )]),

    ("4. Definitions", [("bullets", [
        "Clinical quality improvement (CQI): A systematic, data-driven approach to improving healthcare processes and outcomes.",
        "PIP-QI: An Australian Government incentive providing payments to general practices for participating in continuous quality improvement activities.",
        "Quality improvement activity: A planned activity that uses data to improve the quality of care and services.",
        "Clinical indicator: A measurable element of patient care used to assess quality and safety.",
    ])]),

    ("5. Principles", [("bullets", [
        "CQI is an ongoing, mandatory practice activity, not an episodic one.",
        "Improvement work is data-driven and tied to patient outcomes.",
        "All staff contribute to and learn from CQI activities.",
        "At least one documented CQI activity is completed every 12 months, including one using coded clinical data (criterion CQI1).",
        "CQI integrates with clinical risk management and patient feedback.",
    ])]),

    ("6. PIP-QI Participation", [("bullets", [
        "Share de-identified practice data with the local Primary Health Network (PHN) as required for PIP-QI.",
        "Review PIP-QI data and the 10 agreed improvement measures at least quarterly.",
        "Select and complete at least one CQI activity each year using the PDSA (Plan-Do-Study-Act) method or equivalent.",
        "Document the aim, method, data collected, changes implemented, and outcomes.",
    ])]),

    ("7. Priority Improvement Areas", [(
        "p",
        "Priority areas align with the PIP-QI measures and the practice's own needs, including:"
    ), ("bullets", [
        "Proportion of patients with diabetes with HbA1c recorded in the last 12 months.",
        "Proportion of patients with a recorded smoking status.",
        "Proportion of patients with a recorded alcohol consumption status.",
        "Proportion of patients with a weight/BMI classification recorded.",
        "Proportion of Aboriginal and Torres Strait Islander patients with MBS 715 health checks completed.",
        "Proportion of eligible patients with influenza immunisation recorded.",
        "Up-to-date cervical screening participation among eligible patients.",
    ])]),

    ("8. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Coordinates data extraction, PHN submission, and CQI activity documentation.",
        "Maintains records of CQI activities and outcomes.",
    ]), ("p", "<b>Lead GP (CQI sponsor):</b>"), ("bullets", [
        "Provides clinical leadership for improvement activities.",
        "Reviews and signs off CQI outcomes.",
    ]), ("p", "<b>Practice nurses:</b>"), ("bullets", [
        "Deliver improvement activities on the ground and capture required data.",
    ])]),

    ("9. Education and Training", [("bullets", [
        "All staff receive induction in the practice's CQI approach.",
        "CQI sponsors and data leads receive training in PDSA methodology and data tools.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly review of PIP-QI measures and active CQI activities.",
        "Annual internal audit of PIP-QI processes and outcomes.",
        "Annual review of this policy, or sooner if PIP-QI requirements change.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Records of all CQI activities (aim, method, data, changes, outcomes).",
        "Patient feedback and the actions taken in response.",
        "Clinical incident reports and their resolutions.",
        "Data extraction reports and PHN submissions.",
        "Minutes of CQI team meetings.",
        "Annual CQI audit results and action plans.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Government Department of Health and Aged Care. Practice Incentives Program Quality Improvement (PIP-QI). Available at: https://www.health.gov.au/initiatives-and-programs/practice-incentives-program-pip/pip-quality-improvement-pip-qi",
        "RACGP. Quality improvement toolkit. Available at: https://www.racgp.org.au",
    ])]),
]
