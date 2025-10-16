# Tasks: Require Chatbot User Identification

## Phase 1: HTML Structure & CSS Styling (Foundation)

### Task 1: Add Welcome Form HTML Structure
**Deliverable:** Welcome form HTML added to index.html
**Validation:** Form elements visible when display style removed
**Files:** `index.html`

- Add welcome form container inside `#chat-container`
- Create form with name and email input fields
- Add labels with proper `for` attributes
- Add error message spans with `role="alert"`
- Add submit button with clear CTA text
- Add privacy note text
- Set initial `display: none` on form container
- Verify all IDs match design specification

**Acceptance Criteria:**
- [ ] Welcome form HTML exists in DOM
- [ ] All form elements have proper IDs
- [ ] Labels correctly associated with inputs
- [ ] Error spans have role="alert" attribute
- [ ] Form has semantic HTML structure

---

### Task 2: Style Welcome Form UI
**Deliverable:** Welcome form styled matching design
**Validation:** Form displays correctly in chatbot container
**Files:** `styles.css`

- Add `.chat-welcome-form` container styling
- Style `.welcome-form-content` with max-width and centering
- Style form labels with color and font-weight
- Style input fields with border, padding, focus states
- Style error states (`.error` class, `.error-message`)
- Style submit button with hover and disabled states
- Add privacy note styling
- Add fade-in/fade-out animation keyframes
- Ensure mobile responsiveness (single column, proper spacing)

**Acceptance Criteria:**
- [ ] Form matches design mockup visually
- [ ] Input fields have clear focus indicators
- [ ] Error states are visually distinct
- [ ] Submit button has hover effect
- [ ] Form is mobile-responsive
- [ ] Touch targets meet 44x44px minimum

---

## Phase 2: Form Validation Logic (Core Functionality)

### Task 3: Implement Email Validation Function
**Deliverable:** Email validation utility function
**Validation:** Regex correctly validates email formats
**Files:** `script.js`

- Add `validateEmail(email)` function to utility section
- Implement regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Trim whitespace before validation
- Return boolean result
- Add JSDoc comments with examples

**Acceptance Criteria:**
- [ ] Function accepts email string parameter
- [ ] Returns true for valid emails
- [ ] Returns false for invalid emails
- [ ] Handles edge cases (empty, whitespace, special chars)
- [ ] Has clear documentation

**Test Cases:**
- ✅ `user@domain.com` → true
- ✅ `test.user@example.co.uk` → true
- ✅ `name+tag@company.org` → true
- ❌ `notanemail` → false
- ❌ `missing@domain` → false
- ❌ `@nodomain.com` → false

---

### Task 4: Implement Name Validation Function
**Deliverable:** Name validation utility function
**Validation:** Non-empty validation works correctly
**Files:** `script.js`

- Add `validateName(name)` function to utility section
- Trim whitespace before validation
- Check length > 0 after trimming
- Return boolean result
- Add JSDoc comments

**Acceptance Criteria:**
- [ ] Function accepts name string parameter
- [ ] Returns true for non-empty names
- [ ] Returns false for empty or whitespace-only
- [ ] Supports UTF-8 characters
- [ ] Has clear documentation

**Test Cases:**
- ✅ `John Smith` → true
- ✅ `María García` → true
- ✅ `李明` → true
- ❌ `` (empty) → false
- ❌ `   ` (whitespace) → false

---

### Task 5: Implement Form Validation Handler
**Deliverable:** Form validation on submit
**Validation:** Validation prevents invalid submissions
**Files:** `script.js`

- Add `validateWelcomeForm(formData)` method to ChatBot class
- Extract name and email from FormData
- Call validation functions
- Collect validation errors
- Return validation result object: `{ valid: boolean, errors: {} }`
- Show error messages in UI
- Apply error styling to invalid fields
- Clear previous errors before revalidation

**Acceptance Criteria:**
- [ ] Method validates both fields
- [ ] Returns structured validation result
- [ ] Updates UI with error messages
- [ ] Applies error styling to fields
- [ ] Clears previous errors
- [ ] Prevents form submission if invalid

---

## Phase 3: User Identification Storage (State Management)

### Task 6: Implement User Identification Storage
**Deliverable:** sessionStorage management with fallback
**Validation:** User data persists in session
**Files:** `script.js`

