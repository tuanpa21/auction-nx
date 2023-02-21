export interface IProps {
  email: string;
  password: string;
}

export interface IAuthProps {
  type?: string;
  isLoading: boolean;
  touched: FormikTouched<IProps>;
  values: IProps;
  errors: FormikErrors<IProps>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}
