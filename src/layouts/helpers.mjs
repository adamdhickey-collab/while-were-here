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
  const { className = '', inverse = false, half = null, root = process.cwd() } = opts;
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
      <div class="plate plate--${esc(image.kind)}${inverse ? ' plate--inverse' : ''}">
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

export const block = (blocks, id) => blocks[id] || `<!-- missing block: ${id} -->`;
