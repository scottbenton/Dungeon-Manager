import { tv } from 'tailwind-variants';

export const emptyStateClasses = tv({
  slots: {
    container: 'relative px-2 py-4 flex items-center justify-center h-72 my-8',
    icon: 'absolute text-primary-100 dark:text-primary-900/50',
    contents: 'flex items-center justify-center flex-col relative z-10',
    actions: 'mt-4',
  },
});
