import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { Logger } from '@/lib/logger';
import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoginIcon from '@heroicons/react/20/solid/UserCircleIcon';
import { loginEmailAndPasswordUser } from '../../api/authApiCalls';
import { FormButtonContainer, StyledForm } from './Form.styles';

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
          Logger.error('EmailLogin', error);

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
      Logger.error('EmailLoginValidation', error);
      setErrorMessage({
        title: 'Validation Failed',
        message: 'Please fix the errors noted below and try again.',
      });
    }
  );

  return (
    <StyledForm onSubmit={handleFormSubmit}>
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
      <FormButtonContainer>
        <Button
          variant={'primary'}
          color={'brand'}
          type={'submit'}
          loading={loading}
          endIcon={LoginIcon}
        >
          Login
        </Button>
      </FormButtonContainer>
    </StyledForm>
  );
}
