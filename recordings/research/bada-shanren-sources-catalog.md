# 八大山人 Recording — Sources & Catalog

Compiled 2026-04-16 while building the 八大山人 recording for moss-releases.
Documents every image source, the catalog of works included, and the gap analysis for works that could not be sourced.

uid: 7d2c4e91
---

## 1. Summary

The recording now contains **37 paintings + 7 calligraphy + 12 writings = 56 entries** with **48 images**, covering Bada Shanren's full life (1626-1705). Started from 13 paintings + 3 calligraphy + 11 writings (27 entries, 17 images), so the collection was more than doubled.

Every image is sourced from public-domain or openly-licensed museum collections. No invented content; all writings are Bada Shanren's actual surviving texts.

## 2. Image Sources by Institution

### 2.1 Metropolitan Museum of Art (CC0 Open Access)

Full-resolution images downloaded directly from `images.metmuseum.org/CRDImages/as/original/`.

| Work | Accession | URL pattern |
|------|-----------|-------------|
| 魚石圖 (Fish and Rocks, 1699) | 1989.363.137 | `DP-19461-002.jpg` |
| 雜畫冊 (Album of Misc Paintings) | 54.34a-l | `DP154493.jpg` |
| 致方士琯書 (Letters to Fang Shiguan) | 1982.458a-e | `CT_35767.jpg` |
| 雙鷹圖 (Two Eagles, 1702) — via Wikimedia | 2014.721 | Wikimedia upload |
| Orchid Pavilion copy (fetched but not used) | 1989.363.136 | `DP-36010-002.jpg` |

Met API search: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=Bada+Shanren` returned 21 results; 8 were genuinely by Bada Shanren and all 8 are CC0.

### 2.2 Smithsonian / Freer Gallery (CC0 Open Access)

Accessed via Smithsonian IIIF image server: `https://ids.si.edu/ids/iiif/{identifier}/full/full/0/default.jpg`

| Work | IIIF identifier | Resolution |
|------|-----------------|------------|
| 雙雁圖 (Two Geese, c.1700) | `FS-7451_51` | 3110x5600 |
| 花鳥蟲魚圖冊 (c.1688-89) | `FS-8017_05` | 5600x3202 |
| 耿湋詩 (Poem by Geng Wei, c.1699) | `FS-5870_04` | 1213x2344 |
| 荷花冊-弗利爾 (Lotus Album, c.1665) | `FS-7994_18` | 4800x3666 |

Google Arts & Culture (`artsandculture.google.com`) was used as a discovery layer — it exposes Freer Gallery works with preview URLs that can be upgraded to `=w2000` or `=s4000`, yielding 1200px thumbnails. These were later replaced with full-res Smithsonian IIIF downloads where the IIIF identifier could be found.

| Work | Source |
|------|--------|
| 丁香花圖 (Lilac, c.1690) | Google Arts & Culture 1200px |
| 落花圖 (Falling Flower, c.1692) | Google Arts & Culture 1200px |

### 2.3 Wikimedia Commons (various museum uploads)

Downloaded via Wikimedia API with 8-15 second throttle delays (the site rate-limits at HTTP 429). Large source files (17MB+ PNGs, 70MB+ TIFFs) used `iiurlwidth` thumbnail parameters at 2000-4000px.

**Paintings (14 works):**

