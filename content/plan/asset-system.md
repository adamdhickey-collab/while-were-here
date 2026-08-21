# The asset system

Eight roles, and the rules for how they fit together. This exists so that ninety
visual moments read as one book rather than a scrapbook — the difference is
almost entirely in whether an asset has a **role** or just a **look**.

Every manifest entry carries `role`. The role decides how the asset is treated,
which spreads it can appear in, and which stages it is allowed in.

---

## The eight roles

### 1 · PLATE
A complete archival illustration, used whole and at size, on its own field.
Haeckel's *Kunstformen* pages. Blossfeldt's *Urformen* photographs. A botanical
engraving with its original caption.

- **Lives in** pull-quote verso · section divider · diagram spread · full bleed
- **Stages** II–IV
- **Treatment** Never cut out, never taped, never cropped past its own frame.
  A plate is a document. You show it, you do not decorate with it.
- **Limit** One per spread. Two plates on facing pages is a catalogue, not a book.

### 2 · SPECIMEN
A single organism or object, cut out on transparent ground, sitting on the paper
as if pinned there. A fern frond, a seed pod, a moth, a shell.

- **Lives in** reading-spread margins · contact sheets · closing spreads · dividers
- **Stages** all
- **Treatment** Cut out cleanly. **No drop shadow** — it sits on the paper, it
  does not float above it. Always accompanied by a label.
- **Rule** A specimen without a label is clipart. The label is what makes it
  evidence. Use `.specimen-card` or `.label`.

### 3 · FIGURE
A diagram: cross-section, cycle, network, scale comparison. Either drawn in code
(`src/layouts/diagrams.mjs`) or archival.

- **Lives in** diagram spread · image-pair recto · taped reading inset
- **Stages** II–IV
- **Treatment** Inherits the stage's ink and accents. An archival figure gets
  redrawn or recoloured to match — it never arrives in its own colours.
- **Rule** A figure has to make an argument the prose is not already making.
  If the text says it, cut the text or cut the figure.

### 4 · MAP
Topographic, bathymetric, survey, star chart. Rumsey territory.

- **Lives in** full bleed beneath type · section divider · printed endpapers ·
  a band across a reading spread
- **Stages** I–III
- **Treatment** Full-bleed as an image, dropped to 12–18% opacity as a ground
  under text, or run full-measure as a band that interrupts a reading spread.
  What it must never be is a picture of a map sitting in a column at the size of
  a photograph — at band width it spans the measure, or it is one of the other
  two. (Widened 21 Aug 2026. The rule said full bleed or ground and nothing
  between, and the only map actually in the book is a 236 mm band. Written from
  the plan rather than the object; the object was right.)
- **Rule** Never on the same spread as a plate. They are both documents and they
  will fight.

### 5 · MICROGRAPH
Microscopy, SEM, confocal, dark-field. Diatoms, pollen, neurons, phytoplankton.

- **Lives in** immersive text-over-image · full-bleed spread
- **Stages** **III and IV only.** This is the peak material and spending it early
  costs the book its climb.
- **Treatment** Dark ground, luminous subject, type reversed out. Always carries
  a scale bar.

### 6 · EPHEMERA
Tape, label stock, torn paper, index cards, envelopes, staples.

- **Lives in** on top of other assets, never alone
- **Stages** all
- **Treatment** Applied to SPECIMEN and PERSONAL only. **Never to a PLATE** —
  you do not tape a museum plate to the page.
- **Rule** At most two pieces of ephemera per spread. Three is a mood board.

### 7 · TEXTURE
Paper grain, risograph misregistration, halftone, ink density, photocopy noise.

- **Lives in** as a global overlay
- **Stages** all, but set once per stage rather than per asset
- **Treatment** `mix-blend-mode: multiply` — the only blend that survives the
  print path intact.
- **Rule** Texture is a property of the paper, not of the picture. If you find
  yourself choosing a texture for one image, you are decorating.

### 8 · HANDWRITING
Real scanned handwriting — marginalia, a caret, an underline, a crossing-out —
in iron-gall ink on transparent ground.

- **Lives in** margins of reading spreads · across a diagram or plate
- **Stages** all
- **Treatment** Placed by the layout, never baked into a picture, so it can move
  between spreads without regenerating anything. `mix-blend-mode: multiply`, so
  it sits on the book's own paper rather than carrying its own.
