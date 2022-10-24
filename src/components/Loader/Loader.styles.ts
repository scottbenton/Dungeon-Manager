import { styled } from '@/config/theme';
import { keyframes } from '@stitches/react';

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const Loader = styled('div', {
  borderRadius: '$full',
  borderTopWidth: '$1',
  borderRightWidth: '$1',
  borderColor: 'CurrentColor',
  width: '$s-5',
  height: '$s-5',

  animation: `${spin} 1s linear infinite`,
});
