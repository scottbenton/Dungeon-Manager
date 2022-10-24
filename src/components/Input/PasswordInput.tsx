import { forwardRef, useState } from 'react';
import ShowIcon from '@heroicons/react/20/solid/EyeIcon';
import HideIcon from '@heroicons/react/20/solid/EyeSlashIcon';
import { Input, InputProps } from './Input';
import { InputDecorationButton } from './InputDecorationButton';

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'inputDecorationEnd'
>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [type, setType] = useState<'password' | 'text'>('password');

    const toggleType = () => {
      setType((prevType) => (prevType === 'text' ? 'password' : 'text'));
    };

    return (
      <Input
        {...props}
        ref={ref}
        inputDecorationEnd={
          <InputDecorationButton
            onClick={() => toggleType()}
            id={'view-or-hide-password-button'}
          >
            {type === 'password' ? <ShowIcon /> : <HideIcon />}
          </InputDecorationButton>
        }
        type={type}
      />
    );
  }
);
