/**
 * ClinicIQ Solutions - Hero Video Optimizer
 *
 * Responsive video loading based on screen size
 */

class HeroVideoLoader {
  constructor() {
    this.video = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupVideo());
    } else {
      this.setupVideo();
    }
  }

  setupVideo() {
    this.video = document.querySelector('.hero-video');
    if (!this.video) return;

    // Ensure video is properly configured for mobile autoplay
    this.video.setAttribute('muted', 'muted');
    this.video.muted = true;
    this.video.setAttribute('autoplay', 'autoplay');
    this.video.setAttribute('playsinline', 'playsinline');

    // Determine which video to use based on screen size
    const screenWidth = window.innerWidth;
    let videoSrc;

    if (screenWidth <= 640) {
      // Mobile
      videoSrc = {
        webm: 'photos/hero/hero-mobile.webm',
        mp4: 'photos/hero/hero-mobile.mp4'
      };
    } else if (screenWidth <= 1024) {
      // Tablet
      videoSrc = {
        webm: 'photos/hero/hero-tablet.webm',
        mp4: 'photos/hero/hero-tablet.mp4'
      };
    } else {
      // Desktop
      videoSrc = {
        webm: 'photos/hero/hero-desktop.webm',
        mp4: 'photos/hero/hero-desktop.mp4'
      };
    }

    // Update video sources
    const sources = this.video.querySelectorAll('source');
    sources.forEach(source => {
      if (source.type === 'video/webm') {
        source.src = videoSrc.webm;
      } else if (source.type === 'video/mp4') {
        source.src = videoSrc.mp4;
      }
    });

    // Load and play video immediately
    this.video.load();

    // Force autoplay on mobile with multiple play attempts
    const attemptPlay = () => {
      this.video.play().catch((error) => {
        // Autoplay was prevented - video is still loaded
        console.log('Autoplay prevented - video loaded but waiting for user interaction:', error.message);
      });
    };

    // Immediate first attempt
    attemptPlay();

    // Try playing on first user interaction (backup for strict mobile browsers)
    const enablePlayOnInteraction = () => {
      attemptPlay();
      document.removeEventListener('touchstart', enablePlayOnInteraction);
      document.removeEventListener('click', enablePlayOnInteraction);
    };

    document.addEventListener('touchstart', enablePlayOnInteraction, { once: true });
    document.addEventListener('click', enablePlayOnInteraction, { once: true });

    // Additional attempts with delays (some mobile browsers need multiple tries)
    setTimeout(attemptPlay, 500);
    setTimeout(attemptPlay, 1000);
    setTimeout(attemptPlay, 2000);

    // Handle resize - reload video if screen size changes significantly
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        // Only reload if crossing major breakpoints
        if ((screenWidth <= 640 && newWidth > 640) ||
            (screenWidth > 640 && screenWidth <= 1024 && (newWidth <= 640 || newWidth > 1024)) ||
            (screenWidth > 1024 && newWidth <= 1024)) {
          location.reload(); // Simplest approach - reload page
        }
      }, 500);
    });
  }
}

// Initialize
new HeroVideoLoader();
