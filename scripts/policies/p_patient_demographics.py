"""Patient Demographics Policy – RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Patient Demographics Policy"
FILENAME = "Patient_Demographics_and_Identity_Policy"
OWNER = "Practice Manager"

VERSION = "2.2"
EFFECTIVE_DATE = "3 October 2026"
NEXT_REVIEW = "3 October 2027"

SECTIONS = [
    ("1. Policy Title", [("p", "Patient Demographics Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] captures, records, uses, and "
        "safeguards patient demographic information, and how patients are correctly "
        "identified. It implements the expanded demographics requirements of "
        "criterion CG3 – Facilitating complete patient health records and criterion "
        "CG2 – Patient identification of the RACGP Standards "
        "for general practices (6th edition), and complements the Privacy and Confidentiality policy."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff involved in registering, updating, or using "
        "patient demographic information, and to all systems in which it is recorded."
    )]),

    ("4. Definitions", [("bullets", [
        "Demographic information: Information about a patient's background that informs their care, including date of birth, address, contact details, Aboriginal and/or Torres Strait Islander status, country of birth, preferred language, interpreter need, and disability status.",
        "Preferred name: The name a person uses and wishes to be known by, which may differ from their legal name.",
        "Approved patient identifier: An identifier used to match a patient to their health record, such as patient name (family and given names), date of birth, address, Medicare/DVA number, or individual patient phone number.",
        "Sensitive information: A category of personal information under the Privacy Act that includes racial or ethnic origin and health information.",
    ])]),

    ("5. Principles", [("bullets", [
        "Demographic information is captured accurately, completely, and confidentially.",
        "Information is captured for clear clinical or administrative purposes and protected appropriately.",
        "Patients can update their information at any time.",
        "Staff are trained to collect demographic information respectfully and consistently.",
    ])]),

    ("6. What We Capture and Why", [(
        "p",
        "Each item is captured because it directly informs safe, equitable care:"
    ), ("bullets", [
        "Date of birth, legal name, and preferred name, for correct identification, billing, prescribing, and respectful communication.",
        "Address and contact details, for correspondence, recalls, reminders, and home visits.",
        "Aboriginal and/or Torres Strait Islander status, to support appropriate screening, health checks (e.g., MBS 715), and Closing the Gap initiatives.",
        "Country of birth, languages spoken, and interpreter need, to arrange interpreter services and provide culturally appropriate care.",
        "Disability and accessibility needs, to make reasonable adjustments for appointments and the physical environment.",
        "Emergency contact and next of kin, for use in an emergency.",
        "Medicare/DVA number and concession status, for billing and entitlements.",
    ])]),

    ("7. Patient Identification (Criterion CG2)", [("bullets", [
        "A minimum of three approved patient identifiers are used to correctly match each patient to their health record.",
        "Approved identifiers are selected from: patient name (family and given names), date of birth, address, Medicare/DVA number, and individual patient phone number.",
        "Identifiers are confirmed with the patient at registration and verified at subsequent encounters where clinically or administratively appropriate (e.g., before prescribing, results discussion, or procedures).",
        "Staff confirm details with the patient directly rather than reading them out for confirmation alone.",
        "Patient identity is verified and reconciled at every clinical encounter as described in the Clinical Risk Management Systems Policy.",
    ])]),

    ("8. How We Capture It", [("bullets", [
        "Demographic information is collected at registration and reviewed opportunistically, particularly at key transitions such as a first visit, chronic disease registration, or a change of address.",
        "Staff use the structured fields provided in the clinical information system, with coded values where available (e.g., SNOMED CT-AU).",
        "Where a field is optional, patients may decline to answer.",
        "Information is recorded accurately and confirmed with the patient to avoid errors that could affect care (e.g., wrong date of birth, outdated contact details).",
    ])]),

    ("9. Recording and Display", [("bullets", [
        "Preferred name is displayed so reception and clinical staff address the patient correctly.",
        "Legal name is recorded where required for Medicare, billing, and prescribing, and used only where legally necessary.",
        "Interpreter need and accessibility requirements are flagged prominently so they are actioned before each appointment.",
        "Demographic information is stored as part of the patient's electronic health record under the access controls described in the Privacy and IT Security policies.",
    ])]),

    ("10. Confidentiality and Privacy", [("bullets", [
        "Demographic information is personal and (where relevant) sensitive information under the Privacy Act and is protected accordingly.",
        "Information is shared only with the patient's consent or as authorised or required by law.",
        "Accidental or unauthorised disclosure is treated as a privacy incident (see Privacy and Confidentiality policy).",
    ])]),

    ("11. Data Quality and Improvement", [("bullets", [
        "Completeness of key demographic fields (Aboriginal and/or Torres Strait Islander status, country of birth, language, interpreter need) is monitored as part of data quality and continuous quality improvement.",
        "Gaps identified through audit are addressed through targeted recall or opportunistic review.",
    ])]),

    ("12. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the demographic fields, forms, training, and this policy.",
    ]), ("p", "<b>Reception staff:</b>"), ("bullets", [
        "Capture and update demographic information accurately and consistently.",
        "Use the patient's preferred name in all interactions.",
        "Collect the required identifiers at registration and confirm them with the patient.",
        "Flag interpreter and accessibility needs for clinical staff.",
    ]), ("p", "<b>Clinicians:</b>"), ("bullets", [
        "Use demographic information to deliver safe, equitable care.",
        "Verify patient identity before clinical care where appropriate.",
        "Confirm information opportunistically and update the record.",
    ])]),

    ("13. Monitoring, Audit, and Review", [("bullets", [
        "Annual audit of completeness of key demographic fields.",
        "Review of any patient feedback or incidents related to demographic information or patient identification.",
        "Annual review of this policy and staff training.",
    ])]),

    ("14. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Demographic fields in each patient's record, captured using structured, coded values where available.",
        "Staff training records for accurate and respectful data collection.",
        "Records of patient feedback and incidents related to demographics.",
    ])]),

    ("15. References", [("bullets", [
        RACGP_6TH_REF,
        "Privacy Act 1988 (Cth) and the Australian Privacy Principles. Available at: https://www.oaic.gov.au",
        "Australian Commission on Safety and Quality in Health Care. National Safety and Quality Health Service (NSQHS) Standards: Communicating for Safety. Available at: https://www.safetyandquality.gov.au",
        "Australian Institute of Health and Welfare. Patient demographics data standards. Available at: https://www.aihw.gov.au",
        "Department of Health and Aged Care. Closing the Gap initiatives. Available at: https://www.health.gov.au",
    ])]),
]
