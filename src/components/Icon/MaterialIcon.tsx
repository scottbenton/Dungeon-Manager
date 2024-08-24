import clsx from 'clsx';
import { iconStyles } from './Icon.styles';
import { MATERIAL_ICON_VARIANTS } from './MaterialIcon.types';
import { VariantProps } from 'tailwind-variants';

export type IconSizes = VariantProps<typeof iconStyles>['size'];

export interface MaterialIconProps {
  name: string;
  variant?: MATERIAL_ICON_VARIANTS;
  filled?: boolean;
  size?: IconSizes;
  className?: string;
}

const classNames: { [key in MATERIAL_ICON_VARIANTS]: string } = {
  [MATERIAL_ICON_VARIANTS.OUTLINED]: 'material-symbols-outlined',
  [MATERIAL_ICON_VARIANTS.ROUNDED]: 'material-symbols-rounded',
  [MATERIAL_ICON_VARIANTS.SHARP]: 'material-symbols-sharp',
};

export function MaterialIcon(props: MaterialIconProps): JSX.Element {
  const { name, variant, filled, size, className } = props;
  return (
    <span
      className={clsx(
        iconStyles({ filled, size }),
        classNames[variant ?? MATERIAL_ICON_VARIANTS.ROUNDED],
        className,
      )}
    >
      {name}
    </span>
  );
}
