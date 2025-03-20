import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  error: string | null;
  msg: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMsg: (msg: string | null) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  error: null,
  msg: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMsg: (msg) => set({ msg }),
}));