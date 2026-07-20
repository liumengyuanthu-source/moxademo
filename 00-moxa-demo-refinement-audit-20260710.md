# Moxa PoC Demo — Refinement Audit (2026-07-10)

Refinement pass applied to `moxa-figma-static-pages` against the two approved
briefs (Build Requirements V1.0 and Codex Page Modification & Audit Brief V1.0).
The package remains a self-contained HTML set (inline CSS, embedded images) so
the HTML-to-Figma import still works; all added interactivity is
progressive-enhancement JavaScript that degrades to the existing static
`is-active` classes when scripts are stripped.

## 1. Changes Applied

| # | Change | Rationale (brief reference) |
| --- | --- | --- |
| 1 | Unified top-level IA to **Products / Solutions / Support / How to Buy / About Us** on every page | Build Req §2 "Top-level IA remains Products, Solutions, Support, How to Buy and About Us" |
| 2 | Moved demo utilities (Demo Map, Design System, Contact) to header utility actions | Keep customer-facing IA clean; preview mechanisms hidden (Codex Brief §5) |
| 3 | Correct active-nav state per page; hub/system pages intentionally have none | Codex Brief WP1 "route-aware active states" |
| 4 | Added **P07 HXML Manual** page (`manual.html`) with sticky TOC, anchored sections, version metadata, PDF download | Build Req §9 P07 — page was missing |
| 5 | Added **P06 LV/HV Compare** page (`compare-lv-hv.html`) with difference-highlighted table, persist-to-quote CTA | Build Req §8 P06 — was folded into other pages |
| 6 | Wired new pages into Series, Model, and Search pages, plus `index.html` and `demo-map.html` | Codex §9 clickability; no orphan pages |
| 7 | Added breadcrumbs to Article and Video pages | Build Req §13/§14 both require breadcrumb |
| 8 | Added progressive-enhancement JS: sticky header, mobile menu, functional tabs, accordions, compare-drawer, dismissible campaign float | Pages were 100% static with non-functional tabs/accordions |
| 9 | Added reproducible **Homepage A/B/C** state logic (`?demoState=`, `?demoAudience=tw-ethernet-no-microsite`, session `visitedEDS4008` flag) hidden from customer layout | Build Req §3 + Codex §5 homepage state logic |
| 10 | Tagged every content image with `data-asset-source` (moxa-official / unclassified) | Codex §6 source classification; enables asset audit |
| 11 | Created placeholder datasheet PDF and repaired 3 broken datasheet links | Definition of Done #9 "No dead links exist" |

## 2. Audit Results (post-refinement)

| Check | Result |
| --- | --- |
| Broken internal links | PASS: 0 (was 3) |
| Dead `href="#"` / empty href | PASS: 0 |
| Unresolved in-page hash anchors | PASS: 0 |
| Duplicate element IDs | PASS: 0 |
| HTML parse (lxml, 20 pages) | PASS: 0 errors |
| Approved top-level IA present | PASS: all pages |
| Active nav state correct | PASS: content pages 1, hub/system pages 0 by design |
| Images missing alt text | PASS: 0 of 55 |
| Enhancement JS present + Figma-safe fallback | PASS |
| Self-contained (no external CSS/JS/img) | PASS: JS is inline `<script>`, still stripped on Figma import |

Machine-readable results: `/audit/link-results.csv` (1124 rows),
`/audit/asset-inventory.csv`, `/audit/component-usage.csv`,
`/audit/page-criteria-results.csv`, `/audit/test-case-coverage.csv`.

## 3. Known Remaining Gaps (not fixed in this pass)

These are noted rather than hidden, per Definition of Done #12.

1. **Data layer not yet externalized.** Content is still inline in each page.
   The Codex brief §6 calls for `/data/*.json` mock files driving components.
   This is a framework-level task (Next.js/Vue) beyond a static Figma export
   and should be done when repository/framework access is confirmed.
2. **Homepage A/B/C** is simulated via JS state toggling of `[data-hero-variant]`
   blocks. The current homepage hero has one authored variant; the B and C
   variant markup should be authored so the state logic has content to swap.
3. **Search typo/synonym/sponsored/AI-refusal** states exist as visual sections
   but are not yet interactive state machines.
4. **Backend/Sitecore admin** screens remain evidence mocks (correct per D04);
   Christina's live demo/screenshots cover these.
