/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useMemo, useState } from 'react';
import { BaseLayout } from '@auction-nx/client/components/layout';
import { Tab } from '@headlessui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Bid } from '../data/utils';
import { classNames } from '@auction-nx/client/utils';
import { AuctionDialog, BidProvider } from '@auction-nx/client/components/dialog';
import { AppTable } from '@auction-nx/client/components/table';
import { Button } from '@auction-nx/client/components/button';
import { BidDialog } from '@auction-nx/client/components/dialog';

const columnHelper = createColumnHelper<Bid>();

function DashboardView({
  tabs,
  open,
  setOpen,
}: {
  tabs: string[];
  open: { open: boolean; id: string, type: string };
  setOpen: ({ open, id }: { open: boolean; id: string, type: string }) => void;
}) {
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('name', {
        header: () => 'Current Price',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('cost', {
        header: () => 'Cost',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('expiredAt', {
        header: () => 'Duration',
        cell: (info) => new Date(info.getValue() as string).toUTCString(),
      }),

      columnHelper.display({
        header: 'Bid',
        cell: (props) => (
          <Button
            onClick={() => {
              setOpen({ open: true, id: props.row.original.id || '', type: 'bid' });
            }}
          >
            Bid
          </Button>
        ),
      }),

      columnHelper.display({
        header: 'Auctions',
        cell: (props) => (
          <Button
            onClick={() => {
              setOpen({ open: true, id: props.row.original.id || '', type: 'auctions' });
            }}
          >
            View
          </Button>
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
                <AppTable filter={'ON_GOING'} />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <AppTable filter={'COMPLETED'} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </BaseLayout>
     {open.type === 'bid' && <BidDialog setOpen={setOpen} open={open} />}
     {open.type === 'auctions' && <AuctionDialog setOpen={setOpen} open={open} />}
    </BidProvider>
  );
}

export default memo(DashboardView);
