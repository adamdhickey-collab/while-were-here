#!/usr/bin/env python3
"""Correct the six wrong text values on the essay-one opener, in the pixels.

    ./.venv/bin/python scripts/resurvey.py <input.jpg> [--out PATH]

ordinary-days-01a-dog-afternoon-light printed Ottawa's coordinates, midsummer's
date, and a 61.2° altitude beside a light patch its own drawing throws at 35°.
The 24 Aug 2026 solve (content/images.json, content/facts.json) established
that the ARTWORK IS RIGHT and only the text was wrong, so regeneration was the
wrong fix: it would have thrown away a correct drawing to correct its captions.

This script fixed the captions instead. For each wrong glyph it inpaints the
cell background, then transplants the correct digit from elsewhere ON THE SAME
PLATE — no type from outside the image — scaled to the destination line's digit
height, seated on its baseline, and calibrated to its ink darkness against the
local ground. 24 glyph cells in 14 regions, 0.09 % of the image; nothing drawn
moved.

It ran ONCE, 29 Aug 2026, against the plate as committed at af02e4a. The file
in the repository is its OUTPUT; the input lives in git history. The pixel
coordinates below describe the pre-correction plate and mean nothing against
any other image — the script aborts if a line does not segment into the glyph
count its pre-correction text implies, but that guard is partial: do not point
it at the corrected plate expecting a no-op.
"""
import argparse, sys
import cv2
import numpy as np

# ---- the pre-correction plate, surveyed --------------------------------------
# line name -> (box x0,y0,x1,y1 in native 4000 px, text as printed before)
LINES = {
    'sol-date':        ((110, 240, 470, 295), "DATE: 21 / 06"),
    'sol-time':        ((110, 310, 445, 360), "TIME: 15:00"),
    'sol-lat':         ((110, 380, 530, 435), "LAT: 45.4167° N"),
    'sol-lon':         ((110, 452, 530, 505), "LON: 75.7000° W"),
    'alt-val':         ((1225, 950, 1455, 1015), "61.2°"),
    'az-val':          ((1225, 1650, 1475, 1720), "212.7°"),
    'card-orient-val': ((3295, 3505, 3425, 3575), "1180"),
    'card-date-val':   ((3235, 3580, 3415, 3650), "21/ 06"),
    'card-time-val':   ((3230, 3655, 3405, 3720), "15:00"),
    'card-scale-val':  ((3230, 3728, 3380, 3790), "1:20"),
    'opt-x':           ((1900, 3700, 2270, 3750), "X: 1025"),
    'opt-y':           ((1900, 3770, 2270, 3820), "Y: 590"),
    'wallthk':         ((2150, 1295, 2615, 1350), "WALL THICKNESS 230"),
    'apert':           ((2340, 365, 2490, 420), "1180"),
}

# (dst_line, dst_glyph_index, new_char, donor_line, donor_glyph_index)
# new_char '' erases the cell and leaves it blank. Indices count non-space
# glyphs left to right. Donors are all harvested before any pixel changes.
REPL = [
    ('sol-date', 5, '0', 'sol-time', 8),         # DATE 21/06 -> 01/10
    ('sol-date', 8, '1', 'sol-date', 6),
    ('sol-date', 9, '0', 'sol-time', 9),
    ('sol-lat',  5, '4', 'sol-lat',  4),         # LAT 45.4167 -> 44.9778
    ('sol-lat',  7, '9', 'opt-y',    3),
    ('sol-lat',  8, '7', 'sol-lat', 10),
    ('sol-lat',  9, '7', 'sol-lon',  7),
    ('sol-lat', 10, '8', 'apert',    2),
    ('sol-lon',  4, '9', 'opt-y',    3),         # LON 75.7000 -> 93.2650
    ('sol-lon',  5, '3', 'wallthk', 14),
    ('sol-lon',  7, '2', 'sol-date', 5),
    ('sol-lon',  8, '6', 'sol-date', 9),
    ('sol-lon',  9, '5', 'sol-time', 6),
    ('alt-val',  0, '3', 'wallthk', 14),         # ALTITUDE 61.2 -> 35.0
    ('alt-val',  1, '5', 'opt-x',    5),
    ('alt-val',  3, '0', 'sol-time', 9),
    ('az-val',   2, '6', 'sol-date', 9),         # AZIMUTH 212.7 -> 216.8
    ('az-val',   4, '8', 'apert',    2),
    ('card-orient-val', 0, '2', 'card-scale-val', 2),  # ORIENTATION 1180 -> 217
    ('card-orient-val', 2, '7', 'sol-lon',        4),
    ('card-orient-val', 3, '',  '', -1),
    ('card-date-val',   0, '0', 'card-time-val', 3),   # card DATE 21/06 -> 01/10
    ('card-date-val',   3, '1', 'card-date-val', 1),
    ('card-date-val',   4, '0', 'card-time-val', 4),
]

