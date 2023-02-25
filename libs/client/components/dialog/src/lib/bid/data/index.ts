import { getAPIEndpoint, http } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TBid, bidSchema } from './utils';

export default function useBidData(
  open: {
    open: boolean;
    id: string;
    type: string;
  },
  setOpen: (value: { open: boolean; id: string, type: string }) => void
) {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TBid }) => {
      console.log(data);
      return http<string, any>({
        method: 'post',
        url: `items/auction`,
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
      itemId: open.id,
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
