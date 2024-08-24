import { tv } from 'tailwind-variants';

export const alertClasses = tv({
  slots: {
    base: 'rounded-xl p-4',
    text: '',
  },
  variants: {
    variant: {
      info: {
        base: 'bg-blue-100 text-blue-700 border border-blue-300',
        text: 'text-blue-600',
      },
      success: {
        base: 'bg-green-100 text-green-700 border-green-300',
        text: 'text-green-600',
      },
      warning: {
        base: 'bg-amber-100 text-amber-700 border-amber-300',
        text: 'text-amber-600',
      },
      error: {
        base: 'bg-red-100 text-red-700 border-red-300',
        text: 'text-red-600',
      },
    },
  },
});
