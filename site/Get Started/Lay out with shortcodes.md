---
uid: 6a6b0506
url: shortcodes
translationKey: docs-author-shortcodes-index
weight: 50
---
Shortcodes are special blocks written right in markdown. They use the `:::` fence syntax to create layouts and components that standard markdown doesn't have. moss generates a fixed class name for each shortcode, and the default theme comes with styles already in place.

## Multi-column grids

`:::grid N` arranges content into N columns, with cells separated by `+++`. A cell can hold any markdown — text, images, links, cards.

:::grid 2 {.sc-demo}
```markdown
:::grid 2
Left column content
+++
Right column content
:::
```
+++
::::grid 2
Left column content
+++
Right column content
::::
:::

Add an `a:b` ratio after the column count to set each column's width, like `:::grid 2 1:2`. Put a single internal link alone in a cell, and moss renders it as a card with a cover image.

## Callouts

Use a quote block starting with `> [!type]` to highlight important content. Types include `note`, `tip`, `warning`, `pending`, and more.

:::grid 2 {.sc-demo}
```markdown
> [!note] Note
> Something you want readers to pay attention to.
```
+++
> [!note] Note
> Something you want readers to pay attention to.
:::

## Other common shortcodes

| Shortcode | Use |
|--------|------|
| `::::buttons` | A row of buttons, each one a link |
| `:::hero` | A full-width image with text overlaid on top |
| `:::gallery` | An image gallery |
| `::: {.class-name}` | Attach a CSS class to a block of content, no new shortcode needed |

The last one, the "named class fence", is the most flexible: something like `::: {.eyebrow}` hangs a class name on a block, and you write the styles in [[Design & themes|the theme's style.css]] — no need to wait for a new shortcode.

## Going deeper

For each shortcode's full parameters, cell rules, automatic card conversion, and more, see [Shortcodes](/docs/writing/shortcodes/).
