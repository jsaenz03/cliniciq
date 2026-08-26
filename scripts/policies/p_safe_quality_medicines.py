"""Safe and Quality Use of Medicines Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Safe and Quality Use of Medicines Policy"
FILENAME = "Safe_and_Quality_Use_of_Medicines_Policy"
OWNER = "Lead GP"

SECTIONS = [
    ("1. Policy Title", [("p", "Safe and Quality Use of Medicines Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy supports the safe, effective, and judicious use of medicines at "
        "[Practice Name]. It aligns with criterion CG4 – Provision of clinical and medicines guidelines of the "
        "RACGP Standards for general practices (6th edition), and the National Strategy for "
        "the Quality Use of Medicines."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all clinical staff who prescribe, recommend, or administer "
        "medicines, and to administrative staff who handle medicine-related information."
    )]),

    ("4. Definitions", [("bullets", [
        "Quality use of medicines (QUM): Selecting management options wisely, choosing suitable medicines when one is needed, and using them safely and effectively.",
        "Polypharmacy: Use of five or more regular medicines, which increases the risk of adverse events.",
        "Deprescribing: The planned, supervised process of dose reduction or stopping of medicines that may be causing harm or no longer providing benefit.",
    ])]),

    ("5. Principles", [("bullets", [
        "Evidence-based prescribing aligned to current Therapeutic Guidelines.",
        "Patient involvement in decisions about their medicines.",
        "Minimising polypharmacy and deprescribing where appropriate.",
        "Continual monitoring for adverse drug events and interactions.",
        "Coding medicines using SNOMED CT-AU in the electronic health record (supporting the codable-field requirements of criterion CG3).",
    ])]),

    ("6. Prescribing Standards", [("bullets", [
        "Prescribe only within scope of practice and clinical competence.",
        "Use current clinical decision support; document justification for overriding alerts.",
        "Provide written and verbal information on indication, dose, route, timing, common side effects, and key interactions.",
        "Provide a Consumer Medicines Information (CMI) leaflet where relevant.",
    ])]),

    ("7. Polypharmacy and Deprescribing", [("bullets", [
        "Review patients on five or more regular medicines at least annually.",
        "Identify medicines no longer indicated or where harms outweigh benefits.",
        "Use a structured deprescribing approach with patient agreement and monitoring.",
        "Document deprescribing decisions and the rationale in the patient's record.",
    ])]),

    ("8. Patient Education", [("bullets", [
        "Use plain language and the teach-back technique to confirm understanding.",
        "Provide medicine information in the patient's preferred language via interpreter services where needed.",
        "Encourage patients to maintain an up-to-date medicines list.",
    ])]),

    ("9. Roles and Responsibilities", [("p", "<b>GPs:</b>"), ("bullets", [
        "Prescribe according to QUM principles and document decisions.",
        "Conduct medication reviews for at-risk patients.",
    ]), ("p", "<b>Practice nurses:</b>"), ("bullets", [
        "Reinforce patient education and support medicine reconciliation.",
        "Flag potential adverse drug events for GP review.",
    ]), ("p", "<b>Pharmacist (where engaged):</b>"), ("bullets", [
        "Conduct Home Medicines Reviews for eligible patients.",
        "Advise on interactions and optimal medicine regimens.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Regular clinical audits of prescribing for high-risk medicines (e.g., anticoagulants, opioids, insulin).",
        "Review of adverse drug events and interactions as quality improvement activities.",
        "Annual review of this policy.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Current, coded medicines lists in each patient's electronic health record.",
        "Records of deprescribing decisions and patient consent.",
        "Adverse drug event reports.",
        "Patient education materials provided.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "Department of Health and Aged Care. National Strategy for Quality Use of Medicines. Available at: https://www.health.gov.au",
        "Therapeutic Guidelines. Available at: https://www.tg.org.au",
        "NPS MedicineWise. Available at: https://www.nps.org.au",
    ])]),
]
