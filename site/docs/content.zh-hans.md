---
title: 内容结构
weight: 2
description: 文件与文件夹如何转化为页面和导航。
---

## 每个文件对应一个页面

文件夹中的每个 `.md` 文件都会生成一个页面，每个子文件夹都会成为一个栏目。无需任何配置——在 moss 中打开文件夹，结构已经就绪。

```
my-site/
├── index.md          → /
├── about.md          → /about/
└── posts/
    ├── index.md      → /posts/
    └── hello.md      → /posts/hello/
```

## URL 与文件路径一一对应

| 文件 | URL |
|------|-----|
| `index.md` | `/` |
| `about.md` | `/about/` |
| `posts/hello.md` | `/posts/hello/` |
| `posts/index.md` | `/posts/` |
| `docs/getting-started.md` | `/docs/getting-started/` |

在 frontmatter 中使用 `url` 字段可以为任意页面指定自定义 URL：

```yaml
---
title: Hello World
url: /blog/2024/hello/
---
```

## 文件夹成为栏目页面

当一个文件夹内没有 `index.md` 时，moss 会自动生成一个栏目页面，列出其中的所有内容。添加 `index.md` 可以为该页面提供自定义内容。

与父文件夹同名的文件也可以作为文件夹索引页：

```
posts/
├── posts.md     ← 作为 /posts/
└── hello.md     ← 作为 /posts/hello/
```

## 根目录页面自动出现在导航中

根目录下的页面会出现在顶部导航中。通过两个 frontmatter 字段来控制：

```yaml
---
title: About
nav: false      # 完全不显示在顶部导航中
weight: 10      # 数值越小越靠前
---
```

根目录下的文件夹，只要其 `index.md` 中设置了标题，就会作为导航项显示。

## 子页面列表默认显示

栏目页面会自动列出其子页面。Frontmatter 可以控制列表的展示方式：

```yaml
---
title: Posts
children: false           # 完全隐藏子页面列表
children_style: card      # "list"（默认）或 "card"
children_group: year      # 按年份分组（也可选 "none"）
children_depth: all       # "direct"（默认）或 "all"（所有层级）
---
```

卡片布局会使用每个子页面 frontmatter 中的 `cover` 图片。将 `cover_type` 设为 `"video"` 或 `"iframe"` 可支持非图片封面。

## 排序规则明确可预期

在任意栏目中，子页面按以下顺序排列：

1. 子文件夹，按字母顺序
2. 有 `date` 的文件，最新的排在前面
3. 没有 `date` 的文件，按字母顺序

使用 `weight` 可覆盖默认排序——数值越小越靠前，优先级高于按日期排序。

## 可见性分三个级别

| 设置 | 生成页面 | 出现在列表 | Sitemap |
|---------|-----------|-------|---------|
| _(默认)_ | 是 | 是 | 是 |
| `unlisted: true` | 是 | 否 | 否 |
| `draft: true` | 否 | 否 | 否 |

在文件夹名称前加 `_` 前缀，可将整个文件夹完全排除在处理范围之外：

```
my-site/
├── _drafts/      ← 完全忽略
└── posts/        ← 正常处理
```

## Frontmatter 字段参考

| 字段 | 类型 | 用途 |
|-------|------|---------|
| `title` | string | 页面标题 |
| `date` | string | 发布日期（YYYY-MM-DD） |
| `weight` | integer | 导航/列表排序（数值越小越靠前） |
| `url` | string | 自定义 URL |
| `cover` | string | 卡片布局封面图 |
| `cover_type` | string | `"video"`、`"iframe"` 或 `"image"` |
| `nav` | boolean | 是否显示在顶部导航 |
| `draft` | boolean | 跳过生成 |
| `unlisted` | boolean | 生成但不出现在列表/Sitemap |
| `description` | string | SEO 描述和列表摘要 |
| `tags` | list | 内容标签 |
| `children` | boolean | 是否显示子页面列表（默认：true） |
| `sidebar` | string | 用作侧边栏的文件夹 Wikilink |
| `children_style` | string | `"list"`（默认）或 `"card"` |
| `children_group` | string | `"year"` 或 `"none"` |
| `children_depth` | string | `"direct"`（默认）或 `"all"` |
| `series` | bool/list | 系列声明 |
| `breadcrumb` | boolean | 覆盖全站面包屑设置 |
| `footer` | boolean | 覆盖全站页脚设置 |
| `cascade` | map | 将值推送到所有子页面 |
| `also_in` | list | 文章同时出现的其他文件夹路径 |
| `lang` | string | 语言覆盖（`"en"`、`"zh-hans"`） |
| `translationKey` | string | 将多个文件关联为同一内容的翻译版本 |
| `comments` | boolean | 是否显示评论（默认：true） |
| `uid` | string | 内容寻址 ID（自动生成） |
| `layout` | string | 模板覆盖：`"page"` 或 `"article"` |
| `review_of` | string | 被评测作品的 URL |
| `rating` | integer | 评分（1–5 分） |

使用 `cascade` 可以将某个值推送到所有子页面，无需在每个文件中重复设置：

```yaml
---
title: Posts
cascade:
  comments: false
---
```

## 双语内容通过文件名区分

在文件名后添加语言后缀即可创建翻译版本：

| 文件 | 语言 |
|------|----------|
| `about.md` | 网站默认语言 |
| `about.zh-hans.md` | 简体中文 |
| `about.en.md` | 英文（显式指定） |

语言解析的优先级顺序为：`lang` frontmatter → 文件名后缀 → 内容自动检测 → 网站默认语言。

对于文件名不同的翻译，使用 `translationKey` 将它们关联起来：

```yaml
# posts/hello.md
---
translationKey: hello-post
---

# posts/ni-hao.md
---
translationKey: hello-post
lang: zh-hans
---
```

## 短代码扩展 Markdown

短代码使用 `:::` 块语法，每个短代码以 `:::` 结束。

**主图：**
```markdown
:::hero image.jpg
# 标题文字
:::
```

**网格布局：**
```markdown
:::grid 3
第一列内容。

第二列内容。

第三列内容。
:::
```

**图片画廊：**
```markdown
:::gallery
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
:::
```

**目录：**
```markdown
:::toc
:::
```

**提示块：**
```markdown
:::callout warning
此操作不可撤销。
:::
```

`callout` 的有效类型：`note`、`warning`、`tip`。
