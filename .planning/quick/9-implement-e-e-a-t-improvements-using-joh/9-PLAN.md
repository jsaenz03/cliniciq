---
phase: quick
plan: 9
type: execute
wave: 1
depends_on: []
files_modified:
  - about.html
  - contact.html
  - blog/gp-clinic-automation-2026.html
  - blog/healthcare-automation-roi.html
  - blog/understanding-swpe-guide.html
  - index.html
  - automations.html
  - calculators.html
  - downloads.html
  - websites.html
  - blog.html
  - faq.html
  - glossary.html
  - privacy-policy.html
  - terms-of-service.html
autonomous: true
requirements:
  - EEAT-01
  - EEAT-02
  - EEAT-03
  - EEAT-04
must_haves:
  truths:
    - "About page exists with John Saenz credentials and background"
    - "Contact page exists with proper contact information and form"
    - "All blog posts have author byline with John Saenz attribution"
    - "All blog posts have visible publication dates"
    - "Navigation updated on all pages to link to About and Contact pages"
    - "All pages preserve lighthouse optimizations"
  artifacts:
    - path: "about.html"
      provides: "About page with John Saenz bio, credentials, and E-E-A-T signals"
      min_lines: 200
    - path: "contact.html"
      provides: "Contact page with form and business contact information"
      min_lines: 150
    - path: "blog/gp-clinic-automation-2026.html"
      provides: "Blog post with author byline and date"
      contains: "John Saenz"
    - path: "blog/healthcare-automation-roi.html"
      provides: "Blog post with author byline and date"
      contains: "John Saenz"
    - path: "blog/understanding-swpe-guide.html"
      provides: "Blog post with author byline and date"
      contains: "John Saenz"
  key_links:
    - from: "index.html navigation"
      to: "about.html"
      via: "About link"
    - from: "index.html navigation"
      to: "contact.html"
      via: "Contact link"
    - from: "blog posts"
      to: "about.html"
      via: "Author bio link"
---

<objective>
Implement E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) improvements by creating dedicated About and Contact pages with John Saenz credentials, and adding author attribution and publication dates to all blog posts.

Purpose: Address SEO audit findings for missing About page, Contact page, author attribution, and content dates to improve search engine trust signals.
Output: about.html, contact.html, updated blog posts with author bylines and dates, updated navigation across all pages.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@/Users/jsaenz-macbook/recreatesite/cliniciq/index.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/blog/gp-clinic-automation-2026.html

## John Saenz Background Information
- Name: John Saenz
- Role: Founder, ClinicIQ Solutions
- Professional: Registered Nurse in GP clinic with 5+ years experience
- Education: Bachelor of Information Systems Management and Accounting, Victoria University
- Honors: Member of Golden Key Society
- Additional: Background in Quality Assurance and Data Analytics
- Experience: 3+ years as Nurse Technologist
- Company: ClinicIQ Solutions - Healthcare Automation & Tools for GP Clinics

## E-E-A-T Issues to Fix (from audit)
1. No About page found (eeat/about-page)
2. No author attribution (eeat/author-byline) - No content pages have author attribution
3. No Contact page found (eeat/contact-page)
4. No content dates (eeat/content-dates) - No datePublished on content pages

## Design Requirements
- Match existing site design using styles.css
- Follow existing navigation structure
- Include proper meta tags (Open Graph, Twitter Cards)
- Include JSON-LD structured data (Person schema for John Saenz)
- Add links to new pages in navigation of all pages
- Preserve all lighthouse optimizations (preload hints, image dimensions, etc.)
- Use existing color palette: Primary Green #2C4A3C, Gold Accent #C4A661, Cream Background #F5F1E6
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create About page with John Saenz credentials</name>
  <files>about.html</files>
  <action>Create a complete About page (about.html) that showcases John Saenz's credentials and establishes E-E-A-T signals. Include:

1. **Header Section**: Page title "About ClinicIQ Solutions & John Saenz" with meta description
2. **Hero Section**: Brief intro about ClinicIQ Solutions mission
3. **Founder Section**: John Saenz bio with:
   - Professional photo placeholder (use existing logo or hero image)
   - Full credentials: Registered Nurse (5+ years GP clinic experience)
   - Education: Bachelor of Information Systems Management and Accounting, Victoria University
   - Honors: Golden Key Society member
   - Experience: Quality Assurance, Data Analytics, 3+ years Nurse Technologist
   - Personal note about being a one-man team behind ClinicIQ
4. **Expertise Section**: Highlight healthcare + technology dual expertise
5. **Trust Signals**: RACGP compliance, Australian based, Nurse-led design
6. **Structured Data**: Add Person schema for John Saenz with credentials, Organization schema for ClinicIQ
7. **Meta Tags**: Full Open Graph and Twitter Card tags
8. **Navigation**: Include same nav as index.html with links to new Contact page
9. **Footer**: Same footer structure as other pages
10. **Lighthouse Optimizations**: Preload critical CSS, explicit image dimensions, proper loading attributes

Follow the exact HTML structure pattern from index.html for consistency. Use existing CSS classes from styles.css. Include skip-to-content link and proper ARIA labels.</action>
  <verify>File about.html exists and contains John Saenz credentials, Person schema, proper navigation, and follows site design patterns</verify>
  <done>About page created with complete John Saenz bio, credentials, education, honors, and structured data</done>
</task>

