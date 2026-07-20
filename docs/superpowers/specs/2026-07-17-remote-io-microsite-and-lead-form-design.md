# Remote I/O Microsite and Shared Lead Form Design

Date: 2026-07-17

Status: Approved design direction; implementation pending

Primary route: `microsite.html`

## 1. Objective

Replace the current Remote I/O Microsite body with the complete content and interaction model from `moxa-remote-io-spotlight-tobe.html`, while preserving the existing global Moxa header, breadcrumb, footer, and AI Advisor. Compact the hero and proof metrics to match the supplied screenshot, and make the lead-capture form a shared, consistent pattern across the Microsite and Campaign pages.

The result must be ready for the Moxa PoC and for later Sitecore AI component/template analysis.

## 2. Source of Truth and Boundaries

### Content source

The `<main>` experience from `/Users/christinaliu/Downloads/moxa-remote-io-spotlight-tobe.html` is the content and interaction source of truth.

The following content must be retained:

1. Compact Remote I/O hero with two CTAs and four proof metrics.
2. Overview and video entry point.
3. Why Moxa three-pillar switcher: Proactive, Easy to Use, and Reliable.
4. Supported-model chips within capability content.
5. Product Portfolio cards with visible benefits and Learn More/Compare actions.
6. Portfolio brochure thumbnails, lightbox, and PDF download path.
7. Applications and case-study collection.
8. Four-series Selection Guide with sticky first column, difference highlighting, print behavior, and View Series links.
9. Follow-up information / lead-capture experience.

### Global shell

Do not copy the reference HTML header or footer. Use the existing shared components from `assets/js/moxa-shell.js` and `assets/css/moxa-ds.css`:

- Global header and mega menu
- Global search and Ask AI
- Shared breadcrumb
- Global footer, social links, subscription, legal links, and locale selector
- AI Advisor launcher and panel

### Page-level navigation

Because the reference header contains important page anchors, add a separate secondary anchor bar below the breadcrumb. It contains:

- Overview
- Why Moxa
- Portfolio
- Applications
- Selection Guide
- Contact Us

The bar becomes sticky below the global header, uses scroll-spy to show the current section, supports keyboard focus, and accounts for sticky offsets when anchors are opened.

## 3. Layout and Design System

### Container rule

- Maximum content width: 1200px
- Desktop horizontal gutter: 48px
- Tablet horizontal gutter: 32px
- Mobile horizontal gutter: 20px
- All sections, including hero, Selection Guide, and lead form, use the same container alignment.

### Typography

- Font family: the shared Moxa Design System font stack; do not load an additional page-only family.
- Hero eyebrow: 12px, bold, uppercase, 0.14em tracking.
- Hero headline: 52px desktop, 40px tablet, 34px mobile; line-height 1.08.
- Section heading: 32px desktop; line-height 1.15.
- Lead text: 18px desktop; line-height 1.55.
- Body copy: 16px; line-height 1.6.
- Card body: 14–16px depending on density; minimum line-height 1.5.

### Color and shape

- Hero: Moxa deep-teal to teal gradient, with a restrained cyan/teal radial accent.
- Primary action: Moxa Green/Teal with white text.
- Secondary action: transparent/white outline on dark surfaces; shared secondary action elsewhere.
- UI radius: 2–6px for buttons and fields.
- Panel/media radius: 10–14px where the reference uses contained media or cards.
- No decorative placeholder art. Use the supplied and official Moxa images.

### Section rhythm

- Standard desktop section padding: 72px.
- Dense utility sections: 56–64px.
- Mobile section padding: 48px.
- Section headings, intros, and content grids align to the same left edge.

## 4. Compact Hero Specification

The screenshot is the visual authority for composition, but the requested revision makes it materially shorter and denser.

### Desktop

- Target visible hero height: 440–480px, excluding the global shell and breadcrumb.
- Two-column layout: approximately 52% copy / 48% image.
- Vertical padding: 48px.
- Image height: 300–320px; `object-fit: cover`; subject remains visible without stretching.
- Headline: `Stay Ahead by Reading the Field` with a controlled two-line wrap.
- CTA row: `Watch the video` and `Explore the portfolio`.

### Proof metrics

Use a four-column grid, not a wrapping flex row:

- 4 — Product series
- 5-year — Industry-leading warranty
- -40 to 85°C — Wide-temp options
- 12 — Real-world case studies

Metric treatment:

- Divider above the row.
- 16px column gap.
- Value: 20px, bold.
- Label: 12px, muted teal-white.
- No metric may wrap into a second row at standard desktop widths.
- At tablet widths, use two columns; at mobile widths, use two columns with compact vertical spacing.

## 5. Content Components and Interactions

### Overview

- Preserve the reference copy and video thumbnail.
- Video opens in an accessible modal.
- Closing the modal clears the iframe source to stop playback.
- Escape and backdrop click close the modal; focus returns to the trigger.

### Why Moxa pillar switcher

