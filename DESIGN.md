# Design System: ClinicIQ Solutions

**Project:** ClinicIQ Solutions Website  
**Last Updated:** 2025-11-07  
**Version:** 2.0

---

## 1. Visual Theme & Atmosphere

### Overall Aesthetic
The ClinicIQ design embodies **professional healthcare modernity** with a clean, trustworthy, and technology-forward presence. The visual language communicates:

- **Clinical Precision:** Clean lines, organized grids, and structured layouts convey reliability and attention to detail
- **Approachable Technology:** Soft gradients and rounded corners create a friendly, unintimidating interface for healthcare professionals
- **Australian Healthcare Context:** RACGP compliance badges and nurse-led design messaging establish local credibility
- **Modern Sophistication:** Subtle animations and depth effects suggest cutting-edge automation without being overwhelming

### Visual Density
**Medium-to-light density** with generous whitespace. Content breathes with:
- 6rem (96px) spacing between major sections
- 2-3rem padding within containers
- 1.5-2rem gaps between grid items
- Clear visual hierarchy through size and weight variations

### Mood Keywords
Professional, Trustworthy, Modern, Clean, Accessible, Innovative, Reliable, Efficient

---

## 2. Color Palette & Roles

### Primary Color Palette

#### Uranian Blue (#a9cef4)
- **Role:** Accent highlight, hover states,CTA buttons, links
- **Usage:** Button backgrounds, active states, icons, decorative elements
- **Psychology:** Calming, trustworthy, medical associations

#### Outer Space (#36494e)
- **Role:** Primary navy, text headings, footer backgrounds, primary button variant
- **Usage:** H1-H3 headings, dark backgrounds, hover states
- **Psychology:** Professional, stable, authoritative

#### Air Superiority Blue (#7ea0b7)
- **Role:** Secondary blue, muted accents, borders
- **Usage:** Section headings, borders, secondary UI elements
- **Psychology:** Balanced, professional, not too aggressive

#### Payne's Gray (#597081)
- **Role:** Tertiary gray-blue, body text, muted elements
- **Usage:** Paragraph text, descriptions, less prominent content
- **Psychology:** Neutral, readable, doesn't compete with content

### Background Colors

#### Off-White (#FEFEFE)
- **Role:** Primary background, card backgrounds, form inputs
- **Usage:** Main page background, container backgrounds
- **Note:** Pure white with slight warmth for reduced eye strain

#### Gradient Body Background
- **CSS:** `linear-gradient(135deg, #FEFEFE 0%, #f7f9fb 50%, #f0f4f8 100%)`
- **Role:** Subtle depth, prevents flat appearance
- **Usage:** Overall page background with fixed attachment

#### Mint Tints (rgba(169, 206, 244, 0.03-0.1))
- **Role:** Section differentiation, card hover states
- **Usage:** Alternate section backgrounds, hovered cards
- **Note:** Very subtle, creates visual separation without harsh lines

### Text Colors

#### Black (#000000)
- **Role:** Primary text, highest contrast
- **Usage:** Body text, critical information, form labels

#### Outer Space (#36494e)
- **Role:** Secondary text, section headings
- **Usage:** H2-H4 headings, subheadings, emphasis text

#### Payne's Gray (#597081)
- **Role:** Muted text, helper text, timestamps
- **Usage:** Form helper text, captions, meta information

#### White (#FFFFFF)
- **Role:** Text on dark backgrounds
- **Usage:** Button text on dark backgrounds, header text

### Border & Accent Colors

#### Border Light (rgba(169, 206, 244, 0.2))
- **Role:** Subtle borders, dividers
- **Usage:** Card borders, input borders, section dividers

#### Border Medium (rgba(169, 206, 244, 0.4))
- **Role:** More visible borders
- **Usage:** Focus states, active states

### Shadow System

#### Shadow Light (rgba(0, 0, 0, 0.1))
- **Role:** Subtle elevation
- **Usage:** Cards, buttons, dropdowns

