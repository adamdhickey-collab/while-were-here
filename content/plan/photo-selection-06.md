# Photo selection 06 — Colombia, nine visits

**1,895 frames reviewed** across every Colombia trip in the library, 2015 to
2025. Source: `~/Desktop/photo libraries/photo library 2`, selected by computed
location rather than by folder — there are no folders, the library is a flat
dump of 32,533 files with camera-generated names.

**10 selected. 3 declined on the candid rule. 2 declined on quality.**

Registered as `library-31` through `library-40` in
[images.json](../images.json). None is installed: the book is at its 130-page
ceiling, so each is discoverable and none is placeable without a trade.

---

## Why this trip was invisible until now

The earlier passes ([01](photo-selection-01.md) through
[04](photo-selection-04.md)) worked from `~/Desktop/Photos from iphoto`, a
672-frame export that no longer exists on disk. [05](photo-selection-05.md)
worked the Facebook archive. None of them touched the photo libraries.

When the libraries were finally read, Colombia did not appear at all. The
`country` field in `.cache/places.json` was null for every one of these 1,493
GPS-bearing frames, and 12,642 Minneapolis frames were filed as Canada — the
cache had been built before `places.py` fixed its country boxes, and the fix
re-resolved countries in memory at report time without ever writing them back.
The report was right; the cache was wrong; the review read the cache.

So the first answer given on 24 Aug — *3,174 frames away from home across 17
trips, home is Canada* — was wrong in three ways at once. The true figure is
**5,905 located frames away from Minneapolis across 44 places**, and the single
largest body of them is this one: nine visits to Boyacá and the coast, mostly
over Christmas and New Year, including **76 frames falling on 31 December or 1
January across eight different years.**

That last number matters more than the rest. The Año Viejo effigy on the closing
page of this book — `here-10-ano-viejo-burning`, the last picture a reader sees
— was photographed at one of those New Years. The review reported the trip that
produced the book's final image as no trip at all.

## The ten

| id | frame | where | dpi at 300 mm | essay |
| --- | --- | --- | --- | --- |
| library-31 | bakery, trays and a baker's back | Tunja, 4 Jan 2025 | 256 | Systems Nobody Designed |
| library-32 | wild turkey's head, close | Boyacá, 3 Jan 2016 | 254 | The Secret Life of Attention |
| library-33 | lion asleep behind sharp mesh | Sogamoso, 5 Jan 2023 | 256 | The Secret Life of Attention |
| library-34 | Boston terrier between balusters | Boyacá, 8 Jan 2025 | 256 | While We're Here |
| library-35 | two dogs asleep on a dashboard, traffic beyond | Tunja, 4 Jan 2025 | 192 | Most of Life Is a Tuesday |
| library-36 | water buffalo over a dry-stone wall | Sogamoso, 5 Jan 2023 | 256 | Intelligence Outside Your Head |
| library-37 | hillside town under heavy cloud | Tunja, 6 Jan 2025 | 256 | Systems Nobody Designed |
| library-38 | mangrove channel with an egret | Cartagena, 17 Jan 2024 | 256 | Systems Nobody Designed |
| library-39 | envueltos in banana leaf, kitchen mid-work | Tunja, 6 May 2022 | 256 | Most of Life Is a Tuesday |
| library-40 | capuchin on a slatted bridge | Sogamoso, 5 Jan 2023 | 256 | Intelligence Outside Your Head |

**Not one is resolution-limited.** The floor here is 192 dpi and the median is
256, against the 81 and 108 dpi of the two plates already in the book that are
under discussion. Anything on this list could take a full bleed tomorrow.

**Three are load-bearing rather than decorative.** The lion behind the mesh is
the attention essay's argument made by the camera instead of by a sentence — the
fence came out sharp and the animal did not. The bakery is the flocking passage
without a bird in it. The hillside town is order arriving without a plan, at the
scale of a whole slope.

## The three declined on the candid rule

The standing rule, confirmed 19 Aug and applied in every pass since: *everything
candid; no group shots, no portraits, nobody looking at the lens and smiling.*

* **IMG_2853** — Adam walking two small dogs down an empty street at 1 January
  2025, long shadows, hillside town behind. A genuinely good picture and a
  portrait: he is looking at the camera. Worth reopening only if the rule is.
* **P1050152** — Adam holding coffee cherries in cupped hands on the finca,
  smiling at the lens. **The hands alone would pass**, and the file is
  4000 × 3000, so a crop to the cupped hands and the cherries is viable at
  around 250 dpi. Recorded here rather than discarded.
* **P1040813** — two women in sun hats in front of an aviary, a blue-and-gold
  macaw perched above them. Posed, and both identifiable.

## The two declined on quality

`photo-2373` and `photo-2145`, both mangrove canopy from the same hour as
library-38. At contact-sheet size they read as intricate; at full page they read
as green noise, with no water line, no horizon and nothing living in them. Kept
out for the reason the rest were kept in.

## What the ranker got wrong, twice, and what that means

`scripts/interesting.py` scores edge energy plus tonal range. Its docstring says
it knows the difference between a scene and a sheet of paper. It does not know
the difference between a scene and a **shirt**: the three highest-ranked frames
in the entire Italy 2019 trip are an accidental burst of a striped top, and the
top four in Colombia 2023 are four near-identical exposures of the same picket
fence. Bursts and bold repeating patterns both max the score.

Practical consequence, and it is not a small one: **the top of the ranking is
not the top of the trip.** Every keeper above except two came from ranks 5–30,
and the review had to be run year by year rather than trip-wide, because one
wildlife-park afternoon in January 2023 otherwise occupies most of the first
sheet.

**Nothing here was selected from a thumbnail.** Three frames were shortlisted at
contact-sheet size, rendered at full size, and turned out to be different
photographs entirely — the lookup was globbing on `IMG_` stems, and Minneapolis
shares those numbers with Tunja. `IMG_4784` was a dog on a dashboard, then an
inverted lake, then a dog on a dashboard again. Every record above names an
exact filename, and every one was opened.

## Not reviewed yet

Grand Canyon (410 frames), Portland OR (364), New York (337), Miami (332),
Seattle and Olympic NP (420), Washington DC (222), Chicago (135). Roughly 2,200
frames, all in the same library, all now findable by city.
