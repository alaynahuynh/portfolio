"""
Build the sources for the Nudge Selected Works wide clip: two phone screens
(today's nudge on home, and the trip plan) with Heartie, the mascot,
standing beside them.

Writes, into design-refs/nudge/:
  scene.png    1920x1080 backdrop (the hero's mist + lavender, pink, mint
               and yellow circles, a few sparkles) with the phones placed
  heartie.png  Heartie cut out of the pitch deck's title slide (RGBA)
  scene.json   where build_thumbnails.py's "mascot" effect puts Heartie
               (center, height, floor line for its shadow)

The clip itself keeps the camera still; the only motion is Heartie
floating, swaying and beating (see effect_mascot).

Run from the repo root:  python3 scripts/thumbnails/nudge_scene.py
Needs Pillow + numpy.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "public/images/projects/nudge"
OUT = ROOT / "design-refs/nudge"

W, H = 1920, 1080
MIST = (241, 239, 249)
LAVENDER = (224, 219, 249)
PINK = (246, 211, 238)
MINT = (214, 238, 232)
BUTTER = (248, 232, 182)
SHADOW = (60, 50, 120)

PHONE_H = 900
# (screen, center x, vertical offset): the trip plan sits a little lower,
# like the hero's staggered phones.
PHONES = [("home", 470, -22), ("trip", 950, 22)]
HEART_CX, HEART_CY, HEART_H = 1500, 470, 340
FLOOR_Y = 735


def cut_heartie() -> Image.Image:
    """Heartie from the deck title slide: flood the flat lavender around it
    from the crop's corners; everything left is the heart."""
    deck = Image.open(SRC / "deck-title.jpg").convert("RGB")
    crop = deck.crop((1384, 340, 1736, 682))  # pink bbox 1396-1723 x 352-671, padded
    marked = crop.copy()
    for corner in [(0, 0), (crop.width - 1, 0), (0, crop.height - 1), (crop.width - 1, crop.height - 1)]:
        ImageDraw.floodfill(marked, corner, (0, 255, 0), thresh=34)
    keep = (np.asarray(marked) != (0, 255, 0)).any(axis=2)
    alpha = Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.9))
    heart = crop.convert("RGBA")
    heart.putalpha(alpha)
    heart = heart.crop(heart.getbbox())
    scale = HEART_H / heart.height
    return heart.resize((round(heart.width * scale), HEART_H), Image.LANCZOS)


def sparkle(d: ImageDraw.ImageDraw, x, y, r, color):
    """A four-point star, like the deck's."""
    k = r * 0.22
    d.polygon([(x, y - r), (x + k, y - k), (x + r, y), (x + k, y + k), (x, y + r), (x - k, y + k), (x - r, y), (x - k, y - k)], fill=color)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    scene = Image.new("RGB", (W, H), MIST)
    d = ImageDraw.Draw(scene)
    d.ellipse((-260, H - 330, 330, H + 260), fill=PINK)
    d.ellipse((W - 230, -170, W + 210, 260), fill=MINT)
    d.ellipse((HEART_CX - 370, HEART_CY - 350, HEART_CX + 370, HEART_CY + 400), fill=LAVENDER)
    d.ellipse((1180, H - 110, 1440, H + 150), fill=BUTTER)
    sparkle(d, 1790, 220, 24, (243, 194, 60))
    sparkle(d, 1830, 700, 18, (243, 194, 60))
    sparkle(d, 1230, 170, 15, (180, 168, 240))
    sparkle(d, 130, 160, 14, (255, 140, 210))

    shadow = Image.new("L", (W, H), 0)
    placed = []
    for name, cx, dy in PHONES:
        phone = Image.open(SRC / f"phone-{name}.png").convert("RGBA")
        pw = round(PHONE_H * phone.width / phone.height)
        phone = phone.resize((pw, PHONE_H), Image.LANCZOS)
        px, py = cx - pw // 2, (H - PHONE_H) // 2 + dy
        ImageDraw.Draw(shadow).rounded_rectangle((px, py + 26, px + pw, py + PHONE_H + 26), 60, fill=64)
        placed.append((phone, px, py))
    scene.paste(Image.new("RGB", (W, H), SHADOW), (0, 0), shadow.filter(ImageFilter.GaussianBlur(34)))
    for phone, px, py in placed:
        scene.paste(phone, (px, py), phone)

    cut_heartie().save(OUT / "heartie.png")
    scene.save(OUT / "scene.png")
    (OUT / "scene.json").write_text(
        json.dumps({"cx": HEART_CX, "cy": HEART_CY, "h": HEART_H, "floor": FLOOR_Y}, indent=2)
    )
    print(f"design-refs/nudge: scene.png {W}x{H}, heartie.png, scene.json")


if __name__ == "__main__":
    main()
