---
title: CSS
uid: b52e2d9d
weight: 2
description: CSS variables, dark mode, and component class names.
translationKey: docs-design-css
---

## Custom stylesheet

Create `style.css` inside `.moss/theme/` in your project folder (moss creates `.moss/theme/` automatically when you open the folder). moss loads it after the default theme, so your rules override the defaults.

```
my-site/
├── .moss/
│   └── theme/
│       └── style.css   ← your custom CSS goes here
├── index.md
└── ...
```

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
}
```

No build step, no config entry. The file is loaded automatically.

Your rules always win — you never need `!important` and you should not write your own `@layer`. moss loads your `style.css` into the last CSS layer (`@layer themes`), so it wins by layer order over all of moss's built-in styles.

Put every rule in `.moss/theme/style.css`. moss does not honor inline `style="..."` in markdown, because inline styles cannot be themed, overridden, or reused.

> [!note] Self-hosted fonts
> Drop `.woff2` files in `.moss/theme/fonts/` and reference them from your `style.css` with `@font-face { src: url('fonts/myfont.woff2') }`. The `.moss/theme/` directory is served as a sibling of the site root.

### How `.moss/theme/` is served

moss mirrors `.moss/theme/` verbatim to `/_moss/theme/` in the built site, so `style.css` is served at `/_moss/theme/style.css`. Sibling assets resolve relatively: `url("grain.png")` in your stylesheet finds `.moss/theme/grain.png`. For theme JS, moss sets `window.mossTheme.base` (the `/_moss/theme/` URL) before your `script.js` runs, so resolve assets against it with `new URL("asset.woff2", mossTheme.base)`.

## Variables

Every `--moss-*` CSS custom property is discoverable. Run `moss describe --json` to see all tokens with their light and dark values. The human-readable reference is at [docs/contract/reference.md](/contract/reference/).

The tables below cover the most commonly customized tokens.

### Typography

<!-- auto:start:css-typography -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-font-body` | system sans-serif stack | Body text font family |
| `--moss-font-heading` | inherits body | Heading font family |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | Code font family |
| `--moss-font-weight-body` | `320` | Body text weight |
| `--moss-font-heading-weight` | `500` | Heading weight |
| `--moss-size-sm` | `0.875rem` | Small text size |
| `--moss-size-md` | `1rem` | Base text size |
| `--moss-size-lg` | `1.125rem` | Large text size |
| `--moss-size-xl` | `1.25rem` | Extra large text size |
| `--moss-size-2xl` | `1.5rem` | 2× extra large text size |
| `--moss-size-3xl` | `2rem` | 3× extra large text size |
| `--moss-reading-size` | `1.125rem` | Article body reading size |
<!-- auto:end:css-typography -->

The full size scale runs `--moss-size-{2xs,xs,sm,md,lg,xl,2xl,3xl}`. Run `moss describe --json` for the complete list.

### Colors

<!-- auto:start:css-colors -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-color-accent` | `#2d5a2d` | Links, highlights, content accent |
| `--moss-color-bg` | `#faf8f5` | Page background |
| `--moss-color-text` | `#2c2825` | Primary text |
| `--moss-color-text-secondary` | `#6b6560` | Secondary / muted text |
| `--moss-color-muted` | `#8a8580` | Placeholder and subtle text |
| `--moss-color-surface` | `#f4f1ec` | Card and surface background |
| `--moss-color-ui-accent` | `var(--moss-color-accent)` | Nav links, buttons, site controls |
| `--moss-color-accent-hover` | (darker accent) | Accent color on hover |
| `--moss-color-accent-quiet` | (translucent accent) | Subtle accent tint |
| `--moss-border-light` | `#e8e4de` | Light divider and border color |
| `--moss-border-medium` | `#d4cfc8` | Medium border color |
<!-- auto:end:css-colors -->

### Layout

<!-- auto:start:css-layout -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-content-width` | `67ch` | Maximum content width |
| `--moss-content-width-sidebar` | `62ch` | Content width when sidebar is active |
| `--moss-nav-width` | `var(--moss-content-width)` | Navigation and footer max-width |
| `--moss-sidebar-width` | `280px` | Sidebar width |
| `--moss-site-max-width` | `1200px` | Maximum overall site width |
| `--moss-container-padding` | `clamp(1rem, 5vw, 2rem)` | Container side padding |
<!-- auto:end:css-layout -->

### Spacing

<!-- auto:start:css-spacing -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-space-xs` | `0.5rem` | Extra small (8px) |
| `--moss-space-sm` | `1rem` | Small (16px) |
| `--moss-space-md` | `1.5rem` | Medium (24px) |
| `--moss-space-lg` | `2rem` | Large (32px) |
| `--moss-space-xl` | `3rem` | Extra large (48px) |
| `--moss-space-2xl` | `4rem` | Double extra large (64px) |
<!-- auto:end:css-spacing -->

## Dark mode

moss sets `data-theme` on `<html>` before first paint — reading `localStorage["moss-theme"]` and falling back to the OS `prefers-color-scheme`. This means one block covers both the toggle and the system preference. You do not need `@media (prefers-color-scheme: dark)`.

