# The Facebook archive

Source: `~/Desktop/facebook-adamdhickey-2026-08-19-LoY8i3Bz`, exported 19 Aug 2026.

**1,460 images across 35 named albums** in `your_facebook_activity/posts/media`,
plus 28 videos. There is also 1.2 GB under `messages/`. **Nothing in this book
should come out of `messages/`** — it is other people's photographs inside
private conversations, and no slot in the book needs it.

---

## The resolution may be fixable at source

**This export was almost certainly not requested at High media quality.**
Facebook's Download Your Information offers High, Medium and Low, and the
setting governs the resolution of every photograph in the archive. A median long
edge of 1,280 px with a cluster at exactly 960 px is what a downscale looks
like, not what a phone camera produces.

**ANSWERED, 20 Aug 2026: the re-request changed nothing.** A second export at
High media quality (Posts only, all time — `~/Desktop/
facebook-adamdhickey-2026-08-20-0OOro33q`) returned 1,459 images with the
identical distribution: median 1,280 px, 90th percentile 1,450, the same four
files over 2,400. The downscale is in Facebook's storage, applied at upload,
and no export setting can restore pixels the platform never kept. The archive
is what it is; the three routes below are the whole plan, permanently.

The original recommendation, kept for the record: **Re-request the export with
media quality set to High before writing this archive off.** If the originals come back at 2,048 px or more, a large part of
what is below stops being true: 2,048 px is 173 dpi at 300 mm, still not a full
bleed, but a real photograph at 150 mm and a comfortable one at 100 mm. It would
move this material from "abstract it or lose it" into the same category as the
rest of the library.

The numbers below describe the export as it actually arrived on 19 August 2026.

## The one number that decides everything

| | Long edge |
| --- | --- |
| Median | **1,280 px** |
| 90th percentile | 1,450 px |
| Over 2,400 px | **4 images out of 1,460** |
| Over 3,000 px | 1 |

Facebook re-encoded every upload. At the book's 300 mm trim, a 1,280 px file is
**108 dpi**. That is not a near miss, it is a different category of asset.

**SUPERSEDED, 21 Aug 2026: the archive can now serve every placement.** The
rule below was written against the original 6000 px targets. Those targets were
lowered on 20 August to what a generator actually produces — 1024 px for a
full-bleed slot — and the comparison was never re-run: a 1,280 px archive frame
now *exceeds* what every slot accepts from a generated image, on resolution and
on honesty both. First swap made the same day: the essay-08 opener is the real
dog in real late light. The candid rule and the consent list still govern which
frames may be used; resolution no longer does.

The original verdict, kept for the record: **So none of this can be a plate, an
opener, a band or a full bleed.** Any plan
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

## Resolution is not uniform across the albums — check before selecting

The median hides a spread wide enough to change what an album is for. Measured
on the 20 Aug 2026 export:

| Album | Long edge | At 70 mm |
| --- | --- | --- |
| **NorthShoreFall2017** | 1,280–**2,048** | 464–**743 dpi** — the best files in the archive |
| Zoo2014, DogParkFall2018, NorthShoreTrip | 1,280 | 464 dpi — the working default |
| **UrbanFarming** | **240–480** | **116–174 dpi — unusable at any size** |

UrbanFarming is a 2013 album and was downscaled far harder than the rest. It
contains the hands-in-soil frames the systems essay wants and it cannot supply
one of them. Check the pixel dimensions of a specific frame before planning a
slot around it; the album average will mislead.

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

---

## The capture times survived after all — 21 Aug 2026

**The JPEG EXIF is gone. The capture times are not.** Facebook strips EXIF on
upload, which is what earlier notes in this file and in `content/images.json`
recorded. But the export's own album pages —
`your_facebook_activity/posts/album/*.html` — carry a `Taken` field per
photograph, to the second, from Facebook's own metadata. 1,146 of the 1,453
images in the 20 August export have one.

Every archive image in the book now carries a `captured` field in
`content/images.json`, with `capturedSource` recording where it came from. Three
manifest entries that claimed no capture time survived have been corrected.

**What this bought immediately.** The essay-01 contact sheet claimed its three
frames ran "in the order they were taken". They did not: 2:58, 3:26, 3:11. It
also said "twenty minutes later" for a gap of twenty-eight. Both are fixed, and
the captions now print the real clock time instead of a season. The whole first
and last of the book turn out to come from one 35-minute window — the essay-08
opener is 2:51 p.m. on the same walk.

**Why this matters more than another photograph would.** The book is a field
guide, not an album. A true timestamp is the field guide's own apparatus, and
pointing it at an ordinary Sunday afternoon is the whole argument of Essay 01
made as a fact rather than a claim. Prefer this over sentiment in a caption
every time.

**Two cautions.**

- A `Taken` value is the *file's* capture time, not the subject's date. The
  scanned portrait of Adam's father reads `Jan 23, 2020` because that is when
  the print was photographed. Never caption a digitized print with its scan
  date.
- The same album HTML carries **upload IP addresses**. Nothing in that column
  goes anywhere near the book, the manifest, or the repository.
