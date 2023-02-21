import { Button } from '@auction-nx/client/components/button';
import { Input } from '@auction-nx/client/components/form';
import { IAuthProps } from '../interface';
import { memo } from 'react';

function AuthView({
  type,
  touched,
  values,
  errors,
  handleChange,
  handleSubmit,
  isLoading,
}: IAuthProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex w-96 flex-col items-stretch justify-start">
          {
            <h1 className="text-left text-3xl font-bold">
              {type === 'login' ? 'Login' : 'Register'}
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

export default memo(AuthView);