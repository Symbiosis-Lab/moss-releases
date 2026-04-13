---
title: JavaScript
uid: 394ab4ea
weight: 3
description: 自訂指令碼、資料屬性和 DOM 結構。
translationKey: docs-design-javascript
lang: zh-hant
---

## 自訂指令碼

在專案根目錄建立 `script.js`。moss 會在所有內建指令碼之後載入它，所以你的程式碼執行時 DOM 已經就緒。

```javascript
// script.js
document.querySelectorAll('.moss-collection-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
```

不需要建置步驟。每個頁面都會自動載入這個檔案。

## 資料屬性

moss 會在 HTML 元素上設定資料屬性，你可以讀取它們或用來定位樣式。

| 屬性 | 元素 | 值 | 用途 |
|------|------|-----|------|
| `data-theme` | `<html>` | `"light"`、`"dark"` | 目前的色彩主題 |
| `data-moss-preview` | `<body>` | 有/無 | 在預覽模式下設定 |
| `data-comments` | `<article>` | `"true"`、`"false"` | 是否啟用留言 |
| `data-source-line` | 標題、段落 | 行號 | 原始 markdown 行號（開發輔助） |
| `data-content-width` | `<article>` | `"wide"` | 內容寬度覆蓋 |

### 偵測主題

```javascript
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
```

## DOM 結構

產生的 HTML 在所有頁面中遵循一致的結構。

```
<html data-theme="light">
  <body>
    <nav class="main-nav">
      <div class="nav-content">...</div>
    </nav>
    <main class="container">
      <article>
        <h1 class="article-title">...</h1>
        <div class="article-meta">
          <time class="article-date">...</time>
        </div>
        <!-- 頁面內容 -->
      </article>
    </main>
    <footer class="moss-colophon">...</footer>
  </body>
</html>
```

**可以掛接的主要元素：**

| 選擇器 | 說明 |
|--------|------|
| `.main-nav` | 頂部導覽列 |
| `.container` | 主內容外層 |
| `article` | 頁面內容區 |
| `.article-title` | 頁面標題 |
| `.article-meta` | 日期和元資料 |
| `.moss-colophon` | 頁尾 |

**可以安全修改的部分：** `article` 和 `.moss-colophon` 內部的所有內容。導覽列結構由 moss 管理——可以加樣式，但不要移除或重新排列其子元素。
