/**
 * moss — Hover Link Preview
 *
 * Shows a tooltip popup when the reader hovers (or Tab-focuses) an internal
 * link.  Data is lazy-fetched from /_previews.json on first interaction.
 *
 * WCAG 2.2 SC 1.4.13: keyboard-triggerable (focusin), dismissible (Escape),
 * hoverable (grace period), screen-reader accessible (role=tooltip, aria).
 */
(function () {
  "use strict";

  // ── Guards ──────────────────────────────────────────────────
  if (window.__moss_no_preview) return;
  if ("ontouchstart" in window && navigator.maxTouchPoints > 0) return;

  // ── State ───────────────────────────────────────────────────
  var data = null;
  var popup = null;
  var currentLink = null;
  var showTimer = null;
  var hideTimer = null;
  var idCounter = 0;

  // ── Helpers ─────────────────────────────────────────────────

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function isExternal(href) {
    try { return new URL(href, location.origin).origin !== location.origin; }
    catch (e) { return true; }
  }

  function isSkippable(link) {
    // Only show preview for wikilink-generated links
    if (!link.classList.contains("wikilink")) return true;
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") return true;
    if (isExternal(link.href)) return true;
    try {
      if (new URL(link.href).pathname === location.pathname) return true;
    } catch (e) { /* ignore */ }
    return false;
  }

  // ── Data ────────────────────────────────────────────────────

  function ensureData(cb) {
    if (data) return cb();
    fetch("/_previews.json")
      .then(function (r) { return r.json(); })
      .then(function (d) { data = d; cb(); })
      .catch(function () { /* silent — previews are optional */ });
  }

  // ── Popup ───────────────────────────────────────────────────

  function createPopup() {
    if (popup) return;
    popup = document.createElement("div");
    popup.className = "moss-preview-popup";
    popup.setAttribute("role", "tooltip");
    popup.setAttribute("aria-live", "polite");
    popup.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    popup.addEventListener("mouseleave", function () { scheduleHide(); });
    popup.addEventListener("click", function () {
      if (currentLink) window.location = currentLink.href;
    });
    document.body.appendChild(popup);
  }

  function showPopup(link) {
    ensureData(function () {
      var path = new URL(link.href).pathname;
      // Normalize: ensure trailing slash
      if (path.charAt(path.length - 1) !== "/" && path.indexOf(".") === -1) {
        path = path + "/";
      }
      var entry = data[path];
      if (!entry) return;

      createPopup();
      clearTimeout(hideTimer);
      currentLink = link;

      // Populate
      var html = '<strong class="moss-preview-title">' + esc(entry.title) + "</strong>";
      if (entry.description) {
        html += '<p class="moss-preview-desc">' + esc(entry.description) + "</p>";
      }
      if (entry.preview) {
        html += '<p class="moss-preview-text">' + esc(entry.preview) + "</p>";
      }
      popup.innerHTML = html;

      // Accessibility
      var id = "moss-preview-" + (++idCounter);
      popup.id = id;
      link.setAttribute("aria-describedby", id);

      // Position below link, flip above if near viewport bottom
      var rect = link.getBoundingClientRect();
      popup.style.left = Math.max(8, rect.left) + "px";
      popup.style.top = (rect.bottom + 8 + window.scrollY) + "px";
      popup.classList.add("visible");

      // Flip check after layout
      requestAnimationFrame(function () {
        var pr = popup.getBoundingClientRect();
        if (pr.bottom > window.innerHeight) {
          popup.style.top = (rect.top - pr.height - 8 + window.scrollY) + "px";
        }
        // Clamp right edge
        if (pr.right > window.innerWidth - 8) {
          popup.style.left = Math.max(8, window.innerWidth - pr.width - 8) + "px";
        }
      });
    });
  }

  function hidePopup() {
    if (!popup) return;
    popup.classList.remove("visible");
    if (currentLink) {
      currentLink.removeAttribute("aria-describedby");
      currentLink = null;
    }
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePopup, 150);
  }

  // ── Events ──────────────────────────────────────────────────

  document.addEventListener("mouseover", function (e) {
    var link = e.target.closest ? e.target.closest("a[href]") : null;
    if (!link || isSkippable(link)) return;
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    showTimer = setTimeout(function () { showPopup(link); }, 200);
  }, true);

  document.addEventListener("mouseout", function (e) {
    var link = e.target.closest ? e.target.closest("a[href]") : null;
    if (!link) return;
    clearTimeout(showTimer);
    scheduleHide();
  }, true);

  document.addEventListener("focusin", function (e) {
    var link = e.target.closest ? e.target.closest("a[href]") : null;
    if (!link || isSkippable(link)) return;
    clearTimeout(hideTimer);
    showPopup(link);
  });

  document.addEventListener("focusout", function (e) {
    var link = e.target.closest ? e.target.closest("a[href]") : null;
    if (!link) return;
    scheduleHide();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup && popup.classList.contains("visible")) {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      hidePopup();
    }
  });
})();
