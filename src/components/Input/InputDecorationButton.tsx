import { PropsWithChildren } from 'react';
import { inputStyles } from './Input.styles';

export interface InputDecorationButtonProps extends PropsWithChildren {
  onClick: () => void;
  id: string;
}

export function InputDecorationButton(props: InputDecorationButtonProps) {
  const { onClick, id, children } = props;

  const { inputButton } = inputStyles();

  return (
    <button
      type={'button'}
      onClick={() => onClick()}
      id={id}
      className={inputButton()}
    >
      {children}
    </button>
  );
}
