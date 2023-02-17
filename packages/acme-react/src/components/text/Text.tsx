import React, { forwardRef } from 'react';
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types';
import { cva, VariantProps } from "class-variance-authority";

const textStyles = cva(["border"], {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    align: "left"
  }
})

const TextDefaultElement = 'p';

export type UnstyledTextProps<
  T extends React.ElementType = typeof TextDefaultElement,
> = PolymorphicPropsWithRef<{}, T>;

export type TextOwnProps = VariantProps<typeof textStyles>;

export type TextProps<T extends React.ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithRef<TextOwnProps, T>;

export const UnstyledText: PolymorphicForwardRefExoticComponent<
  {},
  typeof TextDefaultElement
> = forwardRef(function Text<
  T extends React.ElementType = typeof TextDefaultElement,
>(
  { as, ...restProps }: PolymorphicPropsWithoutRef<TextOwnProps, T>,
  ref: React.ForwardedRef<Element>,
) {
  const Element: React.ElementType = as || TextDefaultElement;

  return <Element ref={ref} {...restProps} />;
});

export const Text: PolymorphicForwardRefExoticComponent<
  TextOwnProps,
  typeof TextDefaultElement
> = forwardRef(function Text<
  T extends React.ElementType = typeof TextDefaultElement,
>(
  {
    align,
    size,
    weight,
    className,
    ...restProps
  }: PolymorphicPropsWithoutRef<TextOwnProps, T>,
  ref: React.ForwardedRef<Element>,
) {
  return (
    <UnstyledText
      ref={ref}
      className={textStyles({ size, weight, align, className })}
      {...restProps}
    />
  );
});
