# Moxa PoC Demo Build Audit - 2026-07-10

## 1. Scope

Audited source:

- `/Users/christinaliu/Documents/Moxa/moxa-uxui-apple-site`

Audited Figma package source:

- `/Users/christinaliu/Documents/Moxa/moxa-figma-static-pages`

Planned package:

- `/Users/christinaliu/Documents/Moxa/moxa-figma-static-pages-20260710.zip`

## 2. Build Changes

| Item | Result |
| --- | --- |
| Added `demo-map.html` | PASS |
| Added P-numbered page list | PASS: P01-P15 |
| Added C-numbered component list | PASS: C01-C25 |
| Added Demo Map header link | PASS |
| Updated `index.html` from redirect to launchpad | PASS |
| Regenerated runtime HTML | PASS: 19 pages |
| Regenerated Figma static HTML | PASS: 19 pages |

## 3. Navigation Audit

| Check | Result |
| --- | --- |
| Header includes homepage, product path, resources, support, distributor, demo map, design system, contact | PASS |
| Demo Map links to all primary demo pages | PASS |
| Primary business route is visible | PASS |
| Product Category links to Series and Model pages | PASS |
| Series and Model pages link to Compare/Quote and Contact/Distributor | PASS |
| Search links to Product Series | PASS |
| Contact/Distributor has distributor, support, and contact anchors | PASS |

## 4. Design Criteria Audit

| Criteria | Result |
| --- | --- |
| Uses Moxa green `#008787` | PASS |
| Uses Moxa blue `#204a88` | PASS |
| Uses CTA orange `#ff8000` | PASS |
| Uses Helvetica/Microsoft JhengHei font stack | PASS |
| Uses 1160px content container | PASS |
| Keeps cards at 8px radius or below | PASS |
| Uses squared CTA buttons | PASS |
| Keeps AI assistive rather than futuristic/decorative | PASS |
| Keeps product pages technical, scannable, and comparison-ready | PASS |
| Uses local runtime assets and self-contained Figma export | PASS |

## 5. Static Integrity Audit

| Test | Result |
| --- | --- |
| Missing local references in runtime pages | PASS: 0 |
| Broken hash anchors | PASS: 0 |
| Duplicate IDs | PASS: 0 |
| Invalid tab targets | PASS: 0 |
| Figma static pages with external CSS references | PASS: 0 |
| Figma static pages with external JS references | PASS: 0 |
| Figma static pages with external image asset references | PASS: 0 |

## 6. Correction Log

| Issue | Correction |
| --- | --- |
| No numbered demo map existed | Added `demo-map.html` with page IDs and component IDs |
| `index.html` only redirected to homepage | Changed it into a launchpad with direct links |
| Figma package lacked an explicit numbered inventory | Added numbered inventory MD/PDF to the package |
| Component decisions were only in analysis docs | Consolidated approved decision state into the numbered inventory |

## 7. Manual Review Note

Automated browser visual QA was not used for local `file://` pages because the Codex browser policy blocked local file navigation in the prior run. Static integrity checks passed. Before client presentation, open `demo-map.html` and the P01-P10 route in a normal browser to confirm visual rhythm and mobile layout.

