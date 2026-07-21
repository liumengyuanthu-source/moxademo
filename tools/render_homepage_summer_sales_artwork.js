const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.MOXA_PREVIEW_URL || 'http://127.0.0.1:8017';
const output = path.resolve(__dirname, '..', 'banner');

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  for (const variant of ['A', 'B']) {
    const page = await browser.newPage({ viewport: { width: 1916, height: 821 }, deviceScaleFactor: 1 });
    const response = await page.goto(`${base}/tools/homepage-summer-sales-banner-artwork.html?variant=${variant}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    if (!response || !response.ok()) throw new Error(`artwork returned ${response && response.status()}`);
    const dimensions = await page.locator('.artboard').evaluate((node) => ({ width: node.offsetWidth, height: node.offsetHeight }));
    if (dimensions.width !== 1916 || dimensions.height !== 821) throw new Error(`unexpected artwork size ${JSON.stringify(dimensions)}`);
    await page.locator('.artboard').screenshot({
      path: path.join(output, `homepage-summer-sales-${variant.toLowerCase()}.png`),
    });
    await page.close();
  }
  await browser.close();
})();
