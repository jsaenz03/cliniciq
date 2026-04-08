/**
 * ClinicIQ Solutions Website - Main JavaScript
 * Handles mobile navigation, smooth scrolling, service filtering,
 * form submissions, and scroll animations
 */

// ===== SCROLL RESTORATION FIX =====
/**
 * Prevents double-scroll on page refresh/restore
 * Browser's automatic scroll restoration conflicts with our hash-based smooth scrolling,
 * causing a visible "jump" or "shift" on page load. Disable it and handle manually.
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ===== FONT LOADING COORDINATION =====
/**
 * Prevents FOUT (Flash of Unstyled Text) and animation flicker
 * by hiding page until fonts are loaded, then revealing all at once
 */
(function coordinateFontLoading() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, skip font loading coordination
  if (prefersReducedMotion) {
    document.documentElement.classList.add('fonts-loaded');
    return;
  }

  // Add loading class immediately to hide page
  document.documentElement.classList.add('fonts-loading');

  // Reveal page when fonts are ready
  const revealPage = () => {
    document.documentElement.classList.remove('fonts-loading');
    document.documentElement.classList.add('fonts-loaded');
  };

  // Wait for fonts to be ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(revealPage);

    // Fallback: if fonts take too long (> 2s), show content anyway
    setTimeout(() => {
      if (document.documentElement.classList.contains('fonts-loading')) {
        revealPage();
      }
    }, 2000);
  } else {
    // Browser doesn't support Font Loading API
    // Use a short timeout as fallback
    setTimeout(revealPage, 100);
  }
})();

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
    // Use requestAnimationFrame to ensure layout is complete before scrolling
    if (window.location.hash) {
      requestAnimationFrame(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const navbarHeight = this.navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto' // Use 'auto' for instant scroll on page load
          });
        }
      });
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

          // Filter menu items within this section with animation
          this.filterItems(menuItems, filter);

          // Announce filter change for screen readers
          this.announceFilterChange(filter);
        });
      });
    });
  }

  /**
   * Filter menu items based on category with smooth animations
   */
  filterItems(menuItems, filter) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    menuItems.forEach((item, index) => {
      const category = item.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;

      if (shouldShow) {
        // Entry animation for showing items
        if (item.classList.contains('hidden')) {
          // Item was hidden, now showing
          item.classList.remove('hidden');
          item.setAttribute('aria-hidden', 'false');

          if (!prefersReducedMotion) {
            // Set initial state for animation
            item.style.transition = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.97)';

            // Trigger reflow
            item.offsetHeight;

            // Animate in with stagger
            setTimeout(() => {
              item.style.transition = 'opacity 0.5s cubic-bezier(0.0, 0.0, 0.2, 1), transform 0.5s cubic-bezier(0.0, 0.0, 0.2, 1)';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, index * 80);
          } else {
            item.style.opacity = '1';
            item.style.transform = 'none';
          }
        }
      } else {
        // Exit animation for hiding items
        if (!item.classList.contains('hidden')) {
          // Item is visible, now hiding
          if (!prefersReducedMotion) {
            // Animate out
            item.style.transition = 'opacity 0.35s cubic-bezier(0.4, 0.0, 1, 1), transform 0.35s cubic-bezier(0.4, 0.0, 1, 1)';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-15px) scale(0.95)';

            // Hide after animation completes
            setTimeout(() => {
              item.classList.add('hidden');
              item.setAttribute('aria-hidden', 'true');
            }, 350);
          } else {
            item.classList.add('hidden');
            item.setAttribute('aria-hidden', 'true');
          }
        }
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

// ===== DOWNLOADS SEARCH =====

class DownloadSearch {
  constructor() {
    this.searchInput = document.getElementById('downloads-search-input');
    this.clearBtn = document.getElementById('search-clear-btn');
    this.resultsCount = document.getElementById('search-results-count');
    this.downloadCategories = document.querySelectorAll('.download-category');
    this.currentFilter = 'all'; // Track current category filter

    this.init();
  }

  init() {
    if (!this.searchInput) return;

    this.setupSearchInput();
    this.setupClearButton();
    this.setupCategoryFilterIntegration();
  }

  /**
   * Setup search input with debounced filtering
   */
  setupSearchInput() {
    // Debounce search to avoid excessive filtering
    let searchTimeout;

    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);

      const searchTerm = e.target.value.trim();

      // Show/hide clear button
      this.clearBtn.style.display = searchTerm ? 'flex' : 'none';

      // Debounce filtering
      searchTimeout = setTimeout(() => {
        this.filterDownloads(searchTerm);
      }, 150);
    });

    // Clear on Escape key
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });
  }

  /**
   * Setup clear button functionality
   */
  setupClearButton() {
    this.clearBtn.addEventListener('click', () => {
      this.clearSearch();
      this.searchInput.focus();
    });
  }

  /**
   * Setup integration with existing category filter buttons
   */
  setupCategoryFilterIntegration() {
    const filterButtons = document.querySelectorAll('.menu-filter .filter-btn');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.currentFilter = button.getAttribute('data-filter');
        // Re-apply search with new category filter
        const searchTerm = this.searchInput.value.trim();
        if (searchTerm) {
          this.filterDownloads(searchTerm);
        }
      });
    });
  }

  /**
   * Filter downloads based on search term
   */
  filterDownloads(searchTerm) {
    if (!searchTerm) {
      // Show all categories (respecting current category filter)
      this.showAllCategories();
      return;
    }

    const term = searchTerm.toLowerCase();
    let matchCount = 0;

    this.downloadCategories.forEach(category => {
      const categoryType = category.getAttribute('data-category');

      // Skip if category doesn't match current filter (and filter is not 'all')
      if (this.currentFilter !== 'all' && categoryType !== this.currentFilter) {
        category.classList.add('search-hidden');
        return;
      }

      // Search within this category for matching downloads
      const downloadRows = category.querySelectorAll('.download-table tbody tr');
      let categoryHasMatch = false;

      downloadRows.forEach(row => {
        const title = row.querySelector('strong')?.textContent.toLowerCase() || '';
        const description = row.querySelector('.description')?.textContent.toLowerCase() || '';

        const matches = title.includes(term) || description.includes(term);

        if (matches) {
          row.style.display = '';
          categoryHasMatch = true;
          matchCount++;
        } else {
          row.style.display = 'none';
        }
      });

      // Show/hide entire category based on whether it has matches
      if (categoryHasMatch) {
        category.classList.remove('search-hidden', 'hidden');
        category.style.display = '';
      } else {
        category.classList.add('search-hidden');
        category.style.display = 'none';
      }
    });

    // Update results count
    this.updateResultsCount(matchCount, searchTerm);
  }

  /**
   * Show all categories (respecting category filter)
   */
  showAllCategories() {
    this.downloadCategories.forEach(category => {
      const categoryType = category.getAttribute('data-category');

      // Show all rows in category
      const downloadRows = category.querySelectorAll('.download-table tbody tr');
      downloadRows.forEach(row => {
        row.style.display = '';
      });

      // Show/hide category based on current filter
      if (this.currentFilter === 'all' || categoryType === this.currentFilter) {
        category.classList.remove('search-hidden', 'hidden');
        category.style.display = '';
      } else {
        category.classList.add('hidden');
        category.style.display = 'none';
      }
    });

    this.updateResultsCount(0, '');
  }

  /**
   * Clear search and show all results
   */
  clearSearch() {
    this.searchInput.value = '';
    this.clearBtn.style.display = 'none';
    this.showAllCategories();
  }

  /**
   * Update results count message
   */
  updateResultsCount(count, searchTerm) {
    if (!searchTerm) {
      this.resultsCount.textContent = '';
      return;
    }

    if (count === 0) {
      this.resultsCount.innerHTML = `<div class="no-results-message"><strong>No results found</strong>Try different keywords or clear search to browse all downloads</div>`;
    } else {
      this.resultsCount.textContent = `Found ${count} ${count === 1 ? 'download' : 'downloads'}`;
    }
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

// ===== NUMBER COUNTER ANIMATIONS =====

class NumberCounters {
  constructor() {
    this.counters = [];
    this.hasAnimated = new Set(); // Track which counters have animated
    this.init();
  }

  init() {
    this.setupCounters();
  }

  setupCounters() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Skip animation for users who prefer reduced motion
    }

    const counterElements = document.querySelectorAll('.counter');

    counterElements.forEach(element => {
      const target = parseInt(element.dataset.target);
      const suffix = element.dataset.suffix || '';

      this.counters.push({
        element,
        target,
        suffix,
        animated: false
      });
    });

    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window) || this.counters.length === 0) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const counterData = this.counters.find(c => c.element === target);

          if (counterData && !this.hasAnimated.has(target)) {
            this.animateCounter(counterData);
            this.hasAnimated.add(target);
          }
        }
      });
    }, observerOptions);

    this.counters.forEach(counter => {
      observer.observe(counter.element);
    });
  }

  animateCounter(counterData) {
    const { element, target, suffix } = counterData;
    const duration = 1800; // 1.8 seconds (modern timing)
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Modern easing: cubic-bezier(0.0, 0.0, 0.2, 1) - smooth deceleration
      const easeDecelerated = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (target - start) * easeDecelerated);

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target + suffix;
      }
    };

    requestAnimationFrame(animate);
  }
}

