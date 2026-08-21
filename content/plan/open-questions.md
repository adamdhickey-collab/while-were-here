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
**Eight** images carry a `consent` note in `content/images.json`. **None are
cleared.** Fine for family copies; every one needs asking before a sale.

The heaviest is no longer the Thanksgiving frame. It is **`field-note-01-lake`**,
found on 21 Aug by opening files rather than reading manifest lines: a child
fishing at the railing, in profile, face clearly visible, printed **300 mm full
bleed** — about 55 mm of figure and 8 mm of face, the largest an unconsented
person appears anywhere in the book. Not Adam's child. `before-time-06-thanksgiving`
is second — identifiable adults and two children, whose parents have to be asked
on their behalf.

`P1050320` from the photo library would join this list if it were ever placed;
it has an identifiable adult and is not currently in the book.

The audit and the two images that were checked and cleared are in
[personal-data.md](personal-data.md). Its conclusion is worth repeating here: a
count of consent notes cannot find the image nobody looked at.

---

## Writing and photographs only Adam can make

### 4 · The dedication
Still reads *"For my father, who handed me the right book."* He is rewriting it
toward family generally. **The layout is ready** — tested at trim with five
candidate texts including comma-less and four-line ones; nothing breaks or
overflows. Write anything.

### 5 · The shot list — [shot-list.md](shot-list.md)
Ten photographs the library provably does not contain. Four cost minutes each
and every one frees a generated plate; `privilege-01-kitchen-laptop` alone goes
from **106 dpi to 256** on a 300 mm full bleed that opens an essay.

**Items 8–10 were added on 21 Aug.** They are the three essay *closings*,
printed 300 mm full bleed from 1024 px files — 87 dpi, the lowest-resolution
plates in the book — and all three are composited from stock photographs.

The reason to shoot them is **provenance, not resolution.** The plates were
resampled to press size and examined at 1:1 before this was written, and they do
not look broken; the graded treatment leaves little fine detail for 87 dpi to
fail at. What is wrong with them is that somebody else took them. Shooting all
three halves the number of pictures in this book that are not Adam's, and one of
them shares a bench and a session with item 4.

Item 11 is different and smaller: one page rephotographed so the book can check
a sentence it quotes.

**One has a deadline and it is this month.** A real four-season sequence costs a
year, so it starts in August or it does not exist. It cannot make this Christmas
— which is exactly why it needs saying now.

---

### 7 · Two things about the handed-over page
The last interior page, and the one with the most of Adam's family in it.

**Is there a third object?** The page carries two: *To the Love of My Life* and
*Misery Is…*. The decision to make this page a centerpiece was taken while
talking about **three** books, and only two are in the manifest. Either the
third exists and needs photographing, or two is right and this note closes. The
layout takes a third without changing anything.

**One word of the transcription needs the object, not the file.** The caption
quotes the inside of the child's book as *"Misery is when your mom embarrass
younn front of your friends."* The manifest records that `younn` was checked at
full resolution and is deliberate, reproduced rather than corrected.

Looked at again on 21 Aug and **it does not settle.** The page is photographed
in `intelligence-07-child-hand`, but that file is **1536 × 1152**, and the four
disputed letters occupy about 230 × 130 real pixels. Enlarged, the strokes read
as plausibly `nn`, `rn` or `rin` — there appears to be a dot above one of them,
which would make it an `i` and the word *yourin*, but a dot at that scale is
also what a pencil does. Enough pixels to print at 424 dpi in a 92 mm inset;
not enough to arbitrate a letterform.

So: **read it off the paper.** The book is in the house. Failing that,
re-photograph that one page close and square — five minutes, and it also gives
the inset a better file than a 1536 px frame.

Nobody should quietly normalise it to *you in* in the meantime. A tidied-up
child's sentence is worth nothing, and the page exists to keep the thing as it
was made — the manifest already records that an earlier draft did exactly that
and it was caught.

---

### 8 · The essay about looking closely opens on a picture that punishes it
`attention-01-familiar-room` — the full-bleed opener of *The Secret Life of
Attention* — is a generated interior. Enlarged to the size it prints at, **every
book on the coffee table is gibberish.** One reads cleanly as *The Hidden Life
of Trees*, a real book on a fabricated cover; the five beneath it say things
like *Hnadtoo drdrtatr* and *Ienrhrmghwmdnhthrrn ergnn*. That stack occupies
roughly 120 × 84 mm on a 300 mm page.

