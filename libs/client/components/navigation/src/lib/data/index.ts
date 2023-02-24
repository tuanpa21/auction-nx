import { http, setUser } from '@auction-nx/client/utils';
import { IUser } from '@auction-nx/client/data';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useNavigationData() {
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['navigation'],
    queryFn: async () => {
      const response = await http<string, IUser>({
        method: 'get',
        url: `users/info`,
      });
      if (response?.data) setUser(response.data);

      return response;
    },
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
}
