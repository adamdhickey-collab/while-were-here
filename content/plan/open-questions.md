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
bleed** — about 30 mm of figure and 8.6 mm of face, the largest an unconsented
person appears anywhere in the book (re-measured 22 Aug 2026 — the earlier 55 mm was his
estimated full stature, not what prints; he is cut off by the bottom edge). Not Adam's child. `before-time-06-thanksgiving`
is second — identifiable adults and two children, whose parents have to be asked
on their behalf.

`P1050320` from the photo library would join this list if it were ever placed;
it has an identifiable adult and is not currently in the book.

The audit and the two images that were checked and cleared are in
[personal-data.md](personal-data.md). Its conclusion is worth repeating here: a
count of consent notes cannot find the image nobody looked at.

### 3b · What the children are wearing in the Thanksgiving frame

Not a consent question — that is item 3, and it is handled. This is about what
the picture shows, surfaced 22 Aug 2026 while checking descriptions against
frames.

The alt text said "two of them children wearing paper crowns". Only one is a
crown. The girl wears a pink paper crown; **the boy wears a paper headdress with
upright feathers** — the Thanksgiving craft a lot of American schools made in
that era. The description now says so, because a description that rounds it off
to "paper crowns" is describing a different photograph.

**Flagging it because it is a decision, not a defect.** The frame is an inset
beside the paragraph on growing up before ordinary life produced a continuous
public record, and it is a real photograph of a real afternoon — which is
exactly the book's argument for using it. It is also a costume some people would
now think twice about printing in a bound object that goes to family and might
later be sold. Adam may want it in unchanged, may want a different Thanksgiving
frame, or may want it kept and unremarked. All three are defensible and none is
mine to pick.

What is not defensible is the version where nobody noticed, so it is written
down. If it stays, nothing needs doing — the description is now accurate, and
accurate is the whole standard this book holds itself to.

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

Nobody should quietly normalise it to *you in* in the meantime.

**Looked at again, independently, 22 Aug 2026 — and it still does not settle.**
Magnified 4× from the placed 1536 px file, the letters after *you* are two
arched strokes before *front*. They read most naturally as **nn**, which is what
the manifest already says. But the first arch has a distinctly taller left stem
than the second, which keeps **rn** and **rin** open, and there are stray
graphite marks above the second arch that are either a dot or the paper. A
second reader reaching the same wall is worth recording: **the file is the
limit, not the reading.**

If `scripts/findsource.py` turns up a larger camera original of this frame in
the archive, that settles it without anyone leaving the house. If it does not,
the instruction above stands — read it off the paper, or re-photograph that one
page close and square. A tidied-up
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

### 10 · Nine verified frames, and the three worst plates in the book
These two facts belong side by side, because one may answer the other.

**Nine frames from the library are now verified by eye** — opened, read against
their line, and registered in `content/images.json` as `library-01` … `-09`.
Five print at **363 dpi across a 300 mm page**.

**Three plates in the book print at 87 dpi**, all of them essay closings, all of
them composited from stock photographs. They are shot-list items 8–10.

**DECIDED, 21 Aug: option 2 — the nave is placed.** Adam said "place the
alcobaca nave"; the closing recto now carries `pilgrimage-06-closing-nave` at
363 dpi, the imprint dropped to five credits, and shot-list item 10 is
superseded. The paragraph below is kept as the record of the choice as it stood.

One pairing was strong enough to name. `pilgrimage-06-closing-stone` closed *The
Body Cannot Skip the Hill* at 87 dpi, and the library holds **`IMG_1638`, the
Alcobaça nave at 4284 × 5712 — 363 dpi.** An empty Cistercian nave, benches on
both sides, light at the far end, nobody in it. For an essay about distance the
body has to cover, that is arrival photographed, and it is Adam's own.

**Three ways, and the choice is yours:**

1. **Shoot item 10.** Your hand, your stone, and the essay's last sentence is
   already written for it. Best if the shoot happens.
2. **Place the nave.** In hand today, four times the resolution, and it removes
   one of the six pictures in this book somebody else took. Costs **one
   paragraph** — the essay currently ends on the gesture in the photograph, and
   that ending would have to become the room.
3. **Both.** The nave is not only a closing plate; it would also carry a
   full-bleed anywhere in Part IV.

The same arithmetic applies less neatly to the other two closings. Nothing in
the library is a cursor blinking in a dim room, and the bench closing is better
served by item 8, which shares a session with item 4.

---

