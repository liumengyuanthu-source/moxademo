# Moxa Operational Design System and Figma Library — Design Specification

Date: 2026-07-20  
Status: Proposed for implementation  
Decision: Scheme A — operational Figma library plus visual handbook  
Audience: Joni (design consolidation), Stephen (component/template decomposition), Sitecore implementation team

## 1. Objective

Create one governed design-system source that accurately represents the current Moxa PoC, is visually clear enough for stakeholder review, and is structured enough for future Sitecore componentization.

The deliverable is not a presentation-only style guide. It must connect four layers:

1. Moxa brand and UX principles.
2. Native Figma variables, styles, components, variants, and templates.
3. The implemented HTML/CSS/JavaScript patterns in the latest 13-route PoC.
4. Recommended Sitecore renderings and datasource templates.

## 2. Sources of truth

Source precedence is:

1. Latest deployed PoC implementation at Git commit `8cf7de1`.
2. Shared implementation tokens and components in `assets/css/moxa-ds.css`, `assets/js/moxa-shell.js`, and shared form modules.
3. Page-specific CSS and JavaScript where a reusable pattern has not yet moved into the shared layer.
4. Existing Moxa Interface System and Bond-Line visual documentation.
5. Original Moxa pages and client-provided visual assets for content and brand context.

When code and an earlier visual document disagree, the latest approved PoC implementation wins unless the conflict creates an accessibility or consistency defect. Every such exception will be documented in the gap matrix.

## 3. Deliverables

### 3.1 Native Figma design-system file

Working title: `Moxa PoC Operational Design System v1.0`

The file will contain editable native Figma objects, not flattened screenshots:

- Variables and variable modes.
- Text, effect, and grid styles.
- Auto-layout components.
- Component properties and variant sets.
- Responsive examples.
- Page-pattern compositions.
- Twelve page-type templates covering thirteen routes.
- Code and Sitecore mapping annotations.

The final handoff will include the native Figma URL. If Figma export permissions allow it, an offline `.fig` copy will also be included; the URL remains the authoritative source.

### 3.2 Complete visual handbook

Produce an English visual handbook in HTML and PDF, approximately 26–32 pages, suitable for stakeholder review and implementation reference. It will reuse approved visual-system material but expand it with foundations, component anatomy, states, accessibility, templates, and governance.

### 3.3 Machine-readable implementation assets

- Design-token JSON.
- CSS-variable crosswalk.
- Component inventory CSV.
- Route/component/template coverage matrix.
- Sitecore rendering and datasource mapping.
- Handoff README and version manifest.

## 4. Design principles

### 4.1 Reliable industrial clarity

The interface must communicate technical credibility through disciplined alignment, restrained decoration, legible evidence, and predictable interaction.

### 4.2 Product evidence before promotion

Product imagery, specifications, compatibility information, source links, and application proof take priority over generic marketing decoration.

### 4.3 Guided decision making

Search, filters, selectors, comparison tools, anchor navigation, and the Moxa Advisor should reduce selection effort without obscuring source evidence.

### 4.4 One shared system, configurable templates

Global shell, section rhythm, controls, forms, cards, and interaction states are shared. Page differences come from configuration and datasource content, not from unrelated styling.

### 4.5 Accessible by default

Keyboard access, focus visibility, semantic structure, contrast, input labels, validation, motion reduction, and minimum target sizes are component acceptance criteria.

## 5. Figma file architecture

The native file will use the following ordered pages:

