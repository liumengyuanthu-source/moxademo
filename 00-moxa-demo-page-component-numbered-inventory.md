# Moxa PoC Demo Page and Component Numbered Inventory

Date: 2026-07-10

Decision status: Christina reviewed the recommendations and approved proceeding with the recommended path.

## 1. Approved Decisions

| ID | Decision | Approved direction |
| --- | --- | --- |
| D01 | Moxa Product Detail reuse strategy | Do not directly reuse GenScript `ProductDetail.vue`; build Moxa-native product detail components and reuse only primitives. |
| D02 | Visual system | Moxa official design system overrides GenScript styling. GenScript is used as structural reference only. |
| D03 | P1 componentization pages | Homepage, Product Category, Product Series, Product Model, Compare/Quote, Search, Contact/Distributor, AI Assistant. |
| D04 | Backend/admin mock scope | Keep backend/admin screens as evidence/demo pages for now; do not overbuild as production components yet. |
| D05 | iframe fallback | Use only for complex fixed interactions if SitecoreAI componentization is blocked. |

## 2. Numbered Page List

| Page ID | Page | File | Scenario | Priority | Purpose | Next |
| --- | --- | --- | --- | --- | --- | --- |
| P01 | Homepage | `homepage.html` | S1 Awareness & Orientation | Critical | Personalized hero, campaign entry, product-first navigation | P02 |
| P02 | Controller & I/O Microsite | `microsite.html` | S2 Solution / Campaign Exploration | High | Campaign hero, product education, lead form, shared homepage module | P03 |
| P03 | Article Page | `article.html` | S2 Solution / Campaign Exploration | High | SEO article, DAM metadata, FAQ, related resources | P04 |
| P04 | Video Page | `video.html` | S2 Solution / Campaign Exploration | Medium | Product setup video, poster, transcript, related resources | P05 |
| P05 | Product Category: Ethernet Switches | `product-category-ethernet-switches.html` | S3 Product Discovery | Critical | Filter panel, product families, product results, compare entry | P06 |
| P06 | Search Result Page | `search.html` | S3 Product Discovery | Critical | Autocomplete, facets, result groups, AI answer support | P07 |
| P07 | EDS-4008 Series Page | `product-series-eds-4008.html` | S4 Product Evaluation | Critical | Series hero, 360 viewer, specs/resources/models tabs, quote/follow CTA | P08 |
| P08 | EDS-4008-LV / HV Model Page | `product-model-eds-4008-lv-hv.html` | S4 Product Evaluation | Critical | Model gallery, LV/HV comparison, resources, AI support, quote path | P09 |
| P09 | Product Compare / Quote Flow | `compare-quote.html` | S4/S5 Evaluation to Conversion | Critical | Compare table, quote cart, requester confirmation, submission state | P10 |
| P10 | Contact Sales / Find Distributor | `contact-distributor.html` | S5 Conversion | High | Distributor finder, support route, sales form, consent state | P11 |
| P11 | AI Assistant Panel | `chatbot.html` | S4/S5 Assistive AI | High | Prompt chips, answer area, citations, refusal/guardrail pattern | P12 |
| P12 | Analytics Dashboard | `analytics.html` | S6 Optimization Loop | Medium | Campaign metrics, reports, AI insight evidence | P13 |
| P13 | Customer Journey | `journey.html` | S6 Optimization Loop | Medium | Anonymous-to-known timeline, profile signals, consent | P14 |
| P14 | Backend / Compliance Mock | `backend-compliance.html` | S6 Governance | Medium | Workflow, repository search, support/contact/compliance evidence | P15 |
| P15 | Design System | `design-system.html` | System Reference | Critical | Moxa tokens, components, page anatomy, requirement matrix | P01 |

## 3. Primary Demo Jump Path

```text
P01 Homepage
-> P02 Microsite
-> P03 Article
-> P04 Video
-> P05 Product Category
-> P06 Search
-> P07 Product Series
-> P08 Product Model
-> P09 Compare / Quote
-> P10 Contact / Distributor
-> P11 AI Assistant
-> P12 Analytics
-> P13 Customer Journey
-> P14 Backend / Compliance
-> P15 Design System
```

The new `demo-map.html` page contains this path as clickable links and is also linked from the header of every generated page.

## 4. Numbered Component List

