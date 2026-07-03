---
lang: zh-hans
translationKey: docs-editors
uid: 3a1f7c20
weight: 20
title: Markdown
url: markdown
description: 用纯文本加少量符号写作，青苔把它排成网页。
---

Markdown 是纯文本加上少量符号：`#` 是标题，`**` 是加粗，`-` 是列表。青苔读取标准 Markdown（CommonMark 与 GitHub 风格），并在此之上支持 Obsidian 风格的 [[Wikilink 与嵌入|wikilink 与嵌入]]、[[短代码|短代码]]和标注。

因为是纯文本，你可以用任何编辑器书写，文件始终留在你自己的电脑上。

## 基础语法

左边是你写的，右边是青苔渲染的结果：

:::grid 2 {.sc-demo}
```markdown
## 小标题

一段普通文字，可以**加粗**或*倾斜*。

- 列表的一项
- 另一项

> 一段引用。

[一个链接](https://example.com)
```
+++
## 小标题

一段普通文字，可以**加粗**或*倾斜*。

- 列表的一项
- 另一项

> 一段引用。

[一个链接](https://example.com)
:::

需要完整的语法速查，可参考 [Markdown 语法速查表](https://www.markdownguide.org/basic-syntax/)，或 [Obsidian 的基础格式语法](https://help.obsidian.md/syntax)——青苔支持的正是这一套。

## 青苔的扩展

在标准 Markdown 之外，青苔还认得几种记号，各有专门的文档：

- **[[Wikilink 与嵌入|Wikilink 与嵌入]]**——用 `[[双方括号]]` 链接和嵌入其他页面与媒体。
- **[[短代码|短代码]]**——用 `:::` 围栏创建多栏、图库、大图等布局。
- **[[Frontmatter|Frontmatter]]**——在文件顶部用 YAML 设置标题、日期、可见性等属性。

## 在哪里写

青苔自带一个所见即所得的 Markdown 编辑器，右键文件夹选择「发布」即可开始。你也可以用任何顺手的外部编辑器，比如 [Obsidian](https://obsidian.md/zh/)、iA Writer、Typora 或 VS Code，青苔会监视文件夹，一保存就更新预览。

各款编辑器与青苔的配合详见英文文档 [Markdown editors](/docs/writing/editors/)。
