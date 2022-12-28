import { MaterialIcon } from '../Icon';

interface ButtonIconProps {
  Element: string | ((props: any) => JSX.Element);
  className?: string;
}

export function ButtonIcon(props: ButtonIconProps): JSX.Element {
  const { className, Element } = props;

  if (typeof Element === 'string') {
    return <MaterialIcon name={Element} size={'md'} className={className} />;
  }
  return (
    <span className={className}>
      <Element />
    </span>
  );
}

ButtonIcon.defaultProps = {
  className: undefined,
};
