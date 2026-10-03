"""Cold Chain Management Policy – RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Cold Chain Management Policy"
FILENAME = "Cold_Chain_Management_Policy"
OWNER = "Cold Chain Coordinator / Practice Nurse"

VERSION = "2.2"
EFFECTIVE_DATE = "3 October 2026"
NEXT_REVIEW = "3 October 2027"

SECTIONS = [
    ("1. Policy Title", [("p", "Cold Chain Management Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] maintains the cold chain for vaccines and "
        "other temperature-sensitive medicines to ensure their potency and safety. It aligns "
        "with criterion CG12 – Maintaining vaccine potency of the RACGP Standards for "
        "general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff involved in the ordering, receipt, storage, "
        "monitoring, and administration of vaccines and cold chain-dependent medicines at "
        "[Practice Name]."
    )]),

    ("4. Definitions", [("bullets", [
        "Cold chain: The system of transporting, storing, and handling vaccines within the recommended temperature range of +2°C to +8°C from manufacture to administration.",
        "Cold chain breach: Any excursion of vaccine storage temperature outside +2°C to +8°C.",
        "Data logger: A device that continuously records refrigerator temperature at defined intervals.",
        "Vaccine: A biological preparation that provides active acquired immunity to a particular disease.",
    ])]),

    ("5. Principles", [(
        "p", "[Practice Name] commits to the following cold chain principles:"
    ), ("bullets", [
        "Patient safety: vaccines stored within +2°C to +8°C to maintain potency.",
        "Continuous monitoring: temperature recorded at least daily and continuously via data logger.",
        "Accountability: a designated Cold Chain Coordinator is responsible for the cold chain.",
        "Rapid response: documented procedure for managing cold chain breaches.",
        "Waste minimisation: stock rotation and appropriate ordering to reduce wastage.",
    ])]),

    ("6. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Ensures the cold chain policy is implemented, resourced, and reviewed at least annually.",
        "Ensures staff are trained in cold chain management.",
        "Ensures a trained delegate is available when the Cold Chain Coordinator is unavailable (criterion CG12.B).",
    ]), ("p", "<b>Cold Chain Coordinator (designated nurse):</b>"), ("bullets", [
        "Monitors refrigerator temperatures daily and reviews data logger readings.",
        "Manages vaccine ordering, receipt, and stock rotation.",
        "Responds to and documents cold chain breaches.",
        "Liaises with the state/territory health department regarding breach management and vaccine disposal.",
        "Delegates cold chain management to a trained delegate during leave or absence, recorded on the cold chain roster (criterion CG12.B).",
    ]), ("p", "<b>All clinical staff:</b>"), ("bullets", [
        "Follow correct vaccine handling, including returning vaccines to the refrigerator promptly.",
        "Report any suspected cold chain breach immediately.",
    ])]),

    ("7. Vaccine Refrigerator and Equipment", [("bullets", [
        "Vaccines must be stored in a purpose-built vaccine refrigerator where possible; domestic bar fridges must not be used.",
        "The refrigerator must be dedicated to vaccines and other heat-sensitive medicines, with no food or drink stored in it.",
        "A current, calibrated data logger and a minimum/maximum thermometer must be used.",
        "Thermometers and data loggers must be calibrated annually; calibration certificates retained.",
        "Backup power supply or an emergency relocation plan must be in place for power failures.",
    ])]),

    ("8. Communication with Patients", [("bullets", [
        "Patients are informed that vaccines are stored and managed according to the National Vaccine Storage Guidelines: Strive for 5 (criterion CG12).",
        "A short statement is displayed in the waiting area and included on the practice website confirming adherence to national cold chain guidelines.",
        "Patients who ask are informed that vaccines are stored under strict temperature-controlled conditions to ensure their safety and effectiveness.",
        "Patient information materials (e.g., immunisation consent forms and brochures) include a brief explanation of cold chain storage.",
    ])]),

    ("9. Temperature Monitoring", [("bullets", [
        "Temperature must remain within +2°C to +8°C at all times.",
        "Record the current, minimum, and maximum temperatures at the start and end of each business day.",
        "Reset the minimum/maximum thermometer after each reading.",
        "Review data logger data at least weekly and retain records for the period required by the state/territory health authority.",
        "Investigate any temperature excursion immediately.",
    ])]),

    ("10. Vaccine Ordering, Receipt, and Storage", [("bullets", [
        "Order vaccines according to anticipated demand to avoid overstocking.",
        "On receipt, check the vaccine condition, packaging, and that cold chain was maintained in transit; record receipt.",
        "Store vaccines in their original packaging, with adequate space for air circulation.",
        "Rotate stock so vaccines with the shortest expiry date are used first (FEFO: first expired, first out).",
        "Check expiry dates monthly and quarantine expired stock.",
    ])]),

    ("11. Cold Chain Breach Management", [("p",
        "If a cold chain breach is identified (temperature outside +2°C to +8°C):"
    ), ("numbers", [
        "Isolate the affected vaccines in the refrigerator (do not discard) and label them 'DO NOT USE: cold chain breach'.",
        "Record the temperature reached, duration (from data logger), and vaccines affected.",
        "Contact the state/territory health department or vaccine provider for advice on potency.",
        "Do not administer affected vaccines until advice is received.",
        "Follow the advice received; document the outcome and dispose of vaccines appropriately if required.",
        "Identify the cause and implement corrective action to prevent recurrence.",
    ])]),

    ("12. Education and Training", [("bullets", [
        "All staff handling vaccines receive cold chain training at induction.",
        "Annual refresher training for the Cold Chain Coordinator and clinical staff.",
        "The delegate receives the same cold chain training as the Cold Chain Coordinator.",
    ])]),

    ("13. Monitoring, Audit, and Review", [("bullets", [
        "Monthly review of temperature records and data logger data.",
        "Quarterly audit of vaccine stock, expiry dates, and storage conditions.",
        "Annual review of this policy and the breach register.",
    ])]),

    ("14. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Daily temperature records (current, minimum, maximum).",
        "Data logger downloads retained per state/territory requirements.",
        "Vaccine ordering and receipt records.",
        "Cold chain breach reports and outcomes.",
        "Calibration certificates for thermometers and data loggers.",
        "The cold chain delegation roster.",
        "Staff cold chain training records.",
    ])]),

    ("15. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Immunisation Handbook: Storing vaccines. Available at: https://www.immunisationhandbook.health.gov.au/vaccine-storage",
        "National Vaccine Storage Guidelines: Strive for 5. Available at: https://www.health.gov.au/resources/publications/national-vaccine-storage-guidelines-strive-for-5",
    ])]),
]
