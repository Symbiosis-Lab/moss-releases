---
title: 文件
uid: 83cf21d9
weight: 1
description: 瞭解如何使用 moss 將資料夾變成網站。
translationKey: docs
lang: zh-hant
---

# 文件

安裝 moss 後，右鍵任意資料夾，選擇**用 moss 發佈**即可預覽網站。可以使用 moss 內建編輯器，也可以用[[editors|任何你喜歡的 markdown 編輯器]]。

- 每個資料夾都會變成一個頁面，預設會[[author/frontmatter#子頁面|列出子頁面]]。
  - 滿是[[media|媒體檔案]]的資料夾會變成圖庫。
  - 圖片與影片會自動壓縮並轉檔，適配 Web。
- 每個 `.md` 檔案都會變成一個頁面。
  - URL 由它在資料夾中的路徑決定，除非在 frontmatter 中用 `url` [[author/frontmatter#進階|自訂]]。
  - `index.md`、`readme.md`、`_index.md`、`main.md`，或與資料夾同名的檔案（例如 `recipes/` 裡的 `recipes.md`）會成為[[structure#^folder-page|該資料夾的頁面]]。帶語言後綴的變體，如 `index.zh-hant.md`，同樣有效。
  - 扁平站點根目錄下的 `about.md`（以及 `关于.md` / `關於.md`）會自動出現在導覽列。含子資料夾的組織型站點中，所有根目錄頁面都會出現在導覽列——可透過 frontmatter 中的 [[author/frontmatter#導覽|`nav` 欄位]]控制。
- 引用媒體或 markdown 檔案時，使用相對路徑或直接寫檔名即可，moss 會在檔案樹中找到最匹配的那個。

```
my-site/
├── index.md        ← 首頁
├── about.md        ← /about/
└── posts/
    ├── index.md    ← /posts/
    └── hello.md    ← /posts/hello/
```

準備好之後，可以[[deploy|發佈到 GitHub Pages]]並綁定自己的網域。

建議先看[[structure|結構]]，瞭解檔案、資料夾與 URL 之間的對應關係。
