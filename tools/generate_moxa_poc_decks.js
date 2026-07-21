const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'handoff', 'presentation');
const SHOTS = path.join(ROOT, 'handoff', 'evidence', 'screenshots');
const components = JSON.parse(fs.readFileSync(path.join(ROOT, 'handoff', 'sitecoreai', 'component-manifest.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(ROOT, 'handoff', 'sitecoreai', 'page-compositions.json'), 'utf8'));
const journeys = JSON.parse(fs.readFileSync(path.join(ROOT, 'handoff', 'sitecoreai', 'demo-journeys.json'), 'utf8'));
fs.mkdirSync(OUT, { recursive: true });

const C = {
  green: '008B87', deep: '003F43', teal: '006D70', pale: 'EAF6F5', pale2: 'F4FAF9',
  ink: '14272B', gray: '5D7075', line: 'D9E6E5', white: 'FFFFFF', orange: 'F4902D',
  cyan: '50C8CF', soft: 'F7F9F9', muted: '8A9A9E',
};
const FONT = 'Arial';
const SOURCE = 'Source: Moxa PoC manifests, route evidence, and design-system audit, 20 Jul 2026.';
const SITECORE_SOURCE = 'Source: Moxa PoC SitecoreAI automation blueprint; Sitecore official developer documentation, accessed 20 Jul 2026.';

function newDeck(title) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Moxa PoC team';
  pptx.company = 'Moxa';
  pptx.subject = 'Moxa SitecoreAI PoC readiness';
  pptx.title = title;
  pptx.lang = 'en-US';
  pptx.theme = {
    headFontFace: FONT,
    bodyFontFace: FONT,
    lang: 'en-US',
  };
  pptx.defineSlideMaster({
    title: 'CONTENT',
    background: { color: C.white },
    objects: [
      { line: { x: 0.52, y: 7.07, w: 12.25, h: 0, line: { color: C.line, pt: 0.6 } } },
      { text: { text: 'MOXA  |  SITECOREAI POC', options: { x: 0.55, y: 7.14, w: 2.8, h: 0.18, fontFace: FONT, fontSize: 8.5, bold: true, color: C.teal, margin: 0, charSpacing: 0.7 } } },
    ],
    slideNumber: { x: 12.24, y: 7.12, w: 0.45, h: 0.2, fontFace: FONT, fontSize: 8.5, color: C.muted, align: 'right' },
  });
  return pptx;
}

function addActionTitle(slide, title, kicker) {
  if (kicker) slide.addText(kicker.toUpperCase(), { x: 0.56, y: 0.34, w: 5.2, h: 0.22, fontFace: FONT, fontSize: 9.5, bold: true, color: C.teal, charSpacing: 1.2, margin: 0 });
  slide.addText(title, { x: 0.55, y: kicker ? 0.66 : 0.42, w: 12.15, h: 0.68, fontFace: FONT, fontSize: 27, bold: true, color: C.ink, margin: 0, breakLine: false, fit: 'shrink' });
}

function addSource(slide, text = SOURCE) {
  slide.addText(text, { x: 0.56, y: 6.83, w: 11.8, h: 0.16, fontFace: FONT, fontSize: 8.2, color: C.muted, margin: 0 });
}

function rect(slide, x, y, w, h, fill = C.white, line = C.line, radius = 0.08) {
  slide.addShape(radius ? 'roundRect' : 'rect', { x, y, w, h, rectRadius: radius, fill: { color: fill }, line: { color: line, pt: 0.8 } });
}

function addPill(slide, text, x, y, w, fill = C.pale, color = C.teal) {
  slide.addShape('roundRect', { x, y, w, h: 0.3, rectRadius: 0.08, fill: { color: fill }, line: { color: fill } });
  slide.addText(text, { x: x + 0.08, y: y + 0.07, w: w - 0.16, h: 0.14, fontFace: FONT, fontSize: 8.5, bold: true, color, margin: 0, align: 'center' });
}

function addStat(slide, value, label, x, y, w = 2.2, accent = C.green) {
  rect(slide, x, y, w, 1.28, C.pale2, C.line);
  slide.addText(String(value), { x: x + 0.18, y: y + 0.15, w: w - 0.36, h: 0.5, fontFace: FONT, fontSize: 28, bold: true, color: accent, margin: 0 });
  slide.addText(label, { x: x + 0.18, y: y + 0.78, w: w - 0.36, h: 0.25, fontFace: FONT, fontSize: 10.5, bold: true, color: C.gray, margin: 0, fit: 'shrink' });
}

function addCard(slide, title, body, x, y, w, h, options = {}) {
  rect(slide, x, y, w, h, options.fill || C.white, options.line || C.line);
  if (options.index) addPill(slide, options.index, x + 0.2, y + 0.18, 0.48, C.green, C.white);
  slide.addText(title, { x: x + 0.22, y: y + (options.index ? 0.62 : 0.22), w: w - 0.44, h: 0.38, fontFace: FONT, fontSize: options.titleSize || 15, bold: true, color: options.titleColor || C.ink, margin: 0, fit: 'shrink' });
  slide.addText(body, { x: x + 0.22, y: y + (options.index ? 1.05 : 0.72), w: w - 0.44, h: h - (options.index ? 1.23 : 0.9), fontFace: FONT, fontSize: options.bodySize || 11.5, color: options.bodyColor || C.gray, margin: 0, breakLine: false, fit: 'shrink', valign: 'top' });
}

function addBars(slide, rows, x, y, w, maxValue) {
  const gap = 0.58;
  rows.forEach((row, i) => {
    const yy = y + i * gap;
    slide.addText(row.label, { x, y: yy, w: 2.35, h: 0.2, fontFace: FONT, fontSize: 11, bold: true, color: C.ink, margin: 0 });
    slide.addShape('roundRect', { x: x + 2.5, y: yy + 0.01, w: w - 3.15, h: 0.18, rectRadius: 0.06, fill: { color: C.pale }, line: { color: C.pale } });
    slide.addShape('roundRect', { x: x + 2.5, y: yy + 0.01, w: (w - 3.15) * row.value / maxValue, h: 0.18, rectRadius: 0.06, fill: { color: row.color || C.green }, line: { color: row.color || C.green } });
    slide.addText(String(row.value), { x: x + w - 0.5, y: yy - 0.01, w: 0.48, h: 0.22, fontFace: FONT, fontSize: 11, bold: true, color: row.color || C.green, align: 'right', margin: 0 });
  });
}

function addImageFrame(slide, imagePath, x, y, w, h, label) {
  rect(slide, x, y, w, h, C.soft, C.line);
  slide.addImage({ path: imagePath, x: x + 0.05, y: y + 0.05, w: w - 0.1, h: h - 0.1, sizing: { type: 'contain', w: w - 0.1, h: h - 0.1 } });
  if (label) addPill(slide, label, x + 0.18, y + h - 0.44, Math.min(2.4, 0.11 * label.length + 0.45), C.deep, C.white);
}

function addTitleSlide(pptx, title, subtitle, rightLabel) {
  const slide = pptx.addSlide();
  slide.background = { color: C.deep };
  slide.addShape('rect', { x: 0, y: 0, w: 4.8, h: 7.5, fill: { color: C.teal }, line: { color: C.teal } });
  slide.addText('MOXA', { x: 0.62, y: 0.48, w: 2.2, h: 0.5, fontFace: FONT, fontSize: 28, bold: true, color: C.white, margin: 0, charSpacing: 1.2 });
  slide.addText(title, { x: 0.62, y: 2.08, w: 9.4, h: 1.55, fontFace: FONT, fontSize: 38, bold: true, color: C.white, margin: 0, fit: 'shrink' });
  slide.addText(subtitle, { x: 0.64, y: 3.92, w: 7.2, h: 0.64, fontFace: FONT, fontSize: 17, color: 'C7E6E4', margin: 0, fit: 'shrink' });
  slide.addText(rightLabel, { x: 9.2, y: 6.42, w: 3.45, h: 0.38, fontFace: FONT, fontSize: 12, bold: true, color: C.cyan, margin: 0, align: 'right' });
  slide.addText('20 JUL 2026', { x: 9.2, y: 6.88, w: 3.45, h: 0.22, fontFace: FONT, fontSize: 9.5, color: C.white, margin: 0, align: 'right', charSpacing: 1.2 });
  return slide;
}

function addDivider(pptx, number, title, statement) {
  const slide = pptx.addSlide();
  slide.background = { color: C.deep };
  slide.addText(number, { x: 0.62, y: 0.62, w: 1.2, h: 0.5, fontFace: FONT, fontSize: 34, bold: true, color: C.cyan, margin: 0 });
  slide.addText(title, { x: 0.62, y: 2.12, w: 10.7, h: 0.85, fontFace: FONT, fontSize: 34, bold: true, color: C.white, margin: 0 });
  slide.addText(statement, { x: 0.64, y: 3.28, w: 8.8, h: 0.72, fontFace: FONT, fontSize: 17, color: 'C7E6E4', margin: 0, fit: 'shrink' });
  return slide;
}

function addRouteSlide(pptx, route, imageName, takeaway, bullets, index) {
  const slide = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(slide, takeaway, `${String(index).padStart(2, '0')} · ${route}`);
  const imageLeft = index % 2 === 0;
  const ix = imageLeft ? 0.58 : 6.65;
  const tx = imageLeft ? 7.05 : 0.62;
  addImageFrame(slide, path.join(SHOTS, imageName), ix, 1.55, 6.1, 4.7, route);
  addCard(slide, 'What this page proves', bullets.join('\n\n'), tx, 1.55, 5.62, 2.45, { fill: C.pale2, bodySize: 12.2 });
  addCard(slide, 'SitecoreAI handoff', `Template: ${route === 'compare-lv-hv.html' ? 'External HTML demo' : 'Generated from page-compositions.json'}\n\nShared shell: Header · Breadcrumb · Footer · Advisor`, tx, 4.22, 5.62, 2.03, { bodySize: 11.4 });
  addSource(slide);
}

function addRouteInventory(slide) {
  const routeRows = pages.routes;
  const left = routeRows.slice(0, 7);
  const right = routeRows.slice(7);
  function column(rows, x) {
    rows.forEach((r, i) => {
      const y = 1.58 + i * 0.67;
      addPill(slide, String(r.order).padStart(2, '0'), x, y, 0.52, r.deploymentTarget === 'SitecoreAI' ? C.green : C.orange, C.white);
      slide.addText(r.route, { x: x + 0.68, y: y + 0.02, w: 3.2, h: 0.2, fontFace: FONT, fontSize: 11.2, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
      slide.addText(r.pageClass, { x: x + 0.68, y: y + 0.31, w: 3.2, h: 0.16, fontFace: FONT, fontSize: 9.2, color: C.gray, margin: 0 });
      slide.addText(r.deploymentTarget === 'SitecoreAI' ? r.template : 'External HTML', { x: x + 4.02, y: y + 0.12, w: 1.55, h: 0.18, fontFace: FONT, fontSize: 9.2, color: r.deploymentTarget === 'SitecoreAI' ? C.teal : C.orange, bold: true, margin: 0, align: 'right', fit: 'shrink' });
    });
  }
  column(left, 0.62);
  column(right, 6.78);
}

function addJourneyFlow(slide, y = 2.1) {
  const labels = journeys.stages.map(stage => stage.name.replace(' and ', ' & '));
  labels.forEach((label, i) => {
    const x = 0.56 + i * 2.08;
    rect(slide, x, y, 1.82, 1.08, i === 5 ? C.deep : C.pale2, i === 5 ? C.deep : C.line);
    slide.addText(`S${i + 1}`, { x: x + 0.16, y: y + 0.14, w: 0.34, h: 0.18, fontFace: FONT, fontSize: 10, bold: true, color: i === 5 ? C.cyan : C.green, margin: 0 });
    slide.addText(label, { x: x + 0.16, y: y + 0.45, w: 1.48, h: 0.4, fontFace: FONT, fontSize: 10.5, bold: true, color: i === 5 ? C.white : C.ink, margin: 0, fit: 'shrink' });
    if (i < labels.length - 1) slide.addShape('chevron', { x: x + 1.84, y: y + 0.38, w: 0.18, h: 0.32, fill: { color: C.green }, line: { color: C.green } });
  });
}

function addPipeline(slide, y = 2.0) {
  const steps = [
    ['01', 'Validated HTML'], ['02', 'Manifest generator'], ['03', 'JSS / BYOC code'],
    ['04', 'SCS package'], ['05', 'Auto deploy'], ['06', '38-demo proof'],
  ];
  steps.forEach((step, i) => {
    const x = 0.62 + i * 2.07;
    addPill(slide, step[0], x + 0.1, y, 0.5, i === 5 ? C.orange : C.green, C.white);
    rect(slide, x, y + 0.48, 1.75, 1.12, i === 5 ? 'FFF6EB' : C.pale2, i === 5 ? 'F7C68D' : C.line);
    slide.addText(step[1], { x: x + 0.16, y: y + 0.82, w: 1.42, h: 0.38, fontFace: FONT, fontSize: 11, bold: true, color: C.ink, margin: 0, align: 'center', fit: 'shrink' });
    if (i < steps.length - 1) slide.addShape('chevron', { x: x + 1.82, y: y + 0.88, w: 0.2, h: 0.34, fill: { color: C.green }, line: { color: C.green } });
  });
}

function addMatrix(slide, headers, rows, x, y, widths, rowH = 0.46, fontSize = 10) {
  let xx = x;
  headers.forEach((header, i) => {
    slide.addShape('rect', { x: xx, y, w: widths[i], h: rowH, fill: { color: C.deep }, line: { color: C.white, pt: 0.5 } });
    slide.addText(header, { x: xx + 0.08, y: y + 0.12, w: widths[i] - 0.16, h: 0.16, fontFace: FONT, fontSize, bold: true, color: C.white, margin: 0, fit: 'shrink' });
    xx += widths[i];
  });
  rows.forEach((row, r) => {
    let xxx = x;
    row.forEach((cell, i) => {
      const fill = r % 2 === 0 ? C.pale2 : C.white;
      slide.addShape('rect', { x: xxx, y: y + rowH * (r + 1), w: widths[i], h: rowH, fill: { color: fill }, line: { color: C.line, pt: 0.5 } });
      slide.addText(String(cell), { x: xxx + 0.08, y: y + rowH * (r + 1) + 0.11, w: widths[i] - 0.16, h: rowH - 0.17, fontFace: FONT, fontSize, color: i === 0 ? C.ink : C.gray, bold: i === 0, margin: 0, fit: 'shrink', valign: 'mid' });
      xxx += widths[i];
    });
  });
}

function buildExecutive() {
  const pptx = newDeck('Moxa SitecoreAI PoC — Executive Review');
  addTitleSlide(pptx, 'The Moxa PoC is ready for SitecoreAI engineering review.', '12 page classes · 13 routes · 22 components · 38 demonstrations', 'EXECUTIVE REVIEW');

  let s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The PoC now has a complete, governed scope instead of a collection of disconnected mockups.', 'Executive answer');
  addStat(s, '12', 'Business page classes', 0.62, 1.62, 2.2);
  addStat(s, '13', 'Customer-facing routes', 3.02, 1.62, 2.2);
  addStat(s, '22', 'Reusable components', 5.42, 1.62, 2.2);
  addStat(s, '38', 'Mapped demonstrations', 7.82, 1.62, 2.2);
  addStat(s, '17/17', 'Automated contract tests', 10.22, 1.62, 2.4, C.orange);
  addCard(s, 'Recommendation', 'Proceed with Stephen’s component-boundary and target-repository review while the SitecoreAI generator is wired in parallel. Do not rebuild pages manually in Page Builder.', 0.62, 3.35, 12.02, 2.1, { fill: C.pale, titleSize: 18, bodySize: 15 });
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'Six connected journey stages now preserve intent from brand entry through technical validation and optimization.', 'Customer journey');
  addJourneyFlow(s, 2.03);
  addCard(s, 'The design principle', 'Each handoff carries intent forward: search terms, product context, model comparison, evidence sources, and conversion actions stay visible instead of restarting the visitor’s task.', 0.62, 4.14, 12.02, 1.52, { fill: C.pale2, bodySize: 14.5 });
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'One Moxa interface system now governs shared shell, page rhythm, controls, and responsive behavior.', 'Design system');
  addCard(s, 'Global shell', 'Header · Ask AI search · bilingual-ready mega navigation · Breadcrumb · Footer · locale · Advisor', 0.62, 1.55, 3.78, 2.02, { index: '01' });
  addCard(s, 'System tokens', 'Moxa green · deep teal · neutral scale · Arial · 8pt spacing · restrained radii · accessible focus', 4.78, 1.55, 3.78, 2.02, { index: '02' });
  addCard(s, 'Reusable patterns', 'Hero · card grid · metrics · filters · comparisons · resources · video · manual · forms', 8.94, 1.55, 3.7, 2.02, { index: '03' });
  addImageFrame(s, path.join(SHOTS, '01-homepage.png'), 0.62, 3.88, 5.72, 2.5, 'Homepage shell');
  addImageFrame(s, path.join(SHOTS, '05-microsite.png'), 6.56, 3.88, 6.08, 2.5, 'Microsite reuse');
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'Twelve business page classes are delivered across thirteen routes with one explicit HTML-only boundary.', 'Scope control');
  addRouteInventory(s);
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'Current page evidence covers every required route with the latest July 20 design refinements.', 'Visual proof');
  [['01-homepage.png',0.62,1.55],['02-search.png',6.78,1.55],['03-eds-4008-series.png',0.62,4.1],['05-microsite.png',6.78,4.1]].forEach(([img,x,y]) => addImageFrame(s,path.join(SHOTS,img),x,y,5.56,2.22,img.replace(/\d+-|\.png/g,'')));
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'Twenty-two reusable components replace page-specific implementations and keep authoring behavior consistent.', 'Component model');
  const groups = {};
  components.components.forEach(c => { groups[c.group] = (groups[c.group] || 0) + 1; });
  addBars(s, Object.entries(groups).map(([label,value])=>({label,value})).slice(0,8), 0.7, 1.7, 6.1, Math.max(...Object.values(groups)));
  addCard(s, 'High-value reusable components', 'Global Header / Footer\nHero Banner + Campaign Overlay\nSearch Filters + Grouped Results\nProduct Series / Model Overview\nComparison + Resource Lists\nLead Capture + Advisor', 7.25, 1.6, 5.25, 4.5, { fill: C.pale2, bodySize: 14 });
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'Ten templates generate the Sitecore estate while EDS/NPort and LV/HV reuse shared structures.', 'Template reuse');
  addMatrix(s, ['Business content','Shared template','Routes','Reuse decision'], [
    ['EDS-4008 + NPort','ProductSeriesPage','2','Shared layout, distinct datasource'],
    ['EDS-4008 LV + HV','ProductModelPage','2','One template, two model datasources'],
    ['Homepage','HomePage','1','Composable campaign + search + cards'],
    ['Campaign + Microsite','Landing templates','2','Shared primitives, distinct narratives'],
    ['Search + Category','Discovery templates','2','Shared filters and product routing'],
    ['Video + Manual + 360','Specialized templates','3','Reusable interaction components'],
  ], 0.68, 1.62, [2.4,2.65,1.0,5.55], 0.68, 11.5);
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'GenScript assets are reused selectively: most components are adapted, while only two require net-new interaction patterns.', 'GenScript decision');
  const decisions = {};
  components.components.forEach(c => { decisions[c.genScript.decision] = (decisions[c.genScript.decision] || 0) + 1; });
  addBars(s, Object.entries(decisions).map(([label,value])=>({label:label.replace('-', ' '),value,color:label==='new'?C.orange:C.green})), 0.78, 1.72, 6.1, 12);
  addCard(s, 'Decision logic', 'ADOPT / RE-SKIN: stable generic structure.\n\nADAPT / REFACTOR: retain behavior, replace content model, tokens, accessibility, and author schema.\n\nNEW: floating journey navigator and 360 viewer where no suitable GenScript pattern exists.', 7.18, 1.58, 5.38, 4.62, { fill: C.pale2, bodySize: 13.2 });
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'Manifest-driven generation removes manual page assembly and keeps code, templates, and page items versioned together.', 'Deployment automation');
  addPipeline(s, 1.82);
  addCard(s, 'What Stephen reviews', 'Repository convention · SDK / JSS version · BYOC index · serialization root · placeholders · media strategy · deployment environment', 0.62, 4.55, 12.02, 1.38, { fill: C.pale, bodySize: 14.2 });
  addSource(s, SITECORE_SOURCE);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The 38 demonstrations are traceable, while platform and live-integration claims remain explicitly separated.', 'Evidence model');
  addBars(s, [
    {label:'Implemented HTML evidence',value:11,color:C.green},
    {label:'Front-end simulation',value:23,color:C.teal},
    {label:'Platform-only proof',value:2,color:C.orange},
    {label:'External HTML AI demo',value:2,color:'A4652A'},
  ], 0.74, 1.75, 6.25, 23);
  addCard(s, 'No false claims', 'The comparison chatbot is intentionally external HTML. CRM, Search service, personalization, analytics, and publishing are not marked “complete” until target-environment evidence is captured.', 7.18, 1.62, 5.4, 3.95, { fill: C.pale2, bodySize: 14 });
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The HTML package is healthy; deployment readiness now depends on target-repository and environment inputs.', 'Readiness');
  addStat(s, '13/13', 'Routes return HTTP 200', 0.62, 1.58, 2.55);
  addStat(s, '17/17', 'Contract tests pass', 3.42, 1.58, 2.55);
  addStat(s, '2', 'Machine-readable manifests', 6.22, 1.58, 2.55);
  addStat(s, '1', 'Journey demo manifest', 9.02, 1.58, 2.55);
  addCard(s, 'Remaining external inputs', 'Target repo/branch · Sitecore identifiers · SDK versions · serialization convention · media ingestion · CI credentials · CRM/Search contracts', 0.62, 3.48, 12.02, 1.76, { fill: 'FFF6EB', line: 'F7C68D', bodySize: 14.3 });
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'All product and design decisions are locked; only implementation coordinates still require confirmation.', 'Decision status');
  addMatrix(s, ['Decision','Approved outcome','Status'], [
    ['Page scope','12 classes / 13 routes; popup is a component','Locked'],
    ['Search facets','One inferred primary facet; other counts visible','Locked'],
    ['Component mode','Hybrid BYOC + structured renderings','Locked'],
    ['Page creation','Generated composition; no manual assembly','Locked'],
    ['AI comparison','External HTML conversation demonstration','Locked'],
    ['Review sequence','Engineering review and preparation in parallel','Locked'],
  ], 0.74, 1.58, [2.55,7.75,1.55], 0.69, 11.8);
  addSource(s);

  s = pptx.addSlide();
  s.background = { color: C.deep };
  s.addText('Stephen’s review can now focus on implementation fit—not design rework.', { x: 0.68, y: 1.24, w: 11.7, h: 1.05, fontFace: FONT, fontSize: 33, bold: true, color: C.white, margin: 0, fit: 'shrink' });
  s.addText('Next: map the manifests into the target repository, generate Sitecore items, deploy to the test environment, and record the 38-demo acceptance evidence.', { x: 0.7, y: 2.72, w: 9.8, h: 0.8, fontFace: FONT, fontSize: 18, color: 'C7E6E4', margin: 0, fit: 'shrink' });
  addPill(s, 'NO MANUAL PAGE ASSEMBLY', 0.7, 4.18, 2.65, C.orange, C.white);
  s.addText('Review package: HTML routes · component manifest · page compositions · journey evidence · automation blueprint · trackers · decks', { x: 0.7, y: 5.05, w: 11.3, h: 0.38, fontFace: FONT, fontSize: 13, bold: true, color: C.white, margin: 0 });
  s.addText('MOXA  |  SITECOREAI POC  |  20 JUL 2026', { x: 0.7, y: 6.84, w: 5.2, h: 0.2, fontFace: FONT, fontSize: 9, color: C.cyan, margin: 0, charSpacing: 0.8 });

  return pptx;
}

