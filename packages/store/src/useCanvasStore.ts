import { create } from "zustand";
import { api } from "@repo/utils/api";
import { useLoadingStore } from "./useLoadingStore";

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  documentID: "",
  shapes: [],
  setDocumentID: (documentID) => {
    set({ documentID });
    console.log("Document ID", documentID);
  },
  createDocument: async (slug: string) => {
    try {
      useLoadingStore.getState().setLoading(true);
      const res = await api.post<response>("/documents", {
        slug,
      });
      if (res.data.success === true) {
        set({ documentID: res.data.createDoc.id });
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
      set({ documentID: "" });
    }
  },
  addShape: async (shape: Shape) => {
    const documentID = get().documentID;
    console.log("Document ID", documentID);

    try {
      if (!documentID) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      useLoadingStore.getState().setLoading(true);
      const res = await api.post("/documents/add-shape", {
        documentId: documentID,
        shape: shape,
      });
      if (res.data.success === true) {
        console.log("Shape added successfully");
        console.log(res.data);

        set({ shapes: [...get().shapes, shape] });
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
  setShapes: (shapes) => {
    set({ shapes: [...get().shapes, shapes] });
    console.log("Shapes----------", get().shapes);
  },
  getShapes: async () => {
    const documentID = get().documentID;
    try {
      if (!documentID) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      useLoadingStore.getState().setLoading(true);
      const res = await api.post("/documents/shapes", {
        documentId: documentID,
      });
      if (res.data.success === true) {
        console.log("Shapes fetched successfully");
        console.log(res.data);
        set({ shapes: [...get().shapes, res.data.shapes] });
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
}));

interface response {
  success: boolean;
  createDoc: {
    id: string;
    ownerId: string;
    slug: string;
  };
  message: string;
}
interface CanvasStore {
  createDocument: (slug: string) => void;
  documentID: string;
  setDocumentID: (documentID: string) => void;
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  setShapes: (shapes: Shape) => void;
  getShapes: () => void;
}

interface Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
