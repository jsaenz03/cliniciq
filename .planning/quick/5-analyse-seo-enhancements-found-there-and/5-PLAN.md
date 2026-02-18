---
phase: quick
plan: 5
type: execute
wave: 1
depends_on: []
files_modified:
  - blog/gp-clinic-automation-2026.html
  - blog/healthcare-automation-roi.html
  - blog/understanding-swpe-guide.html
  - privacy-policy.html
  - terms-of-service.html
  - faq.html
  - glossary.html
autonomous: true
requirements:
  - QUICK-05
must_haves:
  truths:
    - All blog posts have complete Open Graph meta tags
    - All blog posts have Twitter Card meta tags
    - Legal and info pages have proper social sharing metadata
    - No functionality is broken by SEO additions
  artifacts:
    - path: "blog/gp-clinic-automation-2026.html"
      provides: "Complete OG and Twitter Card metadata"
    - path: "blog/healthcare-automation-roi.html"
      provides: "Complete OG and Twitter Card metadata"
    - path: "blog/understanding-swpe-guide.html"
      provides: "Complete OG and Twitter Card metadata"
    - path: "privacy-policy.html"
      provides: "OG and Twitter Card metadata"
    - path: "terms-of-service.html"
      provides: "OG and Twitter Card metadata"
    - path: "faq.html"
      provides: "OG and Twitter Card metadata"
    - path: "glossary.html"
      provides: "OG and Twitter Card metadata"
  key_links:
    - from: "blog posts"
      to: "social platforms"
      via: "OG/Twitter meta tags"
      pattern: "meta property=\"og:|twitter:"
---

<objective>
Analyze existing SEO enhancements across the ClinicIQ website and implement missing Open Graph and Twitter Card meta tags on blog posts and legal/info pages to improve social sharing appearance.

Purpose: Ensure consistent social media presentation across all pages when shared on LinkedIn, Twitter/X, Facebook, and other platforms.
Output: Updated HTML files with complete social sharing metadata.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/Users/jsaenz-macbook/recreatesite/cliniciq/index.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/automations.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/websites.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/calculators.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/downloads.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/gp-clinic-automation-2026.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/healthcare-automation-roi.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/understanding-swpe-guide.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/privacy-policy.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/terms-of-service.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/faq.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/glossary.html

## Current SEO Analysis

### Already Implemented (Good)
- **index.html**: Complete OG tags, Twitter Cards, Schema.org structured data (Organization, LocalBusiness)
- **automations.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList, SoftwareApplication)
- **websites.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList)
- **calculators.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList)
- **downloads.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList)
- **blog.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList, Blog)
- **faq.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList, FAQPage)
- **glossary.html**: Complete OG tags, Twitter Cards, Schema.org (Organization, BreadcrumbList, DefinedTermSet)
- **Blog posts**: Have Schema.org BlogPosting structured data but MISSING OG and Twitter Card tags

### Missing (To Implement)
1. **blog/gp-clinic-automation-2026.html**: Missing Open Graph and Twitter Card meta tags
2. **blog/healthcare-automation-roi.html**: Missing Open Graph and Twitter Card meta tags
3. **blog/understanding-swpe-guide.html**: Missing Open Graph and Twitter Card meta tags
4. **privacy-policy.html**: Missing Open Graph and Twitter Card meta tags
5. **terms-of-service.html**: Missing Open Graph and Twitter Card meta tags

