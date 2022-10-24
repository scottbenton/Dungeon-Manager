import { PropsWithChildren } from 'react';
import { InputDecorationButtonStyled } from './Input.styles';

export interface InputDecorationButtonProps extends PropsWithChildren {
  onClick: () => void;
  id: string;
}

export function InputDecorationButton(props: InputDecorationButtonProps) {
  const { onClick, id, children } = props;

  return (
    <InputDecorationButtonStyled
      type={'button'}
      onClick={() => onClick()}
      id={id}
    >
      {children}
    </InputDecorationButtonStyled>
  );
}
