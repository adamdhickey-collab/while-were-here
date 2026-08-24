# The email to Saal

Three questions block the press file, and all three are one reply away. Nothing
in this repository can guess any of them — the numbers below are what we hold,
not what is true.

Draft follows; edit freely, it is written to be sent as-is.

---

**Subject:** Layflat photo book, 300 × 300 mm, 130 pp — three production questions

Hello,

I'm preparing a 300 × 300 mm hardcover layflat photo book, 130 interior pages,
printing on FUJIFILM Crystal Archive HD. The files are finished and I'd rather
ask three things now than send you something built on my assumptions.

**1. What is the caliper of the stock, per leaf?**

My cover wrap is drawn from it and the arithmetic is unforgiving: at 130 pages
the spine is `65 × caliper + 4 mm`, so every 0.01 mm moves the spine 0.65 mm. I
am currently carrying a placeholder of 0.17 mm, which gives a 15.05 mm spine and
is almost certainly too thin for this stock — plausible photographic-layflat
calipers of 0.26 and 0.31 would give 20.9 mm and 24.15 mm instead. That is a
wrap out by six to nine millimetres, so I would rather use your number than any
of mine.

**2. Do you want PDF/X-1a, and do you want the preflight applied?**

PDF/X-1a and grayscale conversion are offset-litho conventions and this book
prints photographically, so I suspect the answer is no — but I would rather be
told than assume. The file as it stands is a plain PDF with everything embedded.

**3. Which shape do you want the files in?**

I can send either, both are built and checked:

* **Interior only** — 130 pages, cover supplied separately on your wrap template
* **Single file** — 132 pages, front cover as page 1 and back cover as page 132

Both are 300 × 300 mm trim, 306 × 306 mm bleed box (3 mm on all four sides),
332 × 332 mm media with crop marks, and 9 fonts fully embedded and subset.

If it is useful: interior images are 200–400 dpi at final size, with two plates
at 81 and 108 dpi that I am deciding whether to re-shoot — I would welcome your
view on whether those two would hold up on Crystal Archive at this size, since
you will have seen far more of it than I have.

Thank you,
Adam Hickey

---

## What to do with each answer

| answer | what changes |
| --- | --- |
| **caliper** | set `paperCaliper` in `book.config.js`; `spineWidth()` and the cover wrap follow automatically. Nothing else in the book moves. |
| **PDF/X wanted** | `brew install ghostscript`, then `npm run pdf:press` runs the preflight it already asks for. |
| **PDF/X not wanted** | take the `--preflight` flags out of the `pdf:press` script, so it stops implying a requirement nobody asked for. |
| **interior only** | send `dist/while-were-here-interior.pdf`; build the wrap on their template. `cover-wrap.html` exists as the mockup to check it against. |
| **single file** | send `dist/while-were-here-press.pdf`; `dist/while-were-here-interior.pdf` can then be deleted, it is derived. |

## The two low-resolution plates, if they ask

* `systems-01-observation-hive` — 960 × 960, **81 dpi** on a 300 mm full bleed.
  Verified to have no camera original anywhere in the 24,372-frame library; a
  re-photograph is the only fix.
* `before-time-01-father-portrait` — 1272 × 1272, **108 dpi**. A scan of a
  1980s print, so the fix is a re-scan at higher resolution, not a reshoot.

Every other plate in the book is 150 dpi or better; twelve generated artworks
were upscaled 2× on 23 Aug 2026 to get there. These two were deliberately left
alone, because resampling a real photograph's grain is a different decision
from resampling a drawing.
