---
title: Media
uid: bac82b8f
weight: 7
description: Images, video, notebooks, and other files in your site.
translationKey: docs-media
---

Put images, videos, and other files anywhere in your project folder. Reference them from markdown; moss handles path resolution, optimization, and progressive loading. ^intro

## Images

Reference an image with standard markdown syntax:

```markdown
![A sunset](photos/sunset.jpg)
```

Or with a wikilink:

```markdown
![[sunset.jpg]]
```

moss resolves the path automatically. It also extracts image dimensions and generates a tiny blurred placeholder so the page doesn't jump as images load.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`, `.avif`.

## Video

Drop video files in your folder and reference them the same way:

```markdown
![[demo.mov]]
```

moss transcodes `.mov` files to `.mp4` (H.264 + AAC) in the background. The preview opens immediately and video loads progressively as transcoding completes. Reference the original `.mov` filename; moss serves the converted `.mp4` automatically.

## Display control

Control how media displays using pipe syntax: append fit and position values after a `|`:

```markdown
![[photo.jpg|contain top-left]]
```

**Fit values** (maps to CSS `object-fit`):

| Value | Effect |
|-------|--------|
| `cover` | Fill the area, cropping if needed (default) |
| `contain` | Show the whole image, letterboxing if needed |
| `fill` | Stretch to fill exactly |
| `none` | Natural size, no scaling |
| `scale-down` | Like `contain`, but never enlarges |

**Position values** (maps to CSS `object-position`):

`center`, `left`, `right`, `top`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right`

Combine them: `![[panorama.jpg|contain center]]`, `![[headshot.jpg|cover top]]`.

This syntax works in wikilinks, markdown images, and bare filenames inside shortcodes.

## Notebooks

Jupyter notebooks (`.ipynb` files) run directly in the browser via JupyterLite — no server, no Python installation required. The entire runtime (~20 MB) runs as WebAssembly in the visitor's browser. Place a `.ipynb` file in your project and it appears alongside your other content.

## HTML files

Plain `.html` files in your project are served as-is. Use them for interactive content, embeds, or pages that need full control over their markup.

## Cover images

Any page can declare a cover image in its frontmatter:

```yaml
---
title: My Project
cover: screenshots/hero.png
---
```

Covers appear in card layouts when a section uses `children_style: card`. moss detects the media type from the file extension. Override with `cover_type` for non-image covers:

```yaml
---
cover: demo.mp4
cover_type: video
---
```

Valid cover types: `image` (default), `video`, `iframe`.
