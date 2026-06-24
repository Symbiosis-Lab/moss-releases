---
title: Buttons
uid: e4c7a915
weight: 4
description: A styled row of buttons from markdown links.
translationKey: docs-author-shortcodes-buttons
---

`:::buttons` turns a list of markdown links into a styled row of buttons. The first link is the primary button; the rest are secondary.

## Basic buttons

:::grid 2 {.sc-demo}
```markdown
:::buttons
[Download](https://example.com/download)
[View source](https://github.com/example)
:::
```
+++
::::buttons
[Download](https://example.com/download)
[View source](https://github.com/example)
::::
:::

## Modifier class

Use `{.inverted}` for a light-on-dark variant, or any other class to apply custom styles from your `style.css`.

:::grid 2 {.sc-demo}
```markdown
:::buttons {.inverted}
[Primary action](https://example.com/action)
[Secondary](https://example.com/secondary)
:::
```
+++
::::buttons {.inverted}
[Primary action](https://example.com/action)
[Secondary](https://example.com/secondary)
::::
:::

The first link in the block is always styled as the primary button. All subsequent links are secondary. To change which action is primary, reorder the links.
