# 八大山人 Recording Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the 八大山人 demo site from invented content to his real works and actual writings, set in 甲戌年 (1694).

**Architecture:** Same pattern as the Blake recording — paintings displayed full-width via `:::hero {.plate}`, standalone writings as journal content, period-appropriate CSS. Vertical typesetting already configured. Replace invented content with real works and inscriptions sourced from public domain museums.

**Tech Stack:** moss static site generator, Playwright for visual verification, images from Met Museum CC0 / Freer Gallery / Wikimedia Commons.

**Design spec:** `recordings/research/bada-shanren-site-design.md`
**Research:** `recordings/research/bada-shanren-complete-research.md`

uid: 0d9ff5aa
---

## File Structure

```
八大山人/
├── 八大山人.md                           ← MODIFY: homepage with Self-Portrait inscription
├── 畫/                                   ← MODIFY: replace invented content with real works
│   ├── 畫.md                            ← KEEP: collection index (may adjust cover/description)
│   ├── 孤禽图.md + .jpg                 ← MODIFY: real inscription or :::hero {.plate} only
│   ├── 安晚帖鱼.md + .jpg              ← NEW: Anwan Album fish (1694)
│   ├── 荷花双凫图.md + .jpg            ← NEW: Lotus and Ducks (Freer Gallery)
│   ├── 花鸟虫鱼图册.md + .jpg          ← NEW: Birds/Flowers/Insects album (Freer)
│   ├── 山水.md + .jpg                   ← MODIFY: use real work
│   ├── (keep or replace existing works with real versions)
│   └── ... (~8-10 paintings total
├── 書/                                   ← MODIFY: replace with real calligraphy works
│   ├── 書.md                            ← KEEP: collection index
│   ├── 黄庭内景经.md + .jpg            ← NEW: earliest 八大山人 signature (1684)
│   ├── 兰亭序.md + .jpg                ← MODIFY: use real calligraphy image
│   └── 扇面.md + .jpg                  ← MODIFY: use real calligraphy image
├── 文/                                   ← REPLACE: real standalone writings
│   ├── 文.md                            ← MODIFY: collection index
│   ├── 个山小像.md                      ← NEW: Self-Portrait poems (1674)
│   ├── 致方士琯书.md                    ← NEW: Letters to Fang Shiguan
│   └── (remove invented entries)
└── .moss/
    ├── config.toml                       ← KEEP as-is
    └── theme/style.css                   ← MODIFY: add .plate hero class
```

---

### Task 1: Add `.plate` hero class to theme CSS

The existing theme CSS doesn't have the `.plate` hero class needed for full-width painting display. Add it from the Blake recording's pattern.

**Files:**
- Modify: `recordings/八大山人/.moss/theme/style.css`

- [ ] **Step 1: Read existing theme CSS**

```bash
cat "recordings/八大山人/.moss/theme/style.css"
```

- [ ] **Step 2: Add `.plate` hero class**

Append to the existing CSS (after the existing `:root` block and any existing rules):

```css
/* ── Painting/calligraphy display: full-width, image only ── */

.moss-hero.plate {
  max-height: none;
}

.moss-hero.plate img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.moss-hero.plate::before {
  display: none;
}

/* Hide article content below painting */
body:has(.moss-hero.plate) main .container {
  display: none;
}

/* Override default mobile hero for plate pages */
@media (max-width: 48rem) {
  .moss-hero.plate {
    aspect-ratio: auto;
  }

  .moss-hero.plate img {
    position: static;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add "recordings/八大山人/.moss/theme/style.css"
git commit -m "style(八大山人): add .plate hero class for full-width painting display"
```

---

### Task 2: Remove invented content

Remove the three invented 文 entries and clear invented body text from painting/calligraphy pages.

**Files:**
- Delete: `recordings/八大山人/文/磨墨记.md`
- Delete: `recordings/八大山人/文/石涛来访.md`
- Delete: `recordings/八大山人/文/鱼目.md`

- [ ] **Step 1: Delete invented 文 entries**

```bash
rm "recordings/八大山人/文/磨墨记.md"
rm "recordings/八大山人/文/石涛来访.md"
rm "recordings/八大山人/文/鱼目.md"
```

- [ ] **Step 2: Update 文 collection index**

Rewrite `recordings/八大山人/文/文.md`:
```markdown
---
description: 题诗、书信。
children_style: summary
uid: (keep existing uid)
---
```

- [ ] **Step 3: Convert existing painting pages to :::hero {.plate} format**

