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

## 2. The three low-resolution full-bleed pages

Not raised in the review — it is not visible at screen size — but it is the thing
most likely to disappoint on paper. Three full-bleed 300 mm pages come from a
1,280 px-era archive, and each got a different answer:

| Page | Image | Effective |
|---|---|---:|
| Part II opener | `systems-01-observation-hive` | **81 dpi** |
| Part III opener | `before-time-01-father-portrait` | ~~108 dpi~~ → **215 dpi** |
| Part IV divider | *was* `part-4-divider-return` | screen-printed to hide it |

Two of the three are fixed. The divider is a real photograph at 254 dpi. The
father's portrait stopped running at full bleed on 26 Aug — Adam's call — and is
now a 150 mm plate on the dark ground at 215 dpi, which is also the better
treatment for a photograph about single unrepeatable frames.

**The observation hive is the one left.** 81 dpi across a 300 mm bleed is the
softest thing in the book by a wide margin, and it opens Part II. The same fix
is available and costs nothing but a decision: at 150 mm it is 163 dpi, at
120 mm it is 203. It was a knowing trade recorded in `content/images.json` — a
real photograph at 81 dpi over a generated plate at 87 — and that trade was
about which IMAGE, not about what size to print it.

Everything else in the book: 51 images at 300 dpi or better, 10 between 200 and
299. `npm run dpi` prints the current table.

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

- The opening plate of essay one prints a solar survey that does not compute. The
  drawing is right; six text values are wrong and are baked into a 4000 × 4000
  JPEG. The corrections are in `content/images.json`. This is the only *disputed*
  claim in the book and it is on page one of the first essay.
- Paper caliper is a placeholder. The spine number is provisional until a printer
  supplies it.
- Consent from everyone identifiable, if this is ever sold rather than given.
