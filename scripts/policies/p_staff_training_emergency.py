"""Staff Training in Emergency Procedures Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Staff Training in Emergency Procedures Policy"
FILENAME = "Staff_Training_in_Emergency_Procedures_Policy"
OWNER = "Practice Manager / Lead GP"

SECTIONS = [
    ("1. Policy Title", [("p", "Staff Training in Emergency Procedures Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy specifies the training and competency requirements for staff to "
        "respond effectively to medical emergencies at [Practice Name]. It aligns with criteria F2 – Response planning and F4 – Induction, training and "
        "supporting performance of the RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff, clinical and non-clinical, who may be present "
        "during a medical emergency at the practice."
    )]),

    ("4. Definitions", [("bullets", [
        "Basic Life Support (BLS): The immediate response to a person in cardiac arrest, including CPR and use of an AED.",
        "Automated External Defibrillator (AED): A device that analyses heart rhythm and delivers a shock if needed.",
        "Anaphylaxis response: The immediate management of a severe allergic reaction, including administration of adrenaline.",
        "Emergency drill: A simulated emergency used to test the team's response.",
    ])]),

    ("5. Principles", [("bullets", [
        "All staff have a defined role in an emergency and are trained for it.",
        "Training is repeated at least annually and competency assessed.",
        "Emergency drills are run at least annually and after any significant incident.",
        "Training and drill outcomes drive improvement of the Emergency Response Plan.",
    ])]),

    ("6. Training Requirements", [("bullets", [
        "All clinical staff: annual BLS and CPR certification, and anaphylaxis response training.",
        "All staff: induction training in the practice's emergency procedures and their role, refreshed at least every two years.",
        "Designated emergency response team: advanced resuscitation training commensurate with their role.",
        "New staff complete emergency procedure training during induction before independent clinical practice.",
    ])]),

    ("7. Competency Assessment", [("bullets", [
        "Practical demonstration of CPR and AED use is assessed at each annual recertification.",
        "Anaphylaxis response competency is assessed during training.",
        "Emergency response roles are reassessed during drills.",
    ])]),

    ("8. Drills", [("bullets", [
        "Emergency drills (e.g., cardiac arrest, anaphylaxis) are conducted at least annually.",
        "Drills are scenario-based and involve all on-site staff.",
        "A debrief follows each drill; findings are documented and feed into the Emergency Response Plan.",
    ])]),

    ("9. Roles and Responsibilities", [("p", "<b>Practice Manager / Lead GP:</b>"), ("bullets", [
        "Coordinate training schedules, drills, and competency records.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Maintain their required certifications.",
        "Participate in drills and debriefs.",
    ])]),

    ("10. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly check that all staff certifications are current.",
        "Annual review of drill outcomes and this policy.",
    ])]),

    ("11. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Staff BLS, CPR, and anaphylaxis certifications.",
        "Emergency procedure induction and refresher records.",
        "Drill scenarios, debrief notes, and resulting actions.",
    ])]),

    ("12. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Resuscitation Council (ARC). Guidelines. Available at: https://resus.org.au/guidelines",
        "ASCIA. Acute management of anaphylaxis. Available at: https://www.allergy.org.au",
    ])]),
]
