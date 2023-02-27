import { useState } from 'react';
import { Bid } from './utils';
import { getTimeBetweenDates } from '@auction-nx/client/utils';

export function useDashboardData() {
  const [open, setOpen] = useState({
    open: false,
    id: '',
    type: '',
  });

  const tabs = ['On Going', 'Completed'];

  const bidCheck = (bid: Bid) => {
    if (bid.auctions?.length) {
      const currentItemBidDate = new Date(
        bid.updatedAt || new Date().toUTCString()
      );
      const incomingItemBidDate = new Date(new Date().toUTCString());
      const diff = getTimeBetweenDates(currentItemBidDate, incomingItemBidDate);

      return diff.seconds < 5 || bid.status === 'COMPLETE';
    } else {
      if (bid.status === 'COMPLETE') {
        return true;
      } else {
        return false;
      }
    }
  };

  return {
    tabs,
    setOpen,
    open,
    bidCheck,
  };
}
