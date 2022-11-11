import { CSS, VariantProps } from '@stitches/react';
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  MutableRefObject,
  forwardRef,
} from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { StyledButton } from './Button.styles';

export interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof StyledButton> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  startIcon?: (props: any) => JSX.Element;
  endIcon?: (props: any) => JSX.Element;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  css?: CSS;
}

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

  const SI = startIcon;
  const EI = endIcon;

  if (href) {
    return (
      <StyledButton
        as={Link}
        to={href}
        css={css}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        {...styleProps}
      >
        {SI && (
          <span className={'startIcon'}>
            <SI />
          </span>
        )}
        <span className={'label'}>{children}</span>
        {EI && (
          <span className={'endIcon'}>
            <EI />
          </span>
        )}
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
      {SI && (
        <span className={'startIcon'}>
          <SI />
        </span>
      )}
      <span className={'label'}>{children}</span>
      {(loading || EI) && (
        <span className={'endIcon'}>
          {loading && <Loader />}
          {EI && !loading && <EI />}
        </span>
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
