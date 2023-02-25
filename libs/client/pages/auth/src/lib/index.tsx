import { useParams } from 'react-router-dom';

import { useAuthData } from './data';
import AuthView from './view/index';

export default function Auth() {
  const { type } = useParams();

  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useAuthData(type);

  if (type !== 'login' && type !== 'register') {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>The page you're trying to access isn't exist.</p>
      </div>
    );
  }

  return (
    <AuthView
      type={type}
      touched={touched}
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
