---
phase: quick
plan: 2
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/jsaenz-macbook/recreatesite/cliniciq/faq.html
  - /Users/jsaenz-macbook/recreatesite/cliniciq/glossary.html
  - /Users/jsaenz-macbook/recreatesite/cliniciq/privacy-policy.html
  - /Users/jsaenz-macbook/recreatesite/cliniciq/terms-of-service.html
autonomous: true

must_haves:
  truths:
    - All HTML pages have consistent navigation
    - Blog link appears in nav on all pages
    - Navigation structure matches existing pattern
  artifacts:
    - path: "faq.html"
      provides: "FAQ page with Blog navigation"
    - path: "glossary.html"
      provides: "Glossary page with Blog navigation"
    - path: "privacy-policy.html"
      provides: "Privacy policy page with Blog navigation"
    - path: "terms-of-service.html"
      provides: "Terms of service page with Blog navigation"
  key_links:
    - from: "nav-menu"
      to: "blog/index.html"
      via: "nav-link"
---

<objective>
Add Blog navigation link to all HTML pages missing it for consistent site-wide navigation.

Purpose: Ensure users can access the blog from any page on the site.
Output: Four updated HTML files with Blog navigation added.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@/Users/jsaenz-macbook/recreatesite/cliniciq/faq.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/glossary.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/privacy-policy.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/terms-of-service.html

## Current State

Pages that HAVE Blog navigation:
- index.html
- automations.html
- calculators.html
- downloads.html
- websites.html

Pages MISSING Blog navigation (need to add):
- faq.html
- glossary.html
- privacy-policy.html
- terms-of-service.html

## Navigation Pattern to Add

The Blog nav item should be added after the "About" link and before the "Contact" link, using this exact pattern:

```html
<li class="nav-item">
    <a href="blog/index.html" class="nav-link">Blog</a>
</li>
```

## Location in Each File

1. **faq.html**: After line 106 (after About nav-item), before line 107 (Contact nav-item)
2. **glossary.html**: After line 103 (after About nav-item), before line 104 (Contact nav-item)
3. **privacy-policy.html**: After line 88 (after About nav-item), before line 89 (Contact nav-item closing)
4. **terms-of-service.html**: After line 88 (after About nav-item), before line 89 (Contact nav-item closing)
</context>

<tasks>

<task type="auto">
  <name>Add Blog navigation to faq.html</name>
  <files>/Users/jsaenz-macbook/recreatesite/cliniciq/faq.html</files>
  <action>
    Add Blog navigation link to the nav-menu in faq.html.

    Current structure around line 106-107:
    ```html
    <li class="nav-item"><a href="index.html#about" class="nav-link">About</a></li>
    <li class="nav-item"><a href="index.html#contact" class="nav-link">Contact</a></li>
    ```

    Insert after the About link (line 106) and before the Contact link (line 107):
    ```html
    <li class="nav-item"><a href="blog/index.html" class="nav-link">Blog</a></li>
    ```

    Result should be:
    ```html
    <li class="nav-item"><a href="index.html#about" class="nav-link">About</a></li>
    <li class="nav-item"><a href="blog/index.html" class="nav-link">Blog</a></li>
    <li class="nav-item"><a href="index.html#contact" class="nav-link">Contact</a></li>
    ```
  </action>
  <verify>
    grep -n 'blog/index.html' /Users/jsaenz-macbook/recreatesite/cliniciq/faq.html
    Should return line number with the Blog link
  </verify>
  <done>Blog navigation added to faq.html between About and Contact links</done>
</task>

<task type="auto">
  <name>Add Blog navigation to glossary.html</name>
  <files>/Users/jsaenz-macbook/recreatesite/cliniciq/glossary.html</files>
  <action>
    Add Blog navigation link to the nav-menu in glossary.html.

    Current structure around line 103-104:
    ```html
    <li class="nav-item"><a href="index.html#about" class="nav-link">About</a></li>
    <li class="nav-item"><a href="index.html#contact" class="nav-link">Contact</a></li>
    ```

    Insert after the About link (line 103) and before the Contact link (line 104):
    ```html
    <li class="nav-item"><a href="blog/index.html" class="nav-link">Blog</a></li>
    ```

    Result should be:
    ```html
    <li class="nav-item"><a href="index.html#about" class="nav-link">About</a></li>
    <li class="nav-item"><a href="blog/index.html" class="nav-link">Blog</a></li>
    <li class="nav-item"><a href="index.html#contact" class="nav-link">Contact</a></li>
    ```
  </action>
  <verify>
    grep -n 'blog/index.html' /Users/jsaenz-macbook/recreatesite/cliniciq/glossary.html
    Should return line number with the Blog link
  </verify>
  <done>Blog navigation added to glossary.html between About and Contact links</done>
</task>

<task type="auto">
  <name>Add Blog navigation to privacy-policy.html and terms-of-service.html</name>
  <files>
    /Users/jsaenz-macbook/recreatesite/cliniciq/privacy-policy.html
    /Users/jsaenz-macbook/recreatesite/cliniciq/terms-of-service.html
  </files>
  <action>
    Add Blog navigation link to both privacy-policy.html and terms-of-service.html.

    For privacy-policy.html (around line 88-89):
    Current:
    ```html
    <li class="nav-item">
        <a href="index.html#about" class="nav-link">About</a>
    </li>
    <li class="nav-item">
        <a href="index.html#contact" class="nav-link">Contact</a>
    </li>
    ```

    Insert Blog nav-item between About and Contact.

    For terms-of-service.html (around line 88-89):
    Same structure as privacy-policy.html - add Blog nav-item between About and Contact.

    Use multi-line format to match existing style:
    ```html
    <li class="nav-item">
        <a href="blog/index.html" class="nav-link">Blog</a>
    </li>
    ```
  </action>
  <verify>
    grep -n 'blog/index.html' /Users/jsaenz-macbook/recreatesite/cliniciq/privacy-policy.html
    grep -n 'blog/index.html' /Users/jsaenz-macbook/recreatesite/cliniciq/terms-of-service.html
    Both should return line numbers with the Blog links
  </verify>
  <done>Blog navigation added to privacy-policy.html and terms-of-service.html between About and Contact links</done>
</task>

</tasks>

<verification>
1. All four HTML files contain the Blog navigation link
2. Blog link appears between About and Contact in the nav-menu
3. Link format matches existing pages: `<a href="blog/index.html" class="nav-link">Blog</a>`
4. No syntax errors introduced in navigation structure
</verification>

<success_criteria>
- faq.html has Blog navigation link
- glossary.html has Blog navigation link
- privacy-policy.html has Blog navigation link
- terms-of-service.html has Blog navigation link
- All pages have consistent navigation structure
</success_criteria>

<output>
After completion, navigation will be consistent across all site pages with Blog accessible from any page.
</output>
