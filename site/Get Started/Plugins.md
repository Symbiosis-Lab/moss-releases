---
description: Write plugins in JavaScript that hook into moss's build pipeline and extend what moss and your site can do.
uid: 1bcf1f9b
title: Extend your site with plugins
translationKey: docs-extend
weight: 70
url: extend
---

A plugin is just a JavaScript package in `.moss/plugins/<name>/`. moss discovers it automatically, reads its manifest, and calls the hooks it declares at the right stage of every build.

```
.moss/plugins/my-plugin/
├── manifest.json     ← describes what the plugin can do and how it's configured
├── main.bundle.js    ← the plugin code
└── icon.svg
```

## Hooks

Plugins tap into each stage of the build pipeline through **hooks**: transforming content, injecting content into templates, deploying, and syndicating outward. Declare the hooks you use in the manifest, and moss calls your code at the matching stage.

```json
{
  "name": "my-plugin",
  "hooks": ["transform"]
}
```

## Slots

**Slots** are reserved spots in the templates — the header, footer, sidebar, and so on. A plugin can inject HTML into a slot, adding custom elements to your pages without changing the theme.

## moss-api

At runtime, a plugin can call **moss-api** to read site content, access configuration, and register deploy channels. It's the interface between your plugin and moss.

## Going deeper

For a minimal working plugin, the full hook list, slots, the manifest format and the CLI, see [Write a plugin](/docs/extend/) and the reference pages for [Hooks](/docs/reference/hooks/), [Slots](/docs/reference/slots/), [Manifest](/docs/reference/manifest/) and [CLI](/docs/reference/cli/).
