---
translationKey: docs
description: Learn how to use moss to turn folders into websites.
uid: b4d68dc8
weight: 1
title: Documentation
---

# Documentation

After installing moss, right-click any folder and choose **Publish with moss** to preview your website. Edit with the built-in moss editor or [[editors|any markdown editor you like]].

- Every folder becomes a page, [[frontmatter#Children|listing its children]] by default.
  - A folder full of [[media|media files]] becomes a gallery.
  - Images and videos are automatically compressed and converted for the web.
- Every `.md` file becomes a page.
  - Its URL is derived from its path in the folder, unless [[frontmatter#Advanced|overridden]] with `url` in frontmatter.
  - `index.md`, `readme.md`, `_index.md`, `main.md`, or a file named after the folder (e.g. `recipes.md` inside `recipes/`) become the [[structure#^folder-page|folder's page]]. Language-suffixed variants like `index.zh-hans.md` also work.
  - At the root of a flat site, `about.md` (and `关于.md` / `關於.md`) appear as navigation items automatically. In organized sites with subfolders, every root-level page shows up in navigation: control this with [[frontmatter#Navigation|`nav` in frontmatter]].
- Reference media or markdown files with a relative path or just the filename. moss resolves it to the nearest match in the file tree.

```
my-site/
├── index.md        ← your homepage
├── about.md        ← /about/
└── posts/
    ├── index.md    ← /posts/
    └── hello.md    ← /posts/hello/
```

When you're ready, [[deploy|publish to GitHub Pages]] and connect your own domain.

New here? Start with [Get Started](/docs/) to turn a folder of your writing into a website in about five minutes. Then read [[structure]] to see how files, folders, and URLs fit together.
