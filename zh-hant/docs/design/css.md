---
title: CSS
uid: 0adf0738
weight: 2
description: CSS 變數、深色模式和元件類別名稱。
translationKey: docs-design-css
lang: zh-hant
---

## 自訂樣式表

在專案根目錄建立 `style.css`。moss 會在預設主題之後載入它，所以你的規則直接覆蓋預設值。

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
}
```

不需要建置步驟，不需要設定。檔案自動載入。

## 變數

### 字型

<!-- auto:start:css-typography -->
| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-font-body` | 系統無襯線字型 | 內文字型 |
| `--moss-font-heading` | 繼承內文 | 標題字型 |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | 程式碼字型 |
| `--moss-font-serif` | Iowan Old Style, 襯線字型 | 襯線字型（用於字型切換） |
| `--moss-font-size-base` | `1.125rem` | 基準字級 |
| `--moss-font-weight` | `320` | 預設字重 |
<!-- auto:end:css-typography -->

### 顏色

<!-- auto:start:css-colors -->
| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-color-accent` | `#2d5a2d` | 連結、強調元素 |
| `--moss-color-bg` | `#faf8f5` | 頁面背景 |
| `--moss-color-text` | `#2c2825` | 主要文字 |
| `--moss-color-muted` | `#8a8580` | 次要/淡化文字 |
| `--moss-color-surface` | `#f4f1ec` | 卡片和表面背景 |
<!-- auto:end:css-colors -->

### 版面

<!-- auto:start:css-layout -->
| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-content-width` | `67ch` | 內容最大寬度 |
| `--moss-content-width-sidebar` | `62ch` | 有側邊欄時的內容寬度 |
| `--moss-nav-width` | `var(--moss-content-width)` | 導覽列和頁尾最大寬度 |
| `--moss-sidebar-width` | `280px` | 側邊欄寬度 |
| `--moss-site-max-width` | `1200px` | 網站最大寬度 |
| `--moss-container-padding` | `clamp(1rem, 5vw, 2rem)` | 容器兩側間距 |
<!-- auto:end:css-layout -->

### 間距

<!-- auto:start:css-spacing -->
| 變數 | 預設值 | 說明 |
|------|--------|------|
| `--moss-space-xs` | `0.5rem` | 極小（8px） |
| `--moss-space-sm` | `1rem` | 小（16px） |
| `--moss-space-md` | `1.5rem` | 中（24px） |
| `--moss-space-lg` | `2rem` | 大（32px） |
| `--moss-space-xl` | `3rem` | 極大（48px） |
| `--moss-space-2xl` | `4rem` | 特大（64px） |
<!-- auto:end:css-spacing -->

## 深色模式

深色模式自動跟隨系統偏好。用以下選擇器自訂深色模式：

```css
[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

## 元件 class

自動產生的元件使用穩定的 `.moss-*` class 名稱。在 `style.css` 中用這些選擇器自訂樣式。

### 集合格線

<!-- auto:start:component-classes -->
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
<!-- auto:end:component-classes -->

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
