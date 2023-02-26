import { Link, useRouteError } from 'react-router-dom';
import { ROUTES } from '@auction-nx/client/utils';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link to={ROUTES.home} className=" underline">
        Go to home
      </Link>
    </div>
  );
}
