import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid';
import { useBid } from '@auction-nx/client/components/dialog';

function TablePagination() {
  const { table, isLoading, isError } = useBid();

  if (isLoading || isError) return null;

  return (
    <div className="mb-4 mt-2 space-y-4 text-sm sm:flex sm:items-center sm:justify-end sm:gap-2 sm:space-y-0">
      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-lg bg-black p-1 hover:bg-indigo-600 disabled:bg-indigo-200 disabled:"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronDoubleLeftIcon className="h-5 w-5 text-white" />
        </button>
        <button
          className="rounded-lg bg-black p-1 hover:bg-indigo-600 disabled:bg-indigo-200 disabled:"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-5 w-5 text-white" />
        </button>
        <button
          className="rounded-lg bg-black p-1 hover:bg-indigo-600 disabled:bg-indigo-200 disabled:"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-5 w-5 text-white" />
        </button>
        <button
          className="rounded-lg bg-black p-1 hover:bg-indigo-600 disabled:bg-indigo-200 disabled:"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronDoubleRightIcon className="h-5 w-5 text-white" />
        </button>
        <span className="flex items-center gap-1 text-gray-700">
          <div>Page</div>
          <strong className="text-primary">
            {table.getState().pagination.pageIndex + 1 } of{' '}
            {isLoading ? '-' : table.getPageCount()}
          </strong>
        </span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="flex items-center gap-1 text-gray-700">
          <span className="hidden sm:inline-block">|</span> Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            max={table.getPageCount()}
            min={1}
            aria-disabled={!table.getPageCount()}
            disabled={!table.getPageCount()}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-20 rounded-lg border-none p-1.5 text-gray-700 "
          />
        </span>

        <Listbox
          value={table.getState().pagination.pageSize}
          onChange={table.setPageSize}
        >
          <div className="relative">
            <Listbox.Button
              aria-disabled={!table.getPageCount()}
              disabled={!table.getPageCount()}
              className="focus-visible:ring-offset-brand relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
            >
              <span className="block truncate">
                Show {table.getState().pagination.pageSize}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-200 origin-bottom ease-in"
              enterFrom="transform scale-y-95 opacity-0"
              enterTo="transform scale-y-100 opacity-100"
              leave="transition duration-100 origin-top ease-out"
              leaveFrom="transform scale-y-100 opacity-100"
              leaveTo="transform scale-y-95 opacity-0"
            >
              <Listbox.Options className="absolute top-0 -mt-1 max-h-60 w-full -translate-y-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <Listbox.Option
                    key={pageSize}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-100 text-primary' : 'text-gray-900'
                      }`
                    }
                    value={pageSize}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {pageSize}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}

export default TablePagination;
