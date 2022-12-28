import { styled } from '@/config/theme';

export const DropzoneContainer = styled('div', {});

export const Dropzone = styled('div', {
  paddingX: '$s-4',
  paddingY: '$s-8',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$xl',
  borderWidth: '$2',
  borderStyle: 'dashed',
  cursor: 'pointer',
  marginTop: '$s-1',

  variants: {
    isDragActive: {
      true: {
        borderColor: '$border-brand',
        backgroundColor: '$surface-brand',
      },
      false: {
        borderColor: '$border-neutral',
        backgroundColor: '$surface-foreground',
      },
    },
  },
});

export const DropzoneIcon = styled('div', {
  marginBottom: '$s-3',
  borderRadius: '$xl',
  backgroundColor: '$surface-brand',
  color: '$text-brand-secondary',
  padding: '$s-3',
  display: 'flex',
});

export const DropzoneText = styled('p', {
  '&>span': {
    fontWeight: '$semibold',
    color: '$text-brand-primary',
  },
  variants: {
    isDragActive: {
      true: { color: '$text-brand-primary' },
      false: { color: '$text-gray-secondary' },
    },
  },
});