### 11 · The back-cover botanical, from the editorial pass — **DECIDED**
**Adam's call, 23 Aug 2026: the seed, large.** `backCoverVariant` is set to
`seed` in content/book.json and the composed book carries `cover-back--seed`.
The back board is now his own drawing of a seed in section at the full size of
the board, centred, with the type above and below it, and the boards are tied
together by an emblem at both ends.

Three things changed with it, all his call:
  · **The artwork owns the board.** It is emitted as a sibling of the text block
    rather than a row inside it — a 92 mm row cannot become a 300 mm board. It
    keeps the `z-index: -1` that makes it receive the board's own light.
  · **The script is gone.** `.cover-back__line` is set in Falutin Title, the
    same face as the essay titles and the front board, and the dead
    `.cover-back__line.hand` rule was deleted rather than left to mislead.
    `--font-hand` is still live for the margin script INSIDE the book, which was
    not part of this decision.
  · **The type is centred**, because the drawing is symmetric about a vertical
    axis it actually draws. Two veils in one pseudo-element keep the head and
    foot legible without hiding the drawing: measured on the composed board, the
    quote holds 9.5:1 at the worst place it crosses, the blurb 12.8:1 and the
    coda 6.8:1.

The cost is resolution: on the board the file runs at **106 dpi**, against 346
at the 92 mm placement. cover-03 was accepted at 82, so this is not new, but it
is the one thing worth regenerating at a larger canvas if that becomes
possible. The botanical is not deleted — it stays as
the other half of the comparison and `botanical` still selects it. The rest of
this entry is the reasoning, kept because the premise turned out to matter.

The outside read questioned the mycelium drawing on the back cover: the book
has developed its own visual vocabulary, and ending on something as botanically
familiar as mushrooms "risks feeling more familiar than the material preceding
it." It is a fair note and it is a cover decision, so it is Adam's.

**The premise is worth re-testing, 22 Aug 2026, before this is decided.** The
drawing is **not mushrooms.** Magnified, it is a row of slender stemmed plants —
thin upright stems with whorls of drooping needle-like leaves, one topped by a
small ring of spore-like dots — over root systems and a mat of fine mycorrhizal
threads. **There is no cap or stipe anywhere in it.**

`content/images.json` described it as "a cluster of mushrooms with their mycelium
threads", which is where that word almost certainly came from, and that
description has now been corrected. Whether the outside reader was looking at
the drawing or at the manifest line cannot be known from here — "as botanically
familiar as mushrooms" reads as a comparison and may have been meant as one. But
the note and the manifest agreed on a thing the artwork does not show, and that
is worth knowing before the artwork is changed on the strength of it.

**None of which settles it.** "Too botanically familiar" may well still be true
of plants and roots; it is a cover decision and it is Adam's. The only claim here
is that the decision should be taken about the drawing that exists.

Options, none urgent: keep it (a quiet counterweight is a legitimate choice);
replace it with something from the book's own vocabulary — a small survey mark,
or the front's off-true ring, which would tie the two covers together; or let
the back carry type alone. The full editorial pass, including everything it
protected, is in [editorial-pass.md](editorial-pass.md).

**A fourth option now exists and is built, 23 Aug 2026.** Adam generated a
drawing of a seed in longitudinal section — laminated coat, green cotyledon,
the hypocotyl hooking out through the base — with the book's own notation laid
over it: concentric off-true rings, dots set on them like readings, a vertical
axis through the whole plate. It is `cover-04-seed-section`, and it answers the
option above almost literally: the ring that would tie the two boards together,
except drawn rather than borrowed.

`build/back-options.html` now shows both back boards at trim size, which is
something this question never had — until today the back could only be compared
by rebuilding the wrap twice, which is part of why it stayed open so long.

What the comparison shows:
  · **Resolution is not the problem.** 1254 px at the 92 mm placement is 346 dpi.
  · **The ground is not the problem.** It arrived on its own cream, fourteen
    values light of the page in red, which would have printed as a bright panel;
    `scripts/reground.py` fixed it. Measured on the composed board, its paper now
    sits 3.2 levels from the board against the botanical's own 4.1.
  · **The real question is the one the editorial read was asking.** cover-02 is
    hatching, no colour, and at 92 mm it very nearly disappears into the board.
    cover-04 is in colour and circular, so the back stops being a counterweight
    and becomes a second emblem. That is a change of concept, not of artwork,
    and it is still Adam's.

Set `backCoverVariant` in `content/book.json` to `botanical` or `seed`. The
default is unchanged, so nothing has been decided by building this.

