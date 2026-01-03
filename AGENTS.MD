# AGENTS.MD: Guide for AI Coding Agents

## Project Overview

**Monoplate** is an opinionated JavaScript/TypeScript monorepo template emphasizing best practices and modern tooling.

### Directory Structure

```
monoplate/
├── apps/                    # Applications (private, not published)
│   └── tanstack-app/       # Example full-stack app (TanStack Router + Query)
├── packages/               # Reusable packages (can be published)
│   ├── ui/                # React UI component library with Tailwind
│   └── react-package-template/  # Template for new React packages
├── tools/                  # Build/dev tooling (if any)
├── .github/
│   ├── workflows/         # CI/CD pipelines
│   └── actions/           # Custom GitHub Actions
├── .changeset/            # Changesets for versioning
├── .husky/                # Git hooks
├── biome.json            # Linting/formatting config
├── turbo.json            # Turborepo task orchestration
├── syncpack.config.cjs   # Dependency version management
└── package.json          # Root workspace config
```

## First steps after cloning

- ask user to proceed with replacing all `@acme` identifiers with their organization
- ask users if they need example apps or libraries in the repository, remove them if not. Also ask if they want to use react.
  If not, ask for replacement. If there should be none, remove all apps with react, adjust all types and configurations to not include react related
  code - jsx transforms, plugins, etc.
- ui package may need storybook integration. If asked to create it, setup vitest browser tests for it too

## Tech Stack Quick Reference

| Tool            | Purpose                                   | Key Config                         |
| --------------- | ----------------------------------------- | ---------------------------------- |
| **Bun**         | Package manager & runtime                 | `"packageManager": "bun@1.3.5"`    |
| **Turborepo**   | Task orchestration & caching              | `turbo.json`                       |
| **Biome**       | Linting + formatting (no ESLint/Prettier) | `biome.json`                       |
| **tsdown**      | Library bundling (not tsc/vite)           | `packages/*/tsdown.config.ts`      |
| **Vitest**      | Unit testing                              | `vitest.config.ts` in packages     |
| **Tailwind v4** | CSS-first styling (apps only)             | Direct CSS imports, no config file |
| **Changesets**  | Version management & releases             | `.changeset/` directory            |
| **Syncpack**    | Dependency version enforcement            | `syncpack.config.cjs`              |
| **Husky**       | Git hooks                                 | `.husky/pre-commit`                |
| **Vite**        | Web tooling for apps                      | Apps use Vite directly             |

## Package Structure

### Workspace Protocol (`workspace:*`)

Internal dependencies use the workspace protocol. **Never replace with npm versions:**

```json
{
  "dependencies": {
    "@acme/ui": "workspace:*"
  }
}
```

Syncpack enforces this pattern. The `workspace:*` protocol means:

- Resolved at link time to local package
- Enables rapid iteration without publishing
- Must be maintained consistently

### App vs Package Distinction

**Apps** (in `/apps`):

- Private packages (`"private": true`)
- Not published to npm
- Can have full application dependencies
- Examples: tanstack-app

**Packages** (in `/packages`):

- Publishable libraries
- Minimal, focused dependencies
- Declare peer dependencies for shared libs
- Use `workspace:*` for internal deps
- Build with tsdown

## Naming Convention

Organization name: `@acme`

```bash
# Find all
grep -r "@acme" .

# Replace (varies by editor/tool)
```

## Build System

### Turborepo Task Definitions

All tasks defined in `turbo.json`. Common tasks:

```bash
bun run build              # Build all packages
bun run build:ecosystem    # Build only packages/ and tools/
bun run test              # Run all tests
bun run lint              # Lint all code
bun run dev --filter=APP_NAME...   # Dev mode for app + dependencies
bun run dev               # Dev all (rarely what you want)
```

### Task Dependencies

Turborepo defines relationships:

```json
{
  "tasks": {
    "build": {
      "outputs": ["build/**", "dist/**"],
      "dependsOn": ["^build"] // Run deps first
    }
  }
}
```

The `^` prefix means "dependencies must build first."

### Package Build Configuration (tsdown)

Libraries use `tsdown` for bundling. Example from `@acme/ui`:

```typescript
// tsdown.config.ts
export default defineConfig({
  entry: {
    index: "src/index.tsx",
    tailwind: "src/tailwind.ts", // Sub-entry point
  },
  format: ["esm"],
  dts: true,
  skipNodeModulesBundle: true,
});
```

**Key tsdown patterns:**

- `skipNodeModulesBundle: true`: Do not bundle node_modules
- `format: ['esm']`: Only ESM output (no CommonJS)
- `dts: true`: Generate TypeScript definitions
- `entry`: Multiple entry points supported

## Code Quality & Formatting

### Biome (Linting + Formatting)

Single tool replaces ESLint + Prettier:

```bash
bun run format              # Format all code
bun run lint               # Lint all code
biome lint . --fix         # Fix issues
biome format --write .     # Format
```

**Configuration** (`biome.json`):

- Single quotes (JavaScript)
- Tab indentation
- Tailwind CSS directive support enabled
- VCS integration enabled

No special ESLint configs. Biome's recommended rules apply to all packages.

**Pre-commit**: Husky runs Biome via lint-staged before commits.

## Testing

### Unit Tests (Vitest)

```bash
bun run test              # Run all tests
bun run test:affected     # Only affected packages
```

**Test patterns:**

- Files: `src/**/*.test.{ts,tsx}`
- Framework: Vitest with happy-dom for components
- Location: Test files colocated with source

Example test in `@acme/ui`:

