---
title: CLI
uid: 4def1236
weight: 10
description: Command-line interface for testing and automation.
translationKey: docs-extend-cli
---

## Commands

| Command | Description |
|---------|-------------|
| `moss preview <folder>` | Open folder in preview with file watching and hot reload |
| `moss build <folder>` | Build folder to static site (output in `.moss/build/current/`) |
| `moss build <folder> --serve` | Build and start a local HTTP server |
| `moss build <folder> --watch` | Build and watch for file changes |
| `moss build <folder> --no-plugins` | Build without running plugins |
| `moss import <url> [folder] [-r]` | Convert a live page to markdown |
| `moss deploy <folder>` | Deploy to configured hosting |
| `moss describe --json` | Print every CSS token and frontmatter field as JSON |

## CI and automation

moss works headless (no GUI needed):

```bash
moss build /path/to/folder --no-plugins
```

The build output is a self-contained static site in `.moss/build/current/`: standard HTML, CSS, and JS that can be deployed anywhere. (`.moss/build/current/` is a symlink to the latest build generation under `.moss/build/generations/`.)

## Import

`moss import <url> [folder] [-r]` converts a live page to markdown. Only `http` and `https` URLs are supported. Images land in `assets/imported/`. Pass `-r` to crawl the same domain and path prefix, capped at 200 pages.

Import extracts the content and discards the original CSS, so recreate the look in `.moss/theme/style.css` as a separate step.

## Development

For contributors working on moss itself:

```bash
# Start dev server with hot reload
npm run dev

# Preview a folder via CLI (routes to running dev instance)
npm run moss -- preview ~/Sites/my-blog

# Switch folders without restarting
npm run moss -- preview ~/Sites/other-folder
```

The single-instance plugin routes CLI commands to the running dev instance, enabling rapid folder switching without recompilation.
