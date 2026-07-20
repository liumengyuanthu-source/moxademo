# Remote I/O Microsite and Shared Lead Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Remote I/O Microsite body with the approved reference experience, compact its hero and metrics, localize its media, and make the Microsite and Campaign lead forms visually and behaviorally identical.

**Architecture:** Keep `moxa-shell.js` and `moxa-ds.css` as the shared global shell. Rebuild `microsite.html` as a lean page that contains only the shared-shell hooks and approved page content, with page-specific styling and interactions in focused files. Add one shared lead-form controller used by both Microsite and Campaign so validation and success behavior cannot drift.

**Tech Stack:** Static HTML5, shared CSS design tokens, vanilla JavaScript, Python 3 standard-library contract tests, in-app browser visual QA.

## Global Constraints

- Preserve the shared global header, breadcrumb, footer, search, Ask AI, and AI Advisor from `assets/js/moxa-shell.js`.
- Maximum page content width is 1200px with gutters of 48px desktop, 32px tablet, and 20px mobile.
- Hero height is 440–480px on desktop; hero image height is 300–320px.
- Hero headline is 52px desktop, 40px tablet, and 34px mobile with line-height 1.08.
- All four hero metrics remain in one desktop row; use two columns on tablet/mobile.
- Standard desktop section padding is 72px; dense sections use 56–64px; mobile uses 48px.
- All visible Remote I/O images use local project-relative paths.
- Buttons and fields provide at least a 44px touch target.
- Shared lead-form fields are First name, Business email, Company, Industry, Country/region, Project details, and Privacy consent.
- Do not add Last Name.
- Respect `prefers-reduced-motion` and support keyboard operation for tabs, modals, lightbox, anchor navigation, and form validation.
- Preserve unrelated user-authored changes.

## File Structure

### Create

- `assets/css/microsite-remote-io.css` — Remote I/O page layout, sections, responsive behavior, and print rules.
- `assets/js/microsite-remote-io.js` — page anchors, pillar tabs, modal/lightbox, portfolio rendering, Selection Guide, and print behavior.
- `assets/js/moxa-lead-form.js` — shared validation and success-state controller for Campaign and Microsite.
- `tests/test_remote_io_contract.py` — structural, asset, and shared-form contract tests.

### Modify

- `microsite.html` — replace legacy page body/styles/scripts with the approved Remote I/O content and shared-shell hooks.
- `campaign.html` — align form markup to the shared lead-form contract and remove the page-only submit handler.
- `assets/css/moxa-ds.css` — finalize shared lead-form states and reusable secondary anchor bar styles.
- `README.md` — record local preview and verification commands.

### Assets

- `assets/microsite/remote-io.jpg`
- `assets/microsite/img-proactive-1.png`
- `assets/microsite/img-proactive-2.png`
- `assets/microsite/img-easy-to-use-1.png`
- `assets/microsite/img-easy-to-use-2.png`
- `assets/microsite/img-easy-to-use-3.png`
- `assets/microsite/product-1.png` through `product-4.png`
- `assets/microsite/brochure-page-1.jpg` through `brochure-page-5.jpg`

---

### Task 1: Add Structural Contract Tests

**Files:**
- Create: `tests/test_remote_io_contract.py`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: existing `microsite.html`, `campaign.html`, and asset paths.
- Produces: executable contracts for required sections, local media, shared forms, and shared scripts.

- [ ] **Step 1: Write the failing contract test**

