# ClinicIQ Solutions Website — Coding Guidance

> **Scope**: Project-specific coding guidance.  
> **Override**: Defers to global `CLAUDE.md` (`~/.claude/CLAUDE.md`) for Karpathy principles and instruction hierarchy.  
> **Hierarchy**: Karpathy > Your request > Local AGENTS.md > This file > Skills.

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

## Project Status

**100% Complete — Production-ready**

## Development Commands

```bash
# Serve locally
python -m http.server 8000  # Python 3
python -m SimpleHTTPServer 8000  # Python 2

# Open in browser
open http://localhost:8000
```

## Project Structure

```
/
├── index.html          # Main website file
├── styles.css          # Complete styling
├── script.js           # Interactive functionality
└── specs/001-recreate-this-website/
    ├── spec.md         # Requirements specification
    ├── plan.md         # Implementation plan
    ├── research.md     # Current state analysis
    ├── data-model.md   # Content structure
    ├── quickstart.md   # Validation guide
    └── contracts/      # Validation contracts
```

**IGNORE** — do not make changes or read contents of ignore folder.

## Working Features (17/17)

- Hero section with luxury branding
- Responsive navigation with mobile menu
- Specialties showcase
- Complete menu with categories (Coffee, Tea, Food, Desserts)
- About Us section with company story
- Contact form and newsletter signup
- Smooth scroll navigation
- Fade-in animations
- Mobile-responsive design
- Menu filtering system
- Chatbot with conversation lifecycle tracking
- User identification form

## Menu Structure

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

```html
<!-- Filter buttons -->
<button class="filter-btn" data-filter="all|coffee|tea|food|desserts">
```

JavaScript handling via `MenuFilter.filterItems(filter)` which adds/removes `hidden` class.

**Critical CSS rule**: `.hidden { display: none !important; }` must be preserved.

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

### 2025-11-07: Logo Implementation & Lighthouse Optimization Documentation
- Changed logo from text-based CSS to image (`cliniciq-logo copy.webp`)
- Updated all 7 HTML files with new logo implementation
- Preserved all lighthouse optimizations (LCP, CLS, loading strategy)

### 2025-01-15: Chatbot Conversation Lifecycle
- Implemented conversation tracking with unique IDs
- Added sessionStorage-based state persistence
- Integrated message count tracking

### 2025-10-30: Chatbot User Identification Form
- Implemented user identification form (name, email, optional phone)
- Added form validation with error handling and loading states
- Created sessionStorage-based user persistence (per session)

## Deployment Ready ✅

1. ✅ **COMPLETED**: Added `.hidden` CSS rule to fix menu filtering
2. ✅ **COMPLETED**: Validated across all browsers and devices
3. 🚀 **READY**: Upload to hosting provider (all files production-ready)
4. 📊 **OPTIONAL**: Set up basic analytics
