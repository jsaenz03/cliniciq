# Trust & Credibility Audit — ClinicIQ Solutions

**Date**: 2026-08-29
**Brief**: The brand reads as "too strong" for a starter operation and isn't converting. Reposition honestly as a new operation that is currently onboarding **pilot GP practices** (practices that run the apps on real workflows), and tighten trust signals throughout.
**Scope**: index, automations, about, contact, faq, styles.css, PRODUCT.md. Regression gate: `python3 docs/check-repositioning.py`.

---

## 1. What already earns trust (do not touch)

| Signal | Where |
|---|---|
| Real founder, photo, RN credentials (5+ yrs GP), Victoria University degree | about.html |
| Founded 2025 — an honesty anchor | about.html highlights |
| No fabricated testimonials ("capabilities" carousel instead, explicitly non-endorsement) | index.html |
| Plain-spoken disclaimers (RACGP accreditation not conferred by software; clinician review required; non-PHI by design) | index, automations, faq |
| Real ABN (55 882 511 758), Wollongong address, admin@cliniciq.com.au | contact.html |
| Free tier on every tool, month-to-month Pro, no lock-in | automations, faq |
| Sources & methodology page | sources-methodology.html |
| Privacy policy, terms, cookie consent | sitewide |

## 2. Why it was reading "too strong" (findings)

**F1 — A 12-product façade with no stage honesty.** automations.html presented 4 priced tools plus a 9-item project gallery at equal polish. Only 2 cards carried a WIP tag and one a Deprecated tag; everything else read "Ready". To a skeptical nurse or practice manager, a one-person operation claiming a 12-tool suite is a credibility *negative* — it reads as vaporware, not capability.

**F2 — Mature-SaaS calls-to-action with zero client proof.** "Get Started", "Start Free Today" and "Get Started" buttons assume an established product. There were no clients, no case studies, no numbers — the confident packaging and the empty proof shelf contradicted each other. Visitors notice the contradiction before they notice the product.

**F3 — Team inflation on the About page.** "We're a small, close-knit team, and we partner with experienced nurses, IT professionals, and NDIS organisations to deliver comprehensive solutions" — vague partnership claims that dilute the strongest real asset: one accountable RN founder you deal with directly. Also "Empowering GP clinics…" and "…help nurses, GP clinics, and small businesses thrive" spread the buyer across three audiences.

**F4 — Marketing-speak in portfolio copy.** "beautiful, easy-to-understand dashboards", "Empower patients", "Transform your clinic documentation" — confident outcome adjectives with no client evidence behind them.

**F5 — No mechanism for the absence of clients.** Nothing on the site said "we're new and here's how we're handling it." The absence of social proof was silent, so visitors filled the gap themselves. The pilot-practice framing converts that gap into an honest, concrete offer.

**F6 — (Minor) brand dilution.** websites.html sells a $399 website build alongside nurse-focused AI tools; downloads, blog, glossary and calculators widen the footprint further. Not changed in this pass — flag for a later decision on focus.

## 3. Changes implemented (this pass)

Pilot-practice positioning (corrected model: the **GP practices** are the pilots — deployment sites running the apps):

1. **index.html**
   - Hero tagline → "Now onboarding pilot GP practices".
   - Hero subtitle gains "— now onboarding pilot GP practices" after the free-tier line (kept nurse-first lead and the pinned strings).
   - New `#pilot` section: "Now Onboarding Pilot GP Practices" with three honest cards (hands-on setup by the builder · real shifts, real feedback · no lock-in, honest pricing) and CTAs to contact/booking. New `.pilot-*` styles appended to styles.css using existing tokens.
2. **automations.html**
   - Hero subtitle gains "Now onboarding pilot GP practices."
   - Honest stage note above the project gallery: four live tools with free tiers, the rest is "the rest of the workshop" (live apps, free downloads, two WIP), pilot practices get first say on what graduates next.
   - CTA gains a secondary "Become a Pilot Practice" button → `index.html#pilot` ("Start Free Today" kept for the self-serve path).
