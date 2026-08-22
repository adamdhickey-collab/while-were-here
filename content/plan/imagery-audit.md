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

**Seventy-three images have not been checked this way.** That is the honest
state. No check can do it; it needs eyes on each frame beside its sentence.
