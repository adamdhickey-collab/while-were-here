# Does each picture earn its place beside the text? — 22 Aug 2026

Written to Adam's brief: *"I'm more concerned about getting the right imagery in
there in the first place to tell a compelling story alongside the text."* Not a
resolution audit. Every spread was set against the prose it carries and asked
one question: **does this picture do work the words cannot?**

---

## The finding: the photograph this book is built on does not exist

The book opens and closes on the same image, deliberately — a ring composition
the editorial pass already admired. Here is what each end actually carries.

**Essay 01, first page of the book:**

> The dog moved twice this afternoon and never woke. The sun came in low and
> crossed half the floor between two and five, and the dog crossed with it — a
> slow pursuit conducted entirely in sleep. I measured it once, out of
> curiosity. **About a meter an hour.**

That is the most specific true observation in the book, and the plate beside it
is **generated** — a fabricated room with a solar survey whose coordinates are
Ottawa's and whose sun angle is wrong for its own stated hour
([open-questions](open-questions.md) item 9).

**Essay 08, last essay:**

> A dog lies in a rectangle of afternoon light on the floor. The bright edge
> moves slowly across the boards. When it reaches her back, she stands, turns
> once, and settles inside the warmer part.

The plate beside *that* is a real photograph — of the dog **outdoors, on autumn
leaves, at a dog park.** No floor, no boards, no rectangle of light.

So both ends of the book reach for one photograph, and neither has it. One has
a fiction with false measurements; the other has a real picture of a different
afternoon.

**It is not in the library.** Photos' own scene labels were searched across all
23,775 images: 871 are labelled Dog, 170 of those are indoors with furniture,
window or floor context, and every one was looked at. There are dogs on sofas,
dogs on beds, dogs standing on floorboards, two frames with hard light bars
across a couch. **There is no dog asleep in a rectangle of light on a floor.**

**This is the single most valuable photograph Adam could take.** He has the dog,
the floor and the window. He needs one clear afternoon and the patience to let
her fall asleep in it — which is, exactly and unimprovably, the thing the book
is about.

---

## What is generated, honestly counted

Thirty of the book's images are Adam's photographs. Twenty-two are generated,
five are archive, four are drawn for the book. But the twenty-two split into two
very different groups, and only one is a problem.

**Drawings, and they should stay** — the survey plates, the crosswalk plan, the
machine timeline, the house section, the specimen card, the eight grounds, the
two handwriting overlays. These are openly drawings. They are the book's visual
language and they do work no photograph could: the maple drawn eleven times at
once, the workbench as terrain, the room sectioned to show water and power. Not
one of them pretends to be a moment that happened.

**Generated photographs of scenes that never happened** — about seventeen. These
are the problem, and the problem is not that they look bad. It is that a book
whose argument is *attend to the actual world* is illustrating that argument
with rooms nobody stood in. The reader who takes the book at its word and looks
closely is the reader most likely to notice.

Two essays already show what the alternative looks like:

| essay | Adam's | generated | archive |
| --- | --- | --- | --- |
| **The Beauty of Systems Nobody Designed** | 5 | **0** | 2 |
| **The Body Cannot Skip the Hill** | 8 | **0** | 0 |
| The Intelligence Outside Your Head | **1** | 4 | 1 |
| The Strange Privilege | 3 | 4 | 2 |
| Most of Life Is a Tuesday | 4 | 5 | — |
| The Secret Life of Attention | 2 | 3 | — |
| The Last People Who Remember Waiting | 3 | 3 | — |
| While We're Here | 4 | 3 | — |

Essay 07 is entirely his and reads as the strongest sequence in the book. Essay
04 — the one about thinking with your hands — has **one** photograph he took,
and it is a page from a book he made as a child. Its opener, its image-essay
plate and its closing are all somebody else's or nobody's.

---

## The shots, ranked by what they do for the story

Resolution is not the ordering principle here. Story is.

**1 · The dog asleep in the rectangle of light.** Opens and closes the book.
Verified absent from the library. One afternoon, indoors, no staging beyond
waiting. If only one photograph is ever added to this book, it is this one.

**2–4 · The workshop, in one session.** Essay 04 is the thinnest essay in the
book and three of its slots are the same room at three moments:
  · **the pencil line on the pine board** — the opener; the prose gives the
    exact number, so the frame only has to show a mark and a tape;
  · **the bench left ready** — tools out, work not begun;
  · **the bench after the work** — the closing; same bench, hands gone.
  Shoot in that order and do not tidy between them. Already shot-list items 4
  and 8; the opener is new here.

**5 · The evening light on a far wall, under a minute from gone.** Essay 08's
image-essay plate, currently generated. The caption already says *"The room is
doing this whether or not anyone is in it."* It is the easiest photograph on
this list and it is in his own house every clear evening.

**6 · The kitchen table with the laptop.** Essay 05's opener. Shot-list item 2.

**7 · The array of single-purpose objects.** Essay 06's image-essay — phone
book, cassette, paper ticket, handwritten numbers. Needs the objects, not the
light.

**8 · The cursor in the dim room.** Essay 05's closing. Nothing on the screen
may be legible.

---

## What the library can already answer

**Essay 01's closing plate** is generated, and its own manifest subject cannot
decide what it shows: *"one photograph taped in — late-afternoon lake, an empty
path, **or** a dog walking away."* Adam has all three, really. The 21 Oct 2018
walk alone is **175 frames at 4000 × 3000**, camera times matching the four the
book already uses. The book currently shows four squares of an afternoon it has
a hundred and seventy-five frames of.

**Essay 02's closing** — "The world didn't change. Your attention did" — is a
generated lake with a synoptic overlay. `library-21-lake-last-light` is a real
lake at last light and is currently unplaced.

