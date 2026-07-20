# Moxa Operational Design System v1.0

This folder is the implementation handoff for the 12 PoC page types and 13 routes. It is intended for Joni, Stephen, the design team, and the SitecoreAI implementation team.

## Start here

1. Open `design-system-v1.html` or the packaged PDF for the visual system.
2. Open the [Figma source file](https://www.figma.com/design/USRPJHboEejgu78oeZpIlc).
3. Use `figma-builder/` to generate the full native Figma library in the Backup file.
4. Use `sitecore-crosswalk.csv` when decomposing components and templates for Sitecore.

## Scope

- 105 physical Figma variables in 10 Starter-compatible single-mode collections.
- 13 text styles, 3 effect styles, and 3 grid styles.
- 54 component and pattern definitions.
- 12 page templates supporting 13 routes.
- 30 initial Sitecore component/template mappings.
- 30-page English visual handbook.

## Files

- `tokens.json`: logical tokens and Starter-compatible collection plan.
- `component-inventory.csv`: component name, category, ownership, variants, states, and accessibility contract.
- `route-template-matrix.csv`: route-to-template coverage.
- `sitecore-crosswalk.csv`: Figma-to-Sitecore mapping.
- `gap-analysis.md`: current-code audit and consolidation decisions.
- `figma-manifest.json`: Figma file status and build method.
- `version-manifest.json`: release metadata.
- `figma-builder/`: local Figma development plugin that builds the native library.

## Source-of-truth rule

The Figma file is the visual source of truth after the Builder has run. Token JSON and CSV manifests remain the machine-readable implementation contract. Page-local CSS must not introduce a new value or pattern without a documented token/component change.

