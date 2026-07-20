# Homepage EDS-4008 Third Banner — Design Specification

Date: 2026-07-20  
Decision: Option A approved

## Objective

Redesign the third homepage carousel banner so it visually belongs to the same image-first system as the first two banners while helping a returning EDS-4008 visitor compare LV/HV models or download the series datasheet.

## Artboard and composition

- Produce one final desktop banner at 1916 × 821 px.
- Match the first two banners' bright white canvas, pale technical line work, dotted corner details, and large right-side circular image crop.
- Reserve the left 43% for copy and CTAs; keep the background quiet enough for dark navy text.
- Place the complete EDS-4008 device in the right circular image area. Do not crop ports, terminals, or the top of the device.
- Add restrained Moxa-teal network lines and four small capability markers on the far right. The markers should relate to model validation: LV power, HV power, industrial reliability, and engineering support.
- Do not use the previous dark translucent copy panel or the “Homepage C” state label.

## Content

- Eyebrow: `CONTINUE WITH EDS-4008`
- Headline: `Validate the right model.`
  - Navy: `Validate the right`
  - Moxa Green: `model.`
- Body: `Compare LV and HV power options, review the series datasheet, and confirm the right fit for your application.`
- Primary CTA: `Compare LV/HV Models`
- Secondary CTA: `Download Datasheet`

## CTA system

- Both CTAs use the same height, padding, typography, arrow treatment, and 4–6 px UI radius as banners one and two.
- Primary CTA: Moxa Green fill, white label and arrow.
- Secondary CTA: white fill, Moxa Green border, label, and arrow.
- Preserve the existing link destinations and analytics attributes.
- Update the invisible hotspot rectangles to precisely match the newly rendered button positions.

## Responsive behavior

- Desktop/tablet uses the 1916:821 artwork and `object-fit: cover`.
- Keep the product subject inside the right-side safe area so 16:9 and narrower desktop crops do not cut the device.
- Mobile uses the existing accessible HTML copy and live CTA layout over a simplified crop; the product remains visible on the right/bottom without obscuring the text.
- Text content in the HTML remains the accessible source of truth even when the desktop artwork contains the same words.

## Acceptance criteria

- The three carousel banners read as one visual family at the same viewport.
- Third-banner product is fully visible and materially smaller than the rejected oversized crop.
- CTA color, height, radius, spacing, and arrow style match banners one and two.
- Both links remain clickable and keyboard accessible.
- No clipping or text overlap at desktop and mobile breakpoints.
- Visual comparison is performed against the first two banners at the same viewport before handoff.

## Scope boundary

This change only affects the third homepage carousel artwork, its matching copy, CTA hotspots, and responsive adjustments. It does not change the carousel logic, header, other homepage sections, or destination pages.
