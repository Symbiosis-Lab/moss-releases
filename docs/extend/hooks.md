---
title: Hooks
uid: 2d40c48f
weight: 2
description: The plugin lifecycle — five capabilities and their contexts.
translationKey: docs-extend-hooks
---

## Build pipeline

When moss compiles a site, it runs through these stages in order:

```
Scan folder
  → process hooks (pre-generation)
    → generate hook (build HTML)
      → enhance hooks (inject into slots)
        → deploy hook (push to hosting)
          → syndicate hooks (POSSE to platforms)
```

Plugins attach to one or more stages by declaring **capabilities** in their manifest.

## process

Runs before HTML generation. Multiple plugins can have this capability.

Use for: fetching external data, transforming source files, pre-processing content.

**Context passed to the hook:**

| Field | Type | Description |
|-------|------|-------------|
| `project_path` | string | Absolute path to the project folder |
| `moss_dir` | string | Path to `.moss/` directory |
| `project_info` | object | `total_files`, `homepage_file`, `site_name`, `lang` |
| `config` | object | Plugin configuration values |

## generate

Builds or transforms source content into HTML output. **Only one plugin** can have this capability — it replaces moss's built-in generator.

Use for: alternative SSG backends (Hugo, Astro, Jekyll).

**Context:** Same as process, plus `output_dir`, `source_files` (categorized by type), and `site_config`.

## enhance

Injects content into named template slots after HTML is generated. Multiple plugins can have this capability.

Use for: comments, analytics, newsletter forms, custom scripts.

![[slots#Template slots]]

**Returns:** An `EnhanceResult` with slot content:

```typescript
{
  slots: {
    "after-article": "<div class='comments'>...</div>",
    "body-end": "<script src='analytics.js'></script>"
  }
}
```

## deploy

Pushes the compiled site to a hosting platform. **Only one plugin** can have this capability.

Use for: GitHub Pages, Netlify, custom hosting.

**Context:** Includes `site_files` (all compiled output), `deployment` info, and `domain`.

## syndicate

Distributes published content to external platforms (POSSE). Multiple plugins can have this capability.

Use for: cross-posting to Matters.town, Substack, social media.

**Context:** Includes `articles` (published URLs and metadata) and deployment info.

## Plugin runtime

Plugins run in the Tauri webview. The lifecycle:

1. Rust backend sends plugin code and manifest
2. Plugin code injected as a `<script>` tag
3. Plugin creates a global object (e.g., `window.MattersPlugin`)
4. moss calls `onload({ project_path, config })` if defined
5. Hooks are called with their respective contexts
6. Results are sent back to the Rust backend

Console output (`console.log`, `console.warn`, `console.error`) from plugins is forwarded to the moss terminal.

## Plugin modes

How plugins run depends on the compilation mode:

| Mode | Behavior |
|------|----------|
| **Blocking** | `moss compile` — waits for process hooks to complete |
| **NonBlocking** | Preview mode — fires process hooks but doesn't wait |
| **SlotsOnly** | Watch rebuilds — skips process/generate, collects enhance slots only |
| **Skip** | `--no-plugins` — bypasses all plugin hooks |
