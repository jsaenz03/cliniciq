"""Clear Roles and Responsibilities Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Clear Roles and Responsibilities Policy"
FILENAME = "Clear_Roles_and_Responsibilities_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Clear Roles and Responsibilities Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy clarifies the roles, responsibilities, and accountabilities of "
        "everyone working at [Practice Name], to support safe, well-coordinated care. It "
        "aligns with criteria F1 – Defining and planning for the practice and F7 – Practice "
        "team culture, safety and involvement of the RACGP Standards for general practices "
        "(6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff, including principals, GPs, nurses, allied health, "
        "administrative staff, students, volunteers, and contractors."
    )]),

    ("4. Definitions", [("bullets", [
        "Role: The position and function a person performs in the practice.",
        "Responsibility: The duties and tasks assigned to a role.",
        "Accountability: The obligation to answer for the performance of those duties.",
        "Scope of practice: The boundaries of a clinician's competence and authorisation.",
    ])]),

    ("5. Principles", [("bullets", [
        "Every person has a clear, documented role description.",
        "Clinical staff practise within their scope of practice and current registration.",
        "Authority and decision-making are matched to competence and role.",
        "Roles and responsibilities are reviewed when team composition or scope changes.",
    ])]),

    ("6. Role Descriptions", [("bullets", [
        "Each staff member has a current role description covering position title, reporting line, key responsibilities, required qualifications, and key performance indicators.",
        "Role descriptions are reviewed annually and on significant change.",
        "Specific clinical responsibilities (e.g., results management, recalls, immunisation, sterilisation) are allocated and documented.",
        "Designated roles include: Practice Principal, Practice Manager, Lead GP, Infection Control Coordinator, Cold Chain Coordinator, Privacy Officer, IT Security Officer, and CQI sponsor.",
    ])]),

    ("7. Delegation and Supervision", [("bullets", [
        "Tasks are delegated only to staff with the competence to perform them safely.",
        "Students and new staff are supervised commensurate with their experience.",
        "Delegated clinical tasks are documented, including the delegating clinician's oversight arrangements.",
    ])]),

    ("8. Roles and Responsibilities Summary", [("p", "<b>Practice Principal:</b>"), ("bullets", [
        "Overall clinical and corporate governance of the practice.",
    ]), ("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Day-to-day operations, staffing, compliance, and policy management.",
    ]), ("p", "<b>GPs:</b>"), ("bullets", [
        "Clinical care within their scope of practice; clinical leadership and supervision.",
    ]), ("p", "<b>Practice nurses:</b>"), ("bullets", [
        "Nursing care within their scope, including chronic disease management, immunisation, and preventive activities.",
    ]), ("p", "<b>Allied health professionals:</b>"), ("bullets", [
        "Discipline-specific care within their scope of practice.",
    ]), ("p", "<b>Reception and administrative staff:</b>"), ("bullets", [
        "Patient reception, bookings, billing, and administrative support.",
    ])]),

    ("9. Monitoring, Audit, and Review", [("bullets", [
        "Annual review of role descriptions and the allocation of designated roles.",
        "Annual review of this policy.",
    ])]),

    ("10. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Current role descriptions for each staff member.",
        "Records of qualifications, registrations, and credentials.",
        "Records of designated roles and their acceptance.",
    ])]),

    ("11. References", [("bullets", [
        RACGP_6TH_REF,
        "Medical Board of Australia. Good medical practice: a code of conduct for doctors in Australia. Available at: https://www.medicalboard.gov.au",
        "Nursing and Midwifery Board of Australia. Codes and guidelines. Available at: https://www.nursingmidwiferyboard.gov.au",
    ])]),
]
