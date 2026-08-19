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

- **Lives in** full bleed beneath type · section divider · printed endpapers
- **Stages** II–III
- **Treatment** Either full-bleed as an image, or dropped to 12–18% opacity as a
  ground under text. Never in between.
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
- **Why it exists** Everything else typographic in this book is machine-set —
  monospace, engraved labels, printed tables. Without a real hand there is no
  evidence anywhere of the person doing the noticing.

Built as `.hand-scan`, positioned `margin`, `corner` or `over`.

### 9 · MATERIAL
A surface that is not paper. Linen, oxidised metal, glass, stone — photographed
at macro scale so it reads as terrain before it reads as substance.

- **Lives in** a full-bleed crossover, on a stage turn
- **Stages** placed at the II→III, III→IV and IV→V turns
- **Treatment** One surface, edge to edge, and almost nothing else. A short line
  reversed out on the recto at most.
- **Rule** **Two or three in the whole book.** More and it becomes a texture
  library; fewer and the paper still reads as a default rather than a decision.
- **Why it exists** Every other asset is pigment on cellulose. One genuinely
  different material makes the paper deliberate, and landing it on a stage turn
  means the change of substance and the change of register arrive together.

Built as spread type `material-break`.

### 10 · PERSONAL
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

## The stage budget

Roughly, per stage, so the arc is built into the asset plan rather than applied
afterwards:

| Stage | Plates | Specimens | Figures | Maps | Micrographs | Ephemera | Hand |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **I** Observe | — | 2–3 | 1 | — | — | light | 2–3 |
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
