import { tv } from 'tailwind-variants';

export const dialogClasses = tv({
  slots: {
    overlay: 'bg-gray-950/20 fixed inset-0 z-50',
    content:
      'max-w-lg w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl z-[51]',
    header: 'flex items-center justify-between',
  },
});
