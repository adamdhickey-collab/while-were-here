#!/usr/bin/env node
/* Generate copy-paste-ready image prompts from content/images.json.
   One self-contained prompt per image: no preamble to remember, no cross
   references to resolve. Paste a block, generate, save under the given
   filename, and the next build swaps out the placeholder plate. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { images } = JSON.parse(fs.readFileSync(path.join(root, 'content/images.json'), 'utf8'));

const PHOTO_STYLE =
  'A believable documentary photograph of the real world — quiet, contemplative, ' +
  'observant, naturalistic, cinematic, very slightly uncanny. Natural available light ' +
  'only, late afternoon or early morning. Restrained composition with strong negative ' +
  'space and slightly imperfect, off-centre framing, as though the photographer did not ' +
  'have time to fix it. Believable lens behaviour: mild vignetting, real depth of field, ' +
  'no exaggerated bokeh. Muted colour — warm neutrals, faded blue, moss green, occasional ' +
  'amber light. Subtle 35 mm film grain and real surface texture. Emotionally present, ' +
  'never sentimental. Shot on a 35 mm or 50 mm prime.';

const PHOTO_AVOID =
  'Avoid: fantasy; neon, glow or bloom effects; floating or impossible objects; glossy ' +
  'commercial or stock photography; exaggerated HDR or heavy grading; smiling models; ' +
  'anyone looking into the lens; visible text, signage lettering, logos or watermarks; ' +
  'distorted hands, faces or anatomy; AI-render sheen; symmetrical dead-centre ' +
  'composition; added lens flare.';

const ILLO_STYLE =
  'An illustrated plate from a vintage scientific field guide, hand-drawn in ink on warm ' +
  'cream paper. Imperfect geometry — circles slightly out of true, lines drawn by hand, ' +
  'everything a degree or two off square. Field-guide illustration crossed with vintage ' +
  'scientific diagram, cartography and marginalia: arrows, rings, timelines, measure ' +
  'scales, tiny human figures. Screenprint and risograph texture with visible ink density ' +
  'variation and slight misregistration. Charcoal near-black ink on a warm cream ground ' +
  '(#F3EFE5), with restrained accents of muted rust (#A95738), faded cobalt (#536D8E) and ' +
  'moss green (#68735B). Intelligent, tactile, playful, handmade.';

const ILLO_AVOID =
  'Avoid: gradients; glossy 3D or rendered lighting; generic vector people; corporate ' +
  'infographic style; SaaS or explainer-video illustration; polished icon sets; ' +
  'decorative complexity with no conceptual purpose; fake handwritten paragraphs or ' +
  'invented lettering; any legible text; psychedelic imagery; symmetry for its own sake.';

const FRAME = {
  '1:1': 'Square frame (1:1).',
  '2:1': 'Wide panoramic frame (2:1). This runs across a two-page spread, so keep the centre calm and place nothing important in the middle 30 mm.',
  '3:1': 'Very wide band (3:1), figures small in the frame.',
  '2:3': 'Vertical frame (2:3), subject low, generous empty space above.',
  '3:2': 'Horizontal frame (3:2).',
  '4:3': 'Horizontal frame (4:3).',
  '3:4': 'Vertical frame (3:4).',
  '4:5': 'Vertical frame (4:5).',
  '1:2': 'Tall narrow frame (1:2) — the annotations are arranged down the strip with clear space between them, so each one can be cut out and placed separately.',
};

/* --outstanding writes a self-contained brief covering only what has not been
   made yet, with the context someone needs to make it well. The full library
   stays useful as a record; this is the thing you hand to someone. */
const outstandingOnly = process.argv.includes('--outstanding');
/* --grounds writes just the eight ground layers, which are generated as a set
   and are the one role where getting the composition wrong wastes the whole
   image. They want their own sheet. */
const groundsOnly = process.argv.includes('--grounds');

const KIND_DIR = { photography: 'photography', illustration: 'illustration', personal: 'personal' };
/* A screen print is a stack of plates resolved by SLUG — those entries carry
   "—" as their filename because no single file is ever named. Asking only about
   the filename reports a finished print as still outstanding, and the brief
   then asks someone to make a picture the book already has. */
const made = (i) =>
  fs.existsSync(path.join(root, 'public/images/plates', `${i.slug || i.id}-plate-1.png`)) ||
  fs.existsSync(path.join(root, 'public/images', KIND_DIR[i.kind] || 'photography', i.filename));

const byEssay = new Map();
const pool = groundsOnly ? images.filter((i) => i.role === 'ground')
  : outstandingOnly ? images.filter((i) => !made(i)) : images;
for (const i of pool) {
  if (!byEssay.has(i.essay)) byEssay.set(i.essay, []);
  byEssay.get(i.essay).push(i);
}

const HAND_STYLE =
  'A set of genuine handwritten annotations in brown-black iron-gall ink, photographed or ' +
  'scanned from a nineteenth-century manuscript or field notebook and cut out onto a fully ' +
  'transparent background. Real ink behaviour is the whole point: pressure variation through ' +
  'each stroke, thick and thin where the nib turned, one small blot, ink pooling at a stroke ' +
  'end, and one genuine crossing-out. Slightly irregular baselines. Nothing typeset, nothing ' +
  'traced, nothing even in weight.';

