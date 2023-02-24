import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, memo } from 'react';

import { Button } from '@auction-nx/client/components/button';
import { Input } from '@auction-nx/client/components/form';
import { ICreate } from '../interface';

function CreateItemDialog({
  open,
  setOpen,
  touched,
  values,
  errors,
  handleChange,
  setFieldValue,
  handleSubmit,
  isLoading,
}: ICreate) {
  return (
    <Transition appear show={open.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen({
            id: '',
            open: false,
            type: '',
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
                  <p className=" font-medium">Create Item</p>
                  <XMarkIcon
                    width={25}
                    attributeName="close"
                    className=" cursor-pointer"
                    type="button"
                    onClick={() => {
                      setOpen({
                        id: '',
                        open: false,
                        type: '',
                      });
                    }}
                  />
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 mt-2">
                      <Input
                        label="Name"
                        type="text"
                        placeholder="name"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        touched={touched.name}
                        errors={errors.name}
                      />
                      <Input
                        label="Start Price"
                        type="number"
                        placeholder="start price"
                        id="cost"
                        name="cost"
                        onChange={handleChange}
                        value={values.cost}
                        touched={touched.cost}
                        errors={errors.cost}
                      />
                      <Input
                        label="Time Window"
                        type="date"
                        placeholder="time window"
                        id="expired_at"
                        name="expired_at"
                        onChange={(e) => {
                          setFieldValue('expiredAt', e.target.value);
                        }}
                        value={values.expiredAt}
                        touched={touched.expiredAt}
                        errors={errors.expiredAt}
                      />
                    </div>

                    <div className="col-span-2 flex justify-end">
                      <Button
                        type="button"
                        className="mx-5 mt-10"
                        onClick={() => {
                          setOpen({
                            id: '',
                            open: false,
                            type: '',
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="mt-10"
                        isLoading={isLoading}
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

export default memo(CreateItemDialog);
