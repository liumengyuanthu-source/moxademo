# Moxa POC Design QA

final result: blocked

## Scope

- Source visual truth path: `/Users/christinaliu/Documents/Moxa/20260710 redesign/moxa-figma-static-pages 4/homepage.html`
- Rendered implementation path: `/Users/christinaliu/Documents/Moxa/20260714 POC readiness/moxademo-github`
- Intended preview URL: `http://127.0.0.1:8772`
- Viewport target: `1440x1100`
- State: desktop, unauthenticated, default page state

## Browser Evidence

- Current browser-rendered screenshot pass: blocked.
- Blocker: the in-app browser rejected access to `http://127.0.0.1:8772` by security policy during the refined QA run.
- Previous evidence from the pre-fix audit remains in `audit/design-qa-20260715/`, but it does not represent the final refined pages.

## Static Verification Completed

- HTML files: `26`
- Missing local references: `0`
- Files larger than 90MB: `0`
- Visible text scan for previous garbling tokens: passed
  - Checked for `documents,and`, `EthernetSwitch`, `LV /EDS`, `SeriesUser`, `setupvideo`, `productimage`, `{{`, `}}`, `pageData`, `productData` after removing scripts/styles.
- New model pages present:
  - `eds-4008-lv.html`
  - `eds-4008-hv.html`

## Findings

- [P0] Final browser-rendered QA could not be completed
  Location: all refined pages.
  Evidence: browser security policy blocked the local preview URL used for the refined pass.
  Impact: I cannot honestly mark visual QA as passed, even though static checks passed.
  Fix: re-run browser screenshot QA in an allowed preview context, then update this file to `final result: passed` only if there are no P0/P1/P2 visual findings.

- [P2] Video page cannot publish the 4.3GB MP4 to GitHub
  Location: `video.html`, `assets/video/`.
  Evidence: source MP4 in the provided PoC package is approximately 4.3GB. The publishable package includes the supplied FireShot poster and transcript docx, but not the MP4.
  Impact: GitHub Pages can publish the video page, but the live page is a poster/transcript page rather than embedded playback.
  Fix: host the MP4 separately or provide a compressed web-ready MP4/WebM if live playback is required.

## Fixes Made Since Prior QA

- Search results now use a single-column `.search-results-list`; product rows are no longer inside the generic three-column `.detail-grid`.
- Hero titles no longer use forced `<br>` where they caused joined words.
- `eds-4008-lv.html` and `eds-4008-hv.html` were added as separate model pages.
- `compare-lv-hv.html` now compares LV, LV-T, HV, and HV-T.
- `product-series-eds-4008.html` was rebuilt with official-style sections: Overview, Features and Benefits, Specifications, Resources, Models.
- `product-category-ethernet-switches.html` was rebuilt around the official Ethernet Switches intro and Search By groups.
- `nport-5100-series.html` was rebuilt with official NPort 5100 intro, features, and specifications.
- `campaign.html` now uses the Secure Your OT Networks/Secure Networking campaign path and the supplied homepage pop-up banner assets.
- `video.html` now uses the supplied MGate G2 poster/docx package.
- `microsite.html` now includes Controller & I/O category context and supplied remote I/O assets.

## Required Fidelity Surfaces

- Fonts and typography: static source uses homepage shell and tokens. Final visual fidelity still needs browser screenshot confirmation.
- Spacing and layout rhythm: search layout was fixed statically; final viewport rhythm still needs browser confirmation.
- Colors and tokens: pages continue to use the homepage token system.
- Image quality and asset fidelity: campaign, video, microsite, EDS model, and 360 pages now use supplied local assets where available.
- Copy and content: product/category/model/NPort pages were mapped closer to official Moxa wording and structure.

## Implementation Checklist Before Marking Passed

1. Re-run browser screenshots in an allowed preview environment.
2. Confirm search results are readable and not vertically compressed.
3. Confirm homepage popup routes to `campaign.html`.
4. Confirm LV/HV pages render and link from series/model hub/compare pages.
5. Confirm video page displays poster/transcript correctly without MP4.
6. Confirm mobile breakpoint for search, model cards, and comparison table.

