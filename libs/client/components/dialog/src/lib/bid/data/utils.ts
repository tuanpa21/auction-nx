import * as yup from 'yup';

const validationSchema = yup.object().shape({
  cost: yup.number().required('Amount is required'),
});
export type TBid = yup.InferType<typeof validationSchema>;

export const bidSchema = validationSchema;
