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

    81   systems-01-ants-pavement        960 × 960     archive, capped
    81   here-01-dog-late-light          960 × 960     archive, capped
    87   part-2-divider-branching       1024 × 1024    generated, capped
    87   part-3-divider-machine-dark    1024 × 1024    generated, capped
    87   intelligence-06-closing-hands  1024 × 1024    generated, capped
    87   privilege-06-closing-cursor    1024 × 1024    generated, capped
    87   pilgrimage-06-closing-stone    1024 × 1024    generated, capped
   106   intelligence-01-pencil-mark    1254 × 1254    generated, capped
   106   field-note-02-dog-tag          1254 × 1254    generated, capped
   106   privilege-01-kitchen-laptop    1254 × 1254    ON THE SHOT LIST
   108   before-time-01-road-atlas      1272 × 1272    archive, capped

Nothing here is a mistake. Two causes, and only one of them can be fixed:

- **Generated plates** are capped by what the generator returns — 1024 px for
  1:1, 1254 at best. Regenerating does not help; the ceiling is the ceiling.
- **Archive frames** are capped by Facebook's 1280 px downscale, which a second
  High-quality export proved is permanent (see
  [personal-archive](personal-archive.md)). `before-time-01` is Adam's father,
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
