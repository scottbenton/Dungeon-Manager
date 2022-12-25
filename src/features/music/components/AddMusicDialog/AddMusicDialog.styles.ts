import { styled } from '@/config/theme';

export const StyledForm = styled('form', {
  '&>*': {
    marginTop: '$s-4',
  },
});

export const FormButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '$s-2',
});

export const SourceButton = styled('button', {
  backgroundColor: '#fff',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  paddingX: '$s-4',
  paddingY: '$s-6',
  marginTop: '$s-4',
  borderRadius: '$xl',

  '&>img': {
    height: '$s-16',
  },
  '&:hover': {
    backgroundColor: '$gray-100',
  },
});
