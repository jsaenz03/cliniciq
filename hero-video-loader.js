/**
 * ClinicIQ Solutions - Hero Video Optimizer
 *
 * Responsive video loading based on screen size.
 * Fixes mobile autoplay for hero-side-video elements (certified apps showcase video).
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

    // Handle the right-side showcase video (certified apps product showcase)
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

    // Update video sources only when the screen-size pick differs from what
    // the markup already ships — re-setting the same src and calling load()
    // would reset and restart a video that is already playing.
    const baseSrc = src => (src || '').split('?')[0];
    let sourcesChanged = false;
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
      if (source.type === 'video/webm' && baseSrc(source.getAttribute('src')) !== videoSrc.webm) {
        source.src = videoSrc.webm;
        sourcesChanged = true;
      } else if (source.type === 'video/mp4' && baseSrc(source.getAttribute('src')) !== videoSrc.mp4) {
        source.src = videoSrc.mp4;
        sourcesChanged = true;
      }
    });

    // Load video immediately (only needed when sources actually changed)
    if (sourcesChanged) {
      video.load();
    }

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

    // Single fixed source regardless of screen size — the markup's own
    // sources are already correct, so leave them alone (re-setting the same
    // src and calling load() resets a video that is already playing).

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