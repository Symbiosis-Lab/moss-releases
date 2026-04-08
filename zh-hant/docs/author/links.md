---
title: 連結與嵌入
uid: 6ae0fb4a
weight: 4
description: Wikilink、嵌入、交叉引用和雙語內容。
translationKey: docs-author-links
lang: zh-hant
---

## Wikilink

用雙括號連結網站中的任何頁面：

```markdown
詳見 [[structure]] 頁面。
```

moss 會用文字去比對檔名、標題和 slug 來解析連結。不需要寫完整路徑——`[[getting-started]]` 能自動找到 `docs/start/getting-started.md`。

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

- **整頁**：`![[media]]`——嵌入整個頁面的內容
- **章節**：`![[structure#URL]]`——嵌入該標題下的所有內容
- **區塊**：`![[structure#^intro]]`——嵌入標記了區塊 ID 的單一段落

moss 會偵測循環嵌入，在形成無限迴圈之前停止。

## 區塊引用

在任何段落末尾加上 `^block-id` 作為標記：

```markdown
moss 將資料夾變成網站。 ^intro
```

其他頁面可以用 `[[page#^intro]]` 連結到這個段落，或用 `![[page#^intro]]` 嵌入它。區塊 ID 是穩定的——改寫段落內容或修改上方標題都不會影響它。

## Markdown 連結

標準 markdown 連結照常使用：

```markdown
[造訪範例](https://example.com)
[關於頁面](about.md)
[章節連結](/docs/structure/)
```

相對路徑和絕對路徑都可以。外部連結自動在新分頁開啟。

## 雙語內容

在檔名後加語言後綴就能建立翻譯：

| 檔案 | 語言 |
|------|------|
| `about.md` | 網站預設語言 |
| `about.zh-hans.md` | 簡體中文 |
| `about.zh-hant.md` | 繁體中文 |
| `about.en.md` | 英文（明確指定） |

存在翻譯時，頁面上會自動出現語言切換按鈕。

### 語言偵測

moss 按以下順序判斷頁面語言：

1. frontmatter 中的 `lang` 欄位
2. 檔名後綴（`.zh-hans.md`）
3. 內容自動偵測
4. 網站預設語言

### 不同檔名的翻譯

如果翻譯使用了不同的檔名，用 `translationKey` 把它們連結起來：

```yaml
# posts/hello.md
---
translationKey: hello-post
---

# posts/ni-hao.md
---
translationKey: hello-post
lang: zh-hans
---
```

兩個檔案會顯示語言切換按鈕，互相連結。