**It is also offered as a front board** — `seed` in `build/cover-options.html`.
Two honest cautions there. At 300 mm the file is 106 dpi, and what would suffer
is exactly what the drawing is made of, the hairline rings and the dots on them;
cover-03 sits at 82 dpi so this is not a new compromise, but the back placement
asks nothing of anybody.


---

### 12 · The book prints no sources, and mostly does not need to — **RESOLVED**, 22 Aug 2026
Surfaced by checking how the margin notes attribute themselves. Not a defect —
a decision that has never been made explicitly.

**Thirteen of the twenty substantive margin notes name their source in the
printed text**: *"Pew Research Center surveys found…"*, *"In a 2010
experiment…"*, *"In a 2000 MRI study…"*, *"UNESCO's French Santiago
property…"*. That is the book's convention and it works — attribution inside
the sentence, no superscripts, no apparatus.

**Seven state a figure bare, and six of those are reference-book facts**:
sunlight takes 8 minutes 20 seconds, Earth turns once in 24 hours and moves at
29–30 km/s, a resting adult breathes 12–20 times a minute, the first SMS was
3 December 1992, the Shikoku Henro links 88 temples. Nobody needs a citation for
those and giving them one would look nervous.

**The seventh was different and has been fixed.** The starling note stated
Ballerini et al.'s topological-distance finding — six or seven neighbours
regardless of radius — as if it were common knowledge. It is the single research
result essay 03's whole argument rests on, and it was the only non-obvious study
in the book stated without provenance. It now opens *"In a 2008 field study…"*,
matching the convention the other twelve already follow. Still fits the margin;
overflow checked.

**Resolved 22 Aug 2026 — Adam asked for the sources page, and it cost no page.**

Both options above assumed a sources page meant spending one of the 130. It did
not. The verso of the title spread was empty from the head down to the imprint
at its foot — the grid's `1fr` row — and that page is already the book's
apparatus page, carrying the copyright line and the image credits. Sources went
above them, under a rule. The book is still 130 interior pages.

Twenty-eight claims are printed, as `subject — author, publication, year`.
Titles are not: with them the block ran **74 mm past the head of the page**,
measured in a browser, and the choice was between dropping the titles and
dropping the page. Author, journal and year locate any of these in one search.
The full citation with title and URL stays in `content/plan/sources.md`.

**What the page cost instead was six citations, and finding them was the point.**
The ledger held 35 facts and would happily have printed all of them. Six were
for passages the book no longer contains:

| claim | why it is not in the book |
| --- | --- |
| `apollo-heat-shield` | its material break was cut in the trim to 130 pages |
| `block-island-meteorite` | same trim |
| `peacock-structural-colour` | from an older selection pass; no peacock specimen was ever placed |
| `mimosa-thigmonasty` | same pass |
| `sagrada-magic-square` | its photograph is still not in the repository |
| `monastic-acedia` | the passage went in the editorial pass |

The last one is the one worth remembering. The other five had `usedIn` values
like `"photo 177 — specimen label"` — a numbering from a selection pass that
stopped resolving to anything in this repo long ago, and unreadable as an
address the moment you look at it. `monastic-acedia` read
`"essays/the-secret-life-of-attention.md — flow-1b"`. Real file. Real block.
Both still exist. Only the prose inside the block changed, and the word "acedia"
appears on no page of this book. It read as resolvable right up until someone
grepped for the word.

All six are now marked `Unplaced` in the ledger, the same marker
`content/images.json` already uses for a cut asset, with the reason and the date.
Their research is kept — a claim whose passage was cut may come back — and
`content/plan/sources.md` marks them so the two lists read against each other.

`npm run verify` gained **every fact says where it is used, and means it**: each
`usedIn` must name an essay file (and a block, if it names one) or an image id
that exists, or be marked `Unplaced`. That catches five of the six. It cannot
catch `monastic-acedia`, and the check says so in its own comment — no exact
test can tell that a block's prose changed underneath a citation. The
approximate reporter that has always run alongside it did list that one.

A reader who wants to check the Pew figure can now do so.

### 13 · The maple plate is called a stack and stacks nothing — Adam's call

Found 22 Aug 2026 while checking alt text against the actual frames.

`survey-02-corner-maple` carries the printed caption **"Eleven years, drawn at
once."** on folio 34. Its `purpose` field says "The plate draws all eleven years
at once, which is the one view the essay says attention never gives you." Its
generator preset is named **`radial-stack`** and its note reads "one street tree,
eleven years stacked."

