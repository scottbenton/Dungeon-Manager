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

  '&>:not(span.icon)': {
    position: 'relative',
    zIndex: '$10',
  },
  '&>span.icon': {
    position: 'absolute',
    color: '$brand-100',
    [`.${darkTheme} &`]: {
      color: '$brand-900',
      opacity: 0.5,
    },
  },
  '&>button, &>a': {
    marginTop: '$s-4',
  },
});
