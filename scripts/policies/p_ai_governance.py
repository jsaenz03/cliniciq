"""AI Governance Policy — RACGP 6th edition (criterion F11; applies where the practice uses AI)."""

from renderer import RACGP_6TH_REF

TITLE = "AI Governance Policy"
FILENAME = "AI_Governance_Policy"
OWNER = "AI Governance Lead / Practice Principal"

SECTIONS = [
    ("1. Policy Title", [("p", "AI Governance Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy establishes how [Practice Name] selects, uses, monitors, and governs "
        "artificial intelligence (AI) tools so that their use is safe, ethical, and "
        "transparent. It implements the dedicated AI criteria of the RACGP Standards for "
        "general practices (6th edition), criterion F11 – Artificial intelligence. These "
        "criteria apply to practices that use AI tools; practices that do not use AI are "
        "not required to adopt it."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff and to any AI tool used in or integrated with "
        "the practice's clinical, administrative, or communication systems — including "
        "ambient scribing, clinical decision support, appointment triage, summarisation, "
        "and patient-facing chatbots."
    )]),

    ("4. Definitions", [("bullets", [
        "Artificial intelligence (AI): Software that performs tasks normally requiring human intelligence, including machine learning and large language models.",
        "Generative AI: AI that produces new content (text, images, audio) in response to a prompt.",
        "Clinical AI: AI used to support a clinical decision (e.g., risk prediction, differential suggestion, image interpretation).",
        "AI tool register: A central record of AI tools in use, their purpose, owner, risks, and review status.",
        "Human-in-the-loop: A workflow in which a qualified clinician reviews and is accountable for AI output before action.",
    ])]),

    ("5. Principles", [("bullets", [
        "Patient safety and clinical effectiveness above efficiency or novelty.",
        "Accountability remains with a human — AI output is decision support, never a decision-maker.",
        "Transparency with patients about the use of AI in their care.",
        "Equity and bias actively monitored and mitigated.",
        "Privacy, security, and intellectual property protected in every AI workflow.",
        "Continuous monitoring of AI performance and harm signals.",
    ])]),

    ("6. Selection and Approval of AI Tools", [("bullets", [
        "An AI tool is approved only after documented assessment of its intended use, evidence base, regulatory status (e.g., TGA classification), privacy and security impact, and integration risks.",
        "Clinical AI tools require evidence of clinical validation relevant to the Australian primary-care context and the practice's patient population.",
        "Each approved tool is added to the AI tool register with a named owner, purpose, risk rating, and review date.",
        "Tools not on the register must not be used in patient care or with patient data.",
    ])]),

    ("7. Use of AI in Clinical Care", [("bullets", [
        "AI output is treated as decision support and is reviewed and verified by a qualified clinician before action (human-in-the-loop).",
        "The clinician remains accountable for the clinical decision and the record entry.",
        "Clinicians must not paste patient-identifiable information into consumer/generic AI tools that are not approved and contracted for that purpose.",
        "Where AI is used for documentation (e.g., ambient scribing), the clinician reviews, edits, and signs off the entry; AI authorship of the note is disclosed where required.",
    ])]),

    ("8. Patient Transparency and Consent", [("bullets", [
        "Patients are informed when AI is materially used in their care or in producing their clinical record.",
        "Where AI use is novel, sensitive, or affects a significant decision, specific informed consent is obtained and recorded.",
        "Patients may decline AI-assisted care and be offered a non-AI alternative where feasible.",
    ])]),

    ("9. Privacy, Security, and Data Governance", [("bullets", [
        "Patient data is processed only in AI tools that are approved, contracted, and compliant with the Australian Privacy Principles and the practice's Privacy and IT Security policies.",
        "Data sharing with AI vendors is minimised, de-identified where possible, and governed by a data processing agreement.",
        "AI vendors are assessed for data residency, retention, breach notification, and reuse for model training (which is prohibited for patient data without explicit authorisation).",
    ])]),

    ("10. Bias, Equity, and Quality Monitoring", [("bullets", [
        "Each clinical AI tool is monitored for performance, drift, and bias relevant to the practice's patient population, including Aboriginal and Torres Strait Islander patients, culturally and linguistically diverse patients, and patients with disability.",
        "Adverse events, errors, or concerning AI output are reported via the practice's incident reporting system and reviewed by the AI Governance Lead.",
        "Monitoring outcomes feed into continuous quality improvement (criterion F11.B; see also the Continuous quality improvement standard).",
    ])]),

    ("11. Roles and Responsibilities", [("p", "<b>AI Governance Lead (Practice Principal or delegate):</b>"), ("bullets", [
        "Maintains the AI tool register.",
        "Approves AI tools and reviews monitoring outcomes.",
    ]), ("p", "<b>Clinicians:</b>"), ("bullets", [
        "Use only approved AI tools.",
        "Verify AI output and remain accountable for clinical decisions.",
        "Report AI-related incidents promptly.",
    ]), ("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Coordinates vendor due diligence, data processing agreements, and staff training.",
    ])]),

    ("12. Education and Training", [("bullets", [
        "Staff receive training before using any approved AI tool, covering its intended use, limitations, verification requirements, and incident reporting.",
        "Annual refresher training covers new tools, lessons learned, and emerging risks.",
    ])]),

    ("13. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly review of the AI tool register and monitoring data.",
        "Annual review of AI-related incidents and near misses.",
        "Annual review of this policy, or sooner if regulatory or vendor changes occur.",
    ])]),

    ("14. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "An AI tool register (tool, version, purpose, owner, risk rating, approval date, review date).",
        "Records of approval assessments, including evidence base and privacy/security reviews.",
        "Data processing agreements with AI vendors.",
        "Patient consent records where AI-specific consent was obtained.",
        "Records of AI-related incidents and outcomes.",
        "Staff AI training records.",
    ])]),

    ("15. References", [("bullets", [
        RACGP_6TH_REF,
        "Therapeutic Goods Administration. Regulatory framework for AI-based medical devices. Available at: https://www.tga.gov.au",
        "Office of the Australian Information Commissioner. Australian Privacy Principles. Available at: https://www.oaic.gov.au",
        "Australian Government. Voluntary AI Safety Standard. Available at: https://www.industry.gov.au",
        "World Health Organization. Ethics and governance of artificial intelligence for health. Available at: https://www.who.int",
    ])]),
]
