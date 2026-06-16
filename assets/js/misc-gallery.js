/* Travel photos: lightbox. Loaded only on /misc/photos/. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var grid = document.querySelector("[data-photo-grid]");
    if (!grid) return;

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