### Implementation Pattern (from existing pages)
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="[Page Title] | ClinicIQ Solutions">
<meta property="og:description" content="[Page description]">
<meta property="og:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
<meta property="og:url" content="https://cliniciq.com.au/[page-path]">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ClinicIQ Solutions">
<meta property="og:locale" content="en_AU">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Page Title] | ClinicIQ Solutions">
<meta name="twitter:description" content="[Page description]">
<meta name="twitter:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
```
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add OG and Twitter Card tags to blog posts</name>
  <files>
    blog/gp-clinic-automation-2026.html
    blog/healthcare-automation-roi.html
    blog/understanding-swpe-guide.html
  </files>
  <action>
    Add Open Graph and Twitter Card meta tags to all three blog post HTML files.

    For gp-clinic-automation-2026.html, add after the favicon line and before Schema.org:
    ```html
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="5 Ways to Automate Your GP Clinic in 2026 | ClinicIQ">
    <meta property="og:description" content="Discover the top 5 automation strategies for GP clinics in 2026. Learn how AI, workflow automation, and smart tools can transform your practice efficiency.">
    <meta property="og:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    <meta property="og:url" content="https://cliniciq.com.au/blog/gp-clinic-automation-2026.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ClinicIQ Solutions">
    <meta property="og:locale" content="en_AU">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="5 Ways to Automate Your GP Clinic in 2026 | ClinicIQ">
    <meta name="twitter:description" content="Discover the top 5 automation strategies for GP clinics in 2026. Learn how AI and workflow automation can transform your practice.">
    <meta name="twitter:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    ```

    For healthcare-automation-roi.html:
    ```html
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Healthcare Automation ROI: Is It Worth It? | ClinicIQ">
    <meta property="og:description" content="Calculate the true ROI of healthcare automation. Learn how GP clinics save time, reduce costs, and improve patient care with automation technology.">
    <meta property="og:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    <meta property="og:url" content="https://cliniciq.com.au/blog/healthcare-automation-roi.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ClinicIQ Solutions">
    <meta property="og:locale" content="en_AU">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Healthcare Automation ROI: Is It Worth It? | ClinicIQ">
    <meta name="twitter:description" content="Calculate the true ROI of healthcare automation. Learn how GP clinics save time and reduce costs.">
    <meta name="twitter:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    ```

    For understanding-swpe-guide.html:
    ```html
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Understanding SWPE: A Guide for Australian GPs | ClinicIQ">
    <meta property="og:description" content="Learn how Standardised Whole Patient Equivalent (SWPE) affects your GP practice funding. Complete guide to SWPE calculation and optimization.">
    <meta property="og:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    <meta property="og:url" content="https://cliniciq.com.au/blog/understanding-swpe-guide.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ClinicIQ Solutions">
    <meta property="og:locale" content="en_AU">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Understanding SWPE: A Guide for Australian GPs | ClinicIQ">
    <meta name="twitter:description" content="Learn how SWPE affects your GP practice funding. Complete guide to SWPE calculation and optimization.">
    <meta name="twitter:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    ```

    Note: Use og:type "article" for blog posts instead of "website".
    Insert these tags after the favicon line and before the Schema.org scripts.
  </action>
  <verify>
    Check each blog post file contains:
    1. All 8 OG meta tags (title, description, image, url, type, site_name, locale)
    2. All 4 Twitter Card meta tags (card, title, description, image)
    3. og:type is "article" for blog posts
    4. Tags are placed before Schema.org scripts
  </verify>
  <done>
    All three blog posts have complete Open Graph and Twitter Card meta tags with proper article type.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add OG and Twitter Card tags to legal pages</name>
  <files>
    privacy-policy.html
    terms-of-service.html
  </files>
  <action>
    Add Open Graph and Twitter Card meta tags to privacy-policy.html and terms-of-service.html.

    For privacy-policy.html, add after the favicon line and before Schema.org:
    ```html
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Privacy Policy | ClinicIQ Solutions">
    <meta property="og:description" content="ClinicIQ Solutions privacy policy. Learn how we collect, use, and protect your data when using our healthcare automation tools and services.">
    <meta property="og:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    <meta property="og:url" content="https://cliniciq.com.au/privacy-policy.html">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="ClinicIQ Solutions">
    <meta property="og:locale" content="en_AU">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Privacy Policy | ClinicIQ Solutions">
    <meta name="twitter:description" content="ClinicIQ Solutions privacy policy. Learn how we protect your data.">
    <meta name="twitter:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    ```

    For terms-of-service.html, add after the favicon line and before Schema.org:
    ```html
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Terms of Service | ClinicIQ Solutions">
    <meta property="og:description" content="ClinicIQ Solutions Terms of Service - Legal terms and conditions for using our automation, website, and consulting services in Australia.">
    <meta property="og:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    <meta property="og:url" content="https://cliniciq.com.au/terms-of-service.html">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="ClinicIQ Solutions">
    <meta property="og:locale" content="en_AU">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Terms of Service | ClinicIQ Solutions">
    <meta name="twitter:description" content="ClinicIQ Solutions Terms of Service - Legal terms for using our services.">
    <meta name="twitter:image" content="https://cliniciq.com.au/photos/cliniciq-logo.webp">
    ```

    Note: Use og:type "website" for legal pages.
    Insert these tags after the favicon line and before the Schema.org scripts.
  </action>
  <verify>
    Check each legal page file contains:
    1. All 8 OG meta tags (title, description, image, url, type, site_name, locale)
    2. All 4 Twitter Card meta tags (card, title, description, image)
    3. og:type is "website" for legal pages
    4. Tags are placed before Schema.org scripts
  </verify>
  <done>
    Privacy policy and terms of service pages have complete Open Graph and Twitter Card meta tags.
  </done>
</task>

</tasks>

<verification>
After completing both tasks:
1. Verify all blog posts have OG tags with og:type="article"
2. Verify legal pages have OG tags with og:type="website"
3. Verify all pages have complete Twitter Card tags
4. Confirm no HTML structure was broken (tags properly closed)
5. Verify meta tags follow the same pattern as existing working pages
</verification>

<success_criteria>
- All 3 blog posts have complete Open Graph and Twitter Card meta tags
- Both legal pages have complete Open Graph and Twitter Card meta tags
- og:type is correctly set to "article" for blog posts and "website" for legal pages
- All meta tags use consistent branding and URLs
- No existing functionality is broken
</success_criteria>

<output>
After completion, create `.planning/quick/5-analyse-seo-enhancements-found-there-and/5-SUMMARY.md`
</output>
