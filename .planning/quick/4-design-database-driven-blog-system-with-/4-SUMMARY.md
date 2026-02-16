---
phase: quick
plan: 4
subsystem: blog
status: complete
tags: [cms, decap, architecture, design]

requires: []
provides: [cms-comparison, architecture-spec, implementation-roadmap]
affects: [blog-system, content-workflow]

tech-stack:
  added: [decap-cms, gray-matter, marked]
  patterns: [git-based-cms, build-time-generation, static-site]

key-files:
  created:
    - .planning/quick/4-design-database-driven-blog-system-with-/cms-comparison.md
    - .planning/quick/4-design-database-driven-blog-system-with-/architecture.md
    - .planning/quick/4-design-database-driven-blog-system-with-/implementation-roadmap.md
  modified: []

decisions:
  - "Selected Decap CMS (Git-based) over Headless or Client-side API"
  - "Zero ongoing cost prioritized over instant publishing"
  - "Build-time generation preserves Lighthouse optimizations"
  - "Markdown files for content portability"

metrics:
  duration: "45 minutes"
  tasks-completed: 3
  files-created: 3
  estimated-implementation: "3 weeks"
---

# Quick Task 4: Design Database-Driven Blog System - Summary

## One-Liner
Designed a complete database-driven blog architecture using Decap CMS that eliminates code deployments for publishing while maintaining LCP < 2.5s and CLS 0.0 on Netlify static hosting.

## What Was Delivered

### 1. CMS Comparison Document (`cms-comparison.md`)
Evaluated 3 CMS approaches for Netlify static hosting:

| Approach | Cost | Publishing Speed | SEO Impact | Recommendation |
|----------|------|------------------|------------|----------------|
| Headless CMS (Sanity/Contentful) | $99-300/mo | 1-3 min (build) | None | Overkill |
| **Git-based CMS (Decap CMS)** | **Free** | **1-3 min** | **None** | **Selected** |
| Client-side API (Supabase) | Low-Moderate | Instant | Moderate | Not recommended |

**Key Finding:** Decap CMS provides the best value - zero cost, simple setup, no vendor lock-in, and acceptable 1-3 minute build time for blog publishing frequency.

### 2. System Architecture Document (`architecture.md`)
Complete technical specification including:

- **Content Model:** 12-field schema with validation (title, slug, date, category, excerpt, featured_image, author, tags, content, SEO fields, published status)
- **File Structure:** Organized directories for content, static assets, admin interface, build scripts, and templates
- **Build Pipeline:** Node.js script using `gray-matter` and `marked` to generate static HTML at build time
- **Performance Preservation:** All Lighthouse optimizations maintained (explicit image dimensions, critical CSS preload, no render-blocking JS)
- **Migration Strategy:** Convert existing 3 HTML posts to Markdown while preserving URLs

### 3. Implementation Roadmap (`implementation-roadmap.md`)
3-week phased plan:

**Week 1: Foundation**
- Install and configure Decap CMS
- Set up build pipeline with Node.js
- Create blog post template preserving Lighthouse optimizations
- Test CMS write → Git → Netlify build flow

**Week 2: Migration & Templates**
- Migrate 3 existing posts to Markdown
- Automate blog listing page generation
- Generate RSS feed and update sitemap
- Cross-browser testing and validation

**Week 3: Polish & Launch**
- Image upload and optimization pipeline
- CMS preview mode configuration
- Editor training documentation
- Production launch with monitoring

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CMS Platform | Decap CMS | Free, Git-based, no vendor lock-in |
| Build Language | Node.js | Native Netlify support |
| Content Format | Markdown | Portable, version-controlled |
| Image Storage | Git repository | Simple, can migrate to CDN later |
| URL Structure | `/blog/{slug}.html` | Matches current structure |
| Publishing Model | Build-time generation | Preserves static site benefits |

## Performance Impact

**Maintained Metrics:**
- LCP: < 2.5s (build-time generation = static HTML)
- CLS: 0.0 (explicit image dimensions preserved)
- FCP: < 1s (critical CSS preload unchanged)
- No JavaScript dependency for content rendering

**Build Time:**
- Current site: ~30-45 seconds
- With blog generation: ~45-60 seconds
- Well within Netlify free tier (300 min/month)

## Cost Analysis

| Component | Cost |
|-----------|------|
| Decap CMS | Free (open source) |
| Git hosting | Free (GitHub/GitLab) |
| Netlify build minutes | Free tier: 300 min/mo |
| **Total Monthly** | **$0** |

## Migration Path

Existing content migration:
- `blog/gp-clinic-automation-2026.html` → `content/blog/5-ways-to-automate-your-gp-clinic-2026.md`
- `blog/understanding-swpe-guide.html` → `content/blog/understanding-swpe-guide.md`
- `blog/healthcare-automation-roi.html` → `content/blog/healthcare-automation-roi.md`

All URLs preserved, no redirects needed.

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Publish Time | < 5 minutes | CMS click to live |
| Build Time | < 2 minutes | Netlify build logs |
| LCP | < 2.5s | Lighthouse |
| CLS | 0.0 | Lighthouse |
| Editor Independence | 100% | No dev help needed |

## Risk Mitigation

- **Build Failures:** Thorough testing in Phase 1
- **URL Changes:** Preserve existing slugs exactly
- **Performance Regression:** Lighthouse CI validation
- **Rollback Plan:** Revert Git commit to restore previous state
- **Backup:** Original HTML files kept in archive branch

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| Hash | Message | Files |
|------|---------|-------|
| 4ff15f9 | docs(quick-4): add CMS comparison document | cms-comparison.md |
| 2fb6cf9 | docs(quick-4): add system architecture | architecture.md |
| 4827555 | docs(quick-4): add 3-phase implementation roadmap | implementation-roadmap.md |

## Self-Check: PASSED

- [x] cms-comparison.md exists with 3+ options evaluated
- [x] architecture.md defines content model and build process
- [x] implementation-roadmap.md provides phased plan with timeline
- [x] All documents stored in `.planning/quick/4-design-database-driven-blog-system-with-/`
- [x] All commits verified with `git log`

## Next Steps

To implement this design:

1. **Start Phase 1** - Install Decap CMS and configure build pipeline
2. **Set up OAuth** - Configure GitHub authentication for CMS access
3. **Create templates** - Build blog post template preserving Lighthouse optimizations
4. **Migrate content** - Convert existing 3 posts to Markdown
5. **Train editors** - Walk through CMS interface and publishing workflow

The design is complete and ready for implementation.
