# 3-Tier Font System - ClinicIQ Solutions

## Overview
To improve readability and consistency across all devices (especially iPad view), the site now uses a strict 3-tier font size system.

## Font Size Tiers

### Tier 1: Large (Headings)
**Purpose**: Main headings, hero titles, section titles, stats/highlights

| Device | Size | Usage |
|--------|------|-------|
| Desktop | 2.5rem (40px) | Hero titles, section titles, stats |
| iPad/Tablet | 2rem (32px) | Hero titles, section titles |
| Mobile | 1.75rem (28px) | Hero titles, section titles |

**Elements**:
- `.hero-title`
- `.section-title`
- `.highlight h4` (stats)
- `.newsletter h2`

---

### Tier 2: Medium (Body Text)
**Purpose**: Body text, subheadings, buttons, navigation, most content

| Device | Size | Usage |
|--------|------|-------|
| All devices | 1rem (16px) | Universal body text, buttons, navigation |

**Elements**:
- `body` (base)
- `.hero-subtitle`
- `.section-subtitle`
- `.btn-main-text`
- `.nav-link`
- `.about-intro`
- `.contact-item h3`
- `.menu-item-header h3`
- `.price`
- `.specialty-content h3`
- `.footer-brand h3` (iPad)
- All paragraph text

---

### Tier 3: Small (Fine Print)
**Purpose**: Labels, captions, legal text, secondary information

| Device | Size | Usage |
|--------|------|-------|
| All devices | 0.875rem (14px) | Labels, captions, fine print |

**Elements**:
- `.btn-sub-text`
- `.highlight p` (stat labels)
- `.footer-column h4` (iPad)
- `.footer-column a` (iPad)
- `.footer-brand p` (iPad)
- Form labels and helper text

---

## iPad-Specific Improvements

### Hero Section (@media max-width: 1024px)
**Changes made**:
- ✅ Added `padding-top: 120px` to create more space from header
- ✅ Reduced `min-height` from 600px to 500px for better proportions
- ✅ Hero title: 3rem → **2rem** (Tier 1: Large)
- ✅ Hero subtitle: 1.125rem → **1rem** (Tier 2: Medium)
- ✅ Reduced margins for tighter spacing

### Footer Section (@media max-width: 1024px)
**Changes made**:
- ✅ Footer brand h3: 1.75rem → **1rem** (Tier 2: Medium)
- ✅ Footer column h4: 1.125rem → **0.875rem** (Tier 3: Small)
- ✅ Footer links & text: **0.875rem** (Tier 3: Small)

---

## Benefits

### 1. Improved Readability
- Font sizes are now proportional to screen size
- No more overwhelming large text on iPad

### 2. Consistent Hierarchy
- Clear visual hierarchy with only 3 size options
- Easier to scan and read content

### 3. Better Spacing
- Hero section has proper breathing room from header
- Content doesn't feel cramped on tablet devices

### 4. Maintainability
- Simple system makes future updates easier
- Predictable sizing across all components

---

## Before & After Comparison

### iPad View (768px - 1024px)

| Element | Before | After | Reduction |
|---------|--------|-------|-----------|
| Hero title | 3rem (48px) | 2rem (32px) | -33% |
| Hero subtitle | 1.125rem (18px) | 1rem (16px) | -11% |
| Footer brand | 1.75rem (28px) | 1rem (16px) | -43% |
| Footer headings | 1.125rem (18px) | 0.875rem (14px) | -22% |
| Section titles | 2.5rem (40px) | 2.5rem (40px) | 0% |

### Desktop View (1025px+)

| Element | Before | After | Reduction |
|---------|--------|-------|-----------|
| Hero title | 4rem (64px) | 2.5rem (40px) | -38% |
| Hero subtitle | 1.25rem (20px) | 1rem (16px) | -20% |
| Section titles | 2.5rem (40px) | 2.5rem (40px) | 0% |

### Mobile View (<768px)

| Element | Before | After | Reduction |
|---------|--------|-------|-----------|
| Hero title | 2.5rem (40px) | 1.75rem (28px) | -30% |
| Hero subtitle | 1.125rem (18px) | 1rem (16px) | -11% |
| Section titles | 2rem (32px) | 1.75rem (28px) | -13% |

---

## Implementation Notes

### Files Modified
- `styles.css` - All font size updates and responsive breakpoints

### Responsive Breakpoints Used
- **Desktop**: 1025px and above
- **iPad/Tablet**: 768px - 1024px
- **Mobile**: Below 768px

### Testing Recommendations
1. Test on physical iPad devices (iPad Air, iPad Pro)
2. Test in Chrome DevTools using iPad viewport presets
3. Verify hero section spacing from navigation bar
4. Check footer text readability at all breakpoints
5. Validate that all pages inherit the global changes

---

**Last Updated**: 2025-11-16
**Version**: 1.0
**Status**: Production-ready
