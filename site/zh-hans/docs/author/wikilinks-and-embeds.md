---
title: Wikilink 与嵌入
uid: d7ca7969
weight: 3
description: 链接页面、嵌入章节、引用段落。
translationKey: docs-author-links
lang: zh-hans
---

## Wikilink

用双方括号链接站内任意页面：

```markdown
详见 [[structure]] 页面。
```

moss 会用文本匹配文件名、标题和 slug 来解析链接。不需要写完整路径——`[[getting-started]]` 会自动找到 `docs/start/getting-started.md`。

**自定义显示文字：**

```markdown
参见 [[structure|内容结构文档]]。
```

**链接到标题：**

```markdown
查看 [[structure#URL]] 的说明。
```

**链接到块引用：**

```markdown
如 [[structure#^intro]] 所定义。
```

### 解析规则

当多个文件可能匹配时，moss 按优先级选择：

1. 文件名精确匹配
2. 去掉扩展名后匹配
3. 文件夹笔记（与文件夹同名的文件）
4. 就近原则（与链接所在页面同目录的文件优先）

## 图片嵌入

在括号前加 `!` 嵌入图片：

```markdown
![[photo.jpg]]
![[poster-farewell.webp]]
```

moss 会在整个内容树中搜索文件名来解析路径——无需填写相对路径。将图片放入排除的资源文件夹（`assets/`、`images/`、`static/`、`public/`），这样它们会被对外提供服务，但不会被视为内容页面。之后在任意 markdown 文件中，用裸文件名引用即可。

```
work/
├── index.md         ← 使用 ![[poster-farewell.webp]]
└── assets/
    └── poster-farewell.webp   ← 不是页面；作为静态文件提供
```

语言树优先级（上方第 4 条规则）同样适用于图片解析：`zh-hans/about.md` 中的 `![[photo.jpg]]` 若存在 `zh-hans/photo.jpg`，则优先使用该版本。

**管道语法**控制显示方式：`![[photo.jpg|contain top]]`。完整选项见 [[media]]。

## 嵌入

在方括号前加 `!` 可以将其他页面的内容内联到当前页面：

```markdown
![[structure#^intro]]
```

引用的段落会直接插入当前页面。嵌入支持以下方式：

- **整页**：`![[media]]`——嵌入整个页面内容
- **章节**：`![[structure#URL]]`——嵌入该标题下的所有内容
- **块**：`![[structure#^intro]]`——嵌入用块 ID 标记的单个段落
- **文件夹列表**：`![[journal/]]`——把另一个文件夹的子页面作为卡片嵌入(见下)

moss 会检测循环嵌入并及时终止，不会产生无限循环。

## 文件夹列表

路径以 `/` 结尾的 wikilink 会把文件夹的子页面内联渲染为卡片：

```markdown
# 威廉·布莱克的笔记

读书与写作的个人记录。

## 近期日志

![[journal/|limit:5,more]]

## 书目
```

末尾的斜杠表示这是文件夹,不是单个页面。卡片继承目标文件夹的 `sort` (见 [[frontmatter#排序]]) —— 因此带日期的 `journal/` 会按日期排序,没有日期的 `projects/` 会按标题字母排序。

**管道参数**(逗号分隔):

| 参数 | 含义 |
|---|---|
| `limit:N` | 最多渲染 N 项 |
| `more` | 截断时在末尾追加跳转到源文件夹的"更多 →"链接 |
| `sort:date` / `sort:weight` / `sort:title` | 仅在此嵌入处覆盖源文件夹的排序轴 |

示例:

```markdown
![[journal/]]                       # 完整列表
![[journal/|limit:5]]               # 最新 5 条(具体看 journal 的排序)
![[journal/|limit:5,more]]          # 最新 5 条 + "更多 →" 链接
![[news/|sort:date,limit:3]]        # 临时切换排序轴
```

路径解析规则与其他 wikilink 相同:相对路径以当前页面所在文件夹为基准,绝对路径(`/journal/`)以站点根目录为基准。

### 何时用文件夹列表,何时用 `children_source`

把另一个文件夹的子页面渲染到本页有两种方式:

| 机制 | 适用场景 |
|---|---|
| 行内 `![[folder/]]` wikilink | 同一页有多个嵌入,或想让列表出现在其他 markdown 段落之间。作者控制每个列表的位置。 |
| frontmatter 中的 `children_source: "[[folder]]"` | 整页只有一个主列表:本页本身就是另一文件夹的列表。位置由主题决定。 |

多数页面只有一个主列表,frontmatter 中的 `children_source` 是合适选择。当列表要混在其他内容之间时,使用 `![[folder/]]`。

## 块引用

在段落末尾添加 `^block-id` 标记：

```markdown
moss 将文件夹变成网站。 ^intro
```

其他页面就可以用 `[[page#^intro]]` 链接到、或用 `![[page#^intro]]` 嵌入这个段落。块 ID 是稳定的——修改段落内容或上方标题都不会影响它。

## Markdown 链接

标准 markdown 链接照常使用：

```markdown
[访问示例](https://example.com)
[关于页面](about.md)
[章节链接](/docs/structure/)
```

相对路径和绝对路径都可以。外部链接自动在新标签页打开。

多语言相关内容（`translationKey`、语言树、自动语言切换按钮）已迁移到 [[../multilingual|多语言站点]]。

## 双语内容

在文件名后附加语言后缀即可创建译文：

| 文件 | 语言 |
|------|------|
| `about.md` | 站点默认语言 |
| `about.zh-hans.md` | 简体中文 |
| `about.zh-hant.md` | 繁体中文 |
| `about.en.md` | 英文（显式指定） |

有译文时，页面上会自动出现语言切换按钮。

### 语言检测

moss 按以下顺序确定页面语言：

1. frontmatter 的 `lang` 字段
2. 文件名后缀（`.zh-hans.md`）
3. 内容自动检测
4. 站点默认语言

### 为不同文件名的译文建立关联

译文文件名不同时，用 `translationKey` 将它们关联起来：

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

两个文件都会显示互相跳转的语言切换按钮。
