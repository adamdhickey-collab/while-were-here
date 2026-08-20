# The screen-print treatment

An accent register for architecture, pattern and cloud: the photograph
abstracted into a few flat inks, organic rather than mechanical, painterly but
restrained.

---

## What was tested

Three treatments, all built the way a real screen print works — separate the
tone into a small number of plates, print each in one ink, let the overlaps
darken by overprint, misregister them slightly.

| | Result |
| --- | --- |
| **A · three-colour separation** | Graphic and convincing on simple sources. On the mosaic and the vault the fine detail became noise. |
| **B · duotone halftone** | Muddy. The dot fights the paper texture the book already carries, and the second ink disappeared under the first. **Dropped.** |
| **C · organic** | The direction. Large simplified masses, tone not fully flattened, enough paper showing that it reads as an accent rather than a filter. |

C was then revised with a **detail budget**, which turned out to be the whole
trick.

## The detail budget

The image is reduced to about 380 px before the plates are cut, then scaled back
up. Fine repeating texture physically cannot survive that, so a mosaic or a
muqarnas vault resolves into shapes instead of grit, and the upscale softens the
plate edges the way a coarse screen would.

**This is a selection rule, not just a setting.** The treatment wants sources
whose interest is *mass*: cloud, silhouette, a lit aperture, a lattice against
sky. A source whose interest is *texture* should stay a photograph. Deciding
which is which is now part of choosing an image, not something to fix afterward.

Tested and working: the cumulus, the Initiation Well, the Metropol lattice, the
muqarnas vault. Marginal: the pebble mosaic, which survives but only just.
Failed: the cloud floor from the plane, for the reason below.

## How it is implemented

`npm run separate -- <image> <slug>` writes **masks**, not coloured images:

```
public/images/plates/<slug>-plate-1.png   darkest, smallest area
public/images/plates/<slug>-plate-2.png
public/images/plates/<slug>-plate-3.png   lightest, largest area
```

The colour is applied by the layout from `--accent-1/2/3`, exactly as the book
already does with handwriting: place it, never bake it. A plate never names a
colour, so re-pacing a stage recolours every print in the book automatically,
and the same separation reads warm in Stage I and cold in Stage II without being
regenerated.

### Stacking

**Lightest first, darkest last.** A press lays pale ink before dark, and
stacking 1-2-3 puts the biggest pale plate on top and washes the whole thing
out. This was the first thing I got wrong.

```css
.plate-stack { position: relative; background: var(--ground); }
.plate-stack img { position: absolute; inset: 0; mix-blend-mode: multiply; }
.plate-stack .p3 { background: var(--accent-3); opacity: .30; translate:  -3px  4px; }
.plate-stack .p2 { background: var(--accent-1); opacity: .50; translate:   4px -3px; }
.plate-stack .p1 { background: var(--ink);      opacity: .85; translate:   0    0;   }
```

Multiply is the only blend the book allows, and it is also the physically
correct one here: overprinting two inks genuinely does darken.

Misregistration is 3 to 5 px at 3000 px wide, so roughly a third of a
millimetre in print. Enough to see, not enough to look broken. Grain comes from
the global paper texture, never from the plate — texture is a property of the
paper, per [asset-system.md](asset-system.md).

## Where it is allowed

An **accent**, which means it earns its place by being rare.

- **Two or three per stage at most.** More and the book becomes a print portfolio.
- **Never on a PERSONAL image.** Those are evidence and must not be stylised.
  The whole point of the personal photographs is that nothing was done to them.
- **Never on a SPECIMEN.** A specimen is a document; a print is an
  interpretation. Pick one.
- Good on PLATE, MAP and MATERIAL, and on a divider or a stage turn where an
  abstracted image carries the change of register.
- One per spread. Two screen prints facing each other cancel out.

## Dark stages invert

Stages III and IV run on a dark ground with light ink, and the separation has to
invert with them.

The plates mark pixels **darker** than each cut, which is what you want on
paper. On `--void` you need their complement, painted in light ink, laid
**largest first**. And multiply cannot do it: multiplying anything into #14111C
only makes it darker. Dark stages composite normally instead.

This is the one place the book's "multiply is the only blend" rule does not
apply, and it is not a violation of it. Light ink on dark stock is opaque in
reality too. Nothing is being blended.

```css
.plate-stack--dark img { mix-blend-mode: normal; }   /* opaque ink on dark stock */
```

## Separated so far

| Source | Levels | Stage | Verdict |
| --- | --- | --- | --- |
| Cumulus and bird | 3 | I | Works. The original proof. |
| **Initiation Well** | **2** | IV | Best of the set. Two plates, lavender and paper on void. Three made it busy and the magenta fought the spiral. |
| **Metropol lattice** | **3** | II | Works. Reads near two-tone at the opacities tested; push `--accent-1` harder at placement if it wants more colour. That is a CSS number, not a plate problem. |
| Cloud floor from the plane | 3 and 4 | IV | **Rejected. Do not print this one.** |
| **Figure at the river** | 3 | V | **Placed**, Part IV divider. Three masses and nothing else, which is what the process wants. From the Facebook archive at 1,280 px, which the process does not care about. |
| **Penguin underwater** | 3 | III | **Placed**, essay 04 pull quote. Composites normally on the dark ground. |
| Forest horizon | 3 | II | **Pulled at placement.** Fine as a flat composite, near-black in the multiply stack: canopy puts almost every pixel below the darkest cut. |
| Empty room | 3 | V | **Pulled at placement.** The separation is good and the slot was wrong. A 4:3 source cropped to a 2:3 tall plate loses the window, and the window was the subject. |

### Why the cloud floor was rejected

It was on my own shortlist and it should not have been. The image is a delicate
warm gradient, and the gradient *is* the subject. Separating it into flat bands
destroys the only thing it had, and Stage IV's magenta and lavender replace a
sunset with something lurid. Four levels was muddier than three, not better.

It stays a photograph, full-bleed, at the III to IV turn, which is what
[asset-system.md](asset-system.md) asks of a material break anyway: "one
surface, edge to edge, and almost nothing else."

**The general rule this gives us:** the treatment needs *masses*. A source whose
interest is a gradient fails it for the same reason a source whose interest is
fine texture does. Both are continuous, and the separation is discrete.

## Open

- Whether plates should be exported at 3000 px or at final placed size. 3000 is
  generous for anything under full-bleed and the files stay small, so it stays.
- The `--levels` default of 3 holds, but it is a starting point per image rather
  than a house number. Two suited the well.


## Rendering, added 19 Aug 2026

Until now this file described a treatment the book had never actually printed:
the plates existed, the CSS was written out here, and `.plate-stack` appeared
nowhere in `src/`. It is now implemented in `plateStack()` in
`src/layouts/helpers.mjs`, and `figure()` delegates to it whenever a manifest
entry carries `treatment: "screen-print"`. So a print can go anywhere a figure
can, and the stage inks it.

The stage reaches the renderer through `ctx.stage`, which `scripts/build.mjs`
now threads in. That is also what decides `plate-stack--dark`.

**Two of four survived placement**, which is worth knowing before separating a
batch. A source that looks right as a flat three-colour composite can still
fail in the book, because the book multiplies the plates over the page ground
rather than laying them on white. Judge it in the paginator, not in a preview.
