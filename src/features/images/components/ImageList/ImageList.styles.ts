import { Card } from '@/components/Card';
import { styled } from '@/config/theme';

// "gap-5 mt-5"}
export const ImageGrid = styled('div', {
  display: 'grid',
  gap: '$s-5',
  marginTop: '$s-5',

  variants: {
    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      },
      2: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      3: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
    },
  },

  defaultVariants: {
    columns: 1,
  },
});
