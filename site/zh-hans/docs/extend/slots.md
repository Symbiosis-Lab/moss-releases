---
title: 插槽
uid: 19d46f60
weight: 3
description: 模板注入点与增强阶段。
translationKey: docs-extend-slots
lang: zh-hans
---

## 模板插槽

插槽是 HTML 模板中的命名注入点，插件可以在这些位置插入内容。共有六个插槽： ^def-template-slots

| 插槽 | 位置 |
|------|------|
| `head-end` | `</head>` 之前——用于样式表和 meta 标签 |
| `after-title` | 文章标题和日期之后 |
| `before-article-end` | `</article>` 之前 |
| `after-article` | `</article>` 之后——用于评论、相关文章 |
| `footer-right` | 页脚内部 |
| `body-end` | `</body>` 之前——用于脚本和追踪代码 |

## 插槽的工作原理

生成阶段，moss 在每个插槽位置写入 HTML 注释标记：

```html
<article>
  <h1>页面标题</h1>
  <!-- slot:after-title -->
  <p>内容……</p>
  <!-- slot:before-article-end -->
</article>
<!-- slot:after-article -->
```

在**增强阶段**，每个拥有 `enhance` 能力的插件返回想要填充的插槽内容。moss 用插件内容替换标记。未被填充的标记会从最终输出中移除——它们不会出现在发布的 HTML 中。

多个插件可以写入同一个插槽。内容按插件加载顺序拼接。

## EnhanceResult

enhance 钩子返回一个将插槽名映射到 HTML 字符串的对象：

```typescript
async enhance(ctx) {
  return {
    slots: {
      "after-article": `<section class="comments">
        <script src="https://comments.example/embed.js"></script>
      </section>`,
      "head-end": `<link rel="stylesheet" href="/comments.css">`
    }
  };
}
```

只需包含你的插件用到的插槽。省略的插槽留给其他插件或被移除。

## 无闪烁预览

预览模式下，moss 在每次文件变更时重新构建网站。为了避免预览画面闪烁：

1. 新输出先构建到 `.moss/site-stage/`
2. 预览服务器原子切换指针到 `site-stage/`
3. 暂存内容复制到 `.moss/site/`（规范目录）
4. 指针切回 `.moss/site/`

预览服务器绝不会读取构建到一半的目录。切换是瞬间完成的——只是指针更新，不是文件重命名。
