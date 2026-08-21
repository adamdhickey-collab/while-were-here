# What is waiting on Adam — 21 Aug 2026

Everything here is blocked on a decision, a photograph or an answer from someone
outside this repository. Nothing on this list can be resolved by working harder
on the book.

---

## Before anything is printed

### 1 · Saal's paper caliper
`book.config.js` carries `paperCaliper: 0.17`, a placeholder that assumes
uncoated stock. This book prints on FUJIFILM Crystal Archive HD at 368 g/m², and
`spineWidth()` is linear — at 130 pages it is `65 × caliper + 4`, so **every
0.01 mm moves the spine 0.65 mm.** Two plausible photographic-layflat calipers
give spines of 20.9 mm and 24.15 mm against the 15.05 the build currently
prints. That is a cover wrap out by six to nine millimetres: a misprinted case,
not a tolerance.

**One question to Saal.** Nothing here should guess it.

### 2 · Does Saal want PDF/X-1a?
`npm run pdf:press` asks for `--preflight press-ready`, which runs Ghostscript
and is not installed (`npm run press:check` now says so in a second rather than
hanging for 81 minutes). PDF/X-1a and the grayscale flag are offset-litho
conventions and this book prints photographically.

- **If they want it** — `brew install ghostscript`.
- **If they do not** — take the preflight flags out of the script rather than
  leave them implying a requirement nobody confirmed.

A press PDF built *without* the preflight is already verified correct: 132 pages,
TrimBox 300 × 300 mm, BleedBox 306 × 306 mm, all seven faces subset-embedded.
That is a file a printer can work from.

### 3 · Consent, if this is ever sold
Seven images carry a `consent` note in `content/images.json`. **None are
cleared.** Fine for family copies; every one needs asking before a sale. The
heaviest is `before-time-06-thanksgiving` — identifiable adults and two
children, whose parents have to be asked on their behalf.

---

## Writing and photographs only Adam can make

### 4 · The dedication
Still reads *"For my father, who handed me the right book."* He is rewriting it
toward family generally. **The layout is ready** — tested at trim with five
candidate texts including comma-less and four-line ones; nothing breaks or
overflows. Write anything.

### 5 · The shot list — [shot-list.md](shot-list.md)
Seven photographs the library provably does not contain. Four cost minutes each
and every one frees a generated plate; `privilege-01-kitchen-laptop` alone goes
from **106 dpi to 256** on a 300 mm full bleed that opens an essay.

**One has a deadline and it is this month.** A real four-season sequence costs a
year, so it starts in August or it does not exist. It cannot make this Christmas
— which is exactly why it needs saying now.

---

## The photo library

### 6 · The edited export
Running. `File → Export → Export N Photos…` into `~/Desktop/photo library
edited`, which `npm run selection` already reads alongside the originals.

This is the one that unblocks [photo-selection-04](photo-selection-04.md). Every
shape that document names is 16:9 or 9:16; every shape in the *unmodified*
export is 4:3 or 3:4. The frames were cropped in Photos, so the originals export
cannot match the document by dimension. When the edited export reaches the newer
photographs, `npm run selection` should start resolving frames.

Then it is verification work per frame — open it, read it against the document's
one-line description — because **eight frames so far have turned out to be
different photographs under a wanted filename.** iPhone reuses `IMG_####`.
`IMG_1638` is a night street parade, not the Alcobaça nave.
