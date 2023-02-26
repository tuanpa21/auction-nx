/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useMemo } from 'react';
import { BaseLayout } from '@auction-nx/client/components/layout';
import { Tab } from '@headlessui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Bid } from '../data/utils';
import { classNames } from '@auction-nx/client/utils';
import {
  AuctionDialog,
  BidProvider,
} from '@auction-nx/client/components/dialog';
import { AppTable, TablePagination } from '@auction-nx/client/components/table';
import { Button } from '@auction-nx/client/components/button';
import { BidDialog } from '@auction-nx/client/components/dialog';
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ColumnBidCheckButton } from './bidCheck';

const columnHelper = createColumnHelper<Bid>();

function DashboardView({
  tabs,
  open,
  setOpen,
}: {
  tabs: string[];
  open: { open: boolean; id: string; type: string };
  setOpen: ({ open, id }: { open: boolean; id: string; type: string }) => void;
}) {
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('cost', {
        header: () => 'Cost',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('status', {
        header: () => 'Status',
        cell: (info) =>
          info.getValue() === 'ON_GOING' ? (
            <p className="text-gray-500 flex gap-3 justify-center">
              <ArrowPathIcon
                className=" stroke-gray-500"
                width={20}
                height={20}
              />
            </p>
          ) : (
            <p className="text-green-500 flex gap-3 justify-center">
              <CheckCircleIcon
                className="stroke-green-500"
                width={20}
                height={20}
              />
            </p>
          ),
      }),

      columnHelper.accessor('expiredAt', {
        header: () => 'Duration',
        cell: (info) => new Date(info.getValue() as string).toUTCString(),
      }),

      columnHelper.display({
        header: 'Auctions',
        cell: (props) => (
          <Button
            onClick={() => {
              setOpen({
                open: true,
                id: props.row.original.id || '',
                type: 'auctions',
              });
            }}
          >
            View
          </Button>
        ),
      }),

      columnHelper.display({
        header: 'Bid',
        cell: (props) => (
          <ColumnBidCheckButton bid={props.row.original} setOpen={setOpen} />
        ),
      }),
    ],
    []
  );

  return (
    <BidProvider columns={columns} dataKey="items">
      <BaseLayout title="">
        <div className="px-2 py-16 sm:px-0">
          <Tab.Group>
            <div className="flex w-full justify-center">
              <Tab.List className="flex w-full  max-w-md space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabs.map((tabname) => (
                  <Tab
                    key={tabname}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {tabname}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <AppTable
                  filter={{
                    status: 'ON_GOING',
                  }}
                />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <AppTable
                  filter={{
                    status: 'COMPLETE',
                  }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <TablePagination />
        </div>
      </BaseLayout>
      {open.type === 'bid' && <BidDialog setOpen={setOpen} open={open} />}
      {open.type === 'auctions' && (
        <AuctionDialog setOpen={setOpen} open={open} />
      )}
    </BidProvider>
  );
}

export default memo(DashboardView);
