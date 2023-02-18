import * as yup from 'yup';

const accountSchema = yup.object().shape({
  email: yup.string().optional(),
  balance: yup.number().optional(),
});

export type Account = yup.InferType<typeof accountSchema>;
