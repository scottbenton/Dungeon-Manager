import { useState } from 'react';
import { GoogleLoginButtonStyled } from './GoogleLoginButton.styles';
import { ReactComponent as GoogleLogo } from '../../assets/GoogleLogo.svg';
import { loginWithGoogle } from '../../api/authApiCalls';

export interface GoogleLoginButtonProps {
  prefixText: string;
}

export function GoogleLoginButton(props: GoogleLoginButtonProps) {
  const { prefixText } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    loginWithGoogle().finally(() => {
      setLoading(false);
    });
  };

  return (
    <GoogleLoginButtonStyled onClick={() => handleClick()} disabled={loading}>
      <GoogleLogo />
      {prefixText} with Google
    </GoogleLoginButtonStyled>
  );
}
