import { styled } from '@/config/theme';

export const CardGrid = styled('div', {
  display: 'grid',
  gap: '$s-5',
  marginTop: '$s-2',

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

export const MusicCardFooter = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&>img': {
    width: '$s-8',
  },
  marginTop: '$s-4',
});
