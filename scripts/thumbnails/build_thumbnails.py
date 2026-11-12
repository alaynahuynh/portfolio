"""
Build the animated Selected Works thumbnails.

Each clip is a list of segments. A segment is a still image or a slice of a
screen recording, with a slow eased camera move over it. Segments crossfade
into each other, and the last 0.6s fades back into the first frame, so the
loop is seamless. Output per clip:

    public/thumbnails/<project>/<project>-<wide|tall>.mp4          H.264, muted, loops
    public/thumbnails/<project>/<project>-<wide|tall>-poster.webp  first frame, full size

Run from the repo root:   python3 scripts/thumbnails/build_thumbnails.py [clip-or-project ...]
Needs Pillow (with WebP) + numpy, and ffmpeg with libx264.

The mymuseum-tall clip reads design-refs/mymuseum/recording-tall.mp4, a real
phone-sized session of the live app, and noodle-house-tall reads
design-refs/noodle-house/recording-tall.mp4; both are made by record-phone.mjs.

Camera keyframes are (time_s, zoom, cx, cy):
  zoom 1.0 = the source fills the panel (cover fit).
  cx, cy   = the point of the source (0-1) the camera centers on; the window
             is clamped to the source, so it never shows past an edge.

Every clip is checked before it's written: 6-9 s long, under 1.5 MB (the
CRF is raised until it fits), and any `keep` box (an element that must never
be cut off) stays at least `keep_px` from every edge in every frame.
"""

from __future__ import annotations

import json
import math
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional, Tuple

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
PUB = ROOT / "public"
IMG = PUB / "images/projects"
VID = PUB / "videos/projects"
REFS = ROOT / "design-refs"
OUT = PUB / "thumbnails"

FPS = 20
XF = 0.6  # crossfade length, seconds
MIN_S, MAX_S = 6.0, 9.0
MAX_BYTES = 1_500_000

WIDE = (1920, 1080)
TALL = (1080, 1920)

Box = Tuple[float, float, float, float]


@dataclass
class Seg:
    src: Path
    dur: float
    keys: List[Tuple[float, float, float, float]]
    # Recordings only: where in the clip to start reading.
    start: float = 0.0
    # Recordings only: seconds to play before freezing on that frame
    # (0 = a still frame; None = play the whole segment).
    play: Optional[float] = None
    # Optional pre-crop of the source, in source pixels (x0, y0, x1, y1).
    crop: Optional[Tuple[int, int, int, int]] = None
    # Optional effect, see EFFECTS, with its arguments.
    effect: Optional[str] = None
    args: dict = field(default_factory=dict)
    # Elements that must never be cut off: boxes in the coordinates of the
    # image the camera sees (after crop/effect), kept >= keep_px from edges.
    keep: List[Box] = field(default_factory=list)
    keep_px: int = 60
    # Touch ripples: (time_s, x, y) with x, y as 0-1 of the source.
    taps: List[Tuple[float, float, float]] = field(default_factory=list)
    # Desktop recordings: the mouse path and clicks, (time_s, x, y) with x, y
    # as 0-1 of the source; drawn as one arrow cursor with a click ripple.
    cursor: List[Tuple[float, float, float]] = field(default_factory=list)
    clicks: List[Tuple[float, float, float]] = field(default_factory=list)


@dataclass
class Clip:
    name: str  # e.g. "coursepilot-wide"
    project: str
    size: Tuple[int, int]
    segs: List[Seg]
    crf: int = 28  # x264 quality; lower = sharper and bigger
    fps: int = FPS
    max_s: float = MAX_S
    max_bytes: int = MAX_BYTES
    # Fade the tail back into frame 0. Off for recordings that already end
    # on their first frame, so they loop on a straight cut.
    loop_fade: bool = True


def recorded_mouse(path: Path):
    d = json.loads(path.read_text())
    pts = lambda key: [(p["t"], p["x"], p["y"]) for p in d.get(key, [])]  # noqa: E731
    return pts("cursor"), pts("clicks")


def recorded_taps(path: Path):
    return [(p["t"], p["x"], p["y"]) for p in json.loads(path.read_text())["taps"]]


