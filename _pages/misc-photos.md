---
permalink: /misc/photos/
title: "Travel Photos"
excerpt: "A growing gallery of frames from the road."
author_profile: false
uses_misc_gallery: true
---

{% include base_path %}

<div class="misc-root misc-photos">
  <p class="misc-eyebrow">From the road</p>
  <h1 class="misc-h1">Travel Photos</h1>

  {% assign photos = site.data.travel_photos %}
  {% if photos and photos.size > 0 %}
    <div class="misc-masonry" data-photo-grid>
      {% for photo in photos %}
        {% if photo.file contains '://' %}
          {% assign img_url = photo.file %}
        {% else %}
          {% assign img_url = photo.file | prepend: '/images/travel/' | prepend: base_path %}
        {% endif %}
        <figure class="misc-photo" data-place="{{ photo.place | downcase }}">
          <img src="{{ img_url }}" alt="{{ photo.title }}" loading="lazy"
               data-full="{{ img_url }}" data-caption="{{ photo.title }} — {{ photo.place }} · {{ photo.year }}">
          <figcaption class="misc-photo__cap">
            <b>{{ photo.title }}</b>{{ photo.place }} · {{ photo.year }}
          </figcaption>
        </figure>
      {% endfor %}
    </div>
  {% else %}
    <div class="misc-photos-placeholder">
      <span class="misc-photos-placeholder__icon">🖼️</span>
      <p>No photos here yet. Drop image files into <code>images/travel/</code>, then list them in <code>_data/travel_photos.yml</code> to fill this gallery.</p>
    </div>
  {% endif %}

  <p class="misc-back"><a href="{{ '/misc/' | relative_url }}">← Back to Field Notes</a></p>
</div>

<div class="misc-lightbox" data-lightbox hidden>
  <button class="misc-lightbox__close" data-lightbox-close aria-label="Close">×</button>
  <img class="misc-lightbox__img" data-lightbox-img src="" alt="">
  <p class="misc-lightbox__cap" data-lightbox-cap></p>
</div>
