import { tv } from 'tailwind-variants';

export const pageStyles = tv({
  slots: {
    root: 'min-h-lvh w-full',
    page: 'flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-text-gray-primary',
    pageContent: 'flex flex-col flex-grow relative',
  },
  variants: {
    fullscreen: {
      true: {
        pageContent: '',
      },
      false: {
        pageContent: 'max-w-screen-lg mx-auto w-full p-4',
      },
    },
    centerContent: {
      true: {
        pageContent: 'items-center justify-center',
      },
      false: {},
    },
    direction: {
      row: {
        pageContent: 'flex-row',
      },
      column: {
        pageContent: 'flex-col',
      },
    },
  },
  defaultVariants: {
    fullscreen: false,
    centerContent: false,
    direction: 'column',
  },
});
