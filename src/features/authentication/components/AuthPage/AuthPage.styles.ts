import { Card } from '@/components/Card';
import { styled } from '@/config/theme';

export const StyledAuthPage = styled('div', {
  display: 'flex',
  flexGrow: 1,
  backgroundImage:
    'linear-gradient(to bottom, $colors$brand-900, $colors$brand-700)',

  variants: {
    sidebarVisible: {
      true: {
        alignItems: 'stretch',
      },
      false: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  defaultVariants: {
    sidebarVisible: false,
  },
});

export const Sidebar = styled('div', {
  flexGrow: 1,
  padding: '$s-6',

  variants: {
    isVisible: {
      true: {
        display: 'flex',
        flexDirection: 'column',
      },
      false: {
        display: 'none',
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const DungeonManagerLogo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '&>img': {
    width: '$s-10',
    marginRight: '$s-4',
  },
});

export const FeatureInfoSection = styled('div', {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  paddingTop: '$s-24',
  paddingBottom: '$s-48',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Feature = styled('div', {
  maxWidth: '$sm',
  width: '100%',
  display: 'flex',
  marginTop: '$s-4',
});

export const FeatureIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$xl',
  backgroundColor: '$brand-700',
  color: '#fff',
  width: '$s-20',
  height: '$s-20',
  marginRight: '$s-6',
  flexShrink: 0,
  '&>svg': {
    width: '$s-10',
    height: '$s-10',
    strokeWidth: 1,
  },
});

export const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',

  '&>*:not(.fullWidth)': {
    maxWidth: '$md',
    width: '100%',
    marginX: 'auto',
    paddingX: '$s-6',
  },
  '&>.fullWidth': {
    width: '100%',
  },

  variants: {
    rounded: {
      true: {
        width: '100%',
        maxWidth: '$md',
      },
      false: {
        borderRadius: 0,
        flexGrow: 1,
        maxWidth: 'none',
        width: 'unset',
      },
    },
  },
  defaultVariants: {
    rounded: true,
  },
});

export const CardHeader = styled('div', {
  paddingTop: '$s-6',
  display: 'flex',
  alignItems: 'center',
  '&>div': {
    backgroundColor: '$surface-brand',
    padding: '$s-2',
    marginRight: '$s-2',
    borderRadius: '$xl',
    '&>span.icon': {
      width: '$s-6',
      height: '$s-6',
      color: '$text-brand-secondary',
    },
  },
});

export const CardFormContainer = styled('div', {
  marginTop: '$s-10',
  flexGrow: 1,
});

export const LoginButtonContainer = styled('div', {
  marginTop: '$s-8',
});

export const OrContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginTop: '$s-10',

  '&>hr': {
    flexGrow: 1,
  },
  '&>span': {
    paddingX: '$s-4',
  },
});

export const SwitchSignInSignUpContainer = styled('div', {
  marginTop: '$s-10',
  backgroundColor: '$surface-background',
  '&>div': {
    padding: '$s-6',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '$md',
    width: '100%',
    marginX: 'auto',
    '&>a': {
      marginLeft: '$s-2',
      color: '$text-brand-primary',
      fontWeight: '$semibold',
    },
  },
});
