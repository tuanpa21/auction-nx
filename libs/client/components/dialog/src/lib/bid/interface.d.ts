import { IProps } from '../interface';

export interface IBid extends IProps {
  isLoading: boolean;
  touched: FormikTouched<TDepositItem>;
  values: TDepositItem;
  errors: FormikErrors<TDepositItem>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export interface IAuctionItem {
  id: string;
  name: string;
  cost: number;
  status: string;
  userId: string;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  auctions: [];
}

export interface IAuctionItems<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: number;
    next?: number;
  };
}

type TFilter = 'ON_GOING' | 'COMPLETE';

export type Filter = {
  status: TFilter,
  name?: string | undefined,
  cost?: number | undefined,
}

