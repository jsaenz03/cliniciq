# seo Specification Deltas

## ADDED Requirements

### Requirement: Nurse-First Titles and Meta Descriptions
All page titles and meta descriptions SHALL lead with practice-nurse phrasing while retaining "GP clinic" or "general practice" as secondary keywords for continued topical relevance.

#### Scenario: Homepage title
- **GIVEN** the homepage loads
- **WHEN** the `<title>` tag is read
- **THEN** it leads with nurse-first phrasing (e.g. "AI Tools for Australian Practice Nurses")
- **AND** it retains a GP-clinic/general-practice secondary phrase

#### Scenario: Service page meta descriptions
- **GIVEN** any service page loads
- **WHEN** the meta description is read
- **THEN** it addresses practice nurses
- **AND** it keeps a secondary GP-clinic keyword phrase

#### Scenario: Structured data synced
- **GIVEN** any page with JSON-LD descriptions or FAQPage schema
- **WHEN** the schema is inspected
- **THEN** its wording is consistent with the nurse-first page copy
