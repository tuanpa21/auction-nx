import { getToken } from '@auction-nx/client/utils';
import { useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import { login } from '../interface.d';

interface IProps {
    children: JSX.Element;
}

function WithAuth({ children }: IProps) {
    const isLoggedIn = Boolean(getToken());
     
    // If user is not authenticated, redirect to login page
      useEffect(() => {
        if(!isLoggedIn) redirect(login)
      }, [isLoggedIn])

      // Otherwise, navigate to child component
      return children

};

export default WithAuth;
