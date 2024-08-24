import { Button, ButtonProps } from '../Button';
import { MaterialIcon } from '../Icon';
import { Text } from '../Text';
import { emptyStateClasses } from './EmptyState.styles';
import clsx from 'clsx';
import { MATERIAL_ICON_VARIANTS } from '../Icon/MaterialIcon.types';

export interface EmptyStateProps {
  message: string;
  callToAction?: ButtonProps;
  IconEntry: ((props: React.ComponentProps<'svg'>) => JSX.Element) | string;
  className?: string;
}

export function EmptyState(props: EmptyStateProps): JSX.Element {
  const { message, callToAction, IconEntry, className } = props;

  const { container, contents, actions, icon } = emptyStateClasses();

  return (
    <div className={clsx(className, container())}>
      <div className={contents()}>
        <Text variant={'h4'} as={'h2'} textColor={'primary'}>
          {message}
        </Text>
        {callToAction && (
          <Button
            {...callToAction}
            className={clsx(callToAction.className, actions())}
          />
        )}
      </div>
      {typeof IconEntry === 'string' ? (
        <MaterialIcon
          variant={MATERIAL_ICON_VARIANTS.ROUNDED}
          name={IconEntry}
          className={icon()}
          size={'background'}
        />
      ) : (
        <IconEntry className={icon()} />
      )}
    </div>
  );
}
