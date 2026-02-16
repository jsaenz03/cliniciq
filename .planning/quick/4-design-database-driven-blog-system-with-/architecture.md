# Blog System Architecture

**Date:** 2026-02-17
**CMS:** Decap CMS (Git-based)
**Hosting:** Netlify Static

---

## Overview

This document defines the complete technical architecture for migrating the ClinicIQ blog from static HTML files to a database-driven (Git-based Markdown) system using Decap CMS. The solution maintains all Lighthouse performance optimizations (LCP < 2.5s, CLS 0.0) while enabling content publishing without code deployments.

---

## Content Model

### BlogPost Collection Schema

```yaml
collection: blog
folder: content/blog
create: true
slug: '{{slug}}'

fields:
  - name: title
    label: Title
    widget: string
    required: true
    hint: "Main headline for the blog post"

  - name: slug
    label: URL Slug
    widget: string
    required: false
    pattern: ['^[a-z0-9-]+$', "Must be lowercase letters, numbers, and hyphens only"]
    hint: "Auto-generated from title if left blank"

  - name: date
    label: Publish Date
    widget: datetime
    required: true
    date_format: "YYYY-MM-DD"
    time_format: false

  - name: category
    label: Category
    widget: select
    required: true
    options:
      - Automation
      - Practice Management
      - ROI & Finance
      - Technology
    default: Automation

  - name: excerpt
    label: Excerpt
    widget: text
    required: true
    hint: "Brief summary for blog listing (max 200 characters)"

  - name: featured_image
    label: Featured Image
    widget: image
    required: false
    media_folder: /static/blog-images
    public_folder: /blog-images
    hint: "Main image for the post (recommended: 1200x630px)"

  - name: author
    label: Author
    widget: string
    required: false
    default: "ClinicIQ Solutions"

  - name: tags
    label: Tags
    widget: list
    required: false
    field: { name: tag, label: Tag, widget: string }
    hint: "Add relevant tags for filtering"

  - name: content
    label: Content
    widget: markdown
    required: true
    hint: "Main blog post content"

  - name: seo_title
    label: SEO Title
    widget: string
    required: false
    hint: "Override default title for search engines (max 60 chars)"

  - name: seo_description
    label: SEO Description
    widget: text
    required: false
    hint: "Override default excerpt for search engines (max 160 chars)"

  - name: published
    label: Published
    widget: boolean
    required: false
    default: false
    hint: "Only published posts appear on the site"
```

### Example Markdown Output

```markdown
---
title: "5 Ways to Automate Your GP Clinic in 2026"
slug: gp-clinic-automation-2026
date: 2026-02-01
category: Automation
excerpt: "Discover the top automation strategies that are transforming GP clinics across Australia. From AI-powered care plans to automated patient communications."
featured_image: /blog-images/automation-2026.webp
author: ClinicIQ Solutions
tags:
  - automation
  - ai
  - patient-care
seo_title: "5 Ways to Automate Your GP Clinic in 2026 | ClinicIQ"
seo_description: "Learn the top 5 automation strategies for GP clinics in 2026. Improve efficiency and patient care with these proven techniques."
published: true
---

## Introduction

Healthcare automation is transforming GP clinics across Australia...

## 1. Automated Appointment Reminders

[Content continues...]
```

---

## File Structure

```
/Users/jsaenz/cliniciqrevis/
├── content/
│   └── blog/                       # Markdown blog posts
│       ├── 5-ways-to-automate-your-gp-clinic-2026.md
│       ├── understanding-swpe-guide.md
│       └── healthcare-automation-roi.md
│
├── static/
│   └── blog-images/                # Uploaded blog images
│       ├── automation-2026.webp
│       ├── swpe-guide.webp
│       └── automation-roi.webp
│
├── admin/
│   ├── index.html                  # Decap CMS interface
│   └── config.yml                  # CMS configuration
│
├── netlify/functions/              # Serverless functions
│   └── build-trigger.js            # Optional: custom build logic
│
├── scripts/                        # Build scripts
│   └── build-blog.js               # Generates HTML from Markdown
│
├── templates/                      # HTML templates
│   └── blog-post.html              # Single post template
│
├── blog/                           # Generated HTML posts (output)
│   ├── gp-clinic-automation-2026.html
│   ├── understanding-swpe-guide.html
│   └── healthcare-automation-roi.html
│
├── blog.html                       # Generated listing page (output)
├── rss.xml                         # Generated RSS feed (output)
└── sitemap.xml                     # Generated sitemap (output)
```

