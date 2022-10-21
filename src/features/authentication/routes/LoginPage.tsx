import { LoginForm } from '@/features/authentication/components/AuthForms/LoginForm';
import { AuthPage } from '@/features/authentication/components/AuthPage';
import { GoogleLoginButton } from '@/features/authentication/components/GoogleLoginButton';

export default function LoginPage(): JSX.Element {
  return (
    <AuthPage
      title={'Login'}
      message={'Welcome back!'}
      form={<LoginForm />}
      socialLoginButtons={<GoogleLoginButton prefixText={'Login with'} />}
      toggleSignInSignUp={{
        label: 'Need an account?',
        linkText: 'Sign Up',
        href: '/signup',
      }}
    />
  );
}
