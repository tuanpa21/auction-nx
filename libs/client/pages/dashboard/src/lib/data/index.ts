import { addSeconds, getExpiresIn } from '@auction-nx/client/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useDashboardData() {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    open: false,
    id: '',
    type: '',
  });
  useEffect(() => {
    if(!getExpiresIn()) navigate('/login');
    if (
      addSeconds(new Date(), parseInt(getExpiresIn() || '0')).getTime() <
      new Date().getTime()
    )
      navigate('/login');
  }, []);
  const tabs = ['On Going', 'Completed'];

  return {
    tabs,
    setOpen,
    open,
  };
}
