# Homepage EDS-4008 Third Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage carousel's third EDS-4008 banner with a 1916 × 821 image-first composition that matches banners one and two and uses the same CTA system.

**Architecture:** Generate one production banner asset from the two approved homepage banner references and the existing EDS-4008 product photograph. Keep accessible HTML copy and links as the source of truth, align desktop hotspots with the rendered CTAs, and use a live-copy responsive treatment on mobile.

**Tech Stack:** Static HTML/CSS/JavaScript, PNG image asset, Python `unittest`, local HTTP server, browser screenshot comparison.

## Global Constraints

- Final desktop artwork is exactly 1916 × 821 px.
- Preserve `compare-lv-hv.html` and `asset/moxa-eds-4008-series-datasheet-v1.8.pdf` destinations and existing analytics attributes.
- Primary CTA is Moxa Green with white text; secondary CTA is white with Moxa Green border and text.
- Remove the dark translucent panel and the visible “Homepage C” label.
- Do not change carousel logic, global header, other homepage sections, or destination pages.

---

### Task 1: Add a third-banner contract test

**Files:**
- Create: `tests/test_homepage_third_banner_contract.py`
- Test: `tests/test_homepage_third_banner_contract.py`

**Interfaces:**
- Consumes: `homepage.html` third carousel article identified by `data-s1-state="eds4008Session"`.
- Produces: an automated contract for the final asset path, copy, CTA links, and removal of the state note.

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "homepage.html").read_text(encoding="utf-8")


class HomepageThirdBannerContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        match = re.search(
            r'<article class="hero-slide hero-slide-eds".*?</article>',
            HTML,
            flags=re.S,
        )
        if not match:
            raise AssertionError("EDS-4008 third banner is missing")
        cls.banner = match.group(0)

    def test_uses_new_image_first_asset(self):
        self.assertIn('src="banner/eds-4008-validation-banner.png"', self.banner)

    def test_has_approved_copy_and_ctas(self):
        self.assertIn("Validate the right", self.banner)
        self.assertIn("Compare LV/HV Models", self.banner)
        self.assertIn("Download Datasheet", self.banner)
        self.assertIn('href="compare-lv-hv.html"', self.banner)
        self.assertIn('href="asset/moxa-eds-4008-series-datasheet-v1.8.pdf"', self.banner)

    def test_removes_visible_session_note(self):
        self.assertNotIn("Homepage C", self.banner)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests/test_homepage_third_banner_contract.py -v`  
Expected: FAIL because `banner/eds-4008-validation-banner.png` is not referenced and `Homepage C` is still present.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/test_homepage_third_banner_contract.py
git commit -m "test: define EDS-4008 homepage banner contract"
```

### Task 2: Produce the approved banner artwork

**Files:**
- Create: `banner/eds-4008-validation-banner.png`
- Reference: `banner/ChatGPT Image Jul 13, 2026, 05_45_52 PM (3).png`
- Reference: `banner/ChatGPT Image Jul 13, 2026, 05_45_51 PM (2).png`
- Reference: `img/family-network.jpg`

**Interfaces:**
- Consumes: approved visual family and existing EDS-4008 device photograph.
- Produces: `banner/eds-4008-validation-banner.png`, exactly 1916 × 821 px.

- [ ] **Step 1: Generate the image with the three local visual references**

Use the image-generation workflow with this art direction:

```text
Create the third banner in the exact same Moxa visual family as the two supplied 1916×821 homepage banners. Bright white engineering canvas, left 43% reserved for precise copy and two buttons, right side uses a large circular industrial scene crop. Use the supplied EDS-4008 switch as the product subject; show the entire device without cropping its ports, terminals, heat sink, or top connectors. Add subtle Moxa teal network lines and four small circular capability markers on the far right for LV power, HV power, industrial reliability, and engineering support. Exact copy: eyebrow “CONTINUE WITH EDS-4008”; headline “Validate the right model.” with “model.” in Moxa Green; body “Compare LV and HV power options, review the series datasheet, and confirm the right fit for your application.” Buttons: green filled “Compare LV/HV Models” with white arrow; white outlined “Download Datasheet” with green arrow. No dark overlay, no Homepage C label, no extra logos. Output exactly 1916×821.
```

- [ ] **Step 2: Inspect the generated image**

Confirm the complete device is visible, copy is spelled correctly, buttons visually match banners one and two, and the right-side markers remain inside the safe area.

