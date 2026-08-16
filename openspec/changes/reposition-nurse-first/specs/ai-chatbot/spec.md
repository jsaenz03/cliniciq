# ai-chatbot Specification Deltas

## ADDED Requirements

### Requirement: Nurse-First Discovery Conversation
The chatbot backend SHALL conduct its 5-question discovery conversation targeting Australian practice nurses, with the same structured output contract (output/status/answers q1–q5/metadata) as the prior business-oriented flow.

#### Scenario: Discovery questions target the nurse
- **WHEN** a user starts a chat conversation
- **THEN** Question 1 asks about the user's role and clinic (practice-nurse framing)
- **AND** Questions 2–5 ask about a typical shift, bottlenecks (care plans, recalls, stock, documentation), systems used (PMS/Best Practice/HotDoc/spreadsheets) and desired outcomes for their shifts

#### Scenario: Self-serve angle in chat
- **WHEN** a user asks about pricing during discovery
- **THEN** the agent answers with the self-serve framing: every tool has a free tier, Pro is $9.99–$19.99/month per tool, month-to-month, no practice sign-off needed

#### Scenario: Output contract unchanged
- **WHEN** the agent replies
- **THEN** it returns the same JSON structure (output, status, answers q1–q5, metadata) the recorder, data table and email nodes consume

### Requirement: Nurse-First Chat Emails
The review and thank-you emails produced at the end of a chat conversation SHALL use nurse-first labels and copy.

#### Scenario: Review email to the owner
- **WHEN** a conversation finishes and the review email is sent
- **THEN** the answer sections are labelled "Role & Clinic" and "A Typical Shift" (not "Business Overview"/"Daily Workflow")
- **AND** the suggested next step references AI overlays taking admin off shifts (not "queue management")

#### Scenario: Thank-you email to the user
- **WHEN** a conversation finishes
- **THEN** the thank-you email references the user's role and shift
- **AND** mentions tools that can be started free with no practice sign-off
- **AND** is signed by John Saenz, Registered Nurse & Founder

### Requirement: Dedicated Nurse Chat Workflow
The nurse-first chat flow SHALL live in a dedicated n8n workflow (webhook path `cliniciqnursechat`) separate from the legacy mixed workflow, which continues to serve the contact-form and newsletter webhooks unchanged until the site is repointed.

#### Scenario: New workflow created and active
- **WHEN** the workflow list is checked
- **THEN** a workflow named "ClinicIQ Chat — Nurse Discovery" exists and is active
- **AND** its webhook path is `cliniciqnursechat`

#### Scenario: Legacy workflow untouched
- **WHEN** the legacy workflow is inspected
- **THEN** its nodes and connections are unmodified
- **AND** its `cliniciqemail` and `cliniciqsubs` webhooks remain active
