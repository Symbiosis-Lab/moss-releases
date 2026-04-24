# Unified Fullscreen Mode — Design Spec

## Context

moss has three separate systems for "content takes over viewport": lightbox (gallery modal), immersive mode (iframe fullscreen), and visual-page (CSS-only plate centering). These serve the same intent but share no code.

The image-as-page feature (for Blake's illuminated books, photo portfolios, etc.) reveals the simplest design: **an image page IS fullscreen.** Not "a page that can go fullscreen" — the page itself is the fullscreen view.

This spec unifies all three existing systems into one.

## Design

### Image pages (auto-generated from images without .md wrappers)

- **Background:** Black.
- **Content:** Image centered, fills available space, aspect ratio preserved.
- **Default state:** Just the image. Nothing else visible.
- **Click:** Toggles series nav at the bottom (prev/next arrows + collection link). If not in a series, click does nothing (or shows exit/back link).
- **Arrow keys / swipe:** Navigate prev/next in series.
- **No page chrome.** No header nav, no breadcrumb, no article title, no footer.

This is the entire design for image pages.

### Video and interactive HTML (existing content types)

Same container, same black background. Content determines controls:

- **Video:** Black page, video centered, native player controls. Exit button to return to article.
- **Interactive HTML (iframe):** Black page, iframe fills viewport. Exit button to return to article.

These content types start inline in an article and enter fullscreen via a button click (FLIP animation from inline position). Image pages don't need this — they start fullscreen.

### Unified behavior

| | Image page | Video fullscreen | Iframe fullscreen |
|---|---|---|---|
| Background | Black | Black | Black |
| Default state | Image only | Video + controls | Iframe only |
| Click | Toggle series nav | Pause/play (native) | N/A (iframe handles) |
| Navigation | Arrow keys (series) | N/A | N/A |
| Exit | Series nav → collection | Exit button → article | Exit button → article |
| Entry | Direct (page loads fullscreen) | FLIP from inline | FLIP from inline |

### What gets replaced

| Current system | Replaced by |
|---|---|
| `lightbox.js` + lightbox CSS | Unified fullscreen module (gallery images open same as image pages) |
| Immersive mode (theme.js) + immersive CSS | Unified fullscreen module (FLIP entry for inline content) |
| `body.visual-page` + visual-page CSS | Removed. Image pages render as fullscreen directly. |
| Series keyboard nav (theme.js) | Absorbed into fullscreen module. |

### Book index page

Uses the existing moss folder page layout. No changes needed:
- Cover plate on the left, title + description on the right
- Children rendered as a grid below (the visual table of plates)
- Site background color (`--moss-color-bg`)
- Clicking a plate navigates to its fullscreen image page

### Blake customization (theme CSS only)

- Warm paper site background (`#f5efe3`)
- Period typography (Caslon + Fell English)
- Journal drop caps and ornamental dividers
- Portrait cover aspect ratio (3:4)
- Pre-cropped plate images

## Scope

### Build
- Unified fullscreen JS module
- Unified fullscreen CSS
- Image page template (black background, image centered, click-to-toggle nav)
- Refactor video/iframe fullscreen to use unified module

### Drop
- ~~Per-plate dominant color CSS variable~~ — unnecessary
- ~~Visual-page "lobby" state~~ — image pages are fullscreen, period
- ~~Fullscreen button on image pages~~ — already fullscreen
- ~~FLIP animation for image pages~~ — no inline state to animate from
- ~~Image auto-cropping~~ — user pre-crops
- ~~Configurable cover aspect ratio~~ — user CSS

## Verification

1. **Blake site:** Navigate to a plate — black page, image centered, click shows nav, arrows page through series.
2. **Existing tests:** `cargo test --lib` (2574+ tests) — no regressions.
3. **Gallery media:** Gallery images open in unified fullscreen with prev/next.
4. **Embedded iframe:** Iframe fullscreen uses new unified module.
5. **Playwright:** Screenshot plate page, verify black background and centered image.
