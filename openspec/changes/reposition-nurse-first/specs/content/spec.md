# content Specification Deltas

## ADDED Requirements

### Requirement: Nurse-First Buyer Address
The homepage and primary conversion pages SHALL address the individual practice nurse as the buyer, not the practice as an organisation. References to "your practice" as a workplace remain acceptable; references addressing the practice as the decision-maker SHALL be reworded.

#### Scenario: Homepage hero addresses the nurse
- **GIVEN** the homepage loads
- **WHEN** the hero subtitle is read
- **THEN** it names Australian practice nurses as the audience
- **AND** the H1 markup and tagline remain unchanged

#### Scenario: How We Help problems in nurse voice
- **GIVEN** the "How We Help" section is viewed
- **WHEN** the six problem descriptions are read
- **THEN** they are written in second-person nurse voice (the nurse's shift, the nurse's mental load)
- **AND** solution boxes keep product names and honest impact/disclaimer language

#### Scenario: Self-serve call to action
- **GIVEN** any product pricing is displayed
- **WHEN** the offer is read
- **THEN** it communicates free-to-start with Pro pricing visible; the "no practice sign-off" framing appears in page copy (intro, FAQ) rather than price badges

### Requirement: Nurse-Specific FAQ Coverage
The FAQ page SHALL answer questions specific to a nurse adopting the tools individually.

#### Scenario: FAQ covers practice approval
- **GIVEN** the FAQ page is viewed
- **WHEN** the questions are read
- **THEN** at least 1 question addresses whether practice-manager approval is needed to start

#### Scenario: FAQ covers documentation safety
- **GIVEN** the FAQ page is viewed
- **WHEN** the questions are read
- **THEN** at least 1 question addresses clinical documentation safety and reinforces clinician review requirements

#### Scenario: FAQ covers personal accounts
- **GIVEN** the FAQ page is viewed
- **WHEN** the questions are read
- **THEN** at least 1 question addresses using a personal account and expensing Pro later

## MODIFIED Requirements

### Requirement: Product Feature Documentation
Each automation product SHALL have documented features and nurse-relevant use cases.

#### Scenario: NursePod features
- **GIVEN** the NursePod product card is viewed
- **WHEN** the features section is read
- **THEN** it lists 3-5 specific features like smart task prioritization and patient monitoring

#### Scenario: Product use cases
- **GIVEN** any product card is viewed
- **WHEN** the "Perfect For" section is read
- **THEN** it identifies nurse-shift use cases (the nurse's workflows) rather than practice-level outcomes
