# Tasks: Verdant Café Website Menu Filter Fix & Deployment

**Input**: Design documents from `/Users/jsaenz/cafegreen/specs/001-recreate-this-website/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

**Context**: Frontend is 97% complete and production-ready. Single CSS fix required for menu filtering functionality, followed by validation and deployment preparation.

## Execution Flow Summary
1. **Critical Fix**: Add missing `.hidden` CSS rule (30 seconds)
2. **Validation**: Test menu filtering across browsers and devices (10 minutes)
3. **Quality Assurance**: Performance and accessibility validation (5 minutes)
4. **Deployment Prep**: Final production readiness check (5 minutes)

**Total Estimated Time**: 20 minutes

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- All file paths are absolute to avoid confusion

## Phase 3.1: Critical Fix (Must Complete First)
- [ ] T001 Add `.hidden { display: none !important; }` CSS rule to `/Users/jsaenz/cafegreen/styles.css` to fix menu filtering

## Phase 3.2: Functional Validation (After T001)
- [ ] T002 [P] Test menu filter "Coffee" category in Chrome browser using `/Users/jsaenz/cafegreen/index.html`
- [ ] T003 [P] Test menu filter "Tea" category in Firefox browser using `/Users/jsaenz/cafegreen/index.html`
- [ ] T004 [P] Test menu filter "Food" category in Safari browser using `/Users/jsaenz/cafegreen/index.html`
- [ ] T005 [P] Test menu filter "Desserts" category in Edge browser using `/Users/jsaenz/cafegreen/index.html`
- [ ] T006 [P] Test menu filter "All" reset functionality across all browsers

## Phase 3.3: Mobile & Responsive Validation
- [ ] T007 [P] Test menu filtering on iOS Safari mobile browser (responsive layout maintained)
- [ ] T008 [P] Test menu filtering on Android Chrome mobile browser (responsive layout maintained)
- [ ] T009 [P] Test mobile navigation hamburger menu still functions after CSS fix

## Phase 3.4: Quality Assurance
- [ ] T010 [P] Performance validation: Ensure CSS fix doesn't impact page load speed (<3s target)
- [ ] T011 [P] Accessibility validation: Verify aria-hidden attributes update correctly on filtered items
- [ ] T012 [P] JavaScript console check: Ensure no errors introduced by CSS changes

## Phase 3.5: Documentation & Deployment Prep
- [ ] T013 Update `/Users/jsaenz/cafegreen/specs/001-recreate-this-website/contracts/menu-filter-validation.md` to mark all tests as PASSING
- [ ] T014 Update `/Users/jsaenz/cafegreen/specs/001-recreate-this-website/contracts/website-validation.md` to show 15/15 features working
- [ ] T015 [P] Update `/Users/jsaenz/cafegreen/CLAUDE.md` project status to "100% Complete - Production Ready"
- [ ] T016 [P] Final production readiness checklist using `/Users/jsaenz/cafegreen/specs/001-recreate-this-website/quickstart.md`

## Dependencies
- **T001** blocks ALL other tasks (critical fix must be applied first)
- **T002-T006** can run in parallel (different browsers, same functionality)
- **T007-T009** can run in parallel (different devices/aspects)
- **T010-T012** can run in parallel (different quality checks)
- **T013-T016** can run in parallel (different documentation files)

## Parallel Execution Examples

### After T001 Fix Applied - Browser Testing (Parallel):
```bash
# Launch T002-T006 together:
Task: "Test menu filter Coffee category in Chrome browser using /Users/jsaenz/cafegreen/index.html"
Task: "Test menu filter Tea category in Firefox browser using /Users/jsaenz/cafegreen/index.html"
Task: "Test menu filter Food category in Safari browser using /Users/jsaenz/cafegreen/index.html"
Task: "Test menu filter Desserts category in Edge browser using /Users/jsaenz/cafegreen/index.html"
Task: "Test menu filter All reset functionality across all browsers"
```

### Mobile & Quality Assurance (Parallel):
```bash
# Launch T007-T012 together:
Task: "Test menu filtering on iOS Safari mobile browser"
Task: "Test menu filtering on Android Chrome mobile browser"
Task: "Test mobile navigation hamburger menu still functions"
Task: "Performance validation: page load speed under 3s"
Task: "Accessibility validation: aria-hidden attributes correct"
Task: "JavaScript console check: no new errors"
```

### Documentation Updates (Parallel):
```bash
# Launch T013-T016 together:
Task: "Update menu-filter-validation.md to mark tests PASSING"
Task: "Update website-validation.md to show 15/15 features working"
Task: "Update CLAUDE.md status to 100% Complete"
Task: "Final production checklist using quickstart.md"
```

## Detailed Task Specifications

### T001: CSS Fix (Critical)
**File**: `/Users/jsaenz/cafegreen/styles.css`
**Action**: Add CSS rule at end of file
**Code**:
```css
/* Menu filter hidden state */
.hidden {
  display: none !important;
}
```
**Validation**: Menu filtering should work immediately after this change

### T002-T006: Browser Testing
**Method**: Open `file:///Users/jsaenz/cafegreen/index.html` in each browser
**Test Steps**:
1. Scroll to menu section
2. Click filter button (Coffee/Tea/Food/Desserts)
3. Verify only matching category items visible
4. Click "All" button
5. Verify all items visible again

**Expected Result**: All filters work correctly, items hide/show as expected

### T007-T009: Mobile Testing
**Method**: Use browser dev tools device emulation or actual mobile devices
**Test Steps**:
1. Open website on mobile browser
2. Test menu filtering functionality
3. Test hamburger navigation menu
4. Verify responsive layout maintained

### T010-T012: Quality Assurance
**Performance**: Use browser dev tools Network tab, target <3s load time
**Accessibility**: Use browser accessibility tools, verify aria-hidden updates
**Console**: Check browser console for JavaScript errors

### T013-T016: Documentation
**Action**: Update contract files to reflect completed status
**Files**: Update validation contracts and project status files
**Result**: All documentation reflects 15/15 features working

## Success Criteria
- [ ] Menu filtering works in all major browsers
- [ ] Mobile functionality preserved
- [ ] No performance degradation
- [ ] No accessibility regressions
- [ ] All documentation updated
- [ ] Website ready for production deployment

## Notes
- Frontend was already 97% complete - this is a maintenance fix, not new development
- Single CSS line fixes the only broken feature
- Focus on validation and documentation rather than implementation
- Tasks designed for immediate production deployment readiness