# SEO Enhancement Plan - ClinicIQ Website

**Generated**: 2026-03-30
**Source**: Siteimprove SEO Audit Report (56 action recommendations)
**Status**: Planning Phase

---

## Executive Summary

The Siteimprove audit identified **56 SEO action recommendations** across multiple categories. This plan prioritizes and structures the implementation of these fixes using a phased approach.

### Current Site Health
- **Overall Health Score**: Needs improvement
- **Critical Issues**: Page load speed, mobile usability
- **High Priority**: Title tags, meta descriptions, content, Open Graph tags
- **Medium Priority**: Alt text, heading hierarchy, structured data, broken links

---

## Priority Framework

| Priority | Description | Count | Examples |
|----------|-------------|-------|----------|
| **1 - Critical** | Affects core functionality & user experience | 8 | Mobile usability, page speed |
| **2 - High** | Direct SEO impact, search visibility | 24 | Meta tags, content, OG tags |
| **3 - Medium** | Best practices, accessibility | 24 | Alt text, headings, links |

---

## Phase 1: Critical Fixes (Priority 1)

### 1.1 Mobile Usability
**Issue**: Elements too close together, viewport problems, unreadable text
**Impact**: Mobile traffic penalty, poor user experience
**Solution**:
- Adjust touch target sizes (minimum 48x48px)
- Fix viewport configuration
- Increase font sizes on mobile
- Test on actual devices

**Files**: `styles.css`, `index.html`, `about.html`, `contact.html`, etc.

### 1.2 Page Load Speed
**Issue**: Slow LCP, unoptimized images, render-blocking resources
**Impact**: Rankings, user experience, bounce rate
**Solution**:
- Further image optimization (already partially done)
- Minimize CSS/JS
- Defer non-critical JavaScript
- Leverage browser caching (already configured)

**Files**: `styles.css`, `script.js`, `*.html`

### 1.3 Core Web Vitals
**Issue**: LCP, FID, CLS issues
**Impact**: Google ranking factor
**Solution**:
- Optimize largest contentful paint
- Reduce input delay
- Prevent layout shift

---

## Phase 2: High Priority SEO (Priority 2)

### 2.1 Title Tags & Meta Descriptions
**Issue**: Missing or non-optimized titles and descriptions
**Impact**: Search result CTR, rankings
**Solution**:
- Add unique, keyword-rich title tags (50-60 chars)
- Add compelling meta descriptions (150-160 chars)
- Include location modifiers (Australia/Cairns)
- Ensure each page has unique tags

**Templates**:
```html
<title>[Page Name] | ClinicIQ Solutions - Business Automation</title>
<meta name="description" content="[Unique description with keywords]">
```

**Files**: All `*.html` files

### 2.2 Content Optimization
**Issue**: Thin content, duplicate content, missing H1 tags
**Impact**: Search visibility, authority
**Solution**:
- Add substantive content to thin pages (300+ words)
- Ensure unique H1 tags per page
- Remove duplicate content
- Add keyword-rich content

**Files**: All `*.html` files

### 2.3 Open Graph Tags
**Issue**: Missing OG tags for social sharing
**Impact**: Social media presentation
**Solution**:
- Add og:title, og:description, og:image
- Add twitter:card tags
- Ensure proper image dimensions (1200x630px)

**Template**:
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://cliniciq.com.au/photos/og-image.jpg">
<meta property="og:url" content="https://cliniciq.com.au/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

**Files**: All `*.html` files

---

## Phase 3: Medium Priority (Priority 3)

### 3.1 Image Alt Text
**Issue**: Missing or poor alt text
**Impact**: Accessibility, image search
**Solution**:
- Add descriptive alt text to all images
- Include keywords where relevant
- Use empty alt for decorative images

**Files**: All `*.html` files with `<img>` tags

### 3.2 Heading Hierarchy
**Issue**: Skipped headings, multiple H1s
**Impact**: Content structure, accessibility
**Solution**:
- Single H1 per page
- Logical heading order (H1 → H2 → H3)
- No skipped levels

**Files**: All `*.html` files

### 3.3 Structured Data (Schema.org)
**Issue**: Missing structured data
**Impact**: Rich snippets, knowledge graph
**Solution**:
- Add LocalBusiness schema
- Add Organization schema
- Add WebSite schema
- Add Article schema for blog

**Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ClinicIQ Solutions",
  "description": "...",
  "url": "https://cliniciq.com.au",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cairns",
    "addressRegion": "QLD",
    "addressCountry": "AU"
  }
}
```

**Files**: `index.html`, `contact.html`, `blog/*.html`

### 3.4 Broken Links
**Issue**: 1 broken link identified
**Impact**: User experience, crawl budget
**Solution**:
- Fix or remove broken links
- Add 404 page
- Implement redirects for moved content

---

## Phase 4: Technical SEO Foundation

### 4.1 Robots.txt
**Status**: Need to verify/modify
**Purpose**: Control crawler access

### 4.2 Sitemap.xml
**Status**: Need to create
**Purpose**: Help search engines discover pages

### 4.3 Canonical Tags
**Status**: Need to add
**Purpose**: Prevent duplicate content issues

---

## Implementation Strategy

### GSD Phase Structure
1. **Research Phase**: Analyze current state, document all issues
2. **Phase 1**: Critical fixes (mobile, speed, CWV)
3. **Phase 2**: High priority SEO (meta tags, content, OG)
4. **Phase 3**: Medium priority (alt text, headings, schema)
5. **Phase 4**: Technical foundation (sitemap, robots, canonical)

### Skills to Utilize
- **seo-audit**: For detailed analysis
- **frontend-design**: For mobile/UX fixes
- **superpowers:writing-skills**: For content creation
- **superpowers:systematic-debugging**: For technical issues

---

## Quick Wins (Immediate Action)

1. Add Open Graph tags to all pages (30 min)
2. Add missing alt text to key images (1 hour)
3. Fix title tags and meta descriptions (2 hours)
4. Fix broken link (5 min)
5. Add canonical tags (30 min)

---

## Metrics to Track

- Google Search Console impressions/clicks
- Position tracking for target keywords
- Core Web Vitals (LCP, FID, CLS)
- Mobile usability report
- Page speed scores
- Organic traffic

---

## Success Criteria

- [ ] All Critical (Priority 1) issues resolved
- [ ] 80%+ of High (Priority 2) issues resolved
- [ ] 60%+ of Medium (Priority 3) issues resolved
- [ ] Core Web Vitals in "Good" range
- [ ] Mobile usability at 100%
- [ ] All pages have unique title/meta descriptions
- [ ] All images have alt text
- [ ] Structured data implemented
- [ ] Sitemap submitted to GSC

---

*This plan will be executed using GSD for staging implementation*
