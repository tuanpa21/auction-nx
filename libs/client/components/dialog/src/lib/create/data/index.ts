import { getAPIEndpoint } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TCreateItem, createItemSchema } from './utils';

export const useCreateData = (
  setOpen: (value: { open: boolean; id: string }) => void
) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TCreateItem }) => {
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
  const onSubmit = (values: TCreateItem) => {
    console.log(values);
    mutate({
      data: values,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      start_price: 0,
      time_window: '',
    },
    enableReinitialize: true,
    validationSchema: createItemSchema,
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
};
