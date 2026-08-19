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
export function figure(image, opts = {}) {
  const { className = '', inverse = false, half = null, compact = false, root = process.cwd() } = opts;
  const classes = ['figure', className, half ? `figure--spread-${half}` : ''].filter(Boolean).join(' ');

  if (!image) {
    return `<div class="${classes}"><div class="plate"><p class="plate__id">missing manifest entry</p></div></div>`;
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
