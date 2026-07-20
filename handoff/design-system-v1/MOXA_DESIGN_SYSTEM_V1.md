# Moxa Operational Design System v1.0

## Purpose

The system makes Moxa’s engineering credibility visible and usable. It connects discovery, comparison, technical validation, source evidence, and conversion across the PoC rather than treating each page as an isolated design.

## Experience principles

1. **Credible:** specifications, sources, dates, and proof remain close to decisions.
2. **Guided:** navigation, search, filters, comparison, and Ask AI reduce time to product fit.
3. **Reusable:** page experiences are composed from tokens, native components, and template contracts.
4. **Operational:** Figma names map to Sitecore renderings and content models.

## Foundation decisions

- Moxa Green is the primary brand and action color.
- Orange is reserved for high-attention hero actions; Cyan is reserved for AI/focus accents.
- Inter is used for editable Figma documentation because Helvetica Neue and Arial are unavailable in the plugin environment. The website implementation keeps the approved Helvetica Neue / Helvetica / Arial fallback stack.
- The 8-point spacing rhythm uses 4px half steps and a 1240px desktop content container.
- Radius uses 4px for controls, 8–16px for panels/cards, and pill only for filters or status.
- Motion uses 120ms, 200ms, and 320ms durations and respects reduced-motion preferences.

## Component rules

- Every interactive component includes default, hover, focus, active, disabled, and relevant validation/loading states.
- Primary controls have a minimum 44px target height and visible 3px Cyan focus ring.
- Header, mega menu, breadcrumb, lead form, footer, locale selector, and Moxa Advisor are shared across routes.
- Campaign and Microsite use the same unified lead-capture composition and datasource schema.
- AI responses place explicit source hyperlinks immediately below the answer.
- Tables use captions and scoped headers; disclosure components use semantic buttons and accessible state.

## Template coverage

The 12 page types are Homepage, Search Results, EDS-4008 Series, Campaign, Remote I/O Microsite, Campaign Pop-up, Video, Ethernet Switch Category, EDS-4008 LV/HV Model, NPort 5100 Series, HXML Manual, and Compare/360 specialist UI. LV and HV remain separately addressable routes, producing 13 route contracts.

## Sitecore handoff

Use `sitecore-crosswalk.csv` as the starting decomposition. Each rendering entry identifies the Figma component, suggested Sitecore rendering, content fields, datasource ownership, rendering parameters, behavior ownership, analytics, and acceptance criteria. The matrix is intentionally implementation-ready but does not install or configure the Sitecore backend.

## Governance

- Patch: visual or code fix without contract change.
- Minor: backward-compatible token, component, or template addition.
- Major: breaking property, behavior, content schema, or route contract change.
- Every change requires a use case, token/component impact review, accessibility review, version update, and route-matrix update.

