---
title: Plugin Development
uid: f86abbd7
weight: 8
description: Build your own moss plugins.
translationKey: plugin-development
---

moss plugins are TypeScript/JavaScript bundles that run in the Tauri webview context. They interact with moss through lifecycle hooks — transforming content, deploying to external services, or syndicating published pages.

## Quick start

1. Copy an existing plugin directory (e.g., `plugins/github/`)
2. Update `assets/manifest.json` with your plugin's details
3. Implement the hooks your plugin needs
4. Build with esbuild:

```sh
esbuild src/main.ts --bundle --format=iife --outfile=dist/main.bundle.js
```

## Directory structure

```
my-plugin/
├── assets/
│   ├── manifest.json    Plugin metadata and config
│   └── icon.svg         Plugin icon
├── src/
│   └── main.ts          Plugin source
├── dist/
│   └── main.bundle.js   Built output
└── package.json
```

## Manifest reference

The `assets/manifest.json` file describes your plugin to moss.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Plugin identifier |
| `version` | semver | yes | Plugin version |
| `description` | string | yes | Short description |
| `author` | string | yes | Author name |
| `entry` | string | yes | JS bundle filename |
| `capabilities` | string[] | yes | Hook types: `"process"`, `"deploy"`, `"syndicate"` |
| `domain` | string | no | Primary service domain |
| `global_name` | string | yes | JavaScript global object name |
| `icon` | string | no | Icon filename |
| `config` | object | no | Default config values |
| `config_schema` | object | no | Config field types: `"boolean"`, `"number"`, `"string"` |

Example:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Publishes to My Service",
  "author": "Your Name",
  "entry": "main.bundle.js",
  "capabilities": ["deploy", "syndicate"],
  "domain": "myservice.example",
  "global_name": "MyPlugin",
  "icon": "icon.svg",
  "config": {
    "auto_publish": false
  },
  "config_schema": {
    "auto_publish": "boolean"
  }
}
```

## Hooks

Declare which hooks your plugin handles in the `capabilities` array of the manifest, then export them from your bundle's global object.

| Hook | Trigger | Context |
|------|---------|---------|
| `before_build` | Before HTML generation | Raw markdown and frontmatter |
| `on_build` | Replaces HTML generation | Source files and page tree |
| `on_deploy` | On deploy action | Compiled site output |
| `configure_domain` | After DNS is set | Domain and deployment info |
| `after_deploy` | After deploy | Published articles and deployment info |

```typescript
const MyPlugin = {
  async on_deploy(ctx: DeployContext): Promise<HookResult> {
    reportProgress('Uploading files...')
    // your deploy logic
    return { success: true }
  },

  async after_deploy(ctx: SyndicateContext): Promise<HookResult> {
    // your syndication logic
    return { success: true }
  }
}
```

## moss-api SDK

The `@symbiosis-lab/moss-api` package provides types and utilities for plugin development.

```sh
npm install @symbiosis-lab/moss-api
```

**Types:**

| Export | Description |
|--------|-------------|
| `ProcessContext` | Passed to `before_build` hooks |
| `GenerateContext` | Passed to `on_build` hooks |
| `DeployContext` | Passed to `on_deploy` hooks |
| `ConfigureDomainContext` | Passed to `configure_domain` hooks |
| `SyndicateContext` | Passed to `after_deploy` hooks |
| `HookResult` | Return type for all hooks |

**Utilities:**

| Export | Description |
|--------|-------------|
| `setMessageContext` | Set context for log messages |
| `reportProgress` | Report build/deploy progress to the UI |
| `reportError` | Report a non-fatal or fatal error |
| `reportComplete` | Signal hook completion |
| `sendMessage` | Send a message to the moss UI |

**Browser:**

| Export | Description |
|--------|-------------|
| `openBrowser` | Open a browser window inside moss |
| `closeBrowser` | Close a previously opened browser tab |

For the full API reference, see [@symbiosis-lab/moss-api on GitHub](https://github.com/Symbiosis-Lab/moss-api/tree/main/docs/api/).

## Testing

Use vitest with the mock Tauri setup included in the SDK:

```typescript
import { describe, it, expect } from 'vitest'

describe('my-plugin deploy', () => {
  it('returns success on valid config', async () => {
    const result = await MyPlugin.on_deploy(mockDeployContext)
    expect(result.success).toBe(true)
  })
})
```

Run tests with:

```sh
npx vitest run
```

## Contributing

See the [CONTRIBUTING guide](https://github.com/Symbiosis-Lab/moss-plugins/blob/main/CONTRIBUTING.md) for the full development workflow, CI/CD setup, and code style guidelines.