```python
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]


class RemoteIOContractTests(unittest.TestCase):
    def setUp(self):
        self.microsite = (ROOT / "microsite.html").read_text(encoding="utf-8")
        self.campaign = (ROOT / "campaign.html").read_text(encoding="utf-8")

    def test_microsite_contains_required_sections(self):
        required = (
            "remote-io-hero",
            "overview",
            "whymoxa",
            "portfolio",
            "applications",
            "comparison",
            "contact-us",
        )
        for section_id in required:
            self.assertRegex(self.microsite, rf'id=["\']{re.escape(section_id)}["\']')

    def test_microsite_loads_focused_assets(self):
        self.assertIn('assets/css/microsite-remote-io.css', self.microsite)
        self.assertIn('assets/js/microsite-remote-io.js', self.microsite)
        self.assertIn('assets/js/moxa-lead-form.js', self.microsite)

    def test_remote_io_images_are_local(self):
        remote_sources = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', self.microsite)
        self.assertTrue(remote_sources)
        for source in remote_sources:
            self.assertFalse(source.startswith("http"), source)
            if source.startswith("assets/microsite/"):
                self.assertTrue((ROOT / source).is_file(), source)

    def test_shared_lead_form_schema(self):
        field_names = (
            "first_name",
            "work_email",
            "company",
            "industry",
            "country",
            "project_details",
            "privacy",
        )
        for page in (self.microsite, self.campaign):
            self.assertIn("data-moxa-lead-form", page)
            self.assertIn('assets/js/moxa-lead-form.js', page)
            for name in field_names:
                self.assertRegex(page, rf'name=["\']{name}["\']')
            self.assertNotRegex(page, r'name=["\']last_name["\']')

    def test_shared_shell_is_preserved(self):
        self.assertIn('data-moxa-page="microsite"', self.microsite)
        self.assertIn('assets/js/moxa-shell.js', self.microsite)
        self.assertNotIn('<header class="header"', self.microsite)
        self.assertNotIn('<footer class="footer"', self.microsite)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test and verify it fails against the legacy page**

Run:

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
```

Expected: failures for missing `remote-io-hero`, focused Microsite CSS/JS, `data-moxa-lead-form`, and shared lead-form script.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/test_remote_io_contract.py
git commit -m "test: define Remote I/O microsite contracts"
```

---

### Task 2: Localize the Approved Remote I/O Assets

**Files:**
- Create/replace: `assets/microsite/remote-io.jpg`
- Create/replace: `assets/microsite/img-proactive-1.png`
- Create: `assets/microsite/img-proactive-2.png`
- Create/replace: `assets/microsite/img-easy-to-use-1.png`
- Create: `assets/microsite/img-easy-to-use-2.png`
- Create: `assets/microsite/img-easy-to-use-3.png`
- Create/replace: `assets/microsite/product-1.png` through `product-4.png`
- Create: `assets/microsite/brochure-page-1.jpg` through `brochure-page-5.jpg`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: official Moxa Remote I/O Spotlight media URLs.
- Produces: stable local files referenced by `microsite.html` and `microsite-remote-io.js`.

- [ ] **Step 1: Download every required media file**

```bash
curl -L 'https://www.moxa.com/en/spotlight/controller-and-io/remote-io-portfolio/v7/images/remote-io.jpg' -o 'assets/microsite/remote-io.jpg'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/img-proactive-1.png' -o 'assets/microsite/img-proactive-1.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/img-proactive-2.png' -o 'assets/microsite/img-proactive-2.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/img-easy-to-use-1.png' -o 'assets/microsite/img-easy-to-use-1.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/img-easy-to-use-2.png' -o 'assets/microsite/img-easy-to-use-2.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/img-easy-to-use-3.png' -o 'assets/microsite/img-easy-to-use-3.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/product-1.png' -o 'assets/microsite/product-1.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/product-2.png' -o 'assets/microsite/product-2.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/product-3.png' -o 'assets/microsite/product-3.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/product-4.png' -o 'assets/microsite/product-4.png'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/brochure-page-1.jpg' -o 'assets/microsite/brochure-page-1.jpg'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/brochure-page-2.jpg' -o 'assets/microsite/brochure-page-2.jpg'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/brochure-page-3.jpg' -o 'assets/microsite/brochure-page-3.jpg'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/brochure-page-4.jpg' -o 'assets/microsite/brochure-page-4.jpg'
curl -L 'https://www.moxa.com/spotlight/controller-and-io/remote-io-portfolio/v7/images/brochure-page-5.jpg' -o 'assets/microsite/brochure-page-5.jpg'
```

- [ ] **Step 2: Verify file types and reject HTML/error downloads**

Run:

```bash
file assets/microsite/remote-io.jpg assets/microsite/img-*.png assets/microsite/product-*.png assets/microsite/brochure-page-*.jpg
```

Expected: every file reports JPEG or PNG image data; none reports HTML, ASCII text, or empty.

- [ ] **Step 3: Commit localized assets**

```bash
git add assets/microsite
git commit -m "feat: localize Remote I/O microsite media"
```

---

### Task 3: Rebuild the Microsite Markup Around the Shared Shell

**Files:**
- Modify: `microsite.html`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: shared shell injection from `moxa-shell.js`; localized assets from Task 2.
- Produces: stable section IDs and DOM hooks consumed by `microsite-remote-io.js` and `moxa-lead-form.js`.

- [ ] **Step 1: Replace the legacy page with a lean shared-shell document**

Use this exact outer structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Stay Ahead by Reading the Field | Moxa</title>
  <meta name="description" content="Moxa Remote I/O helps engineers connect field data with proactive reporting, simple deployment, and industrial reliability.">
  <link rel="stylesheet" href="assets/css/moxa-ds.css?v=20260720">
  <link rel="stylesheet" href="assets/css/microsite-remote-io.css?v=20260720">
</head>
<body data-moxa-page="microsite">
  <nav class="moxa-page-anchor" aria-label="Remote I/O page sections">
    <div class="remote-container moxa-page-anchor-inner">
      <a href="#overview" data-scroll-spy="overview">Overview</a>
      <a href="#whymoxa" data-scroll-spy="whymoxa">Why Moxa</a>
      <a href="#portfolio" data-scroll-spy="portfolio">Portfolio</a>
      <a href="#applications" data-scroll-spy="applications">Applications</a>
      <a href="#comparison" data-scroll-spy="comparison">Selection Guide</a>
      <a class="moxa-page-anchor-cta" href="#contact-us" data-scroll-spy="contact-us">Contact Us</a>
    </div>
  </nav>
  <main id="main-content">
```

