---
title: Write a plugin
url: extend
uid: 944cabf2
weight: 50
description: Build a JavaScript plugin that hooks into the moss build pipeline — from a minimal working example to the full reference.
---

A plugin is a JavaScript bundle you drop into `.moss/plugins/<name>/`. moss finds it automatically, reads its manifest, and calls the hooks it declares at the right stage of every build.

## Minimal working plugin

Start with this layout inside your project:

```
.moss/plugins/my-plugin/
├── manifest.json
├── main.bundle.js
└── icon.svg
```

A `manifest.json` registering one hook:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Does one thing well",
  "author": "Your Name",
  "entry": "main.bundle.js",
  "capabilities": ["enhance"],
  "global_name": "MyPlugin"
}
```

A `main.bundle.js` that exports the hook as a property on the global object named in `global_name`:

```js
window.MyPlugin = {
  async enhance(ctx) {
    return {
      slots: {
        "after-article": "<p>Added by my-plugin.</p>"
      }
    };
  }
};
```

That is a complete plugin. Copy it into `.moss/plugins/my-plugin/`, build, and it runs.

## How the pipeline works

When moss compiles a site, it runs through five stages in order:

```
process → generate → enhance → deploy → syndicate
```

A plugin attaches to one or more stages by listing capability names in `capabilities`. moss calls the matching method on your global object at the right moment, passes a typed context object, and reads the return value.

**process** runs before HTML generation. Use it to fetch external data or transform source files. Multiple plugins can have this capability.

**generate** builds source content into HTML. Only one plugin can have this capability; it replaces moss's built-in generator. Use it to plug in Hugo, Astro, or another SSG backend.

**enhance** injects content into named template slots after HTML is generated. Multiple plugins can have this capability. Use it for comments, analytics, newsletter forms, or any per-page injection.

**deploy** pushes the compiled site to a hosting platform. Only one plugin can have this capability. Use it for GitHub Pages, Netlify, or custom hosting.

**syndicate** distributes published content to external platforms (POSSE). Multiple plugins can have this capability. Use it for cross-posting to Matters.town, Substack, or social media.

An enhance plugin injects into named template slots. See [[slots]] for the full list, their positions, and the `EnhanceResult` shape.

## Building the bundle

moss loads `main.bundle.js` as a script tag. Bundle with esbuild as an IIFE so the global object lands on `window`:

```sh
esbuild src/main.ts \
  --bundle \
  --format=iife \
  --global-name=MyPlugin \
  --outfile=main.bundle.js
```

The output file goes directly into `.moss/plugins/my-plugin/`. `global_name` in the manifest must match the `--global-name` flag.

## SDK

Install `@symbiosis-lab/moss-api` for TypeScript types and utilities.

```sh
npm install @symbiosis-lab/moss-api
```

It exports typed context interfaces (`ProcessContext`, `GenerateContext`, `EnhanceContext`, `DeployContext`, `SyndicateContext`), the `HookResult` return type, and utilities like `reportProgress`, `reportError`, and `openBrowser`. Every context, utility, and type is documented in the [full API reference](https://github.com/Symbiosis-Lab/moss-api/tree/main/docs/api), generated from the source.

For Rust contributors working on moss itself, the core types are published as `moss-core` on [docs.rs](https://docs.rs/moss-core).

## Privileged capabilities

Most of the SDK is available to every plugin. A few capabilities can reach outside the sandbox in ways the reader cannot undo, so moss refuses them unless your manifest asks for them by name:

```json
{
  "requires": ["execute_binary"]
}
```

Two are gated today:

- `execute_binary` — running a native program. The GitHub plugin uses it to run `git`.
- `identity_sign` — signing with the site's identity key, and reading that key's public form.

If a plugin calls one without declaring it, the call fails with an explanatory error rather than running. Declaring nothing is the safe default, and an undeclared call is never granted by accident.

## Signing with the site's identity

Every moss project has an identity keypair. It is what authenticates the site's owner, and it is what a decentralized address like an IPNS name is derived from.

**Your plugin never receives the key.** It asks moss for a public key, or for a signature over bytes it built itself. moss holds the key and signs on request — the same arrangement as a hardware wallet, or a Nostr signer extension. You own the protocol; moss owns custody.

```ts
import { getIdentityPublicKey, identitySign } from "@symbiosis-lab/moss-api";

// The public key, in the encoding your protocol expects.
const pubkey = await getIdentityPublicKey("ipns", "secp256k1-ecdsa");

// A signature over bytes you construct.
const signature = await identitySign("ipns", "secp256k1-ecdsa", myRecordBytes);
```

Every signature is tied to a **purpose**. moss mixes that purpose's short tag into the bytes before signing, so a signature you obtain works for that protocol and nothing else. This is what keeps a plugin signature from being reusable as the site owner's login or as a moderation decision — moss signs those with the same key.

The tag is the protocol's own: for `ipns` it is the IPNS spec's `ipns-signature:` separator, so you pass just the record data and the signature is spec-exact. Purposes are a list moss recognizes; a protocol moss has not registered yet cannot be signed for.

Two schemes are available over the one key:

| Scheme | Signature | Public key | Used by |
|---|---|---|---|
| `secp256k1-schnorr` | BIP-340, 64 bytes | x-only, 32 bytes | Nostr events |
| `secp256k1-ecdsa` | ECDSA/SHA-256, DER, low-S | compressed SEC1, 33 bytes | libp2p, IPNS records |

Both are the same key seen two ways, so an address you derive from the compressed key is provably the same identity as the user's Nostr public key. Add `"requires": ["identity_sign"]` to your manifest to use either call.

One thing to know before you publish a permanent address: if the user's key file is lost, moss will not quietly issue a new one — it reports the problem instead, because a replacement key would silently change every address derived from it. Tell your users that `.moss/identity/` is worth backing up.

## Reference

Field tables, hook context signatures, slot positions, and CLI flags are in the Reference section. Start with [[manifest]] for the full `manifest.json` field list, then [[hooks]] for context shapes and the plugin runtime lifecycle, [[slots]] for slot positions, and [[cli]] for headless build and automation commands.
