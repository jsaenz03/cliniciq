"""Medication Management and Reconciliation Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Medication Management and Reconciliation Policy"
FILENAME = "Medication_Management_and_Reconciliation_Policy"
OWNER = "Lead GP / Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Medication Management and Reconciliation Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] ensures safe prescribing, dispensing, "
        "administration, and reconciliation of medicines. It aligns with criterion CG4 – Provision of clinical and medicines guidelines of the "
        "RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all clinical staff at [Practice Name] involved in prescribing, "
        "dispensing, administering, or reconciling medicines, including sample medications."
    )]),

    ("4. Definitions", [("bullets", [
        "Medication reconciliation: The process of identifying the most accurate list of a patient's medicines and comparing it against current orders to identify and resolve discrepancies.",
        "High-risk medicines: Medicines with a heightened risk of significant harm when used in error (e.g., insulin, opioids, anticoagulants, methotrexate).",
        "Medicine samples: complimentary starter packs supplied by pharmaceutical companies.",
        "Adverse drug event: Any injury resulting from medical intervention related to a drug.",
    ])]),

    ("5. Principles", [(
        "p", "[Practice Name] commits to the following medicines management principles:"
    ), ("bullets", [
        "Patient safety at every step of the medicines pathway.",
        "Accurate, current medication records reconciled at transitions of care.",
        "Safe storage, handling, and disposal of medicines.",
        "Electronic prescribing and clinical decision support used to reduce error.",
        "Continuous monitoring and improvement of medicines-related safety events.",
    ])]),

    ("6. Medication Reconciliation", [("p",
        "Medication reconciliation must occur at defined points, including new patient "
        "registration, hospital discharge, and after specialist review:"
    ), ("bullets", [
        "Collect a best-possible medication history (including over-the-counter and complementary medicines).",
        "Confirm the history with at least one other source (e.g., dispensing record, hospital discharge summary, My Health Record, carer).",
        "Document the reconciled medicine list in the patient's electronic health record using SNOMED CT-AU coded entries.",
        "Identify and resolve discrepancies in collaboration with the treating GP.",
    ])]),

    ("7. Prescribing", [("bullets", [
        "Prescriptions are generated through the clinical software using current, SNOMED CT-AU coded medicine entries.",
        "Clinical decision support (allergy and interaction checking) must not be overridden without clinical justification documented in the record.",
        "High-risk medicines require additional safeguards, including dose verification and, where appropriate, a second-clinician check.",
        "Adverse drug reactions are recorded in the patient's record and reconciled at each visit.",
    ])]),

    ("8. Storage and Handling", [("bullets", [
        "Medicines stored securely with access restricted to authorised staff.",
        "S8 (controlled) and S4 (restricted) medicines stored in a locked, fixed safe/cabinet with a current drug register.",
        "Vaccines and cold chain-dependent medicines managed under the Cold Chain Management Policy.",
        "Emergency medicines (e.g., oxygen, adrenaline for anaphylaxis) kept in a clearly marked, accessible location and checked monthly for expiry and stock levels.",
        "Expired and unwanted medicines disposed of via an authorised waste contractor; stock destroyed under supervision and recorded.",
    ])]),

    ("9. Sample Medications", [("bullets", [
        "Sample medications are stored securely and recorded on a stock register.",
        "Samples are not used past their expiry date.",
        "Distribution to patients is documented in the patient's clinical record.",
    ])]),

    ("10. Roles and Responsibilities", [("p", "<b>GPs:</b>"), ("bullets", [
        "Prescribe medicines in accordance with current Therapeutic Guidelines.",
        "Reconcile medicines at transitions of care.",
    ]), ("p", "<b>Practice nurses:</b>"), ("bullets", [
        "Support medication reconciliation by collecting medication histories.",
        "Manage medication samples and emergency drug stock checks.",
    ]), ("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Ensure secure storage, drug register currency, and audit compliance.",
        "Maintain this policy and ensure staff training.",
    ])]),

    ("11. Education and Training", [("bullets", [
        "All clinical staff receive medicines safety training at induction.",
        "Annual refresher training on high-risk medicines, allergies, and reconciliation.",
    ])]),

    ("12. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly audit of medication samples, emergency drug stock, and S8/S4 registers.",
        "Review of all medicines-related incidents and near misses.",
        "Annual review of this policy.",
    ])]),

    ("13. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Reconciled medication lists in each patient's electronic health record.",
        "S8 and S4 drug registers.",
        "Stock registers for samples and emergency medicines.",
        "Medication incident reports and outcomes.",
        "Staff training records.",
    ])]),

    ("14. References", [("bullets", [
        RACGP_6TH_REF,
        "Therapeutic Guidelines. Available at: https://www.tg.org.au",
        "Australian Commission on Safety and Quality in Health Care. National Medication Management Plan. Available at: https://www.safetyandquality.gov.au",
        "NPS MedicineWise. Available at: https://www.nps.org.au",
    ])]),
]
