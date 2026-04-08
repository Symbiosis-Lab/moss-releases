---
title: Content Structure
uid: 9d52d328
weight: 2
description: How files and folders become pages and navigation.
---

## Every file is a page

Every `.md` file in your folder becomes one page. Every folder becomes one section. There is no configuration step — open a folder in moss and the structure is already there.

```
my-site/
├── index.md          → /
├── about.md          → /about/
└── posts/
    ├── index.md      → /posts/
    └── hello.md      → /posts/hello/
```

## URLs follow the file path

| File | URL |
|------|-----|
| `index.md` | `/` |
| `about.md` | `/about/` |
| `posts/hello.md` | `/posts/hello/` |
| `posts/index.md` | `/posts/` |
| `docs/getting-started.md` | `/docs/getting-started/` |

Use `url` in frontmatter to override the default URL for any page:

```yaml
---
title: Hello World
url: /blog/2024/hello/
---
```

## Folders become section pages

When a folder has no `index.md`, moss auto-generates a section page that lists its children. Add an `index.md` to provide your own content for that page.

A file named the same as its parent folder also works as the folder index:

```
posts/
├── posts.md     ← serves as /posts/
└── hello.md     ← serves as /posts/hello/
```

## Root pages appear in navigation automatically

Pages at the root level appear in the header navigation. Control this with two frontmatter fields:

```yaml
---
title: About
nav: false      # omit from header nav entirely
weight: 10      # lower numbers appear first
---
```

Folders at the root level appear as navigation items when they have a title set in their `index.md`.

## Child lists are shown by default

Section pages automatically list their children. Frontmatter controls how that list renders:

```yaml
---
title: Posts
children: false           # hide the child list entirely
children_style: card      # "list" (default) or "card"
children_group: year      # group by year (also: "none")
children_depth: all       # "direct" (default) or "all" descendants
---
```

Card layout uses the `cover` image from each child's frontmatter. Set `cover_type` to `"video"` or `"iframe"` for non-image covers.

## Sort order is predictable

Within any section, children are sorted in this order:

1. Subfolders, alphabetically
2. Files with a `date`, newest first
3. Files without a `date`, alphabetically

Override with `weight` — lower weights sort first, ahead of any date-based ordering.

## Visibility has three levels

| Setting | Generated | Lists | Sitemap |
|---------|-----------|-------|---------|
| _(default)_ | yes | yes | yes |
| `unlisted: true` | yes | no | no |
| `draft: true` | no | no | no |

Prefix a folder name with `_` to exclude it entirely from processing:

```
my-site/
├── _drafts/      ← ignored completely
└── posts/        ← processed normally
```

## Frontmatter reference

| Field | Type | Purpose |
|-------|------|---------|
| `title` | string | Page title |
| `date` | string | Publication date (YYYY-MM-DD) |
| `weight` | integer | Nav/list ordering (lower = first) |
| `url` | string | Custom URL override |
| `cover` | string | Cover image for card layouts |
| `cover_type` | string | `"video"`, `"iframe"`, or `"image"` |
| `nav` | boolean | Show in header navigation |
| `draft` | boolean | Skip generation entirely |
| `unlisted` | boolean | Generate but hide from lists/sitemap |
| `description` | string | SEO meta description, list previews |
| `tags` | list | Content tags |
| `children` | boolean | Show child page list (default: true) |
| `sidebar` | string | Wikilink to folder for sidebar |
| `children_style` | string | `"list"` (default) or `"card"` |
| `children_group` | string | `"year"` or `"none"` |
| `children_depth` | string | `"direct"` (default) or `"all"` |
| `series` | bool/list | Series declaration |
| `breadcrumb` | boolean | Override site-wide breadcrumb |
| `footer` | boolean | Override site-wide footer |
| `cascade` | map | Push values to all descendants |
| `also_in` | list | Folder paths where article also appears |
| `lang` | string | Language override (`"en"`, `"zh-hans"`) |
| `translationKey` | string | Link files as translations |
| `comments` | boolean | Show comments (default: true) |
| `uid` | string | Content-addressable ID (auto-generated) |
| `layout` | string | Template override: `"page"` or `"article"` |
| `review_of` | string | URL of reviewed work |
| `rating` | integer | Rating (1–5) for reviews |

Use `cascade` to push a value to all descendants without repeating it on every file:

```yaml
---
title: Posts
cascade:
  comments: false
---
```

## Bilingual content is file-name-based

Append a language suffix to the filename to create a translation:

| File | Language |
|------|----------|
| `about.md` | site default |
| `about.zh-hans.md` | Simplified Chinese |
| `about.en.md` | English (explicit) |

Language is resolved in this priority order: `lang` frontmatter → filename suffix → content auto-detection → site default.

For translations with different filenames, use `translationKey` to link them:

```yaml
# posts/hello.md
---
translationKey: hello-post
---

# posts/ni-hao.md
---
translationKey: hello-post
lang: zh-hans
---
```

## Shortcodes extend Markdown

Shortcodes use `:::` block syntax. Each one closes with `:::`.

**Hero image:**
```markdown
:::hero image.jpg
# Headline text
:::
```

**Grid layout:**
```markdown
:::grid 3
Content in column one.

Content in column two.

Content in column three.
:::
```

**Image gallery:**
```markdown
:::gallery
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
:::
```

**Table of contents:**
```markdown
:::toc
:::
```

**Callout block:**
```markdown
:::callout warning
This action cannot be undone.
:::
```

Valid `callout` types: `note`, `warning`, `tip`.
