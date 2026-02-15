## ADDED Requirements

### Requirement: Canonical Tag Implementation
All HTML pages SHALL include self-referencing canonical tags to prevent duplicate content issues.

#### Scenario: Canonical tag on homepage
- **GIVEN** the user visits index.html
- **WHEN** the page loads
- **THEN** the HTML head contains `<link rel="canonical" href="https://cliniciq.com.au/">`

#### Scenario: Canonical tag on service pages
- **GIVEN** the user visits any service page
- **WHEN** the page loads
- **THEN** the HTML head contains a self-referencing canonical tag with the correct URL

### Requirement: JSON-LD Schema Markup
All pages SHALL include structured data using JSON-LD format for rich snippet eligibility.

#### Scenario: Organization schema on all pages
- **GIVEN** any page on the site
- **WHEN** the page HTML is inspected
- **THEN** it contains Organization schema with name, URL, logo, address, and contact info

#### Scenario: SoftwareApplication schema for products
- **GIVEN** the automations page displays products
- **WHEN** the page HTML is inspected
- **THEN** each of the 8 products has a SoftwareApplication schema with name, category, description, and offers

#### Scenario: BreadcrumbList schema for navigation
- **GIVEN** a user visits a service page
- **WHEN** the page HTML is inspected
- **THEN** it contains BreadcrumbList schema showing the navigation path

#### Scenario: LocalBusiness schema
- **GIVEN** the homepage loads
- **WHEN** the page HTML is inspected
- **THEN** it contains LocalBusiness schema with Wollongong address and contact details

### Requirement: Open Graph Meta Tags
All pages SHALL include Open Graph meta tags for improved social sharing.

#### Scenario: OG tags on homepage
- **GIVEN** the homepage is loaded
- **WHEN** the page HTML is inspected
- **THEN** it contains og:title, og:description, og:image, og:url, and og:type tags

#### Scenario: OG tags on all service pages
- **GIVEN** any service page is loaded
- **WHEN** the page HTML is inspected
- **THEN** it contains complete Open Graph meta tag set with page-specific content

### Requirement: FAQ Page and Schema
The site SHALL have a dedicated FAQ page with structured data markup.

#### Scenario: FAQ page exists
- **GIVEN** a user navigates to /faq.html
- **WHEN** the page loads
- **THEN** it displays 8-10 frequently asked questions with answers

#### Scenario: FAQ schema markup
- **GIVEN** the FAQ page is loaded
- **WHEN** the page HTML is inspected
- **THEN** it contains FAQPage schema with Question and Answer entities

### Requirement: Blog Section
The site SHALL have a blog section with articles targeting healthcare automation keywords.

#### Scenario: Blog index page
- **GIVEN** a user navigates to /blog/
- **WHEN** the page loads
- **THEN** it displays a listing of blog posts with titles, excerpts, and publication dates

#### Scenario: Individual blog posts
- **GIVEN** a user clicks a blog post
- **WHEN** the post page loads
- **THEN** it displays the full article with Article schema markup

#### Scenario: Blog posts have target keywords
- **GIVEN** a blog post is published
- **WHEN** the content is analyzed
- **THEN** it targets one primary keyword from the SEO strategy

### Requirement: Glossary Page
The site SHALL have a glossary page defining healthcare automation terms.

#### Scenario: Glossary page exists
- **GIVEN** a user navigates to /glossary.html
- **WHEN** the page loads
- **THEN** it displays 15-20 defined terms alphabetically

#### Scenario: Glossary links from calculators
- **GIVEN** a user views the calculators page
- **WHEN** they see an acronym like SWPE or PIP
- **THEN** it is linked to the glossary definition

### Requirement: Testimonials Section
The homepage SHALL display client testimonials with schema markup.

#### Scenario: Testimonials displayed
- **GIVEN** the homepage loads
- **WHEN** the user scrolls to the testimonials section
- **THEN** it displays 3 client testimonials with quotes, names, and clinic names

#### Scenario: Testimonial schema
- **GIVEN** the testimonials section is present
- **WHEN** the HTML is inspected
- **THEN** each testimonial has Review schema markup

## MODIFIED Requirements

### Requirement: Heading Hierarchy on Downloads Page
The downloads page category headers SHALL use proper H2 tags instead of H3 for semantic structure.

#### Scenario: Downloads page headings
- **GIVEN** the downloads page loads
- **WHEN** the heading structure is analyzed
- **THEN** category headers use H2 tags maintaining visual styling via CSS
- **AND** the heading hierarchy follows H1 → H2 → H3 pattern

### Requirement: Expanded Product Descriptions
Automation product descriptions SHALL include features, use cases, and target audience information.

#### Scenario: Product card content
- **GIVEN** the automations page displays products
- **WHEN** a product card is viewed
- **THEN** it includes: description, key features list, and "Perfect For" section
- **AND** the total word count per product is 75-100 words

### Requirement: Expanded Websites Page Content
The websites page SHALL have comprehensive content including process, FAQ, and case study sections.

#### Scenario: Websites page content depth
- **GIVEN** the websites page loads
- **WHEN** the content is analyzed
- **THEN** it includes: Our Process, Why Choose Us, FAQ, and Case Study sections
- **AND** the total word count is 500+ words

### Requirement: Internal Linking Between Services
Service pages SHALL include contextual links to related services.

#### Scenario: Cross-linking on automations page
- **GIVEN** a user views the automations page
- **WHEN** they read the content
- **THEN** they find links to calculators and downloads with descriptive anchor text

#### Scenario: Cross-linking on calculators page
- **GIVEN** a user views the calculators page
- **WHEN** they read the content
- **THEN** they find links to automations with descriptive anchor text

### Requirement: Fixed Alt Text on MedPlan AI
The MedPlan AI product image SHALL have descriptive alt text.

#### Scenario: MedPlan AI alt text
- **GIVEN** the automations page loads
- **WHEN** the MedPlan AI image alt text is inspected
- **THEN** it reads "MedPlan AI - Patient care planning automation for GP clinics"
- **AND** it no longer contains "CRM Workflow Automation"

## REMOVED Requirements

### Requirement: Placeholder Sponsor Images
N/A - Sponsor section already updated with proper images and alt text in Phase 1.
