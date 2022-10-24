import { darkTheme, styled } from '@/config/theme';

export const EmptyStateContainer = styled('div', {
  paddingX: '$s-2',
  paddingY: '$s-4',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '$s-72',
  marginY: '$s-8',

  '&>h2': {
    position: 'relative',
    zIndex: 20,
  },
  '&>svg': {
    width: '$s-64',
    position: 'absolute',
    color: '$brand-100',
    [`.${darkTheme} &`]: {
      color: '$brand-900',
      opacity: 0.5,
    },
  },
});
