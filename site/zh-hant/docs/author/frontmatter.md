---
title: Frontmatter
uid: a015b9df
weight: 2
description: 控制 moss 處理每個頁面的元資料欄位。
translationKey: docs-author-frontmatter
lang: zh-hant
---

## 什麼是 frontmatter

Frontmatter 是 markdown 檔案最開頭、兩行 `---` 之間的 YAML 區塊。它告訴 moss 這個頁面的標題、日期、可見性等資訊。 ^def-frontmatter

```yaml
---
title: 我的第一篇文章
date: 2024-06-15
description: 給搜尋引擎和列表預覽用的簡短摘要。
---

這裡是正文內容。
```

Frontmatter 不是必填的。沒有 frontmatter 的檔案一樣會變成頁面——moss 會用檔名作為標題。

## 識別

描述頁面本身的欄位。

<!-- auto:start:frontmatter-identity -->
| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `title` | string | 檔名 | 頁面標題 |
| `description` | string | — | SEO 描述，也用於列表預覽 |
| `date` | string | — | 發佈日期（`YYYY-MM-DD`） |
| `tags` | list | — | 內容標籤 |
| `lang` | string | 自動偵測 | 語言覆蓋（`"en"`、`"zh-hans"`、`"zh-hant"`） |
<!-- auto:end:frontmatter-identity -->

## 導覽

控制頁面在網站導覽和介面中如何呈現。

<!-- auto:start:frontmatter-navigation -->
| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `nav` | boolean | 根目錄頁面為 `true` | 是否顯示在頂部導覽列 |
| `weight` | integer | — | 導覽和列表中的排序（數值越小越前面） |
| `breadcrumb` | boolean | 網站預設 | 是否顯示麵包屑導覽 |
| `footer` | boolean | 網站預設 | 是否顯示頁尾 |
<!-- auto:end:frontmatter-navigation -->

## 可見性

參見[結構](/docs/structure/)中對[可見性](/docs/structure/#可見性)的定義。

<!-- auto:start:frontmatter-visibility -->
| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `draft` | boolean | `false` | 完全跳過產生 |
| `unlisted` | boolean | `false` | 產生頁面但不列入列表和 Sitemap |
<!-- auto:end:frontmatter-visibility -->

## 子頁面

這些欄位控制[[structure#^folder-page|資料夾頁面]]如何顯示其子頁面。

<!-- auto:start:frontmatter-children -->
| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `children` | boolean | `true` | 欄目頁是否顯示子頁面列表 |
| `children_style` | string | `"list"` | `"list"`、`"card"` 或 `"summary"` |
| `children_group` | string | `"none"` | 按 `"year"` 分組或 `"none"` |
| `children_depth` | string | `"direct"` | `"direct"`（僅直屬子頁面）或 `"all"`（所有後代） |
| `children_source` | string | — | Wikilink 指向另一個資料夾，顯示其子頁面 |
<!-- auto:end:frontmatter-children -->

卡片佈局會使用每個子頁面 frontmatter 中的 `cover` 圖片。

## 媒體

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `cover` | string | — | 封面圖路徑，用於卡片佈局和頁面標頭 |
| `cover_type` | string | 自動偵測 | `"image"`、`"video"` 或 `"iframe"` |
| `logo` | string | — | 顯示在網站標頭的 Logo 圖片 |

詳見 [[media#封面圖]]。

## 交叉列表

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `also_in` | list | — | 讓文章同時出現在其他資料夾的子頁面列表中 |
| `series` | bool/list | — | 系列宣告——將相關文章按閱讀順序分組 |

`also_in` 讓一篇文章出現在多個欄目中，不需要複製檔案：

```yaml
---
title: 搭建棚架
also_in:
  - projects
  - featured
---
```

## 進階

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `cascade` | map | — | 將設定值向下傳遞給所有後代頁面 |
| `url` | string | 依檔案路徑 | 自訂 URL |
| `translationKey` | string | — | 將不同檔案連結為彼此的翻譯 |
| `uid` | string | 自動產生 | 內容可定址 ID |
| `layout` | string | auto | 範本：`"page"` 或 `"article"` |
| `sidebar` | string | — | Wikilink 指向一個資料夾，作為側邊欄導覽 |
| `review_of` | string | — | 被評論作品的 URL |
| `rating` | integer | — | 評分（1–5） |
| `comments` | boolean | `true` | 是否顯示留言區 |

### Cascade

`cascade` 將 frontmatter 值傳遞給所有後代頁面，省去逐一設定的麻煩：

```yaml
---
title: 文件
cascade:
  breadcrumb: true
  comments: false
---
```

所有子頁面自動繼承這些值，除非在自己的 frontmatter 中覆蓋。
