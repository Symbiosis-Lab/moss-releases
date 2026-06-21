---
title: Wikilink 與嵌入
uid: 6ae0fb4a
weight: 3
description: 連結頁面、嵌入章節、引用段落。
translationKey: docs-author-links
lang: zh-hant
---

## Wikilink

用雙括號連結網站中的任何頁面：

```markdown
詳見 [[structure]] 頁面。
```

moss 會用文字去比對檔名、標題和 slug 來解析連結。不需要寫完整路徑，`[[from-matters]]` 能自動找到 `docs/start/from-matters.md`。

**自訂顯示文字：**

```markdown
參考 [[structure|內容結構說明]]。
```

**連結到標題：**

```markdown
看 [[structure#URL]] 的說明。
```

**連結到區塊引用：**

```markdown
如 [[structure#^intro]] 所述。
```

### 解析規則

當多個檔案可能匹配時，moss 依以下順序選擇：

1. 完全符合的檔名
2. 去掉副檔名後的檔名
3. 資料夾筆記（與資料夾同名的檔案）
4. 目錄距離優先（離當前頁面最近的檔案勝出）

## 嵌入

在雙括號前加 `!`，將其他頁面的內容內嵌到當前頁面：

```markdown
![[structure#^intro]]
```

這會把被引用的段落直接插入當前頁面。嵌入支援：

- **整頁**：`![[media]]`，嵌入整個頁面的內容
- **章節**：`![[structure#URL]]`，嵌入該標題下的所有內容
- **區塊**：`![[structure#^intro]]`，嵌入標記了區塊 ID 的單一段落
- **資料夾列表**：`![[journal/]]`，把另一個資料夾的子頁面當卡片內嵌（見下）

moss 會偵測循環嵌入，在形成無限迴圈之前停止。

## 資料夾列表

路徑以 `/` 結尾的 wikilink 會把資料夾的子頁面內聯渲染為卡片:

```markdown
# 威廉·布雷克的筆記

讀書與寫作的個人記錄。

## 近期日誌

![[journal/|limit:5,more]]

## 書目
```

結尾的斜線表示這是資料夾,不是單一頁面。卡片繼承目標資料夾的 `sort`（見 [[frontmatter#排序]]）：帶日期的 `journal/` 會按日期排序，沒有日期的 `projects/` 會按標題字母排序。

**管道參數**(逗號分隔):

| 參數 | 含義 |
|---|---|
| `limit:N` | 最多渲染 N 項 |
| `more` | 截斷時在末尾追加跳轉到來源資料夾的「更多 →」連結 |
| `sort:date` / `sort:weight` / `sort:title` | 僅在此嵌入處覆蓋來源資料夾的排序軸 |

範例:

```markdown
![[journal/]]                       # 完整列表
![[journal/|limit:5]]               # 最新 5 條(具體看 journal 的排序)
![[journal/|limit:5,more]]          # 最新 5 條 + 「更多 →」連結
![[news/|sort:date,limit:3]]        # 暫時切換排序軸
```

路徑解析規則與其他 wikilink 相同:相對路徑以當前頁面所在資料夾為基準,絕對路徑(`/journal/`)以網站根目錄為基準。

### 何時用資料夾列表,何時用 `children_source`

把另一個資料夾的子頁面渲染到本頁有兩種方式:

| 機制 | 適用情境 |
|---|---|
| 行內 `![[folder/]]` wikilink | 同一頁有多個嵌入,或想讓列表出現在其他 markdown 段落之間。作者決定每個列表的位置。 |
| frontmatter 中的 `children_source: "[[folder]]"` | 整頁只有一個主列表:本頁本身就是另一資料夾的列表。位置由主題決定。 |

多數頁面只有一個主列表時,frontmatter 中的 `children_source` 是合適選擇。當列表要混在其他內容之間時,使用 `![[folder/]]`。

## 區塊引用

在任何段落末尾加上 `^block-id` 作為標記：

```markdown
moss 將資料夾變成網站。 ^intro
```

其他頁面可以用 `[[page#^intro]]` 連結到這個段落，或用 `![[page#^intro]]` 嵌入它。區塊 ID 是穩定的，改寫段落內容或修改上方標題都不會影響它。

## Markdown 連結

標準 markdown 連結照常使用：

```markdown
[造訪範例](https://example.com)
[關於頁面](about.md)
[章節連結](/docs/structure/)
```

相對路徑和絕對路徑都可以。外部連結自動在新分頁開啟。

多語言相關內容（`translationKey`、語言樹、自動語言切換按鈕）已搬到 [[../multilingual|多語言網站]]。
