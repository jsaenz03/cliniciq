---
format: 1920x1080
message: "Five foundational moves optimise a GP clinic's operation — fast."
arc: "Hook → 5 items (Macros · BPMN · Trackers · Workflow · Care Plans) → CTA"
structure: listicle
audience: "GP clinic owners, practice managers, and operations leads drowning in admin"
music: silent
voiceover_mode: none
captions: skipped (silent, text-driven — no spoken-word caption layer)
---

# Storyboard — "5 basic things you can do to optimise your operation fast!"

A silent, text-driven **blockframe** listicle for the ClinicIQ hero. The motion + typography carry it (plays muted as a hero loop, or fullscreen with sound). One consistent "item block" stage across the five points — only the pastel ground cycles — so the items read as one continuous countdown. All figures come straight from the source notes; nothing invented.

## Video direction

- **Palette system (from `frame.md` — never invent):** ink/navy `#2a3d42` = every border, hard offset shadow, structural display text, and the closer's inverted ground; canvas off-white `#FAFBFD` / offwhite `#FCFBF8` = card fills + default ground; accent **gold `#C4A661`** = CTA, the closer's coloured offset shadow, and the single emphasis hit per frame. The five repainted pastels (warm cream `#EEE5D0`, soft blue `#9CC6F2`, gold-tan `#D8C495`, light blue `#a9cef4`) **cycle as the full-bleed ground, one per item frame** — the cycle is the rhythm. Black-on-white blockframe atoms (4px borders ↔ 8px hard shadows, square corners, label-pills, tilted decorations, star bursts, dot-grid) are sacred; only the hues are ClinicIQ's.
- **Shot model + motion defaults:** every frame is a directed shot `entrance → development → settle`, never enter-then-freeze. One **camera move per shot, always on** (slow dolly-in / push). Spring intents by role: hero numerals/stats = `heavy`; label-pills, bullets, list items = `snappy`; decorations, grounds = `gentle`. Single paused GSAP timeline, seek-safe — **no `repeat`/`yoyo`, no `Math.random`/`Date.now`, no infinite loops** (idle = a bounded finite tween). Stagger totals ≤ 500ms. Single entry ≤ ~800ms.
- **Idle-life budget:** camera move (always) + **at most one** live element per frame — the hero numeral/stat breathes ±3% (`sine-wave-loop`), or the star-burst/tilt-deco gentle rotational drift. Nothing floats independently.
- **Negative list (never appears):** no rounded corners (blockframe — only the 12px stat-deco dot is round), no blurred shadows (hard offset **navy** only, zero blur), no coloured borders (navy only — white on the closer), no sixth pastel, no `bounce.out`/`elastic.out`, no purple-to-blue "AI cliché" gradients. **Both motion failure modes banned:** slideshow (content enters then freezes) and screensaver (many elements floating independently).
- **Stillness allocation:** **Frame 7 (closer)** holds a `stillness-before-climax` (~0.5s) before the CTA click lands; every other frame develops mid-shot.
- **Caption band:** captions skipped (no narration), but content still planned into the **top ~83%** (above y≈900) for bottom-edge consistency; full-bleed grounds + decorations are exempt.

## Frame 1 — Title (the hook)

