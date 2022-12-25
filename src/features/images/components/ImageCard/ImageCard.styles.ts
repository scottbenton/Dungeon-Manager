import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { styled } from '@/config/theme';

export const StyledImageCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',

  transitionProperty: 'box-shadow',
  transitionDuration: '$transitions$duration-150',
  transitionTimingFunction: '$transitions$ease-in-out',

  '&>button': {
    display: 'flex',
    flexDirection: 'column',
  },

  variants: {
    hovering: {
      true: {
        boxShadow: '$md',
      },
      false: {
        boxShadow: 'none',
      },
    },
    selected: {
      true: {
        borderColor: '$border-brand',
        boxShadow: '0px 0px 0px 4px #9747FF80',
      },
      false: {
        borderColor: '$border-neutral',
        boxShadow: 'none',
      },
    },
  },
});

export const ImageContainer = styled('div', {
  aspectRatio: '16/9',
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
});

export const SelectedCheckIcon = styled(Icon, {
  color: '#fff',
  margin: '$s-2',
  float: 'right',
});

export const StyledInput = styled('input', {
  fontSize: '$text-xl',
  fontWeight: '$light',
  paddingX: '$s-1',
  paddingY: '$s-2',
  borderBottomWidth: '$1',
  height: 45,
  '&:focus': {
    outline: 'none',
    borderColor: '$border-brand',
    borderWidth: '$1',
  },
  backgroundColor: '$surface-foreground',
  color: '$text-gray-secondary',
});

export const ButtonContainer = styled('div', {
  display: 'flex',
  '&>button': {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '$light',
    borderRadius: 0,
    width: '50%',
    '&::before': {
      borderRadius: 0,
    },
    '&:nth-child(1)': {
      borderBottomLeftRadius: '$xl',
      borderRightWidth: '$1',
    },
    '&:nth-child(2)': {
      borderBottomRightRadius: '$xl',
    },
  },
});

// export const ActionButton = styled(Button, {
//   borderRadius: 0,
//   width: '50%',
//   '&::before': {
//     borderRadius: 0,
//   },
// });
