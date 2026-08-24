#!/usr/bin/env python3
"""Does the PDF contain the book? — the last check, on the thing that is delivered.

    npm run pdfcheck              report, exit 0
    npm run pdfcheck -- --strict  exit 1 on any missing text
    npm run pdfcheck -- --json    machine-readable, for verify.mjs

WHY THIS EXISTS. On 22 Aug 2026 the entire sources page — all 28 entries — was
missing from dist/while-were-here.pdf. The printed page carried a hairline rule
with a blank half-page above it and nothing to say why. It had been like that
since the sources page was written.

Every check in this project passed the whole time, and each of them was right:

  · `npm run overflow` measures a browser. The sources fitted their slot.
  · `npm run verify`   reads build/book.html. The sources were in it, 28 of them.
  · `npm run breaks`, `npm run labels` — also the browser.

The PDF is produced by Vivliostyle, not by Chromium's own print path, and it
lays out CSS Grid differently: `grid-template-rows: auto 1fr auto auto` on that
page dropped its first item. Nothing in the project had ever read what came out
of the PDF, so nothing could have caught it.

WHAT IT CHECKS. Every text-bearing element in the built HTML — paragraphs,
headings, captions, list items, quotes — must appear in the PDF's extracted
text. Comparison keeps letters and digits in ANY script and drops everything
else, because the PDF's text layer breaks lines, drops soft hyphens and spaces
glyphs differently from the DOM; what matters is that the words are there at
all, not how they are spaced. "Any script" is load-bearing: the first version
stripped to ASCII and could not have seen a missing CJK glyph, and this book
embeds 27 of them across 11 subsets.

WHAT IT CANNOT SEE. Whether the text is in the right PLACE, the right size, or
the right colour, and whether an image printed. It answers one question — is the
content there — which is the question nobody was asking.

That blind spot has a sharp edge, so the script now checks the PDF's age before
anything else: a change that adds no WORDS — a swapped image, a stylesheet edit —
leaves this check reporting a clean bill of health on a file that is no longer
the book. It says so now instead of quietly passing.
"""
import json
import re
import sys
import unicodedata
import html as H
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# `content/plan/` is documentation ABOUT the book, never an input TO it —
# verified against build.mjs, which reads only book/contents/facts/images/
# type-candidates and content/essays. Including it meant that editing a
# planning note marked every deliverable stale, and a check that fires on
# correct work is a check that gets switched off.
SKIP_DIRS = {'plan'}
PDF = ROOT / 'dist' / 'while-were-here.pdf'
HTML = ROOT / 'build' / 'book.html'

args = sys.argv[1:]
strict = '--strict' in args
as_json = '--json' in args


def out(payload, lines):
    if as_json:
        print(json.dumps(payload))
    else:
        for line in lines:
            print(line)


if not HTML.exists():
    out({'available': False, 'why': 'no build/book.html'},
        ['No build/book.html. Run `npm run build` first.'])
    sys.exit(1 if strict else 0)

if not PDF.exists():
    out({'available': False, 'why': 'no PDF'},
        ['No dist/while-were-here.pdf, so the delivered file was NOT checked.',
         'Run `npm run pdf` to build one.'])
    sys.exit(1 if strict else 0)

try:
    import fitz  # pymupdf
except ImportError:
    out({'available': False, 'why': 'pymupdf missing'},
        ['pymupdf is not installed, so the PDF was NOT checked.',
         'Install it with `./.venv/bin/pip install pymupdf`.'])
    sys.exit(1 if strict else 0)

# IS THIS PDF EVEN THE CURRENT BOOK? Checked first, because everything below
# is meaningless if it is not, and the failure is silent: this script reads the
# TEXT layer, so a PDF that predates an image swap or a stylesheet change passes
# with a clean bill of health while being the wrong file. That happened — the
# Año Viejo went onto the closing page and this script went on certifying a PDF
# built forty minutes earlier, because the change added no words.
# AND EVERY OTHER PDF IN dist/, because this script only ever examined one.
# `dist/` holds three deliverables — the proof, the press file and the trimmed
# proof — and only the first was ever checked for age. On 23 Aug 2026 the press
# PDF was two days old: it predated the seed cover, the block paragraphs, a
# withdrawn record, a caption that printed under a photograph and a pull quote
# nobody could read. Nothing said so, and it is the file that would go to Saal.
#
# The others are not opened or validated here — only their age is reported.
# Knowing a deliverable is stale is most of the value; the rest of this script
# reads text and could not see those changes anyway.
# MEASURED AGAINST THE SOURCES, NOT AGAINST build/book.html — and the
# difference is the whole point. The documented press workflow ENDS with
# `npm run build`, which rewrites build/book.html after the press PDF has
# already been written. Compared to the build, a press file is therefore always
# a few minutes "stale", every single time. The first version of this did that
# and reported a PDF built ninety seconds earlier as behind.
#
# A check that fires on a correct workflow gets ignored, and then it is not a
# check. What actually decides whether a deliverable is out of date is the
# newest SOURCE it was made from.
def newest_source():
    """MTIME, WITH ITS ONE BLIND SPOT NAMED. This asks when a source file was
       last written, not when its CONTENT last changed, and those differ: on
       24 Aug 2026 a `cp` restoring an identical book.config.js after a trim-size
       experiment moved its mtime eleven minutes past the press PDF and reported
       a correct deliverable as stale. `git diff` said the content was untouched.

       Content hashing would fix it and is not worth the cost — a false STALE
       costs one rebuild, while a false CURRENT ships the wrong file to a
       printer. The check is deliberately biased toward crying wolf. If it
       fires and you believe it is wrong, check `git diff` on the sources
       before dismissing it."""
    newest = 0.0
    for d in ('content', 'src'):
        base = ROOT / d
        if not base.is_dir():
            continue
        for f in base.rglob('*'):
            if SKIP_DIRS & set(f.parts):
                continue
            if f.is_file() and not f.name.startswith('.'):
                newest = max(newest, f.stat().st_mtime)
    cfg = ROOT / 'book.config.js'
    if cfg.exists():
        newest = max(newest, cfg.stat().st_mtime)
    return newest

