import { tv } from 'tailwind-variants';

export const inputStyles = tv({
  slots: {
    inputGroup:
      'border dark:border-gray-600 rounded-lg flex items-center mt-1 text-gray-800 dark:text-white transition-colors duration-150 ease-in-out bg-white dark:bg-gray-800',
    input:
      'bg-transparent flex-grow text-base px-3 py-3 focus:outline-none autofill:bg-transparent autofill:filter-none autofill:shadow-none',
    helperText: 'block first-letter:uppercase',
    inputButton:
      'text-gray-500 dark:text-gray-400 p-2 flex items-center justify-center mr-1 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-colors ease-in-out duration-150',
  },
  variants: {
    error: {
      true: {
        inputGroup: 'border-red-500',
      },
      false: { inputGroup: 'border-neutral' },
    },
    focused: {
      true: { inputGroup: 'border-primary-600' },
      false: { inputGroup: 'border-neutral' },
    },
  },
  compoundVariants: [
    {
      error: true,
      focused: true,
      css: {
        inputGroup: 'border-red-600',
      },
    },
  ],
  defaultVariants: {
    error: false,
    focused: false,
  },
});
