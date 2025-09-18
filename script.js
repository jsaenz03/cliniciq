/**
 * Verdant Café Website - Main JavaScript
 * Handles mobile navigation, smooth scrolling, menu filtering,
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
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.menuItems = document.querySelectorAll('.menu-item');

    this.init();
  }

  init() {
    this.setupFiltering();
  }

  /**
   * Setup menu category filtering
   */
  setupFiltering() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter menu items
        this.filterItems(filter);

        // Announce filter change for screen readers
        this.announceFilterChange(filter);
      });
    });
  }

  /**
   * Filter menu items based on category
   */
  filterItems(filter) {
    this.menuItems.forEach(item => {
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
    this.contactForm = document.getElementById('contact-form');
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

        // Show loading state
        const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Subscribing...';

        try {
          // Simulate API call (replace with actual endpoint)
          await this.simulateAPICall(1000);

          showFormMessage(this.newsletterMessage, 'Thank you for subscribing! Check your email for confirmation.', 'success');
          this.newsletterForm.reset();

        } catch (error) {
          console.error('Newsletter subscription error:', error);
          showFormMessage(this.newsletterMessage, 'Something went wrong. Please try again.', 'error');

        } finally {
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
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

        // Show loading state
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Sending...';

        try {
          // Send to webhook
          const response = await this.sendToWebhook({
            name,
            email,
            phone: phone || '',
            message,
            timestamp: new Date().toISOString(),
            source: 'Gong Café Contact Form'
          });

          if (response.ok) {
            showFormMessage(this.contactMessage, 'Thank you for your message! We\'ll get back to you soon.', 'success');
            this.contactForm.reset();
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

        } catch (error) {
          console.error('Contact form error:', error);
          showFormMessage(this.contactMessage, 'Something went wrong. Please try again later.', 'error');

        } finally {
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
    }
  }

  /**
   * Send form data to webhook
   */
  async sendToWebhook(data) {
    const webhookUrl = 'https://dermalink.xyz/webhook-test/cafegreenemail';

    const response = await fetch(webhookUrl, {
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
    this.setupServiceWorker();
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
   * Setup service worker for caching (optional)
   */
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registered: ', registration);
          })
          .catch(registrationError => {
            console.log('ServiceWorker registration failed: ', registrationError);
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

// ===== MAIN INITIALIZATION =====

class VerdantCafe {
  constructor() {
    this.navigation = null;
    this.menuFilter = null;
    this.formHandler = null;
    this.scrollAnimations = null;
    this.performanceOptimizations = null;
    this.accessibilityEnhancements = null;

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

      console.log('Verdant Café website initialized successfully');

    } catch (error) {
      console.error('Error initializing Verdant Café website:', error);
    }
  }
}

// Initialize the website
const verdantCafe = new VerdantCafe();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VerdantCafe };
}