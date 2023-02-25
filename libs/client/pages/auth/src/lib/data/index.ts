import {
  httpClient,
  setUser,
} from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Authentication, authenticationSchema } from './utils';
import { useNavigate } from 'react-router-dom';
import { IAuthResponse, TAuthType } from '../interface';


export function useAuthData(pathname?: TAuthType) {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({
      data,
      mutationType,
    }: {
      data: Authentication;
      mutationType: TAuthType;
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reqData: any = {
        ...data,
      };
      if (mutationType === '/register') reqData.name = 'test';

      return httpClient<string, IAuthResponse>({
        method: 'post',
        url: mutationType === '/login' ? 'auth/sign-in' : 'auth/sign-up',
        data: JSON.stringify({
          ...reqData,
        }),
      });
    },
    onSuccess(data, variables, context) {
      if (data?.data) {
        setUser(data?.data.user);
        localStorage.setItem('refreshToken', data?.data.refreshToken);
        //TODO: redirect to dashboard
        toast.success('Successful');
        navigate('/dashboard');
      }
    },
    onError(error, variables, context) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error(`An error occurred`);
    },
  });
  const onSubmit = (values: { email: string; password: string }) => {
    if (pathname === '/login') {
      mutate({ data: values, mutationType: '/login' });
      return;
    }
    mutate({ data: values, mutationType: '/register' });
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

  return {
    isLoading,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
