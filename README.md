# [WiP] Production ready javascript monorepo starter

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

## TODO

- [ ] Application templates
  - [ ] Remix
    - [ ] Docs
    - [x] Template
  - [ ] Next.js
    - [ ] Docs
    - [ ] Template
  - [ ] Astro
    - [ ] Docs
    - [ ] Template
    - [ ] Starlight docs
  - [ ] Storybook
    - [ ] Docs
    - [ ] Template
    - [ ] Used plugins
  - [ ] AdonisJS API
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
- [ ] Tools
  - [ ] Tailwind
    - [x] Template
    - [ ] Docs
      - [ ] Usage
      - [ ] Customizing library template
  - [ ] Vite
    - [ ] Docs
      - [x] Usage
      - [ ] Customizing library preset
      - [ ] Types
      - [ ] Node externals
    - [x] Template
- [ ] Documentation
  - [x] Included tool links
  - [ ] Configuration after cloning
  - [ ] Renaming example `acme` names
  - [ ] Getting started
  - [ ] Explanation for each used tool with best practices
- [ ] Thanks