MM_REC = REFS / "mymuseum/recording-tall.mp4"
NH_REC = REFS / "noodle-house/recording-tall.mp4"
NH_DESKTOP = REFS / "noodle-house/recording-wide.mp4"
NH_MOUSE = recorded_mouse(NH_DESKTOP.with_suffix(".json")) if NH_DESKTOP.exists() else ([], [])

# --------------------------------------------------------------------------
# Storyboards
# --------------------------------------------------------------------------

CLIPS = [
    # Landing headline over the live gallery, drift forward, then an avatar
    # walks up to a framed piece.
    Clip(
        "mymuseum-wide",
        "mymuseum",
        WIDE,
        [
            Seg(VID / "mymuseum/walkthrough.mp4", 4.8, [(0, 1.0, 0.5, 0.5), (4.8, 1.18, 0.5, 0.47)], start=0.0),
            # Zoomed so the on-screen "Controls" panel (top right) stays out of frame.
            Seg(VID / "mymuseum/final-walk.mp4", 4.6, [(0, 1.25, 0.43, 0.5), (4.6, 1.45, 0.47, 0.47)], start=0.4),
        ],
    ),
    # A real phone session of the live app (no zoom: the recording is already
    # a 9:16 phone screen): My Little World's grid -> scroll to the first
    # artwork -> tap View artwork -> tap Next -> crossfade back.
    Clip(
        "mymuseum-tall",
        "mymuseum",
        TALL,
        [
            Seg(
                MM_REC,
                8.4,
                [(0, 1.0, 0.5, 0.5)],
                taps=recorded_taps(MM_REC.with_suffix(".json")) if MM_REC.exists() else [],
            ),
        ],
    ),
    # coursepilot-wide is built by coursepilot_wide.py instead (clean,
    # cursor-free screens with one synthetic cursor).
    # Scrolling and ordering through the live site on desktop (~19 s, so it
    # runs longer than the 6-9 s clips, at 30 fps for smooth scrolling).
    Clip(
        "noodle-house-wide",
        "noodle-house",
        # 1600x900, not 1920x1080: 19 s of continuous scrolling is ~2.7 MB at
        # full size. The card shows it ~750 px wide, so 1600 is still sharp.
        (1600, 900),
        [
            # A real desktop session of the live site (record-phone.mjs
            # noodle-house-desktop): homepage scroll -> Order Online ->
            # Camillus -> "You're ordering from Camillus" -> Menu -> menu
            # scroll, with the recorded mouse drawn as one cursor.
            Seg(
                NH_DESKTOP,
                19.6,
                [(0, 1.0, 0.5, 0.5)],
                play=19.4,
                cursor=NH_MOUSE[0],
                clicks=NH_MOUSE[1],
            ),
        ],
        fps=30,
        max_s=20.0,
        # ~2.3x the length of the short clips, so a proportional budget.
        max_bytes=2_500_000,
    ),
    # A real phone session of the live site, no crossfades: hero -> tap Order
    # Online -> Locations -> scroll to Camillus -> tap Select Camillus (the
    # "You're ordering from" sheet slides up) -> Change location, then a
    # crossfade back to the hero.
    Clip(
        "noodle-house-tall",
        "noodle-house",
        TALL,
        [
            # Plays until the sheet has closed after Change location (the
            # logo tap is at ~6.2s), freezes there, and the loop fade
            # crossfades that frame back into the opening hero.
            Seg(
                NH_REC,
                7.5,
                [(0, 1.0, 0.5, 0.5)],
                play=6.1,
                taps=[tp for tp in recorded_taps(NH_REC.with_suffix(".json")) if tp[0] < 6.1]
                if NH_REC.exists()
                else [],
            ),
        ],
    ),
]


# --------------------------------------------------------------------------
# Rendering
# --------------------------------------------------------------------------


def ease(t: float) -> float:
    """Ease-in-out (sine), 0..1 -> 0..1."""
    t = min(max(t, 0.0), 1.0)
    return 0.5 - 0.5 * math.cos(math.pi * t)


