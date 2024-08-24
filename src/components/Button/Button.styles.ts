import { tv } from 'tailwind-variants';

export const buttonClasses = tv({
  slots: {
    base: 'flex items-center font-semibold transition-colors duration-150 ease-in-out focus:ring-4 ring-primary-500',
    label: 'relative',
    startIcon: '',
    endIcon: '',
  },
  variants: {
    size: {
      sm: {
        base: 'px-2 py-1 text-sm',
        startIcon: 'mr-1',
        endIcon: 'ml-1',
      },
      md: {
        base: 'px-4 py-2 text-base',
        startIcon: 'mr-2',
        endIcon: 'ml-2',
      },
      lg: {
        base: 'px-6 py-3 text-lg',
        startIcon: 'mr-3',
        endIcon: 'ml-3',
      },
    },

    color: {
      primary: 'primary-color',
      neutral: 'neutral-color',
      error: 'error-color',
      success: 'success-color',
    },
    variant: {
      primary: 'disabled:bg-gray-200 disabled:text-gray-500 primary-variant',
      secondary:
        'disabled:bg-gray-200 disabled:text-gray-500 secondary-variant',
      tertiary:
        'disabled:text-gray-600 disabled:dark:text-gray-400 tertiary-variant',
    },
    rounded: {
      true: 'rounded-full',
      false: 'rounded-xl',
    },
  },
  defaultVariants: {
    color: 'neutral',
    variant: 'tertiary',
    size: 'md',
    rounded: false,
  },
  compoundVariants: [
    {
      variant: 'primary',
      color: 'primary',
      class: {
        base: 'bg-primary-700 text-white hover:bg-primary-800',
      },
    },
    {
      variant: 'primary',
      color: 'neutral',
      class: {
        base: 'bg-gray-700 text-white hover:bg-gray-800 ',
      },
    },
    {
      variant: 'primary',
      color: 'error',
      class: {
        base: 'bg-red-700 text-white hover:bg-red-800 ',
      },
    },
    {
      variant: 'primary',
      color: 'success',
      class: {
        base: 'bg-green-700 text-white hover:bg-green-800 ',
      },
    },
    {
      variant: 'secondary',
      color: 'primary',
      class: {
        base: 'bg-primary-200 text-primary-800 hover:bg-primary-300 ',
      },
    },
    {
      variant: 'secondary',
      color: 'neutral',
      class: {
        base: 'bg-gray-200 text-gray-800 hover:bg-gray-300 ',
      },
    },
    {
      variant: 'secondary',
      color: 'error',
      class: {
        base: 'bg-red-200 text-red-800 hover:bg-red-300 ',
      },
    },
    {
      variant: 'secondary',
      color: 'success',
      class: {
        base: 'bg-green-200 text-green-800 hover:bg-green-300 ',
      },
    },
    {
      variant: 'tertiary',
      color: 'primary',
      class: {
        base: 'bg-gray-500/0 hover:bg-gray-500/20 text-primary-800 dark:text-primary-200',
      },
    },
    {
      variant: 'tertiary',
      color: 'neutral',
      class: {
        base: 'bg-gray-500/0 hover:bg-gray-500/20 text-gray-800 dark:text-white',
      },
    },
    {
      variant: 'tertiary',
      color: 'error',
      class: {
        base: 'bg-gray-500/0 hover:bg-gray-500/20 text-red-800 dark:text-red-200',
      },
    },
    {
      variant: 'tertiary',
      color: 'success',
      class: {
        base: 'bg-gray-500/0 hover:bg-gray-500/20 text-green-800 dark:text-green-200',
      },
    },
  ],
});

export const iconButtonClasses = tv({
  base: 'flex items-center rounded-full transition-colors duration-150 ease-in-out p-2 text-gray-700 dark:text-gray-200 focus:ring-4 ring-primary-500 bg-gray-500/0 hover:bg-gray-500/20',
});