---

## Build Process

### Build Pipeline Flow

```
┌─────────────────┐
│  Editor publishes│
│  via Decap CMS   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CMS commits    │
│  Markdown to Git│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Netlify detects│
│  Git push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Build script   │────▶│  Parse Markdown │
│  runs           │     │  (frontmatter +  │
└─────────────────┘     │  content)       │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Apply template │
                        │  with styling   │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Generate HTML  │
                        │  files          │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Update listing │
                        │  page (blog.html)│
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Generate RSS   │
                        │  & sitemap      │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Netlify deploys│
                        │  static site    │
                        └─────────────────┘
```

### Build Script Details (`scripts/build-blog.js`)

```javascript
// Pseudo-code for build script

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// 1. Read all Markdown files
const postsDir = './content/blog';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// 2. Parse each post
const posts = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const { data, content: markdown } = matter(content);
  return {
    ...data,
    html: marked.parse(markdown),
    slug: data.slug || slugify(data.title)
  };
}).filter(post => post.published)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// 3. Generate individual post pages
posts.forEach(post => {
  const html = renderTemplate('blog-post.html', { post });
  fs.writeFileSync(`./blog/${post.slug}.html`, html);
});

// 4. Generate listing page
const listingHtml = renderTemplate('blog-listing.html', { posts });
fs.writeFileSync('./blog.html', listingHtml);

// 5. Generate RSS feed
const rss = generateRSS(posts);
fs.writeFileSync('./rss.xml', rss);

// 6. Update sitemap
const sitemap = generateSitemap(posts);
fs.writeFileSync('./sitemap.xml', sitemap);
```

### Netlify Build Configuration

```toml
# netlify.toml additions

[build]
  command = "npm run build"
  publish = "."

[build.environment]
  NODE_VERSION = "20"

# Run blog build before main build
[[plugins]]
  package = "@netlify/plugin-local-install-core"
```

```json
// package.json additions
{
  "scripts": {
    "build": "node scripts/build-blog.js"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  }
}
```

---

## Performance Preservation

### Lighthouse Optimizations Maintained

| Optimization | Current | With CMS | Strategy |
|--------------|---------|----------|----------|
| **LCP < 2.5s** | 1.5-2.5s | 1.5-2.5s | Build-time generation = static HTML |
| **CLS 0.0** | Perfect | Perfect | Same HTML structure, explicit dimensions |
| **FCP < 1s** | <1s | <1s | Critical CSS preload unchanged |
| **Image optimization** | WebP, lazy loading | Same | Template preserves image attributes |
| **No render-blocking** | Deferred JS | Same | No JS required for content rendering |

### Template Requirements

The blog post template must preserve these critical optimizations:

```html
<!-- templates/blog-post.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Critical: Preload CSS -->
    <link rel="preload" href="../styles.css" as="style">

    <!-- Critical: Font loading (async) -->
    <link rel="preload" href="../fonts/fonts.css" as="style" crossorigin>
    <link rel="stylesheet" href="../fonts/fonts.css" media="print" onload="this.media='all'">

    <!-- SEO meta from frontmatter -->
    <title>{{seo_title || title}}</title>
    <meta name="description" content="{{seo_description || excerpt}}">

    <!-- Critical: Preload featured image if above fold -->
    {{#if featured_image}}
    <link rel="preload" href="{{featured_image}}" as="image" fetchpriority="high">
    {{/if}}
</head>
<body>
    <!-- Navigation (same as current) -->
    <nav class="navbar"...>

    <article class="blog-post">
        <!-- Critical: Explicit image dimensions -->
        {{#if featured_image}}
        <img src="{{featured_image}}"
             alt="{{title}}"
             width="1200"
             height="630"
             loading="eager"
             fetchpriority="high"
             decoding="async">
        {{/if}}

        <h1>{{title}}</h1>
        <div class="blog-meta">
            <time datetime="{{date}}">{{formatDate date}}</time>
            <span class="category">{{category}}</span>
        </div>

        <div class="blog-content">
            {{{html}}}
        </div>
    </article>

    <!-- Footer (same as current) -->
</body>
</html>
```

---

## Migration Strategy

### Existing Content Migration

Current 3 HTML posts need conversion to Markdown:

