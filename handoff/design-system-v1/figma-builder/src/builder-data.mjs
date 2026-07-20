import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const handoffDirectory = path.resolve(directory, '../..');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && text[index + 1] === '\n') index += 1;
      row.push(value);
      if (row.some(cell => cell.length)) rows.push(row);
      row = [];
      value = '';
    } else {
      value += character;
    }
  }
  if (value.length || row.length) {
    row.push(value);
    rows.push(row);
  }
  const [headers, ...records] = rows;
  return records.map(record => Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ''])));
}

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(handoffDirectory, name), 'utf8'));
}

function readCsv(name) {
  return parseCsv(fs.readFileSync(path.join(handoffDirectory, name), 'utf8'));
}

const logicalTokens = readJson('tokens.json');

function physicalCollection(name, mode, variables) {
  return { name, modes: [mode], variables };
}

function flattenSingleMode(collectionName) {
  const source = logicalTokens.collections[collectionName];
  return physicalCollection(collectionName, source.modes[0], Object.entries(source.tokens).map(([name, token]) => ({
    name,
    type: token.type,
    scopes: token.scope,
    codeSyntax: token.css,
    value: token.value
  })));
}

const semanticSource = logicalTokens.collections['Moxa / Semantic Color'];
const semanticCollections = semanticSource.modes.map(mode => physicalCollection(
  `Moxa / Semantic Color / ${mode}`,
  mode,
  Object.entries(semanticSource.tokens).map(([name, token]) => ({
    name,
    type: token.type,
    scopes: token.scope,
    codeSyntax: token.css,
    value: token.values[mode]
  }))
));

const typographySource = logicalTokens.collections['Moxa / Typography'];
const typographyCollections = typographySource.modes.map(mode => physicalCollection(
  `Moxa / Typography / ${mode}`,
  mode,
  Object.entries(typographySource.tokens).map(([name, token]) => ({
    name,
    type: token.type,
    scopes: token.scope,
    codeSyntax: token.css,
    value: token.values[mode]
  }))
));

export const collections = [
  flattenSingleMode('Moxa / Primitives'),
  ...semanticCollections,
  flattenSingleMode('Moxa / Spacing'),
  flattenSingleMode('Moxa / Radius'),
  flattenSingleMode('Moxa / Sizing'),
  ...typographyCollections,
  flattenSingleMode('Moxa / Motion')
];

export const pageNames = [
  '00 — Cover & Release Status',
  '01 — Getting Started',
  '02 — Principles & Brand Expression',
  '03 — Foundations / Color',
  '04 — Foundations / Typography',
  '05 — Foundations / Grid & Spacing',
  '06 — Foundations / Radius, Elevation & Motion',
  '07 — Foundations / Iconography & Imagery',
  '--- COMPONENTS ---',
  '10 — Actions / Button & Link',
  '11 — Inputs / Search, Text, Select & Consent',
  '12 — Navigation / Header, Mega Menu & Breadcrumb',
  '13 — Navigation / Anchor Nav & Floating Navigator',
  '14 — Content / Labels, Badges, Alerts & Section Header',
  '15 — Cards / Product, Resource, Application & Video',
  '16 — Disclosure / Accordion, Tabs & Modal',
  '17 — Data / Specification, Comparison & Search Results',
  '18 — Media / Hero, Video & 360 Viewer',
  '19 — Conversion / CTA, Lead Form & Footer',
  '20 — AI / Ask AI and Moxa Advisor',
  '--- PATTERNS & TEMPLATES ---',
  '22 — Shared Shell Patterns',
  '23 — Product Discovery Patterns',
  '24 — Product Detail Patterns',
  '25 — Campaign & Microsite Patterns',
  '26 — Support, Manual & Media Patterns',
  '27 — Page Templates / 12 Types',
  '28 — Route Coverage / 13 Routes',
  '29 — Accessibility & Content Guidance',
  '30 — Sitecore Mapping & Governance',
  '31 — Changelog & Open Decisions'
];

const componentRows = readCsv('component-inventory.csv');
const specimenKindByFamily = {
  'Global shell': 'shell',
  Actions: 'action',
  Forms: 'form',
  Navigation: 'navigation',
  Disclosure: 'navigation',
  Content: 'content',
  Cards: 'card',
  Data: 'data',
  Media: 'media',
  Conversion: 'conversion',
  AI: 'ai'
};
export const componentDefinitions = componentRows.map(row => ({
  id: row.component_id,
  name: row.name,
  family: row.family,
  scope: row.scope,
  selector: row.html_selector,
  states: row.states.split(';').map(value => value.trim()).filter(Boolean),
  responsive: row.responsive_behavior,
  accessibility: row.accessibility,
  page: row.figma_page,
  sitecoreRendering: row.sitecore_rendering,
  status: row.status,
  specimenKind: specimenKindByFamily[row.family]
}));

