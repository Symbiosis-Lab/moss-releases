---
title: Frontmatter
uid: 87d923cf
weight: 2
description: 控制 moss 处理每个页面的元数据字段。
translationKey: docs-author-frontmatter
lang: zh-hans
---

## 什么是 frontmatter

Frontmatter 是 markdown 文件最顶部、两行 `---` 之间的一段 YAML，告诉 moss 这个页面的标题、日期、可见性等信息。 ^def-frontmatter

```yaml
---
title: 我的第一篇文章
date: 2024-06-15
description: 搜索引擎和列表预览用的简短摘要。
---

下面是正文内容。
```

Frontmatter 不是必须的。没有 frontmatter 的文件照样会变成页面——moss 会用文件名作为标题。

## 标识

描述页面本身的字段。

<!-- auto:start:frontmatter-identity -->
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | 文件名 | 页面标题 |
| `description` | string | — | SEO 描述，同时用于列表预览 |
| `date` | string | — | 发布日期（`YYYY-MM-DD`） |
| `tags` | list | — | 内容标签 |
| `lang` | string | 自动检测 | 语言覆盖（`"en"`、`"zh-hans"`、`"zh-hant"`） |
<!-- auto:end:frontmatter-identity -->

## 导航

控制页面在网站导航和界面元素中的呈现。

<!-- auto:start:frontmatter-navigation -->
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `nav` | boolean | 根目录页面默认 `true` | 是否显示在顶部导航栏 |
| `weight` | integer | — | 导航和列表中的排序（数值越小越靠前） |
| `breadcrumb` | boolean | 站点默认值 | 是否显示面包屑 |
| `footer` | boolean | 站点默认值 | 是否显示页脚 |
<!-- auto:end:frontmatter-navigation -->

## 可见性

参见[结构](/docs/structure/)中对[可见性](/docs/structure/#可见性)的定义。

<!-- auto:start:frontmatter-visibility -->
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `draft` | boolean | `false` | 跳过生成，完全不产出 |
| `unlisted` | boolean | `false` | 正常生成，但不出现在列表和 sitemap 中 |
<!-- auto:end:frontmatter-visibility -->

## 子页面

这些字段控制[[structure#^folder-page|文件夹页面]]如何展示其子页面。

<!-- auto:start:frontmatter-children -->
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | boolean | `true` | 是否在栏目页显示子页面列表 |
| `children_style` | string | `"list"` | `"list"`、`"card"` 或 `"summary"` |
| `children_group` | string | `"none"` | 按 `"year"` 分组或 `"none"` |
| `children_depth` | string | `"direct"` | `"direct"`（直接子页面）或 `"all"`（所有后代） |
| `children_source` | string | — | wikilink 指向另一个文件夹，显示该文件夹的子页面 |
<!-- auto:end:frontmatter-children -->

卡片布局会使用每个子页面 frontmatter 中的 `cover` 图片。

## 媒体

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cover` | string | — | 封面图路径，用于卡片布局和页面头部 |
| `cover_type` | string | 自动检测 | `"image"`、`"video"` 或 `"iframe"` |
| `logo` | string | — | 显示在网站头部的 Logo 图片 |

详见 [[media#Cover images]]。

## 交叉列表

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `also_in` | list | — | 让文章同时出现在其他文件夹的子页面列表中 |
| `series` | bool/list | — | 系列声明——将相关文章按阅读顺序分组 |

`also_in` 让一篇文章同时出现在多个栏目中，无需复制文件：

```yaml
---
title: 搭建花架
also_in:
  - projects
  - featured
---
```

## 高级字段

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cascade` | map | — | 向所有后代页面推送值 |
| `url` | string | 由文件路径生成 | 自定义 URL |
| `translationKey` | string | — | 将不同文件关联为同一内容的翻译版本 |
| `uid` | string | 自动生成 | 内容寻址 ID |
| `layout` | string | auto | 模板：`"page"` 或 `"article"` |
| `sidebar` | string | — | wikilink 指向一个文件夹，用作侧边栏导航 |
| `review_of` | string | — | 被评论作品的 URL |
| `rating` | integer | — | 评分（1–5） |
| `comments` | boolean | `true` | 是否显示评论区 |

### Cascade

`cascade` 将 frontmatter 值推送给所有后代页面，避免在每个文件中重复：

```yaml
---
title: 文档
cascade:
  breadcrumb: true
  comments: false
---
```

这个页面下所有嵌套页面都会继承这些值，除非在自己的 frontmatter 中覆盖。
