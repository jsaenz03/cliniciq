# Hero Video Optimization Guide

## Overview

The hero video has been optimized with:
- ✅ Smart connection-aware loading
- ✅ Intersection Observer for deferred loading
- ✅ Responsive video sources (mobile/tablet/desktop)
- ✅ WebM format for better compression
- ✅ Graceful fallback to poster image

## Current Status

**Current Setup**: The system expects these video files:

```
photos/hero/
├── hero.mp4 (2.7MB) ← Current desktop video
├── hero.webp (310KB) ← Poster image ✓
├── hero-desktop.webp ← NEEDED
├── hero-desktop.mp4 ← NEEDED (WebM recommended)
├── hero-tablet.mp4 ← NEEDED
├── hero-tablet.webm ← NEEDED
├── hero-mobile.mp4 ← NEEDED
└── hero-mobile.webm ← NEEDED
```

## Quick Start: Create Responsive Videos

### Option 1: Use FFmpeg (Recommended)

```bash
# Install FFmpeg if needed
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg

# Create Desktop WebM (1920x1080, ~1.5Mbps)
ffmpeg -i photos/hero/hero.mp4 \
  -c:v libvpx-vp9 -b:v 1500k \
  -c:a libopus -b:a 128k \
  -vf "scale=1920:1080" \
  photos/hero/hero-desktop.webm

# Create Desktop MP4 fallback (1920x1080, ~2Mbps)
ffmpeg -i photos/hero/hero.mp4 \
  -c:v libx264 -b:v 2000k \
  -c:a aac -b:a 128k \
  -vf "scale=1920:1080" \
  photos/hero/hero-desktop.mp4

# Create Tablet WebM (1024x768, ~1Mbps)
ffmpeg -i photos/hero/hero.mp4 \
  -c:v libvpx-vp9 -b:v 1000k \
  -c:a libopus -b:a 96k \
  -vf "scale=1024:768" \
  photos/hero/hero-tablet.webm

# Create Tablet MP4 (1024x768, ~1.2Mbps)
ffmpeg -i photos/hero/hero.mp4 \
  -c:v libx264 -b:v 1200k \
  -c:a aac -b:a 96k \
  -vf "scale=1024:768" \
  photos/hero/hero-tablet.mp4

# Create Mobile WebM (640x480, ~500Kbps)
ffmpeg -i photos/hero/hero.mp4 \
  -c:v libvpx-vp9 -b:v 500k \
  -c:a libopus -b:a 64k \
  -vf "scale=640:480" \
  photos/hero/hero-mobile.webm

# Create Mobile MP4 (640x480, ~700Kbps)
ffmpeg -i photos/hero/hero.mp4 \
  -c:v libx264 -b:v 700k \
  -c:a aac -b:a 64k \
  -vf "scale=640:480" \
  photos/hero/hero-mobile.mp4
```

### Option 2: Use Online Tools

1. **CloudConvert** (cloudconvert.com)
   - Upload your `hero.mp4`
   - Convert to WebM format
   - Set different bitrates for each size

2. **HandBrake** (handbrake.fr)
   - Free, open-source video transcoder
   - Presets for web optimization
   - Batch processing for multiple sizes

### Option 3: Keep Current Setup (Temporary)

If you want to use the current `hero.mp4` for all screen sizes temporarily, the system will work but won't be optimized. The smart loader will still:
- Only load on fast connections
- Defer loading until needed
- Fall back to poster on slow networks

## Target File Sizes

| Device | Resolution | Bitrate | WebM Size | MP4 Size |
|--------|-----------|---------|-----------|----------|
| Desktop | 1920x1080 | 1.5Mbps | ~1.5MB | ~2MB |
| Tablet | 1024x768 | 1Mbps | ~800KB | ~1MB |
| Mobile | 640x480 | 500Kbps | ~300KB | ~500KB |

**Total Savings**: 2.7MB → 300KB-1.5MB (45-90% reduction)

## Performance Improvements

### Before Optimization
- ❌ 2.7MB video loads immediately
- ❌ Blocks initial page render
- ❌ Same large file for all devices
- ❌ No connection awareness
- ❌ LCP impact: ~2-3 seconds

### After Optimization (with responsive videos)
- ✅ 300KB-1.5MB depending on device
- ✅ Deferred loading until needed
- ✅ Adaptive quality by screen size
- ✅ Connection-aware loading
- ✅ LCP impact: ~0.5-1 second

## How It Works

1. **Connection Check**: Tests for 4G/Wi-Fi
2. **Intersection Observer**: Delays load until hero is visible
3. **Responsive Sources**: Browser picks appropriate size
4. **Format Preference**: WebM first, MP4 fallback
5. **Graceful Degradation**: Poster image if video fails

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| WebM | ✅ | ✅ | ⚠️ | ✅ |
| MP4 | ✅ | ✅ | ✅ | ✅ |
| Intersection Observer | ✅ | ✅ | ✅ | ✅ |
| Network Information API | ✅ | ✅ | ⚠️ | ✅ |

⚠️ Safari: Falls back to MP4, still works well

## Testing

```bash
# Test locally with Python
python -m http.server 8000

# Test with Chrome DevTools
1. Open DevTools (F12)
2. Network tab → Throttling → "Fast 3G"
3. Refresh page
4. Observe: Video should NOT load on slow connection
5. Change to "Online" or "4G"
6. Observe: Video loads when hero is visible
```

## Monitoring

Check video performance with:

```javascript
// In browser console
const video = document.querySelector('.hero-video');
console.log('Video loaded:', video.getAttribute('data-loaded'));
console.log('Current src:', video.currentSrc);
console.log('Ready state:', video.readyState);
```

## Next Steps

1. ✅ Code optimization complete
2. ⏳ Create responsive video files (see commands above)
3. ⏳ Test on different devices/networks
4. ⏳ Deploy to production
5. ⏳ Monitor LCP improvement in Google Analytics

## Troubleshooting

**Video not playing?**
- Check browser console for errors
- Verify video files exist in `photos/hero/`
- Ensure video format is supported
- Check autoplay policies (may require user interaction)

**Slow loading?**
- Verify video file sizes match targets
- Check connection type in DevTools
- Consider reducing bitrate further

**Poster image showing?**
- Expected on slow connections
- Check if video files exist
- Verify network isn't throttling video
