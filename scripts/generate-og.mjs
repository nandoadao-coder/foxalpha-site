import { Resvg } from '@resvg/resvg-js';
import { writeFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F7F4EE"/>
  <line x1="80" y1="540" x2="200" y2="540" stroke="#B85D2A" stroke-width="3"/>
  <text x="80" y="280" font-family="Georgia, serif" font-size="96" font-weight="400" fill="#1A1816">FoxAlpha</text>
  <text x="80" y="380" font-family="Georgia, serif" font-style="italic" font-size="48" font-weight="300" fill="#B85D2A">IA em produção, sem teatro.</text>
  <text x="80" y="600" font-family="-apple-system, sans-serif" font-size="22" fill="#5C574F">foxalpha.com.br</text>

  <g transform="translate(900, 180) scale(2.4)" stroke="#1A1816" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M 30,80 L 25,50 L 35,30 L 45,40 L 55,25 L 65,40 L 75,30 L 80,50 L 70,80 Z"/>
    <circle cx="60" cy="55" r="2" fill="#1A1816"/>
  </g>
</svg>`;

const outputPath = 'public/og-default.png';
await mkdir(dirname(outputPath), { recursive: true });

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
const pngData = resvg.render().asPng();
await writeFile(outputPath, pngData);

console.log(`✓ Generated ${outputPath} (${pngData.length} bytes)`);
