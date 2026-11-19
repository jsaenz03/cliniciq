    (function () {
        'use strict';
        var grid = document.getElementById('blog-grid');
        var searchInput = document.getElementById('blog-search-input');
        if (!grid || !searchInput) return;

        var PAGE_SIZE = 9;
        var cards = Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
        var clearBtn = document.getElementById('blog-search-clear');
        var countEl = document.getElementById('blog-results-count');
        var noResults = document.getElementById('blog-no-results');
        var loadMoreBtn = document.getElementById('blog-load-more');
        var topicFilter = document.getElementById('blog-topic-filter');
        var yearFilter = document.getElementById('blog-year-filter');

        // Index each card once from its own markup: search text, topic, year.
        cards.forEach(function (card) {
            var dateText = (card.querySelector('.blog-date') || { textContent: '' }).textContent.trim();
            var yearMatch = dateText.match(/(\d{2})\s*$/);
            card._topic = (card.querySelector('.blog-category') || { textContent: '' }).textContent.trim();
            card._year = yearMatch ? '20' + yearMatch[1] : '';
            card._text = card.textContent.replace(/\s+/g, ' ').toLowerCase();
        });

        var state = { query: '', topic: 'all', year: 'all', revealed: PAGE_SIZE };

        // Topic and year buttons are built from the cards themselves so they
        // always match the posts actually on the page.
        function uniqueValues(key) {
            var values = [];
            cards.forEach(function (card) {
                if (card[key] && values.indexOf(card[key]) === -1) values.push(card[key]);
            });
            return values;
        }

        function buildButtons(container, values, key, allLabel) {
            if (!container) return;
            ['all'].concat(values).forEach(function (value) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'filter-btn' + (value === 'all' ? ' active' : '');
                btn.textContent = value === 'all' ? allLabel : value;
                btn.addEventListener('click', function () {
                    state[key] = value;
                    state.revealed = PAGE_SIZE;
                    container.querySelectorAll('.filter-btn').forEach(function (b) {
                        b.classList.toggle('active', b === btn);
                    });
                    grid.classList.add('no-anim');
                    apply();
                });
                container.appendChild(btn);
            });
        }

        buildButtons(topicFilter, uniqueValues('_topic'), 'topic', 'All topics');
        buildButtons(yearFilter, uniqueValues('_year'), 'year', 'All years');

        function matches(card) {
            if (state.topic !== 'all' && card._topic !== state.topic) return false;
            if (state.year !== 'all' && card._year !== state.year) return false;
            if (state.query && card._text.indexOf(state.query) === -1) return false;
            return true;
        }

        function apply() {
            var isFiltered = state.query !== '' || state.topic !== 'all' || state.year !== 'all';
            var limit = isFiltered ? cards.length : state.revealed;
            var matched = 0;
            var shown = 0;
            cards.forEach(function (card) {
                var hit = matches(card);
                if (hit) matched += 1;
                var visible = hit && matched <= limit;
                if (visible) shown += 1;
                card.classList.toggle('search-hidden', !visible);
            });
            noResults.hidden = matched !== 0;
            loadMoreBtn.hidden = isFiltered || state.revealed >= matched;
            countEl.textContent = 'Showing ' + shown + ' of ' + cards.length + ' articles';
            clearBtn.hidden = state.query === '';
        }

        searchInput.addEventListener('input', function () {
            state.query = searchInput.value.trim().toLowerCase();
            state.revealed = PAGE_SIZE;
            grid.classList.add('no-anim');
            apply();
        });

        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            state.query = '';
            state.revealed = PAGE_SIZE;
            apply();
            searchInput.focus();
        });

        loadMoreBtn.addEventListener('click', function () {
            state.revealed += PAGE_SIZE;
            grid.classList.add('no-anim');
            apply();
        });

        apply();
    })();
