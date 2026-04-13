---
title: 掛鉤
uid: 24db80a9
weight: 2
description: 外掛生命週期——五種能力及其上下文。
translationKey: docs-extend-hooks
lang: zh-hant
---

## 編譯流程

moss 編譯網站時，依序經過以下階段：

```
掃描資料夾
  → process 掛鉤（產生前處理）
    → generate 掛鉤（建置 HTML）
      → enhance 掛鉤（注入插槽）
        → deploy 掛鉤（推送到託管）
          → syndicate 掛鉤（POSSE 發佈到各平臺）
```

外掛透過在清單中宣告**能力**來掛接一個或多個階段。

## process

在 HTML 產生之前執行。多個外掛可以擁有此能力。

適用於：抓取外部資料、轉換原始檔案、預處理內容。

**傳入掛鉤的上下文：**

| 欄位 | 類型 | 說明 |
|------|------|------|
| `project_path` | string | 專案資料夾的絕對路徑 |
| `moss_dir` | string | `.moss/` 目錄路徑 |
| `project_info` | object | `total_files`、`homepage_file`、`site_name`、`lang` |
| `config` | object | 外掛設定值 |

## generate

將原始內容建置或轉換為 HTML 輸出。**只有一個外掛**可以擁有此能力——它會取代 moss 內建的產生器。

適用於：替代 SSG 後端（Hugo、Astro、Jekyll）。

**上下文：** 與 process 相同，另加 `output_dir`、`source_files`（依類型分類）和 `site_config`。

## enhance

在 HTML 產生後，將內容注入具名的範本插槽中。多個外掛可以擁有此能力。

適用於：留言、分析追蹤、電子報表單、自訂指令碼。

詳見[插槽](/docs/extend/slots/)中對六個範本插槽的說明。

**回傳值：** 包含插槽內容的 `EnhanceResult`：

```typescript
{
  slots: {
    "after-article": "<div class='comments'>...</div>",
    "body-end": "<script src='analytics.js'></script>"
  }
}
```

## deploy

將編譯好的網站推送到託管平臺。**只有一個外掛**可以擁有此能力。

適用於：GitHub Pages、Netlify、自有託管。

**上下文：** 包含 `site_files`（所有編譯輸出）、`deployment` 資訊和 `domain`。

## syndicate

將已發佈的內容分發到外部平臺（POSSE）。多個外掛可以擁有此能力。

適用於：交叉發佈到 Matters.town、Substack、社群媒體。

**上下文：** 包含 `articles`（已發佈的 URL 和元資料）以及部署資訊。

## 外掛執行環境

外掛在 Tauri webview 中執行。生命週期如下：

1. Rust 後端傳送外掛程式碼和清單
2. 外掛程式碼以 `<script>` 標籤注入
3. 外掛建立全域物件（如 `window.MattersPlugin`）
4. moss 呼叫 `onload({ project_path, config })`（若有定義）
5. 掛鉤以各自的上下文被呼叫
6. 結果傳回 Rust 後端

外掛中的 console 輸出（`console.log`、`console.warn`、`console.error`）會轉送到 moss 終端機。

## 外掛模式

外掛的執行方式取決於編譯模式：

| 模式 | 行為 |
|------|------|
| **Blocking** | `moss compile`——等待 process 掛鉤完成 |
| **NonBlocking** | 預覽模式——觸發 process 掛鉤但不等待 |
| **SlotsOnly** | 監看重建——跳過 process/generate，只收集 enhance 插槽 |
| **Skip** | `--no-plugins`——跳過所有外掛掛鉤 |
