#!/usr/bin/env python3
"""Compose the book as facing spreads, the way it is actually read.

    ./.venv/bin/python scripts/spreads.py           build both spread PDFs
    ./.venv/bin/python scripts/spreads.py --check   report only: is the published one current?

WHY. A 300 mm square book is read as a 600 mm opening, and no single-page PDF
shows that. The dog on the essay-01 opener faces its own title; the Año Viejo
fire faces the last words of the book. Judged one page at a time, those pairings
are invisible.

TWO FILES, and the difference is not quality, it is where they go.

  dist/while-were-here-spreads.pdf        vector, ~400 MB, for looking at here
  public/download/while-were-here-spreads.pdf   110 dpi raster, ~15 MB, published

The published one is rasterised because GitHub rejects any file over 100 MB and
because 400 MB is absurd for something read on a screen. At 110 dpi a 600 mm
spread is about 2,600 px, which is sharper than any display will show it.

THE PUBLISHED ONE EMBEDS FALUTIN, DELIBERATELY. The Plattner Type EULA permits
"ebooks and other digital documents" — a PDF may carry the face. It prohibits
serving the font software itself, which is why `fonts-licensed/` is gitignored
and the HTML preview falls back to Fraunces. The hosted site therefore shows the
real typeface in the PDF and the substitute in the HTML, which is the licence
drawn accurately rather than an inconsistency. See LICENSING.md.

PAIRING IS READ FROM THE BOOK, NEVER ASSUMED. `data-side` on every page says
whether it is a verso or a recto; a verso opens a spread and the recto after it
closes it. Anything unpaired stands alone on the side it really occupies,
keeping the full spread width so the pacing does not jump. In this book that
gives 64 pairs and 4 singles — the cover, the half title, the last interior page
and the back cover — because page 2 is a RECTO, which is the fact a hardcoded
"pair them two by two" would get wrong from the first opening onwards.
"""
import io
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# `content/plan/` is documentation ABOUT the book, never an input TO it —
# verified against build.mjs, which reads only book/contents/facts/images/
# type-candidates and content/essays. Including it meant that editing a
# planning note marked every deliverable stale, and a check that fires on
# correct work is a check that gets switched off.
SKIP_DIRS = {'plan'}
SRC = ROOT / 'dist' / 'while-were-here.pdf'
VECTOR = ROOT / 'dist' / 'while-were-here-spreads.pdf'
WEB = ROOT / 'public' / 'download' / 'while-were-here-spreads.pdf'
BOOK = ROOT / 'build' / 'book.html'
DPI = 110

check_only = '--check' in sys.argv

try:
    import fitz
except ImportError:
    print('  · spreads not built — pymupdf is not installed')
    sys.exit(0)


def plan_from_book():
    """The spread plan, taken from the composed book's own sides."""
    html = BOOK.read_text(encoding='utf-8')
    sides = re.findall(r'<section class="page[^"]*"[^>]*data-side="(\w+)"', html)
    plan, i = [], 0
    while i < len(sides):
        if sides[i] == 'verso' and i + 1 < len(sides) and sides[i + 1] == 'recto':
            plan.append((i, i + 1))
            i += 2
        else:
            plan.append((i, None))
            i += 1
    return plan, sides


if not SRC.exists():
    print(f'  · spreads not built — {SRC.name} does not exist. Run `npm run pdf` first.')
    sys.exit(0)

plan, sides = plan_from_book()

if check_only:
    # Newest source wins, same reasoning as scripts/pdfcheck.py: the reader PDF is
    # rebuilt after the press one, so comparing deliverables to each other reports
    # a correct workflow as stale.
    newest = 0.0
    for d in ('content', 'src'):
        base = ROOT / d
        if base.is_dir():
            for f in base.rglob('*'):
                if SKIP_DIRS & set(f.parts):
                    continue
                if f.is_file() and not f.name.startswith('.'):
                    newest = max(newest, f.stat().st_mtime)
    stale = []
    for f in (VECTOR, WEB):
        if not f.exists():
            stale.append((f, 'missing'))
        elif f.stat().st_mtime < newest:
            hours = (newest - f.stat().st_mtime) / 3600
            stale.append((f, f'{hours:.0f} h behind' if hours < 48 else f'{hours/24:.1f} days behind'))
    if not stale:
        print(f'  ✓ the spread PDFs are current ({len(plan)} spreads)')
        sys.exit(0)
    print(f'\n  ⚠ {len(stale)} spread PDF(s) out of date:\n')
    for f, why in stale:
        where = 'PUBLISHED ON THE SITE' if f == WEB else 'local only'
        print(f'      {f.name:<38} {why}  ({where})')
    print('\n    Rebuild with `npm run spreads`. The published one is committed to')
    print('    the repository, so a stale build ships to the site on the next push.')
    sys.exit(0)

src = fitz.open(SRC)
W, H = src[0].rect.width, src[0].rect.height

t = time.time()
out = fitz.open()
for left, right in plan:
    page = out.new_page(width=W * 2, height=H)
    if right is None:
        x = W if sides[left] == 'recto' else 0
        page.show_pdf_page(fitz.Rect(x, 0, x + W, H), src, left)
    else:
        page.show_pdf_page(fitz.Rect(0, 0, W, H), src, left)
        page.show_pdf_page(fitz.Rect(W, 0, W * 2, H), src, right)
out.set_metadata({'title': 'While We’re Here — spreads', 'author': 'Adam Hickey'})
VECTOR.parent.mkdir(parents=True, exist_ok=True)
out.save(VECTOR, garbage=4, deflate=True)
print(f'  vector  {out.page_count} spreads · {VECTOR.stat().st_size/1e6:.0f} MB · {time.time()-t:.0f}s')

t = time.time()
from PIL import Image                                        # noqa: E402
webdoc = fitz.open()
for page in out:
    pm = page.get_pixmap(dpi=DPI)
    im = Image.frombytes('RGB', (pm.width, pm.height), pm.samples)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=82, optimize=True, progressive=True)
    p = webdoc.new_page(width=page.rect.width, height=page.rect.height)
    p.insert_image(p.rect, stream=buf.getvalue())
webdoc.set_metadata({'title': 'While We’re Here — spreads preview', 'author': 'Adam Hickey'})
WEB.parent.mkdir(parents=True, exist_ok=True)
webdoc.save(WEB, garbage=4, deflate=True)
size = WEB.stat().st_size / 1e6
print(f'  web     {webdoc.page_count} spreads · {size:.0f} MB · {DPI} dpi · {time.time()-t:.0f}s')
if size > 90:
    print(f'  ⚠ {size:.0f} MB is close to GitHub\'s 100 MB file limit — lower DPI before committing')
webdoc.close()
out.close()
src.close()
