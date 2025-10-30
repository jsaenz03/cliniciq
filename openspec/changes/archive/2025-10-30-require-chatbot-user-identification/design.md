# Design: Chatbot User Identification System

## Architecture Overview

This design implements a welcome form barrier pattern for the AI chatbot, following industry-standard UX practices (Intercom, Drift, Zendesk). The system uses a state machine approach to manage transitions between form and chat states.

## State Machine Design

```
┌─────────────────┐
│   Chat Closed   │
└────────┬────────┘
         │ user clicks toggle
         ↓
┌─────────────────┐     form submitted     ┌─────────────────┐
│  Welcome Form   │ ───────────────────→   │   Chat Active   │
│     State       │      (validated)        │     State       │
└─────────────────┘                         └────────┬────────┘
         ↑                                           │
         │                                           │
         │         page refresh / session clear     │
         └───────────────────────────────────────────┘
```

**State Definitions:**
- **Chat Closed**: Initial state, chatbot UI hidden
- **Welcome Form State**: First-time user sees form, message input disabled
- **Chat Active State**: Identified user can send/receive messages

**State Transitions:**
- `Chat Closed → Welcome Form`: No user identification in sessionStorage
- `Chat Closed → Chat Active`: User identification exists in sessionStorage (returning user in same session)
- `Welcome Form → Chat Active`: Successful form submission and validation
- `Chat Active → Chat Closed`: User closes chatbot (state preserved)
- `Any State → Welcome Form`: Page refresh clears sessionStorage

## Component Architecture

### ChatBot Class Extensions

```javascript
class ChatBot {
  constructor() {
    // Existing properties...
    this.chatState = 'closed'; // 'closed' | 'welcome_form' | 'active'
    this.userIdentified = false;
    this.userName = null;
    this.userEmail = null;
    this.welcomeForm = null; // DOM reference to form
  }

  // New methods
  initializeChatState()          // Determine initial state based on sessionStorage
  showWelcomeForm()              // Display welcome form, hide chat interface
  validateWelcomeForm(data)      // Validate name and email inputs
  handleWelcomeFormSubmit(e)     // Process form submission
  storeUserIdentification(data)  // Save to sessionStorage with fallback
  getUserIdentification()        // Retrieve from sessionStorage
  clearUserIdentification()      // Clear sessionStorage (for testing/reset)
  transitionToActiveChat()       // Smooth transition from form to chat
  sendConversationStart()        // Send start marker with user context
  createPersonalizedGreeting()   // Generate greeting using user's name

  // Modified methods
  openChat()                     // Check state, show form or chat accordingly
  sendMessage()                  // Include user identification in payload
}
```

### HTML Structure

```html
<div class="chat-container" id="chat-container">
  <!-- Chat Header (always visible) -->
  <div class="chat-header">...</div>

  <!-- Welcome Form (shown for new users) -->
  <div class="chat-welcome-form" id="chat-welcome-form" style="display: none;">
    <div class="welcome-form-content">
      <h3>Welcome to ClinicIQ Assistant</h3>
      <p class="welcome-subtitle">Please introduce yourself to get started</p>

      <form id="welcome-form" class="welcome-form">
        <div class="form-group">
          <label for="user-name">Your Name</label>
          <input
            type="text"
            id="user-name"
            name="name"
            placeholder="John Smith"
            autocomplete="name"
            required
            aria-required="true"
          />
          <span class="error-message" id="name-error" role="alert"></span>
        </div>

        <div class="form-group">
          <label for="user-email">Your Email</label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="john@example.com"
            autocomplete="email"
            required
            aria-required="true"
          />
          <span class="error-message" id="email-error" role="alert"></span>
        </div>

        <button type="submit" class="welcome-submit-btn">
          Start Chat
        </button>

        <p class="privacy-note">
          We respect your privacy. Your information is used only for this conversation.
        </p>
      </form>
    </div>
  </div>

  <!-- Chat Messages (shown after form submission) -->
  <div class="chat-messages" id="chat-messages" style="display: none;">
    <!-- Messages appear here -->
  </div>

  <!-- Chat Input (enabled after form submission) -->
  <div class="chat-input-container">...</div>
</div>
```

### CSS Styling Strategy

