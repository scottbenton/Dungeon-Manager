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

  variants: {
    isMobile: {
      true: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        '&>:not(:first-child)': {
          marginTop: '$s-4',
        },
      },
      false: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&>:not(:first-child)': {
          marginTop: 0,
        },
      },
    },
  },
});

export const LabelsSection = styled('div', {
  alignSelf: 'flex-start',
});

export const ControlsSection = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '&>:not(:first-child)': {
    marginLeft: '$s-1',
  },
});

export const ControlsStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '&>:not(:first-child)': {
    marginTop: '$s-2',
  },

  variants: {
    isMobile: {
      true: {
        alignItems: 'center',
      },
      false: {
        alignItems: 'flex-end',
      },
    },
  },
});

export const SpotifyPlayingText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '&>div': {
    display: 'flex',
    alignItems: 'center',
    '&>img': {
      marginRight: '$s-4',
      width: 32,
      height: 32,
    },
  },
});
