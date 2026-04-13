---
title: Extend
uid: 944cabf2
weight: 7
description: Build plugins that hook into the build pipeline.
translationKey: docs-extend
---

Plugins are JavaScript bundles in `.moss/plugins/{name}/`. They attach to [[hooks|five stages of the build pipeline]] — transforming content, injecting into [[slots|template slots]], deploying, or syndicating.

Each plugin has a [[manifest]] describing its capabilities and configuration.

```
.moss/plugins/my-plugin/
├── manifest.json
├── main.bundle.js
└── icon.svg
```