**Eleven verified library frames remain unplaced**, including the petal windows,
the calçada, the serpent on the spheres, the organ, the moss trunk, the cat at
the water channel, the pigeon and its shadow. None of them is a dog asleep in
the light, and none of them should be forced into a slot that wants something
else — which is the whole point of this document.


---

## What the library was asked for, and what it does not contain — 22 Aug 2026

Photos runs its own scene classification over the whole library and stores the
labels; `osxphotos` exposes them. That makes the library searchable by *what is
in the picture* rather than by filename or date, which is how the dog question
above was settled. Four generated scenes were put to it. **Three came back
empty, and the empty answers are worth as much as the full one** — they convert
"maybe we already have this" into "this has to be shot."

| the generated scene | searched | result |
| --- | --- | --- |
| **A dog asleep in a rectangle of afternoon light** (essays 01 + 08) | 871 Dog frames → 170 indoor with furniture/window/floor, all viewed | **Not there.** Dogs on sofas, dogs on beds, dogs standing on floorboards, two frames with hard light bars across a couch. Never the scene. |
| **A workbench, tools laid out** (essay 04, three slots) | 821 `Tool` frames intersected with wood/table/desk | **Not there.** Photos' `Tool` label is catching cutlery on dining tables; the only real hit was a boxed tool kit in its retail packaging. |
| **Evening light on a far interior wall** (essay 08) | 330 `Wall` × 499 `Light` frames | **Not there.** The hits are empty-room documentation — moving-day and real-estate frames, flat and overhead-lit. |
| **A kitchen table with an open laptop** (essay 05) | `Laptop`/`Computer` × `Kitchen`/`Table` | 8 frames, none of them the scene. |
| **Rain on a window, one drop meeting another** (essay 08) | 1,533 `Window` × water/rain labels | **Not there.** 63 hits: windows onto snow, windows onto Niagara, windows onto Venice. Never the drop. |
| **Starlings on a wire above a wet sidewalk** (Part I divider) | bird labels × wire/sky/street | **Not there.** 102 hits — hawks, an owl, pigeon flocks in a plaza, geese, one cardinal alone on a wire. No starlings, no wire above a sidewalk. |
| **A dog asleep under a desk** (essay 05) | 871 `Dog` × desk/office/computer | 57 hits, none the scene. |

**The conclusion is firm, and it is not a resolution conclusion.** The generated
photographs in this book are mostly not replaceable from twenty-four thousand
existing pictures, because they depict a kind of moment Adam has never
photographed: the room with nobody in it, the tool put down, the light on its
way out. That is not an accident of his archive. **It is the subject of the
book, and it is the one thing the archive does not hold** — people photograph
each other, and dinners, and dogs on sofas.

Which reframes the shot list. These are not chores to raise a dpi number. Each
one is a picture the book argues for and its author has never taken, and taking
them is the same act the essays keep describing: stopping in front of the
ordinary thing long enough to see it.

**One caution for whoever runs a search like this next.** The labels are useful
and they are not literal. `Tool` means cutlery as often as it means a chisel.
The method finds candidates; it does not identify pictures. Every hit above was
looked at.


---

## What the archive is actually rich in, and what it is missing — 22 Aug 2026

Eight generated scenes have now been put to the library. **Every one came back
negative.** That is too consistent to be luck, and the searches were not wasted:
they describe the shape of the archive.

**Twenty-four thousand photographs are strong in** travel, animals, weather,
food, and above all *people* — plazas full of pigeons, hawks on branches, geese
on grass, snow out of windows, dogs on sofas, dinners, Niagara from a hotel
room, Fabiola laughing, family at a table.

**They are nearly empty of** the room with nobody in it. The tool put down. The
light on its way out. A drop of water on glass. A dog asleep in a rectangle of
afternoon sun.

That is not a gap in Adam's photography. It is the difference between what
people photograph and what this book is about. **Cameras come out for events and
for the people in them.** The essays argue for the opposite — the unphotographed
Tuesday — and the archive is honest evidence for their thesis: he has been
living the argument for twenty years without documenting it, because
documenting it is precisely what nobody does.

Which is the strongest possible reason to take the shots. They are not gap-
filling. **Each one is the book's own argument, performed once with a camera.**


---

## The field notes, checked as a set — 22 Aug 2026

Four personal interludes, one between each part. They are the best short prose
in the book and they follow its hardest rule: observation, no conclusion.

**Three of the four are already Adam's own photographs and are exactly right.**
The lake note describes mooring lines lifting and a loose line tapping a mast,
beside his photograph of that lake. The street note describes somebody stopping
mid-errand under utility wires, beside his photograph of exactly that, framed
wide on purpose so the two figures stay incidental. The fire note describes
carrying chairs out before the light went, beside his photograph of the lit
bowl at dusk.

**The fourth is the exception, and it is the sharpest case in the book of the
problem this document is about.** The tag note is first-person and specific —
*her* collar, *her* code, *his* kitchen, and a server somewhere confirming she
was not missing. Both images on the spread are generated: a fabricated tag on a
fabricated dog.

It is also the easiest photograph in the book to take, and — because the note
says *"she was asleep when I checked it"* — **it is the same afternoon as the
dog asleep in the light.** One sitting answers four slots. See
[shot-list](shot-list.md) items 0 and 0b.


---

## Fourteen dog pictures, and where they fall — 22 Aug 2026

Counted because the audit kept meeting the same animal. She appears in
**fourteen** of the book's images. That is not a criticism — she is a real
presence in this life and the book is about this life — but the distribution is
worth deciding on deliberately rather than discovering in print.

