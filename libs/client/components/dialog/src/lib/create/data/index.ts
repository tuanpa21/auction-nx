import { http } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TCreateItem, createItemSchema } from './utils';
import { ICreateItemRes } from '../interface';
import { useBid } from '../../bid/bidprovider';

export const useCreateData = (
  setOpen: (value: { open: boolean; id: string; type: string }) => void
) => {
  const { refetch } = useBid();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TCreateItem }) => {
      data.expiredAt = new Date(data.expiredAt).toISOString();
      return http<string, ICreateItemRes>({
        method: 'post',
        url: `items`,
        data: JSON.stringify(data),
      });
    },
    onSuccess(data, variables, context) {
      if (data?.data.id) {
        toast.success('Successful');
        setOpen({
          id: '',
          open: false,
          type: '',
        });
        refetch();
      }
    },
    onError(error, variables, context) {
      toast.error('An error occurred');
    },
  });
  const onSubmit = (values: TCreateItem) => {
    console.log(values);
    mutate({
      data: values,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      cost: 0,
      expiredAt: '',
    },
    enableReinitialize: true,
    validationSchema: createItemSchema,
    onSubmit,
  });

  const { touched, values, errors, handleChange, handleSubmit, setFieldValue } =
    formik;

  console.log(values);

  return {
    isLoading,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
  };
};
