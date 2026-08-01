# Plan · Reveal Videos Section (Bento, 8 YT Videos)

## Brief
Reveal the existing hidden `.videos-section` on `index.html`, populate it with 8 real YouTube videos in a bento grid (using each video's actual title), relocate it to sit *above* the "How We Help" (`#problem-solution`) section, and add a non-client-facing credits citation for the production tools.

## Stack
- HTML5 (static `index.html`)
- CSS3 (`styles.css`, existing bento grid classes already defined)
- Vanilla JavaScript (inline modal script already present)
- YouTube `youtube-nocookie.com` embeds + `img.youtube.com` thumbnails
- No new deps, no build step

## Scope
**Visuals**
- Bento grid of 8 video cards using the existing `.videos-bento-grid` / `.video-card` system
- Real YouTube thumbnails via `img.youtube.com/vi/{id}/mqdefault.jpg`
- Real video titles (fetched from oEmbed) shown under each card
- One large feature card (video 1) + 7 standard cards to fill the bento rhythm cleanly
- Section header reads "Surviving GP Clinic" with subtitle "Practical insights for healthcare practice management"

**Functionality**
- Each card click opens YouTube in new tab (lighter than iframes, avoids 8x slow YT embeds loading on page)
- "View All Videos" tile still opens the existing modal (repopulated with the 8 real videos)
- Modal JS unchanged in behaviour, just wired to real links/thumbs
- Lazy-loaded thumbnails (`loading="lazy"`) below the fold

## Out of Scope
- No new pages (videos.html, etc.)
- No replacement of the hero showcase video
- No touching the Problem/Solution "How We Help" content itself, only its position relative to the videos section
- No new CSS framework or JS dependency
- No autoplay iframes (perf + UX cost not worth it for 8 videos)

## Constraints
- Section must render *above* `#problem-solution` in DOM order
- Keep the existing `hero-cover-stack` wrapper intact (the `.hero + section` selector depends on order)
- Honour `_headers` immutable cache rules, no new build artefacts
- Australian English in any visible copy
- Credits block is non-client-facing (HTML comment only, not rendered)

## Definition of Done
On `index.html`, the `.videos-section` is visible, contains exactly 8 YouTube video cards with real titles and thumbnails, sits immediately above the `#problem-solution` section, and the modal lists the same 8 videos with working `youtube.com/watch?v=` links.

## Acceptance Criteria
- `.videos-section` no longer hidden (the `display:none` override at `styles.css:9178` is removed)
- Section moved above `#problem-solution` in `index.html` DOM
- Exactly 8 `.video-card` tiles in the bento grid, plus the existing "View All" trigger
- Each card uses its real YouTube ID and real title (no `dQw4w9WgXcQ` placeholders remain in the section)
- First video is the large feature card (`video-card-large`)
- Modal `.video-list-item` entries rebuilt to the same 8 real IDs/titles/thumbs
- All 8 video IDs present and correct: `kUXetWV7JYM, cOzTymoEThc, tZrluyIzsSQ, kBEGuxyIYlQ, 9-DBKaPQZjY, AMMUzUPzCSM, p2xXeJ7lh28, yZoljrfMfYs`
- Non-client-facing credits HTML comment cites Fish Audio, Voicebox, Pixabay (Infographic Tutorial Explainer Music, ID 441373), GLM, Frameblock
- No other sections of `index.html` altered

## Verification
- `grep -c "dQw4w9WgXcQ" index.html` returns 0 (all placeholder IDs purged)
- `grep -c "kUXetWV7JYM\|cOzTymoEThc\|tZrluyIzsSQ\|kBEGuxyIYlQ\|9-DBKaPQZjY\|AMMUzUPzCSM\|p2xXeJ7lh28\|yZoljrfMfYs" index.html` returns 16 (8 in cards + 8 in modal)
- `grep -n "display: none" styles.css` no longer hits `.videos-section`
- DOM order check: `grep -n "videos-section\|problem-solution" index.html` shows videos line number < problem-solution line number
- Open `index.html` locally, confirm section visible above "How We Help", 8 thumbnails load, modal opens with 8 entries

## Turn Budget
Stop after 8 turns, or sooner once DoD holds.

## References
- Existing section: `index.html:787-881`
- Existing modal: `index.html:1347-1446`
- Hide rule: `styles.css:9177-9180`
- Bento CSS: `styles.css:8834-8927`
- Pixabay music license: `~/Downloads/upbeat-infographic-tutorial-explainer-music-441373-license.txt`

## Risks / Open Questions
- Iframes vs link-cards: chose link-cards (8 live YT iframes would hammer perf and clash with the LCP < 2.5s budget in AGENTS.md). CONFIRMED by user — link-cards opening in new tab.
- Bento layout uses existing `video-card-large` (2x2) + standard cards. 8 videos = 1 large + 7 standard, which fills a 3-col grid unevenly on wide screens. Will keep the existing "View All" tile as the 9th cell to balance, same as current design.
- Cover-stack structural note (RESOLVED by inspection): the `.hero-cover-stack` wrapper pins the hero and applies the "rising sheet" effect to `.hero + section`. Inserting videos between hero and `#problem-solution` makes videos the covering sheet instead of How-We-Help. This is the generic, intended behaviour per the CSS comment. `#problem-solution` has its own opaque `#FAFBFD` gradient (`styles.css:1583`) so no hero bleed-through; it just loses the elevation box-shadow, which is cosmetic. Decision: insert videos inside `.hero-cover-stack`, after hero closes (line 512), before `#problem-solution`. No CSS changes needed beyond removing the hide rule.
