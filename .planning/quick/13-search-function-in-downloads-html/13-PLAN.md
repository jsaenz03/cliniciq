---
phase: quick-13
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/jsaenz-macbook/recreatesite/cliniciq/downloads.html
  - /Users/jsaenz-macbook/recreatesite/cliniciq/styles.css
  - /Users/jsaenz-macbook/recreatesite/cliniciq/script.js
autonomous: true
requirements:
  - SEARCH-01: Real-time search input field above download tables
  - SEARCH-02: Filter across all download categories (templates, tools, guides, checklists)
  - SEARCH-03: Match against download title and description text
  - SEARCH-04: Preserve existing filter button functionality
  - SEARCH-05: Match ClinicIQ luxury design aesthetic (navy #36494e, blue #7ea0b7)
  - SEARCH-06: Clear search button when input has text
  - SEARCH-07: Show "no results" message when search returns empty
  - SEARCH-08: Accessible search input with proper ARIA labels

must_haves:
  truths:
    - User can type in search box and see filtered results in real-time
    - Search filters across all download categories simultaneously
    - Search matches download titles and descriptions
    - Clear button appears when text is entered
    - "No results" message shows when search finds nothing
    - Existing category filter buttons still work
    - Search styling matches ClinicIQ luxury design aesthetic

  artifacts:
    - path: /Users/jsaenz-macbook/recreatesite/cliniciq/downloads.html
      provides: Search input HTML structure
      min_lines: 20
    - path: /Users/jsaenz-macbook/recreatesite/cliniciq/styles.css
      provides: Search input styling with ClinicIQ colors
      contains: ".downloads-search, .search-input, .search-clear-btn"
    - path: /Users/jsaenz-macbook/recreatesite/cliniciq/script.js
      provides: DownloadSearch class for real-time filtering
      exports: ["DownloadSearch"]

  key_links:
    - from: "downloads.html search input"
      to: "script.js DownloadSearch class"
      via: "DOMContentLoaded initialization"
      pattern: "class DownloadSearch|new DownloadSearch"
    - from: "DownloadSearch.filterDownloads()"
      to: ".download-category elements"
      via: "textContent matching and hidden class toggling"
      pattern: "textContent\\.includes|classList\\.add\\('hidden'\\)"
---

<objective>
Add real-time search functionality to downloads page that filters across all download categories while preserving existing filter button functionality and matching ClinicIQ luxury design aesthetic.

Purpose: Enable users to quickly find specific downloads by typing keywords, improving usability of the downloads page which contains 20+ template files, guides, tools, and checklists.

Output: Working search input with real-time filtering, clear button, no results message, and seamless integration with existing category filter buttons.
</objective>

<execution_context>
@/Users/jsaenz-macbook/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jsaenz-macbook/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@/Users/jsaenz-macbook/recreatesite/cliniciq/downloads.html
@/Users/jsaenz-macbook/recreatesite/cliniciq/styles.css
@/Users/jsaenz-macbook/recreatesite/cliniciq/script.js

# Existing Design System

## Color Palette (from styles.css)
```css
--primary-navy: #36494e;
--primary-blue: #7ea0b7;
--uranian-blue: #a9cef4;
--paynes-gray: #597081;
--background-white: #FEFEFE;
--border-light: rgba(169, 206, 244, 0.2);
```

## Typography
```css
--font-primary: 'Ubuntu', -apple-system, BlinkMacSystemFont, sans-serif;
```

## Animation Timing
```css
--transition-fast: 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
--transition-normal: 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
```

## Existing Download Structure
- `.download-category` - Container for each category (checklists, guides, templates, tools)
- `.download-table` - Table with download items
- `.download-table tbody tr` - Individual download rows
- `strong` - Download title
- `.description` - Download description text
- `.menu-filter` - Existing category filter buttons (All Categories, Templates, Tools, Guides, Checklists)

## Existing Filter System (MenuFilter class in script.js)
- Uses `.hidden` class to hide/show elements
- Respects `data-category` attributes on `.download-category` elements
- Has animation support for showing/hiding

</context>

<tasks>

<task type="auto">
  <name>Task 1: Add search input HTML to downloads.html</name>
  <files>/Users/jsaenz-macbook/recreatesite/cliniciq/downloads.html</files>
  <action>
Add search input section AFTER the existing `.menu-filter` div (line 235) and BEFORE the `.downloads-tables` div (line 238).

HTML structure to insert:
```html
<!-- Search Input -->
<div class="downloads-search">
    <div class="search-container">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
            type="text"
            id="downloads-search-input"
            class="search-input"
            placeholder="Search downloads..."
            aria-label="Search downloads"
            autocomplete="off">
        <button
            type="button"
            class="search-clear-btn"
            id="search-clear-btn"
            aria-label="Clear search"
            style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>
    <div class="search-results-count" id="search-results-count" aria-live="polite"></div>
</div>
```

This preserves the existing filter button layout and adds search functionality above the tables.
  </action>
  <verify>
    <automated>grep -n "downloads-search" /Users/jsaenz-macbook/recreatesite/cliniciq/downloads.html</automated>
  </verify>
  <done>Search input HTML added after filter buttons, before download tables</done>
</task>

<task type="auto">
  <name>Task 2: Add search styling to styles.css</name>
  <files>/Users/jsaenz-macbook/recreatesite/cliniciq/styles.css</files>
  <action>
Add search styling AFTER the existing `.menu-filter` styles (around line 1520) and BEFORE the download category styles.

CSS to add:
```css
/* ===== DOWNLOADS SEARCH ===== */
.downloads-search {
  max-width: 600px;
  margin: 0 auto var(--space-xl) auto;
  position: relative;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--background-white);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-md);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.search-container:focus-within {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(126, 160, 183, 0.15);
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  color: var(--text-muted);
  pointer-events: none;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  padding-left: calc(var(--space-md) * 2 + 20px); /* Space for icon */
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--text-primary);
  background: transparent;
  border: none;
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear-btn {
  position: absolute;
  right: var(--space-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--border-light);
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
  flex-shrink: 0;
}

.search-clear-btn:hover {
  background: var(--primary-blue);
  color: var(--text-white);
  transform: scale(1.1);
}

.search-clear-btn:active {
  transform: scale(0.95);
}

.search-results-count {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: var(--space-xs);
  min-height: 20px;
}

/* No results message */
.no-results-message {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
  font-size: 1rem;
}

.no-results-message strong {
  color: var(--text-secondary);
  display: block;
  font-size: 1.25rem;
  margin-bottom: var(--space-xs);
}

/* Hidden class for search results */
.download-category.search-hidden {
  display: none !important;
}
```

This matches the ClinicIQ luxury aesthetic with navy/blue colors and smooth animations.
  </action>
  <verify>
    <automated>grep -n "\.downloads-search\|\.search-input\|\.search-clear-btn" /Users/jsaenz-macbook/recreatesite/cliniciq/styles.css</automated>
  </verify>
  <done>Search styling added with ClinicIQ colors and smooth transitions</done>
</task>

<task type="auto">
  <name>Task 3: Add DownloadSearch class to script.js</name>
  <files>/Users/jsaenz-macbook/recreatesite/cliniciq/script.js</files>
  <action>
Add the DownloadSearch class AFTER the MenuFilter class (around line 373) and BEFORE the FormHandler class.

JavaScript class to add:
```javascript
// ===== DOWNLOADS SEARCH =====

class DownloadSearch {
  constructor() {
    this.searchInput = document.getElementById('downloads-search-input');
    this.clearBtn = document.getElementById('search-clear-btn');
    this.resultsCount = document.getElementById('search-results-count');
    this.downloadCategories = document.querySelectorAll('.download-category');
    this.currentFilter = 'all'; // Track current category filter

    this.init();
  }

  init() {
    if (!this.searchInput) return;

    this.setupSearchInput();
    this.setupClearButton();
    this.setupCategoryFilterIntegration();
  }

  /**
   * Setup search input with debounced filtering
   */
  setupSearchInput() {
    // Debounce search to avoid excessive filtering
    let searchTimeout;

    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);

      const searchTerm = e.target.value.trim();

      // Show/hide clear button
      this.clearBtn.style.display = searchTerm ? 'flex' : 'none';

      // Debounce filtering
      searchTimeout = setTimeout(() => {
        this.filterDownloads(searchTerm);
      }, 150);
    });

    // Clear on Escape key
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });
  }

  /**
   * Setup clear button functionality
   */
  setupClearButton() {
    this.clearBtn.addEventListener('click', () => {
      this.clearSearch();
      this.searchInput.focus();
    });
  }

  /**
   * Setup integration with existing category filter buttons
   */
  setupCategoryFilterIntegration() {
    const filterButtons = document.querySelectorAll('.menu-filter .filter-btn');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.currentFilter = button.getAttribute('data-filter');
        // Re-apply search with new category filter
        const searchTerm = this.searchInput.value.trim();
        if (searchTerm) {
          this.filterDownloads(searchTerm);
        }
      });
    });
  }

  /**
   * Filter downloads based on search term
   */
  filterDownloads(searchTerm) {
    if (!searchTerm) {
      // Show all categories (respecting current category filter)
      this.showAllCategories();
      return;
    }

    const term = searchTerm.toLowerCase();
    let matchCount = 0;

    this.downloadCategories.forEach(category => {
      const categoryType = category.getAttribute('data-category');

      // Skip if category doesn't match current filter (and filter is not 'all')
      if (this.currentFilter !== 'all' && categoryType !== this.currentFilter) {
        category.classList.add('search-hidden');
        return;
      }

      // Search within this category for matching downloads
      const downloadRows = category.querySelectorAll('.download-table tbody tr');
      let categoryHasMatch = false;

      downloadRows.forEach(row => {
        const title = row.querySelector('strong')?.textContent.toLowerCase() || '';
        const description = row.querySelector('.description')?.textContent.toLowerCase() || '';

        const matches = title.includes(term) || description.includes(term);

        if (matches) {
          row.style.display = '';
          categoryHasMatch = true;
          matchCount++;
        } else {
          row.style.display = 'none';
        }
      });

      // Show/hide entire category based on whether it has matches
      if (categoryHasMatch) {
        category.classList.remove('search-hidden', 'hidden');
        category.style.display = '';
      } else {
        category.classList.add('search-hidden');
        category.style.display = 'none';
      }
    });

    // Update results count
    this.updateResultsCount(matchCount, searchTerm);
  }

  /**
   * Show all categories (respecting category filter)
   */
  showAllCategories() {
    this.downloadCategories.forEach(category => {
      const categoryType = category.getAttribute('data-category');

      // Show all rows in category
      const downloadRows = category.querySelectorAll('.download-table tbody tr');
      downloadRows.forEach(row => {
        row.style.display = '';
      });

      // Show/hide category based on current filter
      if (this.currentFilter === 'all' || categoryType === this.currentFilter) {
        category.classList.remove('search-hidden', 'hidden');
        category.style.display = '';
      } else {
        category.classList.add('hidden');
        category.style.display = 'none';
      }
    });

    this.updateResultsCount(0, '');
  }

  /**
   * Clear search and show all results
   */
  clearSearch() {
    this.searchInput.value = '';
    this.clearBtn.style.display = 'none';
    this.showAllCategories();
  }

  /**
   * Update results count message
   */
  updateResultsCount(count, searchTerm) {
    if (!searchTerm) {
      this.resultsCount.textContent = '';
      return;
    }

    if (count === 0) {
      this.resultsCount.innerHTML = `<div class="no-results-message"><strong>No results found</strong>Try different keywords or clear search to browse all downloads</div>`;
    } else {
      this.resultsCount.textContent = `Found ${count} ${count === 1 ? 'download' : 'downloads'}`;
    }
  }
}
```

Then add DownloadSearch initialization to the ClinicIQSolutions class in the initializeNonCriticalComponents method (around line 1527):
```javascript
this.downloadSearch = new DownloadSearch();
```

This integrates seamlessly with the existing MenuFilter class and respects category filter selections.
  </action>
  <verify>
    <automated>grep -n "class DownloadSearch\|new DownloadSearch" /Users/jsaenz-macbook/recreatesite/cliniciq/script.js</automated>
  </verify>
  <done>DownloadSearch class added with real-time filtering, category filter integration, and clear functionality</done>
</task>

</tasks>

<verification>
1. Open downloads.html in browser
2. Type "accreditation" in search box - should show 1 matching download
3. Type "policy" in search box - should show 19 matching downloads
4. Click clear button - all downloads should reappear
5. Select "Templates" filter, then type "policy" - should only search within templates
6. Type "xyz123" - should show "No results found" message
7. Test keyboard accessibility (Tab, Enter, Escape keys)
8. Verify styling matches ClinicIQ luxury aesthetic (navy/blue colors)
</verification>

<success_criteria>
- Search input visible and styled with ClinicIQ design
- Real-time filtering works as you type (150ms debounce)
- Search matches download titles and descriptions
- Clear button appears/disappears based on input
- Category filter buttons still work and integrate with search
- "No results" message shows when search finds nothing
- All accessible with keyboard (ARIA labels, focus states)
- No JavaScript errors in console
</success_criteria>

<output>
After completion, create `.planning/quick/13-search-function-in-downloads-html/13-SUMMARY.md` with implementation details and testing notes.
</output>
