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

    // Load and play video
    this.video.load();

    // Wait 2 seconds before playing for smooth effect
    setTimeout(() => {
      this.video.play().catch(() => {
        // Autoplay was prevented - video is still loaded
      });
    }, 2000);

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
