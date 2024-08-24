import { VariantProps } from 'tailwind-variants';
import { cardStyles } from './Card.styles';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export interface CardProps
  extends PropsWithChildren,
    VariantProps<typeof cardStyles> {
  className?: string;
}

export function Card(props: CardProps) {
  const { padding, rounded, className, children } = props;
  return (
    <div className={clsx(cardStyles({ padding, rounded }), className)}>
      {children}
    </div>
  );
}