// ===== SCROLL ANIMATIONS =====

class ScrollAnimations {
  constructor(options = {}) {
    this.animatedElements = [];
    this.observer = null;
    this.exitObserver = null;
    this.animateOnce = options.animateOnce !== undefined ? options.animateOnce : true;
    this.exitAnimation = options.exitAnimation !== undefined ? options.exitAnimation : false;
    this.init();
  }

  init() {
    this.setupAnimatedElements();
    this.setupIntersectionObserver();
    if (this.exitAnimation) {
      this.setupExitObserver();
    }
    this.setupPageLoadAnimations();
  }

  /**
   * Setup elements to be animated on scroll
   */
  setupAnimatedElements() {
    // Add animation classes to different sections
    const elementSelectors = [
      { selector: '.specialty-card', animation: 'fade-in-up', stagger: 100, exitAnimation: 'fade-out-up' },
      { selector: '.menu-item', animation: 'fade-in-up', stagger: 50, exitAnimation: 'fade-out-down' },
      { selector: '.portfolio-item', animation: 'fade-in-up', stagger: 80, exitAnimation: 'fade-out-up' },
      { selector: '.download-category', animation: 'fade-in-scale', stagger: 100, exitAnimation: 'fade-out-scale' },
      { selector: '.hero-content', animation: 'fade-in-left', stagger: 0 },
      { selector: '.hero-visual', animation: 'fade-in-right', stagger: 0 },
      { selector: '.hero-text', animation: 'fade-in-up', stagger: 0 },
      { selector: '.about-text', animation: 'fade-in-left', stagger: 0 },
      { selector: '.about-image', animation: 'fade-in-right', stagger: 0 },
      { selector: '.contact-info', animation: 'fade-in-left', stagger: 0 },
      { selector: '.contact-form', animation: 'fade-in-right', stagger: 0 },
      { selector: '.section-header', animation: 'fade-in-up', stagger: 0 },
      { selector: '.testimonial-card', animation: 'fade-in-scale', stagger: 100 },
      { selector: '.faq-item', animation: 'fade-in-up', stagger: 80 },
      { selector: '.blog-card', animation: 'fade-in-up', stagger: 100 },
      { selector: '.glossary-term', animation: 'fade-in-up', stagger: 60 }
    ];

    elementSelectors.forEach(({ selector, animation, stagger, exitAnimation }) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element, index) => {
        const delay = stagger ? index * stagger : 0;

        // Store animation data as element attributes for IntersectionObserver
        element.dataset.animation = animation;
        element.dataset.delay = delay.toString();
        if (exitAnimation) {
          element.dataset.exitAnimation = exitAnimation;
        }

        // Add animation class for initial state
        element.classList.add('animate-on-scroll');

        // Set initial state
        this.setInitialState(element, animation);

        this.animatedElements.push(element);
      });
    });
  }

  /**
   * Set initial state based on animation type
   */
  setInitialState(element, animation) {
    const stateMap = {
      'fade-in-up': { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
      'fade-in-down': { opacity: 0, transform: 'translateY(-30px) scale(0.97)' },
      'fade-in-left': { opacity: 0, transform: 'translateX(-30px) scale(0.97)' },
      'fade-in-right': { opacity: 0, transform: 'translateX(30px) scale(0.97)' },
      'fade-in-scale': { opacity: 0, transform: 'scale(0.95)' },
      'fade-in-rotate': { opacity: 0, transform: 'translateY(20px) rotate(-2deg) scale(0.97)' }
    };

    const state = stateMap[animation] || stateMap['fade-in-up'];

    element.style.opacity = state.opacity.toString();
    element.style.transform = state.transform;
    element.style.transition = 'none'; // No transition during initial state
  }

  /**
   * Setup IntersectionObserver for performant scroll animations
   * Replaces getBoundingClientRect() to avoid layout thrashing
   */
  setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately without animation
      this.showAllElements();
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.showAllElements();
      return;
    }

    // Create observer with optimized settings
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -10% 0px', // trigger when element is 90% up viewport
      threshold: 0.15 // trigger when 15% of element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animation;
          const delay = parseInt(element.dataset.delay || '0', 10);

          // Animate with delay
          setTimeout(() => {
            this.animateElement(element, animation, 'enter');
          }, delay);

          // Mark as visible
          element.classList.add('is-visible');

          // Stop observing this element after animation if animateOnce is true
          if (this.animateOnce) {
            this.observer.unobserve(element);
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    this.animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  /**
   * Setup exit observer for elements leaving viewport
   */
  setupExitObserver() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const exitObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05 // Trigger when only 5% visible
    };

    this.exitObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          const element = entry.target;
          const exitAnimation = element.dataset.exitAnimation;

          if (exitAnimation && element.classList.contains('is-visible')) {
            this.animateElement(element, exitAnimation, 'exit');
            element.classList.remove('is-visible');
          }
        }
      });
    }, exitObserverOptions);

    this.animatedElements.forEach(element => {
      if (element.dataset.exitAnimation) {
        this.exitObserver.observe(element);
      }
    });
  }

  /**
   * Setup page load animations for initial reveal
   */
  setupPageLoadAnimations() {
    // Add page load animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent && !document.body.classList.contains('page-loaded')) {
      mainContent.classList.add('page-load-animate');
      document.body.classList.add('page-loaded');
    }
  }

  /**
   * Animate individual element
   */
  animateElement(element, animation, type = 'enter') {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Just show the element without animation
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Duration based on animation type
    const duration = type === 'enter' ? '0.6s' : '0.4s';
    const easing = type === 'enter'
      ? 'cubic-bezier(0.0, 0.0, 0.2, 1)' // Decelerated for entry
      : 'cubic-bezier(0.4, 0.0, 1, 1)'; // Accelerated for exit

    // Apply smooth transition
    element.style.transition = `opacity ${duration} ${easing}, transform ${duration} ${easing}`;

    // Trigger reflow to ensure transition applies
    element.offsetHeight;

    // Set final state
    if (type === 'enter') {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.classList.add(animation);
    } else {
      // Exit animations
      const exitStates = {
        'fade-out-up': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
        'fade-out-down': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
        'fade-out-scale': { opacity: '0', transform: 'scale(0.92)' }
      };

      const exitState = exitStates[animation] || { opacity: '0', transform: 'scale(0.95)' };
      element.style.opacity = exitState.opacity;
      element.style.transform = exitState.transform;
    }
  }

  /**
   * Show all elements immediately (fallback)
   */
  showAllElements() {
    this.animatedElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.classList.add('is-visible');
    });
  }

  /**
   * Refresh observer (call after DOM changes)
   */
  refresh() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.exitObserver) {
      this.exitObserver.disconnect();
    }
    this.animatedElements = [];
    this.setupAnimatedElements();
    this.setupIntersectionObserver();
    if (this.exitAnimation) {
      this.setupExitObserver();
    }
  }

  /**
   * Cleanup observers when no longer needed
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.exitObserver) {
      this.exitObserver.disconnect();
      this.exitObserver = null;
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
    this.setupDeferredMapLoading();
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
   * Lazy load Google Maps iframe on demand
   */
  setupDeferredMapLoading() {
    const mapContainer = document.querySelector('.lazy-map');
    if (!mapContainer) {
      return;
    }

    const mapSrc = mapContainer.dataset.mapSrc;
    if (!mapSrc) {
      return;
    }

    const loadButton = mapContainer.querySelector('.load-map-btn');

    const loadMap = () => {
      if (mapContainer.dataset.mapLoaded === 'true') {
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.src = mapSrc;
      iframe.width = '100%';
      iframe.height = '300';
      iframe.style.border = '0';
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.setAttribute('title', 'ClinicIQ Solutions Location - Wollongong NSW 2500');
      iframe.allowFullscreen = true;

      mapContainer.dataset.mapLoaded = 'true';
      mapContainer.innerHTML = '';
      mapContainer.appendChild(iframe);
    };

    if (loadButton) {
      loadButton.addEventListener('click', () => {
        loadMap();
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMap();
            observer.disconnect();
          }
        });
      }, { rootMargin: '100px' });

      observer.observe(mapContainer);
    }
  }

  /**
   * Unregister service worker - relying on Netlify CDN for caching
   * Deferred to prevent blocking the window.load event
   */
  unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      // Defer to avoid blocking the load event (can cause 20+ second delays)
      setTimeout(() => {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister().then(success => {
              if (success) {
                console.log('ServiceWorker unregistered successfully');
              }
            });
          });
        }).catch(error => {
          console.warn('Error unregistering service workers:', error);
        });
      }, 0);
    }
  }
}

