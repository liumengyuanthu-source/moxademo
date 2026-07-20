# Moxa Design System Builder

This local Figma development plugin generates the native Moxa Operational Design System v1.0 in the Backup file.

## Generated content

- 10 Starter-compatible single-mode variable collections with 105 variables.
- 13 text styles, 3 effect styles, and 3 grid styles.
- 31 ordered documentation pages.
- 54 components/patterns, including native variant sets for core controls.
- 12 templates, 13-route coverage board, and Sitecore mapping documentation.

## Import and run

1. Open Figma Desktop and the Moxa Backup file.
2. Choose **Plugins → Development → Import plugin from manifest…**.
3. Select this folder’s `manifest.json`.
4. Run **Moxa Design System Builder**.
5. Wait for the completion notification, then review the Cover and Changelog pages.

The plugin does not use the network and writes only to the current Figma document. Run it once in the target file. If rerun, it uses shared plugin metadata to identify generated nodes.

## Verification

From the repository root:

```sh
node handoff/design-system-v1/figma-builder/test-builder.mjs
node handoff/design-system-v1/figma-builder/test-plugin-output.mjs
node --check handoff/design-system-v1/figma-builder/code.js
```

