import { styled } from '@/config/theme';

export const MusicPlayerContainer = styled('section', {
  backgroundColor: '$surface-brand',
  color: '$text-brand-primary',
  '&>div': {
    maxWidth: '$screen-lg',
    width: '100%',
    marginX: '$auto',
    padding: '$s-4',
  },
});

export const StickyMusicControls = styled('div', {
  position: 'sticky',
  width: '$s-full',
  top: 0,
  zIndex: '$overlay',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const ControlsSection = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '&>:not(:first-child)': {
    marginLeft: '$s-1',
  },
});
