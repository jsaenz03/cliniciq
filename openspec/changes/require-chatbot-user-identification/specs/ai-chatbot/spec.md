# Spec: AI Chatbot User Identification

## ADDED Requirements

### R1: Welcome Form Collection

**Priority:** High
**Status:** New

The chatbot MUST display a welcome form as the first interface state when opened, collecting user identification before allowing message exchange.

#### Scenario: User Opens Chatbot for First Time in Session

**Given** the user has not previously opened the chatbot in this session
**When** the user clicks the chat toggle button
**Then** the chatbot opens and displays a welcome form
**And** the welcome form contains:
- Heading: "Welcome to ClinicIQ Assistant"
- Subheading: "Please introduce yourself to get started"
- Name input field (text input, required, placeholder: "Your name")
- Email input field (email input, required, placeholder: "Your email")
- Submit button: "Start Chat"
- Privacy note: "We respect your privacy. Your information is used only for this conversation."
**And** the regular message input is hidden/disabled
**And** no chat history or greeting messages are visible

#### Scenario: User Submits Valid Welcome Form

**Given** the welcome form is displayed
**When** the user enters "John Smith" in the name field
**And** the user enters "john@example.com" in the email field
**And** the user clicks "Start Chat"
**Then** the form validates successfully
**And** the user identification is stored in sessionStorage
**And** the welcome form is replaced with the regular chat interface
**And** a personalized bot greeting appears: "Hi John! I'm your ClinicIQ Assistant. How can I help you today?"
**And** the message input is enabled and focused
**And** a conversation start marker is sent to the backend with user identification

#### Scenario: User Submits Invalid Email

**Given** the welcome form is displayed
**When** the user enters "John Smith" in the name field
**And** the user enters "invalid-email" in the email field
**And** the user clicks "Start Chat"
**Then** the form validation fails
**And** an error message appears below the email field: "Please enter a valid email address"
**And** the email field is highlighted with error styling
**And** the form remains visible for correction
**And** no data is sent to the backend

#### Scenario: User Submits Empty Name Field

**Given** the welcome form is displayed
**When** the email field contains "john@example.com"
**And** the name field is empty
**And** the user clicks "Start Chat"
**Then** the form validation fails
**And** an error message appears below the name field: "Please enter your name"
**And** the name field is highlighted with error styling
**And** the form remains visible for correction

#### Scenario: User Returns to Chat in Same Session

**Given** the user has previously submitted the welcome form in this session
**And** the user closed the chatbot
**When** the user clicks the chat toggle button again
**Then** the chatbot opens directly to the regular chat interface
**And** the welcome form is NOT displayed
**And** the previous conversation context is preserved
**And** the stored user identification is reused for subsequent messages

---

### R2: User Identification Storage

**Priority:** High
**Status:** New

The chatbot MUST store user identification in sessionStorage after successful form submission, persisting only for the current page session.

#### Scenario: Successful Form Submission Stores User Data

**Given** the user submits a valid welcome form with name "Jane Doe" and email "jane@example.com"
**When** the form validation passes
**Then** sessionStorage contains key `cliniciq_chat_user_name` with value "Jane Doe"
**And** sessionStorage contains key `cliniciq_chat_user_email` with value "jane@example.com"
**And** sessionStorage contains key `cliniciq_chat_user_identified` with value "true"
**And** the stored data is immediately available to the conversation lifecycle system

#### Scenario: Page Refresh Clears User Identification

**Given** the user has previously submitted the welcome form
**And** sessionStorage contains user identification data
**When** the user refreshes the page (F5 or browser refresh)
**Then** all sessionStorage data is cleared by the browser
**And** the next chatbot open displays the welcome form again
**And** the user must re-enter their identification

#### Scenario: SessionStorage Unavailable Fallback

**Given** sessionStorage is blocked or unavailable (private browsing mode)
**When** the user submits the welcome form
**Then** the system uses in-memory fallback storage
**And** user identification persists only while chatbot remains open
**And** a console warning is logged about storage unavailability
**And** the chatbot remains functional with degraded persistence

---

### R3: Conversation Start Marker with User Context

**Priority:** High
**Status:** New

The chatbot MUST send a conversation start marker to the backend immediately after successful welcome form submission, including user identification metadata.

#### Scenario: Conversation Start Sent After Form Submission

**Given** the user successfully submits the welcome form with name "Alice Brown" and email "alice@example.com"
**When** the form validation passes
**Then** a conversation start marker is sent to `/.netlify/functions/chatbot`
**And** the payload contains:
```json
{
  "type": "conversation_start",
  "conversation_id": "conv_1234567890_abc123",
  "user_name": "Alice Brown",
  "user_email": "alice@example.com",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "source": "ClinicIQ Solutions Chat"
}
```
**And** the request uses POST method with JSON content-type
**And** the conversation_id matches the existing conversation tracking system

#### Scenario: User Identification Included in All Messages

