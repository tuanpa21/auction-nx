import { getUser, http } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TDepositItem, depositSchema } from './utils';
import { IUser, useRefreshWalletStateStore } from '@auction-nx/client/data';
import { useState } from 'react';
// import { useNavigationData } from '@auction-nx/client/components/navigation';

export default function useDepositData(
  setOpen: (value: { open: boolean; id: string, type:  string }) => void
) {
  const [deposited, setDeposited] = useState(false);

  const { setRefresh } = useRefreshWalletStateStore();

  // const { refetch } = useNavigationData();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TDepositItem }) => {
      const user = getUser() as IUser;
      console.log(user);
      return http<string, any>({
        method: 'put',
        url: `wallets/${user.data.wallet.id}/deposits`,
        data: JSON.stringify(data),
      });
    },
    onSuccess(data, variables, context) {
      toast.success('Successful');
      setOpen({
        id: '',
        open: false,
        type: '',
      });
      setRefresh();
    },
    onError(error, variables, context) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error(`An error occurred`);
    },
  });
  const onSubmit = (values: TDepositItem) => {
    console.log(values);
    mutate({
      data: values,
    });
  };

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    enableReinitialize: true,
    validationSchema: depositSchema,
    onSubmit,
  });

  const { touched, values, errors, handleChange, handleSubmit } = formik;

  return {
    deposited,
    setDeposited,
    isLoading,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
