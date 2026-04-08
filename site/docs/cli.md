---
title: CLI Reference
uid: 239fcc32
weight: 7
description: Command-line interface for moss.
---

## Commands

| Command | Description |
|---------|-------------|
| `moss preview <folder>` | Open folder in preview with file watching and hot reload |
| `moss compile <folder>` | Compile folder to static site (output in `.moss/site/`) |
| `moss compile <folder> --serve` | Compile and start a local HTTP server |
| `moss compile <folder> --watch` | Compile and watch for file changes |
| `moss compile <folder> --no-plugins` | Compile without running plugins |
| `moss deploy <folder>` | Deploy to configured hosting (e.g., GitHub Pages) |

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

The single-instance plugin routes CLI commands to the running dev instance.

## For AI Agents

moss works headless for CI and automation:

```bash
./moss compile /path/to/folder --no-plugins
```

The compiled output is a self-contained static site in `.moss/site/` — standard HTML, CSS, and JS.
