---
phase: quick
plan: 10
subsystem: UI/Content
key-decisions:
  - Removed skip links from about.html and contact.html (hidden accessibility shortcuts)
  - Reduced hero section padding from 80px to 40px on both pages for better layout
  - Removed "Personal Service" card from about.html carousel (now 3 cards)
  - Updated carousel indicators to show only 3 buttons
  - Applied Australian spelling (personalised) in contact.html
requires: []
provides:
  - about.html with skip link removed, reduced hero spacing, 3-card carousel
  - contact.html with skip link removed, reduced hero spacing, Australian spelling
affects:
  - about.html
  - contact.html
tech-stack:
  added: []
  patterns:
    - Inline style for hero padding override
metrics:
  duration: 5 minutes
  completed: 2026-02-19
  tasks: 2
  files_modified: 2
---

# Phase Quick Plan 10: Fix Skip Buttons, Hero Spacing, Remove Personal Service Card Summary

**One-liner:** Removed hidden skip links, reduced hero padding, removed redundant carousel card, and applied Australian spellings to about.html and contact.html.

## What Was Built

### Changes to about.html
- **Removed skip-link CSS** (lines 128-131) - Hidden accessibility shortcut styles
- **Removed skip-link HTML element** (line 134) - "Skip to main content" link
- **Reduced hero padding** - Added inline style `padding-top: 40px` to #about-hero (was 80px)
- **Removed "Personal Service" card** (lines 341-346) - Fourth carousel card with text about one-person operation
- **Updated carousel indicators** - Removed 4th indicator button, now shows 3 indicators for 3 cards

### Changes to contact.html
- **Removed skip-link CSS** (lines 123-126) - Hidden accessibility shortcut styles
- **Removed skip-link HTML element** (line 129) - "Skip to main content" link
- **Reduced hero padding** - Added inline style `padding-top: 40px` to #contact-hero (was 80px)
- **Australian spelling fix** - Changed "personalized" to "personalised" in services section

## Implementation Details

### Hero Padding Reduction
Both pages now use inline styles to override the default 80px padding-top:
```html
<section class="hero" id="about-hero" style="padding-top: 40px;">
<section class="hero" id="contact-hero" style="padding-top: 40px;">
```

### Carousel Update (about.html)
The "Why Choose ClinicIQ" carousel now displays 3 cards instead of 4:
1. RACGP Compliant
2. Australian Based
3. Nurse-Led Design

(Removed: Personal Service card)

## Commits

| Hash | Message | Files |
|------|---------|-------|
| 73b708a | fix(quick-10): remove skip link, reduce hero spacing, remove Personal Service card from about.html | about.html |
| e32db75 | fix(quick-10): remove skip link, reduce hero spacing, fix Australian spelling in contact.html | contact.html |

## Verification

- [x] about.html loads without errors
- [x] contact.html loads without errors
- [x] No skip link visible when inspecting either page
- [x] Hero sections display with reduced spacing (40px padding-top)
- [x] about.html carousel shows only 3 cards
- [x] Carousel navigation shows only 3 indicators
- [x] Australian spelling used in contact.html ("personalised")

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] about.html exists and has been modified
- [x] contact.html exists and has been modified
- [x] Skip links removed from both files
- [x] Hero padding reduced on both pages
- [x] Personal Service card removed from carousel
- [x] Australian spelling applied
- [x] Both commits created successfully
