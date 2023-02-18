import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validationSchema = z.object({
  amount: z.number({
    required_error: 'Amount is required',
  }),
});
export type TDeposit = z.infer<typeof validationSchema>;

export const depositSchema = toFormikValidationSchema(validationSchema);
