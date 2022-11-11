import { darkTheme, styled } from '@/config/theme';

export const TagList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  '&>*:not(:first-child)': {
    marginLeft: '$s-1',
  },
});

export const AddTagButton = styled('button', {
  borderRadius: '$full',
  color: '$gray-500',
  backgroundColor: '$gray-200',
  [`.${darkTheme} &`]: {
    backgroundColor: '$gray-700',
    color: '$gray-200',
  },
  padding: '$s-px',
  '&:hover': {
    color: '$text-brand-primary',
    backgroundColor: '$surface-brand',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '$border-brand',
  },
  '&>svg': {
    width: '$s-5',
    height: '$s-5',
  },
});

export const Tag = styled('div', {
  $$darkShade: '$colors$gray-700',
  $$darkShadeHover: '$colors$gray-800',
  $$lightShade: '$colors$gray-200',
  $$lightShadeHover: '$colors$gray-300',
  $$tertiaryShade: '$colors$gray-500',
  $$tertiaryShadeHover: '$colors$gray-600',

  borderRadius: '$full',
  display: 'flex',
  alignItems: 'center',
  paddingX: '$s-2',
  fontSize: '$text-xs',

  color: '$$darkShade',
  backgroundColor: '$$lightShade',

  [`.${darkTheme} &`]: {
    color: '#fff',
    backgroundColor: '$$darkShade',
  },

  '&>button': {
    color: '$$tertiaryShade',
    marginLeft: '$s-1',
    marginRight: -6,
    '&>svg': {
      width: '$s-5',
      height: '$s-5',
    },
    '&:hover': {
      color: '$$tertiaryShadeHover',
    },
  },
});
