import { tv } from 'tailwind-variants';

export const imageCardStyles = tv({
  slots: {
    card: 'flex flex-col transition-shadow duration-150 ease-in-out',
  },
  variants: {
    hovering: {
      true: { card: 'shadow-md' },
      false: { card: 'shadow-none' },
    },
    selected: {
      true: { card: 'border-primary-500 shadow-md shadow-primary-500' },
      false: { card: 'border-gray-400 dark:border-gray-600 shadow-none' },
    },
  },
  defaultVariants: {
    selected: false,
    hovering: false,
  },
});