| essay / section | images | of which the dog |
| --- | --- | --- |
| **01 · Most of Life Is a Tuesday** | 10 | **5** |
| 02 · The Secret Life of Attention | 7 | 1 (the generated room) |
| field note II→III · the tag | 2 | **2** |
| 05 · The Strange Privilege | 10 | 1 |
| Part IV divider | 1 | 1 |
| **08 · While We're Here** | 8 | **3** |
| field note · the fire | 1 | 1 |

**Essay 01 is half dog.** Its opener is a dog in a rectangle of light, its
contact sheet is three frames of one dog on one walk, and — since 22 Aug — its
closing plate is that same dog stepping into the river on that same walk. The
essay opens on her, is centred on her, and closes on her.

**And the book's first and last essays are both dog-framed.** Essay 08 opens on
her too, in leaves, on that same October afternoon.

Two ways to read that, and it is Adam's call which is true:

* **As structure.** One animal, one life, ordinary days — the creature who does
  by nature what the essays argue for. The specimen series already does
  something like this invisibly with a single afternoon at a zoo, and it works.
* **As repetition.** Five in one essay is a lot, three of them consecutive on a
  contact sheet, and the closing plate now draws from the same walk as that
  sheet — which is either a satisfying return or the same afternoon three times.

**One concrete option if it reads as too much.** The essay-01 closing was chosen
partly *because* it comes from the contact sheet's walk. If that now feels like
one walk too many, `library-13-cloud-floor-sunset` or the lake at last light
would close the essay on the same register with no animal in it. The frame is
registered and unplaced.

Nothing here is a defect. It is the one pattern in the book's imagery that only
becomes visible when you count.


---

## Front matter and closing page, checked — 22 Aug 2026

**The contents page numbers are right, and they cannot drift.** The page prints
011, 025, 043, 055, 071, 087, 103 and 117; every one lands on the recto of its
essay's opener spread, verified against the built sections. They are also not
typed — `scripts/build.mjs` composes the book twice, pass 1 to find the folios
and pass 2 to print them, with a comment saying why: *"re-pacing the book must
not be able to leave a page lying."* That is a better guarantee than the check
added today, which only compares titles and order.

**The closing catalogue page is correct after the mount fix.** Both plates now
shrink-wrap their photographs with a true 4 mm border on four sides, and both
printed dates match the manifest to the minute — 20 June 2017, 2:39 p.m. and
4 October 2021, 1:56 p.m.

One thing that could be better and is on the shot list now: the *Misery Is…*
cover is an honest snapshot — the book against a wall, filling about half its
frame. On a catalogue page it prints as a mounted plate, and a plate wants its
object filling the mount. Two minutes more in the same session as item 11.

**The material break's caption was measured rather than judged.** *"Oxidized
metal · rust bloom and verdigris · raking light"* sits at roughly 2.5 mm cap
height at a **1.76 : 1** contrast ratio against the verdigris. That is very low,
and it is deliberate — an immersive full-bleed crossover with a caption a reader
finds rather than reads. Unlike the imprint, which was raised on 21 Aug because
a CC BY attribution has to be legible, this one carries no obligation. Recorded
so the number is known, not because it needs changing.


---

## The micrograph is the hardest case in the book — 22 Aug 2026

`ordinary-days-01c3-location-detail` faces the "ordinary photograph nobody would
keep" on essay 01's image-pair spread: one drop of that same lake water, seen
down a microscope. It is the loudest plate in Part I and it earns that.

**It is also generated, and it carries the full apparatus of a scientific
document** — a numbered key (1 Rotifer · 2 Ciliate (mid-turn) · 3 Diatoms ·
4 Desmid) and a scale bar reading 50 µm. Both are **baked into the generated
image**, not overlaid by the layout: none of that text appears anywhere in
build/book.html.

By the rule in [art-direction](art-direction.md), generated pictures may not
contain legible text. This one does, at full legibility, in a serif italic, with
numbered markers placed on organisms.

**And yet it holds up better than that rule predicts.** Measured:

* the key is **accurate** — marker ① sits on a form that is genuinely a
  rotifer, corona and all;
* the scale bar is **internally coherent** — 50 µm measures 1,565 px on a
  6,000 px frame, making the field 192 × 128 µm, and the rotifer measures
  86 × 128 µm within it. Small for a rotifer, and inside the range;
* the diatom is a credible pennate form at a credible size.

So the details are not lying. **The genre is.** This is a fabricated specimen
presented with the instruments of measurement, in a book whose argument is
attention to the actual world — the same shape of problem as the solar plate's
Ottawa coordinates, but harder, because everything inside the frame is
consistent. A reader has no way to catch it. That is precisely what makes it the
strongest case, not the weakest.

**One inconsistency was found and fixed.** The alt text claimed "at 400×", which
the plate's own bar contradicts: a 192 µm field implies something nearer 1000×,
while 400× would give roughly 500 µm — 2.6× wider than what is shown. The bar is
printed and the alt text was not, so the bar wins. The number is gone; the plate
never needed one, because it has a scale bar.

**Is there an alternative?** Honestly, not a cheap one. Unlike the sleeping dog
or the workbench, this cannot be answered with a phone and an afternoon — it
needs a microscope and a drop of pond water. Recorded as the one generated plate
in the book with no realistic path to being real, so that nobody spends a
weekend discovering that.

---

## Alt text against the actual frame
*22 Aug 2026*

`npm run verify` has a check called **every content image speaks to a screen
reader**. It confirms that alt text *exists*, is not empty, and is not a
filename. Nothing in the repository confirms that it is *true*. The `subject`
field is what a screen reader reads out and what the manifest uses to describe
the book to its own author, so a wrong one is not a cosmetic fault — it is the
book describing a picture it does not contain.

The only way to check is to open the frame and read the sentence beside it.
**Six of the eighty-three described images have now been checked this way.**
Three were wrong, one had a significant omission, two were exact.

