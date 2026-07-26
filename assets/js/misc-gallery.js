/* Travel photos: justified gallery-wall layout + lightbox. Loaded on /misc/photos/. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var grid = document.querySelector("[data-photo-grid]");
    if (!grid) return;

    // ---- justified rows (a gallery wall: equal-height rows, full images, no crop) ----
    var GAP = 12;

    function targetHeight(w) {
      if (w >= 1100) return 280;
      if (w >= 820) return 250;
      return 210;
    }

    function layout() {
      var items = [].slice.call(grid.querySelectorAll(".ph-photo"));
      if (!items.length) return;
      var cw = grid.clientWidth;

      // Narrow screens: drop the justified layout, let the CSS masonry stack it.
      if (cw < 500) {
        grid.classList.remove("is-justified");
        items.forEach(function (el) { el.style.width = ""; el.style.height = ""; });
        return;
      }

      var target = targetHeight(cw);
      var row = [], sum = 0;

      function place(arr, isLast) {
        var gaps = (arr.length - 1) * GAP;
        var h = (cw - gaps) / sum;
        if (isLast && h > target * 1.35) h = target; // don't blow up a sparse final row
        var used = 0;
        arr.forEach(function (it, i) {
          var w = (i === arr.length - 1 && !isLast)
            ? (cw - gaps - used)             // last in a full row absorbs rounding → clean right edge
            : Math.round(it.ar * h);
          used += w;
          it.el.style.width = w + "px";
          it.el.style.height = Math.round(h) + "px";
        });
      }

      items.forEach(function (el) {
        var img = el.querySelector("img");
        var ar = (img && img.naturalWidth && img.naturalHeight)
          ? img.naturalWidth / img.naturalHeight
          : 1.4; // fallback until the image reports its size
        row.push({ el: el, ar: ar });
        sum += ar;
        var gaps = (row.length - 1) * GAP;
        if ((cw - gaps) / sum <= target) { place(row, false); row = []; sum = 0; }
      });
      if (row.length) place(row, true);

      grid.classList.add("is-justified");
    }

    var raf;
    function schedule() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    }

    layout();
    window.addEventListener("load", layout);
    window.addEventListener("resize", schedule);
    // Re-flow as each (lazy) image reports its real dimensions.
    grid.querySelectorAll(".ph-photo img").forEach(function (img) {
      if (!img.complete) img.addEventListener("load", schedule, { once: true });
    });

    // ---- lightbox ----
    var box = document.querySelector("[data-lightbox]");
    if (!box) return;
    var boxImg = box.querySelector("[data-lightbox-img]");
    var boxCap = box.querySelector("[data-lightbox-cap]");
    var closeBtn = box.querySelector("[data-lightbox-close]");

    function open(src, cap) {
      boxImg.src = src;
      boxCap.textContent = cap || "";
      box.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.hidden = true;
      boxImg.src = "";
      document.body.style.overflow = "";
    }

    grid.querySelectorAll(".misc-photo img").forEach(function (img) {
      img.addEventListener("click", function () {
        open(img.dataset.full || img.src, img.dataset.caption);
      });
    });
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
  });
})();
