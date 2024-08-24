import { tv } from 'tailwind-variants';

export const headerStyles = tv({
  slots: {
    surface: 'w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white',
    container: 'max-w-screen-lg w-full mx-auto flex items-center px-4',
    logoContainer: 'flex items-center py-1',
    logo: 'h-10 w-10',
    appName:
      'font-title font-black text-xl text-primary-700 dark:text-white ml-2',
    navigation: 'flex flex-grow ml-8',
    navLink:
      'px-3 py-2 flex items-center text-gray-500 dark:text-gray-400 transition-colors duration-150 ease-in-out hover:text-primary-700 dark:hover:text-primary-200',
  },
});
