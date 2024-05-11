# 🧰️ @acme/vite

This package contains presets and utils used to configure Vite for app and library development.

## Installation

```shell
pnpm install @acme/vite @vitejs/plugin-react vite-plugin-dts
```

## Presets

### Library

Can be used to set up development of vanilla JS or React libraries. It uses `@vitejs/plugin-react` and `vite-plugin-dts`
to generate TypeScript definition files.

Preset does the following things for you:

- It externalises dependencies and native node imports using `rollup-plugin-node-externals`. Your libraries should not have React or react-dom in their bundles (unless you have a good reason for it).
- `React`, `react-dom`, and `jsx-runtime` imports are [globalised](https://rollupjs.org/configuration-options/#output-globals) under `React`, `ReactDOM` and `react/jsx-runtime` objects/imports.
- `vite-plugin-dts` is used to generate TypeScript definition files for your library. We are not rolling up types with `rollupTypes` as it generated errors for us in the past, if you want to experiment with it, add it to the preset and see if types in the dist are not producing ts errors.
- While outputting types, we are ignoring vite config and test files, so you can include them in your tsconfigs safely.
- If dts diagnostics fail, we will throw an error and stop the build process.

**Options**
All options come from the plugins that are used in the preset. You can pass them as an object to the preset and they will be merged accordingly.

```ts
import { type PluginOptions as DtsOptions } from 'vite-plugin-dts';
import { type Options as ReactOptions } from '@vitejs/plugin-react';
import { type ExternalsOptions } from 'rollup-plugin-node-externals';

interface LibraryPresetOptions {
  externals?: ExternalsOptions;
  react?: ReactOptions;
  dts?: DtsOptions;
}
```

#### Tldr; Should you use this preset?

- If you want to build publishable browser/react library, use the library preset.
- If you want to just transpile your code, use `tsc` (possibly in watch mode)

Vite bundles your code in library mode as if it was something that will be consumed by a browser. It has a separate `--ssr` mode for server usages. Bundling is complicated, and if you don't care about inlining dependencies, tree shaking, and other optimisations, because for example you are creating a node library, don't use any heavy tool for that, you don't need it.
