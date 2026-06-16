---
permalink: /misc/hobbies/
title: "Hobbies & Daily Life"
excerpt: "A few things I love when I'm off the clock."
author_profile: false
---

<div class="misc-root misc-hobbies">
  <p class="misc-eyebrow">Off the clock</p>
  <h1 class="misc-h1">Hobbies &amp; Daily Life</h1>
  {% if site.data.hobbies.intro %}<p class="misc-lead">{{ site.data.hobbies.intro }}</p>{% endif %}

  <div class="misc-hob__grid">
    {% for item in site.data.hobbies.items %}
      <div class="misc-hob">
        <span class="misc-hob__icon">{{ item.icon }}</span>
        <div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.blurb }}</p>
        </div>
      </div>
    {% endfor %}
  </div>

  {% if site.data.hobbies.currently and site.data.hobbies.currently.size > 0 %}
    <div class="misc-now">
      <span class="misc-now__label">Currently</span>
      <span class="misc-now__items">
        {% for c in site.data.hobbies.currently %}{{ c }}{% unless forloop.last %} &nbsp;·&nbsp; {% endunless %}{% endfor %}
      </span>
    </div>
  {% endif %}

  <p class="misc-back"><a href="{{ '/misc/' | relative_url }}">← Back to Field Notes</a></p>
</div>