| Current File | New Markdown File | Slug |
|--------------|-------------------|------|
| `blog/gp-clinic-automation-2026.html` | `content/blog/5-ways-to-automate-your-gp-clinic-2026.md` | `gp-clinic-automation-2026` |
| `blog/understanding-swpe-guide.html` | `content/blog/understanding-swpe-guide.md` | `understanding-swpe-guide` |
| `blog/healthcare-automation-roi.html` | `content/blog/healthcare-automation-roi.md` | `healthcare-automation-roi` |

### Migration Steps

1. **Extract content from HTML**
   - Parse existing HTML files
   - Extract title, date, category, content
   - Convert HTML content to Markdown

2. **Create frontmatter**
   - Map existing metadata to new schema
   - Generate slugs from existing URLs
   - Set published: true

3. **Preserve URLs**
   - Maintain existing URL structure: `/blog/{slug}.html`
   - Add redirects if slug changes

4. **Image handling**
   - Move images to `static/blog-images/`
   - Update image paths in content
   - Convert to WebP if needed

### URL Redirect Strategy

If any URLs change, add to `_redirects`:

```
# Redirect old URLs to new slugs (if needed)
/blog/old-post-name.html  /blog/new-slug.html  301
```

---

## Editor Experience

### Decap CMS Interface

**Location:** `https://cliniciq.com.au/admin/`

**Features:**
- Rich text editor with Markdown support
- Image upload with drag-and-drop
- Preview mode before publishing
- Editorial workflow (draft → review → publish)
- Mobile-friendly interface

### Authentication

Options for CMS access:
1. **GitHub OAuth** (recommended) - Editors log in with GitHub
2. **Netlify Identity** - Email/password authentication
3. **Git Gateway** - Abstracts Git for non-technical users

### Editorial Workflow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Draft  │───▶│  Review │───▶│ Publish │───▶│   Live  │
│  (save) │    │ (preview)│   │ (commit)│    │ (build) │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

---

## Technical Decisions

### Markdown Parser: `marked`
- **Why:** Fast, widely used, good security record
- **Alternative:** `markdown-it` (more extensible)
- **Decision:** `marked` sufficient for blog content

### Frontmatter Parser: `gray-matter`
- **Why:** Industry standard, YAML support, battle-tested
- **No alternatives considered** - clear choice

### Build Script Language: Node.js
- **Why:** Native Netlify support, large ecosystem
- **Alternative:** Python (would require setup)
- **Decision:** Node.js for zero-config builds

### Image Storage: Git repository
- **Why:** Simple, versioned, free
- **Alternative:** External CDN (Cloudinary, etc.)
- **Decision:** Git for now, can migrate to CDN later if repo grows

### URL Structure: `/blog/{slug}.html`
- **Why:** Matches current structure, no redirects needed
- **Alternative:** `/blog/{slug}/index.html` (cleaner URLs)
- **Decision:** Keep `.html` extension for consistency

---

## Security Considerations

### Content Sanitization

```javascript
// Sanitize HTML output to prevent XSS
const DOMPurify = require('isomorphic-dompurify');
const cleanHtml = DOMPurify.sanitize(marked.parse(markdown));
```

### CMS Access Control

- GitHub OAuth with restricted repository access
- Branch protection on main branch
- Required reviews for CMS changes (optional)

### Build Security

- No server-side code execution (static output only)
- Dependencies pinned in package-lock.json
- Regular dependency updates via Dependabot

---

## Monitoring & Maintenance

### Build Monitoring

- Netlify build notifications (email/Slack)
- Build time tracking (should remain < 2 min)
- Failed build alerts

### Content Backup

- Git provides full version history
- Regular repository backups (GitHub already handles this)
- No database to backup

### Performance Monitoring

- Lighthouse CI for automated testing
- Netlify Analytics for traffic insights
- Regular manual Lighthouse audits

---

## Summary

This architecture provides:

1. **Zero ongoing costs** - Decap CMS + Netlify free tier
2. **Performance preservation** - Static HTML output, LCP < 2.5s
3. **Editor-friendly** - Web interface for non-technical users
4. **Future-proof** - Markdown files portable to any system
5. **Simple maintenance** - No database, no complex infrastructure
6. **Fast enough** - 1-3 minute publish time acceptable for blog

The build-time generation approach maintains all current Lighthouse optimizations while enabling content publishing without developer involvement.
