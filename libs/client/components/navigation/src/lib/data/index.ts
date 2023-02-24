import { http, setUser } from '@auction-nx/client/utils';
import { IUser, useRefreshWalletStateStore } from '@auction-nx/client/data';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useNavigationData() {
  const { refresh, setRefresh } = useRefreshWalletStateStore();
  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryKey: ['navigation'],
    queryFn: async () => {
      const response = await http<string, IUser>({
        method: 'get',
        url: `users/info`,
      });
      if (response) setUser(response);

      return response;
    },
  });

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh();
    }
  }, [refetch, refresh, setRefresh]);

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    refetch,
  };
}
