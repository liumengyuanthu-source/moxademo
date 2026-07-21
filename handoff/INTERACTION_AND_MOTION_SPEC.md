# Interaction and motion specification

Use this with `sitecoreai/interaction-contract.json`. The HTML `data-sitecore-component` and `data-sitecore-interactions` attributes identify the most important extraction boundaries directly in the rendered source.

## Global shell

| Interaction | Current behavior | SitecoreAI requirement |
|---|---|---|
| Mega menu | Opens from primary navigation; closes on outside click, scroll, Escape, and another menu selection | Keep bounded to the header/container; maintain `aria-expanded`, focus order, and mobile behavior |
| Header search / Ask AI | Search submits to Search Results; Ask AI opens the governed assistant entry | Replace demo routing with approved Search and AI services; preserve query and analytics context |
| Breadcrumb | Ancestors are clickable; current item is not | Generate from item hierarchy with optional label override |
| Advisor | Shared launcher opens guided actions and comparison/support handoffs | Connect to governed orchestration; preserve launcher identity and focus behavior |
| Footer | Social icons, subscription, legal links, and locale selector are clickable | Connect subscription, consent, and locale services without changing the compact layout |

## Homepage

| Component | Triggers and states | Motion / accessibility | Events / integration |
|---|---|---|---|
| Hero carousel | Previous/next, progress control, audience/variant state | Image-first transition; live text remains selectable; reduced-motion fallback | hero impression/click; experiment variant |
| Campaign overlay | Scheduled view, CTA click, close | Non-blocking fixed panel; close button keyboard accessible | campaign view/close/click, campaign ID |
| Membership modal | Header Sign In opens; close button/outside click/Escape closes; Account → Confirm → Complete | Focus trap; focus return; modal is hidden when closed; step validation announces errors | `moxa:membership:registered`; CRM adapter `Salesforce`; production endpoint required |
| AI-guided search | Submit or quick-intent chip | Form remains usable without animation | search/AI intent, query, source section |
| Floating navigator | Anchor click and IntersectionObserver active state | Compact progress state; keyboard anchors | section view/click |
| Connectivity metrics | Enter viewport | Count-up and glass emphasis; immediate final value under reduced motion | metric impression |

## Search Results

- Query contracts: exact, typo correction, partial query, synonym, document intent, Ethernet Switches, and no-result recovery.
- Facets update the visible result set and counts without removing keyboard focus.
- Result cards keep a fixed action width, grouped result semantics, and traceable destination.
- Production integration must return correction, synonym, facet, ranking, and promoted-result metadata instead of simulating them in the browser.

## Campaign

- Hero CTA routes to Contact Us and portfolio anchors.
- Sticky section navigation updates the current section.
- Accordion uses accessible plus/minus state, smooth height transition, and adequate body inset.
- Architecture selectors update the highlighted security layer and supporting copy.
- Lead form validates required fields and consent before submission.

## Ethernet Switches category

- Range and facet controls filter all nine source categories.
- Reset restores range, speed, toggle state, visible count, and list.
- Empty filters present the no-result state without deleting the filter UI.
- Category title links remain clickable even when Sitecore replaces the local destinations.

## Product journeys

- EDS-4008 model filters, compare selections, resource actions, applications, 360 viewer, and quote actions are separate analytics targets.
- Product 360 supports drag, range, previous/next, and keyboard control; announces frame changes; keeps a fallback image.
- Cross-sell cards on EDS-4008 and NPort preserve source series context and destination product identity.
- Quote workflow maintains cart state across LV, HV, accessory, requester, consent, and submit steps. The final CRM operation is simulated; the production adapter must be server-side.

## Article and media

- Table of contents scrolls to stable section anchors.
- Video opens/plays on the current page and uses a centered play control.
- FAQ supports plus/minus, `aria-expanded`, and sufficient first-line/body padding.
- Feedback offers five equal controls from Very uninformative to Very informative.
- More Articles moves one card per action. Arrows are disabled when the card count does not exceed the visible capacity.

## Microsite

- Sticky tabs support click, Arrow keys, Home, and End.
- Video and brochure viewers close by button, outside click, and Escape and return focus.
- Application cards preserve top-aligned white headings and body copy.
- Selection table supports horizontal access, sticky first column, difference emphasis, and print.
- Shared lead form uses the approved campaign/microsite schema and consent.

## Motion and accessibility guardrails

- Honor `prefers-reduced-motion`; remove count-up, smooth scrolling, and non-essential transitions while preserving final states.
- Never use motion as the only indicator of state.
- Maintain visible focus, logical tab order, Escape close, focus return, `aria-expanded`, `aria-selected`, `aria-current`, and live status/error messages.
- All transitions must remain under 400 ms unless content height requires a measured accordion transition.
- Sitecore editing mode must not autoplay media or block component selection with overlays.
