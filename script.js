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
    this.observer = null;
    this.init();
  }

  init() {
    this.setupAnimatedElements();
    this.setupIntersectionObserver();
  }

  /**
   * Setup elements to be animated on scroll
   */
  setupAnimatedElements() {
    // Add animation classes to different sections
    const elementSelectors = [
      { selector: '.specialty-card', animation: 'fade-in-up', stagger: 100 },
      { selector: '.menu-item', animation: 'fade-in-up', stagger: 50 },
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
        const delay = stagger ? index * stagger : 0;

        // Store animation data as element attributes for IntersectionObserver
        element.dataset.animation = animation;
        element.dataset.delay = delay.toString();

        // Initially hide all elements that will be animated
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(animation);

        this.animatedElements.push(element);
      });
    });
  }

  /**
   * Get initial transform based on animation type
   */
  getInitialTransform(animation) {
    switch (animation) {
      case 'fade-in-up':
        return 'translateY(20px)';
      case 'fade-in-left':
        return 'translateX(-20px)';
      case 'fade-in-right':
        return 'translateX(20px)';
      default:
        return 'translateY(20px)';
    }
  }

  /**
   * Setup IntersectionObserver for performant scroll animations
   * Replaces getBoundingClientRect() to avoid layout thrashing
   */
  setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately without animation
      this.animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
      return;
    }

    // Create observer with optimized settings
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -50px 0px', // trigger slightly before element enters viewport
      threshold: 0.1 // trigger when 10% of element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animation;
          const delay = parseInt(element.dataset.delay || '0', 10);

          // Animate with delay
          setTimeout(() => {
            this.animateElement(element, animation);
          }, delay);

          // Stop observing this element after animation
          this.observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    this.animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  /**
   * Animate individual element
   */
  animateElement(element, animation) {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Just show the element without animation
      element.style.opacity = '1';
      element.style.transform = 'none';
    } else {
      // Animate the element with updated duration to match CSS
      element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.classList.add(animation);
    }
  }

  /**
   * Cleanup observer when no longer needed
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
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
        this.formHandler = new FormHandler();
        this.scrollAnimations = new ScrollAnimations();
        this.testimonialsCarousel = new TestimonialsCarousel();
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
}

// Initialize the website
const cliniciqSolutions = new ClinicIQSolutions();
