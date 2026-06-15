# Misc Section — Design Spec

**Date:** 2026-06-15
**Site:** keyangds.github.io (academicpages / Minimal Mistakes Jekyll theme)
**Status:** Approved design, ready for implementation planning

## 1. Goal

Add a new **Misc** section to the personal academic site with three parts:

1. **Hobbies & Daily Life** — a short, personal intro to interests/hobbies.
2. **Travel Photos** — a growing photo gallery.
3. **National Parks Map** — an interactive map tracking which of the 63 U.S.
   National Parks have been visited.

The section must feel **native to the existing site** (same visual system as the
About page), while the parks map specifically should be **professional, beautiful,
and full of personality**.

## 2. Scope decisions (locked)

- **Page structure:** separate subpages under a `/misc/` hub (not one long page,
  not tabs).
- **Parks tracked:** the **63 officially designated U.S. National Parks** (not the
  400+ NPS units).
- **Map terrain (v1):** **procedural** shaded relief (hand-placed landform regions +
  noise-based hillshade). Real-elevation data is explicitly out of scope for v1;
  the terrain layer is isolated so it can be swapped later without touching the
  rest of the map.
- **Map tech:** D3 + TopoJSON, `albersUsa` projection, fully **static** — no API
  keys, no tile servers, GitHub Pages compatible.

## 3. Information architecture

| URL | Purpose |
|---|---|
| `/misc/` | Hub: short intro + 3 cards linking to the subpages |
| `/misc/hobbies/` | Intro prose + hobby cards grid + "Currently" strip |
| `/misc/photos/` | Masonry gallery + place-filter chips + lightbox |
| `/misc/parks/` | Interactive 3D-relief National Parks map |

The existing top nav already contains a `Misc.` item pointing at `/misc/`
(currently a dead link — `_data/navigation.yml`). This work gives it a real
destination. No other nav changes.

## 4. Visual system (locked)

The whole section reuses the site's existing design language so it sits naturally
next to the About page. Tokens are defined once and shared across all four pages.

**Light mode**
- Page background: soft cool wash — layered radial gradients in the `#f1eeff` /
  `#e6f0ff` family over a `#eef2fb` base (same family as the site's section-heading
  badges / News board).
- Cards: white `#ffffff`, border `rgba(15,28,62,.08)`, shadow
  `0 12px 24px rgba(18,32,70,.07)`, radius ~16px (matches News / publication cards).
- Text: ink `#1f2433`, muted `#6b7280`.
- Accent: blue `#1a73e8` (links, active chips, pins, progress ring), hover
  `#0d47a1`; secondary teal `#0d9488` (link-actions, pin hover).
- Section-heading badge: gradient circle `#f5f7ff`→`#e8edff`, border
  `rgba(26,38,92,.12)`, icon color `#2f386c` — identical to the About page headings.
- Type: site sans-serif stack
  (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`).
  No serif.

**Dark mode** (matches the site's existing `html[data-theme="dark"]` component styles)
- Page background base `#1a1a1a` (no gradient wash), cards `#242424`, border `#333`.
- Text `#e0e0e0`, muted `#999`.
- Accent blue `#3b9cff`, teal `#34d399`.

Dark mode is driven by the site's existing toggle (`data-theme="dark"` on `<html>`,
set by `assets/js/_main.js`). The mockup's standalone toggle is only for preview;
production relies on the site toggle.

## 5. Page designs

### 5.1 Hub — `/misc/`
- Eyebrow ("Beyond the research") + H1 + one-sentence intro.
- 3 link cards (icon badge, title, one-line description, "Explore →").
  Cards lift on hover. Responsive: 3 columns → 1 on narrow screens.

### 5.2 Hobbies — `/misc/hobbies/`
- Eyebrow + H1 + short intro paragraph.
- Responsive grid of hobby cards, each: icon + title + one-line blurb.
- A "Currently" strip (dashed-accent card): reading / listening / planning — a
  light personality touch.
- Content from `_data/hobbies.yml`; "Currently" from a small block in the same file
  or page front matter.

### 5.3 Travel Photos — `/misc/photos/`
- Eyebrow + H1 + intro.
- Place-filter chips (All / Southwest / Pacific NW / Sierra / East Coast / Abroad,
  derived from the data).
- CSS-columns **masonry** grid; each photo has a hover caption (title + place/year)
  and opens in a **lightbox** on click.
- Photos + metadata from `_data/travel_photos.yml`; image files in `/images/travel/`.
- Filtering + lightbox handled by a small vanilla-JS file (same opt-in pattern as
  `publications.js`).

### 5.4 National Parks Map — `/misc/parks/`
The centerpiece. Layout: header row (title with section-heading badge + tagline on
the left; progress ring + stats + nothing else on the right) above a two-column
stage (map card ~1fr, detail card 320px; stacks on narrow screens).

