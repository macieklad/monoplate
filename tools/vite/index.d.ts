/// <reference types="vitest" />
import { UserConfigExport, UserConfig } from 'vite';

export declare function reactPackageViteConfig(config?: UserConfigExport): UserConfigExport
export declare function defineConfig(config: UserConfigExport[] | UserConfigExport): UserConfigExport
export declare function vitestPreset(config: UserConfig["test"]): UserConfig
