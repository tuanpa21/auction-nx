import { http } from '@auction-nx/client/utils';
import { useQuery } from '@tanstack/react-query';
import { IItemAuction } from '../interface';

export function useAuctionsData({ itemId }: { itemId: string}) {
  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryKey: ['auctions'],
    queryFn: async () => {
      const response = await http<string, { data: IItemAuction[]}>({
        method: 'get',
        url: `items/auctions/${itemId}`
      });
      return response?.data;
    },
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    refetch,
  };
}
