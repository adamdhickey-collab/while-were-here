# Art direction — final visual direction

**Status: adopted 2026-08.** This document supersedes
[`content/plan/art-direction.md`](../content/plan/art-direction.md) ("Field
Notes & Hidden Systems"), which remains in place as the record of how the
direction was reached and of the measured lessons this revision keeps.
Implemented in `src/styles/tokens.css` (spectrum + stages),
`src/styles/typography.css` (voices, measure), `src/layouts/` (spread
renderers). Judged at true trim in `build/direction.html`.

The final result should feel like:

> **A vibrant, handmade, scientific adventure through the hidden systems of
> ordinary life.**

A 12" × 12" hardcover art book (exact working trim stays 300 × 300 mm for the
current target printer). It should feel: vibrant with life, scientifically
curious, rooted in nature, handmade but sophisticated, immersive, colorful,
editorial, tactile, elegant, surprising, warm and inviting — professional
enough to feel like a high-end published art book.

It should **not** feel: dark, gloomy, desaturated, overly nostalgic, clinical,
corporate, like a science textbook, a self-help workbook, a website, a
collection of generic AI images, or cliché psychedelic art.

## The central idea

A philosophical field guide to ordinary life, attention, hidden systems,
perception, nature, consciousness, technology, human relationships, meaning.

> A familiar world becomes astonishing when we reveal everything happening
> beneath its surface.

The scientific material does not decorate the essays; it changes how the
reader sees an ordinary lake, tree, path, room, dog, body, or afternoon. The
book repeatedly moves through one sequence:

1. show an ordinary scene
2. examine it more closely
3. reveal an invisible system
4. expand into wonder
5. return to ordinary life with changed attention

That sequence **is** the book's five stages. A stage is declared once —
`stage: N` on a section or an essay — and every page inside it inherits its
ground, the ink that survives on that ground, its three accents, and how dense
the annotation layer may become.

## The progression (brief phases → book stages)

The brief's four phases map onto the five stages like this — Phase III spans
two stages because the peak arrives in two movements (entering the systems,
then expanding inside them):

| Brief phase | Stage | Imperative | Ground | Accents |
| --- | --- | --- | --- | --- |
| I — Calm & observational | 1 | OBSERVE | warm cream `--paper` | rust · moss · lake blue |
| II — Discovery | 2 | NOTICE | bone | lake teal · cobalt · amber |
| III — Expansion (entry) | 3 | UNDERSTAND | **deep teal** `--teal-deep` | lake teal · lake blue · coral |
| III — Expansion (peak) | 4 | EXPAND | **ink navy** `--navy` | magenta · violet · acid |
| IV — Integration | 5 | INTEGRATE | warm cream | dusk pink · lake blue · moss |

**The single biggest change in this revision:** stages III and IV no longer
invert to charcoal and near-black. They sink into **deep teal** and
**ink-navy** — chromatic depth, not night. The inversion keeps its drama (the
page still flips to light ink, the diagrams still glow) and loses the gloom.
The immersion should read as deep water and wide sky, not as darkness.

Stage I is quiet in **layout**, not in colour — wide margins, few elements,
one idea at a time, while the plates on the page carry full colour. A reader
opening to page 20 sees the palette; they do not wait until Part III for
permission. (This is a measured lesson from the first generated photo set —
see the superseded direction doc — and it stands.)

The colour progression across the book:
cream → moss → teal → blue → amber → orange → coral → magenta → violet → navy → cream.
No spread carries all of it. Colour reveals increasing complexity as the book
progresses; a spread never names a colour — it uses `--accent-1/2/3` and the
stage decides what those resolve to.

## Colour system

Wired in `src/styles/tokens.css`. The brief's token names map onto the
project's existing wiring (values updated, names kept, so 70+ references did
not churn):

