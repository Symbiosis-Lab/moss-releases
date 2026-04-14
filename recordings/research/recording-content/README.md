# Recording Content — Created Live During Screen Recordings

These files are the content that each artist "creates" during the landing page screen recording. They have been removed from the demo sites so the recording shows them being added fresh.

## How the Recordings Work

1. Open the artist's folder in moss
2. The existing site displays in preview (all collections, journal entries, paintings)
3. The artist creates a NEW piece of content — types text, drags in an image
4. The preview updates live, showing the new content appear on their site

## William Blake — "How I Print My Illuminated Books"

**What happens in the recording**: Blake writes a journal entry about his relief etching method. He types the text in the editor, drags a plate image into the entry, and the preview updates.

**File**: `blake/the-method.md`

**To put it back after recording**: 
```bash
cp "recordings/research/recording-content/blake/the-method.md" "recordings/William Blake/journal/the-method.md"
```

## 八大山人 — 安晚帖鱼 (Anwan Album Fish, 1694)

**What happens in the recording**: 八大山人 adds a new painting to his 畫 collection. He creates the markdown file, drags in the fish painting image, and adds the four-line inscription "左右此何水，名之曰曲河。更求渊注处，料得晚霞多。" The preview updates to show the painting full-width.

**Files**: 
- `bada-shanren/安晚帖鱼.md` (painting page)
- `bada-shanren/安晚帖鱼.jpg` (painting image)
- `bada-shanren/安晚帖鱼题诗.md` (inscription in 文 section)

**To put it back after recording**:
```bash
cp "recordings/research/recording-content/bada-shanren/安晚帖鱼.md" "recordings/八大山人/畫/安晚帖鱼.md"
cp "recordings/research/recording-content/bada-shanren/安晚帖鱼.jpg" "recordings/八大山人/畫/安晚帖鱼.jpg"
cp "recordings/research/recording-content/bada-shanren/安晚帖鱼题诗.md" "recordings/八大山人/文/安晚帖鱼题诗.md"
```

## Decisions Documented

- **Blake's recording piece**: "The Method" / "How I Print" — describes his relief etching process, Catherine's role, the vision from his brother Robert. Perfect for recording because it involves typing a journal entry AND dragging in a plate image to illustrate the technique.

- **八大山人's recording piece**: 安晚帖鱼 — the Anwan Album fish painting (1694). His most characteristic subject (white-eyed fish), from the site's focal year, with a short four-line inscription. Perfect for recording because it shows adding a painting (image drag) and writing a brief poem (vertical Chinese text input).

- **Why these pieces**: Both demonstrate moss's core capabilities (text editing, image drag-drop, live preview) while being authentic to each artist's practice. Blake wrote about his method; 八大山人 painted fish and wrote cryptic poems.
