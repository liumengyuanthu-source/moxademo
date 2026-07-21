const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const url = 'https://www.moxa.com/en/articles/taking-proven-benefits-of-tsn-to-the-real-world';
const output = path.resolve('handoff/evidence/article-source');

async function capture(browser, name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1200);

  const necessaryCookies = page.getByRole('button', { name: '仅接受必要 cookies' });
  if (await necessaryCookies.count()) {
    await necessaryCookies.click();
    await page.waitForTimeout(300);
  }

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < pageHeight; top += Math.max(520, viewport.height - 160)) {
    await page.evaluate((scrollTop) => window.scrollTo(0, scrollTop), top);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  await page.screenshot({ path: path.join(output, `${name}-top.png`) });
  await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true });

  const evidence = await page.evaluate(() => {
    const heading = [...document.querySelectorAll('h1, h2')]
      .find((node) => node.textContent.includes('Taking the Proven Benefits'));
    const candidates = [...document.querySelectorAll('main, article, [class*="article"], [class*="detail"]')]
      .map((node) => ({
        node,
        textLength: (node.innerText || '').trim().length,
        headingCount: node.querySelectorAll('h1, h2, h3').length,
      }))
      .filter((item) => item.textLength > 1200 && item.headingCount >= 10)
      .sort((a, b) => a.textLength - b.textLength);
    const article = candidates.find((item) => item.node.contains(heading))?.node
      || heading?.closest('main, article, section, div')
      || document.querySelector('main');

    return {
      title: document.title,
      url: location.href,
      viewport: { width: innerWidth, height: innerHeight },
      pageHeight: document.documentElement.scrollHeight,
      headings: [...document.querySelectorAll('h1, h2, h3')]
        .map((node) => ({ level: node.tagName, text: node.textContent.trim() }))
        .filter((node) => node.text),
      images: [...document.images]
        .map((image) => ({ src: image.currentSrc || image.src, alt: image.alt, width: image.naturalWidth, height: image.naturalHeight }))
        .filter((image) => image.src),
      links: [...document.querySelectorAll('a')]
        .map((link) => ({ text: link.textContent.trim(), href: link.href }))
        .filter((link) => link.text || link.href),
      articleText: article ? article.innerText.trim() : '',
      articleHtml: article ? article.innerHTML : '',
      articleSelector: article ? `${article.tagName.toLowerCase()}.${[...article.classList].join('.')}` : '',
      articleCandidates: candidates.slice(0, 12).map((item) => ({
        selector: `${item.node.tagName.toLowerCase()}.${[...item.node.classList].join('.')}`,
        textLength: item.textLength,
        headingCount: item.headingCount,
      })),
    };
  });
  fs.writeFileSync(path.join(output, `${name}.json`), JSON.stringify(evidence, null, 2));
  if (name.startsWith('source-desktop')) {
    fs.writeFileSync(path.join(output, 'source-article-content.html'), evidence.articleHtml);
    fs.writeFileSync(path.join(output, 'source-article-content.txt'), evidence.articleText);
  }
  await page.close();
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  try {
    await capture(browser, 'source-desktop-1440x900', { width: 1440, height: 900 });
    await capture(browser, 'source-mobile-390x844', { width: 390, height: 844 });
  } finally {
    await browser.close();
  }
})();
