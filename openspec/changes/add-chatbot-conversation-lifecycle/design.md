# Design: Conversation Lifecycle Management

## Context

The AI chatbot currently lacks conversation state management, treating each message as an independent interaction. This creates several problems:

1. **Backend AI context**: The AI system cannot distinguish between new conversations and ongoing conversations, limiting its ability to provide contextual responses
2. **User experience**: Users expect a fresh start when refreshing the page, but there's no mechanism to signal this
3. **Analytics and tracking**: No way to measure conversation quality, duration, or engagement
4. **Data organization**: Cannot group related messages into logical conversation threads

**Stakeholders:**
- End users: Expect clear conversation boundaries and fresh starts
- n8n workflow: Needs conversation context for better AI responses
- Backend AI system (via n8n): Needs conversation history for context
- Product team: Needs conversation analytics for improvement
- Development team: Needs maintainable, simple implementation

**Constraints:**
- No backend database available (static site with Netlify functions)
- Must work across page refreshes
- **CRITICAL:** Cannot break existing n8n webhook integration
- n8n workflow must continue receiving responses in current format
- Must handle browser privacy modes gracefully

## Goals / Non-Goals

**Goals:**
1. Implement conversation session tracking with unique IDs
2. Detect conversation start and end events reliably
3. Send conversation metadata to backend AI system
4. Reset conversation state on page refresh automatically
5. Provide foundation for future conversation features (history, analytics, export)

**Non-Goals:**
1. Server-side conversation storage (no database)
2. Multi-device conversation sync
3. Conversation history UI (future enhancement)
4. User authentication or conversation ownership
5. Real-time typing indicators or read receipts

## Decisions

### Decision 1: Use sessionStorage for conversation state

**Choice:** sessionStorage (not localStorage or cookies)

**Rationale:**
- sessionStorage automatically clears on page refresh (desired behavior)
- No manual cleanup needed - browser handles it
- Isolated per-tab (different tabs = different conversations)
- Good browser support (98%+ browsers)
- No size concerns for conversation metadata (<1KB)

**Alternatives considered:**
- localStorage: Would persist across page refreshes (not desired)
- Cookies: Overkill for client-side only data, size limitations
- In-memory only: Lost on component re-initialization

**Trade-offs:**
- ✅ Automatic cleanup on refresh
- ✅ Simple implementation
- ❌ Not available in some privacy modes (acceptable - fallback available)

### Decision 2: Conversation ID format

**Choice:** `conv_${timestamp}_${randomString}` (e.g., "conv_1703001234567_a1b2c3d4e")

**Rationale:**
- Human-readable prefix for debugging
- Timestamp provides chronological ordering
- Random component ensures uniqueness
- Short enough for logging and URLs
- No external dependencies needed

**Alternatives considered:**
- UUID v4: More standard but less readable, longer string
- Sequential IDs: Require server coordination
- User ID based: No authentication system in place

**Implementation:**
```javascript
generateConversationId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `conv_${timestamp}_${random}`;
}
```

### Decision 3: Use sendBeacon() for conversation end markers

**Choice:** navigator.sendBeacon() with fetch() fallback

**Rationale:**
- sendBeacon() designed for page unload scenarios
- Queues request to complete even after page closes
- Non-blocking - doesn't delay page unload
- More reliable than synchronous fetch() during beforeunload

**Alternatives considered:**
- Synchronous fetch with keepalive: Works but may delay page close
- Only async fetch: May not complete before page unloads
- Don't track conversation end: Loses valuable analytics data

**Implementation pattern:**
```javascript
window.addEventListener('beforeunload', () => {
  const data = this.getConversationEndData();
  const endpoint = '/.netlify/functions/chatbot-end';

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, JSON.stringify(data));
  } else {
    // Fallback: synchronous fetch with keepalive
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      keepalive: true
    });
  }
});
```

### Decision 4: Fire-and-forget for conversation end markers

**Choice:** Don't wait for confirmation on conversation end markers

**Rationale:**
- Page is unloading - can't show errors anyway
- Best-effort delivery is acceptable for analytics
- Backend can handle missing end markers gracefully
- Doesn't block user's page navigation

**Trade-offs:**
- ✅ Faster page unload
- ✅ Better user experience
- ❌ Some end markers may be lost (acceptable for analytics)

### Decision 5: Message count tracking

**Choice:** Track message count in sessionStorage, increment on send

**Rationale:**
- Simple counter implementation
- Useful for conversation depth analytics
- Can detect message frequency patterns
- Helps backend determine conversation context depth

**Data structure:**
```javascript
sessionStorage: {
  'cliniciq_conversation_id': 'conv_1703001234567_a1b2c3d4e',
  'cliniciq_message_count': '5',
  'cliniciq_conversation_started': '2024-01-15T10:30:00.000Z'
}
```

## Risks / Trade-offs

### Risk 1: sessionStorage blocked in private mode

**Impact:** Conversation state won't persist across chat widget open/close

**Mitigation:**
- Detect sessionStorage availability on init
- Fall back to in-memory state (ChatBot class properties)
- Each message treated as new conversation (acceptable degradation)
- Log warning for debugging

**Code pattern:**
```javascript
isSessionStorageAvailable() {
  try {
    const test = '__storage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
```

### Risk 2: sendBeacon() not completing before page unload

