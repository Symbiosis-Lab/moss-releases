---
uid: bb01030e
title: Design & themes
translationKey: docs-design
url: design
weight: 60
description: Customize your site's look and behavior with CSS and JavaScript — no build step required.
---

Customizing your design takes just two files, placed in your project's `.moss/theme/` directory (moss creates it automatically when you open a folder):

- **`.moss/theme/style.css`** — override colors, fonts, spacing, and component styles.
- **`.moss/theme/script.js`** — add custom interactions.

```
my-site/
├── .moss/
│   └── theme/
│       ├── style.css   ← custom CSS
│       └── script.js   ← custom JS
├── index.md
└── ...
```

moss loads both files automatically: `style.css` overrides the default theme without any `!important`, and `script.js` runs after all built-in scripts.

## Adjust the look with variables

moss's styles are built on a set of `--moss-*` CSS variables. Override a few and the whole look changes:

```css
:root {
  --moss-color-accent: #2d5a2d;      /* links and accent color */
  --moss-font-body: "Inter", sans-serif;
  --moss-content-width: 72ch;        /* max body width */
}
```

Dark mode takes just one selector — moss already funnels the system preference and the manual toggle into `data-theme`:

```css
:root[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

Run the command-line tool `moss describe --json` to list every variable with its light and dark defaults.

## Fine-tune individual components

Every component moss generates has a stable `.moss-*` class name you can target directly in `style.css` — for example `.moss-grid-card`, `.moss-collection-card`, `.callout`. You can also attach a custom class to a shortcode: `:::grid 3 {.profiles}`, then write `.profiles .moss-grid-card { … }`.

## Other assets

You can also put other media files in `.moss/theme/` for `script.js` and `style.css` to reference. For example, drop a `.woff2` into `.moss/theme/fonts/` and reference it in `style.css` with `@font-face { src: url('fonts/myfont.woff2') }`.

## Going deeper

For the full CSS variable table, component class names, data attributes and DOM structure, see [Write a theme](/docs/design/), [CSS tokens](/docs/reference/css-tokens/) and [Components](/docs/reference/components/).
