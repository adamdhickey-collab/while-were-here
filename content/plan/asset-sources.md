# Where the ephemera comes from

For a field-guide look, stock clipart is the wrong shelf. The material this book
wants — botanical plates, specimens, entomological drawings, star charts,
topographic maps, anatomical figures — mostly already exists, in the public
domain, at higher quality than anything sold as a "sticker pack". The work is
selection and cutout, not commissioning.

Every sourced asset gets a manifest entry with `origin: archive` plus `source`,
`license` and `credit`, so provenance is tracked from the start and the credits
page generates itself. **A book that goes to press needs that; retrofitting it
across ninety images does not work.**

---

## Public domain archives — the real ones

| Source | What it is | Licence |
| --- | --- | --- |
| **Biodiversity Heritage Library** | Millions of pages from digitised natural-history books. Their Flickr has ~150,000 illustrations tagged by subject. The single best source for field-guide plates. | Mostly public domain |
| **Smithsonian Open Access** | 4.5M+ images including specimens and natural history. Cleanest licence terms of any large archive. | CC0 |
| **Wellcome Collection** | Medical and scientific illustration, anatomy, historical diagrams. | CC BY / public domain |
| **Internet Archive Book Images** | 5M+ images extracted from digitised books. Vast, unruly, rewarding. | Public domain |
| **David Rumsey Map Collection** | Historical maps at very high resolution. For the *maps* row of the material language. | CC BY-NC-SA (check for commercial) |
| **NYPL Digital Collections** | Public-domain ephemera, botanical, maps, printed matter. | Public domain |
| **Public Domain Review** | Curated rather than comprehensive. Good for finding the thing you did not know to search for. | Varies, stated per item |
| **NASA / NOAA / USGS** | Satellite, weather, topographic, deep-field. For the microscopy-and-cosmos end. | Public domain |

### Two specific bodies of work

- **Ernst Haeckel — *Kunstformen der Natur*.** Radiolarians, jellyfish, siphonophores.
  Board three's jellyfish spread is essentially Haeckel. Public domain.
- **Karl Blossfeldt — botanical photography.** Named on the Cosmos homepage in the
  original research. Died 1932; public domain in most jurisdictions.

## Cleaned and cut out for you

| Source | Note |
| --- | --- |
| **Rawpixel** | Large curated public-domain collection — Haeckel, Blossfeldt, vintage botanical — already cut out on transparent backgrounds. Free tier plus paid. This is the closest thing to what "sticker pack" means, done properly. |
| **Old Book Illustrations** | Curated Victorian engravings, searchable, cleaned. |
| **Flickr Commons** | Aggregates institutional public-domain collections in one search. |

## Handwriting and non-paper material — what actually happened

Both registers are now in the book, and neither came from where this file
predicted.

**Handwriting was generated, not sourced.** The advice below stands as advice —
Rawpixel carries manuscript scans, the Biodiversity Heritage Library is full of
annotated specimen sheets, Wellcome has notebooks, and what is wanted is *ink on
transparent ground* rather than a photograph of a page. But the book had already
decided to keep its composited AI imagery, and the hands were made to match. If
they ever read as traced pseudo-cursive at 300 mm, this is the fallback that
fixes it.

**Non-paper material was sourced for free.** This file said to spend Adobe Stock
credits. That was not necessary:

| Source | What it gave | Licence |
| --- | --- | --- |
| **Poly Haven** | `rough_linen`, `rusty_metal_04` — macro material scans, no object, no edge, exactly the brief | **CC0** |
| **Unsplash** | the condensation and rust photography composited over the scans | Unsplash License |

**Poly Haven belongs at the top of this document, not in a footnote.** It is CC0,
it is built for exactly this — surfaces photographed as surfaces, with nothing in
frame to give away the scale — and it cost nothing. It should be the first stop
for any future material break.

**One caveat to carry to press.** The Unsplash License permits commercial use and
requires no attribution, but it is a licence granted by Unsplash rather than a
public-domain dedication, and it prohibits compiling photos to build a competing
service. For a book that is sold, CC0 material is the cleaner footing — prefer
Poly Haven where both would work, and keep the recorded credit lines even though
Unsplash does not require them.

## Texture and overprint

The handmade layer — risograph misregistration, halftone, ink density, paper
grain — is worth buying rather than faking.

