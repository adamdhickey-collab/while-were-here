# Effective print resolution, every image — 21 Aug 2026

Measured in the composed book, not from the files. For each image the rendered
box is read in millimetres, the `object-fit: cover` scale factor is taken into
account, and the result is the dpi **actually reaching paper** — which for a
cropped image is lower than the file's own numbers suggest.

Reproduce it by loading `build/book.html` and measuring `img` boxes against a
`.page` of 300 mm. 93 unique images.

| band | count | what is in it |
| --- | --- | --- |
| **under 120 dpi** | 11 | every one a 300 mm full-bleed plate |
| 120–149 | 6 | the 2:3 tall plates, and two 300 mm squares |
| 150–199 | 5 | two 3:1 bands, the three screen-print plates |
| 200–299 | 13 | the 2172 × 724 bands, the small personal insets |
| **300 +** | 58 | everything else |

## The eleven under 120 dpi

    81   systems-01-observation-hive     960 × 960     archive, capped
    81   here-01-dog-late-light          960 × 960     archive, capped
    87   part-2-divider-branching       1024 × 1024    generated, capped
    87   part-3-divider-machine-dark    1024 × 1024    REPLACED 21 Aug — the divider now carries the Alcázar baths at 363 dpi
    87   intelligence-06-closing-hands  1024 × 1024    generated, capped
    87   privilege-06-closing-cursor    1024 × 1024    generated, capped
    87   pilgrimage-06-closing-stone    1024 × 1024    REPLACED 21 Aug — the closing recto now carries the Alcobaça nave at 363 dpi
   106   intelligence-01-pencil-mark    1254 × 1254    generated, capped
   106   field-note-02-dog-tag          1254 × 1254    generated, capped
   106   privilege-01-kitchen-laptop    1254 × 1254    ON THE SHOT LIST
   108   before-time-01-father-portrait  1272 × 1272   archive, capped

Nothing here is a mistake. Two causes, and only one of them can be fixed:

- **Generated plates** are capped by what the generator returns — 1024 px for
  1:1, 1254 at best. Regenerating does not help; the ceiling is the ceiling.
- **Archive frames** are capped by Facebook's 1280 px downscale, which a second
  High-quality export proved is permanent (see
  [personal-archive](personal-archive.md)). `before-time-01` (renamed `-father-portrait` on 21 Aug, having been
  `-road-atlas` — the id outlived the picture it named) is Adam's father,
  photographed from a print — the softness is period-correct and the frame was
  chosen on the photograph, not the arithmetic.

## What the shot list is worth, in numbers

Four entries in [shot-list](shot-list.md) sit in the two lowest bands right now.
An iPhone's 4032 × 3024 clears every one of them:

| slot | now | shot on a phone |
| --- | --- | --- |
| `privilege-01-kitchen-laptop` | 106 dpi | **256 dpi** |
| `privilege-05-dog-under-desk` | 130 dpi | **400 dpi** |
| `intelligence-05-tools-ready` | 130 dpi | **400 dpi** |
| `before-time-05-artifact-array` | 130 dpi | **400 dpi** |

That is four of the seventeen sub-150 images fixed by an afternoon's shooting,
and one of them — the kitchen laptop — is a 300 mm full bleed that opens an
essay.

**Added 21 Aug, after this table was first written.** Three more of the eleven
above are 300 mm full bleeds that *close* an essay — `intelligence-06-closing-hands`,
`privilege-06-closing-cursor`, and `pilgrimage-06-closing-stone` — the last of which
was replaced on 21 Aug by the Alcobaça nave from the library, 87 → 363 dpi. The
other two remain at 87 dpi, all
composited from Pexels photographs. They are now items 8–10 on the shot list.
Shooting them takes them from 87 dpi to 256 and removes three of the six images
in the book that are not Adam's, in one pass. The bench closing shares a setup
with item 4, so the true cost is two sessions, not three.

### Then the low-dpi plates were actually looked at — and the arithmetic oversells the problem

Written first: *"87 dpi across a 300 mm square is soft enough to read as a
mistake rather than a choice."* That was reasoning from the number. Two of them
were then resampled to 3543 px — what the press would receive — and a 90 mm
detail from each was examined at 1:1.

