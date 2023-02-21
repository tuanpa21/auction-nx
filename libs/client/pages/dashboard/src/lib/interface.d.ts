import Bid from './data/utils';

export interface IBidData {
  id: string;
  name: Bid[];
  description: string;
}

export interface IDashboardProps {
  categories: IBidData[];
}