For each existing painting markdown file in `畫/`, rewrite to hero-only format:
```markdown
---
cover: {existing-image}.jpg
description: {keep or update description}
uid: {keep existing uid}
---

:::hero {.plate}
![{title}](../{existing-image}.jpg)
:::
```

Convert: 孤禽图.md, 山水.md, 山水册.md, 枯木来禽图.md, 荷花水鸟图.md, 荷花禽鸟图.md, 鱼.md, 鱼石图.md

- [ ] **Step 4: Convert existing calligraphy pages to :::hero {.plate} format**

Same pattern for `書/兰亭序.md` and `書/扇面.md`.

- [ ] **Step 5: Commit**

```bash
git add -A "recordings/八大山人/"
git commit -m "refactor(八大山人): remove invented content, convert to hero plate format"
```

---

### Task 3: Rewrite homepage with Self-Portrait inscription

Replace the existing homepage text with 八大山人's own words from the 个山小像 inscription.

**Files:**
- Modify: `recordings/八大山人/八大山人.md`

- [ ] **Step 1: Rewrite homepage**

```markdown
---
children_style: summary
uid: 2254a296
description: 南昌。甲戌年。
children_depth: direct
---

生在曹洞临济有，穿过临济曹洞有。\
洞曹临济两俱非，嬴嬴然若丧家之狗。\
还识得此人么？
```

Note: Use `\` for line breaks in the poem. Keep `children_style: summary` (not grid — this is how the existing recording works with vertical text).

- [ ] **Step 2: Commit**

```bash
git add "recordings/八大山人/八大山人.md"
git commit -m "feat(八大山人): homepage with Self-Portrait inscription"
```

---

### Task 4: Source painting images from public domain

Download real 八大山人 painting images from Met Museum CC0, Freer Gallery Open Access, and Wikimedia Commons.

**Files:**
- New images in `recordings/八大山人/畫/` and `recordings/八大山人/書/`

- [ ] **Step 1: Search and download painting images**

Target works (prioritize those with available public domain images):

From **Met Museum** (CC0):
- Landscape Album (1699) — search "Bada Shanren landscape"
- Letters to Fang Shiguan — search "Bada Shanren letters"
- Fish and Rocks — search "Bada Shanren fish"

From **Freer Gallery** (Open Access):
- Lotus Album (c.1665) — search Freer collection "Bada Shanren lotus"
- Birds, Flowers, Insects and Fish album (c.1688-89)
- Lotus and Ducks (c.1696) — accession F1998.45

From **Wikimedia Commons**:
- 孤禽图 (Solitary Bird)
- 安晚帖 works
- Calligraphy works
- Various flower-and-bird paintings

Use `curl` to download. Name files to match Chinese painting titles. Save as JPG.

- [ ] **Step 2: Replace existing placeholder images if needed**

Check if existing images (孤禽图.jpg, 山水.jpg, etc.) are real works or placeholders. If they're already real 八大山人 works, keep them. If they're placeholders, replace with downloaded versions.

- [ ] **Step 3: Verify all images are valid (file size > 5KB)**

```bash
find "recordings/八大山人" -name "*.jpg" -not -path "*/.moss/*" -exec sh -c 'size=$(wc -c < "$1"); if [ "$size" -lt 5000 ]; then echo "SMALL: $1 ($size bytes)"; fi' _ {} \;
```

- [ ] **Step 4: Commit**

```bash
git add "recordings/八大山人/畫/" "recordings/八大山人/書/"
git commit -m "feat(八大山人): source real painting and calligraphy images"
```

---

### Task 5: Create new painting pages for real works

Add markdown pages for newly sourced paintings that don't already have pages.

**Files:**
- New markdown files in `recordings/八大山人/畫/`

- [ ] **Step 1: Create markdown for each new painting**

Template for each painting:
```markdown
---
cover: {image-filename}.jpg
description: {Brief description with date and format}
uid: {8-char hex}
---

:::hero {.plate}
![{Title}](../{image-filename}.jpg)
:::
```

Create pages for: any new paintings downloaded in Task 4 that don't already have markdown files.

- [ ] **Step 2: Create calligraphy pages for new works**

Same template for any new calligraphy works (e.g., 黄庭内景经).

- [ ] **Step 3: Update collection index covers if needed**

If the cover images referenced in `畫/畫.md` or `書/書.md` have changed filenames, update the `cover:` field.

- [ ] **Step 4: Commit**

```bash
git add "recordings/八大山人/"
git commit -m "feat(八大山人): add painting and calligraphy pages for real works"
```

---

### Task 6: Write standalone writings (文 section)

Create journal-style pages with 八大山人's actual standalone texts.

**Files:**
- Create: `recordings/八大山人/文/个山小像.md`
- Create: `recordings/八大山人/文/致方士琯书.md`

- [ ] **Step 1: Create Self-Portrait poems page**

Write `recordings/八大山人/文/个山小像.md`:

```markdown
---
title: 个山小像自题
uid: w1674a001
date: 1674-01-01
description: 甲寅年。黄安平写像，自题。
---

