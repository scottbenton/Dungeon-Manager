import { styled } from '@/config/theme';

export const YoutubeWrapper = styled('div', {
  marginTop: '$s-4',
  '&>div': {
    aspectRatio: 16 / 9,
    maxWidth: '$s-96',
    marginX: 'auto',
  },
});
