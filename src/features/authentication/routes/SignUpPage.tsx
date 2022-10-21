import { AuthPage } from '@/features/authentication/components/AuthPage';
import { GoogleLoginButton } from '@/features/authentication/components/GoogleLoginButton';
import { SignUpForm } from '@/features/authentication/components/AuthForms';

export default function SignUpPage(): JSX.Element {
  return (
    <AuthPage
      title={'Sign Up'}
      message={'Create an account to get started'}
      form={<SignUpForm />}
      socialLoginButtons={<GoogleLoginButton prefixText={'Sign Up with'} />}
      toggleSignInSignUp={{
        label: 'Already have an account?',
        linkText: 'Sign In',
        href: '/login',
      }}
    />
  );
}
