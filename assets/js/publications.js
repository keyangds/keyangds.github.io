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
    const topicChips = document.querySelectorAll('[data-topic-chip]');
    const clearButton = document.querySelector('[data-clear-topics]');
    const publicationRows = document.querySelectorAll('[data-publication-row]');
    const emptyState = document.querySelector('[data-publications-empty]');
    const selectedTopics = new Set();

    function normalizeTopics(value) {
      if (!value) {
        return [];
      }

      return value
        .split('|')
        .map((topic) => topic.trim())
        .filter(Boolean);
    }

    function matchesSelectedTopics(topics) {
      if (selectedTopics.size === 0) {
        return true;
      }

      return [...selectedTopics].every((topic) => topics.includes(topic));
    }

    function applyFilters() {
      const query = (searchInput?.value || '').trim().toLowerCase();
      let visibleCount = 0;

      publicationRows.forEach((row) => {
        const article = row.querySelector('[data-publication-item]');
        if (!article) {
          return;
        }

        const textContent = article.textContent.toLowerCase();
        const topics = normalizeTopics(article.dataset.topics);

        const queryMatches = !query || textContent.includes(query);
        const topicMatches = matchesSelectedTopics(topics);

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

    topicChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.dataset.topic;
        if (!topic) {
          return;
        }

        if (selectedTopics.has(topic)) {
          selectedTopics.delete(topic);
          chip.classList.remove('is-active');
        } else {
          selectedTopics.add(topic);
          chip.classList.add('is-active');
        }

        applyFilters();
      });
    });

    clearButton?.addEventListener('click', () => {
      selectedTopics.clear();
      topicChips.forEach((chip) => chip.classList.remove('is-active'));
      if (searchInput) {
        searchInput.value = '';
      }
      applyFilters();
    });

    searchInput?.addEventListener('input', () => {
      applyFilters();
    });

    applyFilters();
  });
})();

