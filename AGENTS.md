# ClinicIQ Solutions Website

> **Scope**: Project-specific identity and background.  
> **Override**: Defers to global `AGENTS.md` (`~/AGENTS.md`) and global `CLAUDE.md` (`~/.claude/CLAUDE.md`) for universal principles.  
> **Karpathy**: Global Karpathy Priority Doctrine applies — safety > speed, simplicity first, surgical changes.

---

## Project Identity

**ClinicIQ Solutions Website** — AI tools, calculators and overlays for **Australian practice nurses** working in GP clinics (repositioned 2026-08; formerly targeted whole practices). Production-ready static site deployed on Netlify with Cloudflare DNS.

## Positioning Rules (do not regress)

- **Buyer address**: the individual practice nurse ("you"), not the practice as an organisation. "Your practice" is acceptable only as a *workplace reference* ("the systems your practice already runs on"), never as the decision-maker.
- **Commercial angle**: self-serve first — every tool has a free tier; Pro is $29–$39/month per tool (NursEpod $39; others $29), month-to-month. Secondary thread: "prove it, then share it with your team". Do **not** put "no practice sign-off" on price badges (removed by owner request); it lives in page copy (intro, FAQ, hero) only.
- **SEO**: page titles/meta lead with "practice nurses"; keep "GP clinic / general practice" as secondary keywords.
- **Persona rollout (staged)**: nurses now → admin staff next → managers later. H1, nav and layout stay persona-neutral so each pass is a copy swap, not a redesign.
- **Pilot positioning (2026-08-29)**: the brand reads as a starter that is currently onboarding **pilot GP practices** (practices that run the apps on real workflows — NOT a "pilot program" giving individual nurses free Pro). Explainer page: `pilot.html` (uses the standard `.hero-cover-stack` pinned-hero scroll — keep section backgrounds opaque if editing); summary strip: `index.html#pilot`; FAQ covers it too. Sitewide floating banner lives in `enhancements.js` (self-contained styles; top-right under the navbar so bottom-of-viewport dialogs never cover it; suppressed on `pilot.html`, for 24h after dismissal via localStorage timestamp, and after visiting `pilot.html` that session). Do not invent pilot discounts — pricing stays free tier + Pro $29–$39 month-to-month for everyone. Context: `docs/trust-credibility-audit.md`.
- **Regression check**: `python3 docs/check-repositioning.py` — run after any copy changes; it asserts nurse-first strings present and old practice-buyer strings absent.

## Chatbot Backend

- Frontend widget posts via Netlify Function (`netlify/functions/chatbot.js`) to the n8n webhook in env var `CHATBOT_WEBHOOK_URL`.
- Current backend: n8n workflow **"ClinicIQ Chat — Conversational Nurse Assistant"** (id `qZfM4Lq5H3hDWR4H`), webhook path `cliniciqnursechat` on `https://johnsaenz.au`. Two phases:
  1. **Script phase (zero AI)** — the same 5 discovery questions every conversation are asked by deterministic Code nodes (`route` → `build script turn` → `save answer`). The user's FIRST message only triggers the greeting + Question 1 (nothing is stored until it is actually answered); from then on each answer upserts into the `site_enquiries` row per turn (`skip` stores `(skipped)`); replies are instant (~0.6s). Row status: `new` → `script`.
  2. **Chat phase (AI)** — once all 5 answers exist, `converse` (gpt-4.1-mini + window memory keyed by conversation_id, **no structured output parser** — it fails the node on schema drift; plain-text replies, with an `[END]` token meaning "finished") chats freely using the collected answers as injected context. `parse output` strips `[END]` → status `finished`.
  3. **Transcript** — every turn (both phases) is appended to a per-conversation buffer in workflow static data (`global.transcripts[conversation_id]`, pruned after 7 days). The review email carries the FULL transcript plus the quick answers — data tables can't be created via the n8n API, so a visible `site_chat_transcripts` table is a future UI-only addition if ever wanted.
  4. **Finish chain (deterministic)** — `If finished` (AND row not already finished, so no duplicate emails) upserts the row (falling back to the script-phase answers already stored) then sends the review email (johnsaenzau@gmail.com, with full transcript) + thank-you email to the lead. Partial leads (script answers, no goodbye) stay in `site_enquiries` but trigger no emails — the Netlify function deliberately does not forward `conversation_end`.
