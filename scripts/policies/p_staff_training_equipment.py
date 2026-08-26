"""Staff Training on Equipment Use Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Staff Training on Equipment Use Policy"
FILENAME = "Staff_Training_on_Equipment_Use_Policy"
OWNER = "Practice Manager / Lead Nurse"

SECTIONS = [
    ("1. Policy Title", [("p", "Staff Training on Equipment Use Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy specifies the training and competency requirements for staff to use "
        "medical equipment safely and effectively. It aligns with criteria CG11 – Practice equipment and F4 – Induction, training and "
        "supporting performance of the RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff who operate, clean, or maintain medical equipment "
        "at [Practice Name]."
    )]),

    ("4. Definitions", [("bullets", [
        "Medical equipment: Any instrument, apparatus, or appliance (including its software) intended for diagnosis, prevention, monitoring, treatment, or alleviation of disease or injury.",
        "Competency: The demonstrated ability to perform a task safely and effectively.",
        "Refresher training: Periodic training that reinforces skills and updates on changes.",
    ])]),

    ("5. Principles", [("bullets", [
        "Only staff assessed as competent operate equipment independently.",
        "Training is role-specific and incorporates manufacturer instructions.",
        "Training is repeated at intervals appropriate to the equipment's complexity and criticality.",
        "Training and competency records are maintained and audit-ready.",
    ])]),

    ("6. Training Requirements", [("bullets", [
        "Initial training: all new staff, or staff taking on new duties, complete training on all equipment they will use before independent operation.",
        "Manufacturer guidelines: training incorporates manufacturer instructions for use, safety warnings, and operating procedures.",
        "Role-specific training: tailored to each staff member's role — e.g., clinical staff on diagnostic, treatment, sterilisation, and emergency equipment; administrative staff on office equipment.",
        "New equipment training: when new equipment is introduced, all relevant staff are trained before it enters clinical use.",
        "Refresher training: provided regularly and when equipment, procedures, or risks change.",
        "Emergency equipment training: all relevant staff complete annual BLS and AED training (see Staff Training in Emergency Procedures Policy).",
    ])]),

    ("7. Competency Assessment", [("bullets", [
        "Training includes a practical component where staff demonstrate safe, correct use of the equipment.",
        "New staff or staff learning new equipment undergo supervised practice until deemed competent by a qualified assessor.",
        "Competency is reassessed periodically and after incidents or near misses.",
        "Identified gaps are addressed through targeted re-training.",
    ])]),

    ("8. Roles and Responsibilities", [("p", "<b>Practice Manager / Lead Nurse:</b>"), ("bullets", [
        "Maintain the equipment training matrix and schedule.",
        "Coordinate training delivery and competency assessment.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Complete required training before independent use.",
        "Report equipment faults and training needs promptly.",
    ])]),

    ("9. Monitoring, Audit, and Review", [("bullets", [
        "Annual audit of the equipment training matrix against staff roles and equipment in use.",
        "Review of equipment-related incidents and near misses for training implications.",
        "Annual review of this policy.",
    ])]),

    ("10. Documentation and Record Keeping", [(
        "p", "The practice maintains, for each staff member:"
    ), ("bullets", [
        "Training records: date, equipment, type of training (initial, refresher, new equipment), trainer, duration, and competency outcome.",
        "Competency assessment records.",
        "Records of equipment-related incidents and resulting re-training.",
    ])]),

    ("11. References", [("bullets", [
        RACGP_6TH_REF,
        "AS/NZS 3551:2012 Technical management programs for medical devices.",
        "Therapeutic Goods Administration. Medical devices. Available at: https://www.tga.gov.au",
        "Australian Resuscitation Council (ARC). Guidelines. Available at: https://resus.org.au/guidelines",
    ])]),
]