**Nothing in the code stacks anything.** The plate is drawn by
`scripts/survey.py maple --size 1600 --seed 7`, and the maple preset is
`warp='radial-stack', octaves=4, levels=30, blooms=4, dots=38`. That produces
ONE warped radial field with thirty contour levels, seven crown lobes from
`cos(th * 7.0)`, and a soft root-mass band at `dy = 0.16`. There is no stack
parameter, no eleven of anything, and no repeated offset copies. Confirmed by
reading the generator, not by squinting at the picture.

**What was actually wrong, and is now fixed.** The alt text restated the caption
literally — "eleven faint rings of the same shape offset behind it, as if the
tree had been drawn once a year and the drawings left stacked" — and described a
plate that does not exist. A screen-reader user was being told to picture
something absent. It now describes the plate that is there.

**What is left, and it is a design decision, not a fault.** The caption survives
as poetry: "eleven years, drawn at once" can fairly mean *this is what eleven
years of a tree looks like compressed into one image*, and it promises no
countable rings. Read that way nothing needs to change. Two other readings are
available and both are Adam's:

* **Implement the stack.** Add a stack of eleven offset contour passes to
  `radial-stack`, so the preset does what its name and note say and the caption
  becomes literally true. The plate would change; it is a fixed-size inset card,
  so nothing reflows and the page count cannot move.
* **Soften the apparatus.** Leave the artwork, and reword the `purpose` field,
  which currently asserts the plate does something it does not. The caption can
  stay.

The plate as it stands is one of the best-looking things in the book. This is not
a request to fix it — it is a note that its own metadata over-claims, so nobody
later reads `purpose` and believes the artwork was verified against it.

---

### 14 · The dividers announce Stages I, II, IV, V — and never III — **DECIDED**
**Adam's call, 22 Aug 2026: option 3. The numerals are gone.** The dividers now
read *Observe the surface · Notice the patterns · Expand the aperture ·
Integrate what is left* — the imperative in weight, the object light, the rust
rule unchanged. Nothing is missing now because nothing is being counted, and the
inversion still arrives unannounced in the middle of Part II, which is the
effect worth keeping.

`stage` stays in the section frontmatter and still drives each page's tone; it
simply no longer prints. `src/layouts/index.mjs` carries a note not to
reintroduce a numeral without first deciding what Part II's divider would say
about containing two stages.

The reasoning that led here is kept below.

Not a defect. A structural decision that had never been written down, and one a
careful reader could see.

The book has **five stages and four parts**, so a part divider can only name the
stage its part opens in. Traced as a reader meets it:

    DIVIDER  Look Again              announces Stage 1   light
      essay  Most of Life Is a Tuesday        Stage 1   cream
      essay  The Secret Life of Attention     Stage 1   cream
    DIVIDER  What Are We?            announces Stage 2   light
      essay  The Beauty of Systems…           Stage 2   cream
      essay  The Intelligence Outside…        Stage 3   DARK   ← the page inverts here
    DIVIDER  The World Is Changing   announces Stage 4   dark
      …

**The book turns dark in the middle of Part II, with no divider to announce it.**
`The Intelligence Outside Your Head` runs at Stage III on charcoal, and the last
label the reader saw said Stage II on cream. Then the next divider says Stage IV.

There is a good case that this is exactly right: the inversion arrives
unannounced, mid-part, the way the essays keep saying a change actually arrives —
*"a revolution is easiest to miss when it arrives as a convenience."* Part III's
divider then names Stage IV having already gone dark, which reads as the book
catching up with something the reader has been inside for sixteen pages.

There is also a case it is a gap: the labels run I, II, IV, V, and anyone who
counts finds III missing.

**Three ways, and it is Adam's call:**
1. **Leave it.** The inversion is better unannounced, and the labels are
   atmospheric rather than an index.
2. **Part II's divider names both** — "Stages II–III" — which is honest and
   costs nothing but gives away the turn before it happens.
3. **Drop the numerals from the divider labels**, keeping the phrases
   ("Observe the surface", "Notice the patterns"). Then nothing is missing
   because nothing is being counted.

Recorded because it is invisible in any single spread and obvious the moment
somebody reads the four dividers in a row.

---

## The photo library

