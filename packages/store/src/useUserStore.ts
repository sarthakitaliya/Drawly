import { create } from "zustand";

export const useUserStore = create<userStore>((set, get) => ({
    user: null,
    setUser: (user) => {
        set({user})
    },
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
    setUser: (user: User) => void;
}