- **Rule** **It must not be legible as sentences.** It is a gesture, not content.
  The moment a reader can read it, they stop noticing it and start decoding it.
- **Origin** `generated`. **This went against the recommendation in this file**,
  which argued that a real scanned hand was the one place left where genuine
  material could offset the AI read, and that a generated approximation would
  compound the tell rather than break it. The book had already decided to keep
  its composited AI imagery, and generated hands are consistent with that
  decision; the recommendation was overtaken rather than refuted.

  What survives of the argument is the rule below, which is about legibility
  rather than provenance and applies whatever made the marks.
- **Why it exists** Everything else typographic in this book is machine-set —
  monospace, engraved labels, printed tables. Without a hand there is no
  evidence anywhere of the person doing the noticing.

Built as `.hand-scan`, positioned `margin`, `corner` or `over`.

### 9 · MATERIAL
A surface that is not paper. Linen, oxidised metal, glass, stone — photographed
at macro scale so it reads as terrain before it reads as substance.

- **Lives in** a full-bleed crossover, on a stage turn
- **Stages** placed at the II→III, III→IV and IV→V turns
- **Treatment** One surface, edge to edge, and almost nothing else. A short line
  reversed out on the recto at most.
- **Origin** `archive`, and the only sourced role in the book. All three are
  composites of **Poly Haven** scans (CC0) and **Unsplash** photography, with
  source, licence and credit recorded at the moment they were placed.
  This file previously said Adobe Stock credits were the right spend here.
  They were not needed — the free route produced all three.
- **Rule** **Two or three in the whole book.** More and it becomes a texture
  library; fewer and the paper still reads as a default rather than a decision.
- **Why it exists** Every other asset is pigment on cellulose. One genuinely
  different material makes the paper deliberate, and landing it on a stage turn
  means the change of substance and the change of register arrive together.

Built as spread type `material-break`.

### 10 · GROUND
A scientific plate in the cover's language — fine linework, plotted points,
small inset diagrams, one diffuse wash — laid under a spread at very low opacity.

- **Lives in** behind a reading, opener or pull-quote spread
- **Stages** one per essay, matched to the stage's accent
- **Origin** `generated`. These were manifested as `archive` from a plan to
  source them, but their briefs were generation prompts from the first draft
  onward, and credits was reporting nine sourced assets that would never have a
  source — the kind of warning that stops being read. Corrected in `d806892`.
- **Treatment** 8% opacity on cream, 14% on a dark page, because light lines on
  dark read weaker. Transparency, always: the book supplies the paper.
- **Rules**
  - **Each ground draws the system its own essay is arguing about.** Not a
    texture, not a mood — the actual thing. Habituation decay under the essay
    about ordinary days. A signal filter under the essay about attention.
    Flocking under the essay about systems nobody designed. The reader is
    reading the argument on top of a picture of it, whether or not they ever
    consciously see it.
  - **Density goes where the type is not.** The habituation curves have already
    flattened across the top two-thirds because two columns sit there. The
    convergence in the route study sits low and off-centre because a quote sits
    above it. A ground that ignores its composition is wallpaper, however well
    drawn.
  - **Never under a plate, a specimen or a photograph.** Grounds are for pages
    that are mostly type. Two layers of image is not depth, it is noise.
  - **One per spread, and not on consecutive spreads.** It works by being
    noticed second, and only sometimes.
- **Why it exists** The book is about what is underneath the ordinary surface of
  things. A layer that is genuinely there, genuinely related to the argument,
  and genuinely easy to miss is the one part of the design that *performs* the
  thesis instead of describing it.

**The last one is the exception.** `ground-08-nested-systems` gathers every
system the other seven drew separately — cell, vessel, street, ecology, circuit,
orbit — with one very small figure inside them. It sits under the final spread
and it is the only ground a reader is meant to consciously notice.

### 12 · SURVEY

The cover's own language, used inside the book. A single organic form built from
contour lines with real watercolour blooms washing through it, plotted points and
a hairline network traced over the top — the artwork on the front board, applied
to one subject at a time.

- **Lives in** the inset card on a reading spread · 92 mm
- **Treatment** Watercolour at full strength. This is the ONLY role besides the
  cover permitted to use it that way; everywhere else in the book, colour is a
  restrained accent on charcoal linework.
