import { http } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Authentication, authenticationSchema } from './utils';

type TAuthType = 'login' | 'register';

export function useAuthData(type?: string) {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({
      data,
      mutationType,
    }: {
      data: Authentication;
      mutationType: TAuthType;
    }) => {
      return http({
        method: mutationType === 'login' ? 'GET' : 'POST',
        url: mutationType === 'login' ? '/login' : '/register',
        data: JSON.stringify({
          email: data?.email,
          password: data?.password,
        }),
      });
    },
    onSuccess(data, variables, context) {
      //TODO: redirect to dashboard
      toast.success('Successful');
    },
    onError(error, variables, context) {
      toast.error('An error occurred');
    },
  });
  const onSubmit = (values: { email: string; password: string }) => {
    console.log(values);
    if (type === 'login') {
      mutate({ data: values, mutationType: 'login' });
      return;
    }
    mutate({ data: values, mutationType: 'register' });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: authenticationSchema,
    onSubmit,
  });

  const { touched, values, errors, handleChange, handleSubmit } = formik;

  useEffect(() => {
    if (type !== 'login' && type !== 'register') {
      window.location.href = '/login';
    }
  }, [type]);

  return {
    isLoading,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
