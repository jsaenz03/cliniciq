# ClinicIQ Solutions - Video Configuration Guide

## Overview

This website uses a centralized video configuration system that allows you to easily update YouTube videos across the site by editing a single file.

## Files

- **`config.js`** - Contains all video IDs and configuration
- **`video-handler.js`** - Handles video embedding and modal functionality
- **`styles.css`** - Contains video embed and modal styling

## How to Add/Update Videos

### Step 1: Get Your YouTube Video ID

1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the video ID from the embed URL

**Example:**
```
Embed URL: https://www.youtube.com/embed/dQw4w9WgXcQ
Video ID: dQw4w9WgXcQ
```

### Step 2: Update config.js

Open `config.js` and find the video you want to update. Add your YouTube ID:

```javascript
nursepod: {
  youtubeId: "dQw4w9WgXcQ", // Paste your video ID here
  title: "NursePod - Nurse Technology Platform"
}
```

### Step 3: Save and Test

1. Save `config.js`
2. Refresh your browser
3. The video will automatically appear

## Video Slots by Page

### Index.html (Practice Cards)
| Product | Config Key | Location |
|---------|-----------|----------|
| NursePod | `nursepod` | Hero section card |
| cIQventory | `smartstock` | Product suite card |
| PIPQI | `pipqi` | Product suite card |
| MedPlan AI | `medplan` | Product suite card |

### Automations.html (Portfolio Cards)
| Product | Config Key | Button Behavior |
|---------|-----------|-----------------|
| NursePod | `nursepod` | Access + Demo |
| MedPlan AI | `medplan` | Access + Demo |
| DocuW2 | `docuw2` | Access + Demo |
| PIPQI Analytics | `pipqi` | Access + Demo |
| Smart Stock | `smartstock` | Access + Demo |
| MBS Checker | `mbschecker` | Access + Demo |
| Kiddo Tasker | `kiddotasker` | Access + Demo |
| DermCam | `dermcam` | Access + Demo |
| Docuwhisper | `docuwhisper` | Access + Demo |

## Button Behavior

### Demo Button (Always Shows)
- Shows "Demo" button with gold gradient
- Opens video in modal when clicked (if video ID is configured)
- Does nothing if no video is configured
- Includes close button and backdrop blur

## Video Modal Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Close Methods**: Click X button, click overlay, or press Escape
- **Smooth Animations**: Scale and fade transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Backdrop Blur**: Modern frosted glass effect

## Helper Functions

The config provides these utility functions:

```javascript
// Get embed URL
getYouTubeEmbedUrl("dQw4w9WgXcQ")
// Returns: "https://www.youtube.com/embed/dQw4w9WgXcQ"

// Get thumbnail
getYouTubeThumbnailUrl("dQw4w9WgXcQ")
// Returns: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"

// Check if configured
isVideoConfigured(videoConfig)
// Returns: true/false
```

## Adding New Videos

### For Practice Cards (index.html)

1. Add entry to `config.js`:
```javascript
myNewProduct: {
  youtubeId: "",
  title: "My New Product",
  placeholder: true
}
```

2. Update `video-handler.js` mapping if needed

### For Portfolio Items (automations.html)

1. Add entry to `config.js`:
```javascript
myNewProduct: {
  youtubeId: "",
  title: "My New Product Demo"
}
```

2. Add `data-video` attribute to portfolio item:
```html
<div class="portfolio-item" data-category="custom" data-video="mynewproduct">
```

3. The Demo button will be automatically configured

## Troubleshooting

**Video not showing in modal?**
- Check browser console for errors
- Verify `config.js` is loaded before `video-handler.js`
- Ensure YouTube video ID is correct (no extra spaces)

**Demo button not appearing?**
- Check that `data-video` attribute matches config key
- Verify the video ID is not empty in config.js

**Wrong video appearing?**
- Double-check the video ID in `config.js`
- Clear browser cache

**Modal not closing?**
- Check JavaScript console for errors
- Verify all event listeners are attached

**Demo button not working?**
- Verify video ID is added to `config.js`
- Check browser console for errors

## CSS Customization

### Demo Button Gradient
```css
.portfolio-actions .btn-demo {
  background: linear-gradient(135deg, var(--accent-gold) 0%, #d4b76a 100%);
}
```

### Modal Overlay
```css
.video-modal-overlay {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
}
```

### Modal Content
```css
.video-modal-content {
  max-width: 900px;
  border-radius: var(--radius-xl);
}
```
