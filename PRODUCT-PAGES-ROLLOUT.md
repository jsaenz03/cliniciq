# ClinicIQ Product Pages Rollout — Suite-Wide Discoverability Plan

**Date:** 03/10/2026 · **Status:** Proposed
**Companion study:** `~/cliniciq-apps/stockmgt/docs/ciqventory-discoverability-plan.md` (full evidence for why cIQventory is invisible while Nursepod 3 ranks)

---

## Why this doc

The cIQventory audit showed brand discoverability for the suite's apps comes almost entirely from **cliniciq.com.au** — it is the only surface with domain trust, a sitemap, schema, AI-bot-friendly robots.txt, and a content engine. Today there is no per-app page anywhere: a Google search for most app brands has nothing dedicated to land on. This doc defines a **reusable product-page template** and the **per-app rollout** to fix that once, for every app.

Governing principle from the study: brand entity building on the trusted domain beats on-page tweaks on the app subdomains. App subdomains stay as the product/login surfaces; cliniciq.com.au becomes the canonical marketing home for each brand.

---

## 1. The template — `cliniciq.com.au/<app>.html`

Build the first page (cIQventory) as the reference implementation; each subsequent app is a fill-in. Every page:

**File & discovery**
- Root-level static HTML matching sibling pages (same `styles.css`, header/footer pattern, en-AU spelling, DD/MM/YYYY).
- Added to `sitemap.xml` with real `lastmod`; `changefreq=monthly`, priority `0.9`.
- Self-canonical `<link rel="canonical">`; `lang="en"`; one `og:image` per app (1200×630 screenshot — the stockmgt emulator capture harness can produce these).

