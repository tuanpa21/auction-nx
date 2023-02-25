import { httpClient, removeToken } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useMenuData() {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      return httpClient<string, any>({
        method: 'post',
        url: `auth/sign-out`,
      });
    },
    onSuccess(data, variables, context) {
      toast.success('Successful');
      navigate('/login');
      removeToken();
    },
    onError(error, variables, context) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('An error occurred');
    },
  });

  const onLogout = () => {
    console.log('logout');
    mutate();
  };

  console.log(isLoading);

  return {
    isLoading,
    onLogout,
  };
}
