const puppeteer = require('puppeteer');
const path = require('path');

const OUTPUT_DIR = path.join(require('os').homedir(), 'Desktop', 'Logos');

function buildHTML({ bg, soColor, miamColor }) {
  return `<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; }
  body {
    width: 1024px;
    height: 1024px;
    background: ${bg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 120px;
    letter-spacing: 2px;
  }
  .so { color: ${soColor}; }
  .miam { color: ${miamColor}; }
</style>
</head>
<body>
  <div><span class="so">SO </span><span class="miam">MIAM</span></div>
</body>
</html>`;
}

async function generateLogo(browser, filename, options) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 2 });
  await page.setContent(buildHTML(options), { waitUntil: 'networkidle0' });
  // Wait for Syne font to load
  await page.evaluateHandle('document.fonts.ready');
  const outputPath = path.join(OUTPUT_DIR, filename);
  await page.screenshot({ path: outputPath, type: 'png' });
  await page.close();
  console.log(`Created: ${outputPath}`);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  await generateLogo(browser, 'so-miam-vitrine-noir.png', {
    bg: '#111111',
    soColor: '#FFFFFF',
    miamColor: '#F5C400',
  });

  await generateLogo(browser, 'so-miam-vitrine-blanc.png', {
    bg: '#FFFFFF',
    soColor: '#111111',
    miamColor: '#F5C400',
  });

  await browser.close();
  console.log('Done.');
})();
