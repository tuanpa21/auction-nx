/* eslint-disable react/jsx-no-useless-fragment */
import { Route, Routes, Link } from 'react-router-dom';
import { Dashboard } from '@auction-nx/client/pages/dashboard';
import { Auth } from '@auction-nx/client/pages/auth';
import ErrorPage from '../error';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} errorElement={<ErrorPage />} />
        {/*For login/register*/}
        <Route path="/:type" element={<Auth />} errorElement={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
