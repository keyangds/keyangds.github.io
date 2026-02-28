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

My name is Keyang Xuan and I'm a graduate student at Siebel School of Computing and Data Science, University of Illinois Urbana-Champaign, advised by Prof.[Jiaxuan You](https://cs.stanford.edu/people/jiaxuan/). I am also fortunate to work with Prof.[Tal August](https://talaugust.github.io/). My research generally revolves around building intelligent agents with social and collaborative intelligence. In particular, I develop computational frameworks that enable language agents to **facilitate scientific discovery**, **adapt to complex social interactions**, and **operate under efficiency and safety constraints**.

Before joining UIUC, I spent four wonderful years at the University of Minnesota, where I was fortunate to work with Prof.[Vipin Kumar](https://scholar.google.com/citations?user=BnxU9TEAAAAJ&hl=en) and Prof.[Kangjie Lu](https://www-users.cse.umn.edu/~kjlu/).

I’m always enthusiastic about collaborating with researchers from diverse fields. If you’re interested in working together, please don’t hesitate to reach out.


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

{% assign topic_options = "Auto Research|Social Intelligence|Multi-Agent Systems|LLM Applications|Alignment" | split: "|" %}

<div class="publications-panel">
  <div class="publication-filters">
    <div class="publication-filters__search">
      <svg class="publication-filters__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/></svg>
      <input
        type="search"
        id="publication-search-input"
        placeholder="Search by title or tag..."
        data-publications-search
      />
    </div>
    <div class="publication-filters__chips">
      <button type="button" class="filter-chip is-active" data-topic="all" data-topic-chip>All</button>
      {% for topic in topic_options %}
        {% assign topic_label = topic | strip %}
        {% if topic_label != "" %}
          <button type="button" class="filter-chip" data-topic="{{ topic_label | downcase }}" data-topic-chip>{{ topic_label }}</button>
        {% endif %}
      {% endfor %}
    </div>
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