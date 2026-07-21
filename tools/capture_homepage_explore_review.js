const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.MOXA_PREVIEW_URL || 'http://127.0.0.1:8017';
const output = path.resolve(process.argv[2] || 'handoff/evidence/homepage-explore-review');

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  for (const viewport of [{ width: 1052, height: 856 }, { width: 1440, height: 900 }]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const response = await page.goto(`${base}/homepage.html`, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response || !response.ok()) throw new Error(`homepage returned ${response && response.status()}`);
    const section = page.locator('#explore-now');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await section.screenshot({ path: path.join(output, `explore-${viewport.width}x${viewport.height}.png`) });
    await page.close();
  }
  await browser.close();
})();
