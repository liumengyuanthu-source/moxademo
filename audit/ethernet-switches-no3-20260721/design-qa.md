# Ethernet Switches — Concept No. 3 Design QA

## Visual target

- Selected reference: `deliverables/Moxa_Design_System_v1_20260720/visual-handbook/screenshots/03-ethernet-switches.png`
- Implementation: `product-category-ethernet-switches.html`
- Review viewport: 1280 × 720

## Comparison

| Area | Reference intent | Implementation result | Status |
| --- | --- | --- | --- |
| Hero | Light, compact, technical decision-path visual | Light hero with original Moxa category copy, decision-path asset, and two restrained actions | PASS |
| Information architecture | Filter panel left, category results right | Sticky white filter card paired with nine result cards | PASS |
| Category content | Fast-scanning product-family rows | Original nine categories, full descriptions, metadata, and fixed-width entry actions | PASS |
| Filters | Visible technical narrowing controls | Speed, connection, physical, advanced, and 0–64 port-range filters; reset and live count | PASS |
| Layout | No horizontal overflow, aligned content columns | 1280 px viewport reports 1280 px document width; no overflow | PASS |
| Interaction states | Clear active, empty, and reset states | PoE narrows to two categories; 0-port state shows no-results; reset restores all nine | PASS |
| Responsive behavior | Stack into a legible single-column experience | CSS collapses hero and result rows; actions become full width at mobile breakpoints | PASS |

## Evidence

- `implementation-hero.png`
- `implementation-categories.png`
- Automated contract tests: 5 passed

## Result

**PASS** — The page follows the selected No. 3 visual direction while retaining the full Moxa category content and interaction coverage.
