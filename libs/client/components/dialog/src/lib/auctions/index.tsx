import { IProps } from '../interface';
import { useAuctionsData } from './data';
import AuctionsDialog from './view';

export default function AuctionsView({ open, setOpen }: IProps) {
   const { data, isLoading, isSuccess, isError } = useAuctionsData({itemId: open.id});
   return ( <AuctionsDialog
      open={open}
      setOpen={setOpen}
      data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
    />
  );
}
