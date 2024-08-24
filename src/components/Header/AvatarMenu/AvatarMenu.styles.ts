import { tv } from 'tailwind-variants';

export const avatarStyles = tv({
  slots: {
    avatar:
      'rounded-full border-2 border-transparent hover:bg-primary-400 dark:hover:bg-primary-600 dark:bg-gray-800 focus:outline-none focus:border-primary-500 transition-colors duration-150 ease-in-out',
    menuContent:
      'rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 mr-3 z-40 py-2',
    menuItem:
      'p-2 flex items-center w-full text-sm text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none focus:bg-gray-200 focus:dark:bg-gray-900',
    menuItemIcon: 'w-5 text-gray-500 dark:text-gray-400 mr-2',
  },
});