// ===== MAGNETIC BUTTONS =====

class MagneticButtons {
  constructor() {
    this.buttons = [];
    this.magneticStrength = 0.3; // How much the button follows the cursor (0-1)
    this.init();
  }

  init() {
    this.setupMagneticButtons();
  }

  setupMagneticButtons() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Skip magnetic effect for users who prefer reduced motion
    }

    // Apply magnetic effect to hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    heroButtons.forEach(button => {
      this.applyMagneticEffect(button);
      this.buttons.push(button);
    });
  }

  applyMagneticEffect(button) {
    button.classList.add('magnetic');

    // Hover lift constants
    const liftY = -3;
    const scale = 1.03;

    // Quick transition for initial hover lift
    const enterButton = () => {
      button.style.transition = 'transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)';
      button.style.transform = `translate(0, ${liftY}px) scale(${scale})`;
    };

    const moveButton = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from cursor to center
      const deltaX = (e.clientX - centerX) * this.magneticStrength;
      const deltaY = (e.clientY - centerY) * this.magneticStrength;

      // NO transition during movement - instant, responsive magnetic follow
      button.style.transition = 'none';
      button.style.transform = `translate(${deltaX}px, ${deltaY + liftY}px) scale(${scale})`;
    };

    const resetButton = () => {
      // Smooth return to original position with bounce effect
      button.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      button.style.transform = 'translate(0, 0) scale(1)';
    };

    // Mouse events
    button.addEventListener('mouseenter', enterButton);
    button.addEventListener('mousemove', moveButton);
    button.addEventListener('mouseleave', resetButton);

    // Touch events (for mobile)
    button.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      moveButton({ clientX: touch.clientX, clientY: touch.clientY });
    });

    button.addEventListener('touchend', resetButton);
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupAriaLiveRegions();
    this.setupFocusManagement();
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
// Moved to chatbot.js for code-splitting.

