import { styled } from '@/config/theme';
import IonIcon from '@reacticons/ionicons';

export const StyledIcon = styled(IonIcon, {
  display: 'flex !important',
  variants: {
    size: {
      md: {
        width: '20px !important',
        height: '20px !important',
      },
      lg: {
        width: '24px !important',
        height: '24px !important',
      },
      background: {
        width: '$s-64 !important',
        height: '$s-64 !important',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
