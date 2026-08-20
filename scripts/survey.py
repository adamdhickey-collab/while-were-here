#!/usr/bin/env python3
"""Draw a survey plate — the cover's language, applied to one subject.

    ./.venv/bin/python scripts/survey.py <preset> [--size 3000] [--seed N] [--out PATH]
    ./.venv/bin/python scripts/survey.py --list

The cover artwork is the one image in this book where watercolour is the subject
rather than an accent: a single organic form built from many fine contour lines,
washes of teal, slate, amber, coral and magenta bleeding through it, and a
scatter of plotted points joined by hairlines traced over the top. See the SURVEY
role in content/plan/asset-system.md.

Drawing these in code rather than generating them buys three things the book
already values elsewhere. They come out at press resolution instead of at a
generator's 1024 px ceiling, so a plate can grow from an inset to a full page
without being remade. They use the book's own hex values, so a re-paced stage
re-inks them. And the recipe is a recipe: same preset, same seed, same plate,
which is the difference between an asset the book owns and one it happened to
receive.

HOW IT WORKS. A smooth multi-octave noise field stands in for the terrain. Its
iso-lines are the contours — the same trick a real topographic map uses, which
is why the result reads as a survey rather than as decoration. The washes are a
second, much coarser noise field thresholded into soft irregular pools, tinted
and multiplied down so the linework stays visible through them. The network is
plotted at local maxima of a third field and joined to nearest neighbours, so
the dots sit where the terrain has features rather than at random.

Every preset warps the terrain differently — a lake is concentric, a tree is
radial and stacked, a bench is orthogonal, two roads are two long ridges — so
the four read as one series without repeating.

Nothing here draws its subject literally, which is the role's rule: no trees, no
houses, no roads, no figures, only the systems under them.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent

PAPER = (0xEF, 0xE9, 0xDC)          # the page's own cream
INK = (0x2A, 0x2A, 0x28)            # contour linework
WASHES = [                          # the cover's five
    (0x3E, 0x7C, 0x8A),   # teal
    (0x53, 0x6D, 0x8E),   # slate blue
    (0xC8, 0x8A, 0x3C),   # amber
    (0xC4, 0x6A, 0x52),   # coral
    (0x9C, 0x5A, 0x7E),   # magenta
]

PRESETS = {
    'lake':     dict(warp='concentric', octaves=5, levels=26, blooms=5, dots=44,
                     note='one lake and the path that circles it'),
    'maple':    dict(warp='radial-stack', octaves=4, levels=30, blooms=4, dots=38,
                     note='one street tree, eleven years stacked'),
    'bench':    dict(warp='orthogonal', octaves=5, levels=22, blooms=4, dots=52,
                     note='a bench after the work, drawn as a decision'),
    'tworoads': dict(warp='two-ridges', octaves=5, levels=24, blooms=5, dots=46,
                     note='the folded atlas and the blue line, one sheet'),
}


def field(size, octaves, rng):
    """Multi-octave smooth noise in 0..1. Coarse octaves carry the form, fine
    ones give the contour lines something to wobble against."""
    out = np.zeros((size, size), dtype=np.float32)
    amp = 1.0
    total = 0.0
    for o in range(octaves):
        s = max(2, size // (2 ** (o + 2)))
        small = rng.random((s, s)).astype(np.float32)
        big = np.asarray(Image.fromarray((small * 255).astype(np.uint8))
                         .resize((size, size), Image.BICUBIC), dtype=np.float32) / 255.0
        out += big * amp
        total += amp
        amp *= 0.40
    out /= total
    # Heavy: a contour is a long clean curve, and it can only be that if the
    # field under it is smooth. Under-blurring here is what turns iso-lines
    # into stipple, which was the first version's whole problem.
    return ndimage.gaussian_filter(out, sigma=size / 90)


def warp_mask(size, kind, rng):
    """The form. A radial falloff that decides where the terrain has relief and
    where the paper is simply left alone."""
    y, x = np.mgrid[0:size, 0:size].astype(np.float32)
    cx, cy = size * 0.5, size * 0.52
    dx, dy = (x - cx) / size, (y - cy) / size
    r = np.sqrt(dx ** 2 + dy ** 2)

    if kind == 'concentric':
        rr = np.sqrt((dx * 1.18 + 0.05) ** 2 + (dy * 0.86) ** 2)   # a lake is not round
        m = np.clip(1.0 - rr * 2.1, 0, 1) ** 1.2
        m *= 0.75 + 0.25 * np.sin(rr * 46.0)             # shoreline banding
    elif kind == 'radial-stack':
        th = np.arctan2(dy, dx)
        m = np.clip(1.0 - r * 2.0, 0, 1) ** 1.05
        m *= 0.72 + 0.28 * np.cos(th * 7.0)              # crown lobes
        m += 0.16 * np.clip(1.0 - abs(dy - 0.16) * 7.0, 0, 1)   # the mirrored root mass
    elif kind == 'orthogonal':
        m = np.clip(1.0 - np.maximum(abs(dx) * 2.05, abs(dy) * 2.3), 0, 1) ** 0.85
        m *= 0.80 + 0.20 * np.cos(dx * 34.0) * np.cos(dy * 26.0)
    elif kind == 'two-ridges':
        a = np.exp(-((dy - dx * 0.32 + 0.10) ** 2) / 0.0075)
        b = np.exp(-((dy - dx * 0.10 - 0.13) ** 2) / 0.0042)
        m = np.clip(a * 0.92 + b * 0.72, 0, 1)
        m *= np.clip(1.0 - r * 1.35, 0, 1) ** 0.5
    else:
        raise SystemExit(f"✗ unknown warp {kind!r}")
    return ndimage.gaussian_filter(np.clip(m, 0, 1), sigma=size / 260)


def draw_contours(dr, terrain, levels, size):
    """Iso-lines of the terrain, drawn thin. Marching along each level with
    scipy's contour finder would be heavier than this needs to be: a binary
    threshold, its morphological edge, and every edge pixel stamped, gives the
    same read at a fraction of the code and keeps the line honestly hand-thin."""
    sm = ndimage.gaussian_filter(terrain, sigma=size / 220)
    lo, hi = float(sm.min()), float(sm.max())
    w = max(1, size // 1400)
    px = np.zeros((size, size, 4), dtype=np.uint8)
    for i in range(levels):
        t = lo + (hi - lo) * (i + 0.5) / levels
        band = sm > t
        if band.sum() < 64 or (~band).sum() < 64:
            continue
        edge = band ^ ndimage.binary_erosion(band, iterations=w)
        a = 130 if i % 3 else 200
        px[edge] = (*INK, a)
    return px


def paint_washes(size, terrain, n, rng):
    """Soft irregular pools of colour that bleed past the linework. Built from a
    coarse noise field so the edges pool and feather the way water does on damp
    paper, never as a vector gradient."""
    layer = Image.new('RGB', (size, size), PAPER)
    # Draw the palette WITHOUT replacement, and always lead with a cool wash.
    # Sampling with replacement let one hue family win and the plate came out
    # monotone amber — the cover's teal and slate are half of what makes it
    # read as water and weather rather than as autumn.
    cool = [0, 1]
    warm = [2, 3, 4]
    order = ([WASHES[cool[rng.integers(0, 2)]]]
             + [WASHES[i] for i in rng.permutation(warm)]
             + [WASHES[cool[1 - cool.index(cool[0])]]])
    for k in range(n):
        col = order[k % len(order)]
        blob = field(size, 3, rng)
        cx, cy = rng.uniform(0.22, 0.78, 2)
        y, x = np.mgrid[0:size, 0:size].astype(np.float32)
        d = np.sqrt(((x / size - cx) ** 2 + (y / size - cy) ** 2))
        falloff = np.clip(1.0 - d * rng.uniform(2.4, 4.0), 0, 1)
        mask = np.clip((blob * 0.85 + falloff * 0.9 - 0.62) * 3.4, 0, 1)
        mask *= (0.35 + 0.65 * terrain)                  # settles into the relief
        mask = ndimage.gaussian_filter(mask, sigma=size / 300)
        # Each wash goes down at its own low alpha rather than replacing what is
        # under it. Compositing them opaquely, as the first version did, mixes
        # every colour into the same brown.
        m = Image.fromarray((np.clip(mask, 0, 1) * 178).astype(np.uint8))
        layer = Image.composite(Image.new('RGB', (size, size), col), layer, m)
    return layer


def draw_network(dr, terrain, n, size, rng):
    """Plotted points at local maxima of the terrain, joined to their nearest
    neighbours. Sitting them on features rather than at random is what makes the
    network look surveyed instead of scattered."""
    # Restrict to where the form actually has relief. Without this the flat
    # paper at the corners counts as a plateau of maxima and the whole network
    # collects in the four corners, which is what the first version did.
    inside = terrain > 0.34
    peaks = (ndimage.maximum_filter(terrain, size=max(3, size // 26)) == terrain) & inside
    ys, xs = np.nonzero(peaks)
    if len(xs) > n:
        pick = rng.choice(len(xs), n, replace=False)
        xs, ys = xs[pick], ys[pick]
    pts = list(zip(xs.tolist(), ys.tolist()))
    r = max(2, size // 520)
    for i, (x, y) in enumerate(pts):
        dr.ellipse([x - r, y - r, x + r, y + r], fill=(*INK, 225))
        # Cap the join length. Without it every point in a radial form finds the
        # same central peak nearest and the network collapses into a starburst,
        # which reads as a diagram of a wheel rather than as a survey.
        lim = (size * 0.20) ** 2
        d = sorted(((x - a) ** 2 + (y - b) ** 2, a, b) for a, b in pts[i + 1:])
        for dist, a, b in d[:2]:
            if dist > lim:
                continue
            dr.line([x, y, a, b], fill=(*INK, 90), width=max(1, size // 2400))


def plate(preset, size, seed, out):
    cfg = PRESETS[preset]
    rng = np.random.default_rng(seed)

    terrain = field(size, cfg['octaves'], rng) * warp_mask(size, cfg['warp'], rng)
    terrain = (terrain - terrain.min()) / max(1e-6, float(np.ptp(terrain)))

    img = paint_washes(size, terrain, cfg['blooms'], rng)
    over = Image.fromarray(draw_contours(None, terrain, cfg['levels'], size), 'RGBA')
    dr = ImageDraw.Draw(over)
    draw_network(dr, terrain, cfg['dots'], size, rng)
    img = Image.alpha_composite(img.convert('RGBA'), over).convert('RGB')

    # a breath of paper grain, so it does not read as a screen
    grain = np.asarray(img).astype(np.int16)
    grain += rng.integers(-3, 4, grain.shape, dtype=np.int16)
    img = Image.fromarray(np.clip(grain, 0, 255).astype(np.uint8))

    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out)
    print(f"  ✓ {preset:<9} {size}×{size}  seed {seed}  → {out.relative_to(ROOT) if out.is_relative_to(ROOT) else out}")
    print(f"    {cfg['note']}")


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('preset', nargs='?')
    p.add_argument('--size', type=int, default=3000)
    p.add_argument('--seed', type=int, default=7)
    p.add_argument('--out', default=None)
    p.add_argument('--list', action='store_true')
    a = p.parse_args()

    if a.list or not a.preset:
        print("  presets:")
        for k, v in PRESETS.items():
            print(f"    {k:<9} {v['note']}")
        return
    if a.preset not in PRESETS:
        sys.exit(f"✗ unknown preset {a.preset!r} — try --list")
    out = Path(a.out) if a.out else ROOT / f'public/images/illustration/survey-{a.preset}.png'
    plate(a.preset, a.size, a.seed, out)


if __name__ == '__main__':
    main()
