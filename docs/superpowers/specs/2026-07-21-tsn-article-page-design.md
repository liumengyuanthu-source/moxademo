# TSN Article Page — Editorial Clarity Design Specification

## Goal

Rebuild the missing Moxa article route as a complete, locally reviewable article page that preserves the source article's full editorial content and official media while applying the approved Moxa design system and shared site shell.

## Approved direction

The selected concept is Option 1, **Editorial Clarity**.

- Shared two-row white Moxa header with logo, global search, `Ask AI`, account links, primary navigation, and the global Contact Us action.
- Breadcrumb, article label, complete title, Theo Lai author identity, `Dec 23, 2022`, share controls, and save control.
- A 1240px page grid with a slim sticky `On this page` rail and a comfortable long-form reading column.
- A reading-progress indicator that reflects document scroll without obstructing the shared header.
- The official TSN hero image remains the primary visual; the official video thumbnail and topology diagram appear in their matching source sections.
- Typography, borders, buttons, spacing, footer, responsive breakpoints, and focus states inherit the project's existing Moxa design-system tokens.

## Content preservation

The implementation must retain every substantive source module once, in source order:

1. Opening article paragraphs and source content list.
2. Technical Achievements.
3. Proven Network Redundancy.
4. Wireless Possibilities Unleashed.
5. Taking the Technology Further.
6. Reduce the Total Cost of Ownership in Wafer Manufacturing.
7. Minimize the Inconvenience of Downtime With Video Component Logging.
8. How TSN Helps.
9. Use Case 1: Machinery Manufacturer.
10. Use Case 2: Mass Customization Production System.
11. Case-study link.
12. Boundless Benefits, including Machine Builders, System Integrators, and End-Users.
13. Preparing for TSN Adoption and the official topology diagram.
14. Summary and TSN microsite link.
15. Tags, article rating, and three distinct More Articles cards.

The redesign may change hierarchy and presentation but must not shorten, synthesize, or invent technical claims.

## Interactions

- Table-of-contents links scroll to their sections and show the active section.
- Reading progress updates as the user scrolls.
- Share buttons open the corresponding share destination; copy-link gives visible confirmation.
- Save toggles a visible saved state for the PoC session.
- The video evidence opens through its official source URL in a new tab.
- Rating controls expose selected and confirmation states.
- Breadcrumbs, related articles, tags, and source links remain keyboard accessible.

## Responsive behavior

- Desktop: sticky left navigation plus centered reading column.
- Tablet: TOC becomes a compact horizontal/expandable navigation above the article.
- Mobile at 390px: single-column reading, no horizontal scroll, reduced title scale, full-width media, and 44px minimum interactive targets.

## Asset policy

- Download the official Theo Lai portrait, TSN hero, video thumbnail, and topology diagram into `assets/article/`.
- Do not hotlink source media.
- Reuse shared social icons and the existing Moxa logo from the project.
- Do not create placeholder or approximate graphics.

## Acceptance criteria

- `article.html` uses `assets/css/moxa-ds.css` and `assets/js/moxa-shell.js`.
- The complete source content and all required source headings are present once.
- All article assets resolve locally and have useful alternative text.
- Shared header and footer match the current site pages.
- TOC, progress, save, copy-link, and rating interactions work.
- Desktop 1440x900 and mobile 390x844 screenshots pass visual QA against the selected concept and source capture.
- All automated tests pass and `git diff --check` reports no whitespace errors.
- Changes remain local until the user explicitly requests GitHub deployment.
