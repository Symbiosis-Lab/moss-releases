---
title: 扩展
uid: 899d9f98
weight: 7
description: 构建接入编译流程的插件。
translationKey: docs-extend
lang: zh-hans
---

插件是 `.moss/plugins/{name}/` 中的 JavaScript 包。它们接入[[hooks|编译流程的五个阶段]]——转换内容、注入[[slots|模板插槽]]、部署、分发。

每个插件有一个描述其能力和配置的 [[manifest]]。

```
.moss/plugins/my-plugin/
├── manifest.json
├── main.bundle.js
└── icon.svg
```
