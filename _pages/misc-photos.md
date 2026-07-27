---
permalink: /misc/photos/
title: "Travel Photos"
excerpt: "A growing gallery of frames from the road."
author_profile: false
uses_misc_gallery: true
uses_misc_hub_assets: true
---

{% include base_path %}

<div class="misc-root misc-photos">
  <header class="fn-head">
    <p class="fn-eyebrow">From the road</p>
    <h1 class="fn-title fn-title--sub">Travel Photos</h1>
  </header>

  {% assign photos = site.data.travel_photos %}
  {% if photos and photos.size > 0 %}
    <div class="ph-grid" data-photo-grid>
      {% for photo in photos %}
        {% if photo.file contains '://' %}
          {% assign img_url = photo.file %}
        {% else %}
          {% assign img_url = photo.file | prepend: '/images/travel/' | prepend: base_path %}
        {% endif %}
        <figure class="misc-photo ph-photo" data-place="{{ photo.place | downcase }}">
          <img src="{{ img_url }}" alt="{{ photo.title }}" loading="lazy"
               data-full="{{ img_url }}" data-caption="{{ photo.title }} — {{ photo.place }} · {{ photo.year }}">
          <figcaption class="misc-photo__cap ph-cap">
            <b>{{ photo.title }}</b><span>{{ photo.place }}{% if photo.year %} · {{ photo.year }}{% endif %}</span>
          </figcaption>
        </figure>
      {% endfor %}
    </div>
  {% else %}
    <div class="ph-empty">
      <span class="ph-empty__icon" aria-hidden="true">▦</span>
      <p>No photographs here yet. Drop image files into <code>images/travel/</code>, then list them in <code>_data/travel_photos.yml</code> to fill this gallery.</p>
    </div>
  {% endif %}
</div>

<div class="misc-lightbox" data-lightbox hidden>
  <button class="misc-lightbox__close" data-lightbox-close aria-label="Close">&times;</button>
  <img class="misc-lightbox__img" data-lightbox-img src="" alt="">
  <p class="misc-lightbox__cap" data-lightbox-cap></p>
</div>
