---
lang: zh-hans
translationKey: docs-author-links
uid: d7ca7969
weight: 40
title: Wikilink 与嵌入
url: links
description: 用双方括号链接页面、嵌入内容、引用媒体——无需填写路径。
---

Wikilink 是青苔里引用任何东西的通用方式：`[[双方括号]]` 里写文件名、标题或媒体名，青苔在整个内容树中查找并解析，你不用写相对路径。

## 链接页面

```markdown
详见 [[Frontmatter]] 页面。
```

青苔按文件名、标题和网址来匹配。常见变体：

| 写法 | 作用 |
|------|------|
| `[[Frontmatter\|页面属性]]` | 自定义显示文字（竖线后是读者看到的文字） |
| `[[Frontmatter#常用字段]]` | 链接到某个标题 |
| `[[Frontmatter#^intro]]` | 链接到某个段落（块引用） |

在段落末尾加 `^intro` 就能给它一个稳定的块 ID，之后别处用 `[[页面#^intro]]` 引用。

## 嵌入

在方括号前加 `!`，就把目标内容**内联**到当前页面，而不只是链接：

| 写法 | 嵌入内容 |
|------|---------|
| `![[Frontmatter]]` | 整个页面 |
| `![[Frontmatter#常用字段]]` | 某个章节 |
| `![[Frontmatter#^intro]]` | 某个段落 |
| `![[相册/]]` | 一个文件夹的子页面，渲染成卡片 |

路径以 `/` 结尾表示文件夹。文件夹嵌入可带参数：`![[相册/|limit:5,more]]` 只显示最新 5 项并追加「更多 →」链接。

## 媒体

图片、视频等文件放进文件夹，用 wikilink 或标准 markdown 引用即可，青苔自动解析路径、优化文件、生成占位背景避免加载时跳动。

```markdown
![[sunset.jpg]]
![日落时的海岸](photos/sunset.jpg)
```

第二种写法方括号内的文字会成为图片下方的**图注**：图片单独成段时，青苔按 Pandoc 惯例把它包成 `<figure>`，图注默认居中、斜体。wikilink 写法也可以加图注——`![[sunset.jpg|日落时的海岸]]`。图注同时供屏幕阅读器和搜索引擎使用；不写文字（`![[sunset.jpg]]`）则不生成图注。

支持的媒体：

- **图片**——`.jpg`、`.png`、`.gif`、`.svg`、`.webp`、`.avif`
- **视频**——`.mov` 自动转码为 `.mp4`，引用时用原始文件名即可
- **笔记本**——`.ipynb` 通过 JupyterLite 直接在浏览器中运行，无需服务器
- **HTML**——`.html` 文件原样提供，用于交互内容

把媒体放进被排除的资源文件夹（`assets/`、`images/`、`static/`、`public/`），它们会对外提供但不作为页面。

### 控制显示

在文件名后用竖线追加参数，控制图片的尺寸、填充与定位：

```markdown
![[cover.jpg|400]]           # 宽 400px
![[cover.jpg|100%]]          # 宽 100%
![[cover.jpg|200x150]]       # 宽 × 高
![[headshot.jpg|cover top]]  # 填充方式 + 定位
```

**尺寸**：写宽度或「宽×高」，单位支持 `px`（默认）、`%`、`vh`，如 `400`、`100%`、`200x150`。

**填充方式**（对应 CSS `object-fit`）：`cover`（默认，填满并裁切）、`contain`（完整展示）、`fill`、`none`、`scale-down`。**定位**：`center`、`top`、`left`、`bottom-right` 等。

一个竖线只表达一种意思——尺寸、填充定位、或图注，三者不在同一个竖线里混用。

## 深入了解

解析优先级、循环嵌入处理、封面图、`children_source` 等细节，见英文文档 [Links & Embeds](/docs/writing/wikilinks-and-embeds/) 与 [Media](/docs/writing/media/)。
