---
lang: zh-hant
translationKey: docs-author-frontmatter
uid: a015b9df
weight: 30
url: frontmatter
description: 在檔案頂端用幾行 YAML 設定頁面與網站的屬性。
---

Frontmatter 是 markdown 檔案最頂端、兩行 `---` 之間的一段 YAML，用來告訴青苔這個頁面的標題、日期、可見性等資訊。

```yaml
---
title: 我的第一篇文章
date: 2024-06-15
description: 列表預覽與搜尋引擎用的簡短摘要。
---

下面是正文。
```

Frontmatter 是選用的。沒有它，檔案照樣成為頁面，青苔用檔名當標題。青苔只認得下面列出的欄位，其他自訂欄位會被忽略。

## 用標題命名檔案

每個檔案名稱預設成為頁面標題：`隱私.md` 標題為「隱私」。 `title: 隱私說明` 則覆寫原來的標題。

當檔名含中文或空格時，用 `url:` 釘一個簡短、穩定的網址：`隱私.md` 加 `url: privacy`，就發佈在 `/privacy`。檔名給整理資料夾的你看，`url:` 才是讀者看到的位址；釘住它，重新命名檔案也不會讓連結失效。

## 常用欄位

**識別**——描述頁面本身。

| 欄位 | 作用 |
|------|------|
| `title` | 頁面標題（覆寫取自檔名的標題） |
| `description` | 列表預覽與 SEO 摘要 |
| `date` | 發佈日期（`YYYY-MM-DD`） |
| `tags` | 內容標籤 |

**導覽與可見性**——控制頁面出現在哪裡。

| 欄位 | 作用 |
|------|------|
| `nav` | 是否出現在頂部導覽列（根目錄頁面預設 `true`） |
| `weight` | 導覽和列表中的排序，數值越小越靠前 |
| `draft` | `true` 則完全不產生 |
| `unlisted` | 產生，但不出現在列表和 sitemap 中 |

**欄目與媒體**——資料夾頁面如何展示子頁面。

| 欄位 | 作用 |
|------|------|
| `children` | 是否列出子頁面（預設 `true`，設 `false` 關閉） |
| `children_style` | `list`、`card` 或 `summary` |
| `sort` | `date`、`weight`、`title`，或明確列出順序 |
| `cover` | 卡片和頁首用的封面圖 |

多數資料夾無需宣告 `sort`：青苔會自動推斷——有日期的按日期，有權重的按權重，其餘按標題。

## 多語言網站

青苔支援英文（`en`）、簡體中文（`zh-hans`）和繁體中文（`zh-hant`）。任一種都可作為預設語言，其餘會出現在頁面頂部的語言切換按鈕裡。

**每種語言一個資料夾**：把譯文放進以語言命名的子資料夾。

```
my-site/
├── index.md          ← 預設語言
├── zh-hans/
│   └── index.md      ← 簡體中文
└── zh-hant/
    └── index.md      ← 繁體中文
```

當兩個語言版本的檔名不同時，用 `translationKey` 把它們關聯起來，語言切換按鈕才知道彼此對應：

```yaml
# posts/hello.md          # posts/你好.md
---                       ---
translationKey: hello     translationKey: hello
---                       lang: zh-hans
                          ---
```

## 完整欄位

`cascade`、`series`、`also_in`、`content_width`、`typesetting`、`sidebar` 等進階欄位，以及每個欄位的類型與預設值，見英文參考 [Frontmatter](/docs/writing/frontmatter/)。
