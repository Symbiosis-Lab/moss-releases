---
title: 短代码
uid: bd025c66
weight: 3
description: 扩展 markdown 的布局块和组件。
translationKey: docs-author-shortcodes
lang: zh-hans
---

## 什么是短代码

短代码是 markdown 中的特殊块，用来创建标准 markdown 做不到的布局和组件——多栏、图库、大图横幅等。语法是 `:::` 块。 ^def-shortcode

```markdown
:::grid 2
第一栏内容。
+++
第二栏内容。
:::
```

## Hero

全宽大图区域，支持背景图片或视频，可叠加文字。

```markdown
:::hero
![[panorama.jpg]]
# 欢迎来到我的网站
一个属于自己的角落。
:::
```

块内第一行是媒体引用（wikilink、markdown 图片或文件名）。后续内容作为叠加层显示在媒体上方。

用管道语法控制显示方式：

```markdown
:::hero
![[mountains.jpg|contain top]]
:::
```

## Grid

多栏布局。指定列数，可选比例。

```markdown
:::grid 3
第一栏。
+++
第二栏。
+++
第三栏。
:::
```

用 `+++` 分隔各栏。`grid` 后面的数字指定列数。

**自定义比例：**

```markdown
:::grid 2 1:2
窄侧边栏。
+++
宽主内容区。
:::
```

**添加自定义类：**

```markdown
:::grid 3 {.profiles .featured}
成员一。
+++
成员二。
+++
成员三。
:::
```

### 栏内内容

每栏自动识别并渲染以下内容：

- **Wikilink**：`[[folder_name]]` 或 `[[文章标题]]`——渲染为带封面的卡片
- **Markdown 链接**：`[文字](url)`
- **图片**：`![描述](path.jpg)` 或 `![[photo.jpg]]`
- **裸 URL**：`https://example.com`——自动转为链接

### 单链接栏

当一栏的全部实质内容仅为一个 markdown 链接时，moss 会把整栏包裹成一个 `<a>`。链接目标（内部或外部）和方括号内的内容（纯文字、图片、标题、段落，或任意组合）都不影响这一规则。

**外部链接**（`http://` 或 `https://`）→ `.moss-grid-card.friend-card`。如有配置，moss 会自动抓取链接元数据（标题、favicon）。适用于友情链接页、链接目录：

```markdown
:::grid 3
[MDN](https://developer.mozilla.org)
+++
[Rust](https://rust-lang.org)

一门内存安全的系统语言。
+++
[GitHub](https://github.com)
:::
```

**内部链接**（站内相对路径：`/foo`、`./foo`，或 wikilink 目标）→ `.moss-grid-card.link-card`。不抓取元数据。适用于导航网格、作品集、详情卡片：

```markdown
:::grid 2 {.work-cards}
[![[poster-farewell.webp]]
#### 改删别姬
多语言民族志戏剧 · 2026 年 5 月](/farewell)
+++
[![[daowu-home.jpg]]
#### 棹乌之家
苗语社区戏剧](/daowu)
:::
```

链接的方括号内可以包含图片、标题和段落；moss 会输出一个 `<a>` 包裹全部内容。

如果栏内包含其他内容——两个链接、文字加链接、独立的标题加段落——将渲染为普通栏内容，不会被包裹。这样可在同一网格中混合可点击卡片与富文本栏。

主题 CSS 可独立针对两种变体：

```css
.moss-grid-card.friend-card { … }  /* 外部链接栏 */
.moss-grid-card.link-card   { … }  /* 内部链接栏 */
```

### 文件夹链接自动转换与关闭

`:::grid N` 中，若某一栏的全部内容仅为一个指向**已知文件夹**的内部链接，moss 会自动将其转换为 `moss-collection-card`——与 `children_style: card` 文件夹列表使用的同款卡片。moss 会读取该文件夹的封面图、标题和子页面数量，渲染完整卡片样式。

```markdown
:::grid 3
[[work]]
+++
[[essays]]
+++
[[archive]]
:::
```

这是默认行为，对于栏目索引页面通常正是所需效果。

**用 `.no-cards` 关闭自动转换：**

```markdown
:::grid 3 {.no-cards}
[[work]]
+++
[[essays]]
+++
[[archive]]
:::
```

`.no-cards` 修饰符完全跳过自动转换。适用场景：

- **导航网格**——页脚列表只需纯链接，不需要集合卡片。
- **Hero 分栏布局**——某栏含有 CTA 按钮，不应呈现为卡片。
- **复合链接网格**——栏内使用 `[…](/url)` 包裹模式，应渲染为 `.link-card` 或 `.friend-card`，而非集合卡片。

CSS 目标选择器：

```css
.moss-collection-grid { … }        /* 自动转换后的文件夹网格 */
.moss-collection-card { … }        /* 单张集合卡片 */
```

### 列数与比例

`:::grid N` 中 `N` 是列数。可选 `a:b:c…` 比例设置各列宽度比：

```markdown
:::grid 3 2:1:1
左宽。
+++
中窄。
+++
右窄。
:::
```

