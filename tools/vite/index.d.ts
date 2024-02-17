/// <reference types="vitest" />
import type { UserConfigExport, UserConfig } from 'vite';

export declare function reactPackageViteConfig(config?: UserConfigExport): UserConfigExport
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- ts recursion
export declare function defineConfig(config: UserConfigExport[] | UserConfigExport): UserConfigExport
export declare function vitestPreset(config: UserConfig["test"]): UserConfig
