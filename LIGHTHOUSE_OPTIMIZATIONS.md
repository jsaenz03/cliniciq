# Lighthouse Performance Optimizations

## Current Application State (as of commit 5c925e2)

### Performance Optimizations Applied

#### 1. Font Loading (Async + Preload)
**Location**: `index.html` lines 13-25
**Strategy**: Asynchronous font loading to prevent render-blocking
```html
<!-- Preload for early DNS resolution -->
<link rel="preload" href="https://fonts.googleapis.com/..." as="style" crossorigin>
<!-- Load with print media, then switch to all on load -->
<link rel="stylesheet" href="https://fonts.googleapis.com/..." media="print" onload="this.media='all'">
<!-- Fallback for no-JS -->
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/..."></noscript>
```
**Impact**: Eliminates render-blocking font requests

#### 2. Critical Resource Preloading
**Location**: `index.html` lines 27-48
**Resources Preloaded**:
- Critical CSS (`styles.css`)
- Hero images (responsive, media-query based):
  - Mobile: `top-mobile.webp` (max-width: 640px)
  - Tablet: `top-tablet.webp` (641px-1024px)
  - Desktop: `top.png` (min-width: 1025px)

**Strategy**: `fetchpriority="high"` on LCP images
**Impact**: Faster Largest Contentful Paint (LCP)

#### 3. Logo Optimization
**Previous State** (before 5c925e2):
- Used `<picture>` element with multiple image formats
- Required image download in critical path

**Current State** (after 5c925e2):
- Text-based CSS logo using `<span>` elements
- Zero image requests, instant rendering
- Location: `index.html` lines 64-71
```html
<span class="logo-text">
    <span class="logo-text-main">Clinic<span class="logo-text-highlight">IQ</span></span>
    <span class="logo-text-tagline">Solutions</span>
</span>
```

**Styling**: `styles.css` lines [to be documented]
**Impact**: Eliminates logo image request from critical path

#### 4. Responsive Image Sizing
**Location**: Throughout `index.html`
**Strategy**: Accurate `sizes` attribute for better responsive image selection

**Examples**:
- Hero images: `sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 460px"`
- Service images: `sizes="(max-width: 640px) 90vw, (max-width: 1024px) 42vw, 360px"`

**Impact**: Browser downloads appropriately-sized images, reducing bandwidth

#### 5. Explicit Image Dimensions
**Location**: All `<img>` tags throughout `index.html`
**Strategy**: Added `width` and `height` attributes to all images

**Examples**:
- Sponsor images: `width="153" height="36"`
- Hero image: `width="1024" height="1024"`
- Service images: `width="1024" height="1024"`

**Impact**: Prevents Cumulative Layout Shift (CLS), improves visual stability

#### 6. Image Loading Strategy
**Hero Image** (LCP candidate):
- `loading="eager"` - Load immediately
- `decoding="async"` - Decode off main thread
- `fetchpriority="high"` - Prioritize download

**Other Images**:
- `loading="lazy"` - Defer until near viewport

#### 7. Chatbot Code Splitting
**Location**: Extracted to `chatbot.js`
**Previous**: Inline in `script.js` (large bundle)
**Current**: Separate file, lazy-loaded when needed
**Impact**: Reduces initial JavaScript bundle size

#### 8. Picture Element Pattern
**Consistent pattern for all images**:
```html
<picture>
    <!-- WebP sources with responsive srcset -->
    <source srcset="..." sizes="..." type="image/webp">
    <!-- PNG fallback with responsive srcset -->
    <source srcset="..." sizes="..." type="image/png">
    <!-- Fallback img with attributes -->
    <img src="..." srcset="..." sizes="..." alt="..."
         loading="lazy" width="X" height="Y">
</picture>
```

## Performance Metrics (Expected)

Based on these optimizations:

- **LCP**: < 2.5s (hero image preloaded, high priority)
- **CLS**: < 0.1 (all images have dimensions)
- **FCP**: < 1.8s (fonts async, CSS preloaded)
- **TTI**: < 3.8s (deferred JavaScript, code splitting)

## Critical Rules for Future Changes

### ✅ DO
1. Keep fonts loading asynchronously with preload + print media trick
2. Preload LCP images with `fetchpriority="high"`
3. Use explicit width/height on all images
4. Use accurate `sizes` attributes for responsive images
5. Use `<picture>` with WebP + fallback formats
6. Keep critical CSS preloaded
7. Lazy-load below-the-fold images
8. Maintain code splitting for non-critical JavaScript

### ❌ DON'T
1. Add synchronous font loading (blocks render)
2. Remove image dimensions (causes CLS)
3. Preload non-critical resources (wastes bandwidth)
4. Load large images at full resolution on mobile
5. Add render-blocking scripts in `<head>`
6. Remove lazy loading from below-the-fold images
7. Inline large JavaScript in HTML (bloats document)

## Logo Change Implementation Guide

When changing logo from text to image:

1. **Use WebP format** for smaller file size
2. **Don't preload** the logo (it's not the LCP element)
3. **Use explicit dimensions** to prevent CLS
4. **Consider lazy loading** if logo is not above-the-fold
5. **Keep it simple** - single image, no complex responsive logic needed
6. **Optimize the image** - compress to smallest possible size
7. **Use appropriate sizing** - logo doesn't need to be 1024x1024

### Recommended Logo Implementation
```html
<div class="nav-logo">
    <a href="#home" class="logo-link" aria-label="ClinicIQ Solutions">
        <img src="photos/branding/cliniciq-logo.webp"
             alt="ClinicIQ Solutions"
             class="logo-image"
             width="[actual-width]"
             height="[actual-height]"
             loading="eager">
    </a>
</div>
```

**Rationale**:
- Single WebP image (modern, small file size)
- No `<picture>` needed (logo doesn't need responsive versions)
- `loading="eager"` since it's in navbar (above fold)
- Explicit dimensions prevent layout shift
- Simple, maintainable, performant

---

**Last Updated**: 2025-11-07
**Commit Reference**: 5c925e2dfa343fc098dd186dc29a7bd655ab5a9f
