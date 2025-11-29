// ===== CHAT BOT FUNCTIONALITY =====

export class ChatBot {
  constructor() {
    this.chatWidget = document.getElementById('chat-widget');
    this.chatToggle = document.getElementById('chat-toggle');
    this.chatContainer = document.getElementById('chat-container');
    this.chatClose = document.getElementById('chat-close');
    this.chatForm = document.getElementById('chat-form');
    this.chatInput = document.getElementById('chat-input');
    this.chatMessages = document.getElementById('chat-messages');
    this.functionUrl = '/.netlify/functions/chatbot';

    this.isOpen = false;
    this.isTyping = false;

    // User identification state
    this.hasUserIdentification = false;
    this.userIdentificationSubmitting = false;

    // Conversation lifecycle state
    this.isConversationEnded = false;
    this.finishStatusDetected = false;

    // Lazy initialization flag - only init when user opens chat
    this.initialized = false;

    // Setup minimal event listener for lazy init
    this.setupLazyInit();
  }

  /**
   * Setup lazy initialization - only initialize chatbot when user interacts
   * This prevents blocking the page load event with chatbot initialization
   */
  setupLazyInit() {
    // Set up toggle listener that delegates to toggleChat()
    // toggleChat() will handle initialization check internally
    this.chatToggle?.addEventListener('click', () => {
      this.toggleChat();
    });
  }

  init() {
    if (!this.chatWidget) return;

    // Initialize conversation state
    this.initializeConversationState();

    // Check for existing user identification
    this.checkUserIdentification();

    // Set up event listeners (but not the toggle - already set up)
    this.setupEventListeners();
    this.setupKeyboardSupport();
    this.setupConversationEndHandlers();
  }

  /**
   * Generate unique conversation ID
   * Format: "conv_" + timestamp + "_" + random
   */
  generateConversationId() {
    const timestamp = Date.now();
    const random = crypto.randomUUID?.() ||
                   `${Math.random().toString(36).substr(2, 9)}_${Math.random().toString(36).substr(2, 9)}`;
    return `conv_${timestamp}_${random}`;
  }

  /**
   * Get or create conversation ID from sessionStorage
   */
  getConversationId() {
    try {
      let conversationId = sessionStorage.getItem('cliniciq_conversation_id');

      if (!conversationId) {
        conversationId = this.generateConversationId();
        sessionStorage.setItem('cliniciq_conversation_id', conversationId);
        sessionStorage.setItem('cliniciq_conversation_started_at', new Date().toISOString());
        sessionStorage.setItem('cliniciq_message_count', '0');
      }

      return conversationId;
    } catch (error) {
      console.warn('sessionStorage unavailable, using temporary ID:', error);
      // Fallback to instance variable if sessionStorage is blocked
      this._fallbackConversationId = this._fallbackConversationId || this.generateConversationId();
      return this._fallbackConversationId;
    }
  }

  /**
   * Get and increment message count
   */
  getMessageCount() {
    try {
      const count = parseInt(sessionStorage.getItem('cliniciq_message_count') || '0', 10);
      return count;
    } catch (error) {
      console.warn('sessionStorage unavailable for message count:', error);
      this._fallbackMessageCount = this._fallbackMessageCount || 0;
      return this._fallbackMessageCount;
    }
  }

  /**
   * Increment message count
   */
  incrementMessageCount() {
    try {
      const currentCount = this.getMessageCount();
      const newCount = currentCount + 1;
      sessionStorage.setItem('cliniciq_message_count', newCount.toString());
      return newCount;
    } catch (error) {
      console.warn('sessionStorage unavailable for incrementing:', error);
      this._fallbackMessageCount = (this._fallbackMessageCount || 0) + 1;
      return this._fallbackMessageCount;
    }
  }

  /**
   * Get conversation start timestamp
   */
  getConversationStartTime() {
    try {
      return sessionStorage.getItem('cliniciq_conversation_started_at') || new Date().toISOString();
    } catch (error) {
      console.warn('sessionStorage unavailable for start time:', error);
      this._fallbackStartTime = this._fallbackStartTime || new Date().toISOString();
      return this._fallbackStartTime;
    }
  }

  /**
   * Clear conversation state
   */
  clearConversationState() {
    try {
      sessionStorage.removeItem('cliniciq_conversation_id');
      sessionStorage.removeItem('cliniciq_conversation_started_at');
      sessionStorage.removeItem('cliniciq_message_count');
      sessionStorage.removeItem('cliniciq_conversation_ended');
    } catch (error) {
      console.warn('sessionStorage unavailable for clearing:', error);
      // Clear fallback variables
      this._fallbackConversationId = null;
      this._fallbackMessageCount = 0;
      this._fallbackStartTime = null;
      this._fallbackConversationEnded = false;
    }
  }

