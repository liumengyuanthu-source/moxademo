# Moxa PoC — SitecoreAI Handoff

Prepared for Stephen on 20 July 2026.

## Delivery scope

The PoC contains 12 page classes represented by 13 customer-facing routes. The LV and HV model pages are separate routes using one reusable Product Model template. The homepage campaign pop-up is a component, not an additional route.

| # | Page class | Route | Recommended Sitecore template |
|---:|---|---|---|
| 1 | Homepage | `homepage.html` | Home Page |
| 2 | Search Results | `search.html` | Search Results Page |
| 3 | EDS-4008 Series | `product-series-eds-4008.html` | Product Series Page |
| 4 | Campaign | `campaign.html` | Campaign Landing Page |
| 5 | Remote I/O Microsite | `microsite.html` | Microsite Landing Page |
| 6 | Video | `video.html` | Video Detail and Library Page |
| 7 | Ethernet Switches | `product-category-ethernet-switches.html` | Product Category Page |
| 8 | EDS-4008-LV | `eds-4008-lv.html` | Product Model Page |
| 9 | EDS-4008-HV | `eds-4008-hv.html` | Product Model Page |
| 10 | NPort 5100 Series | `nport-5100-series.html` | Product Series Page |
| 11 | HXML Manual | `manual.html` | Technical Manual Page |
| 12 | LV/HV AI Comparison | `compare-lv-hv.html` | AI Comparison Experience Page |
| 13 | 360 Product Media | `product-360.html` | Product Media Page |

`index.html` is the review entry point. The repository also includes supporting prototypes, audit reports, source screenshots, design-system evidence, and test files. Keep those files for traceability; do not treat them as additional production routes.

## Start here

1. Read `COMPONENT_AND_TEMPLATE_MAP.md` before creating Sitecore renderings.
2. Use `ROUTE_COMPONENT_TEMPLATE_MATRIX.csv` as the machine-readable implementation matrix.
3. Read `INTEGRATION_CHECKLIST.md` before connecting Search, AI, forms, consent, locale, identity, analytics, and media.
4. Read `PACKAGE_CONTENTS.md` before copying or removing files.
5. Serve the site over HTTP for review. Direct `file://` viewing can restrict browser behavior.
6. Use `assets/css/moxa-ds.css` and `assets/js/moxa-shell.js` as the shared design-system and shell references.
7. Use `assets/css/microsite-remote-io.css`, `assets/js/microsite-remote-io.js`, and `assets/js/moxa-lead-form.js` as the Remote I/O and shared lead-form references.

## Shared contracts that must remain consistent

- One global header, mega menu, search, Ask AI action, utility links, responsive behavior, and Contact Us CTA.
- One clickable breadcrumb system.
- One compact global footer with social icons, subscription, legal links, and default country/language.
- One shared lead-capture schema for Campaign and Microsite: First name, Business email, Company, Industry, Country/region, Project details, Privacy consent.
- One design-token layer for typography, spacing, buttons, cards, inputs, focus states, radii, and colors.

## Implementation boundary

This is a front-end PoC. Search, Ask AI, forms, subscription, locale, analytics, consent, and authentication demonstrate presentation and interaction. Production use requires the approved Sitecore and enterprise services described in `INTEGRATION_CHECKLIST.md`.