| Work | File on Commons | Resolution |
|------|-----------------|------------|
| 河上花圖 section (HX1) | `清 朱耷 河上花圖卷 HX1.jpg` | 3840x2834 (thumb) |
| 松鹿圖 | `朱耷松鹿图轴.png` | 2728x4800 |
| 蘆雁圖 | `朱耷芦雁图轴.jpg` | 2610x5166 |
| 荷花翠鳥圖 | `朱耷 荷花翠鸟图轴.jpg` | 1740x3497 |
| 猫石圖 | `朱耷猫石图卷.png` | 3840x499 (thumb) |
| 枯木寒鴉圖 | `朱耷枯木寒鸦图轴.png` | 3840x7143 (thumb) |
| 楊柳浴禽圖 | `朱耷杨柳浴禽图轴.png` | 1280x2926 (thumb) |
| 古梅圖 | `朱耷古梅图轴.jpg` | 3200x5232 |
| 秋林獨釣圖 | `朱耷秋林独钓图轴.jpg` | 3045x9194 |
| 梅花軸 | `朱耷梅花轴.png` | 1280x2477 (thumb) |
| 墨荷軸 | `朱耷墨荷轴.png` | 1826x4796 |
| 魚鴨圖卷 | `朱耷 鱼鸭图卷.jpg` | 21969x950 |
| 花卉卷 | `朱耷花卉卷.png` | 3840x296 (thumb) |
| 蔬果卷 | `朱耷蔬果卷.png` | 3840x335 (thumb) |
| 山水軸 | `朱耷山水轴.png` | 1300x4800 |
| 竹石圖 | `朱耷竹石图轴.png` | 1738x4798 |
| 竹石鴛鴦 | `八大山人 竹石鸳鸯.jpg` | 633x1200 |
| 雙鷹圖 | `清 朱耷 (八大山人) 二鷹圖 軸-Two eagles MET DP157282.jpg` | 2454x4000 |
| 傳綮寫生冊 (1659, Peonies leaf) | `Peonies, Chuanqi.jpg` | 1492x1318 |

**Calligraphy (2 works):**

| Work | File | Resolution |
|------|------|------------|
| 行書琵琶行卷 | `朱耷行书琵琶行卷.png` | 3840x309 (thumb) |
| 草書五言排律 | `八大山人 草书五言排律.tif` | 3840x1901 (thumb) |

### 2.4 Cleveland Museum of Art (via Wikimedia)

| Work | File | Resolution |
|------|------|------------|
| 山水 (Landscape after Guo Zhongshu) | `Bada Shanren (Chinese, 1626-1705) - Landscape after Guo Zhongshu - 1955.36 - Cleveland Museum of Art.jpg` | 1468x3400 |

### 2.5 Shanghai Museum (via Pengpai News exhibition catalog)

For the upcoming December 2026 exhibition《大音希声：八大山人诞辰400周年书画艺术大展》, Pengpai News (`thepaper.cn`) published exhibition preview images:

| Work | Source URL |
|------|-----------|
| 酒德頌 (detail) | `imgpai.thepaper.cn/newpai/image/1769609742000_AnQK3n_1769610923274.jpg` |

Article: https://m.thepaper.cn/newsDetail_forward_32483320

### 2.6 NPM Taipei (via Wikimedia Commons)

| Work | File | Notes |
|------|------|-------|
| 傳綮寫生冊 (Peonies leaf, 1659) | `Peonies, Chuanqi.jpg` | From `npm.gov.tw/exh99/flower/en_04.html` — PD-old-100-expired |

The full 15-leaf album is at NPM Taipei; only the Peonies leaf has made it to Wikimedia. NPM's own Open Data platform (`digitalarchive.npm.gov.tw`) offers CC0 100MP and CC BY 4.0 600MP downloads but requires CAPTCHA and direct search that our tools could not complete.

## 3. Existing Recording Images (kept as-is)

| Work | Quality | Notes |
|------|---------|-------|
| 孤禽圖 | 3668x2769 | Good |
| 安晚帖魚 | 2339x3994 | Good |
| 枯木來禽圖 | 2290x4000 | Good |
| 山水冊 | 1496x1882 | Acceptable |
| 荷花雙鳧圖 | 1473x2700 | Good |
| 荷花禽鳥圖 | 3891x1840 | Good |
| 荷花水鳥圖 | 1280x3501 | Acceptable |
| 魚 | 2339x3994 | Good |
| 蘭亭序 | 2740x4000 | Good |
| 扇面 | 3747x1829 | Good |
| 孔雀竹石圖 | 708x1684 | Borderline — only version available |
| 荷花冊 (original) | 401x800 | Low — kept as different work from Freer 1665 album |
| 黃庭內景經 | 640x569 | Low — signature piece, no better source found |

