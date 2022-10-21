import { styled } from '@/config/theme';
import { Text } from '../Text';

export const InputGroup = styled('div', {
  borderWidth: '$1',
  borderRadius: '$lg',

  display: 'flex',
  alignItems: 'center',
  height: '$s-12',

  marginTop: '$s-1',
  color: '$text-gray-primary',

  variants: {
    error: {
      true: {
        $$borderColor: '$colors$error-700',
        $$borderColorFocus: '$colors$border-error',
      },
      false: {
        $$borderColor: '$colors$border-neutral',
        $$borderColorFocus: '$colors$border-brand',
      },
    },
    focused: {
      true: {
        borderColor: '$$borderColorFocus',
      },
      false: {
        borderColor: '$$borderColor',
      },
    },
  },
  defaultVariants: {
    focused: 'false',
    error: false,
  },

  '&>input': {
    backgroundColor: 'transparent',
    flexGrow: 1,
    fontSize: '$text-sm',

    marginX: '$s-3',
    marginY: '$s-2',

    '&:focus': {
      outline: 'none',
    },
    '&:autofill': {
      backgroundColor: 'transparent !important',
      filter: 'none',
      boxShadow: '0 0 0 40px $colors$surface-foreground inset !important',
    },
  },

  transitionProperty: '$transitions$transition-color',
  transitionDuration: '$transitions$duration-150',
  transitionTimingFunction: '$transitions$ease-in-out',
});

export const HelperText = styled(Text, {
  display: 'block',
  '&:first-letter': {
    textTransform: 'uppercase',
  },
});

export const InputDecorationButtonStyled = styled('button', {
  color: '$text-gray-tertiary',

  position: 'relative',
  height: '$s-12',
  paddingX: '$s-3',

  '&>svg': {
    width: '$s-5',
  },

  '&::before': {
    content: '',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '$lg',
    backgroundColor: '$gray-500',
    opacity: 0.1,
    transitionProperty: '$transitions$transition-opacity',
    transitionDuration: '$transitions$duration-150',
    transitionTimingFunction: '$transitions$ease-in-out',
  },

  '&:hover::before': {
    opacity: '.2',
  },
});
