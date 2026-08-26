"""Equipment Maintenance and Calibration Records Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Equipment Maintenance and Calibration Records Policy"
FILENAME = "Equipment_Maintenance_and_Calibration_Records_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Equipment Maintenance and Calibration Records Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] ensures that medical equipment is "
        "appropriately maintained, calibrated, and recorded to support the accuracy and "
        "safety of clinical care. It aligns with criterion CG11 – Practice equipment of the RACGP Standards for "
        "general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all medical and clinical equipment owned, leased, or used "
        "by the practice, including diagnostic, treatment, sterilisation, and emergency "
        "equipment."
    )]),

    ("4. Definitions", [("bullets", [
        "Medical equipment: Any instrument, apparatus, appliance, or material (including software) intended by the manufacturer for diagnosis, prevention, monitoring, treatment, or alleviation of disease or injury.",
        "Maintenance: Routine inspection, cleaning, and servicing to keep equipment in working order.",
        "Calibration: The process of configuring an instrument to provide a measurement traceable to a recognised standard.",
        "Equipment register: A central record of equipment, serial numbers, service intervals, and status.",
    ])]),

    ("5. Principles", [("bullets", [
        "Equipment is fit for purpose and maintained in safe working order.",
        "Maintenance and calibration follow the manufacturer's schedule.",
        "Records are complete, current, and audit-ready.",
        "Equipment is removed from clinical use when faulty or out of calibration until repaired.",
    ])]),

    ("6. Equipment Register", [("bullets", [
        "A central equipment register records each item, make, model, serial number, date of acquisition, location, service interval, and next service due.",
        "The register includes sterilisers, vaccine refrigerators, thermometers, data loggers, sphygmomanometers, spirometers, ECGs, AEDs, and other clinical equipment.",
        "The register is reviewed at least quarterly.",
    ])]),

    ("7. Maintenance and Servicing", [("bullets", [
        "Each item is serviced by a competent person at the frequency specified by the manufacturer or more often if indicated.",
        "Preventive maintenance is preferred over reactive repairs.",
        "Faulty equipment is tagged out of service, removed from clinical use, and repaired or replaced.",
    ])]),

    ("8. Calibration", [("bullets", [
        "Thermometers, data loggers, sphygmomanometers, spirometers, scales, and other measuring instruments are calibrated at the frequency required.",
        "Calibration certificates are retained for the life of the equipment.",
        "Vaccine refrigerator thermometers and data loggers are calibrated at least annually (see Cold Chain Management Policy).",
    ])]),

    ("9. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the equipment register and service schedule.",
        "Engages competent service providers.",
    ]), ("p", "<b>Clinical staff:</b>"), ("bullets", [
        "Use equipment correctly and report faults promptly.",
        "Tag and remove faulty equipment from use.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly audit of the equipment register against items in use.",
        "Annual review of service and calibration records.",
        "Annual review of this policy.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "The equipment register.",
        "Service and maintenance reports.",
        "Calibration certificates.",
        "Records of equipment faults, repairs, and disposals.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "AS/NZS 3551:2012 Technical management programs for medical devices.",
        "Therapeutic Goods Administration. Medical devices. Available at: https://www.tga.gov.au",
    ])]),
]