  /**
   * Check if conversation is ended
   */
  isConversationEndedCheck() {
    try {
      return sessionStorage.getItem('cliniciq_conversation_ended') === 'true';
    } catch (error) {
      console.warn('sessionStorage unavailable for conversation ended check:', error);
      return this._fallbackConversationEnded || false;
    }
  }

  /**
   * Set conversation ended state
   */
  setConversationEnded(ended) {
    try {
      sessionStorage.setItem('cliniciq_conversation_ended', ended ? 'true' : 'false');
    } catch (error) {
      console.warn('sessionStorage unavailable for conversation ended state:', error);
      this._fallbackConversationEnded = ended;
    }
  }

  /**
   * Initialize conversation state on chatbot creation
   */
  initializeConversationState() {
    // Get or create conversation ID (this will initialize if needed)
    this.getConversationId();

    // Check if conversation was previously ended
    this.isConversationEnded = this.isConversationEndedCheck();

    // Detect if this is a returning session
    const messageCount = this.getMessageCount();
    this.isNewConversation = messageCount === 0;
  }

  /**
   * Set up conversation end detection handlers
   */
  setupConversationEndHandlers() {
    // Handle page unload/close
    window.addEventListener('beforeunload', () => {
      this.sendConversationEnd();
    });

    // Handle page visibility changes (but don't end conversation)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Conversation stays active when tab is hidden
        // Only ends on actual page unload
      }
    });
  }

  /**
   * Send conversation end marker to backend
   */
  sendConversationEnd() {
    const conversationId = this.getConversationId();
    const messageCount = this.getMessageCount();
    const startTime = this.getConversationStartTime();

    // Calculate conversation duration in seconds
    const duration = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);

    // Get user identification if available
    const userIdentification = this.getUserIdentification();

    const endData = {
      conversation_id: conversationId,
      type: 'conversation_end',
      total_messages: messageCount,
      conversation_duration: duration,
      ended_at: new Date().toISOString(),
      source: 'ClinicIQ Solutions Chat',
      // Include user identification if available
      ...(userIdentification && {
        user_name: userIdentification.name,
        user_email: userIdentification.email,
        user_phone: userIdentification.phone
      })
    };

    // Use sendBeacon for reliable delivery during page unload
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(endData)], { type: 'application/json' });
      navigator.sendBeacon(this.functionUrl, blob);
    } else {
      // Fallback to synchronous fetch if sendBeacon unavailable
      try {
        fetch(this.functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(endData),
          keepalive: true
        });
      } catch (error) {
        console.warn('Failed to send conversation end marker:', error);
      }
    }
  }

  // ===== USER IDENTIFICATION METHODS =====

  /**
   * Check for existing user identification in sessionStorage
   */
  checkUserIdentification() {
    const userIdentification = this.getUserIdentification();
    this.hasUserIdentification = !!userIdentification;
  }

  /**
   * Get user identification from sessionStorage
   * @returns {Object|null} User data object or null if not found
   */
  getUserIdentification() {
    try {
      const name = sessionStorage.getItem('cliniciq_user_name');
      const email = sessionStorage.getItem('cliniciq_user_email');
      const phone = sessionStorage.getItem('cliniciq_user_phone');

      if (name && email) {
        return { name, email, phone: phone || '' };
      }

      return null;
    } catch (error) {
      console.warn('sessionStorage unavailable for user identification:', error);
      // Fallback to instance variables if sessionStorage is blocked
      if (this._fallbackUserName && this._fallbackUserEmail) {
        return {
          name: this._fallbackUserName,
          email: this._fallbackUserEmail,
          phone: this._fallbackUserPhone || ''
        };
      }
      return null;
    }
  }

  /**
   * Store user identification in sessionStorage
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} phone - User's phone (optional)
   */
  storeUserIdentification(name, email, phone) {
    try {
      sessionStorage.setItem('cliniciq_user_name', name);
      sessionStorage.setItem('cliniciq_user_email', email);
      sessionStorage.setItem('cliniciq_user_phone', phone || '');
    } catch (error) {
      console.warn('sessionStorage unavailable for storing user identification:', error);
      // Fallback to instance variables if sessionStorage is blocked
      this._fallbackUserName = name;
      this._fallbackUserEmail = email;
      this._fallbackUserPhone = phone || '';
    }
  }

  /**
   * Validate user identification form
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @returns {Object} Validation result with validity flag and errors array
   */
  validateUserIdentificationForm(name, email) {
    const errors = [];

    // Validate name
    if (!name || name.trim().length === 0) {
      errors.push('Name is required');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim().length === 0) {
      errors.push('Email address is required');
    } else if (!emailRegex.test(email.trim())) {
      errors.push('Please enter a valid email address');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Handle user identification form submission
   * @param {Event} event - Form submission event
   */
  handleUserIdentificationSubmit(event) {
    if (this.userIdentificationSubmitting) {
      return;
    }

    // Clear existing errors
    this.clearFormErrors();

    // Get form values
    const name = document.getElementById('chat-user-name').value.trim();
    const email = document.getElementById('chat-user-email').value.trim();
    const phone = document.getElementById('chat-user-phone').value.trim();

    // Validate form
    const validation = this.validateUserIdentificationForm(name, email);
    if (!validation.valid) {
      this.showFormError(validation.errors[0]);
      return;
    }

    // Submit identification
    this.submitUserIdentification(name, email, phone);
  }

  /**
   * Submit user identification and start conversation
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} phone - User's phone (optional)
   */
  async submitUserIdentification(name, email, phone) {
    if (this.userIdentificationSubmitting) {
      return;
    }

    this.userIdentificationSubmitting = true;
    this.setFormLoadingState(true);

    try {
      // Store user identification
      this.storeUserIdentification(name, email, phone);
      this.hasUserIdentification = true;

      // Send conversation start marker
      await this.sendConversationStartMarker(name, email, phone);

      // Transition to chat interface
      this.transitionToChatInterface(name);

    } catch (error) {
      console.error('Failed to submit user identification:', error);
      this.showFormError('Unable to start chat. Please try again.');
      this.userIdentificationSubmitting = false;
      this.setFormLoadingState(false);
    }
  }

  /**
   * Set form loading state
   * @param {boolean} loading - Whether form is in loading state
   */
  setFormLoadingState(loading) {
    const submitButton = document.getElementById('chat-start-button');
    const buttonText = submitButton?.querySelector('.button-text');
    const loadingText = submitButton?.querySelector('.button-loading');
    const nameInput = document.getElementById('chat-user-name');
    const emailInput = document.getElementById('chat-user-email');
    const phoneInput = document.getElementById('chat-user-phone');

    if (loading) {
      submitButton?.setAttribute('disabled', 'true');
      nameInput?.setAttribute('disabled', 'true');
      emailInput?.setAttribute('disabled', 'true');
      phoneInput?.setAttribute('disabled', 'true');
      if (buttonText) buttonText.style.display = 'none';
      if (loadingText) loadingText.style.display = 'inline-flex';
    } else {
      submitButton?.removeAttribute('disabled');
      nameInput?.removeAttribute('disabled');
      emailInput?.removeAttribute('disabled');
      phoneInput?.removeAttribute('disabled');
      if (buttonText) buttonText.style.display = 'inline';
      if (loadingText) loadingText.style.display = 'none';
    }
  }

  /**
   * Show form error message
   * @param {string} message - Error message to display
   */
  showFormError(message) {
    const errorContainer = document.getElementById('chat-form-error');
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = 'block';
    }
  }

  /**
   * Clear form error messages
   */
  clearFormErrors() {
    const errorContainer = document.getElementById('chat-form-error');
    const nameInput = document.getElementById('chat-user-name');
    const emailInput = document.getElementById('chat-user-email');
    const phoneInput = document.getElementById('chat-user-phone');

    if (errorContainer) {
      errorContainer.textContent = '';
      errorContainer.style.display = 'none';
    }

    // Remove error styling from inputs
    nameInput?.classList.remove('error');
    emailInput?.classList.remove('error');
    phoneInput?.classList.remove('error');
  }

  /**
   * Send conversation start marker with user identification
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} phone - User's phone (optional)
   * @returns {Promise} Conversation start request promise
   */
  async sendConversationStartMarker(name, email, phone) {
    // For local testing, skip the API call and just log
    if (window.location.protocol === 'file:') {
      console.log('Mock: Conversation started for', name, email);
      return Promise.resolve({});
    }

    const startData = {
      type: 'conversation_start',
      conversation_id: this.getConversationId(),
      user_name: name,
      user_email: email,
      user_phone: phone || '',
      timestamp: new Date().toISOString(),
      source: 'ClinicIQ Solutions Chat'
    };

    const response = await fetch(this.functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(startData)
    });

    if (!response.ok) {
      throw new Error(`Failed to send conversation start marker: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Transition from identification form to chat interface
   * @param {string} userName - User's name for personalized greeting
   */
  transitionToChatInterface(userName) {
    // Hide identification form
    const identificationForm = document.getElementById('chat-identification-form');
    if (identificationForm) {
      identificationForm.style.display = 'none';
    }

    // Show personalized welcome message
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
      welcomeMessage.style.display = 'block';
      // Update welcome message content to include user's name
      const messageContent = welcomeMessage.querySelector('.message-content');
      if (messageContent) {
        messageContent.innerHTML = `
          <p>Welcome to ClinicIQ Solutions, ${userName}! 👋</p>
          <p>How can I help you today? I can assist with service questions, consultations, or any information about our business solutions.</p>
        `;
      }
    }

    // Show message input container
    const inputContainer = document.querySelector('.chat-input-container');
    if (inputContainer) {
      inputContainer.style.display = 'block';
    }

    // Reset form state
    this.userIdentificationSubmitting = false;
    this.setFormLoadingState(false);

    // Clear form fields
    document.getElementById('chat-user-name').value = '';
    document.getElementById('chat-user-email').value = '';
    document.getElementById('chat-user-phone').value = '';
    this.clearFormErrors();

    // Focus on message input
    setTimeout(() => {
      this.chatInput?.focus();
    }, 300);

    // Update conversation UI state
    this.updateConversationUI();
  }

  setupEventListeners() {
    // Toggle listener is handled in setupLazyInit() to support lazy initialization
    // Do not add duplicate toggle listener here

    // Close chat
    this.chatClose?.addEventListener('click', () => {
      this.closeChat();
    });

    // End conversation button
    const endConversationBtn = document.getElementById('chat-end-conversation');
    endConversationBtn?.addEventListener('click', () => {
      this.endConversation();
    });

    // Start new conversation button
    const startNewChatBtn = document.getElementById('start-new-chat-btn');
    startNewChatBtn?.addEventListener('click', () => {
      this.startNewConversation();
    });

    // Handle identification form submission
    const identificationForm = document.getElementById('chat-identification-form-element');
    identificationForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleUserIdentificationSubmit(e);
    });

    // Handle chat form submission (only when user is identified)
    this.chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    // Note: Removed close-on-outside-click to prevent accidental closure
    // Users must explicitly click the close button or press Escape to close chat

    // Auto-resize input
    this.chatInput?.addEventListener('input', () => {
      this.autoResizeInput();
    });
  }

  setupKeyboardSupport() {
    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape to close chat
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
        this.chatToggle?.focus();
      }
    });

    // Enter to send message (but not shift+enter)
    this.chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    // Ensure chatbot is initialized before toggling
    if (!this.initialized) {
      this.init();
      this.initialized = true;
    }

    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    this.isOpen = true;
    this.chatContainer?.classList.add('active');
    this.chatToggle?.setAttribute('aria-expanded', 'true');

    // Show appropriate interface based on user identification status
    if (this.hasUserIdentification) {
      this.showChatInterface();
    } else {
      this.showIdentificationForm();
    }

    // ✅ CRITICAL: Update conversation UI to show/hide end button
    this.updateConversationUI();

    // Update toggle button icon (optional visual feedback)
    this.updateToggleIcon();
  }

  /**
   * Show identification form interface
   */
  showIdentificationForm() {
    const identificationForm = document.getElementById('chat-identification-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const inputContainer = document.querySelector('.chat-input-container');

    // Show identification form
    if (identificationForm) {
      identificationForm.style.display = 'flex';
    }

    // Hide welcome message
    if (welcomeMessage) {
      welcomeMessage.style.display = 'none';
    }

    // Hide input container
    if (inputContainer) {
      inputContainer.style.display = 'none';
    }

    // Focus on name input
    setTimeout(() => {
      document.getElementById('chat-user-name')?.focus();
    }, 300);
  }

  /**
   * Show chat interface (when user is identified)
   */
  showChatInterface() {
    const identificationForm = document.getElementById('chat-identification-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const inputContainer = document.querySelector('.chat-input-container');

    // Hide identification form
    if (identificationForm) {
      identificationForm.style.display = 'none';
    }

    // ✅ CRITICAL: Do NOT show welcome message here - only show input
    // Welcome message should only appear after starting a NEW conversation
    if (welcomeMessage) {
      welcomeMessage.style.display = 'none';
    }

    // Show input container
    if (inputContainer) {
      inputContainer.style.display = 'block';
    }

    // Re-enable input if it was disabled from a finished conversation
    this.setChatInputDisabled(false);
    this.clearConversationFinishActions();

    // Focus on message input
    setTimeout(() => {
      this.chatInput?.focus();
    }, 300);
  }

  closeChat() {
    this.isOpen = false;
    this.chatContainer?.classList.remove('active');
    this.chatToggle?.setAttribute('aria-expanded', 'false');
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    // Could add icon rotation or change here if desired
    // Currently using same icon for both states
  }

  async sendMessage() {
    const message = this.chatInput?.value?.trim();
    if (!message || this.isTyping) return;

    // Prevent messages if conversation is ended
    if (this.isConversationEnded) {
      this.addMessage("This conversation has ended. Please start a new conversation to continue.", 'bot');
      this.showConversationFinishActions();
      return;
    }

    // Ensure user is identified before allowing messages
    if (!this.hasUserIdentification) {
      this.showIdentificationForm();
      return;
    }

    // Get user identification
    const userIdentification = this.getUserIdentification();
    if (!userIdentification) {
      this.showIdentificationForm();
      return;
    }

    // Add user message to chat
    this.addMessage(message, 'user');

    // Clear input
    this.chatInput.value = '';
    this.autoResizeInput();

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Get conversation metadata before sending
      const conversationId = this.getConversationId();
      const messageCount = this.getMessageCount();
      const isNewConversation = messageCount === 0;
      const conversationStartedAt = this.getConversationStartTime();

      // ALWAYS try Netlify Function first - this is the primary response source
      const response = await this.sendToNetlifyFunction({
        message: message,
        timestamp: new Date().toISOString(),
        user_id: this.generateUserId(),
        source: 'ClinicIQ Solutions Chat',
        type: 'chat_message',
        // User identification
        user_name: userIdentification.name,
        user_email: userIdentification.email,
        user_phone: userIdentification.phone,
        // Conversation metadata
        conversation_id: conversationId,
        is_new_conversation: isNewConversation,
        message_count: messageCount,
        conversation_started_at: conversationStartedAt
      });

      // Hide typing indicator
      this.hideTypingIndicator();

      if (response.ok) {
        // Increment message count after successful send
        this.incrementMessageCount();

        // Try to parse response from Netlify Function
        try {
          const data = await response.json();
          const parsedResponse = this.normalizeBotResponse(data);
          const conversationStatus = this.extractConversationStatus(data, parsedResponse);

          // Check if conversation is finished (accept common typos)
          if (this.isFinishedStatus(conversationStatus)) {
            if (parsedResponse?.message) {
              this.addMessage(parsedResponse.message, 'bot');
            } else if (typeof data?.message === 'string') {
              this.addMessage(data.message, 'bot');
            }
            this.handleConversationFinished();
            return;
          }

          if (data?.success && parsedResponse?.message) {
            this.addMessage(parsedResponse.message, 'bot');
            return;
          }

          if (parsedResponse?.message) {
            this.addMessage(parsedResponse.message, 'bot');
            return;
          }

          // If response doesn't have expected structure, show fallback
          if (typeof data?.message === 'string') {
            this.addMessage(data.message, 'bot');
            return;
          }
        } catch (parseError) {
          console.warn('Response parsing error:', parseError);
          // Don't throw error for HTTP 200, just use fallback response
          const builtInResponse = this.getBuiltInResponse(message);
          if (builtInResponse) {
            setTimeout(() => {
              this.addMessage(builtInResponse, 'bot');
            }, 500);
            return;
          }
        }

      // If we get here, either API failed or no built-in response available
      // Show fallback message
      const fallbackMessage = "I'm having trouble connecting right now. Please try again later or contact us directly at hello@cliniciqsolutions.com";
      this.addMessage(fallbackMessage, 'bot');
      }

      // If Netlify Function failed or returned empty, throw error to trigger fallback
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    } catch (error) {
      console.error('Chat function error:', error);
      this.hideTypingIndicator();
      this.addMessage("I'm having trouble connecting right now. Please try again later or contact us directly at hello@cliniciqsolutions.com", 'bot');
    }
  }

  /**
   * Normalize various bot response payloads into a consistent shape
   * Supports array payloads like: [{ output: { output: '...', status: 'in_progress' } }]
   */
  normalizeBotResponse(data) {
    const extractMessage = (value) => {
      if (!value) return null;
      if (typeof value === 'string') return value;

      if (Array.isArray(value)) {
        for (const item of value) {
          // Handle array responses where each item has an output object
          const candidate = extractMessage(item?.output ?? item);
          if (candidate) return candidate;
        }
        return null;
      }

      if (typeof value === 'object') {
        if (typeof value.output === 'string') {
          return value.output;
        }

        if (value.output && typeof value.output === 'object') {
          const nestedOutput = extractMessage(
            value.output.output ??
            value.output.message ??
            value.output.text ??
            value.output
          );
          if (nestedOutput) return nestedOutput;
        }

        if (value.message) return extractMessage(value.message);
        if (value.response) return extractMessage(value.response);
        if (value.text) return extractMessage(value.text);
        if (value.reply) return extractMessage(value.reply);
      }

      return null;
    };

    const status =
      (Array.isArray(data) && data[0]?.output?.status) ||
      (Array.isArray(data) && data[0]?.status) ||
      data?.conversation_status ||
      data?.status ||
      (typeof data === 'object' && data?.output?.status);

    const message = extractMessage(data);

    if (message || status) {
      return { message, status };
    }

    return null;
  }

  addMessage(content, sender) {
    if (!this.chatMessages) return;

    // Ensure content is a string
    const messageText = typeof content === 'string' ? content : String(content || '');

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Handle multi-line messages
    const paragraphs = messageText.split('\n').filter(p => p.trim());
    paragraphs.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      messageContent.appendChild(p);
    });

    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = this.formatTime(new Date());

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);

    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();

    // Announce new message for screen readers
    this.announceMessage(content, sender);
  }

  showTypingIndicator() {
    if (this.isTyping) return;

    this.isTyping = true;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-typing';
    typingDiv.id = 'typing-indicator';

    typingDiv.innerHTML = `
      <span>ClinicIQ Assistant is typing</span>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;

    this.chatMessages?.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async sendToNetlifyFunction(data) {
    // Add timeout to prevent hanging requests - 30 seconds for function processing
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(this.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(data),
        signal: timeoutController.signal
      });

      clearTimeout(timeoutId);
      return response;

    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }

      throw error;
    }
  }

  scrollToBottom() {
    if (this.chatMessages) {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
  }

  autoResizeInput() {
    if (!this.chatInput) return;

    // Reset height to calculate new height
    this.chatInput.style.height = 'auto';

    // Set new height based on scroll height (max 3 lines)
    const maxHeight = 72; // approximately 3 lines
    const newHeight = Math.min(this.chatInput.scrollHeight, maxHeight);
    this.chatInput.style.height = newHeight + 'px';
  }

  formatTime(date) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  setChatInputDisabled(disabled) {
    const inputContainer = document.querySelector('.chat-input-container');
    const sendBtn = this.chatForm?.querySelector('.chat-send');

    if (disabled) {
      this.chatInput?.setAttribute('disabled', 'true');
      sendBtn?.setAttribute('disabled', 'true');
      inputContainer?.classList.add('disabled');
    } else {
      this.chatInput?.removeAttribute('disabled');
      sendBtn?.removeAttribute('disabled');
      inputContainer?.classList.remove('disabled');
    }
  }

  isFinishedStatus(status) {
    if (!status) return false;
    const normalized = String(status).trim().toLowerCase();
    // Accept the intended status plus the previous typo
    return normalized === 'finished' || normalized === 'finised';
  }

  extractConversationStatus(rawData, parsedResponse) {
    // Prefer parsed status first
    if (parsedResponse?.status) return parsedResponse.status;

    // Direct fields
    if (rawData?.conversation_status) return rawData.conversation_status;
    if (rawData?.status) return rawData.status;

    const visited = new Set();

    const walk = (value) => {
      if (!value || visited.has(value)) return null;
      if (typeof value !== 'object') return null;

      visited.add(value);

      if (Array.isArray(value)) {
        for (const item of value) {
          const found = walk(item);
          if (found) return found;
        }
        return null;
      }

      // Objects: look for status-like keys first
      for (const key of ['conversation_status', 'status']) {
        if (typeof value[key] === 'string' || typeof value[key] === 'number') {
          return value[key];
        }
      }

      // Explore common nesting locations
      const nestedKeys = ['output', 'data', 'result', 'response', 'message'];
      for (const key of nestedKeys) {
        const nested = value[key];
        if (nested) {
          const found = walk(nested);
          if (found) return found;
        }
      }

      // Fallback: scan any object values
      for (const val of Object.values(value)) {
        const found = walk(val);
        if (found) return found;
      }

      return null;
    };

    return walk(rawData);
  }

  handleConversationFinished() {
    this.finishStatusDetected = true;
    this.hideTypingIndicator();
    this.showConversationFinishActions();
    this.updateConversationUI();
  }

  showConversationFinishActions() {
    if (!this.chatMessages) return;

    let finishActions = document.getElementById('chat-finish-actions');
    if (!finishActions) {
      finishActions = document.createElement('div');
      finishActions.id = 'chat-finish-actions';
      finishActions.className = 'chat-message bot-message';

      const endBtn = document.createElement('button');
      endBtn.id = 'chat-finish-end-btn';
      endBtn.type = 'button';
      endBtn.className = 'btn btn-primary start-new-chat-btn';
      endBtn.textContent = 'End Chat';
      endBtn.addEventListener('click', () => this.endConversation());

      finishActions.appendChild(endBtn);
      this.chatMessages.appendChild(finishActions);
    } else {
      // Ensure the button is labeled correctly even on repeated finished statuses
      const endBtn = finishActions.querySelector('#chat-finish-end-btn');
      if (endBtn) {
        endBtn.textContent = 'End Chat';
      }
    }

    finishActions.style.display = 'flex';
    this.scrollToBottom();
  }

  clearConversationFinishActions() {
    const finishActions = document.getElementById('chat-finish-actions');
    if (finishActions) {
      finishActions.style.display = 'none';
    }
    this.finishStatusDetected = false;
  }

  generateUserId() {
    // Simple user ID generation for session tracking
    if (!localStorage.getItem('cliniciq_chat_user_id')) {
      const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cliniciq_chat_user_id', userId);
    }
    return localStorage.getItem('cliniciq_chat_user_id');
  }

  getBuiltInResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Hours and location
    if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
      return "We're open Monday-Friday 6:30 AM - 9:00 PM, and Saturday-Sunday 7:00 AM - 10:00 PM. We're located at 123 Garden Street in the Downtown District.";
    }

    // Service inquiries
    if (lowerMessage.includes('service') || lowerMessage.includes('automation') || lowerMessage.includes('website') || lowerMessage.includes('package')) {
      return "We offer comprehensive business solutions including process automation, website development, and custom software. Check out our service packages above to find the perfect fit for your business needs!";
    }

    // Consultations
    if (lowerMessage.includes('consultation') || lowerMessage.includes('meeting') || lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
      return "You can schedule a free consultation by calling us at (512) 555-0123 or using our contact form. We'd love to discuss how we can help streamline your business operations!";
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address')) {
      return "You can reach us at (512) 555-0123 or hello@cliniciqsolutions.com. We're located at 456 Business Plaza, Tech District, Austin, TX. Feel free to use our contact form as well!";
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('$')) {
      return "Our packages range from $499 for basic automation to $7,999 for custom development. We also offer hourly consulting from $99-$150/hr. Check our packages section above for detailed pricing!";
    }

    // Remote work or support
    if (lowerMessage.includes('remote') || lowerMessage.includes('support') || lowerMessage.includes('work') || lowerMessage.includes('training')) {
      return "Yes! We provide comprehensive remote support and training for all our solutions. Our team is available during business hours to ensure your systems run smoothly.";
    }

    // Technology and approach
    if (lowerMessage.includes('technology') || lowerMessage.includes('how') || lowerMessage.includes('approach') || lowerMessage.includes('process')) {
      return "We use cutting-edge technology and proven methodologies to deliver reliable solutions. Our approach focuses on understanding your unique business needs and implementing scalable, efficient systems that grow with your company.";
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to ClinicIQ Solutions. I'm here to help with any questions about our services, pricing, consultations, or how we can help streamline your business. What can I help you with today?";
    }

    // Return null if no built-in response found
    return null;
  }

  announceMessage(content, sender) {
    // Create temporary element for screen reader announcement
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';

    const senderLabel = sender === 'bot' ? 'ClinicIQ Assistant says' : 'You said';
    announcer.textContent = `${senderLabel}: ${content}`;

    document.body.appendChild(announcer);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * End the current conversation
   */
  endConversation() {
    if (!this.hasUserIdentification) return;

    // Prevent additional input while ending
    this.setChatInputDisabled(true);

    // Get conversation data for final record
    const conversationId = this.getConversationId();
    const messageCount = this.getMessageCount();
    const conversationStartedAt = this.getConversationStartTime();
    const conversationEndedAt = new Date().toISOString();
    const userIdentification = this.getUserIdentification();

    // Send conversation end event to Netlify Function
    this.sendConversationEndEvent({
      conversation_id: conversationId,
      message_count: messageCount,
      conversation_started_at: conversationStartedAt,
      conversation_ended_at: conversationEndedAt,
      user_id: this.generateUserId(),
      user_name: userIdentification.name,
      user_email: userIdentification.email,
      user_phone: userIdentification.phone,
      source: 'ClinicIQ Solutions Chat',
      type: 'conversation_end'
    });

    // Clear conversation state
    this.clearConversationState();
    this.clearConversationFinishActions();

    // Hide end conversation button
    const endConversationBtn = document.getElementById('chat-end-conversation');
    if (endConversationBtn) {
      endConversationBtn.style.display = 'none';
    }

    // Hide input container
    const inputContainer = document.querySelector('.chat-input-container');
    if (inputContainer) {
      inputContainer.style.display = 'none';
    }

    // Hide all other messages
    const allMessages = this.chatMessages?.querySelectorAll('.chat-message');
    allMessages?.forEach(msg => msg.style.display = 'none');

    // Show conversation ended message
    const endedMessage = document.getElementById('conversation-ended-message');
    if (endedMessage) {
      endedMessage.style.display = 'block';
      // Scroll to the bottom to show the message
      this.scrollToBottom();
    }

    // Mark conversation as ended
    this.hasUserIdentification = false;
    this.isConversationEnded = true;

    // Persist conversation ended state
    this.setConversationEnded(true);
  }

  /**
   * Start a new conversation
   */
  startNewConversation() {
    // Clear any remaining conversation state
    this.clearConversationState();
    this.hasUserIdentification = false;
    this.setChatInputDisabled(false);
    this.clearConversationFinishActions();
    this.finishStatusDetected = false;

    // Hide conversation ended message
    const endedMessage = document.getElementById('conversation-ended-message');
    if (endedMessage) {
      endedMessage.style.display = 'none';
    }

    // Hide all other messages
    const allMessages = this.chatMessages?.querySelectorAll('.chat-message');
    allMessages?.forEach(msg => msg.style.display = 'none');

    // Reset conversation ended flag
    this.isConversationEnded = false;

    // Clear conversation ended state
    this.setConversationEnded(false);

    // Show identification form for fresh start
    this.showIdentificationForm();
  }

  /**
   * Send conversation end event to Netlify Function
   */
  async sendConversationEndEvent(conversationData) {
    try {
      // For local testing, skip the API call and just log
      if (window.location.protocol === 'file:') {
        console.log('Mock: Conversation ended', conversationData);
        return;
      }

      const response = await fetch(this.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversationData)
      });

      if (!response.ok) {
        console.warn('Failed to send conversation end event:', response.status);
      }
    } catch (error) {
      console.warn('Error sending conversation end event:', error);
    }
  }

  /**
   * Update UI for conversation state
   */
  updateConversationUI() {
    const endConversationBtn = document.getElementById('chat-end-conversation');

    if (this.hasUserIdentification && !this.isConversationEnded) {
      // Show end conversation button when user is identified and conversation is active
      if (endConversationBtn) {
        endConversationBtn.style.display = 'flex';
      }
    } else {
      // Hide end conversation button when conversation is ended or user is not identified
      if (endConversationBtn) {
        endConversationBtn.style.display = 'none';
      }
    }

    // Reflect finished state on input controls
    this.setChatInputDisabled(this.isConversationEnded);

    if (this.isConversationEnded) {
      this.showConversationFinishActions();
    }
  }

  /**
   * Override showWelcomeMessage to update conversation UI
   */
  showWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
      welcomeMessage.style.display = 'block';
    }

    // Update conversation UI state
    this.updateConversationUI();
  }

  /**
   * Override showIdentificationForm to update conversation UI
   */
  showIdentificationForm() {
    const identificationForm = document.getElementById('chat-identification-form');
    if (identificationForm) {
      identificationForm.style.display = 'flex';
    }

    // Hide input container when showing identification form
    const inputContainer = document.querySelector('.chat-input-container');
    if (inputContainer) {
      inputContainer.style.display = 'none';
    }

    // Hide welcome message to avoid duplicate greetings
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
      welcomeMessage.style.display = 'none';
    }

    // Update conversation UI state
    this.updateConversationUI();
  }
}

export default ChatBot;
