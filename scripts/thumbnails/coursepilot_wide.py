"""
Build the CoursePilot Selected Works clip (coursepilot-wide.mp4 + poster).

Unlike the other clips, this one isn't cut from the screen recording
directly, because the recording has its own cursor baked in. Instead:

1. Clean screens: for each app state (prompt, answer, Adjust Plan modal,
   Add to Calendar modal, answer + "Plan added" toast) take the per-pixel
   median of the recording frames where that state is on screen. The
   recorded cursor keeps moving, so the median erases it.
2. Framing: a 16:9 crop of the app (Canvas nav strip, header and input bar
   trimmed in the gaps between UI) fills the clip. A camera then follows
   the cursor toward each button and, after each click, pushes in on what
   it opened, never past the point where that thing is fully in frame.
3. One synthetic cursor that glides between the real click targets, with a
   small press + ripple on each click; each screen holds 2-3 s after its
   click so it can be read.
4. Loop: the last screen fades to the background color and the first
   screen fades back in, so two screens never overlap; the last frame
   equals the first frame, which is also the poster.

Run from the repo root:  python3 scripts/thumbnails/coursepilot_wide.py
Needs Pillow + numpy and ffmpeg with libx264.
"""

from __future__ import annotations

import math
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
REC = ROOT / "public/videos/projects/coursepilot/starttoend.mp4"  # 2000x1422, 30 fps
OUT = ROOT / "public/thumbnails/coursepilot"
NAME = "coursepilot-wide"

W, H = 1920, 1080
FPS = 30
BG = (0xDC, 0xE4, 0xF0)  # card color
SRC_W, SRC_H = 2000, 1422
# Main chat panel, trimmed in UI gaps: left of it is the sidebar border,
# above it the "Welcome back" header, below it the prompt chips/input bar.
PANEL_H = H  # the app fills the frame
MAX_BYTES = 1_500_000

# App states: (name, start_s, end_s) of the recording where it's static.
STATES = {
    "prompt": (4.8, 5.8),  # question typed in the box, before send
    "answer": (7.6, 9.0),  # the plan
    "adjust": (11.7, 12.7),  # Adjust your plan modal
    "calendar": (15.9, 16.7),  # Add plan to calendar, Google Calendar picked
    "toast": (17.3, 18.6),  # plan + "Plan added to your calendar"
}


def ease(t: float) -> float:
    t = min(max(t, 0.0), 1.0)
    return 0.5 - 0.5 * math.cos(math.pi * t)


def clean_states(tmp: Path) -> dict:
    out = {}
    for name, (a, b) in STATES.items():
        d = tmp / name
        d.mkdir()
        subprocess.run(
            ["ffmpeg", "-v", "error", "-ss", str(a), "-i", str(REC), "-t", f"{b - a:.2f}", str(d / "f%03d.png")],
            check=True,
        )
        stack = np.stack([np.asarray(Image.open(f).convert("RGB")) for f in sorted(d.glob("*.png"))])
        out[name] = Image.fromarray(np.median(stack, axis=0).astype(np.uint8))
    return out


# Main chat panel, re-stated with the measured crop (see module docstring).
# Exactly 16:9, so the app fills the whole clip (no margins): from the
# CoursePilot sidebar (Canvas's nav strip trimmed) to the recording's right
# edge (the toast fits), and from just under the "Welcome back" header to
# just above the input bar. Every edge sits in a gap between UI.
CROP = (130, 210, 2000, 1262)
SCALE = PANEL_H / (CROP[3] - CROP[1])
PANEL_W = W
PX0, PY0 = (W - PANEL_W) // 2, (H - PANEL_H) // 2

# Click targets, in recording pixels (measured on the clean states).
START = (1560, 690)  # resting in the gap above the prompt chips
SEND = (1776, 848)
ADJUST = (1025, 1008)  # "Adjust Plan"
UPDATE = (1232, 935)  # "Update Plan"
ADD_CAL = (775, 1008)  # "Add to My Calendar"
ADD_PLAN = (1147, 998)  # "Add Plan"
REST = (1330, 905)  # drifts off the button while the toast shows

