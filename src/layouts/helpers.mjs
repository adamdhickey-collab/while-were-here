import fs from 'node:fs';
import path from 'node:path';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Deterministic PRNG so a rebuild never reshuffles hand-placed marks. */
export const seeded = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const KIND_DIR = { photography: 'photography', illustration: 'illustration', personal: 'personal' };

/**
 * A figure resolves to the real photograph if it has been made, and to a
 * labelled plate carrying its manifest ID if it has not. A proof PDF is
 * therefore also the shot list.
 */
/**
 * A screen print. The separator writes MASKS, so the ink is applied here from
 * the stage's own accents and never baked into the file — the same principle as
 * the handwriting. Lightest plate first, darkest last: a press lays pale ink
 * before dark, and stacking the other way puts the biggest pale plate on top
 * and washes the whole thing out.
 *
 * Dark stages cannot multiply. Multiplying anything into the void ground only
 * makes it darker, so those composite normally and the layer order reverses.
 */
export function plateStack(image, { className = '', root = process.cwd(), dark = false } = {}) {
  const slug = image.slug || image.id;
  const order = dark ? [1, 2, 3] : [3, 2, 1];
  const layers = order
    .map((n) => {
      const rel = path.join('images', 'plates', `${slug}-plate-${n}.png`);
      if (!fs.existsSync(path.join(root, 'public', rel))) return '';
      return `<img class="p${n}" src="${esc(rel)}" alt="">`;
    })
    .filter(Boolean);

  if (!layers.length) return '';

  return `<div class="figure ${esc(className)}">
      <div class="plate-stack${dark ? ' plate-stack--dark' : ''}" role="img" aria-label="${esc(image.subject)}">
        ${layers.join('\n        ')}
      </div>
    </div>`;
}

export function figure(image, opts = {}) {
  const { className = '', inverse = false, half = null, compact = false, root = process.cwd() } = opts;
  /* A composite arrives already mounted, taped, captioned or keyed. The layout
     must not put a second frame around a frame that is already in the picture. */
  const classes = ['figure', className, half ? `figure--spread-${half}` : '',
    image && image.composite ? 'figure--composite' : ''].filter(Boolean).join(' ');

  if (!image) {
    return `<div class="${classes}"><div class="plate"><p class="plate__id">missing manifest entry</p></div></div>`;
  }

  /* A screen print is stacked masks inked by the stage, not a single file. */
  if (image.treatment === 'screen-print') {
    const stacked = plateStack(image, { className, root, dark: opts.dark });
    if (stacked) return stacked;
  }

  const rel = path.join('images', KIND_DIR[image.kind] || 'photography', image.filename);
  const abs = path.join(root, 'public', rel);
  if (fs.existsSync(abs)) {
    return `<div class="${classes}"><img src="${esc(rel)}" alt="${esc(image.subject)}"></div>`;
  }

  return `<div class="${classes}">
      <div class="plate plate--${esc(image.kind)}${inverse ? ' plate--inverse' : ''}${compact ? ' plate--compact' : ''}">
        <div class="plate__top">
          <p class="plate__id">${esc(image.id)}</p>
          <p class="plate__kind">${esc(image.kind)}</p>
        </div>
        <div class="plate__bottom">
          <p class="plate__subject">${esc(image.subject)}</p>
          <p class="plate__spec">${esc(image.aspect)} &nbsp;·&nbsp; ${esc(image.target)} &nbsp;·&nbsp; ${esc(image.status)}</p>
        </div>
      </div>
    </div>`;
}

/**
 * A ground layer: a hairline drawing laid under the page at very low opacity.
 * Unlike every other figure this one renders NOTHING when the file is missing —
 * a labelled placeholder plate at 8% opacity would be an invisible smudge, and a
 * ground is the one layer whose absence is better than a stand-in for it.
 */
export function ground(image, { root = process.cwd() } = {}) {
  if (!image) return '';
  const rel = path.join('images', KIND_DIR[image.kind] || 'illustration', image.filename);
  if (!fs.existsSync(path.join(root, 'public', rel))) return '';
  return `<div class="ground" aria-hidden="true"><img src="${esc(rel)}" alt=""></div>`;
}

/**
 * The first of these images whose file actually exists. A manifest entry is not
 * evidence that anything has been made — `ctx.image(id)` returns the record
 * either way — so anywhere that wants to fall back to a stand-in has to ask
 * about the file, not the entry.
 */
export function firstMade(images, { root = process.cwd() } = {}) {
  for (const img of images) {
    if (!img) continue;
    const rel = path.join('images', KIND_DIR[img.kind] || 'photography', img.filename);
    if (fs.existsSync(path.join(root, 'public', rel))) return img;
  }
  return images.find(Boolean) || null;
}

export const folio = (n, rubric) =>
  `<div class="folio">${n}${rubric ? `<span class="folio__rubric">${esc(rubric)}</span>` : ''}</div>`;

export const ring = (size = 17) => `
  <svg class="ring" viewBox="0 0 40 40" aria-hidden="true" style="width:${size}mm;height:${size}mm">
    <circle cx="20" cy="20" r="16.4" pathLength="100" stroke-dasharray="97 3" transform="rotate(-24 20 20)"/>
  </svg>`;

/**
 * The cover mark: a dot with rays. Half compass rose, half dandelion, half
 * diagram of something radiating outward from an ordinary point — which is
 * the argument of the book in one figure.
 */
export const radiant = (size = 22, rays = 32) => {
  const rand = seeded(31415);
  let d = '';
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 - Math.PI / 2;
    const inner = 3.4;
    const outer = i % 4 === 0 ? 19 : 13.5 + rand() * 4.5;
    d += `M${(20 + Math.cos(a) * inner).toFixed(2)} ${(20 + Math.sin(a) * inner).toFixed(2)}`
       + `L${(20 + Math.cos(a) * outer).toFixed(2)} ${(20 + Math.sin(a) * outer).toFixed(2)}`;
  }
  return `
  <svg class="radiant" viewBox="0 0 40 40" aria-hidden="true"
       style="width:${size}mm;height:${size}mm">
    <path d="${d}" stroke="currentColor" stroke-width="0.42" stroke-linecap="round" fill="none"/>
    <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
  </svg>`;
};

/** Page wrapper. Sides, folios and spread type are set by the compositor. */
export function page({ side, folio: n, rubric, spread, label, className = '', body }) {
  return `<section class="page page--${side} ${className}"
      data-side="${side}"
      data-spread="${esc(spread || '')}"
      data-folio="${n ?? ''}"
      data-label="${esc(label || '')}">
      ${body}
      ${n ? folio(n, rubric) : ''}
    </section>`;
}

/* A block reference may join several blocks with `+`, so a spread can carry a
   longer run of prose without the markdown having to be re-cut. */
export const block = (blocks, id) =>
  String(id)
    .split('+')
    .map((k) => blocks[k.trim()] || `<!-- missing block: ${k.trim()} -->`)
    .join('');
