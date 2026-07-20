import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  collections,
  componentDefinitions,
  pageNames,
  routeDefinitions,
  sitecoreMappings,
  textStyles,
  effectStyles,
  gridStyles
} from './src/builder-data.mjs';

assert.equal(collections.length, 10, 'Starter-plan fallback must use 10 physical collections');
assert.equal(collections.reduce((count, collection) => count + collection.variables.length, 0), 105, 'Figma must receive 105 physical variables');
assert.equal(pageNames.length, 31, 'Figma file must contain 31 ordered pages');
assert.equal(new Set(pageNames).size, 31, 'Figma page names must be unique');
assert.equal(componentDefinitions.length, 54, 'Component inventory must contain 54 components');
assert.equal(new Set(componentDefinitions.map(component => component.id)).size, 54, 'Component IDs must be unique');
assert.equal(routeDefinitions.length, 13, 'Coverage matrix must contain 13 routes');
assert.equal(new Set(routeDefinitions.map(route => route.file)).size, 13, 'Route files must be unique');
assert.equal(sitecoreMappings.length, 30, 'Sitecore crosswalk must contain 30 mappings');
assert.equal(textStyles.length, 13, 'Text style list must contain 13 styles');
assert.equal(effectStyles.length, 3, 'Effect style list must contain 3 styles');
assert.equal(gridStyles.length, 3, 'Grid style list must contain 3 styles');

for (const collection of collections) {
  assert.equal(collection.modes.length, 1, `${collection.name} must remain Starter-plan compatible`);
  for (const variable of collection.variables) {
    assert.match(variable.codeSyntax, /^var\(--[a-z0-9-]+\)$/, `${variable.name} needs WEB var() syntax`);
    assert.ok(Array.isArray(variable.scopes), `${variable.name} needs explicit scopes`);
  }
}

for (const component of componentDefinitions) {
  assert.ok(pageNames.includes(component.page), `${component.id} references a missing Figma page`);
  assert.ok(component.sitecoreRendering, `${component.id} needs a Sitecore rendering mapping`);
}

for (const route of routeDefinitions) {
  assert.ok(fs.existsSync(new URL(`../../../${route.file}`, import.meta.url)), `Missing route file: ${route.file}`);
}

console.log('Moxa Figma Builder data contract: PASS');
