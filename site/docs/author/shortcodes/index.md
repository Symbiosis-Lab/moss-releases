---
title: Shortcodes
uid: a3f9c12e
weight: 3
description: Layout blocks and components that extend markdown.
translationKey: docs-author-shortcodes-index
---

Shortcodes are special blocks in your markdown that create layouts and components beyond what standard markdown offers — grids, galleries, hero images, and more. They use `:::` block syntax. ^def-shortcode

```markdown
:::grid 2
Column one content.
+++
Column two content.
:::
```

## Arity rule for nesting

When one shortcode lives inside another, the inner fence uses more colons than the outer. A `:::grid` (3 colons) contains `::::buttons` (4 colons); a `::::buttons` could contain `:::::callout` (5 colons), and so on. The bare close of each fence must match its opener exactly.

```markdown
:::grid 2 2:3 {.hero-split}
# Pitch deck

::::buttons {.inverted}
[Download PDF](https://example.com/deck.pdf)
[Request intro](mailto:hi@example.com)
::::
---
Contact info
:::
```

Existing pages that never nested fences continue to work unchanged.

## Shortcodes

| Shortcode | Description |
|-----------|-------------|
| [[grid]] | Multi-column layout with optional ratio and CSS classes |
| [[hero]] | Full-width hero section with background image and overlay text |
| [[gallery]] | Image grid for photo galleries |
| [[buttons]] | Styled row of buttons from markdown links |
| [[fenced-divs]] | Named-class fenced divs for styled regions |
