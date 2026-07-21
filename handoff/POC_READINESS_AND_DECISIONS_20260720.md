# Moxa PoC Readiness and Decisions

Date: 2026-07-20  
Decision basis: Option A and all previously recommended decisions are approved.

## Current authoritative scope

- **12 page classes / 13 customer-facing routes**.
- **12 routes targeted for automated SitecoreAI deployment**.
- **1 external HTML route**: `compare-lv-hv.html`, used only to demonstrate the intended AI conversation and source-linked engineering comparison.
- **38 operation demonstrations** organized into six customer-journey stages.
- Shared design-system runtime: `assets/css/moxa-ds.css` and `assets/js/moxa-shell.js`.

## What is complete in the HTML PoC

- Unified Header, search with Ask AI, navigation behavior, Breadcrumb, Footer, locale default, Advisor, buttons, typography, spacing, and lead-form patterns.
- Reworked Homepage, Search, EDS-4008 Series, Campaign, Remote I/O Microsite, Video, Ethernet Switch category, LV/HV model pages, NPort 5100 Series, Manual, LV/HV comparison, and 360 viewer.
- Latest Homepage third banner uses the same image-first system and CTA treatment as the first two banners.
- Search results include product imagery, grouped totals, reduced section spacing, and the approved default-facet rule.
- Remote I/O applications use readable white overlay headings and the harmonized lead form.
- Shared shell and page contracts are covered by automated regression tests.

## Locked decisions

| Decision | Approved outcome |
|---|---|
| Page scope | 12 classes / 13 routes; campaign pop-up is a reusable component, not a separate route |
| Search default facets | Select one primary facet inferred from query intent; show other relevant facets with counts and unchecked |
| Sitecore component model | Hybrid BYOC for interaction-heavy UI; structured Sitecore renderings for content-led UI |
| Page creation | Generate serialized page compositions; no manual Page Builder assembly |
| EDS / NPort reuse | Distinct business page classes using one Product Series template |
| LV / HV reuse | One Product Model template with two datasources/routes |
| AI comparison | External HTML conversation-design demo; no native SitecoreAI claim |
| Review sequencing | Stephen review and deployment preparation run in parallel |
| Reporting | One fully English executive deck plus one complete living deck |
| Status reporting | Separate HTML implementation, simulation, platform capability, and live-integration proof |

## Verified versus pending

| Area | Current status | Evidence / next proof |
|---|---|---|
| HTML routes | Implemented | 13 local routes and automated contract tests |
| Design system | Implemented in PoC | Shared CSS/JS, design-system handoff, component inventory |
| Component/template mapping | Contract complete | `sitecoreai/component-manifest.json`, `sitecoreai/page-compositions.json` |
| GenScript reuse decisions | Contract complete | Per-component adopt/adapt/rebuild instructions in component manifest |
| Customer journey | HTML/simulation evidence complete | `sitecoreai/demo-journeys.json`; live evidence follows deployment |
| SitecoreAI deployment | Prepared, not executed | Target repo/environment/credentials required |
| CRM/search/personalization/analytics | Simulated or platform-dependent | Endpoint contracts and target environment required |
| Post-deployment testing | Designed, not executed | Run acceptance suite after target deployment |

## PPT audit outcome

### 58-slide full deck

Usable as the baseline, structurally healthy, and fully editable. It must be refreshed with July 20 screenshots, corrected 13-route facts, larger dense-slide typography, GenScript mapping, deployment automation, and evidence links.

### 13-slide executive deck

Must be rebuilt. It contains Chinese text, depends on a font that disappears in portable rendering, includes stale route names, and does not yet present the current executive story.

## External inputs still required

- Swati: confirmed personalization, experimentation, Search, analytics/journey, campaign, and authoring expectations.
- Arthur / Stephen: target Sitecore repository/branch, SDK version, component factory/BYOC convention, serialization convention, environment identifiers, credentials through CI secrets, media handling, and live API endpoints.

These inputs do not block HTML refinement, packaging, manifest validation, or PPT rebuilding. They are the gate for actual SitecoreAI deployment and live-integration evidence.

## Acceptance definition

The PoC is deployment-complete only when:

1. the generated component/template/page package is merged into the target repository;
2. 12 Sitecore routes deploy without manual page assembly;
3. all shared shell and responsive checks pass;
4. all six journeys and 38 operations have recorded environment evidence;
5. platform-dependent capabilities are demonstrated with live data or explicitly signed off as out of scope;
6. the executive and full English decks link to current routes, tracker, matrices, validation report, and test results.