It is a problem here in a way it would not be elsewhere. The essay's own
instruction is *look again*. A reader who does what the page asks is rewarded
with nonsense, in a book whose argument is attending to the actual world. The
dog asleep at the right is generated too, in a book where the same dog appears
in six real photographs.

**Three ways out, and the choice is Adam's:**

1. **Replace it with one of his own rooms.** Strongest by the book's own
   argument, and the essay would then open on a room he has actually stopped
   seeing. Needs a 1:1 frame; 3000 px on the short edge gives 254 dpi, which is
   three times what several full-bleed plates in this book already live with.
   It is close to shot-list item 2, and could be the same afternoon.
2. **Crop the books out.** Cheapest. The lower shelf is the worst of it and
   sits in the bottom fifth; cropping to 3400 × 3400 still gives 288 dpi. It
   does not fix the blue book beside *The Hidden Life of Trees*, which is also
   garbled.
3. **Leave it.** Defensible only if nobody is expected to look closely, which
   is the one thing this essay asks them to do.

The manifest lied about this picture for weeks and has been corrected: it
described a lit second-floor window at dusk with a street-tree reflection —
the brief the generator was given, not the daylight living room it returned —
and that text was the page's alt text. The id said `window-reflection` for the
same reason and is now `familiar-room`.

---

### 9 · The plate that opens the book prints Ottawa's latitude
`ordinary-days-01a-dog-afternoon-light` is the full-bleed opener of *Most of
Life Is a Tuesday* — the dog asleep in a rectangle of afternoon light, overlaid
with a solar survey in moss green. Its own manifest entry says the overlay
"must be drafted, not sketched — **real angles, real units**", and its purpose
is "to establish on page one that this book measures things."

It prints, legibly, at 300 mm:

    LAT: 45.4167° N   LON: 75.7000° W
    DATE 21 / 06      TIME 15:00
    ALTITUDE 61.2°    AZIMUTH 212.7°

**Those coordinates are Ottawa, Ontario**, to within a kilometre. Nothing in
this book happens in Ottawa — the reproduced check-in record two parts later is
Minnesota and Wisconsin, and the field notes are Lake Harriet.

**And the angles do not follow from the numbers beside them.** At that latitude,
date and hour the sun is at **altitude 57.9°, azimuth 236.7°**. The azimuth is
out by 24 degrees, which is about ninety minutes of afternoon.

**The altitude also contradicts the photograph it is drawn on.** The plate says
the light patch is 2018 mm deep from a 1420 mm aperture. A 61° sun cannot throw
a patch that long — and the picture's own light is low and raking, which is
what makes it worth photographing.

**The honest numbers, if it is redrawn** — Minneapolis, 44.9778° N, 93.2650° W:

| date | time | altitude | azimuth |
| --- | --- | --- | --- |
| 21 / 06 | 15:00 CDT | 59.6° | 233.7° |
| 21 / 09 | 15:00 CDT | 39.3° | 218.0° |
| **15 / 10** | **15:00 CDT** | **30.2°** | **215.3°** |

The October row is the one to use. Its azimuth is within three degrees of what
the plate already prints, and a 30° sun is what actually makes a two-metre
parallelogram on a floor — so the drawing is nearly right for a mid-October
afternoon in Minneapolis and badly wrong for a June afternoon in Ottawa. Fixing
it is a matter of relettering four values, not reshooting anything.

Logged in `content/facts.json` as `opening-plate-solar-geometry`, status
**disputed**, so `npm run facts` reports it until it is settled. Note this makes
`npm run facts:strict` exit non-zero, which is correct and is not in CI.

**Every other survey plate in the book checks out**, which is why this one is
worth fixing rather than abandoning: the mug specimen card's elevation matches
its photograph and its own colour chip, and the corner survey's four observers
match its four sightlines.

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
one-line description — because **ten frames so far have turned out to disagree
with the line written for them.** Eight are the wrong file: iPhone reuses
`IMG_####`, and `IMG_1638` is a night street parade, not the Alcobaça nave. Two
are the right file wrongly described, found only by looking — including
`P1050320`, where the description is wrong *and* an identifiable adult is in the
frame, which pushes it into question 3 above.

The export is confirmed to render **PNG with EXIF intact**: capture dates on
every file sampled, rotation baked into the pixels, and no generation loss. So a
frame placed from it carries its own verified date, and `capturedSource` should
cite the photograph rather than an album's HTML. It is also large — near 350 GB
finished, against 638 GB free at the time of writing, with the unmodified export
still growing. **Do not start a third export before deleting one of these two.**
