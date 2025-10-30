# Implementation Tasks

## Overview
Add user identification form (name, email, optional phone) to chatbot that collects information before allowing message exchange. Form shown once per browser session using sessionStorage.

## Tasks

### 1. Frontend: Add User Identification State Management
- [ ] Add properties to ChatBot class for user identification state
  - `hasUserIdentification` boolean flag
  - `userIdentificationSubmitting` loading state flag
- [ ] Create `getUserIdentification()` method to retrieve from sessionStorage
  - Get `cliniciq_user_name`
  - Get `cliniciq_user_email`
  - Get `cliniciq_user_phone`
  - Return object with {name, email, phone} or null if not found
- [ ] Create `storeUserIdentification(name, email, phone)` method
  - Store in sessionStorage with proper keys
  - Handle sessionStorage unavailable (fallback to instance variables)
- [ ] Update `init()` method to check for existing user identification
  - Call `getUserIdentification()` on initialization
  - Set `hasUserIdentification` flag based on result
- [ ] Update `initializeConversationState()` to coordinate with user identification

**Files**: `script.js:794-1270` (ChatBot class)

**Validation**: User identification state correctly tracked, sessionStorage working

### 2. Frontend: Create User Identification Form HTML
- [ ] Add form container div inside chat-messages area (or replace initial content)
  - Use class `chat-identification-form` for styling
  - Add heading "Let's Get Started"
  - Add helper text explaining why identification is needed
- [ ] Add name input field
  - `<input type="text" id="chat-user-name" required>`
  - Associated `<label for="chat-user-name">Your Name *</label>`
  - Proper ARIA attributes: `aria-required="true"`
- [ ] Add email input field
  - `<input type="email" id="chat-user-email" required>`
  - Associated `<label for="chat-user-email">Email Address *</label>`
  - Proper ARIA attributes: `aria-required="true"`
- [ ] Add phone input field (optional)
  - `<input type="tel" id="chat-user-phone">`
  - Associated `<label for="chat-user-phone">Phone Number (optional)</label>`
  - Proper ARIA attributes
- [ ] Add submit button
  - `<button type="submit" id="chat-start-button">Start Chat</button>`
  - Proper ARIA attributes: `aria-label="Start chat conversation"`
- [ ] Add error message container
  - `<div class="chat-form-error" role="alert" aria-live="polite"></div>`

**Files**: `index.html:546-577` (chat-container section)

**Validation**: Form HTML structure present, proper semantic markup, accessibility attributes

### 3. Frontend: Style User Identification Form
- [ ] Create `.chat-identification-form` styles
  - Use luxury color palette (Primary Green, Gold Accent, Cream Background)
  - Proper spacing and padding matching chat design
  - Mobile-responsive (full-width inputs on small screens)
- [ ] Style form inputs
  - Use Inter font family
  - Adequate padding and border radius
  - Focus states with gold accent color
  - Error states with red border and background