3. **about.html**
   - Replaced the "close-knit team / partners with NDIS organisations" paragraph with the honest one-founder story, including "I won't pretend the operation is bigger or older than it is" and the pilot-practice plan.
   - Hero subtitle now nurse-first + pilot mention.
   - Mission line drops "small businesses".
4. **faq.html** — two new Q&As (HTML + FAQPage JSON-LD, both positions):
   - "ClinicIQ is a new operation — why should I trust it?" (names the newness, founder credentials, free tier as the proof mechanism).
   - "What does it mean to be a pilot practice?" (deployment-site definition, hands-on founder support, pricing unchanged).
5. **contact.html** — hero gains "Ask about making your practice one of our pilot sites".
6. **PRODUCT.md** — primary user realigned to the staged nurse-first rollout (was still "practice managers, GP owners").

Kept intact: every string pinned by `docs/check-repositioning.py`, the no-fake-testimonials rule, all pricing facts, all disclaimers.

## 4. Recommended next (not implemented)

- **R1 — Publish pilot results.** When the first pilot practices are live, add a short "what we're learning in pilot practices" block (even 3 bullet learnings). This becomes the site's first real social proof — earned, not invented.
- **R2 — Real testimonials only from real pilots**, with written permission, named where possible. Until then keep the no-testimonials stance; it is a trust asset.
- **R3 — ABN in the sitewide footer.** The ABN currently appears only on contact.html; adding "ABN 55 882 511 758" to every footer is a standard Australian legitimacy signal.
- **R4 — Decide on websites.html.** A $399 website-build offer on the same brand as clinical AI tools blurs "who is this for". Consider separating it under its own brand or archiving it.
- **R5 — Trim the project gallery** to what is live or genuinely next; move paused/deprecated items (e.g. Docuwhisper is tagged Deprecated yet still has an "Access" button) off the main grid.
- **R6 — Make the proof loop visible.** Link the YouTube "Nurse Insights" videos from the pilot section — showing the build in public is free credibility for a starter brand.

## 5. Verification

- `python3 docs/check-repositioning.py` — re-run after any further copy changes; all pinned strings preserved by this pass.
- JSON-LD on faq.html must stay valid (the repositioning check parses every block).

## 6. Addendum — 2026-08-29 second pass (pilot funnel)

Built out after the initial repositioning, on owner direction:

- **pilot.html** — dedicated explainer: what a pilot practice is, why practices join (hands-on setup by the builder, direct line to the founder, roadmap say, unchanged pricing), what's asked in return, honest limits (limited places, no beta-grade data handling, RACGP accreditation disclaimer, month-to-month exit). Sets a sessionStorage flag so the sitewide banner never nags visitors who've read it.
- **booking.html** — hero + calendar merged into one two-column layout, both visible on page land; the duplicate "Choose a Time" hero CTA is gone. Left column carries the pitch, Sydney-time note, email fallback and a pilot-practices link; right column is the embed card (iframe now loads eagerly; health-check/fallback wiring untouched).
- **faq.html** — "What does it mean to be a pilot practice?" answer extended with the why-join reasons and links (HTML + JSON-LD kept in sync).
- **index.html** — pilot section secondary CTA now points at pilot.html ("What a Pilot Practice Gets").
- **Floating banner** (enhancements.js) — dismissible bottom-left card sitewide ("New: ClinicIQ is onboarding pilot GP practices" → pilot.html). Styles are injected from JS (styles.css is served immutable); suppressed on pilot.html, after dismissal (localStorage), or after visiting pilot.html that session.
- **Cache-bust** — styles.css v2.9→v3.0 and enhancements.js v1→v2 across all pages (immutable caching makes the query bump mandatory).
- **sitemap.xml** — pilot.html added.
- Verified: repositioning check green (89 PASS / 0 FAIL), pilot.html JSON-LD parses, node --check on enhancements.js, Playwright screenshots of booking/pilot/index confirmed layout and banner behaviour (banner shows sitewide, hides on pilot.html and after dismissal).
