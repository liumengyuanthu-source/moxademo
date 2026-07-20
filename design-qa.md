# Homepage EDS-4008 Third Banner — Design QA

final result: passed

## Scope

- Source visual truth:
  - `/var/folders/zw/f8k7tk517b59fthbrlpg_tr00000gn/T/codex-clipboard-8a1bb7fe-d929-41e3-a7d6-8ec096791df8.png`
  - `banner/ChatGPT Image Jul 13, 2026, 05_45_52 PM (3).png`
  - `banner/ChatGPT Image Jul 13, 2026, 05_45_51 PM (2).png`
  - `banner/eds-4008-validation-banner.png`
- Browser-rendered implementation:
  - `docs/qa/homepage-banner-third-desktop.png`
  - `docs/qa/homepage-banner-third-mobile.png`
- Viewports: `1435 × 795` desktop and `390 × 844` mobile.
- State: `homepage.html?demoState=eds4008Session`, unauthenticated.
- Preview URL used for QA: `http://127.0.0.1:8017/homepage.html?demoState=eds4008Session`.

## Comparison Evidence

- Full-view, same-viewport carousel comparison: `docs/qa/homepage-banner-three-state-comparison.png`.
- Focused source-versus-render comparison: `docs/qa/homepage-banner-source-render-focus-comparison.png`.
- Mobile three-state comparison: `docs/qa/homepage-banner-three-state-mobile-comparison.png`.

## Findings

- No actionable P0, P1, or P2 visual mismatch remains in the approved Option A scope.
- [P3] The campaign pop-up covers part of the right-side proof markers at this viewport. This is existing global campaign behavior and does not obscure the title or either CTA.

## Required Fidelity Surfaces

- Fonts and typography: the generated desktop banner carries the same bold industrial headline hierarchy, compact eyebrow, body scale, and button labels as banners one and two. Mobile uses live HTML text at readable optical sizes instead of shrinking the desktop artwork.
- Spacing and layout rhythm: desktop left copy, circular product focal point, right proof markers, and CTA row align with the first two banner compositions. Mobile keeps 20 px side margins, a stable content panel, and 54 px CTA height with no horizontal overflow.
- Colors and visual tokens: white technical canvas, deep navy type, Moxa green accent, teal primary CTA, and outlined secondary CTA match the existing homepage banner system.
- Image quality and asset fidelity: the EDS-4008 device is complete, sharp, uncropped, and presented against an industrial-control background. The delivered desktop asset is exactly `1916 × 821`.
- Copy and content: `Continue with EDS-4008`, `Validate the right model.`, the engineering-oriented supporting sentence, and both requested CTA labels are present without the former “Homepage C” annotation.

## Interaction and Browser Checks

- Third state loads as the active slide and the third tab reports `aria-selected="true"`.
- Banner A and Banner C tabs switch the active state correctly.
- `Compare LV/HV Models` navigates to `compare-lv-hv.html`.
- `Download Datasheet` resolves to `asset/moxa-eds-4008-series-datasheet-v1.8.pdf`.
- Runtime CTA paths no longer receive the obsolete `moxa-figma-static-pages 4/` prefix.
- Desktop and mobile horizontal overflow: `0 px`.
- Browser console warnings/errors during the tested state: none.

## Comparison History

1. Initial implementation used the approved generated asset and transparent desktop hotspots.
2. Browser interaction testing found a P1 functional issue: the legacy runtime route mapper prefixed both CTA destinations with a removed folder path, producing broken navigation.
3. The route base was normalized to the current root-page structure.
4. Post-fix browser evidence confirms the primary CTA reaches `compare-lv-hv.html`, the datasheet link is correct, carousel tab state is accurate, and no console errors remain.

## Residual Test Gaps

- The PDF link target was validated by its resolved URL and local file presence; the browser download prompt was not opened because downloading was not needed for this QA pass.
