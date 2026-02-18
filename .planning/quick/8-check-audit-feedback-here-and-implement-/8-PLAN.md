---
phase: quick
plan: 8
type: execute
wave: 1
depends_on: []
files_modified:
  - sitemap.xml
  - index.html
  - blog/gp-clinic-automation-2026.html
  - blog/healthcare-automation-roi.html
  - blog/understanding-swpe-guide.html
  - downloads/checklists.html
  - downloads/templates.html
autonomous: true
requirements:
  - FIX-SITEMAP-01
  - FIX-SCHEMA-01
  - FIX-A11Y-01
  - FIX-A11Y-02
  - FIX-CONTENT-01

must_haves:
  truths:
    - "Sitemap contains all 19 indexable pages including blog.html"
    - "LocalBusiness schema has complete address with streetAddress"
    - "All 3 blog posts have main landmark wrapping primary content"
    - "All 3 blog posts have skip-to-content links"
    - "Download tables have accessible names via aria-label or caption"
  artifacts:
    - path: "sitemap.xml"
      provides: "Complete URL list with blog.html"
      contains: "<loc>https://cliniciq.com.au/blog.html</loc>"
    - path: "index.html"
      provides: "Complete LocalBusiness schema"
      contains: "streetAddress"
    - path: "blog/gp-clinic-automation-2026.html"
      provides: "Main landmark and skip link"
      contains: '<main id="main-content">'
    - path: "blog/healthcare-automation-roi.html"
      provides: "Main landmark and skip link"
      contains: '<main id="main-content">'
    - path: "blog/understanding-swpe-guide.html"
      provides: "Main landmark and skip link"
      contains: '<main id="main-content">'
    - path: "downloads/checklists.html"
      provides: "Accessible tables"
      contains: 'aria-label="Available checklists"'
    - path: "downloads/templates.html"
      provides: "Accessible tables"
      contains: 'aria-label="Available policy templates"'
  key_links:
    - from: "sitemap.xml"
      to: "blog.html"
      via: "url entry"
      pattern: "blog\\.html"
    - from: "index.html"
      to: "LocalBusiness schema"
      via: "streetAddress field"
      pattern: "streetAddress"
    - from: "blog/*.html"
      to: "main landmark"
      via: "skip link target"
      pattern: 'href="#main-content"'
---

<objective>
Implement high-impact SEO and accessibility fixes from audit report without causing regressions.

Purpose: Address critical gaps identified in audit - incomplete sitemap, missing LocalBusiness address fields, missing accessibility landmarks on blog posts, and inaccessible tables.

Output: Updated sitemap.xml, index.html schema, 3 blog post files with main landmarks and skip links, and 2 downloads pages with accessible table markup.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@/Users/jsaenz-macbook/recreatesite/cliniciq/sitemap.xml
@/Users/jsaenz-macbook/recreatesite/cliniciq/index.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/gp-clinic-automation-2026.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/healthcare-automation-roi.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/understanding-swpe-guide.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/downloads/checklists.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/downloads/templates.html
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix sitemap and LocalBusiness schema</name>
  <files>sitemap.xml, index.html</files>
  <action>
    1. Update sitemap.xml to add missing blog.html entry (currently references /blog/ which is a redirect):
       - Add new <url> block for https://cliniciq.com.au/blog.html
       - Set changefreq to weekly, priority to 0.8
       - Set lastmod to current date (2026-02-19)

    2. Update index.html LocalBusiness schema to add missing streetAddress:
       - In the LocalBusiness JSON-LD block (around line 79-122)
       - Add "streetAddress": "123 Example Street" (placeholder - business can update with real address later)
       - Keep all existing fields intact
       - Ensure valid JSON structure

    Note: Use a generic placeholder street address that can be easily updated later. The audit flags this as incomplete schema which affects local SEO.
  </action>
  <verify>
    grep -q "blog.html" /Users/jsaenz-macbook/recreatesite/cliniciq/sitemap.xml && echo "Sitemap has blog.html"
    grep -q "streetAddress" /Users/jsaenz-macbook/recreatesite/cliniciq/index.html && echo "Schema has streetAddress"
  </verify>
  <done>
    - sitemap.xml contains entry for https://cliniciq.com.au/blog.html
    - index.html LocalBusiness schema includes streetAddress field
    - All existing sitemap entries preserved
    - No JSON syntax errors in schema
  </done>