**Welcome Form Styling:**
```css
.chat-welcome-form {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
}

.welcome-form-content {
  width: 100%;
  max-width: 400px;
}

.welcome-form .form-group {
  margin-bottom: 1.5rem;
}

.welcome-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--primary-green);
}

.welcome-form input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #E5E5E5;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.welcome-form input:focus {
  outline: none;
  border-color: var(--primary-green);
}

.welcome-form input.error {
  border-color: #DC2626;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #DC2626;
  min-height: 1.25rem; /* Reserve space to prevent layout shift */
}

.welcome-submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: var(--primary-green);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.welcome-submit-btn:hover {
  background: #1e3329;
}

.welcome-submit-btn:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}

.privacy-note {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #6B7280;
  text-align: center;
}

/* Transition animations */
.fade-out {
  animation: fadeOut 300ms ease-out forwards;
}

.fade-in {
  animation: fadeIn 300ms ease-in forwards;
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); display: none; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Data Flow

### Welcome Form Submission Flow

```
┌──────────────┐
│ User submits │
│ welcome form │
└──────┬───────┘
       ↓
┌──────────────────────┐
│ Validate form data   │
│ - Non-empty name     │
│ - Valid email format │
└──────┬───────────────┘
       ↓
   [Valid?]
       ↓ Yes
┌──────────────────────────┐
│ Store in sessionStorage  │
│ - cliniciq_chat_user_name│
│ - cliniciq_chat_user_email│
│ - cliniciq_chat_user_identified│
└──────┬───────────────────┘
       ↓
┌──────────────────────────┐
│ Send conversation_start  │
│ to Netlify function      │
│ with user identification │
└──────┬───────────────────┘
       ↓
