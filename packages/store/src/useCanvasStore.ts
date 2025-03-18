import { create } from "zustand";
import { api } from "@repo/utils/api";
import { useLoadingStore } from "./useLoadingStore";

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  shapes: [],
  documentID: "",
  setDocumentID: (id: string) => {
    set({ documentID: id });
  },
  createDocument: async (slug: string) => {
    try {
      useLoadingStore.getState().setLoading(true);
      const ids = JSON.parse(sessionStorage.getItem("documentIds") || "[]");  
      
      const res = await api.post<response>("/documents", {
        slug,
      });
      if (res.data.success === true) {
        ids.push(res.data.createDoc.id);
        sessionStorage.setItem("documentIds", JSON.stringify(ids));
        set({ documentID: res.data.createDoc.id });
        
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
  addShape: async (shape: Shape, documentId: string) => {

    try {
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      useLoadingStore.getState().setLoading(true);
      const res = await api.post("/documents/add-shape", {
        documentId,
        shape: shape,
      });
      if (res.data.success === true) {
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
  },
  getShapes: async (documentId: string) => {
    try {
      console.log("from the store",get().documentID);
      
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        
        return;
      }
      useLoadingStore.getState().setLoading(true);
      const res = await api.post("/documents/shapes", {
        documentId,
      });
      if (res.data.success === true) {
        // console.log("Shapes fetched successfully");
        // console.log(res.data);
        return res.data.shapes;
        
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
  setDocumentID: (id: string) => void;
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  setShapes: (shapes: Shape) => void;
  getShapes: (documentId: string) => Promise<Shape[] | null>;
}

interface Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
