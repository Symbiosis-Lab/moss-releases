# Recording Design Decisions

## Overall Approach

Both demo sites follow the same philosophy:
- **Real works, real writings.** No invented content. The artists' actual surviving texts and artworks.
- **Biographical timeline at the core.** Every work and writing carries its real date. The viewer traces a whole life.
- **The painting is the article.** Paintings display full-width via `:::hero {.plate}`. Nothing else on the page. The image speaks for itself.
- **Standalone writings are text.** Journal entries, letters, annotations, poems that exist independently from paintings are presented as readable text.
- **The artist's own voice.** Homepage text is their words, not someone else's words about them.

## William Blake (1757-1827)

**Homepage**: "I must Create a System, or be enslav'd by another Man's" — from *Jerusalem*

**Structure**: 11 illuminated books (Innocence, Thel, Marriage, Visions, America, Gates, Experience, Europe, Urizen) + Journal spanning 1772-1827

**Font**: Libre Caslon Text (body, the actual typeface of his era) + IM Fell English (headings, 18th-century Oxford type)

**Display**: Warm aged paper (#f5efe3), golden ochre accent (#8b6914). Plates full-width. Journal entries with drop caps and ornamental separators (❧).

**Recording piece**: "The Method" — Blake writes about inventing relief etching. Demonstrates text editing + image drag-drop.

**Key decisions**:
- The Blake Archive established that text IS part of the artwork in illuminated plates. We follow this: plates are shown as complete images, no web text overlay.
- Songs of Experience and 1794 works were initially excluded (frozen at 1793) but restored when we expanded to full-life biographical approach.
- Journal entries include his actual letters (to Trusler, to Butts), annotations (Lavater, Swedenborg, Reynolds), the 1793 Prospectus, notebook poems, and biographical moments (apprenticeship, marriage, the Bastille, the Ancients, death).

## 八大山人 (1626-1705)

**Homepage**: "还识得此人么？" — from the 个山小像 self-portrait inscription (1674)

**Structure**: 畫 (Paintings) / 書 (Calligraphy) / 文 (Writings) — the traditional Chinese scholar's categories

**Font**: Noto Serif SC. Vertical typesetting (`typesetting: "vertical"` in config).

**Display**: Rice paper (#f8f5f0), cinnabar seal accent (#c04020). Paintings full-width. 文 entries in vertical classical Chinese.

**Recording piece**: 安晚帖鱼 — adds the Anwan Album fish painting with four-line inscription. Demonstrates image drag-drop + vertical text input.

**Key decisions**:
- Blake declares, 八大山人 conceals. Blake fills, 八大山人 empties. The sites are intentional opposites.
- Inscriptions that are part of the painting image are NOT transcribed separately. The painting speaks for itself.
- The 文 section is the biographical core: 12 entries spanning 1644-1697, each with his actual surviving words from Shao Changheng's biography and his own inscriptions/poems.
- 石涛来访 (the original invented entry about Shitao visiting) was removed because they never actually met. The real 邵长蘅来访 (Shao Changheng's visit in 1690, documented in his biography) replaces it.
- The "madness" entries (发狂, 哑) use Shao Changheng's exact words, which are among the most vivid biographical passages in Chinese art history.

## moss Core Change

`:::hero` enabled on article pages (previously homepage-only). This is a 3-line change in the moss codebase:
- `article.html`: added `{hero_section}` placeholder
- `render.rs:2636`: removed `is_homepage` guard
- `site.css`: `.moss-hero ~ main .article-title { display: none }`

Branch: `feature/hero-article-pages` in the moss repo.

## Prior Art

The William Blake Archive (blakearchive.org) deliberately chose NOT to overlay text on images. Their reasoning: Blake's text IS part of the artwork. We follow this approach for both artists.

No prior project has successfully positioned selectable web text over illuminated plates. Our approach avoids this entirely — the plate image is the content.

## Image Sources

All images are public domain:
- **Met Museum Open Access (CC0)** — primary source for Blake plates and some 八大山人 works
- **Wikimedia Commons** — supplementary source for both artists
- **Yale Center for British Art** — Blake's Europe, Urizen plates
- **Freer Gallery Open Access** — 八大山人 lotus, birds, ducks
