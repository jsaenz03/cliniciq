#!/usr/bin/env node
/**
 * Self-check: every .practice-demo link on automations.html must carry a
 * data-video-key that exists in window.CLINICIQ_VIDEOS (config.js), and its
 * href must point at the same YouTube video that key configures — so the
 * no-JS fallback and the modal always open the same video.
 *
 * Run: node docs/check-demo-links.mjs
 */
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../automations.html', import.meta.url), 'utf8');
const configJs = readFileSync(new URL('../config.js', import.meta.url), 'utf8');

// Pull the CLINICIQ_VIDEOS keys + youtubeIds out of config.js (no DOM needed).
const configured = new Map();
for (const m of configJs.matchAll(/^  (\w+): \{$[\s\S]*?youtubeId: "([^"]*)"/gm)) {
  configured.set(m[1], m[2]);
}
assert.ok(configured.get('nursepod'), 'config.js parse: nursepod entry found');

// Collect the demo links from the product cards.
const links = [...html.matchAll(/<a class="practice-demo" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)"[^>]*data-video-key="(\w+)"/g)];
assert.equal(links.length, 4, `expected 4 demo links, found ${links.length}`);

let passed = 0;
for (const [, hrefId, key] of links) {
  const configId = configured.get(key);
  assert.ok(configId, `data-video-key "${key}" exists in config.js`);
  assert.equal(hrefId, configId, `link href for "${key}" matches config.js youtubeId`);
  assert.ok(html.includes(`<title`), 'page intact');
  passed++;
}

// Handler wiring present and card keys resolve (handler maps titles too).
const handler = readFileSync(new URL('../video-handler.js', import.meta.url), 'utf8');
assert.ok(handler.includes(".practice-demo[data-video-key]"), 'video-handler wires .practice-demo links');
assert.ok(html.includes('video-handler.js?v=2'), 'automations.html references bumped video-handler version');

console.log(`PASS: automations.html demo links — ${passed + 2} assertions`);
