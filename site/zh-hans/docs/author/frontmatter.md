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

Frontmatter 不是必须的。没有 frontmatter 的文件照样会变成页面，moss 会用文件名作为标题。

### 固定字段表

Frontmatter 使用**固定字段表**：moss 只识别本页列出的字段，其他自定义字段会被静默忽略。如果需要存储自定义的页面元数据，请写在正文中：一段 markdown 段落、`::: {.meta}` 围栏分区或数据表格。

`description:` 用于 SEO meta 标签、Open Graph 预览和 sitemap 摘要，**不会**渲染为页面上可见的导语。若需要可见的副标题或引言，请在 `# H1` 正下方加一段 `> 引用块`，默认主题会将 `h1 + blockquote` 样式化为导语。

## 标识

描述页面本身的字段。

<!-- auto:start:frontmatter-identity -->
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | 文件名 | 页面标题 |
| `description` | string | 无 | SEO 描述，同时用于列表预览 |
| `date` | string | 无 | 发布日期（`YYYY-MM-DD`） |
| `tags` | list | 无 | 内容标签 |
| `lang` | string | 自动检测 | 语言覆盖（`"en"`、`"zh-hans"`、`"zh-hant"`） |
<!-- auto:end:frontmatter-identity -->

`title:` 是页面标题。在文章页面上，moss 始终将其渲染为正文上方的 `<h1 class="moss-article-title">`；若 `title:` 缺省则使用文件名（首字母大写）。如果正文本身以 `# 同名标题` 开头，该正文 H1 会被自动去重，读者只看到一个标题，而非两个。

正文中其他位置的 `# H1` 是章节标题，而非文档标题。moss 不会从正文结构推断标题，请在 `title:` 中写明，或依赖文件名。

如需在某篇文章上单独关闭注入的标题（例如某个特殊设计的着陆页），可写 `title: ""`（显式空字符串）。这与省略 `title:` 不同：省略会回退到文件名。文件夹与索引页面从不注入；它们的正文按作者所写渲染。

### 本地化文件名

由于标题会回退到文件名，你可以用页面自己的语言命名文件，让 moss 替你生成标题——`隐私.md` 渲染为“隐私”，`Privacy.md` 渲染为“Privacy”，无需 `title:` 字段，也不必在正文写 `# H1`。当文件名不是 ASCII 时，用 `url` 字段钉住一个简短稳定的网址，让发布路径保持干净：`url: privacy` 让 `隐私.md` 发布在 `/privacy`。

引用某个章节时，链接到它的标题锚点——`[联系我们](#联系我们)`——而不要手写 `<a id>`。moss 会根据标题文字生成 id，中文也一样。

## 导航

控制页面在网站导航和界面元素中的呈现。

<!-- auto:start:frontmatter-navigation -->
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `nav` | boolean | 根目录页面默认 `true` | 是否显示在顶部导航栏 |
| `weight` | integer | 无 | 导航和列表中的排序（数值越小越靠前） |
| `breadcrumb` | boolean | 站点默认值 | 是否显示面包屑。在首页设为 `true` 可全站启用面包屑；在任意页面设为 `false` 可单独关闭。 |
| `footer` | boolean | 站点默认值 | 是否作为链接出现在网站页脚 |
| `footer_align` | string | `"left"` | 页脚链接对齐方式（`"left"` 或 `"right"`） |
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
| `children_source` | string | 无 | wikilink 指向另一个文件夹，显示该文件夹的子页面 |
<!-- auto:end:frontmatter-children -->

`children_source` 的值是一个 wikilink，比如 `children_source: "[[news]]"`。

卡片布局会使用每个子页面 frontmatter 中的 `cover` 图片。

### 排序

`sort` 控制文件夹的子页面以何种顺序排列，进而决定卡片的外观。

| 取值 | 排序 | 卡片元数据 |
|---|---|---|
| `date` | 最新在前 | 年 · 月 |
| `weight` | 按 `weight` 整数升序;未设权重的排到末尾 | (无) |
| `title` | 按标题字母顺序 | (无) |
| `[a, b, c]` | 显式列出的子页面按列表顺序在前,其余按推断的排序轴 | (无) |

```yaml
---
title: 项目
sort: title
---
```

未声明 `sort` 时,moss 从子页面推断:

1. 任一子页面设了 `weight` → `sort: weight`
2. 80% 以上的子页面有 `date` → `sort: date`
3. 否则 → `sort: title`

因此多数文件夹都不需要声明 `sort`：博客文件夹自动是 `date`,带权重的文档自动是 `weight`,没有日期的项目集自动是 `title`。

**为什么排序决定外观**:日期排序的列表会在每张卡片的元数据槽位显示日期;权重和标题排序则不渲染元数据槽位(没有空白占位)。在非日期排序中,文件夹卡片仅在没有描述时显示小字号的"N 篇文章"副标题。

旧的 `order: [...]` 字段是 `sort: [...]` 的向后兼容别名。

## 媒体

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cover` | string | 无 | 封面图路径，用于卡片布局和页面头部 |
| `cover_type` | string | 自动检测 | `"image"`、`"video"` 或 `"iframe"` |
| `logo` | string | 无 | 显示在网站头部的 Logo 图片 |

详见 [[media#Cover images]]。

## 版面

控制页面正文的排版方向和宽度。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `typesetting` | string | `"horizontal"` | `"horizontal"`（默认）或 `"vertical"`（CJK 右起竖排） |
| `content_width` | string | 默认（`67ch`） | `"wide"`（80ch，适合多栏/表格）或 `"full"`（站点最大宽度，适合仪表板） |

可以在文件夹的 `cascade` 中设置，应用到整个栏目：

```yaml
---
title: 仪表板
cascade:
  content_width: full
---
```

## 交叉列表

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `also_in` | list | 无 | 让文章同时出现在其他文件夹的子页面列表中 |
| `series` | boolean | 推断 | 是否在该文件夹的每个子页面渲染上一篇/下一篇导航 |

`also_in` 让一篇文章同时出现在多个栏目中，无需复制文件：

```yaml
---
title: 搭建花架
also_in:
  - projects
  - featured
---
```

`series` 控制每篇子文章底部是否显示上一篇/下一篇导航。`sort: weight` (或显式列表) 的文件夹默认开启，因为有序的内容通常暗示连续阅读；`sort: date` 和 `sort: title` 默认关闭。可以显式覆盖：

```yaml
# 一个按权重排序的参考文档,但不想要上一/下一导航
---
title: 参考
series: false
---
```

也可以在单篇文章自己的 frontmatter 设 `series: false`,让那一篇退出导航链。

## 高级字段

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cascade` | map | 无 | 向所有后代页面推送值 |
| `url` | string | 由文件路径生成 | 自定义 URL |
| `translationKey` | string | 无 | 将不同文件关联为同一内容的翻译版本 |
| `uid` | string | 自动生成 | 内容寻址 ID |
| `layout` | string | auto | 模板：`"page"` 或 `"article"` |
| `sidebar` | string | 无 | wikilink 指向一个文件夹，用作侧边栏导航 |
| `review_of` | string | 无 | 被评论作品的 URL |
| `rating` | integer | 无 | 评分（1–5） |
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
