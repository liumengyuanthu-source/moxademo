const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.MOXA_PREVIEW_URL || 'http://127.0.0.1:8017';
const output = path.resolve(process.argv[2] || 'handoff/evidence/screenshots');
const routes = [
  ['01-homepage', 'homepage.html'],
  ['02-search', 'search.html?q=EDS-4008%20datasheet'],
  ['03-eds-4008-series', 'product-series-eds-4008.html'],
  ['04-campaign', 'campaign.html'],
  ['05-microsite', 'microsite.html'],
  ['06-video', 'video.html'],
  ['07-ethernet-switches', 'product-category-ethernet-switches.html'],
  ['08-eds-4008-lv', 'eds-4008-lv.html'],
  ['09-eds-4008-hv', 'eds-4008-hv.html'],
  ['10-nport-5100', 'nport-5100-series.html'],
  ['11-manual', 'manual.html'],
  ['12-compare-lv-hv', 'compare-lv-hv.html'],
  ['13-product-360', 'product-360.html'],
];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  for (const [name, route] of routes) {
    const url = `${base}/${route}`;
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response || !response.ok()) throw new Error(`${url} returned ${response && response.status()}`);
    await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: false });
    process.stdout.write(`${name}: ${response.status()}\n`);
  }
  await browser.close();
})();