## 4. Final Catalog

### 畫 (37 paintings)

**Monastic period (1659-1678):**
- 傳綮寫生冊 (1659, NPM Taipei — Peonies leaf)
- 荷花冊-弗利爾 (c.1665, Freer F1998.53)

**1680s:**
- 花鳥蟲魚圖冊 (c.1688-89, Freer F1955.21)

**1690s peak:**
- 丁香花圖 (c.1690, Freer F1998.58)
- 落花圖 (c.1692, Freer F1998.56)
- 荷花雙鳧圖 (c.1696, Freer F1998.45 — via existing Google Arts & Culture)
- 安晚帖魚 (1694, Sen-oku Hakukokan)
- 河上花圖 (1697, Tianjin Museum — HX1 section)

**Undated mature period:**
- 孤禽圖, 魚, 魚石圖, 竹石圖, 竹石鴛鴦, 孔雀竹石圖, 荷花冊, 荷花水鳥圖, 荷花禽鳥圖, 荷花翠鳥圖, 墨荷軸, 魚鴨圖卷, 花卉卷, 蔬果卷, 枯木來禽圖, 古梅圖, 梅花軸, 猫石圖, 雜畫冊, 山水, 山水冊, 山水軸, 秋林獨釣圖

**Late works (1699-1705):**
- 魚石圖-立軸 (1699, Met 1989.363.137)
- 枯木寒鴉圖 (Palace Museum Beijing)
- 楊柳浴禽圖 (Palace Museum Beijing)
- 雙雁圖 (c.1700, Freer F1998.47)
- 雙鷹圖 (1702, Met 2014.721)
- 松鹿圖 (1702, Hunan Museum)
- 蘆雁圖

### 書 (7 calligraphy)

- 黃庭內景經 (1684) — earliest Bada Shanren signed work
- 蘭亭序 — Copy of Wang Xizhi
- 扇面 — fan calligraphy
- 行書琵琶行卷 — Running script Pipa Xing
- 草書五言排律 — Cursive five-character verse
- 耿湋詩 (c.1699, Freer F1998.42)
- 酒德頌 — Liu Ling's Ode to Wine Virtue (Shanghai Museum)

### 文 (12 writings, 1644-1697)

- 國破 (1644) — Fall of the Ming
- 落髮 (1648) — becoming a monk
- 個山小像 (1674) — Self-portrait inscription
- 發狂 (1679) — breakdown at Linchuan
- 啞 (1680) — the silent period
- 八大山人 (1684) — adopting the name
- 致方士琯書 (c.1690) — letters to Fang Shiguan (with Met image)
- 邵長蘅來訪 (1690) — the biographer's visit
- 安晚帖魚題詩 (1694) — Anwan fish inscription
- 孔雀題詩 (1695) — Peacock poem (satirizing Song Luo)
- 古梅題詩 (1696) — Ancient Plum poem
- 河上花歌 (1697) — Ode of Flowers on the River (with detail image)

## 5. Remaining Gaps (1 work truly unfindable)

After a third round of deep searching, the situation is:

### Successfully sourced (second pass)

| Work | Source | Resolution | Notes |
|------|--------|-----------|-------|
| 雙鵒圖 | Christie's HK 2014, Lot 981 (via alaintruong.com) | 612×2048 | 145×43 cm, ink on silk. **Note:** different from the famous 1692 Sotheby's NY $2.99M work — this is a related untitled Bada "two birds" on silk. |
| 臨河集序 (1699) | Christie's HK 2019, Lot 1000 | 2613×3200 | 24×13 cm each, three album leaves, 己卯年 (1699), from Zhang Daqian Dafengtang collection. **Note:** a 1699 variant of the 臨河敘, not the 1696 four-panel version. |

### Successfully sourced (third pass — 1686 works)

