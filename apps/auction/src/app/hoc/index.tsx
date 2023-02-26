import { getUser } from '@auction-nx/client/utils';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { ROUTES } from '@auction-nx/client/utils';

interface IProps {
  children: JSX.Element;
}

function WithAuth({ children }: IProps) {
  const isLoggedIn = Boolean(getUser());

  // If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!isLoggedIn) redirect(ROUTES.login);
  }, [isLoggedIn]);

  // Otherwise, navigate to child component
  return children;
}

export default WithAuth;
