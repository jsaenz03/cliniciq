# AHPRA/RACGP/ACL Compliance Remediation Plan
Generated from audit: 105 confirmed/borderline findings (36 violation, 69 borderline)


## [CRITICAL] violation — index.html
- **dimension**: testimonials
- **quote**: <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">What Our Clients Say</h2>
                <p class="section-subtitle">Trusted by healthcare professionals in Australia</p>
            </div>
- **why**: I attempted to refute this on the basis that ClinicIQ is B2B and does not provide direct patient care. However, the task framing is that a registered health practitioner operates the business, so AHPRA advertising rules apply. Section 133(1)(d) of the National Law prohibits testimonials that are published or disseminated in advertising a regulated health service or a business that provides a regul
- **fix**: Remove the entire Testimonials section. Replace with a non-endorsement section such as 'How Clinics Use ClinicIQ' describing generic, anonymised use-cases (e.g. 'Practices use Care Plan Automation to draft structured documentation for clinician review') with no quoted review, star rating, named author, or clinic attribution.

## [CRITICAL] violation — index.html
- **dimension**: testimonials
- **quote**: "A must-have for GPs! ClinicIQ Solution streamlines my workflow by summarising patient needs and key preventative actions. It helps me provide high-quality care without sacrificing time. Highly recommended!"
- **why**: Direct client endorsement with a star rating, attributed to 'Dr MW, Principal GP, TMW', published in the site's own advertising. Falls squarely within the s.133(1)(d) prohibition. The phrase 'helps me provide high-quality care' additionally engages s.133(1)(b) (unreasonable expectation of beneficial treatment/outcome). Cannot refute.
- **fix**: Delete the card. If a use-case is needed, restate factually with no endorsement: 'Care Plan Automation drafts structured care plan summaries from Best Practice data for clinician review.' No quote, no author, no 'highly recommended', no quality-of-care claim.

## [CRITICAL] violation — index.html
- **dimension**: testimonials
- **quote**: "The care planning app is great! Helps heaps, would be happy to subscribe!"
- **why**: Star-rated, attributed testimonial ('Dr NJ, GP, TMW') published in the practice's advertising. Prohibited under s.133(1)(d). The 'would be happy to subscribe' framing is also inducement-adjacent. Cannot refute.
- **fix**: Delete the card. Replace with a neutral feature description if needed; no quoted praise, no author.

## [CRITICAL] violation — index.html
- **dimension**: testimonials
- **quote**: "John is easy to deal and work with, highly recommend!"
- **why**: Star-rated testimonial attributed to 'BC RN, Practice Nurse, SCSM' endorsing the founder/business in the site's own advertising. Prohibited testimonial under s.133(1)(d). Cannot refute.
- **fix**: Delete the card. Do not republish client recommendations of the founder or the service.

## [CRITICAL] violation — index.html
- **dimension**: testimonials
- **quote**: "RACGP compliance gives us complete peace of mind."
- **why**: Prohibited testimonial (s.133(1)(d)) attributed to 'Dr SP, Practice Principal, CFMC'. It also reinforces a misleading representation: it implies ClinicIQ tools confer 'RACGP compliance' on a client, when RACGP accreditation is granted by independent surveyors (AGPAL/QIP). That compounds the breach under ACL ss.18/29 and RACGP marketing guidance, and creates an unreasonable expectation of a complia
- **fix**: Delete the card entirely. Do not state or imply anywhere on the site that ClinicIQ tools confer 'RACGP compliance' or 'peace of mind' about accreditation.

## [HIGH] violation — automations.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <li>RACGP compliant</li>
- **why**: Verified at line 531 as a standalone feature bullet. 'RACGP compliant' presented as a product attribute implies the product carries or satisfies RACGP accreditation/endorsement. RACGP accreditation of a practice is granted by independent surveyors against the Standards for General Practices (5th ed.); software cannot self-declare a practice or itself 'RACGP compliant', and there is no indication R
- **fix**: <li>Aligned with RACGP care-plan guidance</li>

## [HIGH] violation — automations.html
- **dimension**: accreditation-endorsement-implication
- **quote**: MedPlan AI cuts documentation time and produces RACGP-compliant care plans for diabetes, asthma, mental health and chronic disease management.
- **why**: Verified verbatim at line 606, and reinforced by 'RACGP-compliant templates' at line 608. Asserting the tool 'produces RACGP-compliant care plans' implies RACGP endorsement/certification of the output and represents that the plans meet a clinical-quality standard set by the RACGP. RACGP does not certify individual care plans generated by third-party software; a clinician remains responsible for cl
- **fix**: MedPlan AI is designed to reduce documentation time and generate care-plan drafts aligned with current RACGP guidance for diabetes, asthma, mental health and chronic disease management. A qualified clinician must review and approve each plan before use.

## [HIGH] violation — blog/ai-healthcare-guide-gp-practices.html
- **dimension**: clinical-safety-claim
- **quote**: Is AI safe to use in Australian GP practices? ... Yes, AI tools are safe when used as decision support rather than replacement for clinical judgment. The RACGP and Australian Digital Health Agency provide guidelines for AI implementation.
- **why**: The leading word 'Yes, AI tools are safe' is an unqualified, categorical clinical-safety assertion presented as fact, with no evidence and no qualification before the conditional clause. Even read sympathetically, the immediate 'safe' is the load-bearing answer to a safety question, coming from a registered health practitioner's business. The reference to RACGP and ADHA 'guidelines for AI implemen
- **fix**: Replace the answer (both JSON-LD FAQPage acceptedAnswer text at lines 124-126 and the visible <details> block at line 474) with: "AI tools can be used safely in Australian GP practices when implemented under appropriate clinical governance, used as decision support rather than a replacement for clinical judgement, and assessed for the specific task and patient context. Practices should follow current RACGP and Australian Digital Health Agency guidance, conduct their own clinical risk assessment, and confirm any tool meets relevant Australian standards before adoption."

## [HIGH] violation — blog/gp-clinic-automation-2026.html
- **dimension**: unsubstantiated-efficacy
- **quote**: we'll explore five proven automation strategies that are helping Australian GP clinics save time, reduce errors, and deliver better patient care.
- **why**: This sentence bundles three claims: 'proven' (substantiation), 'reduce errors' (a clinical-safety claim about patient care), and 'deliver better patient care' (a quality-of-care outcome claim). 'Reduce errors' in a clinical/general-practice context is a safety representation and is the load-bearing problem: a regulator would more-likely-than-not treat an unsupported clinical error-reduction claim 
- **fix**: we'll explore five automation strategies that Australian GP clinics are using to streamline administrative workflows, with the aim of freeing up staff time and reducing manual administrative rework.

