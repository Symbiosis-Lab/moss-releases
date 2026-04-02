/**
 * Sunlight Mode — "kindle under sunlight" ambient reading experience.
 *
 * Activation:
 *   - Long-press the theme toggle button (hold ≥500ms)
 *   - Keyboard: press [S] to toggle sunlight mode on/off
 *   - Time-of-day: auto-activates between 11am–4pm local time if no
 *     explicit theme was set this session
 *
 * Deactivation:
 *   - Long-press the theme toggle again
 *   - Press [S] again (returns to light mode)
 *   - Short-click the light/dark theme toggle (normal toggle still works)
 *
 * How it works:
 *   Sets data-theme="sunlight" on <html>. All visual changes are handled by
 *   CSS selectors in style.css targeting [data-theme="sunlight"]. This script
 *   only manages activation state and video playback.
 *
 * Layer stack (when active):
 *   z-999: #sunlight-leaves — looping MP4 video, mix-blend-mode: multiply
 *   z-998: #sunlight-wash   — warm rgba overlay, mix-blend-mode: multiply
 *   body:  paper grain texture via background-image
 *   :root: warmer CSS custom property values
 */

(function () {
  "use strict";
  // ── Create overlay DOM elements ──
  // These elements exist in the DOM always but are invisible (opacity: 0)
  // until [data-theme="sunlight"] activates them via CSS.

  var video = document.createElement("video");
  video.id = "sunlight-leaves";
  video.src = "/leaves.mp4";
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = "none";
  document.body.appendChild(video);

  var wash = document.createElement("div");
  wash.id = "sunlight-wash";
  document.body.appendChild(wash);

  // ── State helpers ──

  function enterSunlight() {
    document.documentElement.setAttribute("data-theme", "sunlight");
    sessionStorage.setItem("theme", "sunlight");
    video.play().catch(function () {
      // Autoplay may be blocked; CSS still applies the visual changes
    });
  }

  function exitSunlight() {
    video.pause();
    video.currentTime = 0;
  }

  function isSunlight() {
    return document.documentElement.getAttribute("data-theme") === "sunlight";
  }

  // ── Keyboard shortcut: [S] to toggle ──

  document.addEventListener("keydown", function (e) {
    // Don't activate when typing in form fields or contenteditable
    var tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) {
      return;
    }
    if (e.key === "s" || e.key === "S") {
      toggleSunlight();
    }
  });

  // ── React to moss theme toggle (light/dark button click) ──
  // When the user clicks the nav theme toggle, moss dispatches
  // moss-theme-change. If we were in sunlight mode, clean up.

  document.documentElement.addEventListener("moss-theme-change", function (e) {
    if (e.detail && e.detail.previous === "sunlight") {
      exitSunlight();
    }
  });

  // ── Long-press theme toggle: hold for sunlight mode ──
  // Short click = normal light/dark toggle (handled by onclick="toggleTheme()")
  // Long press (≥500ms) = enter/exit sunlight mode

  function toggleSunlight() {
    if (isSunlight()) {
      document.documentElement.setAttribute("data-theme", "light");
      sessionStorage.setItem("theme", "light");
      exitSunlight();
    } else {
      enterSunlight();
    }
  }

  var LONG_PRESS_MS = 500;
  var MOVE_TOLERANCE = 10; // px — cancel if pointer drifts beyond this
  var longPressTimer = null;
  var didLongPress = false;
  var startX = 0;
  var startY = 0;

  var themeBtn = document.querySelector(".nav-theme-btn");
  if (themeBtn) {
    // Pointer Events unify mouse, touch, and pen into one set of listeners.
    themeBtn.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return; // left-click/primary touch only
      didLongPress = false;
      startX = e.clientX;
      startY = e.clientY;
      longPressTimer = setTimeout(function () {
        didLongPress = true;
        toggleSunlight();
      }, LONG_PRESS_MS);
    });

    themeBtn.addEventListener("pointermove", function (e) {
      if (!longPressTimer) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (dx * dx + dy * dy > MOVE_TOLERANCE * MOVE_TOLERANCE) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    themeBtn.addEventListener("pointerup", function () {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    });

    themeBtn.addEventListener("pointercancel", function () {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    });

    themeBtn.addEventListener("pointerleave", function () {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    });

    // Suppress the normal onclick toggle if long press was detected.
    // useCapture: true fires before the onclick attribute handler.
    themeBtn.addEventListener("click", function (e) {
      if (didLongPress) {
        e.preventDefault();
        e.stopImmediatePropagation();
        didLongPress = false;
      }
    }, true);

    // Prevent browser context menu during long-press on touch devices
    themeBtn.addEventListener("contextmenu", function (e) {
      if (longPressTimer || didLongPress) {
        e.preventDefault();
      }
    });
  }

  // ── Time-of-day auto-activation ──
  // Only activate if all three conditions are met:
  //   1. No theme explicitly set this session (sessionStorage empty)
  //   2. Current hour is between 11am and 4pm local time
  //   3. System color scheme preference is light

  function checkTimeOfDay() {
    var saved = sessionStorage.getItem("theme");
    if (saved) return; // User already made a choice this session

    var hour = new Date().getHours();
    if (hour < 11 || hour >= 16) return; // Outside sunlight hours

    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) return; // Respect system dark mode users

    enterSunlight();
  }

  // ── Initialization ──
  // Restore sunlight mode if it was saved, otherwise check time of day.

  var savedTheme = sessionStorage.getItem("theme");
  if (savedTheme === "sunlight") {
    enterSunlight();
  } else {
    checkTimeOfDay();
  }
})();