| Brief token | Wired as | Value |
| --- | --- | --- |
| `--paper-warm` | `--paper` | `#F4ECD9` |
| `--paper-light` | `--paper-pale` | `#FAF6EC` |
| `--ink-charcoal` | `--ink` | `#1D282B` |
| `--ink-navy` | `--navy` (Stage IV ground) | `#112E42` |
| `--moss` | `--moss` | `#7F9956` |
| `--sage` | `--sage` | `#A8C4A1` |
| `--lake-teal` | `--biolume` | `#148A8C` |
| `--lake-blue` | `--lake` | `#197FAE` |
| `--cobalt` | `--cobalt` | `#2C63A5` |
| `--amber` | `--amber` | `#EDA824` |
| `--orange` | `--orange` | `#F47621` |
| `--coral` | `--coral` | `#F26355` |
| `--magenta` | `--magenta` | `#CF3E7E` |
| `--violet` | `--ultraviolet` | `#7955A1` |
| `--acid-green` | `--acid` | `#A6B922` |
| `--rust` | `--rust` | `#A95534` |
| `--dusk-pink` | `--dusk` | `#E6AAA0` |
| — | `--teal-deep` (Stage III ground) | `#0C3D43` |

Values may be refined after proofing, but preserve the broad progression, and
preserve these **measured contrast rules**:

- Text is never pure black: `--ink` is rich charcoal.
- `--rust` fails AA as type (4.4:1 on paper). Anything *read* in rust uses
  `--rust-ink` (`#96482C`, 5.5:1). Rust itself is for marks, rules, swatches.
- `--ink-faint` stays `#6A6559` — re-derivations that look tidier fail AA on
  the bone ground, which carries small type in Stage II.
- `--magenta` is 3.1:1 on the navy ground: display sizes and marks only,
  never a small label. Small labels on dark grounds use amber, acid, dusk or
  paper-light — all ≥ 5.4:1.
- Acid green is used sparingly, per the brief.

## Typography

Preferred faces (licensed, used only when files exist in `fonts-licensed/`,
never committed): **GT Super** display · **Söhne Buch** body · **GT America
Mono** labels. The build detects them and falls back automatically.

Open-source system as built:

| Voice | Face | Role |
| --- | --- | --- |
| Display serif | **Falutin Title** (purchased, not in repo) → **Fraunces** fallback | essay titles, dividers, pull quotes, large statements. 900 only — one voice, one weight, used rarely. |
| Body sans | **Source Sans 3** | body copy, decks, captions, contents. Chosen 2026-08 per the final brief, replacing Hanken Grotesk (which stays in the type tester). |
| Systems mono | **IBM Plex Mono** | specimen labels, metadata, dates, locations, measurements, diagram labels, field-note identifiers. |
| Hand | **Kalam** (sparingly) | brief observations, arrows, one-line margin notes. Never paragraphs; never load-bearing. |

Body specs, as measured: 11.5 pt / 1.62 on the two-ratio scale
(display ×1.25 from 84 pt, text ×1.2 from 11.5 pt). Line length capped in
`ch`, calibrated against rendered copy: **Source Sans 3's average lowercase
advance is 0.870× its zero**, so the single-column cap is 60ch ≈ 69 characters;
two-column reading ~55; everything inside 45–75. **Re-probe on any body face
change** — the cap is a property of the face.

Paragraph spacing over deep indents; generous margins with the stronger edge
at the fore-edge (see Geometry below); no body copy over busy imagery. Do not
shrink body copy to force an essay into fewer spreads. A typical essay runs
4–6 spreads: opener, two or three reading spreads, one visual/diagram/quote
spread, a closing spread.

## Reading templates (brief A–G → spread types)

The brief's templates map onto the composed spread types in
`src/layouts/index.mjs` — declared per-essay in frontmatter, never invented
per-page:

