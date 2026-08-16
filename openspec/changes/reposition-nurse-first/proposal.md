# Proposal: Reposition Site Targeting from Practices to Practice Nurses

## Why

Practice-level outreach (addressing "your practice" as the buyer) has produced no traction. Nurses employed by practices are the narrowest audience that already maps to the product suite (NursePod, MedPlan AI, care-plan overlays, clinical calculators) and can adopt the free tiers personally, without practice sign-off. This is the first stage of a staged persona rollout (nurses → admin staff → managers), so persona-neutral structural elements (H1, nav, layout) stay unchanged to keep future passes cheap.

## What Changes

**Buyer address flips from the practice to the individual practice nurse.** The rewrite rule: buyer-address ("your practice" meaning the deciding organisation) becomes "you, the nurse"; workplace-reference ("the systems your practice already runs on" — the nurse's workplace) stays where it reads naturally.

**Commercial angle: self-serve first, team second.** Primary call to action: start free today, no practice sign-off needed (Pro tiers are already $9.99–$19.99/mo per tool). Secondary thread: "prove it, then share it with your team" — seeds the later admin/manager personas without diluting the nurse focus.

**Scope: full funnel, copy-only.**

- `index.html` — deep rewrite: title/meta/OG/JSON-LD, hero subtitle (H1 markup untouched), trust line, How We Help problem copy in nurse second-person voice, capabilities carousel, newsletter, contact helpers, chatbot welcome.
- `automations.html` — deep rewrite: title/meta, product card descriptions with self-serve pricing line, all "Perfect For" lines reframed to nurse-shift benefits.
- `contact.html` — nurse-first hero; "Clinic Name" kept but relabelled "Clinic / workplace" (optional context).
- `faq.html` — revoice buyer Q&As to "you"; add 3 nurse-specific FAQs (approval, documentation safety, personal account/expense).
- Sitewide light pass — every page title/meta nurse-first with "GP clinic" secondary; footer tagline and legal line unified; newsletter blocks revoiced; `llms.txt`/`llms-full.txt` positioning; `sitemap.xml` lastmod.
- `chatbot.js` — welcome greeting revoiced.

**Out of scope:** blog article bodies/titles, per-persona landing pages, pricing page, visual/infra changes (`_headers`, `_redirects`, `netlify.toml`), ServiceWorker (stays disabled).

## Impact

- **Capabilities**: content, seo, user-experience
- **Risk**: SEO churn on title/meta across all pages — mitigated by retaining "GP clinic / general practice" as secondary keywords in every title and meta description.
- **No layout/CSS/JS-logic changes** — copy swaps only, zero CLS risk.
