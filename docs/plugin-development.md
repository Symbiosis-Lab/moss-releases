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
| `process` | Before HTML generation | Raw markdown and frontmatter |
| `enhance` | After HTML generation | Generated HTML; can inject content via slots |
| `deploy` | On deploy action | Compiled site output |
| `syndicate` | After deploy | Published URLs |

```typescript
const MyPlugin = {
  async deploy(ctx: DeployContext): Promise<HookResult> {
    reportProgress('Uploading files...')
    // your deploy logic
    return { success: true }
  },

  async syndicate(ctx: SyndicateContext): Promise<HookResult> {
    // your syndication logic
    return { success: true, url: 'https://myservice.example/post/123' }
  }
}
```

## moss-api SDK

The `moss-api` package provides types and utilities for plugin development.

```sh
npm install moss-api
```

**Types:**

| Export | Description |
|--------|-------------|
| `DeployContext` | Passed to `deploy` hooks |
| `SyndicateContext` | Passed to `syndicate` hooks |
| `HookResult` | Return type for all hooks |
| `PluginManifest` | Manifest shape |

**Utilities:**

| Export | Description |
|--------|-------------|
| `setMessageContext` | Set context for log messages |
| `reportProgress` | Report a progress message to the UI |
| `reportError` | Report a non-fatal error |
| `log` / `warn` / `error` | Structured logging |

**Browser:**

| Export | Description |
|--------|-------------|
| `openBrowser` | Open a URL in the system browser |
| `closeBrowser` | Close a previously opened browser tab |

**Tauri:**

| Export | Description |
|--------|-------------|
| `getTauriCore` | Access Tauri core APIs |
| `isTauriAvailable` | Check if running inside Tauri |

## Testing

Use vitest with the mock Tauri setup included in the SDK:

```typescript
import { describe, it, expect } from 'vitest'

describe('my-plugin deploy', () => {
  it('returns success on valid config', async () => {
    const result = await MyPlugin.deploy(mockDeployContext)
    expect(result.success).toBe(true)
  })
})
```

Run tests with:

```sh
npx vitest run
```

## Contributing

See the [CONTRIBUTING guide](https://github.com/Symbiosis-Lab/moss-releases) for the full development workflow, CI/CD setup, and code style guidelines.
