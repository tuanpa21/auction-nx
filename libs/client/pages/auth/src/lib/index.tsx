import { Link, useLocation } from 'react-router-dom';

import { useAuthData } from './data';
import AuthView from './view/index';
import { TAuthType } from './interface';
import { ROUTES } from '@auction-nx/client/utils';

export default function Auth() {
  const { pathname } = useLocation();

  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useAuthData(pathname as TAuthType);

  if (pathname !== ROUTES.login && pathname !== ROUTES.register) {
    return (
      <div className=" w-full h-screen flex flex-col justify-center items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link to="/" className=" underline">
          Go to home
        </Link>
        <p>{/* <i>{error.statusText || error.message}</i> */}</p>
      </div>
    );
  }

  return (
    <AuthView
      pathname={pathname as TAuthType}
      touched={touched}
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
