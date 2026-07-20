# Moxa Operational Design System and Figma Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an editable native Figma library, a complete English visual handbook, and a Sitecore-ready design-system handoff grounded in the latest 13-route Moxa PoC.

**Architecture:** Treat the deployed PoC as the implementation source of truth. Extract implementation tokens and component patterns into machine-readable manifests, reproduce them as scoped Figma variables and auto-layout component sets, compose documented templates, then generate an HTML/PDF handbook and crosswalk files from the same manifests. Keep code, Figma, and Sitecore naming connected through stable IDs and explicit mappings.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript, JSON, CSV, Figma Plugin API, Figma variables/styles/components, Playwright or Chromium PDF export, Git.

## Global Constraints

- Figma file name: `Moxa PoC Operational Design System v1.0`.
- Source baseline: Git commit `8cf7de1` plus the approved specification at `docs/superpowers/specs/2026-07-20-moxa-operational-design-system-figma-library-design.md`.
- Scope: 12 page types and 13 routes.
- Font stack: `Helvetica Neue`, Helvetica, Arial, sans-serif.
- Content width: `1240px`.
- Core spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 px.
- All Figma variables require explicit scopes and WEB code syntax.
- All Figma components use auto layout and variable bindings unless geometry is intentionally fixed.
- Figma writes are sequential; no parallel mutation calls.
- Deliverables are in English.
- No Sitecore backend installation is included.

---

### Task 1: Build the Code-Side Audit and Manifests

**Files:**
- Create: `handoff/design-system-v1/tokens.json`
- Create: `handoff/design-system-v1/component-inventory.csv`
- Create: `handoff/design-system-v1/route-template-matrix.csv`
- Create: `handoff/design-system-v1/sitecore-crosswalk.csv`
- Create: `handoff/design-system-v1/gap-analysis.md`
- Create: `handoff/design-system-v1/version-manifest.json`
- Read: `assets/css/moxa-ds.css`
- Read: `assets/css/*.css`
- Read: `assets/js/moxa-shell.js`
- Read: `assets/js/moxa-lead-form.js`
- Read: all 13 route HTML files

**Interfaces:**
- Consumes: approved specification and deployed PoC implementation.
- Produces: stable token, component, route, and Sitecore identifiers used by every later task.

- [ ] **Step 1: Extract shared CSS variables and normalize values**

  Record primitive value, semantic role, CSS name, Figma name, scope, mode, and source file.

- [ ] **Step 2: Inventory shared and page-specific components**

  Each CSV row must include `component_id,name,family,scope,html_selector,js_module,states,responsive_behavior,accessibility,figma_page,sitecore_rendering,status`.

- [ ] **Step 3: Verify the twelve-page-type / thirteen-route mapping**

  Verify each route file exists and identify shared shell, shared presentation patterns, and route-specific patterns.

- [ ] **Step 4: Write the Sitecore crosswalk and gap analysis**

  Record conflicts between the current CSS, earlier visual guide, and required accessible state. Resolve each conflict explicitly.

- [ ] **Step 5: Validate manifest syntax and coverage**

  Run:

  ```bash
  node -e "JSON.parse(require('fs').readFileSync('handoff/design-system-v1/tokens.json')); JSON.parse(require('fs').readFileSync('handoff/design-system-v1/version-manifest.json')); console.log('JSON OK')"
  ```

  Expected: `JSON OK`.

- [ ] **Step 6: Commit the audit manifests**

  ```bash
  git add handoff/design-system-v1
  git commit -m "docs: add design system audit manifests"
  ```

### Task 2: Complete Figma Phase 0 Discovery

**Files:**
- Modify: `handoff/design-system-v1/gap-analysis.md`
- Create: `handoff/design-system-v1/figma-manifest.json`

**Interfaces:**
- Consumes: Task 1 manifests and authenticated Figma account/library discovery.
- Produces: chosen plan key, file key, library decisions, and locked v1 Figma scope.

- [ ] **Step 1: Validate the authenticated Figma account and available plans**

  Use `figma_whoami`; if multiple plans exist, pause for a plan decision.

- [ ] **Step 2: Create the design file only after plan selection**

  Create `Moxa PoC Operational Design System v1.0` as a Figma design file.

- [ ] **Step 3: Inspect local pages, variables, styles, and components**

  The new file should contain no design-system objects yet.

- [ ] **Step 4: Discover available libraries and search for compatible assets**

  Search for buttons, form controls, icons, navigation, cards, tables, and modal patterns. Record reuse, wrap, or rebuild decisions.

- [ ] **Step 5: Publish the Phase 0 gap analysis in chat and manifest**

  Include code-only items, Figma-only items, conflicts, resolutions, exact token count, and exact component count.

### Task 3: Create Figma Foundations

**Files:**
- Modify: `handoff/design-system-v1/figma-manifest.json`

**Interfaces:**
- Consumes: token manifest and Phase 0 file key.
- Produces: Figma collections, variables, text styles, effect styles, and grid styles referenced by components.

- [ ] **Step 1: Create primitive and semantic variable collections**

  Create collections in the approved order and alias semantics to primitives.

- [ ] **Step 2: Apply explicit scopes and WEB code syntax**

  Use the exact CSS custom-property syntax, for example `var(--moxa-teal)`.

- [ ] **Step 3: Create text, effect, and grid styles**

  Load the available Helvetica/Arial font before writing text. Use the nearest available approved fallback only if Helvetica Neue is unavailable, and record the decision.

