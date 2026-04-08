---
title: 链接与嵌入
uid: d7ca7969
weight: 4
description: Wikilink、嵌入、交叉引用和双语内容。
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

## 嵌入

在方括号前加 `!` 可以将其他页面的内容内联到当前页面：

```markdown
![[structure#^intro]]
```

引用的段落会直接插入当前页面。嵌入支持以下方式：

- **整页**：`![[media]]`——嵌入整个页面内容
- **章节**：`![[structure#URL]]`——嵌入该标题下的所有内容
- **块**：`![[structure#^intro]]`——嵌入用块 ID 标记的单个段落

moss 会检测循环嵌入并及时终止，不会产生无限循环。

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

## 双语内容

在文件名后追加语言后缀即可创建翻译版本：

| 文件 | 语言 |
|------|------|
| `about.md` | 站点默认语言 |
| `about.zh-hans.md` | 简体中文 |
| `about.zh-hant.md` | 繁体中文 |
| `about.en.md` | 英文（显式声明） |

有翻译版本时，页面会自动出现语言切换按钮。

### 语言检测

moss 按以下顺序确定页面语言：

1. `lang` frontmatter 字段
2. 文件名后缀（`.zh-hans.md`）
3. 内容自动检测
4. 站点默认语言

### 关联不同文件名的翻译

如果翻译版本使用了不同的文件名，用 `translationKey` 将它们关联：

```yaml
# posts/hello.md
---
translationKey: hello-post
---

# posts/ni-hao.md
---
translationKey: hello-post
---
```

两个文件都会显示语言切换按钮，互相链接。
