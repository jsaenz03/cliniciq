---
phase: quick
plan: 10
type: execute
wave: 1
depends_on: []
files_modified:
  - about.html
  - contact.html
autonomous: true
requirements:
  - QUICK-10-01
  - QUICK-10-02
  - QUICK-10-03
  - QUICK-10-04
must_haves:
  truths:
    - Skip links and their CSS removed from both about.html and contact.html
    - Hero section padding reduced on about.html and contact.html
    - "Personal Service" card removed from about.html carousel
    - Australian spellings used throughout about.html and contact.html content
  artifacts:
    - path: "about.html"
      provides: "About page with fixes applied"
      changes:
        - "Remove skip-link HTML element (line 134)"
        - "Remove skip-link CSS in <style> block (lines 128-131)"
        - "Reduce hero padding for #about-hero"
        - "Remove Personal Service card (lines 341-346)"
        - "Update carousel indicators (remove 4th indicator)"
        - "Convert American spellings to Australian"
    - path: "contact.html"
      provides: "Contact page with fixes applied"
      changes:
        - "Remove skip-link HTML element (line 129)"
        - "Remove skip-link CSS in <style> block (lines 123-126)"
        - "Reduce hero padding for #contact-hero"
        - "Convert American spellings to Australian"
  key_links:
    - from: "about.html carousel"
      to: "3 cards only (was 4)"
      note: "Remove 4th indicator button, update carousel logic if needed"
---

<objective>
Fix four UI and content issues on about.html and contact.html: remove hidden skip buttons, reduce hero section spacing, remove the "Personal Service" card from the about page carousel, and ensure Australian spellings are used throughout.

Purpose: Clean up accessibility shortcuts that are visually hidden but present, improve page layout with better hero spacing, remove redundant content card, and maintain Australian English consistency.
Output: Updated about.html and contact.html files with all fixes applied.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@about.html
@contact.html
@styles.css
</context>

<tasks>

<task type="auto">
  <name>Fix about.html: Remove skip link, reduce hero spacing, remove Personal Service card, Australian spellings</name>
  <files>about.html</files>
  <action>
    1. Remove the skip-link CSS from the `<style>` block (lines 128-131)
    2. Remove the skip-link HTML element `<a href="#main-content" class="skip-link">Skip to main content</a>` (line 134)
    3. Add inline style or CSS to reduce hero padding for #about-hero (reduce padding-top from current value)
    4. Remove the "Personal Service" card from the carousel (lines 341-346) - the card with text "As a one-person operation, I provide direct, personalized service with a deep commitment to your success."
    5. Remove the 4th carousel indicator button (line 357) since there will only be 3 cards
    6. Convert American spellings to Australian in content text:
       - "personalized" → "personalised" (in remaining content if any)
       - Check for: behavior/behaviour, center/centre, color/colour (content), organization/organisation, specialize/specialise, analyze/analyse
    7. Update the carousel indicators container to only have 3 buttons
  </action>
  <verify>
    - Open about.html in browser
    - No skip link visible when tabbing or inspecting
    - Hero section has reduced vertical spacing
    - "Why Choose ClinicIQ" carousel shows only 3 cards (RACGP Compliant, Australian Based, Nurse-Led Design)
    - Carousel navigation shows only 3 indicators
    - Australian spellings used in content
  </verify>
  <done>
    - Skip link CSS and HTML removed
    - Hero padding reduced
    - Personal Service card removed, carousel has 3 cards only
    - 4th carousel indicator removed
    - Australian spellings applied
  </done>
</task>

<task type="auto">
  <name>Fix contact.html: Remove skip link, reduce hero spacing, Australian spellings</name>
  <files>contact.html</files>
  <action>
    1. Remove the skip-link CSS from the `<style>` block (lines 123-126)
    2. Remove the skip-link HTML element `<a href="#main-content" class="skip-link">Skip to main content</a>` (line 129)
    3. Add inline style or CSS to reduce hero padding for #contact-hero (reduce padding-top from current value)
    4. Convert American spellings to Australian in content text if any found
  </action>
  <verify>
    - Open contact.html in browser
    - No skip link visible when tabbing or inspecting
    - Hero section has reduced vertical spacing
    - Australian spellings used in content
  </verify>
  <done>
    - Skip link CSS and HTML removed
    - Hero padding reduced
    - Australian spellings applied
  </done>
</task>

</tasks>

<verification>
- Both pages load without errors
- Skip links completely removed (no HTML element, no CSS)
- Hero sections display with reduced spacing
- about.html carousel functions with 3 cards
- Australian English spellings used consistently
</verification>

<success_criteria>
- about.html: Skip link removed, hero spacing reduced, Personal Service card removed, Australian spellings applied
- contact.html: Skip link removed, hero spacing reduced, Australian spellings applied
- Both pages render correctly in browser
</success_criteria>

<output>
After completion, create `.planning/quick/10-fix-skip-buttons-hero-spacing-remove-per/10-SUMMARY.md`
</output>
