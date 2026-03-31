---
title: Plugins & Features
weight: 5
description: Built-in plugins and native features for publishing, comments, and more.
---

moss ships with two JavaScript plugins and four native Rust features. All are configured in `.moss/config.toml` in your project directory.

## Plugins (JavaScript)

### GitHub Pages

Deploy your site to GitHub Pages via GitHub Actions.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `auto_commit` | boolean | `true` | Auto-commit on deploy |
| `video_max_size_mb` | number | `75` | Max video size for deployment |

See [Deploy](deploy.md) for setup instructions.

### Matters.town

Syndicate articles to [Matters.town](https://matters.town) (POSSE — Publish on your Own Site, Syndicate Elsewhere).

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `auto_publish` | boolean | `false` | Auto-publish on build |
| `add_canonical_link` | boolean | `true` | Add canonical link back to your site |
| `sync_on_build` | boolean | `true` | Sync on every build |
| `sync_drafts` | boolean | `true` | Include drafts in sync |

## Native Features (Rust)

### Comments

Add Waline or Artalk comment sections to article pages.

```toml
[features.comments]
server_url = "https://your-comment-server.com"
```

To disable comments on a specific page, add `comments: false` to its frontmatter.

### Email Newsletter

Add a Buttondown subscribe form to the site footer.

```toml
[features.email]
api_key = "your-buttondown-api-key"
```

### Analytics

Privacy-focused analytics via GoatCounter.

```toml
[features.analytics]
script = "https://yoursite.goatcounter.com/count"
```

### Review

Display book and media review colophons on pages that use the `review_of` and `rating` frontmatter fields.

No additional configuration required — enable by adding those fields to a page's frontmatter.

## Disabling plugins

To build without running any JavaScript plugins:

```sh
moss compile folder/ --no-plugins
```
