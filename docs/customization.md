---
title: Customization
uid: 4795f0c4
weight: 3
description: Change colors, fonts, and layout with CSS variables.
translationKey: customization
---

## Custom CSS

Create `style.css` in your project root. moss loads it after the default theme, so any variables or rules you set will override the defaults.

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
  --moss-font-size-base: 1.125rem;
}
```

That file is the only thing you need — no build step, no config entry.

## All CSS Variables

### Typography

| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-font-body` | system sans-serif stack | Body text font |
| `--moss-font-heading` | inherits body | Heading font |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | Code font |
| `--moss-font-serif` | Iowan Old Style, serif stack | Serif font (used with font toggle) |
| `--moss-font-size-base` | 1.125rem | Base font size |
| `--moss-font-weight` | 320 | Default font weight |

### Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-color-accent` | #2d5a2d | Accent color (links, highlights) |
| `--moss-color-bg` | #faf8f5 | Page background |
| `--moss-color-text` | #2c2825 | Primary text color |
| `--moss-color-muted` | #8a8580 | Secondary/muted text |
| `--moss-color-surface` | #f4f1ec | Card/surface background |

### Layout

| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-content-width` | 67ch | Maximum content width |
| `--moss-content-width-sidebar` | 62ch | Content width with sidebar |
| `--moss-nav-width` | var(--moss-content-width) | Navigation and footer max-width |
| `--moss-sidebar-width` | 280px | Sidebar width |
| `--moss-site-max-width` | 1200px | Maximum site width |
| `--moss-container-padding` | clamp(1rem, 5vw, 2rem) | Container side padding |

### Spacing

| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-space-xs` | 0.5rem | Extra small spacing (8px) |
| `--moss-space-sm` | 1rem | Small spacing (16px) |
| `--moss-space-md` | 1.5rem | Medium spacing (24px) |
| `--moss-space-lg` | 2rem | Large spacing (32px) |
| `--moss-space-xl` | 3rem | Extra large spacing (48px) |
| `--moss-space-2xl` | 4rem | Double extra large spacing (64px) |

## Children Styles

Setting `children_style: card` in a page's frontmatter renders its child pages as a card grid with cover images.

```yaml
---
title: Projects
children_style: card
---
```

Child pages can include a `cover` field pointing to an image in the project folder:

```yaml
---
title: My Project
cover: images/project-screenshot.png
date: 2024-06-01
---
```

## Cross-References

`also_in` makes an article appear in multiple sections' child lists without duplicating the file. The page lives in one folder but shows up wherever you list it.

```yaml
---
title: Building a Garden Trellis
also_in:
  - projects
  - featured
---
```

## Dark Mode

Dark mode is automatic and follows the system preference. All CSS variables apply in both modes. Dark mode overrides live under the `[data-theme="dark"]` selector, which you can target in `style.css` to customize further:

```css
[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

## Cascade

`cascade` pushes frontmatter values down to all descendants of a page. This is useful for applying a consistent layout or disabling navigation across an entire section without setting it on every file.

```yaml
---
title: Documentation
cascade:
  breadcrumb: true
  nav: false
---
```

All pages nested under this one will inherit `breadcrumb: true` and `nav: false` unless they override the value in their own frontmatter.

## Component Classes

Auto-generated components use stable `moss-*` class names that you can target in `style.css`. For shortcode components (like `:::grid`), use the `{.class}` syntax to add your own class handle instead.

### Collection Grid

| Class | Element |
|-------|---------|
| `.moss-collection-grid` | Grid container |
| `.moss-collection-card` | Individual card |
| `.moss-collection-card-cover` | Cover image wrapper |
| `.moss-collection-card-content` | Content section below cover |
| `.moss-collection-card-title` | Card title |
| `.moss-collection-card-count` | Article count / subtitle |

### Child Summary

| Class | Element |
|-------|---------|
| `.moss-child-summary` | Summary card |
| `.moss-child-summary-row` | Flex row (body + cover) |
| `.moss-child-summary-body` | Text content area |
| `.moss-child-summary-meta` | Date or count |
| `.moss-child-summary-title` | Title |
| `.moss-child-summary-description` | Description excerpt |
| `.moss-child-summary-cover` | Side cover image |

### Article List

| Class | Element |
|-------|---------|
| `.moss-article-listing` | Listing container |
| `.moss-article-item` | Individual list item |
| `.moss-prefix-link` | Link with prefix (date/count) |
| `.moss-year-group` | Year section heading |
