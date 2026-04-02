---
title: Architecture
uid: 140eef3b
weight: 6
description: How the build pipeline works under the hood.
translationKey: architecture
---

moss is a [Tauri v2](https://tauri.app) desktop app. The Rust backend handles compilation — turning markdown files into a complete static website. The TypeScript frontend renders the preview and settings UI. The compiled output is a standard static site: plain HTML, CSS, and JS that works anywhere.

## Two-phase build

When you open a folder, moss runs two phases in sequence.

**Blocking phase** — completes before the preview opens:

1. Scan the folder structure
2. Parse markdown and frontmatter
3. Generate HTML pages
4. Generate CSS, JS, feeds (RSS, sitemap, robots.txt, llms.txt)
5. Open the preview window

**Background phase** — fills in progressively after the preview is visible:

1. Copy static assets (images, files)
2. Transcode video (`.mov` → `.mp4`)
3. Generate thumbnails
4. Resolve external media

The preview opens as soon as the blocking phase completes. Images and video load progressively as the background phase works through them. For most sites the preview is ready in under a second.

## Plugin hooks

Plugins attach to specific stages of the build pipeline. The stage determines when a plugin runs and what data it has access to.

| Stage | When | Example |
|-------|------|---------|
| `process` | Before HTML generation | Matters: extract article metadata |
| `enhance` | After HTML generation | Comments: inject comment sections |
| `deploy` | On deploy action | GitHub: push to repository |
| `syndicate` | After deploy | Matters: cross-post articles |

JavaScript plugins run in a sandboxed environment with access to the compiled output. Native Rust features (comments, analytics, email) hook into the same stages but run inside the main process.

## Internationalization

moss detects the language of each page through a chain of signals, stopping at the first match:

1. `lang` frontmatter field
2. Filename suffix — for example, `about.zh-hans.md`
3. Content detection
4. Site default

**Translation linking** connects pages that are versions of each other in different languages. Two files with the same stem but different language suffixes are linked automatically — `about.md` and `about.zh-hans.md` become translations of each other. For files with different names, set the same `translationKey` in each file's frontmatter. When linked translations exist, a language toggle appears in the page layout automatically.

## Auto-generated files

The blocking phase generates these files alongside your HTML pages:

| File | Condition | Content |
|------|-----------|---------|
| `feed.xml` | `site_url` is set | RSS feed of all articles |
| `sitemap.xml` | `site_url` is set | XML sitemap |
| `robots.txt` | `site_url` is set | Points to sitemap |
| `llms.txt` | Always | Full site content as markdown for LLMs |

`llms.txt` is a plain-text representation of your entire site, formatted for consumption by language models. It is generated unconditionally so that AI tools can index your content without executing JavaScript.

## Source map

Key directories in the moss source tree:

| Directory | Purpose |
|-----------|---------|
| `src-tauri/src/compile/` | Build pipeline |
| `src-tauri/src/compile/generator/` | HTML generation, feeds, media |
| `src-tauri/src/compile/features/` | Native features (comments, email, analytics) |
| `src-tauri/src/i18n/` | Language detection and translation linking |
| `src/` | Frontend (TypeScript) |
| `plugins/` | JavaScript plugin source |
| `packages/moss-api/` | Plugin SDK |

The Rust backend and TypeScript frontend communicate through Tauri's command and event system. The backend emits progress events during the background phase; the frontend listens and updates the preview accordingly.
