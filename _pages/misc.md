---
permalink: /misc/
title: "Field Notes"
excerpt: "Hobbies, travel photos, and my U.S. National Parks map."
author_profile: false
---

<div class="misc-root misc-hub">
  <p class="misc-eyebrow">Beyond the research</p>
  <h1 class="misc-h1">Field Notes</h1>
  <p class="misc-lead">A little corner for the things outside the lab — what I do for fun, photos from the road, and my slow quest to visit all 63 U.S. National Parks.</p>

  <div class="misc-hub__grid">
    <a class="misc-hubcard" href="{{ '/misc/hobbies/' | relative_url }}">
      <span class="misc-hubcard__icon">🎒</span>
      <h3>Hobbies &amp; Daily Life</h3>
      <p>The everyday stuff — trails, film cameras, coffee, hoops, and whatever I'm into lately.</p>
      <span class="misc-hubcard__go">Explore →</span>
    </a>
    <a class="misc-hubcard" href="{{ '/misc/photos/' | relative_url }}">
      <span class="misc-hubcard__icon">📸</span>
      <h3>Travel Photos</h3>
      <p>A growing collection of frames from trips near and far.</p>
      <span class="misc-hubcard__go">Explore →</span>
    </a>
    <a class="misc-hubcard" href="{{ '/misc/parks/' | relative_url }}">
      <span class="misc-hubcard__icon">🏔️</span>
      <h3>National Parks Map</h3>
      {% assign visited_count = site.data.parks | where: "visited", true | size %}
      <p>An interactive relief map tracking every park I've checked off — {{ visited_count }} / 63 so far.</p>
      <span class="misc-hubcard__go">Explore →</span>
    </a>
  </div>
</div>
