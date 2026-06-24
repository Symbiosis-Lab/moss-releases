---
title: Write a plugin
uid: 944cabf2
weight: 50
description: Build a JavaScript plugin that hooks into the moss build pipeline — from a minimal working example to the full reference.
translationKey: docs-extend
---

A plugin is a JavaScript bundle you drop into `.moss/plugins/{name}/`. moss finds it automatically, reads its manifest, and calls the hooks it declares at the right stage of every build.

## Minimal working plugin

Start with this layout inside your project:

```
.moss/plugins/my-plugin/
├── manifest.json
├── main.bundle.js
└── icon.svg
```

A `manifest.json` registering one hook:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Does one thing well",
  "author": "Your Name",
  "entry": "main.bundle.js",
  "capabilities": ["enhance"],
  "global_name": "MyPlugin"
}
```

A `main.bundle.js` that exports the hook as a property on the global object named in `global_name`:

```js
window.MyPlugin = {
  async enhance(ctx) {
    return {
      slots: {
        "after-article": "<p>Added by my-plugin.</p>"
      }
    };
  }
};
```

That is a complete plugin. Copy it into `.moss/plugins/my-plugin/`, build, and it runs.

## How the pipeline works

When moss compiles a site, it runs through five stages in order:

```
process → generate → enhance → deploy → syndicate
```

A plugin attaches to one or more stages by listing capability names in `capabilities`. moss calls the matching method on your global object at the right moment, passes a typed context object, and reads the return value.

**process** runs before HTML generation. Use it to fetch external data or transform source files. Multiple plugins can have this capability.

**generate** builds source content into HTML. Only one plugin can have this capability; it replaces moss's built-in generator. Use it to plug in Hugo, Astro, or another SSG backend.

**enhance** injects content into named template slots after HTML is generated. Multiple plugins can have this capability. Use it for comments, analytics, newsletter forms, or any per-page injection.

**deploy** pushes the compiled site to a hosting platform. Only one plugin can have this capability. Use it for GitHub Pages, Netlify, or custom hosting.

**syndicate** distributes published content to external platforms (POSSE). Multiple plugins can have this capability. Use it for cross-posting to Matters.town, Substack, or social media.

The template slots an enhance plugin can target are `head-end`, `after-title`, `before-article-end`, `after-article`, `footer-right`, and `body-end`. Slot positions and the `EnhanceResult` shape are in [[slots]].

## Building the bundle

moss loads `main.bundle.js` as a script tag. Bundle with esbuild as an IIFE so the global object lands on `window`:

```sh
esbuild src/main.ts \
  --bundle \
  --format=iife \
  --global-name=MyPlugin \
  --outfile=main.bundle.js
```

The output file goes directly into `.moss/plugins/my-plugin/`. `global_name` in the manifest must match the `--global-name` flag.

## SDK

Install `@symbiosis-lab/moss-api` for TypeScript types and utilities.

```sh
npm install @symbiosis-lab/moss-api
```

It exports typed context interfaces (`ProcessContext`, `GenerateContext`, `EnhanceContext`, `DeployContext`, `SyndicateContext`), the `HookResult` return type, and utilities like `reportProgress`, `reportError`, and `openBrowser`. Full API docs are at [github.com/Symbiosis-Lab/moss-api/tree/main/docs/api/](https://github.com/Symbiosis-Lab/moss-api/tree/main/docs/api/).

For Rust contributors working on moss itself, the core types are published as `moss-core` on [docs.rs](https://docs.rs/moss-core).

## Reference

Field tables, hook context signatures, slot positions, and CLI flags are in the Reference section. Start with [[manifest]] for the full `manifest.json` field list, then [[hooks]] for context shapes and the plugin runtime lifecycle, [[slots]] for slot positions, and [[cli]] for headless build and automation commands.
