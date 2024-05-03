import path from 'node:path';
import preset from '@acme/tailwind/preset';
import { config as tailwindConfig, type Config } from '@acme/tailwind/config';

export function resolveComponentsContent() {
  // When this file will be built, the resolve function
  // will be executed from the dist folder
  return [path.resolve(__dirname, './**/*.{ts,tsx,js,jsx}')];
}

export function config({ presets, content, ...options }: Config) {
  let finalContent: Config['content'] = [...resolveComponentsContent()];

  // content can be an array of files, otherwise it's a special object
  // with files array - https://tailwindcss.com/docs/content-configuration#transforming-source-files
  if (Array.isArray(content)) {
    finalContent = [...finalContent, ...content];
  } else {
    finalContent = {
      relative: content.relative,
      files: [...finalContent, ...content.files],
      extract: content.extract,
      transform: content.transform,
    };
  }

  return tailwindConfig({
    ...options,
    content: finalContent,
    presets: [preset, ...(presets || [])],
  });
}
