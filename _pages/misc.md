---
permalink: /misc/
title: "Field Notes"
excerpt: "Hobbies, travel photos, and my U.S. National Parks map."
author_profile: false
uses_misc_hub_assets: true
---

<div class="misc-root misc-hub">
  <header class="fn-head">
    <p class="fn-eyebrow">Beyond the research</p>
    <h1 class="fn-title">Field Notes</h1>
    <p class="fn-lead">A corner for the things outside the lab — what I do for fun, photographs from the road, and a slow quest to all sixty-three U.S. National Parks.</p>
  </header>

  <ol class="fn-index">
    <li class="fn-entry">
      <a class="fn-link" href="{{ '/misc/hobbies/' | relative_url }}">
        <span class="fn-row">
          <span class="fn-num">I</span>
          <span class="fn-name">Hobbies &amp; Daily Life</span>
          <span class="fn-dots" aria-hidden="true"></span>
          <span class="fn-cue" aria-hidden="true">&#8594;</span>
        </span>
        <span class="fn-meta">
          <span class="fn-kicker">Off the clock</span>
          <span class="fn-desc">Trails, film cameras, coffee, hoops, and whatever I'm into lately.</span>
        </span>
      </a>
    </li>
    <li class="fn-entry">
      <a class="fn-link" href="{{ '/misc/photos/' | relative_url }}">
        <span class="fn-row">
          <span class="fn-num">II</span>
          <span class="fn-name">Travel Photos</span>
          <span class="fn-dots" aria-hidden="true"></span>
          <span class="fn-cue" aria-hidden="true">&#8594;</span>
        </span>
        <span class="fn-meta">
          <span class="fn-kicker">From the road</span>
          <span class="fn-desc">A growing collection of frames from trips near and far.</span>
        </span>
      </a>
    </li>
    <li class="fn-entry">
      {% assign visited_count = site.data.parks | where: "visited", true | size %}
      <a class="fn-link" href="{{ '/misc/parks/' | relative_url }}">
        <span class="fn-row">
          <span class="fn-num">III</span>
          <span class="fn-name">National Parks Map</span>
          <span class="fn-dots" aria-hidden="true"></span>
          <span class="fn-stat" aria-label="{{ visited_count }} of 63 parks visited"><b>{{ visited_count }}</b><span class="fn-stat__d">/</span>63</span>
          <span class="fn-cue" aria-hidden="true">&#8594;</span>
        </span>
        <span class="fn-meta">
          <span class="fn-kicker">The slow quest</span>
          <span class="fn-desc">An interactive relief map of every park I've checked off.</span>
        </span>
      </a>
    </li>
  </ol>
</div>
