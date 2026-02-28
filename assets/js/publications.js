(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    const searchInput = document.querySelector('[data-publications-search]');
    const allChips = document.querySelectorAll('[data-topic-chip]');
    const allChip = document.querySelector('[data-topic-chip][data-topic="all"]');
    const topicChips = document.querySelectorAll('[data-topic-chip]:not([data-topic="all"])');
    const publicationRows = document.querySelectorAll('[data-publication-row]');
    const emptyState = document.querySelector('[data-publications-empty]');
    const selectedTopics = new Set();

    function normalizeTopics(value) {
      if (!value) return [];
      return value.split('|').map(function (t) { return t.trim(); }).filter(Boolean);
    }

    function matchesSelectedTopics(topics) {
      if (selectedTopics.size === 0) return true;
      return [...selectedTopics].some(function (topic) { return topics.includes(topic); });
    }

    function syncChipStates() {
      if (selectedTopics.size === 0 && allChip) {
        allChip.classList.add('is-active');
      } else if (allChip) {
        allChip.classList.remove('is-active');
      }

      topicChips.forEach(function (chip) {
        if (selectedTopics.has(chip.dataset.topic)) {
          chip.classList.add('is-active');
        } else {
          chip.classList.remove('is-active');
        }
      });
    }

    function applyFilters() {
      var query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      var visibleCount = 0;

      publicationRows.forEach(function (row) {
        var article = row.querySelector('[data-publication-item]');
        if (!article) return;

        var textContent = article.textContent.toLowerCase();
        var topics = normalizeTopics(article.dataset.topics);

        var queryMatches = !query || textContent.includes(query);
        var topicMatches = matchesSelectedTopics(topics);

        if (queryMatches && topicMatches) {
          row.style.removeProperty('display');
          visibleCount += 1;
        } else {
          row.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    }

    if (allChip) {
      allChip.addEventListener('click', function () {
        selectedTopics.clear();
        syncChipStates();
        applyFilters();
      });
    }

    topicChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var topic = chip.dataset.topic;
        if (!topic) return;

        if (selectedTopics.has(topic)) {
          selectedTopics.delete(topic);
        } else {
          selectedTopics.add(topic);
        }

        syncChipStates();
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        applyFilters();
      });
    }

    syncChipStates();
    applyFilters();
  });
})();
