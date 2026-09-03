#!/usr/bin/env python3
"""Generate the practice-nurse traffic articles from the existing blog template.

Keeps nav/footer/chatbot/scripts byte-identical to the template article and
swaps out: head metas, JSON-LD blocks, <main> content, Related Articles block.
Run from repo root: python3 scripts/generate-traffic-articles.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "blog" / "gp-clinic-automation-2026.html"
SITE = "https://cliniciq.com.au"
PUBLISHED = "2026-09-03"
PUBLISHED_HUMAN = "3 September 2026"
IMG_DIR = f"{SITE}/assets/photos/blog"


def org_ld():
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ClinicIQ Solutions",
        "url": f"{SITE}/",
        "logo": f"{SITE}/photos/cliniciq-logo.webp",
    }


def breadcrumb_ld(title, slug):
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": f"{SITE}/blog.html"},
            {"@type": "ListItem", "position": 3, "name": title, "item": f"{SITE}/blog/{slug}.html"},
        ],
    }


def blogposting_ld(title, desc, slug, image):
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": desc,
        "image": image,
        "author": {
            "@type": "Person",
            "name": "John Saenz",
            "jobTitle": "Registered Nurse & Founder",
            "url": f"{SITE}/about.html",
        },
        "publisher": {
            "@type": "Organization",
            "name": "ClinicIQ Solutions",
            "logo": {"@type": "ImageObject", "url": f"{SITE}/photos/cliniciq-logo.webp"},
        },
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "mainEntityOfPage": {"@type": "WebPage", "@id": f"{SITE}/blog/{slug}.html"},
    }


def faq_ld(qas):
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a},
            }
            for q, a in qas
        ],
    }


def ld_block(*objs):
    parts = "".join(
        f'    <script type="application/ld+json">\n    {json.dumps(o, indent=2, ensure_ascii=False)}\n    </script>\n'
        for o in objs
    )
    return parts


def byline():
    return """
            <!-- Author Byline -->
            <div class="author-byline" style="display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; padding: 1rem; background: var(--background-light); border-radius: var(--radius-md);">
                <div class="author-avatar">
                    <img src="../photos/cliniciq-logo.webp" alt="John Saenz" width="50" height="50" style="border-radius: 50%; object-fit: cover;">
                </div>
                <div class="author-info">
                    <p style="margin: 0; font-weight: 600;">
                        By <a href="../about.html" style="color: var(--primary-blue);">John Saenz</a>
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--text-muted);">Registered Nurse &amp; Founder, ClinicIQ Solutions</p>
                </div>
            </div>
"""


def header_block(category, title, excerpt):
    return f"""    <main id="main-content">
    <!-- Article Header -->
    <header class="article-header">
        <div class="container">
            <div class="article-meta">
                <span class="article-date">{PUBLISHED_HUMAN}</span>
                <span class="article-category">{category}</span>
            </div>
            <h1 class="article-title">{title}</h1>
{byline()}            <p class="article-excerpt">{excerpt}</p>
        </div>
    </header>

    <!-- Article Content -->
    <article class="article-content">
        <div class="container">
            <div class="article-body">
"""

TAKEAWAYS_STYLE = (
    "margin: 1.5rem 0; padding: 1.25rem 1.5rem; background: #F5F1E6; "
    "border-left: 4px solid #C4A661; border-radius: 8px;"
)


def takeaways(items):
    lis = "".join(f"                <li>{i}</li>\n" for i in items)
    return f"""                <div style="{TAKEAWAYS_STYLE}">
                    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #2C4A3C;">Key takeaways</p>
                    <ul style="margin: 0; padding-left: 1.25rem;">
{lis}                    </ul>
                </div>
"""


CTA_STYLE = (
    "margin: 2rem 0; padding: 1.5rem; background: #2C4A3C; color: #ffffff; border-radius: 12px;"
)


def cta(html):
    return f"""                <div class="article-cta" style="{CTA_STYLE}">
{html}                </div>
"""


def closing(tags):
    tags_html = "".join(f'<span class="tag" style="display:inline-block;margin:0.25rem;padding:0.25rem 0.75rem;background:#F5F1E6;border-radius:999px;font-size:0.8rem;">{t}</span>' for t in tags)
    return f"""            </div><!-- /.article-body -->

                <div class="article-tags">
                    <p style="font-weight:600;">Tags: {tags_html}</p>
                </div>
        </div>
    </article>
</main>"""


def related_block(cards):
    card_html = ""
    for date, url, title, excerpt in cards:
        card_html += f"""                <article class="blog-card">
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">{date}</span>
                        </div>
                        <h3 class="blog-title">
                            <a href="{url}">{title}</a>
                        </h3>
                        <p class="blog-excerpt">{excerpt}</p>
                    </div>
                </article>
"""
    return f"""
    <!-- Related Articles -->
    <section class="related-articles">
        <div class="container">
            <h2>Related Articles</h2>
            <div class="blog-grid">
{card_html}            </div>
        </div>
    </section>
