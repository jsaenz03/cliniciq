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

  function boot() {
    try {
      initScrollProgress();
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
