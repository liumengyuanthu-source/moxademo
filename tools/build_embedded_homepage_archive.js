const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'homepage.html');
const output = path.join(root, 'standalone', 'homepage-summer-sales-ab-embedded.html');

const mimeByExtension = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function cleanLocalReference(reference) {
  return decodeURIComponent(reference.split('#')[0].split('?')[0]);
}

function isLocalReference(reference) {
  return !/^(?:data:|https?:|mailto:|tel:|#|\/\/)/i.test(reference);
}

function dataUrlFor(reference, baseDirectory) {
  const cleanReference = cleanLocalReference(reference);
  const absolute = path.resolve(baseDirectory, cleanReference);
  if (!absolute.startsWith(root + path.sep) || !fs.existsSync(absolute)) return reference;
  const mime = mimeByExtension[path.extname(absolute).toLowerCase()];
  if (!mime) return reference;
  return `data:${mime};base64,${fs.readFileSync(absolute).toString('base64')}`;
}

function embedCssAssets(css, cssDirectory) {
  return css.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/g, (match, quote, reference) => {
    if (!isLocalReference(reference)) return match;
    return `url("${dataUrlFor(reference, cssDirectory)}")`;
  });
}

let html = fs.readFileSync(source, 'utf8');

html = html.replace(/<link\b([^>]*?)href=["']([^"']+)["']([^>]*?)>/gi, (match, before, reference, after) => {
  if (!/rel=["']stylesheet["']/i.test(`${before}${after}`) || !isLocalReference(reference)) return match;
  const absolute = path.resolve(root, cleanLocalReference(reference));
  const css = embedCssAssets(fs.readFileSync(absolute, 'utf8'), path.dirname(absolute));
  return `<style data-embedded-from="${reference}">\n${css}\n</style>`;
});

html = html.replace(/<script\b([^>]*?)src=["']([^"']+)["']([^>]*)><\/script>/gi, (match, before, reference, after) => {
  if (!isLocalReference(reference)) return match;
  const absolute = path.resolve(root, cleanLocalReference(reference));
  return `<script data-embedded-from="${reference}">\n${fs.readFileSync(absolute, 'utf8')}\n</script>`;
});

html = html.replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'])/gi, (match, before, reference, after) => {
  if (!isLocalReference(reference)) return match;
  return `${before}${dataUrlFor(reference, root)}${after}`;
});

html = html.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (match, open, css, close) => {
  return `${open}${embedCssAssets(css, root)}${close}`;
});

html = html.replace('<head>', '<head>\n<!-- Self-contained snapshot of the approved pre-rollback combined A/B experience. -->');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html);
process.stdout.write(`${output}\n`);