- type: hook
- duration: 3.5s
- poster: 2.5s
- transition_in: cut
- src: compositions/frames/01-title.html
- status: animated
- scene: Cover plate — giant uppercase title "5 BASIC THINGS YOU CAN DO TO OPTIMISE YOUR OPERATION FAST!", ClinicIQ label-pill eyebrow, a "5 WAYS" counter pill, tilted pastel blocks + a star burst puncturing the right third.
- persuasion: Concept announcement + numbered enumeration
- beat: Curiosity + anticipation
- voiceover:
- blueprint: kinetic-type-beats  (Adapt — Base: kinetic-type-beats · Keep: in-place beat-by-beat build landing a spring-pop payoff · Depart: blockframe cover surface — label-pill + counter eyebrow, tilted pastel rects + star-burst puncturing the right, dot-grid ground — instead of bare centred type)
- effects: kinetic-beat-slam, spring-pop-entrance, ambient-glow-bloom
- focal: the title line, landing on "FAST!"
- roles: title = foreground subject (hero); "5 WAYS" counter + ClinicIQ label-pill = supporting; tilted pastel rects + star-burst = decoration; dot-grid = background
- composition: Macro: slow dolly-in on the root across the whole beat. **Entrance** — ClinicIQ label-pill + "5 WAYS" counter snap in (snappy) top-left; dot-grid fades up (gentle). **Development** — the title builds beat-by-beat across the frame (`kinetic-beat-slam`): "5 BASIC THINGS" → "YOU CAN DO" → "TO OPTIMISE YOUR OPERATION", then **"FAST!"** lands as the `spring-pop-entrance` payoff with a single gold emphasis hit; tilted pastel rects puncture in from the right, the star-burst spins in. **Settle** — title holds under a soft gold `ambient-glow-bloom` behind "FAST!"; idle: star-burst gentle rotational drift + "FAST!" breathes ±3% (the one live element). Asymmetric 60/40 — title left, decorations right third.

narrativeRole: Open the cognitive gap and stake the promise — name the list and its payoff ("fast") in one punch.
keyMessage: There are five basic, high-leverage moves that make a clinic's operation run dramatically faster.

## Frame 2 — 01 · Excel Formulas & Macros

- type: feature_showcase
- duration: 5s
- poster: 2.5s
- transition_in: push-slide LEFT
- src: compositions/frames/02-macros.html
- status: animated
- scene: Item block on a warm cream-tint ground — giant "01" numeral, "AUTOMATE" label-pill, stat headline "12+ HOURS SAVED EVERY WEEK", three checkmark benefit rows, action strip "Build → Test → Deploy".
- persuasion: Concretization (12+ hrs) + worked example
- beat: Comprehension + momentum
- voiceover:
- blueprint: grid-card-assemble  (Reproduce)
- effects: spring-pop-entrance, counting-dynamic-scale, svg-path-draw
- focal: the "12+" stat numeral
- roles: "12+ HOURS" stat = foreground subject; "01" numeral + AUTOMATE label-pill + headline = supporting; 3 checkmark benefit rows = supporting list; action strip = supporting; warm-cream ground + tilted gold rect = background/decoration
- composition: Macro: slow push-in. **Entrance** — giant "01" numeral seats top-left (`heavy`), "AUTOMATE" label-pill snaps in. **Development** — the item block self-assembles as a staggered cascade (`grid-card-assemble`): headline "12+ HOURS SAVED EVERY WEEK" drops in, then the "12+" count-ups (`counting-dynamic-scale`, font scaling with the value), then the 3 checkmark rows stagger in (snappy, ≤500ms total), then the action strip's 3 steps connect with `svg-path-draw` connector lines. **Settle** — "12+" breathes ±3% as the one live element; a tilted gold rect gentle-floats. Consistent item-block stage; content in the top ~83%.

narrativeRole: First item of the listicle — automate the repetitive admin that eats the week.
keyMessage: Excel formulas and macros turn hours of manual data entry into one-click, error-free reports.

## Frame 3 — 02 · BPMN Process Mapping

- type: feature_showcase
- duration: 5s
- poster: 2.5s
- transition_in: push-slide LEFT
- src: compositions/frames/03-bpmn.html
- status: animated
- scene: Same item-block stage, ground shifts to a soft blue tint — giant "02" numeral, "MAP IT" label-pill, headline "SEE WHERE PATIENTS GET STUCK", a small BPMN flow motif in the bullets, action strip "Layout → Spot flaws → Decide".
- persuasion: Analogy (make the workflow visual) + progressive disclosure
- beat: Clarity
- voiceover:
- blueprint: grid-card-assemble  (Reproduce)
- effects: spring-pop-entrance, svg-path-draw, ambient-glow-bloom
- focal: a small BPMN-style flow motif (3 nodes + connectors) that draws itself, with one bottleneck node glowing gold
- roles: flow motif = foreground subject; "02" numeral + MAP IT label-pill + headline = supporting; 3 checkmark rows = supporting; action strip = supporting; soft-blue ground + tilted blue rect = background/decoration
- composition: Macro: slow push-in. **Entrance** — "02" + "MAP IT" label-pill snap in top-left. **Development** — block assembles (`grid-card-assemble`): headline "SEE WHERE PATIENTS GET STUCK" lands, then the BPMN flow motif draws itself stroke-by-stroke (`svg-path-draw`) and one bottleneck node blooms gold (`ambient-glow-bloom`) to literalise "where patients get stuck", then the 3 checkmark rows + action strip stagger in. **Settle** — the bottleneck node's glow pulses as the one live element; a tilted blue-rect gentle-floats. Same stage; soft-blue-tint ground.