# cells where diffusion inpainting smears the card's wood grain: fill by
# copying a clean patch of the same card from dx to the right, feathered
COPYFILL = {('card-orient-val', 3): 80}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('input')
    ap.add_argument('--out', default=None, help='default: overwrite input')
    args = ap.parse_args()

    im = cv2.imread(args.input)
    if im is None or im.shape[:2] != (4000, 4000):
        sys.exit(f'not the plate: {args.input}')
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(np.int16)
    bg = cv2.medianBlur(gray.astype(np.uint8), 31).astype(np.int16)
    depth = np.clip(bg - gray, 0, 255)   # ink darkness against local ground

    def segment(name):
        (x0, y0, x1, y1), text = LINES[name]
        d = depth[y0:y1, x0:x1]
        thr = max(8, 0.35 * np.percentile(d, 99))
        m = (d > thr).astype(np.uint8)
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
        glyphs = [c for c in text if c != ' ']
        cols = m.sum(axis=0).astype(float)
        segs, inl = [], False
        for x, v in enumerate(cols):
            if v > 0 and not inl: s = x; inl = True
            elif v == 0 and inl: segs.append([s, x]); inl = False
        if inl: segs.append([s, len(cols)])
        merged = []
        for a, b in segs:
            if merged and a - merged[-1][1] <= 2: merged[-1][1] = b
            else: merged.append([a, b])
        segs = [s for s in merged if s[1] - s[0] >= 4]
        guard = 0
        while len(segs) < len(glyphs) and guard < 30:   # valley-split merges
            guard += 1
            wi = max(range(len(segs)), key=lambda i: segs[i][1] - segs[i][0])
            a, b = segs[wi]
            if b - a < 12: break
            cut = a + 4 + int(np.argmin(cols[a + 4:b - 4]))
            segs[wi:wi + 1] = [[a, cut], [cut, b]]
            segs.sort()
        if len(segs) != len(glyphs):
            sys.exit(f'{name}: {len(segs)} glyphs where "{text}" implies '
                     f'{len(glyphs)} — this is not the pre-correction plate')
        out = []
        for (a, b), ch in zip(segs, glyphs):
            rows = np.where(m[:, a:b].sum(axis=1) > 0)[0]
            top, bot = (int(rows[0]), int(rows[-1]) + 1) if len(rows) else (0, m.shape[0])
            out.append({'ch': ch, 'x0': x0 + a, 'x1': x0 + b,
                        'y0': y0 + top, 'y1': y0 + bot, 'cx': x0 + (a + b) / 2})
        return out

    seg = {k: segment(k) for k in LINES}

    def digit_metrics(name):
        g = [s for s in seg[name] if s['ch'].isdigit()]
        return (float(np.median([s['y1'] - s['y0'] for s in g])),
                float(np.median([s['y1'] for s in g])))

    def line_ink_color(name):
        (x0, y0, x1, y1), _ = LINES[name]
        d = depth[y0:y1, x0:x1]
        core = d > 0.9 * np.percentile(d, 99)
        return im[y0:y1, x0:x1][core].mean(axis=0)   # BGR

    def line_ref_depth(name, changed):
        refs = [g for i, g in enumerate(seg[name])
                if g['ch'].isdigit() and i not in changed]
        if not refs:
            refs = [g for i, g in enumerate(seg[name]) if i not in changed]
        vals = []
        for g in refs:
            c = depth[g['y0']:g['y1'], g['x0']:g['x1']]
            rc = c[c > 0.5 * np.percentile(c, 98)]
            if len(rc): vals.append(rc.mean())
        return float(np.mean(vals))

    def harvest(name, idx):
        s = seg[name][idx]
        pad = 3
        d = depth[s['y0'] - pad:s['y1'] + pad, s['x0'] - pad:s['x1'] + pad].astype(float)
        peak = np.percentile(d, 98)
        a = np.clip((d - 6) / max(peak - 6, 1), 0, 1)
        return a ** 0.72, s   # soft strokes read light after transplant

    donors = {(dst, di): harvest(srcl, si) + (digit_metrics(srcl)[0],)
              for dst, di, ch, srcl, si in REPL if ch}
    metrics = {k: digit_metrics(k) for k in {r[0] for r in REPL}}
    colors = {k: line_ink_color(k) for k in {r[0] for r in REPL}}
    changed_by_line = {}
    for r in REPL: changed_by_line.setdefault(r[0], set()).add(r[1])
    refdepth = {k: line_ref_depth(k, v) for k, v in changed_by_line.items()}

    work = im.astype(float)

    # erase
    for dst, di, ch, srcl, si in REPL:
        s = seg[dst][di]
        if (dst, di) in COPYFILL:
            dx, pad = COPYFILL[(dst, di)], 10
            x0, x1 = s['x0'] - pad, s['x1'] + pad
            y0, y1 = s['y0'] - pad, s['y1'] + pad
            h, w = y1 - y0, x1 - x0
            patch = im[y0:y1, x0 + dx:x1 + dx].astype(float)
            ramp = np.minimum(np.arange(w), np.arange(w)[::-1]) / 5.0
            rampy = np.minimum(np.arange(h), np.arange(h)[::-1]) / 5.0
            al = np.clip(np.minimum.outer(rampy, ramp), 0, 1)[..., None]
            work[y0:y1, x0:x1] = work[y0:y1, x0:x1] * (1 - al) + patch * al
            continue
        pad = 4
        x0, x1 = s['x0'] - pad, s['x1'] + pad
        y0, y1 = s['y0'] - pad - 2, s['y1'] + pad + 2
        win = 24
        wx0, wy0, wx1, wy1 = x0 - win, y0 - win, x1 + win, y1 + win
        local = work[wy0:wy1, wx0:wx1].astype(np.uint8)
        dm = (depth[wy0:wy1, wx0:wx1] > 6).astype(np.uint8)
        mask = np.zeros_like(dm)
        mask[y0 - wy0:y1 - wy0, x0 - wx0:x1 - wx0] = dm[y0 - wy0:y1 - wy0, x0 - wx0:x1 - wx0]
        mask = cv2.dilate(mask, np.ones((5, 5), np.uint8))
        work[wy0:wy1, wx0:wx1] = cv2.inpaint(local, mask, 4, cv2.INPAINT_TELEA)

    # draw, calibrating each transplant's stroke weight to its line
    for dst, di, ch, srcl, si in REPL:
        if not ch: continue
        a, ssrc, h_src = donors[(dst, di)]
        h_dst, base_dst = metrics[dst]
        scale = h_dst / h_src
        if abs(scale - 1) > 0.02:
            a = np.clip(cv2.resize(a, None, fx=scale, fy=scale,
                                   interpolation=cv2.INTER_CUBIC), 0, 1)
        s = seg[dst][di]
        ah, aw = a.shape
        x0 = int(round(s['cx'] - aw / 2))
        y0 = int(round(base_dst + 3 * scale - ah))   # scaled pad below baseline
        ink = colors[dst]
        bgpatch = work[y0:y0 + ah, x0:x0 + aw].copy()
        bgm = bg[y0:y0 + ah, x0:x0 + aw]
        gain = 1.0
        for _ in range(3):
            al = np.clip(a * gain, 0, 1)[..., None]
            out = bgpatch * (1 - al) + ink * al
            dpt = np.clip(bgm - out.mean(axis=2), 0, 255)
            core = dpt[dpt > 0.5 * np.percentile(dpt, 98)]
            ratio = core.mean() / refdepth[dst]
            if 0.97 <= ratio <= 1.03: break
            gain = min(gain / ratio, 2.5)
        work[y0:y0 + ah, x0:x0 + aw] = out

    res = np.clip(work, 0, 255).astype(np.uint8)

    # verify: every transplant against its line, measured off the result
    rgray = cv2.cvtColor(res, cv2.COLOR_BGR2GRAY).astype(np.int16)
    rbg = cv2.medianBlur(rgray.astype(np.uint8), 31).astype(np.int16)
    rdepth = np.clip(rbg - rgray, 0, 255)
    for dst, di, ch, srcl, si in REPL:
        if not ch: continue
        s = seg[dst][di]
        h_dst, base_dst = metrics[dst]
        y1 = int(base_dst) + 2
        cell = rdepth[y1 - int(h_dst) - 4:y1, s['x0'] - 2:s['x1'] + 2]
        core = cell[cell > 0.5 * np.percentile(cell, 98)]
        print(f"{dst:16s} g{di:<2d} ->{ch}  "
              f"ink {core.mean() / refdepth[dst]:5.2f} of its line")

    out_path = args.out or args.input
    ok = cv2.imwrite(out_path, res,
                     [cv2.IMWRITE_JPEG_QUALITY, 95,
                      cv2.IMWRITE_JPEG_SAMPLING_FACTOR,
                      cv2.IMWRITE_JPEG_SAMPLING_FACTOR_444])
    if not ok: sys.exit(f'could not write {out_path}')
    print(f'-> {out_path}')


if __name__ == '__main__':
    main()
