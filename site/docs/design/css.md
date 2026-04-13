---
title: CSS
uid: b52e2d9d
weight: 2
description: CSS variables, dark mode, and component class names.
translationKey: docs-design-css
---

## Custom stylesheet

Create `style.css` in your project root. moss loads it after the default theme, so your rules override the defaults.

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
}
```

No build step, no config entry. The file is loaded automatically.

## Variables

### Typography

<!-- auto:start:css-typography -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-font-body` | system sans-serif stack | Body text font |
| `--moss-font-heading` | inherits body | Heading font |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | Code font |
| `--moss-font-serif` | Iowan Old Style, serif stack | Serif font (used with font toggle) |
| `--moss-font-size-base` | `1.125rem` | Base font size |
| `--moss-font-weight` | `320` | Default font weight |
<!-- auto:end:css-typography -->

### Colors

<!-- auto:start:css-colors -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-color-accent` | `#2d5a2d` | Links, highlights, accent elements |
| `--moss-color-bg` | `#faf8f5` | Page background |
| `--moss-color-text` | `#2c2825` | Primary text |
| `--moss-color-muted` | `#8a8580` | Secondary/muted text |
| `--moss-color-surface` | `#f4f1ec` | Card and surface background |
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

Dark mode follows the system preference automatically. Target the dark mode selector to customize:

```css
[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

## Component classes

Auto-generated components use stable `.moss-*` class names. Target these in your `style.css`.

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
| `.moss-year-group` | Year section heading |
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
