import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validationSchema = z.object({
  price: z.number({
    required_error: 'Amount is required',
  }),
});
export type TBid = z.infer<typeof validationSchema>;

export const bidSchema = toFormikValidationSchema(validationSchema);