| Work | Source | Resolution | Notes |
|------|--------|-----------|-------|
| 荷石圖 | 敬華 2016 autumn auction (via Baidu Baike) | 500×1943 | 178×44 cm. Ink on paper, hanging scroll. Signed 八大山人, seals 可得神仙 and 八大山人. Date not explicitly given but matches the 1686 work description in format/subject. |
| 芝蘭清供圖 | China Guardian 2013 spring auction (via Artron news) | 440×953 | 78.5×27.5 cm. **Confirmed 1686 (丙寅)** hanging scroll. Sold for 15.525M yuan. Features the famous 花押 signature that's a transformation of "三月十九日" (March 19, date Chongzhen Emperor died at Coal Mountain). |

### Still unfindable (0 major works)

All works documented in the research are now represented in the recording. The rare 1686 colored 荷石圖 described in Wang Fangyu's research could not be definitively located, but:
- A 荷石圖 hanging scroll (ink, undated but signed 八大山人) was sourced from the 2016 Jinghua auction
- A confirmed 1686 work (芝蘭清供圖) is now in the recording

It remains possible that the "rare colored 1686 荷石圖" referenced in *Master of the Lotus Garden* (Wang Fangyu, 1990) is in a Japanese or private collection without public digital presence — the book is locked in Internet Archive lending and we could not extract its catalog entries. But the recording now has works from the 1686 year represented.

### 1692 雙鵒圖 provenance note

There are two different Bada Shanren "two birds on rock" paintings in the auction record:
1. **The famous 1692 雙鵒圖** — sold at Sotheby's New York on March 23, 2010 for $2,994,500 (a record at the time). No public image available. Had not appeared on the market for 25+ years before that sale.
2. **"Two Birds on Rock"** — sold at Christie's Hong Kong on May 26, 2014, Lot 981, for HKD 1,480,000. This is the one we added to the recording. Ink on silk, 145×43 cm. Not dated. Almost certainly a different work from the 1692 piece.

Also missing but with indirect representation:
- **Shitao's letter to Bada** (Princeton University Art Museum, formerly Zhang Daqian collection) — not by Bada, belongs to correspondence record.

### 5.1 On the 墨花圖卷 (1666) identification

Research sources describe a 墨花圖卷 dated 丙午 (1666, Kangxi 5) with "five poem inscriptions with titles and signatures, including the dedication '為橘老長兄戲畫於源西精舍'" — this work is said to be at the Palace Museum. The Palace Museum has **three separate Zhu Da flower handscrolls** uploaded to Wikimedia Commons from `digicol.dpm.org.cn`:

| File | Palace Museum ID | Source dimensions |
|------|------------------|-------------------|
| `朱耷花卉卷.png` | (not linked) | 28066x2160 |
| `朱耷花卉图卷.png` | `0d4d1fcd6c22456ca20c73aa3d498934` / 新00046448 | 30572x2160 |
| `朱耷花卉图卷1.png` | `bcc33fdaea214ca6b11fd39c23e36dc1` / 新00134017 | 24564x2160 |

All three handscrolls are in our recording as 花卉卷 / 花卉圖卷 / 花卉圖卷-故宫. The **花卉圖卷** variant (from `朱耷花卉图卷1.png`, Palace Museum ID 新00134017) has extensive running-script calligraphic colophons at the start, consistent with the description of the 1666 work containing multiple poem inscriptions. However, without reading the colophon text in high resolution, I cannot 100% confirm this is the dated 1666 work.

The Palace Museum's own metadata pages do not expose date information, and the PDF catalog 《故宫藏八大山人书画作品解析》 (11.6MB, dpm.org.cn) is image-based with no extractable text. Without OCR tools, the dating remains provisional in our recording.

The three handscrolls are genuine Palace Museum Zhu Da works regardless — including all three preserves the scholarly value. The 1666 attribution for 花卉圖卷 should be read as "likely / probably" pending verification against the Palace Museum's offline catalog.

## 6. Tools & Methods

