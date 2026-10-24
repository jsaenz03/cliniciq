# ClinicIQ Solutions — Full Site Audit (SEO/AEO/GEO · UX/UI · Responsive)

**Date:** 24/10/2026 · **Audited:** local working tree served at `http://localhost:8899` (includes uncommitted changes ahead of the pending manual Netlify publish — live site is stale and was NOT audited)
**Method:** 3 parallel audit agents (SEO/AEO/GEO · UX/UI consistency + WCAG · Playwright responsive sweep: 17 pages × 7 viewports + spot-checks = 131 loads, 135 screenshots) + squirrelscan v0.0.38 (homepage sample).
**Raw artefacts:** screenshots `/tmp/cliniciq-audit/shots/`, sweep data `/tmp/cliniciq-audit/results.json`, squirrel report `/tmp/cliniciq-audit/squirrel-report.txt`.
**Nothing was changed in the repo** — read-only audit.

---

## Executive summary

- **Responsive: solid.** 130/131 page×viewport loads with zero horizontal overflow (320px → 2560px), grids collapse correctly, no 404 assets, mobile nav opens/closes reliably. No responsive P0s.
- **SEO/AEO foundations: strong.** Unique titles/descriptions, self-referencing HTTPS canonicals, full OG/Twitter, one H1 per page, valid JSON-LD sitewide, complete sitemap, author E-E-A-T on all 14 posts. The gaps are schema-truth mismatches on the homepage, stale sitemap `lastmod`, llms.txt not covering the newer content, and no 404 page.
- **UX/UI + accessibility: the weak spot.** The site runs on a committed **blue** token system that contradicts AGENTS.md's green/gold/cream spec (note: the shield logo IS blue #60ADDA/#1C4872, so the docs may be the stale side — owner decision). Worse, several **primary interactions are hover-only** (automations portfolio CTAs, the Services dropdown) and several control elements are `<div>`s (hamburger, chat toggle) — keyboard and touch users lose the main navigation and the entire conversion path on automations.html. Computed contrast fails on the sitewide primary button (2.76:1), demo button, gold links and all focus rings.

**Counts: P0 = 1 · P1 = 9 · P2 = 22 · P3 = ~20.**

---

## P0 — fix before publish

1. **automations.html app CTAs are hover-only** — `.portfolio-overlay { opacity:0; visibility:hidden }` revealed solely by `.portfolio-item:hover` (`styles.css:3561,3576`). No `:focus-within`, no `(hover:none)` fallback, no tap handler. All 9 cards' Access/Details buttons (`automations.html:818-856`) — the page's entire conversion path — are unreachable on touch and keyboard. Fix: add `.portfolio-item:focus-within .portfolio-overlay` + a `(hover:none)` always-visible/tap-toggle rule. (Pattern exists already: `.video-play-overlay` at `styles.css:1012-1027`.)

## P1 — significant

