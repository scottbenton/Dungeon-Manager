import { styled } from '@/config/theme';

export const Card = styled('div', {
  backgroundColor: '$surface-foreground',
  borderWidth: '$1',
  borderRadius: '$xl',
  color: '$text-gray-primary',
  overflow: 'hidden',
  // boxShadow: '$md',

  variants: {
    padding: {
      true: {
        padding: '$s-4',
      },
      false: {
        padding: 0,
      },
    },
  },

  defaultVariants: {
    padding: true,
  },
});