| image | verdict |
| --- | --- |
| `ordinary-days-01l-fabiola-sign` | **wrong** — called the wall "blank" and "empty" twice. It is ruled with dozens of close horizontal scored lines and holds a bricked-up doorway directly behind her. The sign does read FABIOLA; that was checked. |
| `pilgrimage-05-cordoba-bridge` | **wrong** — "throwing their shadows forward". The bollard-lantern is *ahead* of the pair, so the shadows fall back toward the camera. The truth is the better picture: they walk away while their shadows reach toward the reader. |
| `part-3-divider-alcazar-baths` | **wrong** — "still black water". The water is amber; it carries the gold of the vaults, which is the most striking thing about the frame. A reader who cannot see it was being given the opposite impression. |
| `pilgrimage-02-fatima-esplanade` | **incomplete** — every claim true, but a tall mesh-clad scaffold tower stands on the paving between the basilica and the monument and was not mentioned at all. Now it is, and it belongs: a temporary scaffold on an esplanade built for a hundred thousand is part of the honest picture. |
| `pilgrimage-04-montserrat-cloud` | exact. |
| `systems-03-muqarnas-vault` | exact — "lattice-light falling across the lower wall" is precisely the bright patch at lower right. |

**What the pattern suggests.** All four faults are of one kind: a detail
recalled rather than looked at. "Blank wall", "black water", "shadows forward"
are all what the scene is *like* from memory. None of them survives thirty
seconds with the file open. This is the same failure that once read **EAST** for
**FAST** on a VHS spine at 1200 px — plausible, confident, and wrong.

### Second batch

Four more, chosen because their descriptions make the most falsifiable claims —
readable text and countable things, which is where the first batch failed.

| image | verdict |
| --- | --- |
| `privilege-08-vhs-shelf` | **wrong, twice** — "written on a white label in ballpoint" over an ink that is plainly **red**, and no mention of the **earlier title scribbled out above it in the same pen**. A tape recorded over and relabelled is this book's whole subject; it was the best detail in the frame and it was missing. Both fixed. |
| `pilgrimage-08-plaza-stones` | **wrong** — "a dozen other people". Counted across the frame it is nearer **three or four dozen**, and most are along the arcades rather than out on the stones, which "scattered across it" also misplaced. |
| `privilege-07-grill-screen` | exact — 190°, 124°, 03:09:35 and "Select Grill Profile" all read as written. |
| `specimen-05-bactrian-swim` | exact, and better than exact: "bodies overlapping so the count is not readable — four or five" is the honest form. It refuses a number the picture cannot support. That is the register the rest of this file should be in. |

**The VHS spine was re-checked deliberately.** `Life in the Fast Lane` is the
frame where an earlier pass read **EAST** for **FAST** at 1200 px and nearly
wrote a false correction into printed alt text. Magnified at native resolution
the first glyph has a top bar and a middle bar with an open foot: an F. Context
agrees — the shelf is skate videos, "Welcome to Hell" is a Toy Machine tape, and
*Life in the East Lane* is not a thing. **The alt text was right. No change.**
Worth recording that a re-check confirmed the copy rather than changed it.

**The eight grounds are NOT part of this audit, and should not be added to it.**
They carry `alt=""` — correctly decorative — so no screen reader ever reads
them, and their `subject` field is the *generation prompt*, composition
instructions and all, not a description of the result. They score highest on any
"falsifiable claims" ranking because the prompts are full of counts, which is a
trap: nothing they say is ever spoken or printed.

### Fourth batch — and the pattern behind all of it

The maple was not one bad sentence. **Every image drawn by a recorded recipe had
its concept brief in the `subject` field instead of a description of the plate.**
All four survey plates run through the same code — `field`, `warp_mask`,
`draw_contours`, `paint_washes`, `draw_network` — and differ only in warp shape
and four counts, so what they can possibly contain is knowable exactly.

| plate | claimed | `survey.py` actually draws |
| --- | --- | --- |
| `survey-02-corner-maple` | eleven offset rings | `levels=30`, one field, seven crown lobes |
| `survey-04-two-roads` | "a folded, creased and annotated network" and "a single clean line laid over it" | two identical contour ridges, same treatment on both |
| `survey-01-familiar-lake` | "the walking route as a single hairline returning to itself" | a nearest-neighbor graph — which on a concentric form *does* emerge as a ring, but a chain with chords across it, not one closed line |
| `survey-03-workbench-field` | "tools as small dense masses" | noise maxima; every named element has a visual counterpart, so this was the least wrong |

All four now describe the plate that exists, with the concept kept only where it
is true. **`draw_network` joins each point to its two nearest neighbors with a
capped length** — it cannot draw a route, and three of the four descriptions said
it did.

**The pattern is testable and was tested.** Scanning every spoken description for
brief language — "must", "should", "the form here is", "reading as" — against
`origin`: **44 photographs, zero hits.** Every hit was generated or original
artwork. Descriptions written from a photograph describe the photograph;
descriptions written from a brief describe the brief. That is where to look next
if this continues.

### The cover, and a fault that is not one

`cover-01-watercolor-systems` carries a 24-hour scale along its foot. It reads
**0 · 6 · 6 · 12 · 1A. · 2A · 24h** — a repeated 6, and two garbled tokens where
18 and 24 belong. Confirmed at magnification: the second glyph in each is plainly
a letter A.

**It is not on the printed cover.** `.cover__art--bleed img` scales the plate to
106% anchored to the top, so the visible band is the top 94.3% and the labels sit
below the trim. Verified by looking at the rendered cover, not by arithmetic: the
colored strip shows, its numbers do not. This is what the CSS comment means by
"carries its busiest band below the trim."

Recorded so that nobody finds it later and panics — **and so that nobody changes
that crop without knowing what is waiting underneath it.** Reducing the oversize
below about 106% would bring garbled numerals onto the front cover of the book.

