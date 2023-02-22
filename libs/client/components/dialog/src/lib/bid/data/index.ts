import { getAPIEndpoint } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TBid, bidSchema } from './utils';

export default function useBidData(
  setOpen: (value: { open: boolean; id: string }) => void
) {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TBid }) => {
      //   return fetch(`${getAPIEndpoint()}/`, {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       ...data,
      //     }),
      //   });

      return fetch('https://jsonplaceholder.typicode.com/todos/1');
    },
    onSuccess(data, variables, context) {
      toast.success('Successful');
      setOpen({
        id: '',
        open: false,
      });
    },
    onError(error, variables, context) {
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
      price: 0,
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
