---
title: Fenced Divs
uid: f8d3b526
weight: 5
description: Named-class fenced divs for styling regions of markdown without a named shortcode.
translationKey: docs-author-shortcodes-fenced-divs
---

When you need to style a region of markdown without introducing a named shortcode, use a bare `:::` fence with a `{.class}` attribute block. Full markdown renders inside the div — headings, lists, images, links, and nested shortcodes all work normally.

## Basic fenced div

:::grid 2 {.sc-demo}
```markdown
::: {.tagline}
Civic engagement through community-centered performance.
:::
```
+++
:::: {.tagline}
Civic engagement through community-centered performance.
::::
:::

This renders as:

```html
<div class="tagline">
  <p>Civic engagement through community-centered performance.</p>
</div>
```

## Multiple classes

:::grid 2 {.sc-demo}
```markdown
::: {.hero .narrow}
## Our story

Founded in 2018, we make theatre that listens.
:::
```
+++
:::: {.hero .narrow}
## Our story

Founded in 2018, we make theatre that listens.
::::
:::

Use named-class fenced divs instead of `<div class="…">` HTML wrappers. The class lives in your `.moss/theme/style.css`; the markdown stays readable. A bare `:::` with no attribute block is not a shortcode — it remains literal text in the output.
