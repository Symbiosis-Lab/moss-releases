---
title: CSS
uid: b0d7a703
weight: 2
description: CSS 变量、深色模式和组件类名。
translationKey: docs-design-css
lang: zh-hans
---

## 自定义样式表

在项目的 `.moss/theme/` 目录下创建 `style.css`（moss 在你打开文件夹时会自动创建 `.moss/theme/`）。moss 在默认主题之后加载它，你的规则会覆盖默认值。不需要写 `!important`，也不需要手写 `@layer` —— moss 会把你的 `style.css` 放进层叠顺序最靠后的 `themes` 层，让它自然胜出。

```
my-site/
├── .moss/
│   └── theme/
│       └── style.css   ← 自定义 CSS 放在这里
├── index.md
└── ...
```

```css
:root {
  --moss-color-accent: #2d5a2d;
  --moss-font-body: "Inter", -apple-system, sans-serif;
  --moss-content-width: 72ch;
}
```

不需要构建步骤，不需要配置。文件自动加载。

> [!tip] 发现所有变量
> 运行 `moss describe --json` 可列出全部 `--moss-*` 变量及其亮色/暗色默认值，也可在 `docs/contract/reference.md` 查阅人类可读的完整参考表。

> [!note] 自托管字体
> 把 `.woff2` 文件放在 `.moss/theme/fonts/` 下，在 `style.css` 中用 `@font-face { src: url('fonts/myfont.woff2') }` 引用。`.moss/theme/` 目录作为站点根目录的兄弟目录对外提供。

## 变量

### 字体

<!-- auto:start:css-typography -->
| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--moss-font-body` | 系统无衬线字体栈 | 正文字体族 |
| `--moss-font-heading` | 继承正文 | 标题字体族 |
| `--moss-font-mono` | ui-monospace, SFMono-Regular | 代码字体族 |
| `--moss-font-weight-body` | `320` | 正文字重 |
| `--moss-font-heading-weight` | `500` | 标题字重 |
| `--moss-reading-size` | `1.125rem` | 阅读正文字号 |
| `--moss-reading-size-base` | `1rem` | 基准字号（较小情境） |
| `--moss-size-2xs` | `0.625rem` | 字号刻度 2xs |
| `--moss-size-xs` | `0.75rem` | 字号刻度 xs |
| `--moss-size-sm` | `0.875rem` | 字号刻度 sm |
| `--moss-size-md` | `1rem` | 字号刻度 md |
| `--moss-size-lg` | `1.125rem` | 字号刻度 lg |
| `--moss-size-xl` | `1.25rem` | 字号刻度 xl |
| `--moss-size-2xl` | `1.5rem` | 字号刻度 2xl |
| `--moss-size-3xl` | `1.875rem` | 字号刻度 3xl |
<!-- auto:end:css-typography -->

### 颜色

<!-- auto:start:css-colors -->
| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--moss-color-accent` | `#2d5a2d` | 链接、高亮、强调元素 |
| `--moss-color-accent-hover` | 略深于 accent | 悬停状态强调色 |
| `--moss-color-accent-quiet` | 半透明 accent | 柔和的强调背景 |
| `--moss-color-ui-accent` | `var(--moss-color-accent)` | 导航栏、按钮等界面控件色；设为中性色可实现"安静界面" |
| `--moss-color-bg` | `#faf8f5` | 页面背景色 |
| `--moss-color-text` | `#2c2825` | 主文字色 |
| `--moss-color-text-secondary` | `#6b6760` | 次要文字色（日期、标签等） |
| `--moss-color-muted` | `#8a8580` | 弱化文字色 |
| `--moss-color-surface` | `#f4f1ec` | 卡片和表面背景色 |
| `--moss-border-light` | 半透明 | 轻边框 |
| `--moss-border-medium` | 半透明偏深 | 中等边框 |
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

moss 在首次渲染前就已通过一段内联脚本读取 `localStorage["moss-theme"]` 和系统 `prefers-color-scheme`，将 `data-theme` 设置到 `<html>` 上。因此你只需覆盖一个选择器，就能同时应对主题切换和系统偏好：

```css
:root[data-theme="dark"] {
  --moss-color-bg: #0f0f0f;
  --moss-color-accent: #6abf6a;
}
```

无需另写 `@media (prefers-color-scheme: dark)` —— `[data-theme="dark"]` 已经覆盖了两种场景。

## 安静界面

