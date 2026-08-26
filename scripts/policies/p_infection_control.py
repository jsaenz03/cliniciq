"""Infection Control Policy — aligned to RACGP Standards 6th edition."""

from renderer import RACGP_6TH_REF

TITLE = "Infection Control Policy"
FILENAME = "Infection_Control_Policy"
OWNER = "Infection Control Coordinator"

SECTIONS = [
    ("1. Policy Title", [("p", "Infection Control Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy outlines the principles, responsibilities, and procedures for "
        "infection prevention and control (IPC) within [Practice Name] to ensure a safe "
        "environment for patients, staff, and visitors. It aims to minimise the risk of "
        "healthcare-associated infections (HAIs) and the transmission of infectious "
        "diseases, in accordance with the Royal Australian College of General Practitioners "
        "(RACGP) Standards for general practices (6th edition), criterion CG9 – Infection "
        "prevention and control, including reprocessing."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff, including general practitioners, nurses, "
        "administrative staff, allied health professionals, students, volunteers, and "
        "contractors working at or for [Practice Name]. It covers all clinical and "
        "non-clinical areas of the practice and all activities that may pose a risk of "
        "infection transmission."
    )]),

    ("4. Definitions", [("bullets", [
        "Healthcare-Associated Infection (HAI): An infection acquired by a patient during the course of receiving healthcare that was not present or incubating at the time of admission.",
        "Infection Prevention and Control (IPC): The discipline concerned with preventing healthcare-associated infections.",
        "Standard Precautions: Work practices applied to all patients regardless of presumed infection status, including hand hygiene, personal protective equipment (PPE), safe injection practices, safe management of contaminated equipment or surfaces, and respiratory hygiene/cough etiquette.",
        "Transmission-Based Precautions: Additional precautions used with Standard Precautions for patients known or suspected to be infected with pathogens transmissible by airborne, droplet, or contact routes.",
        "Personal Protective Equipment (PPE): Specialised clothing or equipment worn for protection against infectious materials (e.g., gloves, gowns, masks, eye protection).",
        "Sharps: Objects or devices with sharp edges or points capable of cutting or piercing (e.g., needles, scalpels, broken glass).",
        "Reprocessing: All steps to ensure a reusable medical device is safe for its intended purpose, including cleaning, disinfection, and sterilisation.",
        "Sterilisation: A validated process that destroys or eliminates all forms of microbial life.",
    ])]),

    ("5. Principles of Infection Prevention and Control", [(
        "p",
        "[Practice Name] is committed to robust IPC practices based on the following principles:"
    ), ("bullets", [
        "Risk management: Proactive identification, assessment, and management of infection risks to patients, staff, and visitors.",
        "Standard Precautions: Consistent application for all patient encounters, recognising all blood and body substances as potentially infectious.",
        "Education and training: All staff receive appropriate, ongoing IPC education relevant to their roles.",
        "Accountability: Clear assignment of responsibility for IPC coordination and implementation.",
        "Continuous improvement: Regular monitoring, audit, and review of IPC practices against the 6th edition criteria (CG9).",
    ])]),

    ("6. Key Responsibilities", [("p",
        "Effective IPC is a shared responsibility. Specific roles include:"
    ), ("p", "<b>Practice Owner / Practice Manager:</b>"), ("bullets", [
        "Overall responsibility for meeting the RACGP 6th edition IPC criteria (CG9).",
        "Allocating resources for IPC, including staffing, equipment, and training.",
        "Ensuring a written, practice-specific IPC policy is in place and reviewed at least annually.",
        "Designating a clinical team member as Infection Control Coordinator.",
    ]), ("p", "<b>Infection Control Coordinator (clinical team member):</b>"), ("bullets", [
        "Coordinating prevention and control of infection within the practice.",
        "Ensuring an adequate range of sterile equipment (reprocessed or disposable).",
        "Overseeing reprocessing of instruments onsite or offsite with documented monitoring and validation.",
        "Ensuring safe storage and stock rotation of sterile products.",
        "Overseeing waste management processes.",
        "Educating the practice team about IPC.",
    ]), ("p", "<b>Clinical staff (GPs, nurses, allied health):</b>"), ("bullets", [
        "Adhering strictly to all IPC policies, including hand hygiene, PPE, and sharps safety.",
        "Implementing Standard and Transmission-Based Precautions as required.",
        "Participating in IPC education and training.",
        "Reporting any IPC breaches or incidents (e.g., sharps injuries, exposures).",
    ]), ("p", "<b>Administrative staff:</b>"), ("bullets", [
        "Adhering to general IPC practices, including hand hygiene and environmental cleaning of non-clinical areas.",
        "Assisting with triage of patients with potential communicable diseases.",
        "Ensuring availability of hand hygiene facilities and promoting their use.",
    ])]),

    ("7. Standard Precautions", [("p",
        "Standard Precautions are the minimum IPC practices that apply to all patient care, regardless of suspected or confirmed infection status."
    )]),

    ("7.1 Hand Hygiene", [("p",
        "Hand hygiene is the single most important measure for preventing the spread of "
        "infection. All staff must perform hand hygiene:"
    ), ("bullets", [
        "Before and after direct patient contact.",
        "Before and after touching the patient's surroundings.",
        "Before clean/aseptic procedures.",
        "After body fluid exposure risk.",
        "After glove removal.",
    ]), ("p",
        "Alcohol-based hand rub (ABHR) is the preferred method when hands are not "
        "visibly soiled. Soap and water must be used when hands are visibly soiled, after "
        "using the toilet, and after caring for patients with known or suspected "
        "Clostridioides difficile."
    )]),

    ("7.2 Personal Protective Equipment (PPE)", [("p",
        "PPE selection is based on a risk assessment of the task and the potential for "
        "exposure to blood, body fluids, or contaminated surfaces. PPE includes:"
    ), ("bullets", [
        "Gloves: worn when there is a risk of contact with blood, body fluids, non-intact skin, mucous membranes, or contaminated equipment. Changed between patients and tasks; hand hygiene performed after removal.",
        "Gowns/aprons: worn to protect clothing during procedures likely to generate splashes or sprays.",
        "Masks and eye protection: worn to protect mucous membranes during procedures likely to generate splashes or sprays, or when caring for patients with respiratory infections.",
    ]), ("p",
        "Correct donning and doffing procedures must be followed to prevent self-contamination. Used PPE must be disposed of immediately into appropriate waste receptacles."
    )]),

    ("7.3 Sharps Safety and Injury Management", [("p", "The practice must ensure:"
    ), ("bullets", [
        "Safe handling and disposal of sharps in puncture-resistant, clearly labelled sharps containers that comply with Australian Standards.",
        "Sharps containers are located at the point of use, not overfilled, and securely closed when full.",
        "Needle recapping is strictly prohibited.",
    ]), ("p", "In the event of a sharps injury, take the following immediate actions:"
    ), ("numbers", [
        "Allow the wound to bleed freely; do not squeeze.",
        "Wash the wound thoroughly with soap and water.",
        "Report the incident immediately to the Infection Control Coordinator or Practice Manager.",
        "Follow the practice's post-exposure management protocol, including risk assessment, blood tests, and consideration of post-exposure prophylaxis (PEP).",
        "Document the incident in the practice's incident register.",
    ])]),

    ("7.4 Environmental Cleaning and Disinfection", [("bullets", [
        "Maintain a clean and hygienic environment in all clinical and non-clinical areas.",
        "Use appropriate cleaning agents and disinfectants according to manufacturer instructions and practice protocols.",
        "Ensure high-touch surfaces (e.g., examination couches, door handles, keyboards) are cleaned and disinfected frequently.",
        "Follow specific protocols for cleaning after spills of blood or body fluids.",
    ])]),

    ("7.5 Waste Management", [("p",
        "Clear procedures must exist for the segregation, collection, storage, and disposal of:"
    ), ("bullets", [
        "Clinical waste (e.g., sharps, human tissue, blood, laboratory waste): placed in clearly identifiable, leak-proof, puncture-resistant containers and disposed of by an authorised clinical waste contractor.",
        "General waste (e.g., office waste, food scraps): placed in general waste bins and disposed of according to local council regulations.",
    ])]),

    ("7.6 Reprocessing of Reusable Medical Instruments", [("p",
        "If the practice reprocesses reusable medical instruments, it must follow stringent protocols:"
    ), ("bullets", [
        "Cleaning: thorough manual or automated cleaning to remove all visible organic and inorganic material.",
        "Disinfection (if applicable): appropriate disinfectants for semi-critical instruments that cannot be sterilised.",
        "Sterilisation: validated, monitored equipment (e.g., autoclave) for critical instruments that penetrate sterile tissue or enter the vascular system.",
        "Storage: sterilised instruments stored to maintain sterility until point of use.",
        "Documentation: a sterilisation log recording the load number and patient details for traceability.",
    ])]),

    ("8. Management of Blood and Body Fluid Exposures", [("p",
        "Immediate action is critical following exposure to blood or body fluids:"
    ), ("numbers", [
        "Skin exposure: wash thoroughly with soap and water.",
        "Mucous membrane exposure (eyes, nose, mouth): flush with copious water or saline.",
        "Report: immediately notify the Infection Control Coordinator or Practice Manager.",
        "Risk assessment: prompt assessment to determine the need for PEP based on the source patient's status and the nature of exposure.",
        "Counselling and testing: confidential counselling and baseline/follow-up blood tests for the exposed individual and, with consent, the source patient.",
        "PEP: if indicated, initiate as soon as possible, ideally within 2 hours.",
        "Documentation: document the incident thoroughly in the incident register.",
    ])]),

    ("9. Immunisation for Staff", [("p",
        "All staff, particularly those with direct patient contact, should be appropriately "
        "immunised. Recommended immunisations include:"
    ), ("bullets", [
        "Hepatitis B",
        "Influenza (annual)",
        "Measles, Mumps, Rubella (MMR)",
        "Varicella (chickenpox)",
        "Pertussis (whooping cough) — as part of dTpa",
    ]), ("p",
        "Staff immunisation status should be reviewed regularly and records maintained confidentially."
    )]),

    ("10. Education and Training", [("bullets", [
        "Induction training: comprehensive IPC training for all new staff during induction.",
        "Annual refresher training: regular updates to maintain competency and awareness of current guidelines.",
        "Specific training: on new procedures, equipment, or in response to identified risks or outbreaks.",
        "Competency assessment: regular assessment of staff competency in IPC practices.",
    ]), ("p", "Training records (dates, topics, attendees) must be maintained.")]),

    ("11. Outbreak Management", [("p",
        "In the event of an infectious disease outbreak (e.g., influenza, gastroenteritis), the practice implements a coordinated response:"
    ), ("bullets", [
        "Early identification: prompt recognition and reporting of potential outbreaks.",
        "Isolation/triage: appropriate procedures for suspected cases to minimise transmission.",
        "Communication: notifying relevant public health authorities as required.",
        "Enhanced cleaning: increasing the frequency and intensity of environmental cleaning.",
        "Staff management: managing exposed or ill staff, including sick leave and return-to-work guidance.",
        "Patient communication: clear information to patients about the outbreak and necessary precautions.",
        "Review: post-outbreak review to identify lessons learned.",
    ])]),

    ("12. Monitoring, Audit, and Review", [("bullets", [
        "Regular audits of hand hygiene compliance, PPE use, sharps disposal, and environmental cleaning.",
        "Incident reporting review: all infection-related incidents, near misses, and sharps injuries reviewed for trends and improvement opportunities.",
        "Policy review: at least annually, or sooner if there are changes in legislation, guidelines, or practice procedures.",
        "Feedback: staff feedback on IPC practices actively encouraged.",
    ])]),

    ("13. Documentation and Record Keeping", [(
        "p", "The practice maintains records of:"
    ), ("bullets", [
        "This IPC policy and associated procedures.",
        "Staff IPC training (dates, topics, attendees).",
        "Staff immunisation records.",
        "Sharps injury and blood/body fluid exposure incidents.",
        "Sterilisation logs (if applicable).",
        "Environmental cleaning schedules and checklists.",
        "Waste management contracts and manifests.",
        "IPC audit results and action plans.",
    ])]),

    ("14. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Commission on Safety and Quality in Health Care. Australian Guidelines for the Prevention and Control of Infection in Healthcare. Available at: https://www.safetyandquality.gov.au/our-work/healthcare-associated-infection",
        "Australian Immunisation Handbook. Available at: https://www.immunisationhandbook.health.gov.au",
    ])]),
]
