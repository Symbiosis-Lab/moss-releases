---
title: 媒體
uid: c47b4e96
weight: 3
description: 圖片、影片、筆記本等檔案的處理方式。
translationKey: docs-media
lang: zh-hant
---

把圖片、影片和其他檔案放在專案資料夾中，在 markdown 中引用即可——moss 自動處理路徑解析、最佳化和漸進載入。 ^intro

## 圖片

用標準 markdown 語法引用圖片：

```markdown
![日落](photos/sunset.jpg)
```

或用 wikilink 語法：

```markdown
![[sunset.jpg]]
```

moss 自動解析路徑——不需要煩惱相對路徑或絕對路徑。同時會擷取圖片尺寸，產生微型佔位背景（模糊的底色），避免頁面在圖片載入時跳動。

支援格式：`.jpg`、`.jpeg`、`.png`、`.gif`、`.svg`、`.webp`、`.avif`。

## 影片

影片檔案同樣放進資料夾，用相同方式引用：

```markdown
![[demo.mov]]
```

moss 在背景自動將 `.mov` 轉碼為 `.mp4`（H.264 + AAC）。預覽視窗即刻開啟，影片在轉碼完成後漸進載入。

引用時使用原始的 `.mov` 檔名即可，moss 自動提供轉碼後的 `.mp4`。

## 顯示控制

用管道語法控制媒體的顯示方式——在 `|` 後加上適配和定位參數：

```markdown
![[photo.jpg|contain top-left]]
```

**適配方式**（對應 CSS `object-fit`）：

| 值 | 效果 |
|----|------|
| `cover` | 填滿區域，必要時裁切（預設） |
| `contain` | 完整展示，必要時留白 |
| `fill` | 拉伸填滿 |
| `none` | 原始尺寸，不縮放 |
| `scale-down` | 類似 `contain`，但不放大 |

**定位**（對應 CSS `object-position`）：

`center`、`left`、`right`、`top`、`bottom`、`top-left`、`top-right`、`bottom-left`、`bottom-right`

組合使用：`![[panorama.jpg|contain center]]`、`![[headshot.jpg|cover top]]`。

管道語法適用於 wikilink、markdown 圖片，以及短代碼中的檔名。

## 筆記本

Jupyter 筆記本（`.ipynb` 檔案）透過 JupyterLite 直接在瀏覽器中執行——不需要伺服器，不需要安裝 Python。整個執行環境（約 20 MB）以 WebAssembly 的形式在訪客的瀏覽器中運行。

將 `.ipynb` 檔案放在專案中，moss 會將其與其他內容一起處理。

## HTML 檔案

`.html` 檔案原樣提供，不做任何處理。適用於互動內容、嵌入頁面，或需要完全控制標記的頁面。

## 封面圖

在 frontmatter 中為頁面指定封面圖：

```yaml
---
title: 我的專案
cover: screenshots/hero.png
---
```

當欄目使用 `children_style: card` 時，封面圖會顯示在卡片上。moss 從副檔名自動判斷媒體類型。對於非圖片封面，用 `cover_type` 覆蓋：

```yaml
---
cover: demo.mp4
cover_type: video
---
```

有效的封面類型：`image`（預設）、`video`、`iframe`。
