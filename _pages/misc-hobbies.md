---
permalink: /misc/hobbies/
title: "Hobbies & Daily Life"
excerpt: "A few things I love when I'm off the clock."
author_profile: false
uses_misc_hub_assets: true
---

<div class="misc-root misc-hobbies">
  <header class="fn-head">
    <p class="fn-eyebrow">Off the clock</p>
    <h1 class="fn-title fn-title--sub">Hobbies &amp; Daily Life</h1>
    {% if site.data.hobbies.intro %}<p class="fn-lead">{{ site.data.hobbies.intro }}</p>{% endif %}
  </header>

  <ol class="hob-list">
    {% for item in site.data.hobbies.items %}
      <li class="hob-item">
        <span class="hob-item__no">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
        <span class="hob-item__body">
          <span class="hob-item__title"><span class="hob-item__icon" aria-hidden="true">{{ item.icon }}</span>{{ item.title }}</span>
          <span class="hob-item__blurb">{{ item.blurb }}</span>
        </span>
      </li>
    {% endfor %}
  </ol>

  {% if site.data.hobbies.currently and site.data.hobbies.currently.size > 0 %}
    <p class="hob-now"><span class="hob-now__label">Currently</span>{% for c in site.data.hobbies.currently %}{{ c }}{% unless forloop.last %} · {% endunless %}{% endfor %}</p>
  {% endif %}

  <p class="fn-back"><a href="{{ '/misc/' | relative_url }}">&#8592;&nbsp; Back to Field Notes</a></p>
</div>
