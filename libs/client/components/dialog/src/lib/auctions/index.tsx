import { IProps } from '../interface';
import { useAuctionsData } from './data';
import AuctionsView from './view';

export default function AuctionsDialog({ open, setOpen }: IProps) {
  const { data, isLoading, isSuccess, isError } = useAuctionsData({
    itemId: open.id,
  });
  return (
    <AuctionsView
      open={open}
      setOpen={setOpen}
      data={data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    />
  );
}
