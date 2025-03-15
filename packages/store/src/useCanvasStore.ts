import { create } from "zustand";
import {api} from "@repo/utils/api"

export const useCanvasStore = create<CanvasStore>((set, get) => ({
    documentID: "",
    createDocument: async (slug: string) => {
        const document: {
            id: string;
            slug: string|undefined;
            ownerID: string;
            isPublic: boolean;
            createdAt: string;
        } = await api.post("/documents", {
            slug,
        });
        set({ documentID: document.id });
    },
    setDocumentID: (documentID) => {
        set({ documentID });
    },
}));


interface CanvasStore {
    createDocument: (slug: string) => void;
    documentID: string;
    setDocumentID: (documentID: string) => void;
}