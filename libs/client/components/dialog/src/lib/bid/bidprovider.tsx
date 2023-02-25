import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
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
import { Filter, IAuctionItems } from './interface';

interface BidState<T> {
  table: Table<T>;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown | null;
  pageIndex: number;
  pageSize: number;
  refetch: () => void;
  setFilters: (val: Filter) => void;
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
  dataKey: string;
  setFilters?: (val: Filter) => void;
  parseData?: (data: unknown) => T[];
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export function BidProvider<T>({
  children,
  columns,
  dataKey,
}: BidProviderProps<T>) {
  //TODO: query auctions
  // TODO: query user account
  const [filters, setFilters] = useState<Filter>({
    status: 'ON_GOING',
    name: undefined,
    cost: undefined,
  });
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const { data, isSuccess, isLoading, isError, error, refetch } = useQuery({
    queryKey: [dataKey, pageIndex, pageSize, filters],
    retry: false,
    queryFn: async () => {
      const response = await http<string, IAuctionItems<T>>({
        method: 'get',
        url: `${dataKey}?page=${
          pageIndex + 1
        }&size=${pageSize}&search=${JSON.stringify(filters)}`,
      });

      return response;
    },
  });

  const table = useReactTable<T>({
    data: data?.data || ([] as T[]),
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data ? data.meta.lastPage : -1,
    state: {
      pagination,
    },
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
        pageIndex,
        pageSize,
        setFilters,
        data: data?.data,
      }}
    >
      {children}
    </BidStateContext.Provider>
  );
}
