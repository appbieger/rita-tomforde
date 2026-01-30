const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG source for the favicon
const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" ry="4" fill="#FF1493"/>
  <text x="16" y="23" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="18" font-weight="bold" fill="#FFFFFF">RT</text>
</svg>`;

// Higher resolution SVG for better quality at larger sizes
const svgSourceHiRes = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="22" ry="22" fill="#FF1493"/>
  <text x="90" y="125" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="100" font-weight="bold" fill="#FFFFFF">RT</text>
</svg>`;

const outputDir = path.join(__dirname, '..', 'src');

async function generateFavicons() {
  console.log('Generating favicons...');

  // Generate apple-touch-icon.png (180x180)
  await sharp(Buffer.from(svgSourceHiRes))
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png (180x180)');

  // Generate favicon-32x32.png
  await sharp(Buffer.from(svgSource))
    .resize(32, 32)
    .png()
    .toFile(path.join(outputDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // Generate favicon-16x16.png
  await sharp(Buffer.from(svgSource))
    .resize(16, 16)
    .png()
    .toFile(path.join(outputDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // Generate ICO file (contains both 16x16 and 32x32)
  // ICO format: header + entries + image data
  const png16 = await sharp(Buffer.from(svgSource))
    .resize(16, 16)
    .png()
    .toBuffer();

  const png32 = await sharp(Buffer.from(svgSource))
    .resize(32, 32)
    .png()
    .toBuffer();

  const icoBuffer = createIco([
    { size: 16, data: png16 },
    { size: 32, data: png32 }
  ]);

  fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);
  console.log('Created favicon.ico');

  // Create site.webmanifest
  const webmanifest = {
    "name": "Rita Tomforde",
    "short_name": "RT",
    "icons": [
      {
        "src": "/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      }
    ],
    "theme_color": "#FF1493",
    "background_color": "#FFFBF9",
    "display": "standalone"
  };

  fs.writeFileSync(
    path.join(outputDir, 'site.webmanifest'),
    JSON.stringify(webmanifest, null, 2)
  );
  console.log('Created site.webmanifest');

  console.log('All favicons generated successfully!');
}

// Create ICO file from PNG images
function createIco(images) {
  // ICO file format:
  // - ICONDIR header (6 bytes)
  // - ICONDIRENTRY for each image (16 bytes each)
  // - Image data (PNG format)

  const headerSize = 6;
  const entrySize = 16;
  const numImages = images.length;

  // Calculate total size
  let totalSize = headerSize + (entrySize * numImages);
  for (const img of images) {
    totalSize += img.data.length;
  }

  const buffer = Buffer.alloc(totalSize);
  let offset = 0;

  // ICONDIR header
  buffer.writeUInt16LE(0, offset);      // Reserved (must be 0)
  offset += 2;
  buffer.writeUInt16LE(1, offset);      // Image type: 1 = ICO
  offset += 2;
  buffer.writeUInt16LE(numImages, offset);  // Number of images
  offset += 2;

  // Calculate data offsets
  let dataOffset = headerSize + (entrySize * numImages);

  // ICONDIRENTRY for each image
  for (const img of images) {
    buffer.writeUInt8(img.size === 256 ? 0 : img.size, offset);  // Width (0 = 256)
    offset += 1;
    buffer.writeUInt8(img.size === 256 ? 0 : img.size, offset);  // Height (0 = 256)
    offset += 1;
    buffer.writeUInt8(0, offset);       // Color palette (0 = no palette)
    offset += 1;
    buffer.writeUInt8(0, offset);       // Reserved
    offset += 1;
    buffer.writeUInt16LE(1, offset);    // Color planes
    offset += 2;
    buffer.writeUInt16LE(32, offset);   // Bits per pixel
    offset += 2;
    buffer.writeUInt32LE(img.data.length, offset);  // Image size
    offset += 4;
    buffer.writeUInt32LE(dataOffset, offset);       // Image offset
    offset += 4;

    dataOffset += img.data.length;
  }

  // Write image data
  for (const img of images) {
    img.data.copy(buffer, offset);
    offset += img.data.length;
  }

  return buffer;
}

generateFavicons().catch(console.error);
