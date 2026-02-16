# Blog System Implementation Roadmap

**Date:** 2026-02-17
**Duration:** 3 Weeks
**CMS:** Decap CMS (Git-based)

---

## Overview

This roadmap provides a phased implementation plan for migrating the ClinicIQ blog from static HTML to a database-driven system using Decap CMS. Each phase includes specific tasks, deliverables, and success criteria.

---

## Phase 1: Foundation (Week 1)

**Goal:** Set up Decap CMS and establish the content workflow

### Tasks

#### Day 1-2: CMS Installation & Configuration

- [ ] **Install Decap CMS dependencies**
  ```bash
  npm install --save-dev decap-cms-app
  ```

- [ ] **Create admin interface** (`admin/index.html`)
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ClinicIQ Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
  </html>
  ```

- [ ] **Create CMS configuration** (`admin/config.yml`)
  - Define blog collection schema
  - Configure Git backend
  - Set up media folders
  - Configure editorial workflow

- [ ] **Set up Git backend**
  - Configure Git Gateway (via Netlify Identity) OR
  - Configure GitHub OAuth
  - Test authentication flow

#### Day 3-4: Build Pipeline Setup

- [ ] **Initialize Node.js project**
  ```bash
  npm init -y
  npm install gray-matter marked isomorphic-dompurify
  ```

- [ ] **Create build script** (`scripts/build-blog.js`)
  - Parse Markdown files with frontmatter
  - Generate static HTML for each post
  - Apply templates with site styling
  - Handle image optimization

- [ ] **Create blog post template** (`templates/blog-post.html`)
  - Preserve all Lighthouse optimizations
  - Include navigation and footer
  - Support featured images
  - SEO meta tags from frontmatter

- [ ] **Update Netlify configuration**
  ```toml
  [build]
    command = "node scripts/build-blog.js"
    publish = "."
  ```

#### Day 5: Testing & Validation

- [ ] **Test CMS write flow**
  - Create test post in CMS
  - Verify Git commit
  - Confirm Netlify build trigger
  - Check generated HTML output

- [ ] **Verify performance**
  - Run Lighthouse audit on generated page
  - Confirm LCP < 2.5s
  - Verify CLS = 0.0
  - Check image optimization

### Phase 1 Deliverables

| Deliverable | Location | Status |
|-------------|----------|--------|
| CMS interface | `/admin/` | Working |
| CMS config | `/admin/config.yml` | Complete |
| Build script | `/scripts/build-blog.js` | Functional |
| Post template | `/templates/blog-post.html` | Complete |
| Test post | `/content/blog/test-post.md` | Published |

### Phase 1 Success Criteria

- [ ] CMS accessible at `/admin/`
- [ ] Can create and publish post via CMS
- [ ] Build completes successfully
- [ ] Generated HTML maintains styling
- [ ] Lighthouse score 90+ maintained

---

## Phase 2: Content Migration & Templates (Week 2)

**Goal:** Migrate existing content and automate listing page generation

### Tasks

#### Day 1-2: Content Migration

- [ ] **Convert existing posts to Markdown**

  **Post 1:** `5-ways-to-automate-your-gp-clinic-2026.md`
  ```markdown
  ---
  title: "5 Ways to Automate Your GP Clinic in 2026"
  slug: gp-clinic-automation-2026
  date: 2026-02-01
  category: Automation
  excerpt: "Discover the top automation strategies that are transforming GP clinics across Australia. From AI-powered care plans to automated patient communications."
  author: ClinicIQ Solutions
  tags:
    - automation
    - ai
    - patient-care
  published: true
  ---

  ## Introduction

  Healthcare automation is transforming GP clinics across Australia...

  [Full content from existing HTML]
  ```

- [ ] **Migrate Post 2:** `understanding-swpe-guide.md`
  - Extract content from HTML
  - Create frontmatter with metadata
  - Convert HTML to Markdown

- [ ] **Migrate Post 3:** `healthcare-automation-roi.md`
  - Extract content from HTML
  - Create frontmatter with metadata
  - Convert HTML to Markdown

- [ ] **Verify URL preservation**
  - Ensure slugs match existing URLs
  - Test redirects if needed

#### Day 3-4: Listing Page Automation

- [ ] **Update build script for listing page**
  - Generate `blog.html` dynamically
  - Sort posts by date (newest first)
  - Include pagination (if needed)
  - Preserve current styling

- [ ] **Create blog listing template**
  - Grid layout matching current design
  - Featured images support
  - Category filtering (future enhancement)
  - Responsive design

- [ ] **Add RSS feed generation**
  ```javascript
  // Generate rss.xml
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>ClinicIQ Healthcare Automation Blog</title>
      <link>https://cliniciq.com.au/blog.html</link>
      <description>Expert insights on GP clinic automation</description>
      ${posts.map(post => `
        <item>
          <title>${post.title}</title>
          <link>https://cliniciq.com.au/blog/${post.slug}.html</link>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${post.excerpt}</description>
        </item>
      `).join('')}
    </channel>
  </rss>`;
  ```