"""


def faq_html(faq):
    parts = ["                <h2>Frequently asked questions</h2>\n"]
    for q, a in faq:
        parts.append(
            f'                <h3 style="margin-bottom:0.5rem;">{q}</h3>\n'
            f"                <p>{a}</p>\n"
        )
    return "".join(parts)


DISCLAIMER = """                <p style="font-size:0.85rem;color:var(--text-muted);margin-top:2rem;"><em>This article is general information for Australian practice nurses, not medical or billing advice. MBS item descriptions, fees and claim rules change — always confirm against the current MBS Online item descriptors and your practice software's billing guidance before claiming. Patient care decisions remain the responsibility of the treating practitioner.</em></p>
"""


# ---------------------------------------------------------------------------
# Article 1 — MBS CDM items for practice nurses
# ---------------------------------------------------------------------------
A1 = dict(
    slug="cdm-mbs-items-practice-nurses",
    title="MBS Items for Practice Nurses: GPCCMP, 967 and 10997 Explained (2026)",
    meta_title="MBS Items for Practice Nurses: GPCCMP & Item 10997 (2026) | ClinicIQ",
    desc="Which Medicare items Australian practice nurses support and claim under: the GPCCMP (965), reviews (967), health assessments (715) and practice nurse item 10997 — plus what happened to 721, 723 and 10990.",
    image=f"{IMG_DIR}/Healthcare Automation ROI.webp",
    category="Medicare & Billing",
    h1="MBS Chronic Condition Management Items: The Practice Nurse's Guide to the GPCCMP (965), Reviews (967) and Item 10997",
    excerpt="A plain-English walkthrough of the chronic condition management MBS items practice nurses work with every week — GPCCMP (965), reviews (967) and the nurse item 10997 — plus what happened to GPMP, TCA and 10990.",
)

A1_BODY = A1["body"] = """
                <p class="lead">If you're a practice nurse in an Australian GP clinic, chronic condition management is probably the backbone of your week — recalls, care plan paperwork, health assessments and follow-up appointments. Medicare used to call it chronic disease management (CDM); since the move to the GP Chronic Condition Management Plan, the item numbers on your day sheet have changed.</p>

                <p>This guide walks through the items you'll touch most often: the GPCCMP (item 965), its review (item 967), health assessments (including item 715) and the practice nurse item — most importantly <strong>item 10997</strong>. It's written for nurses, not billing managers: the focus is on what <em>you</em> do at each step.</p>

