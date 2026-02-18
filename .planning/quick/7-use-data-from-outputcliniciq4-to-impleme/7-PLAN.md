---
phase: quick
plan: 7
type: auto
autonomous: true
wave: 1
depends_on: []
---

# Quick Task 7: Use data from outputcliniciq4 to implement high-impact SEO and accessibility fixes

## Objective
Implement high-impact fixes from the squirrelscan audit report to improve SEO, accessibility, and performance scores.

## Context
- Audit data: @~/skills/outputcliniciq4/audit-report.md
- Current health score: 66/100 (D)
- Key issues to fix:
  - Meta tags in body (35 tags on index.html)
  - Missing H1 tags on 8 pages
  - Viewport zoom disabled (accessibility issue)
  - Images missing width/height attributes (CLS)
  - Buttons without accessible names
  - Form inputs without labels
  - No main landmark on 22 pages
  - Missing Open Graph tags on downloads subpages

## Tasks

### Task 1: Fix viewport meta tag to enable zoom (Accessibility)
**Type:** auto
**File:** index.html
**Issue:** Viewport has user-scalable=no and maximum-scale=1.0 which disables zoom
**Fix:** Remove user-scalable and maximum-scale restrictions

### Task 2: Fix meta tags in body (SEO)
**Type:** auto
**File:** index.html
**Issue:** 35 meta tags incorrectly placed in body
**Fix:** Move all meta tags from body to head section

### Task 3: Add H1 tags to service pages (SEO)
**Type:** auto
**Files:** automations.html, calculators.html, downloads.html, websites.html
**Issue:** Pages missing H1 tags
**Fix:** Add descriptive H1 tags to each page

### Task 4: Add Open Graph and Twitter Card meta tags to downloads subpages (SEO)
**Type:** auto
**Files:** downloads/checklists.html, downloads/templates.html
**Issue:** Missing og:title, og:description, og:image, twitter:card
**Fix:** Add complete Open Graph and Twitter Card meta tags

### Task 5: Add width/height attributes to images (Performance)
**Type:** auto
**Files:** automations.html, websites.html
**Issue:** Images missing dimensions causing CLS
**Fix:** Add width and height attributes to all images

### Task 6: Add accessible names to buttons (Accessibility)
**Type:** auto
**Files:** All pages with chat widget
**Issue:** chat-send button and submit buttons lack accessible names
**Fix:** Add aria-label attributes

### Task 7: Add labels to calculator form inputs (Accessibility)
**Type:** auto
**File:** calculators.html
**Issue:** 16 input fields without labels
**Fix:** Add aria-label attributes to all calculator inputs

### Task 8: Add main landmark to all pages (Accessibility)
**Type:** auto
**Files:** All HTML pages
**Issue:** No main landmark found on 22 pages
**Fix:** Wrap main content in <main> element or add role="main"

### Task 9: Fix meta description length (SEO)
**Type:** auto
**File:** blog/understanding-swpe-guide.html
**Issue:** Description too long (166 chars)
**Fix:** Shorten to under 160 characters

## Verification
- Run validation to confirm fixes
- Check accessibility with keyboard navigation
- Verify no visual regressions

## Success Criteria
- [ ] Viewport allows zooming
- [ ] No meta tags in body
- [ ] All service pages have H1 tags
- [ ] Downloads subpages have complete Open Graph tags
- [ ] Images have width/height attributes
- [ ] All buttons have accessible names
- [ ] Calculator inputs have labels
- [ ] All pages have main landmark
- [ ] Meta descriptions under 160 characters
