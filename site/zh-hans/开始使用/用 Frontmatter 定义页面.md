---
weight: 30
uid: 87d923cf
translationKey: docs-author-frontmatter
lang: zh-hans
description: 在文件顶部用几行 YAML 设置页面与网站的属性。
url: frontmatter
---
Frontmatter 是 markdown 文件最顶部、两行 `---` 之间的一段 YAML，用来告诉青苔这个页面的标题、日期、可见性等信息。

```yaml
---
title: 我的第一篇文章
date: 2024-06-15
description: 列表预览与搜索引擎用的简短摘要。
---

下面是正文。
```

Frontmatter 是可选的。没有它，文件照样成为页面，青苔用文件名当标题。青苔只认识下面列出的字段，其他自定义字段会被忽略。

## 用标题命名文件

每个文件名称默认成为页面标题：`隐私.md` 标题为「隐私」。 `title: 隐私说明` 则覆写原来的标题。

当文件名含中文或空格时，用 `url:` 钉一个简短、稳定的网址：`隐私.md` 加 `url: privacy`，就发布在 `/privacy`。文件名给整理文件夹的你看，`url:` 才是读者看到的地址；钉住它，重命名文件也不会让链接失效。

## 常用字段

**身份**——描述页面本身。

| 字段 | 作用 |
|------|------|
| `title` | 页面标题（覆写取自文件名的标题） |
| `description` | 列表预览与 SEO 摘要 |
| `date` | 发布日期（`YYYY-MM-DD`） |
| `tags` | 内容标签 |

**导航与可见性**——控制页面出现在哪里。

| 字段 | 作用 |
|------|------|
| `nav` | 是否出现在顶部导航栏（根目录页面默认 `true`） |
| `weight` | 导航和列表中的排序，数值越小越靠前 |
| `draft` | `true` 则完全不生成 |
| `unlisted` | 生成，但不出现在列表和 sitemap 中 |

**栏目与媒体**——文件夹页面如何展示子页面。

| 字段 | 作用 |
|------|------|
| `children` | 是否列出子页面（默认 `true`，设 `false` 关闭） |
| `children_style` | `list`、`card` 或 `summary` |
| `sort` | `date`、`weight`、`title`，或显式列出顺序 |
| `cover` | 卡片和页头用的封面图 |

多数文件夹无需声明 `sort`：青苔会自动推断——有日期的按日期，有权重的按权重，其余按标题。

## 多语言站点

青苔支持英文（`en`）、简体中文（`zh-hans`）和繁体中文（`zh-hant`）。任意一种都可作为默认语言，其余会出现在页面顶部的语言切换按钮里。

**每种语言一个文件夹**：把译文放进以语言命名的子文件夹。

```
my-site/
├── index.md          ← 默认语言
├── zh-hans/
│   └── index.md      ← 简体中文
└── zh-hant/
    └── index.md      ← 繁体中文
```

当两个语言版本的文件名不同时，用 `translationKey` 把它们关联起来，语言切换按钮才知道彼此对应：

```yaml
# posts/hello.md          # posts/你好.md
---                       ---
translationKey: hello     translationKey: hello
---                       lang: zh-hans
                          ---
```

## 完整字段

`cascade`、`series`、`also_in`、`content_width`、`typesetting`、`sidebar` 等进阶字段，以及每个字段的类型与默认值，见英文参考 [Frontmatter](/docs/writing/frontmatter/)。
