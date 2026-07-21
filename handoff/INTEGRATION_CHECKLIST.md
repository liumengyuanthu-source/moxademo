# SitecoreAI Integration Checklist

## Foundation

- [ ] Import design tokens, typography, spacing, button, input, card, focus, and responsive rules from `assets/css/moxa-ds.css`.
- [ ] Implement the Global Header, Breadcrumb, Global Footer, and Moxa Advisor once and reuse them across all routes.
- [ ] Create page templates and datasource templates before migrating page content.
- [ ] Preserve the 12 page classes / 13 route scope in `README_SITECORE_HANDOFF.md`.

## Media and documents

- [ ] Import all local JPG, PNG, SVG, PDF, DOCX, video thumbnails, brochure pages, and 360 frames into the Sitecore Media Library.
- [ ] Preserve meaningful filenames or maintain a source-to-media mapping.
- [ ] Configure crop and focal-point behavior for every hero and card variant.
- [ ] Replace local relative links with Sitecore media and link fields.

## Product data

- [ ] Use one Product Model template for EDS-4008-LV and EDS-4008-HV.
- [ ] Reuse the Product Series template for EDS-4008 and NPort 5100 with configurable components.
- [ ] Keep Product Category, Product Series, and Product Model templates distinct.
- [ ] Store specifications, certifications, downloads, application fit, and model relationships as structured data.

## Search and AI

- [ ] Connect header search, summaries, facets, ranking, result groups, and cards to Sitecore Search.
- [ ] Connect Ask AI and Moxa Advisor to the approved AI orchestration service.
- [ ] Ground engineering answers in approved product specifications and manuals.
- [ ] Place explicit source hyperlinks immediately below AI responses.
- [ ] Add prompt safety, citation validation, feedback, observability, and support escalation.

## Forms, consent, locale, and identity

- [ ] Build one shared Campaign/Microsite form in Sitecore Forms.
- [ ] Preserve First name, Business email, Company, Industry, Country/region, Project details, and Privacy consent.
- [ ] Add server-side validation, spam protection, consent logging, confirmation, CRM routing, and analytics.
- [ ] Connect Stay Connected to the approved subscription service.
- [ ] Connect legal and cookie controls to the consent-management platform.
- [ ] Resolve default country/language through the Sitecore site and language context.
- [ ] Connect Partner Zone, My Moxa, and Sign In to production identity flows.
- [ ] Implement Membership Registration as a homepage Sign In modal only; do not create a standalone route.
- [ ] Preserve three-step validation, focus trap/return, `moxa:membership:registered`, and a server-side Salesforce/CRM adapter; do not render the payload to visitors.

## Analytics

- [ ] Search submit and result click.
- [ ] Ask AI and Advisor entry/action.
- [ ] Campaign pop-up view, close, and click.
- [ ] Section-navigation and accordion use.
- [ ] Product finder, filters, compare, and quote actions.
- [ ] Resource and brochure downloads.
- [ ] Lead, contact, and subscription submissions.
- [ ] Membership modal open, step progression, completion, sign-in switch, and CRM handoff.
- [ ] Video play/progress/completion.
- [ ] `moxa:360-frame-change`.

## Accessibility and responsive QA

- [ ] Semantic landmarks, headings, labels, accessible names, and source-link context.
- [ ] Keyboard access and visible focus for menus, tabs, modals, accordions, forms, and the 360 viewer.
- [ ] Correct expanded, selected, current, live-status, and error states.
- [ ] Reduced-motion behavior.
- [ ] Color contrast and image-text overlays.
- [ ] Desktop, tablet, and mobile layout with zero horizontal overflow.
- [ ] Mega menu closes on scroll, outside click, and Escape.

## Pre-release validation

- [ ] Serve pages over HTTP and review all 13 routes from `index.html`.
- [ ] Check all local assets and links.
- [ ] Check browser console errors and warnings.
- [ ] Test Campaign and Microsite form invalid, valid, and success states.
- [ ] Test Remote I/O tabs, video modal, brochure viewer, difference toggle, and print view.
- [ ] Test search facets and result groups.
- [ ] Test LV/HV AI comparison table and source links.
- [ ] Test all 36 product frames and keyboard controls.
- [ ] Test homepage membership modal by click, hash deep link, outside click, Escape, keyboard focus, invalid/valid fields, confirmation, completion, and sign-in switch.
