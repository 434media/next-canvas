/**
 * Convert all <text> elements in the MHTH t-shirt SVG to <path> outlines
 * using opentype.js to read the actual Geist font glyphs.
 *
 * Usage: node scripts/text-to-paths.mjs
 */

import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Load fonts ──────────────────────────────────────────────────
const geistBlack = opentype.loadSync(
  path.join(ROOT, 'node_modules/geist/dist/fonts/geist-sans/Geist-Black.ttf')
);
const geistRegular = opentype.loadSync(
  path.join(ROOT, 'node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf')
);
const geistMonoMedium = opentype.loadSync(
  path.join(ROOT, 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.ttf')
);

// ── Helper: render a string to an SVG path d-string ─────────────
function textToPathD(font, text, fontSize, letterSpacingEm = 0) {
  const scale = fontSize / font.unitsPerEm;
  const extraSpacing = letterSpacingEm * fontSize; // px per char gap
  let commands = [];
  let x = 0;

  for (let i = 0; i < text.length; i++) {
    const glyph = font.charToGlyph(text[i]);
    const glyphPath = glyph.getPath(x, 0, fontSize);
    commands.push(...glyphPath.commands);
    x += glyph.advanceWidth * scale;
    if (i < text.length - 1) {
      // Add kerning
      const nextGlyph = font.charToGlyph(text[i + 1]);
      const kerning = font.getKerningValue(glyph, nextGlyph);
      x += kerning * scale;
      // Add letter-spacing
      x += extraSpacing;
    }
  }

  // Build path d-string from commands
  let d = '';
  for (const cmd of commands) {
    switch (cmd.type) {
      case 'M': d += `M${r(cmd.x)} ${r(cmd.y)}`; break;
      case 'L': d += `L${r(cmd.x)} ${r(cmd.y)}`; break;
      case 'Q': d += `Q${r(cmd.x1)} ${r(cmd.y1)} ${r(cmd.x)} ${r(cmd.y)}`; break;
      case 'C': d += `C${r(cmd.x1)} ${r(cmd.y1)} ${r(cmd.x2)} ${r(cmd.y2)} ${r(cmd.x)} ${r(cmd.y)}`; break;
      case 'Z': d += 'Z'; break;
    }
  }
  return { d, width: x };
}

function r(n) { return Math.round(n * 100) / 100; }

// ── Measure text width for centering ────────────────────────────
function measureText(font, text, fontSize, letterSpacingEm = 0) {
  const scale = fontSize / font.unitsPerEm;
  const extraSpacing = letterSpacingEm * fontSize;
  let x = 0;
  for (let i = 0; i < text.length; i++) {
    const glyph = font.charToGlyph(text[i]);
    x += glyph.advanceWidth * scale;
    if (i < text.length - 1) {
      const nextGlyph = font.charToGlyph(text[i + 1]);
      const kerning = font.getKerningValue(glyph, nextGlyph);
      x += kerning * scale;
      x += extraSpacing;
    }
  }
  return x;
}

// ── Define all text elements to convert ─────────────────────────
// Each entry has: text, font, fontSize, letterSpacing (em), x (center), y (baseline), fill, opacity?, comment
const textElements = [
  // MONO LABEL
  { text: 'AI CONFERENCE \u2022 FEBRUARY 28, 2026 \u2022 GEEKDOM', font: geistMonoMedium, fontSize: 11, ls: 0.35, cx: 504, y: 100, fill: '#737373', comment: 'MONO LABEL' },

  // MORE — 3 layers
  { text: 'MORE', font: geistBlack, fontSize: 160, ls: 0.05, cx: 497, y: 260, fill: '#00F2FF', opacity: 0.25, comment: 'MORE cyan glitch' },
  { text: 'MORE', font: geistBlack, fontSize: 160, ls: 0.05, cx: 511, y: 260, fill: '#FF9900', opacity: 0.25, comment: 'MORE orange glitch' },
  { text: 'MORE', font: geistBlack, fontSize: 160, ls: 0.05, cx: 504, y: 260, fill: '#FBBF24', comment: 'MORE gold main' },

  // HUMAN (gold) — 4 layers
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 498, y: 396, fill: '#00F2FF', opacity: 0.2, comment: 'HUMAN gold cyan glitch' },
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 510, y: 396, fill: '#FF9900', opacity: 0.2, comment: 'HUMAN gold orange glitch' },
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 504, y: 390, fill: '#FBBF24', opacity: 0.08, comment: 'HUMAN gold shadow' },
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 504, y: 396, fill: '#FBBF24', comment: 'HUMAN gold main' },

  // THAN — 4 layers
  { text: 'THAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 496, y: 532, fill: '#00F2FF', opacity: 0.3, comment: 'THAN cyan glitch' },
  { text: 'THAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 512, y: 532, fill: '#FF9900', opacity: 0.3, comment: 'THAN orange glitch' },
  { text: 'THAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 504, y: 526, fill: '#FFFFFF', opacity: 0.06, comment: 'THAN white shadow' },
  { text: 'THAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 504, y: 532, fill: '#FFFFFF', comment: 'THAN white main' },

  // HUMAN (white) — 4 layers
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 497, y: 668, fill: '#00F2FF', opacity: 0.25, comment: 'HUMAN white cyan glitch' },
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 511, y: 668, fill: '#FF9900', opacity: 0.25, comment: 'HUMAN white orange glitch' },
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 502, y: 674, fill: '#FFFFFF', opacity: 0.06, comment: 'HUMAN white shadow' },
  { text: 'HUMAN', font: geistBlack, fontSize: 160, ls: 0.05, cx: 504, y: 668, fill: '#FFFFFF', comment: 'HUMAN white main' },

  // TAGLINE — 2 lines
  { text: 'AS AI SHIFTS FROM A TOOL WE USE TO AN AGENT THAT ACTS,', font: geistRegular, fontSize: 15, ls: 0.08, cx: 504, y: 760, fill: '#A3A3A3', comment: 'Tagline line 1' },
  { text: 'THE BOUNDARY BETWEEN HUMAN AND MACHINE IS DISAPPEARING.', font: geistRegular, fontSize: 15, ls: 0.08, cx: 504, y: 784, fill: '#A3A3A3', comment: 'Tagline line 2' },

  // POWERED BY
  { text: 'POWERED BY THE DEVSA COMMUNITY', font: geistMonoMedium, fontSize: 10, ls: 0.3, cx: 504, y: 825, fill: '#525252', comment: 'POWERED BY' },

  // SPONSORS & PARTNERS
  { text: 'SPONSORS & PARTNERS', font: geistMonoMedium, fontSize: 9, ls: 0.3, cx: 504, y: 895, fill: '#737373', comment: 'SPONSORS & PARTNERS' },

  // FOOTER
  { text: 'SAN ANTONIO, TX \u2022 2026', font: geistMonoMedium, fontSize: 10, ls: 0.35, cx: 504, y: 1074, fill: '#525252', comment: 'Footer' },
];

