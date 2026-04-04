---
phase: quick-14
plan: 14
type: execute
wave: 1
depends_on: []
files_modified: [blog/excel-healthcare-data-processing.html, blog/reliable-systems-gp-decision-making.html, blog.html, sitemap.xml]
autonomous: true
requirements: []
user_setup: []
must_haves:
  truths:
    - "Excel for healthcare blog post exists at blog/excel-healthcare-data-processing.html"
    - "Reliable systems blog post exists at blog/reliable-systems-gp-decision-making.html"
    - "Both posts have complete Open Graph and Twitter Card meta tags"
    - "Both posts have BlogPosting schema markup"
    - "Both posts have author byline (John Saenz)"
    - "Both posts are added to blog.html"
    - "Both posts are added to sitemap.xml"
  artifacts:
    - path: "blog/excel-healthcare-data-processing.html"
      provides: "Excel data processing blog post"
      contains: "BlogPosting schema"
    - path: "blog/reliable-systems-gp-decision-making.html"
      provides: "Reliable systems blog post"
      contains: "BlogPosting schema"
  key_links:
    - from: "blog/excel-healthcare-data-processing.html"
      to: "../styles.css"
      via: "stylesheet link"
    - from: "blog/reliable-systems-gp-decision-making.html"
      to: "../styles.css"
      via: "stylesheet link"
---

<objective>
Write two SEO-optimized blog posts for healthcare professionals:
1. Excel for healthcare data processing - practical guide for GP clinics
2. Reliable systems for GP decision-making - building trust through automation

Purpose: Establish ClinicIQ as thought leaders in healthcare automation, provide valuable content for GP practices, and improve SEO rankings

Output: Two complete blog posts with full SEO metadata, schema markup, and integration into existing blog structure
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@blog/gp-clinic-automation-2026.html (template reference)
@blog.html (for integration)
@sitemap.xml (for integration)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Excel for Healthcare Data Processing blog post</name>
  <files>blog/excel-healthcare-data-processing.html</files>
  <action>
Create blog post at blog/excel-healthcare-data-processing.html following the existing template structure:

**Content Requirements:**
- Title: "Excel for Healthcare Data Processing: A GP Clinic's Guide"
- Target audience: Practice managers, nurses, GPs
- Word count: 1500-2000 words
- Topics to cover:
  * Why Excel remains valuable in healthcare (despite specialized systems)
  * Common use cases: patient tracking, appointment data, billing summaries, inventory management
  * Essential Excel skills for healthcare: pivot tables, VLOOKUP, data validation, conditional formatting
  * Data security considerations (de-identification, access controls)
  * Integration opportunities: exporting from practice software, automating reports
  * When to move beyond Excel to dedicated solutions
- Include practical examples specific to Australian GP clinics
- Add Call-to-Action linking to relevant services (calculators, templates)

**Technical Requirements:**
- Follow existing blog post template structure (use gp-clinic-automation-2026.html as reference)
- Include all required meta tags: title, description, keywords, canonical, Open Graph, Twitter Card
- Add BlogPosting schema markup with:
  * datePublished: "2025-04-15"
  * dateModified: "2025-04-15"
  * author: John Saenz (Person type with jobTitle and URL)
  * publisher: ClinicIQ Solutions
  * headline matching title tag
  * description matching meta description
- Add BreadcrumbList schema (Home > Blog > [Post Title])
- Add skip-to-content link for accessibility
- Use self-hosted Ubuntu fonts (preload all weights)
- Link to ../styles.css
- Include navigation linking to ../index.html, ../automations.html, ../calculators.html, ../downloads.html, ../websites.html, ../about.html, ../contact.html
- Add author byline: "By John Saenz, Registered Nurse & Founder"
- Include featured image (use relevant Unsplash healthcare/Excel image)
- Ensure mobile-responsive design matches existing posts
  </action>
  <verify>
File exists at blog/excel-healthcare-data-processing.html with valid HTML structure, all meta tags present, BlogPosting schema validates at https://validator.schema.org/
  </verify>
  <done>Complete blog post created with SEO metadata, schema markup, and professional content targeting GP clinic staff</done>
</task>

<task type="auto">
  <name>Task 2: Create Reliable Systems for GP Decision-Making blog post</name>
  <files>blog/reliable-systems-gp-decision-making.html</files>
  <action>
Create blog post at blog/reliable-systems-gp-decision-making.html following the existing template structure:

