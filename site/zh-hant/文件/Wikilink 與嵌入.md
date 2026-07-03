---
lang: zh-hant
translationKey: docs-author-links
uid: 6ae0fb4a
weight: 40
title: Wikilink 與嵌入
url: links
description: 用雙方括號連結頁面、嵌入內容、引用媒體——不必填寫路徑。
---

Wikilink 是青苔中引用任何東西的通用方式：`[[雙方括號]]` 裡寫檔名、標題或媒體名稱，青苔會在整個內容樹中查找並解析，你不必寫相對路徑。

## 連結頁面

```markdown
詳見 [[Frontmatter]] 頁面。
```

青苔會依檔名、標題和網址來比對。常見變體：

| 寫法 | 作用 |
|------|------|
| `[[Frontmatter\|頁面屬性]]` | 自訂顯示文字（豎線後是讀者看到的文字） |
| `[[Frontmatter#常用欄位]]` | 連結到某個標題 |
| `[[Frontmatter#^intro]]` | 連結到某個段落（區塊引用） |

在段落末尾加上 `^intro`，就能給它一個穩定的區塊 ID，之後在別處用 `[[頁面#^intro]]` 引用。

## 嵌入

在方括號前加 `!`，就把目標內容**內聯**到當前頁面，而不只是連結：

| 寫法 | 嵌入內容 |
|------|---------|
| `![[Frontmatter]]` | 整個頁面 |
| `![[Frontmatter#常用欄位]]` | 某個章節 |
| `![[Frontmatter#^intro]]` | 某個段落 |
| `![[相簿/]]` | 一個資料夾的子頁面，渲染成卡片 |

路徑以 `/` 結尾表示資料夾。資料夾嵌入可帶參數：`![[相簿/|limit:5,more]]` 只顯示最新 5 項並追加「更多 →」連結。

## 媒體

圖片、影片等檔案放進資料夾，用 wikilink 或標準 markdown 引用即可，青苔會自動解析路徑、最佳化檔案、產生佔位背景避免載入時跳動。

```markdown
![[sunset.jpg]]
![日落時的海岸](photos/sunset.jpg)
```

第二種寫法方括號內的文字會成為圖片下方的**圖說**：圖片單獨成段時，青苔按 Pandoc 慣例把它包成 `<figure>`，圖說預設置中、斜體。wikilink 寫法也可以加圖說——`![[sunset.jpg|日落時的海岸]]`。圖說同時供螢幕閱讀器和搜尋引擎使用；不寫文字（`![[sunset.jpg]]`）則不產生圖說。

支援的媒體：

- **圖片**——`.jpg`、`.png`、`.gif`、`.svg`、`.webp`、`.avif`
- **影片**——`.mov` 自動轉碼為 `.mp4`，引用時用原始檔名即可
- **筆記本**——`.ipynb` 透過 JupyterLite 直接在瀏覽器中執行，不需要伺服器
- **HTML**——`.html` 檔案原樣提供，用於互動內容

把媒體放進被排除的資源資料夾（`assets/`、`images/`、`static/`、`public/`），它們會對外提供但不作為頁面。

### 控制顯示

在檔名後用豎線追加參數，控制圖片的尺寸、填充與定位：

```markdown
![[cover.jpg|400]]           # 寬 400px
![[cover.jpg|100%]]          # 寬 100%
![[cover.jpg|200x150]]       # 寬 × 高
![[headshot.jpg|cover top]]  # 填充方式 + 定位
```

**尺寸**：寫寬度或「寬×高」，單位支援 `px`（預設）、`%`、`vh`，如 `400`、`100%`、`200x150`。

**填充方式**（對應 CSS `object-fit`）：`cover`（預設，填滿並裁切）、`contain`（完整展示）、`fill`、`none`、`scale-down`。**定位**：`center`、`top`、`left`、`bottom-right` 等。

一條豎線只表達一種意思——尺寸、填充定位、或圖說，三者不在同一條豎線裡混用。

## 深入了解

解析優先序、循環嵌入處理、封面圖、`children_source` 等細節，見英文文件 [Links & Embeds](/docs/writing/wikilinks-and-embeds/) 與 [Media](/docs/writing/media/)。