// ===== TESTIMONIALS CAROUSEL =====

class TestimonialsCarousel {
  constructor(options = {}) {
    // Support custom IDs for multiple carousel instances
    this.trackId = options.trackId || 'testimonials-track';
    this.prevBtnId = options.prevBtnId || 'testimonials-prev';
    this.nextBtnId = options.nextBtnId || 'testimonials-next';
    this.indicatorsId = options.indicatorsId || 'testimonials-indicators';
    this.autoPlayDelay = options.autoPlayDelay || 5000; // 5 seconds

    this.carousel = document.querySelector('.testimonials-carousel');
    this.track = document.getElementById(this.trackId);
    this.prevBtn = document.getElementById(this.prevBtnId);
    this.nextBtn = document.getElementById(this.nextBtnId);
    this.indicators = document.getElementById(this.indicatorsId);

    this.currentSlide = 0;
    this.totalSlides = 0;
    this.slidesPerView = 3;
    this.autoPlayInterval = null;

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

    // Modern easing for smooth carousel transitions (500ms with smooth easing)
    this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
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

// ===== SPONSORS CAROUSEL CONTROLLER =====

class SponsorsCarousel {
  constructor() {
    this.track = document.getElementById('sponsors-track');
    this.isVisible = true;
    this.isInViewport = true;
    this.init();
  }

  init() {
    if (!this.track) return;

    this.setupVisibilityListener();
    this.setupIntersectionObserver();
  }

  /**
   * Pause animation when tab is hidden (visibility change)
   */
  setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.track.style.animationPlayState = 'paused';
        this.isVisible = false;
      } else if (this.isInViewport) {
        this.track.style.animationPlayState = 'running';
        this.isVisible = true;
      }
    });
  }

  /**
   * Pause animation when carousel is not in viewport
   * Resumes when scrolled back into view
   */
  setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: always animate
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInViewport = entry.isIntersecting;

          if (entry.isIntersecting && !document.hidden) {
            this.track.style.animationPlayState = 'running';
          } else {
            this.track.style.animationPlayState = 'paused';
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px' // Start slightly before visible
      }
    );

    observer.observe(this.track);
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
    this.numberCounters = null;
    this.scrollAnimations = null;
    this.performanceOptimizations = null;
    this.magneticButtons = null;
    this.accessibilityEnhancements = null;
    this.chatBot = null;
    this.chatbotLoader = null;
    this.chatbotFallbackCleanup = null;

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
      // Initialize critical components immediately (affects LCP)
      this.navigation = new Navigation();
      this.performanceOptimizations = new PerformanceOptimizations();
      this.magneticButtons = new MagneticButtons();
      this.accessibilityEnhancements = new AccessibilityEnhancements();

      console.log('ClinicIQ Solutions: Critical components initialized');

      // Defer non-critical components to avoid blocking LCP
      this.initializeNonCriticalComponents();

    } catch (error) {
      console.error('Error initializing ClinicIQ Solutions website:', error);
    }
  }

  initializeNonCriticalComponents() {
    // Use requestIdleCallback if available, otherwise setTimeout
    const initFn = () => {
      try {
        this.menuFilter = new MenuFilter();
        this.downloadSearch = new DownloadSearch();
        this.formHandler = new FormHandler();
        this.numberCounters = new NumberCounters();
        // Enhanced scroll animations with exit support
        this.scrollAnimations = new ScrollAnimations({
          animateOnce: true, // Elements animate once when first visible
          exitAnimation: true // Enable exit animations when leaving viewport
        });
        this.initializeCarousels();
        this.sponsorsCarousel = new SponsorsCarousel();
        this.scrollToTop = new ScrollToTop();
        this.initializeChatbotModule();

        console.log('ClinicIQ Solutions: Non-critical components initialized');
      } catch (error) {
        console.error('Error initializing non-critical components:', error);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initFn, { timeout: 2000 });
    } else {
      setTimeout(initFn, 100);
    }
  }

  initializeChatbotModule() {
    if (this.chatBot) {
      return Promise.resolve(this.chatBot);
    }

    const startLoading = () => {
      if (!this.chatbotLoader) {
        this.chatbotLoader = import('./chatbot.js')
          .then(({ ChatBot }) => {
            if (!this.chatBot) {
              this.chatBot = new ChatBot();
            }

            if (typeof this.chatbotFallbackCleanup === 'function') {
              this.chatbotFallbackCleanup();
            }

            return this.chatBot;
          })
          .catch((error) => {
            console.error('Error loading chat widget module:', error);
            this.chatbotLoader = null;
            throw error;
          });
      }

      return this.chatbotLoader;
    };

    this.setupChatbotInteractionFallback(startLoading);

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        startLoading().catch(() => {});
      }, { timeout: 4000 });
    } else {
      setTimeout(() => {
        startLoading().catch(() => {});
      }, 200);
    }

    return this.chatbotLoader || null;
  }

  setupChatbotInteractionFallback(startLoading) {
    const toggle = document.getElementById('chat-toggle');
    if (!toggle || this.chatbotFallbackCleanup) {
      return;
    }

    const handleInteraction = async (event) => {
      if (this.chatBot) {
        cleanup();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      try {
        const bot = await startLoading();
        cleanup();
        requestAnimationFrame(() => bot?.toggleChat?.());
      } catch (error) {
        console.error('Unable to initialize chat widget after interaction:', error);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleInteraction(event);
      }
    };

    const cleanup = () => {
      toggle.removeEventListener('click', handleInteraction);
      toggle.removeEventListener('keydown', handleKeydown);
      this.chatbotFallbackCleanup = null;
    };

    toggle.addEventListener('click', handleInteraction);
    toggle.addEventListener('keydown', handleKeydown);
    this.chatbotFallbackCleanup = cleanup;
  }

  /**
   * Initialize all carousels on the page
   * Supports multiple carousel instances with different IDs
   */
  initializeCarousels() {
    const carousels = [];

    // Initialize testimonials carousel (if it exists on the page)
    if (document.getElementById('testimonials-track')) {
      carousels.push(new TestimonialsCarousel({
        trackId: 'testimonials-track',
        prevBtnId: 'testimonials-prev',
        nextBtnId: 'testimonials-next',
        indicatorsId: 'testimonials-indicators'
      }));
    }

    // Initialize trust signals carousel (if it exists on the page)
    if (document.getElementById('trust-track')) {
      carousels.push(new TestimonialsCarousel({
        trackId: 'trust-track',
        prevBtnId: 'trust-prev',
        nextBtnId: 'trust-next',
        indicatorsId: 'trust-indicators',
        autoPlayDelay: 6000 // 6 seconds for trust signals
      }));
    }

    this.testimonialsCarousel = carousels;
  }
}

