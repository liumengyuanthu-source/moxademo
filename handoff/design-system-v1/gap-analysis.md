# Moxa Design System v1 — Phase 0 Gap Analysis

Baseline: Git commit `8cf7de1`  
Audit date: 2026-07-20  
Status: Phase 0 complete

## 1. What exists in code

### Shared foundation

- 26 root CSS custom properties in `assets/css/moxa-ds.css` covering brand color, neutrals, shadow, eight spacing values, four radii, content width, and font family.
- 12 Remote I/O variables in `assets/css/microsite-remote-io.css`; six are unique and six duplicate or closely shadow the shared system.
- Shared 1240px content width and an 8-point-led spacing scale with 4px half steps.
- Shared focus ring using Moxa Cyan.
- Helvetica Neue / Helvetica / Arial font stack.

### Shared components and patterns

- 54 documented components across global shell, actions, forms, navigation, disclosure, content, cards, data, media, conversion, and AI.
- Global header, mega menu, breadcrumb, footer, subscription, locale selector, lead form, and Moxa Advisor already use shared CSS/JavaScript modules.
- Twelve page types cover thirteen routes because LV and HV share one Product Model template.

### Existing visual documentation

- `design-system.html` provides a compact Interface System sheet.
- Twelve Bond-Line visual pages provide strategic design rationale and before/after evidence.
- Existing QA contact sheets cover homepage, search, product category, series, model, campaign, microsite, manual, video, compare, and 360 pages.

## 2. Code items not yet represented as a native Figma system

- No scoped Figma variables or alias architecture.
- No native text, effect, or grid styles tied to implementation values.
- No component sets with variant properties and state matrices.
- No single Figma source for Header, Mega Menu, Footer, Lead Capture, Breadcrumb, and Advisor.
- No template boards mapping twelve page types to thirteen routes.
- No native Figma annotations for Sitecore renderings, datasource fields, behavior ownership, or analytics.
- No consolidated accessibility acceptance matrix.

## 3. Earlier visual-guide items that differ from current code

| Area | Earlier guide | Current implementation | v1 resolution |
|---|---|---|---|
| Teal 700 | `#006D6D` | `#006B6B` | Use code value `#006B6B`; record guide difference. |
| Teal tint | `#E2F1F1` | `#E7F5F4` | Use code value `#E7F5F4`. |
| Deep neutral | `#102D30` | Moxa Navy `#082F49` plus Remote I/O Deep `#073F47` | Preserve both with semantic roles; do not merge. |
| Cyan | `#009DDB` | `#40CBD0` | Use implemented focus/accent cyan `#40CBD0`; retain old value only in historical visual evidence. |
| Orange | `#FA943E` | `#F39A61` | Use implemented hero CTA orange `#F39A61`. |
| Radius | 2px UI / 4px panel | 4px / 8px / 12px / pill | Use implemented 4/8/12/pill scale; explain that PoC usability refinement superseded the earlier sheet. |
| Button system | Compact guide examples | Several page-local classes | Define one four-style Button component and map local classes into it. |
| Hero system | One conceptual hero | Nine implemented hero contexts | Create one Hero family with controlled context variants and composition examples. |
| Forms | Basic fields | Shared lead form with validation and consent | Native field states plus one unified Lead Capture composition. |

## 4. Duplicate or page-local patterns to consolidate

1. Remote I/O variables that duplicate Moxa teal, line, white, content width, radius, and shadow will alias the shared primitives in Figma.
2. Button classes will map to four styles: Primary, Secondary, Hero CTA, and Text.
3. Section headers will share eyebrow/title/description structure with alignment and theme properties.
4. Hero layouts will use a shared content API while retaining page-context compositions.
5. Product, resource, video, application, and metric cards will share base spacing, radius, focus, image, and metadata rules.
6. Campaign and Microsite lead forms will use one Lead Capture component and one datasource schema.

## 5. Accessibility resolutions

- Maintain a 44px minimum target size for primary interactive controls.
- Treat the 3px Cyan focus ring as a semantic focus token.
- Preserve text labels for Ask AI and major actions; icons do not replace labels without accessible names.
- Mega menu closes on Escape, outside click, and scroll; focus order remains logical.
- Tabs support Arrow keys, Home, and End.
- Accordion uses a button, `aria-expanded`, and plus/minus state.
- Modal supports Escape, explicit Close, focus return, and background isolation.
- Comparison and specification tables require captions and scoped headers.
- AI answers place explicit source links immediately below the answer.
- Metric animation leaves the final value available in the DOM and respects reduced motion.

## 6. Figma reuse policy

Reuse only when a library component matches the component-property API, token model, naming, and editability requirements. Use this order:

1. Local component in the target file.
2. Compatible subscribed library component.
3. Compatible available library component, especially icons.
4. New Moxa component built with Moxa variables.

Generic third-party components will not replace the Moxa visual language merely to reduce build time. Close visual matches with incompatible APIs may be wrapped; hardcoded or inaccessible components will be rebuilt.

## 7. Locked v1 scope

- 7 variable collections.
- 64 variable definitions in the code-side manifest: 16 primitives, 15 semantic colors, 8 spacing, 4 radius, 6 sizing, 11 typography, and 4 motion.
- 54 component/pattern entries.
- 31 ordered Figma pages.
- 12 page types and 13 routes.
- 30 initial Sitecore crosswalk mappings.

## 8. Figma discovery result

- Target plan: `Backup` (`team::1139788975409430625`).
- File: `Moxa PoC Operational Design System v1.0`.
- File key: `USRPJHboEejgu78oeZpIlc`.
- Initial state: one empty page, zero local variables, zero styles, and zero components.
- Available editable font in the plugin environment: Inter. Helvetica Neue and Arial are unavailable, so editable Figma documentation will use Inter while preserving and labeling the implementation font stack.
- Material 3 is not used because its mobile-first component model and visual language conflict with the implemented Moxa system.
- Simple Design System is retained as a structural reference for Button, fields, disclosure, Header/Footer, Dialog, and AI Chat, but no component is imported because its variables and component API are incompatible with Moxa.
- All 54 Moxa components will therefore be built locally and bound to Moxa variables.

Phase 0 has no unresolved source conflict. The user approved the Backup Starter fallback: logical modes are split into 10 one-mode collections containing 105 physical variables. The local Builder was generated, tested, and run successfully for 54 component/pattern entries, 31 pages, 12 page types, 13 routes, and 30 Sitecore mappings.
