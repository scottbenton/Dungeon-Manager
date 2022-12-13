import { IconNames } from '@/types/IonIconNames';
import { CSS, VariantProps } from '@stitches/react';
import clsx from 'clsx';
import { StyledIcon } from './Icon.styles';

export interface IconProps extends VariantProps<typeof StyledIcon> {
  name: IconNames;
  css?: CSS;
  className?: string;
}

export function Icon(props: IconProps): JSX.Element {
  const { className, ...iconProps } = props;
  return <StyledIcon className={clsx('icon', className)} {...iconProps} />;
}

Icon.defaultProps = {
  css: undefined,
  className: undefined,
};
