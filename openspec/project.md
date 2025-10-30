# Project Context

## Purpose
ClinicIQ Solutions is a business automation solutions website showcasing luxury service offerings with a focus on elegance and professional presentation. The site serves as a digital storefront and information hub for business automation services, featuring a sophisticated menu system, company information, and client contact capabilities.

**Primary Goals**:
- Present business automation solutions in a professional, luxury brand context
- Provide intuitive menu browsing with category filtering
- Enable client contact and newsletter subscription
- Deliver exceptional user experience across all devices
- Maintain fast load times and smooth interactions

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Typography**: Google Fonts (Inter for body, Playfair Display for headings)
- **Offline Support**: Not enabled — service worker intentionally removed to let Netlify handle caching/analytics
- **Build System**: None - pure static files for maximum simplicity and performance
- **Deployment**: Static hosting ready (Netlify, Vercel, GitHub Pages compatible)

## Project Conventions

### Code Style
**HTML**:
- Semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`)
- BEM-inspired class naming: `.menu-item`, `.menu-item-header`, `.menu-item-content`
- ARIA attributes for accessibility: `aria-label`, `aria-expanded`, `role`
- Data attributes for functionality: `data-category`, `data-filter`

**CSS**:
- Mobile-first responsive design approach
- CSS custom properties for color palette
- Consistent spacing scale (0.5rem, 1rem, 2rem, 4rem)
- Class-based styling (no inline styles)
- Utility classes for common patterns (`.hidden`, `.fade-in`)

**JavaScript**:
- ES6+ class-based components (`MenuFilter`, `ContactForm`, `Newsletter`)
- Event delegation for performance
- Descriptive method names: `filterItems()`, `handleSubmit()`, `toggleNav()`
- Initialization pattern: `init()` methods for component setup

### Architecture Patterns
**Component Structure**:
- Self-contained JavaScript classes for interactive features
- Separation of concerns: HTML (structure), CSS (presentation), JS (behavior)
- Progressive enhancement: core content works without JavaScript

**File Organization**:
```
/
├── index.html          # Single-page application structure
├── styles.css          # All styles in one file
├── script.js           # All JavaScript in one file
└── specs/             # Feature specifications and plans
```

**Data Patterns**:
- HTML data attributes for component configuration
- DOM-based state management (no external state libraries)
- Filter system using CSS class toggling (`.hidden`)

### Testing Strategy
**Manual Testing Focused**:
- Browser validation: Chrome, Firefox, Safari, Edge
- Device testing: Desktop, tablet, mobile viewports
- Feature validation using `specs/001-recreate-this-website/quickstart.md`
- Performance monitoring: Load time < 3 seconds target

**No Automated Tests**:
- Static site with minimal complexity doesn't require test suite
- Manual QA provides sufficient coverage for current scope
- Focus on visual regression and cross-browser compatibility

**Validation Checklist**:
1. All menu filters working correctly
2. Forms submit successfully
3. Mobile navigation toggles properly
4. Smooth scroll navigation functions
5. Animations perform at 60fps
6. Images load and display correctly

### Git Workflow
**Branching Strategy**:
- `main`: Production-ready code (default branch)
- `001-recreate-this-website`: Feature development branch
- Feature branches: Created as needed for new functionality

**Commit Conventions**:
- Descriptive commit messages explaining changes
- Co-authored commits with Claude Code:
  ```
  🤖 Generated with Claude Code

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

**Deployment Flow**:
- Develop on feature branches
- Merge to `001-recreate-this-website` for testing
- Deploy directly to hosting from main branch

## Domain Context

### Business Automation Solutions
ClinicIQ Solutions specializes in business automation services with a luxury brand positioning. The website emphasizes:
- **Professional Excellence**: High-end service presentation
- **Elegant Design**: Luxury color palette and typography
- **User Experience**: Smooth, intuitive interactions
- **Mobile-First**: Responsive design for all devices

### Color Palette Philosophy
- **Primary Green (#2C4A3C)**: Nature-inspired luxury, professionalism, trust
- **Gold Accent (#C4A661)**: Premium quality, exclusivity, sophistication
- **Cream Background (#F5F1E6)**: Elegant neutrality, readability, warmth

### Menu System Architecture
The menu is organized into four categories:
1. **Coffee**: Specialty coffee beverages
2. **Tea**: Premium tea selections
3. **Food**: Gourmet food offerings
4. **Desserts**: Artisanal dessert options

Each menu item includes: image, name, price, and description.

## Important Constraints

### Technical Constraints
- **No build process**: Pure static files only (no npm, webpack, etc.)
- **No frameworks**: Vanilla JavaScript, HTML, CSS only
- **Browser support**: Modern browsers (ES6+ required)
- **Performance budget**: < 3 second load time on 3G networks
- **Bundle size**: Minimal footprint, web-optimized images only

### Design Constraints
- **Color palette**: Must use established luxury colors (#2C4A3C, #C4A661, #F5F1E6)
- **Typography**: Inter and Playfair Display only
- **Mobile-first**: All features must work on mobile devices
- **Accessibility**: WCAG 2.1 AA minimum standards

### Business Constraints
- **Brand consistency**: Maintain luxury, professional positioning
- **Content accuracy**: Menu items and company information must be accurate
- **Contact functionality**: Forms must be functional (currently client-side only)

## External Dependencies

### Google Fonts
- **Inter**: Body text, navigation, menu items
- **Playfair Display**: Headings, hero text, section titles
- **Loading**: Async font loading for performance

### No Backend Services
- **Contact Form**: Currently client-side only (needs backend integration for production)
- **Newsletter**: Currently client-side only (needs email service integration)
- **No Database**: All content is static HTML

### Future Integration Opportunities
- Email service provider (SendGrid, Mailchimp, ConvertKit)
- Analytics platform (Google Analytics, Plausible, Fathom)
- CMS integration (if content management becomes needed)
- Backend API for form handling

### Progressive Web App Features
- **Service Worker**: Not in use (deliberately disabled to rely on Netlify CDN + analytics)
- **Manifest**: Not configured
- **Icons**: Multiple sizes for various platforms (can be added if PWA reintroduced)
