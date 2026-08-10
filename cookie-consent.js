/* ============================================================
 * ClinicIQ Cookie Consent Manager (opt-out model)
 * ------------------------------------------------------------
 * Google Analytics (G-Q7G8WZXTVY) runs by default so the site
 * keeps its usage data. Visitors can opt out at any time:
 * declining disables GA immediately (ga-disable flag + cookie
 * removal) and prevents it from ever loading on later visits.
 *
 * Preference is stored in localStorage for 12 months — matches
 * privacy-policy.html §7. Loaded synchronously in <head> on every
 * page, replacing the old inline gtag snippet.
 * ============================================================ */
(function () {
  'use strict';

  var GA_ID = 'G-Q7G8WZXTVY';
  var STORAGE_KEY = 'cliniciq_cookie_consent';
  var TTL_MS = 365 * 24 * 60 * 60 * 1000; // 12 months
  var GA_COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gcl', '_gac', '_fpl'];

  var consent = readConsent(); // 'accepted' | 'declined' | null (no choice yet)

  /* ---------- consent storage ---------- */

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.v || typeof data.t !== 'number') return null;
      if (Date.now() - data.t > TTL_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data.v;
    } catch (err) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: value, t: Date.now() }));
    } catch (err) {
      // Storage unavailable (e.g. private mode) — choice applies for this session only.
    }
  }

  /* ---------- Google Analytics (opt-out) ---------- */

  // Google's official opt-out flag; gtag checks it on every hit.
  window['ga-disable-' + GA_ID] = consent === 'declined';

  function loadAnalytics() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function disableAnalytics() {
    window['ga-disable-' + GA_ID] = true;

    // Remove GA cookies so no tracking state survives the opt-out.
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (pair) {
      var name = (pair.split('=')[0] || '').trim();
      if (!name) return;
      for (var i = 0; i < GA_COOKIE_PREFIXES.length; i++) {
        if (name.indexOf(GA_COOKIE_PREFIXES[i]) !== 0) continue;
        // Both variants cover cookies set with and without an explicit domain.
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + host;
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        break;
      }
    });
  }

  // Opt-out default: analytics runs unless the visitor has declined.
  if (consent !== 'declined') {
    loadAnalytics();
  }

  /* ---------- banner UI ---------- */

  var banner = null;
  var panel = null;
  var analyticsToggle = null;
  var lastTrigger = null;

  function privacyHref() {
    var depth = (location.pathname.match(/\//g) || []).length - 1;
    return (depth > 0 ? new Array(depth + 1).join('../') : '') + 'privacy-policy.html';
  }

  function makeButton(label, variant, onClick) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ccm-btn ccm-btn-' + variant;
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function buildBanner() {
    banner = document.createElement('div');
    banner.id = 'cliniciq-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie preferences');
    banner.setAttribute('aria-describedby', 'cliniciq-cookie-banner-text');

    var text = document.createElement('p');
    text.id = 'cliniciq-cookie-banner-text';
    text.innerHTML = 'We use cookies to understand how our website is used so we can improve it for clinics. ' +
      'Google Analytics collects anonymous usage data — you can opt out at any time. ' +
      'See our <a href="' + privacyHref() + '">Privacy Policy</a> for full details.';

    var actions = document.createElement('div');
    actions.className = 'ccm-actions';
    actions.appendChild(makeButton('Accept all', 'primary', function () {
      writeConsent('accepted');
      hideBanner();
    }));
    actions.appendChild(makeButton('Decline', 'ghost', function () {
      writeConsent('declined');
      disableAnalytics();
      hideBanner();
    }));
    actions.appendChild(makeButton('Manage preferences', 'link', function () {
      var show = panel.hidden;
      if (show && analyticsToggle) analyticsToggle.checked = consent !== 'declined';
      panel.hidden = !show;
    }));

    panel = document.createElement('div');
    panel.className = 'ccm-panel';
    panel.hidden = true;

    var toggleRow = document.createElement('label');
    toggleRow.className = 'ccm-toggle-row';
    analyticsToggle = document.createElement('input');
    analyticsToggle.type = 'checkbox';
    analyticsToggle.id = 'cliniciq-cookie-analytics';
    analyticsToggle.checked = consent !== 'declined';
    var toggleText = document.createElement('span');
    toggleText.innerHTML = '<strong>Analytics cookies (Google Analytics)</strong><br>' +
      'Anonymous usage data to see which pages are most useful to clinic staff.';
    toggleRow.appendChild(analyticsToggle);
    toggleRow.appendChild(toggleText);

    panel.appendChild(toggleRow);
    panel.appendChild(makeButton('Save preferences', 'primary', function () {
      if (analyticsToggle.checked) {
        writeConsent('accepted');
      } else {
        writeConsent('declined');
        disableAnalytics();
      }
      hideBanner();
    }));

    banner.appendChild(text);
    banner.appendChild(actions);
    banner.appendChild(panel);
  }

  function showBanner(trigger) {
    if (!banner) buildBanner();
    if (!document.body.contains(banner)) document.body.appendChild(banner);
    lastTrigger = trigger || null;
    panel.hidden = true;
    if (analyticsToggle) analyticsToggle.checked = consent !== 'declined';
    banner.hidden = false;
    // Only take focus for user-initiated opens (footer link); not on first load.
    if (trigger) {
      var firstBtn = banner.querySelector('.ccm-btn');
      if (firstBtn) firstBtn.focus();
    }
  }

  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    lastTrigger = null;
  }

  /* ---------- footer "Cookie Settings" link (reopening the banner) ---------- */

  function addFooterSettingsLink() {
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'ccm-footer-settings-link';
    link.textContent = 'Cookie Settings';
    link.setAttribute('aria-label', 'Open cookie settings');
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showBanner(link);
    });

    var legal = document.querySelector('.footer-legal');
    if (legal) {
      legal.appendChild(link);
      return;
    }
    // Blog/download pages have a simpler footer — append after the copyright line.
    var bottom = document.querySelector('.footer-bottom');
    if (bottom) {
      var wrap = document.createElement('span');
      wrap.className = 'ccm-footer-settings';
      wrap.appendChild(document.createTextNode(' | '));
      wrap.appendChild(link);
      var p = bottom.querySelector('p');
      (p || bottom).appendChild(wrap);
    }
  }

  /* ---------- injected styles (self-contained; keeps pages untouched) ---------- */

  function injectStyles() {
    var css = [
      '#cliniciq-cookie-banner{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);width:min(640px,calc(100vw - 2rem));box-sizing:border-box;background:var(--background-white,#fafbfd);color:var(--black,#1a1d20);border:1px solid rgba(26,29,32,.12);border-radius:12px;box-shadow:0 12px 40px rgba(26,29,32,.18);padding:1.25rem 1.5rem;z-index:9999;font-size:.95rem;line-height:1.5}',
      '#cliniciq-cookie-banner[hidden]{display:none}',
      '#cliniciq-cookie-banner p{margin:0 0 .9rem}',
      '#cliniciq-cookie-banner a{color:var(--primary-green,#2c4a3c);text-decoration:underline}',
      '.ccm-actions{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}',
      '.ccm-btn{border-radius:8px;padding:.55rem 1.1rem;font-size:.9rem;font-weight:600;cursor:pointer;border:1px solid transparent;transition:opacity .15s ease,color .15s ease,border-color .15s ease}',
      '.ccm-btn:focus-visible{outline:2px solid var(--accent-gold,#c4a661);outline-offset:2px}',
      '.ccm-btn-primary{background:var(--primary-green,#2c4a3c);color:#fff}',
      '.ccm-btn-primary:hover{opacity:.9}',
      '.ccm-btn-ghost{background:transparent;border-color:rgba(26,29,32,.25);color:var(--black,#1a1d20)}',
      '.ccm-btn-ghost:hover{border-color:var(--primary-green,#2c4a3c);color:var(--primary-green,#2c4a3c)}',
      '.ccm-btn-link{background:none;color:var(--primary-green,#2c4a3c);text-decoration:underline;padding:.55rem .25rem}',
      '.ccm-panel{margin-top:.9rem;padding:.9rem 1rem;background:var(--background-mint,rgba(169,206,244,.08));border-radius:8px;display:flex;flex-direction:column;gap:.9rem}',
      '.ccm-panel[hidden]{display:none}',
      '.ccm-toggle-row{display:flex;gap:.6rem;align-items:flex-start;cursor:pointer}',
      '.ccm-toggle-row input{margin-top:.2rem}',
      '.ccm-footer-settings-link{opacity:.8;text-decoration:underline;transition:opacity .15s ease}',
      '.ccm-footer-settings-link:hover{opacity:1}',
      '.ccm-footer-settings{margin-left:.4rem}',
      '@media (max-width:480px){.ccm-actions{flex-direction:column;align-items:stretch}.ccm-btn{text-align:center}}'
    ].join('');
    var style = document.createElement('style');
    style.id = 'cliniciq-cookie-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- init ---------- */

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    injectStyles();
    if (consent === null) showBanner(); // first visit (or expired choice)
    addFooterSettingsLink();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && banner && !banner.hidden) hideBanner();
  });

  // Reopens the banner from anywhere (used by the footer "Cookie Settings" link).
  window.CliniciqCookieSettings = function () { showBanner(); };
})();
