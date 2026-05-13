# William Blake Completion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the "William Blake" recording at `moss-releases/recordings/William Blake/` so a reader gets a coherent, comprehensive view of what Blake himself chose to make public — every illuminated book, every public tract, every engraved series he sold, his ~30 most substantive letters, key biographical journal entries in first-person voice — plus a curated "Drafts" section for works he prepared for publication but did not release.

**Scope rule (load-bearing):** Include what Blake himself published, exhibited, distributed, or sold; plus material that is particularly *legible and valuable* to a modern reader (verse-letters, the Notebook's finished pieces, *Poetical Sketches*, *Tiriel*, *French Revolution*, the Pickering Manuscript). **Exclude** private marginalia and transactional correspondence.

**Architecture:** The recording is a moss site. Each work is a folder of plate JPEGs plus a `<work>.md` front-matter file with `cover`, `description`, `children_style: grid`, `series: true`, `weight`, `uid`. The published voice is first-person Blake. New sections (Letters, Tracts, Gallery, Drafts) become top-level folders under `William Blake/`, each with its own index `.md`. The journal stays for biographical entries; the existing letter and annotation entries currently in `journal/` migrate to a new `letters/` folder.

**Tech stack:** moss SSG (Tauri app), Markdown with YAML front matter, JPEGs at 3000–5000px long edge. Image sources: the William Blake Archive (BlakeArchive.org, CC BY-NC-SA), Library of Congress, British Museum, Tate, Yale Center for British Art, Fitzwilliam. Text source: Erdman's *Complete Poetry and Prose of William Blake* (rev. 1988) cross-checked against the Blake Archive's plate-by-plate transcriptions.

---

## Inclusion / Exclusion Reference

Single source of truth — task descriptions defer to this table when uncertain.

| Category | Decision | Reason |
|---|---|---|
| Illuminated books (all 17) | **Include** | Self-printed, sold, signed |
| *Descriptive Catalogue* (1809) full text | **Include** as tract | Printed by Blake; sold at his exhibition |
| *On Homer / On Virgil*, *Ghost of Abel*, *Laocoön* | **Include** as tracts | Late etched broadsides he distributed |
| *Poetical Sketches* (1783) | **Include** | His one letterpress-printed volume, given away |
| *Job* engravings (1826) | **Include** in Gallery | Sold by subscription |
| *Blair's Grave* designs (1808) | **Include** in Gallery | Published in his lifetime |
| Large Color Prints (1795) | **Include** in Gallery | Sold to Butts |
| Dante (1826–7) engravings (7 plates) | **Include** in Gallery | Engraved for public sale |
| 1809 exhibition paintings | **Include** in Gallery | He exhibited them himself |
| Visionary Heads (Varley sessions) | **Include** as small gallery | Public spectacle; widely circulated |
| Notebook — *Public Address*, *Vision of Last Judgment*, finished epigrams | **Include** in Drafts | Substantial prose he prepared toward publication |
| *Pickering MS* (Auguries, Mental Traveller, etc.) | **Include** in Drafts | Finished poems he intended to engrave |
| *French Revolution* (1791) Book I | **Include** in Drafts | Set in type at Joseph Johnson's; he chose not to publish at the last moment |
| *Tiriel* (c. 1789) | **Include** in Drafts | Coherent text + 12 finished wash drawings |
| *Vala / Four Zoas* | **Exclude** (or: 2-page fragment only) | He abandoned it; cannibalized into *Milton*/*Jerusalem* |
| *An Island in the Moon* (c. 1784) | **Exclude** | Private satire of his social circle |
| Annotations / marginalia | **Exclude** | Private reactions in his own books — user's call |
| Trial documents (Scofield) | **Exclude** | Forensic, not authored |
| Transactional letters (errands, parcels, money requests) | **Exclude** | Dilute the persona |
| Substantive letters (~30 of ~80) | **Include** in Letters | See selection list under Phase 7 |
| Verse-letters to Butts | **Include** prominently | Pure blog-post material |
| Commission watercolors not engraved (Night Thoughts 537, Paradise Lost Butts/Thomas sets, Pilgrim's Progress, Gray, Milton minor) | **Exclude from main galleries** | He did not release them publicly. Cite in journal entries if relevant. |
| Night Thoughts — the 43 engraved plates | **Include** in Gallery | Published by Edwards 1797 |

---

## Sourcing Standards

**Image sources (in order of preference):**

1. **The William Blake Archive** — https://www.blakearchive.org/work/ — CC BY-NC-SA 3.0. Full plate scans of every illuminated book in every surviving copy, plus the major pictorial series. **This is the default source.**
2. **Library of Congress** — Rosenwald Collection holds Copy Z of *Songs*, Copy E of *America*, Copy E of *Europe*, Copy G of *Urizen*, Copy D of *Milton*. Open-access TIFFs.
3. **Yale Center for British Art** — Copy E of *Jerusalem* (the only fully colored copy), Copy F of *Songs of Experience*. Open Access policy.
4. **British Museum** — *Job* engravings, *Large Color Prints*, separate plates. Most digital reproductions CC BY-NC-SA 4.0.
5. **Tate Britain** — *Large Color Prints* (Newton, Nebuchadnezzar, Pity, Hecate), temperas, 1809 exhibition paintings.
6. **Fitzwilliam Museum** — Copy AA of combined *Songs*, Copy K of *Europe*, Copy I of *Marriage*.
7. **Morgan Library** — Copy F of *Marriage*, Copy C of *Milton*.
8. **Wikimedia Commons** — fallback only; verify provenance back to source institution.

**Copy selections** (Blake colored each copy differently — pick deliberately):

| Work | Recommended copy | Source | Reason |
|---|---|---|---|
| *All Religions Are One* | Copy A | Huntington / Blake Archive | Only complete impression |
| *No Natural Religion* (a + b) | Composite — Copy L (a), Copy C (b) | Blake Archive | Most plates present |
| *Songs of Innocence* (already present — verify vs upgrade) | Copy B | British Museum | Color-fresh, oft-reproduced |
| *Songs of Experience* | Copy F | Yale Center for British Art | Vivid, complete, open access |
| *Thel* (already present — verify) | Copy F | LoC | Crisp impressions |
| *Marriage* (**upgrade needed**, current is 462×660) | Copy F | Morgan Library | The richest colored copy |
| *Visions* (already present — verify) | Copy G | LoC | Sharp |
| *America* (already present — excellent at 3697×5059) | Copy E | LoC | Confirm |
| *Europe* | Copy E | LoC | The Ancient of Days frontispiece is iconic |
| *Urizen* | Copy G | LoC | Most plates, fullest color |
| *Book of Ahania* | Copy A | LoC | Only one complete copy |
| *Book of Los* | Copy A | British Museum | Only one complete copy |
| *Song of Los* | Copy A | British Museum | Vivid |
| *Milton* | Copy C | NYPL | Includes preface ("And did those feet") |
| *Jerusalem* | Copy E | Yale Center for British Art | The only fully colored copy in existence |
| *Gates of Paradise* (already present — verify) | *For the Sexes* Copy D | British Museum | Late state |
| *On Homer / On Virgil* | Copy B | LoC | Clear |
| *Ghost of Abel* | Copy A | LoC | Only complete copy |
| *Laocoön* | Copy B | Fitzwilliam | Sharpest text |
| *Job* engravings | Linnell proofs | British Museum | Best impressions |
| *Large Color Prints* | Tate set + Butts set | Tate / various | Both Newton impressions different and worth showing |
| *Blair's Grave* | First edition 1808 | Various | Schiavonetti's plates after Blake's designs |
| Dante engravings (7) | British Museum impressions | British Museum | Posthumous publication |
| *Night Thoughts* engravings (43) | First edition 1797 | LoC | Folio engravings |

**Text source:** Erdman's *Complete Poetry and Prose of William Blake* (Anchor/Doubleday, rev. 1988). When the printed plate differs from Erdman's reading text (Blake revised plates), prefer the **Blake Archive's plate-by-plate transcription** for plate captions and Erdman for "reading text" tracts. Cite which edition each transcription came from in the file's YAML front matter as `source:`.

**License:** All Blake Archive content is CC BY-NC-SA 3.0 — non-commercial reuse with attribution and share-alike. The moss-releases project must be non-commercial; verify before deploy. LoC and YCBA materials are public domain or open access. British Museum/Tate vary — check each item.

---

## File Layout (target end state)

```
recordings/William Blake/
├── William Blake.md                          [existing — update weights/structure]
│
├── books/                                    [NEW — wraps all illuminated books]
│   ├── books.md                              [section index]
│   ├── all-religions-are-one/                [NEW]
│   ├── no-natural-religion/                  [NEW]
│   ├── innocence/                            [existing — verify image quality]
│   ├── songs-of-experience/                  [NEW — critical gap]
│   ├── the-book-of-thel/                     [existing]
│   ├── the-marriage-of-heaven-and-hell/      [existing — UPGRADE plates from 462×660]
│   ├── visions-of-the-daughters-of-albion/   [existing]
│   ├── america-a-prophecy/                   [existing]
│   ├── europe-a-prophecy/                    [NEW]
│   ├── the-book-of-urizen/                   [NEW]
│   ├── the-book-of-ahania/                   [NEW]
│   ├── the-book-of-los/                      [NEW]
│   ├── the-song-of-los/                      [NEW]
│   ├── milton/                               [NEW]
│   ├── jerusalem/                            [NEW — biggest single sub-task: 100 plates]
│   └── gates-of-paradise/                    [existing]
│
├── tracts/                                   [NEW]
│   ├── tracts.md
│   ├── on-homer-on-virgil/                   [2 plates]
│   ├── the-ghost-of-abel/                    [2 plates]
│   ├── laocoon/                              [1 plate]
│   └── descriptive-catalogue.md              [full prose, single page]
│
├── gallery/                                  [NEW]
│   ├── gallery.md
│   ├── job/                                  [21 engravings]
│   ├── large-color-prints/                   [12 prints]
│   ├── grave/                                [12 plates]
│   ├── dante/                                [7 engravings + curated watercolors]
│   ├── night-thoughts/                       [43 engravings]
│   ├── exhibition-1809/                      [curated paintings shown 1809]
│   └── visionary-heads/                      [10–15 selected]
│
├── drafts/                                   [NEW]
│   ├── drafts.md
│   ├── poetical-sketches/                    [letterpress 1783 — text]
│   ├── tiriel/                               [text + 12 drawings]
│   ├── french-revolution/                    [text only]
│   ├── pickering-manuscript/                 [text only]
│   └── notebook/                             [selected pieces — Public Address, Vision of Last Judgment, finest epigrams]
│
├── letters/                                  [NEW]
│   ├── letters.md
│   └── [chronological — see Phase 7]
│
└── journal/                                  [existing — purify to biographical]
    ├── journal.md
    ├── [existing biographical entries stay]
    ├── [existing letter entries MOVE to letters/]
    ├── [existing annotation entries — REMOVE or migrate to drafts/notes if user revises]
    └── [NEW biographical entries — see Phase 6]
```

---

## Phases & Task Decomposition

**Plan covers 7 phases. Each phase produces an independently shippable increment.** Commit per task. Run `pnpm run dev` or moss preview after each phase to verify build.

---

### Phase 0: Foundation & Audit

**Goal:** Restructure folders, audit existing image quality, fix the 462×660 *Marriage* plates.

**Files:**
- Create: `recordings/William Blake/books/books.md`
- Create: `recordings/William Blake/tracts/tracts.md`
- Create: `recordings/William Blake/gallery/gallery.md`
- Create: `recordings/William Blake/drafts/drafts.md`
- Create: `recordings/William Blake/letters/letters.md`
- Modify: `recordings/William Blake/William Blake.md` (weights to put books first)
- Move: existing six work folders → `books/`

- [ ] **Step 0.1: Inventory image resolutions across all existing plates**

Run:
```bash
cd "/Users/guoliu/repos/Symbiosis-Lab/moss-releases/recordings/William Blake"
for d in america-a-prophecy gates-of-paradise innocence the-book-of-thel the-marriage-of-heaven-and-hell visions-of-the-daughters-of-albion; do
  for f in "$d"/*.jpg; do
    file "$f" | awk -F', ' '{for(i=1;i<=NF;i++)if($i~/[0-9]+x[0-9]+/)print FILENAME": "$i}' FILENAME="$f"
  done
done > /tmp/blake-img-audit.txt
cat /tmp/blake-img-audit.txt
```

Expected: A list of `<file>: WIDTHxHEIGHT` lines. Flag every plate < 1500px short edge for re-sourcing.

- [ ] **Step 0.2: Create the five new top-level section index files**

Create `recordings/William Blake/books/books.md`:
```markdown
---
description: The illuminated books, 1788–1820. Printed and coloured by my own hand.
children_style: grid
children_depth: direct
weight: 1
uid: blk-books
---
```

Create `recordings/William Blake/tracts/tracts.md`:
```markdown
---
description: Late etched broadsides and the Descriptive Catalogue.
children_style: list
weight: 2
uid: blk-tracts
---
```

Create `recordings/William Blake/gallery/gallery.md`:
```markdown
---
description: Engravings, color prints, paintings.
children_style: grid
weight: 3
uid: blk-gallery
---
```

Create `recordings/William Blake/drafts/drafts.md`:
```markdown
---
description: Works prepared but not engraved. From the desk drawer.
children_style: list
weight: 4
uid: blk-drafts
---
```

Create `recordings/William Blake/letters/letters.md`:
```markdown
---
description: Correspondence, 1791–1827.
children_style: list
weight: 5
uid: blk-letters
---
```

- [ ] **Step 0.3: Move existing illuminated books into `books/`**

```bash
cd "/Users/guoliu/repos/Symbiosis-Lab/moss-releases/recordings/William Blake"
mkdir -p books
git mv america-a-prophecy gates-of-paradise innocence the-book-of-thel the-marriage-of-heaven-and-hell visions-of-the-daughters-of-albion books/ 2>/dev/null || mv america-a-prophecy gates-of-paradise innocence the-book-of-thel the-marriage-of-heaven-and-hell visions-of-the-daughters-of-albion books/
```

Verify: `ls books/` shows all six folders.

- [ ] **Step 0.4: Update `journal/journal.md` weight and rewrite description**

Edit `recordings/William Blake/journal/journal.md`:
```markdown
---
description: Notes from a working life.
weight: 6
uid: a1600b6d
---
```
(`weight: 10` → `6`; description simplified — no longer "annotations and letters" since those move.)

- [ ] **Step 0.5: Replace the 462×660 Marriage plates**

Download Copy F (Morgan Library) high-res plates from Blake Archive: https://www.blakearchive.org/work/mhh — select Copy F (or Copy I Fitzwilliam if F unavailable at scale). Use the "object_dbi" view and right-click → save full-size.

Save into `books/the-marriage-of-heaven-and-hell/` overwriting existing files, preserving the existing 01–27 numbering and slug names. Confirm long edge ≥ 3000px:
```bash
for f in books/the-marriage-of-heaven-and-hell/*.jpg; do
  file "$f"
done
```

- [ ] **Step 0.6: Build & verify**

Run moss preview (or `moss-test.sh William\ Blake` from moss root). Open in browser. Confirm: top-level page lists Books, Tracts, Gallery, Drafts, Journal, Letters. Books page shows the 6 existing illuminated books. Marriage plates render crisp.

- [ ] **Step 0.7: Commit**

```bash
git add -A
git commit -m "blake: restructure into books/tracts/gallery/drafts/letters; upgrade Marriage plates"
```

---

### Phase 1: The Critical Gap — *Songs of Experience*

**Goal:** Add *Songs of Experience* as a sibling to *Innocence*. Both should share visual treatment so the contrary pairing reads correctly. 26 plates including frontispiece and title page.

**Source:** Yale Center for British Art Copy F. URL: https://collections.britishart.yale.edu/catalog?q=songs+of+experience+blake — or via Blake Archive https://www.blakearchive.org/work/songsie — choose Copy F.

**File layout:**
```
books/songs-of-experience/
├── songs-of-experience.md
├── 01-frontispiece.jpg
├── 02-title-page.jpg
├── 03-introduction.jpg
├── 04-earths-answer.jpg
├── 05-the-clod-and-the-pebble.jpg
├── 06-holy-thursday.jpg
├── 07-the-little-girl-lost-1.jpg
├── 08-the-little-girl-lost-2.jpg
├── 09-the-little-girl-found-1.jpg
├── 10-the-little-girl-found-2.jpg
├── 11-the-chimney-sweeper.jpg
├── 12-nurses-song.jpg
├── 13-the-sick-rose.jpg
├── 14-the-fly.jpg
├── 15-the-angel.jpg
├── 16-the-tyger.jpg
├── 17-my-pretty-rose-tree.jpg
├── 18-ah-sunflower.jpg
├── 19-the-lilly.jpg
├── 20-the-garden-of-love.jpg
├── 21-the-little-vagabond.jpg
├── 22-london.jpg
├── 23-the-human-abstract.jpg
├── 24-infant-sorrow.jpg
├── 25-a-poison-tree.jpg
├── 26-a-little-boy-lost.jpg
└── 27-a-little-girl-lost.jpg
```

Note: Some copies include "To Tirzah" and "The School Boy" / "The Voice of the Ancient Bard" in Experience; others place these in Innocence. Use Yale Copy F's arrangement and document it.

- [ ] **Step 1.1: Source the 26 plate images at ≥3000px long edge**

Go to https://www.blakearchive.org/work/songsie — Object descriptions → Copy F. For each plate, click the IIIF or full-size download. Save with the numbered filenames above (use lowercase, hyphenated slug from the plate title).

- [ ] **Step 1.2: Verify all 26 files saved and dimensions correct**

```bash
ls books/songs-of-experience/*.jpg | wc -l   # expect: 26
for f in books/songs-of-experience/*.jpg; do file "$f" | grep -oE '[0-9]+x[0-9]+'; done | sort -u
```

Reject any file < 2000px short edge — re-download.

- [ ] **Step 1.3: Create `songs-of-experience.md`**

```markdown
---
cover: 01-frontispiece.jpg
description: Songs of Experience, 1794. Shewing the Two Contrary States of the Human Soul.
children_style: grid
series: true
weight: 2
uid: blk-experience
source: Blake Archive, Copy F (Yale Center for British Art)
---

In the year ninety-four I added to the Songs of Innocence a second part, called Experience, that the contraries might be set against each other. Without contraries is no progression. The reader who reads only the one half reads but half a man.
```

- [ ] **Step 1.4: Build & verify visually**

Run moss preview. Navigate to Books → Songs of Experience. Confirm: 26 plates in grid, frontispiece as cover, title displays correctly. Click into "The Tyger" plate — confirm legibility at full size.

- [ ] **Step 1.5: Commit**

```bash
git add books/songs-of-experience/
git commit -m "blake: add Songs of Experience (Copy F, Yale)"
```

---

### Phase 2: Early tracts and Lambeth books

**Goal:** Fill in the 1788–1795 books: *All Religions Are One*, *No Natural Religion*, *Europe*, *Urizen*, *Ahania*, *Book of Los*, *Song of Los*. Seven works, ~95 plates total.

For each work below, the sub-tasks are: (a) source plates from listed Blake Archive copy, (b) save with numbered slug filenames matching plate titles, (c) verify count and resolution, (d) write the `<work>.md` index file with first-person description, (e) build, (f) commit.

#### 2.1: All Religions Are One (10 plates)

**Source:** Blake Archive Copy A (Huntington). URL: https://www.blakearchive.org/work/arglt — Copy A.

- [ ] **Step 2.1.1: Download 10 plates** to `books/all-religions-are-one/`. Filenames: `01-frontispiece.jpg` through `10-principle-7.jpg`. Use plate titles: Argument, Principle 1st through 7th, plus frontispiece, title page.

- [ ] **Step 2.1.2: Verify count + resolution**

```bash
ls books/all-religions-are-one/*.jpg | wc -l   # expect 10
```

- [ ] **Step 2.1.3: Write `all-religions-are-one.md`:**

```markdown
---
cover: 01-frontispiece.jpg
description: All Religions Are One, c. 1788. The Voice of one crying in the Wilderness.
children_style: grid
series: true
weight: 0
uid: blk-arone
source: Blake Archive, Copy A (Huntington Library)
---

The first of my works printed by the new method. A tract of seven principles, that the religions of the heathen and the philosophy of the schools are all derived from the Poetic Genius.
```

- [ ] **Step 2.1.4: Commit:** `git add books/all-religions-are-one/ && git commit -m "blake: add All Religions Are One"`

#### 2.2: There Is No Natural Religion (series a + b, ~20 plates)

**Source:** Blake Archive composite — Copy L for series a, Copy C for series b. URL: https://www.blakearchive.org/work/nnr — pick by series.

- [ ] **Step 2.2.1: Download series a (10 plates)** to `books/no-natural-religion/a/`.

- [ ] **Step 2.2.2: Download series b (10 plates)** to `books/no-natural-religion/b/`.

- [ ] **Step 2.2.3: Write nested index files.** Top-level `no-natural-religion.md`, plus `a/a.md` and `b/b.md` each as their own series.

```markdown
---
cover: a/01-frontispiece.jpg
description: There Is No Natural Religion, c. 1788. Two series.
children_style: list
weight: 0
uid: blk-nnr
source: Blake Archive — Copy L (series a, Morgan), Copy C (series b, British Museum)
---

Two short series, that man's perceptions are not bounded by organs of perception. He who sees the Infinite in all things sees God. He who sees the Ratio only sees himself only.
```

- [ ] **Step 2.2.4: Commit:** `git commit -m "blake: add There Is No Natural Religion (series a and b)"`

#### 2.3: Europe a Prophecy (18 plates)

**Source:** Copy E (LoC Rosenwald). URL: https://www.blakearchive.org/work/europe — Copy E.

- [ ] **Step 2.3.1: Download 18 plates** to `books/europe-a-prophecy/`. Filenames: `01-frontispiece-ancient-of-days.jpg`, `02-title-page.jpg`, then `03-preludium-1.jpg` through `18-plate-18.jpg`.

- [ ] **Step 2.3.2: Write `europe-a-prophecy.md`:**

```markdown
---
cover: 01-frontispiece-ancient-of-days.jpg
description: Europe a Prophecy, 1794. The deep of winter came; What time the secret child descended thro' the orient gates of the eternal day.
children_style: grid
series: true
weight: 6
uid: blk-europe
source: Blake Archive, Copy E (Library of Congress, Rosenwald Collection)
---

A companion to America. The Ancient of Days, with his compasses, opens this book — the same figure my brother Robert showed me, years ago, hovering over the staircase at Hercules Buildings.
```

- [ ] **Step 2.3.3: Commit.**

#### 2.4: The [First] Book of Urizen (28 plates)

**Source:** Copy G (LoC Rosenwald). URL: https://www.blakearchive.org/work/urizen — Copy G.

- [ ] **Step 2.4.1: Download 28 plates** to `books/the-book-of-urizen/`. Note plate ordering differs across copies — follow Copy G's bound order.

- [ ] **Step 2.4.2: Write `the-book-of-urizen.md`:**

```markdown
---
cover: 01-title-page.jpg
description: The First Book of Urizen, 1794. Lo, a shadow of horror is risen In Eternity.
children_style: grid
series: true
weight: 7
uid: blk-urizen
source: Blake Archive, Copy G (Library of Congress)
---

My Genesis. The fall of Urizen, who would be a god apart from his brethren — who would bind the infinite in his Book of brass.
```

- [ ] **Step 2.4.3: Commit.**

#### 2.5: The Book of Ahania (6 plates)

**Source:** Copy A (LoC). Only one complete copy survives. URL: https://www.blakearchive.org/work/ahania.

- [ ] **Step 2.5.1: Download 6 plates.**

- [ ] **Step 2.5.2: Write `the-book-of-ahania.md`:**

```markdown
---
cover: 01-title-page.jpg
description: The Book of Ahania, 1795. Fuzon, on a chariot iron-wing'd.
children_style: grid
series: true
weight: 8
uid: blk-ahania
source: Blake Archive, Copy A (Library of Congress)
---

A continental prophecy, intaglio-etched rather than relief. Of this book only one complete copy survives. The hidden sorrow of Urizen — Ahania, his emanation, cast out.
```

- [ ] **Step 2.5.3: Commit.**

#### 2.6: The Book of Los (5 plates)

**Source:** Copy A (British Museum). URL: https://www.blakearchive.org/work/bl.

- [ ] **Step 2.6.1: Download 5 plates.**

- [ ] **Step 2.6.2: Write `the-book-of-los.md`:**

```markdown
---
cover: 01-title-page.jpg
description: The Book of Los, 1795. O Times remote! When Love & Joy were adoration.
children_style: grid
series: true
weight: 9
uid: blk-bookoflos
source: Blake Archive, Copy A (British Museum)
---

The eternal Prophet Los, in chains of the mind, beating the stubborn structure of his fallen brother.
```

- [ ] **Step 2.6.3: Commit.**

#### 2.7: The Song of Los (8 plates — Africa + Asia)

**Source:** Copy A (British Museum). URL: https://www.blakearchive.org/work/sol.

- [ ] **Step 2.7.1: Download 8 plates.** Note: this is the "Song of" (different from Book of) — bound as two parts, Africa and Asia.

- [ ] **Step 2.7.2: Write `the-song-of-los.md`:**

```markdown
---
cover: 01-frontispiece.jpg
description: The Song of Los, 1795. Africa & Asia.
children_style: grid
series: true
weight: 10
uid: blk-songoflos
source: Blake Archive, Copy A (British Museum)
---

I sing of the continents. To Africa, where Urizen gave his laws to the nations. To Asia, where the Kings of the East heard the cry going up from the cities.
```

- [ ] **Step 2.7.3: Commit.**

- [ ] **Step 2.8: Phase 2 build & full visual check**

Run moss preview. Walk through every new book. Confirm: grids render, covers correct, no missing plates, no broken text in `description`. Check that `weight` values produce the chronological order: All Religions (0), No Natural Religion (0), Innocence (1), Experience (2), Thel (3), Marriage (4), Visions (5), America (6), Europe (7), Urizen (8), Ahania (9), Book of Los (10), Song of Los (11). Adjust weights if drift.

---

### Phase 3: The major late prophecies

**Goal:** Add *Milton* (50 plates) and *Jerusalem* (100 plates). These are the most demanding additions — both in volume and in interpretive significance.

#### 3.1: Milton: A Poem (50 plates)

**Source:** Blake Archive Copy C (NYPL). URL: https://www.blakearchive.org/work/milton. Copy C is preferred because it includes the full preface ("And did those feet in ancient time"). Copy B (Huntington) lacks the preface; Copy D (LoC) is alternative.

- [ ] **Step 3.1.1: Download all 50 plates of Copy C** to `books/milton/`. Confirm the preface plate is plate 1 or 2 depending on copy state.

- [ ] **Step 3.1.2: Verify plate count and that "Jerusalem" hymn ("Bring me my bow of burning gold") is captured.** Search for the plate by Blake Archive's transcription view.

- [ ] **Step 3.1.3: Write `milton.md`:**

```markdown
---
cover: 01-title-page.jpg
description: Milton, a Poem in 2 Books, 1804–1811. To Justify the Ways of God to Men.
children_style: grid
series: true
weight: 12
uid: blk-milton
source: Blake Archive, Copy C (New York Public Library)
---

I wrote this at Felpham, in the cottage by the sea. Milton descended into my left foot, and I saw the heavens open.

The preface I added in some copies and removed in others. It begins: And did those feet in ancient time walk upon Englands mountains green.
```

- [ ] **Step 3.1.4: Commit.**

#### 3.2: Jerusalem: The Emanation of the Giant Albion (100 plates) — the biggest single task

**Source:** Yale Center for British Art **Copy E** — the only fully colored copy. URL: https://www.blakearchive.org/work/jerusalem — Copy E.

Because this is the only fully colored copy, every plate is unique and worth presenting. 100 plates organized in 4 chapters of 25.

- [ ] **Step 3.2.1: Download all 100 plates from Copy E.** Save as `01-title-page.jpg` through `100-plate-100.jpg`. For numbered plates with named titles (frontispiece, the chapter heads), use the named slug.

- [ ] **Step 3.2.2: Verify all 100 present.** `ls books/jerusalem/*.jpg | wc -l` → 100.

- [ ] **Step 3.2.3: Write `jerusalem.md`:**

```markdown
---
cover: 01-frontispiece.jpg
description: Jerusalem, The Emanation of the Giant Albion, 1804–1820. The Sheep of England.
children_style: grid
series: true
weight: 13
uid: blk-jerusalem
source: Blake Archive, Copy E (Yale Center for British Art) — the only fully coloured copy
---

The work of sixteen years. Four chapters, one hundred plates. To the Public — to the Jews — to the Deists — to the Christians.

I gave one copy, fully painted, to Mr. Wainewright; that copy now sits at Yale. The rest I sold uncoloured. Read it as you would read a city.
```

- [ ] **Step 3.2.4: Commit.**

#### 3.3: Late tracts (small)

**Files in `tracts/`:** `on-homer-on-virgil/`, `the-ghost-of-abel/`, `laocoon/`.

- [ ] **Step 3.3.1: On Homer's Poetry [and] On Virgil — 2 plates.** Copy B (LoC). Source: https://www.blakearchive.org/work/onhomer.

- [ ] **Step 3.3.2: The Ghost of Abel — 2 plates.** Copy A (LoC). Source: https://www.blakearchive.org/work/ghst.

- [ ] **Step 3.3.3: Laocoön — 1 plate.** Copy B (Fitzwilliam). Source: https://www.blakearchive.org/work/laoc.

- [ ] **Step 3.3.4: For each, write `<work>.md`** with frontmatter (`cover`, `description`, `series: true`, `weight`, `uid`, `source`) and a one-paragraph first-person description.

- [ ] **Step 3.3.5: Commit:** `git add tracts/ && git commit -m "blake: add late tracts (On Homer/Virgil, Ghost of Abel, Laocoön)"`

#### 3.4: Descriptive Catalogue (full text)

**File:** `tracts/descriptive-catalogue.md` — single Markdown page, not a folder.

Source text: Erdman, *Complete Poetry and Prose*, pp. 528–550. Cross-check with Blake Archive: https://www.blakearchive.org/work/bb209.

- [ ] **Step 3.4.1: Transcribe the full Descriptive Catalogue (1809).** Include "Number I" through "Number XVI" with their commentary. Light first-person framing in YAML:

```markdown
---
title: A Descriptive Catalogue
description: Catalogue of my exhibition at No. 28, Broad Street, May 1809.
date: 1809-05-15
weight: 4
uid: blk-desccat
source: Erdman, Complete Poetry and Prose (1988), pp. 528–550; Blake Archive bb209
---

[Full text follows. Open with the Preface: "The eye that can prefer the Colouring of Titian and Rubens to that of Michael Angelo and Rafael, ought to be modest..."]
```

The full text is ~12,000 words. Keep it as one page (long-form is fine; moss handles long markdown).

- [ ] **Step 3.4.2: Commit.**

- [ ] **Step 3.5: Phase 3 build & verify.** Run moss preview. Confirm Milton renders with preface. Confirm Jerusalem renders all 100 plates. Tracts section populated.

---

### Phase 4: Galleries (engraved/painted series)

**Goal:** Build out the Gallery section with Blake's public visual series.

#### 4.1: Illustrations of the Book of Job (21 plates)

**Source:** British Museum Linnell proofs. Source: https://www.blakearchive.org/work/bb421 or BM collection online.

- [ ] **Step 4.1.1: Download 21 engravings + title plate (22 total).** Save `gallery/job/00-title.jpg`, `01-job-and-his-family.jpg`, ... through `21-job-and-his-daughters.jpg`.

- [ ] **Step 4.1.2: Write `job.md`** with first-person description: "Twenty-one engravings of the Book of Job, undertaken for Mr. Linnell, my friend and patron in my later years. Published by subscription, 1826."

- [ ] **Step 4.1.3: Commit.**

#### 4.2: Large Color Prints (12 prints)

**Source:** Tate Britain + Metropolitan + various. Each print exists in 1–3 impressions; show the best-known.

Subjects (12):
1. Newton (Tate)
2. Nebuchadnezzar (Tate)
3. Pity (Tate)
4. Hecate / The Night of Enitharmon's Joy (Tate)
5. Elohim Creating Adam (Tate)
6. Satan Exulting over Eve (Getty)
7. God Judging Adam (Tate, formerly mis-titled Elijah)
8. Lamech and His Two Wives (Tate)
9. Naomi entreating Ruth and Orpah (V&A)
10. Christ Appearing to the Apostles (NGA Washington)
11. The House of Death (Tate)
12. The Good and Evil Angels (Tate)

- [ ] **Step 4.2.1: Download 12 prints** to `gallery/large-color-prints/`.

- [ ] **Step 4.2.2: Write index `large-color-prints.md`** + brief caption MDs per print if desired (or single page with grid).

- [ ] **Step 4.2.3: Commit.**

#### 4.3: Blair's Grave designs (12 plates)

**Source:** First edition 1808. Schiavonetti engraved from Blake's designs.

- [ ] **Step 4.3.1: Download 12 plates** to `gallery/grave/`.

- [ ] **Step 4.3.2: Write `grave.md`.** Be explicit about the dispute — these are Blake's *designs* engraved by Schiavonetti at Cromek's direction; this was a sore point.

- [ ] **Step 4.3.3: Commit.**

#### 4.4: Dante engravings (7 plates)

**Source:** Published posthumously 1838 by Linnell, from Blake's plates in progress at death.

- [ ] **Step 4.4.1: Download 7 engravings** to `gallery/dante/`. Optionally include 5–10 watercolor designs from the unfinished 102.

- [ ] **Step 4.4.2: Write `dante.md`.**

- [ ] **Step 4.4.3: Commit.**

#### 4.5: Night Thoughts (43 engravings)

**Source:** First edition 1797 (Edwards), the 43 engravings published.

- [ ] **Step 4.5.1: Download 43 plates** to `gallery/night-thoughts/`.

- [ ] **Step 4.5.2: Write `night-thoughts.md`.** Note: of 537 watercolors only 43 were engraved — only the engraved ones go here.

- [ ] **Step 4.5.3: Commit.**

#### 4.6: 1809 Exhibition paintings (curated)

**Goal:** Cross-reference *A Descriptive Catalogue* — show the actual paintings Blake exhibited. Many are lost; show what survives.

Surviving / known (about 9 of 16):
- *The Spiritual Form of Nelson Guiding Leviathan* (Tate)
- *The Spiritual Form of Pitt Guiding Behemoth* (Tate)
- *Sir Jeffery Chaucer and the nine and twenty Pilgrims on their journey to Canterbury* (Pollok House, Glasgow)
- *The Bard, from Gray* (Tate)
- *The Ancient Britons* (lost; no image)
- *Satan calling up his Legions* (Victoria & Albert)
- *The Goats* (lost)
- *The Spiritual Preceptor* (lost)
- *Jacob's Dream* (BM)

- [ ] **Step 4.6.1: Download surviving paintings** to `gallery/exhibition-1809/`.

- [ ] **Step 4.6.2: Write index** with reference back to `tracts/descriptive-catalogue.md`.

- [ ] **Step 4.6.3: Commit.**

#### 4.7: Visionary Heads (10–15 selected)

**Source:** Sketches drawn during Varley's sessions, 1819–25. Held variously by Tate, BM, Yale, private.

Notable ones: William Wallace; King Edward I; The Man Who Built the Pyramids; The Ghost of a Flea (the most famous — Tate); The Spirit of Voltaire.

- [ ] **Step 4.7.1: Download 10–15 sheets** to `gallery/visionary-heads/`.

- [ ] **Step 4.7.2: Write `visionary-heads.md`.**

- [ ] **Step 4.7.3: Commit.**

- [ ] **Step 4.8: Phase 4 build & verify.** Gallery section should now have 6 sub-galleries.

---

### Phase 5: Drafts section

**Goal:** Add the works Blake prepared but did not engrave or print himself.

#### 5.1: Poetical Sketches (1783)

**File:** `drafts/poetical-sketches/poetical-sketches.md` — single long page with all poems, or one MD per poem.

Source text: Erdman, *Complete Poetry and Prose*, pp. 408–451. Public domain. Includes: To Spring, To Summer, To Autumn, To Winter, To the Evening Star, To Morning, Fair Elenor, Song ("How sweet I roam'd"), Song ("My silks and fine array"), Song ("Love and harmony combine"), Mad Song, To the Muses, Gwin King of Norway, An Imitation of Spenser, Blind Man's Buff, King Edward the Third (verse drama, partial), Prologue to King John, A War Song to Englishmen, The Couch of Death, Contemplation, Samson.

- [ ] **Step 5.1.1: Transcribe Poetical Sketches** as `drafts/poetical-sketches/poetical-sketches.md`. Optionally split each poem to a sub-file.

- [ ] **Step 5.1.2: Write framing MD.** First-person: "My first volume, printed in letterpress by my friends in 1783. They have generosity to print them, and I never have to put them in the world. I never published it; copies I had were given to acquaintances."

- [ ] **Step 5.1.3: Commit.**

#### 5.2: Tiriel (c. 1789)

**Source text:** Erdman, pp. 276–285. **Images:** 12 wash drawings, Victoria & Albert Museum and elsewhere. Source: https://www.blakearchive.org/work/bb126.

- [ ] **Step 5.2.1: Download 12 wash drawings** to `drafts/tiriel/`.

- [ ] **Step 5.2.2: Transcribe text** as `drafts/tiriel/tiriel-text.md` (or split into sections).

- [ ] **Step 5.2.3: Write `tiriel.md` index.**

- [ ] **Step 5.2.4: Commit.**

#### 5.3: The French Revolution (1791) — Book I

**Source text:** Erdman, pp. 286–296. No images — typeset but unpublished, no engraved plates.

- [ ] **Step 5.3.1: Transcribe text** as `drafts/french-revolution/french-revolution.md`.

- [ ] **Step 5.3.2: Write framing:** "Set in type at Mr. Johnson's, Saint Paul's Churchyard, 1791. The first of seven books — the rest never written. Joseph Johnson, fearing the times, did not put it forth. The proof sheet survives."

- [ ] **Step 5.3.3: Commit.**

#### 5.4: The Pickering Manuscript

**Source text:** Erdman, pp. 481–492. No images — manuscript only.

Contains: The Smile, The Golden Net, The Mental Traveller, The Land of Dreams, Mary, The Crystal Cabinet, The Grey Monk, Auguries of Innocence, Long John Brown & Little Mary Bell, William Bond.

- [ ] **Step 5.4.1: Transcribe each poem** as its own file under `drafts/pickering-manuscript/`. "Auguries of Innocence" deserves its own page given its fame.

- [ ] **Step 5.4.2: Write `pickering-manuscript.md` index.**

- [ ] **Step 5.4.3: Commit.**

#### 5.5: Notebook (Rossetti MS) — selections

**Goal:** Curated extracts, not the whole notebook. Include the two substantial prose pieces and the strongest standalone short pieces.

Required inclusions:
- *A Vision of the Last Judgment* (Erdman pp. 554–566) — the prose meditation
- *Public Address* (Erdman pp. 571–582) — Blake on Cromek/Stothard, on the connoisseur public
- Selected epigrams (e.g., "Mock on, Mock on Voltaire Rousseau"; "I asked a thief"; epigrams on Hayley; "When Klopstock England defied")
- The "Everlasting Gospel" (Erdman pp. 519–525) — late long verse fragment

- [ ] **Step 5.5.1: Transcribe each piece** as its own MD file under `drafts/notebook/`.

- [ ] **Step 5.5.2: Write `notebook.md` index** explaining provenance and curatorial choice.

- [ ] **Step 5.5.3: Commit.**

- [ ] **Step 5.6: Phase 5 build & verify.**

---

### Phase 6: Journal — biographical entries to fill the arc

**Goal:** Round out the first-person biographical journal so the timeline is coherent from birth (1757) to death (1827).

Existing entries (keep — but verify dates and uids stay distinct from new entries):
- Apprenticeship (1772) — keep
- Marriage to Catherine (1782) — keep
- The Method (1788) — keep
- Lavater (1789) — **MIGRATE to drafts/notebook or REMOVE** (user excluded annotations; if user keeps these as journal context, leave; otherwise remove). **Decision:** remove from journal (annotations were excluded per user).
- The Bastille (1789) — keep
- Swedenborg (1790) — **REMOVE** (annotation)
- Reveley letter (1791) — **MOVE** to `letters/`
- I Shan't Live Five Years (1793) — keep
- Notebook poems (1793) — **REMOVE** (superseded by `drafts/notebook/`)
- Prospectus (1793) — keep (this IS a Blake publication)
- Trusler letter (1799) — **MOVE** to `letters/`
- Butts letter 1802 — **MOVE** to `letters/`
- Reynolds (1808) — **REMOVE** (annotation)
- The Exhibition / Descriptive Catalogue (1809) — keep as personal journal entry; the *full text* lives in `tracts/descriptive-catalogue.md`

New entries to add:

- [ ] **Step 6.1: Early life and visions (c. 1757–1772)**

Create `journal/early-years.md` (date: 1757-11-28 or aggregate to 1765):
```markdown
---
title: Visions in a Tree
uid: j1765a020
date: 1765-06-15
description: At Peckham Rye, age eight, I saw a tree filled with angels.
---

I was born at 28 Broad Street, Golden Square, the third of seven, on the twenty-eighth of November in the year fifty-seven. My father was a hosier...
[Include: the tree of angels at Peckham Rye; Pars's drawing school at age ten; visions of Ezekiel under a tree in the fields.]
```

- [ ] **Step 6.2: Robert (1787)**

Create `journal/robert.md`:
```markdown
---
title: Robert
uid: j1787a021
date: 1787-02-11
description: My brother Robert died in my arms.
---

He was twenty-four. I sat by him fourteen days and nights without sleep. At the moment he expired, I saw his soul ascend through the ceiling clapping its hands for joy.

Later he came to me in a vision and shewed me the method of printing — which we now use to make the Songs.
```
(Provides the prelude to the existing `the-method.md`.)

- [ ] **Step 6.3: Lambeth (1790)**

Create `journal/lambeth.md` — move to Hercules Buildings.

- [ ] **Step 6.4: Felpham (1800)**

Create `journal/felpham.md` — the move under Hayley's invitation.

- [ ] **Step 6.5: The Soldier (1803)**

Create `journal/the-soldier.md`:
```markdown
---
title: The Soldier in the Garden
uid: j1803a025
date: 1803-08-12
description: Scofield the soldier came drunk into my garden at Felpham.
---

The man would not depart at my asking, so I took him by the elbows and put him from the garden. He swore I had cursed the King, that I had said "Damn the King and his Soldiers, they are all slaves." Which I did not say, nor would have said even when alone with Catherine.

Sedition is a hanging matter. I am to be tried at Chichester. Hayley says he will speak for me. Catherine is silent.
```

- [ ] **Step 6.6: Return to London (1803)**

Create `journal/south-molton-street.md` — return from Felpham.

- [ ] **Step 6.7: Acquittal (1804)**

Create `journal/acquittal.md`:
```markdown
---
title: The Verdict
uid: j1804a027
date: 1804-01-11
description: Acquitted at Chichester.
---

The jury, after some little debate, returned the verdict — Not Guilty. The court was much delighted, and I shook hands with Hayley in the open street.
```

- [ ] **Step 6.8: The Truchsessian Gallery (1804)**

Create `journal/truchsess.md` — the revelation of October 1804: "I was again enlightened with the light I enjoyed in my youth."

- [ ] **Step 6.9: The Cromek dispute (1805–1808)**

Create `journal/cromek.md` — Blair's *Grave* designs and the betrayal.

- [ ] **Step 6.10: The 1809 exhibition** — already covered by existing `the-exhibition.md`. Verify it doesn't need expansion.

- [ ] **Step 6.11: The wilderness years (1810–1818)**

Create `journal/silence.md` — the years of poverty and obscurity.

- [ ] **Step 6.12: Linnell (1818)**

Create `journal/linnell.md` — discovery by Linnell; subsequent commissions for Job and Dante.

- [ ] **Step 6.13: The Ancients (1820s)**

Create `journal/the-ancients.md` — Samuel Palmer, Edward Calvert, George Richmond gathering at Fountain Court.

- [ ] **Step 6.14: Last days (1827)**

Create `journal/last-days.md`:
```markdown
---
title: Last Days
uid: j1827a035
date: 1827-08-12
description: At No. 3 Fountain Court, Strand.
---

I am very weak, but my mind is at peace. I have been very near the Gates of Death, but I am returned a little. To-day I have sketched my Catherine, sitting by my bedside, more beautiful than when I first saw her at twenty-two.

The Imagination liveth for ever.

[I died on the evening of August twelve, 1827. Catherine said I sang hymns and verses of my own composing. Tatham bought my plates.]
```

- [ ] **Step 6.15: Remove migrated/excluded entries**

```bash
cd "/Users/guoliu/repos/Symbiosis-Lab/moss-releases/recordings/William Blake"
# Move letters to letters/
git mv journal/to-reveley.md letters/1791-10-18-to-reveley.md
git mv journal/to-trusler.md letters/1799-08-23-to-trusler.md
git mv journal/to-butts-1802.md letters/1802-11-22-to-butts.md
# Remove annotations (user's decision)
git rm journal/on-lavater.md journal/on-reynolds.md journal/on-swedenborg.md
# Notebook poems superseded by drafts/notebook/
git rm journal/notebook-poems.md
```

- [ ] **Step 6.16: Build & verify.** Walk the journal in date order; confirm no gaps > 5 years; confirm voice is consistent.

- [ ] **Step 6.17: Commit.**

---

### Phase 7: Letters archive

**Goal:** Establish a chronological letters section with ~30 substantive letters. Existing 3 moved from journal; 27 new.

**File naming convention:** `YYYY-MM-DD-to-<recipient>.md` (sortable, parseable).

Required letters (final list — these are the ones to include):

| Date | Recipient | Significance |
|---|---|---|
| 1791-10-18 | Reveley | (existing) |
| 1795-12-06 | Cumberland | First surviving letter; on color-printing |
| 1799-08-16 | Trusler (first) | Opening of the manifesto pair |
| 1799-08-23 | Trusler (second) | (existing) "I see Every thing I paint…" |
| 1799-08-26 | Cumberland | Defends his obscurity |
| 1800-09-12 | Flaxman | Verse letter: "I bless thee, O Father of Heaven & Earth" |
| 1800-09-21 | Flaxman | Felpham move |
| 1800-09-23 | Butts | Arrival at Felpham |
| 1800-10-02 | Butts | Verse: "To my Friend Butts I write" |
| 1801-09-11 | Butts | "Time flies faster than the wind" |
| 1802-01-10 | Butts | Felpham domestic |
| 1802-11-22 (1) | Butts | "With happiness stretchd across the hills" — verse |
| 1802-11-22 (2) | Butts (existing) | "Now I a fourfold vision see" |
| 1803-01-30 | Butts | Pre-trial |
| 1803-04-25 | Butts | Leaving Felpham |
| 1803-07-06 | Butts | Final break planning |
| 1803-08-16 | Butts | The Scofield affair in his own words |
| 1803-10-07 | Butts | Pre-trial |
| 1804-10-23 | Hayley | The Truchsessian / "spectrous Fiend reduced" |
| 1805-12-11 | Hayley | "Money flies from me" |
| 1808-12-19 | Cumberland | On the Royal Academy refusal |
| 1818-04-12 | Dawson Turner | On unsold illuminated books |
| 1825-10-11 | Linnell | On Job/Dante progress |
| 1826-02-01 | Linnell | Illness |
| 1826-07-29 | Linnell | Continued illness |
| 1827-02-15 | Cumberland | On the prospectus for Hayley |
| 1827-04-12 | Cumberland | **THE FINAL LETTER** |
| 1827-04-25 | Linnell | "I have been very ill" |
| 1827-07-03 | Linnell | Last letter (Linnell) |

Source text: Erdman, *Complete Poetry and Prose*, pp. 681–784 (letters section); cross-check Bentley, *Blake Records* (2nd ed., 2004).

- [ ] **Step 7.1: Move the three existing letters from journal/ to letters/**

(Done in Step 6.15. Verify they have proper letters-style frontmatter — `title:`, `date:`, `description:` — and a `weight:` for chrono ordering.)

- [ ] **Step 7.2: Transcribe and add the 27 new letters**

For each, create `letters/YYYY-MM-DD-to-<recipient>.md`:

```markdown
---
title: To <Recipient>
uid: l<YYYY><MMDD>
date: YYYY-MM-DD
description: <one-line hook from the letter itself>
weight: <ordering>
recipient: <full name>
source: Erdman 1988, p. <NN>
---

<Full text of letter, in Blake's spelling, with paragraph breaks preserved.>
```

Group sub-tasks by year for commits (one commit per year):
- 7.2.1: 1795 (Cumberland) — 1 letter
- 7.2.2: 1799 (Trusler x2, Cumberland) — 3 letters
- 7.2.3: 1800 (Flaxman x2, Butts x2) — 4 letters
- 7.2.4: 1801 (Butts) — 1 letter
- 7.2.5: 1802 (Butts x3) — 3 letters
- 7.2.6: 1803 (Butts x5) — 5 letters
- 7.2.7: 1804 (Hayley) — 1 letter
- 7.2.8: 1805 (Hayley) — 1 letter
- 7.2.9: 1808 (Cumberland) — 1 letter
- 7.2.10: 1818 (Dawson Turner) — 1 letter
- 7.2.11: 1825–26 (Linnell x3) — 3 letters
- 7.2.12: 1827 (Cumberland x2, Linnell x2) — 4 letters

- [ ] **Step 7.3: Update `letters/letters.md` index**

```markdown
---
description: Correspondence, 1791–1827. Thirty letters of about eighty that survive.
children_style: list
weight: 5
uid: blk-letters
---

Of letters I wrote many, and most have not survived. Of those that have, I print here the ones that say something — the verse-epistles to Mr Butts, the manifesto to Dr Trusler, the last letter to Cumberland four months before I died.
```

- [ ] **Step 7.4: Build & verify**

Confirm letters render in chronological order. Confirm the 1827-04-12 Cumberland letter is present and reads correctly. Confirm verse-letters render with line breaks preserved.

- [ ] **Step 7.5: Commit:** `git commit -m "blake: add letters archive (~30 letters, 1791-1827)"`

---

## Final Verification (cross-phase)

- [ ] **V.1: Top-level structure check**

```bash
cd "/Users/guoliu/repos/Symbiosis-Lab/moss-releases/recordings/William Blake"
ls -1 | grep -v '^\.'
```
Expected output:
```
William Blake.md
books
drafts
gallery
journal
letters
tracts
```

- [ ] **V.2: Plate count audit**

```bash
for d in books/*/; do
  count=$(ls "$d"*.jpg 2>/dev/null | wc -l | tr -d ' ')
  echo "$count	$d"
done | sort -n
```
Expected counts (approximate):
- all-religions-are-one: 10
- no-natural-religion: 20 (10+10)
- innocence: 27
- songs-of-experience: 26
- the-book-of-thel: 8
- the-marriage-of-heaven-and-hell: 27
- visions: 11
- america: 18
- europe: 18
- urizen: 28
- ahania: 6
- book-of-los: 5
- song-of-los: 8
- milton: 50
- jerusalem: 100
- gates-of-paradise: 18
Total: ~380 illuminated plates.

- [ ] **V.3: Resolution audit**

Every plate must be ≥ 2000px short edge. Re-run the audit from Step 0.1 over the new books; fail loudly if any plate falls below.

- [ ] **V.4: Erdman text check**

For each transcribed prose piece (Descriptive Catalogue, Poetical Sketches, Tiriel, French Revolution, Pickering MS, Notebook selections, letters), diff a sample paragraph against Erdman. Acceptable variance: spelling differences from manuscript vs. print states, line break decisions. Flag substantive omissions or interpolations.

- [ ] **V.5: License attribution check**

Confirm every image folder has a `source:` field in its `.md`. Confirm site-wide attribution to the Blake Archive appears in a credits footer or page. The Blake Archive CC BY-NC-SA 3.0 license requires:
1. Attribution
2. Non-commercial use
3. Share-alike

- [ ] **V.6: First-person voice consistency**

Read every new index `.md` aloud. Reject any phrase that:
- Refers to Blake in third person ("Blake's book of…")
- Uses 21st-century vocabulary ("amazing," "iconic")
- Performs analysis from outside the persona

- [ ] **V.7: Full moss build**

```bash
cd ~/repos/Symbiosis-Lab/moss
./scripts/moss-test.sh "../moss-releases/recordings/William Blake"
```

Walk every page. Confirm no broken links, no missing covers, no rendering glitches.

- [ ] **V.8: Final commit and tag**

```bash
cd /Users/guoliu/repos/Symbiosis-Lab/moss-releases
git commit -m "blake: complete the William Blake recording"
git tag blake-complete-2026-05-13
```

---

## Estimated Effort

Rough — depends heavily on whether plate images can be batch-downloaded from Blake Archive (their IIIF allows this) or must be saved one-by-one.

- Phase 0 (foundation + Marriage upgrade): 2–4 hours
- Phase 1 (Songs of Experience): 2 hours
- Phase 2 (early tracts + Lambeth books, 7 works, ~95 plates): 8–12 hours
- Phase 3 (Milton + Jerusalem + tracts + Descriptive Catalogue): 12–20 hours (Jerusalem alone is 100 plates)
- Phase 4 (galleries): 8–12 hours
- Phase 5 (drafts): 8–12 hours (lots of transcription)
- Phase 6 (journal biographical): 4–6 hours
- Phase 7 (letters): 6–10 hours

**Total: ~50–80 hours of focused work.** Realistic done-by date depends on cadence.

---

## Out of Scope (explicit, so reviewers know what was deliberately left out)

- Annotations / marginalia (Lavater, Reynolds, Swedenborg, Bacon, Berkeley, Wordsworth, Thornton, Watson, etc.) — user excluded
- *Vala / The Four Zoas* manuscript — abandoned by Blake, cannibalized into Milton/Jerusalem
- *An Island in the Moon* — private satire
- Trial documents (Scofield depositions) — forensic
- Transactional letters (errands, money) — dilute the persona
- Commission watercolors not engraved (Night Thoughts watercolors beyond 43; Paradise Lost Butts/Thomas sets; Pilgrim's Progress; Gray; Milton minor series; Visions of Last Judgment watercolors) — kept private to patron
- Blake's own copy of his books with later annotations — secondary
