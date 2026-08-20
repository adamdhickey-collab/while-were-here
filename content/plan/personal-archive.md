# The Facebook archive

Source: `~/Desktop/facebook-adamdhickey-2026-08-19-LoY8i3Bz`, exported 19 Aug 2026.

**1,460 images across 35 named albums** in `your_facebook_activity/posts/media`,
plus 28 videos. There is also 1.2 GB under `messages/`. **Nothing in this book
should come out of `messages/`** — it is other people's photographs inside
private conversations, and no slot in the book needs it.

---

## The one number that decides everything

| | Long edge |
| --- | --- |
| Median | **1,280 px** |
| 90th percentile | 1,450 px |
| Over 2,400 px | **4 images out of 1,460** |
| Over 3,000 px | 1 |

Facebook re-encoded every upload. At the book's 300 mm trim, a 1,280 px file is
**108 dpi**. That is not a near miss, it is a different category of asset.

**So none of this can be a plate, an opener, a band or a full bleed.** Any plan
that treats the archive as a photo library is going to fail at the proof stage.
What it can be is three other things.

### 1. Screen-print plates — the real opportunity

`scripts/separate.py` already exists and reduces a photograph to three 1-bit
masks that the layout fills with the stage's own accents. Its docstring says the
detail budget is the whole trick, and that it reduces to a few hundred pixels
*before* separating.

Which means **low resolution is not a defect for this pipeline, it is the input
format.** A 1,280 px snapshot comes out as a 3,000 px mask set, because what
survives the process is shape rather than pixels. Three of the book's existing
plates were made this way.

Tested on two frames from the archive, and the difference between them is the
whole selection rule:

- A dog on bright sand under dappled trees collapsed into noise. Fine repeating
  texture cannot survive the reduction, exactly as the script warns.
- A figure silhouetted against a river, treeline behind, glitter on the water,
  came out as a clean three-colour print that reads as a deliberate risograph.

**Select for large simple masses**: silhouettes, water, sky, a lit doorway, a
single subject against an open field. Reject anything whose interest is texture.

It also resolves most of the consent problem by itself. A silhouette is not a
portrait.

### 2. Ephemera and insets at 60 to 80 mm

The `.inset-card` and `.taped` machinery is built and currently dormant for
composites. A 1,280 px file at 70 mm is **464 dpi**. Anything in the archive can
hold that size. This is where a real photograph of a real afternoon can sit on
the page as a photograph rather than as an abstraction.

### 3. Contact-sheet cells

`.contact-sheet` is already in the layout and takes three cells. Three small
imperfect frames of the same thing at different times is a register the book
argues for and does not yet own.

---

## What the albums actually give the book

Mapped against slots that are currently unmade plates.

| Album | Frames | What it can serve |
| --- | ---: | --- |
| DogParkFall2018 | 12 | `here-01-dog-late-light`, and a **desire path** worn through grass, which is the one image 672 library photographs did not contain |
| KylieatthePark2014 · KylieatPark · KylieatBoundaryWaters | 23 | Silhouettes at water. The strongest screen-print candidates in the archive |
| UrbanFarming | 9 | Hands, soil, growing things. *The Beauty of Systems Nobody Designed* |
| NewHome | 8 | Domestic interiors. `privilege-01-kitchen-laptop`, `here-05-evening-wall` |
| StateFair2013 · MayDayParade2015 · Zoo2014 | 116 | Crowds behaving as one shape. Flocking, without birds |
| NorthShoreFall2017 · NorthShoreTrip | 33 | Water and weather |
| MyHipstamaticPrints | 1 | Already square, already filtered. The ephemera register |
| RoadtripHoneymoon · WeddingCeremony · Profilepictures | 153 | Posed, and mostly other people. The candid rule already excludes these |

## Consent

The archive is largely photographs of family and friends, and this book has a
`LICENSING.md`, which means it is intended to be sold. The book's own candid
rule removes most of the exposure by removing posed group shots, and the
screen-print route removes most of the rest by abstraction. **Anyone who remains
identifiable at size should be asked.** That is a short list, not a policy
problem.

## Proposed sequence

1. Sweep the eleven albums that map to open slots — 201 frames — the same way
   the photo library was swept, and write `photo-selection-05.md`. Score
   specifically for the separator: large simple masses, one clear subject,
   nothing whose interest is texture.
2. Run `separate.py` across the shortlist, composite each result in the stage's
   inks, and choose from the prints rather than from the photographs.
3. Place the winners against named manifest slots, as plates, insets and
   contact-sheet cells.

The alternative is sweeping all 1,460, which is roughly seven times the work for
material the album names suggest is mostly posed.
