---
phase: quick
plan: 4
type: execute
wave: 1
depends_on: []
files_modified: []
autonomous: true

must_haves:
  truths:
    - "Blog posts stored in database/CMS, not static HTML files"
    - "New posts publish without code deployment"
    - "Consistent formatting via templates"
    - "Maintains LCP < 2.5s and CLS 0.0"
    - "Works with Netlify static hosting"
  artifacts:
    - path: ".planning/quick/4-design-database-driven-blog-system-with-/architecture.md"
      provides: "System architecture document"
    - path: ".planning/quick/4-design-database-driven-blog-system-with-/cms-comparison.md"
      provides: "CMS option comparison"
    - path: ".planning/quick/4-design-database-driven-blog-system-with-/implementation-roadmap.md"
      provides: "Phased implementation plan"
  key_links:
    - from: "Current static HTML blog"
      to: "Database/CMS solution"
      via: "API or build-time fetch"
---

<objective>
Design a database-driven blog architecture that eliminates the need for code deployments when publishing new posts, while maintaining the current static hosting on Netlify and preserving all Lighthouse performance optimizations.

Purpose: Enable content publishing without developer involvement or site redeployment
Output: Architecture document, CMS comparison, and implementation roadmap
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/gp-clinic-automation-2026.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/_headers
@/Users/jsaenz-macbook/recreatesite/cliniciq/netlify.toml

## Current State
- Static HTML blog posts in `blog/` subdirectory
- Blog listing page at `blog.html` (root)
- 3 existing posts with consistent structure
- Netlify static hosting with aggressive caching
- Lighthouse optimized: LCP < 2.5s, CLS 0.0
- No build step (vanilla HTML/CSS/JS)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Research and document CMS options for static hosting</name>
  <files>.planning/quick/4-design-database-driven-blog-system-with-/cms-comparison.md</files>
  <action>
Evaluate 3 CMS approaches compatible with Netlify static hosting:

1. **Headless CMS with Build Hooks (e.g., Sanity, Contentful, Strapi)**
   - Content stored in CMS, fetched at build time
   - Build hook triggers on publish → Netlify rebuilds
   - Pros: Full control, SEO-friendly static output
   - Cons: Build time delay (1-3 min), build minutes cost

2. **Git-based CMS (e.g., Decap CMS, Netlify CMS)**
   - Content stored as Markdown in Git repo
   - CMS UI writes to Git → triggers Netlify build
   - Pros: Version control, no database costs, free
   - Cons: Build time delay, Git learning curve

3. **Client-side Rendering with API (e.g., Supabase, Firebase)**
   - Content fetched via JavaScript at runtime
   - No build step required for new posts
   - Pros: Instant publishing, dynamic content
   - Cons: SEO challenges (requires SSR or prerendering), slower initial load

Document comparison with these criteria:
- Setup complexity (1-5)
- Ongoing costs (free/low/moderate/high)
- Publishing speed (instant/build-time)
- SEO impact (none/moderate/high)
- Performance impact on LCP/CLS
- Maintenance burden (low/medium/high)

Recommendation: Git-based CMS (Decap CMS) for this use case because:
- Free (no ongoing costs)
- Fits existing Git/Netlify workflow
- Maintains static site benefits (SEO, performance)
- Simple editorial interface
- Build time acceptable for blog publishing frequency
  </action>
  <verify>cms-comparison.md exists with detailed comparison table and recommendation</verify>
  <done>Document contains evaluation of 3+ CMS options with scoring matrix and clear recommendation</done>
</task>

<task type="auto">
  <name>Task 2: Design system architecture</name>
  <files>.planning/quick/4-design-database-driven-blog-system-with-/architecture.md</files>
  <action>
Design complete architecture for Git-based CMS solution (Decap CMS):

**Content Model:**
```yaml
BlogPost:
  fields:
    - title: string (required)
    - slug: string (auto-generated from title)
    - date: datetime (required)
    - category: enum [Automation, Practice Management, ROI & Finance, Technology]
    - excerpt: text (required, max 200 chars)
    - featured_image: image (optional)
    - author: string (default: "ClinicIQ Solutions")
    - tags: list of strings
    - content: markdown (required, rich text)
    - seo_title: string (optional, overrides title)
    - seo_description: text (optional, overrides excerpt)
    - published: boolean (default: false)
```

