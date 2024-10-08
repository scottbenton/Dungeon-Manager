import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { Alert } from '@/components/Alert';
import { createEmailAndPasswordUser } from '../../api/authApiCalls';

YupPassword(yup); // extend yup

const signUpSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().password().required(),
});

export interface SignUpFormData {
  email: string;
  password: string;
}

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
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

      createEmailAndPasswordUser(email, password)
        .catch((error: FirebaseError) => {
          console.error(error);
          setErrorMessage({
            title: 'Error creating user',
            message: error.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    (error) => {
      console.error(error);
      // Field Errors will be handled in field validation
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
          endIcon={'add'}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}
