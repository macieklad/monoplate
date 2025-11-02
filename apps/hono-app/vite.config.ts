/// <reference types="vite/client" />
/// <reference types="vitest/config" />
import path from "node:path";
import honoViteDevServer from "@hono/vite-dev-server";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import {
  type BuildEnvironmentOptions,
  defineConfig,
  loadEnv,
  type Plugin,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const nodeEnvPlugin: Plugin = {
  name: "node-env-plugin",
  config(_, { mode }) {
    const variables = loadEnv(mode, process.cwd(), "");
    process.env.MODE = mode;
    Object.entries(variables).forEach(([key, value]) => {
      process.env[key] = value;
    });
  },
};

const ssrBuildConfig: BuildEnvironmentOptions = {
  ssr: true,
  outDir: "dist/server",
  ssrEmitAssets: true,
  copyPublicDir: false,
  emptyOutDir: true,
  rollupOptions: {
    input: {
      server: path.resolve(__dirname, "src/entry.server.tsx"),
      cli: path.resolve(__dirname, "src/entry.cli.tsx"),
    },
    output: {
      entryFileNames: "[name].js",
      chunkFileNames: "assets/[name]-[hash].js",
      assetFileNames: "assets/[name]-[hash][extname]",
    },
  },
};

const clientBuildConfig: BuildEnvironmentOptions = {
  outDir: "dist/public",
  emitAssets: true,
  copyPublicDir: true,
  emptyOutDir: true,
  rollupOptions: {
    input: {
      client: path.resolve(__dirname, "src/entry.client.tsx"),
    },
    output: {
      entryFileNames: "static/[name].js",
      chunkFileNames: "static/assets/[name]-[hash].js",
      assetFileNames: "static/assets/[name]-[hash][extname]",
    },
  },
};

export default defineConfig(({ isSsrBuild }) => {
  return {
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      include: ["tests/**/*.test.ts"],
    },
    build: isSsrBuild ? ssrBuildConfig : clientBuildConfig,
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "src/client/routes",
        generatedRouteTree: "src/client/routeTree.gen.ts",
      }),
      viteReact({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
      tsconfigPaths(),
      honoViteDevServer({
        entry: "src/server/app.ts",
      }),
      nodeEnvPlugin,
    ],
  };
});