个山小像。时年四十有九。

---

生在曹洞临济有，穿过临济曹洞有。\
洞曹临济两俱非，嬴嬴然若丧家之狗。\
还识得此人么？

---

没毛驴，初生兔。\
剺破面门，手足无措。\
莫是悲他世上人，到头不识来时路。\
今朝且喜当行，穿过葛藤露布。\
咄！
```

- [ ] **Step 2: Create Letters to Fang Shiguan page**

Write `recordings/八大山人/文/致方士琯书.md` with selected content from the letters (Met Museum collection). Use the actual letter content where available, noting these are real documents:

```markdown
---
title: 致方士琯书
uid: w1690a002
date: 1690-01-01
description: 与方士琯往来书札。
---

{Selected letter content from the Met Museum collection.
Research the actual text of the letters — they discuss
health, meetings, exchanges of gifts, and painting/selling works.
Include what is publicly available.}
```

- [ ] **Step 3: Remove the old 文/扇面.jpg** (if it was associated with a deleted entry)

Check if `文/扇面.jpg` was used by the deleted entries. If so, remove it.

- [ ] **Step 4: Commit**

```bash
git add "recordings/八大山人/文/"
git commit -m "feat(八大山人): real writings — Self-Portrait poems and Fang Shiguan letters"
```

---

### Task 7: Build site and verify with Playwright

Compile the site using the moss binary (from the hero-article-pages worktree) and take screenshots.

**Files:**
- No new files — verification only

- [ ] **Step 1: Compile the site**

```bash
/Users/guoliu/repos/Symbiosis-Lab/moss/.worktrees/hero-article-pages/target/release/moss compile "recordings/八大山人" --no-plugins
```

- [ ] **Step 2: Start local server**

```bash
cd "recordings/八大山人/.moss/build/site" && python3 -m http.server 8767 &
echo $!
```

- [ ] **Step 3: Take screenshots**

```bash
# Homepage
npx playwright screenshot --viewport-size="1200,1600" http://localhost:8767/ /tmp/bada-homepage.png

# A painting page
npx playwright screenshot --viewport-size="1200,1600" http://localhost:8767/畫/孤禽图/ /tmp/bada-solitary-bird.png

# A calligraphy page
npx playwright screenshot --viewport-size="1200,1600" http://localhost:8767/書/兰亭序/ /tmp/bada-calligraphy.png

# The writings section
npx playwright screenshot --viewport-size="1200,1600" http://localhost:8767/文/ /tmp/bada-writings.png

# A writing page
npx playwright screenshot --viewport-size="1200,1600" http://localhost:8767/文/个山小像/ /tmp/bada-self-portrait.png

# Mobile
npx playwright screenshot --viewport-size="375,812" http://localhost:8767/ /tmp/bada-mobile-home.png
npx playwright screenshot --viewport-size="375,812" http://localhost:8767/畫/孤禽图/ /tmp/bada-mobile-painting.png
```

- [ ] **Step 4: Review screenshots**

Check:
1. Paintings display full-width with no content below
2. Homepage shows the Self-Portrait inscription
3. Vertical typesetting renders correctly (if the vertical-typesetting feature is on the worktree branch)
4. The cinnabar/ink color palette works
5. Mobile responsive
6. 文 section shows real standalone texts

- [ ] **Step 5: Fix any issues found**

Iterate: fix CSS, fix image paths, fix content, recompile, re-screenshot.

- [ ] **Step 6: Kill server and commit any fixes**

```bash
kill $(lsof -ti:8767) 2>/dev/null
git add -A "recordings/八大山人/"
git commit -m "fix(八大山人): fixes from visual verification"
```

---

### Task 8: Final commit and cleanup

- [ ] **Step 1: Verify all content committed**

```bash
git status -- "recordings/八大山人"
```

- [ ] **Step 2: Final review of file structure**

```bash
find "recordings/八大山人" -name "*.md" -not -path "*/.moss/*" | sort
find "recordings/八大山人" -name "*.jpg" -not -path "*/.moss/*" | sort
```

Verify all paintings have both .md and .jpg files.

- [ ] **Step 3: Done**

The 八大山人 recording is complete with real works and actual writings.
