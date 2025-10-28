/**
 * ClinicIQ Solutions Website - Main JavaScript
 * Handles mobile navigation, smooth scrolling, service filtering,
 * form submissions, and scroll animations
 */

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit the rate of function execution
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  ) || (
    rect.top < windowHeight &&
    rect.bottom >= 0 &&
    rect.left < windowWidth &&
    rect.right >= 0
  );
}

/**
 * Animate element with fade in effect
 */
function animateOnScroll(element, animationClass = 'fade-in-up') {
  if (isInViewport(element) && !element.classList.contains(animationClass)) {
    element.classList.add(animationClass);
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show form message
 */
function showFormMessage(messageElement, message, type = 'success') {
  messageElement.textContent = message;
  messageElement.className = `form-message ${type}`;

  // Auto hide after 5 seconds
  setTimeout(() => {
    messageElement.className = 'form-message';
  }, 5000);
}

// ===== NAVIGATION FUNCTIONALITY =====

class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navMenu = document.getElementById('nav-menu');
    this.hamburger = document.getElementById('hamburger');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    this.setupMobileToggle();
    this.setupSmoothScrolling();
    this.setupScrollEffects();
    this.setupActiveLinks();
  }

  /**
   * Setup mobile navigation toggle
   */
  setupMobileToggle() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener('click', () => {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');

        // Update ARIA attributes for accessibility
        const isOpen = this.navMenu.classList.contains('active');
        this.hamburger.setAttribute('aria-expanded', isOpen.toString());

        // Trap focus when menu is open
        if (isOpen) {
          this.trapFocus();
        }
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navbar.contains(e.target)) {
          this.closeMobileMenu();
        }
      });

      // Close mobile menu on window resize
      window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
          this.closeMobileMenu();
        }
      }, 250));
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.navMenu?.classList.remove('active');
    this.hamburger?.classList.remove('active');
    this.hamburger?.setAttribute('aria-expanded', 'false');
  }

  /**
   * Trap focus within mobile menu for accessibility
   */
  trapFocus() {
    const focusableElements = this.navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    this.navMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      } else if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.hamburger?.focus();
      }
    });
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            this.closeMobileMenu();

            // Calculate offset for fixed navbar
            const navbarHeight = this.navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Update URL without triggering scroll
            history.pushState(null, null, href);

            // Update active link
            this.updateActiveLink(link);
          }
        }
      });
    });

    // Handle direct hash links (page refresh with hash)
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const navbarHeight = this.navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }

  /**
   * Setup scroll effects (navbar background, active links)
   */
  setupScrollEffects() {
    const scrollHandler = debounce(() => {
      // Add scrolled class to navbar
      if (window.scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Update active navigation link based on scroll position
      this.updateActiveNavOnScroll();
    }, 10);

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Setup active link highlighting
   */
  setupActiveLinks() {
    // Set initial active link
    const currentHash = window.location.hash || '#home';
    const currentLink = document.querySelector(`a[href="${currentHash}"]`);
    if (currentLink) {
      this.updateActiveLink(currentLink);
    }
  }

  /**
   * Update active navigation link based on scroll position
   */
  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = this.navbar.offsetHeight;
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
      if (activeLink) {
        this.updateActiveLink(activeLink);
      }
    }
  }

  /**
   * Update active link styling
   */
  updateActiveLink(activeLink) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
}

// ===== MENU FILTERING =====

class MenuFilter {
  constructor() {
    this.setupFiltering();
  }

