---
title: Links & Embeds
uid: 5555db30
weight: 4
description: Wikilinks, embeds, cross-references, and bilingual content.
translationKey: docs-author-links
---

## Wikilinks

Link to any page in your site using double brackets:

```markdown
Read the [[structure]] page for details.
```

moss resolves the link by matching the text against filenames, titles, and slugs. You don't need to specify the full path — `[[getting-started]]` finds `docs/start/getting-started.md` automatically.

**Display text:**

```markdown
See the [[structure|content structure docs]] for more.
```

**Link to a heading:**

```markdown
Check [[structure#Stems]] for the definition.
```

**Link to a block reference:**

```markdown
As defined in [[structure#^intro]].
```

### Resolution rules

When multiple files could match, moss picks the best one:

1. Exact filename match
2. Filename without extension
3. Folder note (self-named file)
4. Same language tree as the source page (e.g. `![[footer]]` from `zh-hans/about.md` prefers `zh-hans/footer.md` over root `footer.md`)
5. Closest directory first (files nearer to the linking page win remaining ties)

Explicit paths like `[[zh-hans/footer]]` always win over the language-tree preference.

## Image embeds

Embed images with `!` before the brackets:

```markdown
![[photo.jpg]]
![[poster-farewell.webp]]
```

moss resolves the filename by searching the entire content tree — you don't need a relative path. Put images in an excluded asset folder (`assets/`, `images/`, `static/`, `public/`) so they are served but not treated as content pages, then reference them by bare filename from any markdown file.

```
work/
├── index.md         ← uses ![[poster-farewell.webp]]
└── assets/
    └── poster-farewell.webp   ← not a page; served as a static file
```

The language-tree preference (rule 4 above) applies to image resolution too: `![[photo.jpg]]` inside `zh-hans/about.md` prefers `zh-hans/photo.jpg` if it exists.

**Pipe syntax** controls display: `![[photo.jpg|contain top]]`. See [[media]] for the full option set.

## Embeds

Pull content from another page inline using `!` before the brackets:

```markdown
![[structure#^intro]]
```

This inserts the referenced paragraph directly into the current page. Embeds work with:

- **Full page**: `![[media]]` — embeds the entire page content
- **Section**: `![[structure#URLs]]` — embeds everything under that heading
- **Block**: `![[structure#^intro]]` — embeds a single paragraph marked with a block ID

moss detects circular embeds and stops before creating an infinite loop.

## Block references

Mark any paragraph with a `^block-id` at the end of the line:

```markdown
moss turns a folder of markdown files into a website. ^intro
```

Other pages can then link to or embed this specific paragraph using `[[page#^intro]]` or `![[page#^intro]]`. Block IDs are stable — they don't change when you reword the paragraph or rename the heading above it.

## Markdown links

Standard markdown links work as you'd expect:

```markdown
[Visit Example](https://example.com)
[About page](about.md)
[Section link](/docs/start/structure/)
```

Both relative and absolute paths work. External links open in a new tab automatically.

## Bilingual content

Create translations by appending a language suffix to the filename:

| File | Language |
|------|----------|
| `about.md` | site default |
| `about.zh-hans.md` | Simplified Chinese |
| `about.zh-hant.md` | Traditional Chinese |
| `about.en.md` | English (explicit) |

When translations exist, a language toggle appears on the page automatically.

### Language detection

moss resolves a page's language in this order:

1. `lang` frontmatter field
2. Filename suffix (`.zh-hans.md`)
3. Content auto-detection
4. Site default language

### Linking translations with different names

When translations have different filenames, use `translationKey` to connect them:

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

Both files show a language toggle linking to each other.
