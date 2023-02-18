import { ReactNode, createContext, useContext } from 'react';
import { Account } from '@auction-nx/client/data';

interface BidState {
  data: Account;
}

const BidStateContext = createContext<BidState | undefined>(undefined);

export function useBid() {
  const context = useContext(BidStateContext);

  if (typeof context === 'undefined')
    throw new Error('useBid must be used within a BidProvider');

  return context as BidState;
}

interface BidProviderProps {
  children: ReactNode;
  account?: Account;
}

export default function BidProvider({ children, account }: BidProviderProps) {
  //TODO: query auctions
  // TODO: query user account

  return (
    <BidStateContext.Provider
      value={{
        data: {},
      }}
    ></BidStateContext.Provider>
  );
}