| Component ID | Component | Reuse basis | Pages | Purpose |
| --- | --- | --- | --- | --- |
| C01 | MoxaHeaderMegaMenu | Refactor from GenScript SiteNav | All pages | Logo, product-first IA, mega menu, search, region/language, contact CTA |
| C02 | MoxaFooter | Re-skin from GenScript Footer/Sitemap | All pages | Product/resource/contact/legal links |
| C03 | MoxaBreadcrumb | Reuse Breadcrumb | Product, article, video, search | Home to category/series/model path |
| C04 | MoxaHeroBanner | Re-skin HeroBanner | Homepage, microsite, category, resources | Moxa imagery, clear focal point, editable copy |
| C05 | MoxaCampaignBanner | Refactor SiteCta/Floatting | Homepage, microsite | Campaign state, popup/floating state, measurable CTA |
| C06 | MoxaCardGrid | Re-skin GridCardSection/ImageCardGrid | Homepage, microsite, article, resources | Image, label, title, copy, CTA |
| C07 | MoxaProductFilterPanel | Refactor filters/forms | Category, search | Keyword, facets, sort, selected state |
| C08 | MoxaProductResultCard | Refactor ProductCard | Category, products, search | Product image, specs, tags, compare, CTA |
| C09 | MoxaProductSeriesHero | New Moxa component | EDS-4008 Series | Series title, product proof, CTA, lifecycle |
| C10 | MoxaProductMediaGallery | New/refactor AdaptiveMedia | Series, model | 360 frames, static gallery, alt text |
| C11 | MoxaPdpTabs | Re-skin SiteTabs | Series, model, PDP | Overview, Specifications, Resources, Models |
| C12 | MoxaSpecTable | New/refactor PriceComparisonTable | Series, model, compare | Industrial specs, model columns, difference highlights |
| C13 | MoxaModelVariantCompare | New Moxa component | Model, compare | LV/HV comparison, power input, ports, certifications |
| C14 | MoxaCompareDrawer | New/refactor Floatting | Category, products | Selected products, max count, compare CTA |
| C15 | MoxaQuoteCart | New/refactor RequestQuotePanel | Compare/quote, model, series | Products, accessories, quantity, requester, consent |
| C16 | MoxaDynamicForm | Refactor DynamicForm | Contact, quote, microsite | Region, product interest, Salesforce/CRM mapping |
| C17 | MoxaDistributorFinder | New/refactor Map/Autocomplete | Contact/distributor | Country/region, partner cards, contact route |
| C18 | MoxaSearchBox | Refactor SiteNavSearch/Autocomplete | Header, search, homepage | Suggestions, synonyms, typo support |
| C19 | MoxaAIAnswerBox | Refactor QAContainer | Homepage, search, product, chatbot | Prompt chips, answer, citations, refusal state |
| C20 | MoxaResourceDownloadList | Refactor FilterableDownloadSection | Series, model, search, article | Datasheets, manuals, PDFs, videos, certifications |
| C21 | MoxaVideoResource | Reuse VideoPlayer | Video page | Poster, transcript, chapters, related resources |
| C22 | MoxaArticleResourceLayout | Re-skin ContentBlockPage | Article page | SEO, DAM, FAQ, sidebar, related links |
| C23 | MoxaAnalyticsCards | Re-skin table/card patterns | Analytics, backend | Metrics, charts, report controls |
| C24 | MoxaJourneyTimeline | Refactor Stepper/Timeline pattern | Journey page | Behavior events, profile merge, consent |
| C25 | MoxaWorkflowStatusTable | Evidence/admin component | Backend/compliance | Workflow, versioning, audit, publication status |

## 5. Figma Import Package

Figma import source folder:

```text
/Users/christinaliu/Documents/Moxa/moxa-figma-static-pages
```

Package output:

```text
/Users/christinaliu/Documents/Moxa/moxa-figma-static-pages-20260710.zip
```

Package rules:

- Each page is a self-contained HTML file.
- Shared CSS is written directly into each HTML file.
- Images are embedded into HTML as data URIs.
- The large video file is not embedded; `video.html` uses the poster image for static Figma import.
- `demo-map.html` is included as the numbered page/component index.
- `README.md`, this inventory MD, PDF, and audit MD are included in the package.

## 6. Audit Summary

| Audit item | Result |
| --- | --- |
| Source HTML pages generated | PASS: 19 |
| Figma static HTML pages generated | PASS: 19 |
| Page numbering present | PASS: P01-P15 in `demo-map.html` and this document |
| Component numbering present | PASS: C01-C25 in `demo-map.html` and this document |
| Header jump to Demo Map | PASS |
| Local source asset references | PASS |
| Figma external CSS/script/image references | PASS: none found |
| Broken local links / hash anchors | PASS |
| Duplicate IDs | PASS |
| Invalid tab targets | PASS |
| Moxa brand tokens | PASS: #008787, #204a88, #ff8000 |
| Layout rule | PASS: 1160px container |
| CTA and card style | PASS: squared CTAs, <=8px card radii |

## 7. Known Note

The three latest GPT files named in the user message were not present at the specified `/Users/christinaliu/Downloads/` paths during this run. The build therefore proceeds from the approved recommendation, existing Moxa page/element brief, scenario coverage storyline, existing generated pages, and current design-system audit.

