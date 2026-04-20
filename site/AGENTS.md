---
title: Agent Authoring Guide
uid: 3f8a1c2e
nav: false
---

moss only exposes a clean, human-readable editing surface via markdown files. HTML in md files and new shortcodes are last resorts.

## Decision order for visual treatments

When a design call requires a visual treatment, try in this order:

1. **Plain markdown + CSS selector.** `h1 + blockquote` for a deck, `h2` for a section label, `blockquote` for a pull quote. Write the markdown; write the rule in `.moss/theme/style.css`. No new markup.
2. **Named-class fenced div.** `::: {.tagline}` wraps markdown in `<div class="tagline">`. Add the rule in `style.css`. See [[shortcodes#Named-class fenced divs]].
3. **Class on an existing shortcode.** `:::grid 2 {.work-cards}` — add the class, write CSS. No new shortcode.
4. **Propose a new moss shortcode** — only if 1–3 cannot reach the design. Discuss with the human author before implementing.

## Hard rules

- Never write `<div class="…">` or any HTML wrapper in markdown. Use `::: {.class}` instead.
- Never write inline `style="…"`. Put the rule in `.moss/theme/style.css` under the class name, attach the class.
- Images: use `![[filename.ext]]` wikilinks. moss resolves paths; never hard-code `/path/to/file.ext`.
- Repeated blocks across pages: extract to a partial and transclude with `![[partial-name]]` (set `unlisted: true, nav: false, children: false` on the partial).
- Deck / lede / summary sentence after a title: write a `> blockquote` immediately after the H1. The theme styles `h1 + blockquote` as a deck. Do NOT add a `subtitle` frontmatter field.
- Kicker / eyebrow (small uppercase label above the title): `::: {.eyebrow}` fenced div before the H1.
- Tagline (identity line under title): `::: {.tagline}` fenced div.
- Clickable grid card: wrap the cell's content in a single markdown link `[![[cover.jpg]] ## Title\n Desc](/target)`. moss wraps the cell in one `<a>`. Do NOT hand-write `<a>` wrappers. See [[shortcodes#Single-link grid cells]].
- Frontmatter is for metadata (`title`, `uid`, `lang`, `translationKey`, `nav`, `weight`, `description`). Never for visual content.
- moss auto-emits `<h1>` from the page title — do not duplicate with `# Heading` if `title:` frontmatter is already set and the theme renders it. Use `#` in markdown only when the heading belongs in the content flow.

## If you think you need HTML, stop and ask

- **Wrappers** (`<div>`, `<section>`): is `::: {.class}` enough?
- **Grid cells with links** (`<a href="…">`): wrap the cell content in one markdown link instead — see the hard rule above.
- **Images** (`<img src="…">`): use `![[filename]]` — have you verified the file exists in the content folder?
- **Repetition** (same block on N pages): have you extracted a partial?
- **Kicker / eyebrow**: have you tried `::: {.eyebrow}` + CSS before reaching for a heading class?
- **Deck / lede**: have you tried `> blockquote` immediately after `# Title`?
- **Clickable cards**: have you wrapped the cell content in a single markdown link?

## Reference docs

- [[shortcodes]] — grid, gallery, hero, buttons, named-class fenced divs
- [[wikilinks-and-embeds]] — image wikilinks, partial transclusion
- [[callouts]] — `> [!note]` blockquote variants
- [[frontmatter]] — all recognized metadata fields