- Pricing facts the AI may quote: free tier every tool; Pro $29–$39/month per tool (NursEpod $39; MedPlan AI/cIQventory/PIPQI $29), month-to-month. The AI must never invent integrations or pricing.
- ⚠️ **Pending manual step**: set `CHATBOT_WEBHOOK_URL=https://johnsaenz.au/webhook/cliniciqnursechat` in Netlify and redeploy (the legacy workflow "ClinicIQ Chat - Durable Email" (id `AIr5NttiXlPs445P`) still serves the old `cliniciqchat` path plus the `cliniciqemail`/`cliniciqsubs` webhooks — do not deactivate it).
- Workflow source-of-truth artifact: `docs/n8n-nurse-chat-workflow.json`; self-check: `python3 docs/check-chat-workflow.py`.
- Deployment gotcha: update the workflow via the n8n REST API (`PUT /api/v1/workflows/qZfM4Lq5H3hDWR4H`) with the artifact file as the body — the n8n MCP `create/update_workflow` tools are broken against this instance (they inject the read-only `active` field). Keep the webhook node (`chat1`) id/path/webhookId unchanged so the production registration survives updates.
- **Booking via chat (added 2026-08-23)**: the `converse` agent has three HTTP Request Tool nodes (`booking services`, `booking slots`, `book appointment`) that call the booking API below; the system prompt enforces confirm-before-book and injects today's Sydney date. n8n tool gotcha on this instance (2.31.4): tool parameters must be `{name}` tokens in a **plain** string (URL or `jsonBody`) plus `placeholderDefinitions` — `$fromAI(...)` expressions and fixedCollection query params do NOT resolve (tool silently returns nothing).
## Booking Backend

