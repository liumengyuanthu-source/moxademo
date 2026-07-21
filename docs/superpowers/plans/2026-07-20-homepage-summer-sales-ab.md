# Homepage Summer Sales Image-first A/B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Summer Sales A/B hero as image-first artwork, restore the formal homepage Explore Now content, and preserve the current combined experiment in a portable embedded HTML archive.

**Architecture:** A focused artwork page renders two deterministic 1916 × 821 banner frames to PNG. The formal homepage uses those images plus semantic hotspots; a Node packaging tool snapshots the current combined-experience page before rollback and converts local rendering dependencies to data URLs.

**Tech Stack:** HTML/CSS, vanilla JavaScript, Node.js, Playwright, Python `unittest`.

## Global Constraints

- Use the approved Summer Sales copy exactly.
- Version A CTA is orange `Inquire Now`; Version B CTA is Moxa-green `Contact an Expert`.
- The two artwork files differ only in CTA wording and color.
- Formal Explore Now restores Machine OEM Solutions and Remote I/O.
- The standalone archive retains Rail/Power Explore switching and the three analytics dimensions.
- Banner artwork is 1916 × 821 and follows the existing image-first hero system.
- Do not commit, push, or deploy before explicit user confirmation.

---

### Task 1: Lock the revised content contract

**Files:**
- Modify: `tests/test_homepage_third_banner_contract.py`
- Create: `tests/test_homepage_embedded_archive_contract.py`

**Interfaces:**
- Consumes: `homepage.html`, `standalone/homepage-summer-sales-ab-embedded.html`.
- Produces: assertions for image-first artwork, restored Explore cards, embedded assets, stable A/B URLs, and split tracking.

- [ ] **Step 1: Write failing formal-homepage tests**

Assert that `homepage.html` references both `banner/homepage-summer-sales-*.png`, contains the original manufacturing and Remote I/O copy, and no longer filters Explore cards by `data-active-experience`.

- [ ] **Step 2: Write failing archive tests**

Assert that the archive exists, contains Rail and Power variants, contains `experiment_top_cta`, `experiment_explore_content`, and `experience_variant`, and contains no local `src`, stylesheet `href`, or script `src` dependencies.

- [ ] **Step 3: Verify RED**

Run: `python3 -m unittest tests.test_homepage_third_banner_contract tests.test_homepage_embedded_archive_contract -v`

Expected: FAIL because the artwork, rollback, and archive do not yet exist.

### Task 2: Preserve the current combined experience as one embedded file

**Files:**
- Create: `tools/build_embedded_homepage_archive.js`
- Create: `standalone/homepage-summer-sales-ab-embedded.html`

**Interfaces:**
- Consumes: current pre-rollback `homepage.html`, linked local CSS/JS, and local render images.
- Produces: one self-contained HTML file that opens over `file://`.

- [ ] **Step 1: Implement dependency embedding**

The tool reads `homepage.html`, replaces local stylesheet and script tags with inline contents, converts local CSS `url(...)` references and HTML image `src` values to MIME-correct base64 `data:` URLs, and leaves HTTPS navigation destinations unchanged.

- [ ] **Step 2: Build the archive before changing Explore Now**

Run: `node tools/build_embedded_homepage_archive.js`

Expected: `standalone/homepage-summer-sales-ab-embedded.html` exists and has no local rendering dependency.

- [ ] **Step 3: Verify archive tests pass**

Run: `python3 -m unittest tests.test_homepage_embedded_archive_contract -v`

Expected: PASS.

### Task 3: Create image-first Summer Sales artwork

**Files:**
- Create: `tools/homepage-summer-sales-banner-artwork.html`
- Create: `tools/render_homepage_summer_sales_artwork.js`
- Create: `banner/homepage-summer-sales-a.png`
- Create: `banner/homepage-summer-sales-b.png`

**Interfaces:**
- Consumes: `img/scenario-energy.jpg`, `?variant=A|B`.
- Produces: two 1916 × 821 PNG files with identical composition and isolated CTA differences.

- [ ] **Step 1: Build the artwork frame**

Use the established light Moxa hero grammar: white left message field, teal eyebrow and accent, dark ink headline, right-side arched energy scene, four circular value icons, thin cyan guide curves, and one primary CTA at the same location as the first two homepage banners.

- [ ] **Step 2: Render both deterministic variants**

Run: `node tools/render_homepage_summer_sales_artwork.js`

Expected: both PNG files are exactly 1916 × 821; pixel differences are limited to the CTA region.

- [ ] **Step 3: Inspect both images**

Review the two source PNGs at original resolution and confirm hierarchy, crop, text legibility, consistent geometry, and correct CTA colors.

### Task 4: Update the formal homepage

**Files:**
- Modify: `homepage.html`
- Modify: `tests/test_homepage_third_banner_contract.py`

**Interfaces:**
- Consumes: the two rendered artwork files.
- Produces: image-first Summer Sales slides and restored Explore Now cards.

- [ ] **Step 1: Replace Summer Sales desktop rendering**

Point A/B hero images to their matching artwork, hide the desktop semantic copy, and add CTA hotspots with the existing experiment attributes. Keep the accessible HTML overlay for screens at or below 760px.

- [ ] **Step 2: Restore Explore Now**

Restore `img/scenario-manufacturing.jpg` and `img/family-edge.jpg`, the Machine OEM/Remote I/O titles and body copy, and the original destinations. Remove Explore variant filtering from the formal homepage.

- [ ] **Step 3: Keep hero-only experiment routing**

`?experience=A|B` continues to lock the correct Summer Sales hero and stop auto-rotation, but no longer changes formal Explore content.

- [ ] **Step 4: Verify GREEN**

Run: `python3 -m unittest tests.test_homepage_third_banner_contract -v`

Expected: PASS.

### Task 5: Visual and regression verification

**Files:**
- Modify: `tools/capture_homepage_summer_ab_review.js`
- Modify: `design-qa.md`
- Create: `handoff/evidence/homepage-summer-ab-review/image-first-a-1440x900.png`
- Create: `handoff/evidence/homepage-summer-ab-review/image-first-b-1440x900.png`
- Create: `handoff/evidence/homepage-summer-ab-review/restored-explore-1440x900.png`

**Interfaces:**
- Consumes: local preview at `http://127.0.0.1:8017`.
- Produces: browser-verified evidence and QA record.

- [ ] **Step 1: Capture formal homepage states**

Capture `homepage.html?experience=A`, `homepage.html?experience=B`, and restored `#explore-now` at 1440 × 900.

- [ ] **Step 2: Verify archive over file URL**

Open the standalone archive directly and confirm both experience parameters render, local images appear, and analytics payloads are pushed.

- [ ] **Step 3: Run the full suite**

Run: `python3 -m unittest discover -s tests -v`

Expected: all tests PASS.

- [ ] **Step 4: Check repository hygiene**

Run: `git diff --check`

Expected: no whitespace errors. Stop locally without commit, push, or deployment.
