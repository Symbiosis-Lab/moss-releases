# Wireframe Docs Animation Pipeline

How moss makes its canonical docs animations (e.g. `folder-to-site.html`,
`publish-fanout.html`). Pure inline SVG + CSS, no JS, no SMIL, no external assets.
Each animation states one moss truth in ~5.5s, holds, then loops.

## 1. Storyboard-as-text

Write the shot as prose before any markup: name the beats, their timing, and the
single sentence the animation must land. Keep this storyboard in the file's top
HTML comment (see `folder-to-site.html` lines 7-13) so the keyframe percentages stay
legible against real milliseconds.

The storyboard doubles as a **design harness**: forcing the product into a 5-beat
text shot surfaces UX seams. ("Where does the suffix go when `about.md` becomes a
nav link?" "Does the URL pill imply a `published` state we can't honestly show?")
Resolve those seams in the storyboard first — they are real product questions, not
animation details.

## 2. Author: pure SVG + CSS, tokens, reduced-motion still, trilingual caption

- **Tokens.** Mirror moss design tokens into `:root` from `docs/design/css.md` and
  redeclare them under `@media (prefers-color-scheme: dark)`. Use `--moss-*` names
  (or short aliases mapped 1:1) and reference them via `fill="var(--moss-color-...)"`.
  Never hard-code a hex inside an element.
- **Responsive.** One `<svg viewBox=...>` that scales; no fixed-pixel overflow. It
  must read at 375px (mobile) and 720px (desktop). Give the SVG a `role="img"` and a
  full sentence `aria-label`.
- **No JS / no SMIL.** Motion is CSS `@keyframes` only, keyed to one shared loop
  duration. Stagger via `animation-delay`, not extra timelines.
- **Reduced-motion still.** A `@media (prefers-reduced-motion: reduce)` block MUST
  pin every animated element to its meaningful **end frame** (`animation: none`,
  then set the final opacity/width/transform). The still alone must convey the point.
- **Swappable trilingual captions.** One `<text>` caption holds the default
  (繁體 zh-Hant). Leave the zh-Hans (简体) and en strings in an adjacent comment so a
  localized build is a one-line child swap. Keep CJK fonts in the stack
  (`"PingFang TC", "PingFang SC", "Noto Sans CJK TC"`).

## 3. Render-validate (Playwright)

Open the HTML in Playwright and screenshot the matrix — **a real render is the only
proof**; jsdom/string CSS checks are blind to layout, stacking, and computed width.

- light × dark (`prefers-color-scheme`)
- mobile (375px) × desktop (720px) viewports
- reduced-motion on/off (`prefers-reduced-motion: reduce`)

Then run an **adversarial visual pass**: does any frame imply a state moss can't
honestly show? Does text clip at 375px? Does the still frame still make the point?
Does dark mode keep contrast? Fix in the storyboard/SVG, never with a post-hoc hack.

## 4. Ship

- **Inline** the HTML into the docs page (the EMBED snippet below). Inlining keeps it
  token-themed, reduced-motion-aware, and zero-request.
- **Optional frame export** for non-CSS contexts: drive the loop in Playwright,
  capture frames, and encode to **APNG** (lossless, alpha) or **MP4** (e.g. a Matters
  launch post, social cards, slides). The CSS source stays canonical; exports are
  derived artifacts.

## EMBED snippet

Paste into a moss docs markdown page (inline-HTML is passed through). Swap the
`src` to the desired animation; the title localizes per docs locale.

```html
<figure class="moss-anim" role="group" aria-label="folder to site">
  <iframe src="/assets/animations/folder-to-site.html"
          title="Your folder is your website"
          loading="lazy" scrolling="no"
          style="width:100%;max-width:720px;aspect-ratio:8/5;border:0;display:block;margin:0 auto;"></iframe>
  <figcaption class="moss-anim-caption">你的資料夾就是你的網站</figcaption>
</figure>
```

To inline without an iframe, paste the animation's `<style>` + `<svg>` directly into
the page instead (drops the extra request; ensure the token names don't collide).

## Human-only steps

- **Real screencasts.** When the truth needs the actual app (real editor, real drag,
  real preview), record a screencast — the SVG wireframe is a diagram, not a demo.
- **Final taste.** Easing feel, hold length, the rapid-loop "flicker feel" test, and
  the final caption wording are judged by a human on a real screen. Automation gates
  correctness; it does not sign off on taste.
