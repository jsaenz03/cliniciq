/**
 * ClinicIQ Solutions - Video Configuration
 *
 * Configure videos using local files or YouTube links.
 * Videos will automatically update wherever they're referenced.
 *
 * LOCAL VIDEO FORMAT:
 * localVideo: "path/to/video.mp4"
 *
 * YOUTUBE EMBED FORMAT:
 * 1. Go to your YouTube video
 * 2. Click "Share" → "Embed"
 * 3. Copy the video ID from the URL (e.g., from https://www.youtube.com/embed/VIDEO_ID)
 * 4. Paste the VIDEO_ID below as youtubeId
 *
 * Example: If your embed URL is https://www.youtube.com/embed/dQw4w9WgXcQ
 *          Then youtubeId = "dQw4w9WgXcQ"
 */

window.CLINICIQ_VIDEOS = {
  // ========== PRODUCT SUITE VIDEOS ==========

  // Automation Platform Overview
  automationPlatform: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Automation Platform Overview"
  },

  // Calculator Tools Demo
  calculatorsDemo: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Calculator Tools Demo"
  },

  // Website Templates Showcase
  websiteTemplates: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Website Templates Showcase"
  },

  // Download Resources Overview
  downloadsOverview: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Download Resources Overview"
  },

  // ========== AUTOMATION PRODUCTS ==========

  // NursePod Demo
  nursepod: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "NursePod - Nurse Technology Platform"
  },

  // MedPlan AI Demo
  medplan: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "MedPlan AI - Care Plan Generation"
  },

  // DocuW2 Demo
  docuw2: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "DocuW2 - RAG Document Processing"
  },

  // PIPQI Analytics Demo
  pipqi: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "PIPQI Analytics Dashboard"
  },

  // Smart Stock Demo
  smartstock: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Smart Stock - Inventory Management"
  },

  // MBS Eligibility Checker Demo
  mbschecker: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "MBS Eligibility Checker"
  },

  // Kiddo Tasker Demo
  kiddotasker: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Kiddo Tasker - Kids Task Management"
  },

  // DermCam Demo
  dermcam: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "DermCam - Dermatology Imaging"
  },

  // Docuwhisper AI Demo
  docuwhisper: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Docuwhisper AI - Document Transcription"
  },

  // ========== FEATURE SPECIFIC VIDEOS ==========

  // GP Clinic Automation
  gpClinicAutomation: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "GP Clinic Automation Features"
  },

  // ROI Calculator Demo
  roiCalculator: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "ROI Calculator Walkthrough"
  },

  // Appointment Scheduling Automation
  appointmentScheduling: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Appointment Scheduling Automation"
  },

  // Patient Communication Tools
  patientCommunication: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Patient Communication Tools"
  },

  // ========== TUTORIAL VIDEOS ==========

  // Getting Started Tutorial
  gettingStarted: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Getting Started with ClinicIQ"
  },

  // Advanced Features Tutorial
  advancedFeatures: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Advanced Features Tutorial"
  },

  // Integration Guide
  integrationGuide: {
    youtubeId: "", // Add YouTube video ID here (optional)
    localVideo: "assets/videos/placeholder.mp4", // Replace with actual video path
    title: "Integration Guide"
  }
};

/**
 * Helper function to generate YouTube embed URL
 * @param {string} videoId - YouTube video ID
 * @returns {string} Complete embed URL
 */
function getYouTubeEmbedUrl(videoId) {
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Helper function to generate YouTube thumbnail URL
 * @param {string} videoId - YouTube video ID
 * @returns {string} Thumbnail URL
 */
function getYouTubeThumbnailUrl(videoId) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Helper function to check if video is configured
 * @param {object} videoConfig - Video configuration object
 * @returns {boolean} True if video has a local file or YouTube ID
 */
function isVideoConfigured(videoConfig) {
  return videoConfig && (
    (videoConfig.localVideo && videoConfig.localVideo.length > 0) ||
    (videoConfig.youtubeId && videoConfig.youtubeId.length > 0)
  );
}
