---
permalink: /
title: "Hello :)"
author_profile: true
uses_publications_assets: true
uses_news_assets: true
redirect_from: 
  - /about/
  - /about.html
---

My name is Keyang Xuan and I'm a graduate student at Siebel School of Computing and Data Science, University of Illinois Urbana-Champaign, advised by [Jiaxuan You](https://cs.stanford.edu/people/jiaxuan/). My research generally revolves around building intelligent agents with social and collaborative intelligence. I build computational frameworks that enable language agents to **facilitate scientific discovery**, **adapt to complex social interactions**, and **operate under efficiency and safety constraints**.

Before UIUC, I spent wonderful four years in University of Minnesota, where I am forunate to worked with [Vipin Kumar](https://scholar.google.com/citations?user=BnxU9TEAAAAJ&hl=en) and [Kangjie Lu](https://www-users.cse.umn.edu/~kjlu/).

<h2 class="section-heading">
  <span class="section-heading-icon" aria-hidden="true">
    <i class="fas fa-flask"></i>
  </span>
  <span>Research Interest</span>
</h2>

**Social Intelligence**: Enable AI agents to understand and simulate human social behaviors
and interaction patterns, allowing them to engage naturally with human expectations in diverse social
contexts

**Collaborative Intelligence**: Design multi-agent systems that learn to cooperate and
coordinate, both with humans and among themselves, to accomplish complex, real-world tasks collectively

<h2 class="section-heading">
  <span class="section-heading-icon" aria-hidden="true">
    <i class="fas fa-bullhorn"></i>
  </span>
  <span>News</span>
</h2>

{% assign news_items = site.data.news | sort: "date" | reverse %}
{% if news_items and news_items.size > 0 %}
  <div class="news-board" data-news-board>
    <div class="news-board__list" data-news-list>
      {% for item in news_items %}
        <article class="news-card">
          <div class="news-card__date">
            {{ item.date | date: "%Y.%m" }}
          </div>
          <p class="news-card__summary">
            {% if item.link %}
              <a href="{{ item.link }}" target="_blank" rel="noopener">
                {{ item.summary | markdownify | strip_newlines | replace: '<p>', '' | replace: '</p>', '' }}
              </a>
            {% else %}
              {{ item.summary | markdownify | strip_newlines | replace: '<p>', '' | replace: '</p>', '' }}
            {% endif %}
          </p>
        </article>
      {% endfor %}
    </div>
    <div class="news-board__hint">
      Scroll for more updates
    </div>
  </div>
{% endif %}


<h2 class="section-heading">
  <span class="section-heading-icon" aria-hidden="true">
    <i class="fas fa-book-open"></i>
  </span>
  <span>Publications</span>
</h2>

{% include base_path %}

{% assign topic_options = "Auto Research|Social Intelligence|Multi-Agent Systems|LLM Applications" | split: "|" %}

<div class="publications-panel">
  <div class="publication-search">
    <div class="publication-search__row">
      <span class="publication-search__title">Search</span>
      <div class="publication-search__field">
        <input
          type="search"
          id="publication-search-input"
          placeholder="title, venue, or keyword"
          data-publications-search
        />
      </div>
      <button type="button" class="publication-search__clear" data-clear-topics>Clear filters</button>
    </div>
    {% if topic_options and topic_options.size > 0 %}
      <div class="publication-topics">
        <span class="publication-topics__title">Filter by topics</span>
        <div class="publication-topics__chips">
          {% for topic in topic_options %}
            {% assign topic_label = topic | strip %}
            {% if topic_label != "" %}
              <button
                type="button"
                class="topic-chip"
                data-topic="{{ topic_label | downcase }}"
                data-topic-chip
              >
                {{ topic_label }}
              </button>
            {% endif %}
          {% endfor %}
        </div>
      </div>
    {% endif %}
  </div>

  <div class="publication-empty" data-publications-empty hidden>
    No publications match the current search. Try a different keyword or topic filter.
  </div>

  <div class="publications-list">
    {% for post in site.publications reversed %}
      {% include archive-single.html %}
    {% endfor %}
  </div>
</div>