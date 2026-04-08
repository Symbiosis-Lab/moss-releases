---
title: 清单
uid: 23375661
weight: 4
description: 插件清单参考、配置和 moss-api SDK。
translationKey: docs-extend-manifest
lang: zh-hans
---

## 目录结构

```
.moss/plugins/my-plugin/
├── manifest.json      插件元数据和配置
├── main.bundle.js     构建后的 JavaScript 入口
├── config.json        运行时配置（覆盖默认值）
└── icon.svg           插件图标（可选）
```

插件位于每个项目的 `.moss/plugins/{name}/` 目录下。

## 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 插件标识符（用作文件夹名） |
| `version` | semver | 插件版本 |
| `description` | string | 简短描述 |
| `author` | string | 作者名称 |
| `entry` | string | JavaScript 包文件名 |
| `capabilities` | string[] | 钩子类型：`"process"`、`"generate"`、`"enhance"`、`"deploy"`、`"syndicate"` |
| `global_name` | string | JavaScript 全局对象名（如 `"MyPlugin"`） |

## 可选字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `domain` | string | 主要服务域名（如 `"matters.town"`） |
| `icon` | string | 图标文件名（依次回退到 `icon.svg`、`icon.png`、`logo.svg`、`logo.png`） |
| `display_name` | string | 设置界面中显示的名称 |

## 示例清单

```json
{
  "name": "my-deploy",
  "version": "1.0.0",
  "description": "Deploy to My Hosting",
  "author": "Your Name",
  "entry": "main.bundle.js",
  "capabilities": ["deploy"],
  "global_name": "MyDeployPlugin",
  "domain": "myhost.example",
  "icon": "icon.svg",
  "config": {
    "auto_deploy": false,
    "region": "us-east"
  },
  "config_schema": {
    "auto_deploy": "boolean",
    "region": "string"
  },
  "config_labels": {
    "auto_deploy": "Auto Deploy",
    "region": "Server Region"
  },
  "config_descriptions": {
    "auto_deploy": "Automatically deploy after each build",
    "region": "Hosting region for your site"
  }
}
```

## 配置

### 默认值和类型声明

`config` 设置默认值。`config_schema` 声明每个字段的类型（`"boolean"`、`"number"`、`"string"`）。moss 据此自动生成设置界面。

| 清单字段 | 用途 |
|----------|------|
| `config` | 默认值 |
| `config_schema` | 字段类型，用于 UI 生成 |
| `config_labels` | 设置界面中的显示标签 |
| `config_descriptions` | 设置界面中的帮助说明 |
| `config_placeholders` | 输入框的占位文字 |

### 配置优先级

插件配置按以下优先级解析：

1. `.moss/plugins/{name}/config.json` — 最高优先
2. `.moss/plugins/{name}/config.toml`
3. `.moss/config.toml` 中的 `[plugins.{name}]` 节 — 最低

### 配置验证

`config_verify` 在用户保存配置后探测一个端点进行验证：

```json
"config_verify": {
  "api_key": {
    "probe": "https://api.example.com/verify/{value}",
    "expect": "ok"
  }
}
```

`{value}` 替换为用户输入的值。探测请求发出后检查响应。

## Schema 贡献

插件可以通过 `contributes.frontmatter.fields` 添加 frontmatter 字段：

```json
"contributes": {
  "frontmatter": {
    "fields": {
      "syndicated_url": {
        "type": "string",
        "description": "URL where this article was syndicated"
      }
    }
  }
}
```

贡献的字段在运行时合并到活动 schema 中，并出现在编辑器中。

## moss-api SDK

`moss-api` 包提供插件开发用的类型和工具函数。

```sh
npm install moss-api
```

### 类型

| 导出 | 说明 |
|------|------|
| `DeployContext` | 传给 deploy 钩子的上下文 |
| `SyndicateContext` | 传给 syndicate 钩子的上下文 |
| `EnhanceContext` | 传给 enhance 钩子的上下文 |
| `HookResult` | 所有钩子的返回类型 |
| `PluginManifest` | 清单结构定义 |

### 工具函数

| 导出 | 说明 |
|------|------|
| `reportProgress` | 在界面中显示进度信息 |
| `reportError` | 报告非致命错误 |
| `log` / `warn` / `error` | 结构化日志输出 |

### 浏览器

| 导出 | 说明 |
|------|------|
| `openBrowser` | 在系统浏览器中打开 URL |
| `closeBrowser` | 关闭之前打开的浏览器标签页 |

## 构建

用 esbuild 打包为 IIFE 格式：

```sh
esbuild src/main.ts --bundle --format=iife --global-name=MyPlugin --outfile=dist/main.bundle.js
```

## 测试

使用 vitest 配合 moss-api 提供的 mock Tauri 环境：

```typescript
import { describe, it, expect } from 'vitest';

describe('deploy', () => {
  it('returns success', async () => {
    const result = await MyPlugin.deploy(mockContext);
    expect(result.success).toBe(true);
  });
});
```

```sh
npx vitest run
```
