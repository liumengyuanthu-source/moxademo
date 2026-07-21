const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const base = process.env.MOXA_PREVIEW_URL || 'http://127.0.0.1:8017';
const output = path.resolve(process.argv[2] || 'handoff/evidence/homepage-summer-ab-review');

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  for (const variant of ['A', 'B']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const response = await page.goto(`${base}/homepage.html?experience=${variant}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    if (!response || !response.ok()) throw new Error(`homepage returned ${response && response.status()}`);
    const promoClose = page.locator('#promoClose');
    if (await promoClose.count()) await promoClose.click();

    await page.locator('.hero-carousel').screenshot({
      path: path.join(output, `image-first-${variant.toLowerCase()}-1440x900.png`),
    });

    const explore = page.locator('#explore-now');
    await explore.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    if (variant === 'A') {
      await explore.screenshot({ path: path.join(output, 'restored-explore-1440x900.png') });
    }
    if (await page.locator('#explore-now .explore-card:visible').count() !== 2) {
      throw new Error(`formal homepage Explore content changed under experience ${variant}`);
    }

    const payload = await page.evaluate((activeVariant) => {
      const target = document.querySelector(`[data-experiment="experiment_top_cta"][data-experience-variant="${activeVariant}"] .banner-hotspot`);
      document.addEventListener('click', (event) => event.preventDefault(), { capture: true, once: true });
      target.click();
      return window.dataLayer[window.dataLayer.length - 1];
    }, variant);
    if (payload.experience_variant !== variant || payload.experiment_top_cta !== variant) {
      throw new Error(`top CTA did not emit split tracking for experience ${variant}`);
    }
    await page.close();
  }

  const archiveUrl = pathToFileURL(path.resolve('standalone/homepage-summer-sales-ab-embedded.html'));
  for (const variant of ['A', 'B']) {
    archiveUrl.search = `?experience=${variant}`;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(archiveUrl.href, { waitUntil: 'load', timeout: 30000 });
    const expectedExplore = variant === 'A' ? 'explore-rail-a' : 'explore-power-b';
    if (!(await page.locator(`[data-ab-variant="${expectedExplore}"]`).isVisible())) {
      throw new Error(`embedded archive did not preserve experience ${variant}`);
    }
    await page.close();
  }

  await browser.close();
})();
