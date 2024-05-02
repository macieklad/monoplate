import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss/types/config.js';

export type { Config } from 'tailwindcss/types/config.js';

export function config(tailwindConfig: Config) {
  return withTV(tailwindConfig);
}
