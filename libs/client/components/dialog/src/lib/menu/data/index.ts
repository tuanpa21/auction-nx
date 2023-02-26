import { httpClient, removeUser, ROUTES } from '@auction-nx/client/utils';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useMenuData() {
  const navigate = useNavigate();
  const { isLoading, mutate: logoutMutation } = useMutation({
    mutationFn: () => {
      return httpClient<string, any>({
        method: 'post',
        url: `auth/sign-out`,
      });
    },
    onSuccess(data, variables, context) {
      toast.success('Successful');
      removeUser();
      navigate(ROUTES.login);
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
    logoutMutation();
  };

  return {
    isLoading,
    onLogout,
  };
}
