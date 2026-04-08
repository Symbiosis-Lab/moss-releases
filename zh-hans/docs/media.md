---
title: 媒体
uid: 9809b837
weight: 3
description: 图片、视频、笔记本等文件的处理方式。
translationKey: docs-media
lang: zh-hans
---

把图片、视频和其他文件放在项目文件夹中，在 markdown 中引用即可——moss 自动处理路径解析、优化和渐进加载。 ^intro

## 图片

用标准 markdown 语法引用图片：

```markdown
![日落](photos/sunset.jpg)
```

或用 wikilink 语法：

```markdown
![[sunset.jpg]]
```

moss 自动解析路径——不需要关心相对路径还是绝对路径。同时会提取图片尺寸，生成一个微型占位背景（模糊的底色），避免页面在图片加载时跳动。

支持格式：`.jpg`、`.jpeg`、`.png`、`.gif`、`.svg`、`.webp`、`.avif`。

## 视频

视频文件同样放进文件夹，用相同方式引用：

```markdown
![[demo.mov]]
```

moss 在后台自动将 `.mov` 转码为 `.mp4`（H.264 + AAC）。预览窗口即刻打开，视频在转码完成后渐进加载。

引用时使用原始的 `.mov` 文件名即可，moss 自动提供转码后的 `.mp4`。

## 显示控制

用管道语法控制媒体的显示方式——在 `|` 后追加适配和定位参数：

```markdown
![[photo.jpg|contain top-left]]
```

**适配方式**（对应 CSS `object-fit`）：

| 值 | 效果 |
|----|------|
| `cover` | 填满区域，必要时裁切（默认） |
| `contain` | 完整展示，必要时留白 |
| `fill` | 拉伸填满 |
| `none` | 原始尺寸，不缩放 |
| `scale-down` | 类似 `contain`，但不放大 |

**定位**（对应 CSS `object-position`）：

`center`、`left`、`right`、`top`、`bottom`、`top-left`、`top-right`、`bottom-left`、`bottom-right`

组合使用：`![[panorama.jpg|contain center]]`、`![[headshot.jpg|cover top]]`。

管道语法适用于 wikilink、markdown 图片，以及短代码中的文件名。

## 笔记本

Jupyter 笔记本（`.ipynb` 文件）通过 JupyterLite 直接在浏览器中运行——不需要服务器，不需要安装 Python。整个运行环境（约 20 MB）以 WebAssembly 的形式在访客的浏览器中执行。

将 `.ipynb` 文件放在项目中，moss 会将其与其他内容一起处理。

## HTML 文件

`.html` 文件原样提供，不做任何处理。适用于交互内容、嵌入页面，或需要完全控制标记的页面。

## 封面图

在 frontmatter 中为页面指定封面图：

```yaml
---
title: 我的项目
cover: screenshots/hero.png
---
```

当栏目使用 `children_style: card` 时，封面图会显示在卡片上。moss 从文件扩展名自动判断媒体类型。对于非图片封面，用 `cover_type` 覆盖：

```yaml
---
cover: demo.mp4
cover_type: video
---
```

有效的封面类型：`image`（默认）、`video`、`iframe`。
