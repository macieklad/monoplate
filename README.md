<p align="center">
    <picture>
      <img src="./.github/monoplate.png" height="128" alt="Monoplate logo, letter M centered in a square with purple-orange gradient border" />
    </picture>
    <h1 align="center">Monoplate</h1>
</p>

Monoplate is an opinionated template for starting a javascript monorepo. It gathers best practices and well architected packages, and provides a starting point for your next monorepo.

**Powered by:**

- 🔶 [Node.js](https://nodejs.org/en) - runtime
- 🏗️ [Bun](https://bun.sh/) - package managment (but you can use it as runtime too)
- 🏎️ [Turborepo](https://turbo.build/) - monorepo management
- 🦋 [Changesets](https://github.com/changesets/changesets) - version management
- 🏃 [Vite](https://vite.dev/) - web tooling
- 📦 [tsdown](https://tsdown.dev/) - library bundling
- 🧹 [Biome](https://biomejs.dev/) - linting and formatting
- 🔄 [Syncpack](https://github.com/JamieMason/syncpack) - dependency management
- 🐶 [Husky](https://github.com/typicode/husky) - git hooks
- 🔢 [Lint Staged](https://github.com/lint-staged/lint-staged) - precommit hooks
- 🗄️ [Github actions](https://docs.github.com/en/actions) - CI/CD
- 🥣 [Mise en place](https://mise.jdx.dev/) - Environment versioning (node, bun)

**Out of the box, monoplate includes:**

- 🧰 Biome configuration for linting and formatting
- 🧑‍🏭 GitHub actions for testing, releasing, and deploying your projects, with caching setup
- ⛩️ Minimal package and application templates for starting your next component library or web application
- 🎒 Extensive syncpack configuration for keeping your dependencies in check

### First steps

Clone the repository

```bash
gh repo clone macieklad/monoplate
cd monoplate
bun install
```

Ask your AI agent to "Introduce me to the monoplate setup, walk me through the first steps". Repo is configured to help you out after this prompt.
You don't have one configured? Chat with github copilot for free in the GitHub web UI.

🙋 Monorepos can be daunting and we know that. See the [philosophy](#philosophy) section to understand them a bit better. Learn why monoplate was built and how it can help you.

❗ Now if you use your own organisation name, replace every occurrence of `@acme` in the repository with your own `@name`.

If you want to run any application, make sure every dependency is built first:

```bash
bun run build:ecosystem
```

Then run your example app:

```bash
bun run --filter tanstack-app dev
```

You can run whole monorepo in dev mode with `bun run dev` command. It will start the `dev` script in every repository, but this is rarely what you want. You most likely want to run a single app dev script together with its dependencies:

```bash
bun run dev --filter tanstack-app...
```

The `...` syntax is taken directly from [turborepo configuration](https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependents-of-matched-workspaces)

Package release is done automatically through the `release` script. Make sure that after you clone this repository, you will set up your npm/github packages/jsr connection. We pass `GITHUB_TOKEN` to the changeset action by default, so if you set write access for it, it will publish to GitHub packages.

## Philosophy

[Monorepos](https://monorepo.tools/) enable simplified cross-project refactoring, unified versioning, and cohesive tooling strategies.

You may decide to use them for different purposes - the use cases change mostly when you are a single developer, a team, or a company. For example:

- You may want to publish a package and have some applications that use it in a single place
- You develop a lot of co-dependent projects, and it is a hassle to manage them separately
- Your teams grow, and you want to enforce a unified tooling and standards across all projects

Tooling has come a long way, and it's easier than ever to set up a monorepo. Not so long ago, you had to jump into lerna and hope that everything builds nicely, that your dependencies won't collide, and that your node_modules mess won't explode. Versioning, testing and linting? Without good caching, you could be waiting for your CI to finish for hours.

Now we have Turborepo, Bun, changesets, and a lot of other tools that make monorepos a lot better. Still, there is quite a bit of setup to do.
The biggest issue is that there are still a lot of options to configure web tooling. You need someone with a lot of experience to configure it all.
And LLM's without guidance also tend to choose less than optimal options. There is just not a lot of good examples out there.

We have created Monoplate to be a point of reference. Clone this repository and just start coding. As you go, learn what we did here. AGENTS.MD is provided, you can ask your AI to introduce you to the project.
