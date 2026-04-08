---
title: JavaScript
uid: 1622c608
weight: 3
description: Custom scripts, data attributes, and DOM structure.
translationKey: docs-design-javascript
---

## Custom script

Create `script.js` in your project root. moss loads it after all built-in scripts, so the DOM is ready when your code runs.

```javascript
// script.js
document.querySelectorAll('.moss-collection-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
```

No build step required. The file is loaded automatically on every page.

## Data attributes

moss sets data attributes on HTML elements that you can read or style against.

| Attribute | Element | Values | Purpose |
|-----------|---------|--------|---------|
| `data-theme` | `<html>` | `"light"`, `"dark"` | Current color theme |
| `data-moss-preview` | `<body>` | present/absent | Set when in preview mode |
| `data-comments` | `<article>` | `"true"`, `"false"` | Whether comments are enabled |
| `data-source-line` | headings, paragraphs | line number | Source markdown line (dev aid) |
| `data-content-width` | `<article>` | `"wide"` | Content width override |

### Theme detection

```javascript
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
```

## DOM structure

The generated HTML follows a consistent structure across all pages.

```
<html data-theme="light">
  <body>
    <nav class="main-nav">
      <div class="nav-content">...</div>
    </nav>
    <main class="container">
      <article>
        <h1 class="article-title">...</h1>
        <div class="article-meta">
          <time class="article-date">...</time>
        </div>
        <!-- page content -->
      </article>
    </main>
    <footer class="moss-colophon">...</footer>
  </body>
</html>
```

**Key elements to hook into:**

| Selector | What it is |
|----------|------------|
| `.main-nav` | Top navigation bar |
| `.container` | Main content wrapper |
| `article` | Page content area |
| `.article-title` | Page heading |
| `.article-meta` | Date and metadata |
| `.moss-colophon` | Footer |

**Safe to modify:** Anything inside `article` and `.moss-colophon`. The navigation structure is managed by moss — add styles but avoid removing or reordering its children.