`--moss-color-ui-accent` 控制导航、按钮等站点控件的颜色，默认继承 `--moss-color-accent`。若希望界面控件保持中性、只让内容链接显示强调色，可将其设为文字色：

```css
:root {
  --moss-color-ui-accent: var(--moss-color-text);
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
| `.moss-prefix-link-prefix` | 前缀部分（日期/数量标签） |
| `.moss-prefix-link-title` | 标题部分 |
| `.moss-prefix-link-suffix` | 后缀部分（可选的尾部标签） |
| `.moss-year-group` | 年份分组标题 |
| `.moss-year-group--summary` | 摘要样式的年份分组 |
| `.moss-child-section-divider` | 子栏目之间的分隔线 |

### Grid 短代码

| 类名 | 元素 |
|------|------|
| `.moss-grid` | 网格容器（`:::grid N`） |
| `.moss-grid-card` | 单个网格单元格 |
| `.moss-grid-card.friend-card` | 包裹外部链接的网格单元格（自动获取元数据） |
| `.moss-grid-card.link-card` | 包裹内部文章链接的网格单元格 |

### 集合封面

| 类名 | 元素 |
|------|------|
| `.moss-collection-cover` | 文件夹页面顶部的全宽封面区域 |
| `.moss-collection-cover-row` | 封面内的弹性行 |
| `.moss-collection-cover-body` | 封面的文字内容区 |
| `.moss-cover-label` | 集合封面内的标签文字 |

### Hero 短代码

| 类名 | 元素 |
|------|------|
| `.moss-hero` | Hero 容器（`:::hero`） |
| `.moss-hero-content` | Hero 内部的叠加文字区域 |

### Buttons 短代码

| 类名 | 元素 |
|------|------|
| `.moss-buttons` | 按钮行容器（`::::buttons`） |
| `.moss-buttons.inverted` | 深色背景上的浅色按钮行变体 |
| `.moss-btn` | 单个按钮 |
| `.moss-btn-primary` | 第一个（主要）按钮 |
| `.moss-btn-secondary` | 后续（次要）按钮 |

### Gallery 短代码

| 类名 | 元素 |
|------|------|
| `.moss-gallery` | 图库容器（`:::gallery`） |
| `.moss-gallery-item` | 单张图库图片 |

### 标注

| 类名 | 元素 |
|------|------|
| `.callout` | 标注外层包裹 |
| `.callout-<type>` | 类型修饰符（如 `.callout-note`、`.callout-warning`、`.callout-pending`） |
| `.callout-title` | 标注标题行 |
| `.callout-content` | 标注正文内容 |

### 子文件夹列表（自动生成栏目列表）

| 类名 | 元素 |
|------|------|
| `.moss-folder-item` | 文件夹列表中的行 |
| `.moss-folder-link` | 文件夹列表项中的链接 |
| `.moss-folder-title` | 文件夹列表项中的标题 |
| `.moss-folder-description` | 文件夹列表项中的描述 |

### 系列导航

| 类名 | 元素 |
|------|------|
| `.moss-series-nav` | 系列导航块 |
| `.moss-series-nav-links` | 上一篇/下一篇链接容器 |
| `.moss-series-nav-link` | 单个上一篇或下一篇链接 |
| `.moss-series-nav-prev` | 上一篇链接 |
| `.moss-series-nav-next` | 下一篇链接 |
| `.moss-series-nav-arrow` | 系列链接内的箭头符号 |
| `.moss-series-nav-title` | 系列链接内的文章标题 |
| `.moss-series-nav-collection-row` | 显示所属集合的行 |
| `.moss-series-nav-collection` | 系列导航中的集合名称/链接 |

### 其他

| 类名 | 元素 |
|------|------|
| `.moss-colophon` | 版权页 / 页脚注释块 |
| `.moss-summary-layout` | 摘要布局包裹层 |
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

### 布局写在类里，而不是内联

需要响应式列宽时，在自定义类中定义 `grid-template-columns`，短代码中省略比例：用 `:::grid 2 {.two-col-split}` 而非 `:::grid 2 2:1 {.two-col-split}`。写了比例就会在容器上输出内联 `style=""`，优先级高于 `@media` 规则，每条属性都得加 `!important` 才能覆盖。

```css
.two-col-split {
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .two-col-split { grid-template-columns: 1fr; }
}
```

完整模式见 [[shortcodes#用 CSS 类名自定义布局]]。