// Initialize the website

// ===== BANNER FUNCTIONALITY =====
class BannerManager {
  constructor() {
    this.banner = document.querySelector('.service-limitation-banner');
    this.dismissBtn = document.querySelector('.banner-dismiss');
    this.isDismissed = this.checkIfDismissed();

    if (this.banner) {
      // Reset visibility if not dismissed
      if (!this.isDismissed) {
        this.banner.style.visibility = 'visible';
        this.init();
      } else {
        // Banner dismissed - keep it in DOM but hidden
        this.banner.style.visibility = 'hidden';
      }
    }
  }

  checkIfDismissed() {
    // Check if dismissed in current session
    return sessionStorage.getItem('cliniciq-banner-dismissed') === 'true';
  }

  setDismissed() {
    sessionStorage.setItem('cliniciq-banner-dismissed', 'true');
    this.isDismissed = true;
  }

  init() {
    // Add entrance animation delay
    setTimeout(() => {
      this.banner.style.animation = 'slideUp 0.5s ease-out';
    }, 100);

    // Handle dismiss button click
    if (this.dismissBtn) {
      this.dismissBtn.addEventListener('click', () => {
        this.hide();
      });
    }

    // Banner stays visible until user manually dismisses it
  }

  hide() {
    if (!this.banner) return;

    // Add exit animation
    this.banner.style.animation = 'slideDown 0.3s ease-in forwards';

    // Hide banner but preserve layout space
    setTimeout(() => {
      this.banner.style.visibility = 'hidden';
    }, 300);

    this.setDismissed();
  }

  reset() {
    if (!this.banner) return;

    // Clear dismissed state
    this.isDismissed = false;
    sessionStorage.removeItem('cliniciq-banner-dismissed');

    // Reset banner visibility and animation
    this.banner.style.visibility = 'visible';
    this.banner.style.animation = 'slideUp 0.5s ease-out';

    // Re-initialize
    this.init();
  }
}

// Initialize banner when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if this is a new navigation session
  const currentPage = window.location.href;
  const lastPage = sessionStorage.getItem('last-visited-page');

  // Clear sessionStorage when navigating from a different page
  if (lastPage && lastPage !== currentPage) {
    sessionStorage.removeItem('cliniciq-banner-dismissed');
  }

  // Update the last visited page
  sessionStorage.setItem('last-visited-page', currentPage);
  sessionStorage.setItem('page-loaded', 'true');

  // Initialize banner (always in dismissible state)
  new BannerManager();
});
const cliniciqSolutions = new ClinicIQSolutions();
