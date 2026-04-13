---
title: 命令行
uid: 923827b9
weight: 5
description: 用于测试和自动化的命令行界面。
translationKey: docs-extend-cli
lang: zh-hans
---

## 命令

| 命令 | 说明 |
|------|------|
| `moss preview <folder>` | 打开文件夹进入预览，监听文件变更并热重载 |
| `moss compile <folder>` | 将文件夹编译为静态网站（输出到 `.moss/site/`） |
| `moss compile <folder> --serve` | 编译并启动本地 HTTP 服务器 |
| `moss compile <folder> --watch` | 编译并监听文件变更 |
| `moss compile <folder> --no-plugins` | 编译但不运行插件 |
| `moss deploy <folder>` | 部署到已配置的托管平台 |

## CI 和自动化

moss 支持无界面运行——不需要 GUI：

```bash
moss compile /path/to/folder --no-plugins
```

编译产出是 `.moss/site/` 中的独立静态网站——标准的 HTML、CSS 和 JS，可以部署到任何地方。

## 开发

给 moss 本身的贡献者：

```bash
# 启动开发服务器（热重载）
npm run dev

# 通过 CLI 预览文件夹（连接到运行中的开发实例）
npm run moss -- preview ~/Sites/my-blog

# 切换文件夹，无需重启
npm run moss -- preview ~/Sites/other-folder
```

单实例插件会将 CLI 命令路由到正在运行的开发实例，实现快速切换文件夹而无需重新编译。
