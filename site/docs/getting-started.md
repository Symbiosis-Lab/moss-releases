---
title: Getting Started
uid: 6db78ba2
weight: 1
description: Install moss and publish your first site in minutes.
---

## Install

Download the DMG from [GitHub Releases](https://github.com/Symbiosis-Lab/moss-releases/releases/latest), open it, and drag moss to your Applications folder.

**Requirements:** macOS 12 or later. The binary runs natively on both Intel and Apple Silicon.

Windows and Linux support is planned.

## Your First Site

Create a folder anywhere — for example, `~/my-site` — and add these files:

**`index.md`**
```markdown
---
title: My Site
description: A personal website built with moss.
---

Welcome to my site. This is the homepage.
```

**`about.md`**
```markdown
---
title: About
nav: true
weight: 2
---

This page appears in the navigation bar.
```

**`posts/hello.md`**
```markdown
---
title: Hello World
date: 2024-01-15
---

My first blog post. Markdown works: **bold**, *italic*, [links](https://example.com).
```

Right-click the `my-site` folder in Finder, choose **Publish with moss**, and a preview opens in the app.

## What Just Happened

moss scanned the folder, converted each markdown file to HTML, generated navigation from the folder structure and frontmatter, applied a default theme with dark mode support, and started a local preview server — all without uploading anything or modifying your files.

## Next Steps

- [Content Structure](content.md) — how files and folders map to pages
- [Customization](customization.md) — change colors, fonts, and layout
- [Deploy](deploy.md) — publish to GitHub Pages
