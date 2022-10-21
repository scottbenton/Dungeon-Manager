import { styled } from '@/config/theme';

export const StyledForm = styled('form', {
  '&>*:not(:first-child)': {
    marginTop: '$s-4',
  },
});

export const FormButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '$s-2',
});
