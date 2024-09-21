import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Text } from '../Text';
import { inputStyles } from './Input.styles';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  inputDecorationEnd?: React.ReactNode;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const {
      label,
      helperText,
      error,
      inputDecorationEnd,
      onBlur,
      id,
      hideLabel,
      className,
      ...inputProps
    } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const {
      inputGroup,
      input,
      helperText: helperTextStyles,
    } = inputStyles({
      error: !!error,
      focused: isFocused,
    });

    return (
      <div className={className}>
        <Text
          as={'label'}
          variant={'label'}
          textColor={'textSecondary'}
          htmlFor={id}
          className={hideLabel ? 'sr-only' : ''}
        >
          {label}
        </Text>
        <div className={inputGroup()}>
          <input
            id={id}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={(evt) => {
              setIsFocused(false);
              if (onBlur) {
                onBlur(evt);
              }
            }}
            {...inputProps}
            className={input()}
          />
          {inputDecorationEnd}
        </div>
        {(error || helperText) && (
          <Text
            className={helperTextStyles()}
            as={'span'}
            variant={'caption'}
            textColor={error ? 'errorSecondary' : undefined}
          >
            {error || helperText}
          </Text>
        )}
      </div>
    );
  },
);
