import { CSS } from '@stitches/react';
import { Button, ButtonProps } from '../Button';
import { MaterialIcon } from '../Icon';
import { Text } from '../Text';
import { EmptyStateContainer } from './EmptyState.styles';

export interface EmptyStateProps {
  message: string;
  callToAction?: ButtonProps;
  IconEntry: ((props: React.ComponentProps<'svg'>) => JSX.Element) | string;
  css?: CSS;
}

export function EmptyState(props: EmptyStateProps): JSX.Element {
  const { message, callToAction, IconEntry, css } = props;

  return (
    <EmptyStateContainer css={css}>
      <Text variant={'h4'} as={'h2'} textColor={'brandPrimary'}>
        {message}
      </Text>
      {callToAction && <Button {...callToAction} />}
      {typeof IconEntry === 'string' ? (
        <MaterialIcon name={IconEntry} size={'background'} />
      ) : (
        <IconEntry />
      )}
    </EmptyStateContainer>
  );
}

EmptyState.defaultProps = {
  css: undefined,
  callToAction: undefined,
};
