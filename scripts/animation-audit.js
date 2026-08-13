#!/usr/bin/env node
/*
 * Animation cohesion self-check for ClinicIQ styles.css.
 * Run: node scripts/animation-audit.js
 *
 * Locks in the motion-system invariants established by the animation cohesion
 * audit so they cannot silently regress. No frameworks, no fixtures — fails
 * fast with a non-zero exit if any invariant is broken.
 */
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'styles.css');
const css = fs.readFileSync(cssPath, 'utf8');

let failures = 0;
const assert = (cond, msg) => {
  if (!cond) { failures++; console.error(`  ✗ ${msg}`); }
  else { console.log(`  ✓ ${msg}`); }
};

const count = (re) => (css.match(re) || []).length;

console.log('Animation cohesion audit — styles.css\n');

// 1. The de-facto card/interactive ease must be tokenised, not hardcoded.
//    Only the token definition itself may contain the literal curve.
assert(
  count(/cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/g) === 1,
  "ease-out-expo curve appears once (token definition only, no hardcoded uses)"
);
assert(
  /--ease-out-expo:\s*cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/.test(css),
  "--ease-out-expo token is defined in :root"
);

// 2. Exactly one @keyframes spin (was duplicated 3x).
assert(count(/@keyframes spin\s*{/g) === 1, "exactly one @keyframes spin");

// 3. The empty @keyframes glow bug must stay fixed — body must declare a property.
const glowBlock = css.match(/@keyframes glow\s*\{([\s\S]*?)\n\}/);
assert(
  !!glowBlock && /box-shadow|opacity|transform/.test(glowBlock[1]),
  "@keyframes glow has a real (non-empty) body"
);

// 4. No references to undefined motion tokens.
assert(
  !/var\(--transition-medium\)/.test(css),
  "no usage of undefined --transition-medium token"
);

// 5. No broken transition declarations (trailing/empty comma slots that
//    invalidate the whole property). Catches the specialty-card & menu-item bugs.
const brokenTransition = css
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => /transition:\s.*,?\s*,\s*(;|$)/.test(l) || /^,\s*$/.test(l));
assert(brokenTransition.length === 0, "no broken trailing-comma transition declarations");

// 6. Card hover family shares one easing + duration.
//    specialty-card, portfolio-item, blog-card, download-category, menu-item.
for (const sel of ['.specialty-card', '.menu-item']) {
  const block = css.match(new RegExp(`\\${sel}\\s*\\{[\\s\\S]*?\\n\\}`));
  assert(
    !!block && /transform\s+0\.3s\s+var\(--ease-out-expo\)/.test(block[0]),
    `${sel} transform uses 0.3s var(--ease-out-expo)`
  );
}

console.log(
  failures === 0
    ? '\nAll motion invariants hold.'
    : `\n${failures} invariant(s) broken.`
);
process.exit(failures === 0 ? 0 : 1);
