import { CSS, VariantProps } from '@stitches/react';
import { Text } from '../Text';
import { StyledAlert } from './Alert.styles';

export interface AlertProps extends VariantProps<typeof StyledAlert> {
  title: string;
  message: string;
  // type: todo
  css?: CSS;
  className?: string;
}

export function Alert(props: AlertProps): JSX.Element {
  const { title, message, css, className, ...alertProps } = props;
  return (
    <StyledAlert css={css} className={className} {...alertProps}>
      <Text as={'span'} variant={'h5'} textColor={'inherit'}>
        {title}
      </Text>
      <Text as={'p'} textColor={'inherit'}>
        {message}
      </Text>
    </StyledAlert>
  );
}

Alert.defaultProps = {
  css: undefined,
  className: undefined,
};
