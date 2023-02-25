import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required').test('name', 'Name should be unique', (value) => value?.length > 0),
  cost: yup.number().required('Start Price is required'),
  expiredAt: yup.string().required('Time Window is required').test(
    'expiredAt',
    'Date Time Window should be greater than current date and time',
    (value) => {
    const date = new Date(value);
    return date.getTime() > Date.now();
  }),
});
export type TCreateItem = yup.InferType<typeof validationSchema>;

export const createItemSchema = validationSchema;
