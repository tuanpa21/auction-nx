import {
  http,
  setExpiresIn,
  setRefreshToken,
  setToken,
  setUser,
} from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Authentication, authenticationSchema } from './utils';
import { useNavigate } from 'react-router-dom';
import { IAuthResponse } from '../interface';

type TAuthType = 'login' | 'register';

export function useAuthData(type?: string) {
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
      if (mutationType === 'register') reqData.name = 'test';

      return http<string, IAuthResponse>({
        method: 'post',
        url: mutationType === 'login' ? 'auth/sign-in' : 'auth/sign-up',
        data: JSON.stringify({
          ...reqData,
        }),
      });
    },
    onSuccess(data, variables, context) {
      if (data?.data) {
        setToken(data?.data.accessToken);
        setRefreshToken(data?.data.refreshToken);
        setExpiresIn(data?.data.expireIns.toString());
        setUser(data?.data.user);
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
