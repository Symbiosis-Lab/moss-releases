---
title: Slots
uid: f81de8fe
weight: 3
description: Template injection points and the enhance phase.
translationKey: docs-extend-slots
---

## Template slots

Slots are named injection points in the HTML template where plugins can insert content. There are six slots: ^def-template-slots

| Slot | Position |
|------|----------|
| `head-end` | Before `</head>` — for stylesheets and meta tags |
| `after-title` | After the article title and date |
| `before-article-end` | Before `</article>` |
| `after-article` | After `</article>` — for comments, related posts |
| `footer-right` | Inside the footer |
| `body-end` | Before `</body>` — for scripts and tracking |

## How slots work

During generation, moss writes HTML comment markers at each slot position:

```html
<article>
  <h1>Page Title</h1>
  <!-- slot:after-title -->
  <p>Content...</p>
  <!-- slot:before-article-end -->
</article>
<!-- slot:after-article -->
```

During the **enhance phase**, each plugin with the `enhance` capability returns content for the slots it wants to fill. moss replaces the markers with the plugin content. Any unfilled markers are stripped from the final output — they never appear in the published HTML.

Multiple plugins can write to the same slot. Their content is concatenated in plugin load order.

## EnhanceResult

The enhance hook returns an object mapping slot names to HTML strings:

```typescript
async enhance(ctx) {
  return {
    slots: {
      "after-article": `<section class="comments">
        <script src="https://comments.example/embed.js"></script>
      </section>`,
      "head-end": `<link rel="stylesheet" href="/comments.css">`
    }
  };
}
```

Only include the slots your plugin needs. Omitted slots are left for other plugins or stripped.

## Zero-flicker preview

During preview, moss rebuilds the site on every file change. To prevent the preview from flickering during rebuilds:

1. New output is built to `.moss/site-stage/`
2. The preview server atomically switches its pointer to `site-stage/`
3. The staged content is copied to `.moss/site/` (the canonical directory)
4. The pointer switches back to `.moss/site/`

The preview server never serves from a half-built directory. The switch is instant — a pointer update, not a file rename.
