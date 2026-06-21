---
title: Markdown editors
uid: 9e3a4f72
weight: 6
description: Which markdown editor pairs well with moss: Obsidian, iA Writer, Typora, VS Code, and the new wave.
translationKey: docs-editors
---

# Markdown editors

> moss watches your folder of `.md` files and rebuilds the preview the moment they change. Use the built-in moss editor or any markdown editor you like; these pair especially well.

## What to look for

Three things make an editor a good moss companion:

- **It edits a folder of plain `.md` files.** No proprietary database, no required cloud account. moss reads what you save and rebuilds the live preview.
- **It speaks the Obsidian dialect.** Wikilinks `[[page]]`, embeds `![[file]]`, callouts `> [!note]`, YAML frontmatter. moss is designed around these conventions; see [[author/wikilinks-and-embeds]] and [[author/callouts]].
- **It preserves frontmatter round-trip.** Saves shouldn't reorder YAML keys, change quoting, or strip comments.

The closer an editor follows these, the less friction you feel switching between it and moss.

## Strongly recommended

### Obsidian

[Obsidian](https://obsidian.md) is the markdown editor moss is designed to live alongside. It edits a folder of plain `.md` files (called a "vault"), and supports the full Obsidian dialect: wikilinks with aliases and heading anchors (`[[page|display]]`, `[[page#heading]]`, `[[page#^block]]`), embeds for notes/images/audio/video/PDF, callouts with foldable variants, YAML frontmatter exposed as a typed Properties UI, MathJax for math, and Mermaid in code fences.

**Platforms:** macOS, Windows, Linux, iOS, iPadOS, Android.
**Pricing:** Free, including for commercial use. Optional paid Sync ($4/mo) and Publish ($8/mo).
**2026:** Active. Bases (database views on Properties), a built-in CLI, image resizing, and a refreshed plugin marketplace shipped through 1.10–1.12.

Point Obsidian at the same folder you publish with moss and you have a complete writing-and-publishing loop with zero extra mapping.

## Good fit

### iA Writer

[iA Writer](https://ia.net/writer) is the calmest writing surface of the bunch: plain `.md` files, focus mode, library of named locations. Wikilinks `[[page]]` with autocomplete and aliases work; embeds use iA Writer's own **Content Blocks** syntax (a file path on its own line) rather than `![[file]]`, so moss-side `![[…]]` appears as raw text in iA Writer's preview. No native callouts, math, or Mermaid.

Best for writers who want quiet authoring and accept that moss-specific syntax will only render in moss's preview. macOS / Windows / iOS / iPadOS, one-time purchase per platform.

### Typora

[Typora](https://typora.io) is true in-place WYSIWYG: markdown renders as you type, no split view. Strong on math (MathJax 4) and diagrams (Mermaid 11.13, including Venn and Ishikawa as of 1.13). GitHub-style callouts can be enabled in preferences. YAML frontmatter is recognized.

The gap is wikilinks: `[[page]]` is not native and won't autocomplete, so the link graph that moss leans on has to be typed manually. Best as a secondary editor for math- or diagram-heavy pages. macOS / Windows / Linux, $14.99 one-time for three devices.

### Tolaria

[Tolaria](https://tolaria.md) is a newer block-based editor with Notion-style typed properties, a built-in Git client, and native AI-agent integration. Stores plain `.md` with YAML frontmatter; wikilinks resolve by filename or title. No `![[file]]` embed syntax; it uses plain markdown image references plus a separate media-previews panel. Math and Mermaid supported. Free, AGPL-3.0, Tauri-based, all major desktop platforms.

Good fit if you want a Notion-feel editor over plain `.md` files. The lack of `![[…]]` means moss-side typed embeds need to be authored as raw text.

### Cogito

[Cogito](https://cogito.md) is a native macOS editor with source + preview split, wikilinks `[[page]]`, embeds `![[note]]`, callouts, MathJax, Mermaid, and a multi-provider AI sidebar (Claude / Codex / Amp / OpenCode) that can edit notes with undo. Stores plain `.md` and `.mdx` on disk; supports iCloud sync and Obsidian vault import.

Best for Mac writers who want an AI-assisted authoring surface that still saves plain files. Free during public beta.

### Logseq OG

[Logseq OG](https://logseq.com) edits a folder of plain `.md` files with an outliner model: every line is a bullet block, and the saved markdown reflects that. Wikilinks `[[Page]]` are native; embeds use Logseq's own `{{embed}}` syntax rather than `![[…]]`. KaTeX math is native; Mermaid via plugin.

Two caveats: (1) make sure you pick **Logseq OG**, not the new "Logseq DB" version, which uses a proprietary SQLite store and is not folder-based; (2) the outliner produces bullet-heavy markdown that may need theme tweaks in moss to render the way you want. Free, AGPL-3.0, all major platforms.

### VS Code + Foam (or Cursor + Foam)

[VS Code](https://code.visualstudio.com) becomes a respectable markdown studio once you install [Foam](https://foambubble.github.io) (wikilinks with autocomplete, embeds, backlinks, graph view) and an alert-syntax extension for callouts. [Cursor](https://www.cursor.com) is a hard fork of VS Code that ships the same extension API, so Foam installs and works unchanged, with an AI panel on top.

Best for writers who already live in their code editor. The chrome (file tree, gutters, command palette) is denser than purpose-built writing apps. macOS / Windows / Linux. VS Code free, Cursor $20/mo Pro.

### Zed

[Zed](https://zed.dev) is a fast, Rust-built editor with a clean native markdown preview, GitHub-style alert callouts, built-in math, and built-in Mermaid. The gap is wikilinks: `[[page]]` is not supported in Zed's parser and no extension fills it.

Fine for linear posts; painful if your site leans on `[[note]]` cross-links and `![[file]]` embeds. macOS / Linux / Windows, free.

## Newer launches worth watching

The space has moved fast in 2026. These are the most credible newcomers, mostly indie projects:

- **[Glyph](https://glyphformac.com):** local-first macOS markdown app with wikilinks, backlinks, kanban/tables derived from frontmatter, and optional local AI. One-time purchase.
- **[Nota](https://nota.md):** Mac App Store editor with multiple cursors, wikilinks, and a scripting hook. Power-user folder-of-md.
- **[scratch](https://github.com/erictli/scratch):** minimalist offline-first Tauri editor with WYSIWYG via TipTap, wikilinks by title, and AI hand-off to local CLI agents (Claude Code, Codex, OpenCode, Ollama). Free, MIT.
- **[writer.computer](https://writer.computer):** workspace-oriented Tauri editor with frontmatter, wikilinks, and a fast cold-start. Free, GPL-3.0.
- **[Inkwell](https://inkwell.4worlds.dev):** 11 MB portable Tauri editor; drop the binary anywhere and run. Free; $19 one-time unlocks PDF/HTML export.
- **[MarkText](https://github.com/peterjthomson/marktext):** the long-running Typora-style WYSIWYG was abandoned upstream; community forks (Peter Thomson, signed macOS builds) and the original maintainer's May 2026 recovery thread have re-lit interest. Free, MIT.

## Markdown viewers: pair with anything

These are read-only renderers, useful when you edit in a code editor that lacks a polished preview:

- **[Markdown Preview](https://markdownpreview.app):** native macOS viewer with Quick Look bundled. Drop a `.md` on the icon, or hit space in Finder. Free, MIT.
- **[marky](https://github.com/GRVYDEV/marky):** CLI-launched viewer (`marky FOLDER`) explicitly designed for watching AI agents write markdown. Free, Apache-2.0.

## Not a great fit

These are excellent apps, but they store notes in their own database rather than a folder of `.md` files, so moss can't watch them:

- **Bear:** SQLite + iCloud. Can export `.md`, but not edit a folder in place.
- **Joplin:** SQLite + sync target. Has a filesystem-sync mode that writes `.md` files, but it's an export channel, not a primary edit mode.
- **Logseq DB** (the new version): proprietary SQLite schema; pick **Logseq OG** instead.
- **Anytype:** proprietary block JSON; markdown is import/export only.
- **Notion:** not a markdown editor; cloud blocks.
- **Lex**, **Reflect**, **Capacities**, **Standard Notes**, **Notesnook**, **Inkdrop**, **Heynote:** cloud or encrypted-DB notes apps. Markdown may be the syntax, but storage isn't a folder you control.

## Tip: use moss as the live preview

Whichever editor you choose, the workflow is the same: edit `.md` files in your folder, save, and moss rebuilds the preview window beside you. No build commands, no servers to manage. If you're hopping between Obsidian and a code editor, point both at the same folder; moss doesn't care which one wrote the last save.
