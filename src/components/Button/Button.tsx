import { IconNames } from '@/types/IonIconNames';
import IonIcon from '@reacticons/ionicons';
import { CSS, VariantProps } from '@stitches/react';
import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  MutableRefObject,
  forwardRef,
  ComponentProps,
} from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { StyledButton } from './Button.styles';
import { ButtonIcon } from './ButtonIcon';

export interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof StyledButton> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  startIcon?: ((props: any) => JSX.Element) | IconNames;
  endIcon?: ((props: any) => JSX.Element) | IconNames;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  css?: CSS;
}

const LoaderElement = () => <Loader />;

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const {
    children,
    startIcon,
    endIcon,
    onClick,
    type,
    href,
    loading,
    disabled,
    css,
    ...styleProps
  } = props;

  const SI = startIcon as string | ((props: any) => JSX.Element);
  const EI = endIcon as string | ((props: any) => JSX.Element);

  if (href) {
    return (
      <StyledButton
        as={Link}
        to={href}
        css={css}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        {...styleProps}
      >
        {startIcon && (
          <ButtonIcon Element={startIcon} className={'startIcon'} />
        )}
        <span className={'label'}>{children}</span>
        {endIcon && <ButtonIcon Element={endIcon} className={'endIcon'} />}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      {...styleProps}
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        evt.currentTarget.blur();
        if (onClick) {
          onClick(evt);
        }
      }}
      disabled={disabled || loading}
      type={type}
      css={css}
      ref={ref as MutableRefObject<HTMLButtonElement>}
    >
      {startIcon && <ButtonIcon Element={startIcon} className={'startIcon'} />}
      <span className={'label'}>{children}</span>
      {(endIcon || loading) && (
        <ButtonIcon
          Element={loading ? LoaderElement : (endIcon as any)}
          className={'endIcon'}
        />
      )}
    </StyledButton>
  );
});

Button.defaultProps = {
  startIcon: undefined,
  endIcon: undefined,
  onClick: undefined,
  href: undefined,
  type: undefined,
  loading: undefined,
  disabled: undefined,
  css: undefined,
};