- [ ] **Update sitemap generation**
  - Include all blog posts in sitemap.xml
  - Set proper lastmod dates
  - Set priority and changefreq

#### Day 5: Testing & Refinement

- [ ] **Cross-browser testing**
  - Chrome, Firefox, Safari, Edge
  - Mobile responsiveness
  - Tablet layouts

- [ ] **Performance validation**
  - Lighthouse audit on all pages
  - Verify image loading
  - Check Core Web Vitals

- [ ] **Content accuracy check**
  - Compare migrated content to originals
  - Verify formatting preserved
  - Check all links working

### Phase 2 Deliverables

| Deliverable | Location | Status |
|-------------|----------|--------|
| Migrated posts | `/content/blog/*.md` | 3 posts |
| Auto-generated listing | `/blog.html` | Dynamic |
| RSS feed | `/rss.xml` | Generated |
| Updated sitemap | `/sitemap.xml` | Complete |

### Phase 2 Success Criteria

- [ ] All 3 existing posts migrated successfully
- [ ] URLs preserved (no broken links)
- [ ] Blog listing page auto-updates
- [ ] RSS feed validates (rssboard.org)
- [ ] Lighthouse score maintained 90+

---

## Phase 3: Polish & Launch (Week 3)

**Goal:** Production-ready system with editor training

### Tasks

#### Day 1-2: Image Handling & Optimization

- [ ] **Set up image upload in CMS**
  - Configure media library
  - Set upload folder: `static/blog-images/`
  - Test drag-and-drop upload

- [ ] **Implement image optimization pipeline**
  - Convert uploads to WebP
  - Generate responsive sizes
  - Add lazy loading attributes
  ```javascript
  // Sharp.js for image processing
  const sharp = require('sharp');

  async function optimizeImage(inputPath, outputPath) {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .resize(1200, null, { withoutEnlargement: true })
      .toFile(outputPath);
  }
  ```

- [ ] **Add image CDN support (optional)**
  - Configure Netlify Large Media OR
  - Set up Cloudinary integration
  - Document image best practices

#### Day 3: CMS Preview & Workflow

- [ ] **Configure preview mode**
  - Set up preview URL in CMS config
  - Create preview template
  - Test live preview while editing

- [ ] **Set up editorial workflow (optional)**
  - Enable editorial workflow in CMS
  - Configure draft → review → publish states
  - Test workflow with sample post

- [ ] **Add CMS customization**
  - Custom preview styles
  - Editor hints and help text
  - Custom widgets if needed

#### Day 4: Documentation & Training

- [ ] **Create editor guide** (`docs/blog-editor-guide.md`)
  ```markdown
  # Blog Editor Guide

  ## Accessing the CMS
  1. Go to https://cliniciq.com.au/admin/
  2. Log in with your GitHub account
  3. Click on "Blog" in the left sidebar

  ## Creating a New Post
  1. Click "New Blog Post"
  2. Fill in required fields (marked with *)
  3. Write content in the editor
  4. Upload featured image (optional)
  5. Click "Publish" to go live

  ## Best Practices
  - Use descriptive titles (60 chars max)
  - Write excerpts under 200 characters
  - Upload images as WebP format
  - Use headings to structure content
  - Preview before publishing
  ```

- [ ] **Create technical documentation**
  - Build process explanation
  - Troubleshooting guide
  - Backup and restore procedures

- [ ] **Train content editors**
  - Walkthrough of CMS interface
  - Practice creating a post
  - Q&A session

#### Day 5: Launch & Monitoring

- [ ] **Pre-launch checklist**
  - [ ] All existing content migrated
  - [ ] URLs tested and working
  - [ ] Lighthouse score verified
  - [ ] Editor guide complete
  - [ ] Backup of original files

- [ ] **Go-live deployment**
  - Merge changes to main branch
  - Monitor first build
  - Verify all pages live
  - Test CMS on production

