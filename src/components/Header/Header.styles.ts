import { tv } from 'tailwind-variants';

export const headerStyles = tv({
  slots: {
    surface: 'w-full bg-primary-800 text-white py-1',
    container:
      'max-w-screen-lg w-full mx-auto flex items-center justify-between px-4',
    appName: 'font-title font-black text-2xl dark:text-white ml-2',
    navigation: 'flex flex-grow ml-8',
    navLink:
      'px-3 py-2 flex items-center text-gray-500 dark:text-gray-400 transition-colors duration-150 ease-in-out hover:text-primary-700 dark:hover:text-primary-200',
  },
});