## [HIGH] violation — blog/understanding-swpe-guide.html
- **dimension**: misleading-or-deceptive
- **quote**: Understanding your SWPE is crucial because it directly impacts:
- Practice Incentive Program (PIP) payments
- After-hours incentive payments
- Rural incentive payments
- Quality Improvement Program funding
- **why**: The article is dated 15 January 2025 (lines 102, 189). As at that date the listed architecture is materially out of date: the PIP Quality Incentive (PIP QI) was paid for the final time for the November 2023 quarter and is referenced here as 'Quality Improvement Program funding'; the After Hours, Procedural, Rural Loading and Teaching PIP components were rolled into the Workforce Incentive Scheme (
- **fix**: Historically, SWPE influenced a range of Practice Incentives Program (PIP) payments. The incentives landscape has changed materially: the PIP Quality Incentive (PIP QI) concluded after the November 2023 quarter, and several former PIP components (after-hours, rural loading, procedural, teaching) were replaced by the Workforce Incentive Scheme (WIS) from 1 January 2024, with new per-patient incentives tied to MyMedicare registration. Check current Services Australia and Department of Health and Aged Care guidance for how SWPE applies to your practice today.

## [HIGH] violation — chatbot.js
- **dimension**: misleading-or-deceptive
- **quote**: or call us on +61 605 372 757. Tell us a bit about your practice
- **why**: Confirmed verbatim at chatbot.js line 1170 in the 'consultation'/'meeting'/'book'/'appointment' canned reply. The number +61 605 372 757 is genuinely malformed: after the +61 country code the remaining 9 digits (605372757) begin with '6', which is neither a valid Australian mobile prefix (must start with 4) nor a valid geographic area code (NSW landlines are +61 2 xxxx xxxx). It is not a dialable 
- **fix**: Replace with a verified, correctly formatted Australian number everywhere it appears (chatbot.js, index.html, contact.html, privacy-policy.html, terms-of-service.html). E.g. for a NSW landline: 'or call us on (02) 4xxx xxxx within Australia, or +61 2 4xxx xxxx internationally. Tell us a bit about your practice and what you'd like to improve.' Verify the chosen number actually rings the business before publication.

## [HIGH] violation — chatbot.js
- **dimension**: misleading-or-deceptive
- **quote**: or call +61 605 372 757. We're based in Wollongong, NSW.
- **why**: Confirmed verbatim at chatbot.js line 1175 in the 'contact'/'phone'/'email'/'address' canned reply — the very reply triggered when a user explicitly asks for the phone number. The user is handed a number that cannot connect (same objective malformation as finding 1: invalid '6' prefix after +61). Giving a non-dialable number in direct response to 'what is your phone number?' is a clear misleading 
- **fix**: Use the same verified, correctly formatted number as finding 1, consistently across all files. E.g.: 'Email is the quickest way to reach us: admin@cliniciq.com.au, or call (02) 4xxx xxxx (+61 2 4xxx xxxx internationally). We're based in Wollongong, NSW. The contact form below works too.'

## [HIGH] violation — downloads.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Free healthcare templates, accreditation checklists & clinic resources. Download RACGP-compliant tools designed by healthcare professionals.
- **why**: Confirmed verbatim at lines 15, 44 and 110. 'RACGP-compliant tools' is a factual representation appearing three times in machine- and user-facing descriptions. RACGP accreditation of a general practice is granted by independent surveyors (AGPAL/QIP) against the RACGP Standards; software/templates cannot be 'RACGP-compliant' in the sense of conferring or carrying that status. The phrase is reasonab
- **fix**: Free healthcare templates, accreditation preparation checklists & clinic resources. Download tools aligned to the RACGP Standards for general practices, designed by healthcare professionals.

## [HIGH] violation — downloads.html
- **dimension**: outcome-guarantee
- **quote**: Ensures regular maintenance and calibration of clinical equipment to guarantee accuracy and safety.
- **why**: Confirmed verbatim at line 475. 'Guarantee accuracy and safety' attached to clinical equipment is an outcome-guarantee representation that no policy template can deliver — actual accuracy and safety depend on physical maintenance performance and clinical context. This is precisely the kind of beneficial-outcome guarantee AHPRA s.133(b) (unreasonable/unrealistic expectations) and ACL s.29 (false or
- **fix**: Supports regular maintenance and calibration of clinical equipment to help promote accuracy and safety.

## [HIGH] violation — downloads/checklists.html
- **dimension**: misleading-or-deceptive
- **quote**: Covers all 5th edition RACGP standards.
- **why**: 'Covers all 5th edition RACGP standards' is an absolute completeness claim about a single free PDF checklist. The RACGP 5th edition Standards comprise many modules, criteria and mandatory indicators across the full scope of general practice; asserting a single free template 'covers all' of them is, on its face, unlikely to be accurate and could mislead a clinic into treating the checklist as a suf
- **fix**: Structured around the 5th edition RACGP Standards, covering common accreditation focus areas. Not exhaustive — confirm scope against the current RACGP Standards and your surveyor's requirements.

## [HIGH] violation — downloads/checklists.html
- **dimension**: outcome-guarantee
- **quote**: All checklists follow RACGP Standards for General Practices, ensuring you meet accreditation requirements.
- **why**: This is the clearest finding in the set. 'Ensuring you meet accreditation requirements' is an outcome guarantee. Accreditation against the RACGP Standards is determined by independent surveyors (AGPAL/QIP) based on a clinic's actual practice, evidence and an on-site assessment — no vendor template can ensure a clinic will meet or pass. This creates an unrealistic expectation of a guaranteed benefi
- **fix**: All checklists are structured around the RACGP Standards for General Practices (5th ed.) to help you prepare for accreditation. Using these checklists does not guarantee accreditation, which is assessed by independent surveyors.

## [HIGH] violation — downloads/templates.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <title>Free Clinic Templates & Policies | ClinicIQ Solutions</title>
    <meta name="description" content="Download free clinic policy templates for GP practices. RACGP-compliant policies covering infection control, privacy, medications, and more.">
- **why**: Stating 'RACGP-compliant' as a bare factual descriptor in the public title/meta/OG/Twitter surfaces asserts the documents meet RACGP requirements. The RACGP publishes the Standards but does not certify vendor templates, and accreditation status is conferred independently by surveyors (AGPAL/QIP). Without independent certification the vendor has no proper basis for the categorical 'compliant' claim
- **fix**: <title>Free Clinic Policy Templates | ClinicIQ Solutions</title>
    <meta name="description" content="Download free policy templates for GP practices, written to align with the RACGP Standards for General Practices (5th ed.). Customise them for your practice and confirm they meet your accreditation surveyor's requirements.">

## [HIGH] violation — downloads/templates.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <p class="article-excerpt">Free, RACGP-compliant policy templates for GP clinics. Ready to customise for your practice.</p>
- **why**: Same 'RACGP-compliant' categorical claim on the public-facing header excerpt. The vendor cannot establish that its templates are RACGP-compliant without independent certification, and the phrase implies endorsement/accreditation status it cannot confer. Misleading under ACL ss.18/29 and contrary to RACGP marketing guidance.
- **fix**: “Free policy templates for GP clinics, written to align with the RACGP Standards for General Practices (5th ed.). Ready to customise for your practice.” Add a short nearby note: “Templates are a starting point; accreditation is assessed by independent surveyors.”

## [HIGH] violation — downloads/templates.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <h3 class="service-title">RACGP Compliant</h3>
                    <p class="service-description">All templates align with RACGP Standards for General Practices 5th edition requirements.</p>
- **why**: The bold heading 'RACGP Compliant' is the strongest assertion — a categorical benefit stated as fact that trades directly on the RACGP's name. The softer body text ('align with') does not cure the headline. The vendor has no independent certification to substantiate 'compliant' and the claim could mislead a practice into believing accreditation is assured. Violation of ACL ss.18/29 and RACGP guida
- **fix**: Rename the heading to “Built Around the RACGP Standards” and revise the description to: “Templates are written to align with the RACGP Standards for General Practices (5th ed.). They are a starting point — review and adapt them with your team and your accreditor before use.”

## [HIGH] violation — index.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <span class="trust-badge">RACGP Compliant</span>
- **why**: Presented as a factual trust badge in the hero. RACGP accreditation/compliance is not assessed or conferred by software; it is granted by independent surveyors (AGPAL/QIP) against the RACGP Standards for General Practices (5th ed.). Displaying 'RACGP Compliant' as a badge implies the product has been assessed or endorsed by RACGP and guarantees a compliance outcome. This is a misleading or decepti
- **fix**: <span class="trust-badge">Built for Australian General Practice</span>. If a documented mapping to specific RACGP Standards criteria exists, the more accurate alternative is <span class="trust-badge">Aligned with RACGP Standards</span>. Avoid 'Compliant'/'Compliance' wording that implies certification.

## [HIGH] violation — index.html
- **dimension**: accreditation-endorsement-implication
- **quote**: "Yes. ClinicIQ tools are designed with RACGP compliance in mind, including documentation, privacy (aligned with the Australian Privacy Principles) and clinical governance. Our care plan templates are built for Australian general practice and updated as standards change."
- **why**: The FAQ question is 'Are ClinicIQ automation tools RACGP compliant?' and the answer opens with an unqualified 'Yes.' That is a direct affirmative representation that the tools are RACGP compliant. Software cannot make a practice compliant; accreditation is determined independently by an accredited surveyor. The 'Yes.' is a false or misleading representation (ACL ss.18, 29, and s.151 unsubstantiate
- **fix**: "ClinicIQ tools are designed to align with the RACGP Standards for General Practices (5th ed.) — for example, supporting documentation and Australian Privacy Principles-aligned processes. They do not confer or guarantee RACGP accreditation, which is determined independently by an accredited surveyor such as AGPAL or QIP."

## [HIGH] violation — index.html
- **dimension**: outcome-guarantee
- **quote**: <p class="ps-impact"><strong>Impact:</strong> An official confirmed that changes are coming to PIPQI as current program is vulnerable to free-riders. Good scores will translate directly into practice revenue.</p>
- **why**: 'Good scores will translate directly into practice revenue' is an absolute, guaranteed financial-outcome statement tied to a Commonwealth clinical-quality incentive program (PIPQI), presented as fact. There is also an unsubstantiated appeal to unnamed authority ('An official confirmed ...'). This creates an unreasonable expectation of beneficial financial outcome (s.133(1)(b)) and is a misleading 
- **fix**: "PIPQI incentives are tied to practice data, and program changes have been publicly discussed. We can help you focus on the patients most likely to affect your scores; any revenue impact depends on the program rules and your practice data."

## [HIGH] violation — index.html
- **dimension**: outcome-guarantee
- **quote**: <p class="ps-impact"><strong>Impact:</strong> Eliminate "did I do that?" mental overhead. No more missed tasks = no more missed billings, no more compliance gaps.</p>
- **why**: 'No more missed tasks = no more missed billings, no more compliance gaps' is an absolute guarantee of administrative, billing and compliance outcomes, presented as a fact about the product's effect. Software cannot guarantee zero compliance gaps; compliance depends on many factors outside task tracking. This is an outcome guarantee that creates an unreasonable expectation (s.133(1)(b)) and is a mi
- **fix**: "Reduce the chance of tasks being missed by making recurring and ad-hoc tasks visible to the whole team. This supports timely billing and good documentation practices; it does not guarantee compliance, which depends on many factors."

## [HIGH] violation — index.html
- **dimension**: outcome-guarantee
- **quote**: <p class="ps-impact"><strong>Impact:</strong> Never waste a vaccine again. Predict reorders before stockouts kill appointment flow. Protect patients, protect revenue.</p>
- **why**: 'Never waste a vaccine again' is an absolute outcome guarantee ('never') about a clinical good (vaccines), and 'Protect patients' is a patient-safety claim presented as a guaranteed effect of the product. Vaccines are therapeutic goods, so therapeutic/clinical-safety claims must be accurate and substantiated. Expiry-alert software does not itself prevent all wastage (it cannot control cold-chain, 
- **fix**: "Reduce vaccine wastage with expiry alerts and reorder reminders. Supports safer stock handling and smoother appointment flow; actual results depend on usage and practice workflow."

## [HIGH] violation — index.html
- **dimension**: unsubstantiated-efficacy
- **quote**: <strong>Care Plan Automation</strong>
                            <p>Auto-populated templates using Best Practice data. Generate comprehensive, structured care plans in 30 seconds -ready to copy-paste. Includes preventative care for opportunistic visits.</p>
                            <p class="ps-impact"><strong>Impact:</strong> Transform 30-minute workflows into 30-second deliveries. Capture on-the-spot care plan opportunities for immediate revenue.</p>
- **why**: I tried to read '30 seconds' as illustrative marketing, but the claims are specific, quantified, and stated as fact: 'Generate ... care plans in 30 seconds', 'Transform 30-minute workflows into 30-second deliveries', 'immediate revenue'. These are quantified efficacy/financial-outcome representations about a tool that produces clinical care-plan documentation. No basis (e.g. named internal testing
- **fix**: "Care Plan Automation: drafts structured care plans from your Best Practice data, ready for clinician review. In our internal testing, drafts have been produced in around 30 seconds; actual time depends on your data and templates. Identify care-plan opportunities during visits so they can be billed appropriately, subject to MBS requirements."

## [HIGH] violation — llms-full.txt
- **dimension**: accreditation-endorsement-implication
- **quote**: MedPlan AI — AI-assisted, RACGP-compliant care-plan generation.
- **why**: This is the strongest finding and survives sceptical adjudication. Unlike the outcome statistics, this descriptor sits OUTSIDE the 'Reported outcomes (as stated by ClinicIQ)' section and its attribution framing (line 89 disclaimer covers 'outcome statistics' specifically, not product descriptors). The product is described in flat, factual language as 'RACGP-compliant,' which states as a fact that 
- **fix**: "MedPlan AI — AI-assisted care-plan generation, designed to align with RACGP guidance and current documentation requirements." Make clear the tool is designed to support (not guarantee or constitute) RACGP Standards compliance, and that accreditation is independently assessed.

## [HIGH] violation — websites.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <meta property="og:description" content="Professional healthcare website design for GP clinics & medical practices. Fast, accessible, RACGP-compliant websites.">
- **why**: I could not refute this one. 'RACGP-compliant websites' as a declarative product attribute implies the websites possess or confer a defined regulatory status. RACGP accreditation against the Standards for General Practices is granted by independent surveyors (AGPAL/QPA), not by software, and the RACGP does not certify websites. A reasonable GP-practice purchaser could read this as the product deli
- **fix**: Replace with: 'Fast, accessible websites designed with awareness of the RACGP Standards for general practices.'

## [MEDIUM] borderline — about.html
- **dimension**: accreditation-endorsement-implication
- **quote**: RACGP Compliant ... All solutions are designed with RACGP standards in mind, ensuring your practice maintains compliance while benefiting from automation.
- **why**: The heading 'RACGP Compliant' is the load-bearing concern. As a standalone headline it is reasonably read as an assertion that the software itself is RACGP-certified/compliant, which it cannot be: RACGP does not certify or endorse commercial tools, and accreditation is granted by independent surveyors (AGPAL/QIP). That edges toward an unsubstantiated representation (ACL ss.18/29) and a possible en
- **fix**: Heading: 'Aligned with RACGP standards'. Body: 'All solutions are designed with the RACGP Standards for General Practices in mind, to support your practice's own compliance processes. Software cannot grant or guarantee RACGP accreditation, which is determined by independent surveyors.'

## [MEDIUM] borderline — automations.html
- **dimension**: clinical-safety-claim
- **quote**: AI dermatology imaging and analysis for clinics. Organise photos and document skin findings of your patients.
- **why**: Verified in the DermCam schema description (line 306) with feature list including 'AI analysis' (line 310); card copy (line 780) is more restrained ('organise, document, and track skin findings') and both locations carry an explicit prototype/beta disclaimer ('not yet APP compliant' / 'not yet APP compliant for specialist dermatology use'). The disclaimer materially mitigates the risk. However, th
- **fix**: Dermatology photo organisation and documentation tool for clinics. Organise photos and document skin findings of your patients. Note: prototype — not a diagnostic device; clinicians must independently assess all findings.

## [MEDIUM] borderline — automations.html
- **dimension**: misleading-or-deceptive
- **quote**: Medicare Benefits Schedule (MBS) eligibility verification tool. Self-serve check for patients plus feedback and comments channel.
- **why**: Verified in the MBS Eligibility Checker schema description (lines 266-267) and reinforced by alt text 'eligibility verification tool' (line 712). 'Verification' implies authoritative confirmation of Medicare eligibility, but a self-serve web tool cannot authoritatively verify eligibility — that is ultimately determined by Medicare/Services Australia. Presenting it as a 'verification tool' could mi
- **fix**: Medicare Benefits Schedule (MBS) eligibility guidance tool. A self-service estimate for patients to consider before appointments, plus a feedback channel. Eligibility is ultimately determined by Medicare; clinics should confirm via official channels.

## [MEDIUM] violation — automations.html
- **dimension**: outcome-guarantee
- **quote**: ensuring consistent compliance across your practice
- **why**: Verified at line 635. 'Ensuring' is an absolute/guarantee term, and it is paired with 'compliance' — a regulatory-standard outcome. Software cannot guarantee a practice's compliance, which depends on staff behaviour, governance, clinical judgement and external surveyor assessment. A guarantee of a compliance outcome is the kind of absolute representation the ACCC treats as misleading (ACL ss.18/29
- **fix**: helping support consistent compliance across your practice

## [MEDIUM] borderline — automations.html
- **dimension**: outcome-guarantee
- **quote**: Procedure compliance checking
- **why**: Verified at line 815 within Docuwhisper's feature list; surrounding copy (line 812) describes the tool as one that 'helps maintain consistency across all clinic communications and patient records'. The bullet 'Procedure compliance checking' uses 'checking', which implies the AI verifies/assures clinical-procedure compliance — a clinical-governance responsibility that cannot be assured by a documen
- **fix**: Procedure reference assistance

## [MEDIUM] violation — automations.html
- **dimension**: unrealistic-expectation
- **quote**: Create comprehensive care plans in seconds.
- **why**: Verified in the SoftwareApplication schema description (line 186) and echoed in card copy 'Generate comprehensive care plans in seconds' (line 527). Claiming 'comprehensive' care plans for conditions including diabetes, asthma and mental health can be produced 'in seconds' creates an unrealistic expectation of a near-instant, clinically adequate output and could encourage clinics to over-rely on t
- **fix**: Draft care plans quickly with smart templates. Clinician review and customisation are required before use.

## [MEDIUM] borderline — automations.html
- **dimension**: unsubstantiated-efficacy
- **quote**: MedPlan AI cuts documentation time and produces RACGP-compliant care plans for diabetes, asthma, mental health and chronic disease management.
- **why**: Same line 606. 'Cuts documentation time' uses a definite factual verb ('cuts') presenting a measurable productivity saving without disclosed basis, methodology or qualifier. Although general B2B productivity framing is usually acceptable puffery, 'cuts' is a stronger, more definite representation than 'helps reduce' and is bundled with a measurable benefit. Under ACL ss.18/29/151 a representation 
- **fix**: MedPlan AI is designed to help reduce the time clinicians spend drafting care plans, aligned with current RACGP guidance for diabetes, asthma, mental health and chronic disease management. Actual time savings depend on your existing workflow.

## [MEDIUM] borderline — automations.html
- **dimension**: unsubstantiated-efficacy
- **quote**: reducing billing errors and rejected claims
- **why**: Verified at line 722 in a present-tense factual construction ('...reducing billing errors and rejected claims'), reinforced by the feature bullet 'Billing error reduction' (line 724). Unlike the generic CTA puffery, this is a specific, measurable outcome tied to billing/claims accuracy, presented as a happening fact without basis or qualifier. Under ACL ss.18/29/151 a measurable-outcome representa
- **fix**: designed to help reduce billing errors and rejected claims

## [MEDIUM] borderline — blog.html
- **dimension**: unsubstantiated-efficacy
- **quote**: Get a free consultation to discuss how automation can transform your clinic's efficiency and patient care.
- **why**: Unlike the blog excerpts (which describe article topics), this CTA is directly tied to engaging ClinicIQ's sales consultation. "Transform your clinic's efficiency and patient care" is presented as a benefit of working with the vendor. "Transform" is a strong word and pairing it with "patient care" leans toward an unsubstantiated clinical-outcome representation (AHPRA s.133(a)/(b); ACL ss.18/29). "
- **fix**: Get a free consultation to discuss how automation can streamline your clinic's administrative workflows and free up your team's time.

## [MEDIUM] violation — blog/ai-healthcare-guide-gp-practices.html
- **dimension**: accreditation-endorsement-implication
- **quote**: AI care plan generators analyse patient data from your PMS, apply clinical guidelines, and generate RACGP-compliant care plans for conditions like diabetes, asthma, COPD, and mental health.
- **why**: I attempted to read 'RACGP-compliant care plans' as describing outputs that follow RACGP clinical guidelines, but on its plain words it attributes a compliance status (RACGP-compliant) to the tool's output as a guaranteed feature. RACGP Standards compliance is assessed at practice level by independent surveyors; software cannot guarantee it. The very next 'Results' paragraph is carefully hedged ('
- **fix**: AI care plan generators analyse patient data from your PMS and apply published clinical guidelines to produce a draft care plan for conditions like diabetes, asthma, COPD and mental health. The draft is intended to align with RACGP guidance, but the treating GP remains responsible for reviewing and confirming it meets RACGP Standards and individual patient needs before use.

## [MEDIUM] violation — blog/ai-healthcare-guide-gp-practices.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Compliance with RACGP documentation standards
- **why**: As a standalone 'Key capability' bullet, this asserts the tool delivers 'Compliance with RACGP documentation standards' as a feature. Unlike the care-plan sentence there is no surrounding hedge. Documentation-standards compliance under the RACGP Standards is assessed at practice level by independent surveyors; a documentation tool cannot, by itself, deliver or guarantee compliance. Stating it as a
- **fix**: Remove this bullet (the preceding bullets - real-time transcription, structured notes, PMS integration - already describe the capability without a compliance guarantee). If retained, reword to: "Designed to support alignment with RACGP documentation guidance (subject to practice-level review)."

## [MEDIUM] borderline — blog/ai-healthcare-guide-gp-practices.html
- **dimension**: outcome-guarantee
- **quote**: Get expert guidance on implementing AI solutions that save time, reduce burnout, and improve patient care.
- **why**: I considered rejecting this as general B2B marketing puffery. 'Save time' and 'reduce burnout' are defensible operational-efficiency descriptors for admin-automation tools (sufficient basis given the article documents documentation-burden reduction). However 'improve patient care' is a clinical-quality claim presented as a delivered outcome of the software, with no qualification, and it sits adjac
- **fix**: Get expert guidance on evaluating and implementing AI solutions for your practice - including assessing potential time savings and supporting staff workload, with the goal of complementing, not replacing, clinical care.

## [MEDIUM] borderline — blog/ai-healthcare-guide-gp-practices.html
- **dimension**: unsubstantiated-efficacy
- **quote**: it provides valuable decision support that enhances diagnostic accuracy and efficiency
- **why**: I tried to dismiss this as decision-support description, but 'enhances diagnostic accuracy' is a clinical-efficacy representation stated as fact with no cited evidence, in a section that goes on to list named diagnostic products. The lead sentence of the same section already says AI 'doesn't replace clinical judgment', and the closing 'Results' sentence softens it ('can flag things a GP might miss
- **fix**: it provides decision support that may help a GP consider additional diagnostic possibilities; any impact on accuracy or efficiency depends on the specific tool, the clinical context, and independent validation, and it does not replace clinical judgment.

## [MEDIUM] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: accreditation-endorsement-implication
- **quote**: AI-powered tools like <a href="../automations.html">MedPlan AI</a> generate RACGP-compliant care plans from patient data. These systems integrate with your Practice Management System (like Best Practice) to produce evidence-based care plans for diabetes, asthma, mental health, and other chronic conditions.
- **why**: The phrase 'RACGP-compliant care plans' most naturally reads as the tool producing output that meets/confers RACGP standards. RACGP accreditation of a practice is granted by independent surveyors (AGPAL/QIP) against the RACGP Standards, not by software, and the RACGP does not endorse commercial products in this manner. A reader could infer the tool ensures or signals RACGP compliance/accreditation
- **fix**: AI-powered tools like <a href="../automations.html">MedPlan AI</a> draft care plans from patient data, structured to align with common general-practice care-plan templates (e.g. GPMP/TCA style). These systems integrate with your Practice Management System (like Best Practice) to produce draft care plans for diabetes, asthma, mental health and other chronic conditions. All outputs are drafts for the treating GP to review, finalise and authorise. Use of this tool does not, by itself, confer RACGP accreditation or guarantee compliance - practice accreditation is determined by an independent surveyor against the RACGP Standards.

## [MEDIUM] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: clinical-safety-claim
- **quote**: deliver higher quality patient care
- **why**: Appearing inside a 'will be better positioned to' bullet list, this is a forward-looking positioning statement rather than a direct guarantee, which is why it is not a hard violation. But 'higher quality patient care' is a regulated-health-service outcome/quality claim and still requires substantiation (National Law s.133(1)(a)/(b); ACL s.151). It is reasonably reframed to time-redirection languag
- **fix**: redirect freed-up clinical and administrative time to patient-facing work

## [MEDIUM] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: clinical-safety-claim
- **quote**: Automated reminders and recalls reduce missed appointments and ensure consistent follow-up care, supporting both practice revenue and patient outcomes.
- **why**: 'Reduce missed appointments' is well-supported for reminder systems and is defensible. The problem word is 'ensure consistent follow-up care' - automation prompts attendance but cannot ensure clinical follow-up, which depends on practice processes; this risks creating an unreasonable expectation (National Law s.133(1)(b)) and an unsubstantiated outcome claim (ACL s.151). 'Patient outcomes' as a gu
- **fix**: Automated reminders and recalls can help reduce missed appointments and prompt patients to attend follow-up, which may support practice revenue and patient communication. They do not replace clinical follow-up processes, which remain the responsibility of the practice.

## [MEDIUM] borderline — blog/healthcare-automation-roi.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Improved accuracy and compliance
- **why**: This is the same line item as the 'error-reduction' finding (line 259), adjudicated separately on the 'compliance' dimension specifically. Listing 'compliance' as a benefit of the automation tool, alongside accuracy, can reasonably be read as implying that using the tool delivers or ensures regulatory/accreditation compliance (RACGP Standards, AHPRA advertising rules). Under RACGP guidance, accred
- **fix**: Process consistency: Automation can support your existing compliance processes, but it does not itself confer or guarantee RACGP/ACPCC accreditation, which is determined by independent surveyors.

## [MEDIUM] borderline — blog/healthcare-automation-roi.html
- **dimension**: clinical-safety-claim
- **quote**: Error reduction: Improved accuracy and compliance
- **why**: Two distinct claims are bundled here. (a) 'Improved accuracy' — defensible: in the article's own framing (line 222, 'Re-keying details between systems invites mistakes and rework') this refers to data-entry accuracy from removing manual re-keying, which is a substantiable operational mechanism, not a clinical-efficacy claim. (b) 'Compliance' — problematic: listed as a benefit/deliverable of the to
- **fix**: Error reduction: Less manual re-keying improves data-entry accuracy. Automation can support your existing compliance processes, but it does not itself confer or guarantee RACGP/ACPCC accreditation, which is determined by independent surveyors.

## [MEDIUM] violation — calculators.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <span class="result-label">Hours Compliance:</span>
          <span class="result-value">${result.hoursRatio}</span>
- **why**: Survives sceptical scrutiny. The label 'Hours Compliance' asserts a compliance determination - whether the practice COMPLIES with the WIP eligibility requirements - and the value is generated by a third-party calculator. Compliance with a government program's eligibility requirements is determined by the administering authority (Services Australia / Department), not by a vendor's calculator. This 
- **fix**: Rename the label and add a disclaimer. Replace:
  <span class="result-label">Hours Compliance:</span>
with:
  <span class="result-label">Hours-to-Minimum Ratio:</span>
(the existing ${result.hoursRatio} value stays unchanged). Also add the WIP disclaimer above to make clear program eligibility/compliance is determined by the relevant government authority.

## [MEDIUM] violation — calculators.html
- **dimension**: unrealistic-expectation
- **quote**: <span class="result-label">Total Annual Incentive:</span>
          <span class="result-value" style="color: #2C4A3C; font-size: 1.2em;">$${result.total.toLocaleString()}</span>
- **why**: This one survives sceptical scrutiny. The WIP (Workforce Incentive Program) is a real Australian Government incentive, and formal eligibility and payment amounts are assessed by Services Australia / the Department of Health - not by a third-party calculator. The directly adjacent SWPE calculator on the same page carries an explicit disclaimer ('This is only an estimate. Assessment is conducted by 
- **fix**: Add to the WIP result container (after the result-items, mirroring the SWPE disclaimer): <p style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic;">Note: This is only an estimate based on the inputs provided. WIP eligibility and payments are formally assessed by Services Australia / the Department of Health and Aged Care.</p>

## [MEDIUM] borderline — chatbot.js
- **dimension**: misleading-or-deceptive
- **quote**: contact us directly at admin@cliniciq.com.au ... contact us directly at hello@cliniciqsolutions.com
- **why**: Confirmed: chatbot.js (client-side fallback, lines 836 and 845, plus the canned contact reply at line 1175) uses admin@cliniciq.com.au, while netlify/functions/chatbot.js (server-side, lines 216 and 315) uses hello@cliniciqsolutions.com. Two different domains are presented as the contact address depending on which layer responds. The netlify function is authoritative when it loads; the chatbot.js 
- **fix**: Standardise both layers on a single verified, monitored inbox. E.g. set chatbot.js lines 836, 845 and 1175 to 'hello@cliniciqsolutions.com' to match netlify/functions/chatbot.js (or vice versa), and confirm the chosen address actually receives mail before publication. Use that one address in every fallback and canned reply.

## [MEDIUM] borderline — downloads.html
- **dimension**: clinical-safety-claim
- **quote**: Defines best practices for creating and maintaining chronic disease care plans for ongoing patient management.
- **why**: Confirmed verbatim at line 419. Two readings. (1) 'Defines best practices' as in 'sets out widely accepted good practice' — a common, defensible description of a chronic disease management policy template that aligns with established GP frameworks (e.g., MBS CDM items, RACGP guidance). (2) 'Defines best practices' read as the vendor asserting its template is the authoritative source of clinical be
- **fix**: Provides a starting framework for creating and maintaining chronic disease care plans, to be adapted to individual patient needs by the treating clinician.

## [MEDIUM] borderline — downloads.html
- **dimension**: outcome-guarantee
- **quote**: Ensures proper handling, storage, and use of medicines to maintain safety and compliance.
- **why**: Confirmed verbatim at line 531. As a sceptical reviewer I weigh two readings. (1) Reading 'ensures' as the policy mechanism: the policy's purpose is to ensure (i.e., require/establish the procedure for) proper handling — a common drafting convention where a policy 'ensures' something by mandating it. On that reading the sentence is internally coherent and standard. (2) Reading 'ensures' as a guara
- **fix**: Outlines proper handling, storage and use of medicines to support safety and compliance.

## [MEDIUM] borderline — downloads/checklists.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Download free RACGP-compliant checklists for GP clinics. Accreditation checklists, PIP QI tools, and compliance resources.
- **why**: 'RACGP-compliant' used as a factual descriptor is the genuine risk area. RACGP does not certify, badge, or endorse third-party vendor templates as 'compliant' — accreditation is granted by independent surveyors (AGPAL/QIP) against the Standards. While 'compliant' is sometimes used colloquially in B2B copy to mean 'aligned with', in the regulated-health-advertising context it can be read as implyin
- **fix**: Download free checklists for GP clinics, aligned to the RACGP Standards for General Practices (5th ed.). Accreditation preparation, PIP QI tools and compliance resources. (Independent templates; not endorsed by or affiliated with RACGP.)

## [MEDIUM] borderline — downloads/checklists.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Free RACGP-compliant checklists for GP clinic accreditation and quality improvement
- **why**: Same 'RACGP-compliant' descriptor as the meta description, repeated as a visible headline/subtitle in the article header (line 136). For the same reason as racgp-compliant-meta-desc: the term is ambiguous and defensible as 'aligned with', but in a regulated-health-advertising context presented as a headline benefit it carries the same risk of implying an official compliance status. Reasonable to h
- **fix**: Free checklists aligned to the RACGP Standards for General Practices (5th ed.), to support GP clinic accreditation preparation and quality improvement.

## [MEDIUM] borderline — downloads/templates.html
- **dimension**: accreditation-endorsement-implication
- **quote**: <strong>Accreditation Checklists</strong>
                        <span style="...">RACGP compliance checklists</span>
- **why**: A 'compliance checklist' is a recognised descriptor for a self-assessment aid mapped to a published standard, and the heading 'Accreditation Checklists' is generic. The bare phrase 'RACGP compliance checklists' is plausibly read as a neutral descriptor of the tool's mapping rather than an endorsement/accreditation claim, but given the page repeats the stronger 'RACGP-compliant' assertions elsewher
- **fix**: “<strong>Accreditation Checklists</strong><span ...>Self-assessment checklists mapped to the RACGP Standards</span>” with a short note that they support, but do not determine, accreditation.

## [MEDIUM] violation — index.html
- **dimension**: unsubstantiated-efficacy
- **quote**: alt="Care Plan Automation: Transform 30-minute documentation into 30-second deliveries with auto-populated templates"
- **why**: I considered refuting on the basis that alt text is not visible rendering. But alt text is public advertising copy (read by screen readers, indexed by search engines, served as image descriptions) and reproduces the same unsubstantiated quantified '30-minute to 30-second' claim. The quote shown is slightly mis-titled ('high-quality-care' id but the alt text is the 30-min-to-30-sec claim), but the 
- **fix**: alt="Care Plan Automation: drafts structured care plans from auto-populated templates for clinician review"

## [MEDIUM] borderline — llms-full.txt
- **dimension**: clinical-safety-claim
- **quote**: Improve patient appointment adherence by 35%.
- **why**: The triple attribution (header line 25, 'ClinicIQ reports that' prefix line 27, line 89 disclaimer) applies, so the document presents this as a self-reported vendor outcome, not as objective fact — which weakens the misleading/deceptive limb. However, of the five outcome stats this is the most clinically loaded: it is a quantified claim about a PATIENT behaviour/outcome (appointment adherence), no
- **fix**: Remove the percentage and retain attribution: "ClinicIQ reports that practices using its reminder and automation features have seen improvements in appointment communications. Any effect on patient attendance is self-reported, depends on many practice-specific factors, and is not guaranteed."

## [MEDIUM] borderline — llms-full.txt
- **dimension**: unsubstantiated-efficacy
- **quote**: Achieve 95% RACGP care-plan compliance rates, compared with 68% for manual documentation.
- **why**: Sceptical adjudication favours downgrading from 'high' to borderline. The file triple-attributes this statistic: it sits under the section header 'Reported outcomes (as stated by ClinicIQ)' (line 25), is prefaced by 'ClinicIQ reports that its automation clients' (line 27), and is reinforced by the blanket note 'All outcome statistics above are self-reported by ClinicIQ Solutions and should be attr
- **fix**: Keep the attribution framing and add qualification: "ClinicIQ reports that, in its own internal tracking of automation clients, practices have seen higher care-plan documentation consistency than with prior manual workflows. These figures are self-reported, are not independently audited, depend on each practice's implementation and clinical judgement, and compliance is ultimately assessed by independent accreditation surveyors rather than by this software."

## [MEDIUM] borderline — llms-full.txt
- **dimension**: unsubstantiated-efficacy
- **quote**: Reduce human error in care planning by 73%.
- **why**: Same triple-attribution context applies (section header line 25, 'ClinicIQ reports that' prefix line 27, blanket disclaimer line 89), so the document is not asserting 73% as objective fact. The clinical-safety dimension is genuine (care-planning error is patient-safety adjacent), which keeps this from being a false positive. But the original 'high' severity overstates it: with attribution the misl
- **fix**: Remove the precise percentage and keep attribution: "ClinicIQ reports that its automation clients have experienced fewer manual data-entry errors in care-plan documentation. This is self-reported, is not independently audited, and actual results vary by practice, workflow and clinical context; the tool does not guarantee any specific error-reduction outcome."

## [MEDIUM] borderline — llms.txt
- **dimension**: accreditation-endorsement-implication
- **quote**: Fast, accessible, RACGP-aligned websites for GP clinics and medical practices. ... RACGP-compliant templates, checklists and accreditation resources.
- **why**: Partial refutation. 'RACGP-aligned' (websites) is defensible and low-risk: 'aligned to' plainly signals the product is designed to match the RACGP Standards, not that it is certified or endorsed by RACGP — this is ordinary B2B positioning language and should not be flagged. 'RACGP-compliant templates' is the genuine risk: 'compliant' is a stronger, factual-sounding assertion than 'aligned', and be
- **fix**: Fast, accessible websites for GP clinics and medical practices, aligned to current RACGP Standards (5th ed.). Templates and checklists designed to help clinics prepare for RACGP accreditation. Independent surveyors determine accreditation outcomes; these resources are not RACGP-endorsed and do not guarantee accreditation.

## [MEDIUM] violation — llms.txt
- **dimension**: accreditation-endorsement-implication
- **quote**: reduce administrative burden and improve RACGP compliance
- **why**: Refutation fails. This is the same phrase as 'racgp-compliance-improvement-claim' adjudicated under the clinical-safety dimension; re-flagging it under the accreditation/endorsement dimension does not change the substance, and the re-flag is valid because the phrase does double duty (it is both an outcome and an endorsement/accreditation implication). 'Improve RACGP compliance' presents accreditat
- **fix**: reduce administrative burden and help practices organise and evidence their own RACGP Standards compliance. Accreditation is determined by independent surveyors; our tools do not guarantee accreditation.

## [MEDIUM] violation — llms.txt
- **dimension**: clinical-safety-claim
- **quote**: help GP clinics and small healthcare practices reduce administrative burden and improve RACGP compliance
- **why**: Refutation fails here. The verb 'improve' attached to 'RACGP compliance' presents a guaranteed outcome in a formal accreditation framework. RACGP accreditation against the Standards for General Practices (5th ed.) is determined by independent surveyors (AGPAL/QIP), not by software; a vendor tool can support a clinic's processes but cannot itself deliver an 'improvement' in compliance as an outcome
- **fix**: help GP clinics and small healthcare practices reduce administrative burden and support their own RACGP Standards compliance processes. Accreditation outcomes are determined by independent surveyors; ClinicIQ's tools do not guarantee accreditation.

## [MEDIUM] borderline — llms.txt
- **dimension**: unsubstantiated-efficacy
- **quote**: ClinicIQ reports that its automation clients save an average of 12 hours per week on documentation, based on data from 50+ Australian practices
- **why**: This is a B2B productivity claim (documentation time saved), not a clinical-treatment or patient-outcome efficacy claim, so the 'higher AHPRA advertising standard for clinical outcomes' framing is overstated. The claim IS attributed and hedged: it is prefaced with 'ClinicIQ reports that' and qualified with 'based on data from 50+ Australian practices', and llms-full.txt reinforces this with the gl
- **fix**: ClinicIQ's internal review of automation clients observed documentation time savings averaging around 12 hours per week (self-reported, based on data from 50+ Australian practices); individual results vary with clinic size, workflow and uptake. This figure is not independently audited. Contact us for methodology and to assess suitability for your practice.

## [MEDIUM] borderline — llms.txt
- **dimension**: unsubstantiated-efficacy
- **quote**: with 95% RACGP care-plan compliance rates versus 68% for manual documentation
- **why**: Refuting the 'critical' rating. The original finding overstates the position in two ways. First, the comparative figures are explicitly attributed within the same sentence ('ClinicIQ reports that its automation clients... with 95%... versus 68%'), and llms-full.txt places them under a '## Reported outcomes (as stated by ClinicIQ)' heading with a closing 'All outcome statistics above are self-repor
- **fix**: ClinicIQ reports that, in its internal review of automation clients, care-plan documentation completeness was observed at higher rates than for manual documentation (self-reported; methodology and sample available on request). These figures are not independently audited and do not guarantee specific RACGP accreditation outcomes, which are determined by independent surveyors.

## [MEDIUM] borderline — websites.html
- **dimension**: accreditation-endorsement-implication
- **quote**: "description": "Professional, fast and accessible website design for Australian GP clinics and medical practices, built for patient engagement and healthcare compliance."
- **why**: 'Built for ... healthcare compliance' is vague enough that it does not name a specific standard (unlike the OG tag's explicit 'RACGP-compliant'), and 'built for X' reads as design intent/aim rather than a guaranteed outcome. ACCC and AHPRA leniency is higher for aim-style framing than attribute-style claims. However, in plain English 'compliance' is still a defined outcome a purchaser may believe 
- **fix**: Replace 'built for patient engagement and healthcare compliance' with 'built for patient engagement and designed with an awareness of Australian healthcare regulatory requirements (including privacy and AHPRA advertising rules)'.

## [MEDIUM] borderline — websites.html
- **dimension**: accreditation-endorsement-implication
- **quote**: "knowsAbout": [
        "Healthcare Automation",
        "GP Clinic Management",
        "Medical Practice Software",
        "Healthcare IT Solutions",
        "RACGP Compliance"
      ]
- **why**: Schema.org `knowsAbout` is a machine-readable topic-of-knowledge field; it asserts the entity has knowledge of a subject, not that it delivers or certifies an outcome. Taken literally it is defensible (a vendor can know about RACGP compliance without claiming to confer it). But the bare phrase 'RACGP Compliance' in a structured-data expertise list, stripped of the softening 'considerations'/'aware
- **fix**: Replace "RACGP Compliance" with "RACGP Standards awareness" (or remove the entry).

## [LOW] borderline — about.html
- **dimension**: misleading-or-deceptive
- **quote**: In partnership with NDIS organisations to provide tailored support and solutions for NDIS participants and providers.
- **why**: 'In partnership with NDIS organisations' is a factual representation about a current commercial/legal relationship. The word 'partnership' has a specific meaning, and the line is corroborated by the founder bio on line 317 ('We partner with...NDIS organisations'). If accurate and current, it is defensible. But the reviewer's concern is valid in principle: if the actual relationship is informal col
- **fix**: We work with NDIS organisations to provide tools and templates relevant to NDIS participants and providers. (Use 'work with' rather than 'in partnership with' unless a formal partnership is documented and current.)

## [LOW] borderline — about.html
- **dimension**: testimonials
- **quote**: Why Choose ClinicIQ ... Trust signals that set us apart
- **why**: The reviewer correctly notes the content is self-authored marketing points, not third-party endorsements, so the actual prohibition in s.133(d) (testimonials published in advertising a regulated health service) is not triggered by the content itself. However, the section is wrapped in testimonial-specific semantic markup (class='testimonials', 'testimonials-carousel', 'testimonial-card', 'testimon
- **fix**: Re-wrap the section with neutral classes (e.g., 'value-cards', 'value-grid', 'value-card', 'value-content') and a heading like 'Why practices choose ClinicIQ'. Keep the self-authored content as-is.

## [LOW] borderline — about.html
- **dimension**: unrealistic-expectation
- **quote**: to give healthcare professionals back the time they need to focus on what matters most - patient care. By automating repetitive tasks, streamlining workflows, and providing intelligent tools, I help practices reduce administrative burden
- **why**: Standing alone, 'give back the time they need to focus on...patient care' is largely mission-statement puffery. But it is an unqualified beneficial-outcome representation (more patient-care time as a result of the service) presented without basis, and it leans toward an unreasonable-expectation impression under s.133(b) and an unsubstantiated representation under ACL s.29 when read alongside the '
- **fix**: Our aim is to help healthcare professionals spend less time on repetitive administration through automation and workflow tools, so their teams can allocate time according to their own priorities.

## [LOW] borderline — about.html
- **dimension**: unsubstantiated-efficacy
- **quote**: I help practices reduce administrative burden while improving efficiency and compliance.
- **why**: 'I help practices...improving efficiency and compliance' is framed as a delivered outcome rather than a design-intent/capability claim. The compliance portion in particular ('improving compliance') reads as an efficacy representation about a regulated status, and the page offers no basis/substantiation for it. Under ACL s.29/s.151 (unsubstantiated representations) and arguably s.133(a)/(b), statin
- **fix**: Our tools are designed to help practices reduce administrative burden and support their efficiency and compliance processes.

## [LOW] borderline — automations.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Compliance monitoring
- **why**: Verified at line 666 within PIPQI Analytics' feature list. In the PIP QI context, 'compliance' carries regulatory/program weight because PIP QI performance is assessed by Services Australia/the Department and software cannot determine a practice's program-compliance status. That said, dashboards commonly 'monitor' whether target measures/thresholds are being met, so the phrase is not inherently fa
- **fix**: PIP QI measure tracking

## [LOW] borderline — blog.html
- **dimension**: clinical-safety-claim
- **quote**: Explore how reliable systems reduce clinical decision fatigue and improve patient care. Learn principles for building systems that clinicians actually trust.
- **why**: This is an excerpt describing the topic of an educational article ("Building Reliable Systems for GP Decision-Making"), framed as the article's thesis about system-design principles clinicians can trust. It is not a representation that ClinicIQ's specific software reduces decision fatigue or improves patient care. That weakens the finding considerably. But the words "reduce clinical decision fatig
- **fix**: Explore how well-designed administrative systems can help reduce administrative burden on clinicians, and principles for building workflows your team can rely on.

## [LOW] borderline — blog.html
- **dimension**: clinical-safety-claim
- **quote**: alt="Building Reliable Systems: Reduce clinical decision fatigue and improve patient care with trusted systems"
- **why**: Same underlying issue as the Blog 5 excerpt, in alt text. Alt text is published advertising copy, so the same clinical-quality phrasing ("reduce clinical decision fatigue and improve patient care") appears in marketing. The basis for keeping it is the same: these are clinical-outcome concepts stated as outcomes of the promoted systems without substantiation. Borderline, not a clear violation, beca
- **fix**: alt="Building reliable administrative systems for GP practices"

## [LOW] borderline — blog.html
- **dimension**: unsubstantiated-efficacy
- **quote**: From smart care plans to automated patient communications, learn how to streamline your practice and improve patient outcomes.
- **why**: This is a teaser for an educational blog post ("5 Ways to Automate Your GP Clinic in 2026"), describing the article's general thesis about automation strategies, not a claim that ClinicIQ's specific product produces clinical outcomes. In that editorial context it reads as soft, general commentary. However, "improve patient outcomes" is a measurable health-related outcome phrase stated as a likely 
- **fix**: From smart care plans to automated patient communications, learn how to streamline your practice's administrative workflows and support your clinical team's existing care processes.

## [LOW] borderline — blog/excel-healthcare-data-processing.html
- **dimension**: unrealistic-expectation
- **quote**: XLOOKUP can match them to ensure no patient falls through the cracks.
- **why**: Verified verbatim at line 245, sitting in an educational Excel-skills tutorial ('Essential for merging data'), not a ClinicIQ product-outcome claim. Read fairly it is capability-flavoured shorthand for 'support complete cross-referencing', which leans toward acceptable puffery. However the brief explicitly flags guarantee-style absolute language ('ensure') tied to a patient-safety outcome (no pati
- **fix**: Replace 'XLOOKUP can match them to ensure no patient falls through the cracks.' with 'XLOOKUP can match them so your team can cross-check that patients needing care plans are followed up appropriately.'

## [LOW] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: outcome-guarantee
- **quote**: Clinics that embrace automation in 2026 will be better positioned to:
- **why**: Read alone, 'will be better positioned to' is reasonable forward-looking positioning language. The concern is cumulative: the bullets it introduces include 'deliver higher quality patient care' (a clinical quality-of-care claim) and staffing/financial outcomes, so the bundle can read as a guaranteed set of beneficial clinical, staffing and financial outcomes (National Law s.133(1)(b); ACL ss.18, 2
- **fix**: Clinics that adopt automation may find it easier to:

## [LOW] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: unsubstantiated-efficacy
- **quote**: produce evidence-based care plans for diabetes, asthma, mental health, and other chronic conditions
- **why**: 'Evidence-based' is a recognised clinical term of art implying the output reflects established clinical evidence. For an AI-generated draft with no cited guidelines or methodology disclosed, this is an efficacy/quality claim about a clinical output without a visible proper basis (ACL s.151; National Law s.133(1)(a)/(b)), and the founder being a Registered Nurse heightens the standard expected of h
- **fix**: produce draft care plans for diabetes, asthma, mental health and other chronic conditions, drawing on commonly used clinical guidelines. All outputs are drafts for the treating GP's clinical judgement and review.

## [LOW] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: unsubstantiated-efficacy
- **quote**: GP clinics that embrace automation are seeing remarkable improvements in efficiency, patient satisfaction, and staff wellbeing.
- **why**: This is presented as a factual assertion about outcomes (efficiency, patient satisfaction, staff wellbeing) with no cited study, survey or sample. 'Patient satisfaction' and 'staff wellbeing' touch on care quality, raising the bar for a regulated-health-service-adjacent vendor. It reads more as marketing lead-in than a precise factual claim, which is why it is borderline rather than a hard violati
- **fix**: Many clinics that adopt automation report perceived improvements in efficiency, and some note flow-on effects on patient communication and staff workload. Your results will depend on your practice's setup and which workflows you automate.

## [LOW] borderline — blog/gp-clinic-automation-2026.html
- **dimension**: unsubstantiated-efficacy
- **quote**: Transcribe consultations in real-time with high accuracy
- **why**: 'High accuracy' without a stated figure, methodology or basis is an unqualified efficacy claim about a clinical-documentation output, and for a tool that produces clinical notes this can mislead and create unrealistic expectations (National Law s.133(1)(a); ACL ss.18, 29, 151). It is not a hard violation because 'high accuracy' is common marketing shorthand and could be substantiated, but adding a
- **fix**: Transcribe consultations in real time (accuracy varies with audio quality, accent and clinical terminology; drafts require GP review and sign-off)

## [LOW] borderline — blog/healthcare-automation-roi.html
- **dimension**: unsubstantiated-efficacy
- **quote**: Burnout: Admin burden is a leading cause of GP burnout
- **why**: The substantive proposition is well-supported in Australian GP literature — RACGP's annual Health of the Nation reports repeatedly identify administrative/bureaucratic burden as a top driver of GP burnout, so the claim is capable of substantiation. However, in the actual text it appears as a bare factual assertion in an advertising context, with no source cited. Because the business is operated by
- **fix**: Burnout: RACGP Health of the Nation reporting has consistently identified administrative burden as a leading driver of GP burnout.

## [LOW] borderline — blog/understanding-swpe-guide.html
- **dimension**: misleading-or-deceptive
- **quote**: Standardised Whole Patient Equivalent (SWPE) is a measure used by the Australian Department of Health to standardise patient care across general practices.
- **why**: The article (line 218) says SWPE is 'used by the Australian Department of Health'. SWPE values are in fact administered/published by Services Australia as part of the PIP framework, while the Department of Health and Aged Care sets policy. So the attribution is imprecise. However, the bar for a misleading representation under ACL ss.18/29 is whether the statement is materially likely to mislead a 
- **fix**: Standardised Whole Patient Equivalent (SWPE) is a weighting administered by Services Australia as part of the Practice Incentives Program framework, used to standardise patient workload across general practices. (Program rules are set by the Department of Health and Aged Care.)

## [LOW] borderline — blog/understanding-swpe-guide.html
- **dimension**: unsubstantiated-efficacy
- **quote**: Use our free SWPE Calculator to estimate your practice's Standardised Whole Patient Equivalent and understand your funding potential.
- **why**: Line 240. The reviewer concedes (correctly) that the 'free' calculator offer is not a clinical inducement under s.133(c); it is general lead-gen tooling. The remaining question is whether 'understand your funding potential' is an unsubstantiated efficacy/outcome representation. Two hedges work in ClinicIQ's favour: the verb 'estimate' (the calculator produces an estimate, not a forecast), and the 
- **fix**: Use our SWPE Calculator to estimate your practice's Standardised Whole Patient Equivalent. The estimate is for information only and does not guarantee any particular funding outcome; for current entitlements, refer to Services Australia.

## [LOW] borderline — calculators.html
- **dimension**: accreditation-endorsement-implication
- **quote**: "knowsAbout": [
        "Healthcare Automation",
        "GP Clinic Management",
        "Medical Practice Software",
        "Healthcare IT Solutions",
        "RACGP Compliance"
      ]
- **why**: Sceptical read first: schema.org 'knowsAbout' is a machine-readable topic taxonomy for search engines, not consumer advertising copy. No reasonable clinic decision-maker sees this JSON-LD, and it makes no assertion of RACGP endorsement. That pushes toward false-positive. However, two real concerns survive: (1) RACGP explicitly does not endorse vendors, and listing 'RACGP Compliance' as a subject o
- **fix**:       "knowsAbout": [
        "Healthcare Automation",
        "GP Clinic Management",
        "Practice Workflow Tools",
        "Healthcare IT Solutions"
      ]

## [LOW] borderline — calculators.html
- **dimension**: unrealistic-expectation
- **quote**: <h3>Time Savings Calculator</h3>
                        <p>Calculate how much time automation can save your team and the financial impact.</p>
- **why**: The intro phrase 'how much time automation can save your team' uses 'can' (conditional/potential), not 'will save' - so on a strict reading it is not asserting a guaranteed outcome. However, the same disclaimer gap exists as for ROI: the result panel (lines 616-629) outputs concrete 'Hours Saved per Week' and dollar 'Annual Cost Savings' driven by a user-entered 'Automation Efficiency %' with no c
- **fix**: Add below the Time Savings results panel: <p style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic;">Illustrative estimate based on your inputs. Actual results depend on your specific processes and implementation and are not guaranteed.</p>

## [LOW] borderline — calculators.html
- **dimension**: unrealistic-expectation
- **quote**: <h3>Productivity Impact Calculator</h3>
                        <p>Measure the productivity impact of new tools, training, or process improvements.</p>
- **why**: Same pattern and same sceptical conclusion as the ROI and Time Savings calculators. 'Measure the productivity impact' is an accurate description of a user-input model and 'impact' is not inherently an outcome guarantee. But the result panel (lines 829-842) shows concrete 'Productivity Increase' percentages and dollar 'Additional Annual Value' with no illustrative-only disclaimer, while the SWPE ca
- **fix**: Add below the Productivity results panel: <p style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic;">Illustrative projection based on your inputs. Actual results depend on the specific tools, implementation and inputs, and are not guaranteed.</p>

## [LOW] borderline — calculators.html
- **dimension**: unsubstantiated-efficacy
- **quote**: <h3>ROI Calculator</h3>
                        <p>Calculate the return on investment for your automation or technology projects.</p>
- **why**: Sceptical read: an ROI calculator is inherently a user-input model, and the label 'Calculate the return on investment for your automation' accurately describes what the tool does - it computes ROI FROM INPUTS THE USER SUPPLIES. There is no ClinicIQ efficacy claim embedded in the intro itself. That said, the reviewer's stronger point survives: the result panel (lines 570-583) renders concrete dolla
- **fix**: Add below the ROI results panel (mirroring the SWPE disclaimer): <p style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic;">Note: Figures are illustrative projections based on the inputs you provide and are not a guarantee of actual savings or returns.</p>

## [LOW] borderline — downloads.html
- **dimension**: accreditation-endorsement-implication
- **quote**: "knowsAbout": [ "Healthcare Automation", "GP Clinic Management", "Medical Practice Software", "Healthcare IT Solutions", "RACGP Compliance" ]
- **why**: Confirmed at lines 76-82. As a sceptical reviewer I note schema.org knowsAbout is a topic-of-expertise signal, not a product claim, and is invisible to end users. On a strict reading 'RACGP Compliance' simply denotes a subject area (the topic of compliance with RACGP Standards), which is accurate — the business does work in that area. It does not, by itself, assert that ClinicIQ confers or guarant
- **fix**: Replace "RACGP Compliance" with "RACGP Standards Alignment" or "Accreditation Support".

## [LOW] borderline — downloads/checklists.html
- **dimension**: clinical-safety-claim
- **quote**: Patient health outcomes
- **why**: The phrase appears in a bulleted list (line 208) of things the checklists help a practice 'track and improve'. The checklists are administrative templates, not clinical interventions, so listing 'Patient health outcomes' as something the templates help 'improve' risks implying the templates themselves produce patient-level clinical benefit. Read narrowly, PIP QI activities do legitimately involve 
- **fix**: PIP QI clinical indicator data (e.g. the MBS-specified QI measures) for your practice to track

## [LOW] borderline — downloads/checklists.html
- **dimension**: outcome-guarantee
- **quote**: Checklists are updated when RACGP standards change, keeping you compliant with current requirements.
- **why**: 'Keeping you compliant' is softer than the 'ensuring you meet accreditation' claim but still attributes an active compliance-maintenance function to the product. In strict reading, a checklist cannot 'keep' a clinic compliant — compliance is the practice's own legal responsibility and is verified by surveyors/regulators. Read fairly, however, the sentence's actual operative claim is about currency
- **fix**: Checklists are updated when the RACGP Standards change, to help you stay current with the requirements. Ongoing compliance remains the practice's responsibility and is assessed by independent surveyors.

## [LOW] borderline — faq.html
- **dimension**: accreditation-endorsement-implication
- **quote**: Yes, our healthcare automation tools are built for RACGP compliance. Care plan templates meet RACGP guidelines, documentation aligns with college standards for record keeping and patient privacy, and systems are updated as requirements change.
- **why**: The text does NOT claim accreditation, certification, or endorsement by the RACGP. It says tools are 'built for' compliance (a design objective) and 'aligns with college standards' (design alignment language) - both defensible descriptions of design intent. However, the categorical assertion that 'Care plan templates meet RACGP guidelines' states compliance as a determined fact rather than a desig
- **fix**: Our automation tools are designed to align with the record-keeping, privacy and care-plan expectations set out in the RACGP Standards for General Practices (5th ed.). Accreditation is independently assessed by an external surveying body, not conferred by software. Templates and documentation are reviewed as the Standards evolve, and practices remain responsible for confirming they meet their own accreditation requirements.

## [LOW] borderline — faq.html
- **dimension**: clinical-safety-claim
- **quote**: patient data is never shared with third parties.
- **why**: The ordinary B2B/consumer reading of 'never shared with third parties' in a privacy-marketing sentence is 'we do not sell, disclose or pass on your patient data to third parties for their own use' - a defensible representation. However 'never' is an absolute, and in health-data handling absolute claims warrant precision: if any sub-processor (hosting, backup, support tooling) could technically acc
- **fix**: Patient data is not sold or disclosed to third parties for their own use. Access is limited to authorised personnel and trusted sub-processors (such as hosting and backup providers) bound by confidentiality and privacy obligations, in line with the Australian Privacy Principles.

## [LOW] borderline — faq.html
- **dimension**: unsubstantiated-efficacy
- **quote**: Care plan templates meet RACGP guidelines, documentation aligns with college standards for record keeping and patient privacy,
- **why**: Half of this clause is defensible: 'documentation aligns with college standards' is design-alignment language, not a compliance determination. But 'Care plan templates meet RACGP guidelines' is a bare categorical assertion of satisfying specific external standards with no disclosed basis (no mapping, no external review cited). Under ACL s.151 a representation must have a proper basis at the time i
- **fix**: Care plan templates are designed against commonly referenced RACGP record-keeping and privacy expectations, and documentation aligns with college standards. Practices remain responsible for confirming templates meet their individual accreditation and clinical-governance requirements.

## [LOW] borderline — glossary.html
- **dimension**: unsubstantiated-efficacy
- **quote**: In healthcare, RAG allows AI systems to provide accurate answers based on your clinic's specific documents and protocols.
- **why**: This one is the closest to a real issue. Unlike the ML/NLP entries (pure third-person definitions), this sentence uses the second person ('your clinic's specific documents and protocols') and the unqualified absolute 'accurate answers'. The use of 'your clinic' is a mild marketing-voice framing that, on a vendor's own site, can read as an implied capability/efficacy assertion about a RAG-based pro
- **fix**: In healthcare, RAG is designed to ground AI responses in a clinic's own documents and protocols to improve relevance and accuracy. AI outputs can still be incomplete or incorrect and should be reviewed by an appropriately qualified clinician before any clinical use.

## [LOW] borderline — index.html
- **dimension**: clinical-safety-claim
- **quote**: alt="Smart Stock Management: AI-powered inventory tracking with expiration alerts and predictive reordering to protect patients and revenue"
- **why**: I leaned toward false-positive because alt text is low-visibility, 'to protect patients and revenue' is vague purpose language rather than a guarantee, and the actual tool function (expiry alerts, predictive reordering) does support patient safety indirectly. But it is stated as a product purpose/effect ('to protect patients') in a therapeutic-goods-adjacent context, and health-related safety clai
- **fix**: alt="Smart Stock Management: inventory tracking with expiry alerts and reorder reminders for vaccines and clinic stock"

## [LOW] borderline — index.html
- **dimension**: comparative-superlative
- **quote**: <p class="trust-text">Trusted by Australian healthcare professionals</p>
- **why**: I considered refuting this as acceptable B2B puffery akin to 'Trusted by ...' taglines used industry-wide. On its own it would likely be too vague to be misleading. Two factors keep it as borderline rather than false-positive: (1) it is presented as a factual trust statement immediately under the 'RACGP Compliant' badge and directly above the prohibited testimonials carousel, so it functions as re
- **fix**: Either substantiate with a verifiable claim only if true and demonstrable (e.g. 'Used by GP clinics across Australia') or remove the line. Do not keep 'Trusted by ...' as a bare assertion alongside testimonials.

## [LOW] borderline — index.html
- **dimension**: unrealistic-expectation
- **quote**: <p class="ps-impact"><strong>Impact:</strong> Convert waiting room downtime into service uptake. Patients discover eligible services-clinics capture revenue they were leaving on the table.</p>
- **why**: I leaned toward false-positive. Informing patients about services they may be eligible for, and billing appropriately for clinically indicated services, is legitimate practice-management activity, not indiscriminate clinical use. The B2B audience (clinic owners) understands 'revenue left on the table' as standard business language for unbilled eligible activity. However, the absolute phrasing 'cap
- **fix**: "Show patients information about services they may be eligible for, so they can discuss them with their clinician. This can support uptake of clinically appropriate services; any billing impact depends on eligibility and clinical judgement."

## [LOW] borderline — index.html
- **dimension**: unsubstantiated-efficacy
- **quote**: "Our founder is a Registered Nurse with over 5 years of clinical experience and a degree in Information Systems Management and Data Analysis, which is why the tools fit real clinical workflows."
- **why**: I lean toward false-positive. The credentials (Registered Nurse, 5 years clinical, IS Management/Data Analysis degree) are accurate and legitimately stated. The clause 'which is why the tools fit real clinical workflows' is a soft causal/explanatory statement about design rationale, not a quantified efficacy claim. It is the kind of general B2B capability language the task says is fine ('streamlin
- **fix**: "Our founder is a Registered Nurse with over 5 years of clinical experience and a degree in Information Systems Management and Data Analysis. This background informs how the tools are designed to fit GP workflows."

## [LOW] borderline — index.html
- **dimension**: unsubstantiated-efficacy
- **quote**: Focus on the 3% of patients affecting your scores instead of spreadsheets across 97%.
- **why**: I leaned toward refuting this. The '3% / 97%' framing in the problem text at line 554 is explicitly glossed '(97/100 patients)' and is presented as a stylised illustration of the Pareto-style problem ('check everyone' wastes effort on those who 'won't move the needle'), not as a precise empirical claim about clinical populations. The solution line repeats the same illustrative ratio. That is the k
- **fix**: Either keep as an obvious illustration if the surrounding '97/100 patients' framing is retained and clearly rhetorical, or soften to: 'Focus on the patients most likely to affect your scores, rather than spreading effort across the whole list.' If a real analysis underpins 3%/97%, cite it.

## [LOW] borderline — index.html
- **dimension**: unsubstantiated-efficacy
- **quote**: <p class="ps-impact"><strong>Impact:</strong> Eliminate repetitive typing time. Get instant, reliable answers without interrupting colleagues. Staff stay focused on revenue-generating work.</p>
- **why**: I considered refuting as B2B puffery. 'Eliminate repetitive typing time' and 'instant, reliable answers' are familiar marketing phrasing for a RAG/policy-lookup tool and would ordinarily be acceptable. The single word that prevents a false-positive call is 'reliable': because answers from this tool may inform administrative (and potentially clinical-adjacent) decisions in a GP practice, an unquali
- **fix**: "Reduce repetitive typing with pre-built note templates, and get quick answers from a tool trained on your policies. Answers are generated automatically and should be checked against source policies before use."

## [LOW] borderline — llms-full.txt
- **dimension**: accreditation-endorsement-implication
- **quote**: These tools are built for web/cloud use (operating system: web-based) and are designed with RACGP compliance, data security and Australian privacy requirements in mind.
- **why**: Sceptical adjudication favours downgrading from the original 'medium' toward borderline rather than violation. The wording 'designed with ... in mind' is a design-intent statement, materially softer than the flat 'RACGP-compliant' descriptor in the MedPlan AI finding. Vendor language that a product was 'designed with [a standard] in mind' is widespread and, on a fair reading, describes the design 
- **fix**: "These tools are web-based and are designed with reference to RACGP Standards guidance, Australian privacy principles, and data-security good practice. They are intended to support a practice's own compliance efforts and do not themselves grant or guarantee RACGP accreditation."

## [LOW] borderline — llms-full.txt
- **dimension**: accreditation-endorsement-implication
- **quote**: RACGP-aligned templates, checklists and accreditation resources designed by healthcare professionals, organised under templates and checklists libraries.
- **why**: Sceptical adjudication leans toward borderline rather than violation. 'RACGP-aligned' is softer and more defensible than 'RACGP-compliant' or 'RACGP-endorsed' — alignment is a common and accurate way to say materials have been written with reference to the Standards. The phrase 'accreditation resources' is the residual concern: taken in context (downloads to help practices prepare for accreditatio
- **fix**: "Templates, checklists and reference resources intended to support practices preparing for accreditation, informed by the RACGP Standards and designed by healthcare professionals. They are general reference materials, are not RACGP-endorsed, and do not themselves confer or guarantee accreditation."

## [LOW] borderline — llms-full.txt
- **dimension**: accreditation-endorsement-implication
- **quote**: RACGP standards: Care-plan templates and documentation systems are designed to meet Royal Australian College of General Practitioners guidelines and are updated to reflect changes in RACGP requirements.
- **why**: Sceptical adjudication favours borderline over violation. 'Designed to meet [RACGP] guidelines' is a design-intent/objective statement and is factually plausible (templates can be authored to follow RACGP documentation guidance). It does not assert that RACGP endorses or certifies the product, nor that using the templates guarantees accreditation. The commitment to 'updated to reflect changes in R
- **fix**: "Care-plan templates and documentation systems are designed with reference to the RACGP Standards for General Practices and are reviewed when the Standards are updated. They are decision-support/reference tools only; they do not constitute RACGP endorsement and do not guarantee that a practice will achieve or maintain accreditation."

## [LOW] borderline — llms-full.txt
- **dimension**: unrealistic-expectation
- **quote**: Reallocate approximately 60% more staff time to direct patient care.
- **why**: Same triple-attribution context (lines 25, 27, 89). The 'approximately' qualifier and the attribution soften this. It is operationally framed (staff time reallocation) rather than a direct patient-outcome claim, though the phrase 'direct patient care' ties it to a clinical-benefit endpoint. The reviewer's own severity was 'medium.' Residual s.133(b) risk remains because a specific quantified benef
- **fix**: Soften and keep attribution: "ClinicIQ reports that automation clients have been able to reallocate administrative time toward patient care. The extent of any time saving is self-reported, depends on the practice's workflows and implementation, and no specific percentage is guaranteed."

## [LOW] borderline — llms-full.txt
- **dimension**: unsubstantiated-efficacy
- **quote**: Save an average of 12 hours per week on documentation tasks (based on data from 50+ Australian practices).
- **why**: This is the LEAST problematic of the five outcome stats. In addition to the triple attribution (section header, 'ClinicIQ reports that' prefix, line 89 disclaimer), the claim itself states a basis ('based on data from 50+ Australian practices') and is a pure productivity/time-saving claim rather than a clinical-outcome claim. Productivity time-savings for administrative documentation are general B
- **fix**: Strengthen the existing attribution: "In self-reported feedback from a sample of 50+ Australian practices using our tools, clients have reported saving time on documentation tasks. Individual results vary by practice size, workflows and starting point; these figures are not independently audited and are not a guarantee of future performance."

## [LOW] borderline — terms-of-service.html
- **dimension**: accreditation-endorsement-implication
- **quote**: "knowsAbout": [
        "Healthcare Automation",
        "GP Clinic Management",
        "Medical Practice Software",
        "Healthcare IT Solutions",
        "RACGP Compliance"
      ]
- **why**: Schema.org's knowsAbout is a knowledge-topic descriptor, not an endorsement claim — it does not assert RACGP accreditation, partnership, or that ClinicIQ's tools confer compliance, so the strongest reading of the reviewer's concern (implied RACGP endorsement) is not established. However, the bare phrase 'RACGP Compliance' as a self-attributed area of expertise is genuinely ambiguous: a reasonable 
- **fix**: Replace "RACGP Compliance" with a neutral, factual topic descriptor such as "Practice Workflow", "GP Workflow Automation", or "General Practice Standards". The knowsAbout array would then read: ["Healthcare Automation", "GP Clinic Management", "Medical Practice Software", "Healthcare IT Solutions", "General Practice Standards"]. If you wish to reference RACGP standards anywhere on the page, phrase it as "tools intended to support general practice workflows" and add a short note that accreditation is determined independently by accredited surveyors, not by ClinicIQ.

## [LOW] borderline — terms-of-service.html
- **dimension**: unsubstantiated-efficacy
- **quote**: <p>These Terms of Service comply with:</p>
                    <ul>
                        <li>Competition and Consumer Act 2010 (Cth)</li>
                        <li>Australian Consumer Law (Schedule 2 of the CCA)</li>
                        <li>Australian Securities and Investments Commission Act 2001</li>
                        <li>Privacy Act 1988 (Cth)</li>
                        <li>Notifiable Data Breaches (NDB) scheme</li>
                        <li>Electronic Transactions Act 1999 (Cth)</li>
                        <li>Spam Act 2003 (Cth)</li>
                        <li>Copyright Act 1968 (Cth)</li>
                    </ul>
- **why**: The reviewer overreaches by treating this as a substantiated efficacy/advertising claim — it sits in a Terms-of-Service legal-references block, not in marketing copy, and courts read contractual/legal representations in their full document context. However the bare assertion 'These Terms of Service comply with' eight named statutes is presented as a statement of fact, and under ACL ss.18/29/151 a 
- **fix**: Align with the existing accurate wording already used at line 206. Replace the 'comply with' framing with an intention/consistency statement: "<p>These Terms of Service are intended to be consistent with applicable Australian legislation, including:</p>" and remove "Australian Securities and Investments Commission Act 2001" unless there is a genuine financial-services nexus you can substantiate. If a lawyer has reviewed the Terms, state that explicitly (e.g. "independently reviewed by [firm] in [month/year]") rather than asserting blanket compliance.

## [LOW] borderline — websites.html
- **dimension**: unsubstantiated-efficacy
- **quote**: A proven 4-step approach to creating healthcare websites that convert
- **why**: 'A 4-step approach to creating websites that convert' is mostly process puffery and is defensible. The single word that lifts this above pure puffery is 'proven', which is a factual claim (evidence exists) rather than an obvious opinion, and the page offers no supporting evidence. ACCC treats 'proven'/'guaranteed' as representations that require a proper basis at the time. Removing one word resolv
- **fix**: Soften to: 'A clear 4-step approach to designing healthcare websites focused on patient engagement.' (Drop 'proven' unless evidence is cited; keep 'that convert' or replace with 'focused on patient engagement'.)
