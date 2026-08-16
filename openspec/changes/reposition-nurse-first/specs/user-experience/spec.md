# user-experience Specification Deltas

## ADDED Requirements

### Requirement: Self-Serve Onboarding Messaging
The site SHALL communicate that a nurse can start using the free tools immediately, without practice approval, with Pro upgrades available later.

#### Scenario: Product card self-serve line
- **GIVEN** a product card with pricing is viewed on the automations page
- **WHEN** the offer line is read
- **THEN** it states free-to-start with the Pro monthly price; the "no practice sign-off" message lives in page copy (intro, FAQ), not the price badge

#### Scenario: Contact form nurse-framed helpers
- **GIVEN** the contact form is viewed
- **WHEN** the field helpers and message prompt are read
- **THEN** they are phrased for a nurse describing workflow problems (e.g. "what's eating your shift")
- **AND** the clinic/workplace field is clearly marked optional

#### Scenario: Team expansion path visible
- **GIVEN** nurse-first messaging is read anywhere on the site
- **WHEN** the secondary angle is encountered
- **THEN** it suggests proving the tools first and sharing with the team, without switching the buyer address back to the practice
