import { styled } from '@/config/theme';

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  fontWeight: '$semibold',

  transitionProperty: '$transitions$transition-color',
  transitionDuration: '$transitions$duration-150',
  transitionTimingFunction: '$transitions$ease-in-out',

  '&>span>svg': {
    width: '$s-5',
  },

  '&>span.label': {
    position: 'relative',
  },

  variants: {
    size: {
      sm: {
        paddingX: '$s-2',
        paddingY: '$s-1',
        fontSize: '$text-sm',
        '&>span>svg': {
          width: '$s-4',
        },
        $$iconSpace: '$space$s-1',
      },
      md: {
        paddingX: '$s-4',
        paddingY: '$s-2',
        fontSize: '$text-base',
        $$iconSpace: '$space$s-2',
      },
      lg: {
        paddingX: '$s-7',
        paddingY: '$s-4',
        fontSize: '$text-lg',
        $$iconSpace: '$space$s-3',
      },
    },
    color: {
      brand: {
        $$textColor: '$colors$text-brand-secondary',
        $$surfaceDark: '$colors$brand-700',
        $$surfaceDarkHover: '$colors$brand-800',
        $$surfaceLight: '$colors$brand-200',
        $$surfaceLightHover: '$colors$brand-300',
        $$focusColor: '$colors$brand-400',
      },
      neutral: {
        $$textColor: '$colors$text-gray-secondary',
        $$surfaceDark: '$colors$gray-700',
        $$surfaceDarkHover: '$colors$gray-800',
        $$surfaceLight: '$colors$gray-200',
        $$surfaceLightHover: '$colors$gray-300',
        $$focusColor: '$colors$gray-400',
      },
      error: {
        $$textColor: '$colors$text-error-secondary',
        $$surfaceDark: '$colors$error-700',
        $$surfaceDarkHover: '$colors$error-800',
        $$surfaceLight: '$colors$error-200',
        $$surfaceLightHover: '$colors$error-300',
        $$focusColor: '$colors$error-400',
      },
      warning: {
        $$textColor: '$colors$text-warning-secondary',
        $$surfaceDark: '$colors$warning-700',
        $$surfaceDarkHover: '$colors$warning-800',
        $$surfaceLight: '$colors$warning-200',
        $$surfaceLightHover: '$colors$warning-300',
        $$focusColor: '$colors$warning-400',
      },
      info: {
        $$textColor: '$colors$text-info-secondary',
        $$surfaceDark: '$colors$info-700',
        $$surfaceDarkHover: '$colors$info-800',
        $$surfaceLight: '$colors$info-200',
        $$surfaceLightHover: '$colors$info-300',
        $$focusColor: '$colors$info-400',
      },
      success: {
        $$textColor: '$colors$text-success-secondary',
        $$surfaceDark: '$colors$success-700',
        $$surfaceDarkHover: '$colors$success-800',
        $$surfaceLight: '$colors$success-200',
        $$surfaceLightHover: '$colors$success-300',
        $$focusColor: '$colors$success-400',
      },
    },
    variant: {
      primary: {
        backgroundColor: '$$surfaceDark',
        color: '#fff',
        '&:hover:enabled': {
          backgroundColor: '$$surfaceDarkHover',
        },
        '&:disabled': {
          backgroundColor: '$gray-200',
          color: '$gray-500',
        },
      },
      secondary: {
        color: '$$textColor',
        position: 'relative',
        borderColor: '$$surfaceDarkHover',
        '&::before': {
          content: '',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          borderWidth: '$1',
          borderRadius: '$xl',
          borderColor: '$$focusColor',
          opacity: 0.5,
          transitionProperty: '$transitions$transition-opacity',
          transitionDuration: '$transitions$duration-150',
          transitionTimingFunction: '$transitions$ease-in-out',
        },

        '&:hover:enabled::before': {
          opacity: 1,
        },

        '&:disabled': {
          color: '$text-gray-tertiary',
          '&::before': {
            borderColor: '$gray-400',
          },
        },
      },
      tertiary: {
        color: '$$textColor',
        position: 'relative',
        '&::before': {
          content: '',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          borderRadius: '$xl',
          backgroundColor: '$gray-500',
          opacity: 0,
          transitionProperty: '$transitions$transition-opacity',
          transitionDuration: '$transitions$duration-150',
          transitionTimingFunction: '$transitions$ease-in-out',
        },

        '&:hover:enabled::before': {
          opacity: '.2',
        },

        '&:disabled': {
          color: '$text-gray-tertiary',
        },
      },
    },
    rounded: {
      true: {
        borderRadius: '$full',
      },
      false: {
        borderRadius: '$xl',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'neutral',
    variant: 'tertiary',
    rounded: false,
  },

  '&>span.startIcon': {
    marginRight: '$$iconSpace',
  },
  '&>span.endIcon': {
    marginLeft: '$$iconSpace',
  },

  '&:focus': {
    outline: 'none',
    boxShadow:
      '$$focusColor 0px 0px 0px 4px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  },
});