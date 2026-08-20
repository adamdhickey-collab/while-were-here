#!/usr/bin/env python3
"""Sit an artwork on the book's paper instead of its own.

    ./.venv/bin/python scripts/reground.py <image> [--to '#EFE9DC'] [--sigma 16]
                                           [--out PATH] [--dry-run]

A drawing that arrives as an opaque PNG carries whatever cream it was drawn on.
When that cream is not the page's, the artwork lands as a faint lighter or
darker panel — a rectangle on a board that is meant to read as bare paper. It is
invisible in a thumbnail and unmistakable at 300 mm.

The obvious fixes are both bad. A blend mode cannot remove a ground that is
LIGHTER than the page (`multiply` prints it back darker, `darken` leaves it
untouched), and clipping the artwork to hide the ground crops whatever the
drawing put outside its main shape.

So this shifts the paper and leaves the drawing. It reads the true cream from
the image's own border, works out the correction to the target, and applies that
correction per pixel WEIGHTED BY HOW CLOSE THE PIXEL IS TO THE CREAM. Paper gets
the whole shift, the drawing gets almost none of it, and the falloff is smooth,
so no seam appears where the two meet.

The weighting is what makes this safe. A flat shift across every pixel would
move the artwork's own colours by the same amount, which on a cover means
quietly regrading the drawing to fix its margin.

Note the correction is computed on the border, so the image must actually have
paper at its edges. `--dry-run` reports what it would do and changes nothing.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent


def parse_hex(s):
    s = s.strip().lstrip('#')
    if len(s) != 6:
        sys.exit(f"✗ --to wants a six-digit hex colour, got {s!r}")
    return np.array([int(s[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)


def border_colour(a, band):
    """The image's own paper, read from a frame around the edge.

    Median rather than mean: a drawing that puts a figure or an inset near the
    edge would drag a mean, and the median ignores it as the outlier it is."""
    h, w, _ = a.shape
    frame = np.concatenate([
        a[:band, :, :].reshape(-1, 3), a[-band:, :, :].reshape(-1, 3),
        a[:, :band, :].reshape(-1, 3), a[:, -band:, :].reshape(-1, 3),
    ])
    return np.median(frame, axis=0)


def reground(path, target, sigma, band, out, dry):
    im = Image.open(path)
    had_alpha = im.mode in ('RGBA', 'LA')
    alpha = im.getchannel('A') if had_alpha else None
    a = np.asarray(im.convert('RGB')).astype(np.float32)

    cream = border_colour(a, band)
    delta = target - cream
    spread = np.abs(delta).max()

    print(f"  {Path(path).name}")
    print(f"    paper reads   {cream.round(1)}")
    print(f"    target        {target}")
    print(f"    correction    {delta.round(1)}  (largest channel {spread:.1f})")

    if spread < 1.0:
        print("    already on the target paper — nothing to do.")
        return False

    # Distance from the image's own cream, and a smooth weight from it.
    d = np.linalg.norm(a - cream, axis=2)
    w = np.exp(-(d / float(sigma)) ** 2)[..., None]

    ground = (d < sigma * 0.5)
    print(f"    paper-weighted {ground.mean() * 100:.1f}% of pixels at full strength")

    if dry:
        print("    --dry-run, nothing written.")
        return False

    out_arr = np.clip(a + w * delta, 0, 255).astype(np.uint8)
    result = Image.fromarray(out_arr)
    if had_alpha:
        result.putalpha(alpha)
    dest = Path(out or path)
    result.save(dest)

    check = border_colour(np.asarray(Image.open(dest).convert('RGB')).astype(np.float32), band)
    print(f"    paper now     {check.round(1)}  → {dest.relative_to(ROOT) if dest.is_relative_to(ROOT) else dest}")
    return True


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('image')
    p.add_argument('--to', default='#EFE9DC', help="target paper colour (default: the book's --paper)")
    p.add_argument('--sigma', type=float, default=16.0,
                   help='how far from the paper colour the correction still reaches (default 16)')
    p.add_argument('--band', type=int, default=24, help='border width sampled for the paper (px)')
    p.add_argument('--out', default=None, help='write here instead of in place')
    p.add_argument('--dry-run', action='store_true')
    args = p.parse_args()

    if not Path(args.image).exists():
        sys.exit(f"✗ no such file: {args.image}")
    reground(args.image, parse_hex(args.to), args.sigma, args.band, args.out, args.dry_run)


if __name__ == '__main__':
    main()
