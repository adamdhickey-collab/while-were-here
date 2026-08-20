# Photo selection 05 — the Facebook archive

Source: `~/Desktop/facebook-adamdhickey-2026-08-19-LoY8i3Bz`. Background,
resolution survey and the reasoning behind the whole approach are in
[personal-archive.md](personal-archive.md).

**201 frames reviewed** across the eleven albums that map onto open slots.
**Four separated. Two placed. Two pulled at placement.**

The archive cannot supply photographs. The median long edge is 1,280 px, which
is 108 dpi at 300 mm, and four files in 1,460 clear 2,400 px. Everything below
enters the book as a **screen print** or not at all.

---

## Placed

### Part IV divider — a figure at the river

`KylieatthePark2014/10203541730358509.jpg` · 1,280 × 960 → `print-01-river-figure`

Somebody standing at the edge of a river with their back to the camera,
watching a dog swim. Treeline behind, glitter on the water.

- **Why it works.** Three masses and nothing else: sky, water, silhouette. The
  separator needs exactly that, and the figure survives as a shape while
  disappearing as a person.
- **Where.** The divider that returns the book to warm paper after two dark
  parts. Stage V inks it in rust and amber.
- **What it buys.** Part IV is about distance, arrival and ordinary rooms, and
  it now opens on somebody from this life standing still in front of water,
  rather than on a drawn route.

### Essay 04 pull quote — a penguin underwater

`Zoo2014/10202982638261556.jpg` · 1,280 × 960 → `print-03-penguin-water`

A penguin below the surface, wings out, against a broken field of light.

- **Why it works.** Almost heraldic once separated, and it belongs to the
  natural-history register the book keeps generating imagery for.
- **Where.** Facing *A mind can be distributed without being divided*, on the
  Stage III dark ground. A body sensing through the medium it moves in.
- **What it replaced.** The orb-web drawing, which stays a good idea and should
  come back as a diagram rather than as a plate.

## Pulled at placement

Both looked correct as flat three-colour composites and failed in the book.
This is the same failure the cloud floor had, and it is the reason the
verdicts in [screen-print.md](screen-print.md) are recorded per source.

**A forest horizon** (`NorthShoreFall2017`) on the Part II divider. Canopy is
dense across the lower half, so nearly every pixel falls below the darkest cut,
the ink plate covers almost the whole frame, and the multiply stack resolves to
near-black. A landscape read at distance is masses; the same landscape read at
1,280 px is texture.

**An empty room** (`NewHome`) in the essay 08 image essay. The separation is
good and the slot is wrong: a 4:3 source cropped to a 2:3 tall plate loses the
window, and the window was the subject. It would work as a band or a full
spread, and there is no band left in that essay.

---

## Held, not placed

Separated, verified, and worth having if a slot appears. All from the eleven
mapped albums, all 1,280 px, all usable only as prints.

| Source | Subject |
| --- | --- |
| Zoo2014 | Penguins on rock against a flat sea and sky. The most minimal frame in the archive |
| Zoo2014 | A Komodo dragon's head on sand, one eye, raking light |
| Zoo2014 | A eagle owl, front on |
| Zoo2014 | A sea turtle in teal water |
| NorthShoreTrip | A waterfall as one sheet |
| MayDayParade2015 | A crowd seated in two lines down an empty street, waiting |
| NorthShoreFall2017 | Birch and spruce against open sky |

## Rejected for the separator

Everything whose interest is texture. The dog-park albums are the clearest case:
dappled light through autumn trees is the most beautiful material in the archive
and the worst possible input, because fine repeating texture cannot survive the
reduction and comes back as noise. Tested and confirmed on
`DogParkFall2018/10214271091745838.jpg`.

## Not touched

`your_facebook_activity/messages/` — 1.2 GB, 2,318 files. Other people's
photographs inside private conversations. No slot in this book needs it and
nothing should be taken from it.

## Specimen cards — the second route, and the one that keeps the photograph

Two frames from the Zoo album are now real photographs in the book, at 66 mm,
which is **493 dpi** and the only size this archive supports. Not abstracted,
not retouched, not upscaled.

`specimenCard()` in `src/layouts/index.mjs` already existed as a data card and
now carries its own plate, so a card is a small photograph with its record set
under it in mono.

### Danaus gilippus, essay 03

A queen butterfly closed on a grass stem. Milkweed as a larva, cardenolides into
adulthood, and the same warning pattern the monarch wears — with neither species
copying the other. The pattern is held in place by the birds, which is the
essay's argument arriving as a real animal rather than as a diagram.

**It was logged as a monarch on the first pass and that was wrong.** Chestnut
ground rather than orange, white spots scattered across the middle of the
forewing, and none of the monarch's heavy black venation. Had the card gone out
labelled *Danaus plexippus*, it would have carried a false record on a page
arguing for looking at the actual world, and the monarch migration fact does not
apply to this animal at all.

### Varanus komodoensis, essay 04

The tongue is forked so it can sample two places at once. Both tips press to
paired organs in the roof of the mouth, and the difference between the readings
is the direction. An animal that finds its way by standing in the field and
taking a difference, on the spread that argues thinking happens outside the head.

Both are registered in [facts.json](../facts.json) with the caution that makes
them true: queen palatability varies with the host plant and they are not
uniformly toxic, and the Smithsonian's carrion figure is about 4 km, not the
9.5 km that circulates online with no traceable source. Both animals are
captive, and nothing on either card implies a wild observation.

## What the archive still has, unused

The Zoo album is the surprise. Hyacinth macaw, eagle owl, Komodo dragon,
Galápagos tortoise, Nicobar pigeon, monarch and buckeye. That is the specimen
register the book keeps commissioning illustrations for, and these are real
records rather than invented ones, which is a live tension in
[decisions.md](decisions.md).

They cannot be plates. At **70 mm they run at 464 dpi**, which is a taped
specimen card, and the machinery for that is built and currently dormant. That
is the next thing to try with this material, and it is a different move from
the screen prints: not abstraction, but a real photograph used at the size its
resolution actually supports.
