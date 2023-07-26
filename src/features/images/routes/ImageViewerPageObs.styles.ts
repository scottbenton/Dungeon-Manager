import { styled } from '@/config/theme';

export const ImageViewerContainer = styled('div', {
  backgroundColor: '$gray-200',
  borderWidth: '12px',
  borderStyle: 'solid',
  borderColor: '$gray-700',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  // minHeight: '100vh',
});

export const ImageViewer = styled('div', {
  flexGrow: 1,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export const ImageLabelContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  '&>h1': {
    fontFamily: '$title',
    backgroundColor: '$gray-800',
    paddingX: '$s-8',
    paddingY: '$s-4',
    fontSize: '$text-8xl',
    lineHeight: '1em',
    letterSpacing: '$tracking-wider',
    borderTopLeftRadius: '$3xl',
    borderTopRightRadius: '$3xl',
  },
});