const HAND_AVOID =
  'Avoid: any paper, card or background — the ink must sit on full transparency; legible words ' +
  'or readable sentences; even, uniform stroke weight; calligraphy-practice regularity; a ' +
  'handwriting font or anything that looks digitally traced; drop shadows; modern ballpoint or ' +
  'marker; colour other than iron-gall brown-black.';

const MATERIAL_STYLE =
  'A macro photograph of a single material surface, lit with raking light from one side so the ' +
  'surface throws its own shadows and its texture reads as terrain. Fills the entire frame edge ' +
  'to edge. Shallow but honest depth of field. Muted, true colour with no grading. Real ' +
  'photographic texture and fine grain.';

const MATERIAL_AVOID =
  'Avoid: any object, edge, hem, seam or boundary — only surface; anything that lets the viewer ' +
  'work out the scale; styled or arranged compositions; props; studio seamless backgrounds; ' +
  'heavy grading or HDR; vignettes; visible text or watermarks; symmetry; a recognisable scene ' +
  'resolving out of the texture.';

const GROUND_STYLE =
  'A scientific plate in the manner of the cover artwork for this book: fine ink linework, ' +
  'plotted points, small circular inset diagrams, delicate annotation arcs, and occasionally a ' +
  'tiny human figure for scale — everything drawn at a single hairline weight, on a fully ' +
  'transparent background. At most one very diffuse wash of a single colour, soft-edged, ' +
  'behaving like watercolour that has spread into damp paper. It reads as a real study of a ' +
  'real system, drawn by someone who was measuring something. ' +
  'This is a GROUND: it will be laid underneath body copy at roughly 8 to 14 percent opacity, ' +
  'so it must survive being almost invisible, must never fight the text, and must have its ' +
  'density placed where the type is not.';

const GROUND_AVOID =
  'Avoid: any paper, card or background colour — the artwork must sit on full transparency; ' +
  'variable or heavy line weight; hard-edged washes; fills, hatching or shading; text, ' +
  'numerals, labels, scale bars or legends of any kind; frames or borders; drop shadows; a ' +
  'dense area that would darken into a blotch under body copy; perfect radial symmetry; a ' +
  'repeated or tiling motif; infographic or corporate-diagram styling; anything resolving into ' +
  'a recognisable scene or object.';

const promptFor = (i) => {
  const byRole = {
    handwriting: [HAND_STYLE, HAND_AVOID],
    material: [MATERIAL_STYLE, MATERIAL_AVOID],
    ground: [GROUND_STYLE, GROUND_AVOID],
  };
  const [style, avoid] = byRole[i.role] ||
    (i.kind === 'illustration' ? [ILLO_STYLE, ILLO_AVOID] : [PHOTO_STYLE, PHOTO_AVOID]);
  const frame = FRAME[i.aspect] || `Frame ${i.aspect}.`;
  /* Stages III and IV invert the page. A ground drawn in charcoal disappears
     into a charcoal ground, so those are drawn in pale ink instead and the
     prompt has to say so before anything else about the drawing. */
  const dark = i.role === 'ground' && i.stage >= 3
    ? ['THIS ONE IS DRAWN IN PALE INK. The page it sits on is a dark charcoal or ' +
       'near-black ground and the type reverses out of it, so every line, point and ' +
       'inset in this drawing must be WHITE or near-white, never charcoal and never ' +
       'black. The single colour wash stays, but it must be a luminous version of ' +
       'itself. On a transparent background, pale ink can look like almost nothing ' +
       'while you are drawing it. That is correct.']
    : [];
  return [style, ...dark, i.subject, frame, avoid].join('\n\n');
};


const BRIEF = `<!-- GENERATED by \`npm run brief\`. Edit content/images.json, not this file. -->

# Outstanding assets — brief

**Book:** *While We're Here* — Adam Hickey. A 300 × 300 mm hardcover of short
essays on attention, ordinary life, hidden systems and being alive. Twenty-three
images are already made and placed. These ${pool.length} are what remain, and they
are the two registers the set is currently missing entirely.

## What the book already looks like

Warm cream paper throughout. A heavy, high-contrast display serif set very tight
for titles; a grotesque for body copy; a mono for labels and specimen data.
Photography is quiet and documentary — natural light, strong negative space,
muted colour, nothing staged, no one looking at the camera. Illustration is
field-guide: hand-drawn ink on cream, imperfect geometry, with rust, cobalt and
moss accents. The book runs an arc across five stages, from calm observation
through a vivid dark-ground peak and back to calm.

## The two rules that decide whether these work

**1. The hand must not be legible.** The handwriting is a gesture, not content.
The moment a reader can read a sentence they stop noticing the page and start
decoding it. Real ink behaviour matters far more than real words — pressure
variation through the stroke, a blot, ink pooling, one genuine crossing-out.
**Ink on a fully transparent background, no paper behind it**: it has to sit on
the book's own paper, not bring its own. A handwriting font or anything that
looks traced will not pass at 300 mm, which is the whole reason these are being
made rather than set.

**2. The materials must not become objects.** Macro, raking light, no edge, no
hem, no seam — only surface, filling the frame. The moment a linen weave
resolves into a piece of cloth, or condensation resolves into a window with a
view beyond it, it stops being a material break and becomes a photograph of a
thing. Nothing in frame should let a viewer work out the scale.

## Technical

- Generate at the largest size available and keep the original. Do not upscale a
  weak result to hit a number — regenerate.
- Aspect ratios are not suggestions; each fits a specific slot.
- Anything marked 2:1 runs across the fold of a spread: keep the centre calm and
  put nothing important in the middle 30 mm.
- File format and filename exactly as given, or the build will not pick it up.

---
`;