**They do not look broken.** No blocking, no aliasing, no stair-stepped edges.
`here-01-dog-late-light` at **81 dpi**, the lowest in the book, is a floor of
leaf litter: high-frequency texture with no hard edge for the eye to catch on,
so the softness reads as autumn light. `intelligence-06-closing-hands` at
**87 dpi** has chisel edges and wood shavings, which is the harder test, and
they hold — because the plate is a *composited, graded, deliberately softened*
treatment with little fine detail for the resolution to fail at. Low dpi hurts
where a picture is crisp. These are not crisp, on purpose.

**What that changes.** Shot-list items 8–10 stay, and stay near the top, but the
argument for them shifts: **shoot them because they should be Adam's
photographs, not because the current ones will print badly.** Provenance is the
reason; resolution is a bonus.

**What it does not settle.** This was a screen looking at an upscale. A backlit
display is far more forgiving than ink on FUJIFILM Crystal Archive at arm's
length. What is established is that the files are not *pixelated*; whether they
are acceptably *sharp* is a question for a proof print, and one 300 mm plate on
the real stock answers it for all eleven.

## And what the photo library is worth

`privilege-09-crosswalk`, the first frame placed from Adam's own library,
measures **1,274 dpi** in its inset. Everything the Facebook archive could give
an inset ran 149 to 565. The frames still waiting in
[photo-selection-04](photo-selection-04.md) are 3024–5712 px, which is 250–480
dpi at full bleed against the 81–108 the lowest band is living with now.

## Before press

**Get the printer's own minimum.** Saal prints this photographically on FUJIFILM
Crystal Archive HD, and photographic printing is more forgiving of low input
resolution than offset litho is — but "more forgiving" is not a number, and
nothing in this repository is entitled to guess it. Ask, then read this table
again with the real floor in hand.

---

## The lowest-resolution plate in the book was a crop of a crop
*22 Aug 2026*

`here-01-dog-late-light` opened the final essay at **960 × 960 — 81 dpi on a
300 mm full bleed**, the worst figure in the book. Every previous pass had
treated that as a fact about the photograph and looked for a better picture.

**It was not a fact about the photograph. It was a fact about the file.** The
picture is good and its description is exact — a dog nose-down on a slope of
yellow leaves with tree shadows raking across it. The camera original was in the
library the whole time: **`P1080153.JPG`, 4000 × 3000**, from the walk on
21 October 2018 that the *why-ordinary-days* captions already quote by the
minute ("2:58 p.m. / the leaves came down all week").

Recropped square from the original at 3000 × 3000. **81 dpi becomes 254.** Same
frame, same composition, three times the resolution, nothing regenerated and no
new photograph needed.

**The method is repeatable and worth stating plainly.** Index the archive by
date, find the day, find the original, re-cut. The crop was matched to the
placed file mechanically rather than by eye — slide a square window across the
4000 px frame, score each position against the existing 960 px crop, take the
best: x = 1000…4000, score 0.4. That is how you re-cut a frame without
re-deciding its composition.

**What this does NOT fix, checked and reported rather than assumed.**

* `systems-01-observation-hive` is also 960 × 960 at 81 dpi, and its original is
  **not in this library**. The book's specimen captions are all dated 20 July
  2014 and the whole of 2014 is **eight frames** in this export. That visit is
  archived somewhere else, or not at all.
* `pilgrimage-01-worn-threshold` — 1536 × 1536, 130 dpi, a long public staircase
  with the photographer's shadow down it — carries no EXIF date, so it cannot be
  located by index. Duluth was the obvious guess, since the city is known for
  long public stairways and there are four Duluth trips in the archive. **Tested
  and wrong**: all 47 Duluth frames are waterfront — lighthouse, lift bridge,
  piers, no stairs anywhere. It is somewhere else and needs a content search or
  Adam's memory.
* `before-time-01-father-portrait` and `before-time-06-thanksgiving` are scans of
  prints from the 1980s. There is no digital original to find.

Under-120 dpi plates: **9 → 8**, and the one that moved was the opener of the
last essay in the book.

---

## Seven candidates, four real, three false positives
*22 Aug 2026*

`scripts/findsource.py` returned one confident match and seven in the band it
labels "worth opening" — 12 to 20. **Opening them was the point: three of the
seven were false positives.**

