import { styled } from '@/config/theme';

export const Surface = styled('div', {
  width: '100%',
  backgroundColor: '$surface-foreground',
  color: '$text-gray-primary',
});

export const Container = styled('div', {
  maxWidth: '$screen-lg',
  width: '100%',
  marginX: '$auto',
  display: 'flex',
  alignItems: 'center',
  paddingX: '$s-4',
});

export const LogoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '&>img': {
    height: '$s-12',
    width: '$s-12',
  },
  '&>span': {
    fontFamily: '$title',
    fontSize: '$text-xl',
    letterSpacing: '$tracking-tighter',
    color: '$text-brand-primary',
    marginLeft: '$s-3',
  },
});

export const Navigation = styled('nav', {
  display: 'flex',
  marginLeft: '$s-8',
  flexGrow: 1,
  '&>a': {
    '&>svg': {
      width: '$s-5',
      marginRight: '$s-2',
    },

    paddingX: '$s-3',
    paddingY: '$s-2',
    height: '100%',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    color: '$text-gray-tertiary',
    transitionProperty: '$transitions$transition-color',
    transitionDuration: '$transitions$duration-150',
    transitionTimingFunction: '$transitions$ease-in-out',

    '&:hover': {
      color: '$text-brand-secondary',
    },
    '&:focus': {
      textDecoration: 'underline',
      outline: 'none',
    },
    '&.active': {
      color: '$text-brand-primary',
    },
  },
});
