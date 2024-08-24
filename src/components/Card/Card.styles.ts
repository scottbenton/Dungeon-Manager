import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  base: 'bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-800 overflow-hidden',
  variants: {
    padding: {
      true: 'p-4',
      false: '',
    },
    rounded: {
      true: 'rounded-xl',
      false: 'rounded-none',
    },
  },
  defaultVariants: {
    padding: true,
    rounded: true,
  },
});
