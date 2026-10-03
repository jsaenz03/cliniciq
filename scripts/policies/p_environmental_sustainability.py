"""Environmental Sustainability Policy – RACGP 6th edition (criterion F3)."""

from renderer import RACGP_6TH_REF

TITLE = "Environmental Sustainability Policy"
FILENAME = "Environmental_Sustainability_Policy"
OWNER = "Sustainability Lead / Practice Manager"

VERSION = "2.2"
EFFECTIVE_DATE = "3 October 2026"
NEXT_REVIEW = "3 October 2027"

SECTIONS = [
    ("1. Policy Title", [("p", "Environmental Sustainability Policy")]),

    ("2. Purpose", [(
        "p",
        "This policy describes how [Practice Name] reduces its environmental impact while "
        "maintaining safe, high-quality care. It implements criterion F3 – "
        "Environmental sustainability and responsibility of the RACGP Standards for general "
        "practices (6th edition), which makes climate resilience, minimising environmental "
        "impact, and a designated sustainability responsibility part of practice governance."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all practice operations, including energy and water use, "
        "waste and procurement, travel and transport, and the design of quality "
        "improvement activities."
    )]),

    ("4. Definitions", [("bullets", [
        "Environmental sustainability: Meeting present needs without compromising the ability of future generations to meet theirs.",
        "Carbon footprint: The total greenhouse gas emissions caused directly and indirectly by the practice.",
        "Climate resilience: The ability of the practice to anticipate, absorb, and recover from climate-related disruptions to its operations.",
        "Sustainability lead: The designated person responsible for coordinating sustainability activities and monitoring.",
    ])]),

    ("5. Principles", [("bullets", [
        "Reduce environmental harm without compromising patient safety or quality of care.",
        "Take a planned, measurable approach to reducing energy, water, and waste.",
        "Favour lower-impact procurement and travel options where clinically appropriate.",
        "Integrate sustainability with continuous quality improvement and clinical risk management.",
        "Engage staff and patients in sustainability efforts.",
    ])]),

    ("6. Governance and the Sustainability Lead", [("bullets", [
        "A Sustainability Lead is designated and named in the practice's role register.",
        "The Sustainability Lead coordinates a sustainability plan, monitors key metrics, and reports to the practice team at least annually.",
        "Sustainability metrics are reviewed alongside other quality and safety metrics.",
    ])]),

    ("7. Climate Risk and Resilience (Criterion F3.A)", [(
        "p",
        "The practice identifies climate-related risks to its operations and implements "
        "strategies to improve its climate resilience:"
    ), ("bullets", [
        "Climate-related risks relevant to the practice's location (e.g., heatwaves, storms, floods, bushfire smoke, and extended power outages) are identified and reviewed as part of the practice risk register.",
        "Resilience strategies are documented and tested, including backup power for the vaccine refrigerator and information systems, and an emergency vaccine relocation plan (see Cold Chain Management Policy and Emergency Response Plan and Equipment Policy).",
        "Service continuity options (e.g., telehealth and manual fallback procedures) are maintained so care can continue during climate-related disruptions.",
        "Climate risks are considered in planning decisions about premises, equipment, and suppliers.",
    ])]),

    ("8. Energy", [("bullets", [
        "Track electricity use and identify opportunities to reduce consumption (e.g., LED lighting, efficient heating/cooling, switching off non-essential equipment out of hours).",
        "Where feasible, source electricity from accredited GreenPower or on-site renewable generation.",
        "Consider energy efficiency when purchasing equipment.",
    ])]),

    ("9. Water", [("bullets", [
        "Use water efficiently in clinical and non-clinical areas; promptly repair leaks.",
        "Consider water-efficient fittings when refurbishing.",
    ])]),

    ("10. Waste", [("bullets", [
        "Segregate waste correctly (general, recycling, clinical, sharps, pharmaceutical) to minimise clinical waste and maximise recycling.",
        "Reduce single-use items where it is safe to do so and consistent with infection control.",
        "Recycle paper, cardboard, plastics, and e-waste through approved schemes.",
        "Manage pharmaceutical waste through authorised disposal (see Medication Management policy).",
    ])]),

    ("11. Procurement", [("bullets", [
        "Consider environmental credentials (energy efficiency, recyclability, take-back schemes, supplier sustainability commitments) when purchasing goods and services.",
        "Prefer suppliers with credible environmental standards where cost and quality are equivalent.",
    ])]),

    ("12. Travel and Transport", [("bullets", [
        "Support telehealth as a clinically appropriate alternative to in-person visits where it reduces travel without compromising care.",
        "Encourage active and public transport for staff and patient travel where feasible.",
    ])]),

    ("13. Quality Improvement", [("bullets", [
        "Complete at least one documented sustainability quality improvement activity each year (aligned with the Continuous quality improvement standard, criterion CQI1).",
        "Use the PDSA (Plan-Do-Study-Act) method or equivalent to plan, implement, and evaluate activities.",
    ])]),

    ("14. Roles and Responsibilities", [("p", "<b>Sustainability Lead:</b>"), ("bullets", [
        "Coordinates the sustainability plan and metrics.",
        "Reports progress to the team and incorporates sustainability into QI.",
    ]), ("p", "<b>Practice Manager:</b>"), ("bullets", [
        "Implements procurement, waste, and energy initiatives.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Follow waste segregation, energy-saving, and sustainability practices.",
        "Suggest improvements.",
    ])]),

    ("15. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly review of sustainability metrics (electricity, waste streams, telehealth uptake).",
        "Progress toward sustainability goals and compliance with emissions-reduction strategies is assessed and reported to the practice's leadership at least annually (criterion CQI1.B).",
        "Annual review of the sustainability plan and this policy.",
    ])]),

    ("16. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "A sustainability plan with targets and metrics.",
        "The climate risk assessment and resilience strategies.",
        "Records of sustainability QI activities and outcomes.",
        "Waste and recycling contractor records.",
        "Energy and water consumption records where available.",
    ])]),

    ("17. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Government. Climate Active. Available at: https://www.climateactive.org.au",
        "NSW (or relevant state) Environment Protection Authority. Waste and recycling guidance.",
        "RACGP. Sustainability resources. Available at: https://www.racgp.org.au",
    ])]),
]
