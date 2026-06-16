/* Interactive U.S. National Parks relief map.
   Reads window.MISC_PARKS (from _data/parks.yml), renders a D3 albersUsa map with
   procedural shaded relief, pins, hover tooltips, a click-to-open detail card,
   and a progress ring. Theme colors come from CSS variables, so light/dark follow
   the site theme automatically. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var svgEl = document.querySelector("[data-parks-map]");
    if (!svgEl || typeof d3 === "undefined" || typeof topojson === "undefined") return;

    var PARKS = (window.MISC_PARKS || []).slice();
    var TOTAL = 63;

    // ---- stats + progress ring ----
    var visited = PARKS.filter(function (p) { return p.visited; });
    var states = {}, regions = {};
    visited.forEach(function (p) { if (p.state) states[p.state] = 1; if (p.region) regions[p.region] = 1; });
    setText("[data-ring-count]", visited.length);
    setText("[data-stat-states]", Object.keys(states).length);
    setText("[data-stat-regions]", Object.keys(regions).length);
    setText("[data-stat-togo]", TOTAL - visited.length);
    var bar = document.querySelector("[data-ring-bar]");
    if (bar) {
      var C = 2 * Math.PI * 31;
      bar.setAttribute("stroke-dasharray", C);
      bar.setAttribute("stroke-dashoffset", C * (1 - visited.length / TOTAL));
    }

    // ---- map ----
    var W = 960, H = 560;
    var svg = d3.select(svgEl);
    var projection = d3.geoAlbersUsa().scale(1180).translate([W / 2, H / 2]);
    var path = d3.geoPath(projection);
    var tip = document.querySelector("[data-parks-tip]");
    var detail = document.querySelector("[data-parks-detail]");

    var TERRAIN = [
      [-123, 46, 70, "forest"], [-122, 41, 70, "forest"], [-84, 33, 130, "forest"],
      [-71, 44, 80, "forest"], [-90, 46, 90, "forest"], [-93, 31, 90, "forest"],
      [-101, 41, 150, "arid"], [-100, 33, 120, "arid"], [-111, 34, 120, "arid"],
      [-117, 39, 95, "arid"], [-103, 30, 80, "arid"],
      [-110, 45, 120, "mtn"], [-106, 39, 110, "mtn"], [-120, 40, 105, "mtn"],
      [-113, 47, 80, "mtn"], [-81, 37, 120, "mtn"], [-122, 47, 55, "mtn"]
    ];
    var MTN = TERRAIN.filter(function (t) { return t[3] === "mtn"; });

    // filters / defs
    var defs = svg.append("defs");
    defs.append("filter").attr("id", "pk-soft")
      .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%")
      .append("feGaussianBlur").attr("stdDeviation", 26);

    var drop = defs.append("filter").attr("id", "pk-drop")
      .attr("x", "-20%").attr("y", "-20%").attr("width", "140%").attr("height", "160%");
    drop.append("feDropShadow").attr("dx", 0).attr("dy", 6).attr("stdDeviation", 8)
      .attr("flood-color", "#1f2a44").attr("flood-opacity", 0.20);

    var pinsh = defs.append("filter").attr("id", "pk-pinsh")
      .attr("x", "-60%").attr("y", "-60%").attr("width", "220%").attr("height", "220%");
    pinsh.append("feDropShadow").attr("dx", 0).attr("dy", 1.3).attr("stdDeviation", 1)
      .attr("flood-color", "#0b1c3a").attr("flood-opacity", 0.4);

    var dif = defs.append("filter").attr("id", "pk-dif");
    dif.append("feTurbulence").attr("type", "fractalNoise").attr("baseFrequency", "0.016").attr("numOctaves", 5).attr("seed", 11).attr("result", "n");
    dif.append("feDiffuseLighting").attr("in", "n").attr("lighting-color", "#ffffff").attr("surfaceScale", 3).attr("diffuseConstant", 1)
      .append("feDistantLight").attr("azimuth", 235).attr("elevation", 48);

    var difHi = defs.append("filter").attr("id", "pk-difHi");
    difHi.append("feTurbulence").attr("type", "fractalNoise").attr("baseFrequency", "0.03").attr("numOctaves", 6).attr("seed", 7).attr("result", "n");
    difHi.append("feDiffuseLighting").attr("in", "n").attr("lighting-color", "#ffffff").attr("surfaceScale", 5.5).attr("diffuseConstant", 1.05)
      .append("feDistantLight").attr("azimuth", 235).attr("elevation", 36);

    var spc = defs.append("filter").attr("id", "pk-spc");
    spc.append("feTurbulence").attr("type", "fractalNoise").attr("baseFrequency", "0.03").attr("numOctaves", 6).attr("seed", 7).attr("result", "n");
    spc.append("feSpecularLighting").attr("in", "n").attr("lighting-color", "#ffffff").attr("surfaceScale", 4.5)
      .attr("specularConstant", 0.85).attr("specularExponent", 16)
      .append("feDistantLight").attr("azimuth", 235).attr("elevation", 44);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(function (us) {
      var outline = topojson.merge(us, us.objects.states.geometries);
      var borders = topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; });

      // size the projection so the country fills the frame (no empty bands)
      projection.fitExtent([[16, 14], [W - 16, H - 14]], outline);

      defs.append("clipPath").attr("id", "pk-clip").append("path").attr("d", path(outline));

      var mask = defs.append("mask").attr("id", "pk-mtnmask");
      mask.append("rect").attr("width", W).attr("height", H).attr("fill", "black");
      var mg = mask.append("g").attr("filter", "url(#pk-soft)");
      MTN.forEach(function (t) {
        var xy = projection([t[0], t[1]]);
        if (xy) mg.append("circle").attr("cx", xy[0]).attr("cy", xy[1]).attr("r", t[2] * 0.92).attr("fill", "white");
      });

      // raised landmass shadow
      svg.append("path").attr("class", "parks-land-shadow").attr("d", path(outline)).attr("filter", "url(#pk-drop)");

      // terrain (clipped)
      var land = svg.append("g").attr("clip-path", "url(#pk-clip)");
      land.append("rect").attr("class", "parks-land-base").attr("width", W).attr("height", H);
      var tint = land.append("g").attr("filter", "url(#pk-soft)").style("opacity", 0.7);
      TERRAIN.forEach(function (t) {
        var xy = projection([t[0], t[1]]);
        if (xy) tint.append("circle").attr("class", "parks-tint parks-tint--" + t[3]).attr("cx", xy[0]).attr("cy", xy[1]).attr("r", t[2]);
      });
      land.append("rect").attr("class", "parks-relief-diffuse").attr("width", W).attr("height", H).attr("fill", "#fff").attr("filter", "url(#pk-dif)");
      land.append("rect").attr("class", "parks-relief-hi").attr("width", W).attr("height", H).attr("fill", "#fff").attr("filter", "url(#pk-difHi)").attr("mask", "url(#pk-mtnmask)");
      land.append("rect").attr("class", "parks-relief-spec").attr("width", W).attr("height", H).attr("fill", "#000").attr("filter", "url(#pk-spc)").attr("mask", "url(#pk-mtnmask)");

      // borders + outline
      svg.append("path").attr("class", "parks-state-border").attr("d", path(borders));
      svg.append("path").attr("class", "parks-outline").attr("d", path(outline));

      // pins
      var g = svg.append("g").attr("filter", "url(#pk-pinsh)");
      PARKS.forEach(function (p) {
        if (p.offmap) return;
        var xy = projection([p.lng, p.lat]);
        if (!xy) return;
        g.append("circle")
          .attr("class", "parks-pin " + (p.visited ? "parks-pin--visited" : "parks-pin--notyet"))
          .attr("cx", xy[0]).attr("cy", xy[1]).attr("r", p.visited ? 5 : 4.2)
          .on("mousemove", function (e) {
            if (!tip) return;
            tip.textContent = p.name + " · " + p.state;
            tip.style.left = e.clientX + "px";
            tip.style.top = e.clientY + "px";
            tip.classList.add("is-on");
          })
          .on("mouseleave", function () { if (tip) tip.classList.remove("is-on"); })
          .on("click", function () { showDetail(p); });
      });
    }).catch(function () {
      svgEl.insertAdjacentHTML("afterend", '<p class="parks-maperr">Map could not load (network blocked the map data).</p>');
    });

    function photoUrl(p) {
      if (!p.photo) return null;
      return p.photo.indexOf("://") !== -1 ? p.photo : "/images/parks/" + p.photo;
    }

    function showDetail(p) {
      if (!detail) return;
      var where = p.state + " · " + p.region;
      if (p.visited) {
        var url = photoUrl(p);
        var photo = url
          ? '<div class="parks-detail__photo"><img src="' + url + '" alt="' + esc(p.name) + '"><span class="parks-detail__badge">Visited' + (p.date ? " · " + esc(p.date) : "") + '</span></div>'
          : '<div class="parks-detail__photo parks-detail__photo--empty"><span class="parks-detail__badge">Visited' + (p.date ? " · " + esc(p.date) : "") + '</span><span>📷</span></div>';
        detail.innerHTML = photo +
          '<div class="parks-detail__body"><h3>' + esc(p.name) + '</h3>' +
          '<div class="parks-detail__where">' + esc(where) + '</div>' +
          (p.date ? '<p class="parks-detail__meta"><b>Visited:</b> ' + esc(p.date) + '</p>' : '') +
          '<p class="parks-detail__note">' + (p.note ? esc(p.note) : 'A short personal note about this trip can go here.') + '</p></div>';
      } else {
        detail.innerHTML =
          '<div class="parks-detail__photo parks-detail__photo--empty"><span class="parks-detail__badge parks-detail__badge--no">On the list</span><span>🏔️</span></div>' +
          '<div class="parks-detail__body"><h3>' + esc(p.name) + '</h3>' +
          '<div class="parks-detail__where">' + esc(where) + '</div>' +
          '<p class="parks-detail__note">Not visited yet — still on the bucket list.</p></div>';
      }
    }

    function setText(sel, val) { var el = document.querySelector(sel); if (el) el.textContent = val; }
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  });
})();
