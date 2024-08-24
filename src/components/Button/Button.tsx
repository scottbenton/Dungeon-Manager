import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  MutableRefObject,
  forwardRef,
} from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { buttonClasses } from './Button.styles';
import { ButtonIcon } from './ButtonIcon';
import { VariantProps } from 'tailwind-variants';
import clsx from 'clsx';

export interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonClasses> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  startIcon?: ((props: any) => JSX.Element) | string;
  endIcon?: ((props: any) => JSX.Element) | string;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
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
    className,
    size,
    variant,
    color,
    rounded,
  } = props;

  const {
    base,
    label,
    startIcon: startIconClasses,
    endIcon: endIconClasses,
  } = buttonClasses({
    size,
    variant,
    color,
    rounded,
  });

  if (href) {
    return (
      <Link
        to={href}
        className={clsx(base(), className)}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {startIcon && (
          <ButtonIcon
            Element={startIcon}
            size={size}
            className={startIconClasses()}
          />
        )}
        <span className={label()}>{children}</span>
        {endIcon && (
          <ButtonIcon
            Element={endIcon}
            size={size}
            className={endIconClasses()}
          />
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        evt.currentTarget.blur();
        if (onClick) {
          onClick(evt);
        }
      }}
      disabled={disabled || loading}
      className={clsx(base(), className)}
      ref={ref as MutableRefObject<HTMLButtonElement>}
    >
      {startIcon && (
        <ButtonIcon
          Element={startIcon}
          size={size}
          className={startIconClasses()}
        />
      )}
      <span className={label()}>{children}</span>
      {(endIcon || loading) && (
        <ButtonIcon
          Element={loading ? LoaderElement : (endIcon as any)}
          size={size}
          className={endIconClasses()}
        />
      )}
    </button>
  );
});