```css
:root[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

That single block applies whenever dark mode is active, regardless of whether the visitor toggled it or their OS chose it.

## Quiet chrome

`--moss-color-ui-accent` (defaults to `var(--moss-color-accent)`) controls the nav links, buttons, and site controls. Set it to a neutral to make the chrome recede while content links keep the accent:

```css
:root {
  --moss-color-ui-accent: var(--moss-color-text);
}
```

## Component classes

Auto-generated components use stable `.moss-*` class names. These are the class names moss emits, so target them directly in your `style.css`. Do not invent parallel names (`.my-grid`) for structure moss already labels (`.moss-grid`): inventing parallels throws away the styling moss would do for you.

### Collection grid

<!-- auto:start:component-classes -->
| Class | Element |
|-------|---------|
| `.moss-collection-grid` | Grid container |
| `.moss-collection-card` | Individual card |
| `.moss-collection-card-cover` | Cover image wrapper |
| `.moss-collection-card-content` | Content section below cover |
| `.moss-collection-card-title` | Card title |
| `.moss-collection-card-count` | Article count / subtitle |

### Child summary

| Class | Element |
|-------|---------|
| `.moss-child-summary` | Summary card |
| `.moss-child-summary-row` | Flex row (body + cover) |
| `.moss-child-summary-body` | Text content area |
| `.moss-child-summary-meta` | Date or count |
| `.moss-child-summary-title` | Title |
| `.moss-child-summary-description` | Description excerpt |
| `.moss-child-summary-cover` | Side cover image |

### Article list

| Class | Element |
|-------|---------|
| `.moss-article-listing` | Listing container |
| `.moss-article-item` | Individual list item |
| `.moss-prefix-link` | Link with prefix (date/count) |
| `.moss-prefix-link-prefix` | Prefix portion (date/count label) |
| `.moss-prefix-link-title` | Title portion |
| `.moss-prefix-link-suffix` | Suffix portion (optional trailing label) |
| `.moss-year-group` | Year section heading |
| `.moss-year-group--summary` | Year group in summary style |
| `.moss-child-section-divider` | Divider between child sections |

### Grid shortcode

| Class | Element |
|-------|---------|
| `.moss-grid` | Grid container (`:::grid N`) |
| `.moss-grid-card` | Individual grid cell |
| `.moss-grid-card.friend-card` | Grid cell wrapping an external link (auto-fetches metadata) |
| `.moss-grid-card.link-card` | Grid cell wrapping an internal article link |

### Collection cover

| Class | Element |
|-------|---------|
| `.moss-collection-cover` | Full-width cover section at top of folder page |
| `.moss-collection-cover-row` | Flex row inside cover |
| `.moss-collection-cover-body` | Text content area of cover |
| `.moss-cover-label` | Label text inside a collection cover |

### Hero shortcode

| Class | Element |
|-------|---------|
| `.moss-hero` | Hero container (`:::hero`) |
| `.moss-hero-content` | Overlay text region inside hero |

### Buttons shortcode

| Class | Element |
|-------|---------|
| `.moss-buttons` | Button row container (`::::buttons`) |
| `.moss-buttons.inverted` | Light-on-dark button row variant |
| `.moss-btn` | Individual button |
| `.moss-btn-primary` | First (primary) button |
| `.moss-btn-secondary` | Subsequent (secondary) buttons |

### Gallery shortcode

| Class | Element |
|-------|---------|
| `.moss-gallery` | Gallery container (`:::gallery`) |
| `.moss-gallery-item` | Individual gallery image |

### Callouts

| Class | Element |
|-------|---------|
| `.callout` | Shared callout wrapper |
| `.callout-<type>` | Type-specific modifier (e.g. `.callout-note`, `.callout-warning`, `.callout-pending`) |
| `.callout-title` | Callout title row |
| `.callout-content` | Callout body content |

### Folder items (auto-generated section lists)

| Class | Element |
|-------|---------|
| `.moss-folder-item` | Row in a folder listing |
| `.moss-folder-link` | Link within a folder item |
| `.moss-folder-title` | Title within a folder item |
| `.moss-folder-description` | Description within a folder item |

### Series navigation

| Class | Element |
|-------|---------|
| `.moss-series-nav` | Series navigation block |
| `.moss-series-nav-links` | Prev/next link container |
| `.moss-series-nav-link` | Individual prev or next link |
| `.moss-series-nav-prev` | Previous article link |
| `.moss-series-nav-next` | Next article link |
| `.moss-series-nav-arrow` | Arrow glyph inside a series link |
| `.moss-series-nav-title` | Article title inside a series link |
| `.moss-series-nav-collection-row` | Row showing which collection this belongs to |
| `.moss-series-nav-collection` | Collection name/link in series nav |

### Miscellaneous

| Class | Element |
|-------|---------|
| `.moss-colophon` | Colophon / footer annotation block |
| `.moss-summary-layout` | Summary layout wrapper |
<!-- auto:end:component-classes -->

## Shortcode classes

Add custom classes to shortcode blocks with `{.class}` syntax:

```markdown
:::grid 3 {.profiles .featured}
...
:::
```

Then target them in CSS:

```css
.profiles .moss-grid-card {
  border-radius: 50%;
}
```

### Layout in the class, not inline

For responsive column ratios, define `grid-template-columns` on your class and omit the ratio on the shortcode: `:::grid 2 {.two-col-split}` instead of `:::grid 2 2:1 {.two-col-split}`. Passing a ratio emits an inline `style=""` on the container, which beats `@media` rules and forces `!important` overrides.

```css
.two-col-split {
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .two-col-split { grid-template-columns: 1fr; }
}
```

See [[shortcodes#Custom layouts with CSS classes]] for the full pattern.