  /**
   * Setup menu category filtering for all filter sections
   */
  setupFiltering() {
    // Handle each filter section independently
    const filterSections = document.querySelectorAll('.menu-filter');

    filterSections.forEach(section => {
      const filterButtons = section.querySelectorAll('.filter-btn');
      // Look for both menu items and download categories
      const menuItems = document.querySelectorAll('.menu-item, .portfolio-item, .download-category');

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');

          // Update active button within this section
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          // Filter menu items within this section
          this.filterItems(menuItems, filter);

          // Announce filter change for screen readers
          this.announceFilterChange(filter);
        });
      });
    });
  }

  /**
   * Filter menu items based on category
   */
  filterItems(menuItems, filter) {
    menuItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.classList.add('hidden');
        item.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Announce filter change for accessibility
   */
  announceFilterChange(filter) {
    const announcement = filter === 'all'
      ? 'Showing all menu items'
      : `Showing ${filter} items`;

    // Create temporary element for screen reader announcement
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;

    document.body.appendChild(announcer);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }
}

// ===== FORM HANDLING =====

class FormHandler {
  constructor() {
    this.newsletterForm = document.getElementById('newsletter-form');
    this.contactForm = document.getElementById('contact-form-element');
    this.newsletterMessage = document.getElementById('newsletter-message');
    this.contactMessage = document.getElementById('contact-message');

    this.init();
  }

  init() {
    this.setupNewsletterForm();
    this.setupContactForm();
  }

  /**
   * Setup newsletter form submission
   */
  setupNewsletterForm() {
    if (this.newsletterForm && this.newsletterMessage) {
      this.newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(this.newsletterForm);
        const email = formData.get('email');

        // Validate email
        if (!email || !isValidEmail(email)) {
          showFormMessage(this.newsletterMessage, 'Please enter a valid email address.', 'error');
          return;
        }

        // Show immediate success (optimistic UI)
        showFormMessage(this.newsletterMessage, 'Thank you for subscribing! Check your email for confirmation.', 'success');
        this.newsletterForm.reset();

        // Send to webhook in background (fire-and-forget)
        this.sendToNewsletterWebhook({
          email,
          timestamp: new Date().toISOString(),
          source: 'ClinicIQ Solutions Newsletter'
        }).catch(error => {
          // Log error silently - user already sees success message
          console.error('Newsletter subscription error:', error);
        });
      });
    }
  }

  /**
   * Setup contact form submission
   */
  setupContactForm() {
    if (this.contactForm && this.contactMessage) {
      this.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(this.contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        // Validate required fields
        if (!name || !email || !message) {
          showFormMessage(this.contactMessage, 'Please fill in all required fields.', 'error');
          return;
        }

        if (!isValidEmail(email)) {
          showFormMessage(this.contactMessage, 'Please enter a valid email address.', 'error');
          return;
        }

        // Show immediate success (optimistic UI)
        showFormMessage(this.contactMessage, 'Thank you for your message! We\'ll get back to you soon.', 'success');
        this.contactForm.reset();

        // Send to webhook in background (fire-and-forget)
        this.sendToWebhook({
          name,
          email,
          phone: phone || '',
          message,
          timestamp: new Date().toISOString(),
          source: 'ClinicIQ Solutions Contact Form'
        }).catch(error => {
          // Log error silently - user already sees success message
          console.error('Contact form error:', error);
        });
      });
    }
  }

  /**
   * Send form data to Netlify Function (which forwards to secure webhook)
   */
  async sendToWebhook(data) {
    const functionUrl = '/.netlify/functions/contact-form';

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  /**
   * Send newsletter data to Netlify Function (which forwards to secure webhook)
   */
  async sendToNewsletterWebhook(data) {
    const functionUrl = '/.netlify/functions/newsletter';

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  /**
   * Simulate API call for demonstration
   */
  simulateAPICall(delay = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional failures for testing
        if (Math.random() > 0.9) {
          reject(new Error('Simulated network error'));
        } else {
          resolve({ success: true });
        }
      }, delay);
    });
  }
}

// ===== SCROLL ANIMATIONS =====

class ScrollAnimations {
  constructor() {
    this.animatedElements = [];
    this.init();
  }

  init() {
    this.setupAnimatedElements();
    this.setupScrollHandler();
    this.checkInitialVisibility();
  }

