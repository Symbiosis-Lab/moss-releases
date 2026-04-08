---
title: 清單
uid: e4e1e569
weight: 4
description: 外掛清單參考、設定和 moss-api SDK。
translationKey: docs-extend-manifest
lang: zh-hant
---

## 目錄結構

```
.moss/plugins/my-plugin/
├── manifest.json      外掛元資料和設定
├── main.bundle.js     打包後的 JavaScript 入口
├── config.json        執行期設定（覆蓋預設值）
└── icon.svg           外掛圖示（選填）
```

外掛放在每個專案的 `.moss/plugins/{name}/` 中。

## 必填欄位

| 欄位 | 類型 | 說明 |
|------|------|------|
| `name` | string | 外掛識別碼（作為資料夾名稱） |
| `version` | semver | 外掛版本 |
| `description` | string | 簡短說明 |
| `author` | string | 作者名稱 |
| `entry` | string | JavaScript 套件檔名 |
| `capabilities` | string[] | 掛鉤類型：`"process"`、`"generate"`、`"enhance"`、`"deploy"`、`"syndicate"` |
| `global_name` | string | JavaScript 全域物件名稱（如 `"MyPlugin"`） |

## 選填欄位

| 欄位 | 類型 | 說明 |
|------|------|------|
| `domain` | string | 主要服務網域（如 `"matters.town"`） |
| `icon` | string | 圖示檔名（依序嘗試 `icon.svg`、`icon.png`、`logo.svg`、`logo.png`） |
| `display_name` | string | 設定介面中顯示的名稱 |

## 清單範例

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

## 設定

### 預設值與 schema

`config` 設定預設值。`config_schema` 宣告每個欄位的類型（`"boolean"`、`"number"`、`"string"`）。moss 會根據這些資訊自動產生設定介面。

| 清單欄位 | 用途 |
|----------|------|
| `config` | 預設值 |
| `config_schema` | 欄位類型，用於產生 UI |
| `config_labels` | 設定介面中的顯示標籤 |
| `config_descriptions` | 設定介面中的說明文字 |
| `config_placeholders` | 輸入框的佔位文字 |

### 設定優先順序

外掛設定按以下優先順序解析：

1. `.moss/plugins/{name}/config.json`——最高優先
2. `.moss/plugins/{name}/config.toml`
3. `.moss/config.toml` 中的 `[plugins.{name}]` 區段——最低優先

### 設定驗證

`config_verify` 在使用者儲存設定後探測端點：

```json
"config_verify": {
  "api_key": {
    "probe": "https://api.example.com/verify/{value}",
    "expect": "ok"
  }
}
```

`{value}` 會被替換為使用者的輸入。探測請求發出後檢查回應。

## Schema 貢獻

外掛可以透過 `contributes.frontmatter.fields` 新增 frontmatter 欄位：

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

貢獻的欄位在執行時合併到活動 schema 中，並出現在編輯器裡。

## moss-api SDK

`moss-api` 套件提供外掛開發所需的型別和工具函式。

```sh
npm install moss-api
```

### 型別

| 匯出 | 說明 |
|------|------|
| `DeployContext` | 傳入 deploy 掛鉤 |
| `SyndicateContext` | 傳入 syndicate 掛鉤 |
| `EnhanceContext` | 傳入 enhance 掛鉤 |
| `HookResult` | 所有掛鉤的回傳型別 |
| `PluginManifest` | 清單結構 |

### 工具函式

| 匯出 | 說明 |
|------|------|
| `reportProgress` | 在 UI 中顯示進度訊息 |
| `reportError` | 回報非致命錯誤 |
| `log` / `warn` / `error` | 結構化日誌 |

### 瀏覽器

| 匯出 | 說明 |
|------|------|
| `openBrowser` | 用系統瀏覽器開啟 URL |
| `closeBrowser` | 關閉先前開啟的瀏覽器分頁 |

## 打包

用 esbuild 打包成 IIFE：

```sh
esbuild src/main.ts --bundle --format=iife --global-name=MyPlugin --outfile=dist/main.bundle.js
```

## 測試

用 vitest 搭配 moss-api 的模擬 Tauri 設定：

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
