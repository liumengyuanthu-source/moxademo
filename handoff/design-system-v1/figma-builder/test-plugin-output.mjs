import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPlugin } from './src/build-plugin.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
await buildPlugin();

const manifestPath = path.join(directory, 'manifest.json');
const codePath = path.join(directory, 'code.js');
assert.ok(fs.existsSync(manifestPath), 'manifest.json must be generated');
assert.ok(fs.existsSync(codePath), 'code.js must be generated');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.name, 'Moxa Design System Builder');
assert.equal(manifest.main, 'code.js');
assert.deepEqual(manifest.editorType, ['figma']);

const code = fs.readFileSync(codePath, 'utf8');
assert.match(code, /Moxa PoC Operational Design System v1\.0/);
assert.match(code, /const COLLECTIONS = /);
assert.match(code, /const PAGE_NAMES = /);
assert.match(code, /const COMPONENT_DEFINITIONS = /);
assert.match(code, /createVariableCollection/);
assert.match(code, /createTextStyle/);
assert.match(code, /createComponent/);
assert.match(code, /setSharedPluginData/);
assert.match(code, /saveVersionHistoryAsync/);
assert.match(code, /resetGeneratedCanvases/);
assert.match(code, /Component gallery/);
assert.match(code, /Template gallery/);
assert.match(code, /fitAllPages/);
assert.match(code, /direction === 'HORIZONTAL'/);
assert.match(code, /function applyAutoLayoutSizing/);
assert.match(code, /set\.layoutWrap = 'WRAP'/);
assert.match(code, /function renderComponentSpecimen/);
assert.match(code, /function renderVariantContent/);
assert.match(code, /function componentDocumentationCard/);
assert.match(code, /Visual specimen/);

console.log('Moxa Figma Builder plugin output: PASS');