- **Rule** It surveys something real from this life — a lake that is walked, a
  tree on a corner, a bench after the work — and it never draws that thing
  literally. No trees, no houses, no roads, no figures: only the systems under
  them. A reader should find it beautiful before they find out what it is, and
  the caption is where they find out.
- **Budget** One per essay at most, and not in every essay. Four is a series;
  eight is wallpaper.

### 11 · PERSONAL
Real photographs. Family, dogs, the lake, old objects, places with meaning.

- **Lives in** Field Notes · closing spreads · the domestic slots
- **Stages** I and V, mostly — the calm ends of the book
- **Treatment** Preserve imperfection. Do not retouch. Let old photographs look
  old. Ephemera is allowed here and nowhere else in Stage I.
- **Rule** Use sparingly so they carry weight. A personal photograph in a book
  of archival plates is the loudest thing on the spread.

---

## How they fit together

The composition rules matter more than the individual choices:

1. **One PLATE per spread.** It is the loudest element in the system.
2. **A SPECIMEN always has a label.** No exceptions — that is the whole difference
   between a field guide and a sticker.
3. **MAP and PLATE never share a spread.**
4. **MICROGRAPH is rationed to Stages III–IV.** It is the payoff.
5. **EPHEMERA touches only SPECIMEN and PERSONAL**, at most twice per spread.
6. **TEXTURE is per stage, never per asset.**
7. **No asset holds two roles.** If a Blossfeldt photograph is a plate on one
   spread it is not a cut-out specimen on another. Pick one and stay with it.
8. **Every archival asset carries its provenance** at the moment it is
   downloaded — `source`, `license`, `credit`. See `asset-sources.md`.

## Where the taxonomy actually stands

Eleven roles are defined here and `place.mjs` now validates all eleven — it knew
only eight for a while, so handwriting, material and ground each warned as
unknown every time one was placed. Fixed in `903e5f2`.

Of 41 images, **14 carry a role and 27 do not.** The 27 are the original
photography and illustration set, which predates this taxonomy: the Essay 01
package, the Attention package, the covers and the divider. They work, they are
placed, and nothing is broken — but none of them is subject to the rules above,
which means "one plate per spread" and "a specimen always carries a label" are
currently conventions rather than anything checked.

Assigning roles to those 27 is a `content/images.json` edit and worth doing
before the taxonomy is relied on. It is not done here because that file is
being actively edited in another session.

| Origin | Count | What |
| --- | --- | --- |
| `generated` | 11 | 8 grounds, 2 hands, the circular cover plate |
| `archive` | 3 | the three material breaks |
| unset | 27 | everything made before the roles existed |

## The stage budget

Roughly, per stage, so the arc is built into the asset plan rather than applied
afterwards:

| Stage | Plates | Specimens | Figures | Maps | Micrographs | Ephemera | Hand |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **I** Observe | — | 2–3 | 1 | 1 | — | light | 2–3 |
| **II** Notice | 2–3 | 4–6 | 3–4 | 1–2 | — | moderate | 2–3 |
| **III** Understand | 2–3 | 2–3 | 4–5 | 1–2 | 3–4 | moderate | 1–2 |
| **IV** Expand | 1–2 | 1 | 3–4 | — | 4–6 | light | 1 |
| **V** Integrate | 1 | 2–3 | 1 | — | — | light | 2–3 |

**Material breaks** sit between stages, not inside them: one at II→III, one at
III→IV, one at IV→V. Three in the book, or two if one of them is weak.

---

## What Rawpixel is actually good for

Checked against the searches, honestly:

**Strong.** The public-domain archive collections, already cut out and cleaned:

- **Haeckel — *Kunstformen der Natur* (1904)**, from Library of Congress
  originals. The full plate set is there: Siphonophorae, Discomedusae,
  Leptomedusae, Stephoidea, Thalamophora, Filicinae, Muscinae, Actiniae,
  Melethallia, Trochilidae, Asteridea. **PLATE** role, Stages II–IV. Board
  three's jellyfish spread is this material.