SRC_MTIME = newest_source()
others = sorted(q for q in PDF.parent.glob('*.pdf') if q != PDF) if PDF.parent.is_dir() else []
aged = [(q, (SRC_MTIME - q.stat().st_mtime) / 3600)
        for q in others if q.stat().st_mtime < SRC_MTIME]

stale = PDF.stat().st_mtime < HTML.stat().st_mtime
if stale:
    import datetime
    age = (HTML.stat().st_mtime - PDF.stat().st_mtime) / 60
    msg = (f'the PDF is OLDER than build/book.html by {age:.0f} min — '
           'it is not the current book. Run `npm run pdf`.')
    if as_json:
        print(json.dumps({'available': True, 'stale': True, 'staleMinutes': round(age),
                          'checked': 0, 'missing': [], 'missingCount': 0}))
        sys.exit(0)
    print(f'\n  ⚠ {msg}')
    print('    Checking it anyway, but a pass below only means the OLD file was')
    print('    complete — this script reads text, so an image or CSS change')
    print('    leaves no trace here.\n')

doc = fitz.open(PDF)
pdf_text = ' '.join(doc[i].get_text() for i in range(doc.page_count))
def squash(s):
    """Letters and digits in ANY script, normalised.

    The first version was `re.sub(r'[^a-z0-9]', '', s.lower())`, which silently
    deleted every non-ASCII character before comparing — so this check could not
    have seen a missing CJK glyph, and the book embeds 27 of them across 11
    subsets for the reproduced Meta records. It could not have seen a dropped
    accent either. Found by testing the check rather than reading its output,
    which is the only way any of this session's blind checks surfaced.

    NFKC first, so a PDF text layer that emits a decomposed accent still matches
    a composed one in the DOM."""
    return ''.join(c for c in unicodedata.normalize('NFKC', s).lower() if c.isalnum())
haystack = squash(pdf_text)

raw = HTML.read_text(encoding='utf-8')
body = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', raw, flags=re.S)

TAGS = r'p|h1|h2|h3|figcaption|li|blockquote'
chunks = [H.unescape(re.sub(r'<[^>]+>', '', m))
          for m in re.findall(rf'<(?:{TAGS})[^>]*>(.*?)</(?:{TAGS})>', body, re.S)]
chunks = [re.sub(r'\s+', ' ', c).strip() for c in chunks]

# Short strings are folios, page furniture and single words: too common to
# locate meaningfully, and a false match on them would mean nothing either way.
chunks = [c for c in chunks if 30 <= len(c) <= 300]

missing = [c for c in chunks if squash(c) not in haystack]

payload = {
    'available': True,
    'pages': doc.page_count,
    'checked': len(chunks),
    'missing': missing[:40],
    'missingCount': len(missing),
}

if as_json:
    print(json.dumps(payload))
    sys.exit(0)

def report_siblings():
    """Age of the other deliverables. Reported whatever the text check says,
       because a stale press file is a hazard on its own."""
    if not aged:
        if others:
            print(f'    {len(others)} other deliverable(s) in dist/, all newer than the sources')
        return
    print(f'\n  ⚠ {len(aged)} other deliverable(s) in dist/ are OLDER than the build:\n')
    for q, hours in aged:
        when = f'{hours:.0f} h' if hours < 48 else f'{hours/24:.1f} days'
        print(f'    {q.name:<34} {when} behind')
    print('\n    These are not opened here — only their age is reported. The press')
    print('    file is the one that goes to the printer; rebuild it before sending.')

if not missing:
    print(f'\n  ✓ the PDF contains the book                       '
          f'{len(chunks)} text elements across {doc.page_count} pages, none missing')
    report_siblings()
    print('')
    sys.exit(0)

print(f'\n  ⚠ {len(missing)} text element(s) in the HTML are NOT in the PDF:\n')
for c in missing[:20]:
    print(f'    {c[:104]}')
if len(missing) > 20:
    print(f'    … and {len(missing) - 20} more')
print('\n  The PDF is rendered by Vivliostyle, not by the browser. Layout that')
print('  works in the preview can still drop content here — CSS Grid did exactly')
print('  that once. Bisect with a one-page harness rather than full PDF builds.')
report_siblings()
print('')
sys.exit(1 if strict else 0)