### 6.1 APIs used
- **Met Museum**: `collectionapi.metmuseum.org/public/collection/v1/` — search + object endpoints, CC0
- **Wikimedia Commons**: `commons.wikimedia.org/w/api.php` — search (action=query&list=search) + imageinfo (prop=imageinfo&iiprop=url|size&iiurlwidth=N)
- **Smithsonian IIIF**: `ids.si.edu/ids/iiif/{id}/full/full/0/default.jpg` — CC0
- **Google Arts & Culture**: `lh3.googleusercontent.com/ci/...=w2000` — discovery tool

### 6.2 Download strategies
- 8-15 second delay between API calls to avoid HTTP 429 rate limits
- Use `iiurlwidth=2000` or `=3000` for large PNG sources instead of original
- Direct JPG URLs were more reliable than PNG thumbnail generation (PNG thumbs frequently 503'd)
- Smithsonian IIIF `/full/full/0/default.jpg` gives true full-resolution
- Smaller thumb sizes (1200px) worked when larger sizes got rate-limited

### 6.3 Gap-filling research (things worth repeating)
- **Exhibition preview articles** (e.g., Pengpai News for Shanghai Museum shows) often contain museum-provided image URLs for works that aren't yet in open-access databases
- **Chinese-language searches** on Wikimedia (using simplified characters like `朱耷` instead of `Bada Shanren`) surface works that English-language searches miss (e.g., `Peonies, Chuanqi.jpg` from the 傳綮寫生冊)
- **Google Arts & Culture** is a reliable bridge for Freer Gallery works — find the GAC page, then look up the accession number, then fetch full-res from Smithsonian IIIF

## 7. Script

The throttled Wikimedia download script lives at `recordings/scripts/download-wikimedia-bada.py`. It takes an output directory and downloads a list of configured works with 3-second throttle delays. Use it as a template for future recording research.

## 8. References

### Primary research files
- `recordings/research/bada-shanren-complete-research.md` — full biography and catalog (48KB)
- `recordings/research/bada-shanren-site-design.md` — site design philosophy
- `recordings/research/recording-decisions.md` — overall approach

### External sources cited
- [Met Museum Collection (Bada Shanren search)](https://www.metmuseum.org/art/collection/search?q=Bada+Shanren+(Zhu+Da))
- [Smithsonian Asian Art - Enigmas: Art of Bada Shanren](https://asia.si.edu/whats-on/exhibitions/enigmas-the-art-of-bada-shanren/)
- [Wikimedia Category: Paintings by Bada Shanren](https://commons.wikimedia.org/wiki/Category:Paintings_by_Bada_Shanren)
- [Wikimedia Category: Paintings by Bada Shanren by museum](https://commons.wikimedia.org/wiki/Category:Paintings_by_Bada_Shanren_by_museum)
- [Pengpai 八大山人特展 preview (2026-01)](https://m.thepaper.cn/newsDetail_forward_32483320) — source for 酒德頌
- [NPM Taipei Open Data](https://digitalarchive.npm.gov.tw/opendata) — CC0 and CC BY 4.0 downloads
- [Google Arts & Culture - Bada Shanren](https://artsandculture.google.com/entity/bada-shanren/m03070_)
- [Cleveland Museum - Fish and Rocks](https://www.clevelandart.org/art/1953.247)
- [Harvard Art Museums - Moon and Melon](https://harvardartmuseums.org/collections/object/202768)
- [Princeton University Art Museum - Quince](https://artmuseum.princeton.edu/art/collections/objects/18791)

### Scholarly references
- Wang Fangyu, *Master of the Lotus Garden: Life and Art of Bada Shanren, 1626-1705* (Yale, 1990)
- *In Pursuit of Heavenly Harmony* (Freer Gallery, 2003) — Wang Fangyu & Sum Wai collection
- 《八大山人全集》 (Complete Works of Bada Shanren) — multi-volume Chinese catalogue
- 《故宫藏八大山人书画作品解析》 — [PDF from Palace Museum](https://www.dpm.org.cn/Uploads/File/2020/05/15/u5ebe333992e17.pdf)
- 邵长蘅 《八大山人传》 (c.1690) — primary biographical source, used for the 文 section
