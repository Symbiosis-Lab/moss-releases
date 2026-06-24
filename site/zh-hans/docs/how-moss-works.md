---
title: moss 如何运作
uid: dd8cbb2b
weight: 1
description: 了解如何使用 moss 将文件夹变成网站。
translationKey: docs
lang: zh-hans
---

# moss 如何运作

安装 moss 后，右键任意文件夹，选择**用 moss 发布**即可预览网站。可以使用 moss 自带编辑器，也可以用[[editors|任何你喜欢的 markdown 编辑器]]。

- 每个文件夹会变成一个页面，默认[[frontmatter#子页面|列出其子页面]]。
  - 全是[[media|媒体文件]]的文件夹会变成图库。
  - 图片和视频会自动压缩转码，适配 Web。
- 每个 `.md` 文件会变成一个页面。
  - URL 根据它在文件夹中的路径生成，除非在 frontmatter 里用 `url` [[frontmatter#高级字段|自定义]]。
  - `index.md`、`readme.md`、`_index.md`、`main.md`，或与文件夹同名的文件（例如 `recipes/` 里的 `recipes.md`）会成为[[structure#^folder-page|该文件夹的页面]]。带语言后缀的变体，如 `index.zh-hans.md`，同样有效。
  - 扁平站点根目录下的 `about.md`（以及 `关于.md` / `關於.md`）会自动出现在导航栏。含子文件夹的组织型站点中，所有根目录页面都会出现在导航栏，通过 frontmatter 中的 [[frontmatter#导航|`nav` 字段]]可控制。
- 引用媒体或 markdown 文件时，用相对路径或直接写文件名即可，moss 会在文件树中找到最匹配的那个。

```
my-site/
├── index.md        ← 首页
├── about.md        ← /about/
└── posts/
    ├── index.md    ← /posts/
    └── hello.md    ← /posts/hello/
```

准备好后，可以[[deploy|发布到 GitHub Pages]]并绑定自己的域名。

建议先看[[structure|结构]]，了解文件、文件夹和 URL 是如何对应起来的。
