import { create } from "zustand";
import { api } from "@repo/utils/api";
import { useLoadingStore } from "./useLoadingStore";

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  shapes: [],
  documentID: "",
  isCollaborative: false,
  setIsCollaborative: (isCollaborative: boolean) => {
    set({ isCollaborative });
  },
  setDocumentID: (id: string) => {
    set({ documentID: id });
  },
  createDocument: async (slug: string) => {
    try {
      useLoadingStore.getState().setLoading(true);
      const ids = JSON.parse(sessionStorage.getItem("documentIds") || "[]");  
      
      const res = await api.post("/documents", {
        slug,
      });
      if (res.data.success === true) {
        ids.push({ id: res.data.createDoc.id, isCollaborative: res.data.createDoc.isCollaborative });
        localStorage.setItem("documentIds", JSON.stringify(ids));
        set({ documentID: res.data.createDoc.id }); 
        
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
  addShape: async (shape, documentId) => {

    try {
      console.log("from the addShape",get().documentID);
      
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
        console.log(res.data.addShape);
        return res.data.addShape;
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
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        
        return;
      }
      useLoadingStore.getState().setLoading(true);
      const res = await api.post("/documents/shapes", {
        documentId,
      });
      if (res.data.success === true) {
        return res.data.shapes;
        
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
}));

interface CanvasStore {
  createDocument: (slug: string) => void;
  documentID: string;
  isCollaborative: boolean;
  setIsCollaborative: (isCollaborative: boolean) => void;
  setDocumentID: (id: string) => void;
  shapes: Shape[];
  addShape: (shape: Shape, documentId: string) => void;
  setShapes: (shapes: Shape) => void;
  getShapes: (documentId: string) => Promise<Shape[] | []>;
}

interface Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
