

import * as yup from 'yup';

const bidSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().optional(),
  current_price: yup.number().optional(),
  duration: yup.number().optional()
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