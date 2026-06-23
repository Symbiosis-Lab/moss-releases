---
title: Design
uid: 0df1b907
weight: 6
description: Make it yours with CSS and JavaScript.
translationKey: docs-design
---

Two files, both optional:

- **`.moss/theme/style.css`**: override [[css|colors, fonts, spacing, and component styles]]
- **`.moss/theme/script.js`**: add [[javascript|custom behavior and interactions]]

Both go under `.moss/theme/` in your project folder. No build step, no configuration. moss loads them automatically.

Your `style.css` wins over all built-in styles — no `!important` and no `@layer` needed. To see every available `--moss-*` CSS token, run `moss describe --json` or read the [token reference](/contract/reference/).
