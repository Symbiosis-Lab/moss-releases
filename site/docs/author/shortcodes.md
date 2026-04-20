---
title: Shortcodes
uid: f309a21a
weight: 3
description: Layout blocks and components that extend markdown.
translationKey: docs-author-shortcodes
---

## What are shortcodes

Shortcodes are special blocks in your markdown that create layouts and components beyond what standard markdown offers — grids, galleries, hero images, and more. They use `:::` block syntax. ^def-shortcode

```markdown
:::grid 2
Column one content.
---
Column two content.
:::
```

## Hero

A full-width hero section with a background image or video and optional overlay text.

```markdown
:::hero
![[panorama.jpg]]
# Welcome to my site
A personal corner of the web.
:::
```

The first line inside the block is the media reference (wikilink, markdown image, or bare filename). Everything after it becomes overlay content.

Use pipe syntax for display control:

```markdown
:::hero
![[mountains.jpg|contain top]]
:::
```

## Grid

A multi-column layout. Specify the number of columns and optionally a ratio.

```markdown
:::grid 3
First column.
---
Second column.
---
Third column.
:::
```

Cells are separated by `---`. The number after `grid` sets the column count.

**With ratio control:**

```markdown
:::grid 2 1:2
Narrow sidebar.
---
Wide main content area.
:::
```

**With custom classes:**

```markdown
:::grid 3 {.profiles .featured}
Team member one.
---
Team member two.
---
Team member three.
:::
```

### Grid cell content

Cells are separated by `---` on its own line. Each cell is markdown — headings, paragraphs, lists, images, links, all work as usual.

Cells automatically recognize and render:

- **Wikilinks to folders/articles**: `[[folder_name]]` or `[[Article Title]]` — rendered as cards with the target's cover, title, and date/count.
- **Images**: `![alt](path.jpg)` or `![[photo.jpg]]` — inlined with responsive sizing. Pipe syntax (`|contain top`) works — see [[media]].
- **Markdown links**: `[text](url)` — rendered inline.
- **Bare URLs**: `https://example.com` on its own line — auto-linked.

### Friend-card auto-conversion

A grid cell whose substantive content is **only** a single external markdown link is rendered as a "friend-card" — a visual card pointing to another site. Adding a short inline description still counts as "only a link":

```markdown
:::grid 3
[MDN](https://developer.mozilla.org)
---
[Rust](https://rust-lang.org)

A memory-safe systems language.
---
[GitHub](https://github.com)
:::
```

If the cell contains anything else — a heading, an image, or more than a link plus description — it renders as regular cell content. This lets you mix friend-cards and rich cells in the same grid.

### Number of columns and ratios

`:::grid N` where `N` is the column count. Optional `a:b:c…` ratio sets fractional widths:

```markdown
:::grid 3 2:1:1
Wide left.
---
Narrow middle.
---
Narrow right.
:::
```

Ratios must have the same number of segments as the column count.

## Gallery

An image grid for photo galleries.

```markdown
:::gallery
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
![](photo4.jpg)
:::
```

Optionally specify a column count:

```markdown
:::gallery 3
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
:::
```

## Table of contents

Insert a table of contents generated from the page's headings.

```markdown
:::toc
:::
```

## Buttons

A styled row of buttons from markdown links. The first link becomes the primary button; the rest are secondary.

```markdown
:::buttons
[Download](https://example.com/download)
[View source](https://github.com/example)
:::
```

Use `{.class}` to attach a modifier class — for example `::::buttons {.inverted}` for a light-on-dark variant.

### Nesting inside grid

Nesting shortcodes uses an **arity rule**: the inner fence uses more colons than the outer. So a `:::grid` contains `::::buttons`, which in turn could contain `:::::callouts`, and so on. The bare close of each fence (`:::`, `::::`, `:::::`) matches the opener with the same colon count. If a closing line has the wrong colon count, the parser treats it as literal content instead of silently swallowing surrounding text.

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

Existing sites that never nested fences continue to work unchanged — a plain `:::grid ... :::` with no deeper blocks still parses the same way.

## Custom layouts with CSS classes

When you need a layout beyond the built-in shortcodes — a two-column split, an asymmetric hero, a sidebar-plus-main region — attach a named class with `{.classname}` and let `.moss/theme/style.css` own the layout. This keeps CSS together in one place and makes mobile `@media` rules work without `!important`.

**Do this.** Use `:::grid N {.your-class}` (no ratio), then define the ratio in CSS:

```markdown
:::grid 2 {.two-col-split}
# Pitch

Main content area — headings, paragraphs, images, anything.
---
Sidebar with call-outs or metadata.
:::
```

```css
/* .moss/theme/style.css */
.two-col-split {
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .two-col-split { grid-template-columns: 1fr; }
}
```

The grid container is rendered as `<div class="moss-grid two-col-split">`, so your class sits alongside the built-in `moss-grid` and can override its `grid-template-columns`.

**Avoid this.** Passing a ratio (`:::grid 2 2:1 {.two-col-split}`) emits an inline `style="grid-template-columns:2fr 1fr"` on the container. Inline styles beat stylesheet rules, so your mobile `@media` query will have no effect unless you add `!important` to every property — a maintenance trap once the pattern spreads across many pages.

**Rule of thumb.** Use the ratio form (`:::grid 2 2:1`) for one-off layouts where you won't need responsive overrides. Reach for a named class the moment you need `@media` behaviour, or whenever the same shape repeats across pages.

See [[css#Shortcode classes]] for the full list of component class names you can target.

## Callouts

Callouts (`> [!type]` blockquotes) live on their own page — see [[callouts]] for syntax and the full list of types.

## Attributes

Add custom CSS classes to any shortcode block using `{.class}` syntax:

```markdown
:::grid 2 {.comparison}
Before
---
After
:::
```

This adds the `comparison` class to the grid container, which you can target in your `style.css`.