const routeRows = readCsv('route-template-matrix.csv');
export const routeDefinitions = routeRows.map(row => ({
  id: row.route_id,
  type: row.page_type,
  file: row.route_file,
  title: row.page_title,
  sharedShell: row.shared_shell === 'yes',
  patterns: row.primary_patterns.split(';').map(value => value.trim()),
  unique: row.unique_components,
  template: row.sitecore_template,
  status: row.coverage_status
}));

export const sitecoreMappings = readCsv('sitecore-crosswalk.csv').map(row => ({
  id: row.mapping_id,
  figmaPattern: row.figma_pattern,
  implementation: row.current_implementation,
  rendering: row.sitecore_rendering,
  datasource: row.datasource_template,
  fields: row.authoring_fields,
  behavior: row.behavior_owner,
  analytics: row.analytics_events
}));

export const textStyles = [
  { name: 'Display / Hero', style: 'Extra Bold', size: 64, lineHeight: 65, letterSpacing: -2.2 },
  { name: 'Heading / H1', style: 'Bold', size: 56, lineHeight: 60, letterSpacing: -1.6 },
  { name: 'Heading / H2', style: 'Bold', size: 44, lineHeight: 48, letterSpacing: -1.1 },
  { name: 'Heading / H3', style: 'Bold', size: 28, lineHeight: 34, letterSpacing: -0.4 },
  { name: 'Heading / Section', style: 'Bold', size: 36, lineHeight: 42, letterSpacing: -0.8 },
  { name: 'Heading / Card', style: 'Bold', size: 20, lineHeight: 26, letterSpacing: -0.1 },
  { name: 'Body / Large', style: 'Regular', size: 18, lineHeight: 28, letterSpacing: 0 },
  { name: 'Body / Default', style: 'Regular', size: 16, lineHeight: 25, letterSpacing: 0 },
  { name: 'Body / Small', style: 'Regular', size: 14, lineHeight: 21, letterSpacing: 0 },
  { name: 'Label / Eyebrow', style: 'Bold', size: 12, lineHeight: 16, letterSpacing: 2.4, textCase: 'UPPER' },
  { name: 'Label / Navigation', style: 'Semi Bold', size: 14, lineHeight: 20, letterSpacing: 0 },
  { name: 'Data / Metric', style: 'Light', size: 48, lineHeight: 54, letterSpacing: -1.2 },
  { name: 'Utility / Caption', style: 'Medium', size: 12, lineHeight: 18, letterSpacing: 0 }
];

export const effectStyles = [
  { name: 'Elevation / Panel', effects: [{ type: 'DROP_SHADOW', color: { r: 8 / 255, g: 47 / 255, b: 73 / 255, a: 0.14 }, offset: { x: 0, y: 20 }, radius: 60, spread: 0, visible: true, blendMode: 'NORMAL' }] },
  { name: 'Elevation / Floating', effects: [{ type: 'DROP_SHADOW', color: { r: 8 / 255, g: 47 / 255, b: 73 / 255, a: 0.18 }, offset: { x: 0, y: 12 }, radius: 32, spread: 0, visible: true, blendMode: 'NORMAL' }] },
  { name: 'Surface / Glass', effects: [{ type: 'BACKGROUND_BLUR', radius: 24, visible: true }] }
];

export const gridStyles = [
  { name: 'Grid / Desktop / 4 Column', grid: { pattern: 'COLUMNS', alignment: 'STRETCH', gutterSize: 32, count: 4, offset: 0, visible: true, color: { r: 0, g: 135 / 255, b: 135 / 255, a: 0.08 } } },
  { name: 'Grid / Tablet / 4 Column', grid: { pattern: 'COLUMNS', alignment: 'STRETCH', gutterSize: 24, count: 4, offset: 0, visible: true, color: { r: 0, g: 135 / 255, b: 135 / 255, a: 0.08 } } },
  { name: 'Grid / Mobile / 4 Column', grid: { pattern: 'COLUMNS', alignment: 'STRETCH', gutterSize: 16, count: 4, offset: 0, visible: true, color: { r: 0, g: 135 / 255, b: 135 / 255, a: 0.08 } } }
];
