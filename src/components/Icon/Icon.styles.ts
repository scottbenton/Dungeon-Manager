import { styled } from '@/config/theme';

export const StyledMaterialIcon = styled('span', {
  $$weight: 400,
  $$grade: 0,

  variants: {
    filled: {
      true: {
        $$fill: 1,
      },
      false: {
        $$fill: 0,
      },
    },
    size: {
      sm: {
        $$size: 20,
        $$fontSize: '20px',
      },
      md: {
        $$size: 24,
        $$fontSize: '24px',
      },
      lg: {
        $$size: 40,
        $$fontSize: '40px',
      },
      xl: {
        $$size: 48,
        $$fontSize: '48px',
      },
      background: {
        $$size: 256,
        $$fontSize: '256px',
      },
    },
  },
  defaultVariants: {
    filled: false,
    size: 'md',
  },

  '&.mui-icon': {
    fontVariationSettings:
      '"FILL" $$fill, "wght" $$weight, "GRAD" $$grade, "opsz" $$size',
    fontSize: '$$fontSize !important',
  },
  // width: '$$size',
  // height: '$$size',
});
