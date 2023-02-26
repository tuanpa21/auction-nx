import { Button } from '@auction-nx/client/components/button';
import { Input } from '@auction-nx/client/components/form';
import { IAuthProps } from '../interface';
import { memo } from 'react';
import { ROUTES } from '@auction-nx/client/utils';
import { Link } from 'react-router-dom';

function AuthView({
  pathname,
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
              {pathname === ROUTES.login ? 'Login' : 'Register'}
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
            errors={errors.password}
            autoComplete="password"
          />
          <div className=" flex w-full flex-col items-center justify-center">
            {pathname === ROUTES.login && (
              <>
                <Button isLoading={isLoading} type="submit" className="mt-10">
                  Login
                </Button>
                <Link to={ROUTES.register} className="mt-3  underline">
                  Register
                </Link>
              </>
            )}
            {pathname === '/register' && (
              <>
                <Button isLoading={isLoading} type="submit" className="mt-10">
                  Register
                </Button>
                <Link to={ROUTES.login} className="mt-3 underline">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(AuthView);
