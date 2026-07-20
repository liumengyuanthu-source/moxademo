import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  collections,
  componentDefinitions,
  pageNames,
  routeDefinitions,
  sitecoreMappings,
  textStyles,
  effectStyles,
  gridStyles
} from './builder-data.mjs';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function pluginRuntime() {
  const RUN_ID = 'moxa-ds-v1-20260720';
  const NS = 'moxa_ds';
  const FONT = 'Inter';
  const color = {
    teal: { r: 0, g: 135 / 255, b: 135 / 255 },
    tealDark: { r: 0, g: 107 / 255, b: 107 / 255 },
    tealSoft: { r: 231 / 255, g: 245 / 255, b: 244 / 255 },
    navy: { r: 8 / 255, g: 47 / 255, b: 73 / 255 },
    cyan: { r: 64 / 255, g: 203 / 255, b: 208 / 255 },
    orange: { r: 243 / 255, g: 154 / 255, b: 97 / 255 },
    ink: { r: 22 / 255, g: 47 / 255, b: 58 / 255 },
    muted: { r: 99 / 255, g: 119 / 255, b: 129 / 255 },
    line: { r: 215 / 255, g: 227 / 255, b: 228 / 255 },
    surface: { r: 244 / 255, g: 248 / 255, b: 248 / 255 },
    white: { r: 1, g: 1, b: 1 }
  };

  const solid = (rgb, opacity = 1) => ({ type: 'SOLID', color: rgb, opacity });
  const hexToRgb = value => {
    const clean = value.replace('#', '');
    return {
      r: parseInt(clean.slice(0, 2), 16) / 255,
      g: parseInt(clean.slice(2, 4), 16) / 255,
      b: parseInt(clean.slice(4, 6), 16) / 255
    };
  };

  async function loadFonts() {
    const styles = ['Light', 'Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'];
    for (const style of styles) await figma.loadFontAsync({ family: FONT, style });
  }

  function tag(node, phase, key) {
    node.setSharedPluginData(NS, 'run_id', RUN_ID);
    node.setSharedPluginData(NS, 'phase', phase);
    node.setSharedPluginData(NS, 'key', key);
  }

  function textNode(characters, options = {}) {
    const node = figma.createText();
    const style = options.style || 'Regular';
    node.fontName = { family: FONT, style };
    node.characters = characters;
    node.fontSize = options.size || 16;
    node.lineHeight = { unit: 'PIXELS', value: options.lineHeight || Math.round((options.size || 16) * 1.45) };
    node.letterSpacing = { unit: 'PIXELS', value: options.letterSpacing || 0 };
    node.fills = [solid(options.color || color.ink)];
    if (options.textCase) node.textCase = options.textCase;
    node.textAutoResize = 'HEIGHT';
    if (options.width) node.resize(options.width, node.height);
    return node;
  }

  function applyAutoLayoutSizing(node, direction, width) {
    if (width) node.resize(width, Math.max(node.height, 1));
    node.layoutMode = direction;
    if (direction === 'HORIZONTAL') {
      node.primaryAxisSizingMode = width ? 'FIXED' : 'AUTO';
      node.counterAxisSizingMode = 'AUTO';
    } else {
      node.primaryAxisSizingMode = 'AUTO';
      node.counterAxisSizingMode = width ? 'FIXED' : 'AUTO';
    }
  }

  function autoFrame(name, direction = 'VERTICAL', options = {}) {
    const frame = figma.createFrame();
    frame.name = name;
    applyAutoLayoutSizing(frame, direction, options.width);
    frame.paddingTop = options.padding ?? 24;
    frame.paddingRight = options.padding ?? 24;
    frame.paddingBottom = options.padding ?? 24;
    frame.paddingLeft = options.padding ?? 24;
    frame.itemSpacing = options.gap ?? 16;
    frame.cornerRadius = options.radius ?? 8;
    frame.fills = [solid(options.fill || color.white, options.opacity ?? 1)];
    if (options.stroke) {
      frame.strokes = [solid(options.stroke)];
      frame.strokeWeight = 1;
    }
    return frame;
  }

  function appendFill(parent, child) {
    parent.appendChild(child);
    child.layoutAlign = 'STRETCH';
    return child;
  }

  function chip(label, fill = color.tealSoft, ink = color.tealDark) {
    const frame = autoFrame(`Chip / ${label}`, 'HORIZONTAL', { padding: 8, gap: 4, radius: 999, fill });
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.appendChild(textNode(label, { size: 12, lineHeight: 16, style: 'Semi Bold', color: ink }));
    return frame;
  }

  async function ensureCollections() {
    const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
    const localVariables = await figma.variables.getLocalVariablesAsync();
    const primitiveMap = {};
    const output = {};
    for (const definition of COLLECTIONS) {
      let collection = localCollections.find(item => item.name === definition.name);
      if (!collection) collection = figma.variables.createVariableCollection(definition.name);
      const modeName = definition.modes[0];
      if (collection.modes[0].name !== modeName) collection.renameMode(collection.defaultModeId, modeName);
      const modeId = collection.modes[0].modeId;
      const collectionVariables = localVariables.filter(variable => variable.variableCollectionId === collection.id);
      output[definition.name] = { id: collection.id, variables: {} };
      for (const definitionVariable of definition.variables) {
        let variable = collectionVariables.find(item => item.name === definitionVariable.name);
        if (!variable) variable = figma.variables.createVariable(definitionVariable.name, collection, definitionVariable.type);
        variable.scopes = definitionVariable.scopes;
        variable.setVariableCodeSyntax('WEB', definitionVariable.codeSyntax);
        let value = definitionVariable.value;
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          const primitiveName = value.slice(1, -1);
          if (!primitiveMap[primitiveName]) throw new Error(`Missing primitive alias: ${primitiveName}`);
          value = figma.variables.createVariableAlias(primitiveMap[primitiveName]);
        } else if (definitionVariable.type === 'COLOR') {
          value = hexToRgb(value);
        }
        variable.setValueForMode(modeId, value);
        if (definition.name === 'Moxa / Primitives') primitiveMap[definitionVariable.name] = variable;
        output[definition.name].variables[definitionVariable.name] = variable.id;
      }
    }
    return output;
  }

  async function ensureStyles() {
    const localText = await figma.getLocalTextStylesAsync();
    const localEffects = await figma.getLocalEffectStylesAsync();
    const localGrids = await figma.getLocalGridStylesAsync();
    const output = { text: {}, effect: {}, grid: {} };
    for (const definition of TEXT_STYLES) {
      let style = localText.find(item => item.name === definition.name);
      if (!style) style = figma.createTextStyle();
      style.name = definition.name;
      style.fontName = { family: FONT, style: definition.style };
      style.fontSize = definition.size;
      style.lineHeight = { unit: 'PIXELS', value: definition.lineHeight };
      style.letterSpacing = { unit: 'PIXELS', value: definition.letterSpacing };
      if (definition.textCase) style.textCase = definition.textCase;
      style.description = 'Moxa PoC DS v1. Implementation font stack: Helvetica Neue, Helvetica, Arial; editable Figma fallback: Inter.';
      output.text[definition.name] = style.id;
    }
    for (const definition of EFFECT_STYLES) {
      let style = localEffects.find(item => item.name === definition.name);
      if (!style) style = figma.createEffectStyle();
      style.name = definition.name;
      style.effects = definition.effects;
      output.effect[definition.name] = style.id;
    }
    for (const definition of GRID_STYLES) {
      let style = localGrids.find(item => item.name === definition.name);
      if (!style) style = figma.createGridStyle();
      style.name = definition.name;
      style.layoutGrids = [definition.grid];
      output.grid[definition.name] = style.id;
    }
    return output;
  }

  async function ensurePages() {
    const map = {};
    const first = figma.root.children[0];
    if (first && first.name === 'Page 1' && !figma.root.children.some(page => page.name === PAGE_NAMES[0])) {
      await first.loadAsync();
      if (first.children.length === 0) first.name = PAGE_NAMES[0];
    }
    for (const name of PAGE_NAMES) {
      let page = figma.root.children.find(item => item.name === name);
      if (!page) {
        page = figma.createPage();
        page.name = name;
      }
      await page.loadAsync();
      tag(page, 'phase2', `page/${name}`);
      map[name] = page;
    }
    return map;
  }

  async function resetGeneratedCanvases(pages) {
    for (const page of Object.values(pages)) {
      await page.loadAsync();
      for (const node of [...page.children]) {
        if (node.getSharedPluginData(NS, 'key') === `canvas/${page.name}`) node.remove();
      }
    }
  }

  function pageCanvas(page, description) {
    let canvas = page.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `canvas/${page.name}`);
    if (canvas) return canvas;
    canvas = autoFrame(`DS Canvas / ${page.name}`, 'VERTICAL', { width: 1440, padding: 64, gap: 32, radius: 0, fill: color.surface });
    canvas.x = 0;
    canvas.y = 0;
    tag(canvas, 'phase2', `canvas/${page.name}`);
    page.appendChild(canvas);
    appendFill(canvas, textNode(page.name, { size: 40, lineHeight: 46, style: 'Bold', color: color.ink }));
    appendFill(canvas, textNode(description, { size: 16, lineHeight: 25, color: color.muted, width: 1120 }));
    const rule = figma.createRectangle();
    rule.name = 'Moxa bond line';
    rule.resize(120, 4);
    rule.fills = [solid(color.teal)];
    canvas.appendChild(rule);
    return canvas;
  }

  function componentGallery(canvas) {
    let gallery = canvas.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `gallery/${canvas.parent.name}`);
    if (gallery) return gallery;
    gallery = autoFrame('Component gallery', 'HORIZONTAL', { width: 1312, padding: 0, gap: 24, radius: 0, fill: color.surface });
    gallery.layoutWrap = 'WRAP';
    gallery.counterAxisSpacing = 24;
    tag(gallery, 'phase3', `gallery/${canvas.parent.name}`);
    appendFill(canvas, gallery);
    return gallery;
  }

  function addMetricRow(parent, metrics) {
    const row = autoFrame('Scope metrics', 'HORIZONTAL', { padding: 0, gap: 16, radius: 0, fill: color.surface });
    appendFill(parent, row);
    for (const metric of metrics) {
      const card = autoFrame(`Metric / ${metric.label}`, 'VERTICAL', { width: 250, padding: 20, gap: 8, radius: 8, fill: color.white, stroke: color.line });
      card.appendChild(textNode(metric.value, { size: 36, lineHeight: 40, style: 'Light', color: color.tealDark }));
      card.appendChild(textNode(metric.label, { size: 12, lineHeight: 16, style: 'Bold', color: color.muted, letterSpacing: 1.4, textCase: 'UPPER' }));
      row.appendChild(card);
    }
  }

  function addFoundationDocumentation(pages) {
    const cover = pageCanvas(pages[PAGE_NAMES[0]], 'A governed operating system for the Moxa PoC, component decomposition, and Sitecore implementation.');
    cover.paddingTop = 112;
    appendFill(cover, textNode('Reliable networks.\nSincere service.', { size: 72, lineHeight: 74, style: 'Extra Bold', color: color.navy, width: 1040 }));
    appendFill(cover, textNode('Moxa PoC Operational Design System v1.0', { size: 22, lineHeight: 30, style: 'Semi Bold', color: color.teal }));
    addMetricRow(cover, [{ value: '64', label: 'Logical tokens' }, { value: '54', label: 'Components' }, { value: '12', label: 'Page types' }, { value: '13', label: 'Routes' }]);

    const getting = pageCanvas(pages[PAGE_NAMES[1]], 'How designers, front-end developers, and Sitecore authors use the same system.');
    for (const [index, item] of ['Start with a token or existing component', 'Compose a governed pattern', 'Configure a page template', 'Map content to Sitecore datasource fields', 'Validate accessibility and analytics'].entries()) {
      const row = autoFrame(`Getting started / ${index + 1}`, 'HORIZONTAL', { padding: 20, gap: 16, radius: 8, fill: color.white, stroke: color.line });
      row.appendChild(chip(String(index + 1), color.teal, color.white));
      row.appendChild(textNode(item, { size: 18, lineHeight: 26, style: 'Semi Bold' }));
      appendFill(getting, row);
    }

    const principles = pageCanvas(pages[PAGE_NAMES[2]], 'Brand promise translated into repeatable interface decisions.');
    const principlesList = [['Reliable industrial clarity', 'Disciplined alignment, technical evidence, and predictable interaction.'], ['Product evidence before promotion', 'Specifications, sources, and application proof precede decoration.'], ['Guided decision making', 'Search, selectors, comparison, and Advisor reduce selection effort.'], ['One shared system', 'Page differences come from configuration and datasource content.'], ['Accessible by default', 'Keyboard, focus, contrast, labels, and reduced motion are acceptance criteria.']];
    for (const item of principlesList) {
      const card = autoFrame(`Principle / ${item[0]}`, 'VERTICAL', { padding: 24, gap: 8, radius: 8, fill: color.white, stroke: color.line });
      appendFill(card, textNode(item[0], { size: 22, lineHeight: 28, style: 'Bold', color: color.navy }));
      appendFill(card, textNode(item[1], { size: 16, lineHeight: 24, color: color.muted }));
      appendFill(principles, card);
    }

    const colorPage = pageCanvas(pages[PAGE_NAMES[3]], 'Implementation colors and semantic use. Semantic themes are separate collections because Backup uses a Starter plan.');
    const swatches = autoFrame('Color swatches', 'HORIZONTAL', { padding: 0, gap: 16, radius: 0, fill: color.surface });
    swatches.layoutWrap = 'WRAP';
    appendFill(colorPage, swatches);
    const colors = [['Moxa Teal', '#008787'], ['Teal 700', '#006B6B'], ['Teal 100', '#E7F5F4'], ['Moxa Navy', '#082F49'], ['Cyan', '#40CBD0'], ['Orange', '#F39A61'], ['Ink', '#162F3A'], ['Muted', '#637781'], ['Line', '#D7E3E4'], ['Surface', '#F4F8F8']];
    for (const [name, hex] of colors) {
      const card = autoFrame(`Swatch / ${name}`, 'VERTICAL', { width: 240, padding: 16, gap: 12, radius: 8, fill: color.white, stroke: color.line });
      const swatch = figma.createRectangle(); swatch.resize(208, 96); swatch.cornerRadius = 4; swatch.fills = [solid(hexToRgb(hex))]; card.appendChild(swatch);
      card.appendChild(textNode(name, { size: 14, lineHeight: 20, style: 'Bold' }));
      card.appendChild(textNode(hex, { size: 12, lineHeight: 18, style: 'Medium', color: color.muted }));
      swatches.appendChild(card);
    }

    const typePage = pageCanvas(pages[PAGE_NAMES[4]], 'Helvetica Neue / Helvetica / Arial in implementation; Inter is the editable Figma fallback.');
    for (const definition of TEXT_STYLES) {
      const row = autoFrame(`Type specimen / ${definition.name}`, 'HORIZONTAL', { padding: 20, gap: 24, radius: 8, fill: color.white, stroke: color.line });
      const label = textNode(definition.name, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.tealDark, width: 220 }); row.appendChild(label);
      const specimen = textNode('Reliable industrial connectivity', { size: definition.size, lineHeight: definition.lineHeight, style: definition.style, color: color.ink, width: 900 }); row.appendChild(specimen);
      appendFill(typePage, row);
    }

    const spacingPage = pageCanvas(pages[PAGE_NAMES[5]], 'A 4px half-step and 8px-led spacing system inside a 1240px content container.');
    for (const value of [4, 8, 12, 16, 24, 32, 48, 64]) {
      const row = autoFrame(`Spacing / ${value}`, 'HORIZONTAL', { padding: 12, gap: 16, radius: 4, fill: color.white });
      row.appendChild(textNode(`${value}px`, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.muted, width: 72 }));
      const bar = figma.createRectangle(); bar.resize(value * 5, 16); bar.cornerRadius = 2; bar.fills = [solid(color.cyan)]; row.appendChild(bar);
      appendFill(spacingPage, row);
    }

    const radiusPage = pageCanvas(pages[PAGE_NAMES[6]], 'Implemented radius, elevation, and motion rules. Corners communicate hierarchy rather than decoration.');
    addMetricRow(radiusPage, [{ value: '4px', label: 'Small radius' }, { value: '8px', label: 'Medium radius' }, { value: '12px', label: 'Large radius' }, { value: '180ms', label: 'Default motion' }]);

    const imageryPage = pageCanvas(pages[PAGE_NAMES[7]], 'Use client-provided industrial imagery, clear product crops, and familiar functional icons.');
    for (const item of ['Product evidence: preserve ports, labels, and device proportions', 'Application imagery: show real industrial context', 'Icons: one visual family, descriptive accessible labels', 'Avoid generic decorative imagery when product evidence exists']) appendFill(imageryPage, textNode(`• ${item}`, { size: 18, lineHeight: 28, color: color.ink }));
  }

  function genericComponent(definition) {
    const component = figma.createComponent();
    component.name = `${definition.id} / ${definition.name}`;
    applyAutoLayoutSizing(component, 'VERTICAL', 520);
    component.paddingTop = 24; component.paddingRight = 24; component.paddingBottom = 24; component.paddingLeft = 24;
    component.itemSpacing = 12;
    component.cornerRadius = 8;
    component.fills = [solid(color.white)];
    component.strokes = [solid(color.line)];
    component.strokeWeight = 1;
    tag(component, 'phase3', `component/${definition.id}`);
    component.setSharedPluginData(NS, 'component_id', definition.id);
    component.description = `${definition.family}. Sitecore: ${definition.sitecoreRendering}. Selector: ${definition.selector}. Accessibility: ${definition.accessibility}`;
    appendFill(component, textNode(definition.name, { size: 20, lineHeight: 26, style: 'Bold', color: color.navy }));
    appendFill(component, textNode(definition.family, { size: 12, lineHeight: 16, style: 'Bold', color: color.tealDark, letterSpacing: 1.2, textCase: 'UPPER' }));
    appendFill(component, textNode(definition.responsive, { size: 14, lineHeight: 21, color: color.muted }));
    const states = autoFrame('States', 'HORIZONTAL', { padding: 0, gap: 8, radius: 0, fill: color.white }); states.layoutWrap = 'WRAP';
    for (const state of definition.states.slice(0, 8)) states.appendChild(chip(state));
    appendFill(component, states);
    appendFill(component, textNode(`Sitecore: ${definition.sitecoreRendering}`, { size: 12, lineHeight: 18, style: 'Medium', color: color.tealDark }));
    return component;
  }

  function buttonVariantSet(definition) {
    const styles = ['Primary', 'Secondary', 'Hero', 'Text'];
    const states = ['Default', 'Hover'];
    const variants = [];
    for (const styleName of styles) for (const state of states) {
      const component = figma.createComponent();
      component.name = `Style=${styleName}, State=${state}`;
      applyAutoLayoutSizing(component, 'HORIZONTAL');
      component.paddingTop = 14; component.paddingBottom = 14; component.paddingLeft = 20; component.paddingRight = 20; component.itemSpacing = 8; component.cornerRadius = 4;
      const isText = styleName === 'Text'; const isSecondary = styleName === 'Secondary';
      const fill = styleName === 'Hero' ? color.orange : (isSecondary || isText ? color.white : (state === 'Hover' ? color.tealDark : color.teal));
      component.fills = [solid(fill)];
      component.strokes = isSecondary ? [solid(color.teal)] : [];
      component.strokeWeight = isSecondary ? 1 : 0;
      component.appendChild(textNode(styleName === 'Text' ? 'Text link →' : 'Primary action', { size: 14, lineHeight: 20, style: 'Bold', color: isText || isSecondary || styleName === 'Hero' ? color.tealDark : color.white }));
      variants.push(component);
    }
    const set = figma.combineAsVariants(variants, figma.currentPage);
    set.name = `${definition.id} / ${definition.name}`;
    set.description = `Moxa action system. Sitecore: ${definition.sitecoreRendering}.`;
    applyAutoLayoutSizing(set, 'HORIZONTAL', 740);
    set.layoutWrap = 'WRAP'; set.counterAxisSpacing = 12; set.itemSpacing = 12;
    set.paddingTop = 16; set.paddingRight = 16; set.paddingBottom = 16; set.paddingLeft = 16;
    for (const variant of set.children) variant.layoutAlign = 'INHERIT';
    tag(set, 'phase3', `component/${definition.id}`); set.setSharedPluginData(NS, 'component_id', definition.id);
    return set;
  }

  function simpleVariantSet(definition, property, values) {
    const variants = [];
    for (const value of values) {
      const component = figma.createComponent();
      component.name = `${property}=${value}`;
      applyAutoLayoutSizing(component, 'VERTICAL', 420);
      component.paddingTop = 20; component.paddingRight = 20; component.paddingBottom = 20; component.paddingLeft = 20; component.itemSpacing = 10; component.cornerRadius = 8;
      component.fills = [solid(value === 'Open' || value === 'Selected' ? color.tealSoft : color.white)]; component.strokes = [solid(value === 'Error' ? color.orange : color.line)]; component.strokeWeight = 1;
      appendFill(component, textNode(definition.name, { size: 16, lineHeight: 22, style: 'Semi Bold', color: color.navy }));
      appendFill(component, textNode(value, { size: 12, lineHeight: 18, style: 'Bold', color: color.tealDark }));
      variants.push(component);
    }
    const set = figma.combineAsVariants(variants, figma.currentPage);
    set.name = `${definition.id} / ${definition.name}`;
    set.description = `${definition.family}. Sitecore: ${definition.sitecoreRendering}.`;
    applyAutoLayoutSizing(set, 'HORIZONTAL', 884);
    set.layoutWrap = 'WRAP'; set.counterAxisSpacing = 12; set.itemSpacing = 12;
    set.paddingTop = 16; set.paddingRight = 16; set.paddingBottom = 16; set.paddingLeft = 16;
    for (const variant of set.children) variant.layoutAlign = 'INHERIT';
    tag(set, 'phase3', `component/${definition.id}`); set.setSharedPluginData(NS, 'component_id', definition.id);
    return set;
  }

  async function ensureComponents(pages) {
    const output = {};
    const special = {
      'F-001': ['button'],
      'F-003': ['State', ['Default', 'Focus', 'Filled', 'Error']],
      'F-005': ['State', ['Default', 'Focus', 'Selected', 'Error']],
      'F-007': ['State', ['Unchecked', 'Checked', 'Focus', 'Error']],
      'N-003': ['State', ['Default', 'Selected']],
      'N-004': ['State', ['Closed', 'Open']],
      'C-002': ['Tone', ['Neutral', 'Brand', 'Success', 'Warning']],
      'C-003': ['Tone', ['Info', 'Success', 'Warning', 'Error']]
    };
    for (const definition of COMPONENT_DEFINITIONS) {
      const page = pages[definition.page];
      if (!page) throw new Error(`Missing component page: ${definition.page}`);
      await figma.setCurrentPageAsync(page);
      const existing = page.findOne(node => (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') && node.getSharedPluginData(NS, 'component_id') === definition.id);
      if (existing) { output[definition.id] = existing.id; continue; }
      const canvas = pageCanvas(page, 'Native Moxa components with anatomy, states, accessibility, responsive rules, and Sitecore mapping.');
      const gallery = componentGallery(canvas);
      let node;
      if (special[definition.id]?.[0] === 'button') node = buttonVariantSet(definition);
      else if (special[definition.id]) node = simpleVariantSet(definition, special[definition.id][0], special[definition.id][1]);
      else node = genericComponent(definition);
      gallery.appendChild(node); node.layoutAlign = 'INHERIT'; output[definition.id] = node.id;
    }
    return output;
  }

  function templateFrame(name, description, width = 400) {
    const frame = autoFrame(`Template / ${name}`, 'VERTICAL', { width, padding: 0, gap: 0, radius: 12, fill: color.white, stroke: color.line });
    frame.clipsContent = true;
    const header = autoFrame('Global Header', 'HORIZONTAL', { padding: 14, gap: 16, radius: 0, fill: color.white });
    header.appendChild(textNode('MOXA', { size: 18, lineHeight: 22, style: 'Extra Bold', color: color.teal }));
    header.appendChild(textNode('Search + Ask AI', { size: 11, lineHeight: 16, color: color.muted }));
    appendFill(frame, header);
    const nav = autoFrame('Primary Navigation', 'HORIZONTAL', { padding: 12, gap: 18, radius: 0, fill: color.white });
    for (const item of ['Products', 'Solutions', 'Resources']) nav.appendChild(textNode(item, { size: 10, lineHeight: 14, style: 'Semi Bold', color: color.ink }));
    appendFill(frame, nav);
    const hero = autoFrame('Hero', 'VERTICAL', { padding: 24, gap: 10, radius: 0, fill: color.tealSoft });
    appendFill(hero, textNode(name, { size: 26, lineHeight: 30, style: 'Bold', color: color.navy, width: width - 48 }));
    appendFill(hero, textNode(description, { size: 12, lineHeight: 18, color: color.muted, width: width - 48 }));
    hero.appendChild(chip('Primary action', color.teal, color.white));
    appendFill(frame, hero);
    const body = autoFrame('Configurable body', 'VERTICAL', { padding: 20, gap: 10, radius: 0, fill: color.white });
    for (const label of ['Section header', 'Evidence collection', 'Decision support', 'Contextual CTA']) {
      const block = autoFrame(label, 'VERTICAL', { padding: 12, gap: 4, radius: 6, fill: color.surface, stroke: color.line });
      appendFill(block, textNode(label, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.navy }));
      appendFill(body, block);
    }
    appendFill(frame, body);
    const footer = autoFrame('Global Footer', 'HORIZONTAL', { padding: 16, gap: 18, radius: 0, fill: color.navy });
    footer.appendChild(textNode('Follow Moxa', { size: 10, lineHeight: 14, style: 'Bold', color: color.white }));
    footer.appendChild(textNode('Stay Connected', { size: 10, lineHeight: 14, style: 'Bold', color: color.white }));
    appendFill(frame, footer);
    return frame;
  }

  async function ensurePatternsAndTemplates(pages) {
    const patternPages = PAGE_NAMES.slice(21, 26);
    const patternExamples = {
      '22 — Shared Shell Patterns': ['Global Header', 'Breadcrumb + Anchor Nav', 'Lead Capture + Footer'],
      '23 — Product Discovery Patterns': ['Homepage', 'Search Results', 'Product Category'],
      '24 — Product Detail Patterns': ['Product Series', 'Product Model', 'NPort 5100'],
      '25 — Campaign & Microsite Patterns': ['Campaign', 'Microsite', 'Campaign Pop-up'],
      '26 — Support, Manual & Media Patterns': ['HXML Manual', 'Video Collection', 'AI Comparison', 'Product Media']
    };
    for (const name of patternPages) {
      const page = pages[name]; await figma.setCurrentPageAsync(page); const canvas = pageCanvas(page, 'Reusable compositions assembled from governed Moxa components.');
      if (!canvas.findOne(node => node.getSharedPluginData(NS, 'key') === `pattern/${name}`)) {
        const gallery = autoFrame('Pattern gallery', 'HORIZONTAL', { width: 1312, padding: 0, gap: 20, radius: 0, fill: color.surface });
        gallery.layoutWrap = 'WRAP'; gallery.counterAxisSpacing = 20; tag(gallery, 'phase4', `pattern/${name}`);
        for (const example of patternExamples[name]) {
          const preview = templateFrame(example, 'A reusable composition with shared spacing, interaction, accessibility, analytics, and datasource responsibilities.', 400);
          gallery.appendChild(preview); preview.layoutAlign = 'INHERIT';
        }
        appendFill(canvas, gallery);
      }
    }

    const templatePage = pages['27 — Page Templates / 12 Types']; await figma.setCurrentPageAsync(templatePage); const templateCanvas = pageCanvas(templatePage, 'Twelve configurable page templates. Product Model covers both LV and HV routes; Campaign Pop-up is a governed composition.');
    const templates = ['Homepage', 'Search Results', 'Product Category', 'Product Series', 'Product Model', 'Campaign', 'Campaign Pop-up', 'Microsite', 'Video', 'HXML Manual', 'AI Comparison', 'Product Media'];
    const templateGallery = autoFrame('Template gallery', 'HORIZONTAL', { width: 1312, padding: 0, gap: 20, radius: 0, fill: color.surface });
    templateGallery.layoutWrap = 'WRAP'; templateGallery.counterAxisSpacing = 20; appendFill(templateCanvas, templateGallery);
    for (const name of templates) {
      const preview = templateFrame(name, 'Shared shell plus configurable evidence, guidance, and conversion modules.', 400);
      templateGallery.appendChild(preview); preview.layoutAlign = 'INHERIT';
    }

    const routePage = pages['28 — Route Coverage / 13 Routes']; await figma.setCurrentPageAsync(routePage); const routeCanvas = pageCanvas(routePage, 'Every PoC route mapped to a governed page template and shared shell.');
    if (!routeCanvas.findOne(node => node.getSharedPluginData(NS, 'key') === 'route/coverage')) {
      const table = autoFrame('Route coverage matrix', 'VERTICAL', { padding: 0, gap: 1, radius: 8, fill: color.line, stroke: color.line }); tag(table, 'phase4', 'route/coverage');
      for (const route of ROUTE_DEFINITIONS) { const row=autoFrame(`Route / ${route.id}`,'HORIZONTAL',{padding:16,gap:16,radius:0,fill:color.white}); row.appendChild(textNode(route.id,{size:12,lineHeight:18,style:'Bold',color:color.tealDark,width:64})); row.appendChild(textNode(route.type,{size:14,lineHeight:20,style:'Semi Bold',width:180})); row.appendChild(textNode(route.file,{size:13,lineHeight:20,color:color.muted,width:360})); row.appendChild(chip(route.status)); appendFill(table,row); }
      appendFill(routeCanvas, table);
    }

    const a11yPage = pages['29 — Accessibility & Content Guidance']; await figma.setCurrentPageAsync(a11yPage); const a11yCanvas = pageCanvas(a11yPage, 'Component acceptance rules for keyboard, focus, contrast, structure, motion, and evidence.');
    for (const item of ['44px minimum target for primary controls', '3px Cyan focus ring with 3px offset', 'Keyboard and Escape behavior for overlays and navigation', 'Captions and scoped headers for data tables', 'Explicit sources immediately below AI answers', 'Reduced motion preserves final values and state']) appendFill(a11yCanvas, textNode(`✓ ${item}`, { size: 18, lineHeight: 28, style: 'Semi Bold', color: color.navy }));

    const sitecorePage = pages['30 — Sitecore Mapping & Governance']; await figma.setCurrentPageAsync(sitecorePage); const sitecoreCanvas = pageCanvas(sitecorePage, 'Figma → HTML/CSS/JavaScript → Sitecore rendering → datasource mapping.');
    if (!sitecoreCanvas.findOne(node => node.getSharedPluginData(NS, 'key') === 'sitecore/crosswalk')) {
      const list = autoFrame('Sitecore crosswalk', 'VERTICAL', { padding: 0, gap: 12, radius: 0, fill: color.surface }); tag(list, 'phase4', 'sitecore/crosswalk');
      for (const mapping of SITECORE_MAPPINGS) { const card=autoFrame(`Mapping / ${mapping.id}`,'VERTICAL',{padding:20,gap:6,radius:8,fill:color.white,stroke:color.line});appendFill(card,textNode(`${mapping.id} · ${mapping.figmaPattern}`,{size:16,lineHeight:22,style:'Bold',color:color.navy}));appendFill(card,textNode(`${mapping.implementation} → ${mapping.rendering} → ${mapping.datasource}`,{size:13,lineHeight:20,color:color.muted}));appendFill(list,card); }
      appendFill(sitecoreCanvas, list);
    }

    const changePage = pages['31 — Changelog & Open Decisions']; await figma.setCurrentPageAsync(changePage); const changeCanvas = pageCanvas(changePage, 'Release status, constraints, and future production decisions.');
    appendFill(changeCanvas, textNode('v1.0 · 2026-07-20 · PoC operational baseline', { size: 24, lineHeight: 32, style: 'Bold', color: color.navy }));
    appendFill(changeCanvas, textNode('Backup Starter plan: theme and responsive modes use separate single-mode collections. Implementation services for search, CRM, and AI remain integration-ready, not production-connected.', { size: 16, lineHeight: 25, color: color.muted, width: 1080 }));
  }

  async function fitAllPages(pages) {
    for (const page of Object.values(pages)) {
      await figma.setCurrentPageAsync(page);
      const canvas = page.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `canvas/${page.name}`);
      if (canvas) figma.viewport.scrollAndZoomIntoView([canvas]);
    }
  }

  async function main() {
    await loadFonts();
    const collections = await ensureCollections();
    const styles = await ensureStyles();
    const pages = await ensurePages();
    await resetGeneratedCanvases(pages);
    for (const page of Object.values(pages)) { await figma.setCurrentPageAsync(page); pageCanvas(page, 'Moxa PoC Operational Design System v1.0'); }
    addFoundationDocumentation(pages);
    const components = await ensureComponents(pages);
    await ensurePatternsAndTemplates(pages);
    await fitAllPages(pages);
    figma.root.setSharedPluginData(NS, 'run_id', RUN_ID);
    figma.root.setSharedPluginData(NS, 'version', '1.0.0');
    figma.root.setSharedPluginData(NS, 'status', 'complete');
    try { await figma.saveVersionHistoryAsync('Moxa Operational Design System v1.0', 'Variables, styles, 54 components, 12 page templates, 13-route coverage, and Sitecore mapping.'); } catch (error) { /* Starter plans may not expose version history. */ }
    await figma.setCurrentPageAsync(pages[PAGE_NAMES[0]]);
    figma.viewport.scrollAndZoomIntoView(pages[PAGE_NAMES[0]].children);
    figma.closePlugin(`Moxa Design System created: ${Object.keys(collections).length} collections, ${Object.keys(components).length} components, ${PAGE_NAMES.length} pages.`);
  }

  main().catch(error => figma.closePlugin(`Moxa Builder failed: ${error.message}`));
}

export async function buildPlugin() {
  const manifest = {
    name: 'Moxa Design System Builder',
    id: '154220260720001',
    api: '1.0.0',
    main: 'code.js',
    editorType: ['figma'],
    documentAccess: 'dynamic-page',
    networkAccess: { allowedDomains: ['none'] }
  };
  const declarations = [
    `const COLLECTIONS = ${JSON.stringify(collections)};`,
    `const PAGE_NAMES = ${JSON.stringify(pageNames)};`,
    `const COMPONENT_DEFINITIONS = ${JSON.stringify(componentDefinitions)};`,
    `const ROUTE_DEFINITIONS = ${JSON.stringify(routeDefinitions)};`,
    `const SITECORE_MAPPINGS = ${JSON.stringify(sitecoreMappings)};`,
    `const TEXT_STYLES = ${JSON.stringify(textStyles)};`,
    `const EFFECT_STYLES = ${JSON.stringify(effectStyles)};`,
    `const GRID_STYLES = ${JSON.stringify(gridStyles)};`
  ].join('\n');
  const code = `'use strict';\n${declarations}\n(${pluginRuntime.toString()})();\n`;
  await fs.writeFile(path.join(directory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await fs.writeFile(path.join(directory, 'code.js'), code);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await buildPlugin();
