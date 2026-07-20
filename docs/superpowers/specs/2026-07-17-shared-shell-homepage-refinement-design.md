# Shared Header, Shared Footer, and Homepage Refinement

## Objective

Update the complete 13-route Moxa PoC so every page uses one consistent, reusable global header and footer, while the Homepage body incorporates all feedback from `Home Page issue_0717.docx` without changing the approved hero, campaign banner, route set, or Moxa design-system foundation.

## Scope

### Global header

- Apply the revised header to every PoC route through the shared shell.
- Use the card-based mega-menu structure from `moxa_homepage_concept_v11_nav_default_expanded.html` as the visual and information-architecture reference.
- Each menu contains:
  - one introductory/guidance card;
  - three category cards;
  - short category descriptions;
  - direct third-level links with clear arrow affordances.
- Preserve the approved two-row header: brand, global search and Ask AI on the first row; Products, Solutions, Resources, Support, Why Moxa, and Contact Us on the second row.
- Preserve existing real route destinations and external Moxa links.
- Interaction requirements:
  - desktop mouse hover or click opens a menu;
  - only one menu can be open at a time;
  - pointer movement into the menu keeps it open;
  - clicking outside, scrolling, pressing Escape, or opening another menu closes it;
  - keyboard focus and `aria-expanded` remain synchronized;
  - mobile navigation remains an accordion/drawer and does not expose the desktop panel off-screen.

### Global footer

- Apply one shared footer to every PoC route and keep the static footer markup in each authorable HTML file for SitecoreAI handoff.
- Keep Follow Moxa social icons, Stay Connected, legal links, and Country / language.
- Shorten the subscription form and restore the explanatory consent/privacy copy that exists on the current Moxa site.
- Use softer gray text for secondary/footer copy, while retaining accessible contrast.
- Keep the compact horizontal desktop layout and stacked mobile layout.
- Keep `Global / English` as the default locale.

### Homepage body

- Keep the approved hero, campaign pop-up, second-screen AI search, and left floating section navigator.
- AI search:
  - reduce the headline size;
  - keep it to no more than two lines at the standard desktop viewport;
  - preserve the working search field, suggested intents, and Guide me action.
- Explore Now:
  - keep the current Homepage subject matter and imagery;
  - use a structured image-card layout with visible title, body copy, and CTA;
  - prevent the final title word from wrapping alone;
  - keep the two cards aligned to equal visual height.
- Featured Products:
  - remove the `New Product` badge;
  - use the existing Moxa Homepage product image requested in the review;
  - reduce headline size and control wrapping;
  - preserve the current DA-920E title, supporting points, and CTA.
- Enabling Connectivity:
  - reduce the headline so it occupies no more than two lines at the standard desktop viewport;
  - preserve the approved gradient and glass metric cards;
  - enrich the background with subtle star-like points that brighten and dim, inspired by the current Moxa site;
  - preserve progressive metric focus and counter animation;
  - respect `prefers-reduced-motion`.
- Footer transition:
  - remove excessive vertical whitespace between Connectivity and the footer;
  - keep the campaign pop-up from blocking the subscription form at common desktop sizes.

## Reuse and implementation boundaries

- Global header and footer content, markup generation, state management, and responsive behavior live in `assets/js/moxa-shell.js` and `assets/css/moxa-ds.css`.
- Homepage-only structure and styles remain in `homepage.html` and `index.html`.
- `homepage.html` and `index.html` must remain equivalent for Homepage-specific modules.
- No new routes, backend integrations, authentication, or API calls are introduced.
- Existing assets are reused; no placeholder artwork or CSS-drawn substitute images are permitted.

## Verification

- Add regression tests before implementation for:
  - the four-card mega-menu structure and all five menus;
  - hover, click, outside-click, scroll, and Escape close behavior;
  - static shared footer presence on all 13 routes;
  - restored footer explanatory copy and default locale;
  - Homepage headline wrapping constraints, Explore Now body copy and CTA, removed New Product badge, approved product image, and connectivity star motion.
- Run the complete Node test suite.
- Run the static-review synchronization verification.
- Visually compare the open mega menu with the supplied reference HTML at the same desktop viewport.
- Visually inspect Homepage desktop and mobile layouts, including open navigation, AI search, Explore Now, Featured Products, Connectivity, and footer.
- Check keyboard navigation, visible focus, reduced motion, and browser console errors.

## Acceptance criteria

1. All 13 routes render the same revised global header and footer.
2. The mega menu visually follows the supplied card-based reference without losing the current accessible close behavior.
3. Every requested Homepage correction from the Word review is visible in both `homepage.html` and `index.html`.
4. Existing PoC routes, interactions, campaign pop-up, chatbot launcher, breadcrumbs, and shared design tokens continue to work.
5. Automated tests and visual QA pass before GitHub publication and handoff package refresh.
