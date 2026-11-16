"""
Build the source image for the Jurnee Selected Works wide clip.

Jurnee is a phone app with no desktop screens, so the wide clip pans across
the whole flow instead: the six Figma screens in order (onboarding ->
Weekly Compass -> home -> mountain -> leaderboard -> profile), standing on
the case study's own backdrop (mist, a sun and two layers of lilac
mountains, same as the hero on /projects/jurnee). build_thumbnails.py's
"jurnee-wide" clip then moves a camera across this strip.

Writes design-refs/jurnee/flow-strip.png.

Run from the repo root:  python3 scripts/thumbnails/jurnee_strip.py
Needs Pillow.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SCREENS = ROOT / "public/images/projects/jurnee"
OUT = ROOT / "design-refs/jurnee/flow-strip.png"

ORDER = ["onboarding", "compass", "home", "ascent", "leaderboard", "profile"]

H = 1500  # strip height; the clip's camera shows the full height
SCREEN_H = 1110  # each screen (1170x2532 source, rounded corners baked in)
GAP = 112
MARGIN = 450
STAGGER = 34  # every other screen sits a little lower, like the hero

MIST = (247, 244, 251)
LILAC = (219, 211, 240)
LILAC_DEEP = (201, 189, 234)
SUN = (248, 232, 182)
SHADOW = (60, 42, 122)

# The hero's mountain silhouettes (viewBox 0 0 1456 300), see Mountains in
# src/app/projects/jurnee/page.tsx.
BACK = [(0, 180), (197, 60), (355, 172), (546, 0), (742, 180), (895, 84), (1076, 202), (1251, 46), (1456, 166)]
FRONT = [(0, 242), (227, 136), (424, 242), (651, 106), (864, 249), (1076, 144), (1288, 242), (1456, 196)]


def mountains(d: ImageDraw.ImageDraw, width: int, top: int, height: int, pts, color):
    """Tile one silhouette across the strip, scaled to `height`."""
    tile = round(1456 * height / 300 * 1.25)
    x = 0
    while x < width:
        poly = [(x + px / 1456 * tile, top + py / 300 * height) for px, py in pts]
        poly += [(x + tile, top + height), (x, top + height)]
        d.polygon(poly, fill=color)
        x += tile


def main():
    sw = round(SCREEN_H * 1170 / 2532)
    width = 2 * MARGIN + len(ORDER) * sw + (len(ORDER) - 1) * GAP
    strip = Image.new("RGB", (width, H), MIST)
    d = ImageDraw.Draw(strip)

    # Sun and a big lilac circle, as in the hero.
    d.ellipse((MARGIN - 300, 150, MARGIN - 60, 390), fill=SUN)
    d.ellipse((width - 900, -520, width + 200, 580), fill=LILAC)

    m_h = round(H * 0.38)
    mountains(d, width, H - m_h, m_h, BACK, LILAC)
    mountains(d, width, H - m_h, m_h, FRONT, LILAC_DEEP)

    top = (H - SCREEN_H) // 2
    shadow = Image.new("L", (width, H), 0)
    sd = ImageDraw.Draw(shadow)
    screens = []
    for i, name in enumerate(ORDER):
        im = Image.open(SCREENS / f"{name}@3x.webp").convert("RGBA").resize((sw, SCREEN_H), Image.LANCZOS)
        x = MARGIN + i * (sw + GAP)
        y = top + (STAGGER if i % 2 else -STAGGER)
        screens.append((im, x, y))
        sd.rounded_rectangle((x, y + 26, x + sw, y + SCREEN_H + 26), 60, fill=64)
    shadow = shadow.filter(ImageFilter.GaussianBlur(34))
    strip.paste(Image.new("RGB", strip.size, SHADOW), (0, 0), shadow)
    for im, x, y in screens:
        strip.paste(im, (x, y), im)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    strip.save(OUT)
    print(f"{OUT.relative_to(ROOT)}  {width}x{H}  screen {sw}x{SCREEN_H}")


if __name__ == "__main__":
    main()
