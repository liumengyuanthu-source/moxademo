# Component and Template Map

## 1. Global shell renderings

### Global Header

Used by all 13 routes. Fields: logo, search placeholder, Ask AI label/action, utility links, navigation groups, mega-menu links, and Contact Us CTA. Preserve close-on-scroll, outside-click, Escape, keyboard focus, and responsive behavior.

### Breadcrumb

Clickable ancestor links with a current-page state. Prefer automatic generation from the Sitecore item hierarchy with an optional display-name override.

### Global Footer

Compact light-gradient layout with social icons, Stay Connected subscription, privacy and legal links, and a visible default country/language. Connect subscription and consent to approved services.

### Moxa Advisor

Shared launcher, bot identity, guided actions, bilingual content support, and handoff links. Production requires governed AI orchestration and analytics.

## 2. Shared presentation renderings

- Hero family: Home, Category, Series, Model, Campaign, Microsite, Video, Manual, Product Media.
- Section Header: eyebrow, title, description, alignment, and theme.
- Card family: Product, Solution, Resource, Application, Video, Feature, Metric, Contact.
- CTA Band: title, copy, primary/secondary actions.
- Anchor Navigation: sticky links, active state, and optional actions.
- Floating Section Navigator: labels, active state, and progress dots.
- Accordion: title, body, optional image, accessible plus/minus state, smooth transition.
- Lead Capture: shared Campaign/Microsite schema, validation, privacy consent, success state.

## 3. Page-specific compositions

### Homepage

Home Hero; Campaign Pop-up; AI-guided Search; Floating Navigator; Explore Now; Featured Product; Trending at Moxa; Connectivity Metrics; Global Footer.

### Search Results

Search Summary; Facet Filters; Result Groups; Result Cards; Best Match; Empty State. Integrate query, counts, facets, ranking, thumbnails, and result routing with Sitecore Search.

### Product Category — Ethernet Switches

Category Hero; Selection Guide; Filter Controls; Product Family Grid; Comparison CTA; Resource Cards.

### Product Series — EDS-4008 and NPort 5100

Series Hero; Anchor Navigation; Popular Configurations; Model Finder/Grid; Model Rows; Features; Resources; Applications; CTA. Reuse the template but allow component configuration and datasource differences.

### Product Model — EDS-4008-LV and EDS-4008-HV

Model Hero; Gallery; Specification Summary; Downloads; Related Models; Quote CTA. Use one Product Model template with separate product datasources.

### Campaign

Campaign Hero; Sticky Section Navigation; Accordion; Key-value Media; Architecture Selector; Management Section; Product Portfolio; Lead Capture.

### Remote I/O Microsite

Compact Microsite Hero; four Portfolio Metrics; Sticky Anchor Navigation; Video Overview/Modal; Why Moxa Tabs; Feature Rows; Reliability Cards; Product Portfolio Cards; Brochure Strip/Viewer; Application Cards; Case-study CTA; Selection Guide Table; Lead Capture.

Microsite behavior boundaries:

- Tabs support click, Arrow keys, Home, and End.
- Video and brochure viewers use accessible modal behavior.
- The selection table supports a sticky first column, difference highlighting, and print.
- Application-card headings remain white over the image gradient.
- All visible media is local and sourced from the client material package.

### Video

Breadcrumb; Video Hero; Featured Player; Series Playlist; Filters; Search; Sort; Video Grid; Related CTA.

### HXML Manual

Compact Manual Banner; Manual Search; Table of Contents; stable anchors; Document Body; Alerts; Tables; Downloads. Map generated HXML structure to reusable content blocks.

### AI LV/HV Comparison

Conversation Shell; Prompt; Assistant Message; Specification Table; explicit Source Links immediately after the answer; Follow-up Prompts. Use the shared Moxa bot identity.

### 360 Product Media

Media Hero; 36-frame Viewer; drag/button/range/keyboard controls; status announcement; fallback image; related actions; analytics event.

## 4. Suggested Sitecore datasource templates

- Navigation Group and Navigation Link
- Hero Content
- Section Header
- CTA Set
- Card Collection and Card Item
- Product Family, Product Series, Product Model, Product Specification
- Resource and Download
- Application Story
- Metric
- Accordion Collection and Accordion Item
- Video Collection and Video Item
- Manual Metadata and Manual Content Block
- Lead Form Configuration
- AI Prompt, Response Table, Source Reference, Follow-up Prompt
- Locale Option and Legal Link

Keep content, structure, and behavior separate: datasource items hold content; renderings hold layout; JavaScript modules hold interaction; integration services hold data retrieval and submission.
