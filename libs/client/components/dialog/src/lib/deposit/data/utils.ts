import * as yup from 'yup';

const validationSchema = yup.object().shape({
  amount: yup.number().required('Amount is required'),
});
export type TDepositItem = yup.InferType<typeof validationSchema>;

export const depositSchema = validationSchema;
