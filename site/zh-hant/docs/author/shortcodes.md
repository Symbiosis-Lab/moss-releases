---
title: 短代碼
uid: d765edfa
weight: 3
description: 擴展 markdown 的佈局區塊和元件。
translationKey: docs-author-shortcodes
lang: zh-hant
---

## 什麼是短代碼

短代碼是 markdown 中的特殊區塊，用來建立標準 markdown 做不到的版面和元件——格線、相簿、主圖等。語法是 `:::` 區塊。 ^def-shortcode

```markdown
:::grid 2
第一欄內容。
---
第二欄內容。
:::
```

## Hero

全寬主圖區塊，可搭配背景圖片或影片，以及疊加文字。

```markdown
:::hero
![[panorama.jpg]]
# 歡迎光臨
這是我的小天地。
:::
```

區塊中第一行是媒體引用（wikilink、markdown 圖片或檔名），之後的內容成為疊加文字。

用管道語法控制顯示方式：

```markdown
:::hero
![[mountains.jpg|contain top]]
:::
```

## Grid

多欄佈局。指定欄數，也可以附帶比例。

```markdown
:::grid 3
第一欄。
---
第二欄。
---
第三欄。
:::
```

欄位之間用 `---` 分隔，`grid` 後面的數字是欄數。

**指定比例：**

```markdown
:::grid 2 1:2
窄的側欄。
---
寬的主內容區。
:::
```

**加上自訂 class：**

```markdown
:::grid 3 {.profiles .featured}
成員一。
---
成員二。
---
成員三。
:::
```

### 格線儲存格內容

儲存格能自動辨識和渲染：

- **Wikilink**：`[[folder_name]]` 或 `[[文章標題]]`——渲染為帶封面的卡片
- **Markdown 連結**：`[文字](url)`
- **圖片**：`![alt](path.jpg)` 或 `![[photo.jpg]]`
- **純 URL**：`https://example.com`——自動轉為連結

## Gallery

圖片相簿格線。

```markdown
:::gallery
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
![](photo4.jpg)
:::
```

可以指定欄數：

```markdown
:::gallery 3
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
:::
```

## 目錄

根據頁面標題自動產生目錄。

```markdown
:::toc
:::
```

## Buttons

用 markdown 連結產生一排按鈕。第一個連結是主要按鈕，其餘為次要按鈕。

```markdown
:::buttons
[下載](https://example.com/download)
[查看原始碼](https://github.com/example)
:::
```

## 提示框

醒目的提示區塊，用於備註、警告、小技巧等。語法與 Obsidian 相容：

```markdown
> [!note]
> 這是一個備註提示框。

> [!warning] 注意
> 此操作無法復原。

> [!tip] 小技巧
> 提示框內可以使用 markdown 格式。
```

`[!` 後面的詞設定類型，同一行後面可以加標題。

**所有提示框類型：**

`note`、`tip`、`warning`、`caution`、`important`、`info`、`abstract`、`todo`、`success`、`question`、`failure`、`danger`、`bug`、`example`、`quote`

提示框可以跨多段——空行也用 `>` 開頭：

```markdown
> [!note] 長備註
> 第一段。
>
> 第二段，可以有**粗體**等格式。
```

## 屬性

用 `{.class}` 語法在任何短代碼區塊上加自訂 CSS class：

```markdown
:::grid 2 {.comparison}
之前
---
之後
:::
```

這會在 grid 容器上加上 `comparison` class，你可以在 `style.css` 中以此為選擇器自訂樣式。
