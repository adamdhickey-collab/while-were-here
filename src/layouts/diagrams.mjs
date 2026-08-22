/* Original "philosophical field notes" diagrams.
   Drawn in code so they inherit the book's ink colours and stay vector-sharp
   at 300 mm. Deliberately imperfect: the geometry is off true by a degree or
   two everywhere, the way a hand draws it. */

import { seeded } from './helpers.mjs';

/** "What the editor kept" — available / admitted / remembered, to scale. */
export function attentionDiagram() {
  const rand = seeded(20260819);
  const W = 1000, H = 620;

  // Field of everything available: a dense stipple.
  let stipple = '';
  for (let i = 0; i < 1400; i++) {
    const x = 40 + rand() * (W - 80);
    const y = 40 + rand() * (H - 120);
    const r = 0.7 + rand() * 0.7;
    stipple += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`;
  }

  // The fraction admitted: a loose ring, drawn twice, slightly out of register.
  const ringPath = (cx, cy, rx, ry, wobble, phase) => {
    let d = '';
    for (let a = 0; a <= 360; a += 12) {
      const rad = ((a + phase) * Math.PI) / 180;
      const w = 1 + (rand() - 0.5) * wobble;
      const x = cx + Math.cos(rad) * rx * w;
      const y = cy + Math.sin(rad) * ry * w;
      d += (a === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d + 'Z';
  };

  /* The Remembered leader has to clear the Admitted ring before its label
     starts. The ring is rx=210 about cx=600 and wobbles up to +3.5%, so its
     right edge reaches x≈817. The label sat at x=768 and the ring ran straight
     through the word — between the B and the E, in blue, at 300 mm. Leader now
     ends at 832 and the label starts at 840. Measured on the composed spread. */

  // Sightlines from a very small figure to the field.
  let rays = '';
  for (let i = 0; i < 7; i++) {
    const y = 120 + i * 62;
    rays += `<path class="fn-hair fn-dash" d="M118 486 L ${560 + rand() * 300} ${y.toFixed(0)}"/>`;
  }

  return `
<svg class="fieldnote" viewBox="0 0 ${W} ${H}" role="img"
     aria-label="Diagram: the proportion of what is available, admitted and remembered.">
  <g class="fn-fill-ink" opacity="0.5">${stipple}</g>

  <rect class="fn-hair" x="40" y="40" width="${W - 80}" height="${H - 120}"/>
  <text x="46" y="30" font-size="11">Available</text>

  ${rays}

  <path class="fn-cobalt" d="${ringPath(600, 300, 210, 168, 0.07, 0)}"/>
  <path class="fn-cobalt" opacity="0.45" d="${ringPath(603, 303, 210, 168, 0.09, 14)}"/>
  <text x="600" y="112" font-size="11" text-anchor="middle" fill="#536D8E">Admitted</text>

  <circle class="fn-fill-rust" cx="600" cy="300" r="13"/>
  <path class="fn-rust" d="M613 300 L 832 300"/>
  <text x="840" y="304" font-size="11" fill="#A95738">Remembered</text>

  <!-- the observer, to scale -->
  <g class="fn-ink">
    <circle cx="118" cy="470" r="6"/>
    <path d="M118 476 L118 500 M118 484 L108 494 M118 484 L128 494 M118 500 L110 516 M118 500 L126 516"/>
  </g>
  <text x="96" y="538" font-size="10">You, arriving</text>

  <!-- measure -->
  <g class="fn-hair">
    <path d="M40 ${H - 58} L ${W - 40} ${H - 58}"/>
    ${Array.from({ length: 25 }, (_, i) => {
      const x = 40 + i * ((W - 80) / 24);
      const tall = i % 6 === 0;
      return `<path d="M${x.toFixed(1)} ${H - 58} L${x.toFixed(1)} ${H - (tall ? 44 : 50)}"/>`;
    }).join('')}
  </g>
  <text x="40" y="${H - 22}" font-size="9">0</text>
  <text x="${W - 40}" y="${H - 22}" font-size="9" text-anchor="end">one afternoon</text>
</svg>`;
}

/**
 * "Thirty thousand days" — the whole budget of a long life drawn at once, with
 * the two hundred that end up in an album picked out in rust.
 *
 * The grey field is 125 full-height strokes per page with a dash pattern tuned
 * so each dash is one day. That is two elements instead of fifteen thousand,
 * and — unlike an SVG <pattern> fill, which Chromium drops on the print path —
 * it survives into the PDF. The two halves share one grid and meet across the
 * fold without a seam.
 */
export function dayField(half = 0) {
  const COLS = 250, ROWS = 120;          // 30,000 days ≈ 82 years
  const HALF_COLS = COLS / 2;
  const W = 2660, H = 2360;              // tenths of a millimetre, per page
  const cw = W / HALF_COLS;              // column pitch
  const rh = H / ROWS;                   // row pitch
  const tick = 10;                       // 1 mm mark

  let columns = '';
  for (let c = 0; c < HALF_COLS; c++) {
    const x = (c * cw + cw / 2).toFixed(2);
    columns += `M${x} 0V${H}`;
  }

  const rand = seeded(19740312);
  const marked = new Set();
  while (marked.size < 200) marked.add(Math.floor(rand() * COLS * ROWS));

  let rust = '';
  for (const i of marked) {
    const col = i % COLS;
    if (Math.floor(col / HALF_COLS) !== half) continue;
    const x = ((col % HALF_COLS) * cw + cw / 2).toFixed(1);
    const y = (Math.floor(i / COLS) * rh + (rh - tick * 1.4) / 2).toFixed(1);
    rust += `M${x} ${y}v${(tick * 1.4).toFixed(0)}`;
  }

  return `
<svg class="fieldnote day-field" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
     role="img" aria-label="Thirty thousand marks, two hundred of them picked out.">
  <path d="${columns}" stroke="#191919" stroke-width="3" opacity="0.44"
        stroke-dasharray="${tick} ${(rh - tick).toFixed(3)}"
        stroke-dashoffset="${(-(rh - tick) / 2).toFixed(3)}"/>
  <path d="${rust}" stroke="#A95738" stroke-width="5" stroke-linecap="butt"/>
</svg>`;
}

/** A small taped-in card figure: a life as a line, with the peaks as ticks. */
export function punctuation() {
  const rand = seeded(88101);
  let ticks = '';
  const xs = [];
  for (let i = 0; i < 7; i++) xs.push(18 + rand() * 164);
  xs.sort((a, b) => a - b).forEach((x) => {
    ticks += `<path class="fn-rust" d="M${x.toFixed(1)} 26v14"/>`;
  });
  return `
<svg class="fieldnote" viewBox="0 0 200 62" role="img"
     aria-label="A line with seven marks on it.">
  <path class="fn-ink" d="M8 33h184"/>
  <circle class="fn-fill-ink" cx="8" cy="33" r="2"/>
  <circle class="fn-fill-ink" cx="192" cy="33" r="2"/>
  ${ticks}
  <text x="8" y="58" font-size="7">birth</text>
  <text x="192" y="58" font-size="7" text-anchor="end">not birth</text>
</svg>`;
}

/** Ripples at the edge of the lake, drawn the way you would draw them in a
    notebook while trying to work out what they are doing. */
export function observational() {
  const rand = seeded(4242);
  let arcs = '';
  for (let i = 0; i < 7; i++) {
    const r = 10 + i * 13.5;
    const wob = 1 + (rand() - 0.5) * 0.10;
    arcs += `<ellipse class="fn-hair" cx="100" cy="86" rx="${(r * 1.9 * wob).toFixed(1)}" ry="${(r * wob).toFixed(1)}"/>`;
  }
  return `
<svg class="fieldnote" viewBox="0 0 200 140" role="img"
     aria-label="Concentric ripples spreading from a point.">
  ${arcs}
  <circle class="fn-fill-rust" cx="100" cy="86" r="2.6"/>
  <path class="fn-rust" d="M100 83V56"/>
  <text x="100" y="50" font-size="7" text-anchor="middle">point of entry</text>
  <path class="fn-hair" d="M14 128h172"/>
  <text x="14" y="138" font-size="6">0</text>
  <text x="186" y="138" font-size="6" text-anchor="end">≈ 4 s</text>
</svg>`;
}

/** One step, four systems — the amount of work a body does to cross a room. */
export function walking() {
  const stack = [
    ['balance', 'inner ear'],
    ['vision', 'horizon held still'],
    ['placement', 'foot finds ground'],
    ['correction', 'continuous, unasked'],
  ];
  return `
<svg class="fieldnote" viewBox="0 0 200 132" role="img"
     aria-label="Four systems working during a single step.">
  <g class="fn-ink" transform="translate(26 34)">
    <circle cx="0" cy="0" r="5"/>
    <path d="M0 5v26 M0 12l-11 9 M0 12l11 9 M0 31l-9 20 M0 31l10 20"/>
  </g>
  ${stack.map(([k, v], i) => {
    const y = 20 + i * 27;
    return `<path class="fn-hair fn-dash" d="M40 ${y + 4}H86"/>
            <text x="92" y="${y + 7}" font-size="7.5">${k}</text>
            <text x="92" y="${y + 17}" font-size="6" fill="#8C8679">${v}</text>`;
  }).join('')}
  <path class="fn-rust" d="M18 106q10 -9 18 0t18 0"/>
  <text x="60" y="110" font-size="6.5">weight, transferred</text>
</svg>`;
}

export const diagrams = {
  observational,
  walking,
  punctuation,
  'attention-diagram': attentionDiagram,
  'day-field': dayField,
};
