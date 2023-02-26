import { Button } from '@auction-nx/client/components/button';
import { IBidCheckProps } from '../interface.d';
import { getTimeBetweenDates } from '@auction-nx/client/utils';
import { toast } from 'react-toastify';

export function ColumnBidCheckButton({ bid, setOpen }: IBidCheckProps) {
  return (
    <Button
      disabled={bid.status === 'COMPLETE'}
      onClick={() => {
        const currentItemBidDate = new Date(
          bid.updatedAt || bid.auctions[0].createdAt
        );
        const incomingItemBidDate = new Date(new Date().toUTCString());
        const diff = getTimeBetweenDates(
          currentItemBidDate,
          incomingItemBidDate
        );

        if (diff.seconds < 5) {
          toast.error('You cannot bid on this item for 5 seconds');
          return;
        }

        setOpen({
          open: true,
          id: bid.id || '',
          type: 'bid',
        });
      }}
    >
      Bid
    </Button>
  );
}