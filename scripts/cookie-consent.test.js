/**
 * ClinicIQ Cookie Consent Manager — end-to-end behavioural test.
 *
 * Verifies the opt-out cookie banner: first-visit banner + GA-by-default,
 * decline disables GA (flag + no script on reload + no network request),
 * accept persists, footer "Cookie Settings" link reopens the banner, and
 * subdirectory (blog/download) pages resolve paths correctly.
 *
 * Usage:
 *   python3 -m http.server 8123        # from project root
 *   NODE_PATH=$(npm root -g) node scripts/cookie-consent.test.js
 *
 * Requires: playwright (global) + Google Chrome.
 */
const { chromium } = require('playwright');

const BASE = 'http://localhost:8123';
let failures = 0;

function check(name, cond, extra) {
  if (cond) {
    console.log('PASS  ' + name);
  } else {
    failures++;
    console.log('FAIL  ' + name + (extra ? '  -> ' + extra : ''));
  }
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const reqs = [];
  page.on('request', r => { if (r.url().includes('googletagmanager')) reqs.push(r.url()); });

  // ---- 1. First visit: banner shows, GA loads by default (opt-out) ----
  await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  check('first visit: banner visible', await page.isVisible('#cliniciq-cookie-banner'));
  check('first visit: GA script injected',
    await page.evaluate(() => !!document.querySelector('script[src*="googletagmanager"]')));
  check('first visit: gtag defined',
    await page.evaluate(() => typeof window.gtag === 'function'));
  check('first visit: consent not stored',
    await page.evaluate(() => localStorage.getItem('cliniciq_cookie_consent') === null));
  check('first visit: privacy link points to privacy-policy.html',
    await page.evaluate(() => document.querySelector('#cliniciq-cookie-banner a').getAttribute('href') === 'privacy-policy.html'));
  check('first visit: footer Cookie Settings link injected',
    await page.evaluate(() => !!document.querySelector('.footer-legal .ccm-footer-settings-link')));

  // ---- 2. Manage preferences panel ----
  await page.click('button:has-text("Manage preferences")');
  check('manage preferences: panel opens', await page.isVisible('.ccm-panel'));
  check('manage preferences: toggle checked by default', await page.isChecked('#cliniciq-cookie-analytics'));

  // ---- 3. Decline via panel: uncheck + save ----
  await page.uncheck('#cliniciq-cookie-analytics');
  await page.click('button:has-text("Save preferences")');
  await page.waitForTimeout(300);
  check('decline: banner hidden', await page.evaluate(() => document.getElementById('cliniciq-cookie-banner').hidden === true));
  check('decline: ga-disable flag set', await page.evaluate(() => window['ga-disable-G-Q7G8WZXTVY'] === true));
  check('decline: consent stored as declined', await page.evaluate(() => JSON.parse(localStorage.getItem('cliniciq_cookie_consent')).v === 'declined'));

  // ---- 4. Reload: banner gone, GA never loads ----
  reqs.length = 0;
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  check('reload after decline: banner not shown', await page.evaluate(() => {
    const b = document.getElementById('cliniciq-cookie-banner');
    return !b || b.hidden;
  }));
  check('reload after decline: no GA script', await page.evaluate(() => !document.querySelector('script[src*="googletagmanager"]')));
  check('reload after decline: no gtag defined', await page.evaluate(() => typeof window.gtag === 'undefined'));
  check('reload after decline: no GA network request', reqs.length === 0, 'requests: ' + reqs.join(','));

  // ---- 5. Accept all: persists, GA loads on reload ----
  await page.evaluate(() => localStorage.removeItem('cliniciq_cookie_consent'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('button:has-text("Accept all")');
  await page.waitForTimeout(200);
  check('accept: banner hidden', await page.evaluate(() => document.getElementById('cliniciq-cookie-banner').hidden === true));
  check('accept: consent stored as accepted', await page.evaluate(() => JSON.parse(localStorage.getItem('cliniciq_cookie_consent')).v === 'accepted'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  check('reload after accept: banner not shown', await page.evaluate(() => {
    const b = document.getElementById('cliniciq-cookie-banner');
    return !b || b.hidden;
  }));
  check('reload after accept: GA loads', await page.evaluate(() => !!document.querySelector('script[src*="googletagmanager"]')));

  // ---- 6. Footer Cookie Settings link reopens banner ----
  await page.click('.footer-legal .ccm-footer-settings-link');
  await page.waitForTimeout(200);
  check('footer link: banner reopens', await page.isVisible('#cliniciq-cookie-banner'));
  check('footer link: toggle reflects current state (checked)', await page.isChecked('#cliniciq-cookie-analytics'));
  await page.keyboard.press('Escape');
  check('footer link: Escape dismisses banner', await page.evaluate(() => document.getElementById('cliniciq-cookie-banner').hidden === true));

  // ---- 7. Subdirectory page (blog) — fresh context (no prior consent) ----
  const ctx2 = await browser.newContext();
  const page2 = await ctx2.newPage();
  await page2.goto(BASE + '/blog/healthcare-automation-roi.html', { waitUntil: 'domcontentloaded' });
  await page2.waitForTimeout(500);
  check('blog page: banner visible', await page2.isVisible('#cliniciq-cookie-banner'));
  check('blog page: privacy link ../privacy-policy.html', await page2.evaluate(() =>
    document.querySelector('#cliniciq-cookie-banner a').getAttribute('href') === '../privacy-policy.html'));
  check('blog page: GA injected by default', await page2.evaluate(() =>
    !!document.querySelector('script[src*="googletagmanager"]')));
  check('blog page: footer settings link in .footer-bottom', await page2.evaluate(() =>
    !!document.querySelector('.footer-bottom .ccm-footer-settings-link')));
  await page2.click('button:has-text("Decline")');
  await page2.waitForTimeout(200);
  await page2.reload({ waitUntil: 'domcontentloaded' });
  await page2.waitForTimeout(400);
  check('blog page after decline reload: no GA', await page2.evaluate(() =>
    !document.querySelector('script[src*="googletagmanager"]')));

  await browser.close();
  console.log(failures === 0 ? '\nALL TESTS PASSED' : `\n${failures} TEST(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
