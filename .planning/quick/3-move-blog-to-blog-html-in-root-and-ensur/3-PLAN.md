---
phase: quick
plan: 3
type: execute
wave: 1
depends_on: []
files_modified:
  - blog.html
  - index.html
  - automations.html
  - calculators.html
  - downloads.html
  - websites.html
  - faq.html
  - glossary.html
  - privacy-policy.html
  - terms-of-service.html
  - blog/index.html
autonomous: true
must_haves:
  truths:
    - blog.html exists in root directory with correct paths
    - All pages link to blog.html instead of blog/ or blog/index.html
    - Navigation on all pages includes Blog link
    - blog/index.html has Blog link added to navigation
  artifacts:
    - path: blog.html
      provides: Blog landing page in root
    - path: index.html
      provides: Updated blog links
    - path: automations.html
      provides: Updated blog links
    - path: calculators.html
      provides: Updated blog links
    - path: downloads.html
      provides: Updated blog links
    - path: websites.html
      provides: Updated blog links
    - path: faq.html
      provides: Updated blog links
    - path: glossary.html
      provides: Updated blog links
    - path: privacy-policy.html
      provides: Blog link added
    - path: terms-of-service.html
      provides: Blog link added
    - path: blog/index.html
      provides: Blog link added to navigation
  key_links:
    - from: all pages
      to: blog.html
      via: nav and footer links
---

<objective>
Move blog to blog.html in root directory and ensure consistent headers/navigation across all pages.

Purpose: Simplify URL structure from /blog/ to /blog.html and ensure all pages have consistent navigation including Blog link.
Output: blog.html in root, updated navigation on all pages.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@blog/index.html - Source content for blog.html
@index.html - Reference for navigation structure
</context>

<tasks>

<task type="auto">
  <name>Create blog.html in root</name>
  <files>blog.html</files>
  <action>
    Copy content from blog/index.html to blog.html with these modifications:
    1. Change `../fonts/fonts.css` to `./fonts/fonts.css`
    2. Change `../styles.css` to `./styles.css` (both preload and link)
    3. Change `../photos/` to `./photos/` (favicon, logo, all image paths)
    4. Update canonical URL from `https://cliniciq.com.au/blog/` to `https://cliniciq.com.au/blog.html`
    5. Update og:url and twitter URLs to `https://cliniciq.com.au/blog.html`
    6. Update breadcrumb URL from `/blog/` to `/blog.html`
    7. Change all `../index.html` to `./index.html` (logo link, nav links)
    8. Change all `../automations.html` etc to `./automations.html`
    9. Keep blog post links as `blog/gp-clinic-automation-2026.html` (point to subdirectory)
    10. Add Blog link to navigation between About and Contact:
        ```html
        <li class="nav-item">
            <a href="blog.html" class="nav-link">Blog</a>
        </li>
        ```
    11. Update footer Blog link from `index.html` to `./blog.html`
    12. Change `../script.js` to `./script.js`
  </action>
  <verify>grep -n "blog.html" blog.html | head -20</verify>
  <done>blog.html exists with correct paths and Blog navigation link</done>
</task>

<task type="auto">
  <name>Update all pages to link to blog.html</name>
  <files>index.html, automations.html, calculators.html, downloads.html, websites.html, faq.html, glossary.html, privacy-policy.html, terms-of-service.html</files>
  <action>
    For each HTML file in root directory, update blog links:

    1. index.html:
       - Change `blog/` to `blog.html` in nav dropdown (line 164)
       - Change `blog/` to `blog.html` in nav menu (line 171)
       - Change `blog/` to `blog.html` in footer (line 735)

    2. automations.html, calculators.html, downloads.html, websites.html:
       - Change `blog/index.html` to `blog.html` in nav dropdown
       - Change `blog/index.html` to `blog.html` in nav menu (if exists)
       - Change `blog/index.html` to `blog.html` in footer

    3. faq.html, glossary.html:
       - Change `blog/index.html` to `blog.html` in nav
       - Change `blog/index.html` to `blog.html` in footer

    4. privacy-policy.html, terms-of-service.html:
       - Add Blog link to navigation between About and Contact (copy pattern from index.html)
       - Change `blog/index.html` to `blog.html` in footer (or add if missing)
  </action>
  <verify>grep -r "blog.html" *.html | grep -v "blog.html:" | head -20</verify>
  <done>All pages reference blog.html instead of blog/ or blog/index.html</done>
</task>

<task type="auto">
  <name>Add Blog link to blog/index.html navigation</name>
  <files>blog/index.html</files>
  <action>
    Add Blog link to the navigation in blog/index.html between About and Contact:

    Find this section (around line 146-151):
    ```html
    <li class="nav-item">
        <a href="../index.html#about" class="nav-link">About</a>
    </li>
    <li class="nav-item">
        <a href="../index.html#contact" class="nav-link">Contact</a>
    </li>
    ```

    Insert Blog link:
    ```html
    <li class="nav-item">
        <a href="../index.html#about" class="nav-link">About</a>
    </li>
    <li class="nav-item">
        <a href="index.html" class="nav-link">Blog</a>
    </li>
    <li class="nav-item">
        <a href="../index.html#contact" class="nav-link">Contact</a>
    </li>
    ```

    Note: Blog link points to `index.html` (relative to blog/ directory) since this is the blog subdirectory index.
  </action>
  <verify>grep -n "Blog" blog/index.html | head -5</verify>
  <done>Blog link added to blog/index.html navigation</done>
</task>

</tasks>

<verification>
- blog.html exists in root with correct paths (./ instead of ../)
- All root HTML files link to blog.html
- Navigation on all pages includes Blog link
- blog/index.html has Blog link in navigation
- No broken links to blog/ or blog/index.html remain
</verification>

<success_criteria>
- blog.html created in root directory
- All pages updated to link to blog.html
- Consistent navigation across all pages
- blog/index.html has Blog link added
</success_criteria>

<output>
After completion, verify by:
1. Opening blog.html in browser - check it loads correctly
2. Checking navigation links work on multiple pages
3. Verifying no 404 errors for blog links
</output>
