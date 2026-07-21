# Machine-readable SitecoreAI handoff

These files are the authoritative deployment contract:

- `component-manifest.json` — reusable components, author fields, rendering mode, design-system dependencies, and GenScript reuse decisions.
- `page-compositions.json` — templates, shared partials, routes, datasources, and ordered page compositions.
- `demo-journeys.json` — 38 operation demonstrations, six stages, evidence routes, status boundaries, and approved decisions.
- `interaction-contract.json` — clickable interaction, motion, accessibility, analytics-event, and integration boundaries for SitecoreAI.

Membership registration is a homepage modal component only. There is no standalone membership route; `homepage.html#my-moxa-signup` opens the accessible three-step flow and dispatches the CRM-ready registration event.

Validate with:

```text
python3 -m unittest discover -s tests -p 'test_*.py' -v
```

Implementation and automation guidance: `../SITECOREAI_AUTOMATION_BLUEPRINT.md`.
