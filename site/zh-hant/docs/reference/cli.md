---
title: 命令列
uid: 080052be
weight: 10
description: 用於測試和自動化的命令列介面。
translationKey: docs-extend-cli
lang: zh-hant
---

*本頁內容以英文版為準，中文譯文陸續更新。*

## 指令

| 指令 | 說明 |
|------|------|
| `moss preview <folder>` | 開啟資料夾進行預覽，監看檔案變更並即時重載 |
| `moss build <folder>` | 將資料夾編譯為靜態網站（輸出至 `.moss/build/current/`） |
| `moss build <folder> --serve` | 編譯後啟動本機 HTTP 伺服器 |
| `moss build <folder> --watch` | 編譯後監看檔案變更 |
| `moss build <folder> --no-plugins` | 編譯時不執行外掛 |
| `moss deploy <folder>` | 部署到已設定的託管平臺 |

## CI 與自動化

moss 可以在無介面的環境下運行，無需 GUI：

```bash
moss build /path/to/folder --no-plugins
```

編譯輸出是完整的靜態網站，位於 `.moss/build/current/`，為標準的 HTML、CSS 和 JS，可以部署到任何地方。

## 開發

供 moss 本身的貢獻者使用：

```bash
# 啟動開發伺服器，支援即時重載
npm run dev

# 透過命令列預覽資料夾（路由到正在運行的開發實例）
npm run moss -- preview ~/Sites/my-blog

# 不重啟即切換資料夾
npm run moss -- preview ~/Sites/other-folder
```

單一實例外掛會將命令列指令路由到正在運行的開發實例，讓你快速切換資料夾而無需重新編譯。
