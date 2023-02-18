import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .refine(value => value.length >= 8, {
      message: 'Password must be at least 8 characters',
    }),
});
export type Authentication = z.infer<typeof validationSchema>;

export const authenticationSchema = toFormikValidationSchema(validationSchema);
