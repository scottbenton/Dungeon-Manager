import * as RDialog from '@radix-ui/react-dialog';
import CloseIcon from '@heroicons/react/24/outline/XMarkIcon';
import { Text } from '../Text';
import {
  CloseButton,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from './DialogStyles';

export interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
}

export function Dialog(props: DialogProps) {
  const { open, setOpen, title, content } = props;
  return (
    <RDialog.Root open={open} onOpenChange={setOpen}>
      <DialogOverlay />
      <RDialog.Content asChild>
        <DialogContent css={{ paddingX: '$s-6' }}>
          <DialogHeader>
            <RDialog.Title asChild>
              <Text variant={'h4'} as={'h1'}>
                {title}
              </Text>
            </RDialog.Title>
            <RDialog.Close asChild>
              <CloseButton size={'lg'}>
                <CloseIcon />
              </CloseButton>
            </RDialog.Close>
          </DialogHeader>
          {content}
        </DialogContent>
      </RDialog.Content>
    </RDialog.Root>
  );
}
