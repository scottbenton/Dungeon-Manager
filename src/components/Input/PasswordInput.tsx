import { forwardRef, useState } from 'react';
import { Input, InputProps } from './Input';
import { InputDecorationButton } from './InputDecorationButton';
import { MaterialIcon } from '../Icon';

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
            <MaterialIcon
              name={type === 'password' ? 'visibility' : 'visibility_off'}
            />
          </InputDecorationButton>
        }
        type={type}
      />
    );
  }
);
