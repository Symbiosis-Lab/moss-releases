---
title: Navigation & footer
uid: 7a9f22b4
weight: 5
description: Control what appears in the header nav, the footer, and the breadcrumb trail.
translationKey: docs-author-navigation
---

moss auto-generates your site's header navigation and footer from page frontmatter. You don't configure a menu file: you mark pages with `nav:` or `footer:` and moss assembles the chrome.

## Header nav

Which pages appear in the header bar depends on your site's shape:

- **Organized sites** (at least one subfolder under the project root): every root-level non-index page auto-appears in the nav.
- **Flat sites** (no subfolders): only pages whose filename is a recognized "nav keyword" (`about`, `关于`, or `關於`) auto-appear.

In either mode, explicit frontmatter always wins:

| `nav` value | Effect |
|-------------|--------|
| `true` | Always show in header nav (works from any depth) |
| `false` | Never show in header nav |
| (unset) | Auto-rule above |

Sort order: pages with a `weight` value come first, lowest → highest. Pages without `weight` follow, sorted alphabetically by title.

```yaml
---
title: Services
nav: true
weight: 10
---
```

## Breadcrumb

When a page has no nav items around it (e.g., an article deep inside a section), moss auto-shows a breadcrumb trail in place of the site name, so visitors can find their way back up the tree.

Breadcrumbs are generated automatically from the folder tree, so never hand-author a breadcrumb block (do not write a `::: {.breadcrumb}` div) in markdown.

Force it on or off per page with `breadcrumb: true` / `breadcrumb: false` in frontmatter, or cascade it to a whole folder:

```yaml
# posts/index.md
---
title: Posts
cascade:
  breadcrumb: true
---
```

## Footer

Pages with `footer: true` in frontmatter appear as links in the site footer.

```yaml
# privacy.md
---
title: Privacy
footer: true
---
```

### Footer alignment

By default footer links sit on the left. Use `footer_align: right` to pull a page to the right column (typical for "Imprint", "Colophon", or legal links):

```yaml
# colophon.md
---
title: Colophon
footer: true
footer_align: right
---
```

moss also auto-adds an RSS feed link to the left footer when your site emits a feed.

### Footer slot

For custom content at the end of the right footer column, plugins and themes can emit HTML into the `footer-right` slot, useful for copyright lines, Creative Commons badges, or small legal text.

## Language-scoped navigation

Nav items are scoped to the current page's language tree automatically. On a multilingual site, the header nav shows only pages in the current page's language: visitors on the English homepage see the English nav; visitors on the Chinese homepage see the Chinese nav. The language toggle (separate icon in the header) lets them switch trees.

If `nav: true` is set on a page in one language tree, the corresponding page in another tree needs its own `nav: true`. `nav` is per-page, not global.

## Related pages

- [[frontmatter]]: `nav`, `weight`, `footer`, `footer_align`, `breadcrumb` field reference
- [[../multilingual]]: language trees and how nav scopes to them
- [[../structure]]: how root-level vs nested pages are determined