def camera_at(keys, t):
    if t <= keys[0][0]:
        return keys[0][1:]
    for (t0, *a), (t1, *b) in zip(keys, keys[1:]):
        if t <= t1:
            k = ease((t - t0) / (t1 - t0)) if t1 > t0 else 1.0
            return tuple(x + (y - x) * k for x, y in zip(a, b))
    return keys[-1][1:]


class Source:
    """Random access to a still, or to a recording resampled at FPS."""

    def __init__(self, seg: Seg, tmp: Path):
        self.seg = seg
        self.cache = {}
        if seg.src.suffix.lower() in (".mp4", ".mov", ".webm"):
            if not seg.src.exists():
                sys.exit(f"missing recording: {seg.src}")
            d = tmp / f"{seg.src.stem}-{seg.start:.2f}"
            d.mkdir(parents=True, exist_ok=True)
            length = (seg.play if seg.play is not None else seg.dur) + 0.2
            subprocess.run(
                [
                    "ffmpeg", "-v", "error", "-y", "-ss", str(seg.start), "-i", str(seg.src),
                    "-t", f"{length:.2f}", "-vf", f"fps={FPS}", str(d / "f%04d.png"),
                ],
                check=True,
            )
            self.frames = sorted(d.glob("f*.png"))
            self.still = None
        else:
            self.frames = None
            self.still = self._prep(Image.open(seg.src))

    def _prep(self, im: Image.Image) -> Image.Image:
        im = im.convert("RGB")
        if self.seg.crop:
            im = im.crop(self.seg.crop)
        return im

    def at(self, t: float) -> Image.Image:
        if self.still is not None:
            return self.still
        if self.seg.play is not None:
            t = min(t, self.seg.play)
        i = min(int(round(t * FPS)), len(self.frames) - 1)
        if i not in self.cache:
            self.cache = {i: self._prep(Image.open(self.frames[i]))}
        return self.cache[i]


def window(src_size, size, zoom, cx, cy):
    """The source rectangle (x0, y0, w, h) the camera shows."""
    W, H = size
    sw, sh = src_size
    scale = max(W / sw, H / sh) * zoom
    ww, wh = W / scale, H / scale
    x0 = min(max(cx * sw - ww / 2, 0), sw - ww)
    y0 = min(max(cy * sh - wh / 2, 0), sh - wh)
    return x0, y0, ww, wh


def effect_sheet_up(im: Image.Image, t: float, seg: Seg) -> Image.Image:
    """The bottom-sheet screenshot is the end state; slide the sheet up from
    off-screen over a plain backdrop sampled from just above it."""
    a = np.asarray(im).copy()
    h = a.shape[0]
    top = int(h * 0.653)  # top edge of the sheet in mobile-bottom-sheet.png
    sheet = a[top:].copy()
    backdrop = a[top - 6 : top - 2].mean(axis=(0, 1)).astype(np.uint8)
    k = ease((t - 0.7) / 0.7)  # waits a beat, then slides in over 0.7s
    off = int(round((1 - k) * (h - top)))
    out = a
    out[top:] = backdrop
    if off < h - top:
        out[top + off :] = sheet[: h - top - off]
    return Image.fromarray(out)


_card_cache = {}


def effect_card(im: Image.Image, t: float, seg: Seg) -> Image.Image:
    """Center the (cropped) screenshot on a flat color canvas, with rounded
    corners and a soft shadow. Static, so it's built once."""
    key = id(seg)
    if key in _card_cache:
        return _card_cache[key]
    a = seg.args
    CW, CH = a["canvas"]
    w = a["width"]
    h = round(w * im.height / im.width)
    x0, y0 = (CW - w) // 2, (CH - h) // 2
    canvas = Image.new("RGB", (CW, CH), a["bg"])
    shadow = Image.new("L", (CW, CH), 0)
    ImageDraw.Draw(shadow).rounded_rectangle((x0, y0 + 14, x0 + w, y0 + h + 14), a["radius"], fill=70)
    shadow = shadow.filter(ImageFilter.GaussianBlur(26))
    canvas.paste(Image.new("RGB", (CW, CH), (40, 50, 70)), (0, 0), shadow)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), a["radius"], fill=255)
    canvas.paste(im.resize((w, h), Image.LANCZOS), (x0, y0), mask)
    _card_cache[key] = canvas
    return canvas