At this point, copy the complete Hero, Overview, Why Moxa, Product Portfolio, Brochure, Applications, Selection Guide, Contact, video modal, and brochure-lightbox nodes from `/Users/christinaliu/Downloads/moxa-remote-io-spotlight-tobe.html` in that order. Apply the deterministic selector and asset changes listed immediately after this framing example, then close the document with:

```html
  </main>
  <script src="assets/js/moxa-shell.js?v=20260720"></script>
  <script src="assets/js/moxa-lead-form.js?v=20260720"></script>
  <script src="assets/js/microsite-remote-io.js?v=20260720"></script>
</body>
</html>
```

Use the exact content under the same section IDs from `/Users/christinaliu/Downloads/moxa-remote-io-spotlight-tobe.html`, subject only to these deterministic changes:

- rename the hero root to `id="remote-io-hero"`;
- use `assets/microsite/remote-io.jpg` for hero and overview media;
- use local `assets/microsite/img-*.png`, `product-*.png`, and `brochure-page-*.jpg` paths;
- remove the source header, source footer, source back-to-top control, and source global logo;
- replace inline SVG UI icons with the closest existing image/icon-library asset or a text label when the control remains unambiguous;
- retain the two modal containers with `hidden`, `role="dialog"`, `aria-modal="true"`, and labelled close buttons;
- use empty `alt` values for decorative images and concise alt text for meaningful product/application images.

- [ ] **Step 2: Add the shared lead form markup to the Contact section**

```html
<form class="moxa-lead-form" data-moxa-lead-form data-success-message="A Moxa Remote I/O specialist will contact you within two business days." novalidate>
  <h3>Tell us about your application.</h3>
  <p>Required fields help route the request to the right regional specialist.</p>
  <div class="form-grid">
    <label class="field"><span>First name *</span><input name="first_name" autocomplete="given-name" required><small data-error></small></label>
    <label class="field"><span>Business email *</span><input name="work_email" type="email" autocomplete="email" required><small data-error></small></label>
    <label class="field"><span>Company *</span><input name="company" autocomplete="organization" required><small data-error></small></label>
    <label class="field"><span>Industry *</span><select name="industry" required><option value="">Select industry</option><option>Manufacturing</option><option>Energy &amp; Power</option><option>Critical Infrastructure</option><option>Transportation</option><option>Other</option></select><small data-error></small></label>
    <label class="field full"><span>Country / region *</span><select name="country" required><option value="">Select country / region</option><option>Global</option><option>United States</option><option>Taiwan</option><option>China</option><option>Germany</option><option>Other</option></select><small data-error></small></label>
    <label class="field full"><span>Project details *</span><textarea name="project_details" required placeholder="I/O count, signal types, protocols, environment, timeline, or product families under consideration"></textarea><small data-error></small></label>
  </div>
  <label class="moxa-lead-consent"><input name="privacy" type="checkbox" required><span>I agree that Moxa may process my information to respond to this request. *</span></label>
  <small class="moxa-lead-consent-error" data-consent-error></small>
  <div class="form-actions"><button class="btn btn-primary" type="submit">Submit Request</button><span role="status" aria-live="polite" data-form-status></span></div>
  <div class="moxa-lead-success" data-form-success hidden tabindex="-1"><strong>Request received</strong><p></p></div>
</form>
```