<task type="auto">
  <name>Task 2: Create Contact page with business information</name>
  <files>contact.html</files>
  <action>Create a complete Contact page (contact.html) with comprehensive business contact information. Include:

1. **Header Section**: Page title "Contact ClinicIQ Solutions" with meta description
2. **Hero Section**: "Get in Touch" heading with brief intro
3. **Contact Information Section**:
   - Business Name: ClinicIQ Solutions
   - Location: Wollongong NSW 2500, Australia
   - Email: admin@cliniciq.com.au
   - Phone: +61 605 372 757
   - Business Hours: Monday-Friday 9:00 AM - 6:00 PM, Saturday closed, Sunday by appointment
4. **Contact Form**: Same form structure as index.html contact section
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Message (required)
   - Submit button
5. **Map Section**: Google Maps embed for Wollongong location (lazy-loaded)
6. **FAQ Teaser**: Link to FAQ page for common questions
7. **Structured Data**: LocalBusiness schema with complete address, hours, contact info
8. **Meta Tags**: Full Open Graph and Twitter Card tags
9. **Navigation**: Same nav as index.html with active Contact link
10. **Footer**: Same footer structure as other pages
11. **Lighthouse Optimizations**: Preload critical resources, proper image handling

Follow the exact HTML structure pattern from index.html. Use existing CSS classes. Include form validation and proper ARIA labels.</action>
  <verify>File contact.html exists with complete contact information, working form, LocalBusiness schema, and proper navigation</verify>
  <done>Contact page created with business contact details, form, map, and structured data</done>
</task>

<task type="auto">
  <name>Task 3: Add author bylines and update navigation across all pages</name>
  <files>
    blog/gp-clinic-automation-2026.html
    blog/healthcare-automation-roi.html
    blog/understanding-swpe-guide.html
    index.html
    automations.html
    calculators.html
    downloads.html
    websites.html
    blog.html
    faq.html
    glossary.html
    privacy-policy.html
    terms-of-service.html
  </files>
  <action>Update all blog posts with author attribution and visible dates, then update navigation on all pages to link to new About and Contact pages.

**Blog Post Updates (3 files):**
For each blog post (gp-clinic-automation-2026.html, healthcare-automation-roi.html, understanding-swpe-guide.html):

1. **Add Author Byline**: After the article title, add an author section with:
   - Author name: "John Saenz"
   - Author title: "Registered Nurse & Founder, ClinicIQ Solutions"
   - Link to about.html for author bio
   - Small author avatar (use logo or placeholder)
   - Publication date displayed prominently

2. **Update BlogPosting Schema**: Change author from Organization to Person:
   ```json
   "author": {
     "@type": "Person",
     "name": "John Saenz",
     "jobTitle": "Registered Nurse & Founder",
     "url": "https://cliniciq.com.au/about.html"
   }
   ```

3. **Visible Date**: Ensure date is clearly visible in article meta section

**Navigation Updates (all HTML files):**
Update navigation in all 12+ HTML files to change:
- `<a href="#about" class="nav-link">About</a>` → `<a href="about.html" class="nav-link">About</a>`
- `<a href="#contact" class="nav-link">About</a>` → `<a href="contact.html" class="nav-link">Contact</a>`

Files to update:
- index.html
- automations.html
- calculators.html
- downloads.html
- websites.html
- blog.html
- faq.html
- glossary.html
- privacy-policy.html
- terms-of-service.html
- blog/gp-clinic-automation-2026.html
- blog/healthcare-automation-roi.html
- blog/understanding-swpe-guide.html

**Footer Updates:**
Update footer links that reference #about and #contact to point to about.html and contact.html

Preserve all existing lighthouse optimizations, meta tags, and structured data while making these changes.</action>
  <verify>All blog posts show author byline with John Saenz, all navigation links point to about.html and contact.html, all pages load correctly</verify>
  <done>All blog posts have author attribution and dates, navigation updated across all 12+ pages</done>
</task>

</tasks>

<verification>
1. **About Page Verification:**
   - about.html exists and loads correctly
   - Contains John Saenz full credentials and bio
   - Has Person schema with proper credentials
   - Navigation links work correctly
   - Mobile responsive

2. **Contact Page Verification:**
   - contact.html exists and loads correctly
   - Contact form is functional
   - LocalBusiness schema is present
   - All contact information is accurate
   - Map loads correctly

3. **Blog Post Verification:**
   - All 3 blog posts have author byline
   - Author links to about.html
   - Publication dates are visible
   - BlogPosting schema has Person as author

4. **Navigation Verification:**
   - All pages link to about.html (not #about)
   - All pages link to contact.html (not #contact)
   - No broken links
   - Active page highlighting works

5. **SEO Verification:**
   - Open Graph tags present on new pages
   - Twitter Card tags present
   - Structured data validates
   - Meta descriptions under 160 characters
</verification>

<success_criteria>
- about.html created with John Saenz credentials, education, honors, and professional background
- contact.html created with complete business contact information and working form
- All 3 blog posts display author byline linking to John Saenz bio
- All 3 blog posts show visible publication dates
- All 12+ HTML pages have updated navigation linking to about.html and contact.html
- All lighthouse optimizations preserved (preload hints, image dimensions, etc.)
- All structured data validates correctly (Person, LocalBusiness, BlogPosting schemas)
- No broken links or navigation issues
- Mobile responsive design maintained
</success_criteria>

<output>
After completion, create `.planning/quick/9-implement-e-e-a-t-improvements-using-joh/9-SUMMARY.md`
</output>
