#!/usr/bin/env python3
"""Download Bada Shanren works from Wikimedia Commons with throttling.

Usage:
    python3 download-wikimedia-bada.py <output_dir>
"""

import json
import os
import sys
import time
import urllib.request
import urllib.parse

API = "https://commons.wikimedia.org/w/api.php"
THROTTLE = 3  # seconds between requests

# Works to download: (output_filename, wikimedia_file_title, max_width_or_0_for_original)
DOWNLOADS = [
    # === Painting replacements (higher-res) ===
    ("荷花水鳥圖.jpg", "File:朱耷荷石水鸟图轴.png", 2000),

    # === New paintings ===
    ("枯木寒鴉圖.jpg", "File:朱耷枯木寒鸦图轴.png", 2000),
    ("楊柳浴禽圖.jpg", "File:朱耷杨柳浴禽图轴.png", 2000),
    ("古梅圖.jpg", "File:朱耷古梅图轴.jpg", 0),
    ("秋林獨釣圖.jpg", "File:朱耷秋林独钓图轴.jpg", 0),
    ("梅花軸.jpg", "File:朱耷梅花轴.png", 2000),
    ("墨荷軸.jpg", "File:朱耷墨荷轴.png", 2000),
    ("魚鴨圖卷.jpg", "File:朱耷 鱼鸭图卷.jpg", 0),
    ("花卉卷.jpg", "File:朱耷花卉卷.png", 4000),
    ("蔬果卷.jpg", "File:朱耷蔬果卷.png", 4000),
    ("山水軸.jpg", "File:朱耷山水轴.png", 2000),
    ("山水軸-1.jpg", "File:朱耷山水轴1.png", 2000),

    # === New calligraphy ===
    ("行書琵琶行卷.jpg", "File:朱耷行书琵琶行卷.png", 4000),
    ("草書五言排律.jpg", "File:八大山人 草书五言排律.tif", 3000),
]


def get_image_url(file_title, max_width=0):
    """Get download URL from Wikimedia API, optionally requesting a thumbnail."""
    titles = urllib.parse.quote(file_title)
    if max_width > 0:
        url = f"{API}?action=query&titles={titles}&prop=imageinfo&iiprop=url|size&iiurlwidth={max_width}&format=json"
    else:
        url = f"{API}?action=query&titles={titles}&prop=imageinfo&iiprop=url|size&format=json"

    req = urllib.request.Request(url, headers={"User-Agent": "moss-bada-download/1.0 (research project)"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode())

    pages = data.get("query", {}).get("pages", {})
    for pid, page in pages.items():
        ii = page.get("imageinfo", [{}])[0]
        if max_width > 0:
            return ii.get("thumburl", ii.get("url", "")), ii.get("thumbwidth", 0), ii.get("thumbheight", 0)
        else:
            return ii.get("url", ""), ii.get("width", 0), ii.get("height", 0)
    return "", 0, 0


def download_file(url, dest):
    """Download a file with proper headers."""
    req = urllib.request.Request(url, headers={"User-Agent": "moss-bada-download/1.0 (research project)"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        with open(dest, "wb") as f:
            f.write(resp.read())


def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_dir>")
        sys.exit(1)

    output_dir = sys.argv[1]
    os.makedirs(output_dir, exist_ok=True)

    success = 0
    failed = []

    for filename, wiki_title, max_width in DOWNLOADS:
        dest = os.path.join(output_dir, filename)
        if os.path.exists(dest) and os.path.getsize(dest) > 10000:
            print(f"  SKIP (exists): {filename}")
            success += 1
            continue

        print(f"\n  Fetching URL for: {wiki_title}")
        try:
            url, w, h = get_image_url(wiki_title, max_width)
            if not url:
                print(f"  ERROR: No URL found")
                failed.append(filename)
                continue

            print(f"  Downloading {w}x{h} -> {filename} ...")
            time.sleep(THROTTLE)
            download_file(url, dest)

            size_kb = os.path.getsize(dest) // 1024
            print(f"  OK: {size_kb} KB")
            success += 1
        except Exception as e:
            print(f"  ERROR: {e}")
            failed.append(filename)
            # Remove failed partial downloads
            if os.path.exists(dest):
                os.remove(dest)

        time.sleep(THROTTLE)

    print(f"\n=== Done: {success} downloaded, {len(failed)} failed ===")
    if failed:
        print(f"Failed: {', '.join(failed)}")


if __name__ == "__main__":
    main()
