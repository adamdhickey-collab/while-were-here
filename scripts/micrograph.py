#!/usr/bin/env python3
"""Draw a micrograph plate — dark ground, luminous subject, instrument light.

    ./.venv/bin/python scripts/micrograph.py <preset> [--size 2000] [--seed N] [--out PATH]
    ./.venv/bin/python scripts/micrograph.py --list

The MICROGRAPH role (content/plan/asset-system.md) is the book's peak material:
stages III and IV only, dark ground, luminous subject, type reversed out, scale
bar set by the layout. These three plates are drawn rather than generated, for
the same reasons as scripts/survey.py — press resolution, the book's own hues,
and a recipe the manifest can record.

They are also honest about what they are. The book's recorded decision is that
plates may invent their records — visual fiction the reader is invited to enjoy
— and a drawn micrograph sits squarely inside that: it is an illustration in
the register of an SEM plate, not a claim of instrument time.

The three subjects were chosen because each is a texture, not a scene, which is
what makes them drawable:

  graphite — flat crystalline flakes shorn off a pencil line, stacked across
             the tooth of the paper
  die      — rectilinear metal traces of a silicon die in stacked layers,
             vias stitching between them
  tape     — needle-shaped oxide particles in a binder, combed into one
             direction by the coating process, a few crossing it

The common optics do the persuading: a single focal band with real falloff
either side of it, one restrained false-colour hue per plate, edge-lit relief,
a breath of sensor grain, and a dark field that is never pure black.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent

# One hue per plate, from the dark stages' own accents.
HUES = {
    'graphite': (0xC8, 0x8A, 0x3C),   # amber — stage III
    'die':      (0x9A, 0x8C, 0xC8),   # lavender — stage IV
    'tape':     (0x9C, 0x5A, 0x7E),   # magenta — stage IV
}

PRESETS = {
    'graphite': dict(note='a pencil line at the scale where it becomes a deposit'),
    'die':      dict(note='the machinery, at the scale nobody looks at it'),
    'tape':     dict(note='the physical thing a voice was stored in'),
}


def rot_rect(dr, cx, cy, w, h, ang, fill):
    a = np.radians(ang)
    ca, sa = np.cos(a), np.sin(a)
    pts = [(cx + x * ca - y * sa, cy + x * sa + y * ca)
           for x, y in ((-w/2, -h/2), (w/2, -h/2), (w/2, h/2), (-w/2, h/2))]
    dr.polygon(pts, fill=fill)


def draw_graphite(size, rng):
    """Overlapping angular flakes, brightest where an edge catches the light."""
    # Bodies and shear edges on separate layers, composited once at the end.
    # The first version reassigned `layer` inside the loop while `dr` still
    # pointed at the abandoned image, so the flake bodies vanished and the
    # plate came out as sticks.
    bodies = Image.new('L', (size, size), 0)
    edges = Image.new('L', (size, size), 0)
    db, de = ImageDraw.Draw(bodies), ImageDraw.Draw(edges)
    for i in range(150):
        cx, cy = rng.uniform(0.05, 0.95, 2) * size
        w = rng.uniform(0.08, 0.26) * size
        h = w * rng.uniform(0.6, 0.95)
        ang = rng.uniform(0, 180)
        base = int(rng.uniform(70, 155))
        rot_rect(db, cx, cy, w, h, ang, base)
        # a brighter facet on some flakes, where the shear caught the light —
        # on every flake it reads as straws scattered over the plates
        if rng.random() < 0.4:
            rot_rect(de, cx + w * 0.06, cy - h * 0.32, w * 0.7, max(2, h * 0.07),
                     ang, min(230, int(base * 1.45)))
    a = np.maximum(np.asarray(bodies, dtype=np.float32),
                   np.asarray(edges, dtype=np.float32) * 0.9) / 255.0
    # paper tooth beneath the flakes
    tooth = ndimage.gaussian_filter(rng.random((size, size)).astype(np.float32), size / 300) * 0.16
    return np.clip(a * 0.9 + tooth, 0, 1)


def draw_die(size, rng):
    """Rectilinear traces in two metal layers, vias stitching between them."""
    img = np.zeros((size, size), dtype=np.float32)
    for depth, (n, wmin, wmax, bright) in enumerate([(60, 0.004, 0.010, 0.45),
                                                     (34, 0.008, 0.018, 0.95)]):
        layer = Image.new('L', (size, size), 0)
        dr = ImageDraw.Draw(layer)
        for _ in range(n):
            w = int(rng.uniform(wmin, wmax) * size)
            horiz = rng.random() < 0.5
            pos = int(rng.uniform(0.04, 0.96) * size)
            a, b = sorted(rng.uniform(0.02, 0.98, 2))
            a, b = int(a * size), int(b * size)
            v = int(255 * bright * rng.uniform(0.75, 1.0))
            if horiz:
                dr.rectangle([a, pos, b, pos + w], fill=v)
                if rng.random() < 0.7:   # an elbow
                    dr.rectangle([b - w, pos, b, pos + int(rng.uniform(0.05, 0.18) * size)], fill=v)
            else:
                dr.rectangle([pos, a, pos + w, b], fill=v)
                if rng.random() < 0.7:
                    dr.rectangle([pos, b - w, pos + int(rng.uniform(0.05, 0.18) * size), b], fill=v)
        arr = np.asarray(layer, dtype=np.float32) / 255.0
        # the deeper layer sits lower and softer
        img = np.maximum(img, ndimage.gaussian_filter(arr, size / (3200 if depth else 1100)))
    # vias
    via = Image.new('L', (size, size), 0)
    dv = ImageDraw.Draw(via)
    r = max(2, size // 340)
    for _ in range(120):
        x, y = rng.uniform(0.04, 0.96, 2) * size
        dv.ellipse([x - r, y - r, x + r, y + r], outline=230, width=max(1, r // 2))
    img = np.maximum(img, np.asarray(via, dtype=np.float32) / 255.0)
    # the substrate: a faint rectilinear grain so the traces sit ON something
    sub = ndimage.gaussian_filter(rng.random((size, size // 24)).astype(np.float32), 1.2)
    sub = np.asarray(Image.fromarray((sub * 255).astype(np.uint8)).resize((size, size), Image.NEAREST),
                     dtype=np.float32) / 255.0
    dust = ndimage.gaussian_filter(rng.random((size, size)).astype(np.float32), size / 800)
    return np.clip(img + sub * 0.10 + (dust - 0.5) * 0.05, 0, 1)


def draw_tape(size, rng):
    """Thousands of needle particles, combed mostly one way."""
    layer = Image.new('L', (size, size), 0)
    dr = ImageDraw.Draw(layer)
    comb = rng.uniform(0, 180)
    for _ in range(3800):
        cx, cy = rng.uniform(0, 1, 2) * size
        ln = rng.uniform(0.015, 0.05) * size
        wd = max(1, int(ln * rng.uniform(0.10, 0.18)))
        crossing = rng.random() < 0.06
        ang = rng.uniform(0, 180) if crossing else rng.normal(comb, 9)
        v = int(rng.uniform(95, 230) * (1.15 if crossing else 1.0))
        rot_rect(dr, cx, cy, ln, wd, ang, min(v, 255))
    a = np.asarray(layer, dtype=np.float32) / 255.0
    binder = ndimage.gaussian_filter(rng.random((size, size)).astype(np.float32), size / 200) * 0.12
    return np.clip(a * 0.92 + binder, 0, 1)


def finish(mono, hue, size, rng):
    """The instrument look: focal band, false colour, vignette, grain."""
    # focal plane: sharp band across the frame, blurring away above and below
    y = np.linspace(-1, 1, size)[:, None]
    band_c = rng.uniform(-0.25, 0.25)
    dist = np.abs(y - band_c)
    blurred = ndimage.gaussian_filter(mono, size / 160)
    very = ndimage.gaussian_filter(mono, size / 60)
    w1 = np.clip(dist / 0.55, 0, 1) ** 1.5
    w2 = np.clip((dist - 0.45) / 0.55, 0, 1) ** 1.5
    m = mono * (1 - w1) + blurred * w1
    m = m * (1 - w2) + very * w2

    # vignette + dark field that is never pure black
    x = np.linspace(-1, 1, size)[None, :]
    vig = 1.0 - 0.55 * np.clip(np.sqrt(x ** 2 + y ** 2) - 0.35, 0, 1) ** 1.6
    m = m * vig

    hue = np.array(hue, dtype=np.float32) / 255.0
    ground = np.array([0.055, 0.05, 0.07], dtype=np.float32)      # near-black, faintly cool
    mid = ground + (hue - ground) * 0.75
    hi = np.clip(hue * 0.45 + 0.55, 0, 1)                          # hue-tinted white
    t = m[..., None]
    rgb = np.where(t < 0.6,
                   ground + (mid - ground) * (t / 0.6),
                   mid + (hi - mid) * ((t - 0.6) / 0.4))
    out = (np.clip(rgb, 0, 1) * 255).astype(np.int16)
    out += rng.integers(-4, 5, out.shape, dtype=np.int16)          # sensor grain
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def plate(preset, size, seed, out):
    rng = np.random.default_rng(seed)
    mono = {'graphite': draw_graphite, 'die': draw_die, 'tape': draw_tape}[preset](size, rng)
    img = finish(mono, HUES[preset], size, rng)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out)
    print(f"  ✓ {preset:<9} {size}×{size}  seed {seed}  → {out.relative_to(ROOT) if out.is_relative_to(ROOT) else out}")
    print(f"    {PRESETS[preset]['note']}")


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('preset', nargs='?')
    p.add_argument('--size', type=int, default=2000)
    p.add_argument('--seed', type=int, default=11)
    p.add_argument('--out', default=None)
    p.add_argument('--list', action='store_true')
    a = p.parse_args()
    if a.list or not a.preset:
        for k, v in PRESETS.items():
            print(f"    {k:<9} {v['note']}")
        return
    if a.preset not in PRESETS:
        sys.exit(f"✗ unknown preset {a.preset!r}")
    out = Path(a.out) if a.out else ROOT / f'public/images/photography/micro-{a.preset}.png'
    plate(a.preset, a.size, a.seed, out)


if __name__ == '__main__':
    main()
