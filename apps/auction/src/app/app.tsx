/* eslint-disable react/jsx-no-useless-fragment */
import { Route, Routes, Link } from 'react-router-dom';
import { Dashboard } from '@auction-nx/client/pages/dashboard';
import { Auth } from '@auction-nx/client/pages/auth';
import ErrorPage from '../error';

export function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Link to="/login">Login</Link>}
          errorElement={<ErrorPage />}
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
