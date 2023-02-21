import { useParams } from 'react-router-dom';

import { useAuthData } from './data/index';
import AuthView from './view/index';

export default function Auth() {
  const { type } = useParams();

  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useAuthData(type);

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
