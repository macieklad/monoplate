# Design system starter

Built upon vercel/turbo/examples/design-system design-system

## Using this example

Clone the repo, install packages. Then run development mode

```bash
yarn
yarn dev
```

### Useful Commands

- `yarn build` - Build all packages including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each
  package's clean script)
- `yarn test` - Run unit tests
- `yarn test:ui` - Run unit tests with user interface
- `yarn test:e2e` - Run end to end tests

## Turborepo

[Turborepo](https://turbo.build/repo) is a high-performance build system for
JavaScript and TypeScript codebases. It was designed after the workflows used by
massive software engineering organizations to ship code at scale. Turborepo
abstracts the complex configuration needed for monorepos and provides fast,
incremental builds with zero-configuration remote caching.

Using Turborepo simplifes managing your design system monorepo, as you can have
a single lint, build, test, and release process for all packages.
[Learn more](https://vercel.com/blog/monorepos-are-changing-how-teams-build-software)
about how monorepos improve your development workflow.

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `apps/example-next`: React library integration with styles
- `packages/@acme/react`: React components and utilities
- `packages/@acme/testing`: Shared testing config and place for their deps
- `packages/@acme/tsconfig`: Shared `tsconfig.json`s used throughout the
  projects
- `packages/eslint-config-acme`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Yarn
Workspaces enables us to "hoist" dependencies that are shared between packages
to the root `package.json`. This means smaller `node_modules` folders and a
better local dev experience. To install a dependency for the entire monorepo,
use the `-W` workspaces flag with `yarn add`.

This example sets up your `.gitignore` to exclude all generated files, other
folders like `node_modules` used to store your dependencies.