  /**
   * Setup elements to be animated on scroll
   */
  setupAnimatedElements() {
    // Add animation classes to different sections
    const elementSelectors = [
      { selector: '.specialty-card', animation: 'fade-in-up', stagger: 200 },
      { selector: '.menu-item', animation: 'fade-in-up', stagger: 100 },
      { selector: '.hero-content', animation: 'fade-in-left' },
      { selector: '.hero-image', animation: 'fade-in-right' },
      { selector: '.about-text', animation: 'fade-in-left' },
      { selector: '.about-image', animation: 'fade-in-right' },
      { selector: '.contact-info', animation: 'fade-in-left' },
      { selector: '.contact-form', animation: 'fade-in-right' }
    ];

    elementSelectors.forEach(({ selector, animation, stagger }) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element, index) => {
        this.animatedElements.push({
          element,
          animation,
          delay: stagger ? index * stagger : 0,
          animated: false
        });

        // Initially hide elements that will be animated
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(animation);
      });
    });
  }

  /**
   * Get initial transform based on animation type
   */
  getInitialTransform(animation) {
    switch (animation) {
      case 'fade-in-up':
        return 'translateY(30px)';
      case 'fade-in-left':
        return 'translateX(-30px)';
      case 'fade-in-right':
        return 'translateX(30px)';
      default:
        return 'translateY(30px)';
    }
  }

  /**
   * Setup scroll event handler
   */
  setupScrollHandler() {
    const scrollHandler = debounce(() => {
      this.checkVisibilityAndAnimate();
    }, 50);

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Check initial visibility on page load
   */
  checkInitialVisibility() {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
      this.checkVisibilityAndAnimate();
    }, 100);
  }

  /**
   * Check element visibility and trigger animations
   */
  checkVisibilityAndAnimate() {
    this.animatedElements.forEach(item => {
      if (!item.animated && isInViewport(item.element)) {
        setTimeout(() => {
          this.animateElement(item);
        }, item.delay);
        item.animated = true;
      }
    });
  }

  /**
   * Animate individual element
   */
  animateElement(item) {
    const { element, animation } = item;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Just show the element without animation
      element.style.opacity = '1';
      element.style.transform = 'none';
    } else {
      // Animate the element
      element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.classList.add(animation);
    }
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

class PerformanceOptimizations {
  constructor() {
    this.init();
  }

  init() {
    this.setupImageLazyLoading();
    this.setupPreloadCriticalResources();
    this.unregisterServiceWorker();
  }

  /**
   * Setup lazy loading for images
   */
  setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Preload critical resources
   */
  setupPreloadCriticalResources() {
    // Preload hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && heroImage.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }
  }