EFFECTS = {"sheet-up": effect_sheet_up, "card": effect_card}


def draw_taps(frame: Image.Image, seg: Seg, t: float, win, src_size) -> Image.Image:
    """Soft touch ripples, so a viewer can see where the phone was tapped."""
    live = [(t - tt, x, y) for tt, x, y in seg.taps if 0 <= t - tt < 0.55]
    if not live:
        return frame
    x0, y0, ww, wh = win
    W, H = frame.size
    over = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    for dt, x, y in live:
        k = dt / 0.55
        px = (x * src_size[0] - x0) / ww * W
        py = (y * src_size[1] - y0) / wh * H
        r = 34 + 40 * ease(k)
        fade = 1 - ease(k)
        d.ellipse((px - r, py - r, px + r, py + r), fill=(255, 255, 255, int(120 * fade)),
                  outline=(60, 50, 40, int(90 * fade)), width=3)
    return Image.alpha_composite(frame.convert("RGBA"), over).convert("RGB")


# Classic arrow cursor, tip at (0, 0), in output pixels at scale 1.
ARROW = [(0, 0), (0, 34), (8, 26.5), (13.5, 39), (19, 36.5), (13.5, 24.5), (24.5, 24.5)]


def path_at(points, t):
    """Linear interpolation of a recorded (t, x, y) path."""
    if not points or t <= points[0][0]:
        return points[0][1:] if points else None
    for (t0, *a), (t1, *b) in zip(points, points[1:]):
        if t <= t1:
            k = (t - t0) / (t1 - t0) if t1 > t0 else 1.0
            return tuple(x + (y - x) * k for x, y in zip(a, b))
    return points[-1][1:]


