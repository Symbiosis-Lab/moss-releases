---
title: 文档
uid: dd8cbb2b
weight: 1
description: 了解如何使用 moss 将文件夹变成网站。
translationKey: docs
lang: zh-hans
---

在 Finder 中右键任意文件夹，选择**用 moss 发布**。如果文件夹中有 markdown 文件，你已经拥有了一个网站；如果是空文件夹，moss 会打开编辑器，帮你创建第一个页面。

每个 `.md` 文件变成一个页面，每个子文件夹变成一个栏目。文件夹中的 `index.md` 是该文件夹的页面。

```
my-site/
├── index.md        ← 首页
├── about.md        ← /about/
└── posts/
    ├── index.md    ← /posts/
    └── hello.md    ← /posts/hello/
```

[[media|图片、视频、笔记本]]放在同一个文件夹中——在 markdown 中引用，moss 处理其余一切。
