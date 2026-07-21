# Moxa SitecoreAI PoC — Start Here

This repository root is the authoritative, clickable PoC build for Stephen's SitecoreAI component and template analysis.

## What is included

- 13 formal routes covering 12 page classes.
- Shared Moxa header, breadcrumb, footer, chatbot launcher, tokens, buttons, forms, and interaction patterns.
- Homepage-only My Moxa registration modal. There is no standalone membership registration route.
- EDS-4008 Series with model filtering, comparison selection, resources, applications, cross-sell behavior, and an embedded 36-frame product viewer.
- Quotation workflow from product selection to requester confirmation and simulated Salesforce-ready submission events.
- SitecoreAI component, page-composition, interaction, and motion contracts.

## Run and review

Serve the repository root through any static web server, then open `homepage.html`. All in-scope links are relative and should remain inside the package, except for clearly marked production Moxa links.

Recommended review order:

1. `homepage.html`
2. `handoff/README_SITECORE_HANDOFF.md`
3. `handoff/ROUTE_COMPONENT_TEMPLATE_MATRIX.csv`
4. `handoff/sitecoreai/component-manifest.json`
5. `handoff/sitecoreai/page-compositions.json`
6. `handoff/sitecoreai/interaction-contract.json`
7. `handoff/INTERACTION_AND_MOTION_SPEC.md`
8. `handoff/INTEGRATION_CHECKLIST.md`

## Important integration boundaries

- CRM/SFDC and SitecoreAI handoffs are represented through structured DOM attributes, custom events, and documented payload contracts. The static PoC does not contain production credentials or perform live CRM writes.
- My Moxa registration is a modal launched from the shared header's **Sign In** entry. It supports focus management, outside-click close, close control, Escape close, three registration steps, validation, and CRM-ready completion events.
- The previous standalone `product-360.html` is retained as supporting evidence only. The formal experience uses the embedded `Product360Viewer` on `product-series-eds-4008.html`.
- `article.html` is the formal article route and includes inline video playback, FAQ accordion, five-state feedback, and a card-by-card related-content carousel.

## Verification baseline

- Automated contract suite: 67 tests.
- Formal route reference audit: 856 references checked with zero missing local targets.
- Browser smoke checks cover modal opening/closing, category layout, campaign hero, article controls, and the embedded 360 viewer.

See `CHANGELOG_20260721.md` for the final change list and `PACKAGE_CONTENTS.md` for delivery inventory details.
