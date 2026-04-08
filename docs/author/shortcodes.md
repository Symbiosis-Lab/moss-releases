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

Cells automatically recognize and render:

- **Wikilinks**: `[[folder_name]]` or `[[Article Title]]` — rendered as cards with covers
- **Markdown links**: `[text](url)`
- **Images**: `![alt](path.jpg)` or `![[photo.jpg]]`
- **Bare URLs**: `https://example.com` — auto-converted to links

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

## Callouts

Highlighted blocks for notes, warnings, and tips. Uses Obsidian-compatible syntax:

```markdown
> [!note]
> This is a note callout.

> [!warning] Careful
> This action cannot be undone.

> [!tip] Pro tip
> You can nest markdown inside callouts.
```

The word after `[!` sets the type. An optional title follows on the same line.

**All callout types:**

`note`, `tip`, `warning`, `caution`, `important`, `info`, `abstract`, `todo`, `success`, `question`, `failure`, `danger`, `bug`, `example`, `quote`

Callouts can span multiple paragraphs — use `>` on empty lines:

```markdown
> [!note] Long callout
> First paragraph.
>
> Second paragraph with **formatting**.
```

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