- [ ] **Step 3: Verify exact dimensions**

Run: `sips -g pixelWidth -g pixelHeight banner/eds-4008-validation-banner.png`  
Expected: `pixelWidth: 1916` and `pixelHeight: 821`.

- [ ] **Step 4: Commit the asset**

```bash
git add banner/eds-4008-validation-banner.png
git commit -m "feat: add EDS-4008 validation homepage banner"
```

### Task 3: Integrate desktop artwork and mobile fallback

**Files:**
- Modify: `homepage.html:249-320`
- Modify: `homepage.html:950-970`
- Modify: `homepage.html:2663-2699`
- Test: `tests/test_homepage_third_banner_contract.py`

**Interfaces:**
- Consumes: `banner/eds-4008-validation-banner.png`.
- Produces: third-banner markup and responsive styling consistent with the first two banners.

- [ ] **Step 1: Replace the third-banner artwork and copy**

Use this markup content inside the existing third banner:

```html
<span class="eyebrow">CONTINUE WITH EDS-4008</span>
<h1><span class="lede">Validate the right</span><span class="accent">model.</span></h1>
<p class="hero-sub">Compare LV and HV power options, review the series datasheet, and confirm the right fit for your application.</p>
<div class="hero-cta">
  <a class="btn btn-primary btn-lg" href="compare-lv-hv.html" data-s1-route="compare" data-s1-record-compare>Compare LV/HV Models</a>
  <a class="btn btn-ghost btn-lg" href="asset/moxa-eds-4008-series-datasheet-v1.8.pdf" data-s1-route="datasheet">Download Datasheet</a>
</div>
```

Set the image source to `banner/eds-4008-validation-banner.png` and remove `.hero-state-note` from the third banner.

- [ ] **Step 2: Make desktop behavior image-first and align hotspots**

```css
.image-hero-carousel .hero-slide-eds .hero-copy{display:none}
.hero-slide-eds .hero-photo{object-fit:cover;object-position:center center}
.hero-slide-eds .banner-hotspot.primary{left:9.2%;top:70.8%;width:16.8%;height:8.4%}
.hero-slide-eds .banner-hotspot.secondary{left:27.1%;top:70.8%;width:15.8%;height:8.4%}
```

- [ ] **Step 3: Add the mobile accessible fallback**

```css
@media (max-width:760px){
  .image-hero-carousel .wrap.hero-grid{aspect-ratio:auto;min-height:620px}
  .image-hero-carousel .hero-slide-eds .hero-copy{
    display:block;left:20px;right:20px;bottom:70px;width:auto;
    padding:20px;background:linear-gradient(90deg,rgba(0,34,34,.76),rgba(0,34,34,.28));
  }
  .image-hero-carousel .hero-slide-eds .banner-hotspots{display:none}
  .image-hero-carousel .hero-slide-eds .hero-photo{object-position:69% center}
}
```

- [ ] **Step 4: Run the contract test**

Run: `python3 -m unittest tests/test_homepage_third_banner_contract.py -v`  
Expected: all tests PASS.

- [ ] **Step 5: Commit the integration**

```bash
git add homepage.html tests/test_homepage_third_banner_contract.py
git commit -m "feat: align EDS-4008 homepage banner with hero system"
```

### Task 4: Visual QA and regression verification

**Files:**
- Verify: `homepage.html`
- Verify: `banner/eds-4008-validation-banner.png`

**Interfaces:**
- Consumes: completed homepage implementation.
- Produces: evidence that all three banners form one visual system and the third banner works at desktop and mobile sizes.

- [ ] **Step 1: Start the local site**

Run: `python3 -m http.server 8015` from the worktree root.  
Expected: the homepage is available at `http://127.0.0.1:8015/homepage.html?demoState=eds4008Session`.

- [ ] **Step 2: Capture desktop comparison**

At 1435 × 795, capture the first, second, and third carousel states. Compare image bounds, headline baseline, CTA bounds, device crop, and carousel controls.

- [ ] **Step 3: Capture mobile fallback**

At 390 × 844, confirm the third banner shows readable live copy, both CTAs, the EDS-4008 product, and no horizontal overflow.

- [ ] **Step 4: Run regression checks**

Run:

```bash
python3 -m unittest tests/test_homepage_third_banner_contract.py tests/test_remote_io_contract.py -v
git diff --check
```

Expected: all tests PASS and `git diff --check` produces no output.