// ── Generate path elements ──────────────────────────────────────
const pathOutputs = [];

for (const el of textElements) {
  const { d, width } = textToPathD(el.font, el.text, el.fontSize, el.ls);
  // Center the path around cx: translate so left edge = cx - width/2
  const tx = r(el.cx - width / 2);
  const ty = r(el.y);

  let attrs = `fill="${el.fill}"`;
  if (el.opacity !== undefined) attrs += ` opacity="${el.opacity}"`;

  pathOutputs.push(`  <!-- ${el.comment} -->\n  <path d="${d}" transform="translate(${tx}, ${ty})" ${attrs}/>`);
}

// ── Now rebuild the SVG ─────────────────────────────────────────
let svg = fs.readFileSync(path.join(ROOT, 'public/mhth-tshirt.svg'), 'utf-8');

// Remove old MONO LABEL text block (lines 51-55)
svg = svg.replace(
  /  <!-- =+ -->\n  <!-- MONO LABEL\s+-->\n  <!-- =+ -->\n  <text[^]*?<\/text>/,
  `  <!-- ============================================ -->\n  <!-- MONO LABEL (outlined)                      -->\n  <!-- ============================================ -->\n${pathOutputs[0]}`
);

// Remove old MAIN TITLE section — all 16 text elements for MORE/HUMAN/THAN/HUMAN
// Match from the star comment to glitch scanline accents
svg = svg.replace(
  /  <!-- =+ -->\n  <!-- ★ MAIN TITLE[^]*?text-rendering="geometricPrecision">HUMAN<\/text>/,
  `  <!-- ============================================ -->\n  <!-- ★ MAIN TITLE — outlined to paths ★         -->\n  <!-- ============================================ -->\n\n  <!-- ——— "MORE" ——— -->\n${pathOutputs.slice(1, 4).join('\n')}\n\n  <!-- ——— "HUMAN" (gold) ——— -->\n${pathOutputs.slice(4, 8).join('\n')}\n\n  <!-- ——— "THAN" ——— -->\n${pathOutputs.slice(8, 12).join('\n')}\n\n  <!-- ——— "HUMAN" (white) ——— -->\n${pathOutputs.slice(12, 16).join('\n')}`
);

// Remove old TAGLINE text block
svg = svg.replace(
  /  <!-- =+ -->\n  <!-- TAGLINE\s+-->\n  <!-- =+ -->\n  <text[^]*?<\/text>\n\n  <!-- POWERED BY -->\n  <text[^]*?<\/text>/,
  `  <!-- ============================================ -->\n  <!-- TAGLINE (outlined)                          -->\n  <!-- ============================================ -->\n${pathOutputs.slice(16, 18).join('\n')}\n\n  <!-- POWERED BY (outlined) -->\n${pathOutputs[18]}`
);

// Remove old SPONSORS & PARTNERS label
svg = svg.replace(
  /  <!-- =+ -->\n  <!-- SPONSORS & PARTNERS — Section Label\s+-->\n  <!-- =+ -->\n  <text[^]*?<\/text>/,
  `  <!-- ============================================ -->\n  <!-- SPONSORS & PARTNERS (outlined)              -->\n  <!-- ============================================ -->\n${pathOutputs[19]}`
);

// Remove old FOOTER text
svg = svg.replace(
  /  <!-- FOOTER -->\n  <text[^]*?<\/text>/,
  `  <!-- FOOTER (outlined) -->\n${pathOutputs[20]}`
);

// Write the result
fs.writeFileSync(path.join(ROOT, 'public/mhth-tshirt.svg'), svg, 'utf-8');
console.log('✅ All text elements converted to outlined paths!');
console.log(`   ${pathOutputs.length} path elements generated.`);

// Verify no <text> elements remain
const remaining = (svg.match(/<text[\s>]/g) || []).length;
if (remaining > 0) {
  console.warn(`⚠️  ${remaining} <text> element(s) still remain — check output!`);
} else {
  console.log('   No <text> elements remain — Printify-ready! 🎉');
}
