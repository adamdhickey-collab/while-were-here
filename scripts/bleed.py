#!/usr/bin/env python3
"""Does the press PDF actually bleed?

    ./.venv/bin/python scripts/bleed.py            report on dist/while-were-here-press.pdf
    ./.venv/bin/python scripts/bleed.py --strict   exit 1 if any full-bleed page stops at trim

WHY. On 23 Aug 2026 the press PDF — the file that goes to Saal — carried live
bleed on exactly 11 of its 132 pages. The closings, the field-note plates and
the dividers extended their 3 mm; the cover, all eight essay openers and every
page's own ground stopped dead at the trim line. Any outward drift in the cut
would have put a paper-white sliver on the fore-edge of nearly every page, and
nothing in the toolchain could see it: `verify` reads the composed HTML, where
--bleed-out is 0 by design; `pdfcheck` reads the text layer, and bleed has no
words. The @page rule reserved the bleed box and drew the crop marks, so the
file LOOKED like a press file in every viewer.

HOW. For each page, walk in from each edge of the trim box at the midline and
find where ink begins, at 300 dpi. A page is judged only if something on it is
meant to bleed, which is decided the honest way: a band 1 mm inside the trim is
sampled, and if it is ink rather than paper the artwork touches the trim and
must therefore continue past it. A margin-bound text page is skipped — its
ground is judged instead, since the ground must bleed on every page.

Findings are in millimetres past the trim, negative meaning the ink reaches
into the bleed. -3.0 is correct; 0.0 is the defect.

WHAT A PASS MEANS. Ink from SOMETHING reaches the bleed ring on every judged
edge. It cannot tell the right artwork bled — a cream ground behind a
photograph that stopped at trim reads as covered when the cut drifts, which is
the failure reduced from a white sliver to a cream one. That is the residual
risk accepted here; catching it needs per-element geometry, not pixels.
"""
import sys
from pathlib import Path

import numpy as np

try:
    import fitz
except ImportError:
    print('  · bleed not checked — pymupdf is not installed')
    sys.exit(0)

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / 'dist' / 'while-were-here-press.pdf'
strict = '--strict' in sys.argv

if not PDF.exists():
    print(f'  · bleed not checked — {PDF.name} does not exist. Build it first.')
    sys.exit(1 if strict else 0)

doc = fitz.open(PDF)
first = doc[0]
if first.bleedbox.width - first.trimbox.width < 2:
    print('  ✗ this press PDF declares no usable bleed box — it is not a press file')
    sys.exit(1)

# 246, NOT 235, and the difference is the book's own paper colour. The page
# ground is cream, (243, 239, 229), mean 237: at a threshold of 235 the
# detector counted a correctly BLEEDING cream ground as bare paper and reported
# 64 failures on a file with eleven. Bare press-sheet white renders ~255;
# anything at or below the cream is ink. Only values above 246 are paper.
PAPER = 246


def edge_profiles(pg):
    """For each edge: (does the artwork touch the trim here, mm of bleed ink)."""
    tb = pg.trimbox
    out = {}
    for edge in ('top', 'bottom', 'left', 'right'):
        horiz = edge in ('top', 'bottom')
        mid = (tb.x0 + tb.x1) / 2 if horiz else (tb.y0 + tb.y1) / 2
        t = {'top': tb.y0, 'bottom': tb.y1, 'left': tb.x0, 'right': tb.x1}[edge]
        pad = 6 / 25.4 * 72
        clip = (fitz.Rect(mid - 30, t - pad, mid + 30, t + pad) if horiz
                else fitz.Rect(t - pad, mid - 30, t + pad, mid + 30))
        pm = pg.get_pixmap(dpi=300, clip=clip)
        a = np.frombuffer(pm.samples, dtype=np.uint8) \
              .reshape(pm.height, pm.width, pm.n)[:, :, :3].astype(float)
        prof = a.mean(axis=(1, 2)) if horiz else a.mean(axis=(0, 2))
        n = len(prof)
        mm_per = 12 / n
        # index of the trim line within the profile, and of 1 mm inside it
        ti = n // 2
        inward = (1 if edge in ('top', 'left') else -1)
        inside = ti + inward * int(1 / mm_per)
        touches = prof[inside] < PAPER
        # how far past trim the ink runs, walking outward
        run = 0
        i = ti - inward
        while 0 <= i < n and prof[i] < PAPER:
            run += 1
            i -= inward
        out[edge] = (bool(touches), run * mm_per)
    return out


bad = []
judged = 0
for i, pg in enumerate(doc):
    for edge, (touches, mm) in edge_profiles(pg).items():
        if not touches:
            continue                      # nothing meets the trim here
        judged += 1
        if mm < 2.0:                      # 3 mm expected; 2 allows raster rounding
            bad.append((i + 1, edge, mm))

npages = doc.page_count
doc.close()

if not bad:
    # `npages` is captured before close(). The first pass of this book ever to
    # come back clean crashed HERE, reading len(doc) off a closed document —
    # the failure path had been exercised all afternoon and the success path
    # never once.
    print(f'  ✓ everything that touches a trim edge continues past it '
          f'({judged} edges judged across {npages} pages)')
    sys.exit(0)

print(f'\n  ✗ {len(bad)} trim edge(s) where the artwork stops short of the bleed:\n')
for p, e, mm in bad[:20]:
    print(f'      page {p:>3}  {e:<7} ink runs {mm:.1f} mm past trim (3.0 expected)')
if len(bad) > 20:
    print(f'      … and {len(bad) - 20} more')
print('\n  A cut that drifts outward prints paper-white here. The bleed is CSS:')
print('  the element must extend by calc(-1 * var(--bleed-out)) — see .page::before')
print('  in print.css and the opener/cover rules changed on 23 Aug 2026.')
sys.exit(1 if strict else 0)
