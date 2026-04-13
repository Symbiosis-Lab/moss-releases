---
title: 短代码
uid: bd025c66
weight: 3
description: 扩展 markdown 的布局块和组件。
translationKey: docs-author-shortcodes
lang: zh-hans
---

## 什么是短代码

短代码是 markdown 中的特殊块，用来创建标准 markdown 做不到的布局和组件——多栏、图库、大图横幅等。语法是 `:::` 块。 ^def-shortcode

```markdown
:::grid 2
第一栏内容。
---
第二栏内容。
:::
```

## Hero

全宽大图区域，支持背景图片或视频，可叠加文字。

```markdown
:::hero
![[panorama.jpg]]
# 欢迎来到我的网站
一个属于自己的角落。
:::
```

块内第一行是媒体引用（wikilink、markdown 图片或文件名）。后续内容作为叠加层显示在媒体上方。

用管道语法控制显示方式：

```markdown
:::hero
![[mountains.jpg|contain top]]
:::
```

## Grid

多栏布局。指定列数，可选比例。

```markdown
:::grid 3
第一栏。
---
第二栏。
---
第三栏。
:::
```

用 `---` 分隔各栏。`grid` 后面的数字指定列数。

**自定义比例：**

```markdown
:::grid 2 1:2
窄侧边栏。
---
宽主内容区。
:::
```

**添加自定义类：**

```markdown
:::grid 3 {.profiles .featured}
成员一。
---
成员二。
---
成员三。
:::
```

### 栏内内容

每栏自动识别并渲染以下内容：

- **Wikilink**：`[[folder_name]]` 或 `[[文章标题]]`——渲染为带封面的卡片
- **Markdown 链接**：`[文字](url)`
- **图片**：`![描述](path.jpg)` 或 `![[photo.jpg]]`
- **裸 URL**：`https://example.com`——自动转为链接

## Gallery

图片画廊。

```markdown
:::gallery
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
![](photo4.jpg)
:::
```

可指定列数：

```markdown
:::gallery 3
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
:::
```

## 目录

插入由页面标题自动生成的目录。

```markdown
:::toc
:::
```

## Buttons

将 markdown 链接渲染为按钮行。第一个链接是主按钮，其余为次要按钮。

```markdown
:::buttons
[下载](https://example.com/download)
[查看源码](https://github.com/example)
:::
```

## 提示框

用于提示、警告和注意事项的高亮块。兼容 Obsidian 语法：

```markdown
> [!note]
> 这是一条备注。

> [!warning] 注意
> 此操作不可撤销。

> [!tip] 小技巧
> 提示框内可以使用 markdown 格式。
```

`[!` 后面的单词决定类型，同一行后面可选标题。

**所有类型：**

`note`、`tip`、`warning`、`caution`、`important`、`info`、`abstract`、`todo`、`success`、`question`、`failure`、`danger`、`bug`、`example`、`quote`

多段落的提示框，空行也用 `>` 开头：

```markdown
> [!note] 长提示
> 第一段。
>
> 第二段，可以用**粗体**等格式。
```

## 属性

用 `{.class}` 语法给任何短代码块添加自定义 CSS 类：

```markdown
:::grid 2 {.comparison}
之前
---
之后
:::
```

这会给 grid 容器添加 `comparison` 类，你可以在 `style.css` 中针对它编写样式。