- **RetroSupply Co** — risograph and print texture packs, halftones, ink brushes.
  Directly on brief for the overprint layer.
- **Lost & Taken**, **Texture Labs** — free paper and grain textures.

## Marketplaces, with a caveat

Creative Market, Design Cuts and Envato Elements all carry vintage-botanical and
ephemera kits. Quality is uneven and — more importantly — **standard licences
often cap impressions or exclude items for resale.** A book that will be sold
usually needs an extended licence. Read the licence before the file goes into
`public/images`.

## The licensing rule for this project

1. Prefer **CC0 / public domain**. Smithsonian and BHL are the cleanest.
2. Record `source`, `license` and `credit` in `content/images.json` at the moment
   you download the file, not later.
3. Some institutions assert rights over their *scans* of public-domain works.
   In the US that claim is weak, but the safe order is Smithsonian → BHL →
   Internet Archive → everything else.
4. Anything from a marketplace needs its licence checked against a print run and
   against resale.

`npm run credits` regenerates the attribution list from the manifest, and reports
only `origin: archive` assets — which is why reclassifying the grounds as
`generated` emptied nine false warnings out of it. An asset that was made needs
no credit; an asset that was found always does.

**`npm run facts` is its sibling**, built in another session on the same shape:
`content/facts.json` is the single source of truth for every technical claim in
the prose, and `npm run facts:strict` fails the build if anything is still
unverified. The two together mean neither the pictures nor the numbers can reach
press without a traceable origin. It has already caught a false claim in the
Attention essay — a phone-unlock figure that fused two incompatible studies.

---

## Using the Adobe Stock credits and Envato

You have both, and they are good at opposite things. **Spend them accordingly.**

### The licence difference matters more than the catalogue

Adobe Stock's standard licence covers printed materials into the hundreds of
thousands of copies. Envato Elements is a subscription, and its licence has
historically been tighter for **physical products offered for sale** — the
category a printed book falls into — with a unit cap per end product. Verify the
current terms on both before anything ships, but plan on this split:

- **Adobe Stock** → anything that ends up *in* the book as an image.
- **Envato Elements** → treatment: textures, brushes, halftones, overlays, the
  handmade layer. Things that modify an image rather than being one.

### What to spend Adobe Stock credits on

Credits are finite, so buy what is genuinely hard to find in the public domain or
would cost hours of cutout. Search terms that land on this book's register:

| Search | For |
| --- | --- |
| `diatom microscopy dark field` | Stage III — *The Air Is Full of Life*, the microscopy spreads |
| `phytoplankton fluorescence micrograph` | Same, the luminous end |
| `mycelium network macro` | *The Ground Is Alive*; the back-cover botanical |
| `lake thermocline / limnology diagram` | *The Lake Is Not a Thing* cross-section |
| `bioluminescence ocean long exposure` | Stage III colour |
| `dendrite neuron confocal` | *The Perceiving Mind* |
| `bird murmuration silhouette` | *Systems Nobody Designed* |
| `pollen scanning electron microscope` | The air spreads |
| `aerial river delta topographic` | Maps row of the material language |
| `xylem cross section botanical micrograph` | *A Tree Is Mostly Made From Air* |

Avoid spending credits on anything a naturalist archive already has for free:
botanical plates, entomological drawings, star charts, historical maps,
anatomical figures. Those are BHL, Smithsonian and Rumsey territory.

### What to pull from Envato Elements

Unlimited downloads, so take the whole category rather than one item:

- `risograph texture pack` · `overprint misregistration` · `halftone brushes`
- `uncoated paper scan` · `paper grain texture` · `deckle edge`
- `masking tape png transparent` · `washi tape` · `staples paper clips png`
- `vintage specimen label template` · `apothecary label`
- `ink wash texture` · `watercolour bloom png transparent`
- `photocopy grain` · `dust and scratches overlay`

Those eight or nine downloads build the entire handmade layer — the tape, the
tags, the misregistration, the paper — which is currently drawn in CSS and will
look better as real scanned material.

### One thing worth buying that neither has

The front-cover artwork. It is the single asset the whole book leans on, it needs
to be original, and it is the one place where commissioning an illustrator — or
generating and then heavily reworking — beats anything on a stock site.
