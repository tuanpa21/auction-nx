/* eslint-disable react/jsx-no-useless-fragment */
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '@auction-nx/client/pages/dashboard';
import { Auth } from '@auction-nx/client/pages/auth';
import ErrorPage from '../error';
import WithAuth from './hoc';
import { ROUTES } from '@auction-nx/client/utils';

export function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path={ROUTES.home}
          element={<WithAuth children={<Dashboard />} />}
        />
        <Route
          path={ROUTES.dashboard}
          element={<Dashboard />}
          errorElement={<ErrorPage />}
        />
        <Route
          path={ROUTES.login}
          element={<Auth />}
          errorElement={<ErrorPage />}
        />
        <Route
          path={ROUTES.register}
          element={<Auth />}
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
