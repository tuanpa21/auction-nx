import { create } from 'zustand';

export interface RefreshWalletState {
  refresh: boolean;
  setRefresh: () => void;
}

export const useRefreshWalletStateStore = create<RefreshWalletState>((set) => ({
  refresh: false,
  setRefresh() {
    set((state) => ({
      refresh: !state.refresh,
    }));
  },
}));
