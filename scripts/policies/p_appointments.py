"""Appointment Management System Policy – RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Appointment Management System Policy"
FILENAME = "Appointment_Management_System_Policy"
OWNER = "Practice Manager"

VERSION = "2.2"
EFFECTIVE_DATE = "3 October 2026"
NEXT_REVIEW = "3 October 2027"

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
        "Timeliness, with appointments provided within a clinically appropriate timeframe.",
        "Efficiency, with optimised practitioner schedules and patient flow.",
        "Patient-centred care that considers individual needs, preferences, and continuity.",
        "Flexibility to accommodate urgent cases and unforeseen circumstances.",
        "Equity, with accurate demographic capture supporting personalised care (see Patient Demographics Policy).",
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
        "Patients are informed of the options for accessing care when they cannot attend in person, including telehealth, home visits where safe and reasonable, and after-hours services (criterion PP9.B).",
        "Interpreter services are arranged at booking for patients who need them.",
    ])]),

    ("8. Triage System (Criterion PP9.A)", [(
        "p", "The practice triages patients according to their urgency of need:"
    ), ("bullets", [
        "Triage guidelines and a flowchart are available at the reception area for staff use.",
        "A member of the clinical team (Lead GP or delegate) has primary responsibility for training the practice team in triage (criterion PP9.A).",
        "Triage training covers how to identify patients with an urgent medical need, identify emergency events and reprioritise appointments, seek urgent medical assistance from an appropriate clinician, and manage patients with urgent needs when the practice is fully booked.",
        "Triage training includes the use of sensitive and privacy-aware communication when patients indicate safety or confidentiality concerns.",
        "A sign in the waiting area advises patients with a high-risk condition or deteriorating symptoms to tell reception staff.",
        "When an emergency reprioritises appointments, reception staff update the waiting list and explain to patients that waiting times may increase.",
    ])]),

    ("9. Communication and Reminders", [("bullets", [
        "Confirmation of appointment details is provided at booking via the patient's preferred channel (SMS, email, verbal).",
        "Automated reminders are sent before appointments; patients may confirm or cancel via the reminder.",
        "Patients are encouraged to notify the practice as early as possible to cancel or reschedule.",
        "A defined process manages non-attendance (Did Not Attend / DNA), including follow-up for clinically significant appointments.",
    ])]),

    ("10. Roles and Responsibilities", [("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Maintains the appointment system and monitors key performance indicators (KPIs).",
    ]), ("p", "<b>Lead GP or delegate:</b>"), ("bullets", [
        "Holds primary responsibility for training the practice team in triage (criterion PP9.A).",
    ]), ("p", "<b>Reception staff:</b>"), ("bullets", [
        "Book, confirm, and remind patients; triage urgent requests.",
        "Arrange interpreters and accessibility supports.",
    ]), ("p", "<b>Clinical staff:</b>"), ("bullets", [
        "Provide clinical triage and escalation.",
        "Communicate appointment needs to reception.",
    ])]),

    ("11. Monitoring, Audit, and Review", [("bullets", [
        "Regular monitoring of KPIs: average waiting time, urgent appointment accommodation rate, non-attendance rate, patient feedback on access.",
        "Patient and staff feedback actively sought and reviewed.",
        "Annual review of this policy and the triage training record.",
    ])]),

    ("12. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Appointment records in the practice management system.",
        "Records of recalls, reminders, and their outcomes.",
        "Records of non-attendance and follow-up for clinically significant appointments.",
        "Triage guidelines, flowchart, and training records.",
    ])]),

    ("13. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Medical Association. Guidelines for the use of telehealth in medical practice. Available at: https://www.ama.com.au",
        "Medicare Benefits Schedule (MBS) telehealth. Available at: https://www.mbsonline.gov.au",
    ])]),
]