| Brief template | Spread type |
| --- | --- |
| A — classic two-column reading | `reading` variant `two` |
| B — asymmetric reading | `reading` variant `aside` (wide + narrow column) |
| C — reading with side notes | `reading` variant `aside` with field-note / ledger blocks |
| D — text with image band | `reading` with `bandImage`, or `image-essay-band` |
| E — text with specimen plate | `image-essay` with specimen card, or `diagram` |
| F — immersive text over image | `full-bleed` (variant `over` for text on a calm region or controlled dark field) — short passages and transitions only, at the visual peak |
| G — sequential spread | `sequence`, `image-pair`, `visual-essay`, contact-sheet blocks |
| section divider | `divider` (per-part intensity via its stage) |
| pull quote | `pull-quote` (rare enough to stay meaningful; always from the essay) |
| closing | `closing` |
| statement spread | `statement` — one declarative line, one imperative, one facing image; the device that carries the progression |

Pages are composed, not flowed: every page is a fixed 300 × 300 mm box, and
copy must fit its page (the preview's overflow detector enforces this).

## Editorial devices

- **Drop caps** — selected essay openings only (`prose--drop`). Literary and
  substantial, never on every spread.
- **Paragraph leads** — a small uppercase phrase, subhead, observation number,
  tiny diagram or coloured rule at a conceptual turn. Do not over-section.
- **Pull quotes** — rare, verbatim from the essay.
- **Marginalia** — another consciousness noticing alongside the essay. Short:
  "light changed at 4:17", "same path, different weather", "present but
  unseen". Never fabricate long handwritten passages.
- **Scientific labels** — mono voice: species, scale, process, date, location,
  layer, source, direction, frequency, temperature, visible range. Accurate
  source content only — never invent facts to fill a layout (see
  `content/facts.json` and `npm run facts`).
- **NOTICE THIS** — the recurring feature, as an understated field
  observation, not homework. Single line or short numbered sequence.
- **VISIBLE / PRESENT** — the recurring hidden-systems ledger: what a person
  immediately sees (water, reflection, tree, bird, path, cloud) against what
  is there but unnoticed (dissolved oxygen, plankton, fungal spores,
  groundwater, magnetic fields, ultraviolet patterns, root exchange,
  nervous-system prediction). As a margin note, transition, small diagram or
  facing-page comparison. Not so frequent it becomes a gimmick.

## Photography

Believable, vivid, and full of life. Natural available light, recognizable
real-world environments — ordinary rooms, lakes, paths, gardens, birds, dogs,
trees, shorelines, reflections, insects, domestic objects, human figures seen
naturally. Rich but credible colour, true surface texture, subtle film grain,
occasional imperfect framing, generous negative space, varied weather and
seasons.

**More alive than the previous dark contact-sheet direction.** Not every image
is dusk, gray, underexposed, melancholy, empty, brown or vignetted. Balance
quieter images with clear summer greens, blue water, amber sunlight, flowers,
living roots, birds in movement, colourful microscopic detail, changing skies,
spring growth, warm domestic scenes.

Avoid: glossy stock, HDR, excessive shallow focus, artificial cinematic gloom,
people staring into the lens, staged smiles, fake text, visible logos,
impossible anatomy, obvious AI rendering, gratuitous lens flare.

Photography should say: **look at the world.**

## Illustration, diagrams, microscopy

Scientific field-guide plates, botanical drawing, hand-drawn geometry, root
systems, cellular structures, maps, astronomical diagrams, migration routes,
cutaways, spectra, weather systems, timelines, marginalia — in watercolor,
ink, risograph, screenprint, collage, with subtle misregistration. Handmade,
intelligent, colorful, tactile, layered, curious, professional, elegant.

Avoid: corporate infographics, generic vector people, SaaS illustration, clip
art, glossy 3D, sterile textbook plates, perfect icon sets, decorative
complexity without meaning, unreadable invented handwriting, cliché
psychedelic imagery. Illustration should say: **look at the idea.**

Microscopic and spectral imagery may carry the most vivid colour in the book —
cellular forms, plankton, pollen, spores, root hairs, refraction, membranes,
nervous-system pathways, insect vision, ultraviolet patterning, magnetic
lines, spectra — but always connected to a real system, paired with calm
typography and controlled margins. Never several equally loud elements on one
spread.

The psychedelic quality comes from **expanded perception**: repeated natural
patterns, layers of scale, refraction, wave fields, spectral bands,
overprinting, translucent overlays, unexpected colour relationships. Not from
tie-dye, melting objects, drug imagery, neon fractals, 1960s posters, or
purposeless rainbow gradients.

## Collage and material

Collage is evidence gathering, not scrapbooking: taped photograph, clipped
field note, map fragment, specimen card, vellum overlay, botanical plate,
archival photograph, painted wash, graph, measurement mark, paper edge, small
registration error, handwritten arrow. Curated and tactile; no fake torn
paper on every spread. Images marked `composite` in the manifest arrive
already mounted — the layout's treatment layer stands down for them.

The physical object: warm uncoated-feeling interior, subtle fiber, cloth or
linen hardcover, blind deboss or restrained foil, thread-sewn/lay-flat
binding, occasional vellum-like divider, full-colour printing, rich black.
Texture supports the object and never competes with body-copy readability.

## Cover

**Decided, twice, on proof: the `bleed` treatment stays** (see
`content/plan/decisions.md`, 19 and 20 Aug 2026 — `orb` was tried and
rejected against the felt book). It already satisfies the brief: the artwork
(`cover-01-watercolor-systems`) is a warm cream field carrying exactly the
brief's "one lively structure" — botanical growth, scientific orbit,
watercolor bloom, dots, lines, specimen marks — with the large stacked serif
title WHILE / WE'RE / HERE, small subtitle, ADAM HICKEY, and the calm cream
back cover carrying the lake line in the hand voice. The veil under the title
stays (measured lesson: a Didone's counters fill with whatever is behind
them). Spine reads on a shelf; spine width remains provisional until Saal's
caliper arrives.

## Section dividers

The book ships four parts plus front/back matter; each divider announces its
part's stage. The brief's five intensity identities live in the stage system
rather than as five separate parts — the shipped structure is at the 130-page
ceiling and does not change for a naming scheme:

| Part | Title | Stage | Intensity |
| --- | --- | --- | --- |
| I | Look Again | 1 | bright cream, natural photography, moss + lake |
| II | What Are We? | 2 (→ 3 mid-part) | specimen plates, keys, the unannounced sink into deep teal |
| III | The World Is Changing | 4 | the announced peak: navy, spectral colour, system maps |
| IV | While We're Here | 5 | return to cream, dusk pink, soft lake blue, personal photography |

## Geometry, workflow, accessibility

- Print geometry lives only in `book.config.js` → `build/geometry.css`.
  Current margins (30/34/30/34, safe 8 mm, 12-column grid, 6 mm gutter) are
  proven against the fitted 130-page book and differ from the brief's
  prototype values (18/18/19+23 inside-heavy, safe 12) — see open questions.
- The image-manifest workflow is unchanged and authoritative:
  `content/images.json` → `prompts/image-prompts.md`; one prompt = one asset =
  one file under `public/images/<kind>/`; no captions inside images, no
  contact sheets, no combined generations; continuity pairs and identical
  seasonal framings handled per manifest watch-outs. Unmade images render as
  labelled plates.
- Accessibility: body contrast AA-checked against rendered grounds; captions
  readable; handwriting never required for comprehension; body copy never
  embedded in images; alt text in HTML; no text across the gutter; labels
  inside safe areas; colour never the only carrier of information.

## The quality test

Before calling a revision done: does the opening feel warm and inviting; does
the book become progressively more vivid; are the scientific ideas visually
understandable; do text-heavy pages still feel designed; is there enough body
copy for real essays; is the colour energetic without chaos; does the handmade
material feel intentional; does the peak feel immersive; does the ending
return to calm without becoming depressing; does it feel professionally
published; does it reward slow looking; does it make ordinary nature feel
unexpectedly alive?
