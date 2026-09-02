# ClinicIQ Traffic Engine

> Set up 2026-09-03. Self-check: `python3 docs/check-traffic-engine.py`.
> Artifact: `docs/n8n-traffic-engine.json` (workflow "ClinicIQ — Traffic Engine", live id `uEKom1QpY58o9Ee3`).

## Why the site wasn't getting traffic (diagnosis, Sep 2026)

On-page SEO/AEO/GEO was in decent shape (clean robots.txt, sitemap, llms.txt, schema, fast pages — the site is even indexed in Bing with ~99 results). The traffic gap had five concrete causes:

1. **Content-market mismatch.** All 6 blog articles target the *old* buyer ("GP practices", "clinic automation") on competitive head terms a zero-authority domain cannot rank for. Nothing targeted long-tail queries that the new persona — Australian practice nurses — actually types.
2. **Broken lead capture.** The footer newsletter form was silently failing: the "ClinicIQ — Newsletter Engine" n8n workflow had been left **inactive** (its `cliniciqsubs` webhook returned 404). Reactivated 2026-09-03 (see AGENTS.md). Any traffic that did arrive was not being captured.
3. **No search-engine push.** Nothing pinged the engines when content changed; sitemap `lastmod` dates went stale. Google Search Console verification was never set up (no verification tag/DNS record anywhere), so nothing could be submitted *or* measured.
4. **No measurement.** No GSC/Bing Webmaster data = no queries, no index coverage, no CTR signal to iterate against.
5. **No off-page authority.** Essentially zero backlinks. This is the slowest lever and needs recurring human effort (see playbook).

## What's automated now

```
git push → Netlify build → deploy succeeded ─┐
                                             ├─→ n8n "ClinicIQ — Traffic Engine"
weekly cron (Mon 08:00 Sydney) ──────────────┘        1. fetch sitemap.xml
                                                      2. diff loc+lastmod vs last run (workflow staticData)
                                                      3. POST all URLs → api.indexnow.org (IndexNow)
                                                      4. email report → johnsaenzau@gmail.com
```

- **IndexNow** notifies Bing, DuckDuckGo, Seznam and partners within minutes of every deploy. Key: hosted at `https://cliniciq.com.au/<key>.txt` (file at repo root, name = key). Do not rename; it must stay byte-exact.
- **Deploy trigger**: Netlify outgoing webhook (site `ed7a559e-b9b5-4d50-ae0d-956ecd36480d`, hook id `6a9897a6cb740534464351dc`, event `deploy_succeeded`) → `https://johnsaenz.au/webhook/cliniciqtrafficking?key=<secret>`. The secret lives only in the live n8n workflow + the Netlify hook (repo is public — the artifact stores `TRAFFIC_PING_SECRET_PLACEHOLDER`).
- **Weekly ping** keeps engines warm even when nothing deployed, and the email report is the "is this alive?" heartbeat.
- **New nurse-first articles** (2026-09-03): MBS/CDM items (721/723/715/10990), vaccine cold chain (Strive for 5), flu clinic run-sheet. Each: `BlogPosting` + `FAQPage` + `BreadcrumbList` JSON-LD, visible FAQ (AEO), key-takeaways box (GEO), internal links to tools + booking. These target long-tail queries the site can actually win.

## Manual playbook (the levers automation can't pull)

**Do once (highest priority):**
1. **Google Search Console** — verify `cliniciq.com.au` (DNS TXT record via Cloudflare is easiest), then submit `sitemap.xml`. Without GSC there is zero Google visibility data. This is the single most important unfinished item.
2. **Bing Webmaster Tools** — verify (import from GSC), submit sitemap, paste the IndexNow key in settings.
3. **Google Business Profile** for ClinicIQ Solutions — local + brand SERP presence.

**Recurring (weekly-ish, ~1h):**
- Share each new article to LinkedIn (personal post > company page for reach) and into practice-nurse Facebook groups where allowed. Off-page authority is the real bottleneck; two good backlinks (e.g. APNA resources, a university/CPD provider) outweigh weeks of pinging.
- Pitch APNA (Australian Primary Health Care Nurses Association) newsletter / website for a tool listing or guest content.
- Watch the Monday email report; if it stops arriving, the engine is down.

**Content cadence:** one article per month beats six at once. Update existing articles' `lastmod` when refreshing them — the deploy ping does the rest.

## Verifying the engine

- After any `git push`, Netlify's deploy_succeeded fires the ping; check the n8n execution (workflow `uEKom1QpY58o9Ee3`) and the email report.
- Manual test ping: `curl -X POST "https://johnsaenz.au/webhook/cliniciqtrafficking?key=<secret>"` (secret is in the live workflow's `secret ok?` node / Netlify hook settings).
- IndexNow responses: `200`/`202` accepted, `400` key file not found (is the site deployed?), `429` rate limited.
