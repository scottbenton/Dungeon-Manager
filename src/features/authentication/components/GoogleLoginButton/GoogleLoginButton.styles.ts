import { styled } from '@/config/theme';

export const GoogleLoginButtonStyled = styled('button', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderWidth: '$1',
  borderRadius: '$xl',
  paddingLeft: '$s-4',
  paddingRight: '$s-5',
  paddingY: '$s-3',

  fontWeight: '$semibold',
  color: '$gray-700',

  transitionProperty: '$transitions$transition-color',
  transitionDuration: '$transitions$duration-150',
  transitionTimingFunction: '$transitions$ease-in-out',

  '&>svg': {
    width: 18,
    height: 18,
    marginRight: 24,
  },

  '&:hover': {
    backgroundColor: '$gray-200',
  },
  '&:focus': {
    borderColor: '$info-500',
    outline: 'none',
  },
  '&:disabled': {
    backgroundColor: '$gray-200',
    color: '$gray-500',
  },
});