**Given** the user has completed the welcome form with name "Bob Wilson" and email "bob@example.com"
**When** the user sends a chat message "What are your hours?"
**Then** the message payload includes user identification:
```json
{
  "type": "chat_message",
  "message": "What are your hours?",
  "conversation_id": "conv_1234567890_abc123",
  "user_name": "Bob Wilson",
  "user_email": "bob@example.com",
  "timestamp": "2025-01-15T10:31:00.000Z",
  "source": "ClinicIQ Solutions Chat",
  "is_new_conversation": false,
  "message_count": 1
}
```
**And** all subsequent messages include the same user identification
**And** the n8n workflow receives complete user context

---

### R4: Form Validation and Error Handling

**Priority:** High
**Status:** New

The chatbot welcome form MUST validate user input before submission and provide clear, actionable error feedback.

#### Scenario: Email Format Validation

**Given** the welcome form is displayed
**When** the user enters an email value
**Then** the system validates against regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
**And** valid formats include: "user@domain.com", "test.user@example.co.uk", "name+tag@company.org"
**And** invalid formats include: "notanemail", "missing@domain", "@nodomain.com", "spaces @domain.com"

#### Scenario: Name Field Non-Empty Validation

**Given** the welcome form is displayed
**When** the user enters a name value
**Then** the system validates that the trimmed value length is > 0
**And** whitespace-only names are rejected
**And** all valid UTF-8 names are accepted (supporting international characters)

#### Scenario: Real-Time Validation Feedback

**Given** the welcome form is displayed
**When** the user types in the email field
**And** the user tabs away or submits the form
**Then** validation runs immediately
**And** error messages appear within 100ms
**And** error styling is applied to invalid fields
**And** valid fields show no error state
**And** the submit button remains enabled (validation on submit, not on blur)

#### Scenario: Multiple Validation Errors Displayed

**Given** the welcome form is displayed
**When** the user submits with empty name and invalid email
**Then** both error messages are displayed simultaneously
**And** the name field shows: "Please enter your name"
**And** the email field shows: "Please enter a valid email address"
**And** both fields are highlighted with error styling
**And** focus is set to the first invalid field (name)

---

### R5: Accessible and Mobile-Optimized Form UI

**Priority:** Medium
**Status:** New

The welcome form MUST be fully accessible and optimized for mobile devices, following WCAG 2.1 AA standards.

#### Scenario: Keyboard Navigation and Accessibility

**Given** the welcome form is displayed
**When** the user navigates using keyboard only
**Then** Tab key moves focus from name → email → submit button
**And** Shift+Tab moves focus backwards
**And** Enter key in any input field submits the form
**And** all interactive elements have visible focus indicators
**And** form fields have associated labels (not just placeholders)
**And** error messages are announced to screen readers via aria-live="polite"

#### Scenario: Mobile Input Optimization

**Given** the user opens the chatbot on a mobile device
**When** the welcome form is displayed
**Then** the name field has `autocomplete="name"` attribute
**And** the email field has `type="email"` and `autocomplete="email"` attributes
**And** the email keyboard layout appears automatically on mobile
**And** form inputs have minimum touch target size of 44x44 CSS pixels
**And** form layout is single-column and fits within viewport without horizontal scroll

#### Scenario: Screen Reader Announcements

**Given** a screen reader user opens the chatbot
**When** the welcome form appears
**Then** the heading is announced: "Welcome to ClinicIQ Assistant"
**And** each form field is announced with its label and requirements
**And** validation errors are announced when they appear
**And** successful submission triggers announcement: "Chat started. Hi [Name]! I'm your ClinicIQ Assistant."

---

### R6: Smooth UI Transition After Form Submission

**Priority:** Medium
**Status:** New

The chatbot MUST provide a smooth, visually pleasing transition from welcome form to chat interface after successful submission.

#### Scenario: Form to Chat Transition Animation

**Given** the user successfully submits the welcome form
**When** the form validation passes
**Then** the welcome form fades out over 300ms
**And** the regular chat interface fades in over 300ms
**And** the personalized greeting message appears with fade-in-up animation
**And** the message input field is automatically focused
**And** no jarring layout shifts occur during transition

#### Scenario: Personalized Greeting Message

**Given** the user submitted welcome form with name "Sarah Johnson"
**When** the chat interface appears after successful submission
**Then** the first bot message displays: "Hi Sarah! I'm your ClinicIQ Assistant. How can I help you today?"
**And** the greeting uses the exact name capitalization provided by the user
**And** the greeting appears with bot message styling
**And** the greeting includes a timestamp

#### Scenario: Focus Management After Transition

**Given** the welcome form has been successfully submitted
**When** the chat interface appears
**Then** the message input field receives keyboard focus within 100ms
**And** the user can immediately start typing without clicking
**And** the focus indicator is clearly visible
**And** no accessibility violations occur during focus transfer
