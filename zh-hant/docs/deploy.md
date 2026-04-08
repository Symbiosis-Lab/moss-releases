---
title: 部署
uid: fdc3267e
weight: 4
description: 將網站發佈到 mosspub.com 或 GitHub Pages。
translationKey: docs-deploy
lang: zh-hant
---

## mosspub.com

最簡單的發佈方式。預覽不需要註冊——右鍵資料夾，點擊發佈。

1. 在 moss 中開啟資料夾。
2. 點擊工具列的部署按鈕。
3. 選擇一個子網域（如 `yourname.mosspub.com`），或者繫結自有網域。

網站即刻上線。後續部署只更新有變化的檔案。

## GitHub Pages

透過 GitHub Actions 將網站部署到自己的 GitHub 儲存庫。

### 前置條件

- GitHub 帳號
- GitHub 儲存庫（公開或私有）

### 設定

1. 在 moss 中開啟資料夾。
2. 點擊工具列的設定圖示。
3. 在「發佈」選項中，點擊「連接 GitHub」。
4. 透過 GitHub 的裝置授權流程——moss 顯示一個代碼，在 GitHub 頁面輸入即可。
5. 選擇要部署到的儲存庫。

### 部署

點擊部署按鈕。首次部署大約需要一分鐘——moss 會自動建立 GitHub Actions 工作流程。之後的部署更快。

moss 提交編譯後的網站、推送到儲存庫，GitHub Actions 自動部署到 GitHub Pages。

**外掛設定：**

| 設定 | 預設值 | 說明 |
|------|--------|------|
| `auto_commit` | `true` | 部署時自動提交變更 |
| `video_max_size_mb` | `75` | 部署時允許的最大影片檔案大小 |

### 自訂網域

在 GitHub 儲存庫的 **Settings → Pages → Custom domain** 中設定自訂網域，也可以直接在 moss 的網域設定中設定。
