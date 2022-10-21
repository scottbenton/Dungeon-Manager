import { styled } from '@/config/theme';

export const StyledAlert = styled('div', {
  borderRadius: '$xl',
  padding: '$s-4',

  variants: {
    variant: {
      info: {
        backgroundColor: '$surface-info',
        color: '$text-info-primary',
        '&>p': {
          color: '$text-info-secondary',
        },
      },
      success: {
        backgroundColor: '$surface-success',
        color: '$text-success-primary',
        '&>p': {
          color: '$text-success-secondary',
        },
      },
      warning: {
        backgroundColor: '$surface-warning',
        color: '$text-warning-primary',
        '&>p': {
          color: '$text-warning-secondary',
        },
      },
      error: {
        backgroundColor: '$surface-error',
        color: '$text-error-primary',
        '&>p': {
          color: '$text-error-secondary',
        },
      },
    },
  },
});
