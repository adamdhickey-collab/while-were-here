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
  <path class="fn-rust" d="M613 300 L 760 300"/>
  <text x="768" y="304" font-size="11" fill="#A95738">Remembered</text>

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

export const diagrams = { 'attention-diagram': attentionDiagram };
