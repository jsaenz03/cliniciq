---
phase: quick
plan: 6
type: execute
wave: 1
depends_on: []
files_modified:
  - sitemap.xml
  - blog/gp-clinic-automation-2026.html
  - blog/understanding-swpe-guide.html
  - blog/healthcare-automation-roi.html
  - faq.html
  - glossary.html
autonomous: true
requirements:
  - SEO-01
  - SEO-02
  - SEO-03
  - SEO-04

must_haves:
  truths:
    - All sitemap.xml lastmod dates are realistic past dates (not future dates)
    - All blog posts have realistic datePublished values from 2025
    - FAQ page contains complete FAQPage schema for all 10 questions
    - Glossary page contains complete DefinedTermSet schema for all 18 terms
  artifacts:
    - path: "sitemap.xml"
      provides: "Updated lastmod dates for all URLs"
      contains: "2025- dates instead of 2026-02-16"
    - path: "blog/gp-clinic-automation-2026.html"
      provides: "Realistic publication date"
      contains: "datePublished: 2025-02-01"
    - path: "blog/understanding-swpe-guide.html"
      provides: "Realistic publication date"
      contains: "datePublished: 2025-01-15"
    - path: "blog/healthcare-automation-roi.html"
      provides: "Realistic publication date"
      contains: "datePublished: 2025-01-01"
    - path: "faq.html"
      provides: "Complete FAQPage schema"
      min_items: 10
    - path: "glossary.html"
      provides: "Complete DefinedTermSet schema"
      min_items: 18
  key_links:
    - from: "faq.html"
      to: "FAQPage schema"
      via: "script type=application/ld+json"
      pattern: "Question.*acceptedAnswer"
    - from: "glossary.html"
      to: "DefinedTermSet schema"
      via: "script type=application/ld+json"
      pattern: "DefinedTerm.*name.*description"
---

<objective>
Fix critical SEO issues identified in the audit: update all future dates to realistic past dates in sitemap and blog posts, and complete the schema markup for FAQ and glossary pages.

