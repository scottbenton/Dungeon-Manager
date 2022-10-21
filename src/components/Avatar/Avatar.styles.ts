import { Avatar, Fallback } from '@radix-ui/react-avatar';
import { styled } from '@/config/theme';

export const StyledAvatar = styled(Avatar, {
  width: '$s-10',
  height: '$s-10',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  fontSize: '$text-base',
  lineHeight: 1,
  fontWeight: '$semibold',
  borderRadius: '$full',
  backgroundColor: '$surface-brand',
  color: '$text-brand-primary',
});

export const StyledFallback = styled(Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray-500',
  color: '#fff',

  '&>svg': {
    width: '$s-5',
  },
});
