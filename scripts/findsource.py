#!/usr/bin/env python3
"""Find the camera original of a placed image, by looking rather than by guessing.

    ./.venv/bin/python scripts/findsource.py --index          build the archive index (slow, once)
    ./.venv/bin/python scripts/findsource.py <image-id> …     find originals for placed images
    ./.venv/bin/python scripts/findsource.py --all            every placed own-photograph under 2500 px

WHY. `here-01-dog-late-light` printed at 81 dpi — the worst figure in the book —
and every pass before this read that as a fact about the photograph and went
looking for a better picture. It was a fact about the FILE: a 960 px crop whose
4000 px camera original was in the library the whole time. Re-cutting it from the
original took 81 dpi to 254 with no new photograph and no regeneration.

Thirty-three placed own-photographs are under 2500 px. Some will have originals
here and some will not, and the difference is not guessable — the observation
hive looked like a certain find and the whole of 2014 turns out to be eight
frames in this export. Guessing has been expensive today: Villa de Leyva was
Tunja, the twenty-frame batches before New Year were an arcade and a lights
tour, and the staircase was confidently not in Duluth. So this matches on pixels.

HOW. Placed images are CROPS, so a whole-frame comparison misses them. Each
library frame is stored as a small aspect-preserved grayscale thumbnail; a query
slides a square window across each thumbnail, scores every position against the
placed image, and keeps the best. That finds a square crop taken from anywhere in
a 4:3 frame, which is exactly what the placed files are.

Scores are mean absolute difference on 0–255 grayscale after per-window contrast
normalisation, so a re-graded crop still matches its original. Below about 12 is
a confident match; 12–20 is worth opening; above that is noise. THE SCORE IS A
HINT, NOT A VERDICT — always look at the pair before replacing anything.
"""
import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from lib.library import originals, edits          # noqa: E402


try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
ORIG = originals()
CACHE = ROOT / '.cache' / 'archive-index.npz'
LONG = 96          # thumbnail long edge
Q = 32             # comparison resolution
EXT = {'.heic', '.jpg', '.jpeg', '.png'}
MIN_EDGE = 2200    # anything smaller cannot improve on what is already placed


def thumb(path, long_edge=LONG):
    im = Image.open(path)
    try:
        im.draft('L', (long_edge * 2, long_edge * 2))   # fast JPEG path
    except Exception:
        pass
    im = ImageOps.exif_transpose(im).convert('L')
    w, h = im.size
    s = long_edge / max(w, h)
    return im.resize((max(1, round(w * s)), max(1, round(h * s))))


def norm(a):
    """Contrast-normalise so a re-graded crop still matches its original."""
    a = a.astype(np.float32)
    m, sd = a.mean(), a.std()
    return (a - m) / (sd + 1e-6)


def _thumb_one(path):
    """Worker: one thumbnail, or None. Must be module-level to be picklable."""
    try:
        return path.name, np.asarray(thumb(path), dtype=np.uint8)
    except Exception:
        return None


def build_index(workers=None):
    """PARALLEL. The first run of this was single-threaded and took ~35 minutes
       on an 18-core machine, mostly waiting on HEIC decode at ~116 ms a frame
       against ~18 ms for JPEG. Decoding is per-file and shares nothing, so it
       is embarrassingly parallel; there was no reason for it to be serial
       except that the first version was written to be simple and never
       measured. Re-indexing is now a few minutes, which matters because the
       library grows and this has to be re-run when it does."""
    import multiprocessing as mp
    files = sorted(p for p in ORIG.iterdir() if p.suffix.lower() in EXT)
    sizes = {}
    sz_cache = ROOT / '.cache' / 'sizes.json'
    if sz_cache.exists():
        sizes = json.loads(sz_cache.read_text())
    todo = [p for p in files
            if not (sizes.get(p.name) and min(sizes[p.name]) < MIN_EDGE)]
    print(f"{len(todo)} frames to decode of {len(files)}")
    names, flat, shapes = [], [], []
    with mp.Pool(workers or max(1, mp.cpu_count() - 2)) as pool:
        for n, r in enumerate(pool.imap_unordered(_thumb_one, todo, chunksize=32), 1):
            if n % 1000 == 0:
                print(f"  {n}/{len(todo)}", flush=True)
            if r is None:
                continue
            nm, t = r
            names.append(nm)
            shapes.append(t.shape)
            flat.append(t.reshape(-1))
    # ragged shapes, so store flat with an offset table
    offs = np.cumsum([0] + [len(f) for f in flat])
    CACHE.parent.mkdir(exist_ok=True)
    np.savez_compressed(CACHE, names=np.array(names), data=np.concatenate(flat),
                        offs=offs, shapes=np.array(shapes))
    print(f"\nindexed {len(names)} frames -> {CACHE}")


def load_index():
    z = np.load(CACHE, allow_pickle=False)
    return z['names'], z['data'], z['offs'], z['shapes']


