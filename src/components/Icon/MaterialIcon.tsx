import { CSS, VariantProps } from '@stitches/react';
import clsx from 'clsx';
import { StyledMaterialIcon } from './Icon.styles';
import { MATERIAL_ICON_VARIANTS } from './MaterialIcon.types';

export type IconSizes = VariantProps<typeof StyledMaterialIcon>['size'];

export interface MaterialIconProps {
  name: string;
  variant?: MATERIAL_ICON_VARIANTS;
  filled?: boolean;
  size?: IconSizes;
  className?: string;
  css?: CSS;
}

const classNames: { [key in MATERIAL_ICON_VARIANTS]: string } = {
  [MATERIAL_ICON_VARIANTS.OUTLINED]: 'material-symbols-outlined',
  [MATERIAL_ICON_VARIANTS.ROUNDED]: 'material-symbols-rounded',
  [MATERIAL_ICON_VARIANTS.SHARP]: 'material-symbols-sharp',
};

export function MaterialIcon(props: MaterialIconProps): JSX.Element {
  const { name, variant, filled, size, className, css } = props;
  console.debug(variant);
  return (
    <StyledMaterialIcon
      filled={filled}
      size={size}
      className={clsx(
        'mui-icon',
        classNames[variant ?? MATERIAL_ICON_VARIANTS.ROUNDED],
        className
      )}
      css={css}
    >
      {name}
    </StyledMaterialIcon>
  );
}

MaterialIcon.defaultProps = {
  variant: MATERIAL_ICON_VARIANTS.ROUNDED,
  filled: true,
  size: 'md',
  className: undefined,
  css: undefined,
};