**Head**
- `<title>{Brand} — {plain descriptor} for Australian GP clinics | ClinicIQ Solutions` (≤60 chars).
- Meta description 150–160 chars: brand + category + "Australian GP clinics" + one differentiator.
- JSON-LD **SoftwareApplication** (`applicationCategory`, `operatingSystem` Web/Windows, `offers` if priced, `publisher` → the site's Organization) and **FAQPage** for the FAQ block.
- Organization `sameAs` on the homepage already exists — extend it with each app's product page as pages ship.

**Body (answer-first / AEO structure)**
1. **H1**: `{Brand}: {descriptor}`.
2. **Answer-first intro** — 40–60 words directly answering "What is {Brand}?" (snippet bait; also the paragraph AI engines quote).
3. **Features** — 3–5 H3 blocks with concrete, honest claims; include numbers where true (GEO: statistics +37% citation lift).
4. **Who it's for + How it works** — 3-step numbered list.
5. **Comparison table** vs the real alternative (spreadsheet / paper / manual process) — tables are prime snippet material.
6. **FAQ** — 4–6 questions in users' words, 40–60-word answers, mirrored in FAQPage schema. Include the compliance/trust question (e.g. "Does it store patient data?") — non-PHI is cIQventory's differentiator; Docsert's intended-use disclaimer is its equivalent.
7. **Single CTA** to the app's live URL, anchor text = brand name, `target="_blank" rel="noopener"`.
8. **Internal links**: this page ↔ automations.html section ↔ 1–2 related blog posts; cross-link the other product pages (hub-and-spoke).

**Brand discipline**
- One spelling per brand, everywhere, forever: `cIQventory`, `Nursepod`, `Docsert AI`, `PIPQI`. The site currently mixes NursEpod/nursepod/NursePod 3 — don't replicate that.
- Factual, regulator-safe wording only (AHPRA/RACGP context); no outcome claims.

---

## 2. One-off plumbing (touches every app)

1. **automations.html rebalance** — mentions today: Nursepod 34, Docsert 25, PIPQI 24, cIQventory 7. Keep the leaders; raise cIQventory; convert each app's section CTA to point at its product page (page then links the app).
2. **Homepage suite section** — one line per app: descriptor + link to product page (not straight to the app).
3. **Canonical app hosts (owner decision 03/10/2026):** `nursepod3.jsaenz.au` and `docsert.jsaenz.au` are the only app URLs to link or reference anywhere. The old hosts — `nursepod.jsaenz.au` (legacy build) and `docuwhisper.jsaenz.au` — are still live but must NOT be linked from any page, blog post, schema or bio. Do **not** build redirects or try to retire them — just never point anything new at them, and replace any legacy links found while editing (automations.html currently links both old hosts).
4. **Sitemap + GSC**: request indexing per page on publish; Bing WMT import.

---

## 3. Per-app rollout

| # | App | Live URL | Page slug | Positioning | Primary keywords | Priority |
|---|-----|----------|-----------|-------------|------------------|----------|
| 1 | cIQventory | stock.jsaenz.au | `ciqventory.html` | Stock & inventory management for Australian GP clinics — non-PHI, expiry alerts, order forms | inventory management for GP clinics; medical stock take; vaccine fridge stock tracking | **P1** |
| 2 | Nursepod | nursepod3.jsaenz.au (canonical; old nursepod.jsaenz.au stays live but unlinked) | `nursepod.html` | Task management for GP clinic teams | nurse task manager; GP practice task management; clinic team roster tasks | **P2** |
| 3 | Docsert AI | docsert.jsaenz.au | `docsert.html` | Documentation & templating assistant — turns clinician-supplied data into GP management plans, health assessments, care-plan drafts (clinician confirms every document) | GP management plan template; care plan software Australia; health assessment template | **P2** |
| 4 | PIPQI (pipqboard) | pipqi.jsaenz.au | `pipqi.html` | PIP QI targeting & data tool for Australian general practice — **confirm public brand (PIPQI vs pipqboard) before building** | PIP QI; practice incentive payment quality improvement; PIP QI data | **P3** |
| 5 | Camog | github.com/jsaenz03/camorg (releases) | `camog.html` | Clinical photo documentation for Windows — capture with consent/review tracking, local storage | clinical photography documentation; wound photo documentation clinic | **P3** |
| 6 | Bondy | (desktop kiosk) | — | **Not on this site.** Time & attendance kiosk for small businesses generally, not clinic software | — | Out of scope |

**Applicability calls (the "(if applicable)" question):**
- **Camog — yes.** It's clinical tooling (photo documentation), so it belongs under the healthcare brand; CTA is the GitHub release download and the schema is `DesktopApplication`.
- **Bondy — no.** It's a Bundy clock for small businesses of any kind. Putting it on cliniciq.com.au dilutes the healthcare entity (bad for E-E-A-T and for how AI engines summarise what ClinicIQ is). If Bondy is ever marketed, give it its own simple landing/site; at most an "other projects" footer mention.

**Per-app FAQ seeds** (first two of each):
- cIQventory: "Does cIQventory store patient information?" · "How does it handle vaccine expiry?"
- Nursepod: "Who can assign tasks?" · "Does it work on the clinic iPad?"
- Docsert: "Does Docsert make clinical decisions?" (no — intended-use statement) · "Which document formats does it produce?"
- PIPQI: "What is PIP QI?" · "Where does the data come from?"
- Camog: "Where are photos stored?" · "How is consent tracked?"

**Blog pairing** (one post per launch, answer-first, linking the page): stock-take how-to (cIQventory) · clinic task run-sheet (Nursepod) · GPMP/HA documentation workflow (Docsert) · PIP QI data checklist (PIPQI) · clinical photo consent workflow (Camog). Lead-magnet PDF per app where natural — Perplexity over-weights PDFs.

---

## 4. Sequencing

- **Wave 1 (now):** cIQventory page + automations/homepage rebalance + GSC/Bing verification + publish the promo video. (Wave 1 = Phase 2 of the stockmgt study; the small app-side fixes there — prerendered landing, robots/sitemap on stock.jsaenz.au — run in parallel so new links land on a crawlable page.)
- **Wave 2:** Nursepod + Docsert pages (template reuse ≈ half a day each); nurse/docsert brand-split 301s.
- **Wave 3:** PIPQI page (after name confirmation) + Camog page.
- **Cadence:** request indexing on each publish; monthly brand-SERP + GSC query review (per the stockmgt study's measurement table).

## 5. Per-page QA checklist

Before publishing each page: title/description present · canonical · both JSON-LD blocks validate (validator.schema.org) · in sitemap with lastmod · CTA URL returns 200 · brand spelling matches the canonical form · internal links resolve · og:image renders at 1200×630 · mobile layout intact · **no links to the old hosts (nursepod.jsaenz.au, docuwhisper.jsaenz.au)**.

## 6. Handing this doc to an agent

Point an agent at this file and name the wave, e.g. *"Implement Wave 1 of PRODUCT-PAGES-ROLLOUT.md in this repo — start with `ciqventory.html` as the reference implementation of §1, then the §2 mention/link plumbing, QA per §5, and update sitemap.xml."* The repo's own AGENTS.md covers site conventions (static HTML, Netlify + Cloudflare, en-AU).

Owner-only items the agent cannot do: GSC/Bing verification and indexing requests (John's accounts), publishing the promo video to YouTube/FB/IG, and approving og:image assets (the stockmgt emulator capture harness at `~/cliniciq-apps/stockmgt/scripts/` can generate per-app screenshots).
