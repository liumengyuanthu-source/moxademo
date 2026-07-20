# Package Contents

## Complete source archive

The complete source archive is a Git snapshot of the published branch. It contains every version-managed file: formal PoC routes, supporting prototypes, shared assets, audit evidence, screenshots, tests, design-system materials, plans, specifications, and handoff documentation. It excludes only Git metadata and local worktree administration files.

Use the complete archive when Stephen needs traceability or must inspect how a component evolved.

## Sitecore-focused handoff

The Sitecore-focused package is organized as:

- `site/`: `index.html`, all 13 formal PoC routes, shared/local media, CSS, JavaScript, PDFs, and icons.
- `documentation/`: the handoff overview, component/template map, route matrix, integration checklist, and package description.
- `reference/`: the English 58-slide review deck, executive deck, and requirements/demo tracker from the previous approved handoff.
- `tests/`: the Remote I/O and shared lead-form contract test.

## Formal route rule

Only the 13 routes listed in `README_SITECORE_HANDOFF.md` are the approved customer-facing implementation scope. Other HTML files in the complete archive are supporting prototypes or diagnostics unless separately approved.

## Shared assets that must be migrated together

- `assets/css/moxa-ds.css`
- `assets/js/moxa-shell.js`
- `assets/css/microsite-remote-io.css`
- `assets/js/microsite-remote-io.js`
- `assets/js/moxa-lead-form.js`
- all recursively referenced files under `asset/`, `assets/`, `img/`, and `banner/`

Do not copy an HTML route without its referenced assets. Sitecore implementation should replace relative URLs with media and link fields after the files are imported into the Media Library.
