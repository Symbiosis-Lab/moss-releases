---
title: 撰写
uid: c79b8c2b
weight: 20
description: 用 frontmatter 和短代码塑造你的页面。
translationKey: docs-author
lang: zh-hans
---

文件夹已经是网站了，下一步是控制每个页面的呈现方式。

用 [[frontmatter]] 控制标题、日期、可见性。用 [[shortcodes]] 创建多栏、图库、大图等布局。用 [[callouts|标注]] 突出重要内容。用 [[wikilinks-and-embeds|wikilink 和嵌入]]连接页面、引用内容；用 [[navigation|导航和页脚]]塑造网站外观。

## 选择合适的原语

页面需要特定视觉处理时，按以下优先级尝试：

1. **纯 markdown + CSS 选择器。** 使用 `## 标题`、`> 引用`、`*署名*`、`- 列表项`，让主题根据生成的 HTML 来应用样式。零额外语法。
2. **moss 原生短代码。** `:::grid N`、`::::buttons`、`:::hero`、`:::gallery`、`> [!pending]`。这些短代码生成固定的类名，默认主题已经有对应样式。参见 [[shortcodes]]。
3. **命名类围栏分区。** `::: {.class}` 为一个区域附加 CSS 类，无需引入新短代码。配合 `.moss/theme/style.css` 中的 CSS 规则使用。参见 [[shortcodes#Named-class fenced divs]]。
4. **自定义短代码。** 较少见；仅在需要解析器尚不支持的新行为时使用。

### 特殊情形

| 目标 | 原语 |
|------|------|
| 标题后的导语 / 副标题 / 引言段落 | `# H1` 正下方的 `> 引用块`，通过 `h1 + blockquote` 样式化 |
| 标题前的眉题 / 上标签 | `# H1` 前的 `::: {.eyebrow}` 围栏分区 |
| 章节内的拉引 | `> 引用`，通过 `h2 ~ blockquote` 与标注区分样式 |
| 网格中的可点击复合卡片 | 将单元格内容包裹在 `[…](/url)` 中，moss 生成一个包含块级子元素的 `<a>` |
| 跨页面重复的内容块 | 提取为 partial（`unlisted: true, nav: false, children: false`），通过 `![[partial-name]]` 转包 |
| 占位符 / 未完成章节 | `> [!pending] 标题` 标注 |

### 不支持的 Markdown 属性语法

以下 Pandoc 风格的属性语法 moss **不支持**：

- `# 标题 {.class}`：标题属性
- `段落\n{.class}`：段落属性
- `---\n{.section-divider}`：水平线属性

请改用 `::: {.class}` 围栏分区或 CSS 元素选择器。