#### Shadow Medium (rgba(0, 0, 0, 0.15))
- **Role:** Moderate elevation
- **Usage:** Modals, floating elements, navbar

---

## 3. Typography Rules

### Font Families

#### Primary: Ubuntu
- **CSS:** `'Ubuntu', -apple-system, BlinkMacSystemFont, sans-serif`
- **Role:** All body text, UI elements, buttons
- **Weights Used:** Light (300), Regular (400), Medium (500), Bold (700)
- **Characteristics:** Humanist sans-serif, warm and approachable, excellent readability

#### Display: Ubuntu Mono
- **CSS:** `'Ubuntu Mono', 'Courier New', 'Courier', monospace`
- **Role:** Section titles, hero headlines
- **Weights Used:** Semi-bold (600), Bold (700), Extra-bold (800)
- **Characteristics:** Technical precision, modern, stands out

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 (Hero) | 2.75rem (44px) | 700/800 | 1.2 | Main hero headline |
| H2 (Section) | 2.5rem (40px) | 600 | 1.2 | Section titles |
| H3 (Card) | 1.5rem (24px) | 600 | 1.3 | Card titles |
| H4 (Small) | 1.125rem (18px) | 500-600 | 1.4 | Subsection titles |
| Body | 1rem (16px) | 400 | 1.6 | Paragraph text |
| Small | 0.875rem (14px) | 400 | 1.5 | Captions, helpers |
| X-Small | 0.75rem (12px) | 600 | 1.5 | Badges, tags |

### Letter Spacing
- **Headings:** Normal (0em) - tight and modern
- **All caps tags:** 0.15em - hero tagline, badges
- **Body:** Normal

### Text Alignment
- **Headings:** Center-aligned for section headers
- **Body:** Left-aligned for readability
- **Hero:** Left-aligned on desktop, center on mobile

### Font Loading Strategy
- Preload all weights (Light, Regular, Medium, Bold)
- Hide page content until fonts load (prevents FOUT)
- Use font-display: swap as fallback
- Respect prefers-reduced-motion (show content immediately)