{takeaways}
                <h2>First, the ground rules: what a practice nurse can and can't bill</h2>
                <p>Medicare claims in general practice are made by medical practitioners (or by the practice on their behalf). Practice nurses don't hold their own Medicare provider numbers for these services. What nurses <em>do</em> have is a set of items the GP can claim for services you deliver on their behalf — item 10997 is the everyday example — and a huge amount of preparation work that makes GP items billable and audit-proof.</p>
                <p>Three principles run through every CDM item:</p>
                <ul>
                    <li><strong>The GP stays clinically responsible.</strong> You work under their supervision and delegation, and they authorise the plan or service.</li>
                    <li><strong>Documentation carries the claim.</strong> If it isn't written in the record — patient consent, the plan content, reviews — the practice can't defend the claim.</li>
                    <li><strong>Items change.</strong> Descriptions, fees and rules are updated regularly (fees are typically indexed each 1 November). The MBS Online description for each item is the only authoritative source.</li>
                </ul>

                <h2>The chronic condition management items you'll see on the day sheet</h2>
                <table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:0.95rem;">
                    <thead>
                        <tr style="background:#2C4A3C;color:#fff;text-align:left;">
                            <th style="padding:0.6rem 0.75rem;">Item</th>
                            <th style="padding:0.6rem 0.75rem;">What it is</th>
                            <th style="padding:0.6rem 0.75rem;">Your role as the nurse</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid #e5e0d5;">
                            <td style="padding:0.6rem 0.75rem;"><strong>965 — GPCCMP</strong></td>
                            <td style="padding:0.6rem 0.75rem;">The GP Chronic Condition Management Plan — the single plan that replaced the old GPMP (721) and TCA (723). Prepared by the GP for a patient with a chronic condition.</td>
                            <td style="padding:0.6rem 0.75rem;">Pre-appointment: collect observations, pathology, history and current medications so the GP can finalise the plan efficiently. Book the dedicated, adequately long appointment.</td>
                        </tr>
                        <tr style="border-bottom:1px solid #e5e0d5;">
                            <td style="padding:0.6rem 0.75rem;"><strong>967 — GPCCMP review</strong></td>
                            <td style="padding:0.6rem 0.75rem;">The GP's review of an existing GPCCMP — claimed by the GP, not the nurse.</td>
                            <td style="padding:0.6rem 0.75rem;">Run the recall system so reviews aren't missed (commonly 3–6 monthly in many practices, per the GP's clinical judgement), and pre-populate the review data.</td>
                        </tr>
                        <tr style="border-bottom:1px solid #e5e0d5;">
                            <td style="padding:0.6rem 0.75rem;"><strong>715 — Health assessment</strong></td>
                            <td style="padding:0.6rem 0.75rem;">Annual health assessment for Aboriginal and Torres Strait Islander patients.</td>
                            <td style="padding:0.6rem 0.75rem;">Often nurse-led: complete the assessment components and flag the follow-up actions for the GP.</td>
                        </tr>
                        <tr style="border-bottom:1px solid #e5e0d5;">
                            <td style="padding:0.6rem 0.75rem;"><strong>10997 — Practice nurse item</strong></td>
                            <td style="padding:0.6rem 0.75rem;">Lets the GP claim for an attendance you provide on their behalf for chronic condition management — the workhorse nurse item in general practice.</td>
                            <td style="padding:0.6rem 0.75rem;">Deliver the service (wound care, chronic condition follow-up, education) under the GP's supervision, and document it as if the GP were in the room.</td>
                        </tr>
                    </tbody>
                </table>

                <h2>What happened to items 721, 723 and 10990?</h2>
                <p>If your practice software reports still print GPMP (721), TCA (723), review items 2755/2757 or the old nurse item 10990, that's the previous chronic disease management framework. Under Medicare's chronic condition management changes, the GPMP and TCA were folded into a single <strong>GP Chronic Condition Management Plan (item 965)</strong>, plan reviews moved to <strong>item 967</strong>, and the practice nurse item became <strong>item 10997</strong>.</p>
                <p>Three practical clean-ups for your workflow:</p>
                <ul>
                    <li><strong>Update billing templates and checklists</strong> that still say GPMP/TCA — the fastest source of billing confusion is staff picking a superseded item from an old template or nurse-clinic checklist.</li>
                    <li><strong>Expect legacy numbers in old paperwork.</strong> Letters, discharge summaries and older care plans reference the previous items — read them as "this patient has (or had) a plan" and confirm what's current in the record before claiming.</li>
                    <li><strong>Plan the cycle under the new items.</strong> When a plan is next due it's prepared as a GPCCMP — set the review recall at that visit so the 967 cycle starts on time.</li>
                </ul>

                <h2>Item 10997 in practice</h2>
                <p>Item 10997 is the reason a nurse-led chronic condition clinic can be sustainable for a practice. The core points to keep in mind:</p>
                <ul>
                    <li>The service is provided <strong>by a practice nurse, on behalf of the GP</strong>, as part of the patient's chronic condition management.</li>
                    <li><strong>Check the current MBS Online note for item 10997 before you book</strong> — its eligibility conditions (including requirements around the patient's existing plan and prior services) are exactly what separates a clean claim from a rejection, and they shouldn't be assumed from how the old 10990 worked.</li>
                    <li>You work <strong>under the supervision of the GP</strong>, and claim frequency limits apply — confirm the current count in the MBS note rather than a colleague's rule of thumb.</li>
                </ul>
                <p>A practical habit: build a pre-appointment checklist in your practice software — "plan current? item conditions met? Y/N" — so the front desk doesn't have to guess at billing time.</p>

                <h2>The paperwork traps that cause claim rejections</h2>
                <ul>
                    <li><strong>Missing or unsigned consent.</strong> CDM plans require the patient's agreement to be documented.</li>
                    <li><strong>Plans "finalised" without the GP.</strong> You can draft and gather, but the GP prepares and authorises the plan — keep your drafting separate from their sign-off in the record.</li>
                    <li><strong>Review dates never booked.</strong> The plan is only as good as its recall cycle. Book the review before the patient leaves.</li>
                    <li><strong>Same-day double-ups.</strong> Some services can't be claimed together on the same day — when in doubt, check the item's "restrictions" flags (the P/R/E codes) on MBS Online.</li>
                </ul>

                <h2>Where nurses add the most value in the CDM cycle</h2>
                <p>Practices that run CDM well treat it as a pipeline, not a set of one-off appointments: a recall list that never goes stale, pre-appointment data collection that shortens the GP's consult, team referrals actually followed up, and a review booked at every touchpoint. That pipeline work is nurse work — and it's where the paperwork side pays off fastest. <a href="../automations.html">Docsert AI</a> turns scattered notes, summaries and extracts into tidy, structured care-plan documents in minutes, using smart templates that work with Best Practice — you review, edit and finalise every output. The ClinicIQ <a href="../calculators.html">calculators</a> and <a href="../downloads/checklists.html">CDM checklists</a> cover the rest of the workflow.</p>
"""

A1_TAKEAWAYS = takeaways([
    "Practice nurses don't bill Medicare directly — the GP (or practice) claims, including for services you deliver on their behalf.",
    "Item 10997 is the everyday nurse item for chronic condition management — it replaced the old item 10990.",
    "The GPCCMP (965) and its review (967) replaced the old GPMP (721) and TCA (723); both are GP-claimed — nurses prepare the data, the recall cycle and the paperwork.",
    "The MBS Online item description is the only authoritative source — fees are indexed regularly and rules change.",
])

A1_CTA = cta("""                    <p style="margin:0 0 1rem;"><strong>Spending your shift on care-plan paperwork?</strong> Docsert AI turns scattered notes and extracts into tidy, structured care-plan documents in minutes — works with Best Practice, and you review, edit and finalise every output. Free tier available, no practice sign-off needed to try it.</p>
                    <p style="margin:0;"><a href="../automations.html" style="color:#C4A661;font-weight:600;">See Docsert AI →</a> &nbsp;or&nbsp; <a href="../booking.html" style="color:#C4A661;font-weight:600;">book a free 30-minute demo call →</a></p>
""")

A1_FAQ = [
    ("Can practice nurses claim Medicare items themselves?",
     "No. Medicare claims in general practice are made by medical practitioners or by the practice on their behalf. Practice nurse services are billed under specific items — most commonly MBS item 10997 — which the GP claims for an attendance the nurse provides on their behalf, under the GP's supervision."),
    ("What is MBS item 10997?",
     "Item 10997 lets a GP claim for an attendance provided by a practice nurse on the GP's behalf as part of a patient's chronic condition management. It replaced the old practice nurse item 10990 in the move to the GP Chronic Condition Management Plan. Check the current MBS Online note for the full descriptor, eligibility conditions and claim-frequency limits."),
    ("What happened to GPMP (721) and TCA (723)?",
     "They were replaced by a single plan — the GP Chronic Condition Management Plan (GPCCMP, item 965) — with plan reviews under item 967. Old 721/723 references still appear in legacy records, letters and software reports, but new claims use the current item numbers."),
    ("Do practice nurses prepare the GPCCMP?",
     "Nurses commonly collect the information and draft the content — observations, pathology, medications, patient goals and provider details — but the plan is prepared and authorised by the GP. Keep the drafting work and the GP's authorisation clearly documented as separate steps."),
    ("How often can item 10997 be claimed for a patient?",
     "There are limits on the number of 10997 services per patient in a 12-month period, and the exact count has changed over time. Confirm the current limit in the MBS Online item note rather than relying on memory or practice folklore."),
    ("What changed in the MBS chronic condition items?",
     "The GPMP (721) and TCA (723) were replaced by the single GPCCMP (965), plan reviews moved to item 967, and the practice nurse item 10990 became 10997. Fees are still typically indexed each 1 November — treat MBS Online (mbsonline.gov.au) as the source of truth and subscribe to its updates."),
]

# ---------------------------------------------------------------------------
# Article 2 — Vaccine cold chain
# ---------------------------------------------------------------------------
A2 = dict(
    slug="vaccine-cold-chain-checklist",
    title="Vaccine Cold Chain Checklist for Practice Nurses: Strive for 5, Done Properly",
    meta_title="Vaccine Cold Chain Checklist (Strive for 5) for Practice Nurses | ClinicIQ",
    desc="A practice nurse's working checklist for vaccine cold chain management under the National Vaccine Storage Guidelines 'Strive for 5' — storage temperatures, twice-daily checks, breach steps and documentation.",
    image=f"{IMG_DIR}/Building Reliable.webp",
    category="Immunisation",
    h1="Vaccine Cold Chain Done Right: The Practice Nurse's Strive for 5 Checklist",
    excerpt="Vaccines worth thousands of dollars sit in your fridge right now. Here's the cold chain routine the National Vaccine Storage Guidelines ('Strive for 5') actually asks for — and the checklist to run it without thinking.",
)

A2_BODY = A2["body"] = """
                <p class="lead">Cold chain is one of those responsibilities that's invisible until it isn't. A practice's whole vaccine stock — often several thousand dollars, and always a community health asset — can be lost to one overnight fridge failure that nobody logged. The National Vaccine Storage Guidelines <strong>'Strive for 5'</strong> is the Australian standard for getting this right, and it's written to be run by practice nurses.</p>

{takeaways}
                <h2>The non-negotiables from 'Strive for 5'</h2>
                <p>The guidelines were published by the Department of Health, Disability and Ageing, with the current online edition released in September 2025. The core rules practice nurses live by:</p>
                <ul>
                    <li><strong>Store vaccines at +2°C to +8°C — 'Strive for 5'.</strong> The target is the midpoint, 5°C, because it gives you the biggest buffer on both sides of the range. Many vaccines are damaged or destroyed outside the range.</li>
                    <li><strong>Use a purpose-built vaccine refrigerator.</strong> Domestic fridges cycle too widely, have cold and hot spots, and lose temperature fast when opened. A purpose-built unit with a glass door, forced-air cooling and continuous temperature display is the recommended setup.</li>
                    <li><strong>Check and record temperatures twice a day</strong> — current, minimum and maximum — at a consistent time (e.g. first thing in the morning and before you leave), and reset the min/max after logging.</li>
                    <li><strong>Use a continuous data logger</strong> as well as the twice-daily manual checks, so overnight and weekend excursions are actually visible.</li>
                    <li><strong>Keep the log.</strong> Your twice-daily log is both a compliance document and the thing your state/territory health department will ask about after a breach.</li>
                </ul>
                <p>The guidelines also include ready-made resources — checklists, charts, posters and stickers — which are worth printing and laminating for the fridge door.</p>

                <h2>The twice-daily routine, as a 60-second checklist</h2>
                <ol>
                    <li>Open the fridge and read the <strong>current</strong> temperature on the unit's display.</li>
                    <li>Read the <strong>min/max</strong> since the last check.</li>
                    <li>Write all three values on the log sheet with the date, time and your initials.</li>
                    <li>Confirm the display reading matches the data logger (drift between the two is an early warning).</li>
                    <li><strong>Reset the min/max</strong> so tomorrow's numbers are clean.</li>
                    <li>Glance at stock: anything expired, unlabelled or sitting in the door shelf? Fix it now.</li>
                </ol>
                <p>If either reading is outside +2°C to +8°C, stop and go to the breach procedure — don't wait to see if it drifts back.</p>

                <h2>Cold chain breach: the first 30 minutes</h2>
                <p>Every nurse should be able to do this from memory:</p>
                <ol>
                    <li><strong>Preserve before you investigate.</strong> Keep the fridge door closed. If the fridge is clearly failing and can't hold temperature, move vaccines per your practice's written breach procedure (validated cool box with a data logger — never the door of a domestic fridge).</li>
                    <li><strong>Quarantine the stock.</strong> Label affected vaccines "do not use" — including stock that looks fine.</li>
                    <li><strong>Do not discard anything.</strong> Discarded vaccines can't be replaced under the National Immunisation Program, and the disposition decision isn't yours to make alone.</li>
                    <li><strong>Report.</strong> Notify the practice's responsible officer and your state or territory health department (immunisation unit) — they'll advise whether the stock can still be used, and how the event must be recorded. Discarded vaccines can't simply be replaced, which is why the report comes before the bin.</li>
                </ol>
                <p>The exact reporting contact varies by state and territory, so keep the current number printed on the fridge.</p>

                <h2>Documentation that survives an audit</h2>
                <p>Auditors and health department officers look for the same things: a complete, unbroken twice-daily log; evidence of data logger review; documented breach events with outcomes; fridge servicing and calibration records; and a named person (usually the practice nurse) responsible for cold chain. If any of those live only in someone's head, write them down this week.</p>
                <p>Your stock system matters here too. Tools like <a href="../automations.html">cIQventory</a> track vaccine stock and expiry alongside usage, so a breach stock-take takes minutes instead of an afternoon, and the ClinicIQ <a href="../downloads/templates.html">template library</a> includes practice documents you can adapt.</p>

                <h2>Make the fridge someone's explicit job</h2>
                <p>The practices that never lose stock share one habit: a named cold-chain owner (usually the senior practice nurse) with a delegate for leave, a printed Strive for 5 checklist on the fridge, and a monthly five-minute review of the data logger graph. Cold chain isn't hard — it's just unforgiving of inconsistency.</p>
"""

A2_TAKEAWAYS = takeaways([
    "Vaccines are stored at +2°C to +8°C, aiming for 5°C — 'Strive for 5' is the national guideline (current online edition September 2025).",
    "Purpose-built vaccine fridge, twice-daily min/max logging with resets, and a continuous data logger are the baseline setup.",
    "On a breach: keep the door closed, quarantine and label stock, discard nothing, and report to your state/territory health department.",
    "Name a cold-chain owner in the practice and keep the log, breach records and servicing paperwork audit-ready.",
])

A2_CTA = cta("""                    <p style="margin:0 0 1rem;"><strong>Know exactly what's in your vaccine fridge.</strong> cIQventory tracks stock, batch numbers and expiries so breach stock-takes and ordering take minutes. Free tier available.</p>
                    <p style="margin:0;"><a href="../automations.html" style="color:#C4A661;font-weight:600;">See cIQventory →</a> &nbsp;or&nbsp; <a href="../downloads/checklists.html" style="color:#C4A661;font-weight:600;">grab the free practice checklists →</a></p>
""")

A2_FAQ = [
    ("What temperature should vaccines be stored at in Australia?",
     "The National Vaccine Storage Guidelines 'Strive for 5' recommends storing vaccines at +2°C to +8°C, aiming for 5°C — the midpoint of the range. Many vaccines are damaged or destroyed at temperatures outside the range, which is why the target midpoint matters."),
    ("How often should the vaccine fridge be checked?",
     "Twice a day as a minimum: record the current, minimum and maximum temperatures, then reset the min/max. A continuous data logger should also run at all times so overnight and weekend excursions are captured."),
    ("Can we use a domestic fridge for vaccines?",
     "'Strive for 5' recommends a purpose-built vaccine refrigerator. Domestic fridges have wide temperature cycles, cold and hot spots, and lose temperature quickly when opened, which puts stock at risk. If a domestic fridge is used in an emergency, it needs extra monitoring and is not a long-term solution."),
    ("What do I do immediately after a cold chain breach?",
     "Keep the fridge door closed, quarantine and label the affected stock 'do not use', do not discard any vaccines, and report the breach to the practice's responsible officer and your state or territory health department immunisation unit. They advise whether the stock remains usable — discarded NIP vaccine generally cannot be replaced."),
    ("Where do I get the current Strive for 5 resources?",
     "The guidelines, checklists, charts and posters are published by the Australian Government Department of Health, Disability and Ageing on health.gov.au. The current online edition was released in September 2025."),
]

# ---------------------------------------------------------------------------
# Article 3 — Flu clinic run-sheet
# ---------------------------------------------------------------------------
A3 = dict(
    slug="flu-clinic-run-sheet-practice-nurses",
    title="Flu Clinic Run-Sheet: How Practice Nurses Run a Smooth Influenza Season",
    meta_title="Flu Clinic Run-Sheet for Australian Practice Nurses (2026) | ClinicIQ",
    desc="A practical flu clinic run-sheet for Australian practice nurses: planning timeline, on-the-day stations, AIR documentation, cold chain and adverse event reporting — plus the digital shortcuts that save hours.",
    image=f"{IMG_DIR}/5 Ways to Automate.webp",
    category="Immunisation",
    h1="The Flu Clinic Run-Sheet: A Practice Nurse's Guide to a Smooth Season",
    excerpt="Flu season rewards preparation and punishes improvisation. This run-sheet covers the six-week countdown, the four-station clinic flow, and the documentation that keeps your season audit-proof.",
)

A3_BODY = A3["body"] = """
                <p class="lead">In most Australian practices, the flu clinic is a practice nurse production. You plan it, you staff it, you run the room, and you live with whatever wasn't prepared. A good run-sheet is the difference between a clinic that vaccinates steadily for three hours and one that descends into queue chaos with a cold chain problem at the end of it.</p>

{takeaways}
                <h2>Six weeks out: the planning checklist</h2>
                <ul>
                    <li><strong>Order vaccine</strong> — National Immunisation Program (NIP) stock through your state/territory arrangement and private stock through your supplier. Check fridge capacity before you over-order; your cold chain is part of the plan.</li>
                    <li><strong>Set the clinic dates</strong> around the season. Vaccination timing matters: protection wanes across the season, so ATAGI advice is to vaccinate from around April (in most years) so immunity is strongest when the season peaks — typically June to September. Check the current annual statement rather than reusing last year's dates.</li>
                    <li><strong>Build the recall list</strong> — eligible risk groups first (65+, young children with risk conditions, pregnant women, Aboriginal and Torres Strait Islander patients, and other NIP-eligible groups per the current ATAGI advice), then the general demand.</li>
                    <li><strong>Confirm staff immuniser credentials.</strong> In every state and territory, nurses vaccinate as authorised nurse immunisers once they've completed an accredited immunisation program and met local requirements — verify yours and any new staff members' are current.</li>
                    <li><strong>Check the emergency kit</strong> — adrenaline, anaphylaxis plan, expiry dates, and that everyone working the clinic knows where it is and how it's used.</li>
                    <li><strong>Book the rooms</strong> and think in stations, not appointments (below).</li>
                </ul>

                <h2>On the day: the four-station flow</h2>
                <ol>
                    <li><strong>Check-in.</strong> Front desk confirms identity and eligibility, hands over the pre-vaccination screening form. Batch-check-in through the practice software keeps the queue moving.</li>
                    <li><strong>Screening &amp; consent.</strong> The nurse runs through the pre-vaccination screening checklist (illness on the day, previous reactions, allergies), answers questions, and obtains consent. Pregnant patients and risk groups get flagged for the correct funded formulation.</li>
                    <li><strong>Vaccination.</strong> Right vaccine, right dose, right site — and straight into documentation (next section). Vaccine stays in the cold chain until the moment it's drawn up: cool boxes with data loggers beat fridge runs every time.</li>
                    <li><strong>Observation.</strong> The recommended wait of around 15 minutes post-vaccination, with the observer trained to recognise anaphylaxis and start the protocol. Seat this station away from the exit — people leave if you let them.</li>
                </ol>
                <p>Throughput tip: one nurse can comfortably screen-and-vaccinate when check-in and observation run as separate stations with a second staff member. If the queue backs up, open a second vaccination chair before you rush the screening.</p>

                <h2>Documentation: close the loop before the patient leaves</h2>
                <ul>
                    <li><strong>Record the encounter in the practice software</strong> — vaccine, brand, batch, expiry, dose, site, and the consent — on the day.</li>
                    <li><strong>Report to the Australian Immunisation Register (AIR).</strong> Vaccination providers are required to report influenza vaccinations to the AIR — this is what protects patients from double-dosing and keeps their records complete.</li>
                    <li><strong>Reconcile stock</strong> at the end of each clinic day: doses used vs doses drawn, cold chain log complete, and any temperature excursions handled through the breach procedure.</li>
                    <li><strong>Report adverse events.</strong> Suspected reactions go to your state/territory AEFI process (which feeds the TGA's database) — and the patient leaves knowing exactly how to reach you if they're worried.</li>
                </ul>

                <h2>The digital shortcuts that save the most hours</h2>
                <p>The heavy time costs of flu season aren't the injections — they're the recalls, the reminder lists, the double-bookings and the stock chasing. This is where <a href="../automations.html">NursEpod</a> earns its keep: your shift's task list handled with smart prioritisation, dashboards and team messaging in one view, so recalls actually get worked instead of quietly slipping. Pair it with the ClinicIQ <a href="../downloads/checklists.html">checklists</a> for the emergency kit and cold chain, and the flu clinic runs on rails.</p>
                <p>And if you want a second pair of eyes on your clinic plan before the season starts, <a href="../booking.html">book a free demo call</a> — we run through your recall setup and where the hours are leaking.</p>
"""

A3_TAKEAWAYS = takeaways([
    "Plan six weeks out: vaccine orders matched to fridge capacity, recalls for NIP-eligible risk groups first, and current ATAGI timing advice.",
    "Run the clinic as four stations — check-in, screening/consent, vaccination, observation (~15 minutes) — so one nurse can vaccinate steadily.",
    "Document on the day and report every influenza vaccination to the Australian Immunisation Register (AIR).",
    "Keep the vaccine in the cold chain until drawn up, reconcile stock daily, and know your AEFI reporting path.",
])

A3_CTA = cta("""                    <p style="margin:0 0 1rem;"><strong>Keep flu season off your back foot.</strong> NursEpod handles your shift's task list — recalls, priorities and team messaging in one view — so clinic days run themselves. Free tier, month-to-month if you keep it.</p>
                    <p style="margin:0;"><a href="../automations.html" style="color:#C4A661;font-weight:600;">See NursEpod →</a> &nbsp;or&nbsp; <a href="../booking.html" style="color:#C4A661;font-weight:600;">book a free setup session →</a></p>
""")

A3_FAQ = [
    ("When should flu clinics start in Australia?",
     "Timing follows the current ATAGI advice each year. As a general pattern, vaccination is offered from around April so that protection is strongest through the peak season (typically June to September), because immunity wanes over the months following vaccination. Check the current ATAGI statement on seasonal influenza vaccination rather than copying the previous year's schedule."),
    ("Can practice nurses administer influenza vaccines in Australia?",
     "Yes — as authorised nurse immunisers. Requirements include completing an accredited immunisation program and meeting your state or territory's authorisation requirements. Practices should verify each nurse's credentials are current before the season starts."),
    ("Do patients really need to wait 15 minutes after a flu vaccine?",
     "The Australian Immunisation Handbook recommends that vaccine recipients remain under observation for around 15 minutes after vaccination because of the small risk of anaphylaxis. Building the wait into your run-sheet — with staff trained to recognise and respond to anaphylaxis — is part of a safe clinic."),
    ("Do we have to report flu vaccinations to the Australian Immunisation Register?",
     "Yes. Vaccination providers are required to report influenza vaccinations to the AIR. Reporting on the day of the clinic keeps records complete and prevents duplicate vaccination elsewhere."),
    ("How far ahead should we order flu vaccine?",
     "Order early enough to cover your planned clinics, but size the order to your actual fridge capacity — over-ordering creates cold chain and wastage problems. NIP vaccine is ordered through your state or territory health department process, and private vaccine through your supplier."),
]


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------

ARTICLES = [
    (A1, A1_BODY.format(takeaways=A1_TAKEAWAYS), A1_CTA, A1_FAQ,
     ["MBS", "chronic condition management", "item 10997", "GPCCMP", "practice nurse"],
     [
         ("3 September 2026", "vaccine-cold-chain-checklist.html",
          "Vaccine Cold Chain Done Right: The Practice Nurse's Strive for 5 Checklist",
          "The twice-daily routine, breach first-30-minutes and audit-proof documentation for your vaccine fridge."),
         ("3 September 2026", "flu-clinic-run-sheet-practice-nurses.html",
          "The Flu Clinic Run-Sheet: A Practice Nurse's Guide to a Smooth Season",
          "The six-week countdown, four-station clinic flow and AIR documentation that keeps flu season calm."),
         ("1 Feb 25", "gp-clinic-automation-2026.html",
          "5 Ways to Automate Your GP Clinic in 2026",
          "Automation strategies for Australian GP clinics, from AI care plans to patient communications."),
     ]),
    (A2, A2_BODY.format(takeaways=A2_TAKEAWAYS), A2_CTA, A2_FAQ,
     ["cold chain", "Strive for 5", "immunisation", "vaccine storage", "practice nurse"],
     [
         ("3 September 2026", "cdm-mbs-items-practice-nurses.html",
          "MBS Chronic Condition Management Items: The Practice Nurse's Guide",
          "GPCCMP (965), reviews (967) and item 10997 explained for Australian practice nurses — who claims what and the paperwork traps."),
         ("3 September 2026", "flu-clinic-run-sheet-practice-nurses.html",
          "The Flu Clinic Run-Sheet: A Practice Nurse's Guide to a Smooth Season",
          "Plan the six-week countdown, the four-station flow and the documentation that keeps your season audit-proof."),
         ("1 Feb 25", "gp-clinic-automation-2026.html",
          "5 Ways to Automate Your GP Clinic in 2026",
          "Automation strategies for Australian GP clinics, from AI care plans to patient communications."),
     ]),
    (A3, A3_BODY.format(takeaways=A3_TAKEAWAYS), A3_CTA, A3_FAQ,
     ["flu clinic", "influenza", "immunisation", "AIR", "practice nurse"],
     [
         ("3 September 2026", "vaccine-cold-chain-checklist.html",
          "Vaccine Cold Chain Done Right: The Practice Nurse's Strive for 5 Checklist",
          "The twice-daily routine, breach first-30-minutes and audit-proof documentation for your vaccine fridge."),
         ("3 September 2026", "cdm-mbs-items-practice-nurses.html",
          "MBS Chronic Condition Management Items: The Practice Nurse's Guide",
          "GPCCMP (965), reviews (967) and item 10997 explained for Australian practice nurses — who claims what and the paperwork traps."),
         ("20 Mar 26", "ai-healthcare-guide-gp-practices.html",
          "AI in Healthcare: The Complete Guide for Australian GP Practices",
          "Automated documentation, care plans, diagnostics and patient communication with practical strategies."),
     ]),
]

DISCLAIMER_A2 = DISCLAIMER
DISCLAIMER_A3 = DISCLAIMER
DISCLAIMER_A1 = DISCLAIMER

template = TEMPLATE.read_text()


def render(article, body, cta_html, faq, tags, related):
    slug = article["slug"]
    url = f"{SITE}/blog/{slug}.html"
    out = template

    # --- head metas ---
    out = re.sub(r"<title>.*?</title>", f"<title>{article['meta_title']}</title>", out, count=1, flags=re.S)
    out = re.sub(r'<meta name="description" content="[^"]*">',
                 f'<meta name="description" content="{article["desc"]}">', out, count=1)
    out = re.sub(r'<link rel="canonical" href="[^"]*">',
                 f'<link rel="canonical" href="{url}">', out, count=1)
    for prop in ("og:title", "twitter:title"):
        out = re.sub(rf'<meta property="{prop}" content="[^"]*">', f'<meta property="{prop}" content="{article["title"]}">', out, count=1)
        out = re.sub(rf'<meta name="{prop}" content="[^"]*">', f'<meta name="{prop}" content="{article["title"]}">', out, count=1)
    for prop in ("og:description", "twitter:description"):
        out = re.sub(rf'<meta property="{prop}" content="[^"]*">', f'<meta property="{prop}" content="{article["desc"]}">', out, count=1)
        out = re.sub(rf'<meta name="{prop}" content="[^"]*">', f'<meta name="{prop}" content="{article["desc"]}">', out, count=1)
    out = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', out, count=1)
    out = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{article["image"]}">', out, count=1)
    out = re.sub(r'<meta name="twitter:image" content="[^"]*">', f'<meta name="twitter:image" content="{article["image"]}">', out, count=1)

    # --- JSON-LD blocks: replace all three with new set + FAQPage ---
    first_ld = out.index('<script type="application/ld+json">')
    last_ld_end = out.rindex("</script>", 0, out.index("<style>")) + len("</script>")
    new_ld = ld_block(
        org_ld(),
        breadcrumb_ld(article["title"], slug),
        blogposting_ld(article["title"], article["desc"], slug, article["image"]),
        faq_ld(faq),
    )
    out = out[:first_ld] + new_ld + out[last_ld_end:]

    # --- main content ---
    main_start = out.index('<main id="main-content">')
    main_end = out.index("</main>") + len("</main>")
    body_html = (
        header_block(article["category"], article["h1"], article["excerpt"])
        + body
        + DISCLAIMER
        + faq_html(faq)
        + cta_html
        + closing(tags)
    )
    out = out[:main_start] + body_html + out[main_end:]

    # --- related articles ---
    rel_start = out.index("<!-- Related Articles -->")
    rel_end = out.index("</section>", rel_start) + len("</section>")
    out = out[:rel_start] + related_block(related).strip() + out[rel_end:]

    return out


for article, body, cta_html, faq, tags, related in ARTICLES:
    html = render(article, body, cta_html, faq, tags, related)
    dest = ROOT / "blog" / f"{article['slug']}.html"
    dest.write_text(html)
    print(f"wrote {dest.relative_to(ROOT)} ({len(html)} bytes)")
