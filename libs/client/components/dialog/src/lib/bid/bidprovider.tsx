import { ReactNode, createContext, useContext } from 'react';
import { Account } from '@auction-nx/client/data';
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { http } from '@auction-nx/client/utils';

interface BidState<T> {
  table: Table<T>;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown | null;
  // pageIndex: number;
  // pageSize: number;
  refetch: () => void;
  data?: unknown[];
}

const BidStateContext = createContext<BidState<unknown> | undefined>(undefined);

export function useBid<T>() {
  const context = useContext(BidStateContext);

  if (typeof context === 'undefined')
    throw new Error('useBid must be used within a BidProvider');

  return context as BidState<T>;
}

interface BidProviderProps<T> {
  children: ReactNode;
  columns: ColumnDef<T, any>[];
  account?: Account;
  dataKey: string;
  parseData?: (data: unknown) => T[];
}

export default function BidProvider<T>({
  children,
  account,
  columns,
  dataKey,
}: BidProviderProps<T>) {
  //TODO: query auctions
  // TODO: query user account

  const { data, isSuccess, isLoading, isError, error, refetch } = useQuery({
    queryKey: [dataKey],
    queryFn: async () => {
      const response = await http<T>({
        method: 'GET',
        url: `/auctions`,
      });

      return response;
    },
  });

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <BidStateContext.Provider
      value={{
        table: table as unknown as Table<unknown>,
        isSuccess,
        isLoading,
        isError,
        error,
        refetch,
      }}
    >
      {children}
    </BidStateContext.Provider>
  );
}
