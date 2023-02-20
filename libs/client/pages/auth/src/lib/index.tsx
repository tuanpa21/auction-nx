import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@auction-nx/client/components/button";
import { Input } from "@auction-nx/client/components/form";
import { Authentication, authenticationSchema } from "@auction-nx/client/data";
import { http } from "@auction-nx/client/utils";

type TAuthType = 'login' | 'register';

function Auth() {
  const { type } = useParams();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({
      data,
      mutationType,
    }: {
      data: Authentication;
      mutationType: TAuthType;
    }) => {
      return http(
        {
          method: mutationType === 'login' ? 'GET' : 'POST',
          url: mutationType === 'login' ? '/login' : '/register',
          data: JSON.stringify({
            email: data?.email,
            password: data?.password,
          }),
        }
      );
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
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex w-96 flex-col items-stretch justify-start">
          {
            <h1 className="text-left text-3xl font-bold">
              {type == 'login' ? 'Login' : 'Register'}
            </h1>
          }
          <Input
            label="Email"
            type="email"
            placeholder="Username"
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            touched={touched.email}
            errors={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            touched={touched.password}
            errors={errors.email}
          />
          <div className=" flex w-full flex-col items-center justify-center">
            {type === 'login' && (
              <>
                <Button isLoading={isLoading}>Login</Button>
                <a href="/register" className="mt-3  underline">
                  Register
                </a>
              </>
            )}
            {type === 'register' && (
              <>
                <Button isLoading={isLoading}>Register</Button>
                <a href="/login" className="mt-3 underline">
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