**Content Requirements:**
- Title: "Building Reliable Systems for GP Decision-Making: A Clinical Approach"
- Target audience: Practice owners, GPs, clinical leads
- Word count: 1500-2000 words
- Topics to cover:
  * The cost of unreliable systems in clinical practice (cognitive load, errors, burnout)
  * What makes a system "reliable" in healthcare: consistency, feedback loops, error handling, documentation
  * Decision support systems: when they help vs when they hinder
  * Building systems that clinicians actually trust
  * Examples of reliable systems: automated recalls, referral tracking, test result follow-up
  * The role of automation in reducing decision fatigue
  * Implementation principles: start small, iterate, involve end-users
  * Red flags that your systems need improvement
- Include Australian healthcare context (MDT, safety standards, accreditation)
- Add Call-to-Action for automation services

**Technical Requirements:**
- Follow existing blog post template structure (use gp-clinic-automation-2026.html as reference)
- Include all required meta tags: title, description, keywords, canonical, Open Graph, Twitter Card
- Add BlogPosting schema markup with:
  * datePublished: "2025-04-22"
  * dateModified: "2025-04-22"
  * author: John Saenz (Person type with jobTitle and URL)
  * publisher: ClinicIQ Solutions
  * headline matching title tag
  * description matching meta description
- Add BreadcrumbList schema (Home > Blog > [Post Title])
- Add skip-to-content link for accessibility
- Use self-hosted Ubuntu fonts (preload all weights)
- Link to ../styles.css
- Include navigation linking to ../index.html, ../automations.html, ../calculators.html, ../downloads.html, ../websites.html, ../about.html, ../contact.html
- Add author byline: "By John Saenz, Registered Nurse & Founder"
- Include featured image (use relevant Unsplash healthcare/systems image)
- Ensure mobile-responsive design matches existing posts
  </action>
  <verify>
File exists at blog/reliable-systems-gp-decision-making.html with valid HTML structure, all meta tags present, BlogPosting schema validates at https://validator.schema.org/
  </verify>
  <done>Complete blog post created with SEO metadata, schema markup, and professional content targeting clinical decision-makers</done>
</task>

<task type="auto">
  <name>Task 3: Integrate posts into blog.html and sitemap.xml</name>
  <files>blog.html, sitemap.xml</files>
  <action>
Add both new blog posts to existing pages:

**blog.html updates:**
1. Add both posts to the blog grid in chronological order (newest first)
2. Include: featured image, title, excerpt, publication date, "Read More" link
3. Excel post excerpt: "Discover how GP clinics can leverage Excel for data processing, from patient tracking to inventory management. Learn essential skills and security best practices."
4. Reliable systems post excerpt: "Explore how reliable systems reduce clinical decision fatigue and improve patient care. Learn principles for building systems that clinicians actually trust."
5. Update blog post count if displayed on page

**sitemap.xml updates:**
1. Add entry for excel-healthcare-data-processing.html:
   ```xml
   <url>
     <loc>https://cliniciq.com.au/blog/excel-healthcare-data-processing.html</loc>
     <lastmod>2025-04-15</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.7</priority>
   </url>
   ```
2. Add entry for reliable-systems-gp-decision-making.html:
   ```xml
   <url>
     <loc>https://cliniciq.com.au/blog/reliable-systems-gp-decision-making.html</loc>
     <lastmod>2025-04-22</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.7</priority>
   </url>
   ```
3. Insert in appropriate position (sorted by date, maintain XML validity)
  </action>
  <verify>
blog.html contains both new posts with correct links and excerpts; sitemap.xml is valid XML (check with xmllint or online validator) containing both new URLs
  </verify>
  <done>Both blog posts fully integrated into site navigation and discoverable by search engines</done>
</task>

</tasks>

<verification>
1. Both blog post HTML files exist in blog/ directory
2. All meta tags present and correctly formatted (title, description, OG, Twitter Card)
3. BlogPosting schema validates without errors
4. Author bylines present with John Saenz attribution
5. Posts added to blog.html with working links
6. Sitemap.xml updated and valid
7. Mobile responsive design matches existing posts
8. All navigation links functional
</verification>

<success_criteria>
- Two complete, SEO-optimized blog posts created
- Both posts follow existing template structure exactly
- Full schema markup implemented and validated
- Integrated into blog.html and sitemap.xml
- Content provides genuine value to GP clinic staff
- Professional tone consistent with ClinicIQ brand
</success_criteria>

<output>
After completion, create `.planning/quick/14-write-two-blog-posts-excel-for-healthcar/14-SUMMARY.md`
</output>
