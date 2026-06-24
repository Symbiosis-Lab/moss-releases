---
title: Component classes
weight: 42
translationKey: docs-reference-components
description: The stable .moss-* class names emitted by moss's auto-generated components. Target these in .moss/theme/style.css.
---

These are the class names moss emits on auto-generated components. Target them directly in `.moss/theme/style.css`.

<!-- auto:start:components -->
### Collection grid

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
<!-- auto:end -->
