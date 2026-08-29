/*!
 * ClinicIQ Solutions — UX/UI Enhancement Layer (2026)
 * ---------------------------------------------------
 * Progressive-enhancement companion to script.js. Vanilla, dependency-free,
 * and fully additive — it never touches the minified core in script.js.
 *
 * Responsibilities:
 *   1. Injects a reading-progress bar and drives it via the modern CSS
 *      scroll-driven animation where supported, falling back to a throttled
 *      rAF scroll listener elsewhere.
 *   2. Powers the cursor-follow card spotlight by writing --mx/--my custom
 *      properties (transform-safe — only background-position changes).
 *
 * Everything is guarded by prefers-reduced-motion and feature detection,
 * wrapped defensively so a failure in one feature can never break the page.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /**
   * Reading-progress bar.
   * The element is always created (CSS styles it); behaviour is layered on
   * only when motion is allowed and no native scroll-driven animation exists.
   */
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    if (reduceMotion) {
      return; // CSS hides the bar entirely under reduced motion.
    }

    // Prefer the native, JS-free CSS scroll-driven animation.
    var supports = window.CSS && typeof window.CSS.supports === 'function';
    if (supports && window.CSS.supports('animation-timeline', 'scroll()')) {
      return;
    }

    // JS fallback for browsers without animation-timeline support.
    var ticking = false;

    var update = function () {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop || document.body.scrollTop || 0;
      var max = (doc.scrollHeight - doc.clientHeight) || 0;
      var pct = max > 0 ? scrollTop / max : 0;
      if (pct < 0) pct = 0;
      if (pct > 1) pct = 1;
      bar.style.transform = 'scaleX(' + pct + ')';
      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /**
   * "Home" must always reveal the hero. The core smooth-scroll handler targets
   * #home.offsetTop − navbar height, but #home is the position:sticky hero
   * (see .hero-cover-stack .hero in styles.css), whose offsetTop is unreliable
   * once pinned — so on index.html the click lands short of the hero. Other
   * pages link Home to index.html (loads at top) and are unaffected.
   * Force an absolute top:0 scroll. This listener registers after the core
   * handler, so on the nav-link it is the final scrollTo call (wins the
   * smooth-scroll), and on the logo-link it is the only handler (the core
   * handler only targets .nav-link, not .logo-link).
   */
  function initHomeScroll() {
    var links = document.querySelectorAll('a[href="#home"]');
    if (!links.length) {
      return;
    }
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  /**
   * Cursor-follow spotlight. Writes --mx/--my as percentages so the CSS
   * radial-gradient tracks the pointer. Skipped on touch devices and when
   * reduced motion is requested.
   */
  function initSpotlight() {
    if (reduceMotion || coarsePointer) {
      return;
    }

    var selector =
      '.specialty-card, .service-card, .portfolio-item, .blog-card, ' +
      '.testimonial-card, .feature-card, .practice-card';
    var cards = document.querySelectorAll(selector);
    if (!cards.length) {
      return;
    }

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', mx + '%');
        card.style.setProperty('--my', my + '%');
      }, { passive: true });
    });
  }

  /**
   * 3. Pilot-practices banner.
   * Small dismissible card promoting the pilot GP practices page. Styles are
   * injected from here (not styles.css) because styles.css is served with a
   * one-year immutable cache — JS-injected CSS picks up without a cache-bust.
   * Sits top-right, under the fixed navbar, so the cookie dialog, chat toggle
   * and scroll-to-top button (all bottom-of-viewport) never cover it.
   * Suppressed on pilot.html itself, for 24h after dismissal (localStorage
   * timestamp), or once the visitor has opened pilot.html this session
   * (sessionStorage).
   */
  function initPilotBanner() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'pilot.html') return;

    var REVIVE_AFTER_MS = 24 * 60 * 60 * 1000; // dismissed banners return after a day
    try {
      var dismissedAt = Number(window.localStorage.getItem('cliniciq-pilot-banner'));
      if (dismissedAt && Date.now() - dismissedAt < REVIVE_AFTER_MS) return;
      if (window.sessionStorage.getItem('cliniciq-seen-pilot')) return;
    } catch (err) {
      /* Storage unavailable (privacy mode etc.) — show the banner anyway. */
    }

    var style = document.createElement('style');
    style.textContent =
      '.pilot-banner{position:fixed;top:88px;right:1rem;z-index:900;max-width:340px;' +
      'background:var(--background-white,#fff);border:1px solid rgba(196,166,97,.45);border-radius:12px;' +
      'box-shadow:0 10px 28px rgba(44,74,60,.18);padding:.9rem 2.4rem .9rem 1.1rem;' +
      'opacity:0;transform:translateY(-8px);transition:opacity .4s ease,transform .4s ease}' +
      '.pilot-banner.visible{opacity:1;transform:none}' +
      '.pilot-banner p{margin:0 0 .5rem;font-size:.88rem;line-height:1.5;color:var(--text-secondary)}' +
      '.pilot-banner a{font-size:.88rem;font-weight:500;color:var(--primary-green);text-decoration:underline}' +
      '.pilot-banner-close{position:absolute;top:.45rem;right:.45rem;width:2.75rem;height:2.75rem;' +
      'display:flex;align-items:center;justify-content:center;border:0;background:transparent;' +
      'color:var(--text-muted);font-size:1.15rem;line-height:1;cursor:pointer;border-radius:50%}' +
      '.pilot-banner-close:hover{background:var(--background-light);color:var(--text-secondary)}' +
      '.pilot-banner a:focus-visible,.pilot-banner-close:focus-visible{outline:2px solid var(--primary-green);' +
      'outline-offset:2px;border-radius:4px}' +
      '.pilot-banner-close:focus-visible{border-radius:50%}' +
      '@media (max-width:480px){.pilot-banner{top:84px;left:.75rem;right:.75rem;max-width:none}}' +
      '@media (prefers-reduced-motion:reduce){.pilot-banner{transition:none}}';
    document.head.appendChild(style);

    var banner = document.createElement('aside');
    banner.className = 'pilot-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Pilot practices announcement');

    var copy = document.createElement('p');
    copy.innerHTML = '<strong>New:</strong> ClinicIQ is onboarding pilot GP practices.';
    var link = document.createElement('a');
    link.href = 'pilot.html';
    link.textContent = 'See what a pilot practice gets';
    var close = document.createElement('button');
    close.className = 'pilot-banner-close';
    close.setAttribute('aria-label', 'Dismiss announcement');
    close.textContent = '\u00D7';
    close.addEventListener('click', function () {
      banner.remove();
      try { window.localStorage.setItem('cliniciq-pilot-banner', String(Date.now())); } catch (err) {}
    });

    banner.appendChild(copy);
    banner.appendChild(link);
    banner.appendChild(close);
    document.body.appendChild(banner);

    window.setTimeout(function () { banner.classList.add('visible'); }, 1200);
  }

  function boot() {
    try {
      initScrollProgress();
    } catch (err) {
      /* Never let enhancements break the page. */
    }

    try {
      initHomeScroll();
    } catch (err) {
      /* Never let enhancements break the page. */
    }

    // Spotlight is non-critical — defer to an idle callback.
    var runSpotlight = function () {
      try {
        initSpotlight();
      } catch (err) {
        /* ignore */
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runSpotlight, { timeout: 2000 });
    } else {
      setTimeout(runSpotlight, 200);
    }

    // Banner is non-critical — same idle-deferred treatment as the spotlight.
    var runPilotBanner = function () {
      try {
        initPilotBanner();
      } catch (err) {
        /* ignore */
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runPilotBanner, { timeout: 3000 });
    } else {
      setTimeout(runPilotBanner, 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