- [ ] **Step 4: Validate variable and style metadata**

  Record collection IDs, variable IDs, modes, style IDs, and validation results in `figma-manifest.json`.

- [ ] **Step 5: Print the Phase 1 variable and style summary**

  Report exact collection, variable, mode, text-style, effect-style, and grid-style counts.

### Task 4: Build Figma File Structure and Foundation Documentation

**Files:**
- Modify: `handoff/design-system-v1/figma-manifest.json`

**Interfaces:**
- Consumes: Task 3 variables and styles.
- Produces: ordered Figma pages and visual foundation specimens.

- [ ] **Step 1: Create the 31-page skeleton from the approved specification**

- [ ] **Step 2: Build cover, getting-started, principles, and foundation documentation frames**

- [ ] **Step 3: Add color, typography, spacing, grid, radius, elevation, motion, icon, and imagery specimens**

- [ ] **Step 4: Validate each foundation page with metadata and screenshots**

- [ ] **Step 5: Store page IDs and screenshot references in the Figma manifest**

### Task 5: Build and Validate Reusable Figma Components

**Files:**
- Modify: `handoff/design-system-v1/figma-manifest.json`
- Modify: `handoff/design-system-v1/component-inventory.csv`

**Interfaces:**
- Consumes: foundation variables/styles and stable component IDs.
- Produces: editable component sets used by patterns and templates.

- [ ] **Step 1: Build actions and input components**

  Button, link, search, text field, select, textarea, checkbox/consent, validation, and helper text.

- [ ] **Step 2: Build navigation components**

  Header, mega menu, breadcrumb, sticky anchor navigation, floating navigator, and locale selector.

- [ ] **Step 3: Build content and card components**

  Section header, labels, badges, alerts, product/resource/application/video/metric/contact cards.

- [ ] **Step 4: Build disclosure, data, media, conversion, and AI components**

  Accordion, tabs, modal, specification table, comparison table, search-result patterns, hero family, video, 360 controls, lead form, footer, Ask AI, and Advisor conversation blocks.

- [ ] **Step 5: Validate every component set**

  For each component: inspect metadata, verify variant count and bindings, capture a screenshot, and update the inventory status.

### Task 6: Compose Patterns, Templates, and Coverage Boards

**Files:**
- Modify: `handoff/design-system-v1/figma-manifest.json`
- Modify: `handoff/design-system-v1/route-template-matrix.csv`

**Interfaces:**
- Consumes: Task 5 component instances.
- Produces: shared-shell patterns, product/campaign/support patterns, 12 page templates, and a 13-route coverage board.

- [ ] **Step 1: Compose shared shell and product discovery patterns**

- [ ] **Step 2: Compose product detail, campaign, microsite, manual, video, AI comparison, and 360 patterns**

- [ ] **Step 3: Compose twelve annotated page-type templates**

- [ ] **Step 4: Build the thirteen-route coverage matrix**

- [ ] **Step 5: Add accessibility, content, Sitecore, governance, and changelog boards**

- [ ] **Step 6: Validate all pattern and template pages with metadata and screenshots**

### Task 7: Generate the Visual Handbook and Joni Package

**Files:**
- Create: `design-system-v1.html`
- Create: `handoff/design-system-v1/MOXA_DESIGN_SYSTEM_V1.md`
- Create: `handoff/design-system-v1/README.md`
- Create: `handoff/design-system-v1/FIGMA_LINK.md`
- Create: `/Users/christinaliu/Documents/Moxa/20260714 POC readiness/deliverables/Moxa_Design_System_v1_20260720/Moxa_Operational_Design_System_v1.0.pdf`
- Copy: manifests, approved screenshots, and supporting visual assets into the deliverable directory.

**Interfaces:**
- Consumes: Tasks 1–6 manifests and Figma screenshots.
- Produces: English HTML/PDF handbook and complete Joni handoff package.

- [ ] **Step 1: Build the self-contained visual handbook**

  Include approximately 26–32 sections covering principles, foundations, component anatomy and states, patterns, templates, coverage, accessibility, Sitecore mapping, and governance.

- [ ] **Step 2: Render the HTML handbook and visually inspect every page/section**

- [ ] **Step 3: Export the PDF and verify page count, text, images, and clipping**

- [ ] **Step 4: Write the English README and Figma-link handoff**

- [ ] **Step 5: Package all source and export files**

### Task 8: Final QA, Versioning, and Delivery

**Files:**
- Modify: `handoff/design-system-v1/version-manifest.json`
- Create: `handoff/design-system-v1/QA_REPORT.md`
- Create: `/Users/christinaliu/Documents/Moxa/20260714 POC readiness/deliverables/Moxa_Design_System_v1_20260720.zip`

**Interfaces:**
- Consumes: all completed artifacts.
- Produces: verified final package, Figma URL, local file links, and release summary.

- [ ] **Step 1: Run Figma naming, binding, accessibility, and unresolved-state audits**

- [ ] **Step 2: Validate JSON, CSV column counts, route coverage, local links, and PDF render**

- [ ] **Step 3: Record known PoC simulation boundaries**

- [ ] **Step 4: Create the release ZIP and checksums**

- [ ] **Step 5: Commit the complete handoff**

  ```bash
  git add design-system-v1.html handoff/design-system-v1 docs/superpowers/plans/2026-07-20-moxa-operational-design-system-figma-library.md
  git commit -m "docs: deliver Moxa operational design system v1"
  ```

- [ ] **Step 6: Deliver the Figma URL, handbook, package, and summary to the user**