- Preserve the three pillars and their supporting content.
- Use tabs with correct `role`, `aria-selected`, and keyboard navigation.
- Supported products appear as reusable model chips.
- Reliable proof metrics remain visible and data-led.

### Product Portfolio

- Four product series remain visible without flip-card behavior.
- Product image, type, title, four key benefits, Learn More, and Compare remain discoverable on desktop and touch devices.

### Brochure viewer

- Preserve the thumbnail strip, full-size lightbox, page count, previous/next controls, and download action.
- Escape closes the lightbox; arrow keys move between pages.

### Applications

- Preserve four application domains and the 12-case-study CTA.
- Use official Moxa source imagery and real links.

### Selection Guide

- Preserve the four-series engineering comparison.
- Sticky parameter column remains visible during horizontal scrolling.
- Difference highlighting is optional and clearly labeled.
- Print mode expands the required content and hides page-only interactive controls.
- Table remains horizontally scrollable on small screens without compressing text below readable sizes.

## 6. Shared Lead Form Component

### Component boundary

Create one shared visual and behavioral pattern named `MoxaLeadForm`. The Campaign and Microsite pages use the same structure, field sizing, spacing, validation, privacy copy, button, success state, and responsive behavior.

Page-specific variation is limited to:

- Eyebrow and heading
- Introductory copy
- Service-benefit list
- Industry options and project-detail placeholder
- Success-state follow-up sentence

### Layout

- Desktop: left service/expectation card and right form, approximately 40% / 60%.
- Tablet/mobile: single column, service card first.
- The form is a white card with restrained border/shadow on a deep-teal context.
- Field grid is two columns on desktop and one column on mobile.

### Confirmed shared fields

1. First name — required
2. Business email — required and email-validated
3. Company — required
4. Industry — required
5. Country / region — required
6. Project details — required
7. Privacy consent — required

Do not add Last Name because the previously confirmed PoC schema does not include it. The reference form controls the visual treatment and validation behavior, not an expanded data schema.

### Interaction and states

- Validate on submit, then revalidate an invalid field on blur/change.
- Show field-level error copy directly below the control.
- Move focus to the first invalid field after submit.
- Privacy consent error is visible beside the consent row, not only as a toast.
- Successful submission replaces the form body with a clear confirmation state.
- Use `role="status"` / `aria-live="polite"` for submission feedback.
- Preserve user-entered values when validation fails.
- Production submission remains a Sitecore/CRM integration responsibility; the PoC simulates a successful response.

## 7. Assets and Deployment

- Download and store all referenced Remote I/O images under a dedicated local asset directory, such as `assets/microsite-remote-io/`.
- Preserve image meaning and crop; do not stretch images or replace them with generic placeholders.
- Keep source URLs documented in asset metadata or handoff notes.
- Use local relative paths so the GitHub package and Sitecore AI handoff do not depend on external hotlinks.

## 8. Responsive and Accessibility Requirements

Test at minimum:

- 1435px desktop
- 1024px compact desktop/tablet landscape
- 768px tablet
- 390px mobile

Requirements:

- No horizontal page overflow.
- Anchor bar may scroll horizontally on mobile but must not clip focused items.
- Hero copy and image stack cleanly.
- Buttons meet a minimum 44px touch target.
- Inputs have visible labels and focus states.
- Modal/lightbox focus is contained while open and returns to its trigger.
- Motion respects `prefers-reduced-motion`.
- Decorative imagery uses empty alt text; meaningful imagery uses concise descriptive alt text.
- Color contrast must be checked for text, controls, focus indicators, and muted labels.

## 9. Acceptance Criteria

The implementation is accepted when:

1. The reference HTML main-content modules are present with no substantive content loss.
2. The global header, breadcrumb, footer, search, Ask AI, and AI Advisor remain shared and functional.
3. The secondary anchor bar is sticky and scroll-spy works.
4. The hero is visibly shorter than the reference screenshot and current page, while preserving the intended hierarchy.
5. All four proof metrics remain in one desktop row.
6. All supplied/official imagery renders from local project assets.
7. Pillar tabs, video modal, brochure lightbox, Selection Guide toggle, print view, and lead form work with keyboard and pointer input.
8. Campaign and Microsite lead forms have the same layout, field sizing, schema, validation, consent, CTA, and success-state behavior.
9. Visual QA shows consistent typography, alignment, spacing, button sizing, image cropping, and responsive behavior at all required viewports.
10. No unrelated route or user-authored change is overwritten.

## 10. Verification Method

- Validate local asset paths and linked resources.
- Run structural checks for required section IDs and form fields.
- Capture the reference screenshot and implemented page at matching viewports.
- Compare the reference and implementation side by side for hero composition, spacing, typography, image crop, and form layout.
- Exercise all core interactions manually in the in-app browser.
- Run a keyboard-only pass and a reduced-motion pass.
- Recheck Campaign and Microsite forms together to confirm component consistency.
