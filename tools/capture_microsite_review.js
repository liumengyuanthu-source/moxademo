const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.MOXA_PREVIEW_URL || 'http://127.0.0.1:8017';
const output = path.resolve(process.argv[2] || 'handoff/evidence/microsite-review');

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  for (const viewport of [{ width: 1440, height: 900 }, { width: 934, height: 915 }]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const response = await page.goto(`${base}/microsite.html`, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response || !response.ok()) throw new Error(`microsite returned ${response && response.status()}`);
    await page.evaluate(async () => {
      for (let top = 0; top < document.documentElement.scrollHeight; top += 700) {
        window.scrollTo(0, top);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);
    const cardPositions = await page.locator('.rio-application-grid article').evaluateAll((cards) => cards.map((card) => ({
      rowTop: Math.round(card.getBoundingClientRect().top),
      titleTop: card.querySelector('h3').getBoundingClientRect().top,
      bodyTop: card.querySelector('p').getBoundingClientRect().top,
    })));
    const rows = Object.groupBy(cardPositions, (card) => card.rowTop);
    for (const cards of Object.values(rows)) {
      for (const property of ['titleTop', 'bodyTop']) {
        const values = cards.map((card) => card[property]);
        if (Math.max(...values) - Math.min(...values) > 1) {
          throw new Error(`application-card ${property} values are not aligned at ${viewport.width}px`);
        }
      }
    }
    await page.locator('.rio-application-grid').screenshot({
      path: path.join(output, `microsite-applications-${viewport.width}.png`),
    });
    const brochureTitleLines = await page.locator('#brochureTitle').evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      return range.getClientRects().length;
    });
    if (viewport.width > 620 && brochureTitleLines !== 1) {
      throw new Error(`brochure title rendered on ${brochureTitleLines} lines at ${viewport.width}px`);
    }
    await page.locator('.rio-brochure-layout').screenshot({
      path: path.join(output, `microsite-brochure-${viewport.width}.png`),
    });
    const headingBodyGaps = await page.evaluate(() => [
      ['overview', '.rio-section-copy'],
      ['section header', '.rio-section-head'],
      ['brochure', '.rio-brochure-copy'],
      ['contact', '.rio-contact-aside'],
    ].map(([name, selector]) => {
      const container = document.querySelector(selector);
      const heading = container.querySelector('h2').getBoundingClientRect();
      const body = container.querySelector('h2 + p').getBoundingClientRect();
      return { name, gap: body.top - heading.bottom };
    }));
    for (const { name, gap } of headingBodyGaps) {
      if (gap < 23 || gap > 25) {
        throw new Error(`${name} heading/body gap is ${gap}px at ${viewport.width}px`);
      }
    }
    await page.locator('.rio-overview-grid').screenshot({
      path: path.join(output, `microsite-overview-${viewport.width}.png`),
    });
    await page.locator('.rio-contact-grid').screenshot({
      path: path.join(output, `microsite-contact-${viewport.width}.png`),
    });
    await page.screenshot({
      path: path.join(output, `microsite-${viewport.width}x${viewport.height}.png`),
      fullPage: true,
    });
    await page.close();
  }
  await browser.close();
})();
