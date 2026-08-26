"""Complaints Management System Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Complaints Management System Policy"
FILENAME = "Complaints_Management_System_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Complaints Management System Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] receives, records, investigates, "
        "resolves, and learns from complaints and feedback. It aligns with criterion PP7 – Open disclosure and complaints of the Patient "
        "participation standard, RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff and covers all forms of complaint and feedback, "
        "verbal and written, from patients, carers, and other stakeholders."
    )]),

    ("4. Definitions", [("bullets", [
        "Complaint: An expression of dissatisfaction with care, service, or staff that requires a response.",
        "Feedback: Comments or suggestions that may be positive, neutral, or negative.",
        "Complaints register: A central record of all complaints, their status, actions, and outcomes.",
    ])]),

    ("5. Principles", [("bullets", [
        "A transparent, accessible process for receiving complaints and feedback.",
        "Acknowledgement of complaints in a timely and respectful manner.",
        "Fair, objective investigation by an appropriate person.",
        "Confidentiality and protection from retaliation for complainants and staff.",
        "Continuous improvement driven by complaint themes.",
    ])]),

    ("6. Receiving Complaints", [("bullets", [
        "Complaints can be made in person, by phone, in writing, or via the practice website.",
        "Complaint handling information is displayed in the waiting area and on the website.",
        "Staff are trained to receive complaints courteously and to escalate to the Practice Manager.",
        "Patients are informed of their right to escalate to the Health Complaints Commissioner in their state/territory.",
    ])]),

    ("7. Complaint Handling Process", [("numbers", [
        "Acknowledge the complaint within two business days.",
        "Record the complaint in the complaints register.",
        "Investigate by the Practice Manager (or delegate); gather relevant information.",
        "Provide a substantive response to the complainant within an agreed timeframe (typically within 30 days).",
        "Implement corrective actions and advise the complainant of changes made.",
        "Offer to escalate to the Practice Principal or external body if the complainant remains dissatisfied.",
    ])]),

    ("8. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Receives and coordinates investigation of complaints.",
        "Maintains the complaints register and reports themes to the team.",
    ]), ("p", "<b>Practice Principal:</b>"), ("bullets", [
        "Acts as the escalation point and reviews serious complaints.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Receive complaints courteously and escalate promptly.",
        "Implement changes arising from complaint findings.",
    ])]),

    ("9. Monitoring, Audit, and Review", [("bullets", [
        "Monthly review of the complaints register and open items.",
        "Quarterly thematic analysis of complaints and feedback to identify improvement opportunities.",
        "Annual review of this policy.",
    ])]),

    ("10. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "A complaints register recording each complaint, actions taken, and outcomes.",
        "Records of complaint investigations and correspondence.",
        "Records of changes implemented in response to complaints.",
    ])]),

    ("11. References", [("bullets", [
        RACGP_6TH_REF,
        "Health Complaints Commissioner (state/territory).",
        "Australian Commission on Safety and Quality in Health Care. Patient-centred communication. Available at: https://www.safetyandquality.gov.au",
    ])]),
]
