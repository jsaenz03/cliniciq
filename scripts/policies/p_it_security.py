"""IT Security Policies and Procedures — RACGP 6th edition (published August 2026)."""

from renderer import RACGP_6TH_REF

TITLE = "IT Security Policies and Procedures"
FILENAME = "IT_Security_Policies_and_Procedures"
OWNER = "IT Security Officer / Practice Manager"

SECTIONS = [
    ("1. Policy Title", [("p", "IT Security Policies and Procedures")]),

    ("2. Purpose", [(
        "p",
        "This policy establishes the controls [Practice Name] uses to protect clinical "
        "information systems, patient data, and connected devices from unauthorised "
        "access, misuse, and cyber threats. It aligns with criterion F8 – Information security of the RACGP Standards for "
        "general practices (6th edition), which significantly strengthens digital health "
        "and cybersecurity expectations."
    )]),

    ("3. Scope", [(
        "p",
        "This policy applies to all staff, contractors, and third parties who use, manage, "
        "or support the practice's information technology and digital health systems."
    )]),

    ("4. Definitions", [("bullets", [
        "Information system: Any system used to create, store, transmit, or process information, including the clinical information system (CIS), practice management software, email, and connected devices.",
        "Cybersecurity incident: An event that compromises, or threatens to compromise, the confidentiality, integrity, or availability of information or systems.",
        "Multi-factor authentication (MFA): Authentication using two or more independent factors.",
        "Endpoint: Any device that connects to the practice network (workstation, laptop, tablet, phone, medical device).",
    ])]),

    ("5. Principles", [("bullets", [
        "Patient information is protected by layered, defence-in-depth controls.",
        "Access is granted on a least-privilege, role-based basis.",
        "Digital health records are the source of truth; paper-only clinical records are not acceptable under criterion CG1 of the 6th edition.",
        "Cybersecurity risks are actively managed alongside clinical and operational risk.",
        "Business continuity and disaster recovery are tested regularly.",
    ])]),

    ("6. Access Control", [("bullets", [
        "Each user has a unique account with a strong passphrase; sharing of credentials is prohibited.",
        "Multi-factor authentication (MFA) is enabled for all systems that support it, including remote access, email, and the clinical information system.",
        "Role-based access ensures staff see only the information they need.",
        "Administrator accounts are separate from routine use accounts.",
        "Access is reviewed when staff change roles and revoked promptly on termination.",
    ])]),

    ("7. Endpoint and Network Security", [("bullets", [
        "All endpoints run current, supported operating systems with automatic security updates.",
        "Endpoint protection (antivirus/EDR) is installed and active on all devices.",
        "Screen lock engages automatically after a short period of inactivity.",
        "Wi-Fi networks use WPA2/WPA3 encryption; a guest network separates visitor devices from clinical systems.",
        "Firewalls are enabled and configured to deny inbound traffic by default.",
    ])]),

    ("8. Data Protection", [("bullets", [
        "Patient data is encrypted at rest where supported by the clinical information system.",
        "Backups are encrypted, automated, and stored securely offsite or in the cloud; backups are tested for restorability at least quarterly.",
        "Removable media is encrypted and used only where authorised.",
        "Mobile devices accessing clinical data are managed by an MDM solution enabling remote wipe.",
    ])]),

    ("9. Email, Web, and Telehealth", [("bullets", [
        "Email uses a business-grade service with anti-phishing, anti-malware, and SPF/DKIM/DMARC configured.",
        "Staff are trained to recognise phishing and to report suspicious messages.",
        "Telehealth platforms used are accredited and end-to-end encrypted.",
        "Cloud services are assessed for compliance with the Australian Privacy Principles and the Australian Government Information Security Manual (ISM) / Essential Eight as relevant.",
    ])]),

    ("10. Cybersecurity Incident Response", [("bullets", [
        "Suspected incidents (phishing, ransomware, unauthorised access) are reported immediately to the IT Security Officer.",
        "Incidents are triaged, contained, and investigated; affected systems may be isolated.",
        "Privacy impacts are assessed in parallel; the Privacy Officer engages the OAIC Notifiable Data Breaches process where required.",
        "A post-incident review identifies root causes and corrective actions.",
    ])]),

    ("11. Business Continuity and Disaster Recovery", [("bullets", [
        "A business continuity plan covers loss of systems, premises, key personnel, and suppliers.",
        "A disaster recovery plan defines recovery time and recovery point objectives and is tested at least annually.",
        "Critical clinical workflows have documented manual fallback procedures.",
    ])]),

    ("12. Roles and Responsibilities", [("p", "<b>IT Security Officer (Practice Manager or IT provider):</b>"), ("bullets", [
        "Maintains this policy and the IT asset register.",
        "Coordinates patching, backups, MDR, and incident response.",
    ]), ("p", "<b>All staff:</b>"), ("bullets", [
        "Follow access, email, and endpoint security requirements.",
        "Report suspicious activity or devices immediately.",
    ])]),

    ("13. Monitoring, Audit, and Review", [("bullets", [
        "Quarterly review of access logs, patch status, and backup restorability tests.",
        "Annual review of this policy, the business continuity plan, and the disaster recovery plan.",
        "Annual cybersecurity awareness training for all staff.",
    ])]),

    ("14. Documentation and Record Keeping", [(
        "p", "The practice maintains:"
    ), ("bullets", [
        "An IT asset register.",
        "User access lists and change records.",
        "Backup and recovery test reports.",
        "Cybersecurity incident reports and outcomes.",
        "Staff IT security training records.",
    ])]),

    ("15. References", [("bullets", [
        RACGP_6TH_REF,
        "Australian Cyber Security Centre. Essential Eight Maturity Model. Available at: https://www.cyber.gov.au",
        "Australian Government Information Security Manual (ISM). Available at: https://www.cyber.gov.au",
        "Office of the Australian Information Commissioner. Notifiable Data Breaches scheme. Available at: https://www.oaic.gov.au",
    ])]),
]