**File Structure:**
```
/Users/jsaenz/cliniciqrevis/
├── content/
│   └── blog/
│       ├── 5-ways-to-automate-your-gp-clinic-2026.md
│       ├── understanding-swpe-guide.md
│       └── healthcare-automation-roi.md
├── static/
│   └── blog-images/
│       └── [uploaded images]
├── admin/
│   └── index.html          # Decap CMS interface
├── netlify/functions/
│   └── build-trigger.js    # Optional: custom build logic
├── templates/
│   └── blog-post.html      # Template for post generation
└── scripts/
    └── build-blog.js       # Build-time script to generate HTML
```

**Build Process:**
1. Decap CMS writes Markdown to `content/blog/`
2. Git commit triggers Netlify build
3. `scripts/build-blog.js` runs:
   - Parse all Markdown files
   - Generate static HTML for each post
   - Update `blog.html` listing page
   - Generate RSS feed
   - Update sitemap.xml
4. Netlify deploys updated site

**Performance Preservation:**
- Generated HTML maintains same structure as current
- All image optimizations preserved (WebP, lazy loading, explicit dimensions)
- Critical CSS preloading unchanged
- No JavaScript dependency for rendering posts
- Build-time generation = static output = same performance

**Migration Strategy:**
- Convert existing 3 HTML posts to Markdown
- Extract content, preserve frontmatter metadata
- Maintain existing URLs (slug matching)
- Redirect old HTML paths if needed

**Editor Experience:**
- Decap CMS at `/admin/` path
- Rich text editor for content
- Image upload with automatic optimization
- Preview mode before publishing
- Editorial workflow (draft → review → publish)
  </action>
  <verify>architecture.md exists with content model, file structure, build process, and migration strategy</verify>
  <done>Architecture document provides complete technical specification for implementation</done>
</task>

<task type="auto">
  <name>Task 3: Create phased implementation roadmap</name>
  <files>.planning/quick/4-design-database-driven-blog-system-with-/implementation-roadmap.md</files>
  <action>
Create implementation roadmap with 3 phases:

**Phase 1: Foundation (Week 1)**
- Install and configure Decap CMS
- Set up content collection schema
- Create admin interface at `/admin/`
- Configure Git backend (GitHub/GitLab)
- Set up OAuth for CMS authentication
- Test CMS write → Git → Netlify build flow

**Phase 2: Content Migration & Templates (Week 2)**
- Create blog post HTML template
- Write build script (`scripts/build-blog.js`):
  - Parse Markdown frontmatter
  - Convert Markdown to HTML
  - Apply template with site styling
  - Generate individual post pages
- Migrate existing 3 posts to Markdown
- Update `blog.html` to auto-generate listing
- Generate RSS feed (`/rss.xml`)
- Update sitemap.xml with blog posts

**Phase 3: Polish & Launch (Week 3)**
- Image upload and optimization pipeline
- CMS preview mode configuration
- Editor training documentation
- URL redirect rules (if slug changes)
- Performance testing (verify LCP < 2.5s)
- SEO validation (structured data, meta tags)
- Go-live: publish first post via CMS

**Technical Decisions Documented:**
- Decap CMS vs alternatives (justified)
- Markdown parser choice (e.g., marked, gray-matter)
- Build script language (Node.js for Netlify compatibility)
- Image handling (store in repo vs external CDN)
- URL structure (`/blog/{slug}/` vs `/blog/{slug}.html`)

**Risk Mitigation:**
- Keep existing HTML files until migration verified
- Staging environment for testing builds
- Rollback plan (revert Git commit)
- Backup of original content

**Success Metrics:**
- Publish new post in < 5 minutes (CMS → live)
- Build time < 2 minutes
- LCP maintained < 2.5s
- Zero broken URLs
- Editor can use without developer help
  </action>
  <verify>implementation-roadmap.md exists with 3-phase plan, technical decisions, and success metrics</verify>
  <done>Roadmap provides clear, actionable steps for implementation with timeline and milestones</done>
</task>

</tasks>

<verification>
- [ ] cms-comparison.md evaluates 3+ options with recommendation
- [ ] architecture.md defines content model and build process
- [ ] implementation-roadmap.md provides phased plan
- [ ] All documents stored in `.planning/quick/4-design-database-driven-blog-system-with-/`
</verification>

<success_criteria>
Complete design package delivered:
1. CMS comparison with justified recommendation (Decap CMS)
2. System architecture with content model and file structure
3. 3-phase implementation roadmap with timeline
4. All performance requirements addressed (LCP < 2.5s, CLS 0.0)
5. Migration strategy for existing content
</success_criteria>

<output>
After completion, create `.planning/quick/4-design-database-driven-blog-system-with-/4-SUMMARY.md`
</output>
