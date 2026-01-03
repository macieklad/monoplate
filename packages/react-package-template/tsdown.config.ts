import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.tsx",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  platform: "neutral",
  skipNodeModulesBundle: true,
});