比例段数必须与列数一致。

## 命名类围栏 div

当需要给一段 markdown 区域加样式，又不想引入新的具名短代码时，可以用不带短代码名的 `:::` 围栏加属性块：

```markdown
::: {.tagline}
通过社区剧场推动公民行动。
:::
```

渲染为

```html
<div class="tagline">
  <p>通过社区剧场推动公民行动。</p>
</div>
```

div 内部按完整 markdown 渲染——标题、列表、图片、链接，甚至嵌套短代码都正常工作。支持多个类名：

```markdown
::: {.hero .narrow}
## 我们的故事

创立于 2018 年，我们做的是倾听的剧场。
:::
```

嵌套遵循和其他短代码相同的 arity 规则：外层 `:::`，内层 `::::`，再内层 `:::::`。

没有属性块（没有 `{.class}`）的光秃 `:::` 不是短代码——它会保留为字面文本输出。

命名类围栏 div 用来替代 `<div class="…">` HTML 包装。类名放进 `.moss/theme/style.css`，markdown 保持可读。

## Gallery

图片画廊。

```markdown
:::gallery
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
![](photo4.jpg)
:::
```

可指定列数：

```markdown
:::gallery 3
![](photo1.jpg)
![](photo2.jpg)
![](photo3.jpg)
:::
```

## Buttons

将 markdown 链接渲染为按钮行。第一个链接是主按钮，其余为次要按钮。

```markdown
:::buttons
[下载](https://example.com/download)
[查看源码](https://github.com/example)
:::
```

### 嵌套进 grid

嵌套短代码遵循 **arity 规则**：内层围栏比外层多一个冒号。因此 `:::grid` 内可以放 `::::buttons`，而 `::::buttons` 内还可以放 `:::::callouts`，依此类推。每个围栏的裸闭合标记（`:::`、`::::`、`:::::`）与同等冒号数的开始标记匹配。若闭合行冒号数有误，解析器会将其视为字面内容，而不是静默吞掉周围文本。

```markdown
:::grid 2 2:3 {.hero-split}
# 宣传资料

::::buttons {.inverted}
[下载 PDF](https://example.com/deck.pdf)
[联系我们](mailto:hi@example.com)
::::
---
联系信息
:::
```

现有从未嵌套过围栏的站点无需改动——普通的 `:::grid ... :::` 不含更深层的块，解析方式完全不变。

## 用 CSS 类名自定义布局

当你需要超出内置短代码的布局——两栏分割、不对称 hero、侧边栏加主内容区——可以用 `{.classname}` 附加一个类名，把布局逻辑交给 `.moss/theme/style.css` 管理。这样 CSS 集中在一处，响应式的 `@media` 规则也不需要 `!important`。

**推荐做法。** 使用 `:::grid N {.your-class}`（不写比例），在 CSS 中定义比例：

```markdown
:::grid 2 {.two-col-split}
# 主旨

主内容区——标题、段落、图片，随你放。
+++
侧边栏，放标注或元数据。
:::
```

```css
/* .moss/theme/style.css */
.two-col-split {
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .two-col-split { grid-template-columns: 1fr; }
}
```

grid 容器渲染为 `<div class="moss-grid two-col-split">`，你的类名与内置 `moss-grid` 并列，可以覆盖它的 `grid-template-columns`。

**避免的做法。** 在 `:::grid 2 2:1 {.two-col-split}` 中同时写比例，会在容器上输出内联 `style="grid-template-columns:2fr 1fr"`。内联样式优先级高于样式表规则，导致 `@media` 查询失效——除非给每条属性都加 `!important`，这在整站推广后将成为维护陷阱。

**经验法则。** 一次性布局且不需要响应式时，用比例形式（`:::grid 2 2:1`）。只要需要 `@media` 行为，或同一形状在多个页面复用，就换成命名类。

完整的组件类名列表见 [[css#短代码类名]]。

## 标注

标注（`> [!type]` 引用块）有独立的文档页面——语法和完整类型列表见 [[callouts]]。

## 提示框

用于提示、警告和注意事项的高亮块。兼容 Obsidian 语法：

```markdown
> [!note]
> 这是一条备注。

> [!warning] 注意
> 此操作不可撤销。

> [!tip] 小技巧
> 提示框内可以使用 markdown 格式。
```

`[!` 后面的单词决定类型，同一行后面可选标题。

**所有类型：**

`note`、`tip`、`warning`、`caution`、`important`、`info`、`abstract`、`todo`、`success`、`question`、`failure`、`danger`、`bug`、`example`、`quote`

多段落的提示框，空行也用 `>` 开头：

```markdown
> [!note] 长提示
> 第一段。
>
> 第二段，可以用**粗体**等格式。
```

## 属性

用 `{.class}` 语法给任何短代码块添加自定义 CSS 类：

```markdown
:::grid 2 {.comparison}
之前
+++
之后
:::
```

这会给 grid 容器添加 `comparison` 类，你可以在 `style.css` 中针对它编写样式。
