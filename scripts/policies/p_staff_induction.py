"""Staff Induction and Performance Review Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Staff Induction and Performance Review Policy"
FILENAME = "Staff_Induction_and_Performance_Review_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Staff Induction and Performance Review Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] inducts, supports, and reviews its staff "
        "to maintain a competent and engaged team. It aligns with criterion F4 – Induction, training and supporting performance of the "
        "RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff on commencement and throughout their employment "
        "or engagement at the practice."
    )]),

    ("4. Definitions", [("bullets", [
        "Induction: The structured process of introducing a new staff member to the practice, their role, and key policies.",
        "Probation: An initial period of employment during which performance and fit are assessed.",
        "Performance review: A periodic, documented discussion of performance, development, and goals.",
        "Continuing professional development (CPD): Ongoing learning that maintains a clinician's competence.",
    ])]),

    ("5. Principles", [("bullets", [
        "Every staff member receives a structured induction before independent practice.",
        "Credentials, registrations, and mandatory training are verified at induction and monitored.",
        "Performance is reviewed at least annually with clear, fair feedback.",
        "Continuing professional development is supported and documented.",
        "Equity and respectful conduct are expected of all staff (AHPRA-compliant).",
    ])]),

    ("6. Recruitment and Credentialing", [("bullets", [
        "Recruitment follows a documented process including position description, interview, referee checks, and pre-employment screening.",
        "Credentials and registrations are verified before commencement, including AHPRA registration, working with children check, police check, and immunisation status.",
        "Right to work in Australia is verified.",
    ])]),

    ("7. Induction", [("bullets", [
        "A structured induction covers practice values, organisational structure, role description, key policies, IT systems, emergency procedures, infection control, privacy, and work health and safety.",
        "Mandatory training is completed during induction (privacy, IPC, manual handling, fire safety, BLS).",
        "A buddy or mentor is assigned for the first weeks.",
        "Induction is documented and signed off by the new staff member and Practice Manager.",
    ])]),

    ("8. Probation", [("bullets", [
        "Probation lasts for the period specified in the employment contract.",
        "Probation reviews are held at the midpoint and end of probation.",
        "Confirmation of employment is documented when probation is satisfactorily completed.",
    ])]),

    ("9. Performance Review", [("bullets", [
        "Formal performance reviews are held at least annually.",
        "Reviews cover performance against the role description, achievements, development goals, and any concerns.",
        "Reviews are documented and signed by the staff member and reviewer.",
        "Informal feedback is provided regularly throughout the year.",
    ])]),

    ("10. Continuing Professional Development", [("bullets", [
        "All clinical staff maintain CPD in line with their board/college requirements.",
        "The practice supports CPD through study leave, access to education, and protected time.",
        "CPD is documented for each staff member.",
    ])]),

    ("11. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Coordinates recruitment, induction, probation, and performance review.",
        "Maintains staff records and credential registers.",
    ]), ("p", "<b>Practice Principal / supervisors:</b>"), ("bullets", [
        "Lead performance reviews for their direct reports.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Participate in induction and review.",
        "Maintain their own CPD and notify the practice of any change to registration.",
    ])]),

    ("12. Monitoring, Audit, and Review", [("bullets", [
        "Annual audit of staff files for currency of credentials, registrations, and mandatory training.",
        "Annual review of this policy.",
    ])]),

    ("13. Documentation and Record Keeping", [(
        "p", "The practice maintains for each staff member:"
    ), ("bullets", [
        "Role description and employment contract.",
        "Verified credentials, registrations, and checks.",
        "Induction checklist and sign-off.",
        "Probation and performance review records.",
        "Training and CPD records.",
        "Immunisation records (confidentially held).",
    ])]),

    ("14. References", [("bullets", [
        RACGP_6TH_REF,
        "Medical Board of Australia. Continuing professional development. Available at: https://www.medicalboard.gov.au",
        "Fair Work Ombudsman. Best practice guides. Available at: https://www.fairwork.gov.au",
    ])]),
]
