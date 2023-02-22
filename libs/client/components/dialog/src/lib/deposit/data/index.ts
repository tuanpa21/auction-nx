import { getAPIEndpoint, getUser, http } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TDepositItem, depositSchema } from './utils';

export default function useDepositData(
  setOpen: (value: { open: boolean; id: string }) => void
) {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TDepositItem }) => {
        //TODO: remove any type
        return http<string, any >({
            method: 'post',
            url: `wallets/${getUser().id}/deposits`,
            data: JSON.stringify(data),
          });
    },
    onSuccess(data, variables, context) {
      toast.success('Successful');
      setOpen({
        id: '',
        open: false,
      });
    },
    onError(error, variables, context) {
        if(error instanceof Error){
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
    isLoading,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
