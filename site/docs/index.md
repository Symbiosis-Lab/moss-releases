---
title: Documentation
uid: b4d68dc8
weight: 1
description: Learn how to use moss to turn folders into websites.
translationKey: docs
---

Right-click any folder in Finder and choose **Publish with moss**. If the folder has markdown files, you already have a website. If it's empty, moss opens the editor so you can create your first page.

Every `.md` file becomes a page. Every subfolder becomes a section. `index.md` in any folder becomes that folder's page.

```
my-site/
├── index.md        ← your homepage
├── about.md        ← /about/
└── posts/
    ├── index.md    ← /posts/
    └── hello.md    ← /posts/hello/
```

[[media|Images, videos, and notebooks]] go in the same folder — just reference them from markdown and moss handles the rest.
