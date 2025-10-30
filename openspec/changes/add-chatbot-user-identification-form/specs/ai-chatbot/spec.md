# ai-chatbot Specification Deltas

## ADDED Requirements

### Requirement: User Identification Form on Chat Start

The chatbot SHALL collect user identification (name, email, optional phone) before allowing message exchange.

#### Scenario: First-time chat open in browser session
- **WHEN** user clicks the chat toggle button for the first time in a browser session
- **THEN** the chat container SHALL display an identification form instead of message interface
- **AND** the form SHALL request: user name (required), email address (required), phone number (optional)
- **AND** the message input area SHALL be hidden until form is submitted successfully
- **AND** the form SHALL include a submit button labeled "Start Chat"
- **AND** no messages can be sent until form submission completes

#### Scenario: Subsequent chat opens in same session
- **WHEN** user opens the chat widget again in the same browser session
- **AND** user identification has already been collected and stored in sessionStorage
- **THEN** the chat container SHALL display the message interface directly
- **AND** the identification form SHALL be skipped
- **AND** user can immediately send messages without re-entering identification
- **AND** sessionStorage SHALL contain: cliniciq_user_name, cliniciq_user_email, cliniciq_user_phone

#### Scenario: Chat open after page refresh
- **WHEN** user refreshes the page or opens a new tab
- **AND** sessionStorage has been cleared automatically by the browser
- **THEN** the next chat open SHALL display the identification form again
- **AND** the user SHALL be required to re-enter their identification
- **AND** a new conversation_id SHALL be generated

### Requirement: Identification Form Validation

The chatbot SHALL validate user identification inputs before allowing conversation start.

#### Scenario: Valid form submission
- **WHEN** user fills out name and email fields
- **AND** email format is valid (contains @ and domain)
- **AND** name field is not empty
- **AND** user clicks "Start Chat" button
- **THEN** the form SHALL be submitted successfully
- **AND** user identification SHALL be stored in sessionStorage
- **AND** conversation_start marker SHALL be sent to backend with user data
- **AND** chat interface SHALL transition to message input view
- **AND** a personalized greeting SHALL be displayed using user's name

#### Scenario: Invalid email format
- **WHEN** user enters an invalid email address (missing @, missing domain, etc.)
- **AND** user attempts to submit the form
- **THEN** the form SHALL NOT submit
- **AND** an error message SHALL be displayed: "Please enter a valid email address"
- **AND** the email input field SHALL be highlighted with error styling
- **AND** focus SHALL return to the email input field

#### Scenario: Empty required fields
- **WHEN** user attempts to submit the form
- **AND** name field is empty OR email field is empty
- **THEN** the form SHALL NOT submit
- **AND** an error message SHALL be displayed: "Please fill in all required fields"
- **AND** empty required fields SHALL be highlighted with error styling
- **AND** focus SHALL move to the first empty required field

#### Scenario: Optional phone number field
- **WHEN** user leaves the phone number field empty
- **AND** submits the form with valid name and email
- **THEN** the form SHALL submit successfully
- **AND** phone number SHALL be stored as empty string in sessionStorage
- **AND** conversation_start marker SHALL include user_phone as empty string

### Requirement: User Identification Storage

The chatbot SHALL store user identification in sessionStorage for session-scoped persistence.

#### Scenario: Storing user identification after form submission
- **WHEN** user successfully submits the identification form
- **THEN** the system SHALL store user_name in sessionStorage key "cliniciq_user_name"
- **AND** the system SHALL store user_email in sessionStorage key "cliniciq_user_email"
- **AND** the system SHALL store user_phone in sessionStorage key "cliniciq_user_phone" (may be empty string)
- **AND** the stored values SHALL persist until page refresh or tab close

#### Scenario: Retrieving user identification for messages
- **WHEN** user sends a chat message
- **THEN** the system SHALL retrieve user_name from sessionStorage
- **AND** the system SHALL retrieve user_email from sessionStorage
- **AND** the system SHALL retrieve user_phone from sessionStorage
- **AND** the message payload SHALL include all three identification fields

#### Scenario: SessionStorage unavailable (privacy mode)
- **WHEN** sessionStorage is blocked or unavailable
- **THEN** the system SHALL fall back to in-memory storage for user identification
- **AND** identification form SHALL be shown on every chat open (no persistence)
- **AND** the chatbot SHALL continue to function without errors
- **AND** user identification SHALL be included in message payloads during the current page session

