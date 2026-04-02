---
title: 快速入门
uid: 384fdf50
weight: 1
description: 安装 moss，几分钟内发布你的第一个网站。
lang: zh-hans
translationKey: getting-started
---

## 安装

从 [GitHub Releases](https://github.com/Symbiosis-Lab/moss-releases/releases/latest) 下载 DMG 文件，打开后将 moss 拖入应用程序文件夹。

**系统要求：** macOS 12 或更高版本。原生支持 Intel 和 Apple Silicon。

Windows 和 Linux 版本正在规划中。

## 发布第一个网站

在任意位置创建一个文件夹——例如 `~/my-site`——然后添加以下文件：

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

在 Finder 中右键点击 `my-site` 文件夹，选择**用 moss 发布**，应用内即会打开预览页面。

## 发生了什么

moss 扫描了文件夹，将每个 Markdown 文件转换为 HTML，根据文件夹结构和 frontmatter 生成导航，应用了支持深色模式的默认主题，并启动了本地预览服务器——全程无需上传任何内容，也不会修改你的文件。

## 下一步

- [内容结构](content.md) — 文件与文件夹如何对应页面
- [自定义](customization.md) — 修改颜色、字体和布局
- [部署](deploy.md) — 发布到 GitHub Pages
