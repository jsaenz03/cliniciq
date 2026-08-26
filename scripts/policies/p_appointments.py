"""Appointment Management System Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Appointment Management System Policy"
FILENAME = "Appointment_Management_System_Policy"
OWNER = "Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "Appointment Management System Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] provides an efficient, accessible, and "
        "patient-centred appointment system. It aligns with criterion PP9 – Responsive system for patient care of the RACGP "
        "Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff involved in booking, managing, and coordinating "
        "appointments. It covers all appointment types, including face-to-face, telehealth, "
        "and procedural bookings."
    )]),

    ("4. Definitions", [("bullets", [
        "Appointment system: The processes and tools used to schedule and manage patient consultations.",
        "Patient flow: The movement of patients through the practice from arrival to departure.",
        "Telehealth consultation: A consultation conducted remotely via telephone or video.",
        "Urgent appointment: An appointment required for a condition that needs prompt medical attention but is not immediately life-threatening.",
        "Routine appointment: An appointment for non-urgent care, follow-up, or preventive health checks.",
    ])]),

    ("5. Principles", [("bullets", [
        "Accessibility via multiple convenient booking methods.",
        "Timeliness — appointments provided within a clinically appropriate timeframe.",
        "Efficiency — optimised practitioner schedules and patient flow.",
        "Patient-centred — individual needs, preferences, and continuity of care considered.",
        "Flexibility — capacity to accommodate urgent cases and unforeseen circumstances.",
        "Equity — accurate demographic capture supports personalised care (see Patient Demographics Policy).",
    ])]),

    ("6. Booking Methods", [("bullets", [
        "Telephone: bookings taken by reception staff during opening hours, with triage for urgent needs.",
        "Online booking: a secure online system is available 24/7 via the practice website or patient app.",
        "In person: bookings at reception during opening hours.",
        "Recall/referral: appointments generated via recall, reminder, and referral systems for follow-up and preventive care.",
    ])]),

    ("7. Scheduling Guidelines", [("bullets", [
        "Appointment lengths reflect the consultation type (standard, long, procedure, immunisation).",
        "A proportion of daily appointments is reserved for urgent cases; reception staff triage and escalate to a clinician where immediate assessment is required.",
        "Walk-in patients with urgent needs are assessed by a clinician; non-urgent walk-ins are offered the next available appointment.",
        "Continuity of care: where possible, patients are offered appointments with their usual GP.",
        "Telehealth appointments are offered where clinically appropriate and consistent with Medicare Benefits Schedule (MBS) requirements.",
        "Interpreter services are arranged at booking for patients who need them.",
    ])]),

    ("8. Communication and Reminders", [("bullets", [
        "Confirmation of appointment details is provided at booking via the patient's preferred channel (SMS, email, verbal).",
        "Automated reminders are sent before appointments; patients may confirm or cancel via the reminder.",
        "Patients are encouraged to notify the practice as early as possible to cancel or reschedule.",
        "A defined process manages non-attendance (Did Not Attend / DNA), including follow-up for clinically significant appointments.",
    ])]),

    ("9. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the appointment system and monitors key performance indicators (KPIs).",
    ]), ("p", "<b>Reception staff:</b>"), ("bullets", [
        "Book, confirm, and remind patients; triage urgent requests.",
        "Arrange interpreters and accessibility supports.",
    ]), ("p", "<b>Clinical staff:</b>"), ("bullets", [
        "Provide clinical triage and escalation.",
        "Communicate appointment needs to reception.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Regular monitoring of KPIs: average waiting time, urgent appointment accommodation rate, non-attendance rate, patient feedback on access.",
        "Patient and staff feedback actively sought and reviewed.",
        "Annual review of this policy.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Appointment records in the practice management system.",
        "Records of recalls, reminders, and their outcomes.",
        "Records of non-attendance and follow-up for clinically significant appointments.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Medical Association. Guidelines for the use of telehealth in medical practice. Available at: https://www.ama.com.au",
        "Medicare Benefits Schedule (MBS) — telehealth. Available at: https://www.mbsonline.gov.au",
    ])]),
]