┌──────────────────────────┐
│ Transition UI:           │
│ - Fade out form          │
│ - Fade in chat interface │
│ - Show personalized greeting│
│ - Focus message input    │
└──────────────────────────┘
```

### Payload Structure

**Conversation Start Payload:**
```json
{
  "type": "conversation_start",
  "conversation_id": "conv_1705320600000_a1b2c3d4",
  "user_name": "Jane Doe",
  "user_email": "jane@example.com",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "source": "ClinicIQ Solutions Chat"
}
```

**Chat Message Payload (with user context):**
```json
{
  "type": "chat_message",
  "message": "What are your business hours?",
  "conversation_id": "conv_1705320600000_a1b2c3d4",
  "user_name": "Jane Doe",
  "user_email": "jane@example.com",
  "is_new_conversation": false,
  "message_count": 1,
  "conversation_started_at": "2025-01-15T10:30:00.000Z",
  "timestamp": "2025-01-15T10:30:15.000Z",
  "user_id": "user_1705320600000_x9y8z7",
  "source": "ClinicIQ Solutions Chat"
}
```

## Validation Logic

### Email Validation
```javascript
function validateEmail(email) {
  // Regex pattern for standard email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
```

**Valid Examples:**
- `user@domain.com`
- `test.user@example.co.uk`
- `name+tag@company.org`
- `firstname.lastname@sub.domain.com`

**Invalid Examples:**
- `notanemail` (no @ symbol)
- `missing@domain` (no TLD)
- `@nodomain.com` (no local part)
- `spaces @domain.com` (whitespace)

### Name Validation
```javascript
function validateName(name) {
  // Trim whitespace and check non-empty
  const trimmedName = name.trim();
  return trimmedName.length > 0;
}
```

**Valid Examples:**
- `John Smith`
- `María García` (UTF-8 support)
- `李明` (international characters)
- `O'Brien` (special characters)

**Invalid Examples:**
- `` (empty string)
- `   ` (whitespace only)

## Storage Strategy

### SessionStorage Keys
- `cliniciq_chat_user_name`: User's full name as entered
- `cliniciq_chat_user_email`: User's validated email address
- `cliniciq_chat_user_identified`: Boolean flag ("true"/"false")

### Fallback Strategy
```javascript
class UserIdentificationStorage {
  constructor() {
    this._fallbackName = null;
    this._fallbackEmail = null;
  }

  store(name, email) {
    try {
      sessionStorage.setItem('cliniciq_chat_user_name', name);
      sessionStorage.setItem('cliniciq_chat_user_email', email);
      sessionStorage.setItem('cliniciq_chat_user_identified', 'true');
    } catch (error) {
      console.warn('sessionStorage unavailable, using in-memory fallback');
      this._fallbackName = name;
      this._fallbackEmail = email;
    }
  }

  retrieve() {
    try {
      return {
        name: sessionStorage.getItem('cliniciq_chat_user_name'),
        email: sessionStorage.getItem('cliniciq_chat_user_email'),
        identified: sessionStorage.getItem('cliniciq_chat_user_identified') === 'true'
      };
    } catch (error) {
      console.warn('sessionStorage unavailable, using fallback');
      return {
        name: this._fallbackName,
        email: this._fallbackEmail,
        identified: !!(this._fallbackName && this._fallbackEmail)
      };
    }
  }

  clear() {
    try {
      sessionStorage.removeItem('cliniciq_chat_user_name');
      sessionStorage.removeItem('cliniciq_chat_user_email');
      sessionStorage.removeItem('cliniciq_chat_user_identified');
    } catch (error) {
      this._fallbackName = null;
      this._fallbackEmail = null;
    }
  }
}
```

## Netlify Function Integration

### Updated Chatbot Function

**File:** `netlify/functions/chatbot.js`

**Changes Required:**
- Extract `user_name` and `user_email` from incoming payload
- Forward these fields to n8n webhook
- Handle new `conversation_start` message type

```javascript
exports.handler = async (event, context) => {
  // ... existing code ...

  try {
    const data = JSON.parse(event.body);

    // Extract user identification if present
    const payload = {
      message: data.message,
      timestamp: data.timestamp,
      user_id: data.user_id,
      source: data.source,
      type: data.type || 'chat_message',
      conversation_id: data.conversation_id
    };

    // Add user identification to payload (new fields)
    if (data.user_name) {
      payload.user_name = data.user_name;
    }
    if (data.user_email) {
      payload.user_email = data.user_email;
    }

    // Handle conversation_start type
    if (data.type === 'conversation_start') {
      payload.user_name = data.user_name;
      payload.user_email = data.user_email;
      // Don't require message field for conversation_start
    }

    // ... forward to n8n webhook ...
  }
}
```

## Mobile Optimization

**Touch Target Sizes:**
- Form inputs: minimum 44x44 CSS pixels (iOS/Android standard)
- Submit button: full-width with 0.875rem vertical padding
- Touch-friendly spacing between form fields

**Keyboard Handling:**
- `type="email"` triggers email keyboard on mobile
- `autocomplete` attributes enable autofill
- Enter key in any field submits form
- No need for explicit "Done" button on mobile keyboards

**Viewport Considerations:**
- Single-column layout prevents horizontal scroll
- Form content scrollable if keyboard reduces viewport height
- Fixed chat header remains visible during keyboard display

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**
- All form inputs have associated `<label>` elements
- Error messages use `role="alert"` for screen reader announcements
- Form validation errors announced via `aria-live="polite"`
- Keyboard navigation: Tab order is logical (name → email → submit)
- Focus indicators visible on all interactive elements
- Color contrast ratios meet 4.5:1 minimum

**Screen Reader Announcements:**
- Form appearance: "Welcome to ClinicIQ Assistant. Please introduce yourself to get started."
- Validation errors: "Error: Please enter your name" / "Error: Please enter a valid email address"
- Successful submission: "Chat started. Hi [Name]! I'm your ClinicIQ Assistant."

## Testing Strategy

**Unit Tests:**
- Email validation regex against valid/invalid patterns
- Name validation for empty/whitespace-only strings
- sessionStorage fallback mechanism
- Form submission handler logic

**Integration Tests:**
- Complete form submission flow from open to active chat
- User identification storage and retrieval
- Conversation start marker payload generation
- UI state transitions (form → chat)

**Manual Testing:**
- Mobile device testing (iOS Safari, Android Chrome)
- Keyboard-only navigation
- Screen reader testing (NVDA, JAWS, VoiceOver)
- sessionStorage blocked scenario (private browsing)
- Page refresh clears session correctly

## Performance Considerations

**Optimization Strategies:**
- Form validation runs on submit (not on every keystroke)
- Smooth CSS transitions (300ms) for state changes
- No external dependencies required
- Minimal JavaScript execution overhead
- Form HTML pre-rendered in index.html (no dynamic generation)

**Expected Performance:**
- Form display: < 50ms
- Validation execution: < 10ms
- UI transition: 300ms (animation duration)
- sessionStorage operations: < 5ms
- Total form-to-chat flow: < 400ms

## Migration Strategy

**Backwards Compatibility:**
- Existing n8n workflow continues to work (ignores new fields)
- No changes required to webhook endpoint
- Existing conversation lifecycle features preserved
- Optional gradual n8n enhancement to use user identification

**Rollback Plan:**
- Remove welcome form HTML from index.html
- Restore original `openChat()` method
- Remove user identification storage calls
- Falls back to anonymous chat behavior
