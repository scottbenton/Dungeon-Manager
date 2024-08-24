import { tv } from 'tailwind-variants';

export const fileDropzoneClasses = tv({
  slots: {
    dropzone:
      'px-4 py-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer mt-1',
    icon: 'mb-3 rounded-xl bg-primary-200 text-primary-500 p-3 flex',
    textBold: 'font-semibold text-primary-700 dark:text-primary-400',
    text: 'text-gray-700 dark:text-gray-200',
  },
  variants: {
    isDragActive: {
      true: {
        dropzone: 'border-primary-500 bg-primary-200',
        text: 'text-primary-800 dark:text-primary-200',
      },
      false: {
        dropzone:
          'border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800',
      },
    },
  },
});
