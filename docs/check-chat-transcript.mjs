/**
 * Self-check: chat transcript survives a simulated page refresh.
 * Run: node docs/check-chat-transcript.mjs
 * Stubs the DOM + sessionStorage, drives ChatBot, and asserts that
 * messages saved before a "refresh" are re-rendered by a fresh instance,
 * and that ending/starting a conversation clears them.
 */
const docStub = (() => {
  const elements = new Map();
  const makeElement = (id = '') => ({
    id,
    children: [],
    style: {},
    value: '',
    textContent: '',
    scrollTop: 0,
    scrollHeight: 0,
    classList: { add() {}, remove() {}, contains: () => false },
    setAttribute() {},
    removeAttribute() {},
    addEventListener() {},
    removeEventListener() {},
    appendChild(child) { this.children.push(child); return child; },
    removeChild(child) { this.children = this.children.filter(c => c !== child); },
    remove() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    focus() {},
  });
  return {
    createElement: () => makeElement(),
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, makeElement(id));
      return elements.get(id);
    },
    querySelectorAll: () => [],
    addEventListener() {},
    body: makeElement('body'),
  };
})();

const sessionStore = new Map();
globalThis.sessionStorage = {
  getItem: k => (sessionStore.has(k) ? sessionStore.get(k) : null),
  setItem: (k, v) => sessionStore.set(k, String(v)),
  removeItem: k => sessionStore.delete(k),
};

globalThis.document = docStub;

const { ChatBot } = await import('../chatbot.js');

const assert = (cond, label) => {
  if (!cond) {
    console.error(`FAIL: ${label}`);
    process.exit(1);
  }
  console.log(`ok: ${label}`);
};

// --- Before refresh: user identified, two messages exchanged ---
const before = new ChatBot();
before.hasUserIdentification = true;
before.addMessage('Hi, what does NursEpod do?', 'user');
before.addMessage('NursEpod is your nurse pod — here is what it covers…', 'bot');

const saved = JSON.parse(sessionStorage.getItem('cliniciq_chat_transcript'));
assert(saved.length === 2, 'transcript saves each message');
assert(saved[0].sender === 'user' && saved[1].sender === 'bot', 'transcript keeps sender order');

// --- Simulated refresh: brand-new instance, same sessionStorage, fresh DOM ---
docStub.getElementById('chat-messages').children = [];
const after = new ChatBot();
assert(after.getConversationId() === before.getConversationId(), 'conversation id survives refresh');
after.hasUserIdentification = true;
after.isConversationEnded = false;
after.restoreTranscript();
assert(after.chatMessages.children.length === 2, 'refresh re-renders the saved messages');

// --- Restore must not duplicate or run for a cleared/ended conversation ---
after.isConversationEnded = true;
after.restoreTranscript();
assert(after.chatMessages.children.length === 2, 'no restore once conversation has ended');

// --- End/new conversation clears the transcript (fresh start stays fresh) ---
after.isConversationEnded = false;
after.clearConversationState();
assert(sessionStorage.getItem('cliniciq_chat_transcript') === null, 'clearConversationState wipes transcript');

console.log('\nAll chat transcript checks passed.');