# Timeline (seconds). Screens: (state, from, to); neighbours overlap by a
# 0.3 s crossfade, which in the app is the modal/answer appearing.
XF = 0.3
SCREENS = [
    ("prompt", 0.0, 2.0),
    ("answer", 1.7, 5.0),
    ("adjust", 4.7, 7.7),
    ("answer", 7.4, 9.2),
    ("calendar", 8.9, 11.8),
    ("toast", 11.5, 14.0),
]
END = 14.8  # 14.0-14.4 fade to the card color, 14.4-14.8 fade the prompt back
# Cursor path: (t, point) keyframes, eased between; clicks at these times.
PATH = [
    (0.0, START), (0.4, START), (1.3, SEND),
    (3.6, SEND), (4.4, ADJUST),
    (6.2, ADJUST), (7.0, UPDATE),
    (7.8, UPDATE), (8.6, ADD_CAL),
    (10.4, ADD_CAL), (11.2, ADD_PLAN),
    (12.0, ADD_PLAN), (12.9, REST),
    (14.39, REST), (14.4, START), (END, START),
]
CLICKS = [1.5, 4.6, 7.3, 8.8, 11.4]

# Camera: (t, zoom, cx, cy). zoom 1 = the whole CROP; (cx, cy) in recording
# pixels. After each click it pushes in on what the click opened, but never
# past the point where that thing is fully in frame; before a click it
# follows the cursor toward the button. Starts and ends at the full view.
BASE = (1.0, (CROP[0] + CROP[2]) / 2, (CROP[1] + CROP[3]) / 2)
CAMERA = [
    (0.0, *BASE), (0.3, *BASE),
    (1.1, 1.35, 1250, 726),  # the typed question + send
    (1.6, 1.35, 1250, 726),
    (2.4, 1.31, 1150, 795),  # the whole plan card
    (3.5, 1.31, 1150, 795),
    (4.3, 1.7, 1150, 950),  # in on the schedule + Adjust Plan (card fully wide)
    (4.75, 1.7, 1150, 950),
    (5.4, 1.64, 1006, 694),  # the whole Adjust your plan modal
    (7.35, 1.64, 1006, 694),
    (8.0, 1.7, 1150, 950),  # back on the plan, toward Add to My Calendar
    (8.9, 1.7, 1150, 950),
    (9.5, 1.5, 1006, 728),  # the whole Add plan to calendar modal
    (11.5, 1.5, 1006, 728),
    (12.2, 1.25, 1252, 841),  # the whole plan card + "Plan added" toast
    (14.39, 1.25, 1252, 841),
    (14.4, *BASE), (END, *BASE),
]


def camera_at(t):
    for (t0, *a), (t1, *b) in zip(CAMERA, CAMERA[1:]):
        if t <= t1:
            k = ease((t - t0) / (t1 - t0)) if t1 > t0 else 1.0
            return tuple(x + (y - x) * k for x, y in zip(a, b))
    return tuple(CAMERA[-1][1:])


def window(cam):
    """Recording-pixel rectangle (x0, y0, w, h) the camera shows, kept
    inside CROP."""
    z, cx, cy = cam
    w, h = (CROP[2] - CROP[0]) / z, (CROP[3] - CROP[1]) / z
    x0 = min(max(cx - w / 2, CROP[0]), CROP[2] - w)
    y0 = min(max(cy - h / 2, CROP[1]), CROP[3] - h)
    return x0, y0, w, h


def to_out(pt, cam):
    x0, y0, w, h = window(cam)
    return ((pt[0] - x0) * W / w, (pt[1] - y0) * H / h)


def cursor_at(t):
    for (t0, a), (t1, b) in zip(PATH, PATH[1:]):
        if t <= t1:
            k = ease((t - t0) / (t1 - t0)) if t1 > t0 else 1.0
            return (a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k)
    return PATH[-1][1]


def view(state_img, cam):
    """What the camera sees of a screen, filling the frame (the card rounds
    the corners). Sampled straight from the recording for sharpness."""
    x0, y0, w, h = window(cam)
    return state_img.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + w, y0 + h))


# Classic arrow cursor, tip at (0, 0), in output pixels.
ARROW = [(0, 0), (0, 34), (8, 26.5), (13.5, 39), (19, 36.5), (13.5, 24.5), (24.5, 24.5)]
CURSOR_SCALE = 1.35


