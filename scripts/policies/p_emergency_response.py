"""Emergency Response Plan and Equipment Policy — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "Emergency Response Plan and Equipment Policy"
FILENAME = "Emergency_Response_Plan_and_Equipment_Policy"
OWNER = "Practice Manager / Lead GP"

SECTIONS = [
    ("1. Policy Title", [("p", "Emergency Response Plan and Equipment Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy sets out [Practice Name]'s procedures for responding to medical "
        "emergencies in and around the practice, and for maintaining emergency response "
        "equipment and emergency medicines. It aligns with criteria F2 – Response planning and CG11 – Practice equipment of the "
        "RACGP Standards for general practices (6th edition)."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff and covers medical emergencies at the practice, "
        "the maintenance of emergency equipment and emergency medicines, and the broader "
        "business continuity planning obligations of the 6th edition (criterion F2)."
    )]),

    ("4. Definitions", [("bullets", [
        "Medical emergency: A sudden, life-threatening or time-critical clinical event requiring immediate intervention.",
        "Emergency equipment: Equipment used in the response to a medical emergency (e.g., automated external defibrillator (AED), oxygen, airway adjuncts, bag-valve-mask).",
        "Emergency medicines: Medicines kept for immediate use in an emergency (e.g., adrenaline for anaphylaxis, aspirin, glucose, Glyceryl trinitrate).",
        "Business continuity: The practice's ability to continue delivering essential services during and after a disruption.",
    ])]),

    ("5. Principles", [("bullets", [
        "Rapid recognition and response to medical emergencies.",
        "Emergency equipment and medicines available, accessible, and maintained.",
        "All staff trained and competency-assessed for their role in an emergency.",
        "Broader business continuity planning covers loss of premises, systems, people, or suppliers.",
    ])]),

    ("6. Emergency Response Roles", [("p", "<b>Emergency response team:</b>"), ("bullets", [
        "Designated team leader (usually the most senior clinician present).",
        "Airway/breathing/circulation support roles.",
        "Person to call 000 and direct ambulance on arrival.",
        "Person to retrieve emergency equipment and medicines.",
        "Person to manage other patients and clear the area.",
    ]), ("p", "<b>All staff:</b> hold a current first-aid and CPR competency, with annual recertification.")]),

    ("7. Emergency Response Procedure", [("numbers", [
        "Recognise the emergency and call for assistance.",
        "The most senior clinician assumes the role of team leader.",
        "Call 000 (ambulance) for any life-threatening condition; provide clear directions to the practice.",
        "Retrieve emergency equipment and medicines; commence BLS and use the AED as indicated.",
        "Provide handover to ambulance on arrival.",
        "Debrief the team as soon as practicable and document the event as an incident.",
    ])]),

    ("8. Emergency Equipment", [("bullets", [
        "An AED is located in a clearly marked, accessible location; staff are trained in its use.",
        "Oxygen, airway adjuncts, bag-valve-mask, and other resuscitation equipment are kept together in a clearly marked emergency trolley or kit.",
        "The emergency equipment is checked at least monthly for completeness and expiry; checks are documented.",
        "Equipment is serviced and calibrated according to the manufacturer's schedule (see Equipment Maintenance and Calibration Records Policy).",
    ])]),

    ("9. Emergency Medicines", [("bullets", [
        "A minimum stock of emergency medicines is maintained, including adrenaline for anaphylaxis, aspirin, glucose, Glyceryl trinitrate, and salbutamol.",
        "Emergency medicines are stored securely but accessibly, in a clearly marked location.",
        "Emergency medicines are checked at least monthly for stock levels and expiry; checks are documented.",
        "Expired or used stock is replaced promptly.",
    ])]),

    ("10. Training and Drills", [("bullets", [
        "All clinical staff complete annual Basic Life Support (BLS) and anaphylaxis response training.",
        "Emergency response drills are conducted at least annually and after any significant incident.",
        "Outcomes of drills inform improvements to the plan.",
    ])]),

    ("11. Business Continuity", [("bullets", [
        "A business continuity plan covers loss of premises, IT systems, key staff, and critical suppliers.",
        "Critical clinical workflows have documented manual fallback procedures.",
        "The plan is tested at least annually and reviewed after any activation.",
    ])]),

    ("12. Monitoring, Audit, and Review", [("bullets", [
        "Monthly check of emergency equipment and medicines.",
        "Annual review of training records, drill outcomes, and the business continuity plan.",
        "Annual review of this policy.",
    ])]),

    ("13. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "Monthly emergency equipment and medicines checklists.",
        "Servicing and calibration records for emergency equipment.",
        "Staff BLS and emergency response training records.",
        "Records of drills, incidents, and debriefs.",
        "The business continuity plan and test results.",
    ])]),

    ("14. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Resuscitation Council (ARC). Guidelines. Available at: https://resus.org.au/guidelines",
        "Therapeutic Goods Administration. Medical devices. Available at: https://www.tga.gov.au",
    ])]),
]
