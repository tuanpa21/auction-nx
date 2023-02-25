/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '@auction-nx/client/pages/dashboard';
import { Auth } from '@auction-nx/client/pages/auth';
import ErrorPage from '../error';
import { getToken } from '@auction-nx/client/utils';

export function App() {
  const isLoggedIn = Boolean(getToken());

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
          errorElement={<ErrorPage />}
        />
        {/*Type will be login, auth*/}
        <Route path="/:type" element={<Auth />} errorElement={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