1. `00 — Cover & Release Status`
2. `01 — Getting Started`
3. `02 — Principles & Brand Expression`
4. `03 — Foundations / Color`
5. `04 — Foundations / Typography`
6. `05 — Foundations / Grid & Spacing`
7. `06 — Foundations / Radius, Elevation & Motion`
8. `07 — Foundations / Iconography & Imagery`
9. `--- COMPONENTS ---`
10. `10 — Actions / Button & Link`
11. `11 — Inputs / Search, Text, Select & Consent`
12. `12 — Navigation / Header, Mega Menu & Breadcrumb`
13. `13 — Navigation / Anchor Nav & Floating Navigator`
14. `14 — Content / Labels, Badges, Alerts & Section Header`
15. `15 — Cards / Product, Resource, Application & Video`
16. `16 — Disclosure / Accordion, Tabs & Modal`
17. `17 — Data / Specification, Comparison & Search Results`
18. `18 — Media / Hero, Video & 360 Viewer`
19. `19 — Conversion / CTA, Lead Form & Footer`
20. `20 — AI / Ask AI and Moxa Advisor`
21. `--- PATTERNS & TEMPLATES ---`
22. `22 — Shared Shell Patterns`
23. `23 — Product Discovery Patterns`
24. `24 — Product Detail Patterns`
25. `25 — Campaign & Microsite Patterns`
26. `26 — Support, Manual & Media Patterns`
27. `27 — Page Templates / 12 Types`
28. `28 — Route Coverage / 13 Routes`
29. `29 — Accessibility & Content Guidance`
30. `30 — Sitecore Mapping & Governance`
31. `31 — Changelog & Open Decisions`

## 6. Token architecture

### 6.1 Collections

1. `Moxa / Primitives` — one mode, raw brand and neutral values.
2. `Moxa / Semantic Color` — `Light`, `Dark Campaign`, and `Inverse` modes.
3. `Moxa / Spacing` — 4, 8, 12, 16, 24, 32, 48, and 64 px.
4. `Moxa / Radius` — 4, 8, 12, and pill; mapped to the implemented CSS.
5. `Moxa / Sizing` — content widths, control heights, icon sizes, and touch targets.
6. `Moxa / Typography` — font-size and line-height values where supported; text styles remain authoritative for composed typography.
7. `Moxa / Motion` — duration and easing values documented for implementation mapping.

### 6.2 Core implemented values

- Moxa Teal: `#008787`
- Moxa Teal 700: `#006B6B`
- Moxa Teal 100: `#E7F5F4`
- Moxa Navy: `#082F49`
- Moxa Cyan: `#40CBD0`
- Moxa Orange: `#F39A61`
- Ink: `#162F3A`
- Muted: `#637781`
- Line: `#D7E3E4`
- Surface: `#F4F8F8`
- White: `#FFFFFF`
- Font stack: `Helvetica Neue`, Helvetica, Arial, sans-serif
- Content width: `1240px`

Semantic variables will alias primitives. Every variable will receive an explicit Figma scope and a web code-syntax mapping to the real CSS variable.

## 7. Typography system

Text styles will cover:

- Display / Hero.
- Heading / H1–H4.
- Section heading.
- Card title.
- Body / Large, Default, and Small.
- Label / Eyebrow and Navigation.
- Data / Metric and Table.
- Utility / Caption and Metadata.
- Link / Inline and CTA.

The scale will preserve the current desktop hierarchy while adding explicit responsive examples. Line length and non-wrapping headline rules will be documented rather than handled through arbitrary per-page font reduction.

## 8. Component scope

### 8.1 Global shell

- Global Header.
- Utility links.
- Header search and Ask AI toggle.
- Primary navigation.
- Bilingual mega menu.
- Contact Us action.
- Breadcrumb.
- Global Footer.
- Social icon links.
- Stay Connected subscription.
- Country/language selector.
- Moxa Advisor launcher and panel.

### 8.2 Actions and forms

- Button: Primary, Secondary, Hero CTA, Text; default, hover, focus, active, disabled; supported sizes.
- Link: inline, navigation, utility, arrow-link.
- Text input, search input, select, textarea, checkbox/consent, field label, helper text, error state, success state.
- Unified lead-capture form with Campaign and Microsite compositions.

### 8.3 Navigation and disclosure

- Sticky anchor navigation.
- Floating section navigator.
- Tabs.
- Accordion with plus/minus icon and smooth state transition.
- Modal/video viewer.
- Back-to-top.

### 8.4 Content and evidence

- Eyebrow and section header.
- Badge, tag, alert, source reference.
- Product, series, model, resource, application, case-study, video, metric, and contact cards.
- Product specification table.
- LV/HV comparison table.
- Search result summary, facet, group, and result card.
- Product-family selector and model row.

