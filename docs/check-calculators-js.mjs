#!/usr/bin/env node
/**
 * Self-check for the calculator logic embedded in calculators.html — the
 * Australian date normalisation (including no-year -> current year) and the
 * substituted working lines on the Medication Dose and IV Fluid calculators.
 * Mirrors the reference behaviour of nursetool3's src/lib/calculators.ts.
 *
 * Run: node docs/check-calculators-js.mjs
 */
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html = readFileSync(new URL('../calculators.html', import.meta.url), 'utf8');
const start = html.indexOf('// Australian date helpers');
const end = html.indexOf('// Wire up auto-formatting masks');
assert.ok(start !== -1, 'date helpers block not found in calculators.html');
assert.ok(end !== -1 && end > start, 'script extraction window invalid');
const source = html.slice(start, end);

// Declarations only up to the wiring marker — safe to evaluate without a DOM.
const ctx = {};
vm.createContext(ctx);
vm.runInContext(source, ctx);
const { normaliseAuDate, parseAuDate, medDoseWorking, ivFluidWorking } = ctx;

let passed = 0;
const eq = (a, b, msg) => { assert.equal(a, b, msg); passed++; };
// Arrays made inside the vm realm have a foreign Array.prototype — copy them
// into this realm so deepEqual compares contents, not prototypes.
const deepEq = (a, b, msg) => { assert.deepEqual(Array.isArray(a) ? [...a] : a, b, msg); passed++; };
const ok = (v, msg) => { assert.ok(v, msg); passed++; };

const year = String(new Date().getFullYear());

// --- date normalisation: no year -> current year ---
eq(normaliseAuDate('25/12'), `25/12/${year}`, 'DD/MM without year');
eq(normaliseAuDate('3.3'), `03/03/${year}`, 'dot separator, single digits, no year');
eq(normaliseAuDate('3-3-23'), '03/03/2023', '2-digit year expansion');
eq(normaliseAuDate('25/12/2030'), '25/12/2030', 'full date untouched');
eq(normaliseAuDate('2 5 24'), '02/05/2024', 'whitespace separator');
eq(normaliseAuDate('25'), null, 'day alone is not a date');
eq(normaliseAuDate(''), null, 'empty input');
ok(!isNaN(parseAuDate('25/12').getTime()), 'no-year date parses with current year');
ok(isNaN(parseAuDate('31/02/2024').getTime()), 'rollover date rejected');

// --- substituted working: medication dose ---
deepEq(
  medDoseWorking(500, 10, 40, 'mg', { conc: 50, ml: 0.8 }),
  ['500 mg ÷ 10 mL = 50.00 mg/mL', '40 mg ÷ 50.00 mg/mL = 0.80 mL'],
  'mg working steps'
);
deepEq(
  medDoseWorking(500, 10, 40000, 'mcg', { conc: 50, ml: 0.8 }),
  ['500 mg ÷ 10 mL = 50.00 mg/mL', '40000 mcg ÷ 1000 = 40 mg', '40 mg ÷ 50.00 mg/mL = 0.80 mL'],
  'mcg conversion step included'
);

// --- substituted working: IV fluid, all four solve paths ---
deepEq(
  ivFluidWorking({ volume: 1000, dropFactor: 20, mode: 'rate', time: 8, timeUnit: 'hr' }, { gttMin: 41.666, mLhr: 125, timeMin: 480 }, '8 hr 0 min'),
  ['1000 mL × 20 gtt/mL ÷ (8 hr × 60 min) = 42 gtt/min', '1000 mL ÷ 8 hr = 125.0 mL/hr'],
  'rate from hours'
);
deepEq(
  ivFluidWorking({ volume: 1000, dropFactor: 20, mode: 'rate', time: 480, timeUnit: 'min' }, { gttMin: 41.666, mLhr: 125, timeMin: 480 }, '8 hr 0 min'),
  ['1000 mL × 20 gtt/mL ÷ (480 min) = 42 gtt/min', '1000 mL ÷ 480 min × 60 = 125.0 mL/hr'],
  'rate from minutes'
);
deepEq(
  ivFluidWorking({ volume: 1000, dropFactor: 20, mode: 'time', rate: 125, rateUnit: 'mghr' }, { gttMin: 41.666, mLhr: 125, timeMin: 480 }, '8 hr 0 min'),
  ['125 mL/hr × 20 gtt/mL ÷ 60 = 42 gtt/min', '1000 mL ÷ 125 mL/hr × 60 = 480 min (8 hr 0 min)'],
  'time from mL/hr'
);
deepEq(
  ivFluidWorking({ volume: 1000, dropFactor: 20, mode: 'time', rate: 41.666, rateUnit: 'gttmin' }, { gttMin: 41.666, mLhr: 125, timeMin: 480 }, '8 hr 0 min'),
  ['41.67 gtt/min × 60 ÷ 20 gtt/mL = 125.0 mL/hr', '1000 mL × 20 gtt/mL ÷ 41.67 gtt/min = 480 min (8 hr 0 min)'],
  'time from gtt/min'
);

console.log(`PASS: calculators.html calculator logic — ${passed} assertions`);
