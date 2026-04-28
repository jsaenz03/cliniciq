/**
 * ClinicIQ Solutions - Video Embed Handler
 *
 * This module handles video embedding for:
 * - Practice cards (index.html)
 * - Portfolio items (automations.html)
 *
 * Supports both local video files and YouTube videos configured in config.js
 */

class VideoEmbedHandler {
  constructor() {
    this.videos = window.CLINICIQ_VIDEOS || {};
    this.videoModal = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupVideoEmbeds());
    } else {
      this.setupVideoEmbeds();
    }
  }

  setupVideoEmbeds() {
    this.setupPracticeCards();
    this.setupPortfolioItems();
    this.setupVideoModal();
  }

  setupPracticeCards() {
    // Find all video placeholders in practice cards
    const videoPlaceholders = document.querySelectorAll('.practice-card .video-placeholder');

    videoPlaceholders.forEach(placeholder => {
      const card = placeholder.closest('.practice-card');
      if (!card) return;

      // Map practice cards to their video keys based on card content
      const titleElement = card.querySelector('.practice-title');
      if (!titleElement) return;

      const title = titleElement.textContent.toLowerCase();
      let videoKey = null;

      // Map titles to video keys
      if (title.includes('nursepod')) videoKey = 'nursepod';
      else if (title.includes('ciqventory') || title.includes('inventory')) videoKey = 'smartstock';
      else if (title.includes('pipqi')) videoKey = 'pipqi';
      else if (title.includes('medplan')) videoKey = 'medplan';

      if (!videoKey || !this.videos[videoKey]) return;

      const videoConfig = this.videos[videoKey];

      // Only embed if video is configured, otherwise keep original placeholder
      if (isVideoConfigured(videoConfig)) {
        this.embedVideo(placeholder, videoConfig);
      }
    });
  }

  setupPortfolioItems() {
    // Find all portfolio items with data-video attribute
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-video]');

    portfolioItems.forEach(item => {
      const videoKey = item.getAttribute('data-video');
      if (!videoKey || !this.videos[videoKey]) return;

      const videoConfig = this.videos[videoKey];

      // Find the Contact button and convert it to Demo button
      const contactBtn = item.querySelector('.portfolio-actions .btn-secondary');
      if (!contactBtn) return;

      // Always change to Demo button
      contactBtn.textContent = 'Demo';
      contactBtn.classList.remove('btn-secondary');
      contactBtn.classList.add('btn-demo');

      // Add click handler to open video modal if configured, otherwise do nothing
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isVideoConfigured(videoConfig)) {
          this.openVideoModal(videoConfig);
        }
      });
    });
  }

  setupVideoModal() {
    // Create video modal if it doesn't exist
    if (document.getElementById('video-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Video demo');
    modal.innerHTML = `
      <div class="video-modal-overlay"></div>
      <div class="video-modal-content">
        <button class="video-modal-close" aria-label="Close video">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="video-modal-iframe-container">
          <iframe class="video-modal-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <h3 class="video-modal-title"></h3>
      </div>
    `;

    document.body.appendChild(modal);
    this.videoModal = modal;

    // Setup close handlers
    const closeBtn = modal.querySelector('.video-modal-close');
    const overlay = modal.querySelector('.video-modal-overlay');

    closeBtn.addEventListener('click', () => this.closeVideoModal());
    overlay.addEventListener('click', () => this.closeVideoModal());

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeVideoModal();
      }
    });
  }

  openVideoModal(videoConfig) {
    if (!this.videoModal) return;

    const { youtubeId, title, localVideo } = videoConfig;
    const titleEl = this.videoModal.querySelector('.video-modal-title');
    titleEl.textContent = title;

    // Check if local video is available
    if (localVideo) {
      const videoContainer = this.videoModal.querySelector('.video-modal-iframe-container');
      videoContainer.innerHTML = `
        <video class="video-modal-video" controls autoplay preload="metadata">
          <source src="${localVideo}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else if (youtubeId) {
      // Fall back to YouTube embed
      const embedUrl = getYouTubeEmbedUrl(youtubeId);
      const iframe = this.videoModal.querySelector('.video-modal-iframe');
      iframe.src = embedUrl;
    }

    this.videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeVideoModal() {
    if (!this.videoModal) return;

    // Stop local video
    const video = this.videoModal.querySelector('.video-modal-video');
    if (video) {
      video.pause();
      video.src = '';
    }

    // Clear YouTube iframe
    const iframe = this.videoModal.querySelector('.video-modal-iframe');
    if (iframe) {
      iframe.src = '';
    }

    this.videoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  embedVideo(placeholder, videoConfig) {
    const { youtubeId, title, localVideo } = videoConfig;

    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-embed-container';

    // Use local video if available, otherwise YouTube
    if (localVideo) {
      const video = document.createElement('video');
      video.src = localVideo;
      video.title = title;
      video.className = 'video-element';
      video.controls = true;
      video.preload = 'metadata';
      videoContainer.appendChild(video);
    } else if (youtubeId) {
      const embedUrl = getYouTubeEmbedUrl(youtubeId);
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.title = title;
      iframe.className = 'video-iframe';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      videoContainer.appendChild(iframe);
    }

    // Replace placeholder with video
    placeholder.innerHTML = '';
    placeholder.appendChild(videoContainer);
    placeholder.classList.add('has-video');
  }
}

// Initialize on page load
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VideoEmbedHandler;
} else {
  // Auto-initialize when config.js is loaded
  window.addEventListener('load', () => {
    if (window.CLINICIQ_VIDEOS) {
      new VideoEmbedHandler();
    }
  });
}
