---
title: 插槽
uid: 1a6353cb
weight: 3
description: 範本注入點與增強階段。
translationKey: docs-extend-slots
lang: zh-hant
---

## 範本插槽

插槽是 HTML 範本中的具名注入點，外掛可以在這些位置插入內容。共有六個插槽： ^def-template-slots

| 插槽 | 位置 |
|------|------|
| `head-end` | `</head>` 之前——用於樣式表和 meta 標籤 |
| `after-title` | 文章標題和日期之後 |
| `before-article-end` | `</article>` 之前 |
| `after-article` | `</article>` 之後——用於留言、相關文章 |
| `footer-right` | 頁尾內部 |
| `body-end` | `</body>` 之前——用於指令碼和追蹤碼 |

## 運作方式

產生 HTML 時，moss 在每個插槽位置寫入 HTML 註解標記：

```html
<article>
  <h1>頁面標題</h1>
  <!-- slot:after-title -->
  <p>內容…</p>
  <!-- slot:before-article-end -->
</article>
<!-- slot:after-article -->
```

在**增強階段**，每個擁有 `enhance` 能力的外掛回傳要填入的插槽內容。moss 用外掛內容取代標記。未被填入的標記會從最終輸出中移除——不會出現在發佈的 HTML 中。

多個外掛可以寫入同一個插槽，內容按外掛載入順序串接。

## EnhanceResult

enhance 掛鉤回傳一個將插槽名稱對應到 HTML 字串的物件：

```typescript
async enhance(ctx) {
  return {
    slots: {
      "after-article": `<section class="comments">
        <script src="https://comments.example/embed.js"></script>
      </section>`,
      "head-end": `<link rel="stylesheet" href="/comments.css">`
    }
  };
}
```

只需包含你的外掛需要的插槽。省略的插槽留給其他外掛填入，或者被移除。

## 零閃爍預覽

預覽時，moss 在每次檔案變更後重新建置網站。為避免重建過程中預覽畫面閃爍：

1. 新的輸出建置到 `.moss/site-stage/`
2. 預覽伺服器原子性地將指標切換到 `site-stage/`
3. 暫存內容複製到 `.moss/site/`（正式目錄）
4. 指標切回 `.moss/site/`

預覽伺服器絕不會從建置到一半的目錄提供內容。切換是瞬間完成的——是指標更新，不是檔案搬移。
