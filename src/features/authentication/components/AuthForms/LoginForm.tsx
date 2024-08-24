import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { loginEmailAndPasswordUser } from '../../api/authApiCalls';

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    message: string;
  }>();

  const handleFormSubmit = handleSubmit(
    (data) => {
      setLoading(true);
      setErrorMessage(undefined);

      const { email, password } = data;
      loginEmailAndPasswordUser(email, password)
        .catch((error: FirebaseError) => {
          console.error(error);

          setErrorMessage({
            title: 'Error logging in',
            message: error.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    (error) => {
      console.error(error);
      setErrorMessage({
        title: 'Validation Failed',
        message: 'Please fix the errors noted below and try again.',
      });
    },
  );

  return (
    <form className={'space-y-4'} onSubmit={handleFormSubmit}>
      {errorMessage && (
        <Alert
          variant={'error'}
          title={errorMessage.title}
          message={errorMessage.message}
        />
      )}
      <Input
        label={'Email Address'}
        {...register('email')}
        error={errors.email?.message}
      />
      <PasswordInput
        label={'Password'}
        {...register('password')}
        error={errors.password?.message}
      />
      <div className={'flex justify-end pt-2'}>
        <Button
          variant={'primary'}
          color={'primary'}
          type={'submit'}
          loading={loading}
          endIcon={'account_circle'}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
