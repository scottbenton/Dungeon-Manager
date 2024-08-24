import * as RDialog from '@radix-ui/react-dialog';
import { IconButton } from '../Button/IconButton';
import { MaterialIcon } from '../Icon';
import { Text } from '../Text';
import { Card } from '../Card';
import { dialogClasses } from './DialogStyles';
import clsx from 'clsx';

export interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
}

export function Dialog(props: DialogProps) {
  const { open, setOpen, title, content } = props;
  const { overlay, content: contentClasses, header } = dialogClasses();
  return (
    <RDialog.Root open={open} onOpenChange={setOpen}>
      <RDialog.Portal>
        <RDialog.Overlay className={overlay()} />
        <RDialog.Content>
          <Card className={clsx('px-6', contentClasses())}>
            <div className={header()}>
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
            </div>
            {content}
          </Card>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
