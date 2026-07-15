# Moxa POC Content Mapping Audit

Status: implemented for confirmed scope; browser visual QA remains blocked.

## User Decisions Applied

- `campaign.html`: build both the campaign page and the homepage pop-up banner route. Implemented.
- `video.html`: use the `Moxa-PoC-Testing-Materials-2026-7-2/5-Video` material package. Implemented with poster + docx; MP4 excluded from GitHub package because it is approximately 4.3GB.
- LV/HV model pages: split into `eds-4008-lv.html` and `eds-4008-hv.html`, and keep `compare-lv-hv.html`. Implemented.

## Confirmed Official Source Mapping

| POC page | Source / material basis | Implementation status |
|---|---|---|
| `homepage.html`, `index.html` | User-selected homepage source, with popup route updated to `campaign.html` | Updated |
| `search.html` | POC search page using new homepage UXUI | Search result layout fixed to readable one-column results |
| `product-category-ethernet-switches.html` | `https://www.moxa.com/en/products/industrial-network-infrastructure/ethernet-switches` | Official intro and Search By groups mapped |
| `product-series-eds-4008.html` | `https://www.moxa.com/en/products/industrial-network-infrastructure/ethernet-switches/layer-2-managed-switches/eds-4008-series` | Official-style overview, features, specs, resources, and models added |
| `eds-4008-lv.html` | EDS-4008-LV official model page + datasheet fields | Added |
| `eds-4008-hv.html` | EDS-4008-HV official model page + datasheet fields | Added |
| `compare-lv-hv.html` | EDS-4008 model table fields | Expanded to LV, LV-T, HV, HV-T |
| `nport-5100-series.html` | `https://www.moxa.com/en/products/industrial-edge-connectivity/serial-device-servers/general-device-servers/nport-5100-series` | Official intro, features, and specs mapped |
| `microsite.html` | Controllers & I/Os category context + supplied remote I/O assets | Updated |
| `campaign.html` | Secure networking campaign path + supplied homepage popup banner | Updated |
| `video.html` | `5-Video` poster/docx materials | Updated; MP4 not included in GitHub package |
| `manual.html` | Manual/documentation path + supplied EDS-4008 datasheet | Improved, but can be deepened if a specific HXML source should be unpacked |
| `product-360.html` | Supplied 360 frame package | Retained |

## Remaining Content Notes

- If the final demo requires live video playback, provide a compressed web-ready video file or an external video URL.
- If `manual.html` must replicate a specific HXML/WebHelp source, the relevant zip should be unpacked and mapped in a follow-up pass.
- Product imagery is improved with supplied assets where available. Official web image parity still depends on access to current Moxa page image assets.

