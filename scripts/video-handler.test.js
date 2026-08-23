'use strict';
// Self-check for the video modal fix: after a local-video demo is opened
// (which replaces the iframe container), a YouTube demo must still open.
// Reproduces the pre-fix crash where querySelector('.video-modal-iframe')
// returned null and iframe.src threw, killing the modal until page reload.
// Run: node scripts/video-handler.test.js

const path = require('path');
const VideoEmbedHandler = require(path.join(__dirname, '..', 'video-handler.js'));

// Purpose-built mini-DOM (ponytail: string-scan fidelity for this flat modal
// template only; upgrade path is jsdom). Children are memoized so element
// identity persists across queries; reassigning innerHTML drops that
// element's memoized children, as the real DOM destroys its subtree.
// Selectors whose class appears in a child's birth markup always delegate
// into that child, so mutations are always seen.
function makeEl(tag) {
  const el = {
    tagName: (tag || 'div').toUpperCase(),
    id: '', className: '', textContent: '', src: '',
    style: {}, children: [],
    _bornHTML: '',
    _own: [],
    setAttribute(k, v) { if (k === 'id') el.id = v; },
    appendChild(c) { el.children.push(c); return c; },
    addEventListener() {},
    classList: {
      _s: new Set(),
      add(c) { el.classList._s.add(c); },
      remove(c) { el.classList._s.delete(c); },
      contains(c) { return el.classList._s.has(c); }
    },
    querySelectorAll() { return []; },
    querySelector(sel) {
      if (!sel.startsWith('.')) return null;
      const cls = sel.slice(1);
      for (const child of el._own) {
        if (child.className === cls) return child;
        if (child._bornHTML.includes('class="' + cls + '"')) return child.querySelector(sel);
      }
      const re = new RegExp('<([a-z0-9]+)[^>]*class="' + cls + '"[^>]*>');
      const m = el.innerHTML.match(re);
      if (!m) return null;
      const child = makeEl(m[1]);
      child.className = cls;
      const open = el.innerHTML.indexOf(m[0]);
      const close = el.innerHTML.indexOf('</' + m[1] + '>', open);
      if (close !== -1) child.innerHTML = el.innerHTML.slice(open + m[0].length, close);
      child._bornHTML = child.innerHTML;
      el._own.push(child);
      return child;
    }
  };
  let html = '';
  Object.defineProperty(el, 'innerHTML', {
    get: () => html,
    set(v) { html = String(v); el._own = []; }
  });
  return el;
}

global.document = {
  readyState: 'loading',
  addEventListener() {},
  getElementById() { return null; },
  createElement(tag) { return makeEl(tag); },
  querySelectorAll() { return []; },
  body: makeEl('body')
};
global.window = { addEventListener() {} };
global.getYouTubeEmbedUrl = (id) => 'https://www.youtube.com/embed/' + id;
global.isVideoConfigured = () => true;

let failures = 0;
function assert(cond, msg) {
  if (cond) console.log('PASS ' + msg);
  else { failures++; console.error('FAIL ' + msg); }
}

const handler = new VideoEmbedHandler();
handler.setupVideoEmbeds();
const modal = handler.videoModal;
const container = () => modal.querySelector('.video-modal-iframe-container');

// The regression scenario: local video first, then YouTube in the same load.
handler.openVideoModal({ localVideo: 'assets/videos/placeholder.mp4', title: 'Local demo' });
assert(container().innerHTML.includes('video-modal-video'), 'local video renders in container');
assert(modal.classList.contains('active'), 'modal opens for local video');
handler.closeVideoModal();
assert(!modal.classList.contains('active'), 'modal closes');

let crashed = null;
try {
  handler.openVideoModal({ youtubeId: 'abc123', title: 'YouTube demo' });
} catch (e) {
  crashed = e;
}
assert(crashed === null, 'YouTube open after local video does not throw (was the pre-fix crash: ' + (crashed && crashed.message) + ')');
const iframe = container().querySelector('.video-modal-iframe');
assert(iframe !== null, 'iframe exists after a local-video open');
assert(iframe && iframe.src === 'https://www.youtube.com/embed/abc123', 'iframe loads the YouTube embed URL');
assert(modal.classList.contains('active'), 'modal opens for YouTube after local video');
handler.closeVideoModal();

// Repeated YouTube opens (the pre-existing working path) must keep working.
handler.openVideoModal({ youtubeId: 'xyz789', title: 'YouTube again' });
const iframe2 = container().querySelector('.video-modal-iframe');
assert(iframe2 && iframe2.src === 'https://www.youtube.com/embed/xyz789', 'second YouTube open still works');
handler.closeVideoModal();

// YouTube then local must also survive.
handler.openVideoModal({ youtubeId: 'skip', title: 'YouTube first' });
handler.closeVideoModal();
handler.openVideoModal({ localVideo: 'assets/videos/placeholder.mp4', title: 'Local after YouTube' });
assert(container().innerHTML.includes('video-modal-video'), 'local video works after YouTube open');

if (failures) {
  console.error(failures + ' check(s) failed');
  process.exit(1);
}
console.log('ALL CHECKS PASSED');
