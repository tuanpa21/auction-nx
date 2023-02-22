import * as yup from 'yup';

const bidSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().optional(),
  cost: yup.number().optional(),
  userId: yup.string().optional(),
  status: yup.string().optional(),
  expiredAt: yup.string().optional(),
  auctions: yup.array().optional(),
  createdAt: yup.string().optional(),
  updatedAt: yup.string().optional(),
});

export type Bid = yup.InferType<typeof bidSchema>;

export function parseToken(data: unknown): Bid {
  return bidSchema.cast(data);
}

export function parseChains(data: unknown): Bid[] {
  if (!Array.isArray(data)) {
    throw new Error('chains is not a list.');
  }

  return data.map(parseToken);
}
