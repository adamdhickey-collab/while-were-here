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