### Requirement: Conversation Start with User Identification

The chatbot SHALL send a conversation_start marker including user identification to the backend.

#### Scenario: Sending conversation_start marker after form submission
- **WHEN** user successfully submits the identification form
- **THEN** the system SHALL send a conversation_start marker to the Netlify function
- **AND** the marker SHALL include type: 'conversation_start'
- **AND** the marker SHALL include conversation_id (unique UUID)
- **AND** the marker SHALL include user_name from form input
- **AND** the marker SHALL include user_email from form input
- **AND** the marker SHALL include user_phone from form input (may be empty string)
- **AND** the marker SHALL include timestamp (ISO 8601 format)
- **AND** the marker SHALL include source: 'ClinicIQ Solutions Chat'

#### Scenario: Netlify function forwarding conversation_start to n8n
- **WHEN** Netlify function receives a conversation_start marker
- **THEN** the function SHALL forward the complete marker to the n8n webhook
- **AND** the n8n webhook SHALL receive all user identification fields
- **AND** the function SHALL return success status immediately (fire-and-forget)
- **AND** the frontend SHALL transition to message interface upon success

### Requirement: User Identification in All Message Payloads

The chatbot SHALL include user identification in every chat message payload.

#### Scenario: Regular chat message with user identification
- **WHEN** user sends a chat message after form submission
- **THEN** the message payload SHALL include user_name from sessionStorage
- **AND** the payload SHALL include user_email from sessionStorage
- **AND** the payload SHALL include user_phone from sessionStorage (may be empty string)
- **AND** the payload SHALL include conversation_id
- **AND** the payload SHALL include all existing conversation metadata
- **AND** the Netlify function SHALL forward all fields to n8n webhook

#### Scenario: Conversation end marker with user identification
- **WHEN** user closes the page or navigates away
- **AND** conversation_end marker is triggered
- **THEN** the marker SHALL include user_name from sessionStorage
- **AND** the marker SHALL include user_email from sessionStorage
- **AND** the marker SHALL include user_phone from sessionStorage
- **AND** the marker SHALL include total_messages and conversation_duration
- **AND** the Netlify function SHALL forward complete end marker to n8n

### Requirement: Personalized Chat Greeting

The chatbot SHALL display a personalized greeting using the user's name after form submission.

#### Scenario: Greeting message after successful form submission
- **WHEN** user successfully submits the identification form
- **AND** the conversation_start marker is sent
- **THEN** the chat interface SHALL display a personalized greeting message
- **AND** the greeting SHALL include the user's name (e.g., "Hi Jane! How can I help you today?")
- **AND** the greeting SHALL be displayed as a bot message with proper styling
- **AND** the message input SHALL become active and focused
- **AND** the user can immediately type their first message

#### Scenario: Returning user greeting (same session)
- **WHEN** user opens the chat widget again in the same session
- **AND** user identification is already stored in sessionStorage
- **THEN** the chat interface SHALL display message history if available
- **OR** display a returning user greeting using stored name
- **AND** the user can continue the conversation immediately

### Requirement: Form UI/UX Design

The identification form SHALL follow the luxury brand design system and be mobile-responsive.

