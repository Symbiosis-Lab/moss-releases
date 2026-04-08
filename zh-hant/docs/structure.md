---
title: 結構
uid: b70c96c6
weight: 2
description: 檔案與資料夾如何變成頁面、欄目和導覽。
translationKey: docs-structure
lang: zh-hant
---

資料夾裡的每個 `.md` 檔案都會變成一個頁面，每個子資料夾變成一個欄目。不需要任何設定——在 moss 中開啟資料夾，網站結構已經成形。

## 資料夾頁面

資料夾中的 `index.md` 就是該資料夾的頁面。造訪資料夾的 URL 時，看到的就是它。

moss 依序辨識以下檔案名稱作為資料夾頁面：

1. `index.md`
2. `readme.md`
3. `_index.md`
4. `main.md`

不區分大小寫：`README.md`、`Index.md`、`MAIN.md` 皆可。 ^folder-page

與父資料夾同名的檔案也會被視為資料夾頁面：

```
recipes/
├── recipes.md   ← 資料夾頁面（與資料夾同名）
├── pasta.md
└── soup.md
```

若資料夾中沒有 `index.md`，moss 會自動產生一個欄目頁，列出資料夾中的所有內容。

根資料夾的 `index.md` 就是你的**首頁**——網站的封面。

```
my-site/
├── index.md        ← 首頁
├── about.md
└── posts/
    ├── index.md    ← /posts/ 的欄目頁
    ├── hello.md
    └── world.md
```

## URL

檔案路徑決定頁面的 URL。moss 去掉副檔名，加上結尾斜線，產生乾淨的 URL：

| 檔案 | URL |
|------|-----|
| `index.md` | `/` |
| `about.md` | `/about/` |
| `posts/index.md` | `/posts/` |
| `posts/hello.md` | `/posts/hello/` |
| `docs/getting-started.md` | `/docs/getting-started/` |

在 frontmatter 中用 `url` 欄位可以自訂任意頁面的 URL：

```yaml
---
title: Hello World
url: /blog/2024/hello/
---
```

## 可見性

頁面有三種可見性層級：

| 設定 | 產生 | 列表中可見 | 收錄進 Sitemap |
|------|------|-----------|---------------|
| _(預設)_ | 是 | 是 | 是 |
| `unlisted: true` | 是 | 否 | 否 |
| `draft: true` | 否 | 否 | 否 |

在 frontmatter 中設定：

```yaml
---
title: 撰寫中
draft: true
---
```

資料夾名稱以 `_` 開頭則完全排除在處理之外：

```
my-site/
├── _drafts/      ← moss 忽略
├── _templates/   ← moss 忽略
└── posts/        ← 正常處理
```

## 排序

在任意欄目中，內容按以下規則排列：

1. 子資料夾在前，按字母排序
2. 有 `date` 的檔案，最新的排在前面
3. 沒有 `date` 的檔案，按字母排序

用 `weight` 覆蓋預設排序——數值越小越靠前，優先於日期排序：

```yaml
---
title: 置頂文章
weight: 1
---
```

## 導覽

網站根目錄的頁面會自動出現在頂部導覽列。用兩個 frontmatter 欄位控制：

```yaml
---
title: 關於
nav: true       # 顯示在導覽列（根目錄頁面預設為 true）
weight: 2       # 導覽中的位置（數值越小越靠左）
---
```

不想顯示在導覽中：

```yaml
---
title: 隱藏頁面
nav: false
---
```

根目錄的資料夾，只要 index.md 設了標題，就會作為導覽項目出現。
