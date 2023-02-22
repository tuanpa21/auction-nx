import { TDepositItem } from './data/utils';
import { IProps } from '../interface';

interface IDeposit extends IProps {
  isLoading: boolean;
  touched: FormikTouched<TDepositItem>;
  values: TDepositItem;
  errors: FormikErrors<TDepositItem>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}