narrativeRole: Second item — make the invisible workflow visible so bottlenecks can't hide.
keyMessage: BPMN process maps expose exactly where patients get stuck so you can redesign with clarity.

## Frame 4 — 03 · Performance Trackers

- type: feature_showcase
- duration: 5s
- poster: 2.5s
- transition_in: push-slide LEFT
- src: compositions/frames/04-trackers.html
- status: animated
- scene: Same item-block stage, ground shifts to a gold tint — giant "03" numeral, "MEASURE IT" label-pill, headline "STOP GUESSING. START MEASURING.", three checkmark rows, action strip "Define → Collect → Review".
- persuasion: Contrast (guessing vs measuring) + signposting
- beat: Orientation + conviction
- voiceover:
- blueprint: grid-card-assemble  (Reproduce)
- effects: spring-pop-entrance, stat-bars-and-fills, sine-wave-loop
- focal: a mini KPI bar trio that grows, with a live trendline
- roles: KPI bar trio = foreground subject; "03" numeral + MEASURE IT label-pill + headline = supporting; 3 checkmark rows = supporting; action strip = supporting; gold-tint ground + tilted rect = background/decoration
- composition: Macro: slow push-in. **Entrance** — "03" + "MEASURE IT" label-pill snap in. **Development** — block assembles (`grid-card-assemble`): headline "STOP GUESSING. START MEASURING." lands, then the mini KPI bar trio grows (`stat-bars-and-fills`, scaleY stagger) with a small trendline, then the 3 checkmark rows + action strip stagger in. **Settle** — the tallest KPI bar's trendline runs a bounded `sine-wave-loop` idle (the one live element); gold-tint ground.

narrativeRole: Third item — replace gut feel with live measurement.
keyMessage: Real-time KPI trackers turn guesswork into evidence you can act on before problems grow.

## Frame 5 — 04 · Workflow Automation

- type: feature_showcase
- duration: 5s
- poster: 2.5s
- transition_in: push-slide LEFT
- src: compositions/frames/05-workflow.html
- status: animated
- scene: Same item-block stage, ground shifts to a soft green tint — giant "04" numeral, "CHAIN IT" label-pill, stat headline "73% LESS HUMAN ERROR", a small node-chain motif, action strip "Map steps → Find triggers → Automate".
- persuasion: Statistical proof (73%) + causal chain
- beat: Conviction (proof)
- voiceover:
- blueprint: grid-card-assemble  (Reproduce)
- effects: spring-pop-entrance, counting-dynamic-scale, svg-path-draw
- focal: the "73%" stat numeral
- roles: "73% LESS HUMAN ERROR" stat = foreground subject; "04" numeral + CHAIN IT label-pill + headline = supporting; 3 checkmark rows = supporting; action strip = supporting; soft-green ground + tilted rect = background/decoration
- composition: Macro: slow push-in. **Entrance** — "04" + "CHAIN IT" label-pill snap in. **Development** — block assembles (`grid-card-assemble`): "73% LESS HUMAN ERROR" lands, "73%" count-ups (`counting-dynamic-scale`), a small node-chain motif draws across (`svg-path-draw`) to literalise "chain tasks together", then the 3 checkmark rows + action strip stagger in. **Settle** — "73%" breathes ±3% as the one live element; soft-green-tint ground.

