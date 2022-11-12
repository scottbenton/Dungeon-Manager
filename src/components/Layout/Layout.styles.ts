import { styled } from '@/config/theme';

export const Page = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '$surface-background',
  color: '$text-gray-primary',
});

export const PageContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  position: 'relative',
  variants: {
    fullscreen: {
      false: {
        maxWidth: '$screen-lg',
        width: '100%',
        marginX: '$auto',
        padding: '$s-4',
      },
    },
    centerContent: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    direction: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
    },
  },

  defaultVariants: {
    fullscreen: false,
    centerContent: true,
    direction: 'column',
  },
});
