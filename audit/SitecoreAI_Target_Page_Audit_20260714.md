# Moxa SitecoreAI Final POC Audit

Date: 2026-07-14

## Scope

Final pages are limited to the SitecoreAI target list: Homepage, Search, Ethernet Switches category, EDS-4008 Series, EDS-4008 LV/HV model pages, NPort 5100 Series, HXML Manual, LV/HV Compare UI, Campaign, Controller & I/O microsite, Video, and 360-degree product image.

## Content Preservation Result

- Homepage and Search were allowed to be restructured.
- EDS-4008 Series, LV/HV model pages, and LV/HV Compare retain the product data facts from the supplied product-data sample and datasheet package.
- HXML Manual was changed from an EDS placeholder manual to the provided RKS-G4000 XHTML source package. This is the correct folder-source alignment for the HXML manual requirement.
- Controller & I/O microsite now uses the supplied `remote-io-portfolio.zip` imagery.
- Campaign and homepage pop-up use the supplied Secure Networking Solutions pop-up banner assets.
- Video page uses the supplied video poster/docx package. The 4.59GB MP4 is not copied into the static publish folder.
- NPort 5100 Series was not present in the testing package. The page is completed from Moxa's current official page content and flagged as a source gap.

## Design System Audit

PASS with watch items.

- Colors use Moxa green `#008787`, blue `#204a88`, orange CTA `#ff8000`, and neutral industrial backgrounds.
- Cards stay at 6px radius and are used for repeated items, not nested page sections.
- Product/category pages follow the current Moxa structure: category hero, Search By filters, category/series/result cards.
- Content pages avoid POC/Figma/demo notes inside the visible customer body.
- Real assets from the testing-materials folder are used for homepage, pop-up, microsite, video, datasheet, and 360 viewer.

## Watch Items

- NPort 5100 has no local folder asset or provided product-data sample.
- EDS-4008 product images in the testing folder are represented by DAM URLs and datasheets rather than standalone local product PNG/JPG files; the final package reuses the already generated POC product visuals and local datasheet.
- The HXML package is for RKS-G4000, so the manual page title now follows that source instead of the previous EDS-4008 placeholder.

## GenScript Reuse Summary

See `genscript-component-reuse-matrix.csv`.

Best reuse candidates: Breadcrumb, SiteTabs, Accordions, ImageCardGrid, SplitMediaBlock, PriceComparisonTable.

Needs refactor: SiteNav, Footer, HeroBanner, SelectorProduct, FilterableDownloadSection, LeadsForm, VideoPlayer.

Needs new component: 360-degree product image viewer and Moxa-specific industrial filter model.
