import * as RDialog from '@radix-ui/react-dialog';
import { IconButton } from '../Button/IconButton';
import { MaterialIcon } from '../Icon';
import { Text } from '../Text';
import { DialogContent, DialogHeader, DialogOverlay } from './DialogStyles';

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
              <IconButton>
                <MaterialIcon name={'close'} />
              </IconButton>
            </RDialog.Close>
          </DialogHeader>
          {content}
        </DialogContent>
      </RDialog.Content>
    </RDialog.Root>
  );
}
