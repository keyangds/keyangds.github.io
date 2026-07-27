---
permalink: /misc/parks/
title: "U.S. National Parks"
excerpt: "An interactive relief map of every U.S. National Park I've visited."
author_profile: false
uses_misc_hub_assets: true
---

<div class="misc-root parks-page">
  <header class="fn-head parks-head">
    <div class="parks-head__intro">
      <p class="fn-eyebrow">The slow quest</p>
      <h1 class="fn-title fn-title--sub">National Parks</h1>
      <p class="fn-lead">Chasing all sixty-three — across mountains, deserts, and coasts.</p>
    </div>
    <div class="parks-progress">
      <div class="parks-ring">
        <svg width="74" height="74">
          <circle cx="37" cy="37" r="31" fill="none" class="parks-ring__track" stroke-width="7"></circle>
          <circle cx="37" cy="37" r="31" fill="none" class="parks-ring__bar" stroke-width="7" stroke-linecap="round" data-ring-bar></circle>
        </svg>
        <div class="parks-ring__num"><b data-ring-count>0</b><span>of 63</span></div>
      </div>
      <div class="parks-stats">
        <span><b data-stat-states>0</b> states</span><br>
        <span><b data-stat-regions>0</b> regions</span><br>
        <span><b data-stat-togo>63</b> to go</span>
      </div>
    </div>
  </header>

  <div class="parks-stage">
    <div class="parks-mapcard">
      <svg class="parks-map" data-parks-map viewBox="0 0 960 560" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map of U.S. National Parks visited"></svg>
      <div class="parks-legend">
        <span><i class="sw sw-forest"></i>Forest</span>
        <span><i class="sw sw-arid"></i>Arid / plains</span>
        <span><i class="sw sw-mtn"></i>Mountains</span>
        <span><i class="sw sw-visited"></i>Visited</span>
        <span><i class="sw sw-notyet"></i>On the list</span>
      </div>
    </div>

    <aside class="parks-detail" data-parks-detail>
      <div class="parks-detail__photo parks-detail__photo--empty"><span>🏔️</span></div>
      <div class="parks-detail__body">
        <h3>Pick a park</h3>
        <div class="parks-detail__where">Hover &amp; click a pin</div>
        <p class="parks-detail__note">Hover a pin to see its name; click to open its card here — visited parks show a photo and date, the rest stay on the bucket list.</p>
      </div>
    </aside>
  </div>

  {% assign off = site.data.parks | where: "offmap", true %}
  {% if off and off.size > 0 %}
    <div class="parks-territories">
      <span class="parks-territories__label">Also tracked, off the map</span>
      {% for t in off %}
        <span class="parks-chip {% if t.visited %}is-visited{% endif %}" title="{{ t.region }}">{{ t.name }}{% if t.visited %} &#10003;{% endif %}</span>
      {% endfor %}
    </div>
  {% endif %}

  <p class="misc-tip-note">Terrain relief is illustrative (procedural shading), not survey-grade elevation.</p>

  <div class="parks-tip" data-parks-tip></div>
</div>

<script>window.MISC_PARKS = {{ site.data.parks | jsonify }};</script>
<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js"></script>
<script src="{{ '/assets/js/parks-map.js' | relative_url }}"></script>
