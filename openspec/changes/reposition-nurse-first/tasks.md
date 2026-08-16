# Implementation Tasks

## Overview
Reposition all audience-facing copy from practice-as-buyer to practice-nurse-as-buyer. Self-serve first ("start free, no practice sign-off"), team second. Copy-only changes; H1 markup, nav, layout, CSS and JS logic untouched.

## Tasks

### 1. index.html deep rewrite
- [x] Title, meta description, keywords lead with "practice nurses"; keep "GP clinics" secondary
- [x] OG/Twitter tags updated to match
- [x] Organization/WebSite/WebPage JSON-LD descriptions repositioned; FAQPage schema answers synced with new FAQ wording
- [x] Hero: keep tagline + H1 markup; new nurse-targeted subtitle; trust line → "Built for Australian practice nurses"
- [x] "Nurse Insights" section subtitle addresses nurses directly
- [x] "How We Help": 6 problem descriptions rewritten in nurse second-person voice; ps-subtitle and ps-footer revoiced; solution boxes keep product names and disclaimers
- [x] Capabilities carousel heading/copy revoiced for practice nursing
- [x] Newsletter copy revoiced for practice nurses
- [x] Contact section subtitle and message helper revoiced
- [x] Chatbot welcome message revoiced

**Files**: `index.html`

### 2. automations.html deep rewrite
- [x] Title/meta nurse-first
- [x] Page intro in nurse second person
- [x] 4 product card descriptions revoiced; add self-serve line "Free to start · Pro $X/mo · no practice sign-off"
- [x] All "Perfect For" lines reframed from practice benefits to nurse-shift benefits
- [x] Founder strip amplified

**Files**: `automations.html`

### 3. contact.html rewrite
- [x] Hero copy nurse-first
- [x] "Clinic Name" → "Clinic / workplace", helper marks it optional
- [x] Message placeholder nurse-framed
- [x] JSON-LD description synced

**Files**: `contact.html`

### 4. faq.html rewrite + index JSON-LD sync
- [x] Buyer-facing Q&As revoiced to "you"
- [x] Pricing answer leads with self-serve tiers; bespoke-for-practices secondary
- [x] Add 3 nurse FAQs: practice-manager approval, clinical documentation safety, personal account/expense
- [x] index.html FAQPage schema kept in sync

**Files**: `faq.html`, `index.html`

### 5. Chatbot backend (n8n)
- [x] Build retargeted 5-question nurse discovery workflow from the existing flow (same output contract, data table and email nodes)
- [x] New dedicated workflow "ClinicIQ Chat — Nurse Discovery" created (id `qZfM4Lq5H3hDWR4H`), webhook path `cliniciqnursechat`, active — artifact: `n8n-nurse-chat-workflow.json`
- [x] Review email relabelled (Role & Clinic, A Typical Shift, overlays next-step; stale "queue management" removed)
- [x] Thank-you email nurse-first copy + John Saenz RN signature
- [x] Live smoke test: first message returns nurse Q1, status in_progress, no emails fired
- [ ] Repoint site: update Netlify env var `CHATBOT_WEBHOOK_URL` to `https://johnsaenz.au/webhook/cliniciqnursechat` and redeploy (manual — requires Netlify access)
- [ ] After repoint verified, retire the old `cliniciqchat` flow in the legacy workflow (optional cleanup)

### 6. Sitewide light pass
- [x] Every page `<title>` + meta description: nurse-first, "GP clinic" secondary
- [x] about.html minor alignment (mission already leads with nurses)
- [x] downloads.html, calculators.html, glossary.html, blog.html, websites.html: title/meta + obvious "your practice" subtitle strings
- [x] Footer on all pages: tagline → "AI tools, calculators and overlays for Australian practice nurses."; legal line unified → "Built by a Registered Nurse for Australian general practice."
- [x] Newsletter blocks on calculators/downloads/glossary revoiced
- [x] chatbot.js greeting revoiced
- [x] OG/Twitter title/description mirrors on about/calculators/downloads/glossary/blog
- [x] llms.txt / llms-full.txt positioning paragraphs
- [x] sitemap.xml lastmod for changed pages

**Files**: `about.html`, `automations.html`, `blog.html`, `calculators.html`, `contact.html`, `downloads.html`, `downloads/checklists.html`, `downloads/templates.html`, `faq.html`, `glossary.html`, `index.html`, `websites.html`, `chatbot.js`, `llms.txt`, `llms-full.txt`, `sitemap.xml`

### 7. Verification
- [x] `openspec validate reposition-nurse-first --strict` passes
- [x] Grep audit: remaining "your practice"/"practice manager"/"your staff" hits are intentional workplace-references or the explicit "no practice sign-off" copy
- [x] All JSON-LD blocks parse as valid JSON
- [x] Local serve + visual check: hero renders, anchors `#problem-solution`/`#contact` resolve
- [x] Assert script left in change folder (`check.py`)
