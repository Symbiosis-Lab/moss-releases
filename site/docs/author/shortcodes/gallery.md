---
title: Gallery
uid: d1b6e924
weight: 3
description: An image grid for photo galleries.
translationKey: docs-author-shortcodes-gallery
---

`:::gallery` lays out a set of images in a responsive masonry-style grid. Each line inside the block is one image.

## Basic gallery

:::grid 2 {.sc-demo}
```markdown
:::gallery
![](assets/portrait1.png)
![](assets/portrait2.jpg)
![](assets/portrait3.jpeg)
:::
```
+++
::::gallery
![](assets/portrait1.png)
![](assets/portrait2.jpg)
![](assets/portrait3.jpeg)
::::
:::

## Column count

Pass a number after `gallery` to set the column count.

:::grid 2 {.sc-demo}
```markdown
:::gallery 3
![](assets/portrait1.png)
![](assets/portrait2.jpg)
![](assets/portrait3.jpeg)
:::
```
+++
::::gallery 3
![](assets/portrait1.png)
![](assets/portrait2.jpg)
![](assets/portrait3.jpeg)
::::
:::