Purpose: Improve search engine trust and visibility by eliminating future-dated content and providing complete structured data for rich snippets.
Output: Updated sitemap.xml, 3 blog posts with corrected dates, faq.html with complete FAQPage schema, glossary.html with complete DefinedTermSet schema.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@sitemap.xml
@blog/gp-clinic-automation-2026.html
@blog/understanding-swpe-guide.html
@blog/healthcare-automation-roi.html
@faq.html
@glossary.html
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix future dates in sitemap and blog posts</name>
  <files>
    sitemap.xml
    blog/gp-clinic-automation-2026.html
    blog/understanding-swpe-guide.html
    blog/healthcare-automation-roi.html
  </files>
  <action>
    Update all future dates (2026-02-16, 2026-02-01, 2026-01-15, 2026-01-01) to realistic past dates from 2025:

    1. sitemap.xml: Change all 13 instances of "2026-02-16" to "2025-11-07" (date of last major update per CLAUDE.md)

    2. blog/gp-clinic-automation-2026.html: Change datePublished and dateModified from "2026-02-01" to "2025-02-01"

    3. blog/understanding-swpe-guide.html: Change datePublished and dateModified from "2026-01-15" to "2025-01-15"

    4. blog/healthcare-automation-roi.html: Change datePublished and dateModified from "2026-01-01" to "2025-01-01"

    Use Edit tool to make precise replacements. Preserve all other content exactly.
  </action>
  <verify>
    grep -n "2026-" sitemap.xml blog/*.html || echo "No 2026 dates found - SUCCESS"
    grep -n "2025-02-01" blog/gp-clinic-automation-2026.html
    grep -n "2025-01-15" blog/understanding-swpe-guide.html
    grep -n "2025-01-01" blog/healthcare-automation-roi.html
  </verify>
  <done>
    All sitemap.xml lastmod dates show 2025-11-07
    All blog post datePublished and dateModified values are from 2025
    No 2026 dates remain in any of the modified files
  </done>
</task>

<task type="auto">
  <name>Task 2: Complete FAQPage schema in faq.html</name>
  <files>faq.html</files>
  <action>
    Expand the existing FAQPage schema to include all 10 FAQ items. Currently only 3 questions have schema (RACGP compliance, implementation timeline, pricing). Add the remaining 7 questions with their answers:

    4. "How do you ensure patient data privacy?"
       Answer: "We implement industry-standard security measures including encryption at rest and in transit, secure authentication, and regular security audits. Our systems comply with Australian Privacy Principles and healthcare-specific regulations. We never share patient data with third parties."

    5. "Will my staff need extensive training?"
       Answer: "Our tools are designed to be intuitive and user-friendly. Most staff can become proficient with basic features within a few hours. We provide comprehensive training materials, video tutorials, and live support during the onboarding period."

    6. "Is there a contract or minimum commitment?"
       Answer: "Most of our solutions operate on a month-to-month basis with no long-term contracts. We believe in earning your business through results, not lock-in contracts. Enterprise solutions may have different terms based on implementation requirements."

    7. "Do your tools integrate with my Practice Management System?"
       Answer: "PMS integration is currently in our development pipeline. We're working to enable seamless integration with major Australian PMS platforms including Best Practice, Medical Director, and Zedmed, as well as HotDoc and other healthcare tools. Contact us to discuss your specific integration needs and timeline."

    8. "What happens if the system goes down?"
       Answer: "Our systems are hosted on reliable cloud infrastructure with 99.9% uptime guarantees. We have redundancy measures in place, and your data is regularly backed up. In the unlikely event of downtime, you can continue with manual processes and sync data once systems are restored."

    9. "What kind of ROI can I expect?"
       Answer: "Most clinics see ROI within 1-3 months. Typical results include 5-10 hours saved per week per GP, 40% reduction in no-shows, 60% reduction in administrative errors, and increased patient throughput. Use our ROI Calculator to estimate your specific savings."

    10. "Can I try before I buy?"
        Answer: "Yes! We offer free trials for most of our automation tools. This allows you to see the benefits firsthand before making a commitment. Contact us to set up a trial tailored to your practice's needs."

    Replace the existing FAQPage schema script (lines 53-84) with the complete version containing all 10 questions.
  </action>
  <verify>
    grep -c '"@type": "Question"' faq.html
    # Should return 10
  </verify>
  <done>
    FAQPage schema contains exactly 10 Question objects
    Each question has a corresponding acceptedAnswer
    Schema validates without JSON syntax errors
  </done>
</task>

<task type="auto">
  <name>Task 3: Complete DefinedTermSet schema in glossary.html</name>
  <files>glossary.html</files>
  <action>
    Expand the existing DefinedTermSet schema to include all 18 terms. Currently only 3 terms have schema (SWPE, PIP, WIP). Add the remaining 15 terms with their descriptions:

    4. RACGP - Royal Australian College of General Practitioners - The professional body responsible for setting standards for general practice in Australia. RACGP accreditation ensures practices meet quality and safety standards.

    5. MBS - Medicare Benefits Schedule - The list of health professional services subsidised by the Australian government. MBS item numbers determine rebate amounts for consultations, procedures, and care plans.

    6. PIP QI - Practice Incentives Program - Quality Improvement - A PIP payment stream rewarding practices for continuous quality improvement. Requires practices to submit data on clinical indicators and participate in improvement activities.

    7. MMM - Modified Monash Model - A classification system determining rural and remote status for healthcare funding. Ranges from MM1 (major cities) to MM7 (very remote), affecting WIP payments and other incentives.

    8. CDM - Chronic Disease Management - Medicare-subsidised care planning for patients with chronic conditions. Includes GP Management Plans (GPMP) and Team Care Arrangements (TCA) with MBS item numbers.

    9. PMS - Practice Management System - Software used to manage patient records, appointments, billing, and clinical workflows. Popular Australian PMS platforms include Best Practice, Medical Director, and Zedmed.

    10. ePIP - eHealth Practice Incentives Program - Payments to practices for adopting digital health technologies, including secure messaging, electronic prescriptions, and My Health Record usage.

    11. RAG - Retrieval-Augmented Generation - An AI technique combining information retrieval with text generation. In healthcare, RAG allows AI systems to provide accurate answers based on your clinic's specific documents and protocols.

    12. Workflow Automation - The use of technology to automate repetitive tasks and processes in healthcare settings. Examples include automated appointment reminders, care plan generation, and pathology result notifications.

    13. API Integration - Application Programming Interface - A connection allowing different software systems to communicate. API integrations enable your PMS to sync with automation tools, booking systems, and clinical software.

    14. RPA - Robotic Process Automation - Software bots that mimic human actions to perform repetitive digital tasks. In clinics, RPA can handle data entry, form processing, and report generation.

    15. HL7 - Health Level 7 - A set of international standards for transferring clinical and administrative data between healthcare software systems. Enables interoperability between different health IT systems.

    16. FHIR - Fast Healthcare Interoperability Resources - A modern standard for exchanging healthcare information electronically. FHIR enables seamless data sharing between apps, devices, and healthcare systems.

    17. Natural Language Processing - A branch of AI enabling computers to understand and generate human language. Used in healthcare for transcribing consultations, extracting information from clinical notes, and automated documentation.

    18. Machine Learning - AI systems that learn and improve from experience without explicit programming. In healthcare, ML predicts patient outcomes, identifies at-risk patients, and optimises appointment scheduling.

    Replace the existing DefinedTermSet schema script (lines 53-81) with the complete version containing all 18 terms.
  </action>
  <verify>
    grep -c '"@type": "DefinedTerm"' glossary.html
    # Should return 18
  </verify>
  <done>
    DefinedTermSet schema contains exactly 18 DefinedTerm objects
    Each term has both name and description properties
    Schema validates without JSON syntax errors
  </done>
</task>

</tasks>

<verification>
1. Run grep to verify no 2026 dates remain in sitemap.xml or blog files
2. Validate FAQPage schema has 10 Question entries
3. Validate DefinedTermSet schema has 18 DefinedTerm entries
4. Use JSON validator (if available) to check schema syntax
5. Verify all files still render correctly in browser
</verification>

<success_criteria>
- sitemap.xml contains only 2025 dates in lastmod fields
- All 3 blog posts have 2025 dates in datePublished and dateModified
- faq.html FAQPage schema includes all 10 questions with acceptedAnswer
- glossary.html DefinedTermSet schema includes all 18 terms with descriptions
- No JSON syntax errors in any schema markup
- All pages remain functional and visually unchanged
</success_criteria>

<output>
After completion, create `.planning/quick/6-implement-applicable-seo-enhancements-fr/6-SUMMARY.md`
</output>
