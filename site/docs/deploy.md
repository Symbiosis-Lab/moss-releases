---
title: Deploy
uid: 6d45ea20
weight: 4
description: Publish your site to GitHub Pages.
---

## Prerequisites

- A GitHub account
- A GitHub repository (public or private)

## Setup

1. Open your folder in moss.
2. Click the settings icon in the toolbar.
3. Under "Publishing", click "Connect GitHub".
4. Authorize moss via GitHub's device flow — a code appears in moss; enter it on GitHub when prompted.
5. Select the repository to deploy to.

## Deploy

Click the deploy button. The first deploy takes about a minute — moss creates a GitHub Actions workflow automatically. Subsequent deploys are faster.

moss commits your compiled site, pushes to the repository, and GitHub Actions deploys it to GitHub Pages.

**Plugin settings:**

| Setting | Default | Description |
|---------|---------|-------------|
| `auto_commit` | `true` | Automatically commit changes on deploy |
| `video_max_size_mb` | `75` | Maximum video file size for deployment |

## Custom domain

Set a custom domain in your GitHub repository settings under **Pages → Custom domain**. You can also configure it directly in moss's domain settings.

## What's next

Zero-config deploy to moss.host is planned — no GitHub account required.