The block of marks at the middle right is also *not* the open-question-8 fault.
Those spines spell wrong words — "Hnadtoo drdrtatr" — that resolve into letters.
The cover's text block never resolves; it is abstract greeking, the convention an
architectural drawing uses, and reads as texture at any size.

### Third batch

| image | verdict |
| --- | --- |
| `privilege-09-crosswalk` | **incomplete** — described an empty crosswalk, three people and the Washington Monument, and never mentioned that the whole middle band of the frame is a **construction site**: chain-link fence, concrete barriers, two excavators, broken concrete, mounds of bare earth running the full width. A screen reader was given a quiet street. Fixed. |
| `systems-06-geese-path` | **exact, and precisely so.** It claims "exactly two are out on the asphalt, standing abreast and facing the same way." At thumbnail size I counted three and was about to correct it. Magnified: two, abreast, both facing left. The third bird is on the grass. Same lesson as the VHS spine — **check at size before correcting anything.** |
| `here-06-empty-room` | exact. |
| `north-01-gorge-cut` | exact. |

**The printed CAPTIONS were audited too, separately from alt text** — 29 of them,
all resolving to a known image. Almost all are short lines that make no
falsifiable claim ("The path was poured for other feet"). One does:
`here-07-ceremony` reads **"Thirty minutes, on a Thursday afternoon."** The
placed file carries no EXIF date, so that cannot currently be checked. If
`scripts/findsource.py` locates the camera original it will settle it, since the
original will carry a timestamp.

### Fourth batch — and the yield is falling, which is the point

| image | verdict |
| --- | --- |
| `walk-03-found-water` | exact, including "her reflection breaking under her". |
| `ephemera-01-window-plant` | exact. |
| `walk-02-same-woods` | **overstated** — the dog is in the near ground, not "the middle distance", and four or five people stand much further back among the trunks and were unmentioned. |
| `north-02-aspen-up` | **overstated** — "looking straight up" is an upward angle of maybe forty-five degrees, not a vertical one. Now "steeply up". |

Two exact, two small overstatements, no outright errors. **The hit rate is
dropping — first batch three wrong of six, this one none wrong of four — which
is what should happen if the earlier passes caught the worst of it.**

### What the pixel matcher CANNOT do, tried and recorded

`findsource.py` was pointed at `attention-01-familiar-room`, the generated
opener whose book spines are gibberish (open question 8), on the theory that
querying a fake room would surface real ones. **It does not work.** Every score
came back around 26 — the noise band — and the six nearest frames were two
selfies, a seascape, a mountain, a road and a screenshot.

The tool compares composition and tone, so it finds THE SAME PHOTOGRAPH and
nothing else. It is not a semantic search and cannot be made into one by
pointing it at a subject. Open question 8 still needs Adam's own room
photographed, or the crop.

### Fifth batch — six checked, nothing wrong

`part-1-divider-sidewalk-birds`, `attention-05-crosswalk-strangers`,
`hand-01-marginalia-set`, `field-note-02-dog-tag`, `systems-05-physarum-network`,
`systems-02-starling-flock`. **All six accurate**, including three precise claims
that were specifically tested:

* the crosswalk survey's shadow polygon really is **hatched**, not merely
  outlined;
* `hand-01` really does carry **seven** annotations, inside its stated "six to
  eight", with the bracket, arrow, underline and crossing-out it names;
* the Physarum dish really does show **thick trunks and thin branches** — fine
  yellow veins running between the oat flakes.

**The scannable-code rule was verified rather than assumed.** `shot-list.md`
states that "this book prints no scannable codes", and `field-note-02-dog-tag`
shows a square code on a pet tag. Magnified 5×, the pattern has **no QR finder
squares and no Data Matrix L-border** — it is structurally not a valid symbology
in either format and cannot decode. It is a generated plate, so the code is a
picture of a code. The rule holds. Worth confirming, and worth remembering that
the REAL tag will be scannable when that shot is finally taken; the shot list
already says to shoot it at an angle.

### The trend, and what it means for carrying on

Batch one: **three wrong of six.** Batch three: one of four. Batch four: two
small overstatements of four. Batch five: **none of six.**

That is convergence, and it is the expected shape — the early passes took the
worst. **Three times today a thumbnail misled me and magnification corrected it**:
the geese I nearly "fixed" from two to three, the Physarum network that looked
like blobs, and the VHS spine that once read EAST. The method that works is
always the same one: open it at size before changing anything.

### Sixth batch — the one real error was a word

| image | verdict |
| --- | --- |
| `ordinary-days-01j-quiet-close` | **WRONG.** Said "a single line of **handwriting** beneath it". Magnified, there are no letterforms at all — it is a **drawn wavering trace** running along the ruling and ending in a small dark dot, the kind of line a plotted reading makes. A screen reader was being promised words. |
| `ordinary-days-01b-tabletop-object` | **incomplete** — listed every entry on the specimen card correctly and never mentioned that **a photograph of the mug is taped to its left half**, which is half the picture. |
| `ordinary-days-01c3-location-detail` | exact — the scale bar really reads **50 µm** and the key really numbers **four**: rotifer, ciliate, diatoms, desmid. |
| `part-2-divider-branching` | exact — four systems, and the street grid really is a grid. |
| `intelligence-07-child-hand` | exact on everything checkable here: **five lines**, ruled page, green cover along the edge. The disputed word is item 7 and is Adam's, not mine. |
| `attention-04-lake-weather` | exact, and the hardest claim in the batch to test: "two isobars and a frontal boundary … drawn so lightly they could be missed on the first pass". They are invisible at normal contrast and appear at 2.2×. The description is right about them being nearly invisible, which is the part that would have been easiest to get wrong. |