def windows(t, q=Q):
    """Every square sub-window of a thumbnail, at q x q."""
    h, w = t.shape
    s = min(h, w)
    out = []
    if w >= h:
        for x in range(0, w - s + 1, max(1, (w - s) // 6 or 1)):
            out.append((x, 0, np.asarray(Image.fromarray(t[:, x:x + s]).resize((q, q)))))
    else:
        for y in range(0, h - s + 1, max(1, (h - s) // 6 or 1)):
            out.append((0, y, np.asarray(Image.fromarray(t[y:y + s, :]).resize((q, q)))))
    return out


def search(query_path, names, data, offs, shapes, top=5):
    qt = np.asarray(thumb(query_path, LONG))
    qs = np.asarray(Image.fromarray(qt).resize((Q, Q)))
    qn = norm(qs)
    scored = []
    for i, nm in enumerate(names):
        h, w = shapes[i]
        t = data[offs[i]:offs[i + 1]].reshape(h, w)
        best = None
        for x, y, win in windows(t):
            d = float(np.abs(qn - norm(win)).mean() * 40)   # back to a 0-255-ish scale
            if best is None or d < best[0]:
                best = (d, x, y)
        scored.append((best[0], nm, best[1], best[2]))
    scored.sort()
    return scored[:top]


def main():
    """EVERYTHING BELOW RUNS ONLY IN THE PARENT.

       macOS starts subprocesses with `spawn`, not `fork`: each worker imports
       this file again to reach `_thumb_one`. Without this guard that import
       re-executes the argparse block and `build_index()` in every child.

       The docstring below claims re-indexing is "a few minutes" after the pool
       was added. It was not. Measured 23 Aug 2026 on a 32,533-frame library:
       ONE process at 10% of a single core, thirty minutes in, with nothing
       written — the workers were re-parsing an argv with no `--index` in it and
       exiting on argparse's own SystemExit while the parent fed a pool that
       never returned. The parallel version had been quietly running worse than
       the serial one it replaced, and it looked like a slow disk.

       scripts/interesting.py hit exactly this and was fixed on the same day.
       This file was not, because nobody re-ran it until the library moved. Any
       script here that builds a Pool needs this guard."""
    ap = argparse.ArgumentParser()
    ap.add_argument('ids', nargs='*')
    ap.add_argument('--index', action='store_true')
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--top', type=int, default=4)
    a = ap.parse_args()

    if a.index:
        build_index()
        sys.exit(0)

    if not CACHE.exists():
        raise SystemExit('No index. Run with --index first (slow, once).')

    imgs = json.loads((ROOT / 'content' / 'images.json').read_text())['images']
    book = (ROOT / 'build' / 'book.html').read_text(encoding='utf-8')
    by_id = {i['id']: i for i in imgs}

    targets = a.ids
    if a.all:
        targets = []
        for i in imgs:
            fn = i.get('filename', '—')
            if fn == '—' or fn not in book:
                continue
            if 'photograph' not in str(i.get('origin', '')):
                continue
            hits = list((ROOT / 'public' / 'images').rglob(fn))
            if hits and min(Image.open(hits[0]).size) < 2500:
                targets.append(i['id'])

    names, data, offs, shapes = load_index()
    print(f"index: {len(names)} archive frames\n")

    for tid in targets:
        rec = by_id.get(tid)
        if not rec:
            print(f"{tid}: not in the manifest"); continue
        hits = list((ROOT / 'public' / 'images').rglob(rec.get('filename', '')))
        if not hits:
            print(f"{tid}: file not found"); continue
        placed = hits[0]
        pw, ph = Image.open(placed).size
        res = search(placed, names, data, offs, shapes, a.top)
        print(f"{tid}  ({pw}x{ph})")
        gone = 0
        for score, nm, x, y in res:
            src = ORIG / nm
            if not src.exists():
                # THE INDEX OUTLIVES THE LIBRARY. Frames get renamed, re-exported or
                # deleted between one index build and the next, and the first version
                # of this loop opened every hit unconditionally and died on the first
                # one that had moved — a crash that reads like a bug in the matcher
                # when it is really a stale cache. Missing hits are counted and
                # reported instead, because the count is the signal: a handful is
                # normal drift, a lot means re-run `--index`.
                gone += 1
                print(f"   {score:6.1f}  {nm:<22} — no longer in the library")
                continue
            ow, oh = Image.open(src).size
            gain = min(ow, oh) / min(pw, ph)
            flag = '  <-- confident' if score < 12 else ('  <- look' if score < 20 else '')
            print(f"   {score:6.1f}  {nm:<22} {ow}x{oh}  {gain:.1f}x{flag}")
        if gone:
            print(f"   ({gone} of {len(res)} hits have left the library — "
                  f"re-run with --index if this keeps happening)")
        print()


if __name__ == '__main__':
    main()