function buildFull() {
  const pptx = newDeck('Moxa SitecoreAI PoC — Full Review and Handoff');
  addTitleSlide(pptx, 'The Moxa PoC is ready for engineering review and automated SitecoreAI delivery.', 'Complete evidence deck · design system · pages · components · demos · deployment', 'FULL REVIEW · 58 SLIDES');

  const simpleSlide = (title, kicker, cards, source = SOURCE) => {
    const s = pptx.addSlide({ masterName: 'CONTENT' });
    addActionTitle(s, title, kicker);
    const cols = cards.length <= 2 ? cards.length : Math.min(3, cards.length);
    const w = cards.length === 1 ? 12.0 : cards.length === 2 ? 5.8 : 3.78;
    const gap = cards.length === 1 ? 0 : cards.length === 2 ? 0.4 : 0.3;
    cards.forEach((card, i) => {
      const row = Math.floor(i / cols), col = i % cols;
      addCard(s, card[0], card[1], 0.62 + col * (w + gap), 1.58 + row * 2.35, w, 2.02, { index: card[2], fill: card[3] || C.white, bodySize: card[4] || 11.8 });
    });
    addSource(s, source);
    return s;
  };

  simpleSlide('The PoC is governed by one authoritative scope and one evidence model.', 'Executive summary', [
    ['Scope','12 business page classes across 13 routes; 12 are Sitecore targets and one is an explicit external HTML AI demo.','01'],
    ['System','22 reusable components, 10 Sitecore templates, one shared Moxa shell, and one lead-form schema.','02'],
    ['Evidence','38 demonstrations across six journey stages, with implemented, simulated, platform, and external statuses separated.','03'],
  ]);

  let s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The approved Option A directs every page, component, and delivery decision.', 'Decision record');
  addMatrix(s, ['Decision','Approved outcome','Why it matters'], [
    ['Homepage','Retain Moxa modules; new hero/banner/search/navigation','Preserves content while modernizing entry'],
    ['Shared shell','One Header, Breadcrumb, Footer, locale, Advisor','Stops route-level drift'],
    ['Products','EDS/NPort share a series template; LV/HV share model','Maximizes reuse'],
    ['Search','One inferred primary facet; grouped results and imagery','Supports answer-first discovery'],
    ['AI compare','External HTML conversation demo','Honest platform boundary'],
    ['Deployment','Manifest generation + SCS; no manual assembly','Repeatable and reviewable'],
  ], 0.68, 1.55, [2.0,5.05,4.7], 0.68, 11.3);
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The current delivery footprint is complete enough for engineering review, but not yet a live SitecoreAI deployment.', 'Readiness');
  addStat(s,'13/13','Latest routes captured',0.62,1.58,2.3);
  addStat(s,'17/17','Contract tests passing',3.1,1.58,2.3);
  addStat(s,'22','Reusable components',5.58,1.58,2.3);
  addStat(s,'38','Mapped demonstrations',8.06,1.58,2.3);
  addStat(s,'0','Manual pages required',10.54,1.58,2.3,C.orange);
  addCard(s,'What “ready” means','Design, HTML, content, mappings, manifests, screenshots, and deployment automation are packaged. Live Sitecore claims remain pending until the target repo/environment is connected.',0.62,3.48,12.02,1.72,{fill:C.pale,bodySize:14.2});
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The six-stage journey eliminates dead ends and keeps product intent visible across page types.', 'Customer journey');
  addJourneyFlow(s,1.85);
  addCard(s,'Journey contract','Every stage has an entry route, handoff routes, operation IDs, evidence locations, status boundaries, and expected continuation behavior.',0.62,4.12,12.02,1.38,{fill:C.pale2,bodySize:14});
  addSource(s);

  simpleSlide('Four status types prevent simulated interactions from being mistaken for live platform capability.', 'Evidence governance', [
    ['Implemented','Visible and interactive HTML evidence exists.','11',C.pale],
    ['Simulated','Front-end state exists; live integration remains required.','23',C.pale2],
    ['Platform','Must be proven in the target SitecoreAI or enterprise service.','02','FFF6EB'],
    ['External HTML','Approved demonstration outside the native SitecoreAI commitment.','02','FFF6EB'],
  ]);

  addDivider(pptx,'01','One design system governs the whole PoC.','The interface system turns page-by-page design into reusable structure, authoring rules, and testable contracts.');

  simpleSlide('A single token system controls brand, type, spacing, states, and layout across every route.', 'Design foundations', [
    ['Color','Moxa green for system actions; deep teal for industrial proof; neutral backgrounds; orange only for high-emphasis conversion.','01'],
    ['Typography','Arial throughout; large action titles; readable body text; consistent label and metadata hierarchy.','02'],
    ['Spacing','8pt rhythm, 1240px content grid, consistent section padding, restrained radii, and aligned controls.','03'],
  ]);

  simpleSlide('Typography now prioritizes readability and projection distance instead of dense page-level scaling.', 'Typography system', [
    ['Hero / page title','Clamp-based web scale; 32–56px equivalent; short lines; no accidental wrap.','01'],
    ['Section heading','28–44px equivalent; one message per section; consistent max width.','02'],
    ['Body and control','16–18px web body; 44px minimum interactive height; strong focus and contrast.','03'],
  ]);

  simpleSlide('Shared spacing and layout rules keep content aligned even when page narratives differ.', 'Grid and rhythm', [
    ['Container','One centered 1240px content boundary with responsive gutters.','01'],
    ['Section rhythm','Consistent 64–96px desktop spacing and reduced mobile spacing.','02'],
    ['Controls','Aligned button heights, input heights, card padding, and internal gaps.','03'],
  ]);

  simpleSlide('The component library is organized by purpose, not by page ownership.', 'Component library', [
    ['Shell','GlobalHeader · Breadcrumb · GlobalFooter · MoxaAdvisor','01'],
    ['Storytelling','HeroBanner · CampaignOverlay · CardGrid · Metrics · AnchorNavigation','02'],
    ['Evaluation','Filters · SearchResults · Series / Model · Comparison · Resources','03'],
    ['Interaction','AI search · Accordion · Video · Manual · 360 · Lead form','04'],
  ]);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s, 'The shared Header and Footer solve the highest-risk source of cross-route inconsistency.', 'Global shell');
  addImageFrame(s,path.join(SHOTS,'01-homepage.png'),0.62,1.52,7.1,4.9,'Shared header');
  addCard(s,'Header behavior','Ask AI gradient action · aligned Contact Us · bilingual-ready mega menu · closes on outside click, scroll, and Escape.',7.98,1.52,4.64,2.1,{fill:C.pale2,bodySize:13});
  addCard(s,'Footer behavior','Compact follow/social icons · stacked subscription · privacy links · default country/language · lighter Moxa surface.',7.98,3.88,4.64,2.53,{bodySize:13});
  addSource(s);

  simpleSlide('Breadcrumb, anchor navigation, and floating journey controls use one interaction and accessibility pattern.', 'Navigation patterns', [
    ['Breadcrumb','Consistent hierarchy, clickable ancestors, current-page state, responsive overflow.','01'],
    ['Anchor navigation','Sticky page-level wayfinding with active state and aligned actions.','02'],
    ['Floating navigator','Journey progress on long pages without replacing page navigation.','03'],
  ]);

  simpleSlide('All lead-capture forms now share the same fields, consent language, validation, and outcomes.', 'Conversion pattern', [
    ['Contact context','Left-side service explanation and contact guidance.','01'],
    ['Shared schema','First name · email · company · industry · country · project details · privacy consent.','02'],
    ['State model','Default · validation error · submission in progress · success · integration failure.','03'],
  ]);

  simpleSlide('Responsive and accessibility rules are part of the component contract, not final-page cleanup.', 'Quality guardrails', [
    ['Responsive','Desktop, tablet, and mobile layouts use component breakpoints and keep actions visible.','01'],
    ['Keyboard','Focus-visible states, Escape handling, logical order, and native control semantics.','02'],
    ['Motion','Reduced-motion support and restrained transitions for accordions, metrics, and overlays.','03'],
  ]);

  addDivider(pptx,'02','Thirteen routes deliver the required twelve business page classes.','Every page preserves the supplied Moxa content while applying the same modern shell, typography, layout, and reusable components.');

  const routeSlides = [
    ['homepage.html','01-homepage.png','The Homepage preserves Moxa’s content modules while adding an intent-aware hero, campaign banner, AI search, and journey navigation.',['Hero and campaign overlay use supplied Moxa materials.','Explore Now, Featured Products, Trending at Moxa, and Enabling Connectivity are preserved.','Footer and shared shell use the global system.']],
    ['search.html','02-search.png','Search now explains the result set, prioritizes one inferred facet, and routes users into product evaluation.',['Grouped totals and product imagery are visible.','Only one query-intent facet is selected by default.','Products, documents, videos, and campaigns remain accessible.']],
    ['product-series-eds-4008.html','03-eds-4008-series.png','The EDS-4008 series page keeps technical content while making model selection, proof, and conversion easier to scan.',['Official product imagery and content are retained.','Applications, configurations, models, resources, and quote actions align.','The layout is the reusable Product Series pattern.']],
    ['campaign.html','04-campaign.png','The secure-networking campaign becomes a layered story with usable accordions, architecture proof, products, and one lead form.',['Original campaign modules are covered.','Accordion uses smooth plus/minus interaction.','Security solution background and controls are harmonized.']],
    ['microsite.html','05-microsite.png','The Remote I/O microsite keeps the approved content structure while shrinking the hero and harmonizing conversion.',['Official supplied images are used.','Overview, benefits, portfolio, applications, guide, and form are preserved.','Application headings remain readable over imagery.']],
    ['video.html','06-video.png','The Video page behaves like a modern content library with a featured episode, collection navigation, and discovery modules.',['Option 3 structure is implemented.','Current video poster and materials are reused.','Breadcrumb and shared shell match the site.']],
    ['product-category-ethernet-switches.html','07-ethernet-switches.png','The Ethernet Switch category page remains distinct from the EDS-4008 detail page and supports family-level discovery.',['Category content and filters are preserved.','Product cards route into series pages.','Comparison and resources support narrowing.']],
    ['eds-4008-lv.html','08-eds-4008-lv.png','The EDS-4008-LV model page uses one reusable Product Model template with model-specific engineering content.',['Model specifications and resources are retained.','Reusable model-detail sections replace one-off layout.','Quote and comparison handoffs retain context.']],
    ['eds-4008-hv.html','09-eds-4008-hv.png','The EDS-4008-HV route proves the same Product Model template can support a different power-input datasource.',['HV content is distinct, not copied from LV.','Shared structure enables governed authoring.','Comparison stays accessible without duplicating logic.']],
    ['nport-5100-series.html','10-nport-5100.png','The NPort 5100 page validates Product Series reuse beyond Ethernet switches.',['The same series structure supports a different product portfolio.','Model selection, resources, applications, and CTA remain consistent.','Spacing is less crowded than the source HTML.']],
    ['manual.html','11-manual.png','The Manual page replaces an oversized banner with a compact technical header and fast in-document search.',['HXML navigation and body content are preserved.','Search helps users reach manual answers quickly.','Resources and accordion patterns are reusable.']],
    ['compare-lv-hv.html','12-compare-lv-hv.png','The LV/HV comparison demonstrates the intended cited AI response without claiming native SitecoreAI implementation.',['Engineering differences are formatted in a clean table.','Source links sit immediately below the answer.','The global Moxa Advisor icon remains consistent.']],
    ['product-360.html','13-product-360.png','The 360 viewer uses a compact split hero and a reusable media interaction instead of a full-bleed product background.',['Product stays on the right over a controlled surface.','Controls and fallback states are explicit.','The viewer can be reused by other product models.']],
  ];
  routeSlides.forEach((r,i)=>addRouteSlide(pptx,...r,i+1));

  addDivider(pptx,'03','Reusable SitecoreAI contracts replace manual page reconstruction.','Component schemas, page compositions, datasource contracts, and GenScript decisions are ready for Stephen’s engineering review.');

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'The authoritative route inventory distinguishes business page classes from reusable templates.','Route to template map');
  addRouteInventory(s);
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'Twenty-two component contracts define author fields, rendering mode, design-system dependencies, and GenScript action.','Component manifest');
  const compRows = components.components.slice(0,8).map(c=>[c.id,c.group,c.deploymentMode,c.genScript.decision]);
  addMatrix(s,['Component','Group','Rendering mode','GenScript'],compRows,0.7,1.48,[3.35,2.5,3.55,2.75],0.55,10.8);
  addCard(s,'Machine-readable source','The full manifest includes all 22 components and is validated by the automated handoff contract.',0.7,6.05,12.0,0.65,{fill:C.pale2,titleSize:12,bodySize:10});
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'Ten templates cover the twelve Sitecore-targeted routes without duplicating EDS/NPort or LV/HV structures.','Template model');
  addMatrix(s,['Template','Purpose','Key reusable components'],pages.templates.map(t=>[t.id,t.base,t.allowedComponents.slice(0,5).join(' · ')]),0.68,1.42,[3.05,1.7,7.2],0.48,9.7);
  addSource(s);

  simpleSlide('The datasource model separates content from presentation and enables controlled reuse.', 'Field architecture', [
    ['Shared fields','Title · eyebrow · summary · media · CTA · theme · analytics ID · accessibility labels.','01'],
    ['Product fields','Series/model IDs · power input · ports · certifications · resources · application fit.','02'],
    ['Form fields','Schema, consent, routing metadata, campaign context, and success/error messages.','03'],
  ]);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'GenScript is a starting point—not the final design system—so each component has an explicit reuse action.','GenScript matrix');
  const genRows = components.components.slice(0,10).map(c=>[c.id,c.genScript.decision,c.genScript.startingPoint || 'Existing PoC pattern',(c.genScript.changes || []).slice(0,2).join(' · ')]);
  addMatrix(s,['Component','Decision','Starting point','Required change'],genRows,0.62,1.36,[2.3,1.35,3.7,5.3],0.5,9.4);
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'Most GenScript patterns are adapted or refactored; only two net-new components are required.','Reuse summary');
  const decisions2={};components.components.forEach(c=>decisions2[c.genScript.decision]=(decisions2[c.genScript.decision]||0)+1);
  addBars(s,Object.entries(decisions2).map(([label,value])=>({label:label.replace('-',' '),value,color:label==='new'?C.orange:C.green})),0.76,1.62,6.35,12);
  addCard(s,'Why this matters','Engineering starts from stable behavior where available, but Moxa tokens, accessible states, structured fields, analytics hooks, and author schemas are always applied.',7.26,1.52,5.3,3.96,{fill:C.pale2,bodySize:14});
  addSource(s);

  simpleSlide('Hybrid BYOC is the preferred mode for interaction-heavy components, while structured renderings serve content-led modules.', 'Component runtime', [
    ['Hybrid BYOC','Advisor, search, overlays, filters, accordions, video, manual, 360, and forms.','01'],
    ['Structured rendering','Hero, cards, metrics, series/model content, comparisons, and resources.','02'],
    ['Automatic author UI','JSON schemas generate author configuration and reduce manual setup.','03'],
  ], SITECORE_SOURCE);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'Page compositions are generated from ordered component manifests instead of assembled manually.','Page generation');
  addPipeline(s,1.74);
  addCard(s,'Generation output','React/BYOC registrations · rendering items · data templates · placeholder settings · page/branch templates · datasources · layouts · serialized route items',0.62,4.34,12.02,1.52,{fill:C.pale,bodySize:14});
  addSource(s,SITECORE_SOURCE);

  simpleSlide('Serialization keeps component code, templates, renderings, and layouts versioned and deployed together.', 'Sitecore Content Serialization', [
    ['Build artifact','Generate an `.itempackage` from reviewed serialized modules.','01'],
    ['Delivery','Install non-interactively with protected client credentials.','02'],
    ['Promotion','Use the same package across environments and retain it for rollback.','03'],
  ], SITECORE_SOURCE);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'The automated pipeline produces a reviewable release and repeatable environment evidence.','Deployment pipeline');
  addPipeline(s,1.74);
  addCard(s,'Release evidence','Commit SHA · package hash · deployment ID · publishing job · 13-route test log · screenshots · 38-demo result matrix',0.62,4.34,12.02,1.52,{fill:C.pale2,bodySize:14});
  addSource(s,SITECORE_SOURCE);

  simpleSlide('Security, rollback, and environment separation are explicit deployment requirements.', 'Release guardrails', [
    ['Secrets','Client ID/secret, hosts, and API keys live only in CI secret storage.','01'],
    ['Rollback','Redeploy prior application release and install the retained prior SCS package.','02'],
    ['Environment gates','Test first; promote only after route, accessibility, integration, and journey checks pass.','03'],
  ], SITECORE_SOURCE);

  addDivider(pptx,'04','Thirty-eight demonstrations prove the end-to-end journey with honest capability boundaries.','Each demonstration has an ID, stage, use-case mapping, evidence route, status, and target-environment acceptance requirement.');

  journeys.stages.forEach((stage,idx)=>{
    const slide=pptx.addSlide({masterName:'CONTENT'});
    addActionTitle(slide,`${stage.name} links ${stage.entry} to the next measurable customer action.`,`Journey stage S${idx+1}`);
    addCard(slide,'Entry and handoffs',`Entry: ${stage.entry}\n\nHandoffs: ${stage.primaryHandoffs.join(' · ')}`,0.62,1.52,4.05,4.66,{fill:C.pale2,bodySize:12.5});
    const ops=stage.operations.slice(0,8);
    ops.forEach((op,i)=>{
      const y=1.52+i*0.56;
      addPill(slide,String(op.id).padStart(2,'0'),4.98,y,0.5,op.status==='implemented'?C.green:op.status==='simulated'?C.teal:C.orange,C.white);
      slide.addText(op.name,{x:5.62,y:y+0.03,w:5.25,h:0.18,fontFace:FONT,fontSize:11,bold:true,color:C.ink,margin:0,fit:'shrink'});
      slide.addText(op.status,{x:11.08,y:y+0.03,w:1.35,h:0.18,fontFace:FONT,fontSize:9.5,bold:true,color:op.status==='implemented'?C.green:op.status==='simulated'?C.teal:C.orange,margin:0,align:'right'});
    });
    addSource(slide);
  });

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'The evidence dashboard exposes both implemented strength and the remaining integration workload.','Demo coverage');
  addBars(s,[{label:'Implemented HTML',value:11,color:C.green},{label:'Front-end simulation',value:23,color:C.teal},{label:'Platform proof',value:2,color:C.orange},{label:'External HTML',value:2,color:'A4652A'}],0.72,1.62,6.4,23);
  addCard(s,'Interpretation','The HTML PoC demonstrates the target experience. Live Search, CRM, personalization, analytics, publishing, and Sitecore authoring remain acceptance items—not hidden assumptions.',7.26,1.52,5.34,4.05,{fill:C.pale2,bodySize:14});
  addSource(s);

  simpleSlide('The test strategy verifies structure first, then runtime behavior, integration, and journey evidence.', 'Acceptance strategy', [
    ['Contract tests','Manifest integrity · route files · component allow-lists · template reuse · design-system shell.','01'],
    ['Runtime tests','HTTP · visual shell · responsive · keyboard · motion · forms · search · links · assets.','02'],
    ['Platform tests','Author schemas · serialization · deployment · publishing · Search/CRM/analytics · 38-demo recording.','03'],
  ]);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'All thirteen latest routes return HTTP 200 and all seventeen automated handoff tests pass.','Current validation');
  addStat(s,'13/13','Local route availability',0.82,1.72,3.0);
  addStat(s,'17/17','Python contract tests',4.22,1.72,3.0);
  addStat(s,'13','Latest screenshots',7.62,1.72,3.0);
  addCard(s,'Validated contracts','Homepage third banner · Remote I/O content/assets/form/shell · Sitecore scope · component references · template reuse · shared CSS/JS · 38 demos · evidence paths · Search facet default',0.82,3.62,9.8,1.72,{fill:C.pale,bodySize:13.3});
  addSource(s);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'The latest visual evidence replaces stale July 17 screenshots and can be linked directly from both decks.','Evidence refresh');
  [['01-homepage.png',0.62,1.48],['04-campaign.png',6.78,1.48],['05-microsite.png',0.62,4.06],['12-compare-lv-hv.png',6.78,4.06]].forEach(([img,x,y])=>addImageFrame(s,path.join(SHOTS,img),x,y,5.56,2.22,img));
  addSource(s);

  simpleSlide('Responsive behavior and interaction states remain part of post-deployment acceptance—not a one-time desktop review.', 'Cross-device QA', [
    ['Desktop','1240px grid, aligned actions, stable mega menu, restrained overlays.','01'],
    ['Tablet','Single-column conversions, controlled card grids, preserved anchor access.','02'],
    ['Mobile','Readable typography, touch targets, collapsed navigation, non-obscuring Advisor.','03'],
  ]);

  simpleSlide('Live APIs replace simulations without changing the presentation components or page compositions.', 'Integration boundary', [
    ['Search','Query, autocomplete, synonyms, filters, ranking, PDF body search, metrics.','01'],
    ['CRM / forms','Consent, profiling, regional routing, campaign context, error handling.','02'],
    ['Personalization / analytics','Audience state, experiments, campaign attribution, journey reporting.','03'],
  ]);

  simpleSlide('Swati’s inputs complete business capability acceptance, while Arthur and Stephen unlock deployment mechanics.', 'External inputs', [
    ['Swati','Personalization · A/B · campaign · Search · analytics/journey · authoring/components.','01'],
    ['Arthur / Stephen','Repo · SDK · rendering/BYOC convention · serialization · environments · CI · APIs.','02'],
  ]);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'Five implementation coordinates—not design decisions—remain before automated deployment can run.','Open implementation inputs');
  addMatrix(s,['Input','Owner','Needed for','Impact if missing'],[
    ['Target repository / branch','Stephen','Code placement and PR','No deploy trigger'],
    ['SDK / JSS / BYOC convention','Stephen','Generated imports and factory','Build incompatibility'],
    ['Org / project / environment / site IDs','Arthur','Deployment target','Cannot execute deployment'],
    ['Serialization and media conventions','Arthur','Item package and assets','Items/assets cannot promote'],
    ['CI credentials and live API contracts','Arthur / Swati','Non-interactive install and integrations','Simulation remains'],
  ],0.68,1.58,[3.15,1.7,3.4,3.6],0.75,11.2);
  addSource(s);

  simpleSlide('The next two weeks can run engineering review, generator integration, and evidence preparation in parallel.', 'Execution plan', [
    ['Track A — Stephen review','Confirm component boundaries, templates, target repo, and runtime conventions.','01'],
    ['Track B — Generator','Emit React/BYOC registrations, templates, renderings, pages, datasources, and SCS modules.','02'],
    ['Track C — Acceptance','Wire APIs, deploy to test, run 13-route suite, and record 38-demo evidence.','03'],
  ]);

  s = pptx.addSlide({ masterName: 'CONTENT' });
  addActionTitle(s,'The handoff package gives Stephen one place to review pages, components, templates, GenScript actions, and deployment logic.','Package contents');
  addMatrix(s,['Artifact','Purpose','Source of truth'],[
    ['13 HTML routes + assets','Latest visual and interaction evidence','site/'],
    ['component-manifest.json','22 components and author contracts','handoff/sitecoreai/'],
    ['page-compositions.json','Templates and ordered routes','handoff/sitecoreai/'],
    ['demo-journeys.json','38 operation demonstrations','handoff/sitecoreai/'],
    ['Automation blueprint','No-manual-config delivery flow','handoff/'],
    ['Tracker + decks + screenshots','Review, coverage, and visual evidence','reference/ + evidence/'],
  ],0.72,1.55,[3.2,4.5,4.2],0.69,11.5);
  addSource(s);

  s = pptx.addSlide();
  s.background={color:C.deep};
  s.addText('The PoC is no longer waiting for design decisions.',{x:0.7,y:1.2,w:11.5,h:0.82,fontFace:FONT,fontSize:34,bold:true,color:C.white,margin:0});
  s.addText('It is waiting for target repository and environment coordinates so the approved system can be generated, deployed, and tested.',{x:0.72,y:2.45,w:10.3,h:0.86,fontFace:FONT,fontSize:20,color:'C7E6E4',margin:0,fit:'shrink'});
  addPill(s,'READY FOR STEPHEN REVIEW',0.72,4.1,2.72,C.orange,C.white);
  s.addText('12 classes · 13 routes · 22 components · 10 templates · 38 demos · 17 passing contract tests',{x:0.72,y:5.2,w:10.8,h:0.36,fontFace:FONT,fontSize:14,bold:true,color:C.white,margin:0});
  s.addText('MOXA  |  SITECOREAI POC  |  20 JUL 2026',{x:0.72,y:6.82,w:5.4,h:0.2,fontFace:FONT,fontSize:9,color:C.cyan,margin:0,charSpacing:0.8});

  if (pptx._slides.length !== 58) throw new Error(`Full deck must contain 58 slides; generated ${pptx._slides.length}`);
  return pptx;
}

(async () => {
  const executive = buildExecutive();
  const full = buildFull();
  await executive.writeFile({ fileName: path.join(OUT, 'Moxa_PoC_Executive_13Slides_English_20260720.pptx') });
  await full.writeFile({ fileName: path.join(OUT, 'Moxa_PoC_Full_58Slides_English_20260720.pptx') });
  console.log(`Wrote ${executive._slides.length} executive slides and ${full._slides.length} full-review slides to ${OUT}`);
})();
