# CMS Comparison for ClinicIQ Blog

**Date:** 2026-02-17
**Purpose:** Evaluate CMS options for database-driven blog on Netlify static hosting

---

## Executive Summary

After evaluating three CMS approaches compatible with Netlify static hosting, **Git-based CMS (Decap CMS)** is recommended for the ClinicIQ blog. It offers the best balance of cost (free), simplicity, and performance while maintaining all Lighthouse optimizations.

---

## Comparison Matrix

| Criteria | Headless CMS (Sanity/Contentful) | Git-based CMS (Decap CMS) | Client-side API (Supabase/Firebase) |
|----------|----------------------------------|---------------------------|-------------------------------------|
| **Setup Complexity** | 3/5 | 2/5 | 4/5 |
| **Ongoing Costs** | Low-Moderate | Free | Low-Moderate |
| **Publishing Speed** | 1-3 min (build time) | 1-3 min (build time) | Instant |
| **SEO Impact** | None (static output) | None (static output) | Moderate (requires SSR/prerendering) |
| **Performance Impact** | None | None | Moderate (slower initial load) |
| **Maintenance Burden** | Medium | Low | Medium |
| **Content Versioning** | Built-in | Git history | Limited |
| **Editor Experience** | Excellent | Good | N/A (custom UI needed) |

---

## Option 1: Headless CMS with Build Hooks

**Examples:** Sanity, Contentful, Strapi, Prismic

### How It Works
1. Content stored in cloud CMS database
2. Editor publishes via CMS interface
3. Build hook triggers Netlify build
4. Build process fetches content via API
5. Static HTML generated and deployed

### Pros
- **Professional editorial interface** with rich text editing
- **Media management** with automatic image optimization
- **Content relationships** and references between posts
- **Scheduling** future posts
- **Multi-user workflows** with roles/permissions
- **CDN for assets** included

### Cons
- **Monthly costs:** $99-300+/month for team features
- **Vendor lock-in:** Content trapped in proprietary system
- **API dependency:** Build fails if CMS is down
- **Rate limits:** API calls may be throttled
- **Complexity:** More moving parts to maintain

### Cost Analysis
| Service | Free Tier | Paid Tier | Notes |
|---------|-----------|-----------|-------|
| Sanity | 3 users, 10GB | $99/mo | Good developer experience |
| Contentful | 25k records | $489/mo | Enterprise-focused pricing |
| Strapi Cloud | Limited | $9/mo | Self-hostable alternative |

### Verdict
**Overkill for ClinicIQ's needs.** Excellent features but unnecessary cost and complexity for a small business blog with infrequent publishing.

---

## Option 2: Git-based CMS (Recommended)

**Primary Choice:** Decap CMS (formerly Netlify CMS)

### How It Works
1. Content stored as Markdown files in Git repository
2. Editor uses web interface at `/admin/`
3. CMS commits changes to Git
4. Git push triggers Netlify build
5. Static site regenerated with new content

### Pros
- **Completely free** - no ongoing costs
- **Version control** - full Git history of all changes
- **No vendor lock-in** - content is plain Markdown files
- **Simple setup** - single config file, no database
- **Works with existing workflow** - Git + Netlify already in use
- **Offline editing** - can edit Markdown directly if needed
- **Branch-based publishing** - draft posts on branches

### Cons
- **Build time delay** - 1-3 minutes between publish and live
- **Git learning curve** - editors need basic Git concepts
- **No scheduling** - requires external solution for future posts
- **Binary files in Git** - images committed to repository

### Cost Analysis
| Component | Cost |
|-----------|------|
| Decap CMS | Free (open source) |
| Git hosting | Free (GitHub/GitLab) |
| Netlify build minutes | Free tier: 300 min/mo |
| **Total** | **$0/month** |

### Build Time Estimation
- Current site: ~30-45 seconds build time
- With blog generation: ~45-60 seconds
- Well within Netlify free tier (300 min/month = ~300 builds)

### Verdict
**Best fit for ClinicIQ.** Zero cost, leverages existing infrastructure, maintains static site benefits, and provides sufficient features for blog publishing.

---

## Option 3: Client-side Rendering with API

**Examples:** Supabase, Firebase, Directus

### How It Works
1. Content stored in database/API
2. JavaScript fetches content at page load
3. Content rendered client-side
4. No build step required for new posts

### Pros
- **Instant publishing** - no build wait time
- **Dynamic content** - can show real-time data
- **User interactions** - comments, likes, etc.
- **Search functionality** - can query database directly

### Cons
- **SEO challenges** - search engines may not see content
  - Requires SSR (Server-Side Rendering) or prerendering
  - Netlify doesn't support Node.js SSR easily
- **Slower initial load** - content loads after page render
- **JavaScript dependency** - no content without JS
- **Complexity** - need custom frontend code
- **Performance impact** - hurts LCP metrics

### SEO Solutions
| Approach | Complexity | Effectiveness |
|----------|------------|---------------|
| Prerender.io | Low | Good |
| Netlify Prerendering | Low | Good |
| Custom SSR | High | Excellent |
| Dynamic Rendering | Medium | Good |

### Performance Impact
- **LCP increase:** +500ms to +2s depending on API speed
- **CLS risk:** Content shifts as it loads
- **TTFB improvement:** But overall slower perceived performance

### Verdict
**Not recommended for ClinicIQ.** The SEO and performance trade-offs outweigh the benefit of instant publishing. Build-time generation is fast enough for blog use case.

---

## Recommendation: Decap CMS

### Why Decap CMS is the Right Choice

1. **Zero Cost** - Fits small business budget perfectly
2. **Familiar Workflow** - Uses existing Git + Netlify setup
3. **Performance Preserved** - Static output maintains LCP < 2.5s
4. **Future-Proof** - Markdown files portable to any system
5. **Simple Enough** - Non-technical editors can publish
6. **Fast Enough** - 1-3 minute build time acceptable for blog

### When to Reconsider

Consider Headless CMS if:
- Team grows to 5+ content editors
- Need complex content relationships
- Require scheduled publishing
- Budget allows for $100+/month

Consider Client-side API if:
- Need real-time features (comments, live updates)
- Building web application, not content site
- SEO is not a priority

---

## Migration Path

### From Current Static HTML
1. Convert existing 3 posts to Markdown with frontmatter
2. Set up Decap CMS configuration
3. Create build script to generate HTML from Markdown
4. Deploy and test
5. Train content editors

### Estimated Effort
- **Setup:** 2-3 hours
- **Migration:** 2-3 hours
- **Testing:** 1-2 hours
- **Total:** 1 day of development work

---

## Conclusion

**Decap CMS provides the best value proposition for ClinicIQ:**
- Free forever
- Simple setup and maintenance
- Preserves all performance optimizations
- No vendor lock-in
- Sufficient for current and near-future needs

The 1-3 minute build delay is acceptable trade-off for blog publishing frequency and is offset by significant cost savings and simplicity.