**Map rendering**
- D3 `geoAlbersUsa` projection; US states from `us-atlas` states-10m TopoJSON.
- Layer order (bottom → top):
  1. Raised landmass: US silhouette filled with base land color + soft **drop
     shadow** (lifts the continent off the page — the "paper relief" effect).
  2. Terrain (clipped to US silhouette):
     - base lowland fill;
     - soft, blurred **landform tint blobs** at hand-placed anchors — forest
       (muted green), arid/plains (muted sand), mountains (taupe);
     - global **diffuse hillshade** (SVG `feTurbulence` + `feDiffuseLighting`,
       light from NW ~azimuth 235°), `multiply` blend;
     - mountain-only **deep shadow** pass (stronger `feDiffuseLighting`, masked to
       mountain regions), `multiply`;
     - mountain-only **specular highlight** pass (`feSpecularLighting`, masked),
       `screen` — peaks catch light → 3D "立体感".
  3. State borders (thin) + US outline.
  4. **Park pins** (with a small drop shadow so they float).
- All terrain colors/opacities are CSS variables → theme-aware for dark mode.

**Pins & interaction**
- One pin per park from `_data/parks.yml`, positioned by lat/lng.
- Visited = filled blue; on-the-list = hollow gray ring. Hover → enlarge + teal
  highlight + tooltip (name · state). Click → updates the detail card.
- **Detail card:** visited → photo + "Visited · {date}" badge + name + state·region
  + short note. On-the-list → placeholder + "On the list" badge + name + region +
  prompt text.
- **Progress ring** ("N / 63") + small stats (states / regions / to-go), all
  computed from the data.

**Territories**
- American Samoa & US Virgin Islands fall outside the `albersUsa` projection.
  They render as two small "+territory" chips below the map so all 63 are
  representable. (They are still rows in `parks.yml`.)

## 6. Data model

### `_data/parks.yml` (pre-filled with all 63)
```yaml
- name: "Yosemite"
  state: "CA"
  region: "Sierra Nevada"
  lat: 37.83
  lng: -119.50
  visited: true        # owner edits
  date: "Aug 2024"     # owner edits (optional)
  photo: "yosemite.jpg"# optional, in /images/parks/
  note: "..."          # optional
```
- All 63 names/states/regions/lat/lng are pre-populated (geography never needs
  editing). The owner only flips `visited` and optionally adds `date` / `photo` /
  `note`.

### `_data/hobbies.yml`
```yaml
items:
  - icon: "🥾"
    title: "Hiking & Backpacking"
    blurb: "..."
currently:
  - "📖 Reading <title>"
  - "🎧 ..."
```

### `_data/travel_photos.yml`
```yaml
- file: "zion-narrows.jpg"   # in /images/travel/
  title: "Zion Narrows"
  place: "Southwest"
  year: 2023
```

## 7. File inventory (new / changed)

**New**
- `_pages/misc.md`, `_pages/misc-hobbies.md`, `_pages/misc-photos.md`,
  `_pages/misc-parks.md`
- `_data/parks.yml`, `_data/hobbies.yml`, `_data/travel_photos.yml`
- `_sass/custom/_misc.scss` (all Misc styles + map styles)
- `assets/js/parks-map.js` (D3 map render + interaction)
- `assets/js/misc-gallery.js` (photo filter + lightbox)
- `/images/travel/` and `/images/parks/` (owner-supplied images; seeded with
  placeholders / `.gitkeep`)

**Changed**
- `assets/css/main.scss` — import the new `_misc.scss` partial.
- `_includes/scripts.html` — opt-in loading of `parks-map.js` / `misc-gallery.js`
  via page front-matter flags (mirrors existing `uses_publications_assets` /
  `uses_news_assets`).
- Map dependencies: pin specific versions of the required D3 modules
  (`d3-geo`, `d3-selection`, plus `d3-array`/`d3-fetch` as needed), `topojson-client`,
  and the `us-atlas` states-10m TopoJSON. Default to **vendoring them locally** under
  `assets/js/` / `assets/data/` so the page has no external runtime dependency on
  GitHub Pages; CDN-pinned is an acceptable fallback. Final choice deferred to the
  implementation plan.

**Unchanged**
- `_data/navigation.yml` already points `Misc.` → `/misc/`; no edit needed.

## 8. Non-goals (v1)

- Real-elevation/topographic data for the relief (procedural only).
- The 400+ NPS units (only the 63 designated parks).
- Pan/zoom slippy map, clustering, or any backend.
- Per-park standalone pages (parks live entirely within the map + detail card).
- Automatic photo ingestion / EXIF parsing (captions are authored in YAML).

## 9. Success criteria

- `/misc/` and its three subpages build under Jekyll and render in light + dark mode
  consistently with the About page.
- The parks map renders all 63 parks at correct locations with working hover,
  click-to-detail, progress ring, and the approved 3D-relief terrain.
- Adding a visit is a one-line edit in `_data/parks.yml` (`visited: true` + optional
  fields) with no code changes.
- No external API keys; page works on GitHub Pages.
