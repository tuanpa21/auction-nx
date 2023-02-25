/* eslint-disable react/jsx-no-useless-fragment */
import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from '@auction-nx/client/pages/dashboard';
import { Auth } from '@auction-nx/client/pages/auth';
import ErrorPage from '../error';
import { dashboard, home } from './interface.d';
import WithAuth from './hoc';

export function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path={home}
          element={<WithAuth children={<Dashboard/>} /> }
        />
        <Route
          path={dashboard}
          element={<Dashboard />}
          errorElement={<ErrorPage />}
        />
        {/*Type will be login, auth*/}
        <Route path="/login" element={<Auth />} errorElement={<ErrorPage />} />
        <Route path="/register" element={<Auth />} errorElement={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
