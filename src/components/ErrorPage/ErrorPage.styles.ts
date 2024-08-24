import { tv } from 'tailwind-variants';

export const errorPageStyles = tv({
  slots: {
    container:
      'max-w-md w-full px-4 flex items-center justify-center flex-col text-center',
    title:
      'flex items-center justify-center text-primary-900 dark:text-primary-100 font-black text-6xl whitespace-nowrap',
    icon: 'mr-4 text-primary-500',
    message: 'text-gray-700 dark:text-gray-200 mt-4',
    callToAction: 'mt-6',
  },
});