- Add `storeUserIdentification(name, email)` method
- Store name in `cliniciq_chat_user_name` key
- Store email in `cliniciq_chat_user_email` key
- Store identified flag in `cliniciq_chat_user_identified` key
- Implement try/catch with fallback to instance variables
- Log warning if sessionStorage unavailable

**Acceptance Criteria:**
- [ ] User name stored correctly
- [ ] User email stored correctly
- [ ] Identified flag set to "true"
- [ ] Fallback works when sessionStorage blocked
- [ ] Console warning logged on fallback

---

### Task 7: Implement User Identification Retrieval
**Deliverable:** Retrieve stored user identification
**Validation:** Correct data retrieved from storage
**Files:** `script.js`

- Add `getUserIdentification()` method
- Retrieve name, email, and identified flag
- Return object: `{ name, email, identified }`
- Handle sessionStorage unavailable with fallback
- Return null values if not identified

**Acceptance Criteria:**
- [ ] Method returns user identification object
- [ ] Handles missing data gracefully
- [ ] Fallback works correctly
- [ ] Identified flag correctly indicates state

---

### Task 8: Implement Chat State Initialization
**Deliverable:** Determine initial chat state on open
**Validation:** Correct state shown based on storage
**Files:** `script.js`

- Add `initializeChatState()` method
- Check if user is identified via `getUserIdentification()`
- Set `this.chatState` to 'welcome_form' or 'active'
- Store user data in instance variables if identified
- Call from `openChat()` method

**Acceptance Criteria:**
- [ ] New users see welcome form state
- [ ] Returning users (same session) see active chat state
- [ ] User data loaded correctly for returning users
- [ ] State correctly persists within session

---

## Phase 4: Form Submission & State Transition (User Flow)

### Task 9: Implement Welcome Form Submit Handler
**Deliverable:** Form submission processing
**Validation:** Form submission triggers validation
**Files:** `script.js`

- Add event listener to welcome form submit
- Prevent default form submission
- Extract FormData
- Call validation handler
- If valid: proceed to Task 10 flow
- If invalid: show errors and stop

**Acceptance Criteria:**
- [ ] Form submit event captured
- [ ] Default behavior prevented
- [ ] FormData extracted correctly
- [ ] Validation runs on submit
- [ ] Invalid submissions blocked

---

### Task 10: Implement User Identification Flow
**Deliverable:** Complete identification after valid submission
**Validation:** User identified and stored after submission
**Files:** `script.js`

- On valid form submission: store user identification
- Send conversation start marker to backend
- Generate personalized greeting message
- Transition UI from form to chat (Task 11)
- Focus message input field

**Acceptance Criteria:**
- [ ] User data stored in sessionStorage
- [ ] Conversation start sent to backend
- [ ] Personalized greeting generated
- [ ] UI transitions smoothly
- [ ] Message input focused and enabled

---

### Task 11: Implement UI State Transition
**Deliverable:** Smooth form-to-chat transition
**Validation:** Animated transition works correctly
**Files:** `script.js`

- Add `transitionToActiveChat()` method
- Fade out welcome form (300ms)
- Fade in chat messages container (300ms)
- Update chat state to 'active'
- Show personalized greeting message
- Enable message input field
- Focus message input after transition

**Acceptance Criteria:**
- [ ] Welcome form fades out smoothly
- [ ] Chat interface fades in smoothly
- [ ] No layout shifts during transition
- [ ] Greeting message appears correctly
- [ ] Input field focused automatically
- [ ] Animations are 300ms duration

---

### Task 12: Create Personalized Greeting Message
**Deliverable:** Dynamic greeting using user's name
**Validation:** Greeting displays with correct name
**Files:** `script.js`

- Add `createPersonalizedGreeting(userName)` method
- Generate greeting text: "Hi {name}! I'm your ClinicIQ Assistant. How can I help you today?"
- Use exact name capitalization provided
- Call `addMessage()` with greeting as bot message
- Add timestamp to greeting

**Acceptance Criteria:**
- [ ] Greeting uses user's exact name
- [ ] Greeting text is friendly and welcoming
- [ ] Greeting appears as bot message
- [ ] Timestamp included
- [ ] No template/formatting errors