- [ ] Style submit button
  - Primary green background (#2C4A3C)
  - Gold hover state (#C4A661)
  - Disabled state with reduced opacity
  - Loading state with spinner or animation
- [ ] Style error messages
  - Red color for error text
  - Proper spacing and visibility
- [ ] Add mobile-responsive styles
  - Touch-friendly input heights (min 44px)
  - Full-width layout on mobile
  - Proper spacing for small screens

**Files**: `styles.css` (add new section for chat identification form)

**Validation**: Form visually matches luxury brand design, mobile-friendly, accessible

### 4. Frontend: Implement Form Validation Logic
- [ ] Create `validateUserIdentificationForm()` method
  - Check name field is not empty
  - Validate email format (regex or HTML5 validation)
  - Return validation result object: `{valid: boolean, errors: string[]}`
- [ ] Create `showFormError(message)` method
  - Display error in error message container
  - Add error styling to invalid fields
  - Set focus to first invalid field
- [ ] Create `clearFormErrors()` method
  - Remove error messages and styling
- [ ] Add real-time validation on input blur (optional)
  - Validate individual fields as user tabs out
  - Show field-specific error messages

**Files**: `script.js:794-1270` (ChatBot class)

**Validation**: Form validation working, proper error messages, focus management

### 5. Frontend: Implement Form Submission Handler
- [ ] Create `handleUserIdentificationSubmit(event)` method
  - Prevent default form submission
  - Clear existing errors
  - Validate form inputs
  - If invalid, show errors and return
  - If valid, set loading state and submit
- [ ] Implement form submission flow
  - Set `userIdentificationSubmitting = true`
  - Update submit button: text to "Starting Chat...", disable button
  - Disable form inputs during submission
  - Call `submitUserIdentification(name, email, phone)`
- [ ] Create `submitUserIdentification(name, email, phone)` method
  - Store identification in sessionStorage
  - Send conversation_start marker to backend
  - On success: transition to chat interface, show greeting
  - On error: show error message, re-enable form
- [ ] Attach event listener to form submission
  - Listen for form submit event
  - Call `handleUserIdentificationSubmit()`

**Files**: `script.js:794-1270` (ChatBot class)

**Validation**: Form submission working, loading states correct, error handling robust

### 6. Frontend: Implement Conversation Start Marker with User Data
- [ ] Create `sendConversationStartMarker(name, email, phone)` method
  - Build payload with type: 'conversation_start'
  - Include conversation_id, timestamp, source
  - Include user_name, user_email, user_phone
  - Send POST request to Netlify function
  - Return promise (resolve on success, reject on error)
- [ ] Update `sendConversationEnd()` method to include user identification
  - Retrieve user identification from sessionStorage
  - Add user_name, user_email, user_phone to end marker payload
- [ ] Handle conversation_start response
  - On success: call `transitionToChatInterface()`
  - On error: call `showFormError()` with error message

**Files**: `script.js:794-1270` (ChatBot class)

**Validation**: Conversation start marker sent correctly, user data included, error handling

### 7. Frontend: Implement Chat Interface Transition
- [ ] Create `transitionToChatInterface()` method
  - Hide identification form
  - Show message input area and chat messages container
  - Display personalized greeting using user's name
  - Focus message input field
  - Set `hasUserIdentification = true`
- [ ] Create `showPersonalizedGreeting(name)` method
  - Create bot message: "Hi [name]! How can I help you today?"
  - Use existing `addMessage()` method to display
  - Include proper styling and timestamp
- [ ] Update `openChat()` method to show correct UI
  - If `hasUserIdentification === false`, show form
  - If `hasUserIdentification === true`, show message interface
- [ ] Add smooth transition animation (optional)
  - Fade out form, fade in chat interface
  - Use CSS transitions for professional appearance

**Files**: `script.js:794-1270` (ChatBot class)

**Validation**: Smooth transition working, greeting displayed, message input ready

### 8. Frontend: Update Message Sending to Include User Data
- [ ] Update `sendMessage()` method
  - Retrieve user identification from sessionStorage before sending
  - Add user_name, user_email, user_phone to message payload
  - If user identification missing, show error (shouldn't happen)
- [ ] Update all backend API calls to include user identification
  - Regular messages
  - Conversation end markers
  - Any other API interactions

**Files**: `script.js:794-1270` (ChatBot class)

**Validation**: All messages include user identification, backend receives correct data

### 9. Backend: Update Netlify Function to Handle User Identification
- [ ] Update Netlify function to parse user identification fields
  - Extract user_name, user_email, user_phone from request body
  - Validate fields are present (for non-conversation_start requests)
- [ ] Add user identification to n8n webhook payload
  - Add user_name, user_email, user_phone as root-level fields
  - Preserve all existing fields (backward compatible)
- [ ] Handle conversation_start marker type
  - Forward complete marker to n8n webhook
  - Return success response immediately (fire-and-forget)
- [ ] Update conversation_end marker forwarding
  - Include user identification in end marker
  - Forward to n8n webhook
- [ ] Add error handling for missing user identification
  - If user data missing (invalid state), log warning
  - Continue processing but note data quality issue

**Files**: `netlify/functions/chatbot.js:1-160`

**Validation**: Backend correctly forwards user data, n8n receives all fields, backward compatible

### 10. Testing: Validate Form Flow End-to-End
- [ ] Test first-time chat open
  - Form displays correctly
  - All fields present and styled properly
  - Submit button functional
- [ ] Test form validation
  - Empty name field rejected
  - Invalid email format rejected
  - Optional phone field works (empty or filled)
  - Error messages display correctly
- [ ] Test form submission
  - Loading state shows correctly
  - Conversation start marker sent to backend
  - Backend forwards to n8n webhook
  - Chat interface transition smooth
- [ ] Test personalized greeting
  - Greeting includes user's name
  - Displayed as bot message with proper styling
- [ ] Test message sending with user identification
  - First message includes user data
  - Subsequent messages include user data
  - Conversation end includes user data
- [ ] Test sessionStorage persistence
  - User identification persists on subsequent chat opens (same session)
  - Form skipped when identification already stored
  - Page refresh clears sessionStorage, form shown again
- [ ] Test mobile responsiveness
  - Form displays correctly on mobile (< 640px)
  - Touch targets adequate size
  - Keyboard types correct for input fields
  - Scrolling works if needed
- [ ] Test accessibility
  - Keyboard navigation works (Tab, Enter)
  - Screen reader announcements correct
  - Error messages announced
  - Focus management logical
- [ ] Test sessionStorage unavailable (privacy mode)
  - Form still displays and submits
  - Fallback to in-memory storage works
  - Messages sent successfully
  - Form shown again on page refresh

**Validation**: All scenarios working correctly, no regressions, production-ready

### 11. Documentation: Update Project Documentation
- [ ] Update CLAUDE.md with new chatbot flow
  - Document user identification requirement
  - Update feature list with identification form
- [ ] Add inline code comments
  - Document form validation logic
  - Document sessionStorage keys and structure
  - Document conversation start marker format
- [ ] Update any existing API documentation
  - Document new user identification fields in payloads
  - Update n8n webhook integration documentation

**Files**: `CLAUDE.md`, code comments in `script.js` and `netlify/functions/chatbot.js`

**Validation**: Documentation accurate and complete, easy to understand for future maintainers

## Definition of Done
- [ ] All tasks completed and validated
- [ ] Form displays on first chat open, skipped on subsequent opens (same session)
- [ ] Form validation working correctly with proper error messages
- [ ] User identification stored in sessionStorage with graceful fallback
- [ ] Conversation start marker sent with user identification
- [ ] All messages include user identification (name, email, phone)
- [ ] Backend forwards user data to n8n webhook (backward compatible)
- [ ] Personalized greeting displays after form submission
- [ ] Mobile-responsive design with proper touch targets
- [ ] Accessible with keyboard navigation and screen reader support
- [ ] No console errors or warnings
- [ ] Tested across browsers (Chrome, Firefox, Safari, Edge)
- [ ] Documentation updated

## Notes
- **Phone field**: Optional, can be left empty
- **SessionStorage**: Automatically cleared on page refresh or tab close
- **Privacy**: No long-term tracking, session-scoped only
- **UX**: Form shown once per session for better user experience
- **Validation**: Client-side validation with HTML5 + JavaScript
- **Accessibility**: WCAG 2.1 AA compliance required
- **Mobile**: Touch-friendly design with proper input types