def draw_cursor(frame, t):
    cam = camera_at(t)
    x, y = to_out(cursor_at(t), cam)
    over = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    press = 1.0
    for c in CLICKS:
        dt = t - c
        if -0.08 <= dt < 0.12:
            press = 0.82
        if 0 <= dt < 0.6:  # ripple where it clicked
            k = dt / 0.6
            cx, cy = to_out(cursor_at(c), cam)
            r = 10 + 34 * ease(k)
            a = int(150 * (1 - k))
            d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(113, 59, 255, a), width=4)
            d.ellipse((cx - r * 0.6, cy - r * 0.6, cx + r * 0.6, cy + r * 0.6), fill=(113, 59, 255, a // 3))
    s = CURSOR_SCALE * press
    pts = [(x + px * s, y + py * s) for px, py in ARROW]
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).polygon([(px + 2, py + 3) for px, py in pts], fill=(0, 0, 0, 90))
    over = Image.alpha_composite(sh.filter(ImageFilter.GaussianBlur(3)), over)
    d = ImageDraw.Draw(over)
    d.polygon(pts, fill=(20, 20, 24, 255), outline=(255, 255, 255, 255), width=3)
    return Image.alpha_composite(frame.convert("RGBA"), over).convert("RGB")


def toast_on_answer(states):
    """The prototype leaves the modal's dim overlay up while the toast shows;
    paste the (undimmed, white) toast onto the clean answer screen instead."""
    toast = np.asarray(states["toast"]).astype(int)
    region = toast[1100:1300, 1400:2000].min(axis=2) > 235  # white toast pixels
    ys, xs = np.nonzero(region)
    box = (1400 + xs.min() - 2, 1100 + ys.min() - 2, 1400 + xs.max() + 3, 1100 + ys.max() + 3)
    out = states["answer"].copy()
    out.paste(states["toast"].crop(box), box[:2])
    return out


def render(states, tmp: Path):
    states = {**states, "toast": toast_on_answer(states)}
    bg = Image.new("RGB", (W, H), BG)
    n = round(END * FPS)
    fdir = tmp / "frames"
    fdir.mkdir()
    first = None
    for i in range(n):
        t = i / FPS
        cam = camera_at(t)
        live = [(k, a, b) for k, a, b in SCREENS if a <= t < b]
        if not live:  # loop transition: through the card color
            if t < 14.4:
                im = Image.blend(view(states["toast"], cam), bg, ease((t - 14.0) / 0.4))
            else:
                k = 1.0 if i == n - 1 else ease((t - 14.4) / (0.4 - 1 / FPS))
                im = Image.blend(bg, view(states["prompt"], cam), k)
        elif len(live) == 2:
            (k0, _, _), (k1, a1, _) = live
            im = Image.blend(view(states[k0], cam), view(states[k1], cam), ease((t - a1) / XF))
        else:
            im = view(states[live[0][0]], cam)
        im = draw_cursor(im, t)
        if first is None:
            first = im
        im.save(fdir / f"{i:04d}.png")
    return first, n


def main():
    tmp = Path(tempfile.mkdtemp(prefix="cp-"))
    try:
        first, n = render(clean_states(tmp), tmp)
        OUT.mkdir(parents=True, exist_ok=True)
        out, poster = OUT / f"{NAME}.mp4", OUT / f"{NAME}-poster.webp"
        first.save(poster, "WEBP", quality=88, method=6)  # = frame 0, full size
        crf = 26
        while True:
            subprocess.run(
                ["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", str(tmp / "frames/%04d.png"),
                 "-c:v", "libx264", "-crf", str(crf), "-preset", "veryslow", "-tune", "animation",
                 "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(out)],
                check=True,
            )
            if out.stat().st_size < MAX_BYTES or crf >= 34:
                break
            crf += 1
        print(f"{NAME}: {n / FPS:.1f}s {n}f crf {crf} {out.stat().st_size / 1e6:.2f} MB, poster {first.size}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__" and "--states" in sys.argv:
    tmp = Path(tempfile.mkdtemp())
    dest = Path(sys.argv[sys.argv.index("--states") + 1])
    for k, im in clean_states(tmp).items():
        im.save(dest / f"state-{k}.png")
    shutil.rmtree(tmp)
elif __name__ == "__main__":
    main()
