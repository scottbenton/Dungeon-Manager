import * as RCheckbox from '@radix-ui/react-checkbox';
import { MaterialIcon } from '../Icon';
import clsx from 'clsx';

export interface CheckboxProps extends RCheckbox.CheckboxProps {
  id: string;
  label: string;
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  const { id, label, className, ...otherProps } = props;
  return (
    <>
      <div className={clsx('flex items-center', className)}>
        <RCheckbox.Root
          className='border dark:border-gray-600 transition-colors duration-150 ease-in-out hover:bg-primary-100 flex h-8 w-8 appearance-none items-center justify-center rounded-lg bg-white outline-none focus:ring-2 ring-primary-400'
          id={id}
          {...otherProps}
        >
          <RCheckbox.Indicator className='text-primary-500 flex items-center justify-center'>
            <MaterialIcon name='check' />
          </RCheckbox.Indicator>
        </RCheckbox.Root>
        <label
          className='pl-2 text-base leading-none cursor-pointer'
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </>
  );
}
