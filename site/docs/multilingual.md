---
title: Multilingual sites
uid: 4f1b2e9d
weight: 5
description: Folder-per-language structure, translation keys, and automatic language toggle.
translationKey: docs-multilingual
---

moss supports sites in English (`en`), Simplified Chinese (`zh-hans` / `zh-cn`), and Traditional Chinese (`zh-hant` / `zh-tw`). Any of these can be the site default; the rest appear behind an automatic language toggle in the header.

## Folder-per-language (canonical)

Put each language in its own top-level folder, named by language code:

```
my-site/
├── index.md            ← EN homepage (site default)
├── about.md
├── posts/
│   └── hello.md
├── zh-hans/
│   ├── index.md        ← 中文简体 homepage
│   ├── about.md
│   └── posts/
│       └── hello.md
└── zh-hant/
    ├── index.md
    └── about.md
```

Each language tree mirrors the site structure. URLs follow the same pattern: `/`, `/about/`, `/posts/hello/` for the default language; `/zh-hans/`, `/zh-hans/about/`, etc. for others.

This is the recommended structure — clear, scalable, and maps 1:1 to the URL layout visitors see.

## Sibling suffix (legacy)

moss also accepts per-file language suffixes — `.zh-hans.md`, `.zh-hant.md`, `.en.md`:

```
my-site/
├── index.md
├── index.zh-hans.md    ← Simplified Chinese homepage
└── about.md
└── about.zh-hans.md
```

This works for small sites, but mixing it with folder-per-language in the same folder is ambiguous — stick to one style per site.

Bare `.zh` is accepted as shorthand for `.zh-hans` — `about.zh.md` resolves exactly like `about.zh-hans.md` (URL `/zh-hans/about/`, `lang="zh-hans"`). Use whichever form you prefer; `.zh-hant` / `.zh-tw` remain distinct for Traditional Chinese.

## Mixed-structure warning

If a single language uses **both** styles — say, `zh-hans/index.md` (folder-per-language) AND `index.zh-hans.md` (sibling suffix) — moss emits a compile-time warning:

```
[warn] Mixed multilingual structure detected for language 'zh-hans'. Found
       both sibling suffix file (index.zh-hans.md) and folder-based
       translation (zh-hans/...). Prefer folder-per-language — see
       https://docs.mosspub.com/multilingual for the canonical pattern.
```

Both styles still compile; the warning is just a nudge. To silence it, pick one style per language and move the other files over. Folder-per-language (the canonical shape above) is almost always the better choice — URLs mirror the folder tree, and adding more pages doesn't keep stacking `.lang.md` copies next to originals.

Different languages may use different styles without triggering the warning; it only fires when the **same** language appears in both shapes.

## Frontmatter fields

| Field | Type | Purpose |
|-------|------|---------|
| `lang` | string | Explicit language code (`"en"`, `"zh-hans"`, `"zh-hant"`). Overrides filename/content detection. |
| `translationKey` | string | Links files as translations of each other when filenames differ. |

Use `translationKey` when translated versions have different filenames (e.g., `posts/hello.md` and `posts/ni-hao.md`):

```yaml
# posts/hello.md
---
translationKey: post-hello
---

# zh-hans/posts/ni-hao.md
---
translationKey: post-hello
lang: zh-hans
---
```

## Resolution chain

For each file, moss determines the language by checking (in order):

1. The `lang` frontmatter field
2. The filename suffix (`.zh-hans.md`)
3. Content auto-detection (script and character analysis)
4. The site default language

The first step that yields a recognized language wins.

## Setting the site default

By default, moss treats the root-level (`en`) tree as the site default. To publish another language at `/`, set `lang` in the root `index.md`:

```yaml
---
title: 我的网站
lang: zh-hans
---
```

Then the Simplified Chinese tree serves at `/` and English at `/en/`.

## Automatic language toggle

When two or more language versions of a page are linked (via matching paths in folder-per-language, matching filenames in sibling-suffix, or matching `translationKey`), moss emits a language toggle in the site header.

The toggle shows the page's current language, followed by links to each available translation. Nothing to configure — it appears automatically as soon as a second language file exists.

## Shared partials across languages

You can extract shared markdown (like a footer) into a file and transclude it into pages across languages:

```markdown
# zh-hans/about.md
Some about copy.

![[footer]]
```

moss resolves `![[footer]]` by looking in the current page's language tree first (so `zh-hans/footer.md` wins from inside `zh-hans/`), then falling back to the root. This lets each language keep its own partial where needed, while defaulting to a shared one.

See [[author/wikilinks-and-embeds]] for the full transclusion syntax.

## Related pages

- [[author/frontmatter]] — `lang`, `translationKey`, and the full field reference
- [[author/wikilinks-and-embeds]] — transclusion and cross-page linking
- [[structure]] — how folders become URLs
