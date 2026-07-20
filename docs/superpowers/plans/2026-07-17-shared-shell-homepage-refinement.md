# Shared Shell and Homepage Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver one card-based global header and compact consent-aware global footer across all 13 PoC routes, and update the Homepage body to satisfy every item in the 17 July review document.

**Architecture:** The shared shell remains generated and controlled by `assets/js/moxa-shell.js`, with reusable responsive styling in `assets/css/moxa-ds.css`. Homepage-specific structure and style remain duplicated intentionally in `homepage.html` and `index.html`; the static synchronization tool publishes the tested source into the handoff site and GitHub branch.

**Tech Stack:** Static HTML5, CSS custom properties, vanilla JavaScript, Node.js built-in test runner, existing static-review synchronization tool.

## Global Constraints

- Preserve the exact 13-route PoC scope plus `index.html`.
- Reuse existing Moxa assets; do not introduce placeholder imagery, custom SVG drawings, or new backend dependencies.
- Preserve the approved hero, campaign pop-up, second-screen AI search, floating Homepage navigator, chatbot launcher, breadcrumbs, and existing route destinations.
- Keep static shared footer markup in every route for SitecoreAI authoring.
- Keep `Global / English` selected by default.
- Support desktop pointer and keyboard interaction, mobile navigation, and `prefers-reduced-motion`.

---

### Task 1: Add failing global shell and Homepage review contracts

**Files:**
- Modify: `tests/design-system-shell.test.js`
- Modify: `tests/homepage-scheme-a.test.js`
- Modify: `tests/homepage-connectivity-motion.test.js`
- Modify: `tests/static-review-sync.test.js`

**Interfaces:**
- Consumes: current static HTML, `assets/js/moxa-shell.js`, and `assets/css/moxa-ds.css`.
- Produces: explicit contract checks for the four-card menu, navigation state behavior, shared footer copy, Homepage card body copy, badge removal, approved image, controlled typography, and star motion.

- [ ] **Step 1: Write the failing tests**

Add assertions equivalent to:

```js
assert.match(shell, /moxa-mega-intro/);
assert.match(shell, /moxa-mega-category-card/);
assert.equal((shell.match(/class="moxa-mega-category-card"/g) || []).length >= 3, true);
assert.match(shell, /pointerenter/);
assert.match(shell, /pointerleave/);
assert.match(shell, /Stay informed with product news, application stories, and industrial networking insights\./);
assert.match(homepage, /class="explore-card-body"/);
assert.doesNotMatch(homepage, /featured-badge/);
assert.match(homepage, /connectivity-stars/);
```

Update the expected core contract count by the exact number of newly added tests.

- [ ] **Step 2: Run the targeted tests and verify RED**

Run:

```bash
node --test tests/design-system-shell.test.js tests/homepage-scheme-a.test.js tests/homepage-connectivity-motion.test.js tests/static-review-sync.test.js
```

Expected: FAIL because the new card classes, consent copy, Homepage card body, removed badge, and star layer do not yet exist.

---

### Task 2: Implement the shared card-based header and interaction model

**Files:**
- Modify: `assets/js/moxa-shell.js`
- Modify: `assets/css/moxa-ds.css`

**Interfaces:**
- Consumes: `megaColumns`, `megaMeta`, `megaMarkup(label)`, `initializeNavigation()`.
- Produces: `moxa-mega-intro`, three `moxa-mega-category-card` elements per menu, and synchronized hover/click/keyboard open state.

- [ ] **Step 1: Replace the menu presentation with the reference card hierarchy**

Generate the menu with this stable structure:

```html
<div class="moxa-mega">
  <div class="moxa-mega-card-grid">
    <article class="moxa-mega-intro">...</article>
    <section class="moxa-mega-category-card">...</section>
    <section class="moxa-mega-category-card">...</section>
    <section class="moxa-mega-category-card">...</section>
  </div>
</div>
```

Use the existing link arrays and Moxa route destinations. The intro card uses the menu description and guided CTA; the three category cards use the existing column titles and links.

- [ ] **Step 2: Implement desktop hover while retaining explicit click and close behavior**

Use one timer so pointer movement from trigger to panel does not flicker:

```js
let hoverCloseTimer = 0;
function setNavigationTrigger(button, open) {
  closeNavigation(open ? button : null);
  button?.setAttribute("aria-expanded", open ? "true" : "false");
}
item.addEventListener("pointerenter", () => {
  window.clearTimeout(hoverCloseTimer);
  if (window.matchMedia("(min-width: 769px)").matches) setNavigationTrigger(button, true);
});
item.addEventListener("pointerleave", () => {
  hoverCloseTimer = window.setTimeout(() => setNavigationTrigger(button, false), 120);
});
```

Keep outside pointer, scroll, Escape, and one-open-menu behavior.

- [ ] **Step 3: Style the reference card layout and responsive fallback**

Use a centered desktop panel with four columns, 22-28px radius, restrained shadow, teal-soft intro card, white category cards, and arrow affordances. At tablet widths use two columns; below 768px hide the desktop panel and retain the current mobile drawer.

- [ ] **Step 4: Run the shell tests and verify GREEN**

Run:

```bash
node --test tests/design-system-shell.test.js
```

Expected: PASS.

---

### Task 3: Implement the compact shared footer across all routes

**Files:**
- Modify: `assets/js/moxa-shell.js`
- Modify: `assets/css/moxa-ds.css`
- Modify: `homepage.html`
- Modify: `index.html`
- Modify: the remaining 12 deployable route HTML files through the static footer synchronization script or a deterministic shared replacement.

