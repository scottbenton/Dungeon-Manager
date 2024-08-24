import { VariantProps } from 'tailwind-variants';
import { Text } from '../Text';
import { alertClasses } from './Alert.styles';
import { clsx } from 'clsx';

export interface AlertProps extends VariantProps<typeof alertClasses> {
  title: string;
  message: string;
  className?: string;
}

export function Alert(props: AlertProps): JSX.Element {
  const { title, message, className, variant } = props;
  const { base, text } = alertClasses({ variant });

  return (
    <div className={clsx(className, base())}>
      <Text as={'span'} variant={'h5'} textColor={'inherit'}>
        {title}
      </Text>
      <Text className={text()} as={'p'} textColor={'inherit'}>
        {message}
      </Text>
    </div>
  );
}
