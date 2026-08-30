# What to look at on the paper proof

Written 26 Aug 2026, from the editorial review of the four-essay edition. Items 9
and 10 of that review are the two nothing in this repository can settle: whether
small type is readable at 300 mm, and whether the press file is really a press
file. Everything below is measured from the composed book so that the proof has a
checklist rather than an impression.

Order **one copy, actual size, on the stock you intend to use**. Not a PDF, not a
scaled proof, and not a different paper. Three of the four questions below change
answer with the paper.

---

## 1. The small type

Every distinct size in the book, measured on the composed page at 300 × 300 mm.
The reviewer flagged "6.75–8 pt" from the screen; the real floor is lower.

| Size | Runs | Where it is |
|---:|---:|---|
| **6 pt** | 154 | The reproduced advertiser record — the 154 company names |
| **6.75 pt** | 70 | Specimen-card labels, section labels, inset-card captions |
| **7 pt** | 54 | Copyright lines, the Sources list, image credits |
| **8 pt** | 112 | Folios, running heads, margin notes, `min` markers |
| 9.5 pt | 20 | Figure captions, the Handed Over note, cover subtitle |
| 11.5 pt | 119 | Body |

What to decide, in this order:

- **6 pt, the advertiser record.** This is a data dump and is *meant* to read as a
  mass rather than a list — that is the argument the spread is making. The
  question is not "can you read every name" but "does it read as deliberate
  density or as a mistake". If it looks like a mistake, the fix is fewer entries
  at a larger size, not the same entries slightly larger.
- **6.75 pt on the specimen cards.** These are the ones a reader actually stops
  to read, and they sit on a tinted card rather than open paper. Uncoated stock
  will thicken them; coated will hold them.
- **7 pt for the Sources and credits.** Now back matter, so nobody reads them
  under pressure. 7 pt is defensible for apparatus. Check it anyway — it is the
  smallest thing anyone is expected to read line by line.
- **8 pt folios.** These are navigation. If the folio is hard to find at arm's
  length on an open 600 mm spread, it is too small regardless of what the rest
  of the page is doing.

## 2. The low-resolution pages — resolved, but look anyway

Not raised in the review; it is not visible at screen size. Three full-bleed
300 mm pages came from a 1,280 px-era archive, and each had a different answer.
All three are now fixed, and **nothing in the book prints below 150 dpi**:

| Page | Image | Was | Now |
|---|---|---:|---:|
| Part II opener | `systems-01-observation-hive` | 81 dpi, full bleed | **203 dpi**, 120 mm plate |
| Part III opener | `before-time-01-father-portrait` | 108 dpi, full bleed | **215 dpi**, 150 mm plate |
| Part IV divider | *was* `part-4-divider-return` | screen-print rescue | **254 dpi**, a real photograph |

The two openers stopped running to the bleed on 26–27 Aug and became plates
centred on the ground. Each is sized to what its own file can carry above
200 dpi — 150 mm and 120 mm, deliberately not matched to each other. A plate
sized to look like its neighbour is a plate printed at whatever resolution that
happens to leave.

Still worth a look on paper, because dpi is arithmetic and sharpness is not:

- **The hive at 120 mm.** Its detail is fine and repetitive — comb cells about
  2.25 mm on the printed page, individual bees about 5 mm — which is both what
  reads well and what shows resampling first. If anything in the book looks
  soft, it is this.
- **The portrait at 150 mm.** A scan of a studio print, so it carries the
  original's own grain and softness on top of its resolution. Judge it as a
  photograph of a photograph, which is what the essay is about.

Current spread: 51 images at 300 dpi or better, 11 between 200 and 299, 4
between 150 and 199, none below. `npm run dpi` prints the live table.

## 3. Ink and ground

- **The two rust-accent runs below 4.5:1.** `npm run contrast` names them. They
  are the accent voice and they are deliberate; they are also the only two runs
  in the book that fail a contrast floor, and paper is where that gets judged.
- **The dark section.** Parts of the book invert to a charcoal ground. On screen
  it is a colour; on paper it is a quantity of ink, and it will show through to
  the other side of the leaf if the stock is thin. Ask the printer what caliper
  they recommend for a solid ground at this size — `book.config.js` still holds
  a placeholder caliper, and the spine measurement depends on it.
- **The Año Viejo pair.** Two night photographs facing each other across the
  gutter, both nearly black. Check the fold: on a layflat binding the two
  should meet; on anything else the gutter will eat the join.

## 4. The press file

The download on the site is **not** the press master, and the review was right to
say so. `while-were-here-spreads.pdf` is 110 dpi, flattened, imposed as reader's
spreads, with no text layer and no bleed. It exists so the book can be read on a
screen.

The press file comes from `npm run pdf:press`, and it is only a press file if the
build printed `PRESS: bleed + crop marks`. That run produces single pages, live
3 mm bleed, crop marks, and PDF/X preflight.

Two separate files are wanted, and they are not the same export:

- **Print master** — `npm run pdf:press`. Single pages, bleed, marks, CMYK
  intent. This goes to the printer and nowhere else.
- **Accessible digital** — single pages, tagged, text selectable, alt text
  carried through, no bleed or marks. `npm run pdf` is the basis; the tagging is
  not solved yet and is the one item on this page with no command behind it.

Do not send the spreads PDF to a printer, and do not offer the press PDF as the
readable download. They fail at each other's jobs.

---

## Still open, and none of it optional

- Paper caliper is a placeholder. The spine number is provisional until a printer
  supplies it.
- Consent from everyone identifiable, if this is ever sold rather than given.

The solar survey on essay one's opener was the third item here until
29 Aug 2026: six wrong text values baked into the JPEG, the only disputed claim
in the book, on page one of the first essay. Corrected in the pixels by
`scripts/resurvey.py` — wrong glyphs inpainted out, right digits transplanted
from elsewhere on the same plate. On the paper proof, look at the corrected
runs the way you look at everything else there: DATE / LAT / LON in the solar
block, ALTITUDE and AZIMUTH beside the drawing, ORIENTATION and DATE on the
specimen card. The transplants measure within 13 % of their lines' stroke
depth on screen; paper is where that gets judged.