const GROUNDS = `# The eight grounds

A ground is a faint scientific plate laid **underneath body copy** at 8 percent
opacity on a pale page and 14 percent on a dark one. It is the quietest layer in
the book and the one a reader is never meant to consciously notice, except for
the last one.

There is one per essay, and each is keyed to the system its own essay argues
about. That is the whole idea: the reader is reading about habituation on top of
a picture of habituation.

## The four rules

**1. Transparent background. No paper, no card, no cream.** The drawing has to
sit on the book's own page. A ground that brings its own background will cover
the page it is supposed to sit under.

**2. One hairline weight everywhere.** No thick-and-thin, no emphasis, no
shading, no fills. If a line looks important it is wrong.

**3. No text of any kind.** No numerals, no labels, no scale bars, no legends,
no axis titles. This is the single most common failure and it ruins the image,
because the book sets its own labels and a second set underneath them reads as a
printing error.

**4. Composition is not a suggestion.** Every one of these runs across a
two-page spread with two columns of body copy in the upper half of both pages.
Density in the upper half will show through the type and make it unreadable.
Put the drawing low.

## Technical

- **All eight are 2:1, 8000 x 4000 px.** A reading spread is two 300 mm pages,
  and the layout gives each page its half. This was verified in the paginator.
- **Transparent PNG.** Not JPEG, not a white background you intend to remove.
- **Save the filename exactly as given.** The build picks the file up on the next
  run and replaces the placeholder with no code change.
- Generate at the largest size the model will give you and keep the original.
  Do not upscale a weak result to hit the number. Regenerate.

## Five are on pale paper, three are on dark

Grounds 04, 05 and 06 sit on essays whose pages invert to charcoal or near-black.
Those three must be drawn in **white or near-white ink**. The prompts say so, in
capitals, before anything else. If one of those three comes back in charcoal it
is invisible in the book and has to be redone.

| # | Essay | Page | Ink |
| --- | --- | --- | --- |
| 01 | Most of Life Is a Tuesday | warm paper | charcoal |
| 02 | The Secret Life of Attention | warm paper | charcoal |
| 03 | The Beauty of Systems Nobody Designed | bone | charcoal |
| 04 | The Intelligence Outside Your Head | **charcoal** | **pale** |
| 05 | The Strange Privilege of Being Alive... | **charcoal** | **pale** |
| 06 | The Last Generation That Remembers... | **near-black** | **pale** |
| 07 | Why Humans Need Pilgrimages | warm paper | charcoal |
| 08 | While We're Here | warm paper | charcoal |

---
`;

let out = groundsOnly ? GROUNDS : outstandingOnly ? BRIEF : `<!-- GENERATED by \`npm run prompts\` from content/images.json. Edit the JSON. -->

# Image prompts

One self-contained block per image. Paste a block into ChatGPT, generate, then
save the result as the given filename under \`public/images/<type>/\`. The next
\`npm run build\` replaces the placeholder plate automatically — no code change.

Ask for the largest size the model will produce, then keep the original. Do not
upscale a weak generation to hit the target; regenerate instead.

`;

for (const [essay, list] of byEssay) {
  out += `\n## ${essay === '—' ? 'Recurring assets' : essay}\n`;
  for (const i of list) {
    out += `\n### ${i.id}\n\n`;
    out += `**Save as** \`public/images/${i.kind}/${i.filename}\` · ${i.aspect} · target ${i.target}\n`;
    out += `**Where it goes** ${i.spread}\n`;
    out += `**Why it is there** ${i.purpose}\n`;
    if (i.revision) out += `**Watch for** ${i.revision}\n`;
    out += `\n\`\`\`text\n${promptFor(i)}\n\`\`\`\n`;
  }
}

fs.mkdirSync(path.join(root, 'prompts'), { recursive: true });
const file = groundsOnly ? 'prompts/ground-prompts.md'
  : outstandingOnly ? 'prompts/outstanding-brief.md' : 'prompts/image-prompts.md';
fs.writeFileSync(path.join(root, file), out);
console.log(`✓ ${pool.length} ${groundsOnly ? 'grounds' : outstandingOnly ? 'outstanding' : 'prompts'} → ${file}`);