---

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** Air Superiority Blue (#7ea0b7)
- **Text:** White
- **Border:** 2px solid, matches background
- **Shape:** Rounded corners (0.5rem / 8px)
- **Padding:** 14px 28px
- **Hover:** Background darkens, lifts 2-3px, scales 1.02-1.03
- **Active:** Scales down to 0.97 (press effect)
- **Shadow:** 0 4px 12px rgba(54, 73, 78, 0.3)

#### Secondary Button
- **Background:** Transparent or white
- **Text:** Outer Space (#36494e)
- **Border:** 2px solid Outer Space
- **Shape:** Same as primary
- **Hover:** Inverts colors (navy background, white text)

#### Button States
- **Loading:** Spinner animation, text becomes transparent
- **Disabled:** 60% opacity, no pointer events
- **Focus:** No outline (design choice), relies on hover state

#### Two-Line Button Text
- **Main text:** 1.125rem, weight 600
- **Sub text:** 0.75rem, weight 400, 90% opacity
- **Gap:** 2px between lines

### Cards & Containers

#### Service/Specialty Card
- **Background:** Subtle gradient (f8fafc to f0f4f8)
- **Border:** None (uses shadow instead)
- **Corner Radius:** 0.75rem (12px) - gently rounded
- **Shadow:** Subtle, increases on hover
- **Hover:** Lifts 10px, scales 1.02, image zooms 1.08
- **Padding:** 1.5rem
- **Image:** Top half, rounded top corners
- **Content:** Bottom half, aligned left

#### Testimonial Card
- **Background:** White to off-white gradient
- **Corner Radius:** 0.75rem (12px)
- **Padding:** 2rem
- **Hover:** Lifts 8px, scales 1.03, background brightens
- **Transition:** Bouncy easing (cubic-bezier(0.34, 1.56, 0.64, 1))

#### Dropdown Card (Mega Menu)
- **Background:** Transparent
- **Hover Background:** Mint tint (rgba(169, 206, 244, 0.1))
- **Corner Radius:** 0.5rem (8px)
- **Padding:** 1rem
- **Icon:** 40x40px, rounded 8px, light blue background
- **Hover Icon:** Solid blue background, white icon

### Navigation

#### Navbar (Floating Pill)
- **Position:** Fixed, 16px from top, centered horizontally
- **Shape:** Pill-shaped (16px corner radius)
- **Width:** Max 1000px, calc(100% - 32px)
- **Background:** Gradient white (98% opacity) with blur
- **Border:** 1px solid rgba(169, 206, 244, 0.15)
- **Shadow:** 0 4px 20px rgba(0, 0, 0, 0.1)
- **Scrolled State:** Stronger shadow (0 8px 35px)

#### Nav Links
- **Weight:** 500
- **Hover:** Color change to blue, slight lift (1px), underline animation
- **Active:** Blue color, full-width underline
- **Underline:** 2px high, centered, grows from center on hover

#### Mobile Menu
- **Position:** Fixed, below navbar
- **Background:** White
- **Animation:** Slide down from above (-100% to 0)
- **Corner Radius:** 12px
- **Shadow:** 0 10px 27px rgba(0, 0, 0, 0.1)

### Inputs & Forms

#### Form Fields (General)
- **Border:** 2px solid light blue (rgba(169, 206, 244, 0.2))
- **Corner Radius:** 0.5rem (8px)
- **Padding:** 0.875rem 1rem
- **Background:** White (#FEFEFE)
- **Focus:** Border turns blue, lifts 2px, shadow appears
- **Label Animation:** Floats up and scales when focused or filled

#### Newsletter Form (Inline)
- **Layout:** Row direction, input and button side by side
- **Input:** Flexes to fill space
- **Button:** Fixed width, doesn't shrink
- **Label:** Absolute positioning, floats above on focus

#### Contact Form (Stacked)
- **Layout:** Column direction
- **Fields:** Full width
- **Helper Text:** Small, muted, below field

#### Chat Widget
- **Toggle Button:** 60x60px, gradient background, rounded full
- **Container:** 380px wide, rounded 16px
- **Header:** Gradient background, white text
- **Messages:** alternating left/right, different colors
- **Input:** Fixed at bottom, rounded top corners

---

## 5. Layout Principles

### Container System
- **Max Width:** 1200px
- **Mobile Padding:** 1rem (16px) sides
- **Tablet Padding:** 2rem (32px) sides
- **Desktop Padding:** 3rem (48px) sides
- **Centering:** Auto left/right margins

### Spacing Scale
- **XS:** 0.5rem (8px) - tight gaps
- **SM:** 1rem (16px) - small spacing
- **MD:** 1.5rem (24px) - medium spacing
- **LG:** 2rem (32px) - large spacing
- **XL:** 3rem (48px) - extra large spacing
- **2XL:** 4rem (64px) - section spacing
- **3XL:** 6rem (96px) - major section breaks

### Grid Systems

#### Services Grid (2-column)
- **Desktop:** 2 columns, 2rem gap
- **Tablet:** 2 columns, 1.5rem gap
- **Mobile:** 1 column, 1.5rem gap

#### Mega Dropdown Grid (2-column)
- **Columns:** 2 equal columns
- **Gap:** 1rem
- **Card Size:** Flexible, min 180px width

### Section Spacing
- **Top Padding:** 6rem (96px) for major sections
- **Bottom Padding:** 4-6rem (64-96px)
- **Header Margin:** 3rem (48px) bottom
- **Card Gaps:** 2rem (32px)

### Hero Layout
- **Desktop:** 2-column grid (text left, image right), 6rem gap
- **Tablet:** Same grid, 3rem gap
- **Mobile:** Stacked vertically, 2rem gap
- **Padding:** 160px top (clear navbar), 4rem bottom

### Alignment Strategy
- **Headings:** Center-aligned for sections
- **Text:** Left-aligned for readability (except hero on mobile)
- **Cards:** Left-aligned content, centered containers
- **Buttons:** Center-aligned in hero, left-aligned in cards

---

## 6. Animation & Motion

### Timing Functions
- **Instant:** 0.1s - immediate feedback
- **Fast:** 0.25s - standard hover
- **Normal:** 0.4s - content transitions
- **Slow:** 0.6s - major state changes

### Easing Curves
- **Smooth:** cubic-bezier(0.4, 0.0, 0.2, 1) - standard
- **Bounce:** cubic-bezier(0.34, 1.56, 0.64, 1) - playful
- **Emphasized:** cubic-bezier(0.2, 0.0, 0.0, 1.0) - dramatic
- **Decelerated:** cubic-bezier(0.0, 0.0, 0.2, 1) - smooth entry
- **Accelerated:** cubic-bezier(0.4, 0.0, 1, 1) - quick exit

### Common Animations

#### Fade In Up
- **Duration:** 0.6s
- **Easing:** Decelerated
- **Transform:** translateY(30px) → 0, opacity 0 → 1

#### Hero Title Slide
- **Duration:** 0.7s
- **Easing:** Emphasized
- **Transform:** translateY(20px) → 0, opacity 0 → 1
- **Stagger:** 0.1s delay between lines

#### Card Hover Lift
- **Duration:** 0.4s
- **Easing:** Bounce
- **Transform:** translateY(-10px) scale(1.02)

#### Button Press
- **Duration:** 0.1s
- **Easing:** Emphasized
- **Transform:** scale(0.97)

#### Loading Spinner
- **Duration:** 0.8s
- **Timing:** Linear
- **Animation:** Rotate 360deg

### Stagger Delays
- **Fast:** 0.08s - rapid sequences
- **Normal:** 0.12s - standard sequences
- **Slow:** 0.16s - dramatic sequences

### Reduced Motion
- **Respects prefers-reduced-motion**
- **Disables animations**
- **Shows content immediately**
- **Simpler transitions (0.2s standard)**

---

## 7. Interactive Elements

### Cursor Behavior
- **Default cursor:** Used for all interactive elements (design choice)
- **Override:** All buttons, links, inputs use default cursor
- **Rationale:** Creates a cleaner, less aggressive interface

### Hover States
- **Buttons:** Lift 2-3px, scale 1.02-1.03, color shift
- **Cards:** Lift 8-10px, scale 1.02-1.03, shadow increase
- **Links:** Color change, underline animation
- **Images:** Scale 1.05-1.08 (contained within overflow)

### Focus States
- **Inputs:** Border color change, lift effect, shadow
- **Buttons:** Rely on hover state (no outline)
- **Navigation:** Underline animation

### Loading States
- **Buttons:** Text fades, spinner appears
- **Forms:** Submit button shows loading state
- **Duration:** Until action completes

### Magnetic Effect
- **Applied to hero buttons via JavaScript**
- **Buttons follow cursor slightly when hovering**
- **Enhanced hover effects without conflicting transforms**

---

## 8. Responsive Breakpoints

### Mobile First Approach
- **Base:** < 640px (Mobile)
- **SM:** 640px - 768px (Large mobile)
- **MD:** 768px - 1024px (Tablet)
- **LG:** 1024px - 1200px (Desktop)
- **XL:** > 1200px (Large desktop)

### Mobile Adaptations
- **Navbar:** Becomes hamburger menu
- **Hero:** Stacks vertically, center-aligns text
- **Grids:** Single column
- **Typography:** Scales down (1.6rem hero title)
- **Spacing:** Reduced padding and gaps
- **Touch Targets:** Minimum 44px height

### Tablet Adaptations
- **Navbar:** Full navigation, slight width reduction
- **Hero:** 2-column grid, reduced gap
- **Grids:** 2 columns
- **Typography:** Medium sizes (2rem hero title)
- **Spacing:** Moderate padding

---

## 9. Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1-h4)
- ARIA labels on interactive elements
- Skip to main content link
- Semantic article and section tags

### Focus Management
- Visible focus states on inputs
- Logical tab order
- Keyboard navigation support

### Screen Reader Support
- Alt text on all images
- ARIA labels on icons and buttons
- aria-live regions for dynamic content
- aria-describedby for form helpers

### Color Contrast
- All text meets WCAG AA standards
- 4.5:1 ratio for body text
- 3:1 ratio for large text
- Focus on readability

### Motion Preferences
- Respects prefers-reduced-motion
- Disables animations when requested
- Shows content immediately without waiting

---

## 10. Brand Elements

### Logo
- **File:** photos/cliniciq-logo.webp
- **Format:** WebP (84 KB)
- **Dimensions:** 1600x900px (16:9 ratio)
- **Display Size:** 80x45px (CSS scaled)
- **Placement:** Top left of navbar
- **Loading:** Eager (above the fold)
- **Alt Text:** "ClinicIQ Solutions"

### Trust Badges
- **RACGP Compliant:** Healthcare credibility
- **Australian Based:** Local presence
- **Nurse-Led Design:** Clinical expertise

### Social Proof
- **Testimonials:** Real quotes from healthcare professionals
- **Partner Logos:** Carousel of trusted partners
- **Metrics:** Founded year, satisfaction guarantees

---

## 11. Icon System

### Feather Icons
- **Style:** Thin stroke (2px)
- **Size:** 24x24px standard
- **Color:** Current text color
- **Usage:** Navigation, buttons, cards

### SVG Implementation
- Inline SVG for performance
- Fill and stroke attributes
- ViewBox for scaling
- ARIA labels for accessibility

### Icon Colors
- **Default:** Inherits text color
- **Hover:** Changes with parent element
- **Active:** Specific active color

---

## 12. Z-Index Scale

### Layer System
- **Dropdown:** 1000
- **Sticky:** 1020
- **Fixed:** 1030 (navbar)
- **Modal:** 1040
- **Popover:** 1050
- **Tooltip:** 1060
- **Chat Widget:** 1100

---

## Usage Guidelines

### When Creating New Components
1. **Use existing variables** from CSS custom properties
2. **Follow spacing scale** for consistency
3. **Match animation timings** to create cohesive feel
4. **Test at all breakpoints** (mobile, tablet, desktop)
5. **Ensure keyboard navigation** works
6. **Add ARIA labels** for screen readers
7. **Include hover states** for interactive elements
8. **Consider reduced motion** preferences

### When Modifying Existing Components
1. **Preserve color relationships** (primary, secondary, accent)
2. **Maintain corner radius consistency** within component types
3. **Keep shadow depths** appropriate for elevation
4. **Test animations** for smoothness
5. **Verify responsive behavior** at breakpoints

### Color Usage Rules
- **Primary Blue (Uranian):** CTAs, highlights, active states
- **Primary Navy (Outer Space):** Headings, dark backgrounds
- **Secondary Blue (Air Superiority):** Subheadings, borders
- **Tertiary Gray (Payne's):** Body text, descriptions
- **Mint Tints:** Background differentiation, hover states

### Typography Rules
- **Ubuntu for everything** except display headings
- **Ubuntu Mono for section titles** and hero headlines
- **Bold for emphasis,** not for entire paragraphs
- **Proper hierarchy** (h1 → h2 → h3 → h4)
- **Line height 1.6 for body text** for readability

---

## Design Principles Summary

1. **Professional First:** Every element communicates reliability and expertise
2. **Subtle Depth:** Gradients and shadows create sophistication without clutter
3. **Purposeful Motion:** Animations guide attention, not distract
4. **Responsive by Default:** Mobile-first approach with desktop enhancements
5. **Accessible Always:** WCAG compliance, keyboard navigation, screen reader support
6. **Consistent Spacing:** Mathematical scale creates visual rhythm
7. **Clear Hierarchy:** Size, weight, and color guide the eye
8. **Trust Signals:** Testimonials, badges, and metrics build credibility

---

*This design system is a living document. Update it as the design evolves.*
*For questions or clarifications, refer to styles.css for implementation details.*
