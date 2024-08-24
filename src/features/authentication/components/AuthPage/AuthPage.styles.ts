import { tv } from 'tailwind-variants';

export const featureStyles = tv({
  slots: {
    feature: 'flex w-full max-w-sm mt-4',
    featureIcon:
      'flex items-center justify-center w-20 h-20 mr-6 bg-primary-700 text-white flex-shrink-0 p-5 rounded-xl',
  },
});

export const authPageStyles = tv({
  slots: {
    page: 'flex flex-grow bg-gradient-to-b from-primary-900 to-primary-700',
    sidebar: 'flex-grow p-6',
    logo: 'flex items-center w-10 mr-4',
    featureInfoSection:
      'flex flex-grow flex-col pt-24 pb-48 items-center justify-between',
    feature: 'flex w-full max-w-sm mt-4',
    featureIcon:
      'flex items-center justify-center w-20 h-20 mr-6 bg-primary-700 text-white flex-shrink-0 p-5 rounded-xl',
    card: 'flex flex-col',
  },
  variants: {
    sidebarVisible: {
      true: {
        page: 'items-stretch',
        sidebar: 'flex flex-col',
      },
      false: {
        page: 'items-center',
        sidebar: 'hidden',
      },
    },
  },
  defaultVariants: {
    sidebarVisible: false,
  },
});
