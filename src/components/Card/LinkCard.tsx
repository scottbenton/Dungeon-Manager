import { VariantProps } from 'tailwind-variants';
import { cardStyles } from './Card.styles';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export interface LinkCardProps
  extends PropsWithChildren,
    VariantProps<typeof cardStyles> {
  className?: string;
  to: string;
}

export function LinkCard(props: LinkCardProps) {
  const { to, padding, rounded, className, children } = props;
  return (
    <Link
      to={to}
      className={clsx(
        cardStyles({ padding, rounded }),
        'cursor-pointer hover:bg-gray-100 dark:bg-gray-700 focus:scale-105 transition-transform transform duration-300 ease-in-out',
        className,
      )}
    >
      {children}
    </Link>
  );
}
