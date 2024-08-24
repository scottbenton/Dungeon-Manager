import { tv } from 'tailwind-variants';

export const avatarStyles = tv({
  slots: {
    base: 'w-10 h-10 flex items-center justify-center overflow-hidden text-base font-semibold rounded-full bg-primary-200 dark:bg-primary-900 text-primary-700 dark:text-white',
    fallback:
      'w-full h-full flex items-center justify-center bg-gray-500 text-white',
    fallbackSvg: 'w-5',
  },
});
