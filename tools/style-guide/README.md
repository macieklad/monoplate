# Style Guide

## Introduction

This directory hosts the monorepo style guide, which includes configs for
popular linting, formatting and maintenance tools.

The following configs are available, and are designed to be used together.

- [Prettier](#prettier)
- [ESLint](#eslint)
- [lint-staged](#lint-staged)

Some of our ESLint configs require peer dependencies. We'll note those
alongside the available configs in the [ESLint](#eslint) section.

## Prettier

> [!NOTE]
> Prettier is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: https://prettier.io/docs/en/install.html

To use the shared Prettier config, set the following in `package.json`.

```json
{
  "prettier": "@acme/style-guide/prettier"
}
```

Alternatively you can create a Prettier config file (i.e. `.prettierrc.js`) and export the config:

```js
export { default } from '@acme/style-guide/prettier';
```

## ESLint

> [!NOTE]
> ESLint is a peer-dependency of this package, and should be installed
> at the root of your project. If you use a monorepo, install eslint only in the workspace root.
>
> See: https://eslint.org/docs/user-guide/getting-started#installation-and-usage

The following configs are available:

- `@acme/style-guide/eslint/node`
- `@acme/style-guide/eslint/browser`
- `@acme/style-guide/eslint/react`
- `@acme/style-guide/eslint/next`
- `@acme/style-guide/eslint/remix`
- `@acme/style-guide/eslint/server`
- `@acme/style-guide/eslint/playwright`
- `@acme/style-guide/eslint/storybook`

Note that you can scope configs, so that configs only target specific files.
For more information, see: [Scoped configuration with `overrides`](#scoped-configuration-with-overrides).

> [!WARNING]
> You'll need to use `require.resolve` to provide ESLint with absolute paths,
> due to an issue around ESLint config resolution (see
> [eslint/eslint#9188](https://github.com/eslint/eslint/issues/9188)).
> Defining the ESlint config in the package.json will not work.

Example `.eslintrc.js` config for a Vite React app:

```js
module.exports = {
  extends: [require.resolve('@acme/style-guide/eslint/react')],
};
```

### ESLint with TypeScript

---

TypeScript linting is configured to run on all files with a `*.{ts,tsx,mts,cts}` extension. This requires a valid
`tsconfig.json` to be present. By default, the linter will look for the config at the same level as the resolved
ESlint config. If you are working in a monorepo, make sure that every app / package has its own `.eslintrc.js` config
file so that the ESlint resolves to the correct `tsconfig.json`.

For more information, see: https://typescript-eslint.io/docs/linting/type-linting

### Configuring custom components for `jsx-a11y`

---

It's common practice for React apps to have shared components like `Button`,
which wrap native elements. You can pass this information along to `jsx-a11y`
via the `components` setting.

The below list is not exhaustive.

```js
module.exports = {
  root: true,
  extends: [require.resolve('@acme/style-guide/eslint/react')],
  settings: {
    'jsx-a11y': {
      components: {
        Article: 'article',
        Button: 'button',
        Image: 'img',
        Input: 'input',
        Link: 'a',
        Video: 'video',
      },
    },
  },
};
```

### Scoped configuration with `overrides`

---

ESLint configs can be scoped to include/exclude specific paths. This ensures
that rules don't "leak" into places where those rules don't apply.

In this example, Playwright rules are only being applied to files matching the provided pattern:

```js
module.exports = {
  extends: [require.resolve('@acme/style-guide/eslint/react')],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: [require.resolve('@acme/style-guide/eslint/playwright')],
    },
  ],
};
```

#### A note on file extensions

When using overrides, file extensions must be included or ESLint will
only include `.js` files.

```js
module.exports = {
  overrides: [
    { files: [`directory/**/*.[jt]s?(x)`], rules: { 'my-rule': 'off' } },
  ],
};
```

### Monorepo IDE setup

---

Working with multiple ESLint configs works out of the box in WebStorm. If you want to use VSCode you will need
additional configuration. Once you've installed the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
you'll need to inform it where it can find the configs. Use the following configuration:

```json
"eslint.workingDirectories": [
  { "pattern": "apps/*/" },
  { "pattern": "packages/*/" },
  { "pattern": "tooling/*/" }
]
```

You can either store this configuration in your personal config or create a `.vscode/settings.json` file in the root
of your project. This way the settings can be shared with others.

## lint-staged

You can configure your project to use [lint-staged](https://github.com/lint-staged/lint-staged?tab=readme-ov-file) to lint and format files before commiting them.

The following configs are available:

- `@acme/style-guide/lint-staged` - run both ESLint and Prettier on the staged files
- `@acme/style-guide/lint-staged/eslint` - run only ESLint on the staged files
- `@acme/style-guide/lint-staged/prettier` - run only Prettier on the staged files

After installing the package and configuring git hooks, create a config file (`.lintstagedrc.cjs`) in the root of your
repository and include the chosen config:

```js
// Use the default configuration
module.exports = require('@acme/style-guide/lint-staged')();

// Exclude some files from lint-staged
module.exports = require('@acme/style-guide/lint-staged')({
  // Files are matched using micromatch
  ignoredFiles: ['**/example.config.ts'],
});
```

Default ingore list includes `**/vite.config.ts` and `**/vitest.config.ts`.

> [!IMPORTANT]
> When working in a monorepo make sure that every package and app has its own `.lintstagedrc.cjs` config file.
> For a given staged file, the closest configuration file will always be used. This is required to make sure that the
> files will be linted with the correct ESLint config, as the lint command is ran from the same directory as the
> resolved lint-staged config file. To learn more check out ["How to use lint-staged in a multi-package monorepo?"](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#how-to-use-lint-staged-in-a-multi-package-monorepo)