- [ ] **Publish first CMS post**
  - Create new post via CMS
  - Verify build triggers
  - Confirm post is live
  - Share with team

- [ ] **Set up monitoring**
  - Netlify build notifications
  - Lighthouse CI (optional)
  - Google Search Console

### Phase 3 Deliverables

| Deliverable | Location | Status |
|-------------|----------|--------|
| Image optimization | Build pipeline | Working |
| CMS preview mode | `/admin/config.yml` | Configured |
| Editor guide | `/docs/blog-editor-guide.md` | Complete |
| First CMS post | Live on site | Published |
| Monitoring setup | Netlify dashboard | Active |

### Phase 3 Success Criteria

- [ ] Image upload and optimization working
- [ ] Editor can publish without developer help
- [ ] First post published via CMS successfully
- [ ] Build time < 2 minutes
- [ ] All success metrics met

---

## Technical Decisions Documented

### Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **CMS Platform** | Decap CMS | Free, Git-based, simple |
| **Auth Method** | GitHub OAuth | Secure, familiar to developers |
| **Build Language** | Node.js | Native Netlify support |
| **Markdown Parser** | `marked` | Fast, reliable |
| **Image Storage** | Git repository | Simple, versioned |
| **URL Structure** | `/blog/{slug}.html` | Matches current structure |
| **Editorial Workflow** | Simple publish | Complexity not needed |

### Alternatives Considered

| Decision | Alternatives | Why Rejected |
|----------|--------------|--------------|
| CMS | Sanity, Contentful | Cost ($100+/mo) |
| Auth | Netlify Identity | GitHub more familiar |
| Images | Cloudinary CDN | Added complexity |
| URLs | `/blog/{slug}/` | Would need redirects |

---

## Risk Mitigation

### Identified Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Build failures | Low | High | Test thoroughly in Phase 1 |
| URL changes break SEO | Low | High | Preserve existing slugs |
| Performance regression | Low | High | Lighthouse CI validation |
| Editors find CMS difficult | Medium | Medium | Training + documentation |
| Image bloat in repo | Medium | Low | Monitor repo size, migrate to CDN if needed |

### Rollback Plan

If critical issues arise:

1. **Immediate:** Revert Git commit to restore previous state
2. **Short-term:** Disable CMS, restore static HTML files
3. **Long-term:** Fix issues in development branch, re-deploy

### Backup Strategy

- Git history provides complete content backup
- Original HTML files kept in archive branch
- Netlify deploy history allows instant rollback

---

## Success Metrics

### Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Build Time** | < 2 minutes | Netlify build logs |
| **LCP** | < 2.5s | Lighthouse |
| **CLS** | 0.0 | Lighthouse |
| **Publish Time** | < 5 minutes | CMS click to live |

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Lighthouse Score** | 90+ | Lighthouse CI |
| **Zero Broken URLs** | 100% | Link checker |
| **Editor Satisfaction** | 4/5+ | Post-launch survey |

### Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Posts Published** | 1+ via CMS | First week |
| **Editor Independence** | 100% | No dev help needed |
| **Cost** | $0/month | Ongoing expenses |

---

## Timeline Summary

```
Week 1: Foundation
├── Day 1-2: CMS installation & config
├── Day 3-4: Build pipeline setup
└── Day 5: Testing & validation

Week 2: Migration & Templates
├── Day 1-2: Content migration (3 posts)
├── Day 3-4: Listing page automation
└── Day 5: Testing & refinement

Week 3: Polish & Launch
├── Day 1-2: Image handling & optimization
├── Day 3: CMS preview & workflow
├── Day 4: Documentation & training
└── Day 5: Launch & monitoring
```

---

## Post-Launch Enhancements (Future)

### Phase 4 Ideas (Not in scope)

- [ ] **Category filtering** on blog listing page
- [ ] **Search functionality** for blog posts
- [ ] **Related posts** suggestions
- [ ] **Social sharing** optimization
- [ ] **Newsletter signup** integration
- [ ] **Comments system** (if needed)
- [ ] **Analytics dashboard** for editors

---

## Conclusion

This 3-week roadmap delivers a production-ready, database-driven blog system that:

1. **Eliminates code deployments** for content publishing
2. **Maintains all performance optimizations** (LCP < 2.5s, CLS 0.0)
3. **Costs $0/month** in ongoing expenses
4. **Enables editor independence** without developer involvement
5. **Preserves existing content** and URLs

The phased approach minimizes risk while ensuring each component is thoroughly tested before moving to the next phase.
