/**
 * ClinicIQ Solutions - Video Configuration
 *
 * Add your YouTube video links here to update videos across the site.
 * Videos will automatically update wherever they're referenced.
 *
 * YOUTUBE EMBED FORMAT:
 * 1. Go to your YouTube video
 * 2. Click "Share" → "Embed"
 * 3. Copy the video ID from the URL (e.g., from https://www.youtube.com/embed/VIDEO_ID)
 * 4. Paste the VIDEO_ID below
 *
 * Example: If your embed URL is https://www.youtube.com/embed/dQw4w9WgXcQ
 *          Then VIDEO_ID = "dQw4w9WgXcQ"
 */

window.CLINICIQ_VIDEOS = {
  // ========== PRODUCT SUITE VIDEOS ==========

  // Automation Platform Overview
  automationPlatform: {
    youtubeId: "", // Add YouTube video ID here
    title: "Automation Platform Overview",
    placeholder: true
  },

  // Calculator Tools Demo
  calculatorsDemo: {
    youtubeId: "", // Add YouTube video ID here
    title: "Calculator Tools Demo",
    placeholder: true
  },

  // Website Templates Showcase
  websiteTemplates: {
    youtubeId: "", // Add YouTube video ID here
    title: "Website Templates Showcase",
    placeholder: true
  },

  // Download Resources Overview
  downloadsOverview: {
    youtubeId: "", // Add YouTube video ID here
    title: "Download Resources Overview",
    placeholder: true
  },

  // ========== AUTOMATION PRODUCTS ==========

  // NursePod Demo
  nursepod: {
    youtubeId: "", // Add YouTube video ID here
    title: "NursePod - Nurse Technology Platform",
    placeholder: true
  },

  // MedPlan AI Demo
  medplan: {
    youtubeId: "", // Add YouTube video ID here
    title: "MedPlan AI - Care Plan Generation",
    placeholder: true
  },

  // DocuW2 Demo
  docuw2: {
    youtubeId: "", // Add YouTube video ID here
    title: "DocuW2 - RAG Document Processing",
    placeholder: true
  },

  // PIPQI Analytics Demo
  pipqi: {
    youtubeId: "", // Add YouTube video ID here
    title: "PIPQI Analytics Dashboard",
    placeholder: true
  },

  // Smart Stock Demo
  smartstock: {
    youtubeId: "", // Add YouTube video ID here
    title: "Smart Stock - Inventory Management",
    placeholder: true
  },

  // MBS Eligibility Checker Demo
  mbschecker: {
    youtubeId: "", // Add YouTube video ID here
    title: "MBS Eligibility Checker",
    placeholder: true
  },

  // Kiddo Tasker Demo
  kiddotasker: {
    youtubeId: "", // Add YouTube video ID here
    title: "Kiddo Tasker - Kids Task Management",
    placeholder: true
  },

  // DermCam Demo
  dermcam: {
    youtubeId: "", // Add YouTube video ID here
    title: "DermCam - Dermatology Imaging",
    placeholder: true
  },

  // Docuwhisper AI Demo
  docuwhisper: {
    youtubeId: "", // Add YouTube video ID here
    title: "Docuwhisper AI - Document Transcription",
    placeholder: true
  },

  // ========== FEATURE SPECIFIC VIDEOS ==========

  // GP Clinic Automation
  gpClinicAutomation: {
    youtubeId: "", // Add YouTube video ID here
    title: "GP Clinic Automation Features",
    placeholder: true
  },

  // ROI Calculator Demo
  roiCalculator: {
    youtubeId: "", // Add YouTube video ID here
    title: "ROI Calculator Walkthrough",
    placeholder: true
  },

  // Appointment Scheduling Automation
  appointmentScheduling: {
    youtubeId: "", // Add YouTube video ID here
    title: "Appointment Scheduling Automation",
    placeholder: true
  },

  // Patient Communication Tools
  patientCommunication: {
    youtubeId: "", // Add YouTube video ID here
    title: "Patient Communication Tools",
    placeholder: true
  },

  // ========== TUTORIAL VIDEOS ==========

  // Getting Started Tutorial
  gettingStarted: {
    youtubeId: "", // Add YouTube video ID here
    title: "Getting Started with ClinicIQ",
    placeholder: true
  },

  // Advanced Features Tutorial
  advancedFeatures: {
    youtubeId: "", // Add YouTube video ID here
    title: "Advanced Features Tutorial",
    placeholder: true
  },

  // Integration Guide
  integrationGuide: {
    youtubeId: "", // Add YouTube video ID here
    title: "Integration Guide",
    placeholder: true
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
 * @returns {boolean} True if video has a YouTube ID
 */
function isVideoConfigured(videoConfig) {
  return videoConfig && videoConfig.youtubeId && videoConfig.youtubeId.length > 0;
}
