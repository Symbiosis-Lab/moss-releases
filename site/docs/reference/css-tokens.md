---
title: CSS tokens
uid: 5a6a0afc
weight: 41
translationKey: docs-reference-css-tokens
description: Every --moss-* CSS custom property, grouped by category. Run moss describe --json for the live values of your installed moss.
---

These are the CSS custom properties moss defines. Override any of them in `.moss/theme/style.css`. No `!important` needed.

### Typography

<!-- auto:start:tokens-typography -->
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
<!-- auto:end -->

The full size scale runs `--moss-size-{2xs,xs,sm,md,lg,xl,2xl,3xl}`.

### Colors

<!-- auto:start:tokens-color -->
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
<!-- auto:end -->

### Layout

<!-- auto:start:tokens-layout -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-content-width` | `67ch` | Maximum content width |
| `--moss-content-width-sidebar` | `62ch` | Content width when sidebar is active |
| `--moss-nav-width` | `var(--moss-content-width)` | Navigation and footer max-width |
| `--moss-sidebar-width` | `280px` | Sidebar width |
| `--moss-site-max-width` | `1200px` | Maximum overall site width |
| `--moss-container-padding` | `clamp(1rem, 5vw, 2rem)` | Container side padding |
<!-- auto:end -->

### Spacing

<!-- auto:start:tokens-spacing -->
| Variable | Default | Description |
|----------|---------|-------------|
| `--moss-space-xs` | `0.5rem` | Extra small (8px) |
| `--moss-space-sm` | `1rem` | Small (16px) |
| `--moss-space-md` | `1.5rem` | Medium (24px) |
| `--moss-space-lg` | `2rem` | Large (32px) |
| `--moss-space-xl` | `3rem` | Extra large (48px) |
| `--moss-space-2xl` | `4rem` | Double extra large (64px) |
<!-- auto:end -->

Run `moss describe --json` for the live token list of your installed moss.
