<p align="center">
    <picture>
      <img src="./.github/monoplate.png" height="128" alt="Monoplate logo, letter M centered in a square with purple-orange gradient border" />
    </picture>
    <h1 align="center">Monoplate</h1>
</p>

Go from cloning to coding in minutes. Monoplate is an opinionated template for starting a javascript monorepo. Aimed at supporting application development, it comes preconfigured with an ecosystem of tools and best practices to get you started quickly.

**Powered by:**

- 🔶 [Node.js](https://nodejs.org/en) - runtime
- 🏗️ [Pnpm](https://pnpm.io/) - package and workspace manager (exchangeable)
- 🏎️ [Turborepo](https://turbo.build/) - monorepo management
- 🦋 [Changesets](https://github.com/changesets/changesets) - version management
- 🏃 [Vite](https://vitest.dev/config/) - web tooling
- 🌀 [Typescript](https://www.typescriptlang.org/) - type checking
- ☑️ [Eslint](https://github.com/eslint/eslint) - linting
- 💅 [Prettier](https://prettier.io/) - code formatting
- 🔄 [Syncpack](https://github.com/JamieMason/syncpack) - dependency management
- 🐶 [Husky](https://github.com/typicode/husky) - git hooks
- 🔢 [Lint Staged](https://github.com/lint-staged/lint-staged) - precommit hooks
- 🗄️ [Github actions](https://docs.github.com/en/actions) - CI/CD
- 🥣 [Mise en place](https://mise.jdx.dev/) - Environment versioning (node, pnpm)

**Out of the box, monoplate includes:**

- 🧰 Presets for ESLint, Prettier, and Lint Staged
- ∫∫ Integration packages for vite, tailwindcss and react
- 🧑‍🏭 GitHub actions for testing, releasing, and deploying your projects, with goodies like caching and environment setup
- ⛩️ Package and application templates for starting your next docs, component library, API, or web application.
- 🎒 Extensive syncpack configuration for keeping your dependencies in check

### First steps

🙋 If you just want to start, go to the [getting started](#getting-started) section.

🙋 Monorepos can be daunting and we know that. See the [philosophy](#philosophy) section to understand them a bit better. Learn why we built monoplate and how it can help you.

## Getting started

Start by cloning the repository and installing dependencies:

```bash
gh repo clone macieklad/monoplate
cd monoplate
pnpm install
```

If you want to run any application, make sure every dependency is built first:

```bash
pnpm build:ecosystem
```

Then run your example app:

```bash
pnpm --filter remix dev
```

You can run whole monorepo in dev mode with `pnpm dev` command. It will start the `dev` script in every repository, but this is rarely what you want. You most likely want to run a single app dev script together with its dependencies:

```bash
p dev --filter remix...
```

The `...` syntax is taken directly from [turborepo configuration](https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependents-of-matched-workspaces)

🙋 Using monorepos is hard. To develop projects using monoplate you will soon have to understand how to use the tools in the repo. See the [documentation](#documentation) when you are ready.

## Philosophy

[Monorepos](https://monorepo.tools/) allow for simplified cross-project refactoring, unified versioning, and cohesive tooling strategies.

You may decide to use them for different purposes - the use cases change mostly when you are a single developer, a team, or a company. For example:

- You may want to publish a package and have some applications that use it in a single place
- You develop a lot of co-dependent projects, and it is a hassle to manage them separately
- Your teams grow, and you want to enforce a unified tooling and standards across all projects

Monorepo tooling has come a long way, and it is now easier than ever to set up a monorepo. Not long ago, you had to jump into lerna and hope that everything builds nicely, that your dependencies won't collide, and that your node_modules mess won't explode. Did I mention versioning, robust testing and linting? Without good caching, you could be waiting for your CI to finish for hours.

Now we have turborepo, pnpm, changesets, and a lot of other tools that make monorepos a breeze. Still, after the initial setup, there is a lot of configuration to do:

- How do you lint your code? ESLint? Which of a few hundred rules and plugins do you use? What about TypeScript linting? A simple app is taking 30 seconds to lint? Good luck!
- Formatting and code style? Prettier? How to run it before committing? What about the configuration? Oh, a global config? I hope you won't run it on node_modules!
- Building your app? Vite? Webpack? Rollup? What about the configuration? How do you run it in production? What about the environment variables? External modules? Peer dependencies? I hope your clients use evergreen browsers!
- Dependency management? Three version of React in your apps? You just bundled one with your package? Too bad.

If you have an expert to configure all of this, you are golden. If you are a team of one, you are in for a ride. And how to teach that to new developers?

We have created monoplate to be the next layer in the puzzle, the kind of you see more and more like `shadcn/ui`. You can clone this repo and have a working setup, with common configuration packaged away so the only thing you need to do is to write your own, business code. From the moment you clone it, the code is yours, and we provide a lot of docs and examples to help you along the way. This is crucial as monorepos by nature are heavily dependent on your own tools and practices.

We also try to learn as much as you do, and look for best ways to solve monorepo issues, to provide modern configuration and build optimised apps. We are open to suggestions and PRs, and we hope that monoplate will be a good starting point for your next project.

## Documentation

This section strives to guide you through everything available in the monoplate. We will overview most things here, but deeper knowledge is hidden in the individual package documentation. If you want to understand how everything comes together from the ground up, get familiar with the tools mentioned in the README introduction `Powered by` list, and then go through the repository packages and files in the following order:

- root [`package.json`](./package.json)
- [`pnpm-workspace.yaml`](./pnpm-workspace.yaml)
- [`turbo.json`](./turbo.json)
- [`syncpack.config.cjs`](./syncpack.config.cjs)
- [`@acme/style-guide`](./tools/style-guide/README.md)
- [`@acme/vite`](./tools/vite/README.md)
- [`@acme/tailwind`](./tools/tailwind/README.md)
- [`@acme/react-package-template`](./packages/react-package-template/README.md)
- [`@acme/components`](./packages/components/README.md)
- `@acme/any_app`

## Thanks

Huge shutout to [@miikebar](https://github.com/miikebar) for his work on this project. Without his ideas and contributions to the project architecture, vite presets and linters, we would not have created it.

## TODO

### V1

- [ ] Application templates
  - [ ] Remix
    - [ ] Docs
    - [x] Template
  - [ ] Next.js
    - [ ] Docs
    - [x] Template
  - [ ] Astro
    - [ ] Docs
    - [x] Template
    - [x] Starlight docs
  - [ ] Storybook
    - [ ] Docs
    - [x] Template
    - [ ] Used plugins
  - [ ] Nitro API
    - [ ] Docs
    - [ ] Template
    - [ ] OpenAPI generation
    - [ ] Spec generation
- [ ] Package templates
  - [ ] Component library
    - [ ] Docs
    - [x] Template
  - [ ] React package template
    - [ ] Docs
    - [x] Template
- [x] Tools
  - [x] Tailwind
    - [x] Template
    - [x] Docs
      - [x] Usage
  - [x] Vite
    - [x] Docs
      - [x] Usage
      - [x] Types
      - [x] Node externals
  - [x] Style guide
  - [ ] CI/CD Pipeline
    - Testing
    - Linting
    - Caching
    - Versioning
    - Docs
- [ ] Documentation
  - [x] Included tool links
  - [ ] Configuration after cloning
  - [ ] Renaming example `acme` names
  - [ ] Getting started
  - [ ] Explanation for each used tool with best practices
  - [ ] Hoisting configuration and why it matters to build packages (workspace:\* dependency resolving and externalisation)
- [x] Thanks

V2 Ideas

- [ ] E2E test setup
- [ ] Startup tests for each template
- [ ] Module federation
- [ ] ESLint 9 / Drop vercel style guide(?)
- [ ] Mobile app setup
- [ ] Verify if module.exports and .cjs are needed with Node 23 release