narrativeRole: Fourth item — link the pieces into end-to-end automations.
keyMessage: Chaining tasks into event-driven workflows cuts human error by 73% and removes the copy-paste glue.

## Frame 6 — 05 · Care Plan Automation

- type: feature_showcase
- duration: 5s
- poster: 2.5s
- transition_in: push-slide LEFT
- src: compositions/frames/06-care-plans.html
- status: animated
- scene: Same item-block stage, ground shifts to a light-blue tint — giant "05" numeral, "SCALE IT" label-pill, before/after stat headline "30 MIN → 30 SEC", three checkmark rows, action strip "Build template → Link fields → Generate".
- persuasion: Before/after contrast
- beat: Delight (dramatic payoff — the climax item)
- voiceover:
- blueprint: grid-card-assemble  (Adapt — Base: grid-card-assemble · Keep: staggered self-assembly cascade into the item block · Depart: the focal is a before/after split stat (two tilted cards) rather than a single list, because the 30 MIN → 30 SEC contrast IS the message)
- effects: spring-pop-entrance, counting-dynamic-scale, split-tilt-cards
- focal: the "30 MIN → 30 SEC" before/after stat
- roles: before/after stat = foreground subject; "05" numeral + SCALE IT label-pill + headline = supporting; 3 checkmark rows = supporting; action strip = supporting; light-blue ground + tilted rect = background/decoration
- composition: Macro: slow push-in. **Entrance** — "05" + "SCALE IT" label-pill snap in. **Development** — block assembles (`grid-card-assemble`): the before/after stat enters as **two mirrored tilted cards** (`split-tilt-cards`) — "30 MIN" (muted/struck-through) left, "30 SEC" (gold, `spring-pop-entrance`) right with a "30" count-up (`counting-dynamic-scale`); headline lands; 3 checkmark rows + action strip stagger in. **Settle** — "30 SEC" breathes ±3% as the one live element; light-blue-tint ground. Climax frame — give the payoff the biggest read.

narrativeRole: Fifth and punchiest item — the dramatic time compression that proves the whole list pays off.
keyMessage: Care plan automation turns 30-minute documentation into a 30-second, never-miss delivery.

## Frame 7 — Get Started (the close)

- type: cta
- duration: 3.5s
- poster: 2s
- transition_in: crossfade
- src: compositions/frames/07-get-started.html
- status: animated
- scene: Closing plate on the inverted navy ground — gold-offset-shadowed frame, close-title "OPTIMISE YOUR OPERATION — FAST", a "GET STARTED →" CTA pill, a small ClinicIQ wordmark, a star burst puncturing a corner.
- persuasion: Distillation + callback
- beat: Resolve + inevitability
- voiceover:
- blueprint: cta-morph-press  (Reproduce)
- effects: spring-pop-entrance, physics-press-reaction, ambient-glow-bloom
- focal: the "GET STARTED →" gold CTA pill
- roles: CTA pill = foreground subject; close-title "OPTIMISE YOUR OPERATION — FAST" = supporting; ClinicIQ wordmark = supporting; inverted navy ground + gold-shadow frame = background; star-burst = decoration
- composition: Macro: slow dolly-in. **Entrance** — the inverted navy close-frame seats with its gold offset shadow (`spring-pop-entrance`, `heavy`); close-title "OPTIMISE YOUR OPERATION — FAST" snaps in. **Development** — a ClinicIQ wordmark condenses at centre and morphs into the gold "GET STARTED →" CTA pill (`cta-morph-press`); a cursor arrives and lands a tactile click (`physics-press-reaction`) with a gold ripple. **Stillness-before-climax ~0.5s** before the click lands (allocated closer; only the dolly continues). **Settle** — the CTA pill glow pulses (`ambient-glow-bloom`) as the one live element; a star-burst punctures a corner. Low density, centred, ~50% air.

narrativeRole: Land the thesis and drive the single next action.
keyMessage: Start with these five basics and your operation runs faster this week — get started with ClinicIQ.
