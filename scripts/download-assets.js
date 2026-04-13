#!/usr/bin/env node
/**
 * Télécharge les assets Figma dans src/assets/images/
 * Ces URLs sont valables 7 jours depuis la génération du projet.
 * Lancer avec : node scripts/download-assets.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets/images');
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

const ASSETS = {
  'logo.png':       'https://www.figma.com/api/mcp/asset/fb703a11-8945-49e5-be70-9814970bf88f',
  'logo-white.png': 'https://www.figma.com/api/mcp/asset/3e30f348-fb29-4c40-8988-6b3b722579fe',
  'zoro.png':       'https://www.figma.com/api/mcp/asset/c7c096e9-7f73-47b0-9a55-39a614fcceb9',
  'sneaker.png':    'https://www.figma.com/api/mcp/asset/065959bc-5bff-4da1-ae57-ba24139469d7',
  'mug.png':        'https://www.figma.com/api/mcp/asset/d21582a2-c950-4b60-a5a5-5db4c3cc359e',
  'tshirt1.png':    'https://www.figma.com/api/mcp/asset/e9863045-3aaf-4e18-82f2-1c937c51825c',
  'tshirt2.png':    'https://www.figma.com/api/mcp/asset/d2eeed57-6822-4bf7-b966-11bd0f35d65c',
  'sweater.png':    'https://www.figma.com/api/mcp/asset/8dc5c13f-802e-41b4-9a32-ee51e554046d',
  'hoodie.png':     'https://www.figma.com/api/mcp/asset/4402dcc5-0a2f-4167-bed8-14e3060d5558',
  'product1.png':   'https://www.figma.com/api/mcp/asset/9000d1e2-1826-4fc2-83a7-9aade1ec67bf',
  'product2.png':   'https://www.figma.com/api/mcp/asset/3c68f0e0-f2d9-4fce-b9be-1a1ecbdced3b',
  'product3.png':   'https://www.figma.com/api/mcp/asset/605b8b83-e030-44ce-b4d6-ad4c02e506e9',
  'product4.png':   'https://www.figma.com/api/mcp/asset/5b587098-e938-4cba-8cf8-7121fe5bd8bc',
  'tiktok.png':     'https://www.figma.com/api/mcp/asset/621d250d-050b-474f-bc84-18345bee3637',
  'instagram.png':  'https://www.figma.com/api/mcp/asset/3f4cc9d3-3365-43f1-862a-2d4ad303d5bf',
  'facebook.png':   'https://www.figma.com/api/mcp/asset/605e2303-8759-4a60-8707-78bf84836f15',
};

function download(filename, url) {
  return new Promise((resolve) => {
    const dest = path.join(ASSETS_DIR, filename);
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        https.get(res.headers.location, (res2) => {
          const file2 = fs.createWriteStream(dest);
          res2.pipe(file2);
          file2.on('finish', () => { file2.close(); console.log(`✅  ${filename}`); resolve(); });
        }).on('error', (err) => { console.log(`❌  ${filename}: ${err.message}`); resolve(); });
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log(`✅  ${filename}`); resolve(); });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      console.log(`❌  ${filename}: ${err.message}`);
      resolve();
    });
  });
}

console.log('📥 Téléchargement des assets Figma...\n');
Promise.all(Object.entries(ASSETS).map(([name, url]) => download(name, url)))
  .then(() => {
    const count = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.png')).length;
    console.log(`\n✨ Terminé ! ${count} assets dans src/assets/images/`);
  });