- **Blossfeldt — *Urformen der Kunst* (1928)**, from Rijksmuseum originals.
  Adiantum pedatum, Allium ostrowskianum, Cirsium canum, Eryngium bourgatii,
  Polystichum munitum, Saxifraga aizoon, Acanthus mollis, Aristolochia.
  **PLATE** or **SPECIMEN**, all stages. And the titles carry the magnification —
  *"enlarged 8 times"* — which drops straight into a specimen card as real data.
- Transparent-PNG cutouts of the same material, which is the **SPECIMEN** form.

**Weak.** The ephemera. Searching washi tape and paper stickers returns
scrapbook material — polka dots, pink, "cute kids pattern". Three neutral ones
exist (wrinkled kraft tape, beige torn paper, brown torn tape) and the rest is
wrong for this book. **Get EPHEMERA and TEXTURE from Envato or RetroSupply
instead** — that is what the subscription is for.

So the split across the three services you already have:

| Role | Source |
| --- | --- |
| PLATE, SPECIMEN, MAP | **Rawpixel** (and BHL / Smithsonian direct, free) |
| MICROGRAPH | **Adobe Stock** credits — it is the one role nothing free covers well |
| EPHEMERA, TEXTURE | **Envato Elements** |
| FIGURE | Drawn in code |
| PERSONAL | You |

---

## Two manifest fields answer different questions, and one of them is a trap — 21 Aug 2026

**`origin` is provenance. `status` is production state. Only `origin` says who
took the picture.**

`status` holds three values across 114 entries: `generated` (102),
`not generated` (5), `placed` (7). It is set by `scripts/place.mjs`, which
writes `status = 'generated'` when an asset is put into the book **whatever the
asset is** — so the studio portrait of Adam's father, a phone copy of a
mid-1980s print, reads `status: generated` in the manifest.

Thirty-eight entries carry `status: generated` alongside an `origin` of
`own photograph` or `archive`. Not one of them is a contradiction. All of them
look like one.

That matters more in this book than it would in most. The question the manifest
gets asked most often is *which of these pictures are Adam's*, and there is a
field whose value appears to answer it and does not. Anyone reading
`status: generated` on the portrait that opens *The Last People Who Remember
Waiting* would conclude the book opens an essay about the pre-network world with
a machine-made face.

**Read `origin`:**

| value | count | what it means |
| --- | --- | --- |
| `own photograph` | 35 | Adam took it |
| `archive` | 8 | somebody else took it; carries `credit` and `license` |
| `generated` | 13 | actually machine-made |
| `original` | 7 | drawn for this book |
| `personal archive` | 2 | from the Facebook export, not yet re-sorted |
| absent | 49 | mostly unplaced entries and plates |

`status` was left alone rather than renamed. Nothing printed depends on it, five
of its `not generated` entries have files on disk anyway, and rewriting a field
across 114 entries to fix a reading problem is how a real one gets introduced.
If it is ever touched, the honest values are *made* and *not made*, and the
rename belongs in `place.mjs` at the same moment.

### Two ids outlived the pictures they named — 21 Aug 2026

When a generated plate is replaced by a photograph, the manifest id stays. Two
of them had drifted far enough to actively mislead, and both open or close an
essay:

| was | is now | what it actually shows |
| --- | --- | --- |
| `before-time-01-road-atlas` | `before-time-01-father-portrait` | The studio portrait of Adam's father, mid-1980s. It opens *The Last People Who Remember Waiting*. |
| `systems-01-ants-pavement` | `systems-01-observation-hive` | A real observation hive behind glass, State Fair 2013. It opens *The Beauty of Systems Nobody Designed*. |

Both `revision` fields record the old name, so nothing is lost and the history
stays readable from the entry itself.

**One more is misnamed and was deliberately left alone.**
`intelligence-06-closing-hands` is a workbench whose own subject line reads
"nobody in frame". It is [shot-list](shot-list.md) item 8 and is going to be
rephotographed, so renaming it now is churn. **Rename it when it is replaced**
— and the replacement has no hands in it either, so the new name should say
bench, not hands.

**The rule this suggests.** `scripts/place.mjs` could refuse a placement whose id
words appear nowhere in its subject. A crude version of that check over the
whole manifest returned 18 hits, of which 2 were real — too noisy to automate
and cheap to run by eye whenever a plate is swapped. Worth doing at swap time,
not on every build.
