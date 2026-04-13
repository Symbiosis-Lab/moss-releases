---
title: 结构
uid: 5526265a
weight: 2
description: 文件和文件夹如何变成页面、栏目和导航。
translationKey: docs-structure
lang: zh-hans
---

文件夹里的每个 `.md` 文件都会变成一个页面，每个子文件夹变成一个栏目。不需要任何配置——在 moss 中打开文件夹，网站结构已经成型。

## 文件夹页面

文件夹中的 `index.md` 就是该文件夹的页面。访问文件夹的 URL 时，看到的就是它。

moss 依次识别以下文件名作为文件夹页面：

1. `index.md`
2. `readme.md`
3. `_index.md`
4. `main.md`

不区分大小写：`README.md`、`Index.md`、`MAIN.md` 都可以。 ^folder-page

与父文件夹同名的文件也会被视为文件夹页面：

```
recipes/
├── recipes.md   ← 文件夹页面（与文件夹同名）
├── pasta.md
└── soup.md
```

如果文件夹中没有 `index.md`，moss 会自动生成一个栏目页，列出文件夹中的所有内容。

根文件夹的 `index.md` 就是你的**首页**——网站的封面。

```
my-site/
├── index.md        ← 首页
├── about.md
└── posts/
    ├── index.md    ← /posts/ 的栏目页
    ├── hello.md
    └── world.md
```

## URL

文件路径决定页面的 URL。moss 去掉文件扩展名，加上尾部斜线，生成干净的 URL：

| 文件 | URL |
|------|-----|
| `index.md` | `/` |
| `about.md` | `/about/` |
| `posts/index.md` | `/posts/` |
| `posts/hello.md` | `/posts/hello/` |
| `docs/getting-started.md` | `/docs/getting-started/` |

在 frontmatter 中用 `url` 字段可以自定义任意页面的 URL：

```yaml
---
title: Hello World
url: /blog/2024/hello/
---
```

## 可见性

页面有三种可见性级别：

| 设置 | 生成 | 列表中可见 | 收录进 Sitemap |
|------|------|-----------|---------------|
| _(默认)_ | 是 | 是 | 是 |
| `unlisted: true` | 是 | 否 | 否 |
| `draft: true` | 否 | 否 | 否 |

在 frontmatter 中设置：

```yaml
---
title: 正在撰写
draft: true
---
```

文件夹名以 `_` 开头则完全排除在处理之外：

```
my-site/
├── _drafts/      ← moss 忽略
├── _templates/   ← moss 忽略
└── posts/        ← 正常处理
```

## 排序

在任意栏目中，内容按以下规则排列：

1. 子文件夹在前，按字母排序
2. 有 `date` 的文件，最新的排在前面
3. 没有 `date` 的文件，按字母排序

用 `weight` 覆盖默认排序——数值越小越靠前，优先级高于日期排序：

```yaml
---
title: 置顶文章
weight: 1
---
```

## 导航

网站根目录的页面会自动出现在顶部导航栏。用两个 frontmatter 字段控制：

```yaml
---
title: 关于
nav: true       # 显示在导航栏（根目录页面默认为 true）
weight: 2       # 导航中的位置（数值越小越靠左）
---
```

不想显示在导航中：

```yaml
---
title: 隐藏页面
nav: false
---
```

根目录的文件夹，只要 index.md 设了标题，就会作为导航项出现。