Two wrong of six, after none of six — so the yield has not gone to zero, and both
faults here are the same shape as the good ones elsewhere: **a plausible word
that nobody re-checked against the picture.** "Handwriting" for a wavy line and
a card described entirely by its text while a photograph sits on half of it.

### Seventh batch — and one of them reaches an open question

| image | verdict |
| --- | --- |
| `cover-02-back-botanical` | **WRONG, and it matters beyond the alt text — see below.** |
| `ordinary-days-01a-dog-afternoon-light` | exact, and it is the most detailed claim in the book: sun altitude **61.2°**, azimuth, the window aperture in plan, the light parallelogram dimensioned in millimetres, and the dog marked **OPTIMUM POSITION X: 1325 Y: 190**. Every element is on the plate. |
| `hand-02-overwriting-diagram` | exact — four lines, within its stated "four or five", at a slight angle. |
| `material-02-oxidized-metal` | exact. |
| `ordinary-days-01c2-location-broad` | exact — corner mounts, the pencil note reading *"same path, same water — 17 May"*, and the torn strip of tide table taped alongside. |

**The back-cover botanical is not mushrooms.** Magnified, it is a row of slender
stemmed plants — thin upright stems with whorls of drooping needle-like leaves,
one topped by a small ring of spore-like dots — over root systems and a mat of
fine mycorrhizal threads. **There is no cap or stipe anywhere in the drawing.**
The manifest called it "a cluster of mushrooms with their mycelium threads".

**That word had travelled.** Open question 11 records an outside editorial read
saying the back cover ends on "something as botanically familiar as **mushrooms**"
and asks whether to replace the artwork. The manifest is the likeliest source of
the word, and the note has been annotated: the drawing that exists is not the
drawing the critique describes. *This does not settle the question* — "too
botanically familiar" may hold for plants and roots too, and it is Adam's cover
decision either way. It only means the decision should be taken about the actual
artwork.

This is the second time today a wrong description has propagated into a
downstream judgement — the first was `here-07-ceremony`, where "all small in
frame" had been written into a consent note that then argued from it.

### Eighth batch — two wrong, and one of them contradicted a printed rule

| image | verdict |
| --- | --- |
| `field-note-02-tag-code` | **WRONG.** Called the pet tag's marking "a square **scannable** code" — in a book whose own rule is that it **prints no scannable codes**. The plate is generated, so the pattern encodes nothing; it is a picture of a code. It also said the tag "fills the frame" when it takes about a third of it. Both fixed, and the entry now says explicitly why the plate is inside the rule rather than leaving a reader to reconcile the two. |
| `field-note-03-street-and-dog` | **WRONG, twice.** "An empty suburban street" has a car coming toward the camera with its headlights on, a motorcyclist, and vehicles parked along both curbs. "Two small figures stopped on the sidewalk" is one woman crouching with the dog — and she is in the near foreground, not small. |
| `intelligence-02-cards-table` | exact. |
| `intelligence-04-route-line` | exact. |
| `privilege-02-machine-timeline` | exact — three artefacts drawn separately, not a timeline, exactly as claimed. |
| `field-note-04-firepit` | plausible on everything checkable at this size; "seated in profile" is arguable, since she is turned toward the fire holding something to her ear. Not changed. |

**A note on the street entry, for whoever revisits consent.** Its consent note
argues she is "not identifiable at that size". The corrected description
deliberately does NOT name her, although `ordinary-days-01l-fabiola-sign` names
her outright. Alt text is read aloud, and putting a name to a figure whose
consent argument rests on anonymity would quietly undo that argument. If the
naming convention should be consistent, make it consistent by decision.

**And the American-English check caught me writing "kerbs"** — the very word I
added to its stem list earlier today after finding "kerb" in this same manifest.
Third time today that check has caught my own writing rather than the archive's.

### Ninth batch — one wrong, and it had borrowed the book's own sentence

| image | verdict |
| --- | --- |
| `here-04-window-water` | **WRONG.** Claimed "one drop meeting another and changing direction". Magnified, the glass carries several hundred small static droplets — a few touching, **nothing running, no trail, no drop changing course anywhere.** |
| `before-time-04-waiting-clock` | exact, and the claim that matters is the one it gets right: "**none of them holding anything**". Three people, hands at their sides or in pockets. That absence is the whole point of the frame. |
| `specimen-02-queen-butterfly` | exact, and precise about a hard thing. It names "white spots scattered across the forewing", which is the feature that separates a **Queen** from a Monarch on a closed-wing view — Monarchs carry their white spots on the black apex and margins. The book has a fact about exactly that mimicry, so the identification is load-bearing and it is right. |
| `privilege-04-two-reviewing` | exact. |
| `here-02-house-section` | plausible; the five systems are not separable at reproduction size and were not counted. |
| `specimen-01-komodo-tongue` | description exact — head at rest, one eye open, nostril and jawline. **No tongue is visible anywhere in the frame**, and the description does not claim one; it is the *id* that says "tongue". The specimen label beside it discusses the forked tongue as a fact about the animal, which is normal for a plate. Same class as `systems-01-observation-hive`, whose id still carries the ants it replaced. Not worth renaming; worth knowing. |

**Where the wrong sentence came from is the interesting part.** The book's own
field note reads *"Water strikes the window, joins another drop, and changes
direction."* The description restated the prose instead of describing the
photograph — the same fault as the four survey plates, which described their
generation briefs. **A description written from the text beside it will always
sound right and cannot be trusted.**

### Tenth batch — and that is all of them

