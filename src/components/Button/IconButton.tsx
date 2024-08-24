import { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react';
import { MaterialIcon, IconSizes } from '../Icon';
import { iconButtonClasses } from './Button.styles';
import { VariantProps } from 'tailwind-variants';

export interface IconButtonProps
  extends PropsWithChildren,
    VariantProps<typeof iconButtonClasses> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  iconName?: string;
  size?: IconSizes;
}

export function IconButton(props: IconButtonProps): JSX.Element {
  const { onClick, children, disabled, iconName, size } = props;

  return (
    <button
      className={iconButtonClasses()}
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        evt.currentTarget.blur();
        if (onClick) {
          onClick(evt);
        }
      }}
      disabled={disabled}
    >
      {iconName ? <MaterialIcon name={iconName} size={size} /> : children}
    </button>
  );
}