### 6 · The edited export — **DONE**, 21 Aug 18:14
All **6,278 iCloud-only renders are fetched** — the applet ran the whole queue
in about 22 minutes with zero errors and exited cleanly ("all done" in
`~/.cache/render-export/applet.log`). `~/Desktop/photo library edits` holds
6,276 files: every edited photograph in the library, as Adam's own crop and
grade, named after its original with ` (1)`-style suffixes where names collide.
Together with `photo library 2` (all originals) and `photo library rendered`
(clean-named local files), **the library is now fully on disk in every form the
book needs.** The six-hour GUI export this replaced was still less than half
done when it died.

One loose end: minutes after completion, macOS revoked this session's access to
Desktop folders ("Operation not permitted" on every listing — TCC, not disk).
If a permission dialog is waiting on screen, allowing it restores access; the
files themselves are fine. Two straggler checks remain for after that: the
render of the pebble pavement (`IMG_3329 (1).jpeg` or similar — the bare name
went to a 2015 asset) and the three-dogs square (`IMG_2944`), plus re-running
`npm run selection` for the final count.

### The restart plan, kept for the record — RESTARTED, differently, 21 Aug evening
The GUI re-run is no longer the plan. What actually happened, in order:

1. **The full accounting**: every original is already local (23,687 of 23,775)
   and `photo library 2` holds them all. Of 6,613 *edited* photos, only 335
   had their rendered version cached locally — the other **6,278 renders live
   only in iCloud**, and only Photos itself can download them. That is what
   the six-hour GUI export was really doing, and why it was slow.
2. **`osxphotos`** (installed under `~/.cache/osxphotos-venv`, needs the Full
   Disk Access Adam granted) exported everything with a local file to
   `~/Desktop/photo library rendered` — 7,088 files, clean names, resumable.
3. **The 6,278 iCloud renders** are being fetched by a tiny AppleScript applet
   at `~/.cache/render-export/Render Export.app`, which drives Photos in
   batches of 20 into `~/Desktop/photo library edits`, **September 2024 trip
   first**, resumable via `all.txt`/`done.txt` beside it. Log:
   `~/.cache/render-export/applet.log`. Output confirmed 16:9/9:16 — the real
   crops, at last. If it dies, `open` the app again; it picks up where it was.

`npm run selection` reads every `~/Desktop/photo library*` folder, so both new
folders are already searched.

### The stop itself, kept for the record — **IT STOPPED**
**Stopped at 17:27 on 21 Aug, about half done.** 13,456 files, 205 GB, against
roughly 27,000 expected. Photos.app is no longer running, `caffeinate` is gone
too, and an orphaned temp file — `IMG_6218 (1).png.sb-…`, a partial write —
was left behind, so it did not finish cleanly. No crash report was written,
which suggests it was quit or the session was torn down rather than that Photos
died on its own.

**How much this costs is worth being precise about, because it is less than it
looked this morning.** Every one of the eighteen frames verified today came out
of the **unmodified originals** export, which finished: 23,912 stills. The
16:9 shapes this document names turned out to be reachable from their 4:3
parents, and Photos' three collision-naming schemes — ` 2`, the file extension,
and ` (N)` — were the real obstacle, not the export mode. The edited export is
now wanted for one thing only: **frames where Adam's crop or grade IS the
photograph**, of which `IMG_1813` is the proven example — its original is a
pleasant colour snapshot and his black-and-white is a different picture.

**If it is restarted, send it to a THIRD folder.** Re-running into
`photo library edited` makes Photos rename every collision again, which is the
naming mess this document has spent a day untangling. Disk: 474 GB free, and
a full edited export runs to about 350 GB, so **delete one of the two existing
folders first** — the partial edited one is the obvious candidate, and it covers
2009 to April 2022, which is entirely before the September 2024 trip every
wanted frame comes from.

Original note, kept for the record: Running. `File → Export → Export N Photos…` into `~/Desktop/photo library
edited`, which `npm run selection` already reads alongside the originals.

This is the one that unblocks [photo-selection-04](photo-selection-04.md). Every
shape that document names is 16:9 or 9:16; every shape in the *unmodified*
export is 4:3 or 3:4. The frames were cropped in Photos, so the originals export
cannot match the document by dimension. When the edited export reaches the newer
photographs, `npm run selection` should start resolving frames.

Much of that verification is now done — see item 10 and
[photo-selection-04](photo-selection-04.md). Fifteen shape-consistent candidates
were opened on 21 Aug and **nine were the photograph the document describes**.
It still has to be done per frame, by eye, because **six of the fifteen were
not** — four were a different photograph entirely and two had a wrong line
written about them. Eight are the wrong file: iPhone reuses
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
