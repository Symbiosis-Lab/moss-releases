# Prior Art: Web-Based Recreations of Classic Prints and Manuscripts

## Key Finding

Nobody has successfully positioned selectable web text over Blake's illuminated plates in a way that matches the original layout. This is genuinely novel territory. The scholarly consensus (led by the Blake Archive) is that Blake's text IS part of the artwork and should not be separated.

## Notable Projects

### The William Blake Archive (blakearchive.org)

The gold standard for digital Blake scholarship. Deliberately chose NOT to overlay text on images. Fundamental design philosophy: image-first. Users encounter the complete illuminated plate as a high-resolution image, then access diplomatic transcriptions separately via a side-by-side view.

- **Stack**: Python/Flask, PostgreSQL, Apache Solr, AngularJS
- **Images**: Originally Java applets, now modern JavaScript viewers. Two resolutions: 100 dpi (standard) and 300 dpi (enlargement)
- **Data**: XML-based source materials with SGML DTD for illuminated books
- **Key decision**: Transcriptions are copy-specific (Blake's works vary across hand-colored copies)
- **Source code**: https://github.com/blakearchive/archive (GPL-2.0)
- **Reference**: https://blog.blakearchive.org/2016/12/12/william-blake-archive-redesigned/

### Mirador Text Overlay Plugin

The closest technical model for text-over-image work.

- **URL**: https://github.com/dbmdz/mirador-textoverlay
- **Demo**: https://mirador-textoverlay.netlify.com
- **How it works**: OCR/transcription bounding boxes rendered word-by-word into SVG images synchronized to the viewport with dynamic CSS transformations
- **Accepts**: ALTO XML or hOCR markup containing precise bounding box coordinates
- **Features**: Text is selectable and highlightable. Opacity and background color adjustable.
- **Limitation**: Designed for OCR output on clean manuscripts, not Blake's intertwined text-and-image

### OpenSeadragon Overlays

Deep-zoom image viewer used by many digital humanities projects.

- **URL**: https://openseadragon.github.io/examples/ui-overlays/
- **HTML Overlay Plugin**: https://github.com/openseadragon/html-overlay
- **Supports**: Built-in overlays (HTML elements at normalized 0-1 coordinates), HTML overlays that scale with zoom, SVG overlays for annotations
- **Coordinate system**: Normalized (0-1) for proportional positioning

### Edition Visualization Technology (EVT)

Open-source tool for digital scholarly editions from TEI XML.

- **URL**: http://evt.labcd.unipi.it/
- **GitHub**: https://github.com/evt-project/evt-demo
- **Approach**: Manuscript facsimile images on left, transcription text on right (side-by-side, not overlaid)
- **Features**: Image-text linking connects facsimile lines to transcription lines
- **Stack**: Angular, OpenSeadragon

### Paged.js

JavaScript library implementing W3C Paged Media CSS specs in the browser.

- **URL**: https://pagedjs.org/
- **GitHub**: https://github.com/pagedjs/pagedjs
- **Relevance**: Displays content as facing pages, relevant for manuscript-like presentation. Can generate print PDFs from HTML/CSS.

### The Rossetti Archive

- **Original**: http://rossettiarchive.iath.virginia.edu/
- **Modern recreation**: https://chrisakroyd.com/projects/rosetti/ (React/TypeScript/GraphQL)
- **Approach**: SGML markup for physical features, image tool for anchors on digitized images

### Book of Kells Digital Collection

- **URL**: https://digitalcollections.tcd.ie/collections/ks65hc20t
- **Approach**: Pure image viewer. 680 pages of high-resolution scans. No text overlay.

## CSS Techniques for Manuscript Effects

### Drop Caps / Illuminated Initials

- `::first-letter` pseudo-element + `initial-letter` property
- `background-clip: text` to fill letters with images/gradients
- `shape-outside` for organic text wrap around decorated initials
- `text-shadow` for 3D depth
- References:
  - https://www.smashingmagazine.com/2012/04/drop-caps-historical-use-and-current-best-practices/
  - https://css-tricks.com/getting-creative-with-versal-letters/

### Parchment / Aged Paper Effects

- SVG `feTurbulence` filter for Perlin noise (most realistic)
- Layered CSS radial gradients for uneven aging
- Multi-layered `box-shadow` for page curvature
- `filter: sepia()` for warm paper tone
- References:
  - https://codepen.io/AgnusDei/pen/NWPbOxL
  - https://www.subframe.com/tips/css-paper-effect-examples

### Text Effects (Letterpress / Engraving)

- Letterpress: `color: #222; text-shadow: 0px 2px 3px #555;`
- Embossed: dual diagonally offset shadows (white top-left, dark bottom-right)
- Reference: https://line25.com/tutorials/create-a-letterpress-effect-with-css-text-shadow/

### Text Flow Around Illustrations

- `shape-outside: polygon()` on floated elements
- `shape-outside: url(image.png)` — browser extracts shape from image alpha
- `shape-margin` for breathing room
- References:
  - https://css-irl.info/experimental-layouts/
  - https://blog.logrocket.com/creative-text-flows-using-css-shapes/

### Mix-Blend-Mode for Integration

- `mix-blend-mode: multiply` — text darkens into background (like ink on paper)
- `background-blend-mode` for blending background layers
- Combining with `filter: sepia()` and `contrast()` for vintage aesthetic
- Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode

### Decorative Borders / Frames

- `border-image-source: url('data:image/svg+xml;...')` for ornate SVG frames
- CSS Houdini Paint API for dynamic custom frames (limited support)
- Reference: https://charlottedann.com/article/fancy-frames-with-css

## Key Lessons for Blake's Site

1. **The Blake Archive's decision is definitive**: Text IS part of the artwork. Don't separate them. Show the plates as complete images.

2. **Per-plate manual layout is unavoidable**: Every Blake plate has unique text positioning. No automated approach exists.

3. **CSS has all the building blocks**: `shape-outside`, `clip-path`, `mix-blend-mode`, SVG filters, variable fonts, positioning. The composition is the challenge, not the technology.

4. **The hybrid approach**: Show the illuminated plates as-is (text in the image). Use web text only for journal/prose content where Blake wrote separately from his plates.

5. **Font choice matters**: There is no perfect Blake typeface. Libre Caslon Text (web Caslon) is period-appropriate — Caslon was THE English typeface of his era.

## References

- William Blake Archive. https://www.blakearchive.org/
- Blake Archive GitHub. https://github.com/blakearchive/archive
- Blake Archive Redesign Blog. https://blog.blakearchive.org/2016/12/12/william-blake-archive-redesigned/
- NINCH Summary. https://www.ninch.org/PROJECTS/Future/blake.html
- Mirador Text Overlay Plugin. https://github.com/dbmdz/mirador-textoverlay
- OpenSeadragon. https://openseadragon.github.io/examples/ui-overlays/
- EVT. http://evt.labcd.unipi.it/
- Paged.js. https://github.com/pagedjs/pagedjs
- Book of Kells. https://digitalcollections.tcd.ie/collections/ks65hc20t
- Rossetti Archive. https://chrisakroyd.com/projects/rosetti/
- IIIF Text Granularity Extension. https://iiif.io/api/extension/text-granularity/
- TEI Publisher. https://teipublisher.com/
