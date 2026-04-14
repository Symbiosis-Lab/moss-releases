# Recording Content — Created Live During Screen Recordings

These files are the content that each artist "creates" during the landing page screen recording. They have been removed from the demo sites so the recording shows them being added fresh.

## How the Recordings Work

1. Open the artist's folder in moss
2. The existing site displays in preview (all collections, journal entries, paintings)
3. The artist creates a NEW piece of content — types text, drags in an image
4. The preview updates live, showing the new content appear on their site

## William Blake — "The Ancients" (1824)

**What happens in the recording**: Blake writes about the young disciples — Samuel Palmer, George Richmond — who finally recognize his work. He types the journal entry, then drags in one of his Virgil woodcuts (the works Palmer called "visions of little dells, and nooks, and corners of Paradise"). The preview updates live.

**Files**: 
- `blake/the-ancients.md` (journal entry)
- `blake/virgil-woodcut.jpg` (Thornton's Virgil woodcut, Met Museum CC0)

**To put it back after recording**: 
```bash
cp "recordings/research/recording-content/blake/the-ancients.md" "recordings/William Blake/journal/the-ancients.md"
cp "recordings/research/recording-content/blake/virgil-woodcut.jpg" "recordings/William Blake/journal/virgil-woodcut.jpg"
```

## 八大山人 — 河上花歌 (1697)

**What happens in the recording**: 八大山人 writes the 37-line poem for his 13-meter masterpiece scroll 河上花圖. He drags in a detail of the lotus painting, then types the poem in vertical classical Chinese. The preview updates live.

**Files**: 
- `bada-shanren/河上花歌.md` (poem)
- `bada-shanren/河上花圖-detail.jpg` (lotus detail, Met Museum CC0)

**To put it back after recording**:
```bash
cp "recordings/research/recording-content/bada-shanren/河上花歌.md" "recordings/八大山人/文/河上花歌.md"
cp "recordings/research/recording-content/bada-shanren/河上花圖-detail.jpg" "recordings/八大山人/文/河上花圖-detail.jpg"
```

## What's on Each Site When Recording Starts

**Blake**: Full biographical timeline 1772-1824 (15 journal entries), 11 illuminated books with ~49 plates. Everything except "The Ancients" and "The Last Day."

**八大山人**: Full biographical timeline 1644-1696 (11 文 entries), ~18 paintings spanning 1665-1696, 3 calligraphy works. Everything except 河上花歌 and post-1697 works (双雁, 双鹰图).
