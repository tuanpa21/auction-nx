
import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { TDeposit, depositSchema } from './schema';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { getAPIEndpoint } from '@auction-nx/client/utils';
import { Button } from '@auction-nx/client/components/button';
import { Input } from '@auction-nx/client/components/form';

interface Props {
  open: boolean;
  setOpen: (value: { open: boolean; id: string }) => void;
}

function DepositDialog({ open, setOpen }: Props) {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data }: { data: TDeposit }) => {
      return fetch(`${getAPIEndpoint()}/`, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
        }),
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
      toast.error('An error occurred');
    },
  });
  const onSubmit = (values: TDeposit) => {
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

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen({
            id: '',
            open: false,
          });
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between py-2 text-lg font-medium leading-6 text-gray-900"
                >
                  <p className=" font-medium">Deposit</p>
                  <XMarkIcon
                    width={25}
                    attributeName="close"
                    className=" cursor-pointer"
                    type="button"
                    onClick={() => {
                      setOpen({
                        id: '',
                        open: false,
                      });
                    }}
                  />
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 mt-2 ">
                      <Input
                        label="Amount"
                        type="number"
                        placeholder="amount"
                        id="amount"
                        name="amount"
                        onChange={handleChange}
                        value={values.amount}
                        touched={touched.amount}
                        errors={errors.amount}
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button
                        type="button"
                        className="mx-5"
                        onClick={() => {
                          setOpen({
                            id: '',
                            open: false,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className=""
                        isLoading={isLoading}
                        onClick={() => onSubmit}
                      >
                        Deposit
                      </Button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DepositDialog;
