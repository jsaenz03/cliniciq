# Animation Cohesion Audit + Conservative Fixes — ClinicIQ

## Audit findings (evidence-backed)

### A. Bugs (motion is broken or no-op today)
1. **Undefined token** — `styles.css:7980` uses `transition: opacity var(--transition-medium)` but `--transition-medium` is never defined in `:root` → the practice-card video-placeholder hover has **no** transition.
2. **Broken reduced-motion rule** — `styles.css:2091` `.specialty-card { transition: transform 0.3s var(--ease-smooth), ; }` has a trailing comma → invalid declaration → specialty-card loses its transition under `prefers-reduced-motion`.
3. **Empty `glow` keyframe** — `styles.css:7583` `@keyframes glow { 0%,100%{} 50%{} }` has no properties, but `animation: glow 3s ease-in-out infinite` is applied to **2 CTA elements** (`7464`, `7514`) → they animate nothing.
4. **3 identical `@keyframes spin`** — defined at `4054`, `5730`, `5950` (all rotate 0→360deg) → wasteful duplication, last definition wins.

### B. Inconsistency — similar elements, different motion
- **Card hovers use two different easings** for the same `translateY(-4px)` lift:
  - `.specialty-card` → `--ease-smooth` = `cubic-bezier(0.4,0,0.2,1)` (`2091`)
  - `.portfolio-item`, `.blog-card`, `.download-category` → `cubic-bezier(0.16,1,0.3,1)` (`3779`)
- **`cubic-bezier(0.16,1,0.3,1)` hardcoded 19×** (`1719,1877,1892,2073,2111,3737,3779,3793,3808,3915,3928,4163,4723,4942,5037,6310,6996,7036` + 1) — it's the de-facto interactive/card ease but has no token.

### C. Flagged, NOT changed this pass (Conservative scope — per your choice)
- Stray fade durations (`0.3s/0.45s/0.5s/0.8s` opacity fades), non-token keyword eases (`ease`/`ease-out`), material-ease `cubic-bezier(0.25,0.46,0.45,0.94)` — listed in the report as recommended follow-ups.
- Anti-patterns: animating `width`/`height` (`3873`, a click ripple) and `top` (`4006`, skip-link) — flagged, left as-is (low risk, ephemeral).

---

## Implementation (all edits in `styles.css` only — no JS/HTML changes)

### Step 1 — Add one token to `:root` (after line 85)
Add `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);` — **names the curve already used 19×; introduces no visual change.**

### Step 2 — Tokenize the 19 hardcoded occurrences
Replace every `cubic-bezier(0.16, 1, 0.3, 1)` → `var(--ease-out-expo)`. Identical curve, now consistent + tokenised. (Safe `replace_all`.)

### Step 3 — Unify all card hovers to one easing
Change `.specialty-card`'s transitions (base + the reduced-motion rule at `2091`) from `--ease-smooth` → `var(--ease-out-expo)` so it matches the other 4 cards. Also locate/align `.menu-item`'s base transition (line `206` grouping / `2388`) to the same token. Net effect: **every card lift now shares one easing.**

### Step 4 — Fix the 4 bugs
- `7980`: `var(--transition-medium)` → `var(--transition-normal)` (defined token, restores the intended 0.4s fade).
- `2091`: remove the trailing comma and switch to `var(--ease-out-expo)` (fixes invalid declaration + matches sibling cards).
- `7583`: implement a real subtle glow — `0%,100% { box-shadow: 0 0 0 rgba(196,166,97,0); } 50% { box-shadow: 0 0 16px rgba(196,166,97,0.35); }` (brand-gold pulse, keeps the 3s ease-in-out infinite the consumers already declare).
- Dedupe `@keyframes spin`: keep the first (`4054`), delete the duplicates at `5730` and `5950`.

### Step 5 — Leave one runnable self-check
Add a tiny `scripts/animation-audit.js` Node check (no framework) that greps `styles.css` and asserts: no remaining hardcoded `cubic-bezier(0.16, 1, 0.3, 1)`, no remaining `--transition-medium`, exactly one `@keyframes spin`, and a non-empty `glow` body. Fails if cohesion regresses.

---

## Success criteria (verification)
1. `grep -c "cubic-bezier(0.16, 1, 0.3, 1)" styles.css` → **0** (all tokenised).
2. `grep -c "@keyframes spin" styles.css` → **1**.
3. `grep "transition-medium" styles.css` → **0 results**.
4. `@keyframes glow` body is non-empty; the 2 CTA consumers now visibly pulse.
5. `node scripts/animation-audit.js` → exits 0.
6. Card hovers (specialty / portfolio / blog / download / menu) all animate with `--ease-out-expo`.
7. No change to HTML, JS, or non-motion CSS; reduced-motion behavior preserved (JS `showAllElements` path untouched).

## Risk
Low. The dominant-ease tokenisation is curve-identical (zero visual change). The only intentional feel-shift is `.specialty-card` adopting the same easing as its 4 sibling card types — which is the cohesion goal itself. All edits confined to `styles.css` + one new self-check file.