| image | verdict |
| --- | --- |
| `attention-03-light-on-a-wall` | exact, and it gets the detail the essay turns on: *"her phone is in her hands, behind her back"* while she watches the light. The rope barrier, the line of clay amphorae along the wall's foot, the scatter of colored light high on bare ashlar — all there. |
| `specimen-07-amur-tiger` | exact — head low, whiskers forward, following something at ground level. |
| `specimen-06-prairie-dog` | lying flat, legs out behind, on sand: all confirmed. **"Eyes closed" I could NOT verify** — the file is 1280 × 960 and the head is too small to resolve the eye. Left alone rather than changed on a guess. |
| `here-08-dog-resting` | the bed and the wall of small art cards are right. **"Front paws crossed" and "ears forward" I could not settle** at this angle — one foreleg is extended with a paw at the frame edge and the ears read as relaxed rather than pricked, but neither is clear enough to call. Left alone. |

### Recorded late: the batch that only reached the commit log

These four were checked on 22 Aug in the same pass as `here-07-ceremony` and
written up in the commit message rather than here. A commit message is not where
anyone looks. Added so this file is the whole record.

| image | verdict |
| --- | --- |
| `pilgrimage-07-switchbacks` | **wrong** — said "three walkers far below". There are **six** people: three walking alongside the mule train and three more below. "The figures are a few pixels each" was replaced with the measurement that supports the judgement: under four millimeters on the page, none identifiable, which is why it correctly carries no consent note. |
| `before-time-06-thanksgiving` | **wrong** — "two of them children wearing paper crowns". Only one is a crown; the boy wears a **paper headdress with upright feathers**. Logged as open question 3b, since whether that frame stays is a decision and not a defect. |
| `systems-07-moon-jelly` | exact, including **four horseshoe-shaped gonads**, which is correct *Aurelia* anatomy and correct to the frame. |
| `here-10-ano-viejo-burning` | written from the frame during placement rather than audited afterwards — the same standard, arrived at from the other direction. |

## The audit is complete — all 83 spoken descriptions checked

**About twenty carried a fault.** They fell into four kinds, and the kinds are
more useful than the list:

1. **A detail recalled instead of looked at.** "Blank wall", "black water",
   "shadows forward", "paper crowns", "a dozen people". Each is what the scene is
   *like* from memory. None survives thirty seconds with the file open.
2. **A description written from the brief.** All four survey plates described the
   concept they were generated from rather than the plate that came out —
   "eleven faint rings" that the code never draws.
3. **A description written from the prose beside it.** `here-04-window-water`
   claimed "one drop meeting another and changing direction" because the field
   note next to it says exactly that. The glass holds several hundred static
   droplets.
4. **A true description that left out the biggest thing in the frame.** The
   crosswalk's construction site, the lake's boy, the specimen card's taped
   photograph, the scaffold tower at Fátima.

**Two of them had propagated into decisions.** `here-07-ceremony`'s "all small in
frame" had been written into a consent note that then argued from it; and
`cover-02-back-botanical`'s "mushrooms" is the likeliest source of an outside
editorial read that asks whether to replace the back cover. A wrong description
does not stay in the manifest.

**And the method, which held up every time.** Three times a thumbnail nearly made
me *introduce* an error into correct copy — the two geese I read as three, the
Physarum network that looked like blobs, the VHS spine that once read EAST.
**Open it at size before changing anything.** Where size could not settle it —
the prairie dog's eye, the dog's paws — say so and leave it.
, and on this trend most of
them are fine. Continuing is still worth doing — the crosswalk's missing
construction site was found in batch three — but the yield is now low enough that
it should not crowd out other work.
 That is the honest
state. No check can do it; it needs eyes on each frame beside its sentence.


---

## The unplaced descriptions
*22 Aug 2026*

The 83 spoken descriptions are done. This is the tier below them: **26 unplaced
images that have files**. They do not print, so they are not an accessibility
question — but they are what Adam reads when deciding whether to place
something, and a wrong one produces a wrong placement decision. That is exactly
what the back-cover "mushrooms" line did to open question 11.

### First two batches — ten checked, two wrong

The four-season sequence is written up in [shot-list.md](shot-list.md): one
generated photograph recoloured four ways, described as four visits, beside an
essay that claims a real sequence. **The one generated plate that would
contradict the copy it illustrates.**

| image | verdict |
| --- | --- |
| `ordinary-days-01f1-pavement-shadow` | **wrong** — "a railing, a branch, **a person out of frame**". Checked across the whole photograph at 2.2×: railing balusters, dappled foliage, a fallen twig, a few dry petals. **No human shadow anywhere.** |
| `ordinary-days-01e-two-walking` | exact, and precisely so. The panel header reads **"MUSCLE FIRING ORDER (11)"** and lists eleven, gluteus maximus through abdominals — the description's "eleven muscles numbered in sequence" is literally what is drawn. Centre-of-mass arc, ground-reaction vectors and both moments all present. |
| `ordinary-days-01c-lake-quiet` | exact, down to the legend: depth contours, soundings, algae-green shallows, the dashed shore path, and a cross keyed **"UNEXPLAINED STOP"**. |
| `ordinary-days-01f2-bird-shoreline` | exact — one sandpiper, low water, the label reading *4:05 PM / low water*. |
| `ordinary-days-01f3-dog-nose-grass` | exact. |
| `attention-02-field-notes` | exact — the room drawn twice, once in fine blue hairline and once as four or five red marks. |
| `ordinary-days-01k-room-survey` | exact — cobalt dimension lines over the window, sofa and table; rust hairlines following the monstera. |
| `ordinary-days-01i-kitchen-light` | plausible at reproduction size; the individual items on the album leaf were not separately identified. |

### Third batch — three wrong of six, and one contradicted the stylesheet

