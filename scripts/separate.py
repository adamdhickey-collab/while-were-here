#!/usr/bin/env python3
"""Separate a photograph into screen-print plates.

Output is a set of 1-bit MASKS, not coloured images. The layout stacks them and
fills each from --accent-1/2/3, so a plate never names a colour and re-pacing a
stage recolours every print in the book automatically. This is the same
principle the book already applies to handwriting: place it, never bake it.

The detail budget is the whole trick. Reducing to a few hundred pixels before
separating means fine repeating texture cannot survive into the plates, so a
mosaic or a vault resolves into shapes instead of noise. Sources with large
simple masses — cloud, silhouette, a lit aperture — work best. Sources whose
interest IS fine texture should stay photographs.

    ./.venv/bin/python scripts/separate.py <image> <slug> [--levels 3] [--simplify 380]

Writes public/images/plates/<slug>-plate-{1,2,3}.png

PLATE ORDER MATTERS. Plate 1 is the darkest, smallest area; plate 3 is the
lightest and largest. A press lays the lightest ink first, so the layout stacks
them 3, 2, 1 with `mix-blend-mode: multiply`, darkest last and on top. Stacking
them 1, 2, 3 puts the biggest pale plate over everything and washes the print
out. Each plate takes a 3 to 5 px offset for misregistration; grain comes from
the book's global paper texture, not from the plate.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent


def separate(src, levels=3, simplify=380, width=3000):
    im = ImageOps.exif_transpose(Image.open(src)).convert('L')
    full = (width, round(im.height * width / im.width))

    small = im.resize((simplify, round(im.height * simplify / im.width)), Image.LANCZOS)
    small = small.filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.MedianFilter(5))
    a = np.asarray(small, float)
    lo, hi = np.percentile(a, (3, 97))
    a = np.clip((a - lo) / max(hi - lo, 1) * 255, 0, 255)

    cuts = np.percentile(a, np.linspace(100 / (levels + 1), 100 - 100 / (levels + 1), levels))
    plates = []
    for cut in cuts:
        p = (a < cut).astype(np.uint8) * 255
        p = Image.fromarray(p).resize(full, Image.BILINEAR)
        arr = ndimage.gaussian_filter(np.asarray(p, float) / 255.0, 1.6)
        arr = (arr > 0.5).astype(float)
        arr = ndimage.gaussian_filter(arr, 0.8)          # a coarse screen, not a vector edge
        plates.append(Image.fromarray((arr * 255).astype(np.uint8), mode='L'))
    return plates


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('image')
    ap.add_argument('slug')
    ap.add_argument('--levels', type=int, default=3)
    ap.add_argument('--simplify', type=int, default=380)
    ap.add_argument('--width', type=int, default=3000)
    args = ap.parse_args()

    out = ROOT / 'public/images/plates'
    out.mkdir(parents=True, exist_ok=True)
    plates = separate(args.image, args.levels, args.simplify, args.width)
    for i, p in enumerate(plates, 1):
        dest = out / f'{args.slug}-plate-{i}.png'
        # Mask carried in alpha so the layout can fill it with any ink.
        rgba = Image.merge('RGBA', [Image.new('L', p.size, 0)] * 3 + [p])
        rgba.save(dest, optimize=True)
        print(f'  {dest.relative_to(ROOT)}  {p.size[0]}x{p.size[1]}')
    print(f'{len(plates)} plates for {args.slug}')


if __name__ == '__main__':
    sys.exit(main())
