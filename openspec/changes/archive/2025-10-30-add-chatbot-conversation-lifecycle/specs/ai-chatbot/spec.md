# AI Chatbot Specification

## ADDED Requirements

### Requirement: Conversation Session Management

The chatbot SHALL maintain unique conversation sessions with proper lifecycle tracking.

#### Scenario: New conversation on first chat open
- **WHEN** user opens the chat widget for the first time in a session
- **THEN** the system SHALL generate a unique conversation_id
- **AND** the system SHALL mark this as a new conversation (is_new_conversation: true)
- **AND** the system SHALL store the conversation_id in sessionStorage
- **AND** the system SHALL initialize message_count to 0

#### Scenario: Continuing existing conversation
- **WHEN** user sends another message in the same session
- **THEN** the system SHALL use the existing conversation_id from sessionStorage
- **AND** the system SHALL mark this as a continuing conversation (is_new_conversation: false)
- **AND** the system SHALL increment the message_count
- **AND** the system SHALL send previous_message_count to the backend

#### Scenario: Fresh conversation after page refresh
- **WHEN** user refreshes the page or opens a new tab
- **THEN** the sessionStorage SHALL be cleared automatically
- **AND** the next chat interaction SHALL create a new conversation_id
- **AND** the system SHALL mark this as a new conversation (is_new_conversation: true)
- **AND** the message_count SHALL reset to 0

### Requirement: Conversation Metadata Transmission

The chatbot SHALL send conversation lifecycle metadata with each message to the backend.

#### Scenario: First message in new conversation
- **WHEN** user sends the first message in a new conversation
- **THEN** the payload SHALL include conversation_id (unique UUID)
- **AND** the payload SHALL include is_new_conversation: true
- **AND** the payload SHALL include message_count: 1
- **AND** the payload SHALL include conversation_started_at (ISO timestamp)

#### Scenario: Subsequent messages in conversation
- **WHEN** user sends additional messages in the same conversation
- **THEN** the payload SHALL include the same conversation_id
- **AND** the payload SHALL include is_new_conversation: false
- **AND** the payload SHALL include incremented message_count
- **AND** the payload SHALL include conversation_started_at (original timestamp)
- **AND** the payload SHALL include previous_message_count

### Requirement: Conversation End Detection

The chatbot SHALL detect and mark conversation end events.

#### Scenario: Page close or navigation away
- **WHEN** user closes the page or navigates away
- **THEN** the system SHALL send a conversation_end marker to the backend
- **AND** the marker SHALL include final conversation_id
- **AND** the marker SHALL include total_messages count
- **AND** the marker SHALL include conversation_duration (seconds)

#### Scenario: Page refresh
- **WHEN** user refreshes the page
- **THEN** the system SHALL attempt to send conversation_end marker before unload
- **AND** sessionStorage SHALL be cleared automatically by the browser
- **AND** the next conversation SHALL start fresh with new conversation_id

#### Scenario: Tab hidden but not closed
- **WHEN** user switches to another tab without closing the page
- **THEN** the conversation_id SHALL remain active in sessionStorage
- **AND** no conversation_end marker SHALL be sent
- **AND** the conversation SHALL continue when tab becomes visible again

### Requirement: Conversation ID Format

The system SHALL generate conversation IDs using a consistent, unique format.

#### Scenario: Conversation ID generation
- **WHEN** a new conversation is created
- **THEN** the conversation_id SHALL use format: "conv_" + timestamp + "_" + random_string
- **AND** the random_string SHALL be 9 characters from base36 encoding
- **AND** the conversation_id SHALL be unique across all browser sessions
- **AND** example format: "conv_1703001234567_a1b2c3d4e"

### Requirement: Session Storage Management

The chatbot SHALL use sessionStorage for conversation state persistence.

#### Scenario: Storing conversation state
- **WHEN** conversation state changes
- **THEN** the system SHALL store conversation_id in sessionStorage key "cliniciq_conversation_id"
- **AND** the system SHALL store message_count in sessionStorage key "cliniciq_message_count"
- **AND** the system SHALL store conversation_started_at in sessionStorage key "cliniciq_conversation_started"

#### Scenario: Retrieving conversation state
- **WHEN** user sends a message
- **THEN** the system SHALL retrieve conversation_id from sessionStorage
- **AND** the system SHALL retrieve message_count from sessionStorage
- **AND** if sessionStorage is unavailable, the system SHALL create a new conversation

#### Scenario: SessionStorage unavailable (privacy mode)
- **WHEN** sessionStorage is blocked or unavailable
- **THEN** the system SHALL fall back to in-memory conversation tracking
- **AND** each page refresh SHALL create a new conversation
- **AND** the system SHALL continue to function without errors

### Requirement: n8n Webhook Integration (Backward Compatible)

The Netlify function SHALL forward conversation metadata to the n8n webhook without breaking existing integration.

#### Scenario: Forwarding conversation data to n8n
- **WHEN** Netlify function receives a chat message
- **THEN** the function SHALL preserve ALL existing payload fields unchanged
- **AND** the function SHALL add conversation_id as a new root-level field
- **AND** the function SHALL add is_new_conversation flag as a new field
- **AND** the function SHALL add message_count as a new field
- **AND** the function SHALL add conversation_started_at timestamp as a new field
- **AND** the function SHALL forward complete payload to n8n webhook
- **AND** the function SHALL handle n8n response in existing format (unchanged)

#### Scenario: n8n response handling remains unchanged
- **WHEN** n8n webhook returns a response
- **THEN** the function SHALL parse response using existing logic
- **AND** the function SHALL handle array format: [{"output": "message"}]
- **AND** the function SHALL handle object formats: {response|message|reply|text|output}
- **AND** the function SHALL return response to frontend in existing format

#### Scenario: Handling conversation end markers (optional for n8n)
- **WHEN** Netlify function receives a conversation_end marker
- **THEN** the function MAY forward the marker to n8n webhook with type: "conversation_end"
- **AND** the marker SHALL include conversation_id, total_messages, and conversation_duration
- **AND** the function SHALL return success status immediately (fire-and-forget)
- **AND** n8n workflow can optionally process end markers for analytics

### Requirement: Conversation Reset Capability

The chatbot SHALL provide manual conversation reset functionality.

#### Scenario: Manual conversation reset
- **WHEN** user explicitly resets the conversation (future feature trigger)
- **THEN** the system SHALL clear sessionStorage conversation keys
- **AND** the system SHALL clear the chat messages UI
- **AND** the system SHALL generate a new conversation_id
- **AND** the system SHALL send conversation_end marker for the old conversation
- **AND** the system SHALL mark the next message as is_new_conversation: true
