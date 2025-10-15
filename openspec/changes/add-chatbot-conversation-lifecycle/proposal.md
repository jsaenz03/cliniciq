# Proposal: Add Conversation Lifecycle Management to AI Chatbot

## Why

The current AI chatbot lacks conversation state management, making it impossible to:
- Track when a conversation starts and ends
- Clear conversation history on page refresh
- Provide context continuity to the n8n workflow and AI system
- Implement proper conversation boundaries for better user experience and data management

Users expect a fresh conversation when they refresh the page, and the n8n workflow needs clear conversation boundaries to provide relevant, contextual responses without mixing unrelated conversation threads.

**Current n8n Architecture:**
- Frontend sends message to Netlify function (`/.netlify/functions/chatbot`)
- Netlify function forwards to n8n webhook
- n8n workflow processes message and returns response
- Response flows back through Netlify function to frontend

## What Changes

- Add conversation session management with unique conversation IDs
- Implement conversation start marker when chat is first opened or page is refreshed
- Implement conversation end marker when page is closed/refreshed
- Store conversation state in sessionStorage (clears on page refresh)
- **Extend existing Netlify function payload** with conversation metadata (conversation_id, is_new_conversation, message_count) - forwards to n8n webhook
- Add conversation reset functionality
- Implement page visibility and beforeunload event handlers for proper cleanup

**No Breaking Changes:**
- All existing payload fields preserved exactly as-is
- Conversation metadata added as NEW fields only
- n8n workflow can ignore new fields if not needed
- Current webhook response format unchanged

## Impact

**Affected specs:**
- New: `ai-chatbot` (creating initial specification)

**Affected code:**
- `script.js:826-1199` - ChatBot class implementation
- `netlify/functions/chatbot.js:1-160` - Netlify function to forward conversation metadata

**Breaking changes:**
- None - this is a pure enhancement to existing functionality

**Benefits:**
- Improved user experience with clear conversation boundaries
- n8n workflow can use conversation_id for context management
- Better AI context management for more relevant responses
- Proper data tracking for analytics and conversation history
- Foundation for future features (conversation history, conversation persistence)
- n8n can build conversation memory/history by conversation_id

**Risks:**
- **Zero breaking changes** - all changes are purely additive
- n8n webhook receives extra fields but doesn't need to use them
- Changes are additive and use sessionStorage which is well-supported
- Fallback behavior maintains current functionality if sessionStorage unavailable
- Existing response handling logic completely unchanged
