export interface IUser {
  data: {
    id: string;
    name: string;
    role: string;
    email: string;
    status: string;
    created_at: string;
    updated_at: string;
    wallet: IWallet;
  };
}

interface IWallet {
  id: string;
  amount: number;
  userId: string;
}