### 8.5 Media and AI

- Hero family: home, category, series, model, campaign, microsite, video, manual, product media.
- Video player and playlist item.
- 360-degree product viewer controls.
- Ask AI control.
- Moxa Advisor conversation shell, user message, assistant message, comparison response, citations, and follow-up prompt.

Every component page will include anatomy, tokens, properties, variants, interaction notes, content guidance, accessibility criteria, and code/Sitecore mapping.

## 9. Template and route coverage

The system will document twelve page types and thirteen routes:

1. Homepage — `homepage.html`
2. Search Results — `search.html`
3. Product Category / Ethernet Switches — `product-category-ethernet-switches.html`
4. Product Series / EDS-4008 — `product-series-eds-4008.html`
5. Product Model / EDS-4008-LV — `eds-4008-lv.html`
6. Product Model / EDS-4008-HV — `eds-4008-hv.html`
7. Product Series / NPort 5100 — `nport-5100-series.html`
8. Campaign — `campaign.html`
9. Remote I/O Microsite — `microsite.html`
10. Video — `video.html`
11. HXML Manual — `manual.html`
12. AI LV/HV Comparison — `compare-lv-hv.html`
13. 360 Product Media — `product-360.html`

EDS-4008-LV and EDS-4008-HV share one Product Model template, which is why thirteen routes map to twelve page types.

## 10. Sitecore translation layer

Each mapped item will identify:

- Figma component or pattern.
- Current HTML selector or JavaScript module.
- Proposed Sitecore rendering name.
- Datasource template and fields.
- Allowed component placement.
- Responsive and interaction responsibilities.
- Analytics events.
- Content-author constraints.

Global shell, content data, rendering layout, JavaScript behavior, and external services will remain separated.

## 11. Visual handbook structure

The handbook will follow a concise narrative:

1. System purpose and brand-to-experience principles.
2. Foundations.
3. Component system.
4. High-value UX patterns.
5. Twelve page-type templates.
6. Thirteen-route coverage matrix.
7. Accessibility and content rules.
8. Sitecore implementation model.
9. Governance, ownership, and next-build rules.

The existing twelve-page Bond-Line story will be retained as the strategic opening section where useful, then expanded into operational documentation.

## 12. Governance

### 12.1 Ownership

- Design owner: maintains Figma variables, components, and visual guidance.
- Front-end owner: maintains token and component implementation parity.
- Sitecore owner: maintains rendering, template, and datasource mapping.
- Content owner: maintains labels, product evidence, localization, and source validity.

### 12.2 Change process

1. Propose the change against an existing token, component, pattern, or template.
2. Validate accessibility and cross-route impact.
3. Update Figma and implementation mapping together.
4. Record the change in the changelog.
5. Release with a semantic version.

## 13. Acceptance criteria

The work is complete when:

- All agreed variables exist with explicit scopes, aliases, and code syntax.
- Every planned component has documented properties and validated variants.
- All twelve page types and thirteen routes are mapped.
- Header, footer, breadcrumb, lead form, and Moxa Advisor are represented as shared systems.
- Component screenshots and metadata have been validated.
- Accessibility, naming, token binding, and responsive checks pass.
- The handbook, Figma URL, token files, component inventory, coverage matrix, and Sitecore mapping are packaged for Joni.
- No component claims production readiness if its behavior or data integration is only simulated in the PoC.

## 14. Explicit exclusions from v1

- Sitecore installation or backend configuration.
- Production search indexing and ranking configuration.
- Live CRM or marketing-automation submission.
- Production AI orchestration or model governance.
- Translation of every possible Moxa corporate site page outside the confirmed PoC scope.
- Exhaustive mobile variants for page types not represented in the PoC; responsive component rules will still be documented.

## 15. Implementation sequence

1. Audit current tokens, components, routes, visual documentation, and Figma environment.
2. Lock the token and component gap matrix.
3. Create Figma variables and styles.
4. Create documentation pages and foundations specimens.
5. Build and validate components in dependency order.
6. Compose patterns and templates.
7. Generate the visual handbook and machine-readable crosswalks.
8. Run QA and package the final handoff.
