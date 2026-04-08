---
title: Manifest
uid: 8ec7c709
weight: 4
description: Plugin manifest reference, configuration, and the moss-api SDK.
translationKey: docs-extend-manifest
---

## Directory structure

```
.moss/plugins/my-plugin/
├── manifest.json      Plugin metadata and config
├── main.bundle.js     Built JavaScript entry point
├── config.json        Runtime config (overrides defaults)
└── icon.svg           Plugin icon (optional)
```

Plugins live in `.moss/plugins/{name}/` inside each project.

## Required fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Plugin identifier (used as folder name) |
| `version` | semver | Plugin version |
| `description` | string | Short description |
| `author` | string | Author name |
| `entry` | string | JavaScript bundle filename |
| `capabilities` | string[] | Hook types: `"process"`, `"generate"`, `"enhance"`, `"deploy"`, `"syndicate"` |
| `global_name` | string | JavaScript global object name (e.g., `"MyPlugin"`) |

## Optional fields

| Field | Type | Description |
|-------|------|-------------|
| `domain` | string | Primary service domain (e.g., `"matters.town"`) |
| `icon` | string | Icon filename (falls back to `icon.svg`, `icon.png`, `logo.svg`, `logo.png`) |
| `display_name` | string | Display name in settings UI |

## Example manifest

```json
{
  "name": "my-deploy",
  "version": "1.0.0",
  "description": "Deploy to My Hosting",
  "author": "Your Name",
  "entry": "main.bundle.js",
  "capabilities": ["deploy"],
  "global_name": "MyDeployPlugin",
  "domain": "myhost.example",
  "icon": "icon.svg",
  "config": {
    "auto_deploy": false,
    "region": "us-east"
  },
  "config_schema": {
    "auto_deploy": "boolean",
    "region": "string"
  },
  "config_labels": {
    "auto_deploy": "Auto Deploy",
    "region": "Server Region"
  },
  "config_descriptions": {
    "auto_deploy": "Automatically deploy after each build",
    "region": "Hosting region for your site"
  }
}
```

## Configuration

### Defaults and schema

`config` sets default values. `config_schema` declares the type of each field (`"boolean"`, `"number"`, `"string"`). moss generates a settings UI from these automatically.

| Manifest field | Purpose |
|---------------|---------|
| `config` | Default values |
| `config_schema` | Field types for UI generation |
| `config_labels` | Display labels in settings |
| `config_descriptions` | Help text in settings |
| `config_placeholders` | Placeholder text for inputs |

### Config resolution

Plugin configuration is resolved in priority order:

1. `.moss/plugins/{name}/config.json` — highest priority
2. `.moss/plugins/{name}/config.toml`
3. `.moss/config.toml` `[plugins.{name}]` section — lowest

### Config verification

`config_verify` probes an endpoint after the user saves config:

```json
"config_verify": {
  "api_key": {
    "probe": "https://api.example.com/verify/{value}",
    "expect": "ok"
  }
}
```

`{value}` is replaced with the user's input. The probe runs and checks the response.

## Schema contributions

Plugins can add frontmatter fields via `contributes.frontmatter.fields`:

```json
"contributes": {
  "frontmatter": {
    "fields": {
      "syndicated_url": {
        "type": "string",
        "description": "URL where this article was syndicated"
      }
    }
  }
}
```

Contributed fields are merged into the active schema at runtime and appear in the editor.

## moss-api SDK

The `moss-api` package provides types and utilities for plugin development.

```sh
npm install moss-api
```

### Types

| Export | Description |
|--------|-------------|
| `DeployContext` | Passed to deploy hooks |
| `SyndicateContext` | Passed to syndicate hooks |
| `EnhanceContext` | Passed to enhance hooks |
| `HookResult` | Return type for all hooks |
| `PluginManifest` | Manifest shape |

### Utilities

| Export | Description |
|--------|-------------|
| `reportProgress` | Show progress message in the UI |
| `reportError` | Report a non-fatal error |
| `log` / `warn` / `error` | Structured logging |

### Browser

| Export | Description |
|--------|-------------|
| `openBrowser` | Open a URL in the system browser |
| `closeBrowser` | Close a previously opened browser tab |

## Building

Bundle with esbuild as an IIFE:

```sh
esbuild src/main.ts --bundle --format=iife --global-name=MyPlugin --outfile=dist/main.bundle.js
```

## Testing

Use vitest with the mock Tauri setup from moss-api:

```typescript
import { describe, it, expect } from 'vitest';

describe('deploy', () => {
  it('returns success', async () => {
    const result = await MyPlugin.deploy(mockContext);
    expect(result.success).toBe(true);
  });
});
```

```sh
npx vitest run
```
