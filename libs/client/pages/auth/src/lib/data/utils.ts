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
      'password',
      'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
    ),
});
export type Authentication = yup.InferType<typeof validationSchema>;

export const authenticationSchema = validationSchema;
