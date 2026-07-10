import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, '../app');

// Leaf icon matching the Material Symbols "eco" concept used in the Navbar.
// Primary color #974317 (terracotta) on a transparent background.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Rounded square background -->
  <rect width="512" height="512" rx="80" fill="#974317"/>
  <!-- White leaf body: pointed at top, broad in middle, tapered to stem base -->
  <path fill="white" d="
    M 256 64
    C 378 64 428 178 420 272
    Q 412 384 256 448
    Q 100 384 92 272
    C 84 178 134 64 256 64
    Z
  "/>
  <!-- Midrib: primary color line through leaf center -->
  <line
    x1="256" y1="448"
    x2="256" y2="64"
    stroke="#974317"
    stroke-width="22"
    stroke-linecap="round"
    opacity="0.55"
  />
  <!-- Upper-right vein -->
  <path fill="none" stroke="#974317" stroke-width="12" stroke-linecap="round" opacity="0.45"
    d="M 256 210 Q 318 188 376 208"/>
  <!-- Upper-left vein -->
  <path fill="none" stroke="#974317" stroke-width="12" stroke-linecap="round" opacity="0.45"
    d="M 256 210 Q 194 188 136 208"/>
  <!-- Lower-right vein -->
  <path fill="none" stroke="#974317" stroke-width="12" stroke-linecap="round" opacity="0.45"
    d="M 256 310 Q 322 290 374 308"/>
  <!-- Lower-left vein -->
  <path fill="none" stroke="#974317" stroke-width="12" stroke-linecap="round" opacity="0.45"
    d="M 256 310 Q 190 290 138 308"/>
</svg>`;

async function pngToIco(pngBuffer, size) {
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize;
  const buf = Buffer.alloc(dataOffset + pngBuffer.length);

  // ICO header
  buf.writeUInt16LE(0, 0); // reserved
  buf.writeUInt16LE(1, 2); // type: 1 = ICO
  buf.writeUInt16LE(1, 4); // count: 1 image

  // Image directory entry
  buf[6] = size === 256 ? 0 : size; // width (0 = 256)
  buf[7] = size === 256 ? 0 : size; // height (0 = 256)
  buf[8] = 0;                        // colorCount (0 = true-color)
  buf[9] = 0;                        // reserved
  buf.writeUInt16LE(1, 10);          // planes
  buf.writeUInt16LE(32, 12);         // bitCount
  buf.writeUInt32LE(pngBuffer.length, 14); // image size
  buf.writeUInt32LE(dataOffset, 18); // image offset

  pngBuffer.copy(buf, dataOffset);
  return buf;
}

async function main() {
  const svgBuf = Buffer.from(svg);

  // 512×512 PNG → app/icon.png
  await sharp(svgBuf).resize(512, 512).png().toFile(resolve(appDir, 'icon.png'));
  console.log('✓ app/icon.png  (512×512)');

  // 32×32 PNG → wrapped in ICO → app/favicon.ico
  const png32 = await sharp(svgBuf).resize(32, 32).png().toBuffer();
  const ico = await pngToIco(png32, 32);
  writeFileSync(resolve(appDir, 'favicon.ico'), ico);
  console.log('✓ app/favicon.ico (32×32 PNG-in-ICO)');
}

main().catch((err) => { console.error(err); process.exit(1); });
