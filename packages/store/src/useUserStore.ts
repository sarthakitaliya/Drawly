import { create } from "zustand";

export const useUserStore = create<userStore>((set, get) => ({
    user: null,
    setUser: (user: User | null) => {
        set({user})
    },
    logoutUser: () => {
        set({user: null})
        localStorage.clear();
    }
}))

type User = {
    id: string,
    name?: string;
    email?: string;
    jwt?: string;
    photo?: string;
}

interface userStore {
    user: User | null,
    setUser: (user: User | null) => void;
    logoutUser: () => void;
}