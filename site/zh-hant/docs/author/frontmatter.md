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

Frontmatter 不是必填的。沒有 frontmatter 的檔案一樣會變成頁面，moss 會用檔名作為標題。

## 識別

描述頁面本身的欄位。

<!-- auto:start:frontmatter-identity -->
| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `title` | string | 檔名 | 頁面標題 |
| `description` | string | 無 | SEO 描述，也用於列表預覽 |
| `date` | string | 無 | 發佈日期（`YYYY-MM-DD`） |
| `tags` | list | 無 | 內容標籤 |
| `lang` | string | 自動偵測 | 語言覆蓋（`"en"`、`"zh-hans"`、`"zh-hant"`） |
<!-- auto:end:frontmatter-identity -->

`title:` 是頁面標題。在文章頁面上，moss 始終將其渲染為正文上方的 `<h1 class="moss-article-title">`，若 `title:` 缺省則使用檔名（首字母大寫）。如果正文本身以 `# 同名標題` 開頭，該正文 H1 會被自動去重，讀者只看到一個標題，而非兩個。

正文中其他位置的 `# H1` 是章節標題，而非文件標題。moss 不會從正文結構推斷標題，請在 `title:` 中寫明，或依賴檔名。

如需在某篇文章上單獨關閉注入的標題（例如某個特殊設計的著陸頁），可寫 `title: ""`（顯式空字串）。這與省略 `title:` 不同：省略會回退到檔名。資料夾與索引頁面從不注入；它們的正文按作者所寫渲染。

## 導覽

控制頁面在網站導覽和介面中如何呈現。

<!-- auto:start:frontmatter-navigation -->
| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `nav` | boolean | 根目錄頁面為 `true` | 是否顯示在頂部導覽列 |
| `weight` | integer | 無 | 導覽和列表中的排序（數值越小越前面） |
| `breadcrumb` | boolean | 網站預設 | 是否顯示麵包屑導覽 |
| `footer` | boolean | 網站預設 | 是否作為連結出現在網站頁尾 |
| `footer_align` | string | `"left"` | 頁尾連結對齊方式（`"left"` 或 `"right"`） |
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
| `children_source` | string | 無 | Wikilink 指向另一個資料夾，顯示其子頁面 |
<!-- auto:end:frontmatter-children -->

`children_source` 的值是一個 wikilink，例如 `children_source: "[[news]]"`。

卡片佈局會使用每個子頁面 frontmatter 中的 `cover` 圖片。

### 排序

`sort` 控制資料夾的子頁面以何種順序排列,進而決定卡片的外觀。

| 取值 | 排序 | 卡片元資料 |
|---|---|---|
| `date` | 最新在前 | 年 · 月 |
| `weight` | 按 `weight` 整數升冪;未設權重的排到末尾 | (無) |
| `title` | 按標題字母順序 | (無) |
| `[a, b, c]` | 顯式列出的子頁面按列表順序在前,其餘按推斷的排序軸 | (無) |

```yaml
---
title: 專案
sort: title
---
```

未宣告 `sort` 時,moss 從子頁面推斷:

1. 任一子頁面設了 `weight` → `sort: weight`
2. 80% 以上的子頁面有 `date` → `sort: date`
3. 否則 → `sort: title`

因此多數資料夾都不需要宣告 `sort`，部落格資料夾自動是 `date`,帶權重的文件自動是 `weight`,沒有日期的專案集自動是 `title`。

**為什麼排序決定外觀**:日期排序的列表會在每張卡片的元資料槽位顯示日期;權重和標題排序則不渲染元資料槽位(沒有空白佔位)。在非日期排序中,資料夾卡片僅在沒有描述時顯示小字級的「N 篇文章」副標題。

舊的 `order: [...]` 欄位是 `sort: [...]` 的向後相容別名。

## 媒體

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `cover` | string | 無 | 封面圖路徑，用於卡片佈局和頁面標頭 |
| `cover_type` | string | 自動偵測 | `"image"`、`"video"` 或 `"iframe"` |
| `logo` | string | 無 | 顯示在網站標頭的 Logo 圖片 |

詳見 [[media#封面圖]]。

## 版面

控制頁面內文的排版方向和寬度。

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `typesetting` | string | `"horizontal"` | `"horizontal"`（預設）或 `"vertical"`（CJK 右起直排） |
| `content_width` | string | 預設（`67ch`） | `"wide"`（80ch，適合多欄/表格）或 `"full"`（網站最大寬度，適合儀表板） |

也可以在資料夾的 `cascade` 中設定，套用到整個區塊：

```yaml
---
title: 儀表板
cascade:
  content_width: full
---
```

## 交叉列表

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `also_in` | list | 無 | 讓文章同時出現在其他資料夾的子頁面列表中 |
| `series` | boolean | 推斷 | 是否在該資料夾的每個子頁面渲染上一篇/下一篇導覽 |

`also_in` 讓一篇文章出現在多個欄目中，不需要複製檔案：

```yaml
---
title: 搭建棚架
also_in:
  - projects
  - featured
---
```

`series` 控制每篇子文章底部是否顯示上一篇/下一篇導覽。`sort: weight` (或顯式列表) 的資料夾預設開啟，有序的內容通常暗示連續閱讀;`sort: date` 和 `sort: title` 預設關閉。可以顯式覆蓋:

```yaml
# 依權重排序的參考文件,但不想要上一/下一導覽
---
title: 參考
series: false
---
```

也可以在單篇文章自己的 frontmatter 設 `series: false`,讓那一篇退出導覽鏈。

## 進階

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `cascade` | map | 無 | 將設定值向下傳遞給所有後代頁面 |
| `url` | string | 依檔案路徑 | 自訂 URL |
| `translationKey` | string | 無 | 將不同檔案連結為彼此的翻譯 |
| `uid` | string | 自動產生 | 內容可定址 ID |
| `layout` | string | auto | 範本：`"page"` 或 `"article"` |
| `sidebar` | string | 無 | Wikilink 指向一個資料夾，作為側邊欄導覽 |
| `review_of` | string | 無 | 被評論作品的 URL |
| `rating` | integer | 無 | 評分（1–5） |
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
