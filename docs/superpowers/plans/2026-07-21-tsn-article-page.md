# TSN Article Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Moxa TSN article in the approved Editorial Clarity layout with shared shell, local official assets, responsive behavior, and working article interactions.

**Architecture:** `article.html` contains semantic source content and shared-shell placeholders. `assets/css/article-page.css` owns article-only layout and responsive rules; `assets/js/article-page.js` owns progressive enhancement for TOC, reading progress, save/share, and rating states.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, shared Moxa shell, Python `unittest`, Playwright/Chrome visual capture.

## Global Constraints

- Preserve the complete original article content in source order.
- Use only locally stored official source media.
- Use the shared Moxa header/footer and current design-system tokens.
- Build the selected Option 1 Editorial Clarity direction.
- Verify at 1440x900 and 390x844.
- Do not commit, push, or deploy before explicit user approval.

---

### Task 1: Lock the page contract

**Files:**
- Create: `tests/test_article_page_contract.py`

**Interfaces:**
- Consumes: `article.html`, `assets/css/article-page.css`, `assets/js/article-page.js`, `assets/article/*`.
- Produces: content, shell, asset, accessibility, and interaction assertions.

- [ ] Write tests asserting the shared shell, all source headings, required local assets, six TOC anchors, progress element, share/save/rating controls, and no remote image URLs.
- [ ] Run `python3 -m unittest tests.test_article_page_contract -v` and verify RED because the existing article is abbreviated and does not use the shared shell.

### Task 2: Preserve source content and media

**Files:**
- Modify: `tools/capture_article_source.js`
- Create: `handoff/evidence/article-source/source-article-content.html`
- Create: `assets/article/theo-lai.jpg`
- Create: `assets/article/moxa-tsn-202212.jpg`
- Create: `assets/article/tsn-video-thumbnail.jpg`
- Create: `assets/article/tsn-network-topology.jpg`

**Interfaces:**
- Consumes: the live source page through the already approved local Chrome capture.
- Produces: a local factual source record and four local media files.

- [ ] Extend the source evidence capture to save the article container's semantic HTML and plain text.
- [ ] Download the four exact official source assets and inspect their dimensions/content.
- [ ] Confirm headings and paragraph order against the full-page source capture.

### Task 3: Build semantic article markup

**Files:**
- Replace: `article.html`

**Interfaces:**
- Consumes: source record, local article media, `moxa-shell.js`.
- Produces: complete semantic article page and anchors used by CSS/JS.

- [ ] Add the shared shell placeholder, breadcrumb, complete article header, author metadata, media, TOC, all source sections, tags, rating, related articles, and shell scripts.
- [ ] Run the article contract and fix only missing semantic/contract requirements until GREEN.

### Task 4: Implement the Editorial Clarity visual system

**Files:**
- Create: `assets/css/article-page.css`

**Interfaces:**
- Consumes: shared tokens from `moxa-ds.css` and semantic classes from `article.html`.
- Produces: selected 1440px design and 390px responsive layout.

- [ ] Implement the 1240px grid, sticky TOC, 65-character reading measure, article typography, media, use-case panels, tags, rating, and related cards.
- [ ] Add tablet/mobile layout changes, focus-visible states, and reduced-motion behavior.

### Task 5: Implement article interactions

**Files:**
- Create: `assets/js/article-page.js`

**Interfaces:**
- Consumes: `[data-article-section]`, `[data-toc-link]`, `[data-save-article]`, `[data-copy-link]`, and `[data-rating]`.
- Produces: active TOC state, progress percentage, save/copy feedback, and rating confirmation.

- [ ] Use IntersectionObserver plus scroll fallback to update active sections and progress.
- [ ] Implement session-level save state, copy-link feedback, share URLs, and one-choice rating feedback.
- [ ] Re-run the article contract and full regression suite.

### Task 6: Browser and design QA

**Files:**
- Create: `tools/capture_article_review.js`
- Create: `handoff/evidence/article-review/article-desktop-1440x900.png`
- Create: `handoff/evidence/article-review/article-mobile-390x844.png`
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: `http://127.0.0.1:8017/article.html`, selected Option 1 image, source screenshots.
- Produces: same-state visual comparison and a passing design QA record.

- [ ] Capture desktop and mobile page states, plus TOC/save/rating interactions.
- [ ] Compare the prototype with the selected visual and source screenshots; fix P0/P1/P2 issues.
- [ ] Run `python3 -m unittest discover -s tests -v` and `git diff --check`.
- [ ] Keep the verified local preview running and stop before GitHub deployment.