  /**
   * Unregister service worker - relying on Netlify CDN for caching
   */
  unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister().then(success => {
            if (success) {
              console.log('ServiceWorker unregistered successfully');
            }
          });
        });
      });
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.setupSkipLinks();
    this.setupKeyboardNavigation();
    this.setupAriaLiveRegions();
    this.setupFocusManagement();
  }

  /**
   * Setup skip links for keyboard navigation
   */
  setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link';
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID if not present
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }
  }

  /**
   * Setup enhanced keyboard navigation
   */
  setupKeyboardNavigation() {
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');

        if (navMenu?.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger?.classList.remove('active');
          hamburger?.setAttribute('aria-expanded', 'false');
          hamburger?.focus();
        }
      }
    });
  }

  /**
   * Setup ARIA live regions for dynamic content
   */
  setupAriaLiveRegions() {
    // Create a live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  /**
   * Setup focus management for better accessibility
   */
  setupFocusManagement() {
    // Improve focus visibility
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid var(--secondary-gold, #C4A661);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);

    // Manage focus for form submissions
    document.addEventListener('submit', (e) => {
      setTimeout(() => {
        const firstError = e.target.querySelector('.form-message.error');
        if (firstError) {
          firstError.focus();
        }
      }, 100);
    });
  }
}

// ===== CHAT BOT FUNCTIONALITY =====

class ChatBot {
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

    this.init();
  }

  init() {
    if (!this.chatWidget) return;

    // Initialize conversation state
    this.initializeConversationState();

    // Set up event listeners
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
    } catch (error) {
      console.warn('sessionStorage unavailable for clearing:', error);
      // Clear fallback variables
      this._fallbackConversationId = null;
      this._fallbackMessageCount = 0;
      this._fallbackStartTime = null;
    }
  }

  /**
   * Initialize conversation state on chatbot creation
   */
  initializeConversationState() {
    // Get or create conversation ID (this will initialize if needed)
    this.getConversationId();

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

    const endData = {
      conversation_id: conversationId,
      type: 'conversation_end',
      total_messages: messageCount,
      conversation_duration: duration,
      ended_at: new Date().toISOString(),
      source: 'ClinicIQ Solutions Chat'
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

  setupEventListeners() {
    // Toggle chat on button click
    this.chatToggle?.addEventListener('click', () => {
      this.toggleChat();
    });

    // Close chat
    this.chatClose?.addEventListener('click', () => {
      this.closeChat();
    });

    // Handle form submission
    this.chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.chatWidget.contains(e.target)) {
        this.closeChat();
      }
    });

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

    // Focus on input
    setTimeout(() => {
      this.chatInput?.focus();
    }, 300);

    // Update toggle button icon (optional visual feedback)
    this.updateToggleIcon();
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

          if (data.success && data.message) {
            this.addMessage(data.message, 'bot');
            return;
          }
        } catch (parseError) {
          console.warn('Response parsing error:', parseError);
        }
      }

      // If Netlify Function failed or returned empty, throw error to trigger fallback
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    } catch (error) {
      console.error('Chat function error:', error);
      this.hideTypingIndicator();

      // FALLBACK: Only use built-in responses when Netlify Function fails
      const builtInResponse = this.getBuiltInResponse(message);
      if (builtInResponse) {
        // Show typing indicator briefly for natural feel
        this.showTypingIndicator();
        setTimeout(() => {
          this.hideTypingIndicator();
          this.addMessage(builtInResponse, 'bot');
        }, 800);
        return;
      }

      // Final fallback if no built-in response available
      let errorMessage = "I'm having trouble connecting right now. Please try again later or contact us directly at hello@cliniciqsolutions.com";

      // Provide more specific error messages
      if (error.message.includes('404')) {
        errorMessage = "Chat service is temporarily unavailable. Please contact us directly at hello@cliniciqsolutions.com or call (02) 4222 0123.";
      } else if (error.message.includes('500')) {
        errorMessage = "Our chat system is experiencing technical difficulties. We apologize for the inconvenience. Please try again in a few minutes.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = "Please check your internet connection and try again. If the problem persists, contact us at hello@cliniciqsolutions.com.";
      }

      this.addMessage(errorMessage, 'bot');
    }
  }

  addMessage(content, sender) {
    if (!this.chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Handle multi-line messages
    const paragraphs = content.split('\n').filter(p => p.trim());
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
}

// ===== TESTIMONIALS CAROUSEL =====

class TestimonialsCarousel {
  constructor() {
    this.carousel = document.querySelector('.testimonials-carousel');
    this.track = document.getElementById('testimonials-track');
    this.prevBtn = document.getElementById('testimonials-prev');
    this.nextBtn = document.getElementById('testimonials-next');
    this.indicators = document.getElementById('testimonials-indicators');

    this.currentSlide = 0;
    this.totalSlides = 0;
    this.slidesPerView = 3;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    if (!this.carousel || !this.track) return;

    this.calculateSlides();
    this.setupEventListeners();
    this.updateCarousel();
    this.startAutoPlay();
    this.setupResponsive();
  }

  calculateSlides() {
    const cards = this.track.querySelectorAll('.testimonial-card');
    this.totalSlides = Math.ceil(cards.length / this.slidesPerView);

    // Update indicators
    this.updateIndicators();
  }

  setupEventListeners() {
    // Navigation buttons
    this.prevBtn?.addEventListener('click', () => {
      this.prevSlide();
    });

    this.nextBtn?.addEventListener('click', () => {
      this.nextSlide();
    });

    // Indicator buttons
    this.indicators?.addEventListener('click', (e) => {
      if (e.target.classList.contains('indicator')) {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
      }
    });

    // Pause auto-play on hover
    this.carousel?.addEventListener('mouseenter', () => {
      this.stopAutoPlay();
    });

    this.carousel?.addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });

    // Keyboard navigation
    this.carousel?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
      }
    });
  }

  setupResponsive() {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      let newSlidesPerView = 3;

      if (width <= 768) {
        newSlidesPerView = 1;
      } else if (width <= 1024) {
        newSlidesPerView = 2;
      }

      if (newSlidesPerView !== this.slidesPerView) {
        this.slidesPerView = newSlidesPerView;
        this.currentSlide = 0;
        this.calculateSlides();
        this.updateCarousel();
      }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Initial call
    handleResize();
  }

  updateIndicators() {
    if (!this.indicators) return;

    // Clear existing indicators
    this.indicators.innerHTML = '';

    // Create new indicators
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
      indicator.dataset.slide = i;
      indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
      this.indicators.appendChild(indicator);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
    this.restartAutoPlay();
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateCarousel();
    this.restartAutoPlay();
  }

  goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < this.totalSlides) {
      this.currentSlide = slideIndex;
      this.updateCarousel();
      this.restartAutoPlay();
    }
  }

  updateCarousel() {
    if (!this.track) return;

    // Calculate transform based on slides per view
    const slideWidth = 100 / this.slidesPerView;
    const transform = -(this.currentSlide * slideWidth);

    this.track.style.transform = `translateX(${transform}%)`;

    // Update button states
    this.updateButtonStates();

    // Update indicators
    this.updateIndicatorStates();
  }

  updateButtonStates() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.totalSlides <= 1;
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.totalSlides <= 1;
    }
  }

  updateIndicatorStates() {
    if (!this.indicators) return;

    const indicators = this.indicators.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  startAutoPlay() {
    if (this.totalSlides <= 1) return;

    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// ===== SCROLL TO TOP FUNCTIONALITY =====

class ScrollToTop {
  constructor() {
    this.button = document.getElementById('scroll-to-top');
    this.init();
  }

  init() {
    if (this.button) {
      this.setupScrollListener();
      this.setupClickHandler();
    }
  }

  /**
   * Setup scroll listener to show/hide button
   */
  setupScrollListener() {
    const handleScroll = debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }

  /**
   * Setup click handler to scroll to top
   */
  setupClickHandler() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== MAIN INITIALIZATION =====

class ClinicIQSolutions {
  constructor() {
    this.navigation = null;
    this.menuFilter = null;
    this.formHandler = null;
    this.scrollAnimations = null;
    this.performanceOptimizations = null;
    this.accessibilityEnhancements = null;
    this.chatBot = null;

    this.init();
  }

  init() {
    // Wait for DOM content to be loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.navigation = new Navigation();
      this.menuFilter = new MenuFilter();
      this.formHandler = new FormHandler();
      this.scrollAnimations = new ScrollAnimations();
      this.performanceOptimizations = new PerformanceOptimizations();
      this.accessibilityEnhancements = new AccessibilityEnhancements();
      this.chatBot = new ChatBot();
      this.testimonialsCarousel = new TestimonialsCarousel();
      this.scrollToTop = new ScrollToTop();

      console.log('ClinicIQ Solutions website initialized successfully');

    } catch (error) {
      console.error('Error initializing ClinicIQ Solutions website:', error);
    }
  }
}

// Initialize the website
const cliniciqSolutions = new ClinicIQSolutions();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ClinicIQSolutions };
}