---
title: 钩子
uid: 3aa4fbde
weight: 2
description: 插件生命周期——五种能力及其上下文。
translationKey: docs-extend-hooks
lang: zh-hans
---

## 编译流程

moss 编译网站时，按以下顺序执行各阶段：

```
扫描文件夹
  → process 钩子（生成前处理）
    → generate 钩子（生成 HTML）
      → enhance 钩子（注入到插槽）
        → deploy 钩子（推送到托管平台）
          → syndicate 钩子（POSSE 分发到各平台）
```

插件通过在清单中声明**能力**来挂载到一个或多个阶段。

## process

在 HTML 生成之前运行。多个插件可以同时拥有此能力。

适用于：拉取外部数据、转换源文件、预处理内容。

**传入钩子的上下文：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `project_path` | string | 项目文件夹的绝对路径 |
| `moss_dir` | string | `.moss/` 目录路径 |
| `project_info` | object | `total_files`、`homepage_file`、`site_name`、`lang` |
| `config` | object | 插件配置值 |

## generate

将源内容生成或转换为 HTML 输出。**只能有一个插件**拥有此能力——它会替换 moss 的内置生成器。

适用于：替代 SSG 后端（Hugo、Astro、Jekyll）。

**上下文：**与 process 相同，另加 `output_dir`、`source_files`（按类型分类的源文件）和 `site_config`。

## enhance

在 HTML 生成后向模板插槽注入内容。多个插件可以同时拥有此能力。

适用于：评论、统计分析、Newsletter 表单、自定义脚本。

详见[插槽](/docs/extend/slots/)中对六个模板插槽的说明。

**返回值：**一个包含插槽内容的 `EnhanceResult`：

```typescript
{
  slots: {
    "after-article": "<div class='comments'>...</div>",
    "body-end": "<script src='analytics.js'></script>"
  }
}
```

## deploy

将编译好的网站推送到托管平台。**只能有一个插件**拥有此能力。

适用于：GitHub Pages、Netlify、自建托管。

**上下文：**包括 `site_files`（所有编译产出）、`deployment` 信息和 `domain`。

## syndicate

将已发布的内容分发到外部平台（POSSE）。多个插件可以同时拥有此能力。

适用于：同步到 Matters.town、Substack、社交媒体。

**上下文：**包括 `articles`（已发布的 URL 和元数据）和部署信息。

## 插件运行时

插件运行在 Tauri webview 中。生命周期如下：

1. Rust 后端发送插件代码和清单
2. 插件代码作为 `<script>` 标签注入
3. 插件创建全局对象（如 `window.MattersPlugin`）
4. moss 调用 `onload({ project_path, config })`（如已定义）
5. 各钩子按上下文被调用
6. 结果回传给 Rust 后端

插件的控制台输出（`console.log`、`console.warn`、`console.error`）会转发到 moss 终端。

## 插件运行模式

插件的运行方式取决于编译模式：

| 模式 | 行为 |
|------|------|
| **Blocking** | `moss compile` —— 等待 process 钩子完成 |
| **NonBlocking** | 预览模式 —— 触发 process 钩子但不等待 |
| **SlotsOnly** | 监听重建 —— 跳过 process/generate，只收集 enhance 插槽 |
| **Skip** | `--no-plugins` —— 跳过所有插件钩子 |
