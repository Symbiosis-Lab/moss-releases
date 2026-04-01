/**
 * Sunlight Mode — "kindle under sunlight" ambient reading experience.
 *
 * Activation:
 *   - Keyboard: press [S] to toggle sunlight mode on/off
 *   - Time-of-day: auto-activates between 11am–4pm local time if no
 *     explicit theme was set this session
 *
 * Deactivation:
 *   - Press [S] again (returns to light mode)
 *   - Click the light/dark theme toggle in nav (fires moss-theme-change event)
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
      if (isSunlight()) {
        document.documentElement.setAttribute("data-theme", "light");
        sessionStorage.setItem("theme", "light");
        exitSunlight();
      } else {
        enterSunlight();
      }
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
