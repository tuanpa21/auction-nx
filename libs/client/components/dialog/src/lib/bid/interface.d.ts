import { IProps } from '../interface';

export interface IBid extends IProps {
  isLoading: boolean;
  touched: FormikTouched<TDepositItem>;
  values: TDepositItem;
  errors: FormikErrors<TDepositItem>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}
