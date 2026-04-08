---
title: 文件
uid: 83cf21d9
weight: 1
description: 瞭解如何使用 moss 將資料夾變成網站。
translationKey: docs
lang: zh-hant
---

在 Finder 中右鍵任意資料夾，選擇**用 moss 發佈**。如果資料夾中有 markdown 檔案，你已經擁有了一個網站；如果是空資料夾，moss 會開啟編輯器，幫你建立第一個頁面。

每個 `.md` 檔案變成一個頁面，每個子資料夾變成一個欄目。資料夾中的 `index.md` 是該資料夾的頁面。

```
my-site/
├── index.md        ← 首頁
├── about.md        ← /about/
└── posts/
    ├── index.md    ← /posts/
    └── hello.md    ← /posts/hello/
```

[[media|圖片、影片、筆記本]]放在同一個資料夾中——在 markdown 中引用，moss 處理其餘一切。
