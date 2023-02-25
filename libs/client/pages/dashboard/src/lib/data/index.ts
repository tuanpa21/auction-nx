import { useState } from 'react';

export function useDashboardData() {
  const [open, setOpen] = useState({
    open: false,
    id: '',
    type: '',
  });

  const tabs = ['On Going', 'Completed'];

  return {
    tabs,
    setOpen,
    open,
  };
}
