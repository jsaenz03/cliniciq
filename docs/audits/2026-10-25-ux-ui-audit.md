# UX/UI Audit — 25 October 2026

**Method**: Rendered-page inspection (design-taste-frontend `inspect.mjs` at 1440/768/390; before/after in `.taste-skill/before|after/`), CSS/JS motion scan (transitions-polish review), interaction probes (Playwright/Chrome), ui-ux-pro-max priority checklist, impeccable critique pass.

**Outcome**: audience retarget applied + all approved fixes implemented and probe-verified same day. Inspector delta 14 FAIL / 7 WARN → 12 FAIL / 6 WARN, where the remaining findings are brand devices (see "Left as-is").

---

## Audience retarget (applied, owner-approved)

| File:Line | Before | After |
|---|---|---|
| index.html:722 | Built for Australian Practice Nursing | **Built for Australian GP Practice** |
| index.html:723 | Overlays designed around real nursing workflows | Overlays designed around real practice workflows |
| index.html:776 | Nurse Insights | **Practice Insights** |
| index.html:777 | Practical insights for your practice-nursing shift | Operational insights from real practice shifts |
| contact.html:384 | guides built for practice nursing workflows | guides built for GP practice workflows |

"Why Practice Insights": shorter H2, same keyword coverage ("practice" + "insights"); "operational" qualifies in the subtitle. Kept deliberately: hero tagline "For Australian GP Practice & Nurse Managers" (dual buyer), nurse provenance lines, JSON-LD `knowsAbout: "Practice Nursing"` (E-E-A-T), Nursepod product copy, YouTube video titles. No titles/meta/OG/schema touched.

Per owner decision 25/10: the four "…for Practice Nurses" SEO titles (blog, downloads, glossary, calculators) **stay as-is** — that content serves the nurse resource layer and nurse keywords are winnable.

---

## Fixes applied 25/10 (all probe-verified)

1. **Cookie banner → slim full-width bottom bar** (cookie-consent.js injected CSS). Was a 640px floating panel covering hero trust badges/CTAs on first visit. Probe: `left/right/bottom = 0`, flex row on desktop, stacked on mobile (font bumped 12.8→14px in the ≤480 query). Side effect: the old banner's text was what overhung the newsletter at 390px — overhang now measures zero.
2. **Capabilities carousel → all four cards visible on desktop** (script.js `TestimonialsCarousel` slidesPerView 3→4 + styles.css card flex 33.3%→25% + controls hidden ≥1025px). totalSlides=1 disables autoplay by its existing guard (probe: transform still `none` after 7s on-section) and auto-disables arrows; carousel/swipe still works ≤1024px.
3. **Card body text un-italicised** (styles.css `.testimonial-content p`).
4. **Reading sizes**: body 16px at 1440 (was 15); `.ps-description` 17px desktop / 16px ≤1024 (was 16/15); `.ps-solution-box p` 16px desktop / 15px mobile (was 15/14); all 29 `0.75rem` labels → `0.8125rem` (13px floor); chat privacy notice 11.5px → 13px (index.html inline style). Sub-13px text blocks on the homepage: 12 → 1.
5. **Mobile H1** 1.6rem → 2.125rem (34px at 390px, still two lines — probe-verified).
6. **Skip-link contrast**: background `--primary-blue` (2.8:1 with white) → `--primary-navy` (~10:1).
7. **Hero background video poster**: extracted first frame → `photos/hero/hero-bg-desktop-poster.webp` (14KB) + `poster=` on the hero `<video>`. Kills the first-paint gradient flash.

## Corrected findings — verified NOT defects (no change made)

- **"Long-pin 6 screens" / "covered text"**: the hero cover-stack is pure CSS sticky scoped to hero + next section; the opaque sheet fully covers the hero after ~1.15 screens of scroll. The inspector tracks the sticky element's box, not its visibility. Signature interaction left intact.
- **"1212px blank gap" in Contact**: Playwright probe shows the section renders fully (opacity 1, all text) — headless capture artefact.
- **"Reduced-motion hides 10 blocks"**: the mega-dropdown items, hidden by design until opened.
- **"Newsletter overhang −29px at 390"**: was the old floating cookie banner; gone after fix #1.

## Left as-is (owner brand calls / known items)

- Inspector house-rule FAILs that are brand devices: Ubuntu Mono headings, hero gradient words, shadows-at-rest, hairlines, outlined boxes, "The Problem" eyebrow labels, uppercase micro-labels. Taste-skill-opinionated; changing them is a restyle, not a fix.
- "Never lose a wound photo in the camera roll again" wraps 3 lines at 390px — shortening is a product-copy call.
- Motion-token consolidation (3–4 durations/easings) and type-scale collapse (13 sizes → ~6): available as a follow-up consistency pass on request.
- Palette drift (live slate-blue vs AGENTS.md green/gold), CTA vocab ("Get Started" vs "Start Free"), chat widget AI disclosure, YouTube thumbnail art — pre-existing owner items.

## Files touched this session

`index.html` (retarget ×2 blocks, poster attr, chat notice size) · `contact.html` (blurb) · `styles.css` (carousel grid + controls, italic, text sizes ×4, skip link, mobile H1, 13px floor) · `script.js` (slidesPerView ×2) · `cookie-consent.js` (banner bar CSS) · `photos/hero/hero-bg-desktop-poster.webp` (new) · this audit.

**Go-live**: all changes local and uncommitted; live site unaffected until the next manual Netlify publish.
