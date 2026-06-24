---
title: CSS
uid: 0adf0738
weight: 2
description: CSS 變數、深色模式和元件類別名稱。
lang: zh-hant
---

## 自訂樣式表

在專案的 `.moss/theme/` 目錄下建立 `style.css`（moss 在你開啟資料夾時會自動建立 `.moss/theme/`）。moss 會在預設主題之後載入它，所以你的規則直接覆蓋預設值。不需要寫 `!important`，也不需要手寫 `@layer` —— moss 會把你的 `style.css` 放進層疊順序最靠後的 `themes` 層，讓它自然勝出。

```
my-site/
├── .moss/
│   └── theme/
│       └── style.css   ← 自訂 CSS 放這裡
├── index.md
└── ...
```

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
}
```

不需要建置步驟，不需要設定。檔案自動載入。

> [!tip] 探索所有變數
> 執行 `moss describe --json` 可列出全部 `--moss-*` 變數及其亮色／暗色預設值，也可在 `docs/contract/reference.md` 查閱人類可讀的完整參考表。

> [!note] 自行託管字型
> 把 `.woff2` 檔案放在 `.moss/theme/fonts/` 下，在 `style.css` 中用 `@font-face { src: url('fonts/myfont.woff2') }` 引用。`.moss/theme/` 目錄作為網站根目錄的兄弟目錄對外提供。

## 變數

### 字型

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-font-body` | 系統無襯線字型 | 內文字型族 |
| `--moss-font-heading` | 繼承內文 | 標題字型族 |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | 程式碼字型族 |
| `--moss-font-weight-body` | `320` | 內文字重 |
| `--moss-font-heading-weight` | `500` | 標題字重 |
| `--moss-reading-size` | `1.125rem` | 閱讀正文字級 |
| `--moss-reading-size-base` | `1rem` | 基準字級（較小情境） |
| `--moss-size-2xs` | `0.625rem` | 字級刻度 2xs |
| `--moss-size-xs` | `0.75rem` | 字級刻度 xs |
| `--moss-size-sm` | `0.875rem` | 字級刻度 sm |
| `--moss-size-md` | `1rem` | 字級刻度 md |
| `--moss-size-lg` | `1.125rem` | 字級刻度 lg |
| `--moss-size-xl` | `1.25rem` | 字級刻度 xl |
| `--moss-size-2xl` | `1.5rem` | 字級刻度 2xl |
| `--moss-size-3xl` | `1.875rem` | 字級刻度 3xl |

### 顏色

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-color-accent` | `#2d5a2d` | 連結、強調元素 |
| `--moss-color-accent-hover` | 略深於 accent | 懸停狀態強調色 |
| `--moss-color-accent-quiet` | 半透明 accent | 柔和的強調背景 |
| `--moss-color-ui-accent` | `var(--moss-color-accent)` | 導覽列、按鈕等介面控制項色；設為中性色可實現「安靜介面」 |
| `--moss-color-bg` | `#faf8f5` | 頁面背景 |
| `--moss-color-text` | `#2c2825` | 主要文字 |
| `--moss-color-text-secondary` | `#6b6760` | 次要文字（日期、標籤等） |
| `--moss-color-muted` | `#8a8580` | 淡化文字 |
| `--moss-color-surface` | `#f4f1ec` | 卡片和表面背景 |
| `--moss-border-light` | 半透明 | 輕邊框 |
| `--moss-border-medium` | 半透明偏深 | 中等邊框 |

### 版面

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-content-width` | `67ch` | 內容最大寬度 |
| `--moss-content-width-sidebar` | `62ch` | 有側邊欄時的內容寬度 |
| `--moss-nav-width` | `var(--moss-content-width)` | 導覽列和頁尾最大寬度 |
| `--moss-sidebar-width` | `280px` | 側邊欄寬度 |
| `--moss-site-max-width` | `1200px` | 網站最大寬度 |
| `--moss-container-padding` | `clamp(1rem, 5vw, 2rem)` | 容器兩側間距 |

### 間距

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-space-xs` | `0.5rem` | 極小（8px） |
| `--moss-space-sm` | `1rem` | 小（16px） |
| `--moss-space-md` | `1.5rem` | 中（24px） |
| `--moss-space-lg` | `2rem` | 大（32px） |
| `--moss-space-xl` | `3rem` | 極大（48px） |
| `--moss-space-2xl` | `4rem` | 特大（64px） |

## 深色模式

moss 在首次繪製前就已透過一段內嵌腳本讀取 `localStorage["moss-theme"]` 和系統 `prefers-color-scheme`，將 `data-theme` 設定到 `<html>` 上。因此你只需覆寫一個選擇器，就能同時應對主題切換和系統偏好：

```css
:root[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

無需另寫 `@media (prefers-color-scheme: dark)` —— `[data-theme="dark"]` 已涵蓋兩種情境。

## 安靜介面

`--moss-color-ui-accent` 控制導覽列、按鈕等網站控制項的顏色，預設繼承 `--moss-color-accent`。若希望介面控制項保持中性、只讓內容連結顯示強調色，可將其設為文字色：

```css
:root {
  --moss-color-ui-accent: var(--moss-color-text);
}
```

## 元件 class

自動產生的元件使用穩定的 `.moss-*` class 名稱。在 `style.css` 中用這些選擇器自訂樣式。

### 集合格線

| Class | 元素 |
|-------|------|
| `.moss-collection-grid` | 格線容器 |
| `.moss-collection-card` | 個別卡片 |
| `.moss-collection-card-cover` | 封面圖外層 |
| `.moss-collection-card-content` | 封面下方的內容區 |
| `.moss-collection-card-title` | 卡片標題 |
| `.moss-collection-card-count` | 文章數量/副標題 |

### 子頁面摘要

| Class | 元素 |
|-------|------|
| `.moss-child-summary` | 摘要卡片 |
| `.moss-child-summary-row` | Flex 列（正文 + 封面） |
| `.moss-child-summary-body` | 文字內容區 |
| `.moss-child-summary-meta` | 日期或數量 |
| `.moss-child-summary-title` | 標題 |
| `.moss-child-summary-description` | 描述摘錄 |
| `.moss-child-summary-cover` | 側邊封面圖 |

### 文章列表

| Class | 元素 |
|-------|------|
| `.moss-article-listing` | 列表容器 |
| `.moss-article-item` | 個別列表項目 |
| `.moss-prefix-link` | 帶前綴（日期/數量）的連結 |
| `.moss-year-group` | 年份分組標題 |

## 短代碼 class

用 `{.class}` 語法在短代碼區塊上加自訂 class：

```markdown
:::grid 3 {.profiles .featured}
...
:::
```

然後在 CSS 中定位：

```css
.profiles .moss-grid-card {
  border-radius: 50%;
}
```
