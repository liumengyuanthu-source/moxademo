# Microsite visual QA — 2026-07-20

Reference: annotated Remote I/O microsite screenshot supplied by the user.

## Reviewed states

- Desktop: 1440 × 900
- Compact desktop/tablet: 934 × 915
- Route: `microsite.html`

## Corrections verified

- Hero proof metrics use four equal columns with consistent value and label baselines.
- “The whole portfolio in five pages” is intentionally set as two balanced lines.
- “Where Remote I/O Makes a Difference” remains on one line at desktop widths.
- Application-card headings and body copy share aligned rows and consistent bottom spacing.
- Application-card title and body top baselines are fixed and browser-measured within 1px per row.
- Contact title and introductory body copy use a browser-measured 24px design-system gap at 934px and 1440px.
- Overview, standard section headers, portfolio brochure, and contact modules now share the same `--rio-heading-body-gap: 24px` token.
- Browser measurements verify the title-to-body gap remains between 23px and 25px for all four module types at 934px and 1440px.
- “The whole portfolio in five pages” renders as one line at 934px and 1440px, with mobile wrapping retained below 620px.
- “Compare the four series side by side” remains on one line at desktop widths.
- Narrow screens retain responsive wrapping where a single line would harm readability.
- Lazy-loaded portfolio and application images were verified after a real scroll pass.

## Evidence

- `handoff/evidence/microsite-review/microsite-1440x900.png`
- `handoff/evidence/microsite-review/microsite-934x915.png`
- `handoff/evidence/microsite-review/microsite-applications-1440.png`
- `handoff/evidence/microsite-review/microsite-applications-934.png`
- `handoff/evidence/microsite-review/microsite-contact-1440.png`
- `handoff/evidence/microsite-review/microsite-contact-934.png`
- `handoff/evidence/microsite-review/microsite-brochure-1440.png`
- `handoff/evidence/microsite-review/microsite-brochure-934.png`
- `handoff/evidence/microsite-review/microsite-overview-1440.png`
- `handoff/evidence/microsite-review/microsite-overview-934.png`

final result: passed

## Final Campaign / Sign-in / Ethernet review — 2026-07-21

- Campaign route: `campaign.html`, selected concept `A`.
- Campaign hero now uses the supplied 2100 × 900 `secure-network-selection-guide.jpg` image-first asset. The left-to-right overlay protects the title, body, and two conversion actions while preserving the product composition on the right.
- The Campaign title no longer contains a forced line break; its desktop size is capped at 4.5rem and mobile wrapping is controlled by a 13ch measure.
- Rejected proof chips (`IEC 62443-4-1 SDL`, `IEC 62443-4-2 Products`, and `35+ Years in Industrial Automation`) are removed.
- Homepage sign-up dialog retains only the approved lightweight footer note: `Already have an account? Sign in`.
- Ethernet Switches retains selected concept 3: compact text-only hero, no hero image, no hero CTAs, nine AS-IS category titles, complete adjacent descriptions, and no repeated card metadata or CTA buttons.
- Ethernet filtering, live count, Reset, port range, native speed selection, empty state, and linked category navigation remain covered by automated contracts.
- Local server checks return HTTP 200 for Campaign, Homepage, Ethernet Switches, and the Campaign hero asset.
- Automated verification: 66 tests passed, including Campaign hero, membership modal, and Ethernet category contracts.

final result: passed

## Ethernet Switches category — corrected Option 3 — 2026-07-21