---

## Phase 5: Backend Integration (Conversation Start)

### Task 13: Send Conversation Start Marker
**Deliverable:** Conversation start event sent to backend
**Validation:** Payload received by Netlify function
**Files:** `script.js`

- Add `sendConversationStart(userName, userEmail)` method
- Generate payload with type: 'conversation_start'
- Include conversation_id, user_name, user_email, timestamp, source
- Send POST to `/.netlify/functions/chatbot`
- Handle response (fire-and-forget, log errors)

**Acceptance Criteria:**
- [ ] Payload includes all required fields
- [ ] POST request sent to correct endpoint
- [ ] JSON content-type header set
- [ ] Errors logged to console
- [ ] Does not block UI flow

---

### Task 14: Include User Context in Chat Messages
**Deliverable:** All messages include user identification
**Validation:** Message payloads contain user data
**Files:** `script.js`

- Modify `sendMessage()` method
- Include `user_name` field from stored identification
- Include `user_email` field from stored identification
- Maintain all existing payload fields
- Verify payload structure matches design

**Acceptance Criteria:**
- [ ] user_name included in message payload
- [ ] user_email included in message payload
- [ ] All existing fields preserved
- [ ] Payload structure correct
- [ ] No breaking changes to existing flow

---

### Task 15: Update Netlify Function for User Context
**Deliverable:** Netlify function forwards user identification
**Validation:** n8n webhook receives user data
**Files:** `netlify/functions/chatbot.js`

- Extract `user_name` from request payload
- Extract `user_email` from request payload
- Forward both fields to n8n webhook
- Handle `conversation_start` message type
- Preserve all existing payload forwarding

**Acceptance Criteria:**
- [ ] user_name extracted and forwarded
- [ ] user_email extracted and forwarded
- [ ] conversation_start type handled
- [ ] Existing functionality preserved
- [ ] No breaking changes to webhook contract

---

## Phase 6: Accessibility & Polish (Quality)

### Task 16: Implement Keyboard Navigation
**Deliverable:** Full keyboard accessibility
**Validation:** All form actions work via keyboard
**Files:** `script.js`

- Ensure Tab navigation works (name → email → submit)
- Ensure Shift+Tab reverse navigation works
- Ensure Enter key in any field submits form
- Add visible focus indicators (already in CSS)
- Test with keyboard only (no mouse)

**Acceptance Criteria:**
- [ ] Tab key moves focus forward correctly
- [ ] Shift+Tab moves focus backward correctly
- [ ] Enter submits form from any field
- [ ] Focus indicators visible on all elements
- [ ] No keyboard traps

---

### Task 17: Implement Screen Reader Support
**Deliverable:** Form accessible to screen readers
**Validation:** Screen reader announces form correctly
**Files:** `index.html`, `script.js`

- Verify labels associated with inputs (for attribute)
- Ensure error messages use role="alert"
- Add aria-required="true" to required fields
- Announce form appearance to screen reader
- Announce validation errors dynamically
- Announce successful transition to chat

**Acceptance Criteria:**
- [ ] Labels read correctly by screen reader
- [ ] Required fields announced as required
- [ ] Validation errors announced immediately
- [ ] Form state changes announced
- [ ] ARIA attributes correct

---

### Task 18: Optimize Mobile Experience
**Deliverable:** Mobile-optimized form UI
**Validation:** Form works perfectly on mobile devices
**Files:** `index.html`, `styles.css`

- Set input type="email" for email field
- Add autocomplete="name" to name field
- Add autocomplete="email" to email field
- Ensure minimum 44x44px touch targets
- Test on iOS Safari and Android Chrome
- Verify keyboard appears correctly

**Acceptance Criteria:**
- [ ] Email keyboard appears on mobile
- [ ] Autocomplete suggestions work
- [ ] Touch targets meet minimum size
- [ ] No horizontal scroll on mobile
- [ ] Form scrollable if keyboard reduces height

---

## Phase 7: Testing & Validation (Quality Assurance)

### Task 19: Manual Testing Checklist
**Deliverable:** Comprehensive manual test execution
**Validation:** All scenarios work as expected
**Files:** N/A (testing only)

