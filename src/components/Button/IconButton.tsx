import { IconNames } from '@/types/IonIconNames';
import IonIcon from '@reacticons/ionicons';
import { CSS, VariantProps } from '@stitches/react';
import { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react';
import { StyledIconButton } from './Button.styles';

export interface IconButtonProps
  extends PropsWithChildren,
    VariantProps<typeof StyledIconButton> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  css?: CSS;
  disabled?: boolean;
  iconName?: IconNames;
}

export function IconButton(props: IconButtonProps): JSX.Element {
  const { onClick, css, children, disabled, iconName, ...buttonProps } = props;

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
      {iconName ? <IonIcon name={iconName} /> : children}
    </StyledIconButton>
  );
}

IconButton.defaultProps = {
  onClick: undefined,
  css: undefined,
  disabled: undefined,
  iconName: undefined,
};
