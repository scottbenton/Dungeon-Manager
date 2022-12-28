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
  '&>span.mui-icon': {
    marginRight: '$s-4',
    color: '$text-brand-tertiary',
  },
  display: 'flex',
  alignItems: 'center',
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

export const CallToAction = styled(Button, {
  marginTop: '$s-6',
});
