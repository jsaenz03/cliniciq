# Implementation Tasks

## 1. Core Conversation Lifecycle Implementation

- [ ] 1.1 Add conversation ID generation method to ChatBot class
  - Generate unique conversation IDs with format: "conv_" + timestamp + "_" + random
  - Use crypto.randomUUID() with fallback to timestamp + random string

- [ ] 1.2 Add sessionStorage wrapper methods
  - getConversationId() - retrieve or create conversation ID
  - getMessageCount() - retrieve and increment message count
  - getConversationStartTime() - retrieve conversation start timestamp
  - clearConversationState() - clear all conversation data
  - Handle sessionStorage unavailability gracefully

- [ ] 1.3 Modify ChatBot.init() method
  - Initialize conversation state on chatbot creation
  - Set up page visibility and beforeunload event listeners
  - Detect returning vs new sessions

- [ ] 1.4 Update sendMessage() method
  - Retrieve current conversation metadata before sending
  - Include conversation_id, is_new_conversation, message_count in payload
  - Increment message count after successful send
  - Store updated state in sessionStorage

## 2. Conversation End Detection

- [ ] 2.1 Add page beforeunload event handler
  - Send conversation_end marker before page unload
  - Include conversation_id, total_messages, conversation_duration
  - Use sendBeacon() API for reliable delivery during page unload
  - Fallback to synchronous fetch if sendBeacon unavailable

- [ ] 2.2 Add page visibility change handler
  - Monitor document.visibilityState changes
  - Keep conversation active when tab is hidden
  - Only end conversation on actual page unload/close

- [ ] 2.3 Add conversation end marker method
  - sendConversationEnd() - send end marker to backend
  - Calculate conversation duration from start timestamp
  - Include final message count and metadata

## 3. Backend Integration Updates

- [ ] 3.1 Update Netlify function payload structure
  - Add conversation_id field to forwarded data
  - Add is_new_conversation boolean flag
  - Add message_count and previous_message_count
  - Add conversation_started_at timestamp
  - Maintain backward compatibility

- [ ] 3.2 Add conversation_end endpoint handling
  - Detect conversation_end type messages
  - Forward to webhook with appropriate structure
  - Return immediate success (fire-and-forget pattern)

## 4. UI and User Experience Enhancements

- [ ] 4.1 Add visual indicator for new conversations (optional)
  - Show subtle "New conversation" indicator when chat opens fresh
  - Auto-hide after first message sent

- [ ] 4.2 Add conversation reset button (future enhancement)
  - Add reset/clear conversation button to chat header
  - Confirm before clearing conversation
  - Start fresh conversation after reset

## 5. Testing and Validation

- [ ] 5.1 Test conversation ID generation
  - Verify uniqueness across multiple sessions
  - Test format consistency
  - Test fallback when crypto.randomUUID() unavailable

- [ ] 5.2 Test sessionStorage persistence
  - Verify conversation continues across chat open/close
  - Verify conversation resets on page refresh
  - Test graceful fallback when sessionStorage blocked

- [ ] 5.3 Test conversation end detection
  - Verify beforeunload handler fires correctly
  - Test sendBeacon() delivery of end markers
  - Test page visibility changes don't end conversation
  - Verify conversation duration calculation accuracy

- [ ] 5.4 Test backend integration
  - Verify Netlify function forwards conversation metadata
  - Test conversation_end marker handling
  - Verify webhook receives correct data structure
  - Test backward compatibility with existing webhook

- [ ] 5.5 Cross-browser testing
  - Test in Chrome, Firefox, Safari, Edge
  - Test private/incognito mode behavior
  - Test with sessionStorage disabled
  - Verify sendBeacon() support and fallbacks

## 6. Documentation

- [ ] 6.1 Update code comments
  - Document conversation lifecycle methods
  - Add JSDoc comments for new methods
  - Explain sessionStorage keys and data structures

- [ ] 6.2 Update CLAUDE.md if needed
  - Document conversation lifecycle feature
  - Note sessionStorage keys used
  - Explain conversation metadata structure

## 7. Optional Enhancements (Future Scope)

- [ ] 7.1 Add conversation history persistence (localStorage)
  - Store conversation transcripts for user reference
  - Implement privacy-conscious retention policy
  - Add UI to view past conversations

- [ ] 7.2 Add conversation analytics
  - Track average conversation length
  - Monitor conversation drop-off points
  - Measure user engagement metrics

- [ ] 7.3 Add conversation export
  - Allow users to download conversation transcript
  - Support multiple formats (text, JSON, PDF)
  - Include conversation metadata in export
