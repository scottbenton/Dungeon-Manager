import { darkTheme, styled } from '@/config/theme';

export const StyledMusicControl = styled('button', {
  display: 'flex',
  padding: '$s-2',
  borderRadius: '$full',
  position: 'relative',

  transitionProperty: '$transitions$transition-color',
  transitionDuration: '$transitions$duration-150',
  transitionTimingFunction: '$transitions$ease-in-out',

  color: '$text-brand-secondary',

  "&[aria-pressed='true']": {
    color: '$text-brand-primary',
    [`.${darkTheme} &`]: {
      color: '$white',
    },
  },
  "&[aria-pressed='true']::after": {
    content: '',
    width: '$s-1',
    height: '$s-1',
    borderRadius: '$full',
    backgroundColor: '$text-brand-primary',
    [`.${darkTheme} &`]: {
      backgroundColor: '$white',
    },

    position: 'absolute',
    left: '50%',
    bottom: 2,
    transform: 'translate(-50%, -50%)',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    color: '$brand-400',
    [`.${darkTheme} &`]: {
      color: '$text-brand-tertiary',
    },
  },

  '&:hover:not([disabled])': {
    backgroundColor: '$brand-300',
    [`.${darkTheme} &`]: {
      backgroundColor: '$brand-700',
    },
  },

  '&:focus': {
    outline: 'none',
    boxShadow:
      '$colors$brand-400 0px 0px 0px 4px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  },
});
