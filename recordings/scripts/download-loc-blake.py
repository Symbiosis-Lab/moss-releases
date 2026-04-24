#!/usr/bin/env python3
"""Download Blake's illuminated books from Library of Congress IIIF (Public Domain).

Each book has a resource ID pattern: service:rbc:rbc0001:YYYY:YYYYrosenNNNN:PAGE
Pages are numbered 0001, 0002, etc.

Usage:
    python3 download-loc-blake.py <blake_root_dir>
"""

import json
import os
import sys
import time
import urllib.request

IIIF_BASE = "https://tile.loc.gov/image-services/iiif"

# LoC resource IDs and plate naming for each book
BOOKS = {
    "the-marriage-of-heaven-and-hell": {
        "iiif_base": "service:rbc:rbc0001:2003:2003rosen1799",
        "expected_pages": 27,
        "plate_names": {
            1: "title-page",
            2: "the-argument",
            3: "the-voice-of-the-devil",
            4: "plate-4",
            5: "plate-5",
            6: "plate-6",
            7: "proverbs-of-hell-1",
            8: "proverbs-of-hell-2",
            9: "proverbs-of-hell-3",
            10: "proverbs-of-hell-4",
            11: "plate-11",
            12: "plate-12",
            13: "plate-13",
            14: "plate-14",
            15: "a-memorable-fancy-1",
            16: "plate-16",
            17: "plate-17",
            18: "plate-18",
            19: "plate-19",
            20: "plate-20",
            21: "plate-21",
            22: "plate-22",
            23: "plate-23",
            24: "plate-24",
            25: "a-song-of-liberty-1",
            26: "a-song-of-liberty-2",
            27: "a-song-of-liberty-3",
        },
    },
    "the-book-of-thel": {
        "iiif_base": "service:rbc:rbc0001:2005:2005rosen1798",
        "expected_pages": 8,
        "plate_names": {
            1: "title-page",
            2: "thels-motto",
            3: "plate-3",
            4: "plate-4",
            5: "plate-5",
            6: "thel-and-the-clod",
            7: "plate-7",
            8: "plate-8",
        },
    },
    # Visions not available via LoC IIIF — keeping existing plates
    "america-a-prophecy": {
        "iiif_base": "service:rbc:rbc0001:2024:2024rosen1804",
        "expected_pages": 18,
        "plate_names": {
            1: "frontispiece",
            2: "title-page",
            3: "preludium-1",
            4: "preludium-2",
            5: "plate-5",
            6: "plate-6",
            7: "plate-7",
            8: "orcs-speech",
            9: "plate-9",
            10: "plate-10",
            11: "plate-11",
            12: "plate-12",
            13: "plate-13",
            14: "plate-14",
            15: "plate-15",
            16: "plate-16",
            17: "plate-17",
            18: "plate-18",
        },
    },
    "gates-of-paradise": {
        "iiif_base": "service:rbc:rbc0001:2003:2003rosen1813",
        "expected_pages": 18,
        "plate_names": {
            1: "frontispiece",
            2: "title-page",
            3: "i-found-him-beneath-a-tree",
            4: "water",
            5: "earth",
            6: "air",
            7: "fire",
            8: "plate-8",
            9: "plate-9",
            10: "plate-10",
            11: "plate-11",
            12: "plate-12",
            13: "plate-13",
            14: "aged-ignorance",
            15: "plate-15",
            16: "i-have-said-to-the-worm",
            17: "plate-17",
            18: "plate-18",
        },
    },
}


def probe_page_count(iiif_base):
    """Probe IIIF endpoint to find how many pages exist."""
    count = 0
    for i in range(1, 50):
        url = f"{IIIF_BASE}/{iiif_base}:{i:04d}/info.json"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            urllib.request.urlopen(req)
            count += 1
        except:
            break
    return count


def download_page(iiif_base, page_num, dest):
    """Download a full-resolution page image (IIIF 2.0: full/full)."""
    url = f"{IIIF_BASE}/{iiif_base}:{page_num:04d}/full/full/0/default.jpg"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        with open(dest, "wb") as f:
            f.write(resp.read())


def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <blake_root_dir>")
        sys.exit(1)

    blake_root = sys.argv[1]

    for book_slug, config in BOOKS.items():
        book_dir = os.path.join(blake_root, book_slug)
        os.makedirs(book_dir, exist_ok=True)

        iiif_base = config["iiif_base"]
        expected = config["expected_pages"]
        plate_names = config["plate_names"]

        print(f"\n{'='*60}")
        print(f"📖 {book_slug}")
        print(f"   IIIF: {iiif_base}")
        print(f"   Expected: {expected} plates")

        # Probe actual page count
        actual_count = probe_page_count(iiif_base)
        print(f"   Found: {actual_count} pages")

        if actual_count == 0:
            print(f"   ⚠️  No pages found! Skipping. Check IIIF base ID.")
            continue

        # Remove old .md wrapper files (if any) — we're using images-only pattern
        for f in os.listdir(book_dir):
            if f.endswith(".md") and f != f"{book_slug}.md":
                old_path = os.path.join(book_dir, f)
                os.remove(old_path)
                print(f"   Removed old .md wrapper: {f}")

        # Remove old images without numeric prefix
        for f in os.listdir(book_dir):
            if f.endswith(".jpg") and not f[:2].isdigit():
                old_path = os.path.join(book_dir, f)
                os.remove(old_path)
                print(f"   Removed old image: {f}")

        # Download pages
        downloaded = 0
        for page_num in range(1, actual_count + 1):
            name = plate_names.get(page_num, f"plate-{page_num}")
            filename = f"{page_num:02d}-{name}.jpg"
            dest = os.path.join(book_dir, filename)

            if os.path.exists(dest):
                size_mb = os.path.getsize(dest) / 1024 / 1024
                if size_mb > 0.1:  # Skip if already downloaded and non-trivial
                    print(f"   Already exists: {filename} ({size_mb:.1f} MB)")
                    downloaded += 1
                    continue

            print(f"   Downloading {filename} ...", end=" ", flush=True)
            try:
                download_page(iiif_base, page_num, dest)
                size_mb = os.path.getsize(dest) / 1024 / 1024
                print(f"({size_mb:.1f} MB)")
                downloaded += 1
                time.sleep(0.3)  # Rate limiting
            except Exception as e:
                print(f"ERROR: {e}")

        # Update index.md to use series and update cover
        index_md = os.path.join(book_dir, f"{book_slug}.md")
        if os.path.exists(index_md):
            content = open(index_md).read()
            if "series:" not in content:
                # Add series: true after children_style
                content = content.replace("children_style: grid", "children_style: grid\nseries: true")
            # Update cover to first plate with numeric prefix
            first_image = sorted(f for f in os.listdir(book_dir) if f.endswith(".jpg"))
            if first_image:
                import re
                content = re.sub(r"cover: .+\.jpg", f"cover: {first_image[0]}", content)
            open(index_md, "w").write(content)

        print(f"   ✅ {downloaded}/{actual_count} plates")

    print(f"\n{'='*60}")
    print("Done!")


if __name__ == "__main__":
    main()
