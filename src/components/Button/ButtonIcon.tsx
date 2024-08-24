import { MaterialIcon } from '../Icon';
import { MATERIAL_ICON_VARIANTS } from '../Icon/MaterialIcon.types';

interface ButtonIconProps {
  Element: string | ((props: any) => JSX.Element);
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ButtonIcon(props: ButtonIconProps): JSX.Element {
  const { className, Element, size } = props;

  if (typeof Element === 'string') {
    return (
      <MaterialIcon
        variant={MATERIAL_ICON_VARIANTS.OUTLINED}
        name={Element}
        size={size}
        className={className}
      />
    );
  }
  return (
    <span className={className}>
      <Element />
    </span>
  );
}
