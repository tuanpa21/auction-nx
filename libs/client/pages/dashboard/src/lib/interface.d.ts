import Bid from './data/utils';

export interface IBidData {
  id: string;
  name: Bid[];
  description: string;
}

export interface IDashboardProps {
  categories: IBidData[];
}

export interface APIResponse<K> {
  message?: string;
  data: {
    data: K;
    meta?: {
      total?: number;
      lastPage?: number;
      currentPage?: number;
      perPage?: number;
      prev?: number;
      next?: number;
    };
  };
}
