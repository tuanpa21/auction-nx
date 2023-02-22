import { FormikTouched } from 'formik';
import { TCreateItem } from './utils';
import { IProps } from '../interface';

export interface ICreate extends IProps {
  isLoading: boolean;
  touched: FormikTouched<TCreateItem>;
  values: TCreateItem;
  errors: FormikErrors<TCreateItem>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}
