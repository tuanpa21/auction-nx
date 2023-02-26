import React from 'react';

export interface IProps {
  email: string;
  password: string;
}

type TAuthType = '/login' | '/register';

export interface IAuthProps {
  pathname?: TAuthType;
  isLoading: boolean;
  touched: FormikTouched<IProps>;
  values: IProps;
  errors: FormikErrors<IProps>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export interface IAuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    expireIns: number;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      gender: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
