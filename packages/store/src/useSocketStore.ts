import { api } from "@repo/utils/api";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";
import { useCanvasStore } from "./useCanvasStore";

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  convertToCollab: async (documentId: string) => {
    try {
      const cachedDocuments = JSON.parse(
        localStorage.getItem("documentIds") || "[]"
      );
      const findId = cachedDocuments.find((doc: any) => doc.id === documentId);
      if (findId.isCollaborative) {
        useLoadingStore.getState().setMsg("Document is already collaborative");
        return;
      }

      const res = await api.post("/room/collab", { documentId });
      if (!res.data.success) {
        useLoadingStore.getState().setMsg("Failed to convert to collaborative");
        return;
      }
      cachedDocuments.map((doc: any) => {
        if (doc.id === documentId) {
          doc.isCollaborative = true;
        }
      });
      localStorage.setItem("documentIds", JSON.stringify(cachedDocuments));
    } catch (error) {
      console.log(error);
    }
  },
  connectToSocket: (url, documentId) => {
    
    if (get().isConnected || get().socket) {
      useLoadingStore.getState().setMsg("Already connected to socket");
      return;
    }

    if(!documentId) {
      useLoadingStore.getState().setMsg("Document id is required");
      return;
    }

    const socket = io(url, {
      withCredentials: true,
      query: { roomId: documentId },
      transports: ["websocket"],
    });
    
    socket.on("connect", () => {
      console.log("Socket connected successfully");
      set({ socket, isConnected: true });
      useCanvasStore.getState().setIsCollaborative(true);
    });

    socket.emit("join-room", documentId);

    socket.on("user-joined", (users) => {
      useLoadingStore.getState().setMsg(`user joined ${users.name}`);
    });

    socket.on("user-left", (data) => {
      useLoadingStore.getState().setMsg(`${data.name} left`);
    });

    socket.on("disconnect", (resone) => {
      console.log("Disconnected from socket")
      console.log(resone);
      
      set({ socket: null, isConnected: false });
    });
    socket.on("connect_error", (error) => { 
      console.log(error);
      
      console.log(error.message);
      set({ socket: null, isConnected: false });
    });
    socket.on("error", (error) => {
      console.log(error);
      set({ socket: null, isConnected: false });
    });
    return socket;

  },
  setSocket: (socket) => {
    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
}));

type Element = {
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
};
interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  connectToSocket: (url: string, documentId: string) => any;
  setSocket: (socket: Socket) => void
  convertToCollab: (documentId: string) => void;
  disconnect: () => void;
}
