import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validationSchema = z.object({
  name: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  start_price: z.number({
    required_error: 'Start Price is required',
  }),
  time_window: z
    .string({
      required_error: 'Time Window is required',
    })
    .datetime(),
});
export type TCreateItem = z.infer<typeof validationSchema>;

export const createItemSchema = toFormikValidationSchema(validationSchema);
