---
title: Author
uid: eae1ec89
weight: 5
description: Shape your pages with frontmatter and shortcodes.
translationKey: docs-author
---

Once your folder is a site, the next step is shaping how each page looks and connects to others.

Control each page with [[frontmatter]] — title, date, visibility, and more. Add layouts with [[shortcodes]] — grids, galleries, hero images. Call out important content with [[callouts]]. Connect pages with [[wikilinks-and-embeds|wikilinks and embeds]], and shape the site's [[navigation|navigation and footer]].

## Choosing the right primitive

When a page needs a specific visual treatment, try in this order:

1. **Plain markdown + CSS selector.** Use `## Mission`, `> quote`, `*byline*`, `- item`. Let the theme select the resulting HTML. Zero new vocabulary.
2. **A moss-native shortcode.** `:::grid N`, `::::buttons`, `:::hero`, `:::gallery`, `> [!pending]`. These emit well-known class names that the default theme already styles. See [[shortcodes]].
3. **Named-class fenced div.** `::: {.class}` attaches a CSS class to a region without introducing a new shortcode. Pair with a CSS rule in `.moss/theme/style.css`. See [[shortcodes#Named-class fenced divs]].
4. **Custom shortcode.** Rare; only when you need new behavior the parser doesn't already support.

### Special cases

| Goal | Primitive |
|------|-----------|
| Deck / subtitle / lead paragraph after a title | `> blockquote` immediately after `# H1`, styled via `h1 + blockquote` |
| Kicker / eyebrow before the title | `::: {.eyebrow}` fenced div before the H1 |
| Pull quote inside a section | `> quote` styled differently from callouts via `h2 ~ blockquote` |
| Clickable compound card in a grid | Wrap cell content in `[…](/url)` — moss emits one `<a>` with block children |
| Repeated block across pages | Extract as a partial (`unlisted: true, nav: false, children: false`), transclude via `![[partial-name]]` |
| Placeholder / in-progress section | `> [!pending] Title` callout |

### Markdown attributes that do NOT work

These Pandoc-style attribute syntaxes are **not** supported by moss:

- `# Title {.class}` — heading attributes
- `paragraph\n{.class}` — paragraph attributes
- `---\n{.section-divider}` — hr attributes

Use `::: {.class}` fenced divs or CSS element selectors instead.
