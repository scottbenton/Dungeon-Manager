import { styled } from '@/config/theme';

export const ImageViewerContainer = styled('div', {
  backgroundColor: '$gray-900',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
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
  backgroundColor: '$surface-gray-transparent',
  paddingX: '$s-8',
  paddingY: '$s-4',
});
