import { styled } from '@/config/theme';
import * as RDialog from '@radix-ui/react-dialog';
import { Card } from '../Card';

export const DialogOverlay = styled(RDialog.Overlay, {
  backgroundColor: '$surface-gray-transparent-light',
  position: 'fixed',
  inset: 0,
  zIndex: '$modal',
});

export const DialogContent = styled(Card, {
  maxWidth: '$lg',
  width: '100%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '$xl',
  zIndex: '$modal',
});

export const DialogHeader = styled('div', {
  // paddingX: '$s-2',
  // paddingY: '$s-2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
