import { CSS, VariantProps } from '@stitches/react';
import { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react';
import { StyledIconButton } from './Button.styles';

export interface IconButtonProps
  extends PropsWithChildren,
    VariantProps<typeof StyledIconButton> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  css?: CSS;
}

export function IconButton(props: IconButtonProps): JSX.Element {
  const { onClick, css, children, ...buttonProps } = props;

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
    >
      {children}
    </StyledIconButton>
  );
}

IconButton.defaultProps = {
  onClick: undefined,
  css: undefined,
};
