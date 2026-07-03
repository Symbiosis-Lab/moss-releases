---
lang: zh-hant
translationKey: docs-editors
uid: 4b8d2f6e
weight: 20
title: Markdown
url: markdown
description: 用純文字加少量符號寫作，青苔把它排成網頁。
---

Markdown 是純文字加上少量符號：`#` 是標題，`**` 是粗體，`-` 是列表。青苔讀取標準 Markdown（CommonMark 與 GitHub 風格），並在此之上支援 Obsidian 風格的 [[Wikilink 與嵌入|wikilink 與嵌入]]、[[短代碼|短代碼]]和標註。

因為是純文字，你可以用任何編輯器書寫，檔案始終留在你自己的電腦上。

## 基礎語法

左邊是你寫的，右邊是青苔算圖的結果：

:::grid 2 {.sc-demo}
```markdown
## 小標題

一段普通文字，可以**加粗**或*傾斜*。

- 列表的一項
- 另一項

> 一段引用。

[一個連結](https://example.com)
```
+++
## 小標題

一段普通文字，可以**加粗**或*傾斜*。

- 列表的一項
- 另一項

> 一段引用。

[一個連結](https://example.com)
:::

需要完整的語法速查，可參考 [Markdown 語法速查表](https://www.markdownguide.org/basic-syntax/)，或 [Obsidian 的基礎格式語法](https://help.obsidian.md/syntax)——青苔支援的正是這一套。

## 青苔的擴充

在標準 Markdown 之外，青苔還認得幾種記號，各有專門的文件：

- **[[Wikilink 與嵌入|Wikilink 與嵌入]]**——用 `[[雙方括號]]` 連結和嵌入其他頁面與媒體。
- **[[短代碼|短代碼]]**——用 `:::` 圍欄建立多欄、圖庫、大圖等版面。
- **[[Frontmatter|Frontmatter]]**——在檔案頂部用 YAML 設定標題、日期、可見性等屬性。

## 在哪裡寫

青苔自帶一個所見即所得的 Markdown 編輯器，在資料夾上按右鍵選擇「發佈」即可開始。你也可以用任何順手的外部編輯器，比如 [Obsidian](https://obsidian.md/zh/)、iA Writer、Typora 或 VS Code，青苔會監看資料夾，一儲存就更新預覽。

各款編輯器與青苔的配合詳見英文文件 [Markdown editors](/docs/writing/editors/)。