- Source visual truth: the user-provided AS-IS Ethernet Switches category capture at `/var/folders/zw/f8k7tk517b59fthbrlpg_tr00000gn/T/codex-clipboard-58a665d1-ccbe-4d80-9913-243a5ddbe911.png`, plus the latest annotated review that explicitly removes the hero image and both hero CTAs.
- Route reviewed: `product-category-ethernet-switches.html`.
- Desktop state: 1355 × 797, default filters and PoE-filtered state.
- Mobile state: 390 × 844, default filters and stacked category rows.
- Full-view evidence: `audit/ethernet-switches-no3-20260721/implementation-no3-corrected-hero.png`.
- Focused region evidence: `audit/ethernet-switches-no3-20260721/implementation-no3-corrected-top.png` and `audit/ethernet-switches-no3-20260721/comparison-no3-corrected.png`.
- Mobile evidence: `audit/ethernet-switches-no3-20260721/implementation-no3-corrected-mobile.png` and `audit/ethernet-switches-no3-20260721/implementation-no3-corrected-mobile-rows.png`.
- Intentional deviation from earlier concept mock: the hero is now a compact text-only field, with no product image and no “View categories” or “Compare models” buttons.
- Option 3 is now implemented as a two-column information row: linked category title on the left and the complete AS-IS description on the right. Metadata labels and repeated right-side CTA buttons are removed.
- Filter controls, live result count, Reset, native speed selection, port-range filtering, and category navigation remain functional.
- Browser verification confirms PoE filtering returns exactly “Layer 2 Managed Switches” and “PoE Switches”, Reset restores all 9 categories, and the console has no warnings or errors.
- Responsive verification confirms `scrollWidth === clientWidth === 390`; category rows stack without clipping or horizontal overflow.
- Automated contract verification passes all 5 Ethernet category tests.

final result: passed

## TSN article page — Option A / Editorial Clarity — 2026-07-21

- Rebuilt from the live Moxa article source and reviewed against both the original 1440 × 900 capture and the selected Option A design mock in one comparison input.
- The complete source article is retained in its original reading order, including all technical sections, two use cases, external source links, author metadata, tags, rating prompt, and related-article area.
- Shared Moxa header, breadcrumb, buttons, typography, spacing tokens, footer, locale control, and AI advisor are reused rather than duplicated.
- Desktop review confirms a 220px sticky contents rail, a 910px editorial canvas, a 760px reading column, and zero horizontal overflow at 1440 × 900.
- Mobile review confirms a 390px viewport and 390px document width with no horizontal overflow; the contents rail becomes a two-column index above the article.
- All four locally stored article images load correctly after lazy-loading, including the author portrait, TSN hero, video demonstration thumbnail, and network-topology diagram.
- Save article, copy-link, contents navigation, reading progress, and article-rating states were exercised in the browser. The console reports no errors.
- Evidence:
  - `handoff/evidence/article-review/article-design-comparison.jpg`
  - `handoff/evidence/article-review-desktop-1440x900.png`
  - `handoff/evidence/article-review-mobile-390x844.png`
  - `handoff/evidence/article-review-benefits.png`

final result: passed

## Homepage Summer Sales image-first A/B

- Formal homepage A/B reviewed at 1440 × 900 with reduced motion enabled.
- Both variants follow the existing image-first hero grammar: white editorial field, arched industrial-energy image, value icons, cyan network guides, and the same carousel controls.
- The content, composition, dimensions, destination, and alignment are identical across A/B.
- Version A changes only the CTA to orange `Inquire Now`; Version B changes only the CTA to Moxa-green `Contact an Expert`.
- Stable review parameters are `?experience=A` and `?experience=B`; fixed variants do not auto-rotate.
- CTA clicks emit `experiment_top_cta` plus `experience_variant`.
- Formal Explore Now is restored to the approved Machine OEM + Remote I/O cards and is independent of the hero experiment.
- The previous combined experience is preserved separately in `standalone/homepage-summer-sales-ab-embedded.html`, including embedded assets and independent `experiment_top_cta`, `experiment_explore_content`, and `experience_variant` tracking.
- Evidence:
  - `handoff/evidence/homepage-summer-ab-review/image-first-a-1440x900.png`
  - `handoff/evidence/homepage-summer-ab-review/image-first-b-1440x900.png`
  - `handoff/evidence/homepage-summer-ab-review/restored-explore-1440x900.png`

final result: passed

## Homepage Explore Now follow-up

- Reviewed at 1052 × 856 and 1440 × 900.
- “the core.” is protected as one phrase and no longer leaves “core.” alone on a third line.
- Evidence: `handoff/evidence/homepage-explore-review/explore-1052x856.png`

final result: passed

## Search result card typography rhythm — 2026-07-21

- The result label, title, description, and metadata now use explicit 10px, 8px, and 14px vertical gaps.
- Result titles use 18px / 22.5px typography; descriptions use 15px / 22.5px typography.
- At 934px, cards use a 160px image column and a protected copy column; the CTA moves below the copy.
- At 390px, cards become a single-column stack with no horizontal overflow.
- Evidence is stored in the local review package under `sitecoreai-final-homepage-ui-pages/design-references/`.

final result: passed
