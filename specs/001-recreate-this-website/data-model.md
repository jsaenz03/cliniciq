# Data Model: Verdant Café Website

**Date**: 2025-09-15
**Feature**: Verdant Café Website Recreation

## Overview

Static website data model - all content is embedded in HTML structure, no dynamic data storage required.

## Entity Definitions

### Menu Item
**Purpose**: Represents individual food and beverage offerings
**Storage**: Static HTML in index.html

**Structure:**
```html
<div class="menu-item" data-category="{category}">
  <div class="menu-item-image">
    <img src="{image_path}" alt="{name}" />
  </div>
  <div class="menu-item-content">
    <div class="menu-item-header">
      <h4 class="menu-item-name">{name}</h4>
      <span class="menu-item-price">{price}</span>
    </div>
    <p class="menu-item-description">{description}</p>
  </div>
</div>
```

**Attributes:**
- `name` (string): Display name of the item
- `price` (string): Formatted price (e.g., "$12.99")
- `description` (string): Item description text
- `category` (enum): One of ["coffee", "tea", "food", "desserts"]
- `image_path` (string): Relative path to item image

**Validation Rules:**
- `category` must match filter button `data-filter` values
- `name` and `price` are required
- `description` should be concise (1-2 sentences)
- Images should be optimized for web (WebP preferred)

### Specialty Item
**Purpose**: Featured café offerings in hero/specialties section
**Storage**: Static HTML structure

**Structure:**
```html
<div class="specialty-card" data-aos="fade-up">
  <div class="specialty-image">
    <img src="{image_path}" alt="{name}" />
  </div>
  <div class="specialty-content">
    <h3 class="specialty-title">{name}</h3>
    <p class="specialty-description">{description}</p>
  </div>
</div>
```

**Attributes:**
- `name` (string): Specialty name/title
- `description` (string): Detailed description
- `image_path` (string): High-quality image path

### Company Information
**Purpose**: About Us content and brand messaging
**Storage**: Static content sections

**Attributes:**
- `founding_year` (number): 2018
- `tagline` (string): "Where luxury meets nature in every cup"
- `mission` (string): Company mission statement
- `values` (array): Sustainability, quality, community values
- `story` (string): Founding story and philosophy

### Contact Details
**Purpose**: Customer communication information
**Storage**: Static contact form and info sections

**Attributes:**
- `contact_form` (object): Form fields for customer inquiries
- `newsletter_signup` (object): Email subscription form
- `social_links` (array): Social media URLs (future expansion)

### Filter Categories
**Purpose**: Menu organization and filtering
**Storage**: Static HTML attributes and JavaScript configuration

**Categories:**
- `all` - Shows all items (default)
- `coffee` - Coffee beverages
- `tea` - Tea selections
- `food` - Food items
- `desserts` - Dessert offerings

**Implementation:**
```javascript
// Filter buttons
<button class="filter-btn" data-filter="{category}">{display_name}</button>

// Menu items
<div class="menu-item" data-category="{category}">...</div>
```

## Data Relationships

### Menu Item → Category (Many-to-One)
- Each menu item belongs to exactly one category
- Categories are used for filtering functionality
- Category must match available filter options

### Specialty → Display Order (Positional)
- Specialties are displayed in HTML order
- No explicit ordering field required
- Animation timing based on position

## State Management

### Filter State
**Storage**: JavaScript class state
**Scope**: Session-based (no persistence)

```javascript
class MenuFilter {
  // Current active filter
  activeFilter: string = 'all'

  // DOM elements
  filterButtons: NodeList
  menuItems: NodeList
}
```

### Animation State
**Storage**: CSS classes
**Scope**: Page lifecycle

- `fade-in-up` - Applied to elements as they enter viewport
- `active` - Applied to current navigation link
- `hidden` - Applied to filtered menu items

## Data Flow

### Menu Filtering Flow
1. User clicks filter button
2. JavaScript reads `data-filter` attribute
3. Updates button active state
4. Iterates through menu items
5. Compares item `data-category` with filter
6. Adds/removes `hidden` class accordingly
7. Updates accessibility attributes (`aria-hidden`)

### Navigation Flow
1. User clicks navigation link
2. Smooth scroll to target section
3. Updates active link styling
4. Manages mobile menu state

## Validation Requirements

### Content Validation
- All menu items must have complete information
- Images must exist and be accessible
- Prices must be consistently formatted
- Categories must be valid enum values

### Accessibility Validation
- All images must have descriptive alt text
- Form elements must have proper labels
- Filter state must be announced to screen readers
- Keyboard navigation must work properly

### Performance Validation
- Images optimized for web delivery
- CSS and JavaScript minification (production)
- Font loading optimization
- Service worker caching validation

## Current Data Inventory

**Menu Items**: 9 items across 4 categories
- Coffee: 3 items (Signature Espresso, Verdant Latte, Cold Brew)
- Tea: 2 items (Earl Grey Supreme, Chamomile Dreams)
- Food: 2 items (Artisan Croissant, Avocado Toast)
- Desserts: 2 items (Chocolate Tart, Lemon Cake)

**Specialties**: 3 featured items
**Company Info**: Complete about section
**Contact**: Form and newsletter signup implemented