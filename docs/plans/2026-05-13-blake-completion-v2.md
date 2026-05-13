# William Blake Completion Plan — v2 (post-review)

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use `- [ ]` syntax for tracking.

**Goal:** Complete the "William Blake" recording at `moss-releases/recordings/William Blake/` so a reader gets a coherent, comprehensive view of Blake — works he published, voice he wrote in, life he led, refusals he made, and the workshop he ran with Catherine.

**Scope rule:** Include what Blake himself made public — printed, engraved, exhibited, distributed, sold — plus what is particularly *legible and valuable* to a modern reader. Include letters for biographical coherence. Include the Reynolds marginalia (restored after Blake's own objection: "They are not private. They are the most ferocious Public Address I ever wrote"). Exclude the rest of the marginalia (Lavater, Swedenborg, Wordsworth — kept as Blake's call).

**Architecture:** moss SSG static site. Each work is a folder of plate JPEGs plus a `.md` index with YAML front matter (`cover`, `description`, `children_style`, `series`, `weight`, `uid`, `source`, `transcript`, `related`). New top-level sections under `William Blake/`.

---

## Changelog vs. v1 (2026-05-13)

Five reviewers — Blake scholar, museum curator, period historian, web designer, Blake himself — reviewed v1. The plan has been substantially revised:

**Structural (Blake + Designer + Curator):**
- **Songs unified.** *Innocence* and *Experience* are one Book bound in two — house them as `books/songs/` with `innocence/` and `experience/` subfolders. Use **Copy Z (LoC Rosenwald)** for both halves — late, fully coloured, single binding. Drop the split Yale-F / BM-B sourcing of v1. (Blake's strongest objection; Scholar concurs on Copy Z.)
- **Jerusalem in four chapters of 25.** Plates 1, 26, 51, 76 are the chapter Addresses (To the Public / Jews / Deists / Christians) — Blake's own structure. One 100-tile grid was unanimous reject.
- **Descriptive Catalogue + 1809 Exhibition + journal entry must bind.** One event in three places in v1. v2: Catalogue heads the 1809 Exhibition gallery, surviving paintings follow under their Catalogue numbers, journal entry backlinks.
- **Five top-level sections, voice-first ordering:** Journal (1), Letters (2), Books (3), Gallery (4), Other Writings (5). Late tracts (*On Homer*, *Ghost of Abel*, *Laocoön*) fold into Books by date.
- **Workshop sub-section inside Journal** — Catherine's labour made visible. Press, copper, registration, binding. Blake: "Half the copies of the *Songs* that go out under my name were tinted by her hand."
- **Refusals gallery** ("Things I Would Not Do") — small page in Gallery on what Blake refused: Cromek/Stothard, Hayley's polite watercolours, the Royal Academy's terms.
- ***Poetical Sketches* leaves Drafts** — it is a letterpress-printed volume; placed as **Books → Early Printed** at weight 0.
- ***Four Zoas* selections restored.** Blake reversed the exclusion: Night the First and Night the Ninth go in Other Writings as "From the Vala manuscript."

**Voice / fact corrections (Historian + Scholar + Blake):**
- **Robert was 19, not 24** at death (Bentley *Blake Records* p. 32–34).
- **Samuel Rose** defended Blake at Chichester (Jan 1804), not Hayley. Rose was ill during the trial and died not long after.
- **Tatham did NOT buy Blake's plates** — he inherited the residue from Catherine after her 1831 death and notoriously burned manuscripts under Irvingite influence. Remove from *Last Days*.
- **"Sedition is a hanging matter" — wrong.** Sedition was transportable/misdemeanour, not capital. Replace with "They speak of transportation."
- **Method vision date** — c. June 1788 per Bentley, so "twelve months past" is wrong; use "more than a year now since he was taken."
- **Truchsess revelation** quoted verbatim from Blake's 23 Oct 1804 letter to Hayley: *"I was again enlightened with the light I enjoyed in my youth, and which has for exactly twenty years been closed from me as by a door and by window-shutters."*
- **Wainewright did not own *Jerusalem* Copy E** — drop from sample text; Copy E passed via Tatham → Linnell → American collectors → Mellon → Yale.
- **Pickering MS reworded** — not "intended to engrave" (unsupported); it is a fair-copy presentation manuscript c. 1807, probably for B. H. Malkin.
- **Voice register** — needs ampersands, capitalized abstracts (Imagination, Genius, Vision, Energy), period spellings (`shew`, `chuse`, `tho'`, `thro'`, `compleat`), active verbs. Sample rewrites embedded in Phase 6.

**Sourcing / technical (Curator + Designer):**
- **Route imagery through LoC IIIF + Yale IIIF + NYPL IIIF, not Blake Archive's "Enlargement" view** (which caps ~2000px and below resolution target).
- **2500px short-edge minimum** (raised from 2000) — text legibility on the etched plates demands it.
- **Tate is not openly licensed** for any Blake holding. For Tate-held works (most Large Color Prints, *Spiritual Form of Nelson/Pitt*, *The Bard*, *Ghost of a Flea*), source from Wikimedia Commons (works are PD, Blake d. 1827) with provenance documented per file.
- **License declaration:** site declares CC BY-NC-SA 4.0 (legal up-conversion from BM's 4.0 and Blake Archive's 3.0 per CC § 4b). NC clause: no ads, no affiliate, no paid tiers anywhere.
- **Per-plate transcription** ("the single biggest missing feature" — Designer). Each plate `.md` (or paired transcript file) carries plate text alongside image. Half-coverage at launch beats zero.
- **Series navigation** (prev/next) verified in Phase 0 before authoring Milton/Jerusalem.
- **Mobile responsive images** — moss must generate `srcset`; verify in Phase 0.

**New content (Scholar + Curator + Blake):**
- *Joseph of Arimathea Among the Rocks of Albion* (1773, reworked c. 1810) — Blake's earliest signed engraving, reissued late. Gallery → Engravings.
- *Chaucer's Canterbury Pilgrims* engraving (1810) — Blake's largest self-published intaglio plate, the centre of the Stothard quarrel. Gallery.
- *Stedman's Narrative of a Five Years' Expedition* (1796) — 16 abolitionist engravings, publicly issued. Gallery → Commercial Engravings (curated selection).
- *Hesiod after Flaxman* (1817) — 37 plates engraved by Blake, published Longman. Gallery → Commercial.
- *Hayley's Designs to a Series of Ballads* (1802) + *Life of Romney* (1809) — Gallery → Commercial.
- *Temperas* sub-gallery (~12 works): the Heads of the Poets (Manchester), *Bathsheba* (Tate), *Adam Naming the Beasts* + *Eve Naming the Birds* (Glasgow), *Christ in the Sepulchre* (V&A), *Spiritual Form of Pitt* and *Nelson* (Tate, via Wikimedia).
- **1809 Exhibition expanded** — add *The Penance of Jane Shore*, *The Whore of Babylon* (BM), Heads of the Poets temperas, *Satan in his Original Glory* (Tate). *The Ancient Britons* known from 1894 Carfax photograph — include with that caveat.
- *Annotations on Reynolds* restored in Other Writings → Notes (Blake's request, named "Notes in Other Men's Books" — single entry, not the full marginalia category).
- *Vala / The Four Zoas* — Nights I + IX in Other Writings as "From the Vala manuscript."

**New features (Designer):**
- **Chronology timeline view** (1757–1827) interleaving Journal, Letters, Books, Gallery dated entries.
- **Index of First Lines** for the lyric poetry.
- **Map of London locations** — Broad Street, Hercules Buildings, South Molton Street, Fountain Court, Felpham, Bunhill Fields. Five pins.
- **Featured-work homepage** — first-person paragraph + one featured work (rotating or fixed).
- **Cross-references** — Innocence ↔ Experience pairs ("Holy Thursday" both states), prophecy triplet (*Urizen*/*Ahania*/*Book of Los*), Catalogue ↔ Exhibition paintings, Journal ↔ Letters by year. Implemented as `related:` YAML rendered as footer.

**Phase reorder:**
- Phase 0 expanded to include a **platform spike**: verify series navigation, zoom view, per-plate transcription rendering, and mobile responsive images on the existing 27-plate *Innocence* before authoring 380 more plates.
- ***Jerusalem* moves from Phase 3 to Phase 8** — only after platform questions are answered.

**Estimate revised:** v1 said 50–80 hours. Blake said: "I laboured sixteen years on *Jerusalem*. Take longer than your estimate." v2 estimate: **80–120 hours**, with the understanding that transcription work is unbounded.

---

## Inclusion / Exclusion Reference (revised)

| Category | Decision | Source |
|---|---|---|
| 17 illuminated books | **Include** in `books/` | All |
| *Songs of Innocence and of Experience* as ONE work | **Unify** under `books/songs/` | Blake |
| Late tracts (*On Homer/Virgil*, *Ghost of Abel*, *Laocoön*) | **Include** in `books/` by date | Curator/Blake |
| *Poetical Sketches* (1783, letterpress) | **Include** in `books/` as Early Printed | Blake |
| *Descriptive Catalogue* (1809) full text | **Include**; binds with 1809 Exhibition gallery | Blake |
| *Job* engravings (1826) | **Include** in `gallery/engravings/job/` | All |
| *Blair's Grave* designs (1808) | **Include** in `gallery/engravings/grave/` | All |
| Large Color Prints (1795) | **Include** in `gallery/color-prints/` | All |
| Dante engravings (7) + selected watercolours | **Include** in `gallery/engravings/dante/` | All |
| Night Thoughts (43 published engravings only) | **Include** in `gallery/engravings/night-thoughts/` | All |
| *Joseph of Arimathea* engraving (1773/c.1810) | **Include** — earliest signed plate | Scholar/Curator |
| *Canterbury Pilgrims* engraving (1810) | **Include** — major omission in v1 | Scholar/Curator |
| Stedman's *Surinam* (1796, abolitionist) | **Include** in `gallery/commercial/stedman/` | Scholar/Curator |
| Hesiod after Flaxman (1817, 37 plates) | **Include** in `gallery/commercial/hesiod/` | Scholar |
| Hayley's *Ballads* (1802) + *Romney* (1809) | **Include** in `gallery/commercial/` | Scholar |
| 1809 Exhibition paintings — expanded list (12+) | **Include** in `gallery/exhibition-1809/` | All |
| Visionary Heads (curated 12–15) | **Include** in `gallery/visionary-heads/` | All |
| Temperas (~12) | **Include** in `gallery/temperas/` | Curator |
| Refusals — "Things I Would Not Do" | **Include** — a single page | Blake |
| Poetical Sketches in Books, not Drafts | **Promote** | Blake |
| *Tiriel* (text + 12 wash drawings) | **Include** in `other-writings/tiriel/` | All |
| *French Revolution* Book I (1791 proof) | **Include** in `other-writings/french-revolution/` | All |
| *Pickering MS* | **Include** in `other-writings/pickering/` — reworded as "fair-copy presentation manuscript c. 1807" | Scholar |
| *Notebook* selections (*Public Address*, *Vision of Last Judgment*, *Everlasting Gospel*, key epigrams) | **Include** in `other-writings/notebook/` | All |
| ***Vala / Four Zoas* — Nights I & IX*** | **Include** in `other-writings/vala/` | Blake (reversed v1) |
| *Annotations on Reynolds* | **Include** in `other-writings/notes-in-other-mens-books/` | Blake (reversed v1) |
| ~30 substantive letters | **Include** in `letters/` | All |
| Catherine / Workshop sub-folder | **Include** in `journal/workshop/` | Blake |
| *An Island in the Moon* | **Exclude** | All |
| Trial depositions | **Exclude** (but make the 16 Aug 1803 Butts letter prominent) | All |
| Other annotations (Lavater, Swedenborg, Wordsworth, Bacon, Berkeley, Watson, Boyd, Thornton, Spurzheim) | **Exclude** | User |
| Transactional letters | **Exclude** | All |
| Night Thoughts watercolours beyond the 43 engraved | **Exclude** | Curator |

---

## Sourcing Standards (rewritten)

**Image sources, in order of preference:**

| Institution | Endpoint | Resolution | License | Use for |
|---|---|---|---|---|
| **LoC (Rosenwald Collection)** | `https://tile.loc.gov/image-services/iiif/<ark>/full/full/0/default.jpg` | 4000–6000 px | Public domain | *Songs* Z, *America* E, *Europe* E, *Urizen* G, *Thel* F, *Visions* G, *Ahania* A, *Milton* D (alternative), *Ghost of Abel*, *On Homer/Virgil*, *Night Thoughts* 1797 |
| **Yale (YCBA)** | `https://collections.britishart.yale.edu/iiif/2/<id>/full/full/0/default.jpg` | ~4000 px JPEG, TIFF on request | Open Access | ***Jerusalem* Copy E** (only fully colored), *Tiriel* drawings (2 of 12) |
| **NYPL (Berg)** | NYPL IIIF | ~3500 px | Public domain | ***Milton* Copy C** (preferred — has preface) |
| **Blake Archive** | object-by-object download | ~2000 px (below target) | CC BY-NC-SA 3.0 | Fallback only; or for objects unique to the Archive's coverage |
| **British Museum** | bm.uk Collection Online | ~2500 px (higher by request) | CC BY-NC-SA 4.0 | *Book of Los* A, *Song of Los* A, Job (Linnell proofs), *Canterbury Pilgrims* engraving, *Joseph of Arimathea*, Stedman impressions |
| **Morgan Library** | CORSAIR | ~2000 px max | NC, request for higher res | *Marriage* Copy F (only ~2400 px available) — switch to **LoC Copy C at 4000+ px** as primary, Morgan F as colour reference |
| **Fitzwilliam** | Fitzwilliam Museum Images | ~3000 px | CC BY-NC 4.0 | *Laocoön* Copy B |
| **Tate Britain** | **NOT a usable source** — terms forbid reuse | n/a | Not openly licensed | Use Wikimedia Commons mirrors of Tate-held works (PD Blake) instead, with provenance documented |
| **Wikimedia Commons** | commons.wikimedia.org | varies, often 3000+ px | PD or CC | Tate-locked works: Large Color Prints, *Spiritual Form of Pitt/Nelson*, *The Bard*, *Ghost of a Flea*, *Newton*, *Nebuchadnezzar*, *Pity*, *Hecate* |
| **Manchester City Galleries** | mcag.org | varies | Check per item | Heads of the Poets temperas |
| **Glasgow Museums / Pollok House** | request | low resolution online | Not openly licensed | Show *Canterbury Pilgrims* engraving instead of Pollok tempera |
| **NGA Washington** | nga.gov | high-res, PD | Open access | *Christ Appearing to the Apostles* (large color print) |
| **Getty** | getty.edu | high-res, OA | Open Content | *Satan Exulting over Eve* |
| **Huntington** | huntington.org | varies | NC | *All Religions Are One* Copy A; *French Revolution* proof |
| **V&A** | vam.ac.uk | ~2500 px | NC, attribution | *Naomi and Ruth* color print, *Christ in the Sepulchre* tempera, *Tiriel* drawing |

**Copy selections (revised):**

| Work | Copy | Institution | Note |
|---|---|---|---|
| *All Religions Are One* | A | Huntington | Only complete |
| *No Natural Religion* a + b | composite (L for a, C for b) | Morgan + BM | Most plates present |
| ***Songs of Innocence and of Experience*** (unified) | **Z** | LoC Rosenwald | **Single binding, late, fully coloured — per Blake's instruction** |
| *Thel* | F | LoC | Crisp |
| ***Marriage of Heaven and Hell*** | **C** (primary, for resolution) + F (Morgan, for colour reference) | LoC + Morgan | **Switched from F-only — Morgan caps ~2400 px** |
| *Visions of the Daughters of Albion* | G | LoC | Sharp |
| *America* | E | LoC | Already present at 5059 px |
| *Europe* | E | LoC | Iconic Ancient of Days |
| *Urizen* | G | LoC | Fullest 28 plates |
| *Ahania* | A | LoC | Only complete |
| *Book of Los* | A | BM | Only complete; **intaglio not relief** |
| *Song of Los* | A | BM | Vivid |
| *Milton* | C | NYPL | Has preface; primary. Copy D (LoC) high-res fallback if preface plate available there. |
| ***Jerusalem* — four chapter folders** | E | YCBA | Only fully coloured; 25 plates per chapter |
| *Gates of Paradise* (*For the Sexes*) | D | BM | Late state |
| *On Homer / On Virgil* | B | LoC | Clear |
| *Ghost of Abel* | A | LoC | Only complete |
| *Laocoön* | B | Fitzwilliam | Sharpest text |

**Text source:** Erdman, *The Complete Poetry and Prose of William Blake* (Anchor, rev. 1988). When the printed plate differs from Erdman's reading text, prefer Blake Archive's plate-by-plate transcription for plate captions and Erdman for prose tracts. Cite edition in YAML `source:`.

---

## File Layout (revised end-state)

```
recordings/William Blake/
├── William Blake.md                          [updated — featured-work selector]
│
├── journal/                                  [weight 1 — voice first]
│   ├── journal.md
│   ├── workshop/                             [NEW — Catherine, method, press]
│   │   ├── workshop.md
│   │   ├── catherine.md                      [her hand in the colouring]
│   │   ├── the-method.md                     [moved from parent — Robert's vision of relief etching]
│   │   ├── the-press.md                      [the rolling press at Hercules Buildings]
│   │   └── prospectus.md                     [moved from parent — the 1793 advertisement]
│   ├── early-years.md                        [NEW — birth, Peckham angels]
│   ├── apprenticeship.md                     [existing — verify date 1772-08-04, age 14]
│   ├── gordon-riots.md                       [NEW — 6 June 1780, Newgate]
│   ├── marriage.md                           [existing — verify mark not signature]
│   ├── robert.md                             [NEW — Feb 1787, AGE 19]
│   ├── the-bastille.md                       [existing — Bastille; flag bonnet rouge as legend]
│   ├── johnsons-circle.md                    [NEW — St Paul's Churchyard, Paine/Godwin/Fuseli/Wollstonecraft]
│   ├── lambeth.md                            [NEW — Hercules Buildings, late 1790]
│   ├── i-shant-live-five-years.md            [existing]
│   ├── felpham.md                            [NEW — invitation via Flaxman, Sept 1800]
│   ├── the-soldier.md                        [NEW — Scolfield, 60 yards to Fox Inn, 12 Aug 1803]
│   ├── south-molton-street.md                [NEW — return 1803]
│   ├── acquittal.md                          [NEW — Chichester Jan 1804, Samuel Rose defended]
│   ├── truchsess.md                          [NEW — Oct 1804, verbatim quote from Hayley letter]
│   ├── cromek.md                             [NEW — Stothard betrayal, Schiavonetti, Grave dispute]
│   ├── the-exhibition.md                     [existing — 1809; cross-link to Gallery]
│   ├── silence.md                            [NEW — wilderness years 1810–18]
│   ├── linnell.md                            [NEW — discovered 1818, Job/Dante commissions]
│   ├── the-ancients.md                       [NEW — Palmer, Calvert, Richmond at Fountain Court]
│   └── last-days.md                          [NEW — Aug 12 1827, REWRITTEN — no Tatham purchase]
│
├── letters/                                  [weight 2]
│   ├── letters.md
│   └── [30 letters, YYYY-MM-DD-to-recipient.md — Phase 7]
│
├── books/                                    [weight 3 — late tracts fold in by date]
│   ├── books.md
│   ├── poetical-sketches/                    [Early Printed, 1783 — weight 0]
│   ├── all-religions-are-one/                [c. 1788]
│   ├── no-natural-religion/                  [c. 1788, series a + b]
│   ├── songs/                                [NEW UNIFIED — Copy Z]
│   │   ├── songs.md                          [Two Contrary States — Blake's full title-plate]
│   │   ├── innocence/                        [the 31 plates as bound in Copy Z's Innocence half]
│   │   └── experience/                       [the 26 plates as bound in Copy Z's Experience half]
│   ├── the-book-of-thel/
│   ├── the-marriage-of-heaven-and-hell/      [upgrade from LoC Copy C — was 462x660]
│   ├── visions-of-the-daughters-of-albion/
│   ├── america-a-prophecy/
│   ├── europe-a-prophecy/
│   ├── the-book-of-urizen/
│   ├── the-book-of-ahania/
│   ├── the-book-of-los/
│   ├── the-song-of-los/
│   ├── milton/                               [Copy C — has preface]
│   ├── jerusalem/                            [Phase 8 — split into FOUR chapter sub-folders]
│   │   ├── jerusalem.md
│   │   ├── chapter-1-to-the-public/          [plates 1–25]
│   │   ├── chapter-2-to-the-jews/            [plates 26–50]
│   │   ├── chapter-3-to-the-deists/          [plates 51–75]
│   │   └── chapter-4-to-the-christians/      [plates 76–100]
│   ├── gates-of-paradise/                    [For the Sexes Copy D]
│   ├── on-homer-on-virgil/                   [late tract]
│   ├── the-ghost-of-abel/                    [late tract]
│   └── laocoon/                              [late tract]
│
├── gallery/                                  [weight 4]
│   ├── gallery.md
│   ├── engravings/
│   │   ├── joseph-of-arimathea/              [NEW — 1773/c. 1810]
│   │   ├── canterbury-pilgrims/              [NEW — 1810]
│   │   ├── job/                              [21 plates, presented in pairs]
│   │   ├── dante/                            [7 engravings + selected watercolours]
│   │   ├── grave/                            [12 plates, Schiavonetti after Blake — name dispute]
│   │   └── night-thoughts/                   [43 engraved plates only]
│   ├── color-prints/                         [12 — single best impression of each subject]
│   ├── temperas/                             [NEW ~12 — Heads of the Poets, Bathsheba, Adam, Eve, Christ in Sepulchre, Pitt, Nelson, etc.]
│   ├── exhibition-1809/                      [Descriptive Catalogue heads; surviving paintings by Catalogue Number]
│   │   ├── exhibition-1809.md                [Catalogue full text + paragraph index by Number]
│   │   ├── number-I-spiritual-form-of-nelson/
│   │   ├── number-II-spiritual-form-of-pitt/
│   │   ├── number-III-canterbury-pilgrims-tempera/
│   │   ├── number-IV-the-bard/
│   │   ├── number-V-ancient-britons/         [1894 Carfax photograph only]
│   │   ├── number-IX-satan-original-glory/
│   │   ├── number-X-jacobs-dream/
│   │   ├── number-XI-penance-of-jane-shore/  [NEW]
│   │   └── number-XII-whore-of-babylon/      [NEW]
│   ├── visionary-heads/                      [12–15 selected]
│   ├── commercial/                           [NEW — public engravings under others' names]
│   │   ├── stedman-surinam/                  [curated abolitionist plates]
│   │   ├── hesiod-flaxman/                   [37 plates after Flaxman]
│   │   ├── hayley-ballads/                   [1802]
│   │   └── hayley-romney/                    [1809]
│   └── refusals/                             [NEW — "Things I Would Not Do" — Blake's call]
│       └── refusals.md                       [Cromek/Stothard, Hayley's watercolours, RA terms]
│
└── other-writings/                           [weight 5 — Drafts, Notes, late prose]
    ├── other-writings.md
    ├── tiriel/                               [text + 12 wash drawings — BM 9, Yale 2, V&A 1]
    ├── french-revolution/                    [1791 proof, text only]
    ├── pickering-manuscript/                 [c. 1807 fair-copy — Auguries, Mental Traveller, Crystal Cabinet]
    ├── notebook/                             [Public Address, Vision of Last Judgment, Everlasting Gospel, epigrams]
    ├── vala/                                 [NEW — Four Zoas Night I + Night IX, framed as "From the Vala manuscript"]
    └── notes-in-other-mens-books/            [NEW — Annotations on Reynolds (Blake's restoration)]
```

**Cross-cut features:**
- `chronology.md` — site-wide timeline 1757–1827 interleaving Journal, Letters, Books, Gallery dates.
- `first-lines.md` — index of poetic first lines linking to plates.
- `map.md` — five London/Sussex pins with date ranges.

---

## Phases (revised)

### Phase 0: Foundation + Platform Spike + Marriage upgrade

**Goal:** Restructure folders. Verify the moss platform supports the reading experience the plan needs **before** authoring 380 plates.

- [ ] **0.1 Inventory existing image resolutions.** Same shell command as v1. Flag every plate < 2500 px short edge for re-sourcing.

- [ ] **0.2 Create five top-level section index files** (`journal/`, `letters/`, `books/`, `gallery/`, `other-writings/`). Weights 1–5.

- [ ] **0.3 Migrate existing illuminated books into `books/`.** Use `git mv`. Verify `ls books/` shows six folders.

- [ ] **0.4 Move existing letter and annotation files out of `journal/`:**
    - `git mv journal/to-reveley.md letters/1791-10-18-to-reveley.md`
    - `git mv journal/to-trusler.md letters/1799-08-23-to-trusler.md`
    - `git mv journal/to-butts-1802.md letters/1802-11-22-to-butts.md`
    - `git mv journal/on-reynolds.md other-writings/notes-in-other-mens-books/reynolds.md`
    - `git rm journal/on-lavater.md journal/on-swedenborg.md` (excluded by user — Reynolds restored, not these)
    - `git rm journal/notebook-poems.md` (superseded by `other-writings/notebook/`)
    - `git mv journal/the-method.md journal/workshop/the-method.md`
    - `git mv journal/prospectus.md journal/workshop/prospectus.md`

- [ ] **0.5 Platform spike — verify before scaling.** Pick the existing 27-plate *Innocence* (or post-upgrade *Marriage*) as the test bed. Confirm in `pnpm run dev` / moss preview:
    1. **Series prev/next navigation works** plate-to-plate. If moss does not provide this natively, halt the plan and add a sub-task for it.
    2. **Single-plate view at full resolution** is reachable. Document how (click? hover? separate page?).
    3. **Description from YAML renders as a visible paragraph** above the plate grid, not as `<meta>`. If hidden, move the description to the MD body and verify.
    4. **`srcset` is generated for plate JPEGs** so mobile delivery isn't a 4 MB hit per plate. If not, log a moss issue; sub-task to script the resize.
    5. **`related:` YAML pointers** render in the page footer. If unsupported, drop to inline text links.
    6. **A `transcript:` block** on the plate page can render Blake's etched text alongside the image. If moss has no facility, use a parallel `.md` sibling per plate (`16-the-tyger.jpg` + `16-the-tyger.md`).
    
    File a moss issue per unsupported feature with a workaround sub-task here. **Do not proceed to Phase 1 until each item has either a working render or a documented workaround.**

- [ ] **0.6 Upgrade *Marriage of Heaven and Hell* plates.** Switch source from Morgan Copy F (max ~2400 px) to **LoC Copy C** (4000+ px, PD). Download via IIIF endpoint. Overwrite existing `books/the-marriage-of-heaven-and-hell/*.jpg`. Update `the-marriage-of-heaven-and-hell.md` `source:` field.

- [ ] **0.7 Top-level homepage update.** Edit `William Blake.md`:
```markdown
---
description: Poet. Painter. Printer. London.
children_style: list                    # was grid — narrative on-ramp
weight_order: explicit                  # journal first
uid: 8f508658
featured: books/songs/                  # rotating editor's pick
---

I must Create a System, or be enslav'd by another Man's; I will not Reason &amp; Compare: my business is to Create.

[Start with the Journal — the voice. Or the Letters — the workshop. The Books are the cathedral, &amp; the Gallery the print-room. The rest is what I left in the drawer.]
```

- [ ] **0.8 Build & verify** the entire restructured site. Walk every section. No 404s, no broken covers.

- [ ] **0.9 Commit:** `blake: restructure (5 sections, voice-first); platform spike; Marriage upgraded to LoC Copy C`

---

### Phase 1: Unified *Songs* (Copy Z, LoC Rosenwald)

**Goal:** Replace the existing `innocence/` folder with a unified `books/songs/` containing both halves as Blake bound them in his late life. Copy Z is fully coloured, single-binding, ~57 plates total.

- [ ] **1.1 Source Copy Z plates from LoC IIIF.** Use `https://tile.loc.gov/image-services/iiif/<ark>/full/full/0/default.jpg`. The LoC catalog record for Copy Z provides the ARKs. Save with numbered slug filenames matching Blake's plate titles. Target ≥3500 px long edge.

- [ ] **1.2 Migrate existing `books/innocence/*.jpg` → `books/songs/innocence/`.** If LoC Copy Z gives higher resolution than the existing files, **replace**. Otherwise keep existing where equal.

- [ ] **1.3 Add the 26 Experience plates** to `books/songs/experience/`. Plates: frontispiece, title-page, Introduction, Earth's Answer, The Clod and the Pebble, Holy Thursday, The Little Girl Lost (1–2), The Little Girl Found (1–2), The Chimney Sweeper, Nurse's Song, The Sick Rose, The Fly, The Angel, The Tyger, My Pretty Rose Tree (also Ah! Sun-Flower / The Lilly — three on one plate), The Garden of Love, The Little Vagabond, London, The Human Abstract, Infant Sorrow, A Poison Tree, A Little Boy Lost, A Little Girl Lost, To Tirzah, The School Boy, The Voice of the Ancient Bard. **Use Copy Z's bound order** — note that "School Boy" and "Voice of the Ancient Bard" sit in Experience here but migrated from Innocence in Blake's lifetime.

- [ ] **1.4 Verify plate counts.** Innocence: 31 in Copy Z (per Scholar — v1's "27" was wrong for Copy B Innocence-only; in Copy Z the combined binding has both halves cleanly distributed). Experience: 26.

- [ ] **1.5 Write `books/songs/songs.md`:**
```markdown
---
cover: innocence/01-frontispiece.jpg
description: Songs of Innocence and of Experience, Shewing the Two Contrary States of the Human Soul. The Author &amp; Printer, W. Blake. 1789, 1794, &amp; thereafter as one Book.
children_style: list
weight: 2
uid: blk-songs
source: Blake Archive / LoC Rosenwald Copy Z (late combined binding, fully coloured)
related: [tracts/laocoon, journal/workshop/the-method]
---

Without Contraries is no Progression. The Songs of Innocence I made first, in eighty-nine, the year my Tygers began. The Songs of Experience followed in ninety-four. From then I bound them as one Book in two halves, &amp; called them the Two Contrary States of the Human Soul.

Read the Lamb against the Tyger. Read Holy Thursday against Holy Thursday. Read the Chimney Sweeper against the Chimney Sweeper. Then read them again.
```

- [ ] **1.6 Innocence index** at `books/songs/innocence/innocence.md` and **Experience index** at `books/songs/experience/experience.md`, both with `series: true`, copy reference, and short framing.

- [ ] **1.7 Cross-references between contrary pairs.** Add `related:` arrays in each plate's `.md` sidecar (or in the descriptions if moss can't read array YAML on plates) pairing Innocence "Holy Thursday" ↔ Experience "Holy Thursday", "The Lamb" ↔ "The Tyger", "Nurse's Song" ↔ "Nurse's Song", "The Chimney Sweeper" ↔ "The Chimney Sweeper", "Infant Joy" ↔ "Infant Sorrow".

- [ ] **1.8 Build, verify, commit.**

---

### Phase 2: Early tracts and Lambeth books (1788–1795)

Same as v1 Phase 2 — sub-tasks 2.1 through 2.8 — with these revisions:

- **2.1** *All Religions Are One* — unchanged.
- **2.2** *No Natural Religion* a + b — unchanged.
- **2.3** *Europe* Copy E from LoC IIIF.
- **2.4** *Urizen* Copy G from LoC IIIF.
- **2.5** *Ahania* Copy A from LoC IIIF. **Add note:** "Like *Book of Los*, etched in intaglio rather than relief."
- **2.6** *Book of Los* Copy A from BM. **Add intaglio note.**
- **2.7** *Song of Los* Copy A from BM.
- **2.8** Build & weight verification. **Weight order:** Poetical Sketches (0), All Religions (1), No Natural Religion (2), Songs (3), Thel (4), Marriage (5), Visions (6), America (7), Europe (8), Urizen (9), Ahania (10), Book of Los (11), Song of Los (12), Milton (13), Gates of Paradise (14, despite c. 1820 — sits with the 1793 ur-text), On Homer/Virgil (15), Ghost of Abel (16), Laocoön (17), Jerusalem (18 — last, biggest).

---

### Phase 3: *Milton* + late tracts + *Descriptive Catalogue* binding

**Defer *Jerusalem* to Phase 8** (Designer's recommendation — platform must support it).

#### 3.1 *Milton: A Poem* (50 plates)

- [ ] Download Copy C from NYPL IIIF. If NYPL resolution is below 3000 px, fall back to LoC Copy D and verify the preface plate is present (Copy A/B/C have it; Copy D does NOT — Scholar). If using Copy D for resolution, **inject the preface plate from Copy C as plate 1a** and note the source split in `source:`.

#### 3.2 Late tracts in `books/`

- [ ] *On Homer / On Virgil* — Copy B LoC IIIF, 2 plates. Weight 15.
- [ ] *Ghost of Abel* — Copy A LoC IIIF, 2 plates. Weight 16.
- [ ] *Laocoön* — Copy B Fitzwilliam, 1 plate. Weight 17.

#### 3.3 *Descriptive Catalogue* — bind to 1809 Exhibition

- [ ] **3.3.1 Transcribe full text** from Erdman pp. 528–550. Save as `gallery/exhibition-1809/exhibition-1809.md` (NOT as a tract — Blake's instruction: "The Catalogue is not a tract; it belongs with the Art").
- [ ] **3.3.2 Split by Number I–XVI** as anchor sections within the page; sticky TOC if moss supports it.
- [ ] **3.3.3 Add sub-folder per surviving painting** under each Number (Phase 4.6 work).

- [ ] **3.4 Commit.**

---

### Phase 4: Gallery — engravings, color prints, temperas, exhibition, visionary heads, refusals

Substantially expanded from v1. Order of sub-tasks:

#### 4.1 Engravings sub-section

- [ ] **4.1.1 *Joseph of Arimathea Among the Rocks of Albion*** (1773, reworked c. 1810) — single plate. BM impression. *Blake's first signed engraving + late reissue with his caption.* Caption: "*This is One of the Gothic Artists who Built the Cathedrals in what we call the Dark Ages.*"
- [ ] **4.1.2 *Canterbury Pilgrims* engraving** (1810) — large single plate after his own tempera. BM impression. Cross-reference: 1809 Exhibition Number III (the painting).
- [ ] **4.1.3 *Illustrations of the Book of Job*** (22 plates: title + 21 designs) — BM Linnell proofs. **Sequence as pairs** if moss supports two-column layout: plates 1–2, 3–4, etc. (Curator's facing-page point.)
- [ ] **4.1.4 *Dante's Divine Comedy*** — 7 engravings (BM) + 8–10 selected watercolours.
- [ ] **4.1.5 *Blair's Grave*** — 12 plates (1808 first edition). Note dispute: Blake's *designs*, Schiavonetti's *engraving*, Cromek's commission — Schiavonetti named explicitly.
- [ ] **4.1.6 *Young's Night Thoughts*** — 43 published engravings (1797 Edwards edition). Skip the 537 unpublished watercolours.

#### 4.2 Large Color Prints (1795) — 12 subjects

Single best impression of each subject. List per Curator:
1. *Newton* (Tate → via Wikimedia)
2. *Nebuchadnezzar* (Tate → via Wikimedia)
3. *Pity* (Tate → via Wikimedia, Met has second impression)
4. *Hecate / Night of Enitharmon's Joy* (Tate → via Wikimedia)
5. *Elohim Creating Adam* (Tate → via Wikimedia)
6. *Satan Exulting over Eve* (Getty open content)
7. *God Judging Adam* (Tate → via Wikimedia — re-identified by Butlin 1965, formerly mis-titled Elijah)
8. *Lamech and His Two Wives* (Tate → via Wikimedia)
9. *Naomi entreating Ruth and Orpah* (V&A)
10. *Christ Appearing to the Apostles* (NGA Washington, open access)
11. *The House of Death* (Tate → via Wikimedia)
12. *The Good and Evil Angels* (Tate → via Wikimedia)

**Drop "Tate set vs Butts set" framing — there is no such matched pair (Curator). The 12 subjects exist in 1–3 dispersed impressions; show the best of each.**

#### 4.3 Temperas (NEW per Curator) — ~12 works

- [ ] Heads of the Poets temperas (Manchester City Galleries) — Chaucer, Spenser, Milton, Shakespeare, Dante, others
- [ ] *Bathsheba at the Bath* (Tate via Wikimedia)
- [ ] *Adam Naming the Beasts* (Glasgow — request)
- [ ] *Eve Naming the Birds* (Glasgow)
- [ ] *Christ in the Sepulchre, Guarded by Angels* (V&A)
- [ ] *Spiritual Form of Pitt Guiding Behemoth* (Tate via Wikimedia)
- [ ] *Spiritual Form of Nelson Guiding Leviathan* (Tate via Wikimedia)

#### 4.4 1809 Exhibition (per Catalogue Number)

The Catalogue text lives at the section root (Phase 3.3). Each Number is a sub-folder with the painting and the Catalogue entry:

- Number I: *Spiritual Form of Nelson* (Tate)
- Number II: *Spiritual Form of Pitt* (Tate)
- Number III: *Canterbury Pilgrims* tempera (Pollok House — show 1810 engraving as substitute since Pollok image not openly licensed)
- Number IV: *The Bard from Gray* (Tate via Wikimedia)
- Number V: *The Ancient Britons* — known only from 1894 Carfax photograph + Catalogue description
- Number IX: *Satan in his Original Glory* (Tate via Wikimedia)
- Number X: *Jacob's Dream* (BM)
- Number XI: ***Penance of Jane Shore*** (Tate via Wikimedia) — NEW per Curator
- Number XII: ***Whore of Babylon*** (BM) — NEW per Curator
- Numbers VI–VIII, XIII–XVI: lost or unphotographed; Catalogue entry only

#### 4.5 Visionary Heads — 12–15 selected

- *Ghost of a Flea* tempera (Tate via Wikimedia)
- *Ghost of a Flea* pencil sketch (Tate via Wikimedia) — show alongside the tempera
- *Cancer the Crab* (Tate — most reproduced zodiacal head)
- William Wallace
- King Edward I
- The Man Who Built the Pyramids
- The Man Who Instructed Mr Blake in Painting in his Dreams
- Solomon, Bathsheba, Saul, Lais of Corinth, Caractacus, Owen Glendower, Boadicea (from the Tate sketchbook — pick 3–4)
- **Drop *Spirit of Voltaire*** (poorly attributed, reproductions poor — Curator)

#### 4.6 Commercial engravings (NEW sub-gallery)

- [ ] Stedman's *Surinam* (1796) — curated selection of 8–10 of the 16 plates, focusing on the abolitionist images (flogged slave, hanged Negro, Group of Negros).
- [ ] Hesiod after Flaxman (1817) — selection of 8–10 of the 37 plates.
- [ ] Hayley's *Designs to a Series of Ballads* (1802) — all 4 plates.
- [ ] Hayley's *Life of Romney* (1809) — selection of 3–4 plates.

#### 4.7 Refusals — "Things I Would Not Do" (NEW per Blake)

- [ ] Single page `gallery/refusals/refusals.md`. Short prose by Blake on what he refused:
    - Engraving after Stothard's *Canterbury Pilgrims* (Cromek's commission, 1806)
    - Hayley's polite watercolours of ladies (Felpham, 1801–02 — see letter to Butts 6 July 1803)
    - The Royal Academy's terms (1808 refusal to exhibit fresco)
    - Cromek's bargain on the *Grave* designs (cf. notebook Public Address)
  
  In Blake's voice, with citations to letters/notebook. No images — text page.

#### 4.8 Build & visual walkthrough. Commit per sub-section.

---

### Phase 5: Other Writings (Drafts + Notes + Vala)

- [ ] **5.1 Poetical Sketches** — text only. **Move to `books/poetical-sketches/` at weight 0** (Blake's correction — it's a printed book, not a draft). Transcribe from Erdman pp. 408–451.

- [ ] **5.2 Tiriel** — text + 12 wash drawings.
    - Drawing provenance: **9 at British Museum, 2 at Yale, 1 at V&A** (Scholar correction — not all V&A).
    - Index page calls it a "Cast Off Garment" (Blake's term) rather than a draft.

- [ ] **5.3 French Revolution Book I** — text only. Erdman pp. 286–296. Frame: "Set in type at Mr. Johnson's, Saint Paul's Churchyard, 1791. The proof sheet survives at the Huntington. Johnson did not put it forth, fearing the times."

- [ ] **5.4 Pickering Manuscript** — text only. Reworded framing: "**A fair-copy presentation manuscript, c. 1807, probably prepared for Mr. B. H. Malkin** — not engraved, but finished. Auguries of Innocence, The Mental Traveller, The Crystal Cabinet, The Grey Monk, Mary, William Bond, The Smile, The Golden Net, The Land of Dreams, Long John Brown."

- [ ] **5.5 Notebook (Rossetti MS)** — curated selections:
    - *A Vision of the Last Judgment* (prose, c. 1810)
    - *Public Address* (prose, c. 1810) — name Stothard, Cromek, Schiavonetti
    - *The Everlasting Gospel* (verse, c. 1818) — Scholar confirms Notebook placement
    - Selected epigrams: "Mock on, Mock on Voltaire Rousseau"; "When Klopstock England defied"; "I asked a thief"; the Hayley epigrams

- [ ] **5.6 Vala (Four Zoas) — NEW per Blake's reversal**
    - Night the First (Erdman pp. 297–304)
    - Night the Ninth (Erdman pp. 386–407) — the Last Judgment
    - Index page framed: "*From the Vala manuscript. The work outgrew the manuscript &amp; I let it lie; the furnace was elsewhere. Here are two Nights, the first &amp; the last, that the reader may see what I left behind &amp; what I went forward to.*"

- [ ] **5.7 Notes in Other Men's Books — NEW per Blake's restoration**
    - Single entry: Annotations on Reynolds (Erdman pp. 635–662).
    - Index page in Blake's voice: "*I wrote these in Sir Joshua's book because his book was the public dogma of the Royal Academy. To Generalise is to be an Idiot. To Particularise is the Alone Distinction of Merit.*"

- [ ] **5.8 Build & commit.**

---

### Phase 6: Journal — biographical entries (rewritten per Historian + Blake)

Existing biographical entries: apprenticeship, marriage, bastille, i-shant-live-five-years, the-method (now in workshop/), prospectus (now in workshop/), the-exhibition. Verify each. Add new entries below.

**Voice register (apply throughout):** ampersands; capitalize Imagination, Genius, Vision, Energy, Eternity, Spectre, Emanation; period spellings — `shew`, `chuse`, `tho'`, `thro'`, `compleat`, `antient`, `Englands` (no apostrophe in possessives), `shewn`; loose syntax in visionary passages, sharp register in personal.

- [ ] **6.1 `journal/workshop/workshop.md`** — section index. Show the rolling press, the asphaltum, the registration of letterpress and engraving. Catherine.

- [ ] **6.2 `journal/workshop/catherine.md`:**
```markdown
---
title: Catherine
uid: jw1782b011
date: 1782-08-18
description: She set the inks &amp; pulled the press. Half the plates that go out under my name were coloured by her hand.
---

Catherine Boucher of Battersea, daughter of a market-gardener; I married her in the year eighty-two, at St Mary's, where she signed the Book with a Mark. I taught her to read &amp; to write &amp; then to colour, &amp; she has done all three these forty-five years.

The press is hers as much as mine. The ink is mixed by her. The plates are tinted by her hand on most of the copies that go out — &amp; I have always approved. When I worked late at the *Songs* she sat by me &amp; reminded me to eat. She is the same Kate now that she was at twenty-two, only more so.
```

- [ ] **6.3 `journal/early-years.md`** — birth 28 Nov 1757 at 28 Broad Street; the angel-tree at Peckham Rye c. 1765; the haymakers' tree of angels c. 1766; Pars's drawing school from age ten. Voice in active register: "I saw a Tree at Peckham Rye that was bright with Angels — every bough a wing."

- [ ] **6.4 `journal/gordon-riots.md` (NEW per Historian)** — 6 June 1780. Blake reportedly in the front rank of the mob that burned Newgate. Note: source is Gilchrist via Tatham; treat as Blake's own account with the qualifier "they say I was in the front rank — &amp; they say truly." This is the single most politically formative moment per Historian.

- [ ] **6.5 `journal/robert.md`** — REWRITTEN per Historian's draft. Age **19**, not 24. Method vision attributed to Robert's posthumous appearance, **c. June 1788** (sixteen months after death):

```markdown
---
title: Robert
uid: j1787a021
date: 1787-02-11
description: My dear Brother Robert was taken from me this 11th of February, being but nineteen years old.
---

My dear Brother Robert was taken from me this 11th of February, being but nineteen years old. I sat by him many days &amp; nights. At the moment he expir'd I beheld his Soul ascend rejoicing thro' the ceiling. Since then he comes to me oft in Vision; &amp; in the summer of eighty-eight, more than a year now since he was taken, he stood in my chamber as plainly as you stand, &amp; he laid before me the manner of the Etching, line for line, even to the stopping-out varnish. I tried it that same week, &amp; it answered. The Songs are made by his hand as well as mine.
```

- [ ] **6.6 `journal/the-bastille.md`** — existing. Add caveat that the bonnet rouge is "they say I wore the red cap; let them say so" (Gilchrist via Tatham, uncorroborated — Historian).

- [ ] **6.7 `journal/johnsons-circle.md` (NEW per Historian)** — Joseph Johnson's weekly dinners at 72 St Paul's Churchyard, 1788–1800. Paine, Priestley, Godwin, Wollstonecraft (whose *Original Stories* Blake engraved 1791), Fuseli, Stedman. Frame Stedman commission (1796) here. The 1798 trial of Johnson for seditious libel (Wakefield). The apocryphal warning to Paine September 1792.

- [ ] **6.8 `journal/lambeth.md`** — late 1790 / early 1791. 13 Hercules Buildings (later renumbered 23), £40/year. Blake prospering from engraving commissions. The garden, the vine, the visions of Bards.

- [ ] **6.9 `journal/felpham.md`** — 18 September 1800. Note: invitation came via **Flaxman**, who recommended Blake to Hayley to engrave *Life of Cowper*. Three years of cottage life, sea air, Hayley's polite watercolours.

- [ ] **6.10 `journal/the-soldier.md`** — REWRITTEN per Historian + Blake's voice:

```markdown
---
title: The Soldier in the Garden
uid: j1803a025
date: 1803-08-12
description: Scolfield the Dragoon came drunk into my garden, &amp; would not stir.
---

The Fellow Scolfield came drunk into my Garden, brought there by my gardener Hosier, &amp; being asked to depart would not stir. So I took him by the elbows &amp; marched him sixty yards down the lane to the Fox Inn where he is quartered. For this he hath sworn before the Justices that I damn'd the King &amp; his Soldiers, calling them all Slaves — which I never said, nor would say tho' I were alone with my Catherine.

The charge is Sedition. Mr Hayley will stand my friend. They speak of Transportation. God defend me.
```

- [ ] **6.11 `journal/south-molton-street.md`** — return from Felpham, late 1803. The London years resumed at No. 17 South Molton Street.

- [ ] **6.12 `journal/acquittal.md`** — REWRITTEN per Historian, crediting **Samuel Rose**:

```markdown
---
title: The Verdict
uid: j1804a027
date: 1804-01-11
description: Not Guilty. The Court was much delighted.
---

The Jury after some little Debate brought in their Verdict — Not Guilty. The Lookers-on, of whom there were no small numbers, gave a noisy Shout of approbation, &amp; the Court was much delighted.

Mr Samuel Rose spoke nobly for me, tho' he was ill &amp; could scarce stand. The Judge interrupted him perpetually &amp; insulted him in the grossest manner, but he held the floor. He died not many months after. I shall remember him.
```

- [ ] **6.13 `journal/truchsess.md`** — Oct 1804. Quote verbatim from 23 Oct 1804 Hayley letter:

```markdown
---
title: The Light of My Youth
uid: j1804a028
date: 1804-10-23
description: I was again enlightened with the light I enjoyed in my youth.
---

I am again Emerged into the Light of Day. The Truchsessian Gallery of Pictures opened to me a thing not seen these twenty years: *I was again enlightened with the light I enjoyed in my youth, and which has for exactly twenty years been closed from me as by a door and by window-shutters.* I have entirely reduc'd that Spectrous Fiend to his station, whose annoyance has been the ruin of my Labours for the last passed twenty years of my life. He is the enemy of Conjugal Love &amp; is the Jupiter of the Greeks, an iron-hearted Tyrant, the Ruiner of antient Greece.

Now my course of life shall be different.
```

- [ ] **6.14 `journal/cromek.md` (NEW)** — 1805–1808. Cromek commissioned the *Grave* designs, then gave the engraving to **Schiavonetti**, paying Blake little. Cromek then encouraged **Stothard** to paint a *Canterbury Pilgrims* in direct competition with Blake's known tempera. Blake mounted the 1809 Exhibition partly in response.

- [ ] **6.15 `journal/the-exhibition.md`** — existing. Verify it cross-links to `gallery/exhibition-1809/`.

- [ ] **6.16 `journal/silence.md` (NEW)** — 1810–1818. The wilderness years. South Molton Street. Poverty. The notebook drafts (*Public Address*, *Vision of Last Judgment*). The *Canterbury Pilgrims* engraving as the major work of these years.

- [ ] **6.17 `journal/linnell.md`** — 1818 onward. Discovery by John Linnell at Cumberland's. Commissions for Job (1821–26) and Dante (1826–27).

- [ ] **6.18 `journal/the-ancients.md`** — Samuel Palmer (met 1824), George Richmond, Edward Calvert, Frederick Tatham. Gatherings at Fountain Court 1825–27.

- [ ] **6.19 `journal/last-days.md`** — REWRITTEN per Blake's own rewrite:

```markdown
---
title: Last Days
uid: j1827a035
date: 1827-08-12
description: My body is a poor clay thing &amp; is going off into its own.
---

My body is a poor clay thing &amp; is going off into its own; but I have been Walking these last three days in the country I shall now inhabit. I have seen it. The colours are not like the colours here — they are the colours I knew in my youth before they were shut away.

Catherine sits by the bed &amp; I have drawn her countenance — she is the same Kate I married at Battersea, only more so. The Imagination is Eternal. My works I leave to her, &amp; to whatever Friends shall prove faithful.

I shall go on creating.
```

(No Tatham line. No "my mind is at peace.")

- [ ] **6.20 Build & cohesion check.** Walk every Journal entry in date order. Confirm voice register holds (ampersands, capitals, period spelling). Confirm no factual contradictions with Letters.

- [ ] **6.21 Commit.**

---

### Phase 7: Letters (chronological — ~30 letters)

Same letter list as v1 Phase 7 plus:
- Add **Letter to Hayley, 6 July 1803** ("genteel Ignorance"), already in v1
- Add **Letter to Butts, 16 August 1803** — the Scofield account — give it explicit prominence (Blake: "make sure that letter is prominent, not buried in chronological order"). Suggest a **`featured: true` YAML flag** in moss to surface it.
- Add **Letter to Cumberland, 12 April 1827** — featured as the closing artifact of the site.

- [ ] **7.1 Already-staged letters** in letters/ from Phase 0.4 — verify frontmatter is letter-style.

- [ ] **7.2.1–7.2.12** Transcribe and stage 27 new letters per year-batched sub-tasks (as v1).

- [ ] **7.3 Cross-link Journal ↔ Letters (Designer)**. For each journal year that has matching letters: add `related:` YAML pointing to the letters of that year. For each letter: add `journal:` backlink. Render as small "this week" or "this period" sidebar.

- [ ] **7.4 Verse-letter visual treatment.** Letters of 1800-09-12 (Flaxman), 1800-10-02 (Butts), 1802-11-22 ×2 (Butts) carry verse — render with the verse styled distinctly from prose.

- [ ] **7.5 Build, verify, commit.**

---

### Phase 8: Jerusalem — FOUR chapters of 25 (deferred from Phase 3)

Only after Phase 0 verifies platform support for series navigation, mobile responsive images, deep zoom on the etched text.

- [ ] **8.1 Source Copy E from YCBA IIIF.** Yale serves Copy E plate by plate; expect 4000+ px.

- [ ] **8.2 Distribute 100 plates across four chapter folders:**
    - `chapter-1-to-the-public/` — plates 1–25, opening with the Address "To the Public"
    - `chapter-2-to-the-jews/` — plates 26–50, opening with "To the Jews"
    - `chapter-3-to-the-deists/` — plates 51–75, opening with "To the Deists"
    - `chapter-4-to-the-christians/` — plates 76–100, opening with "To the Christians"

- [ ] **8.3 Per-chapter index `.md`** with the Address text transcribed (Erdman pp. 144, 171, 200, 229 respectively).

- [ ] **8.4 Top-level `jerusalem.md`:**
```markdown
---
cover: chapter-1-to-the-public/01-frontispiece.jpg
description: Jerusalem, The Emanation of the Giant Albion, 1804–1820. Four Chapters: To the Public, the Jews, the Deists, the Christians.
children_style: list
weight: 18
uid: blk-jerusalem
source: Blake Archive / Yale Center for British Art Copy E (the only fully coloured copy)
---

The work of sixteen years. Four Chapters, one hundred plates. Each Chapter opens with an Address to a different audience.

I sold most copies uncoloured. One copy, fully painted thro' &amp; thro', passed thro' several hands after my Catherine's death &amp; sits now in America at Yale. Read it as you would read a city.
```

- [ ] **8.5 Per-plate transcription.** This is the work where transcription matters most — the etched text on the plate IS the work. At launch, target full transcription of: every Chapter Address, every plate in Chapter 1, the famous plates ("There is a Void, outside of Existence," "I see the Four-fold Man," the "Time is the mercy of Eternity" passage). Backfill the rest over time.

- [ ] **8.6 Build, verify on mobile + desktop, commit.**

---

### Cross-Cut Phase 9: Chronology, Index of First Lines, London Map

Designer's three big features. Best to build after Phases 6–7 (data populated):

- [ ] **9.1 Chronology timeline.** Script to walk every `.md` with a `date:` YAML field, emit a single timeline page. Group by year. Mark which section each event lives in.

- [ ] **9.2 Index of First Lines.** Script over `books/`, `other-writings/`, `letters/` (for verse-letters). Extract first line of each lyric. Sort alphabetically. Link to plate or page.

- [ ] **9.3 London map.** Static page with five pins:
    - 28 Broad Street (1757–1782, birth and apprenticeship)
    - 13 Hercules Buildings, Lambeth (1790–1800)
    - Felpham cottage (1800–1803) — Sussex
    - 17 South Molton Street (1803–1821)
    - 3 Fountain Court, Strand (1821–1827, death)
    - Bunhill Fields (burial, August 1827)

- [ ] **9.4 Build, verify, commit.**

---

## Final Verification (cross-phase)

Same as v1 V.1–V.8 with these revisions:

- **V.2 Plate count audit** — revised expected counts: Songs/innocence 31, Songs/experience 26, Marriage 27 (Copy C), America 18 (E), Europe 18, Urizen 28 (G), Ahania 6, Book of Los 5, Song of Los 8, Milton 50 (C), Jerusalem 100 (4×25, E), Gates of Paradise 18. **Total ~380.**

- **V.3 Resolution audit** — **2500 px short-edge minimum**, not 2000.

- **V.5 Attribution check** — site declares CC BY-NC-SA 4.0; per-page `source:` field; site-wide credits page with full Blake Archive / LoC / YCBA / NYPL / BM / Wikimedia attributions. **No ads, no affiliate links, no paid tiers — the NC clause forbids them.**

- **V.6 Voice consistency** — read every `.md` aloud. Reject `was`-passive constructions, modern abstractions ("at peace," "iconic"), third-person references to Blake. Confirm ampersands, capitalized abstracts, period spellings throughout.

- **V.9 NEW: Cross-reference check.** Walk every plate/page pair Blake intended together (contrary pairs in *Songs*, prophecy triplet, Catalogue ↔ Exhibition paintings). Confirm `related:` YAML pointers render in the rendered page.

- **V.10 NEW: Mobile check.** Open the site on phone. Confirm Jerusalem doesn't OOM the browser. Confirm srcset is delivering ≤1MB per plate at default view.

---

## Out of Scope (revised)

- Other annotations (Lavater, Swedenborg, Wordsworth, Bacon, Berkeley, Watson, Boyd, Thornton, Spurzheim) — kept as user's call. Reynolds restored per Blake's request.
- *Vala / Four Zoas* in full — only Nights I + IX included per Blake's reversal.
- *An Island in the Moon* — private satire.
- Trial depositions.
- Transactional letters.
- Night Thoughts watercolours beyond the 43 engraved.
- The Wedgwood catalogue engravings (1815–16).
- Paradise Lost / L'Allegro / Comus / Paradise Regained / Nativity Ode / Pilgrim's Progress / Gray watercolour sets — these were commission work for Butts/Thomas/Linnell, not engraved for public sale. **One representative plate** from each as a "Commission Designs" mini-gallery is an open option; default = exclude.

---

## Estimate (revised)

**80–120 hours.** Blake's correction stands: "Take longer than your estimate."

Risks that could double the estimate:
- Platform spike (Phase 0) reveals moss doesn't support series navigation or transcription — adds ~20 hours engineering
- Per-plate transcription for Jerusalem and Milton alone is ~30 hours if pursued fully
- Image sourcing from institutions without open APIs (Manchester, Glasgow, V&A) — could add 5–10 hours

Risks that could shorten:
- LoC IIIF batch-download script delivers everything in one evening
- Cross-references generated by script over YAML metadata