| image | verdict |
| --- | --- |
| `material-03-glass-condensation` | **WRONG, and self-contradictory.** Claimed "droplets holding tiny inverted images of whatever is outside" while also saying the world beyond is "entirely out of focus". At 5× the droplets hold nothing — they are dark rings with pale centres. They could not hold an image: **a background with no detail in it has nothing to invert.** Same shape as `here-04-window-water`; both water descriptions overclaimed optics. |
| `cover-03-circular-systems` | **WRONG** — "sitting on warm cream paper **with nothing outside it**". There are four small circular vignettes in the cream around the disc and several tiny scale figures along the bottom. **The stylesheet already knew**: `src/styles/cover.css` turns the orb clip off for this artwork *precisely because* it has "inset figures and scale figures outside it in the cream". The manifest and the CSS disagreed, and the CSS was right. |
| `material-01-linen-weave` | **wrong in one clause** — "lit raking from one side so the weave throws its own shadows". The light is flat and even; nothing casts a shadow. The slubs and thread irregularities it also claims ARE clearly visible at 4×, through tone rather than shadow. |
| `attention-03-dog-sunlight` | exact — the light patch really is plotted at **six** numbered positions with displacement arrows in cm h⁻¹, and it shares its solar geometry with `ordinary-days-01a` down to **altitude 61.2°**. |
| `systems-03-termite-section` | exact — parallel floors, connected ramps, chambers. |
| `part-3-divider-machine-dark` | exact — room-sized computer with a figure for scale, a fingernail chip, a blinking cursor, one line weight on dark. |

**The pattern in this tier is sharp: every DRAWN plate is exact, every
PHOTOGRAPHIC one has drifted.** The lake survey down to "unexplained stop", the
eleven numbered muscles, the six light positions, the termite section, the
machine divider — all precise. The seasons, the shadow card, the condensation and
the linen — all wrong about what the camera actually did.

**Ten unplaced descriptions still have files and have not been checked.**

### Fourth batch — six checked, and the pattern turns out to be wrong

| image | verdict |
| --- | --- |
| `micro-01-graphite-ridge` | **WRONG** — "fibres of the sheet visible under and between them". `scripts/micrograph.py` draws no fibres: the paper is `gaussian_filter(rng.random(...), size/300) * 0.16`, a soft noise field. The plate confirms it — the ground behind the flakes is an even blur with no linear structure at any magnification. The flakes themselves are right. |
| `micro-02-die-surface` | **incomplete** — accurate as far as it went, but silent about the two features that most say *die*: the elbows where traces turn, and the ~120 ringed vias stitching the layers. Both are drawn, both are visible. Added. |
| `micro-03-tape-oxide` | exact, and unusually so — 3,800 needles combed one way, ~6% crossing (`rng.random() < 0.06`), angles scattered `normal(comb, 9)`, binder at 0.12. Every clause in the description has a line of code under it. |
| `pilgrimage-02-yellow-arrow` | exact — small painted arrow low on the kerb, ordinary lane, parked cars, bare trees. |
| `pilgrimage-04-tending-feet` | exact — two walkers sitting against a white roadside wall, boots off beside them, heads down over their feet. |
| `pilgrimage-05-stamped-booklet` | exact — booklet open on a rough wooden surface against a plain wall, stamps in blue, red and violet, one to a stop. |

**This batch breaks the pattern the third batch proposed.** "Every drawn plate is
exact" was the wrong rule; it just happened to hold for ten plates. The real
division is not drawn versus photographed, it is **described from the output
versus described from the brief**. Every plate whose description was written by
looking is exact, whatever made it. Every plate described from the instruction
that produced it — all four survey plates, and now `micro-01` — drifted, because
a brief says what was *asked for* and the code does something slightly narrower.
`micro-03` is the control: same generator, same recipe, and it is exact, because
whoever wrote it read the code.

`micro-01` also shows the failure is not always an overclaim about a photograph.
It is an overclaim about *anything not looked at* — here, a synthetic image whose
source is forty lines of Python sitting in the repository.

**All unplaced descriptions with files have now been checked.** The one
remaining, `here-09-ano-viejo`, was written from the frame during this session.

## The three captions that print — checked against the source, 23 Aug 2026

The description audit covered manifest metadata, which mostly does not print.
**The book has exactly three captions, and all three make falsifiable claims:**
a date, three clock times, and an interval. They sit under the contact sheet in
"Why Ordinary Days May Be the Point of Life."

The times do not come from EXIF — the placed crops have none, and the JPEGs lost
theirs. They come from a Facebook export's album HTML "Taken" field, recorded on
21 Aug. That export is still on disk, so the claims were re-checked against it
rather than against the note that describes it.

**The walk of 21 Oct 2018 is twelve frames**, 2:51 pm to 3:49 pm. All three
printed times are in it — 2:58, 3:11, 3:26 — and 2:58 to 3:26 really is
twenty-eight minutes.

**Then the check that matters: are the times on the right photographs?** This is
the failure that captioned Granada as Rome on the first contact sheet — correct
metadata beside a different picture. Each export frame was matched to its placed
file by pixels: **0.3, 0.1 and 0.0.** They are the same photographs. The times
are right and they are on the right frames.

### One caption overclaimed, and it printed

> `October 21, 2018, 3:26 p.m. / same corner, twenty-eight minutes on`

The twelve frames show a walk that kept **moving** — leaf floor, floodwater, a
log, a dirt path, sand, a wooded track. The 2:58 and 3:26 frames are visibly
different ground: dense trunks with hard parallel shadows in one, taller open
woods with a path and distant figures in the other. Nothing supports returning
to one corner.

**The manifest already had the honest word.** The image is filed as
`walk-02-same-woods` and its own subject line reads *"The same **woods**, the
same dog"*. Its concept is *"The route repeats."* The caption tightened *woods*
into *corner*, which is a different and unsupported claim. Corrected to **"same
woods, twenty-eight minutes on"** — the manifest's own word, the essay's own
argument, and true.

Same failure as the whole description audit — a line written a shade tighter
than the photograph earns — except this one was printing.
