---
title: 擴充
uid: de3a9595
weight: 7
description: 建構接入編譯流程的外掛。
translationKey: docs-extend
lang: zh-hant
---

外掛是 `.moss/plugins/{name}/` 中的 JavaScript 套件。它們接入[[hooks|編譯流程的五個階段]]——轉換內容、注入[[slots|範本插槽]]、部署、分發。

每個外掛有一個描述其能力和設定的 [[manifest]]。

```
.moss/plugins/my-plugin/
├── manifest.json
├── main.bundle.js
└── icon.svg
```
