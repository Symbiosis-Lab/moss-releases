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
- **Folder tree = site tree.** Put related pages in a folder (`work/`, `essays/`). moss generates breadcrumbs automatically when `breadcrumb: true` is on the homepage frontmatter. Never hand-roll `::: {.breadcrumb}` blocks.
- **Use moss-emitted class names in CSS, not invented parallels.** `.moss-grid`, `.moss-grid-card`, `.moss-buttons`, `.moss-btn-primary`, `.moss-hero`, `.moss-hero-content`, `.callout`, `.callout-pending`, `.moss-collection-card`, `.moss-child-summary`. Target these directly. See [[css#Component classes]] for the full list.
- **Single-link grid cells wrap in `<a>`.** A cell containing only `[…](url)` — whether the link text is inline or compound block content (image + heading + paragraph separated by blank lines) — becomes one `<a>` with block-level children. Do not hand-write `<a>` wrappers.
- **`.no-cards` opts out of folder-link auto-conversion.** Use `:::grid N {.no-cards}` for navigation grids, mixed-content grids, or compound-link grids where cells should render as `.link-card` / `.friend-card` rather than collection cards.
- **Pandoc-style heading/paragraph/hr attributes do NOT parse.** `# Title {.class}`, `paragraph\n{.class}`, and `---\n{.section-divider}` are not supported. Use `::: {.class}` fenced divs or CSS selectors on element structure instead.
- **Arity rule for nested fenced divs.** Inner fence uses more colons than outer: `:::` contains `::::` contains `:::::`. The bare close of each fence must match the opener's colon count. Same-arity nesting emits a warning and renders as literal text.
- **Frontmatter is a fixed schema.** Arbitrary custom fields are silently ignored. `description:` is for SEO/previews only — it is not rendered as a visible page deck. Decks use `> blockquote` immediately after `# H1`.
- **Wikilink language-tree resolution.** `![[page]]` inside `zh-hans/file.md` prefers `zh-hans/page.md` over root `page.md`. Use an explicit path prefix (`![[zh-hans/page]]`) to override.
- **Images in excluded folders are served as static files, not pages.** `assets/`, `images/`, `static/`, `public/`, `img/`, `css/`, `js/`, `fonts/`, `node_modules/`, and any dot- or underscore-prefixed folder are excluded from content processing. Reference their files via `![[filename.ext]]` wikilinks.

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
