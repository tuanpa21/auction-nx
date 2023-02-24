import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().email('Invalid email address'),
  cost: yup.number().required('Start Price is required'),
  expiredAt: yup.string().required('Time Window is required'),
});
export type TCreateItem = yup.InferType<typeof validationSchema>;

export const createItemSchema = validationSchema;