**Impact:** Some conversation end markers may not reach backend

**Mitigation:**
- Accept best-effort delivery for analytics data
- Backend handles missing end markers gracefully
- Not critical for chatbot functionality
- Can supplement with page visibility API for longer sessions

### Risk 3: n8n webhook breaking changes

**Impact:** n8n webhook may not expect new conversation metadata fields

**Mitigation:**
- **All existing fields preserved exactly** - no changes to current payload structure
- New conversation fields added additively at root level
- n8n workflows ignore unknown fields by default (JSON standard)
- Test with current n8n workflow before deploying to production
- Document new payload fields for n8n workflow enhancement
- **Response handling unchanged** - continue parsing response as before

### Risk 4: Race conditions on rapid page close

**Impact:** State may not save before unload in edge cases

**Mitigation:**
- Use synchronous sessionStorage operations (blocking but fast <1ms)
- beforeunload fires early enough for most cases
- Accept rare edge case data loss

## Migration Plan

### Phase 1: Add conversation tracking (non-breaking)
1. Add new methods to ChatBot class
2. Store conversation metadata in sessionStorage
3. Include metadata in message payloads (additive)
4. Test with current backend (should ignore new fields)

### Phase 2: Add conversation end detection
1. Implement beforeunload handler
2. Add sendBeacon() endpoint to Netlify function
3. Test end marker delivery reliability
4. Monitor backend logs for end markers

### Phase 3: Enable analytics (optional)
1. Backend processes conversation metadata
2. Track conversation metrics
3. Build analytics dashboard (future)

### Rollback Plan
- If issues arise, feature is entirely client-side
- Can disable by not sending conversation metadata
- No backend changes required for rollback
- Remove beforeunload handler to stop end markers

## Data Flow Diagram (n8n Integration)

```
User Opens Chat
    ↓
Check sessionStorage for conversation_id
    ↓
    ├─ Found → Continue conversation
    │           - Use existing conversation_id
    │           - is_new_conversation: false
    │           - Increment message_count
    │
    └─ Not Found → Start new conversation
                   - Generate new conversation_id
                   - is_new_conversation: true
                   - message_count: 1
                   - Store in sessionStorage
    ↓
User Sends Message
    ↓
Prepare Enhanced Payload (backward compatible):
    {
      // EXISTING FIELDS (unchanged)
      message: "user message",
      timestamp: "2024-01-15T10:32:15.000Z",
      user_id: "user_1703001234567_xyz",
      source: "ClinicIQ Solutions Chat",
      type: "chat_message",
      origin: "https://cliniciqsolutions.com",

      // NEW CONVERSATION FIELDS (additive)
      conversation_id: "conv_1703001234567_a1b2c3d4e",
      is_new_conversation: false,
      message_count: 3,
      conversation_started_at: "2024-01-15T10:30:00.000Z"
    }
    ↓
Send to Netlify Function (/.netlify/functions/chatbot)
    ↓
Netlify Function Forwards to n8n Webhook (CHATBOT_WEBHOOK_URL)
    ↓
n8n Workflow Processes:
    - Receives enhanced payload
    - Can use conversation_id for memory/context lookup
    - Can track new vs continuing conversations
    - Existing workflow logic works unchanged
    ↓
n8n Returns Response (existing format):
    {
      "success": true,
      "message": "AI response here...",
      "timestamp": "2024-01-15T10:32:16.000Z"
    }
    OR
    [{"output": "AI response here..."}]
    ↓
Netlify Function Forwards Response to Frontend (unchanged)
    ↓
Frontend Displays Response (existing logic)

---

User Closes Page / Refreshes
    ↓
beforeunload Event Fires
    ↓
Send Conversation End Marker via sendBeacon():
    {
      type: "conversation_end",
      conversation_id: "conv_1703001234567_a1b2c3d4e",
      total_messages: 5,
      conversation_duration: 125.5,  // seconds
      ended_at: "2024-01-15T10:32:45.000Z",
      source: "ClinicIQ Solutions Chat"
    }
    ↓
Optional: Forward to n8n for conversation cleanup/analytics
    ↓
Page Unloads
    ↓
sessionStorage Cleared by Browser
```

**Key Points:**
- ✅ All existing n8n webhook fields unchanged
- ✅ New conversation fields are optional additions
- ✅ Response format from n8n completely unchanged
- ✅ Existing response parsing logic works as-is
- ✅ n8n can optionally use conversation_id for memory
- ✅ n8n workflow doesn't need immediate changes

## Open Questions

1. **Should we implement conversation history persistence?**
   - Decision: Not in initial implementation - future enhancement
   - Reasoning: Adds complexity, privacy concerns, not essential for MVP

2. **How long should conversations stay "active"?**
   - Decision: Until page refresh or close (session lifetime)
   - Reasoning: sessionStorage handles this automatically, simple and predictable

3. **Should we show conversation ID to users?**
   - Decision: No, keep internal only
   - Reasoning: No user value, adds UI clutter, technical implementation detail

4. **What about conversation transfer between devices?**
   - Decision: Out of scope - requires authentication and backend
   - Reasoning: Static site limitation, not core requirement

5. **Should we rate-limit conversation creation?**
   - Decision: Not needed initially
   - Reasoning: Page refresh already natural rate limit, can add later if abused
