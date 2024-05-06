# 💨 @acme/tailwind

This package contains base setup of tailwindcss for all other projects in the monorepo.

## Installation

```shell
pnpm install @acme/tailwind
```

## Contents

When using tailwind, you want to share:

- Your base preset with design tokens
- Additional plugin and tool configuration
- Js and css utilities

[Tailwind Variants](https://www.tailwind-variants.org/) comes with most of the tools you need to work with tailwind in JS, so we use it as a base for our setup.

There are three exports in the package that you can use:

- config - exports the config function that you can call in your project's tailwind.config file, making sure that all the plugins and tools are set up correctly
- index - it exports everything from tailwind variants, so that you don't have to import things from two places, but you can also add your own utilities here
- preset - this is the place where your base theme resides. You can add your own design tokens here. It is separated from the config wrapper so that you can use it according to the [tailwind preset docs](https://tailwindcss.com/docs/presets) (gets you autocompletion goodies in some cases)

## Usage

In your project's `tailwind.config` file, your final setup should look like this:

```ts
import acmePreset from '@acme/tailwind/preset';
import { config } from '@acme/tailwind/config';

export default config({
  content: ['./your_code_path/**/*.{ts,tsx,js,jsx}'],
  presets: [acmePreset],
});
```

This configuration is abstracted away further in the `@acme/components` package, so if you create your own component library, it will look even simpler.

Then in your project, you can use this package as you would use the Tailwind Variants:

```tsx
import { tv } from '@acme/tailwind';

const component = tv({
    base: 'px-5 py-2 ',
    variants: {
        variant: {
            primary: 'bg-blue-600 hover:bg-blue-700',
            secondary:
                'bg-gray-100 hover:bg-gray-200'
        isDisabled: {
            true: 'bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

interface YourComponentProps extends VariantProps<typeof button> {
}

export function Component(props: YourComponentProps) {
    return (
        <div
            {...props}
            className={component(props)}
        />
    );
}
```
