import { getAPIEndpoint, httpClient } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TBid, bidSchema } from './utils';
import { useBid } from '../bidprovider';

export default function useBidData(
  open: {
    open: boolean;
    id: string;
    type: string;
  },
  setOpen: (value: { open: boolean; id: string; type: string }) => void
) {
  const { refetch } = useBid();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TBid }) => {
      console.log(data);
      return httpClient<string, any>({
        method: 'put',
        url: `items/${open.id}`,
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
      refetch();
    },
    onError(error, variables, context) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('An error occurred');
    },
  });
  const onSubmit = (values: TBid) => {
    console.log(values);
    mutate({
      data: values,
    });
  };

  const formik = useFormik({
    initialValues: {
      cost: 0,
    },
    enableReinitialize: true,
    validationSchema: bidSchema,
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