- [ ] **Step 3: Run the structural test**

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
```

Expected: section and local-image tests pass; shared-form script test still fails until Task 6.

- [ ] **Step 4: Commit the rebuilt page markup**

```bash
git add microsite.html
git commit -m "feat: rebuild Remote I/O microsite content"
```

---

### Task 4: Implement the Compact Responsive Microsite Styling

**Files:**
- Create: `assets/css/microsite-remote-io.css`
- Modify: `assets/css/moxa-ds.css`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: the class names and section IDs created in Task 3.
- Produces: a 1200px aligned page, 440–480px desktop hero, compact metric grid, accessible tabs/modals, and printable Selection Guide.

- [ ] **Step 1: Define the page layout and compact hero tokens**

```css
:root {
  --remote-page-max: 1200px;
  --remote-gutter: 48px;
  --remote-section: 72px;
  --remote-dense-section: 60px;
}

.remote-container {
  width: min(calc(100% - (var(--remote-gutter) * 2)), var(--remote-page-max));
  margin-inline: auto;
}

.remote-hero {
  min-height: 440px;
  color: #fff;
  background:
    radial-gradient(700px 320px at 82% 30%, rgba(64, 203, 208, 0.16), transparent 66%),
    linear-gradient(115deg, #123e46 0%, #0b5560 55%, #006b6b 100%);
}

.remote-hero-grid {
  min-height: 440px;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
  gap: 48px;
  align-items: center;
  padding-block: 48px;
}

.remote-hero h1 {
  max-width: 12ch;
  margin: 0;
  color: #fff;
  font-size: 52px;
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.remote-hero-media img {
  width: 100%;
  height: 310px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: var(--moxa-shadow);
}

.remote-hero-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.remote-hero-stat strong {
  display: block;
  color: #fff;
  font-size: 20px;
  line-height: 1.15;
}

.remote-hero-stat span {
  display: block;
  margin-top: 5px;
  color: #9fc3cb;
  font-size: 12px;
  line-height: 1.35;
}
```

- [ ] **Step 2: Add section, tab, card, brochure, table, modal, and print styles**

Implement the approved reference styles in `microsite-remote-io.css` with these exact structural rules:

```css
.remote-section { padding-block: var(--remote-section); scroll-margin-top: 184px; }
.remote-section.is-muted { background: #f7f9fa; }
.remote-section-head { max-width: 760px; margin-bottom: 32px; }
.remote-section-head h2 { margin: 0; font-size: 32px; line-height: 1.15; letter-spacing: -0.02em; }
.remote-pillar-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.remote-pillar-panel[hidden] { display: none; }
.remote-product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.remote-app-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.remote-selection-wrap { overflow-x: auto; border: 1px solid var(--moxa-line); }
.remote-selection-table { width: 100%; min-width: 980px; border-collapse: separate; border-spacing: 0; }
.remote-selection-table tbody th { position: sticky; left: 0; z-index: 1; background: #f7f9fa; }
.remote-modal[hidden] { display: none; }
.remote-modal:not([hidden]) { position: fixed; inset: 0; z-index: 1300; display: grid; place-items: center; padding: 24px; background: rgba(18, 43, 50, 0.62); }

@media (max-width: 1024px) {
  :root { --remote-gutter: 32px; }
  .remote-hero-grid { grid-template-columns: 1fr; min-height: auto; }
  .remote-hero h1 { max-width: none; font-size: 40px; }
  .remote-hero-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .remote-pillar-tabs, .remote-product-grid { grid-template-columns: 1fr; }
  .remote-app-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  :root { --remote-gutter: 20px; --remote-section: 48px; }
  .remote-hero-grid { gap: 28px; padding-block: 36px; }
  .remote-hero h1 { font-size: 34px; }
  .remote-hero-media img { height: 240px; }
  .remote-app-grid { grid-template-columns: 1fr; }
}

@media print {
  .moxa-global-header, .moxa-global-footer, .moxa-page-anchor, .remote-interactive, .moxa-lead-layout { display: none !important; }
  .remote-pillar-panel[hidden] { display: block !important; }
  .remote-section { padding-block: 18pt; break-inside: avoid; }
}
```

- [ ] **Step 3: Add reusable secondary anchor styling to the shared Design System**

Add `.moxa-page-anchor`, `.moxa-page-anchor-inner`, active/focus states, horizontal overflow, and `.moxa-page-anchor-cta` to `moxa-ds.css`. The bar must use `top: 116px`, remain above page content but below mega menus, and use the same content alignment as the page.

- [ ] **Step 4: Run contract tests and CSS syntax sanity checks**

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
python3 -c "from pathlib import Path; css=Path('assets/css/microsite-remote-io.css').read_text(); assert css.count('{') == css.count('}')"
```

Expected: Python test status is unchanged from Task 3; CSS brace check exits successfully.

- [ ] **Step 5: Commit styling**

```bash
git add assets/css/microsite-remote-io.css assets/css/moxa-ds.css
git commit -m "feat: style compact Remote I/O microsite"
```

---

### Task 5: Implement Remote I/O Page Interactions

**Files:**
- Create: `assets/js/microsite-remote-io.js`
- Modify: `microsite.html`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: `[data-scroll-spy]`, `[data-pillar-tab]`, `[data-remote-modal]`, brochure buttons, and Selection Guide hooks.
- Produces: `window.MoxaRemoteIO.openModal(id, trigger)`, `closeModal(id)`, `openBrochure(index, trigger)`, and automatic page initialization.

- [ ] **Step 1: Implement anchor scroll-spy and pillar tabs**

```javascript
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anchorLinks = [...document.querySelectorAll("[data-scroll-spy]")];
  const sections = anchorLinks
    .map((link) => document.getElementById(link.dataset.scrollSpy))
    .filter(Boolean);

  const activateAnchor = (id) => {
    anchorLinks.forEach((link) => {
      const active = link.dataset.scrollSpy === id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activateAnchor(visible.target.id);
    }, { rootMargin: "-35% 0px -55%", threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  const tabs = [...document.querySelectorAll("[data-pillar-tab]")];
  const panels = [...document.querySelectorAll("[data-pillar-panel]")];
  const selectTab = (tab, focus) => {
    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.setAttribute("aria-selected", String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab, false));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      selectTab(tabs[next], true);
    });
  });
```

- [ ] **Step 2: Implement modal/lightbox focus management and Selection Guide behavior**

Continue the same IIFE with concrete state variables `activeModal`, `modalTrigger`, and `brochureIndex`. Opening a modal removes `hidden`, stores the trigger, moves focus to its close button, and sets `document.body.style.overflow = "hidden"`. Closing reverses those changes, clears the video iframe `src`, and returns focus to the stored trigger. Escape closes the active modal; left/right arrows change brochure pages. The difference toggle adds `is-different` only to table rows whose four normalized values are not identical.

Expose only:

```javascript
  window.MoxaRemoteIO = {
    openModal,
    closeModal,
    openBrochure,
  };
})();
```

- [ ] **Step 3: Replace inline `onclick` attributes with data hooks**

Use `data-open-modal`, `data-close-modal`, `data-brochure-index`, `data-brochure-prev`, `data-brochure-next`, and `data-difference-toggle`. The script binds all of them during initialization; no page interaction remains as an inline handler.

- [ ] **Step 4: Run tests and JavaScript syntax checking**

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
node --check assets/js/microsite-remote-io.js
```

Expected: contract tests still fail only on the shared lead-form script; JavaScript syntax check passes.

- [ ] **Step 5: Commit interactions**

```bash
git add assets/js/microsite-remote-io.js microsite.html
git commit -m "feat: add Remote I/O microsite interactions"
```

---

### Task 6: Harmonize Campaign and Microsite Lead Forms

**Files:**
- Create: `assets/js/moxa-lead-form.js`
- Modify: `assets/css/moxa-ds.css`
- Modify: `campaign.html`
- Modify: `microsite.html`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: each form marked `[data-moxa-lead-form]` with `[data-error]`, `[data-consent-error]`, `[data-form-status]`, and `[data-form-success]` hooks.
- Produces: automatic form initialization and `window.MoxaLeadForm.init(form)` for Sitecore component reuse.

- [ ] **Step 1: Implement the shared form controller**

```javascript
(function () {
  "use strict";

  const copy = {
    first_name: "Please enter your first name.",
    work_email: "Please enter a valid business email.",
    company: "Please enter your company.",
    industry: "Please select your industry.",
    country: "Please select your country or region.",
    project_details: "Please describe your project requirements.",
    privacy: "Please accept the privacy notice to continue.",
  };

  const isValid = (control) => {
    if (control.type === "checkbox") return control.checked;
    if (control.type === "email") return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(control.value.trim());
    return control.value.trim().length > 0;
  };

  const setError = (control, valid) => {
    control.setAttribute("aria-invalid", String(!valid));
    const field = control.closest(".field");
    const target = control.name === "privacy"
      ? control.form.querySelector("[data-consent-error]")
      : field && field.querySelector("[data-error]");
    if (target) target.textContent = valid ? "" : copy[control.name];
    if (field) field.classList.toggle("has-error", !valid);
    return valid;
  };

  const init = (form) => {
    const required = [...form.querySelectorAll("[required]")];
    required.forEach((control) => {
      control.addEventListener("blur", () => setError(control, isValid(control)));
      control.addEventListener("change", () => setError(control, isValid(control)));
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const invalid = required.filter((control) => !setError(control, isValid(control)));
      if (invalid.length) {
        invalid[0].focus();
        form.querySelector("[data-form-status]").textContent = "Please review the highlighted fields.";
        return;
      }
      form.querySelector("[data-form-status]").textContent = "";
      const success = form.querySelector("[data-form-success]");
      success.querySelector("p").textContent = form.dataset.successMessage;
      [...form.children].forEach((child) => {
        if (child !== success) child.hidden = true;
      });
      success.hidden = false;
      success.focus();
    });
  };

  document.querySelectorAll("[data-moxa-lead-form]").forEach(init);
  window.MoxaLeadForm = { init };
})();
```

- [ ] **Step 2: Add shared error and success-state CSS**

```css
.moxa-lead-form .field small,
.moxa-lead-consent-error {
  min-height: 1.25em;
  color: #b42318;
  font-size: 0.76rem;
  line-height: 1.35;
}

.moxa-lead-form .field.has-error input,
.moxa-lead-form .field.has-error select,
.moxa-lead-form .field.has-error textarea,
.moxa-lead-form [aria-invalid="true"] {
  border-color: #b42318;
}

.moxa-lead-success {
  padding: 48px 24px;
  text-align: center;
}

.moxa-lead-success strong {
  display: block;
  color: var(--moxa-teal-700);
  font-size: 1.4rem;
}
```

- [ ] **Step 3: Align Campaign markup with the Microsite contract**

Add `data-moxa-lead-form`, identical hook elements, the same field order and labels, and the same privacy copy. Preserve Campaign-specific industry options and project placeholder. Remove the inline `campaignForm` submit listener. Load `assets/js/moxa-lead-form.js` before `moxa-shell.js` or immediately after it on both pages.

- [ ] **Step 4: Run all contract and syntax checks**

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
node --check assets/js/moxa-lead-form.js
node --check assets/js/microsite-remote-io.js
git diff --check
```

Expected: every unittest passes; both JavaScript syntax checks pass; `git diff --check` prints no errors.

- [ ] **Step 5: Commit the shared form component**

```bash
git add assets/js/moxa-lead-form.js assets/css/moxa-ds.css campaign.html microsite.html tests/test_remote_io_contract.py
git commit -m "feat: harmonize Moxa lead forms"
```

---

### Task 7: Verify Responsive Layout, Accessibility, and Handoff Readiness

**Files:**
- Modify: `microsite.html`
- Modify: `campaign.html`
- Modify: `assets/css/microsite-remote-io.css`
- Modify: `assets/css/moxa-ds.css`
- Modify: `assets/js/microsite-remote-io.js`
- Modify: `assets/js/moxa-lead-form.js`
- Modify: `README.md`
- Test: `tests/test_remote_io_contract.py`

**Interfaces:**
- Consumes: the completed Microsite, Campaign, shared shell, localized assets, and tests.
- Produces: visually verified local routes and reproducible preview instructions.

- [ ] **Step 1: Start the local preview**

```bash
python3 -m http.server 8015
```

Expected routes:

- `http://127.0.0.1:8015/microsite.html`
- `http://127.0.0.1:8015/campaign.html#contact-us`

- [ ] **Step 2: Run the automated checks**

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
node --check assets/js/microsite-remote-io.js
node --check assets/js/moxa-lead-form.js
git diff --check
```

Expected: all checks pass with no warnings or whitespace errors.

- [ ] **Step 3: Capture and inspect the required viewports in the in-app browser**

Capture `microsite.html` at 1435px, 1024px, 768px, and 390px widths. At each width verify:

- no horizontal page overflow;
- global header, breadcrumb, anchor bar, and footer align to the same page grid;
- hero is 440–480px at desktop and stacks without blank space at smaller widths;
- four proof metrics remain one row at 1435px and two columns below 1024px;
- hero image is not stretched or subject-cropped;
- section titles and body type follow the approved scale;
- product cards, brochure, applications, and Selection Guide preserve all content;
- lead form becomes one column at mobile width.

- [ ] **Step 4: Exercise the interaction and keyboard checklist**

Verify Products mega menu closes on outside click and scroll; anchor scroll-spy updates; tabs work with click, Arrow keys, Home, and End; video modal and brochure lightbox open and close with keyboard; Escape restores focus; Selection Guide difference toggle and horizontal scroll work; print preview shows all pillar content; invalid form submission focuses the first bad field; consent has visible error copy; success state is announced and focused.

- [ ] **Step 5: Compare the reference and implementation together**

Create a side-by-side comparison using the supplied screenshot and the 1435px implementation capture. Reject the implementation if the hero hierarchy, image crop, metric density, gutters, or CTA sizing differ materially from the approved direction. Iterate CSS, recapture, and recompare until accepted.

- [ ] **Step 6: Document local preview and component ownership**

Append to `README.md`:

```markdown
## Remote I/O Microsite

Preview with `python3 -m http.server 8015`, then open:

- `http://127.0.0.1:8015/microsite.html`
- `http://127.0.0.1:8015/campaign.html#contact-us`

- Shared shell: `assets/js/moxa-shell.js` and `assets/css/moxa-ds.css`
- Microsite behavior: `assets/js/microsite-remote-io.js`
- Shared lead-form behavior: `assets/js/moxa-lead-form.js`
- Microsite styling: `assets/css/microsite-remote-io.css`
```

- [ ] **Step 7: Commit verified implementation**

```bash
git add microsite.html campaign.html assets/css/microsite-remote-io.css assets/css/moxa-ds.css assets/js/microsite-remote-io.js assets/js/moxa-lead-form.js tests/test_remote_io_contract.py README.md
git commit -m "chore: verify Remote I/O microsite handoff"
```

---

## Final Acceptance Run

Run:

```bash
python3 -m unittest tests/test_remote_io_contract.py -v
node --check assets/js/microsite-remote-io.js
node --check assets/js/moxa-lead-form.js
git status --short
```

Expected:

- all contract tests pass;
- both JavaScript files pass syntax checking;
- working tree is clean after the final commit;
- visual captures at 1435px, 1024px, 768px, and 390px have been inspected and accepted;
- Microsite and Campaign lead forms visibly share the same component system and behavior.