```typescript
// src/Button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```bash
bun run --filter tanstack-app test:playwright
```

Config: `playwright.config.ts` in apps using Playwright.

## Dependency Management

### Syncpack

Enforces consistent dependency versions across packages. Rules:

1. **Local packages** → `workspace:*` protocol
2. **TypeScript/Vite** → Tilde ranges (`~5.9.3`)
3. **All others** → Caret ranges (`^19.2.0`)
4. **All versions of same dep** → Must match

**Commands:**

```bash
bun run sync               # Fix all mismatches
bun run sync:list-mismatches  # See violations
```

**Never ignore warnings.** Mismatched versions cause silent bugs.

## Adding New Content

### Adding a New Package

Copy the `react/node-package-template` package and rename it to your new package name.

### Adding Dependencies to Existing Package

```bash
# From package directory
bun add <package>

# Root will auto-deduplicate and sync with syncpack
bun run sync  # Run at root to fix versions
```

**Rules:**

- Always use `workspace:*` for local packages
- Check Syncpack doesn't flag version conflicts
- External modules in tsdown's `external` array
- DON'T MODIFY SYNPACK CONFIG UNLESS PERMISSION IS GRANTED

### Updating Tailwind (Apps Only)

Tailwind v4 is CSS-first:

```typescript
// vite.config.ts
import { tailwindPlugin } from "@tailwindcss/vite";

export default {
  plugins: [tailwindPlugin()],
};
```

```css
/* styles.css */
@import "tailwindcss";
```

No `tailwind.config.js` needed. Configuration is in CSS.

## CI/CD & Versioning

### GitHub Workflows

Located in `.github/workflows/`:

| Workflow         | Trigger         | Action                      |
| ---------------- | --------------- | --------------------------- |
| `lint.yml`       | Push (non-main) | Run `bun run lint:affected` |
| `test.yml`       | Push (non-main) | Run `bun run test:affected` |
| `changesets.yml` | Push to `main`  | Publish packages            |

**Caching**: All workflows use Turborepo + GitHub Actions caching.

### Releases via Changesets

```bash
# From development branch
bun run changeset        # Create changeset file
# Edit .changeset/XXX.md with change description

# On main branch
bun run version-packages # Update package.json versions
bun run release          # Publish to npm
```

Changesets handles:

- Version bumping (patch/minor/major)
- Changelog generation
- Publishing to registry
- GitHub release creation

**Apps with `"private": true`** are not published but still versioned.

## Important Patterns & Gotchas

### React Versions

Multiple React instances cause problems. Solutions:

1. **In packages**: Declare React as peer dependency
2. **In tsdown**: Add React to `external` array
3. **In apps**: Import React once at root, share via Context/Provider
4. **Check**: `node_modules` should have one React version

### Node and Bun

Bun is used as a package manger. Node is used as a runtime

- If user asks to use bun as a runtime, vitest has limited support for it. Check
  https://github.com/oven-sh/bun/issues/4145 to see what adjustments are needed.
  Otherwise everything should work fine.

### Module Resolution

- `workspace:*` resolves from monorepo (symlinked)
- External imports pull from `node_modules`
- Vite path aliases: Use `vite-tsconfig-paths` plugin (see tanstack-app)

### TypeScript Configuration

Packages include:

- `@tsconfig/vite-react` for React packages
- `tsconfig.json` at package root
- Shared `@total-typescript/ts-reset` at monorepo root

## Common Commands Reference

```bash
# Development
bun install                                    # Install dependencies
bun run build:ecosystem                        # Build packages
bun run dev --filter tanstack-app...          # Dev app + its deps
bun run format                                 # Format all code
bun run lint                                   # Lint all

# Testing
bun run test                                   # Test all
bun run test:affected                          # Test changed packages
bun run --filter tanstack-app test:playwright  # E2E tests

# Publishing
bun run changeset                              # Create changeset
bun run version-packages                       # Version bumps
bun run release                                # Build & publish

# Maintenance
bun run sync                                   # Fix dependency versions
bun run sync:list-mismatches                   # Show violations
bun run clean                                  # Full clean (deletes node_modules)
turbo run TASK --affected                      # Run task on changed packages
```

## File Locations for Configuration

- **Linting/Formatting**: `biome.json` (root)
- **Task Orchestration**: `turbo.json` (root)
- **Dependency Versions**: `syncpack.config.cjs` (root)
- **Package Config**: `package.json` (root + each package)
- **TypeScript**: `tsconfig.json` (root + each package)
- **Build Config (packages)**: `tsdown.config.ts` (each package)
- **Build Config (apps)**: `vite.config.ts` (each app)
- **Test Config**: `vitest.config.ts` (packages with tests)
- **Git Hooks**: `.husky/pre-commit` (root)

## When Modifying Code

**Before Committing:**

1. Run `bun run format` (fixes all code style)
2. Run `bun run lint` (checks for issues)
3. Run `bun run test` (or `test:affected` for speed)
4. Run `bun run sync` (fixes dependency versions)

**Husky pre-commit hook** runs Biome checks automatically, but manually running above saves time.

**If build fails:**

- Check `turbo.json` dependencies
- Verify `external` array in `tsdown.config.ts`
- Run `bun install` to resync node_modules

## Notes for AI Agents

- **Package interdependencies**: Use `workspace:*`, never manual versions
- **React imports**: Always declared as external, never bundled
- **CSS in v4 Tailwind**: Use CSS imports, not config files
- **TypeScript**: Strict mode enabled, use full types
- **Testing**: Unit tests required for packages, colocate with source
- **Naming**: All packages prefixed `@acme/` (update when cloning)
- **Breaking changes**: Use changeset with `major` version for BC breaks
- **Private packages**: Apps marked `"private": true`, not published
- **Deployment**: Custom workflows for app deployment via `trigger-workflow-for-changeset-release`
