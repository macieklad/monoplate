import type { UserConfig } from 'vitest';

export declare function reactPackageViteConfig(config?: UserConfig): UserConfig;
export declare function defineConfig(
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- we want explicit types here even if they converge into any
  config: UserConfig | UserConfig[],
): UserConfig;
export declare function vitestPreset(config: UserConfig['test']): UserConfig;
