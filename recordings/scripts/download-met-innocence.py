#!/usr/bin/env python3
"""Download complete Songs of Innocence plates from Met Museum Copy Y (CC0).

Met API docs: https://metmuseum.github.io/
Copy Y accession numbers: 17.10.1 through 17.10.54
Songs of Innocence plates: 2-28 in the combined Songs of Innocence and Experience.
(Plate 1 is the combined title page, which belongs to the combined edition.)

Usage:
    python3 download-met-innocence.py <output_dir>
"""

import json
import os
import re
import sys
import time
import urllib.request

API_BASE = "https://collectionapi.metmuseum.org/public/collection/v1"

# Search for all Blake Songs of Innocence objects
SEARCH_URL = f"{API_BASE}/search?q=%22Songs+of+Innocence%22+blake&hasImages=true"

# Blake Archive plate ordering for Songs of Innocence (Copy Y plate numbers → poem names)
# Copy Y plate numbering from the combined Songs of Innocence and Experience:
# Plates 2-28 are Songs of Innocence
PLATE_NAMES = {
    2: "frontispiece",
    3: "title-page",
    4: "introduction",
    5: "the-shepherd",
    6: "the-ecchoing-green-1",
    7: "the-ecchoing-green-2",
    8: "the-lamb",
    9: "the-little-black-boy-1",
    10: "the-little-black-boy-2",
    11: "the-blossom",
    12: "the-chimney-sweeper",
    13: "the-little-boy-lost",
    14: "the-little-boy-found",
    15: "laughing-song",
    16: "a-cradle-song-1",
    17: "a-cradle-song-2",
    18: "the-divine-image",
    19: "holy-thursday",
    20: "night-1",
    21: "night-2",
    22: "spring-1",
    23: "spring-2",
    24: "nurses-song",
    25: "infant-joy",
    26: "a-dream",
    27: "on-anothers-sorrow-1",
    28: "on-anothers-sorrow-2",
}


def fetch_json(url):
    """Fetch JSON from URL with a small delay for rate limiting."""
    req = urllib.request.Request(url, headers={"User-Agent": "moss-blake-download/1.0"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())


def download_image(url, dest):
    """Download an image file."""
    req = urllib.request.Request(url, headers={"User-Agent": "moss-blake-download/1.0"})
    with urllib.request.urlopen(req) as resp:
        with open(dest, "wb") as f:
            f.write(resp.read())


def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_dir>")
        sys.exit(1)

    output_dir = sys.argv[1]
    os.makedirs(output_dir, exist_ok=True)

    # Step 1: Search for object IDs
    print("Searching Met API for Songs of Innocence...")
    search = fetch_json(SEARCH_URL)
    object_ids = search.get("objectIDs", [])
    print(f"Found {len(object_ids)} objects")

    # Step 2: Fetch each object's metadata
    plates = {}  # plate_number -> {title, image_url, accession}
    for i, oid in enumerate(object_ids):
        time.sleep(0.1)  # Rate limiting
        try:
            obj = fetch_json(f"{API_BASE}/objects/{oid}")
        except Exception as e:
            print(f"  Error fetching {oid}: {e}")
            continue

        accession = obj.get("accessionNumber", "")
        portfolio = obj.get("portfolio", "")
        title = obj.get("title", "")
        image_url = obj.get("primaryImage", "")

        # Filter to Copy Y (accession 17.10.*)
        if not accession.startswith("17.10."):
            continue

        # Extract plate number from portfolio field
        # Format: "Songs of Innocence and Experience (copy Y), plate 3"
        m = re.search(r"plate\s+(\d+)", portfolio)
        if not m:
            print(f"  Skipping {oid}: no plate number in '{portfolio}'")
            continue

        plate_num = int(m.group(1))

        # Only Innocence plates (2-28)
        if plate_num < 2 or plate_num > 28:
            continue

        if not image_url:
            print(f"  Skipping plate {plate_num}: no image URL")
            continue

        plates[plate_num] = {
            "title": title,
            "image_url": image_url,
            "accession": accession,
        }
        print(f"  [{i+1}/{len(object_ids)}] Plate {plate_num}: {title}")

    print(f"\nFound {len(plates)} Innocence plates out of {len(PLATE_NAMES)} expected")

    # Step 3: Download images with numeric prefix naming
    missing = []
    for plate_num in sorted(PLATE_NAMES.keys()):
        name = PLATE_NAMES[plate_num]
        idx = plate_num - 1  # 1-based plate → 0-based index for file naming
        filename = f"{idx:02d}-{name}.jpg"
        dest = os.path.join(output_dir, filename)

        if plate_num not in plates:
            print(f"  MISSING plate {plate_num} ({name})")
            missing.append(plate_num)
            continue

        if os.path.exists(dest):
            print(f"  Already exists: {filename}")
            continue

        info = plates[plate_num]
        print(f"  Downloading {filename} ...")
        try:
            download_image(info["image_url"], dest)
            time.sleep(0.2)
        except Exception as e:
            print(f"  ERROR downloading {filename}: {e}")
            missing.append(plate_num)

    if missing:
        print(f"\n⚠️  Missing {len(missing)} plates: {missing}")
    else:
        print(f"\n✅ All {len(PLATE_NAMES)} plates downloaded successfully!")

    # List what we got
    files = sorted(f for f in os.listdir(output_dir) if f.endswith(".jpg"))
    print(f"\nFiles in {output_dir}: {len(files)}")
    for f in files:
        size_mb = os.path.getsize(os.path.join(output_dir, f)) / 1024 / 1024
        print(f"  {f} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
