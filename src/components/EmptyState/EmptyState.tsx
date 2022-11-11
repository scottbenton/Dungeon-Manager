import { CSS } from '@stitches/react';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';
import { EmptyStateContainer } from './EmptyState.styles';

export interface EmptyStateProps {
  message: string;
  callToAction?: ButtonProps;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  css?: CSS;
}

export function EmptyState(props: EmptyStateProps): JSX.Element {
  const { message, callToAction, Icon, css } = props;

  return (
    <EmptyStateContainer css={css}>
      <Text variant={'h4'} as={'h2'} textColor={'brandPrimary'}>
        {message}
      </Text>
      {callToAction && <Button {...callToAction} />}
      <Icon className={'w-64 text-primary-200 absolute'} />
    </EmptyStateContainer>
  );
}

EmptyState.defaultProps = {
  css: undefined,
  callToAction: undefined,
};