def draw_cursor(frame: Image.Image, seg: Seg, t: float, win, src_size) -> Image.Image:
    pos = path_at(seg.cursor, t)
    if pos is None:
        return frame
    x0, y0, ww, wh = win
    W, H = frame.size
    to_out = lambda fx, fy: ((fx * src_size[0] - x0) / ww * W, (fy * src_size[1] - y0) / wh * H)  # noqa: E731
    x, y = to_out(*pos)
    over = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    press = 1.0
    for ct, cx, cy in seg.clicks:
        dt = t - ct
        if -0.08 <= dt < 0.12:
            press = 0.82
        if 0 <= dt < 0.6:
            k = dt / 0.6
            px, py = to_out(cx, cy)
            r = 10 + 34 * ease(k)
            a = int(160 * (1 - k))
            d.ellipse((px - r, py - r, px + r, py + r), outline=(174, 90, 66, a), width=4)
            d.ellipse((px - r * 0.6, py - r * 0.6, px + r * 0.6, py + r * 0.6), fill=(174, 90, 66, a // 3))
    sc = 1.3 * press * W / 1920
    pts = [(x + px * sc, y + py * sc) for px, py in ARROW]
    sh = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).polygon([(px + 2, py + 3) for px, py in pts], fill=(0, 0, 0, 90))
    over = Image.alpha_composite(sh.filter(ImageFilter.GaussianBlur(3)), over)
    ImageDraw.Draw(over).polygon(pts, fill=(20, 20, 24, 255), outline=(255, 255, 255, 255), width=3)
    return Image.alpha_composite(frame.convert("RGBA"), over).convert("RGB")


def render_seg(seg: Seg, src: Source, size, t: float, problems=None, label="") -> Image.Image:
    im = src.at(t)
    if seg.effect:
        im = EFFECTS[seg.effect](im, t, seg)
    z, cx, cy = camera_at(seg.keys, t)
    win = window(im.size, size, z, cx, cy)
    x0, y0, ww, wh = win
    frame = im.resize(size, Image.LANCZOS, box=(x0, y0, x0 + ww, y0 + wh))
    if seg.taps:
        frame = draw_taps(frame, seg, t, win, im.size)
    if seg.cursor:
        rec_t = seg.start + (min(t, seg.play) if seg.play is not None else t)
        frame = draw_cursor(frame, seg, rec_t, win, im.size)
    if problems is not None:
        s = size[0] / ww
        for bx0, by0, bx1, by1 in seg.keep:
            m = min((bx0 - x0) * s, (by0 - y0) * s, (x0 + ww - bx1) * s, (y0 + wh - by1) * s)
            if m < seg.keep_px:
                problems.append(f"{label} t={t:.2f}s: box {(bx0, by0, bx1, by1)} only {m:.0f}px from an edge")
    return frame


def build(clip: Clip, tmp: Path):
    global FPS
    FPS = clip.fps
    sources = [Source(s, tmp) for s in clip.segs]
    # Segment start times on the output timeline (neighbours overlap by XF).
    starts, t = [], 0.0
    for s in clip.segs:
        starts.append(t)
        t += s.dur - XF
    total = t  # the final XF overlaps the return to frame 0
    if not clip.loop_fade:
        total += XF
    if not MIN_S <= total <= clip.max_s:
        sys.exit(f"{clip.name}: {total:.1f}s is outside {MIN_S}-{clip.max_s}s")
    n = int(round(total * FPS))

    fdir = tmp / clip.name
    fdir.mkdir()
    first = None
    problems: List[str] = []
    for i in range(n):
        tt = i / FPS
        live = [j for j, s0 in enumerate(starts) if s0 <= tt < s0 + clip.segs[j].dur]
        j = live[-1]
        im = render_seg(clip.segs[j], sources[j], clip.size, tt - starts[j], problems, f"seg{j}")
        if len(live) > 1:  # crossfade from the previous segment
            p = live[-2]
            prev = render_seg(clip.segs[p], sources[p], clip.size, tt - starts[p], problems, f"seg{p}")
            im = Image.blend(prev, im, (tt - starts[j]) / XF)
        if first is None:
            first = im
        # Loop: fade the tail back into the first frame.
        tail = tt - (total - XF)
        if tail > 0 and clip.loop_fade:
            im = Image.blend(im, first, ease((tail + 1 / FPS) / (XF + 1 / FPS)))
        im.save(fdir / f"{i:04d}.png")
    if problems:
        sys.exit(f"{clip.name}: elements too close to the edge:\n  " + "\n  ".join(problems[:8]))

    out_dir = OUT / clip.project
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"{clip.name}.mp4"
    poster = out_dir / f"{clip.name}-poster.webp"
    # The clip's first frame at full size (1920 or 1080 wide), taken before
    # video compression so it's identical but sharper.
    first.save(poster, "WEBP", quality=85, method=6)

    # H.264 MP4, not animated WebP: the slow zooms change every pixel every
    # frame, which animated WebP compresses badly. Raise the CRF until the
    # clip fits the size budget.
    crf = clip.crf
    while True:
        subprocess.run(
            [
                "ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", str(fdir / "%04d.png"),
                "-c:v", "libx264", "-crf", str(crf), "-preset", "veryslow", "-tune", "animation",
                "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(out),
            ],
            check=True,
        )
        if out.stat().st_size < clip.max_bytes or crf >= 34:
            break
        crf += 1
    if out.stat().st_size >= clip.max_bytes:
        sys.exit(f"{clip.name}: {out.stat().st_size / 1e6:.2f} MB even at CRF {crf}")
    print(
        f"{clip.name:20s} {n / FPS:4.1f}s {n:3d}f  crf {crf}  "
        f"{out.stat().st_size / 1e6:5.2f} MB  poster {first.size[0]}x{first.size[1]} "
        f"{poster.stat().st_size / 1e3:4.0f} KB"
    )


def main(names):
    tmp = Path(tempfile.mkdtemp(prefix="thumbs-"))
    try:
        for clip in CLIPS:
            if not names or clip.name in names or clip.project in names:
                build(clip, tmp)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main(sys.argv[1:])
