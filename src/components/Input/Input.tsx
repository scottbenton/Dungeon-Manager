import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Text } from '../Text';
import { HelperText, InputGroup } from './Input.styles';

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
      ...inputProps
    } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <div>
        <Text
          as={'label'}
          variant={'label'}
          textColor={'textSecondary'}
          htmlFor={id}
          css={
            hideLabel
              ? {
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  borderWidth: 0,
                }
              : undefined
          }
        >
          {label}
        </Text>
        <InputGroup focused={isFocused} error={!!error}>
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
          />
          {inputDecorationEnd}
        </InputGroup>
        {(error || helperText) && (
          <HelperText
            as={'span'}
            variant={'caption'}
            textColor={error ? 'errorSecondary' : undefined}
          >
            {error || helperText}
          </HelperText>
        )}
      </div>
    );
  }
);

Input.defaultProps = {
  helperText: undefined,
  error: undefined,
  inputDecorationEnd: undefined,
  hideLabel: undefined,
};
