---
title: Frontmatter
uid: 658c6387
weight: 2
description: Metadata fields that control how moss treats each page.
translationKey: docs-author-frontmatter
---

## What is frontmatter

Frontmatter is a block of YAML at the very top of a markdown file, between two `---` lines. It tells moss about the page — its title, date, visibility, and more. ^def-frontmatter

```yaml
---
title: My First Post
date: 2024-06-15
description: A short summary for search engines and list previews.
---

The rest of the file is your content.
```

Frontmatter is optional. A file without it still becomes a page — moss uses the filename as the title.

## Identity

These fields describe what the page is.

<!-- auto:start:frontmatter-identity -->
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | filename | Page title |
| `description` | string | — | SEO meta description and list previews |
| `date` | string | — | Publication date (`YYYY-MM-DD`) |
| `tags` | list | — | Content tags |
| `lang` | string | auto-detected | Language override (`"en"`, `"zh-hans"`, `"zh-hant"`) |
<!-- auto:end:frontmatter-identity -->

## Navigation

These fields control how the page appears in the site's navigation and chrome.

<!-- auto:start:frontmatter-navigation -->
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `nav` | boolean | `true` for root pages | Show in header navigation |
| `weight` | integer | — | Sort order in nav and lists (lower = first) |
| `breadcrumb` | boolean | site default | Show breadcrumb trail on this page |
| `footer` | boolean | site default | Show footer on this page |
<!-- auto:end:frontmatter-navigation -->

## Visibility

<!-- auto:start:frontmatter-visibility -->
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `draft` | boolean | `false` | Skip generation entirely |
| `unlisted` | boolean | `false` | Generate but hide from lists and sitemap |
<!-- auto:end:frontmatter-visibility -->

## Children

These fields control how a [[structure#^folder-page|folder page]] displays its child pages.

<!-- auto:start:frontmatter-children -->
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `children` | boolean | `true` | Show child page list on section pages |
| `children_style` | string | `"list"` | `"list"`, `"card"`, or `"summary"` |
| `children_group` | string | `"none"` | Group by `"year"` or `"none"` |
| `children_depth` | string | `"direct"` | `"direct"` (immediate children) or `"all"` (all descendants) |
| `children_source` | string | — | Wikilink to folder whose children to show instead |
<!-- auto:end:frontmatter-children -->

Card layout uses the `cover` image from each child's frontmatter.

## Media

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cover` | string | — | Cover image path for card layouts and page headers |
| `cover_type` | string | auto-detected | `"image"`, `"video"`, or `"iframe"` |
| `logo` | string | — | Logo image displayed in the site header |

See [[media#Cover images]] for details.

## Cross-listing

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `also_in` | list | — | Folder paths where this article also appears in child lists |
| `series` | bool/list | — | Series declaration — group related articles in reading order |

`also_in` makes an article appear in multiple sections without duplicating the file:

```yaml
---
title: Building a Trellis
also_in:
  - projects
  - featured
---
```

## Advanced

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cascade` | map | — | Push values to all descendant pages |
| `url` | string | from file path | Custom URL override |
| `translationKey` | string | — | Link files as translations of each other |
| `uid` | string | auto-generated | Content-addressable ID |
| `layout` | string | auto | Template: `"page"` or `"article"` |
| `sidebar` | string | — | Wikilink to a folder to use as sidebar navigation |
| `review_of` | string | — | URL of the work being reviewed |
| `rating` | integer | — | Rating (1–5) for reviews |
| `comments` | boolean | `true` | Show comments section |

### Cascade

`cascade` pushes frontmatter values to all descendants, so you don't repeat them on every file:

```yaml
---
title: Documentation
cascade:
  breadcrumb: true
  comments: false
---
```

Every page nested under this one inherits these values unless it overrides them in its own frontmatter.