#### Scenario: Form visual design
- **WHEN** the identification form is displayed
- **THEN** the form SHALL use the luxury color palette (Primary Green #2C4A3C, Gold Accent #C4A661, Cream Background #F5F1E6)
- **AND** form inputs SHALL have proper spacing and typography (Inter font family)
- **AND** the submit button SHALL use primary green background with gold hover state
- **AND** form SHALL include a friendly heading (e.g., "Let's Get Started")
- **AND** form SHALL include helper text explaining why identification is needed

#### Scenario: Mobile-responsive form design
- **WHEN** user opens chat on mobile device (viewport < 640px)
- **THEN** form inputs SHALL be full-width with adequate touch targets (min 44px height)
- **AND** input type="email" SHALL trigger mobile email keyboard
- **AND** input type="tel" SHALL trigger mobile number keyboard for phone field
- **AND** form SHALL be scrollable if content exceeds viewport height
- **AND** submit button SHALL be easily tappable and visible

#### Scenario: Form accessibility
- **WHEN** the identification form is displayed
- **THEN** each input SHALL have an associated <label> element with proper for attribute
- **AND** form SHALL have proper ARIA attributes (aria-label, aria-required, aria-invalid)
- **AND** form SHALL support keyboard navigation (Tab, Enter to submit)
- **AND** error messages SHALL be announced by screen readers
- **AND** focus management SHALL follow logical tab order

### Requirement: Form Submission Loading State

The chatbot SHALL display a loading state during form submission to prevent duplicate submissions.

#### Scenario: Form submission in progress
- **WHEN** user clicks "Start Chat" button
- **AND** the conversation_start marker is being sent to backend
- **THEN** the submit button SHALL display "Starting Chat..." text
- **AND** the submit button SHALL be disabled to prevent duplicate clicks
- **AND** a loading spinner or animation SHALL be displayed
- **AND** form inputs SHALL be disabled during submission
- **AND** user cannot modify form fields until submission completes or fails

#### Scenario: Form submission success
- **WHEN** the conversation_start marker is successfully sent and acknowledged
- **THEN** the form SHALL smoothly transition to the message interface
- **AND** the loading state SHALL be removed
- **AND** the personalized greeting SHALL be displayed
- **AND** the message input SHALL be focused and ready for input

#### Scenario: Form submission failure
- **WHEN** the conversation_start marker fails to send (network error, backend error)
- **THEN** the loading state SHALL be removed
- **AND** the submit button SHALL be re-enabled
- **AND** an error message SHALL be displayed: "Unable to start chat. Please try again."
- **AND** user can retry form submission
- **AND** form field values SHALL be preserved

## MODIFIED Requirements

### Requirement: Conversation Session Management

The chatbot SHALL maintain unique conversation sessions with proper lifecycle tracking **and user identification**.

#### Scenario: New conversation on first chat open (MODIFIED)
- **WHEN** user opens the chat widget for the first time in a session
- **THEN** the system SHALL display the user identification form
- **AND** the system SHALL generate a unique conversation_id
- **AND** the conversation_id SHALL be stored in sessionStorage
- **AND** the system SHALL initialize message_count to 0
- **AND** conversation SHALL NOT start until user submits identification form

#### Scenario: Conversation start after form submission (NEW)
- **WHEN** user successfully submits the identification form
- **THEN** the system SHALL send conversation_start marker with user identification
- **AND** the system SHALL mark this as a new conversation (is_new_conversation: true)
- **AND** the system SHALL store user identification in sessionStorage
- **AND** the chat interface SHALL transition to message input view
- **AND** the conversation SHALL be considered officially started

### Requirement: Conversation Metadata Transmission (MODIFIED)

The chatbot SHALL send conversation lifecycle metadata **including user identification** with each message to the backend.

#### Scenario: First message in new conversation (MODIFIED)
- **WHEN** user sends the first message in a new conversation
- **THEN** the payload SHALL include conversation_id (unique UUID)
- **AND** the payload SHALL include is_new_conversation: true
- **AND** the payload SHALL include message_count: 1
- **AND** the payload SHALL include conversation_started_at (ISO timestamp)
- **AND** the payload SHALL include user_name from sessionStorage
- **AND** the payload SHALL include user_email from sessionStorage
- **AND** the payload SHALL include user_phone from sessionStorage (may be empty string)

#### Scenario: Subsequent messages in conversation (MODIFIED)
- **WHEN** user sends additional messages in the same conversation
- **THEN** the payload SHALL include the same conversation_id
- **AND** the payload SHALL include is_new_conversation: false
- **AND** the payload SHALL include incremented message_count
- **AND** the payload SHALL include conversation_started_at (original timestamp)
- **AND** the payload SHALL include previous_message_count
- **AND** the payload SHALL include user_name, user_email, user_phone from sessionStorage

### Requirement: Conversation End Detection (MODIFIED)

The chatbot SHALL detect and mark conversation end events **with user identification context**.

#### Scenario: Page close or navigation away (MODIFIED)
- **WHEN** user closes the page or navigates away
- **THEN** the system SHALL send a conversation_end marker to the backend
- **AND** the marker SHALL include final conversation_id
- **AND** the marker SHALL include total_messages count
- **AND** the marker SHALL include conversation_duration (seconds)
- **AND** the marker SHALL include user_name, user_email, user_phone from sessionStorage
- **AND** sessionStorage SHALL be cleared automatically by browser on page close
