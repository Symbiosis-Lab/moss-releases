---
title: Manifest
uid: 8ec7c709
weight: 20
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

Each plugin lives in `.moss/plugins/<name>/` inside the project.

## Manifest fields

<!-- auto:start:manifest -->
| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | yes | Plugin identifier (e.g. "matters"). Must match the plugin directory name. |
| `version` | `string` | yes | Plugin version in semver format (e.g. "1.0.0"). |
| `entry` | `string` | yes | Entry point JavaScript file path, relative to the plugin directory. |
| `capabilities` | `string[]` | no | Hook names this plugin implements (e.g. ["process", "syndicate"]). Each must be a valid hook name. An empty or omitted capabilities field is valid (plugin implements no hooks). |
| `description` | `string` | no | Human-readable description of what the plugin does. |
| `author` | `string` | no | Plugin author name or contact. |
| `global_name` | `string` | no | Global JavaScript variable name the plugin exports. Defaults to PascalCase(name) + "Plugin". |
| `display_name` | `string` | no | Human-readable name shown in the moss Settings UI section title (e.g. "Comments"). |
| `icon` | `string` | no | Path to the plugin icon file, relative to the plugin directory. Falls back to icon.svg / icon.png / logo.svg / logo.png. |
| `domain` | `string` | no | Primary domain for cookie access (e.g. "matters.town"). Required for plugins using cookie-based authentication. |
| `domains` | `string[]` | no | Full set of domains the plugin operates on (e.g. prod + staging). Used for scope-wide cookie clearing on force-fresh login. |
| `config` | `object` | no | Plugin-specific configuration key-value pairs (e.g. login_url, api_endpoint). Merged with .moss/config.toml at runtime. |
| `config_schema` | `object` | no | Optional configuration schema for validation. Maps config field names to type strings. |
| `config_labels` | `object` | no | Settings UI label overrides. Maps config field names to display labels (e.g. {"enabled": "Enable Comments"}). |
| `config_descriptions` | `object` | no | Settings UI help text. Maps config field names to description strings. |
| `config_placeholders` | `object` | no | Settings UI placeholder text. Maps config field names to placeholder strings (e.g. {"api_key": "Enter your API key"}). |
| `config_verify` | `object` | no | Endpoint verification specs. After saving config, moss probes each declared URL and shows "Server unreachable" on failure. |
| `contributes` | `object` | no | Optional schema contributions (frontmatter fields, embed renderers, job descriptors). Follows the VS Code contributes pattern. |
<!-- auto:end:manifest -->

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

`config` sets default values. `config_schema` declares the type of each field (`"boolean"`, `"number"`, `"string"`). moss generates a settings UI from these fields automatically.

| Manifest field | Purpose |
|---------------|---------|
| `config` | Default values |
| `config_schema` | Field types for UI generation |
| `config_labels` | Display labels in settings |
| `config_descriptions` | Help text in settings |
| `config_placeholders` | Placeholder text for inputs |

### Config resolution

Plugin configuration is resolved in priority order:

1. `.moss/plugins/<name>/config.json` (highest priority)
2. `.moss/plugins/<name>/config.toml`
3. `.moss/config.toml` `[plugins.<name>]` section (lowest)

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

The `value` placeholder in the probe URL is replaced with the user's input. moss probes the URL and checks the response.

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

Contributed fields are merged into the active schema at runtime and appear in the moss editor.

## moss-api SDK

The `@symbiosis-lab/moss-api` package provides types and utilities for plugin development:

```sh
npm install @symbiosis-lab/moss-api
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

Use vitest with the mock Tauri setup from `moss-api`:

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
