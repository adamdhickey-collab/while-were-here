#!/usr/bin/env python3
"""Is a STROKE drawn through this label, as opposed to texture behind it?

Given one figure rendered WITHOUT its text, and the label boxes, report boxes
crossed by a continuous line. Raw ink percentage is the wrong measure and was
tried first: `attention-diagram` lays a 1,400-dot stipple across its whole
field, so every label inside it reads as 5–6% ink and the check cries wolf on
all of them.

What distinguishes a fault is CONTINUITY. A ring or a leader crossing a word
leaves a long unbroken run of ink across the box; stipple leaves specks. So
measure the longest consecutive run of ink in any row and any column, and flag
only runs that span a real fraction of the box.
"""
import json, sys
from PIL import Image
import numpy as np

png, boxes = sys.argv[1], json.loads(sys.argv[2])
a = np.asarray(Image.open(png).convert('RGB')).astype(int)
H, W, _ = a.shape
vals, counts = np.unique(a.reshape(-1, 3), axis=0, return_counts=True)
paper = vals[counts.argmax()]
ink = np.abs(a - paper).sum(axis=2) > 40

def longest_run(v):
    best = run = 0
    for x in v:
        run = run + 1 if x else 0
        best = max(best, run)
    return best

scale = W / max(1, max(b['x'] + b['w'] for b in boxes)) if boxes else 1
out = []
for b in boxes:
    x0 = int((b['x'] + b['w'] * 0.10) * scale); x1 = int((b['x'] + b['w'] * 0.90) * scale)
    y0 = int((b['y'] + b['h'] * 0.10) * scale); y1 = int((b['y'] + b['h'] * 0.90) * scale)
    x0, y0 = max(0, x0), max(0, y0); x1, y1 = min(W, x1), min(H, y1)
    if x1 - x0 < 4 or y1 - y0 < 4: continue
    sub = ink[y0:y1, x0:x1]
    bw, bh = x1 - x0, y1 - y0
    hrun = max((longest_run(sub[r]) for r in range(bh)), default=0)
    vrun = max((longest_run(sub[:, c]) for c in range(bw)), default=0)
    # a stroke crossing shows as a run over half the box in one axis
    if hrun > bw * 0.55 or vrun > bh * 0.55:
        out.append({'text': b['text'],
                    'pct': round(100 * max(hrun / bw, vrun / bh)),
                    'axis': 'across' if hrun / bw >= vrun / bh else 'down'})
print(json.dumps(out))