5. `pdp.html` and `products.html` are legacy/aggregate pages retained from the
   source export; they are not in the 12-page public inventory and can be
   removed or kept as reference.

## 4. Recommended Next Steps

- Author Homepage B and C hero variant blocks (`data-hero-variant="B"` / `"C"`).
- Externalize content into the `/data` JSON layer during framework conversion.
- Build the interactive search state cases and AI refusal state.
- Replace the placeholder datasheet PDF and `unclassified` image tags with
  real Moxa-official or clearly-labelled JiMeng demo assets.

## 5. Real Moxa Image Integration (2026-07-10, second pass)

The 9 official Moxa images provided were embedded (data-URI) into every relevant
slot, keeping the package self-contained for Figma import. Real files are also
copied into `asset/` for a runtime (non-embedded) build.

| Image | Used for |
| --- | --- |
| `hero.jpg` | Homepage hero background |
| `family-network.jpg` | Network Infrastructure card, EDS series/product imagery |
| `family-edge.jpg` | Edge Connectivity card, ioLogik / SDS slots |
| `family-computing.jpg` | Industrial Computing card, UC-8600A |
| `mgate-g2-kv.jpg` | IIoT Gateways card, MGate slots, video poster |
| `scenario-manufacturing.jpg` | Factory Network Modernization, article FAQ |
| `scenario-transport.jpg` | Remote I/O / field deployment scenario |
| `scenario-energy.jpg` | Microgrid / Power scenario |
| `connection-abstract.jpg` | Campaign + TSN diagram slots |

Result: 52 images tagged `moxa-official`, 3 `placeholder` (award badge, PDP 360
frame, chatbot reference — none covered by the 9 supplied images), 0 unclassified.
Homepage and mega-menu design were left unchanged per request; only pixels swapped.


## 6. Header / Homepage Unification (2026-07-10, third pass)

Per request, the approved homepage design ("Reliable networks. Sincere service.",
with the live node-network hero, guided finder, and AI chatbot) now IS the
package homepage — images embedded so it stays self-contained for Figma.

Its header + mega-menu became the single source of truth for the whole demo:

- Extracted the header markup, a token-inlined self-contained header CSS block
  (~5 KB, no dependency on each page's own tokens), and the mega-menu + mobile
  toggle + search JS.
- Replaced the old glass `.site-header` on all 19 sub-pages with this header,
  added a base-layout supplement so desktop flex layout is guaranteed, and
  hid any legacy header remnants.
- Rewired every mega-menu / footer / CTA link (homepage included) to real
  package routes so there are zero `href="#"` dead links anywhere.

Verified by rendering: homepage, search, category, manual, microsite,
compare-quote, contact — all show the identical 5-item mega-menu
(Products / Solutions / Resources / Support / Why Moxa), nav in flex layout,
no old header visible.

### Post-unification audit
| Check | Result |
| --- | --- |
| Pages | 21 |
| Parse errors | 0 |
| Broken internal links | 0 |
| Dead `href="#"` | 0 (was 74 on the imported homepage) |
| Unresolved anchors | 0 |
| Duplicate IDs | 0 |
| Header consistent across pages | PASS (5-item mega-menu everywhere) |
| Images classified | 29 moxa-official, 2 placeholder, 0 untagged |


## 7. Header / Banner Alignment Fix (2026-07-10, fourth pass)

Audited every non-homepage header and banner. Found a pre-existing alignment
bug (present in the original source too): `.container.hero-inner` was pulled to
`width:100%`, so banner headings bled to the far-left edge and did not line up
with the header. The header actions were also overcrowded (Demo Map + Design
System + Contact) and wrapped to two lines.

Fixes applied to all 19 sub-pages via one injected alignment block:
- Body `.container` and the banner `.hero-inner` now share the header's column
  (max-width 1240px, matching gutter), so the logo and every H1 start at the
  same x-position.
- Sticky sub-navs align to the same column.
- Header actions reduced to match the homepage exactly (search icon + Contact
  Us); Demo Map / Design System are no longer in the header (still reachable via
  the demo map / footer). Nav and buttons set to `nowrap`.

Verified by rendering all 19 sub-pages at 1440px and 390px: logo and H1 aligned
to x=158 on every page, no wrapping, mega-menu opens correctly, mobile toggle
works. Final: 0 broken links, 0 dead links, 0 duplicate IDs, 0 parse errors.
