---
title: CSS
uid: b0d7a703
weight: 2
description: CSS 变量、深色模式和组件类名。
translationKey: docs-design-css
lang: zh-hans
---

## 自定义样式表

在项目根目录创建 `style.css`。moss 在默认主题之后加载它，你的规则会覆盖默认值。

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
}
```

不需要构建步骤，不需要配置。文件自动加载。

## 变量

### 字体

<!-- auto:start:css-typography -->
| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--moss-font-body` | 系统无衬线字体栈 | 正文字体 |
| `--moss-font-heading` | 继承正文 | 标题字体 |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | 代码字体 |
| `--moss-font-serif` | Iowan Old Style, 衬线字体栈 | 衬线字体（配合字体切换使用） |
| `--moss-font-size-base` | `1.125rem` | 基准字号 |
| `--moss-font-weight` | `320` | 默认字重 |
<!-- auto:end:css-typography -->

### 颜色

<!-- auto:start:css-colors -->
| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--moss-color-accent` | `#2d5a2d` | 链接、高亮、强调元素 |
| `--moss-color-bg` | `#faf8f5` | 页面背景色 |
| `--moss-color-text` | `#2c2825` | 主文字色 |
| `--moss-color-muted` | `#8a8580` | 次要/弱化文字色 |
| `--moss-color-surface` | `#f4f1ec` | 卡片和表面背景色 |
<!-- auto:end:css-colors -->

### 布局

<!-- auto:start:css-layout -->
| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--moss-content-width` | `67ch` | 内容最大宽度 |
| `--moss-content-width-sidebar` | `62ch` | 侧边栏激活时的内容宽度 |
| `--moss-nav-width` | `var(--moss-content-width)` | 导航栏和页脚最大宽度 |
| `--moss-sidebar-width` | `280px` | 侧边栏宽度 |
| `--moss-site-max-width` | `1200px` | 站点整体最大宽度 |
| `--moss-container-padding` | `clamp(1rem, 5vw, 2rem)` | 容器两侧内边距 |
<!-- auto:end:css-layout -->

### 间距

<!-- auto:start:css-spacing -->
| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--moss-space-xs` | `0.5rem` | 超小（8px） |
| `--moss-space-sm` | `1rem` | 小（16px） |
| `--moss-space-md` | `1.5rem` | 中（24px） |
| `--moss-space-lg` | `2rem` | 大（32px） |
| `--moss-space-xl` | `3rem` | 超大（48px） |
| `--moss-space-2xl` | `4rem` | 特大（64px） |
<!-- auto:end:css-spacing -->

## 深色模式

深色模式自动跟随系统设置。用以下选择器自定义深色模式配色：

```css
[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

## 组件类名

自动生成的组件使用稳定的 `.moss-*` 类名。在 `style.css` 中用这些类名来定制样式。

### 集合网格

<!-- auto:start:component-classes -->
| 类名 | 元素 |
|------|------|
| `.moss-collection-grid` | 网格容器 |
| `.moss-collection-card` | 单张卡片 |
| `.moss-collection-card-cover` | 封面图包裹层 |
| `.moss-collection-card-content` | 封面下方的内容区 |
| `.moss-collection-card-title` | 卡片标题 |
| `.moss-collection-card-count` | 文章数量/副标题 |

### 子页面摘要

| 类名 | 元素 |
|------|------|
| `.moss-child-summary` | 摘要卡片 |
| `.moss-child-summary-row` | Flex 行（正文 + 封面） |
| `.moss-child-summary-body` | 文字内容区 |
| `.moss-child-summary-meta` | 日期或数量 |
| `.moss-child-summary-title` | 标题 |
| `.moss-child-summary-description` | 描述摘录 |
| `.moss-child-summary-cover` | 侧封面图 |

### 文章列表

| 类名 | 元素 |
|------|------|
| `.moss-article-listing` | 列表容器 |
| `.moss-article-item` | 单条列表项 |
| `.moss-prefix-link` | 带前缀的链接（日期/数量） |
| `.moss-year-group` | 年份分组标题 |
<!-- auto:end:component-classes -->

## 短代码类名

用 `{.class}` 语法给短代码块添加自定义类：

```markdown
:::grid 3 {.profiles .featured}
...
:::
```

然后在 CSS 中定制：

```css
.profiles .moss-grid-card {
  border-radius: 50%;
}
```
