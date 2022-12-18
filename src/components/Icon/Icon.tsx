import { IconNames } from '@/types/IonIconNames';
import { CSS, VariantProps } from '@stitches/react';
import clsx from 'clsx';
import { StyledIcon } from './Icon.styles';

export interface IconProps extends VariantProps<typeof StyledIcon> {
  name: IconNames;
  label?: string;
  css?: CSS;
  className?: string;
}

export function Icon(props: IconProps): JSX.Element {
  const { className, label, ...iconProps } = props;
  return (
    <StyledIcon
      className={clsx('icon', className)}
      aria-label={label}
      {...iconProps}
    />
  );
}

Icon.defaultProps = {
  css: undefined,
  className: undefined,
};
