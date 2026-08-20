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

Tested and working: the cumulus, the cloud floor from the plane, the Initiation
Well, the Metropol lattice, the muqarnas vault. Marginal: the pebble mosaic,
which survives but only just.

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

## Open

- Whether the plates should be exported at 3000 px or at final placed size. 3000
  is generous for anything under full-bleed and the files are small (about 120 KB
  a plate), so it stays for now.
- The `--levels` default of 3 suits most sources. The cloud floor might be
  better at 4, and the Initiation Well at 2. Worth testing per image rather than
  setting a house number.
