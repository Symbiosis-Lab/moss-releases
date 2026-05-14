# William Blake Recording — Next-Pass Plan

> **Status:** Built on the merged state of `blake-completion` (commit 8f7abef).
> **Scope rule (load-bearing):** strict primary-source extraction. No first-person Blake voice composed by the editors. Every page cites its primary source.

## Three reviewer scores to address

After the merge to main, three historians (Blake-scholar, period-historian, textual-scholar) reviewed the result and converged on **6 to 6.5 / 10**. The carpenter approach was endorsed by all three. Their named errors and gaps are the agenda below, in five tiers ordered by ease-and-impact.

---

## Tier 1 — Error corrections (~1 hour)

Quick fixes for transmission errors flagged by the reviewers.

- [ ] **`other-writings/pickering-manuscript/auguries-of-innocence.md` L212**: `Puns a joy with silken twine` → `Runs a joy with silken twine`. The famous line is silently corrupted by 1893 OCR.
- [ ] **`other-writings/pickering-manuscript/auguries-of-innocence.md`** systematic OCR fixes: `Eedbreast` → `Redbreast` (L19), `liand` → `hand` (L16), `bovver` → `bower` (L71), `arc` → `are` (L209), `Carne` → `Came`, `Eepeats` → `Repeats`.
- [ ] **`other-writings/notes-in-other-mens-books/reynolds.md`** systematic R→E substitution: `Eafail` → `Rafael`, `Eembrandt` → `Rembrandt`, `Koine` → `Rome`, `Miehael-Angelo` → `Michael-Angelo`, `perfeot` → `perfect`. Use `sed` global replace, then spot-verify.
- [ ] **`other-writings/notes-in-other-mens-books/reynolds.md` L19–24**: strip the Ellis-Yeats running head `to / The Discourses op Sir Joshua Reynolds. / WOKKS OF KEYNOLDS, 1798.` from the body — that is editorial chrome presented as Blake.
- [ ] **`other-writings/tiriel/tiriel.md`**: strip first ~150 lines of Ellis-Yeats's symbolic exegesis; keep only Blake's verse text (the editorial commentary precedes "Tiriel, the aged king..." or similar; locate and cut).
- [ ] **`letters/1827-04-12-to-cumberland-final.md`**: hand-clean OCR cruft. Fix `\2th April 1827` → `12 April 1827`, fix hyphenation break `Hercules-/doctrine` (currently broken across word). This is *the* deathbed letter; deserves a clean pass.
- [ ] **`journal/lambeth.md`** — rent correction. Currently says "rented at about £40 per annum"; period historian flagged this as materially wrong (Lambeth rate-books show £18–22). Strike the £40 figure and replace with an editorial note: *"The rent is not given in either of the principal biographies; later guesses range from £40 (Wilson 1927) to ~£20 (Bentley citing Lambeth rate-books)."*
- [ ] **`journal/lambeth.md`** — strengthen Linnell caveat. Add Story, *Life of John Linnell* (Bentley & Son, 1892), vol. I, p. 244, where Linnell records that Butts denied the summer-house anecdote to him *directly*. This is a stronger objection than the Ellis-Yeats theological one already cited.
- [ ] **`journal/gordon-riots.md`** — add Bentley caveat. Note that Bentley's *Blake Records* (2nd ed. 2004) and *The Stranger from Paradise* (2001, pp. 41–43) treat Blake's "front rank" presence as Gilchrist's literary reconstruction rather than documented fact.
- [ ] **`books/the-marriage-of-heaven-and-hell/marriage-text.md`**: change the claim *"the text on the plates is identical to what follows"* to *"the plate text is substantially identical to this reading text, with copy-state variants (plate 3 is absent in some copies; capitalization and punctuation differ between plate states)."*
- [ ] **`other-writings/pickering-manuscript/pickering-manuscript.md`**: strike the claim "cross-checked with John Sampson, *The Poetical Works of William Blake* (1905)" — that cross-check did not actually happen.
- [ ] **`books/the-book-of-urizen/`** — split detail captures. Move all files past `028.jpg` into `the-book-of-urizen/details/` so the canonical 28 plates surface in `children_style: grid` view. (LoC's IIIF set publishes whole-plate + multiple detail captures per page; 112 files for 28 plates defeats the grid.)
- [ ] **Verify Gilchrist 1880 vol. I page number** for the summer-house anecdote. Currently cited as p. 112; Blake scholar's recollection puts it pp. 115–117. Open the OCR file and confirm.

---

## Tier 2 — Extract more text from sources already downloaded (~2 hours)

The Internet Archive scans for Ellis-Yeats vols II + III are already on disk at `/tmp/blake-sources/`. Several pending texts can be extracted with the same OCR run that produced the existing files.

- [ ] **Mental Traveller** — Ellis-Yeats vol. III ~pp. 72–75. Write to `other-writings/pickering-manuscript/the-mental-traveller.md`. Same OCR file as Auguries.
- [ ] **The Smile** — Ellis-Yeats vol. III ~p. 69.
- [ ] **The Golden Net** — Ellis-Yeats vol. III ~pp. 70–71.
- [ ] **The Grey Monk** — Ellis-Yeats vol. III ~pp. 81–82.
- [ ] **Public Address** — Ellis-Yeats vol. II (interleaved with Notebook material). Write to `other-writings/notebook/public-address.md`. Locate the section header.
- [ ] **A Vision of the Last Judgment** — Ellis-Yeats vol. II OR Gilchrist 1880 vol. II (the catalogue volume — need to download if not present). Write to `other-writings/notebook/vision-of-the-last-judgment.md`.
- [ ] **Vala / Four Zoas — Night I** — Ellis-Yeats vol. III contains the *Vala* text. Write to `other-writings/vala/night-the-first.md`. **Heavy caveat in front-matter**: Ellis's text is the most interventionist of any 19th-c. printing; flag this clearly.
- [ ] **Vala — Night IX** (the Last Judgment) — same source, write to `other-writings/vala/night-the-ninth.md`.
- [ ] **Tiriel cleaned text** — separate Ellis-Yeats commentary from Blake's verse; same source file, surgical extract.
- [ ] **Reynolds annotations cleanup** — same source, second pass: fix the systematic R→E substitution, strip running heads, restore the "To :" / "Blake :" structure where it has broken.

---

## Tier 3 — Download new public-domain sources (~1 hour)

Sources named by the period historian and textual scholar that we don't have on disk.

- [ ] **Sampson, *The Poetical Works of William Blake* (Oxford, 1905)** — Internet Archive ID `poeticalworksofw00blakuoft` or similar. PD. Use as the correct source for *Poetical Sketches* (currently sourced from Ellis-Yeats, which the textual scholar called textually inferior for the lyrics).
- [ ] **John Knowles, *The Life and Writings of Henry Fuseli* (Colburn, 1831)** — for Joseph Johnson's St Paul's Churchyard dinners (vol. I pp. 55–67 and passim). PD. Internet Archive.
- [ ] **John Story, *The Life of John Linnell* (Bentley & Son, 1892)** — for Linnell's direct denial of the Butts/summer-house anecdote (vol. I p. 244). PD.
- [ ] ***The Gentleman's Magazine*, January 1810 vol. 80 pt. 1 pp. 91–93** — Joseph Johnson's obituary. PD.
- [ ] **John Aikin's "Memoir of Mr. Joseph Johnson"** in *A Selection of the Correspondence of the Late Mrs. Anna Letitia Barbauld* (1825). PD.
- [ ] **Sir J. F. Stephen, *History of the Criminal Law of England* (Macmillan, 1883), vol. II pp. 299–376** — for the statutory context of the Scofield prosecution (Treasonable Practices Act 1795, "Two Acts" of 36 Geo. III c. 7 & c. 8). PD.
- [ ] **Maclagan & Russell, *Jerusalem* (Bullen, 1904)** — first letterpress edition of *Jerusalem*. PD. Use for chapter Address verbatim text. Internet Archive `jerusalemwilli00blakgoog` or similar.
- [ ] **Gilchrist 1880 vol. II (the catalogue volume)** — already downloaded as `gilchrist-life-1880-vol1.txt`? Verify. Need vol. II separately if not.

---

## Tier 4 — New plate images (variable time, mostly automated)

- [ ] **Ahania**: confirm whether the missing plate (folder has 5, canonical 6) is acquirable from the LoC IIIF set. Check resolution metadata.
- [ ] **Milton Copy D**: complete the missing plates (019, 029, plus the 11 others if Copy D should have 45 plates). Retry with explicit page numbers.
- [ ] **Songs Copy Z per-plate scans for Experience** — currently `books/songs/experience/` has zero plates. Re-examine the LoC Copy Z scan set for per-plate captures (vs. the bound-volume openings already in `copy-z-bound/`).
- [ ] **Jerusalem Copy E (Yale Center for British Art)** — 100 plates via YCBA IIIF endpoint `https://collections.britishart.yale.edu/iiif/2/<id>/full/full/0/default.jpg`. The single largest acquisition target. Discover the ID structure first; download in batches by chapter.
- [ ] **All Religions Are One** — LoC may have it under a different identifier; or Huntington Copy A via Blake Archive. Try LoC item 50041714 area.
- [ ] **Job engravings (22)** — British Museum collection, BM 1923,0613.1–22. BM's open-collection JPEG URLs are workable for download.
- [ ] **Joseph of Arimathea** — single plate, BM impression.
- [ ] **Canterbury Pilgrims engraving** — single large plate, BM 1859,0709.155 or Yale impression.
- [ ] **Color Prints (12)** — Wikimedia Commons (Tate-held works are PD via Wikimedia upload chain). Newton, Nebuchadnezzar, Pity, Hecate, Elohim Creating Adam, God Judging Adam, Lamech, House of Death, Good and Evil Angels (all Tate via Wikimedia); Naomi (V&A); Satan Exulting (Getty open content); Christ Appearing (NGA open access).

---

## Tier 5 — Additional letters from Russell 1906 (~30 min)

The recording has 27 of Russell's ~46 letters. Add:

- [ ] **Cumberland 6 Dec 1795** — Russell pp. 41–43. The earliest surviving letter; on relief-etching method.
- [ ] **Hayley 26 Nov 1800** — Russell pp. 81–82. The Felpham arrival letter.
- [ ] **Butts 10 January 1803** — Russell pp. 89–93. Felpham discontent.
- [ ] **Dawson Turner 9 June 1818** — Russell pp. 173–174. Blake's own price-list of the illuminated books (a catalogue raisonné in his own hand). Essential.
- [ ] **Linnell sequence 1825–1827** — Russell prints ~14 Linnell letters; we have 7. Pick the four most consequential of the missing 7 (the 1825 Job-commission letters; the late 1826 illness letters).

---

## Tier 6 — New journal entries (verbatim primary-source extraction)

Each is a third-person editorial intro + a verbatim block from a named PD source. No Blake-voice composition.

- [ ] **`journal/johnsons-circle.md`** — RESTORE. Body: verbatim Knowles 1831 vol. I pp. 55–67 (the Tuesday-dinners account naming Paine, Priestley, Godwin, Wollstonecraft, Fuseli, Blake) + the *Gentleman's Magazine* January 1810 obituary of Joseph Johnson.
- [ ] **`journal/scofield-statutory-context.md`** — NEW. Body: verbatim Stephen 1883 vol. II pp. 299–308 on the Treasonable Practices Act 1795 + the 1803 quarter-sessions tariff. Editorial intro contextualizes the August 1803 invasion-alarm climate (1795 Acts had been re-enabled in 1798).
- [ ] **`journal/swedenborg-conference.md`** — NEW. Body: the printed roster of the *First General Conference of the New Church*, Great Eastcheap, 13 April 1789 (in Russell 1906 appendix; PD), showing William and Catherine Blake among the signatories.

---

## Tier 7 — Index updates and final polish

- [ ] Update `journal/journal.md` index to list the 11 + 3 = 14 entries (if all Tier 6 land).
- [ ] Update `gallery/gallery.md` if any new plate images land.
- [ ] Update `books/books.md` if any new plate-image folders are added.
- [ ] Update `William Blake.md` homepage if new sections.
- [ ] Add `docs/plans/2026-05-13-blake-next-pass.md` (this file) to the commit.
- [ ] Verify all `source:` YAML fields point to valid editions and page ranges (audit pass).

---

## Sequencing

1. **Tier 1 first** (error fixes, ~1 hour). Visible, immediate.
2. **Tier 2** (text extraction from existing sources, ~2 hours). High-density value.
3. **Tier 5** (additional letters, ~30 min). Easy extension of existing work.
4. **Tier 3 + 6** in parallel (new source downloads → new journal entries that depend on them).
5. **Tier 4** (plate downloads). Background while other work proceeds. Jerusalem is the largest, do last.
6. **Tier 7** (polish + commits).
7. **Final reviews**: dispatch historian + Blake.

## Out of scope for this pass

- Stronger critical-edition framing (collating multiple Blake-Archive copies of each illuminated book against the LoC scans). Would require multi-source IIIF integration and is beyond a "carpenter" pass.
- Wikimedia Commons batch acquisition of the Color Prints if the Wikimedia URLs aren't stable. Defer if blocked.
- Religious/dissenting matrix beyond the Swedenborg-conference record. Moravian / Druidic / Boehme connections are well-documented but in copyrighted scholarship (Schuchard 2006, Aers 1990); skip.
