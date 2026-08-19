# Illustration prompts — PHILOSOPHICAL FIELD NOTES

The house illustration style. These should read as pages torn from a field
manual for a discipline that does not exist — one that studies consciousness,
time, technology, memory, attention and mortality with the same patient
seriousness a botanist brings to leaves.

The distinction that governs the whole book:

> **Photography means: look at the world.**
> **Illustration means: look at the idea.**

---

## Master style preamble

> An illustrated plate from a vintage scientific field guide, hand-drawn in ink
> on warm cream paper. Imperfect geometry — circles slightly out of true, lines
> drawn by hand, everything a degree or two off square. Combines field-guide
> illustration, vintage scientific diagram, cartography, biological form and
> marginalia: arrows, rings, timelines, constellations, measure scales, tiny
> human figures. Screenprint and risograph texture, visible ink density
> variation and slight misregistration between colours. Charcoal near-black ink
> as the primary mark on a warm cream ground, with restrained accents of muted
> rust, faded cobalt and moss green. Intelligent, tactile, playful, mysterious,
> conceptual, editorial, handmade.

## Master negative constraints

> No gradients. No glossy 3D or rendered lighting. No generic vector people.
> No corporate infographic style. No SaaS or explainer-video illustration.
> No polished icon sets. No decorative complexity without conceptual purpose.
> No fake handwritten paragraphs or invented lettering. No legible text of any
> kind unless specified. No psychedelic or hallucinatory imagery. No symmetry
> for its own sake.

## Palette

| Role | Value |
| --- | --- |
| Ground | `#F3EFE5` warm paper |
| Primary ink | `#191919` near-black |
| Accent | `#A95738` muted rust |
| Accent | `#536D8E` faded cobalt |
| Accent | `#68735B` moss |
| Rare accent | `#E44E2D` red-orange — once or twice per section, never more |

An illustration uses the ground, the ink, and **at most two** accents. The
red-orange is an event, not a colour.

## Drawn in code, or generated

Some diagrams are better authored as SVG inside the book than generated as
images: they inherit the exact ink colours, stay vector-sharp at 300 mm, and can
be edited when the argument changes. `src/layouts/diagrams.mjs` holds these.
Generate an illustration instead when the piece needs real ink texture, organic
form or collage.

The prototype's diagram — *What the editor kept* — is drawn in code, and is the
reference for how much restraint these plates want: a stipple field, one loose
ring, one filled dot, one figure, one measure. Nothing else.

---

## Prompts in production

### attention-02-field-notes
*Essay: The Secret Life of Attention · Spread: pull quote, verso*

> [MASTER PREAMBLE] A field-guide plate showing the same ordinary room drawn
> twice, side by side. On the left, the room rendered completely in fine
> hairline ink — furniture, window, lamp, floorboards, dust, every detail
> present. On the right, the same room reduced to only the four or five marks
> that survived being looked at: the window, the lamp, one edge of a table, and
> nothing else. Small numbered tick marks along the base of each drawing. Cream
> ground, charcoal ink, one faded cobalt accent on the right-hand drawing only.
> Square plate. [MASTER NEGATIVES]

- **Concept.** The paraphrase. What the editor kept.
- **Purpose.** Gives the pull quote something to argue with rather than decorate.
- **Watch for.** The right-hand drawing must feel like a loss, not a
  simplification exercise. Leave the paper empty where the detail used to be.

---

## Plates held for later essays

Sketched here so the visual argument of the book develops across sections rather
than per essay.

### The Beauty of Systems Nobody Designed *(Part II)*
> A plate of six naturally occurring patterns drawn as if catalogued by one
> hand — a river delta, a slime mould, a footpath worn across a lawn, a market,
> a neural cluster, a city grown without a plan — arranged in two rows of three
> with small measure bars beneath each. Moss and rust accents.

### The Last Generation That Remembers the Before-Time *(Part III)*
> A single horizontal timeline drawn in ink across the plate, with a dense
> cluster of small hand-drawn objects on the left (rotary dial, film canister,
> paper map, card catalogue) thinning to almost nothing on the right. One small
> human figure standing at the point where the density breaks. Rust accent on
> that figure only.

### Your Body Is a Civilization *(Part II)*
> A cross-section drawn in the manner of an anatomical plate but populated as a
> settlement: districts, routes, populations, a legend of species. Cobalt and
> moss. Absolutely no medical realism.

### While We're Here *(Part IV, closing essay)*
> An almost empty plate. A single imperfect ring in rust, drawn with one
> continuous line that does not quite close, at the centre of a large cream
> field. A measure scale along the bottom edge with no numbers on it.

---

## Working method

1. Generate at 4000 × 4000 px minimum, square unless the placement says otherwise.
2. Keep the largest clean original in `/public/images/illustration`.
3. Never upscale a weak generation to hit a resolution target — regenerate.
4. Record status and revision notes in `content/images.json`, not here. The
   manifest table in `prompts/image-manifest.md` regenerates from it on build.
