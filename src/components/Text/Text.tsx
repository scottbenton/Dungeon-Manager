import React from 'react';
import { VariantProps } from 'tailwind-variants';
import { textStyles } from './Text.styles';
import clsx from 'clsx';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
type TextProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  VariantProps<typeof textStyles> & {
    className?: string;
  }
>;

/**
 * This is the type used in the type annotation for the component
 */
type TextComponent = <C extends React.ElementType = 'p'>(
  props: TextProps<C>,
) => React.ReactElement | React.ReactNode | null | undefined;

export const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'p'>(
    {
      as,
      children,
      className,
      variant,
      textColor,
      textAlign,
      ...props
    }: TextProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'p';

    return (
      <Component
        className={clsx(
          className,
          textStyles({ variant, textColor, textAlign }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
