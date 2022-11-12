import { styled } from '@/config/theme';

export const Text = styled('p', {
  variants: {
    variant: {
      body: {
        fontSize: '$text-base',
        lineHeight: '1.5rem',
      },
      caption: {
        fontSize: '$text-sm',
        lineHeight: '1.25rem',
      },
      h1: {
        fontSize: '$text-6xl',
        lineHeight: 1,
        fontWeight: '$black',
      },
      h2: {
        fontSize: '$text-4xl',
        lineHeight: '2.5rem',
        fontWeight: '$bold',
      },
      h3: {
        fontSize: '$text-3xl',
        lineHeight: '2.25rem',
      },
      h4: {
        fontSize: '$text-xl',
        lineHeight: '1.75rem',
        fontWeight: '$semibold',
      },
      h5: {
        fontSize: '$text-lg',
        lineHeight: '1.75rem',
        fontWeight: '$semibold',
      },
      h6: {
        fontSize: '$text-base',
        lineHeight: '1.5rem',
        borderBottomWidth: '$1',
        display: 'block',
      },
      subtitle: {
        fontSize: '$text-base',
        lineHeight: '1.5rem',
      },
      overline: {
        fontSize: '$text-sm',
        lineHeight: '1.25rem',
        textTransform: 'uppercase',
        fontWeight: '$semibold',
        letterSpacing: '$tracking-wide',
      },
      label: {
        fontSize: '$text-sm',
        lineHeight: '1.25rem',
        fontWeight: '$medium',
      },
      pageTitle: {
        fontSize: '$text-base',
        lineHeight: '1.5rem',
        fontWeight: '$semibold',
        textTransform: 'uppercase',
        letterSpacing: '$tracking-wide',
      },
    },
    textColor: {
      textPrimary: {
        color: '$text-gray-primary',
      },
      textSecondary: {
        color: '$text-gray-secondary',
      },
      textTertiary: {
        color: '$text-gray-tertiary',
      },
      brandPrimary: {
        color: '$text-brand-primary',
      },
      brandSecondary: {
        color: '$text-brand-secondary',
      },
      brandTertiary: {
        color: '$text-brand-tertiary',
      },
      infoPrimary: {
        color: '$text-info-primary',
      },
      infoSecondary: {
        color: '$text-info-secondary',
      },
      infoTertiary: {
        color: '$text-info-tertiary',
      },
      successPrimary: {
        color: '$text-success-primary',
      },
      successSecondary: {
        color: '$text-success-secondary',
      },
      successTertiary: {
        color: '$text-success-tertiary',
      },
      warningPrimary: {
        color: '$text-warning-primary',
      },
      warningSecondary: {
        color: '$text-warning-secondary',
      },
      warningTertiary: {
        color: '$text-warning-tertiary',
      },
      errorPrimary: {
        color: '$text-error-primary',
      },
      errorSecondary: {
        color: '$text-error-secondary',
      },
      errorTertiary: {
        color: '$text-error-tertiary',
      },
      white: {
        color: '#fff',
      },
      inherit: {
        color: 'inherit',
      },
    },
    textAlign: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
      justify: {
        textAlign: 'justify',
      },
    },
  },
  defaultVariants: {
    variant: 'body',
    textColor: 'textPrimary',
    textAlign: 'left',
  },
});
