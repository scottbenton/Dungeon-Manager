import { styled } from '@stitches/react';

export const VolumeControlContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const VolumeControlInput = styled('input', {
  height: '$s-1',
  '-webkit-appearance': 'none',
  backgroundColor: '$text-brand-tertiary',
  borderRadius: '$full',
  outline: 'none',

  '&::-webkit-slider-thumb': {
    '-webkit-appearance': 'none',
    appearance: 'none',
    width: '$s-4',
    height: '$s-4',
    borderRadius: '$full',
    border: 0,
    backgroundColor: '$text-brand-primary',
    cursor: 'pointer',
  },

  '&::-moz-range-thumb': {
    width: '$s-4',
    height: '$s-4',
    borderRadius: '$full',
    border: 0,
    background: '$colors$text-brand-primary',
    cursor: 'pointer',
  },
});
