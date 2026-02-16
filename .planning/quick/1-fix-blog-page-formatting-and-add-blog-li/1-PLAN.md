# Quick Task 1: Fix Blog Formatting and Navigation

## Task Description
Fix blog page formatting to match site design and add blog links to main navigation on all HTML pages.

## Issues Found
1. Blog posts use external Unsplash images instead of site-consistent styling
2. Blog link missing from main navigation on: index.html, automations.html, calculators.html, downloads.html, websites.html, faq.html, glossary.html
3. Blog posts need proper hero sections and styling to match the luxury design

## Plan

### Task 1: Update styles.css with blog-specific styling
- Add `.blog-header-section` styling for consistent blog headers
- Add `.article-header` styling for blog post pages
- Add `.article-content` styling for blog post body
- Add `.article-hero-image` styling
- Add `.article-meta`, `.article-title`, `.article-excerpt` styling
- Add `.article-body` content styling (h2, p, ul, ol, .article-cta, .article-tags)
- Add `.related-articles` section styling

### Task 2: Update blog/index.html
- Already has good structure, verify navigation consistency

### Task 3: Update blog/gp-clinic-automation-2026.html
- Replace external Unsplash hero image with styled header section
- Update to match site design patterns

### Task 4: Update blog/understanding-swpe-guide.html
- Apply same styling fixes

### Task 5: Update blog/healthcare-automation-roi.html
- Apply same styling fixes

### Task 6: Add Blog link to navigation on all main pages
- index.html
- automations.html
- calculators.html
- downloads.html
- websites.html
- faq.html
- glossary.html

Navigation pattern to add (after About, before Contact):
```html
<li class="nav-item">
    <a href="blog/index.html" class="nav-link">Blog</a>
</li>
```

Or in dropdown under Resources where applicable.

## Success Criteria
- [ ] All blog posts have consistent styling matching the site
- [ ] Blog link appears in main navigation on all pages
- [ ] No external Unsplash images (use CSS-based design or site images)
- [ ] Blog pages are fully responsive
