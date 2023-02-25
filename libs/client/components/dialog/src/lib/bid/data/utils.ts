import * as yup from 'yup';

const validationSchema = yup.object().shape({
  itemId: yup.string().required('Item is required'),
  cost: yup.number().required('Amount is required'),
});
export type TBid = yup.InferType<typeof validationSchema>;

export const bidSchema = validationSchema;
