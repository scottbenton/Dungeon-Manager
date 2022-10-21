import { styled } from '@/config/theme';

export const ViewerLinkContainer = styled('div', {
  display: 'flex',
  '&>a': {
    display: 'flex',
    alignItems: 'center',
    color: '$text-brand-secondary',
    '&>svg': {
      color: '$text-brand-tertiary',
      width: '$s-5',
      marginLeft: '$s-2',
    },
  },
});