- App repo: `~/ZCodeProject/cliniciq-booking` (Next.js 16 + shadcn, self-hosted Supabase core; its `INTEGRATION.md` is the full API/embed handoff doc).
- **Where it runs**: this Mac. Postgres + PostgREST in docker (`cliniciq-booking-db-1` 127.0.0.1:25432, `cliniciq-booking-rest-1` 127.0.0.1:23001, `restart: unless-stopped`); the Next app via LaunchAgent `com.cliniciq.booking` on **port 3001** with `basePath: /booking` (port 3000 is taken by nursetool3). Rebuild+restart after changing `next.config.ts` (basePath is build-time).
- **Public URL**: `https://johnsaenz.au/booking` — served by a path rule (`^/booking(/|$)` → `http://host.docker.internal:3001`) on the existing `n8n-mac2` production tunnel's remote ingress (the `n8n-cloudflared` docker container; config lives in Cloudflare, editable via the API token inside `~/.cloudflared/cert.pem`; hot-reloads in ~15s, no container restart). The n8n routes on the same hostname are untouched.
- The n8n chatbot does NOT use the public URL — its tools call `http://192.168.65.254:3001/booking/api/*` (Docker Desktop host gateway; `host.docker.internal` does not resolve inside the n8n container).
- **Site integration**: `booking.html` embeds the flow in an iframe (health-checked first; email fallback if down), auto-resizes via `cliniciq:height` postMessage, listens for `cliniciq:booking:completed`, and passes `?service=<uuid>` deep links through. Footer "Book a Call" links on all pages + contact page hero CTA. CORS is pinned via `BOOKING_ALLOWED_ORIGIN=https://cliniciq.com.au,https://www.cliniciq.com.au` in the booking repo's `.env`. Known gap: the prerendered booking page is served from Next's cache WITHOUT the CSP `frame-ancestors` header, so iframe framing is open while the APIs stay CORS-pinned (page holds no PII — accepted).
- **Bookable services live in Postgres** (the `/admin` console only edits hours/closures): currently "ClinicIQ Demo Call" (30 min) and "NursEpod3 Team Setup Session" (45 min), both free. Change via SQL on `public.services` (delete + insert; AGENTS.md of the booking repo documents the schema).
- Secrets were regenerated 2026-08-23 into the booking repo's `.env` (PGRST JWT secret, admin password for `/admin`); `BOOKING_RATE_LIMIT=30` because n8n books from one gateway IP.
- Test residue 2026-08-23: seven clearly-named rows (`probe-test-001`, `e2e-booking-001..005`, `smoke-final-001`) in the `site_enquiries` data table (public API can't delete rows; retention cleans them) and zero test bookings (deleted from Postgres).

## Newsletter Backend

- n8n workflow **"ClinicIQ — Newsletter Engine"** (id `2VlUtlZ7Mhyy6Za7`, active). Artifact: `docs/n8n-newsletter-workflow.json`; self-check: `python3 docs/check-newsletter-workflow.py`.
- **Subscribe**: site footer form → Netlify function `newsletter` (`NEWSLETTER_WEBHOOK_URL` env) → webhook `cliniciqsubs` (path taken over from the legacy workflow on 2026-08-22 — same path + webhookId; the legacy subs branch was removed, everything else on the legacy workflow is untouched). Inserts a row into `cliniciq_emails` with `message = 'newsletter signup'`, deduped by email, and sends a branded welcome email with a per-recipient unsubscribe link.
- **CRITICAL — audience scoping**: `cliniciq_emails` also holds historical contact-form messages. `find subscriber` and `get subscribers` both filter on `message = 'newsletter signup'`; without that filter broadcasts would email past contact-form senders (this happened once during commissioning — see 2026-08-22 broadcasts). Never remove the filter.
- **Unsubscribe**: every email links `https://johnsaenz.au/webhook/cliniciqunsub?id=<rowId>&email=<email>` (both must match). GET deletes the row and returns a branded HTML confirmation page. Unsubscribed = deleted from the table, so future sends skip them automatically.
- **Broadcast (Telegram → AI → email)**: a 1-min schedule polls `api.telegram.org` directly over HTTP (no n8n Telegram credential needed). Setup: @BotFather → bot token → paste into the `telegram settings` Code node (replace `PASTE_BOT_TOKEN_HERE`) or set static data `{"telegram":{"botToken":"..."}}`; then send `/start` to the bot — the first account to /start becomes admin (static data). Thereafter any non-command text from the admin → gpt-4.1-mini builds a branded HTML email (`{{UNSUB_URL}}` footer placeholder; the parse node force-appends the footer if the model omits it) → sent to every signup row with its own unsub link → the bot replies with the send count. A 90s static-data poll lock + offset-committed-before-processing prevent double-sends.
- **Test hook**: POST `cliniciqbroadcasttest` with `{"secret":"<test secret>","text":"..."}` runs the same chain without Telegram. The repo is public, so the real secret lives ONLY in the live n8n workflow — the artifact stores `TEST_SECRET_PLACEHOLDER`; if you ever restore the workflow from the artifact, re-enter the real secret in the `test secret ok?` node.
- n8n quirk: IF-node boolean conditions need `Boolean(...)` around `&&` expressions — strict type validation rejects the raw value that `true && value` returns.
- Retention: the 24-month cleanup purges `cliniciq_emails` too, so subscriptions lapse after 24 months (conservative consent refresh, consistent with Privacy Policy s9).

- **Data retention (Privacy Policy s9)**: n8n workflow **"ClinicIQ — Enquiry Retention Cleanup"** (id `QPkid692zOyB7hCx`, runs daily 03:00) deletes `site_enquiries` and `cliniciq_emails` rows older than 24 months. Artifact: `docs/n8n-enquiry-retention-cleanup.json`. Gotcha: the Data Table node's delete operation value is `deleteRows` (not `delete`, which fails at runtime), and rows are keyed by system column `id`.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with luxury color palette
- **Dependencies**: Google Fonts (Inter, Playfair Display)
- **Build**: None (vanilla static files)
- **Deployment**: Netlify (static hosting)

## Infrastructure & Deployment Architecture

```
User Browser
    ↓
Cloudflare DNS (DNS-only, NOT proxied)
    ↓
Netlify CDN (handles EVERYTHING)
    ↓
Static Site (HTML, CSS, JS)
```

### Component Responsibilities

| Component | Provider | Purpose | Mode |
|-----------|----------|---------|------|
| **Hosting** | Netlify | SSL/TLS, CDN, edge caching, analytics, optimizations | Primary (FULL CONTROL) |
| **DNS** | Cloudflare | DNS resolution only | DNS-only (gray cloud ☁️) |
| **Nameservers** | VentraIP | DNS management | Account-based |
| **Email** | VentraIP | MX records, email hosting | Via Cloudflare DNS |

### Critical Rules

1. **Let Netlify handle everything**: SSL/TLS, CDN edge caching, automatic optimizations, analytics, Cache-Control headers, Netlify Functions
2. **Keep Cloudflare in DNS-only mode** (gray cloud ☁️) — NO orange cloud proxy mode
3. **Use browser caching via `_headers` file**:
   - HTML: `max-age=3600` (1 hour)
   - Static assets: `max-age=31536000, immutable` (1 year)
4. **NEVER enable ServiceWorker** — intentionally disabled to prevent bypassing Netlify CDN
5. **NEVER add caching layers that bypass Netlify** — no CDN proxies, no reverse proxies, no edge workers

### DNS Configuration

```
Domain: cliniciq.com.au
Nameservers: VentraIP account → Cloudflare DNS
Mode: DNS-only (gray cloud ☁️)

Records:
A       cliniciq.com.au     [Netlify IP]                   DNS only (gray)
CNAME   www                 [Netlify domain].netlify.app   DNS only (gray)
MX      cliniciq.com.au     mail.ventraip.com.au           N/A
```

## Performance Optimizations

### Cache Strategy (`_headers` file)
```nginx
/*.html
  Cache-Control: public, max-age=3600, must-revalidate

/*.js, /*.css, /*.jpg, /*.png, /*.webp, /*.svg, /*.woff2
  Cache-Control: public, max-age=31536000, immutable
```

### Critical Rendering Path (LCP < 2.5s)
- Preload critical resources (CSS, hero images, fonts)
- Font-display swap for web fonts
- Defer non-critical JavaScript
- Progressive component initialization (critical first, defer non-critical)

### Performance Metrics (Current)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **LCP (First visit)** | < 2.5s | 1.5-2.5s | ✅ Achieved |
| **LCP (Repeat, < 1hr)** | < 0.5s | < 0.1s | ✅ Exceeded |
| **FCP** | < 1.8s | < 1s | ✅ Achieved |
| **CLS** | < 0.1 | 0.0 | ✅ Perfect |
| **TTI** | < 3.8s | < 3s | ✅ Achieved |
| **Browser Cache Hit** | > 80% | ~95% | ✅ Exceeded |

## Image Optimization Rules

1. **Explicit dimensions** on ALL `<img>` tags (prevents CLS)
2. **Loading strategy**: Above-the-fold = `loading="eager"`, Below-the-fold = `loading="lazy"`, LCP candidates = `fetchpriority="high"` + `decoding="async"`
3. **WebP first**, PNG/JPG fallback in `<picture>`
4. **Accurate `sizes` attribute** for responsive images
5. **No preload on non-critical images** — only preload CSS, hero images, fonts
6. **Logo**: `photos/branding/cliniciq-logo copy.webp` (84 KB, 1600×900px, displayed at 80×45px)

## Security Headers (via `_headers`)

```nginx
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## ServiceWorker Status: DISABLED

There is **no `sw.js` file** in the project. `script.js` unregisters any previously installed workers.

**Only re-enable if** offline functionality is absolutely required AND you accept Netlify Analytics accuracy loss.

## Key Files for Infrastructure

| File | Purpose | Critical Settings |
|------|---------|-------------------|
| `_headers` | Netlify cache headers | Cache-Control rules, security headers |
| `_redirects` | Netlify redirects/rewrites | API endpoint routing to Netlify Functions |
| `netlify.toml` | Netlify build config | Mirrors `_headers` rules for Netlify UI |
| `index.html` | Main HTML | Cache-Control meta tag, preload hints |
| `script.js` | Main JavaScript | Unregisters legacy service workers, defers non-critical components |

## Deployment Process

1. Push to main branch
2. Netlify detects changes and auto-deploys
3. Applies `_headers` and `_redirects` rules
4. Deploys Netlify Functions, invalidates CDN cache
5. Site live at: cliniciq.com.au

### Post-Deploy Verification
```bash
# Check Cache-Control headers
curl -I https://cliniciq.com.au/

# Check static asset headers
curl -I https://cliniciq.com.au/styles.css

# Check ServiceWorker status (DevTools → Application → Service Workers)
# Should show: "No service workers registered"
```

## Color Palette

- **Primary Green**: #2C4A3C (luxury nature theme)
- **Gold Accent**: #C4A661 (premium luxury)
- **Cream Background**: #F5F1E6 (elegant neutral)
