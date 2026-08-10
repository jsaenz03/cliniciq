/**
 * ClinicIQ Solutions - Hero Video Optimizer
 *
 * Responsive video loading based on screen size.
 * Fixes mobile autoplay for hero-side-video elements (5 basic things video).
 */

class HeroVideoLoader {
  constructor() {
    this.video = null;
    this.setupVideo();
  }

  setupVideo() {
    // Handle the full-bleed background hero video (plays behind the hero section)
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      this.setupBackgroundVideo(heroVideo);
    }

    // Handle the right-side showcase video ("5 basic things" product demo)
    const sideVideo = document.querySelector('.hero-side-video');
    if (sideVideo) {
      this.setupSideVideo(sideVideo);
    }
  }

  setupBackgroundVideo(video) {
    // Ensure video is properly configured for mobile autoplay
    video.setAttribute('muted', 'muted');
    video.muted = true;
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('playsinline', 'playsinline');
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');

    // Determine which video to use based on screen size
    const screenWidth = window.innerWidth;
    let videoSrc;

    if (screenWidth <= 640) {
      // Mobile
      videoSrc = {
        webm: 'photos/hero/hero-bg-mobile.webm',
        mp4: 'photos/hero/hero-bg-mobile.mp4'
      };
    } else if (screenWidth <= 1024) {
      // Tablet
      videoSrc = {
        webm: 'photos/hero/hero-bg-tablet.webm',
        mp4: 'photos/hero/hero-bg-tablet.mp4'
      };
    } else {
      // Desktop
      videoSrc = {
        webm: 'photos/hero/hero-bg-desktop.webm',
        mp4: 'photos/hero/hero-bg-desktop.mp4'
      };
    }

    // Update video sources
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
      if (source.type === 'video/webm') {
        source.src = videoSrc.webm;
      } else if (source.type === 'video/mp4') {
        source.src = videoSrc.mp4;
      }
    });

    // Load video immediately
    video.load();

    // Mobile autoplay fix: use a single user interaction to trigger play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked, but video is now ready
        // This handler will trigger on first interaction
        const handleInteraction = () => {
          video.play().catch(() => {
            // Still blocked - no further action needed
          });
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('click', handleInteraction);
        };
        
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('click', handleInteraction, { once: true });
      });
    }
  }

  setupSideVideo(video) {
    // Ensure video is properly configured for mobile autoplay
    video.setAttribute('muted', 'muted');
    video.muted = true;
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('playsinline', 'playsinline');
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    video.setAttribute('loop', 'loop');

    // The side showcase video uses a single fixed source regardless of screen size.
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
      if (source.type === 'video/webm') {
        source.src = 'photos/hero/hero-showcase-5-things.webm';
      } else if (source.type === 'video/mp4') {
        source.src = 'photos/hero/hero-showcase-5-things.mp4';
      }
    });

    // Load video immediately
    video.load();

    // Mobile autoplay fix: use a single user interaction to trigger play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked, but video is now ready
        // This handler will trigger on first interaction
        const handleInteraction = () => {
          video.play().catch(() => {
            // Still blocked - no further action needed
          });
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('click', handleInteraction);
        };
        
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('click', handleInteraction, { once: true });
      });
    }
  }
}

// Initialize
new HeroVideoLoader();