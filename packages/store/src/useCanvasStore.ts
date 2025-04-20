import { create } from "zustand";
import { api } from "@repo/utils/api";
import { useLoadingStore } from "./useLoadingStore";

export const useCanvasStore = create<CanvasStore>((set, get) => ({
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
      const ids = JSON.parse(localStorage.getItem("documentIds") || "[]");

      const res = await api.post("/documents", {
        slug,
      });
      if (res.data.success === true) {
        ids.push({
          id: res.data.createDoc.id,
          isCollaborative: res.data.createDoc.isCollaborative,
        });
        localStorage.setItem("documentIds", JSON.stringify(ids));
        set({ documentID: res.data.createDoc.id });
      }
      useLoadingStore.getState().setLoading(false);
      return res.data.createDoc.id;
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
  addShape: async (shape, documentId) => {
    try {
      console.log("from the addShape", get().documentID);

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
  getShapes: async (documentId, isReadonly = false) => {
    try {
      console.log("from the getShapes", get().documentID);
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");

        return;
      }
      useLoadingStore.getState().setLoading(true);
      if (isReadonly) {
        const res = await api.get(`/share/shapes/${documentId}`);
        if (res.data.success === true) {
          return res.data.shapes;
        }
      } else {
        const res = await api.post("/documents/shapes", {
          documentId
        });
        if (res.data.success === true) {
          return res.data.shapes;
        }
      }
      useLoadingStore.getState().setLoading(false);
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Internal server error");
      useLoadingStore.getState().setLoading(false);
    }
  },
  deleteDocument: async (documentId: string) => {
    try {
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      const res = await api.delete(`/documents/${documentId}`);
      if (!res.data.success) {
        useLoadingStore.getState().setError(res.data.message || "Document deletion failed");
      }
      const ids = JSON.parse(localStorage.getItem("documentIds") || "[]");
      const newIds = ids.filter((id: { id: string }) => id.id !== documentId);
      localStorage.setItem("documentIds", JSON.stringify(newIds));
    } catch (error: any) {
      console.log(error);
      useLoadingStore.getState().setError(error.response?.data?.message || "Internal server error");
      throw new Error(error.response?.data?.message || "Document deletion failed");
    }
  },
  renameDocument: async (documentId: string, name: string) => {
    try {
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      if (!name) {
        useLoadingStore.getState().setError("Document name is required");
        return;
      }
      const res = await api.put(`/documents/${documentId}`, {
        name,
      });
      if (!res.data.success) {
        useLoadingStore.getState().setError(res.data.message || "Document renaming failed");
        return;
      }
    } catch (error: any) {
      console.log(error);
      useLoadingStore.getState().setError(error.response?.data?.message || "Internal server error");
      throw new Error(error.response?.data?.message || "Document renaming failed");
    }
  },
  getAllMembers: async (documentId: string) => {
    try {
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      const res = await api.get(`/room/members/${documentId}`);
      if (res.data.success === true) {
        return res.data.members;
      }
      useLoadingStore.getState().setError("Failed to fetch members");
      return [];
    } catch (error) {
      console.log(error);
      useLoadingStore.getState().setError("Failed to fetch members");
    }
  },
  checkAccessForShare: async (documentId: string) => {
    try {
      if (!documentId) {
        useLoadingStore.getState().setError("Document ID is required");
        return;
      }
      const res = await api.post("/share/access", { documentId } );

      return res.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data?.message || "Failed to fetch document access");
    }
  },
}));

interface CanvasStore {
  createDocument: (slug: string) => Promise<string | undefined>;
  documentID: string;
  isCollaborative: boolean;
  setIsCollaborative: (isCollaborative: boolean) => void;
  setDocumentID: (id: string) => void;
  addShape: (shape: Shape, documentId: string) => void;
  getShapes: (documentId: string, isReadonly: boolean) => Promise<Shape[] | []>;
  deleteDocument: (documentId: string) => void;
  renameDocument: (documentId: string, name: string) => void;
  getAllMembers: (documentId: string) => Promise<any>;
  checkAccessForShare: (documentId: string) => Promise<any>;
}

interface Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
