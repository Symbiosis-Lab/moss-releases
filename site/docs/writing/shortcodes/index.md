---
title: Shortcodes
uid: a3f9c12e
weight: 6
description: Layout blocks and components that extend markdown.
translationKey: docs-author-shortcodes-index
---

Shortcodes are special blocks in your markdown that create layouts and components beyond what standard markdown offers: grids, galleries, hero images, and more. They use `:::` block syntax. ^def-shortcode

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

Nesting two fences at the same colon count emits a build warning and renders as literal text. Always give the inner fence more colons than the outer.

## Cell dividers

Inside `:::grid` and `:::buttons`, cells are separated by a line containing only `+++`. A block with no `+++` is a single cell.

`---` is the standard markdown thematic break, a horizontal rule. It is never a moss cell control character. Use `+++` to split cells.

## Configuration

Pass options in the attribute block, not the body. For example, `:::subscribe {placeholder="..." button="..."}` or `:::grid {cols=2}` (the positional form `:::grid 2` works too). Descriptive prose belongs above or below the block, never inside the option line.

## Shortcodes

| Shortcode | Description |
|-----------|-------------|
| [[grid]] | Multi-column layout with optional ratio and CSS classes |
| [[hero]] | Full-width hero section with background image and overlay text |
| [[gallery]] | Image grid for photo galleries |
| [[buttons]] | Styled row of buttons from markdown links |
| [[fenced-divs]] | Named-class fenced divs for styled regions |
