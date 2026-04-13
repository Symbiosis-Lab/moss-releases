---
title: JavaScript
uid: 1120a418
weight: 3
description: 自定义脚本、数据属性和 DOM 结构。
translationKey: docs-design-javascript
lang: zh-hans
---

## 自定义脚本

在项目根目录创建 `script.js`。moss 在所有内置脚本之后加载它，代码运行时 DOM 已经就绪。

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

不需要构建步骤。每个页面自动加载该文件。

## 数据属性

moss 在 HTML 元素上设置数据属性，你可以读取或用来做样式判断。

| 属性 | 元素 | 值 | 用途 |
|------|------|-----|------|
| `data-theme` | `<html>` | `"light"`、`"dark"` | 当前颜色主题 |
| `data-moss-preview` | `<body>` | 存在/不存在 | 预览模式下设置 |
| `data-comments` | `<article>` | `"true"`、`"false"` | 是否启用评论 |
| `data-source-line` | 标题、段落 | 行号 | 源 markdown 行号（开发辅助） |
| `data-content-width` | `<article>` | `"wide"` | 内容宽度覆盖 |

### 检测主题

```javascript
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
```

## DOM 结构

生成的 HTML 在所有页面上保持一致的结构。

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
        <!-- 页面内容 -->
      </article>
    </main>
    <footer class="moss-colophon">...</footer>
  </body>
</html>
```

**可以挂钩的关键元素：**

| 选择器 | 说明 |
|--------|------|
| `.main-nav` | 顶部导航栏 |
| `.container` | 主内容包裹层 |
| `article` | 页面内容区域 |
| `.article-title` | 页面标题 |
| `.article-meta` | 日期和元数据 |
| `.moss-colophon` | 页脚 |

**可以安全修改的区域：** `article` 和 `.moss-colophon` 内部的任何内容。导航结构由 moss 管理——可以添加样式，但避免移除或重排其子元素。
