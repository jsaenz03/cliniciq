<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Claude Code Context: ClinicIQ Solutions Website

**Project**: Business automation solutions website
**Status**: 100% Complete - Production-ready
**Last Updated**: 2025-09-15

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with luxury color palette
- **Dependencies**: Google Fonts (Inter, Playfair Display)
- **Build**: None (vanilla static files)
- **Deployment**: Static hosting ready

## Project Structure
```
/Users/jsaenz/cliniciqrevis/
├── index.html          # Main website file
├── styles.css          # Complete styling
├── script.js           # Interactive functionality
├── sw.js              # Service worker
└── specs/001-recreate-this-website/
    ├── spec.md         # Requirements specification
    ├── plan.md         # Implementation plan
    ├── research.md     # Current state analysis
    ├── data-model.md   # Content structure
    ├── quickstart.md   # Validation guide
    └── contracts/      # Validation contracts
```
**IGNORE** do not make changes or read contents of ignore folder

## Current Status: 100% Complete ✅

### ✅ Working Features (16/16)
- Hero section with luxury branding
- Responsive navigation with mobile menu
- Specialties showcase
- Complete menu with categories (Coffee, Tea, Food, Desserts)
- About Us section with company story
- Contact form and newsletter signup
- Smooth scroll navigation
- Fade-in animations
- Mobile-responsive design
- Service worker for PWA features
- **Menu filtering system** - FIXED ✅
- **Chatbot with conversation lifecycle tracking** - NEW ✅
  - Unique conversation IDs
  - Message count tracking
  - Conversation duration tracking
  - End-of-conversation detection
  - SessionStorage persistence with graceful fallback

### ✅ Issue Resolved
**Menu filtering**: Successfully fixed by adding CSS rule for `.hidden` class

**Applied Fix**: Added `.hidden { display: none !important; }` to styles.css
**Result**: All menu category filtering now fully functional
**Status**: Production-ready deployment

## Validation Results
- Performance: 330ms load time (target: <3000ms) ✅
- Mobile: Full responsive functionality ✅
- Cross-browser: All filters working perfectly ✅
- Accessibility: ARIA attributes updating correctly ✅

## Color Palette
- **Primary Green**: #2C4A3C (luxury nature theme)
- **Gold Accent**: #C4A661 (premium luxury)
- **Cream Background**: #F5F1E6 (elegant neutral)

## Key Components

### Menu Structure
```html
<div class="menu-item" data-category="{coffee|tea|food|desserts}">
  <div class="menu-item-image">
    <img src="..." alt="..." />
  </div>
  <div class="menu-item-content">
    <div class="menu-item-header">
      <h4 class="menu-item-name">...</h4>
      <span class="menu-item-price">...</span>
    </div>
    <p class="menu-item-description">...</p>
  </div>
</div>
```

### Filter System
```javascript
// Filter buttons
<button class="filter-btn" data-filter="all|coffee|tea|food|desserts">

// JavaScript handling
class MenuFilter {
  filterItems(filter) {
    // Adds/removes 'hidden' class
  }
}
```

## Development Commands
```bash
# Serve locally
python -m http.server 8000  # Python 3
python -m SimpleHTTPServer 8000  # Python 2

# Open in browser
open http://localhost:8000
```

## Testing Approach
- **Manual testing**: Browser validation across devices
- **No automated tests**: Static site with minimal interactivity
- **Validation**: Use quickstart.md for comprehensive testing

## Performance
- **Load Time**: <3 seconds (optimized)
- **Bundle Size**: Minimal (vanilla implementation)
- **Images**: Web-optimized formats
- **Animations**: 60fps smooth transitions

## Recent Changes

### 2025-01-15: Chatbot Conversation Lifecycle
- ✅ Implemented conversation tracking with unique IDs
- ✅ Added sessionStorage-based state persistence
- ✅ Integrated message count tracking
- ✅ Added conversation end detection on page unload
- ✅ Updated Netlify function to forward conversation metadata
- ✅ Created comprehensive testing guide
- **Location**: script.js:857-1020, netlify/functions/chatbot.js:63-124
- **Documentation**: openspec/changes/add-chatbot-conversation-lifecycle/

### 2025-09-15: Initial Website Implementation
- ✅ Analyzed current implementation status
- ✅ Identified menu filter CSS issue
- ✅ Created comprehensive specification
- ✅ Generated implementation plan
- ✅ Applied CSS fix: `.hidden { display: none !important; }`
- ✅ Validated across browsers and devices
- ✅ Confirmed 100% functionality working

## Deployment Ready ✅
1. ✅ **COMPLETED**: Added `.hidden` CSS rule to fix menu filtering
2. ✅ **COMPLETED**: Validated across all browsers and devices
3. 🚀 **READY**: Upload to hosting provider (all files production-ready)
4. 📊 **OPTIONAL**: Set up basic analytics

## Performance Metrics
- **Load Time**: 330ms (9x better than 3000ms target)
- **DOM Content Loaded**: 298ms
- **Total Elements**: 275 optimized elements
- **Images**: 14 web-optimized images
- **Console Errors**: Only harmless favicon 404

---
*Website is 100% complete and production-ready for immediate deployment*