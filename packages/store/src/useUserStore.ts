import { create } from "zustand";

export const useUserStore = create<userStore>((set, get) => ({
    user: null,
    document: null,
    isCollaborative: false,
    setUser: (user) => {
        set({user})

        
    },
    setDocument: (data) => set({document: data})
}))

type User = {
    id: string,
    name?: string;
    email?: string;
    jwt?: string;
    photo?: string;
}

type Document = {
    id: string;
    title: string | "title";
}
interface userStore {
    user: User | null,
    document: Document | null;
    setUser: (user: User) => void;
    setDocument: (data: Document) => void;
}