import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, '..', 'public');

const logoSvg = readFileSync(path.join(publicDir, 'logo', 'optisain-logo-gainsboro.svg'), 'utf-8');

const width = 1200;
const height = 630;

const logoBuffer = await sharp(Buffer.from(logoSvg)).resize({ width: 640 }).png().toBuffer();
const logoMeta = await sharp(logoBuffer).metadata();

const background = sharp({
  create: {
    width,
    height,
    channels: 4,
    background: '#161516',
  },
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stop-color="#2c4057" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#161516" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#g)" />
          <circle cx="${width - 120}" cy="120" r="2" fill="#ffb547" />
          <circle cx="140" cy="500" r="2" fill="#d3d8e2" />
          <circle cx="220" cy="90" r="1.5" fill="#939baa" />
          <circle cx="${width - 200}" cy="520" r="1.5" fill="#d3d8e2" />
        </svg>`
      ),
    },
    {
      input: logoBuffer,
      left: Math.round((width - (logoMeta.width ?? 640)) / 2),
      top: Math.round((height - (logoMeta.height ?? 160)) / 2),
    },
  ])
  .jpeg({ quality: 90 });

await background.toFile(path.join(publicDir, 'og.jpg'));

console.log('OG image generated at public/og.jpg');