| placed | candidate | score | verdict |
| --- | --- | --- | --- |
| `handed-02-misery-is` | `IMG_5605.HEIC` | 12.1 | real |
| `privilege-07-grill-screen` | `IMG_2376.JPG` | 14.8 | real |
| `specimen-03-eagle-owl` | `IMG_3175 (2).HEIC` | 16.3 | **false** — a notebook page |
| `systems-07-moon-jelly` | `IMG_5477.JPG` | 17.4 | **false** — a blank wall |
| `privilege-08-vhs-shelf` | `IMG_2058.JPG` | 17.5 | real |
| `handed-01-love-of-my-life` | `IMG_2254.JPG` | 17.6 | real |
| `specimen-04-hyacinth-macaw` | `IMG_1221.HEIC` | 18.0 | **false** — a page of handwritten accounts |

**The three failures share a cause worth knowing.** All are pale, low-contrast
subjects matched against pale, low-contrast documents. Contrast normalisation is
what lets a re-graded crop match its original, and the price is that it makes
flat images resemble each other. **A score in the teens on a low-contrast
subject means very little.** The two specimens were never going to be found
anyway — the whole of 2014 is eight frames in this export.

**The four real ones, re-cut by finding the window of the original that best
matches the placed framing.** Two change what prints and two do not, and the
manifest says which is which:

| image | was | now | matters? |
| --- | --- | --- | --- |
| `privilege-07-grill-screen` | 199 dpi | **834** | **yes** — 199 was under the 300 a press wants |
| `privilege-08-vhs-shelf` | 265 dpi | **1113** | **yes** — 265 was marginally under |
| `handed-01-love-of-my-life` | 320 dpi | 1351 | no — already adequate |
| `handed-02-misery-is` | 451 dpi | 884 | no — already adequate |

`privilege-08-vhs-shelf` scored **0.4**: the placed file was a straight downscale
of the whole frame, not a crop at all.

**One arithmetic error, made and fixed here.** The first pass computed dpi from
the SHORT edge and wrote 626 and 834 into the manifest. Every other entry in this
file measures the **width against the slot width** — a landscape inset in a 92 mm
slot divides its width by 92 mm. Corrected. Worth recording because the numbers
looked plausible and would have sat there being wrong.

Plates at 300 dpi and above: **64 → 66**.

---

## The rest of the thirty-three
*22 Aug 2026*

All 33 candidates have now been through `findsource.py` and every hit has been
looked at. **Nine real matches, four false positives, twenty with nothing in the
archive to find.**

**The one that changes the printed page:**

`pilgrimage-01-worn-threshold` — the opener of the pilgrimage essay, a **300 mm
full bleed printing at 130 dpi**, now **243**. Its original is `IMG_5596.HEIC`,
matched at 4.7.

That frame is the argument for the whole tool. It had already been hunted by
hand and missed: the long public staircase looked like **Duluth**, a city known
for exactly those stairways, with four Duluth trips in the archive. All 47
Duluth frames turned out to be waterfront. Pixel matching found it in minutes.

**Its crop was chosen against the score, not by it.** The window search returned
19.0 — on a high-detail subject a 48 × 48 comparison is noisy — and a plain
centred square scored better while framing worse. The pick was settled by putting
all three side by side and looking. The docstring's rule earned its place.

**The three that do not change the page**, and the manifest says so in each:
`north-03-lake-horizon` (371 dpi already, and its original is a **16374 × 3628
panorama**), `walk-01-leaf-light` (464), `north-01-gorge-cut` (557). Better
masters, no printed difference.

**The false positives, now four of thirteen hits.** `specimen-03-eagle-owl`,
`specimen-04-hyacinth-macaw` and `systems-07-moon-jelly` matched pale documents;
`systems-01-observation-hive` matched a **landscape panorama of a wooded hill**
at 13.9. That last one is worth keeping: the hive is the other 81 dpi plate in
the book and it would have been a satisfying find. It is not there. The whole of
2014 is eight frames in this export, and **the earlier conclusion stands.**

Distribution after all of it — 120–149 dpi: **4 → 3**. 300 dpi and above: 64 → 66.
The remaining under-120 are generated plates and 1980s prints, and no archive
search will help them.
