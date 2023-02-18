import { z } from 'zod';

const accountSchema = z.object({
  email: z.string().optional(),
  balance: z.number().optional(),
});

export type Account = z.infer<typeof accountSchema>;
