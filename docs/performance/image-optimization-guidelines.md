# Image Optimization Guidelines for ClinicIQ Website

## Overview
This document provides guidelines for optimizing images on the ClinicIQ website to maintain optimal performance and user experience.

## Current Implementation
The website uses a responsive image approach with:
- **WebP format** for modern browsers (25-35% better compression)
- **PNG fallbacks** for older browser compatibility
- **Responsive variants** (mobile, tablet, desktop) for optimal device-specific delivery
- **Picture elements** for automatic format selection

## Image Requirements

### For Large Content Images (Services, Hero, About)
Create 3 responsive variants:
- **Mobile**: 640px width (max)
- **Tablet**: 1024px width (max)
- **Desktop**: 1920px width (max)

Format requirements:
- **Primary**: WebP at 85% quality
- **Fallback**: PNG at 80% quality
- **Original**: Keep as fallback for maximum compatibility

### For Logos and Icons
Single size optimization:
- **WebP**: 85% quality
- **PNG**: 80% quality, optimized compression

## File Naming Convention
```
original-name-mobile.webp      # WebP mobile variant
original-name-mobile.png       # PNG mobile fallback
original-name-tablet.webp      # WebP tablet variant
original-name-tablet.png       # PNG tablet fallback
original-name-desktop.webp     # WebP desktop variant
original-name-desktop.png      # PNG desktop fallback
original-name.webp            # Single-size WebP (logos)
original-name-optimized.png   # Single-size optimized PNG
```

## HTML Implementation

### Responsive Images
```html
<picture>
    <source
        srcset="photos/path/image-mobile.webp 640w,
                photos/path/image-tablet.webp 1024w,
                photos/path/image-desktop.webp 1920w"
        sizes="(max-width: 640px) 640px,
               (max-width: 1024px) 1024px,
               1920px"
        type="image/webp">
    <source
        srcset="photos/path/image-mobile.png 640w,
                photos/path/image-tablet.png 1024w,
                photos/path/image-desktop.png 1920w"
        sizes="(max-width: 640px) 640px,
               (max-width: 1024px) 1024px,
               1920px"
        type="image/png">
    <img src="photos/path/image.png"
         alt="Descriptive alt text"
         loading="lazy"
         width="original-width"
         height="original-height">
</picture>
```

### Single-Size Images (Logos)
```html
<picture>
    <source srcset="photos/path/logo.webp" type="image/webp">
    <source srcset="photos/path/logo-optimized.png" type="image/png">
    <img src="photos/path/logo.png"
         alt="Descriptive alt text"
         width="width"
         height="height">
</picture>
```

## Optimization Tools

### Recommended Tools
1. **Squoosh** (https://squoosh.app) - Web-based, visual comparison
2. **ImageOptim** (Mac) - Drag-and-drop batch optimization
3. **TinyPNG** (https://tinypng.com) - Web-based compression

### Batch Processing Script
Use the provided `optimize-images.js` script for consistent optimization:
```bash
node optimize-images.js
```

## Performance Targets
- **WebP compression**: 70-85% size reduction vs original PNG
- **PNG optimization**: 20-50% size reduction vs original
- **Mobile variants**: 30-60KB target size
- **Tablet variants**: 60-150KB target size
- **Load time improvement**: 50-80% faster on mobile networks

## Quality Guidelines
- **WebP quality**: 85% (visually identical to original)
- **PNG quality**: 80% (minimal visual difference)
- **Responsive breakpoints**: 640px, 1024px, 1920px
- **Aspect ratio**: Maintain original proportions

## Browser Support
- **WebP support**: 95%+ of modern browsers
- **Picture element**: 97%+ of modern browsers
- **Fallback behavior**: Automatic via picture element

## Testing Checklist
When adding new images:
- [ ] Create responsive variants (mobile, tablet, desktop)
- [ ] Generate WebP and PNG formats
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify fallback behavior (disable WebP in browser)
- [ ] Check responsive behavior across devices
- [ ] Validate HTML markup
- [ ] Test page load performance

## Common Issues and Solutions

### Issue: Images not loading
**Solution**: Check file paths and ensure all variants exist

### Issue: Wrong image size on device
**Solution**: Verify srcset and sizes attributes match intended breakpoints

### Issue: WebP not working
**Solution**: Check server MIME type configuration for .webp files

### Issue: Layout shift (CLS)
**Solution**: Always include width and height attributes on img tags

## Maintenance
- Run optimization script when adding new images
- Monitor Core Web Vitals in production
- Update this guide as needed
- Keep backup of original images

## Performance Monitoring
The website includes automatic performance measurement that tracks:
- Image load times
- WebP vs PNG usage
- Responsive image loading
- Core Web Vitals (LCP, FID, CLS)

Check browser console for performance reports after page load.