**Test Scenarios:**
- [ ] First-time user sees welcome form
- [ ] Valid form submission works
- [ ] Invalid email shows error
- [ ] Empty name shows error
- [ ] Both fields invalid shows both errors
- [ ] Returning user (same session) skips form
- [ ] Page refresh clears session and shows form again
- [ ] sessionStorage blocked falls back to in-memory
- [ ] Conversation start sent to backend
- [ ] User context included in all messages
- [ ] Personalized greeting displays correctly
- [ ] Smooth UI transition animation
- [ ] Keyboard navigation works
- [ ] Mobile experience optimized
- [ ] Screen reader announces correctly

---

### Task 20: Cross-Browser Testing
**Deliverable:** Verified functionality across browsers
**Validation:** Works in all target browsers
**Files:** N/A (testing only)

**Test Browsers:**
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] iOS Safari (mobile)
- [ ] Android Chrome (mobile)

**Verify:**
- Form displays correctly
- Validation works
- Storage works (sessionStorage)
- Animations smooth
- No console errors

---

### Task 21: Accessibility Audit
**Deliverable:** WCAG 2.1 AA compliance verified
**Validation:** No accessibility violations
**Files:** N/A (testing only)

**Verification Steps:**
- [ ] Run axe DevTools accessibility scan
- [ ] Test with keyboard only (no mouse)
- [ ] Test with NVDA screen reader (Windows)
- [ ] Test with VoiceOver screen reader (Mac/iOS)
- [ ] Verify color contrast ratios (4.5:1 minimum)
- [ ] Verify focus indicators visible
- [ ] Verify ARIA attributes correct
- [ ] Fix any identified issues

---

## Phase 8: Documentation & Deployment (Completion)

### Task 22: Update Technical Documentation
**Deliverable:** Documentation reflects new feature
**Validation:** Docs accurately describe functionality
**Files:** `CLAUDE.md`, OpenSpec docs

- Update CLAUDE.md with user identification feature
- Document sessionStorage keys used
- Document payload structure changes
- Update feature list to include welcome form
- Add troubleshooting section for common issues

**Acceptance Criteria:**
- [ ] CLAUDE.md updated accurately
- [ ] New feature documented clearly
- [ ] Payload changes documented
- [ ] Troubleshooting guidance included

---

### Task 23: Archive OpenSpec Change
**Deliverable:** OpenSpec change properly archived
**Validation:** Change tracked in OpenSpec system
**Files:** OpenSpec directory

- Run `openspec validate require-chatbot-user-identification --strict`
- Fix any validation issues
- Run `openspec archive require-chatbot-user-identification`
- Verify specs updated in openspec/specs/
- Verify change archived in openspec/changes/

**Acceptance Criteria:**
- [ ] Validation passes with --strict flag
- [ ] All specs properly formatted
- [ ] Change successfully archived
- [ ] Specs moved to correct location

---

## Task Dependencies

**Parallel Work (no dependencies):**
- Tasks 1-2 can be done together (HTML + CSS)
- Tasks 3-4 can be done together (validation functions)

**Sequential Dependencies:**
- Tasks 5 requires Tasks 3-4 (validation handler needs functions)
- Tasks 6-8 can be done in parallel after Task 5
- Task 9 requires Task 5 (form handler needs validation)
- Task 10 requires Tasks 6-9 (identification flow needs all prior work)
- Task 11 requires Task 10 (transition happens after identification)
- Task 12 can be done anytime after Task 11
- Tasks 13-15 can be done in parallel (backend integration)
- Tasks 16-18 can be done in parallel (accessibility polish)
- Task 19 requires all prior tasks complete
- Tasks 20-21 can be done in parallel after Task 19
- Tasks 22-23 must be done last (documentation and archival)

## Estimated Timeline

- **Phase 1 (HTML/CSS):** 2-3 hours
- **Phase 2 (Validation):** 2-3 hours
- **Phase 3 (Storage):** 2-3 hours
- **Phase 4 (User Flow):** 3-4 hours
- **Phase 5 (Backend):** 2-3 hours
- **Phase 6 (Accessibility):** 2-3 hours
- **Phase 7 (Testing):** 3-4 hours
- **Phase 8 (Documentation):** 1-2 hours

**Total Estimated Time:** 17-25 hours (2-3 development days)
