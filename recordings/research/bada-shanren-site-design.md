# 八大山人's Site — 甲戌年 (1694), 南昌

## The Premise

Where Blake's site is a catalog ("here are my works for sale"), 八大山人's site is a studio you've been invited into. The first thing you notice is the emptiness. Paintings emerge from the white void like islands in fog. Inscriptions — already in the images — are cryptic. Nothing is explained. Nothing is for sale.

Blake declares. 八大山人 conceals.
Blake fills. 八大山人 empties.
Blake explains. 八大山人 leaves you to wonder.

## Decisions

- **Date**: 甲戌年 (1694, Kangxi 33). Age 68. Peak of his artistic power.
- **Location**: 南昌 (Nanchang)
- **Structure**: 畫 (Paintings) / 書 (Calligraphy) / 文 (Writings) — the traditional Chinese scholar's categories
- **Display**: Paintings and calligraphy are the article. `:::hero {.plate}`, nothing else. The image speaks.
- **Inscriptions**: Part of the painting image. NOT transcribed separately. Let 八大山人 speak for himself.
- **Writings (文)**: Only standalone texts that exist independently from paintings.
- **Typography**: Vertical CJK, Noto Serif SC, already configured in the existing recording.

## The Homepage

Replace the existing homepage quote (Zheng Banqiao's line about him) with his OWN words. The 个山小像 (Self-Portrait) inscription from 1674 is the most personal thing he ever wrote:

> 生在曹洞临济有，穿过临济曹洞有。
> 洞曹临济两俱非，嬴嬴然若丧家之狗。
> 还识得此人么？

*"Do you still recognize this person?"*

Or possibly simpler — just his description: "南昌。甲戌年。" and let the collections speak.

## Complete Catalog of Works to Include (to 1694)

### 畫 (Paintings)

All surviving dated works from before or during 1694, plus undated mature works:

| Work | Date | Format | Current Location |
|------|------|--------|-----------------|
| 荷花鸟 (Lotus and Birds) | 1659 | Hanging scroll | — |
| 荷花册 (Lotus Album) | c.1665 | 8 leaves | Freer Gallery |
| 墨花图卷 (Ink Flowers) | 1666 | Handscroll | — |
| 荷石图 (Lotus and Rock) | 1686 | Hanging scroll | — |
| 花鸟虫鱼图册 (Birds, Flowers, Insects, Fish) | c.1688-89 | Album | Freer Gallery |
| 丁香 (Lilac) | c.1690 | Album leaves | — |
| 落花 (Falling Flower) | c.1692 | Album leaf | — |
| 双鹆图 (Two Mynas on a Rock) | 1692 | — | Private |
| 山水四帧 (Four Landscapes) | c.1693-96 | Album | Freer Gallery |
| 安晚帖 (An Wan Album) | 1694 | 22 leaves | Izumi Hakugokan, Kyoto |
| 孤禽图 (Solitary Bird) | Undated | Hanging scroll | Private |
| 孔雀竹石图 (Peacock, Bamboo, Rock) | c.1690s | — | — |
| 鱼 (Fish) works | c.1690-94 | Various | Various |
| 荷花 (Lotus) works | Various | Various | Various |

**For the demo site, select ~10-12 key works** with available public domain images.

### 書 (Calligraphy)

| Work | Date | Notes |
|------|------|-------|
| 黄庭内景经 (Scripture of Yellow Court) | 1684 | Earliest 八大山人 signature |
| 临兰亭序 (Copy of Orchid Pavilion) | — | After Wang Xizhi |
| 酒德颂 (Praising the Virtue of Wine) | — | After Huang Tingjian |

### 文 (Standalone Writings)

Only texts that exist independently from paintings:

1. **个山小像题跋** (Self-Portrait Inscriptions, 1674) — Multiple poems written on his portrait by Huang Anping. The most personal texts he ever wrote. "还识得此人么？" "Do you still recognize this person?"

2. **致方士琯书** (Letters to Fang Shiguan, c.1688-1705) — 10 leaves at the Met Museum. Practical, personal letters about health, meetings, gifts, painting commissions. Select those datable to before 1694.

3. **题诗** (Selected poems) — Standalone poems not specifically tied to paintings, if any survive from before 1694.

## What Changes from Current Recording

### REMOVE (invented content)
- `文/磨墨记.md` — invented meditation on grinding ink
- `文/石涛来访.md` — fiction; they never met
- `文/鱼目.md` — invented philosophical reflection
- `書/兰亭序.md` (body text) — replace with real inscription if available
- `書/扇面.md` (body text) — replace with real inscription if available
- All invented body text in 畫 articles

### KEEP (structure and config)
- The 畫/書/文 folder structure — this IS authentic
- `.moss/config.toml` — `typesetting: "vertical"`, `lang: "zh-hans"`
- `.moss/theme/style.css` — the cinnabar/ink palette is perfect
- The `children_style: summary` layout

### ADD
- Real painting images from public domain sources
- Real calligraphy images
- Real standalone texts (Self-Portrait poems, Fang Shiguan letters)
- Homepage rewritten with his own words

### MODIFY
- Each painting page: `:::hero {.plate}` with just the image
- Each calligraphy page: same treatment
- Homepage text: his own inscription, not Zheng Banqiao's

## Image Sourcing

Priority sources for 八大山人's works:
1. **Metropolitan Museum of Art (CC0)** — Letters to Fang Shiguan, landscape albums
2. **Freer Gallery / Smithsonian (Open Access)** — Lotus Album, Birds/Flowers/Insects album, landscapes
3. **Wikimedia Commons** — Various works
4. **Palace Museum Beijing digital collection** — some works available online

Note: Many of 八大山人's most important works are in private collections or Japanese museums with restricted image access. We use what's available in public domain.

## CSS Considerations

The existing CSS is already excellent:
```css
:root {
  --moss-color-bg: #f8f5f0;      /* Rice paper */
  --moss-color-text: #1a1a1a;    /* Pure ink */
  --moss-color-accent: #c04020;  /* Cinnabar seal */
  --moss-font-body: "Noto Serif SC", serif;
}
```

May need:
- The `.plate` hero class from Blake's theme (full-width, no gradient, no content below)
- Vertical text adjustments for the 文 section
- Even more generous whitespace/margins for the 留白 aesthetic

## Verification

1. Paintings display full-width with no content below
2. Calligraphy displays full-width
3. 文 section shows his actual standalone texts in vertical Chinese
4. Homepage shows his Self-Portrait inscription
5. Vertical typesetting renders correctly
6. The cinnabar/ink/paper color palette works
7. Mobile responsive

## Key Difference from Blake

Blake's 1793 Prospectus lists his works with prices, page counts, and format descriptions. It's an artist's commercial catalog.

八大山人 would never list prices. He might not even list titles. He'd show the paintings, show the calligraphy, and let you figure out what you're looking at. His "About" page is a poem where he calls himself a homeless dog. That IS the About page.
