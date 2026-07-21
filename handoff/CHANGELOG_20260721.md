# Moxa PoC change log — 21 July 2026

This is the final pre-SitecoreAI handoff change set. All items below are implemented in the supplied HTML, CSS, and JavaScript, not only described in the review deck.

## Global shell and design system

- Kept one shared two-row header, bounded mega menu, search/Ask AI, utility links, Contact Us, breadcrumb, Advisor launcher, and compact footer.
- Preserved menu close on outside click, page scroll, and Escape; keyboard focus and responsive states remain part of the component contract.
- Normalized typography, spacing, buttons, card controls, inputs, focus states, and responsive containers through `assets/css/moxa-ds.css` and page-level component styles.

## Homepage and identity

- Kept the approved homepage content structure, image-first hero system, campaign overlay, AI-guided search, floating navigator, product/content sections, metrics, and footer.
- Membership registration now exists **only as the homepage Sign In modal**. The standalone `membership-signup.html` route was removed.
- The modal contains Account details, Confirm profile, and My Moxa ready states; it closes by close button, outside click, or Escape; traps focus while open; and returns focus to the trigger.
- The modal dispatches `moxa:membership:registered` and stores a CRM-ready profile contract without exposing a debug payload in the UI.
- Existing-account copy is: “Already have an account? Sign in”.

## Campaign

- Applied approved Hero Concept A using `assets/campaign-security/secure-network-selection-guide.jpg` with a left-to-right accessibility overlay and responsive focal position.
- Removed decorative proof chips. CTA routing and sticky campaign anchors remain clickable.
- Retained accordion plus/minus behavior, architecture selection, portfolio routing, and shared lead capture.

## Ethernet Switches category

- Applied approved Concept 3: compact text-only hero with no decorative hero image and no hero CTA buttons.
- Preserved the full nine-category source content as two-column title/description rows.
- Preserved functional port-range, speed, connection, physical, and advanced-option filters, live visible count, reset, and no-result state.
- Category titles route to the relevant result or series page.

## Product and content journeys

- EDS-4008 Series: simplified text-first hero, compact technical-validation actions, full models/resources/applications, embedded 360 viewer, compare and quotation handoffs.
- EDS-4008-LV/HV: model-specific facts, resources, and quote links preserved using one reusable model pattern.
- EDS-4008 and NPort 5100: cross-sell modules added from the approved implementation brief.
- Quote workflow: LV + HV + SFP accessory cart, requester confirmation, consent, and simulated SFDC/CRM submission boundary remain connected.
- Search: typo, partial query, synonym, document intent, Ethernet Switches, and no-result recovery states remain implemented and contract-tested.
- Article: in-page video, structured FAQ accordion, five-point feedback scale, and one-card-at-a-time related-article carousel implemented.
- Remote I/O Microsite: approved hero, overview, portfolio, applications, brochure viewer, selection table, and harmonized lead form retained.

## Integration boundaries

- Search, AI, identity, Salesforce, subscription, consent, locale, and analytics are front-end integration contracts. They require Stephen’s approved SitecoreAI and enterprise endpoints.
- No credentials or production tokens are included.
- `handoff/sitecoreai/interaction-contract.json` is the machine-readable behavior contract; `INTERACTION_AND_MOTION_SPEC.md` is the implementation guide.
