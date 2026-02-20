---
phase: quick
plan: 12
type: execute
wave: 1
depends_on: []
files_modified:
  - about.html
autonomous: true
requirements:
  - Add NDIS organisation partnership mention to about page
must_haves:
  truths:
    - "About page mentions partnership with NDIS organisations"
    - "Trust signals section includes NDIS support reference"
    - "Content reinforces healthcare support services for NDIS-relevant concerns"
  artifacts:
    - path: "about.html"
      provides: "Updated founder section and trust signals with NDIS mention"
  key_links:
    - from: "founder section paragraph"
      to: "NDIS partnership mention"
      via: "text update"
    - from: "trust signals carousel"
      to: "NDIS support card"
      via: "new trust signal card"
---

<objective>
Add NDIS organisation partnership mention to the about.html page to reinforce healthcare support services offered, specifically for NDIS-relevant concerns.

Purpose: Strengthen credibility by highlighting partnerships with NDIS organisations
Output: Updated about.html with NDIS mentions in founder section and trust signals
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@about.html

The about.html page currently has:
- Founder section (line 214): "We partner with experienced nurses and IT professionals"
- Trust signals section with 3 cards: "RACGP Compliant", "Australian Based", "Nurse-Led Design"

We need to add NDIS partnership mention to show support for NDIS-relevant concerns.
</context>

<tasks>

<task type="auto">
  <name>Add NDIS partnership mention to founder section</name>
  <files>about.html</files>
  <action>
Update line 214 in the founder section to include NDIS organisation partnership mention.

Current text:
"We partner with experienced nurses and IT professionals to deliver comprehensive solutions."

Change to:
"We partner with experienced nurses, IT professionals, and NDIS organisations to deliver comprehensive solutions and support for NDIS-relevant concerns."

This extends the existing partnership mention to include NDIS organisations while maintaining the flow and tone of the content.
  </action>
  <verify>Read about.html line 214 and confirm text includes "NDIS organisations" and "NDIS-relevant concerns"</verify>
  <done>Founder section paragraph mentions partnership with NDIS organisations and support for NDIS-relevant concerns</done>
</task>

<task type="auto">
  <name>Add NDIS support trust signal card</name>
  <files>about.html</files>
  <action>
Add a fourth trust signal card to the carousel in the "Why Choose ClinicIQ" section (after line 337, before the closing </div> of carousel-track).

Add this new card:
```html
<div class="testimonial-card">
    <div class="testimonial-content">
        <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">NDIS Support</h3>
        <p>In partnership with NDIS organisations to provide tailored support and solutions for NDIS participants and providers.</p>
    </div>
</div>
```

Also update the carousel indicators (lines 344-348) to include a fourth indicator:
```html
<button class="indicator" data-slide="3" aria-label="Go to slide 4"></button>
```
  </action>
  <verify>Read about.html trust signals section and confirm: 1) Fourth trust signal card exists with "NDIS Support" heading, 2) Fourth carousel indicator button exists</verify>
  <done>Trust signals carousel includes fourth card for NDIS Support with appropriate heading and description</done>
</task>

</tasks>

<verification>
- Founder section mentions NDIS organisations partnership
- Trust signals section includes NDIS Support card
- Carousel indicators updated for 4 slides
- Content flows naturally with existing text
</verification>

<success_criteria>
- about.html contains "NDIS organisations" in founder section
- about.html contains "NDIS-relevant concerns" in founder section
- Trust signals carousel has 4 cards including "NDIS Support"
- Fourth carousel indicator button exists
- All changes maintain existing HTML structure and styling
</success_criteria>

<output>
After completion, create `.planning/quick/12-add-ndis-organisation-partnership-mentio/12-SUMMARY.md`
</output>
