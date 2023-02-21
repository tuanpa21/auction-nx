import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'Password must be at least 8 characters',
      (value) => value.length >= 8
    ),
});
export type Authentication = yup.InferType<typeof validationSchema>;

export const authenticationSchema = validationSchema;
