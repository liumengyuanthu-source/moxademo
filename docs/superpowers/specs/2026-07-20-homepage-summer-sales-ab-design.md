# Homepage Summer Sales A/B — Image-first Revision and Standalone Archive

## Scope

The production-facing local homepage and the A/B demonstration archive become two separate deliverables:

1. `homepage.html` keeps the Summer Sales A/B banners but restores the original Explore Now content.
2. `standalone/homepage-summer-sales-ab-embedded.html` preserves the current combined A/B experience, including the Rail/Power Explore variants, in one portable file with embedded assets.

## Approved content

- Eyebrow: `2026 SUMMER SALES`
- Headline: `Upgrade your industrial network this summer.`
- Body: `Explore selected Moxa industrial networking solutions and get expert guidance for your next deployment.`

## Top-banner variants

- Version A uses an orange `Inquire Now` CTA and routes to the campaign lead form.
- Version B uses a Moxa-green `Contact an Expert` CTA and routes to the same lead form.
- Copy, source scene, layout, image treatment, and destination remain identical. Only CTA wording and color differ.
- Each desktop variant is rendered as a complete 1916 × 821 image-first artwork, matching the composition model of the first two homepage banners: full-bleed scene, integrated left-side message hierarchy, intentional negative space, and a clearly authored CTA.
- Desktop artwork is stored as `banner/homepage-summer-sales-a.png` and `banner/homepage-summer-sales-b.png`.
- Transparent semantic hotspots preserve click behavior and analytics without visually duplicating the baked-in CTA.
- Mobile uses a semantic HTML text overlay and real button so content remains readable, accessible, and responsive.
- Both variants reuse the existing hero-carousel controls and accessibility attributes.

## Formal homepage Explore Now

- Restore the approved two-card content that existed before the experiment:
  - Machine OEM Solutions — manufacturing image and copy.
  - Remote I/O — industrial edge image and copy.
- Remove experience-dependent Explore filtering from `homepage.html`.
- Preserve the non-breaking `the core.` heading treatment.

## Standalone archive Explore variants

- Version A: Rail graphic and rail-focused copy.
- Version B: Power graphic and power-focused copy.
- Both cards reuse the same component geometry, image ratio, typography, body length, and link treatment.
- The standalone archive retains both cards and can lock to either combined experience with `?experience=A` or `?experience=B`.

## Standalone packaging

- The archive is one HTML file with CSS and JavaScript inline.
- Local images, icons, fonts where practical, and referenced document assets required for rendering are converted to `data:` URLs.
- The file opens directly through `file://` without a web server or network connection.
- External navigation destinations may remain normal HTTPS links, but the page itself has no local-file dependencies.
- The archive preserves the shared header/footer appearance, carousel, A/B switching, and tracking payload behavior.

## Demonstration and measurement

- Hero slides D and E expose the two Summer Sales variants directly in the carousel.
- On `homepage.html`, `experience=A/B` locks the matching Summer Sales banner but does not alter Explore Now.
- In the standalone archive, `experience=A` presents the orange `Inquire Now` CTA together with Rail Explore content; `experience=B` presents the green `Contact an Expert` CTA together with Power Explore content.
- Top CTA events identify `experiment_top_cta` independently.
- Explore content events identify `experiment_explore_content` independently.
- Every event includes `experience_variant=A` or `experience_variant=B` so combined-experience and component-level analysis can both be performed.
- Events are pushed to `window.dataLayer` as PoC analytics hooks; no external analytics service is added.

## Responsive behavior

- Desktop maintains the established image-first hero composition.
- Mobile uses the existing text-overlay fallback so the CTA remains accessible and readable.
- Restored Explore cards stack below the current homepage breakpoint.
- Standalone Rail/Power cards use the same responsive behavior.

## Acceptance criteria

- Five hero slides and five matching carousel dots remain present on the formal homepage.
- Both Summer Sales banners contain the approved copy.
- Version A uses orange `Inquire Now`; Version B uses green `Contact an Expert`.
- Both desktop banners visually follow the existing image-first hero system and use matching 1916 × 821 artwork.
- Formal Explore Now contains the restored Machine OEM and Remote I/O cards.
- The standalone archive contains the Rail and Power variants and has no local asset dependencies.
- `?experience=A` and `?experience=B` select and hold the corresponding hero on both deliverables; only the archive also switches Explore content.
- CTA and Explore clicks emit separate experiment identifiers plus the shared experience variant.
- Existing homepage interactions and routes continue to pass regression tests.
- Changes remain local until the user explicitly approves deployment.