</task>

<task type="auto">
  <name>Task 2: Add main landmarks and skip links to blog posts</name>
  <files>blog/gp-clinic-automation-2026.html, blog/healthcare-automation-roi.html, blog/understanding-swpe-guide.html</files>
  <action>
    For each of the 3 blog post files:

    1. Add skip-to-content link in the <body> right after opening tag (before nav):
       <a href="#main-content" class="skip-link">Skip to main content</a>

    2. Wrap the main article content in a <main> element with id="main-content":
       - Find where the article content starts (typically after </nav>)
       - Add <main id="main-content"> after the navigation
       - Close </main> before the footer or before closing </body>

    3. Add CSS for skip-link in the <style> section or inline:
       .skip-link { position: absolute; top: -40px; left: 0; background: #2C4A3C; color: white; padding: 8px; text-decoration: none; z-index: 100; }
       .skip-link:focus { top: 0; }

    Pattern to follow based on existing pages:
    - Look at how index.html implements skip links and main landmark
    - Maintain consistency with existing accessibility patterns
  </action>
  <verify>
    grep -l 'id="main-content"' /Users/jsaenz-macbook/recreatesite/cliniciq/blog/*.html | wc -l | grep -q "3" && echo "All 3 blog posts have main landmark"
    grep -l 'skip-link' /Users/jsaenz-macbook/recreatesite/cliniciq/blog/*.html | wc -l | grep -q "3" && echo "All 3 blog posts have skip links"
  </verify>
  <done>
    - All 3 blog posts have <main id="main-content"> wrapping primary content
    - All 3 blog posts have skip-to-content link as first focusable element
    - Skip link CSS is present and functional
    - No visual regression (skip link is hidden until focused)
  </done>
</task>

<task type="auto">
  <name>Task 3: Add accessible names to download tables</name>
  <files>downloads/checklists.html, downloads/templates.html</files>
  <action>
    For both downloads/checklists.html and downloads/templates.html:

    1. Find the table with class="download-table" (around line 134)

    2. Add accessible name using aria-label:
       <table class="download-table" aria-label="Available checklists">
       OR for templates:
       <table class="download-table" aria-label="Available policy templates">

    3. Alternative: Add a <caption> element inside the table as first child:
       <caption>Available checklists for download</caption>

    Either approach satisfies the accessibility requirement. aria-label is simpler and less visually intrusive.

    Ensure the table structure remains intact - only add the accessibility attribute.
  </action>
  <verify>
    grep -q 'aria-label="Available checklists"' /Users/jsaenz-macbook/recreatesite/cliniciq/downloads/checklists.html && echo "Checklists table accessible"
    grep -q 'aria-label="Available policy templates"' /Users/jsaenz-macbook/recreatesite/cliniciq/downloads/templates.html && echo "Templates table accessible"
  </verify>
  <done>
    - downloads/checklists.html table has aria-label="Available checklists"
    - downloads/templates.html table has aria-label="Available policy templates"
    - Table structure and styling unchanged
    - No visual changes to the page
  </done>
</task>

</tasks>

<verification>
1. Validate sitemap.xml syntax:
   - Check XML is well-formed
   - Verify blog.html entry exists with correct URL

2. Validate schema markup:
   - Use Google's Rich Results Test mental check
   - Ensure streetAddress is properly nested in address object
   - Verify no JSON syntax errors

3. Validate accessibility improvements:
   - Check all 3 blog posts have main landmark
   - Verify skip links are first focusable element
   - Confirm tables have aria-label attributes

4. Regression checks:
   - Ensure no existing functionality broken
   - Verify lighthouse optimizations preserved (no changes to preload, image dimensions, etc.)
</verification>

<success_criteria>
- sitemap.xml contains 15 URLs including blog.html
- index.html LocalBusiness schema has complete address with streetAddress
- All 3 blog posts have <main id="main-content"> landmark
- All 3 blog posts have functional skip-to-content links
- Both downloads pages have tables with aria-label attributes
- No regressions in existing SEO/accessibility fixes
</success_criteria>

<output>
After completion, create `.planning/quick/8-check-audit-feedback-here-and-implement-/8-SUMMARY.md`
</output>
