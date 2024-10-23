<p align="center">
    <picture>
      <img src="./.github/monoplate.png" height="128" alt="Monoplate logo, letter M centered in a square with purple-orange gradient border" />
    </picture>
    <h1 align="center">Monoplate</h1>
</p>

Monoplate is an opinionated template for starting a javascript monorepo. Aimed at parallel application development, it comes preconfigured with an ecosystem of tools for quick addition and maintenance of new apps and libraries.

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
- 🧑‍🏭 GitHub actions for testing, releasing, and deploying your projects, with caching and environment setup
- ⛩️ Minimal package and application templates for starting your next docs, component library, API, or web application.
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

❗ Now if you use your own organisation name, replace every occurrence of `@acme` in the repository with your own `@name`.

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
pnpm dev --filter remix...
```

The `...` syntax is taken directly from [turborepo configuration](https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependents-of-matched-workspaces)

Package release is done automatically through the `release` script. Make sure that after you clone this repository, you will set up your npm/github packages/jsr connection in the repository. We pass `GITHUB_TOKEN` to the changeset action by default, so if you set write access for it, it will publish to GitHub packages.

🙋 Using monorepos is hard. To develop projects using Monoplate you will soon have to understand how to use the tools in the repo. You can start with great resources like the [monorepo tools](https://monorepo.tools/) first. The read [Monoplate documentation](#documentation) when you are ready.

## Philosophy

[Monorepos](https://monorepo.tools/) enable simplified cross-project refactoring, unified versioning, and cohesive tooling strategies.

You may decide to use them for different purposes - the use cases change mostly when you are a single developer, a team, or a company. For example:

- You may want to publish a package and have some applications that use it in a single place
- You develop a lot of co-dependent projects, and it is a hassle to manage them separately
- Your teams grow, and you want to enforce a unified tooling and standards across all projects

Monorepo tooling has come a long way, and it is now easier than ever to set up a monorepo. Not long ago, you had to jump into lerna and hope that everything builds nicely, that your dependencies won't collide, and that your node_modules mess won't explode. Did I mention versioning, testing and linting? Without good caching, you could be waiting for your CI to finish for hours.

Now we have Turborepo, pnpm, changesets, and a lot of other tools that make monorepos a lot better. Still, after the initial setup, there is a lot of configuration to do:

- How do you lint your code? ESLint? Which of a few hundred rules and plugins do you use? What about TypeScript linting? A simple app is taking 30 seconds to lint? Good luck!
- Formatting and code style? Prettier? How to run it before committing? What about the configuration? Oh, a global config? I hope you won't run it on node_modules!
- Building your app? Vite? Webpack? Rollup? What about the configuration? What config do you use in production? What about the environment variables? External modules? Peer dependencies? Browser support?
- Dependency management? Three version of React in your apps? You just bundled one with your package? Too bad.

If you have an expert to configure all of this, you are golden. If you are a team of one, you are in for a ride. And how to teach that to new developers?

We have created Monoplate to be a point of reference. You can clone this repo and have a working setup, with common configuration packaged away so that the only thing you need to do is to write your own, business code. From the moment you clone it, the code is yours, and we provide docs and examples to help you along the way. This is crucial as monorepos by nature are heavily dependent on your own tools and practices.

We also try to learn as much as you do, and look for best ways to solve monorepo issues, to provide modern configuration and build optimised apps. We are open to suggestions and PRs, and we hope that Monoplate will be a good starting point for your next project.

## Documentation

This section strives to guide you through concepts available in Monoplate. We will overview most things here, but deeper knowledge is hidden in the individual package documentation. If you want to understand how everything comes together from the ground up, get yourself familiar with the tools mentioned in the README introduction `Powered by` list, and then go through the repository packages and files in the following order:

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
-

### Project management

Packages (directories with `package.json`) form the base of any javascript monorepo. We use pnpm to manage their dependencies and define how to locate them. In `pnpm-workspace.yaml` you can find which directories will be scanned for the `package.json` files and registered as **workspaces**, places where you can run scripts and install dependencies which will be centrally tracked. Pnpm does not care about relations between packages, so you can't say "build this package before that one". This is where Turbo comes in. In `turbo.json` you can define global tasks that will run a command of the same name in each of your workspaces. You define how they relate to each other, what outputs they produce, and how to cache them. Turbo will take care of the rest and make running loads of scripts a lot faster (if outputs don't change, cache will be used, making running scripts super fast even when you have tens or hundreds of packages). From this moment onward, you invoke turbo through pnpm scripts, and use it by default.

Pnpm installs dependencies of all packages in a single place - root directory `node_modules`, and symlinks them to the packages. This is a huge advantage over npm and yarn, as it saves disk space and speeds up the installation process. If two packages use the same dependency and its version, it will be installed only once. You can install the same dependency in two different versions, and they will be both installed. Pnpm will isolate those packages, but from time to time, especially because of the inherent nature of javascript and global scope, you may encounter issues, for example when you will bundle two dependency versions in your final code because of the way they are imported. Also, from the organisation perspective, you probably want everyone to use the same, up-to-date version of the dependency.

Pnpm and turbo don't concern themselves with this issue. This is where syncpack comes in. Syncpack is a tool that you provide with a versioning strategy for your packages, and it will ensure that everyone follows it. In Monoplate, we use a simple strategy - the newest version of dependency wins, and syncpack will bump all packages to the newest version of the dependency. This isn't always feasible, so we provide a big `syncpack.config` for you, where we fix some common versioning issues with javascript ecosystem.

❓You may ask, why not a single tool that does everything? You can! Try `nx` if you want to go with this solution. What we like about our setup is that packages are totally independent. You can pull a folder out of this monorepo, replace `workspace:*` dependencies in `package.json` with precise semver versions, run pnpm install, and everything will work as if the monorepo never existed - besides CI of course.

### Defining dependencies between packages

Turbo operates on tasks, but you configure your package dependencies as you would install any normal package from npm. If you want to depend on a project in the repository, you use its `name` field in the `package.json` and version it with `workspace:*`. You can also use a specific version, but it will be sourced directly from your registry, not from the monorepo code itself. Publishing to registry is set up with `release` command in the `package.json`.

### Scripts glossary

### Code quality

### Build toolchain and best practices

### CI/CD

### Component library

### Default applications

## Thanks

Huge shutout to [@miikebar](https://github.com/miikebar) for his work on this project. Without his ideas and contributions, vite presets and linters, we would not have created it.

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
    - [x] Template
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
    - [x] Testing
    - [x] Linting
    - [x] Cachingcccc
    - [x] Versioning
    - [ ] Docs
- [ ] Documentation
  - [x] Included tool links
  - [x] Configuration after cloning
  - [x] Renaming example `acme` names
  - [x] Getting started
  - [ ] Explanation for each used tool with best practices
  - [ ] Hoisting configuration and why it matters to build packages (workspace:\* dependency resolving and externalisation)
- [x] Thanks

V2 Ideas

- [ ] Dependency graph
- [ ] E2E test setup
- [ ] Startup tests for each template
- [ ] Module federation
- [ ] ESLint 9 / Drop vercel style guide(?)
- [ ] Mobile app setup
- [ ] Verify if module.exports and .cjs are needed with Node 23 release