**Interfaces:**
- Consumes: `footerMarkup`, `.moxa-footer-top`, `.moxa-subscribe-row`, `.moxa-subscribe-form`.
- Produces: one identical authorable footer per route with restored explanatory copy and the default locale.

- [ ] **Step 1: Update the shared footer markup**

Use this exact secondary copy:

```html
<p>Stay informed with product news, application stories, and industrial networking insights.</p>
<p class="moxa-subscribe-consent">Sign up for the latest updates on Moxa solutions. At Moxa, we have a healthy respect for privacy and will not share your email with anyone.</p>
```

Keep the four social icons, email field, Sign Up, legal links, locale label, and `Global / English` selected.

- [ ] **Step 2: Reduce the footer height and soften secondary text**

Constrain the desktop form width, use a compact grid, set secondary copy to the shared muted gray token, and preserve accessible contrast. Stack the footer at the existing mobile breakpoint.

- [ ] **Step 3: Synchronize the static fallback markup into all route files**

Replace each existing `<footer class="moxa-global-footer" ...>` block with the new shared markup so JavaScript enhancement and authorable HTML remain identical.

- [ ] **Step 4: Run the footer contracts and verify GREEN**

Run:

```bash
node --test tests/design-system-shell.test.js
```

Expected: PASS for all 13 core routes.

---

### Task 4: Apply every Homepage body correction

**Files:**
- Modify: `homepage.html`
- Modify: `index.html`

**Interfaces:**
- Consumes: current Homepage module IDs and assets.
- Produces: identical approved Homepage modules in both entry files.

- [ ] **Step 1: Refine the AI search typography**

Reduce the desktop title scale and set a controlled text measure so `Let me know what you want.` occupies no more than two lines at 1435px while remaining fluid on mobile.

- [ ] **Step 2: Convert Explore Now cards to image-plus-copy cards**

Keep current Homepage subjects and images. Add body copy and preserve CTA:

```html
<div class="explore-card-body">
  <span class="content-type">...</span>
  <h3>...</h3>
  <p>...</p>
  <span class="home-text-link">...</span>
</div>
```

Use balanced card heights and prevent an orphaned final title word at desktop widths.

- [ ] **Step 3: Correct Featured Products**

Remove the `featured-badge` element and rule. Retain the approved existing Moxa Homepage image asset, current DA-920E title, three feature points, and CTA. Reduce the title scale to approximately `clamp(1.75rem, 2.8vw, 2.65rem)` with controlled line length.

- [ ] **Step 4: Add the star-like Connectivity background**

Add a decorative raster-backed or existing-asset layer named `connectivity-stars`, preserve the current gradient and glass cards, and animate opacity/scale subtly. Disable nonessential animation under `prefers-reduced-motion`.

- [ ] **Step 5: Reduce the Connectivity title and footer transition height**

Constrain the title to a two-line desktop measure, keep mobile wrapping natural, and remove excess bottom whitespace without colliding with the campaign pop-up.

- [ ] **Step 6: Keep `homepage.html` and `index.html` byte-equivalent**

Copy the tested Homepage output deterministically so both files contain the same markup, styles, and scripts.

- [ ] **Step 7: Run Homepage tests and verify GREEN**

Run:

```bash
node --test tests/homepage-scheme-a.test.js tests/homepage-connectivity-motion.test.js tests/homepage-header.test.js tests/homepage-content.test.js
```

Expected: PASS.

---

### Task 5: Full verification, visual QA, synchronization, and publication

**Files:**
- Modify: `design-qa.md`
- Modify: `tools/sync-static-review-repo.mjs` only if the expected test count changes.
- Update: `../deliverables/Moxa_SitecoreAI_Handoff_20260717/site/`
- Update: `../deliverables/Moxa_All_HTML_13_Routes_20260717/`

**Interfaces:**
- Consumes: all completed source files and tests.
- Produces: verified canonical site, refreshed handoff zips, feature-branch Git commit, and updated GitHub Pages content after approval/publication.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
node --test tests/*.test.js
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Run static synchronization dry-run and apply**

Run the existing tool first without `--apply`, inspect its plan, then apply to the canonical `site` directory and the Git branch target. The expected core contract count must match the latest tests.

- [ ] **Step 3: Capture matching visual states**

At the same 1435px desktop viewport capture:

- supplied reference HTML with Products menu open;
- revised Homepage with Products menu open;
- revised Homepage AI search, Explore Now, Featured Products, Connectivity, and footer;
- revised Homepage mobile header, modules, and footer.

- [ ] **Step 4: Complete blocking design QA**

Place reference and implementation captures in the same comparison artifact. Record typography, spacing, colors, image fidelity, copy, interaction checks, and any iteration history in `design-qa.md`. Fix all P0-P2 findings and set `final result: passed` only after the final comparison.

- [ ] **Step 5: Refresh delivery archives**

Update both the full SitecoreAI handoff archive and the 13-route HTML-only archive using the verified canonical site.

- [ ] **Step 6: Commit and publish**

Commit the source and synchronized GitHub files on `agent/shared-shell-homepage-0717`, push the branch, and update `main` only through the established approved publication path.

## Plan self-review

- Spec coverage: Header, Footer, Homepage body, all 13 routes, interaction, reduced motion, static authoring, tests, visual QA, handoff archives, and GitHub publication are each assigned to a task.
- Placeholder scan: no deferred implementation markers remain.
- Interface consistency: shared classes and functions named in tests match the implementation tasks; Homepage and `index.html` remain synchronized.