**Navigation / interaction (keyboard + touch)**
2. **Services dropdown is hover-CSS-only sitewide** — trigger `<a href="#" role="button" aria-haspopup="true" onclick="return false;">` with no `aria-expanded`, no `:focus-within`, zero JS handling (`styles.css:627-632`; e.g. `index.html:349`). Verified live: tapping Services in the open mobile menu does nothing → Automations/Calculators/Downloads/Websites unreachable from nav on mobile; Enter does nothing for keyboard users. Fix: JS click/Enter toggle + `aria-expanded` + `:focus-within` CSS.
3. **Hamburger is a `<div>`** (all pages, e.g. `index.html:404`) — not focusable, so keyboard users cannot open the mobile menu at all (the in-menu focus trap/Esc are good but unreachable). Fix: `<button aria-label="Menu" aria-expanded="false" aria-controls="nav-menu">`.
4. **Chat toggle is a `<div>`** on 34 pages (e.g. `contact.html:458`) — the site's support channel is keyboard-inaccessible; `chat-close` lacks `aria-label` too. Fix: real `<button>`s.
5. **Cookie banner blocks the chat launcher on mobile** (`cookie-consent.js`; banner 316px tall at 375, z-index 9999, `elementFromPoint` at the chat button's centre returns the banner) — taps hit the banner on all pages at 320/375/430. Fix: shrink banner on small screens / lift chat toggle / offset until consent resolved.

**Accessibility (computed)**
6. **Contrast failures** — white on `.btn-primary` #7ea0b7 (**2.76:1**, the sitewide "Get Started" nav CTA); white on `.btn-demo` gold (**2.34:1**); gold link #C4A661 on #FAFBFD (**2.26:1**); footer headings #7ea0b7 on #36494e (**3.42:1**); white on success #10b981 (**2.54:1**) / error #ef4444 (**3.76:1**) form messages; **all focus-ring colours < 3:1** (WCAG 1.4.11) — incl. script.js injecting a ring using the *undefined* token `--secondary-gold`. Full table below. Fix: one token pass — white on brand green = 9.76:1 if the palette moves to green.
7. **Skip link missing on 18 root pages** (only index has it; blog/downloads pages use a different inline-styled variant). Fix: shared skip link everywhere, one class.

**Functional**
8. **Booking embed CORS failure** — `booking.html` health-check fetch to `https://johnsaenz.au/booking/api/health` is blocked by CORS in-browser → script hides the iframe and shows the fallback. If the production API doesn't send `Access-Control-Allow-Origin: https://cliniciq.com.au`, phone/desktop users get the fallback instead of the booking flow. Verify server-side.
9. **Brand-name misspelling: "NursEpod" ×19** — `index.html` ×10 (incl. JSON-LD at line 224), `privacy-policy.html` ×5, `terms-of-service.html` ×4; plus "DocSert" ×1 (`index.html:478`). Everywhere else: Nursepod/Docsert. Fix: sitewide rename sweep (schema + visible copy + aria).

**SEO**
10. **Homepage schema-truth mismatches** — `index.html:217` FAQPage declares 5 Q&As visible nowhere on the page (violates Google's content-visibility rule); `index.html:149` WebSite `SearchAction` targets `?q=` which no input or JS implements. Fix: render the 5 Q&As on-page or delete the node; remove the SearchAction.

## P2 — should fix

**Design system**
11. **Palette split (owner decision):** `styles.css:1-35` declares "Committed Color Strategy — Uranian Blue carries the brand" (#7ea0b7/#36494e, background #FAFBFD) while AGENTS.md specifies green #2C4A3C / gold #C4A661 / cream #F5F1E6; green/gold survive as ~14 stray rules. The shield logo is blue (#60ADDA/#1C4872), so either the docs are stale or the site diverged. Decide direction, then rewire tokens + AGENTS.md in one pass (this simultaneously fixes finding 6).
12. **Fonts contradict spec and themselves:** self-hosted Ubuntu/Ubuntu Mono everywhere vs AGENTS.md Inter + Playfair; index additionally loads Montserrat:800; booking.html and calculators.html reference Montserrat/Playfair **without loading them** (silent fallbacks). Pick one stack, purge dead references.
13. **styles.css is 177 KB / 8,785 lines** with 51 distinct hex colours in near-duplicate clusters (9 near-whites, 3 reds, 4 golds…) and three competing focus-visible systems, one referencing an undefined token. Consolidate while rewiring tokens.
14. `cursor: default !important` on all interactive elements (`styles.css:188-217`) removes the pointer affordance sitewide.
15. `.hero-side-video` not disabled under `prefers-reduced-motion` (only `.hero-video` is; `index.html:468-483`).

**Cross-page coherence**
16. **All 14 blog post footers omit Privacy/Terms links** (footer-bottom = © line only).
17. **Six nav variants across 34 pages** (legal pages carry an older nav; downloads subpages duplicate Contact/Get Started; booking's CTA is "Book a Call"→#booking; websites dropdown subtitle differs on booking).
18. **CTA label sprawl:** 40+ labels; "Start Free/Book a Demo" exists only on index; same intent maps to 4 labels × 3 destinations; contact page footer links *away* to `index.html#contact`. Lock a 4-label vocabulary.
19. Footer duplicates (Product Suite + All Services both → automations.html; Contact twice); "Sources & Methodology" footer link on only 2 pages.

**Copy**
20. **US spellings:** automations ("standardization", "visualization"), about ("realization"), index ("behavior"), excel post ("specialized", "summarizing"), SWPE post + websites.html mix AU/US on the same page. Contact hours use "9:00 AM - 6:00 PM" (12-hour US style).

**SEO/AEO**
21. **No 404.html** — Netlify default unbranded 404; soft-404 signal.
22. **Heading skips H1→H3 on 7 pages:** automations, booking, calculators, contact, faq, glossary, websites.
23. **12 of 14 blog posts cite no sources; none link to sources-methodology.html** (only MBS + cold-chain posts do). Weakest GEO factor on exactly the pages you want cited.
24. **llms.txt / llms-full.txt stale vs post-08/10 reality:** no blog posts (incl. the five 23/10 pairing posts), no product pages, booking, downloads hubs or sources-methodology listed. All existing links resolve ✓.
25. **sitemap.xml `lastmod` stale** (03/10–16/08) vs files modified up to 24/10. Regenerate before publish.
26. **_redirects: 29 duplicate source rules remain** (trailing-slash block repeated verbatim bottom vs top; first-match-wins so behaviour is fine, but the dedupe didn't land). Drop the duplicated block + the no-op `sitemap.xml → 200` self-rules.
27. **automations.html SoftwareApplication `price: "0"`** with no free-tier qualifier (lines 157/177/197) while visible copy says Pro $29–$39/mo — AI agents may quote the tools as free. Copy ciqventory's `offers.description` pattern.
28. **BlogPosting missing `url`/`mainEntityOfPage`** on all 14 posts; 5 use the generic logo instead of their topical image.
29. **robots.txt:** explicitly allow OAI-SearchBot, Claude-SearchBot, Claude-User, Perplexity-User, Applebot (currently implicit); make a documented call on Bytespider (currently implicitly allowed); remove the `Disallow: /chrome-diagnostics.html` pointing at a nonexistent file.
30. **llms.txt claims "12 hours per week / 50+ practices"** — no page on the site corroborates it. Surface (hedged) or soften.
31. **contact.html form:** `label for="contact-message"` matches no input (textarea id is `contact-message-field`; the id is reused by the status div); no `autocomplete` attrs; `.form-message` has no `role="status"`/`aria-live` and the JS error-focus is a no-op → SR users get silent failures.
32. **Sub-12px text** (worst: hero tagline 10.4px, banner fine print 9.6px, practice badges 11px, price labels 11.2px, camog eyebrow 11.5px) + chat privacy note 0.72rem.
33. **Footer legal tap targets 29×16px** on mobile (site's own convention is 44px).
34. **downloads.cliniciq.com.au links to dev-artefact names** (`cliker.html`, `cliker2.html`, `sumary.rtf` — automations.html:523, downloads.html:507-523). Live but unprofessional; consider renamed copies + 301s.
35. **squirrel finds:** aria-label/visible-text mismatch ×2 on index ("watch the demo" vs "watch the nursepod demo…" — WCAG 2.5.3); `netlify.toml` header globs lack leading slashes and omit HSTS (align with `_headers` or drop).

## P3 — nits (abbreviated)

- Hamburger 41×43px (3px shy of 44); nursepod-icon.webp squashed 18% on index@320 (`object-fit: fill`); hero video missing `poster`; `honorificSuffix: "Golden Key Society Member"` misused in Person schema; VideoObject lacks `duration`/`contentUrl`, `-07:00` TZ offset; no visible "Last updated" distinct from publish date; index H1 is brandy not keyword-bearing (title/OG carry keywords); legacy `meta keywords`; emoji used as icons on downloads pages vs SVG elsewhere; `aria-hidden="true"` on the real tagline (index:446); exit scroll animations re-hide content (blank bands in full-page captures — analytics under-recording; consider dropping `exitAnimation`); orphan `scripts/accreditation-checklist/checklist.html` with no meta/noindex; scripts/accreditation checklist not linked; "9:00 AM" style hours; Get Started CTA hidden in mobile nav (deliberate?); `.nav-cta` pill override; `.practice-cta` duplicate of `.btn-primary`.

## Squirrelscan caveats

Homepage-only sample (1 page crawled), over plain HTTP on localhost, so its overall 48/F score and several "errors" are environmental false positives: "not HTTPS", "sitemap URLs point to a different domain", "no compression", "no datePublished" (blog posts have them), "no privacy policy" (it exists). Genuinely useful additions folded into P2/P3 above (CSS size, label mismatch, netlify.toml drift, missing video poster/captions).

---

## Contrast table (computed, WCAG 2.1)

| Pair | Ratio | Verdict |
|---|---|---|
| Body #1a1d20 on light backgrounds | 15.3–16.8:1 | Pass |
| Secondary #36494e / muted #597081 on light | 8.56 / 4.68–5.00:1 | Pass |
| White on brand green #2C4A3C | 9.76:1 | Pass |
| White on hero/navy button #36494e | 9.46:1 | Pass |
| **White on `.btn-primary` #7ea0b7** | **2.76:1** | **Fail** |
| **White on `.btn-demo` gold** | **2.34:1** | **Fail** |
| **Gold #C4A661 link on #FAFBFD** | **2.26:1** | **Fail** |
| **Footer headings #7ea0b7 on #36494e** | **3.42:1** | **Fail (normal size)** |
| **White on success #10b981 / error #ef4444** | **2.54 / 3.76:1** | **Fail** |
| **Focus rings (gold or blue) on page** | **2.26 / 2.67:1** | **Fail 1.4.11 (needs 3:1)** |

## Responsive sweep summary

- Overflow: 130/131 clean, 320→2560px. Sole transient: nursepod logo rendered at natural 1600px during load at 1280 (self-resolves; logo img lacks width/height attrs — add them).
- Mobile nav (375): opens/closes via tap, outside-tap and Esc; focus trap works; all links in-viewport; `aria-expanded` toggled. Services submenu untouchable (P1 #2).
- Zero ≥400 asset responses; only booking's CORS errors (P1 #8).
- Grids collapse 1-col on phones; no upscaled images; body text 16px+ everywhere; header never covers H1/forms; hero video plays on mobile with mobile-specific source.
- Screenshots: `/tmp/cliniciq-audit/shots/` (e.g. `index-375.jpg`, `nav-index-375.png`, `nursepod-1440.jpg`).

## Already good (don't re-fix)

Unique titles/descriptions + self-canonicals + full OG/Twitter sitewide; valid JSON-LD everywhere; ABN 55 882 511 758 / admin@cliniciq.com.au / Wollongong NSW 2500 identical across pages, schema and llms.txt; faq.html FAQPage matches its 14 visible questions; all 14 posts have byline (John Saenz, RN & Founder), AU dates, valid schema dates; product pages open with extractable 43–54-word definitions + pricing tables + matching FAQPage; sitemap complete (35/35, no pilot.html); pilot→booking 301s in place; alt text genuinely descriptive (104/106); `lang="en-AU"` + one H1 per page; no positive tabindex; no placeholder copy; responsive layout is clean at every tested width.

## Suggested fix order

1. P0 #1 (automations overlay) + P1 #2/#3/#4 (dropdown/hamburger/chat semantics) — one interaction-pass.
2. Palette decision (#11) → single token rewire fixes contrast (#6) and shrinks CSS (#13).
3. Cookie banner + skip links + blog footer legal links.
4. Pre-publish SEO batch: 404.html, sitemap lastmod, llms.txt refresh, homepage schema fixes, NursEpod sweep, _redirects dedupe, sources on blog posts.
5. Verify booking CORS in production.
