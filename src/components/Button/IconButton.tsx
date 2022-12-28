import { CSS, VariantProps } from '@stitches/react';
import { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react';
import { MaterialIcon, IconSizes } from '../Icon';
import { StyledIconButton } from './Button.styles';

export interface IconButtonProps
  extends PropsWithChildren,
    VariantProps<typeof StyledIconButton> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  css?: CSS;
  disabled?: boolean;
  iconName?: string;
  size?: IconSizes;
}

export function IconButton(props: IconButtonProps): JSX.Element {
  const { onClick, css, children, disabled, iconName, size, ...buttonProps } =
    props;

  return (
    <StyledIconButton
      {...buttonProps}
      css={css}
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        evt.currentTarget.blur();
        if (onClick) {
          onClick(evt);
        }
      }}
      disabled={disabled}
    >
      {iconName ? <MaterialIcon name={iconName} size={size} /> : children}
    </StyledIconButton>
  );
}

IconButton.defaultProps = {
  onClick: undefined,
  css: undefined,
  disabled: undefined,
  iconName: undefined,
  size: undefined,
};
