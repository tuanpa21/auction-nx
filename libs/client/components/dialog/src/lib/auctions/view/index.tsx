import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { IProps } from "../../interface";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IItemAuctionData } from "../interface";


export default function AuctionsDialog({ open, setOpen, data, isLoading, isError, isSuccess }: IItemAuctionData) {
    return (
        <Transition appear show={open.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setOpen({
            id: 'auctions',
            open: false,
            type: '',
          });
        }}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between py-2 text-lg font-medium leading-6 text-gray-900"
                >
                  <p className=" font-medium">Auctions</p>
                  <XMarkIcon
                    width={25}
                    attributeName="close"
                    className=" cursor-pointer"
                    type="button"
                    onClick={() => {
                      setOpen({
                        id: 'auctions',
                        open: false,
                        type: '',
                      });
                    }}
                  />
                </Dialog.Title>
                  <div className="mt-2 flex justify-center w-full">
                  {
                        isLoading &&  <p>Loading...</p>
                    }
                    {
                        isError && <p>Error...</p>
                    }
                    {
                        (isSuccess  && data && data?.length === 0) && <p>No auctions found yet!...</p>
                    }
                    {
                        (isSuccess  && data && data?.length > 0) && 
                            (
                                <table className="col-span-2 mt-2 border border-slate-500 w-full">
                                    <thead>
                                        <tr>
                                            <th align="center" className="border border-slate-600">User</th>
                                            <th align="center" className="border border-slate-600">Bid Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr key={item.id}>
                                                <td align="center" className="p-2 border">{item.id}</td>
                                                <td align="center" className="border">{item.cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
    
                        }
                        
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}