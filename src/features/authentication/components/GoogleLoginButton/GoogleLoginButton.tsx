import { useState } from 'react';
import GoogleLogo from '../../assets/GoogleLogo.svg?react';
import { loginWithGoogle } from '../../api/authApiCalls';
import { Button } from '@/components/Button';

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
    <>
      <Button
        variant={'secondary'}
        size={'lg'}
        color={'neutral'}
        startIcon={() => <GoogleLogo />}
        onClick={() => handleClick()}
        disabled={loading}
      >
        {prefixText} with Google
      </Button>
    </>
  );
}
