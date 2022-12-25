import { styled } from '@/config/theme';
import { Button } from '../Button';

export const ErrorPageContainer = styled('div', {
  maxWidth: '$md',
  width: '100%',
  paddingX: '$s-4',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
});

export const ErrorPageTitle = styled('h1', {
  '&>span>svg': {
    marginRight: '$s-4',
    width: '$s-20',
    color: '$text-brand-tertiary',
  },
  display: 'flex',
  color: '$text-brand-primary',
  fontWeight: '$black',
  fontSize: '$text-6xl',
  whiteSpace: 'nowrap',
  flexWrap: 'wrap',
});

export const ErrorPageMessage = styled('p', {
  color: '$text-gray-secondary',
  marginTop: '$s-4',
});

export const ErrorIcon = styled('div', {
  width: '$s-16',
  height: '$s-16',
  backgroundColor: '$surface-error',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$full',

  '&>svg': {
    width: '$s-12',
    color: '$text-error-primary',
  },
});

export const CallToAction = styled(Button, {
  marginTop: '$s-6',
});
